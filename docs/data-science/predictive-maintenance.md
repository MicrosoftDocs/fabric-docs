---
title: 'Tutorial: Create, evaluate, and score a machine fault detection model'
description: This tutorial shows the data engineering and data science workflow for building a system that predicts mechanical failures.
ms.reviewer: lagayhar
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 08/23/2023
#customer intent: As a data scientist, I want to build a machine fault detection model so I can predict mechanical failures.
---

# Create, evaluate, and score a machine fault detection model

In this tutorial, you walk through an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow in [!INCLUDE [product-name](../includes/product-name.md)]. The scenario is to use machine learning to have a more systematic approach to fault diagnosis so that you can proactively identify issues and take actions before a machine's failure. In this scenario, the aim is to predict whether a machine will experience a failure based on process temperature, rotational speed, or other features.

The main steps in this tutorial are:

> [!div class="checklist"]
>
> - Install custom libraries.
> - Load and process the data.
> - Understand the data through exploratory data analysis.
> - Train machine learning models by using scikit-learn, LightGBM, and MLflow, and track experiments by using the Fabric autologging feature.
> - Score the trained models by using the Fabric PREDICT feature, save the best model, and load it for predictions.
> - Demonstrate the model's performance via visualizations in Power BI.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

- If you don't have a Microsoft Fabric lakehouse, create one by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Follow along in a notebook

You can follow along in a notebook in one of two ways:

- Open and run the built-in notebook in the Synapse Data Science experience.
- Upload your notebook from GitHub to the Synapse Data Science experience.

### Open the built-in notebook

**Machine failure** is the sample notebook that accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

