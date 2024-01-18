---
title: 'Tutorial: Create, evaluate, and score a fraud detection model'
description: This article shows the data science workflow for building a model that detects credit card fraud.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 09/06/2023
#customer intent: As a data scientist, I want to build a machine learning model so I can detect future fraudulent transactions.
---

# Tutorial: Create, evaluate, and score a fraud detection model

In this tutorial, you walk through an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow in [!INCLUDE [product-name](../includes/product-name.md)]. The scenario is to build a fraud detection model by using machine learning algorithms trained on historical data. You can then use the model to detect future fraudulent transactions.

The main steps in this tutorial are:

> [!div class="checklist"]
>
> - Install custom libraries.
> - Load the data.
> - Understand and process the data through exploratory data analysis.
> - Train a machine learning model by using scikit-learn, and track experiments by using MLflow and the Fabric autologging feature.
> - Save and register the best-performing machine learning model.
> - Load the machine learning model for scoring and making predictions.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

- If you don't have a Microsoft Fabric lakehouse, create one by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Follow along in a notebook

You can follow along in a notebook in one of two ways:

- Open and run the built-in notebook in the Synapse Data Science experience.
- Upload your notebook from GitHub to the Synapse Data Science experience.

### Open the built-in notebook

**Fraud detection** is the sample notebook that accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

