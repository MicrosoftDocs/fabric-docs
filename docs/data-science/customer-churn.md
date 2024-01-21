---
title: 'Tutorial: Create, evaluate, and score a churn prediction model'
description: This tutorial demonstrates a data science workflow with an end-to-end example of building a model to predict churn.
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 09/15/2023
#customer intent: As a data scientist, I want to build a machine learning model so I can predict customer churn.
---

# Tutorial: Create, evaluate, and score a churn prediction model

In this tutorial, you walk through an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow in [!INCLUDE [product-name](../includes/product-name.md)]. The scenario is to build a model to predict the churn rate for bank customers. The churn rate, also called the rate of attrition, is the rate at which customers stop doing business with the bank.

The main steps in this tutorial are:

> [!div class="checklist"]
>
> - Install custom libraries.
> - Load the data.
> - Understand and process the data through exploratory data analysis, and demonstrate the use of the Fabric Data Wrangler feature.
> - Train machine learning models by using scikit-learn and LightGBM, and track experiments by using MLflow and the Fabric autologging feature.
> - Evaluate and save the final machine learning model.
> - Demonstrate the model's performance via visualizations in Power BI.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

- If you don't have a Microsoft Fabric lakehouse, create one by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Follow along in a notebook

You can follow along in a notebook in one of two ways:

- Open and run the built-in notebook in the Synapse Data Science experience.
- Upload your notebook from GitHub to the Synapse Data Science experience.

### Open the built-in notebook

**Customer churn** is the sample notebook that accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