[AISample - Predictive Maintenance](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Predictive%20Maintenance.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

## Step 1: Install custom libraries

When you're developing a machine learning model or doing ad hoc data analysis, you might need to quickly install a custom library for your Apache Spark session. You can install libraries in one of two ways:

- Use the inline installation capabilities (such as `%pip` or `%conda`) of your notebook to install libraries in your current notebook only.
- Install libraries directly in your workspace, so that all notebooks in your workspace can use them.

For more information on installing libraries, see [Install Python libraries](use-ai-samples.md#install-python-libraries).

For this tutorial, you install the `imblearn` library in your notebook by using `%pip install`. When you run `%pip install`, the PySpark kernel restarts. So you should install the library before you run any other cells in the notebook.

```python
# Use pip to install imblearn
%pip install imblearn
```

## Step 2: Load the data

The dataset simulates logging of a manufacturing machine's parameters as a function of time, which is common in industrial settings. It consists of 10,000 data points stored as rows with features as columns. The features include:

- A unique identifier (UID) that ranges from 1 to 10000.
- A product ID that consists of a letter L, M, or H. The letter indicates the product quality variant and a variant-specific serial number. Low-quality, medium-quality, and high-quality variants make up 60%, 30%, and 10% of all products, respectively.
- Air temperature in kelvin (K).
- Process temperature in kelvin.
- Rotational speed in revolutions per minute (RPM).
- Torque in Newton meters (Nm).
- Tool wear in minutes. The quality variants H, M, and L add 5, 3, and 2 minutes of wear to the tool in the process, respectively.
- A machine failure label, which indicates whether the machine failed in this data point for any of the following independent failure modes:

  - Tool wear failure (TWF). The tool is replaced or fails at a randomly selected tool wear time from 200 through 240 minutes.
  - Heat dissipation failure (HDF). Heat dissipation causes a process failure if the difference between air and process temperature is below 8.6 K and the tool's rotational speed is below 1,380 RPM.
  - Power failure (PWF). The product of torque and rotational speed (in radians per second or rad/s) equals the power required for the process. The process fails if this power is below 3,500 watts or above 9,000 watts.
  - Overstrain failure (OSF). If the product of tool wear and torque exceeds 11,000 Nm for the L product variant (12,000 M, 13,000 H), the process fails due to overstrain.
  - Random failure (RNF). Each process has a chance of 0.1% to fail regardless of its process parameters.

> [!NOTE]
> If at least one of the preceding failure modes is true, the process fails, and the machine failure label is set to 1. The machine learning method can't determine which failure mode caused the process to fail.

### Download the dataset and upload to the lakehouse

Connect to the Azure Open Datasets container and load the Predictive Maintenance dataset. The following code downloads a publicly available version of the dataset and then stores it in a Fabric lakehouse.

> [!IMPORTANT]
> Add a lakehouse to the notebook before you run it. If you don't, you'll get an error. For information on adding a lakehouse, see [Connect lakehouses and notebooks](https://aka.ms/fabric/addlakehouse).

```python
# Download demo data files into the lakehouse if they don't exist
import os, requests
DATA_FOLDER = "Files/predictive_maintenance/"  # Folder that contains the dataset
DATA_FILE = "predictive_maintenance.csv"  # Data file name
remote_url = "https://synapseaisolutionsa.blob.core.windows.net/public/MachineFaultDetection"
file_list = ["predictive_maintenance.csv"]
download_path = f"/lakehouse/default/{DATA_FOLDER}/raw"

if not os.path.exists("/lakehouse/default"):
    raise FileNotFoundError(
        "Default lakehouse not found, please add a lakehouse and restart the session."
    )
os.makedirs(download_path, exist_ok=True)
for fname in file_list:
    if not os.path.exists(f"{download_path}/{fname}"):
        r = requests.get(f"{remote_url}/{fname}", timeout=30)
        with open(f"{download_path}/{fname}", "wb") as f:
            f.write(r.content)
print("Downloaded demo data files into lakehouse.")
```

After you download the dataset into the lakehouse, you can load it as a Spark DataFrame:

```python
df = (
    spark.read.option("header", True)
    .option("inferSchema", True)
    .csv(f"{DATA_FOLDER}raw/{DATA_FILE}")
    .cache()
)
df.show(5)
```

The following table shows a preview of the data:

|UDI|Product ID|Type|Air temperature [K]|Process temperature [K]|Rotational speed [rpm]|Torque [Nm]|Tool wear [min]|Target|Failure Type|
|---|----------|----|-------------------|-----------------------|----------------------|-----------|---------------|------|------------|
|  1|    M14860|   M|              298.1|                  308.6|                  1551|       42.8|              0|     0|  No Failure|
|  2|    L47181|   L|              298.2|                  308.7|                  1408|       46.3|              3|     0|  No Failure|
|  3|    L47182|   L|              298.1|                  308.5|                  1498|       49.4|              5|     0|  No Failure|
|  4|    L47183|   L|              298.2|                  308.6|                  1433|       39.5|              7|     0|  No Failure|
|  5|    L47184|   L|              298.2|                  308.7|                  1408|       40.0|              9|     0|  No Failure|

### Write a Spark DataFrame to a lakehouse delta table

Format the data (for example, replace the space with an underscore) to facilitate Spark operations in subsequent steps:

```python
# Replace the space in the column name with an underscore to avoid an invalid character while saving 
df = df.toDF(*(c.replace(' ', '_') for c in df.columns))
table_name = "predictive_maintenance_data"
df.show(5)
```

The following table shows a preview of the data with processed column names:

|UDI|Product_ID|Type|Air_temperature_[K]|Process_temperature_[K]|Rotational_speed_[rpm]|Torque_[Nm]|Tool_wear_[min]|Target|Failure_Type|
|---|----------|----|-------------------|-----------------------|----------------------|-----------|---------------|------|------------|
|  1|    M14860|   M|              298.1|                  308.6|                  1551|       42.8|              0|     0|  No Failure|
|  2|    L47181|   L|              298.2|                  308.7|                  1408|       46.3|              3|     0|  No Failure|
|  3|    L47182|   L|              298.1|                  308.5|                  1498|       49.4|              5|     0|  No Failure|
|  4|    L47183|   L|              298.2|                  308.6|                  1433|       39.5|              7|     0|  No Failure|
|  5|    L47184|   L|              298.2|                  308.7|                  1408|       40.0|              9|     0|  No Failure|

```python
# Save data with processed columns to the lakehouse 
df.write.mode("overwrite").format("delta").save(f"Tables/{table_name}")
print(f"Spark dataframe saved to delta table: {table_name}")
```

## Step 3: Preprocess data and perform exploratory data analysis

Convert the Spark DataFrame to a pandas DataFrame so you can use pandas-compatible popular plotting libraries.

> [!TIP]
> For a large dataset, you might need to load a portion of it.

```python
data = spark.read.format("delta").load("Tables/predictive_maintenance_data")
SEED = 1234
df = data.toPandas()
df.drop(['UDI', 'Product_ID'],axis=1,inplace=True)
# Rename the Target column to IsFail
df = df.rename(columns = {'Target': "IsFail"})
df.info()
```

Convert specific columns of the dataset to floats and integer types, and map strings (`'L'`, `'M'`, `'H'`) to numerical values (`0`, `1`, `2`):

```python
# Convert temperature, rotational speed, torque, and tool wear columns to float
df['Air_temperature_[K]'] = df['Air_temperature_[K]'].astype(float)
df['Process_temperature_[K]'] = df['Process_temperature_[K]'].astype(float)
df['Rotational_speed_[rpm]'] = df['Rotational_speed_[rpm]'].astype(float)
df['Torque_[Nm]'] = df['Torque_[Nm]'].astype(float)
df['Tool_wear_[min]'] = df['Tool_wear_[min]'].astype(float)

# Convert the 'Target' column to an integer 
df['IsFail'] = df['IsFail'].astype(int)
# Map 'L', 'M', 'H' to numerical values 
df['Type'] = df['Type'].map({'L': 0, 'M': 1, 'H': 2})
```

### Explore data through visualizations

```python
# Import packages and set plotting style
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
sns.set_style('darkgrid')

# Create the correlation matrix
corr_matrix = df.corr(numeric_only=True)

# Plot a heatmap
plt.figure(figsize=(10, 8))
sns.heatmap(corr_matrix, annot=True)
plt.show()
```

:::image type="content" source="media/predictive-maintenance/correlation-matrix.png" alt-text="A plot of the correlation matrix of features.":::

As expected, failure (`IsFail`) has correlation with the selected features (columns). The correlation matrix shows that `Air_temperature`, `Process_temperature`, `Rotational_speed`, `Torque`, and `Tool_wear` have the highest correlation with the `IsFail` variable.

```python
# Plot histograms of select features
fig, axes = plt.subplots(2, 3, figsize=(18,10))
columns = ['Air_temperature_[K]', 'Process_temperature_[K]', 'Rotational_speed_[rpm]', 'Torque_[Nm]', 'Tool_wear_[min]']
data=df.copy()
for ind, item in enumerate (columns):
    column = columns[ind]
    df_column = data[column]
    df_column.hist(ax = axes[ind%2][ind//2], bins=32).set_title(item)
fig.supylabel('count')
fig.subplots_adjust(hspace=0.2)
fig.delaxes(axes[1,2])
```

:::image type="content" source="media/predictive-maintenance/sparse-plot.png" alt-text="Graph plot of the features.":::

As shown in the plotted graphs, the `Air_temperature`, `Process_temperature`, `Rotational_speed`, `Torque`, and `Tool_wear` variables aren't sparse. They appear to have good continuity in the feature space. These plots confirm that training a machine learning model on this dataset is likely to produce results that are reliable and can be generalized to a new dataset.

### Inspect the target variable for class imbalance

Count the number of samples for failed and unfailed machines, and inspect the data balance for each class (`IsFail=0`, `IsFail=1`):

```python
# Plot the counts for no failure and each failure type
plt.figure(figsize=(12, 2))
ax = sns.countplot(x='Failure_Type', data=df)
for p in ax.patches:
    ax.annotate(f'{p.get_height()}', (p.get_x()+0.4, p.get_height()+50))

plt.show()

# Plot the counts for no failure versus the sum of all failure types
plt.figure(figsize=(4, 2))
ax = sns.countplot(x='IsFail', data=df)
for p in ax.patches:
    ax.annotate(f'{p.get_height()}', (p.get_x()+0.4, p.get_height()+50))

plt.show()

```

:::image type="content" source="media/predictive-maintenance/imbalance-plot.png" alt-text="Plot that shows that samples are imbalanced.":::

The plots indicate that the no-failure class (shown as `IsFail=0` in the second plot) constitutes most of the samples. Use an oversampling technique to create a training dataset that's more balanced:

```python
# Separate features and target
features = df[['Type', 'Air_temperature_[K]', 'Process_temperature_[K]', 'Rotational_speed_[rpm]', 'Torque_[Nm]', 'Tool_wear_[min]']]
labels = df['IsFail']

# Split the dataset into the training and testing sets
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

# Ignore warnings
import warnings
warnings.filterwarnings('ignore')
# Save test data to the lakehouse for use in future sections
table_name = "predictive_maintenance_test_data"
df_test_X = spark.createDataFrame(X_test)
df_test_X.write.mode("overwrite").format("delta").save(f"Tables/{table_name}")
print(f"Spark dataframe saved to delta table: {table_name}")
```

### Oversample to balance classes in the training dataset

The previous analysis showed that the dataset is highly imbalanced. The problem with imbalanced classification is that there are too few examples of the minority class for a model to effectively learn the decision boundary.

Use [SMOTE](https://imbalanced-learn.org/stable/references/generated/imblearn.over_sampling.SMOTE.html), which is a widely used oversampling technique that generates synthetic examples. It generates examples for the minority class based on the distances between data points by using Euclidean distance. This method is different from random oversampling. It creates new examples that aren't just duplicates of the minority class, so it's a more effective technique for imbalanced datasets.

```python
# Disable MLflow autologging because you don't want to track SMOTE fitting
import mlflow

mlflow.autolog(disable=True)

from imblearn.combine import SMOTETomek
smt = SMOTETomek(random_state=SEED)
X_train_res, y_train_res = smt.fit_resample(X_train, y_train)

# Plot the counts for both classes
plt.figure(figsize=(4, 2))
ax = sns.countplot(x='IsFail', data=pd.DataFrame({'IsFail': y_train_res.values}))
for p in ax.patches:
    ax.annotate(f'{p.get_height()}', (p.get_x()+0.4, p.get_height()+50))

plt.show()
```

:::image type="content" source="media/predictive-maintenance/balanced-plot.png" alt-text="Plot that shows that samples are balanced.":::

You successfully balanced the dataset and can move to model training.

## Step 4: Train and evaluate the models

Use [MLflow](https://aka.ms/fabric-autologging) to register models, train and compare models, and choose the best model for your prediction purpose. For model training, you use the following three models:

- Random forest classifier
- Logistic regression classifier
- XGBoost classifier

### Train a random forest classifier

```python
import numpy as np 
from sklearn.ensemble import RandomForestClassifier
from mlflow.models.signature import infer_signature
from sklearn.metrics import f1_score, accuracy_score, recall_score

mlflow.set_experiment("Machine_Failure_Classification")
mlflow.autolog(exclusive=False) # This is needed to override the preconfigured autologging behavior

with mlflow.start_run() as run:
    rfc_id = run.info.run_id
    print(f"run_id {rfc_id}, status: {run.info.status}")
    rfc = RandomForestClassifier(max_depth=5, n_estimators=50)
    rfc.fit(X_train_res, y_train_res) 
    signature = infer_signature(X_train_res, y_train_res)

    mlflow.sklearn.log_model(
        rfc,
        "machine_failure_model_rf",
        signature=signature,
        registered_model_name="machine_failure_model_rf"
    ) 

    y_pred_train = rfc.predict(X_train)
    # Calculate the classification metrics for test data
    f1_train = f1_score(y_train, y_pred_train, average='weighted')
    accuracy_train = accuracy_score(y_train, y_pred_train)
    recall_train = recall_score(y_train, y_pred_train, average='weighted')

    # Log the classification metrics to MLflow
    mlflow.log_metric("f1_score_train", f1_train)
    mlflow.log_metric("accuracy_train", accuracy_train)
    mlflow.log_metric("recall_train", recall_train)

    # Print the run ID and the classification metrics
    print("F1 score_train:", f1_train)
    print("Accuracy_train:", accuracy_train)
    print("Recall_train:", recall_train)    

    y_pred_test = rfc.predict(X_test)
    # Calculate the classification metrics for test data
    f1_test = f1_score(y_test, y_pred_test, average='weighted')
    accuracy_test = accuracy_score(y_test, y_pred_test)
    recall_test = recall_score(y_test, y_pred_test, average='weighted')

    # Log the classification metrics to MLflow
    mlflow.log_metric("f1_score_test", f1_test)
    mlflow.log_metric("accuracy_test", accuracy_test)
    mlflow.log_metric("recall_test", recall_test)

    # Print the classification metrics
    print("F1 score_test:", f1_test)
    print("Accuracy_test:", accuracy_test)
    print("Recall_test:", recall_test)
```

From the output, the training and testing datasets both yield an F1 score, accuracy, and recall of approximately 0.9 when you use the random forest classifier.

### Train a logistic regression classifier

```python
from sklearn.linear_model import LogisticRegression

with mlflow.start_run() as run:
    lr_id = run.info.run_id
    print(f"run_id {lr_id}, status: {run.info.status}")
    lr = LogisticRegression(random_state=42)
    lr.fit(X_train_res, y_train_res)
    signature = infer_signature(X_train_res, y_train_res)
  
    mlflow.sklearn.log_model(
        lr,
        "machine_failure_model_lr",
        signature=signature,
        registered_model_name="machine_failure_model_lr"
    ) 

    y_pred_train = lr.predict(X_train)
    # Calculate the classification metrics for training data
    f1_train = f1_score(y_train, y_pred_train, average='weighted')
    accuracy_train = accuracy_score(y_train, y_pred_train)
    recall_train = recall_score(y_train, y_pred_train, average='weighted')

    # Log the classification metrics to MLflow
    mlflow.log_metric("f1_score_train", f1_train)
    mlflow.log_metric("accuracy_train", accuracy_train)
    mlflow.log_metric("recall_train", recall_train)

    # Print the run ID and the classification metrics
    print("F1 score_train:", f1_train)
    print("Accuracy_train:", accuracy_train)
    print("Recall_train:", recall_train)    

    y_pred_test = lr.predict(X_test)
    # Calculate the classification metrics for test data
    f1_test = f1_score(y_test, y_pred_test, average='weighted')
    accuracy_test = accuracy_score(y_test, y_pred_test)
    recall_test = recall_score(y_test, y_pred_test, average='weighted')

    # Log the classification metrics to MLflow
    mlflow.log_metric("f1_score_test", f1_test)
    mlflow.log_metric("accuracy_test", accuracy_test)
    mlflow.log_metric("recall_test", recall_test)

```

### Train an XGBoost classifier

```python
from xgboost import XGBClassifier

with mlflow.start_run() as run:
    xgb = XGBClassifier()
    xgb_id = run.info.run_id 
    print(f"run_id {xgb_id}, status: {run.info.status}")
    xgb.fit(X_train_res.to_numpy(), y_train_res.to_numpy()) 
    signature = infer_signature(X_train_res, y_train_res)
  
    mlflow.xgboost.log_model(
        xgb,
        "machine_failure_model_xgb",
        signature=signature,
        registered_model_name="machine_failure_model_xgb"
    ) 

    y_pred_train = xgb.predict(X_train)
    # Calculate the classification metrics for training data
    f1_train = f1_score(y_train, y_pred_train, average='weighted')
    accuracy_train = accuracy_score(y_train, y_pred_train)
    recall_train = recall_score(y_train, y_pred_train, average='weighted')

    # Log the classification metrics to MLflow
    mlflow.log_metric("f1_score_train", f1_train)
    mlflow.log_metric("accuracy_train", accuracy_train)
    mlflow.log_metric("recall_train", recall_train)

    # Print the run ID and the classification metrics
    print("F1 score_train:", f1_train)
    print("Accuracy_train:", accuracy_train)
    print("Recall_train:", recall_train)    

    y_pred_test = xgb.predict(X_test)
    # Calculate the classification metrics for test data
    f1_test = f1_score(y_test, y_pred_test, average='weighted')
    accuracy_test = accuracy_score(y_test, y_pred_test)
    recall_test = recall_score(y_test, y_pred_test, average='weighted')

    # Log the classification metrics to MLflow
    mlflow.log_metric("f1_score_test", f1_test)
    mlflow.log_metric("accuracy_test", accuracy_test)
    mlflow.log_metric("recall_test", recall_test)
```

## Step 5: Select the best model and predict outputs

In the previous section, you trained three classifiers: random forest, logistic regression, and XGBoost. You have the choice to either programmatically access the results or use the user interface (UI).

To use the UI path, go to your workspace and filter the models.

:::image type="content" source="media/predictive-maintenance/filter-models.png" alt-text="Screenshot of the filter, with models selected.":::

Then select individual models for details of their performance.

:::image type="content" source="media/predictive-maintenance/model-metrics.png" alt-text="Screenshot of performance details for models.":::

The following example shows how to programmatically access the models through MLflow:

```python
runs = {'random forest classifier':   rfc_id,
        'logistic regression classifier': lr_id,
        'xgboost classifier': xgb_id}

# Create an empty DataFrame to hold the metrics
df_metrics = pd.DataFrame()

# Loop through the run IDs and retrieve the metrics for each run
for run_name, run_id in runs.items():
    metrics = mlflow.get_run(run_id).data.metrics
    metrics["run_name"] = run_name
    df_metrics = df_metrics.append(metrics, ignore_index=True)

# Print the DataFrame
print(df_metrics)
```

Although XGBoost yields the best results on the training dataset, it performs poorly on the testing dataset, which indicates overfitting. The logistic regression classifier performs poorly on both the training and testing datasets. Overall, random forest strikes a good balance between training performance and avoiding overfitting.

In the following section, choose the registered random forest model and perform prediction by using the [PREDICT](https://aka.ms/fabric-predict) feature:

```python
from synapse.ml.predict import MLFlowTransformer

model = MLFlowTransformer(
    inputCols=list(X_test.columns),
    outputCol='predictions',
    modelName='machine_failure_model_rf',
    modelVersion=1
)
```

Now that you've created an `MLFlowTransformer` object to load the model for inferencing, use the Transformer API to score the model on the testing dataset:

```python
predictions = model.transform(spark.createDataFrame(X_test))
predictions.show()
```

The following table shows the output:

|Type|Air_temperature_[K]|Process_temperature_[K]|Rotational_speed_[rpm]|Torque_[Nm]|Tool_wear_[min]|predictions|
|----|-------------------|-----------------------|----------------------|-----------|---------------|-----------|
|   0|              300.6|                  309.7|                1639.0|       30.4|          121.0|          0|
|   0|              303.9|                  313.0|                1551.0|       36.8|          140.0|          0|
|   1|              299.1|                  308.6|                1491.0|       38.5|          166.0|          0|
|   0|              300.9|                  312.1|                1359.0|       51.7|          146.0|          1|
|   0|              303.7|                  312.6|                1621.0|       38.8|          182.0|          0|
|   0|              299.0|                  310.3|                1868.0|       24.0|          221.0|          1|
|   2|              297.8|                  307.5|                1631.0|       31.3|          124.0|          0|
|   0|              297.5|                  308.2|                1327.0|       56.5|          189.0|          1|
|   0|              301.3|                  310.3|                1460.0|       41.5|          197.0|          0|
|   2|              297.6|                  309.0|                1413.0|       40.2|           51.0|          0|
|   1|              300.9|                  309.4|                1724.0|       25.6|          119.0|          0|
|   0|              303.3|                  311.3|                1389.0|       53.9|           39.0|          0|
|   0|              298.4|                  307.9|                1981.0|       23.2|           16.0|          0|
|   0|              299.3|                  308.8|                1636.0|       29.9|          201.0|          0|
|   1|              298.1|                  309.2|                1460.0|       45.8|           80.0|          0|
|   0|              300.0|                  309.5|                1728.0|       26.0|           37.0|          0|
|   2|              299.0|                  308.7|                1940.0|       19.9|           98.0|          0|
|   0|              302.2|                  310.8|                1383.0|       46.9|           45.0|          0|
|   0|              300.2|                  309.2|                1431.0|       51.3|           57.0|          0|
|   0|              299.6|                  310.2|                1468.0|       48.0|            9.0|          0|

Save the data into the lakehouse so that you can access the data for future use, such as creating a Power BI dashboard:

```python
# Save test data to the lakehouse for use in the next section. 
table_name = "predictive_maintenance_test_with_predictions"
predictions.write.mode("overwrite").format("delta").save(f"Tables/{table_name}")
print(f"Spark dataframe saved to delta table: {table_name}")
```

## Step 6: View business intelligence via visualizations in Power BI

You can demonstrate the results in an offline format by using a Power BI dashboard.

:::image type="content" source="media/predictive-maintenance/predictive-maintenance-power-bi.png" alt-text="Screenshot of the data displayed as a Power BI dashboard.":::

The dashboard shows that `Tool_wear` and `Torque` create a noticeable boundary between failed and unfailed cases, as you expected from the earlier correlation analysis in step 2.

## Related content

- [Train and evaluate a text classification model](title-genre-classification.md)
- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)