[AIsample - Fraud Detection.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Fraud%20Detection.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Fraud%20Detection.ipynb -->

## Step 1: Install custom libraries

When you're developing a machine learning model or doing ad hoc data analysis, you might need to quickly install a custom library for your Apache Spark session. You can install libraries in one of two ways:

- Use the inline installation capabilities (such as `%pip` or `%conda`) of your notebook to install libraries in your current notebook only.
- Install libraries directly in your workspace, so that all notebooks in your workspace can use them.

For more information on installing libraries, see [Install Python libraries](use-ai-samples.md#install-python-libraries).

For this tutorial, you install the imbalanced-learn (`imblearn`) library in your notebook by using `%pip install`. When you run `%pip install`, the PySpark kernel restarts. So you should install the library before you run any other cells in the notebook:

```python
# Use pip to install imblearn
%pip install imblearn
```

## Step 2: Load the data

The fraud detection dataset contains credit card transactions that European cardholders made in September 2013 over the course of two days. The dataset contains only numerical features, which is the result of a Principal Component Analysis (PCA) transformation that was applied to the original features. The only features that weren't transformed with PCA are `Time` and `Amount`. To protect confidentiality, we can't provide the original features or more background information about the dataset.

Here are some details about the dataset:

- The features `V1`, `V2`, `V3`, …, `V28` are the principal components obtained with PCA.
- The feature `Time` contains the elapsed seconds between a transaction and the first transaction in the dataset.
- The feature `Amount` is the transaction amount. You can use this feature for example-dependent, cost-sensitive learning.
- The column `Class` is the response (target) variable. It takes the value `1` for fraud and `0` otherwise.

Out of the 284,807 transactions, only 492 are fraudulent. The minority class (fraud) accounts for only about 0.172% of the data, so the dataset is highly imbalanced.

The following table shows a preview of the *creditcard.csv* data:

|Time|V1|V2|V3|V4|V5|V6|V7|V8|V9|V10|V11|V12|V13|V14|V15|V16|V17|V18|V19|V20|V21|V22|V23|V24|V25|V26|V27|V28|Amount|Class|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|0|-1.3598071336738|-0.0727811733098497|2.53634673796914|1.37815522427443|-0.338320769942518|0.462387777762292|0.239598554061257|0.0986979012610507|0.363786969611213|0.0907941719789316|-0.551599533260813|-0.617800855762348|-0.991389847235408|-0.311169353699879|1.46817697209427|-0.470400525259478|0.207971241929242|0.0257905801985591|0.403992960255733|0.251412098239705|-0.018306777944153|0.277837575558899|-0.110473910188767|0.0669280749146731|0.128539358273528|-0.189114843888824|0.133558376740387|-0.0210530534538215|149.62|"0"|
|0|1.19185711131486|0.26615071205963|0.16648011335321|0.448154078460911|0.0600176492822243|-0.0823608088155687|-0.0788029833323113|0.0851016549148104|-0.255425128109186|-0.166974414004614|1.61272666105479|1.06523531137287|0.48909501589608|-0.143772296441519|0.635558093258208|0.463917041022171|-0.114804663102346|-0.183361270123994|-0.145783041325259|-0.0690831352230203|-0.225775248033138|-0.638671952771851|0.101288021253234|-0.339846475529127|0.167170404418143|0.125894532368176|-0.00898309914322813|0.0147241691924927|2.69|"0"|

### Download the dataset and upload to the lakehouse

Define the following parameters so that you can use this notebook with different datasets:

```python
IS_CUSTOM_DATA = False  # If True, the dataset has to be uploaded manually

TARGET_COL = "Class"  # Target column name
IS_SAMPLE = False  # If True, use only <SAMPLE_ROWS> rows of data for training; otherwise, use all data
SAMPLE_ROWS = 5000  # If IS_SAMPLE is True, use only this number of rows for training

DATA_FOLDER = "Files/fraud-detection/"  # Folder with data files
DATA_FILE = "creditcard.csv"  # Data file name

EXPERIMENT_NAME = "aisample-fraud"  # MLflow experiment name
```

The following code downloads a publicly available version of the dataset and then stores it in a Fabric lakehouse.

> [!IMPORTANT]
> Be sure to [add a lakehouse](https://aka.ms/fabric/addlakehouse) to the notebook before you run it. If you don't, you'll get an error.

```python
if not IS_CUSTOM_DATA:
    # Download data files into the lakehouse if they're not already there
    import os, requests

    remote_url = "https://synapseaisolutionsa.blob.core.windows.net/public/Credit_Card_Fraud_Detection"
    fname = "creditcard.csv"
    download_path = f"/lakehouse/default/{DATA_FOLDER}/raw"

    if not os.path.exists("/lakehouse/default"):
        raise FileNotFoundError("Default lakehouse not found, please add a lakehouse and restart the session.")
    os.makedirs(download_path, exist_ok=True)
    if not os.path.exists(f"{download_path}/{fname}"):
        r = requests.get(f"{remote_url}/{fname}", timeout=30)
        with open(f"{download_path}/{fname}", "wb") as f:
            f.write(r.content)
    print("Downloaded demo data files into lakehouse.")

```

### Set up MLflow experiment tracking

Experiment tracking is the process of saving all relevant experiment-related information for every experiment that you run. Sometimes, it's easy to observe that there's no way to get better results when you're running a particular experiment. In such a situation, you're better off simply stopping the experiment and trying a new one.

The Synapse Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)] includes an autologging feature. This feature reduces the amount of code required to automatically log the parameters, metrics, and items of a machine learning model during training. The feature extends MLflow's autologging capabilities and is deeply integrated into the Synapse Data Science experience.

By using autologging, you can easily track and compare the performance of models and experiments without the need for manual tracking. For more information, see [Autologging in Microsoft Fabric](https://aka.ms/fabric-autologging).

You can disable Microsoft Fabric autologging in a notebook session by calling `mlflow.autolog()` and setting `disable=True`:

```python
# Set up MLflow for experiment tracking
import mlflow

mlflow.set_experiment(EXPERIMENT_NAME)
mlflow.autolog(disable=True)  # Disable MLflow autologging
```

### Read raw data from the lakehouse

This code reads raw data from the lakehouse:

```python
df = (
    spark.read.format("csv")
    .option("header", "true")
    .option("inferSchema", True)
    .load(f"{DATA_FOLDER}/raw/{DATA_FILE}")
    .cache()
)
```

## Step 3: Perform exploratory data analysis

In this section, you begin by exploring the raw data and high-level statistics. You then transform the data by casting the columns into the correct types and converting the Spark DataFrame to a pandas DataFrame for easier visualization. Finally, you explore and visualize the class distributions in the data.

### Display the raw data

1. Explore the raw data and view high-level statistics by using the `display` command. For more information on data visualization, see [Notebook visualization in Microsoft Fabric](https://aka.ms/fabric/visualization).

    ```python
    display(df)
    ```

1. Print some basic information about the dataset:

    ```python
    # Print dataset basic information
    print("records read: " + str(df.count()))
    print("Schema: ")
    df.printSchema()
    ```

### Transform the data

1. Cast the dataset's columns into the correct types:

    ```python
    import pyspark.sql.functions as F
    
    df_columns = df.columns
    df_columns.remove(TARGET_COL)
    
    # Ensure that TARGET_COL is the last column
    df = df.select(df_columns + [TARGET_COL]).withColumn(TARGET_COL, F.col(TARGET_COL).cast("int"))
    
    if IS_SAMPLE:
        df = df.limit(SAMPLE_ROWS)
    ```

1. Convert the Spark DataFrame to a pandas DataFrame for easier visualization and processing:

    ```python
    df_pd = df.toPandas()
    ```

### Explore the class distribution in the dataset

1. Display the class distribution in the dataset:

    ```python
    # The distribution of classes in the dataset
    print('No Frauds', round(df_pd['Class'].value_counts()[0]/len(df_pd) * 100,2), '% of the dataset')
    print('Frauds', round(df_pd['Class'].value_counts()[1]/len(df_pd) * 100,2), '% of the dataset')
    ```

    The code returns the following class distribution of the dataset: 99.83% `No Frauds` and 0.17% `Frauds`. This class distribution shows that most of the transactions are nonfraudulent. Therefore, data preprocessing is required before model training, to avoid overfitting.

1. Use a plot to show the class imbalance in the dataset, by viewing the distribution of fraudulent versus nonfraudulent transactions:

    ```python
    import seaborn as sns
    import matplotlib.pyplot as plt
    
    colors = ["#0101DF", "#DF0101"]
    sns.countplot(x='Class', data=df_pd, palette=colors) 
    plt.title('Class Distributions \n (0: No Fraud || 1: Fraud)', fontsize=10)
    ```

1. Show the five-number summary (minimum score, first quartile, median, third quartile, and maximum score) for the transaction amount, by using box plots:

    ```python
    fig, (ax1, ax2) = plt.subplots(ncols=2, figsize=(12,5))
    s = sns.boxplot(ax = ax1, x="Class", y="Amount", hue="Class",data=df_pd, palette="PRGn", showfliers=True) # Remove outliers from the plot
    s = sns.boxplot(ax = ax2, x="Class", y="Amount", hue="Class",data=df_pd, palette="PRGn", showfliers=False) # Keep outliers from the plot
    plt.show()
    ```

    When the data is highly imbalanced, these box plots might not demonstrate accurate insights. Alternatively, you can address the `Class` imbalance problem first and then create the same plots for more accurate insights.

## Step 4: Train and evaluate the models

In this section, you train a LightGBM model to classify the fraud transactions. You train a LightGBM model on both the imbalanced dataset and the balanced dataset. Then, you compare the performance of both models.

### Prepare training and testing datasets

Before training, split the data into the training and testing datasets:

```python
# Split the dataset into training and testing sets
from sklearn.model_selection import train_test_split

train, test = train_test_split(df_pd, test_size=0.15)
feature_cols = [c for c in df_pd.columns.tolist() if c not in [TARGET_COL]]

```

### Apply SMOTE to the training dataset

The `imblearn` library uses the Synthetic Minority Oversampling Technique (SMOTE) approach to address the problem of imbalanced classification. Imbalanced classification happens when there are too few examples of the minority class for a model to effectively learn the decision boundary. SMOTE is the most widely used approach to synthesize new samples for the minority class.

Apply SMOTE only to the training dataset, and not to the testing dataset. When you score the model with the test data, you want an approximation of the model's performance on unseen data in production. For this approximation to be valid, your test data needs to represent production data as closely as possible by having the original imbalanced distribution.

```python
# Apply SMOTE to the training data
import pandas as pd
from collections import Counter
from imblearn.over_sampling import SMOTE

X = train[feature_cols]
y = train[TARGET_COL]
print("Original dataset shape %s" % Counter(y))

sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X, y)
print("Resampled dataset shape %s" % Counter(y_res))

new_train = pd.concat([X_res, y_res], axis=1)
```

To learn more about SMOTE, see the [scikit-learn reference page for the SMOTE method](https://imbalanced-learn.org/stable/references/generated/imblearn.over_sampling.SMOTE.html) and the [scikit-learn user guide on oversampling](https://imbalanced-learn.org/stable/over_sampling.html#smote-adasyn).

### Train machine learning models and run experiments

Apache Spark in [!INCLUDE [product-name](../includes/product-name.md)] enables machine learning with big data. By using Apache Spark, you can get valuable insights from large amounts of structured, unstructured, and fast-moving data.

There are several options for training machine learning models by using Apache Spark in Microsoft Fabric: Apache Spark MLlib, SynapseML, and other open-source libraries. For more information, see [Train machine learning models in Microsoft Fabric](https://aka.ms/fabric/MLTrain).

A *machine learning experiment* is the primary unit of organization and control for all related machine learning runs. A *run* corresponds to a single execution of model code. Machine learning *experiment tracking* refers to the process of managing all the experiments and their components, such as parameters, metrics, models, and other artifacts.

When you use experiment tracking, you can organize all the required components of a specific machine learning experiment. You can also easily reproduce past results, by using saved experiments. For more information on machine learning experiments, see [Machine learning experiments in Microsoft Fabric](https://aka.ms/synapse-experiment).

1. Update the MLflow autologging configuration to track more metrics, parameters, and files, by setting `exclusive=False`:

    ```python
    mlflow.autolog(exclusive=False)
    ```

1. Train two models by using LightGBM: one model on the imbalanced dataset and the other on the balanced dataset (via SMOTE). Then compare the performance of the two models.

    ```python
    import lightgbm as lgb
    
    model = lgb.LGBMClassifier(objective="binary") # Imbalanced dataset
    smote_model = lgb.LGBMClassifier(objective="binary") # Balanced dataset
    ```

    ```python
    # Train LightGBM for both imbalanced and balanced datasets and define the evaluation metrics
    print("Start training with imbalanced data:\n")
    with mlflow.start_run(run_name="raw_data") as raw_run:
        model = model.fit(
            train[feature_cols],
            train[TARGET_COL],
            eval_set=[(test[feature_cols], test[TARGET_COL])],
            eval_metric="auc",
            callbacks=[
                lgb.log_evaluation(10),
            ],
        )
    
    print(f"\n\nStart training with balanced data:\n")
    with mlflow.start_run(run_name="smote_data") as smote_run:
        smote_model = smote_model.fit(
            new_train[feature_cols],
            new_train[TARGET_COL],
            eval_set=[(test[feature_cols], test[TARGET_COL])],
            eval_metric="auc",
            callbacks=[
                lgb.log_evaluation(10),
            ],
        )
    ```

### Determine feature importance for training

1. Determine feature importance for the model that you trained on the imbalanced dataset:

    ```python
    with mlflow.start_run(run_id=raw_run.info.run_id):
        importance = lgb.plot_importance(
            model, title="Feature importance for imbalanced data"
        )
        importance.figure.savefig("feauture_importance.png")
        mlflow.log_figure(importance.figure, "feature_importance.png")
    ```

1. Determine feature importance for the model that you trained on balanced data (generated via SMOTE):

    ```python
    with mlflow.start_run(run_id=smote_run.info.run_id):
        smote_importance = lgb.plot_importance(
            smote_model, title="Feature importance for balanced (via SMOTE) data"
        )
        smote_importance.figure.savefig("feauture_importance_smote.png")
        mlflow.log_figure(smote_importance.figure, "feauture_importance_smote.png")
    ```

The important features are drastically different when you train a model with the imbalanced dataset versus the balanced dataset.

### Evaluate the models

In this section, you evaluate the two trained models:

- `model` trained on raw, imbalanced data
- `smote_model` trained on balanced data

#### Compute model metrics

1. Define a `prediction_to_spark` function that performs predictions and converts the prediction results to a Spark DataFrame. You can later compute model statistics on the prediction results by using [SynapseML](https://aka.ms/fabric/SynapseEval).

    ```python
    from pyspark.sql.functions import col
    from pyspark.sql.types import IntegerType, DoubleType
    
    def prediction_to_spark(model, test):
        predictions = model.predict(test[feature_cols], num_iteration=model.best_iteration_)
        predictions = tuple(zip(test[TARGET_COL].tolist(), predictions.tolist()))
        dataColumns = [TARGET_COL, "prediction"]
        predictions = (
            spark.createDataFrame(data=predictions, schema=dataColumns)
            .withColumn(TARGET_COL, col(TARGET_COL).cast(IntegerType()))
            .withColumn("prediction", col("prediction").cast(DoubleType()))
        )
    
        return predictions
    ```

1. Use the `prediction_to_spark` function to perform predictions with the two models, `model` and `smote_model`:

    ```python
    predictions = prediction_to_spark(model, test)
    smote_predictions = prediction_to_spark(smote_model, test)
    predictions.limit(10).toPandas()
    ```

1. Compute metrics for the two models:

    ```python
    from synapse.ml.train import ComputeModelStatistics
    
    metrics = ComputeModelStatistics(
        evaluationMetric="classification", labelCol=TARGET_COL, scoredLabelsCol="prediction"
    ).transform(predictions)
    
    smote_metrics = ComputeModelStatistics(
        evaluationMetric="classification", labelCol=TARGET_COL, scoredLabelsCol="prediction"
    ).transform(smote_predictions)
    display(metrics)
    ```

#### Evaluate model performance by using a confusion matrix

A *confusion matrix* displays the number of true positives (TP), true negatives (TN), false positives (FP), and false negatives (FN) that a model produces when it's scored with test data. For binary classification, you get a `2x2` confusion matrix. For multiclass classification, you get an `nxn` confusion matrix, where `n` is the number of classes.

1. Use a confusion matrix to summarize the performance of the trained machine learning models on the test data:

    ```python
    # Collect confusion matrix values
    cm = metrics.select("confusion_matrix").collect()[0][0].toArray()
    smote_cm = smote_metrics.select("confusion_matrix").collect()[0][0].toArray()
    print(cm)
    ```

1. Plot the confusion matrix for the predictions of `smote_model` (trained on balanced data):

    ```python
    # Plot the confusion matrix
    import seaborn as sns
    
    def plot(cm):
        """
        Plot the confusion matrix.
        """
        sns.set(rc={"figure.figsize": (5, 3.5)})
        ax = sns.heatmap(cm, annot=True, fmt=".20g")
        ax.set_title("Confusion Matrix")
        ax.set_xlabel("Predicted label")
        ax.set_ylabel("True label")
        return ax
    
    with mlflow.start_run(run_id=smote_run.info.run_id):
        ax = plot(smote_cm)
        mlflow.log_figure(ax.figure, "ConfusionMatrix.png")
    ```

1. Plot the confusion matrix for the predictions of `model` (trained on raw, imbalanced data):

    ```python
    with mlflow.start_run(run_id=raw_run.info.run_id):
        ax = plot(cm)
        mlflow.log_figure(ax.figure, "ConfusionMatrix.png")
    ```

#### Evaluate model performance by using AUC-ROC and AUPRC measures

The Area Under the Curve Receiver Operating Characteristic (AUC-ROC) measure is widely used to assess the performance of binary classifiers. AUC-ROC is a chart that visualizes the trade-off between the true positive rate (TPR) and the false positive rate (FPR).

In some cases, it's more appropriate to evaluate your classifier based on the Area Under the Precision-Recall Curve (AUPRC) measure. AUPRC is a curve that combines these rates:

- The precision, also called the positive predictive value (PPV)
- The recall, also called TPR

To evaluate performance by using the AUC-ROC and AUPRC measures:

1. Define a function that returns the AUC-ROC and AUPRC measures:

    ```python
    from pyspark.ml.evaluation import BinaryClassificationEvaluator
    
    def evaluate(predictions):
        """
        Evaluate the model by computing AUROC and AUPRC with the predictions.
        """
    
        # Initialize the binary evaluator
        evaluator = BinaryClassificationEvaluator(rawPredictionCol="prediction", labelCol=TARGET_COL)
    
        _evaluator = lambda metric: evaluator.setMetricName(metric).evaluate(predictions)
    
        # Calculate AUROC, baseline 0.5
        auroc = _evaluator("areaUnderROC")
        print(f"The AUROC is: {auroc:.4f}")
    
        # Calculate AUPRC, baseline positive rate (0.172% in the data)
        auprc = _evaluator("areaUnderPR")
        print(f"The AUPRC is: {auprc:.4f}")
    
        return auroc, auprc
    
    ```

1. Log the AUC-ROC and AUPRC metrics for the model that you trained on imbalanced data:

    ```python
    with mlflow.start_run(run_id=raw_run.info.run_id):
        auroc, auprc = evaluate(predictions)
        mlflow.log_metrics({"AUPRC": auprc, "AUROC": auroc})
        mlflow.log_params({"Data_Enhancement": "None", "DATA_FILE": DATA_FILE})
    ```

1. Log the AUC-ROC and AUPRC metrics for the model that you trained on balanced data:

    ```python
    with mlflow.start_run(run_id=smote_run.info.run_id):
        auroc, auprc = evaluate(smote_predictions)
        mlflow.log_metrics({"AUPRC": auprc, "AUROC": auroc})
        mlflow.log_params({"Data_Enhancement": "SMOTE", "DATA_FILE": DATA_FILE})
    ```

The model that you trained on balanced data returns higher AUC-ROC and AUPRC values compared to the model that you trained on imbalanced data. Based on these measures, SMOTE appears to be an effective technique for enhancing model performance when you're working with highly imbalanced data.

As shown in the following image, any experiment is logged along with its respective name. You can track the experiment's parameters and performance metrics in your workspace.

:::image type="content" source="media/fraud-detection/fraud-detection-experiment-mlflow.png" alt-text="Screenshot of the tracked experiment." lightbox="media/fraud-detection/fraud-detection-experiment-mlflow.png":::

The following image also shows performance metrics for the model that you trained on the balanced dataset (in **Version 2**). You can select **Version 1** to see the metrics for the model that you trained on the imbalanced dataset. When you compare the metrics, you notice that AUROC is higher for the model that you trained with the balanced dataset. These results indicate that this model is better at correctly predicting `0` classes as `0` and predicting `1` classes as `1`.

:::image type="content" source="media/fraud-detection/fraud-detection-model-mlflow.png" alt-text="Screenshot of logged model performance metrics and model parameters." lightbox="media/fraud-detection/fraud-detection-model-mlflow.png":::

## Step 5: Register the models

Use MLflow to register the two models:

```python
# Register the model
registered_model_name = f"{EXPERIMENT_NAME}-lightgbm"

raw_model_uri = "runs:/{}/model".format(raw_run.info.run_id)
mlflow.register_model(raw_model_uri, registered_model_name)

smote_model_uri = "runs:/{}/model".format(smote_run.info.run_id)
mlflow.register_model(smote_model_uri, registered_model_name)
```

## Step 6: Save the prediction results

Microsoft Fabric allows users to operationalize machine learning models by using a scalable function called `PREDICT`. This function supports batch scoring (or batch inferencing) in any compute engine.

You can generate batch predictions directly from the Microsoft Fabric notebook or from a model's item page. For more information on how to use `PREDICT`, see [Model scoring with PREDICT in Microsoft Fabric](https://aka.ms/fabric-predict).

1. Load the better-performing model (**Version 2**) for batch scoring and generate the prediction results:

    ```python
    from synapse.ml.predict import MLFlowTransformer
    
    spark.conf.set("spark.synapse.ml.predict.enabled", "true")
    
    model = MLFlowTransformer(
        inputCols=feature_cols,
        outputCol="prediction",
        modelName=f"{EXPERIMENT_NAME}-lightgbm",
        modelVersion=2,
    )
    
    test_spark = spark.createDataFrame(data=test, schema=test.columns.to_list())
    
    batch_predictions = model.transform(test_spark)
    ```

1. Save predictions to the lakehouse:

    ```python
    # Save the predictions to the lakehouse
    batch_predictions.write.format("delta").mode("overwrite").save(f"{DATA_FOLDER}/predictions/batch_predictions")
    ```

<!-- nbend -->

## Related content

- [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md)
- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)