[AIsample - Bank Customer Churn.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Bank%20Customer%20Churn.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Bank%20Customer%20Churn.ipynb -->

## Step 1: Install custom libraries

When you're developing a machine learning model or doing ad hoc data analysis, you might need to quickly install a custom library for your Apache Spark session. To do so, use `%pip install` or `%conda install`.
Alternatively, you can install the required libraries in the workspace by browsing to **Library management** in the workspace settings.

Here, you use `%pip install` to install `imblearn`.

> [!NOTE]
> The PySpark kernel restarts after you use `%pip install`. Install libraries before you run any other cells.

```python
# Use pip to install libraries
%pip install imblearn
```

## Step 2: Load the data

The dataset in *churn.csv* contains a churn status of 10,000 customers, along with 14 attributes that include:

- Credit score
- Geographical location (Germany, France, Spain)
- Gender (male, female)
- Age
- Tenure (years of being the bank's customer)
- Account balance
- Estimated salary
- Number of products that the customer purchased through the bank
- Credit card status (whether the customer has a credit card or not)
- Active member status (whether the person is an active bank customer or not)

The dataset also includes columns that should have no impact on the customer's decision to leave the bank. These columns include row number, customer ID, and customer surname.

The event that defines the customer's churn is the closing of the customer's bank account. The column `Exited` in the dataset refers to the customer's abandonment. Because you don't have much context for these attributes, you can proceed without having background information about the dataset. Your aim is to understand how these attributes contribute to the `Exited` status.

Out of the 10,000 customers, only 2,037 customers (around 20%) left the bank. Because of the class imbalance ratio, we recommend generating synthetic data. Moreover, the accuracy of a confusion matrix might not be meaningful for imbalanced classification. It might be better to also measure the accuracy by using the Area Under the Precision-Recall Curve (AUPRC) metric.

|CustomerID|Surname|CreditScore|Geography|Gender|Age|Tenure|Balance|NumOfProducts|HasCrCard|IsActiveMember|EstimatedSalary|Exited|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|15634602|Hargrave|619|France|Female|42|2|0.00|1|1|1|101348.88|1|
|15647311|Hill|608|Spain|Female|41|1|83807.86|1|0|1|112542.58|0|

### Download the dataset and upload to the lakehouse

Define the following parameters so that you can use this notebook with different datasets:

```python
IS_CUSTOM_DATA = False  # If TRUE, the dataset has to be uploaded manually

IS_SAMPLE = False  # If TRUE, use only SAMPLE_ROWS of data for training; otherwise, use all data
SAMPLE_ROWS = 5000  # If IS_SAMPLE is True, use only this number of rows for training

DATA_ROOT = "/lakehouse/default"
DATA_FOLDER = "Files/churn"  # Folder with data files
DATA_FILE = "churn.csv"  # Data file name
```

The following code downloads a publicly available version of the dataset and then stores it in a Fabric lakehouse.

> [!IMPORTANT]
> Be sure to [add a lakehouse](https://aka.ms/fabric/addlakehouse) to the notebook before you run it. If you don't, you'll get an error.

```python
import os, requests
if not IS_CUSTOM_DATA:
# Using an Azure Synapse Analytics blob, this can be done in one line

# Download demo data files into the lakehouse if they don't exist
    remote_url = "https://synapseaisolutionsa.blob.core.windows.net/public/bankcustomerchurn"
    file_list = ["churn.csv"]
    download_path = "/lakehouse/default/Files/churn/raw"

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

Start recording the time that it takes to run this notebook:

```python
# Record the notebook running time
import time

ts = time.time()
```

### Read raw data from the lakehouse

The following code reads raw data from the **Files** section of the lakehouse and adds columns for date parts. You'll use the same information to create a partitioned delta table.

```python
df = (
    spark.read.option("header", True)
    .option("inferSchema", True)
    .csv("Files/churn/raw/churn.csv")
    .cache()
)
```

### Create a pandas DataFrame from the dataset

This code converts the Spark DataFrame to a pandas DataFrame for easier processing and visualization:

```python
df = df.toPandas()
```

## Step 3: Perform exploratory data analysis

### Display raw data

Explore the raw data by using `display`, do some basic statistics, and show chart views. You first need to import required libraries for data visualization, such as [seaborn](https://seaborn.pydata.org/). Seaborn is a Python data visualization library to provide a high-level interface for building visuals on DataFrames and arrays.

```python
import seaborn as sns
sns.set_theme(style="whitegrid", palette="tab10", rc = {'figure.figsize':(9,6)})
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
from matplotlib import rc, rcParams
import numpy as np
import pandas as pd
import itertools
```

```python
display(df, summary=True)
```

### Use Data Wrangler to perform initial data cleaning

Open Data Wrangler directly from the notebook to explore and transform any pandas DataFrame. On the notebook ribbon's **Data** tab, use the Data Wrangler dropdown prompt to browse through the activated pandas DataFrames that are available for editing. Select the one that you want to open in Data Wrangler.

> [!NOTE]
> You can't open Data Wrangler while the notebook kernel is busy. The cell execution must finish before you open Data Wrangler. [Learn more about Data Wrangler](https://aka.ms/fabric/datawrangler).

:::image type="content" source="./media/tutorial-bank-churn/select-data-wrangler.png" alt-text="Screenshot that shows where to access Data Wrangler.":::

After you open Data Wrangler, it displays a descriptive overview of the data panel (as shown in the following images). The overview includes information about the DataFrame's dimension, missing values, and more. You can use Data Wrangler to generate the script for dropping the rows that have missing values, the duplicate rows, and the columns that have specific names, and then copy the script into a cell. The next cell shows that copied script.

:::image type="content" source="./media/tutorial-bank-churn/menu-data-wrangler.png" alt-text="Screenshot that shows the Data Wrangler menu.":::

:::image type="content" source="./media/tutorial-bank-churn/missing-data-data-wrangler.png" alt-text="Screenshot that shows missing data in Data Wrangler.":::

```python
def clean_data(df):
    # Drop rows with missing data across all columns
    df.dropna(inplace=True)
    # Drop duplicate rows in columns: 'RowNumber', 'CustomerId'
    df.drop_duplicates(subset=['RowNumber', 'CustomerId'], inplace=True)
    # Drop columns: 'RowNumber', 'CustomerId', 'Surname'
    df.drop(columns=['RowNumber', 'CustomerId', 'Surname'], inplace=True)
    return df

df_clean = clean_data(df.copy())
```

### Determine attributes

Use this code to determine categorical, numerical, and target attributes:

```python
# Determine the dependent (target) attribute
dependent_variable_name = "Exited"
print(dependent_variable_name)
# Determine the categorical attributes
categorical_variables = [col for col in df_clean.columns if col in "O"
                        or df_clean[col].nunique() <=5
                        and col not in "Exited"]
print(categorical_variables)
# Determine the numerical attributes
numeric_variables = [col for col in df_clean.columns if df_clean[col].dtype != "object"
                        and df_clean[col].nunique() >5]
print(numeric_variables)
```

### Show the five-number summary

Show the five-number summary (minimum score, first quartile, median, third quartile, and maximum score) for the numerical attributes by using box plots:

```python
df_num_cols = df_clean[numeric_variables]
sns.set(font_scale = 0.7) 
fig, axes = plt.subplots(nrows = 2, ncols = 3, gridspec_kw =  dict(hspace=0.3), figsize = (17,8))
fig.tight_layout()
for ax,col in zip(axes.flatten(), df_num_cols.columns):
    sns.boxplot(x = df_num_cols[col], color='green', ax = ax)
# fig.suptitle('visualize and compare the distribution and central tendency of numerical attributes', color = 'k', fontsize = 12)
fig.delaxes(axes[1,2])
```

:::image type="content" source="media/tutorial-bank-churn/box-plots.jpg" alt-text="Screenshot that shows a notebook display of the box plot for numerical attributes.":::

### Show the distribution of exited and non-exited customers

Show the distribution of exited versus non-exited customers across the categorical attributes:

```python
attr_list = ['Geography', 'Gender', 'HasCrCard', 'IsActiveMember', 'NumOfProducts', 'Tenure']
fig, axarr = plt.subplots(2, 3, figsize=(15, 4))
for ind, item in enumerate (attr_list):
    sns.countplot(x = item, hue = 'Exited', data = df_clean, ax = axarr[ind%2][ind//2])
fig.subplots_adjust(hspace=0.7)
```

:::image type="content" source="media/tutorial-bank-churn/bar-charts.jpg" alt-text="Notebook display of the distribution of exited versus non-exited customers.":::

### Show the distribution of numerical attributes

Show the frequency distribution of numerical attributes by using a histogram:

```python
columns = df_num_cols.columns[: len(df_num_cols.columns)]
fig = plt.figure()
fig.set_size_inches(18, 8)
length = len(columns)
for i,j in itertools.zip_longest(columns, range(length)):
    plt.subplot((length // 2), 3, j+1)
    plt.subplots_adjust(wspace = 0.2, hspace = 0.5)
    df_num_cols[i].hist(bins = 20, edgecolor = 'black')
    plt.title(i)
# fig = fig.suptitle('distribution of numerical attributes', color = 'r' ,fontsize = 14)
plt.show()
```

:::image type="content" source="media/tutorial-bank-churn/numerical-attributes.jpg" alt-text="Screenshot that shows a notebook display of numerical attributes.":::

### Perform feature engineering

The following feature engineering generates new attributes based on current attributes:

```python
df_clean["NewTenure"] = df_clean["Tenure"]/df_clean["Age"]
df_clean["NewCreditsScore"] = pd.qcut(df_clean['CreditScore'], 6, labels = [1, 2, 3, 4, 5, 6])
df_clean["NewAgeScore"] = pd.qcut(df_clean['Age'], 8, labels = [1, 2, 3, 4, 5, 6, 7, 8])
df_clean["NewBalanceScore"] = pd.qcut(df_clean['Balance'].rank(method="first"), 5, labels = [1, 2, 3, 4, 5])
df_clean["NewEstSalaryScore"] = pd.qcut(df_clean['EstimatedSalary'], 10, labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
```

### Use Data Wrangler to perform one-hot encoding

By following the same instructions discussed earlier to open Data Wrangler, use Data Wrangler to perform one-hot encoding. The next cell shows the copied generated script for one-hot encoding.

:::image type="content" source="./media/tutorial-bank-churn/1-hot-encoding-data-wrangler.png" alt-text="Screenshot that shows one-hot encoding in Data Wrangler.":::

:::image type="content" source="./media/tutorial-bank-churn/1-hot-encoding-select-columns-data-wrangler.png" alt-text="Screenshot that shows the selection of columns in Data Wrangler.":::

```python
df_clean = pd.get_dummies(df_clean, columns=['Geography', 'Gender'])
```

### Create a delta table to generate the Power BI report

```python
table_name = "df_clean"
# Create a PySpark DataFrame from pandas
sparkDF=spark.createDataFrame(df_clean) 
sparkDF.write.mode("overwrite").format("delta").save(f"Tables/{table_name}")
print(f"Spark DataFrame saved to delta table: {table_name}")
```

### Summary of observations from the exploratory data analysis

- Most of the customers are from France. Spain has the lowest churn rate, compared to France and Germany.
- Most of the customers have credit cards.
- There are customers whose ages are above 60 and whose credit scores are below 400, but they can't be considered outliers.
- Very few customers have more than two of the bank's products.
- Customers who aren't active have a higher churn rate.
- Gender and tenure years don't seem to have an impact on a customer's decision to close a bank account.

## Step 4: Perform model training and tracking

With your data in place, you can now define the model. You'll apply random forest and LightGBM models in this notebook.

Use scikit-learn and LightGBM to implement the models within a few lines of code. Also use MLflow and Fabric autologging to track the experiments.

First, load the delta table from the lakehouse. You can use other delta tables that consider the lakehouse as the source.

```python
SEED = 12345
df_clean = spark.read.format("delta").load("Tables/df_clean").toPandas()
```

### Generate an experiment for tracking and logging the models by using MLflow

This section demonstrates how to generate an experiment, specify model and training parameters, specify scoring metrics, train and log the models, and save the trained models for later use.

```python
import mlflow

# Set up the experiment name
EXPERIMENT_NAME = "sample-bank-churn-experiment"  # MLflow experiment name
```

Autologging works by automatically capturing the values of input parameters and output metrics of a machine learning model as it's being trained. This information is then logged to your workspace, where you can access and visualize it by using the MLflow APIs or the corresponding experiment in your workspace.

When your experiment is complete, it looks like the following image. All the experiments with their respective names are logged, and you can track their parameters and performance metrics.

:::image type="content" source="./media/tutorial-bank-churn/experiment-runs.png" alt-text="Screenshot that shows the experiment page for the bank churn experiment.":::

To learn more about  autologging, see [Autologging in Microsoft Fabric](https://aka.ms/fabric-autologging).

### Set experiment and autologging specifications

```python
mlflow.set_experiment(EXPERIMENT_NAME) # Use a date stamp to append to the experiment
mlflow.autolog(exclusive=False)
```

### Import scikit-learn and LightGBM

```python
# Import the required libraries for model training
from sklearn.model_selection import train_test_split
from lightgbm import LGBMClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, precision_score, confusion_matrix, recall_score, roc_auc_score, classification_report
```

### Prepare training and testing datasets

```python
y = df_clean["Exited"]
X = df_clean.drop("Exited",axis=1)
# Train/test separation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=SEED)
```

### Apply SMOTE to the training data

The problem with imbalanced classification is that there are too few examples of the minority class for a model to effectively learn the decision boundary. Synthetic Minority Oversampling Technique (SMOTE) is the most widely used approach to synthesize new samples for the minority class. You can access SMOTE by using the `imblearn` library that you installed in step 1.

Apply SMOTE to only the training dataset. Leave the testing dataset in its original imbalanced distribution, so you can get a valid approximation of how the model will perform on the original data. This experiment represents the situation in production.

```python
from collections import Counter
from imblearn.over_sampling import SMOTE

sm = SMOTE(random_state=SEED)
X_res, y_res = sm.fit_resample(X_train, y_train)
new_train = pd.concat([X_res, y_res], axis=1)
```

For more information, see [SMOTE](https://imbalanced-learn.org/stable/references/generated/imblearn.over_sampling.SMOTE.html#) and [From random over-sampling to SMOTE and ADASYN](https://imbalanced-learn.org/stable/over_sampling.html#smote-adasyn) on the imbalanced-learn website.

### Train the model

Train the model by using random forest with a maximum depth of four and with four features:

```python
mlflow.sklearn.autolog(registered_model_name='rfc1_sm')  # Register the trained model with autologging
rfc1_sm = RandomForestClassifier(max_depth=4, max_features=4, min_samples_split=3, random_state=1) # Pass hyperparameters
with mlflow.start_run(run_name="rfc1_sm") as run:
    rfc1_sm_run_id = run.info.run_id # Capture run_id for model prediction later
    print("run_id: {}; status: {}".format(rfc1_sm_run_id, run.info.status))
    # rfc1.fit(X_train,y_train) # Imbalanaced training data
    rfc1_sm.fit(X_res, y_res.ravel()) # Balanced training data
    rfc1_sm.score(X_test, y_test)
    y_pred = rfc1_sm.predict(X_test)
    cr_rfc1_sm = classification_report(y_test, y_pred)
    cm_rfc1_sm = confusion_matrix(y_test, y_pred)
    roc_auc_rfc1_sm = roc_auc_score(y_res, rfc1_sm.predict_proba(X_res)[:, 1])
```

Train the model by using random forest with a maximum depth of eight and with six features:

```python
mlflow.sklearn.autolog(registered_model_name='rfc2_sm')  # Register the trained model with autologging
rfc2_sm = RandomForestClassifier(max_depth=8, max_features=6, min_samples_split=3, random_state=1) # Pass hyperparameters
with mlflow.start_run(run_name="rfc2_sm") as run:
    rfc2_sm_run_id = run.info.run_id # Capture run_id for model prediction later
    print("run_id: {}; status: {}".format(rfc2_sm_run_id, run.info.status))
    # rfc2.fit(X_train,y_train) # Imbalanced training data
    rfc2_sm.fit(X_res, y_res.ravel()) # Balanced training data
    rfc2_sm.score(X_test, y_test)
    y_pred = rfc2_sm.predict(X_test)
    cr_rfc2_sm = classification_report(y_test, y_pred)
    cm_rfc2_sm = confusion_matrix(y_test, y_pred)
    roc_auc_rfc2_sm = roc_auc_score(y_res, rfc2_sm.predict_proba(X_res)[:, 1])
```

Train the model by using LightGBM:

```python
# lgbm_model
mlflow.lightgbm.autolog(registered_model_name='lgbm_sm')  # Register the trained model with autologging
lgbm_sm_model = LGBMClassifier(learning_rate = 0.07, 
                        max_delta_step = 2, 
                        n_estimators = 100,
                        max_depth = 10, 
                        eval_metric = "logloss", 
                        objective='binary', 
                        random_state=42)

with mlflow.start_run(run_name="lgbm_sm") as run:
    lgbm1_sm_run_id = run.info.run_id # Capture run_id for model prediction later
    # lgbm_sm_model.fit(X_train,y_train) # Imbalanced training data
    lgbm_sm_model.fit(X_res, y_res.ravel()) # Balanced training data
    y_pred = lgbm_sm_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    cr_lgbm_sm = classification_report(y_test, y_pred)
    cm_lgbm_sm = confusion_matrix(y_test, y_pred)
    roc_auc_lgbm_sm = roc_auc_score(y_res, lgbm_sm_model.predict_proba(X_res)[:, 1])
```

### View the experiment artifact for tracking model performance

The experiment runs are automatically saved in the experiment artifact that you can find in the workspace. They're named based on the name that you used for setting the experiment. All of the trained models, their runs, performance metrics, and model parameters are logged on the experiment page.

To view your experiments:

1. On the left panel, select your workspace.
1. Find and select the experiment name. In this case, it's **sample-bank-churn-experiment**.

:::image type="content" source="./media/tutorial-bank-churn/experiment-runs-expanded.png" alt-text="Screenshot that shows logged values for one of the models.":::

## Step 5: Evaluate and save the final machine learning model

Open the saved experiment from the workspace to select and save the best model:

```python
# Define run_uri to fetch the model
# MLflow client: mlflow.model.url, list model
load_model_rfc1_sm = mlflow.sklearn.load_model(f"runs:/{rfc1_sm_run_id}/model")
load_model_rfc2_sm = mlflow.sklearn.load_model(f"runs:/{rfc2_sm_run_id}/model")
load_model_lgbm1_sm = mlflow.lightgbm.load_model(f"runs:/{lgbm1_sm_run_id}/model")
```

### Assess the performance of the saved models on the testing dataset

```python
ypred_rfc1_sm = load_model_rfc1_sm.predict(X_test) # Random forest with maximum depth of 4 and 4 features
ypred_rfc2_sm = load_model_rfc2_sm.predict(X_test) # Random forest with maximum depth of 8 and 6 features
ypred_lgbm1_sm = load_model_lgbm1_sm.predict(X_test) # LightGBM
```

### Show true/false positives/negatives by using a confusion matrix

Develop a script to plot a confusion matrix so you can evaluate the accuracy of the classification. You can also plot a confusion matrix by using SynapseML tools, as shown in the [fraud detection sample](https://aka.ms/samples/frauddectection).

```python
def plot_confusion_matrix(cm, classes,
                          normalize=False,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues):
    print(cm)
    plt.figure(figsize=(4,4))
    plt.rcParams.update({'font.size': 10})
    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45, color="blue")
    plt.yticks(tick_marks, classes, color="blue")

    fmt = '.2f' if normalize else 'd'
    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, format(cm[i, j], fmt),
                 horizontalalignment="center",
                 color="red" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')
```

Create a confusion matrix for the random forest classifier with a maximum depth of four and with four features:

```python
cfm = confusion_matrix(y_test, y_pred=ypred_rfc1_sm)
plot_confusion_matrix(cfm, classes=['Non Churn','Churn'],
                      title='Random Forest with max depth of 4')
tn, fp, fn, tp = cfm.ravel()
```

:::image type="content" source="media/tutorial-bank-churn/confusion-random-forest-depth-4.jpg" alt-text="Screenshot that shows a notebook display of a confusion matrix for random forest with a maximum depth of four.":::

Create a confusion matrix for the random forest classifier with maximum depth of eight and with six features:

```python
cfm = confusion_matrix(y_test, y_pred=ypred_rfc2_sm)
plot_confusion_matrix(cfm, classes=['Non Churn','Churn'],
                      title='Random Forest with max depth of 8')
tn, fp, fn, tp = cfm.ravel()
```

:::image type="content" source="media/tutorial-bank-churn/confusion-random-forest-depth-8.jpg" alt-text="Screenshot that shows a notebook display of a confusion matrix for random forest with a maximum depth of eight.":::

Create a confusion matrix for LightGBM:

```python
cfm = confusion_matrix(y_test, y_pred=ypred_lgbm1_sm)
plot_confusion_matrix(cfm, classes=['Non Churn','Churn'],
                      title='LightGBM')
tn, fp, fn, tp = cfm.ravel()
```

:::image type="content" source="media/tutorial-bank-churn/confusion-lgbm.jpg" alt-text="Screenshot that shows a notebook display of a confusion matrix for LightGBM.":::

### Save results for Power BI

Move model prediction results to Power BI visualization by saving the delta frame to the lakehouse:

```python
df_pred = X_test.copy()
df_pred['y_test'] = y_test
df_pred['ypred_rfc1_sm'] = ypred_rfc1_sm
df_pred['ypred_rfc2_sm'] =ypred_rfc2_sm
df_pred['ypred_lgbm1_sm'] = ypred_lgbm1_sm
table_name = "df_pred_results"
sparkDF=spark.createDataFrame(df_pred)
sparkDF.write.mode("overwrite").format("delta").option("overwriteSchema", "true").save(f"Tables/{table_name}")
print(f"Spark DataFrame saved to delta table: {table_name}")
```

## Step 6: Access visualizations in Power BI

Use these steps to access your saved table in Power BI:

1. On the left, select **OneLake data hub**.
1. Select the lakehouse that you added to this notebook.
1. In the **Open this Lakehouse** section, select **Open**.
1. On the ribbon, select **New semantic model**. Select `df_pred_results`, and then select **Continue** to create a new Power BI semantic model that's linked to the predictions.
1. On the tools at the top of the semantic model's page, select **New report** to open the Power BI report authoring page.

The following screenshot shows some example visualizations. The data panel shows the delta tables and columns to select from a table. After you select an appropriate category (x) axis and value (y) axis, you can choose the filters and functions. For example, you can choose a sum or average of the table column.

> [!NOTE]
> The screenshot is an illustrated example of how you would analyze the saved prediction results in Power BI. For a real use case of customer churn, the platform users might have to do more thorough ideation of what visualizations to create, based on subject matter expertise and what their organization and business analytics team have standardized as metrics.

:::image type="content" source="./media/tutorial-bank-churn/power-bi-dashboard.png" alt-text="Screenshot that shows a Power BI dashboard example.":::

The Power BI report shows that customers who use more than two of the bank products have a higher churn rate, although few customers had more than two products. (See the plot in the lower-left panel.) The bank should collect more data but also investigate other features that correlate with more products.

Bank customers in Germany have a higher churn rate than customers in France and Spain. (See the plot in the lower-right panel.) This result suggests that an investigation into what encouraged customers to leave could be beneficial.

There are more middle-aged customers (between 25 and 45). Customers between 45 and 60 tend to exit more.

Finally, customers who have lower credit scores would most likely leave the bank for other financial institutions. The bank should look into ways to encourage customers who have lower credit scores and account balances to stay with the bank.

```python
# Determine the entire runtime
print(f"Full run cost {int(time.time() - ts)} seconds.")
```

<!-- nbend -->

## Related content

- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)
