---
title: "Tutorial: Create, evaluate, and score a churn prediction model"
description: This tutorial demonstrates a data science work flow with an end-to-end example, building a model to predict churn. 
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.date: 09/15/2023
# customer intent: As a data scientist, I want to create a model to predict churn.
---

# Tutorial: Create, evaluate, and score a churn prediction model

In this tutorial, you'll see a Microsoft Fabric data science workflow with an end-to-end example. The scenario is to build a model to predict whether bank customers would churn or not. The churn rate, also known as the rate of attrition refers to the rate at which bank customers stop doing business with the bank.



The main steps in this tutorial are

> [!div class="checklist"]
>
> - Install custom libraries
> - Load the data
> - Understand and process the data through exploratory data analysis and demonstrate the use of Fabric Data Wrangler feature
> - Train machine learning models using `Scikit-Learn` and `LightGBM`, and track experiments using MLflow and Fabric Autologging feature
> - Evaluate and save the final machine learning model
> - Demonstrate the model performance via visualizations in Power BI

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* If you don't have a Microsoft Fabric lakehouse, create one by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Follow along in notebook

 [AIsample - Bank Customer Churn.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Bank%20Customer%20Churn.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along](./includes/follow-along.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Bank%20Customer%20Churn.ipynb -->


## Step 1: Install custom libraries


When developing a machine learning model or doing ad-hoc data analysis, you may need to quickly install a custom library for your Apache Spark session. To do so, use `%pip install` or `%conda install`.
Alternatively, you could install the required libraries into the workspace, by navigating into the workspace setting to find Library management.

Here, you'll use `%pip install` to install `imblearn`. 

> [!NOTE]
> The PySpark kernel will restart after `%pip install`.  Install libraries before you run any other cells.

```python
# Use pip to install libraries
%pip install imblearn
```

## Step 2: Load the data

The dataset contains churn status of 10,000 customers along with 14 attributes that include credit score, geographical location (Germany, France, Spain), gender (male, female), age, tenure (years of being bank's customer), account balance, estimated salary, number of products that a customer has purchased through the bank, credit card status (whether a customer has a credit card or not), and active member status (whether an active bank's customer or not).

The dataset also includes columns such as row number, customer ID, and customer surname that should have no impact on customer's decision to leave the bank. The event that defines the customer's churn is the closing of the customer's bank account, therefore, the column `exit` in the dataset refers to customer's abandonment. Since you don't have much context about these attributes, you'll proceed without having background information about the dataset. Your aim is to understand how these attributes contribute to the `exit` status.

Out of the 10,000 customers, only 2037 customers (around 20%) have left the bank. Therefore, given the class imbalance ratio, we recommend generating synthetic data. Moreover, confusion matrix accuracy may not be meaningful for imbalanced classification and it might be better to also measure the accuracy using the Area Under the Precision-Recall Curve (AUPRC). 

- churn.csv

|"CustomerID"|"Surname"|"CreditScore"|"Geography"|"Gender"|"Age"|"Tenure"|"Balance"|"NumOfProducts"|"HasCrCard"|"IsActiveMember"|"EstimatedSalary"|"Exited"|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|15634602|Hargrave|619|France|Female|42|2|0.00|1|1|1|101348.88|1|
|15647311|Hill|608|Spain|Female|41|1|83807.86|1|0|1|112542.58|0|




### Introduction to SMOTE

The problem with imbalanced classification is that there are too few examples of the minority class for a model to effectively learn the decision boundary. Synthetic Minority Oversampling Technique (SMOTE) is the most widely used approach to synthesize new samples for the minority class. For more information, see [SMOTE](https://imbalanced-learn.org/stable/references/generated/imblearn.over_sampling.SMOTE.html#) and [From random over-sampling to SMOTE and ADASYN](https://imbalanced-learn.org/stable/over_sampling.html#smote-adasyn).

You will be able to access SMOTE using the `imblearn` library that you installed in Step 1.


#### Download dataset and upload to lakehouse


> [!TIP]
> By defining the following parameters, you can use this notebook with different datasets easily.



```python
IS_CUSTOM_DATA = False  # if TRUE, dataset has to be uploaded manually

IS_SAMPLE = False  # if TRUE, use only SAMPLE_ROWS of data for training, otherwise use all data
SAMPLE_ROWS = 5000  # if IS_SAMPLE is True, use only this number of rows for training

DATA_ROOT = "/lakehouse/default"
DATA_FOLDER = "Files/churn"  # folder with data files
DATA_FILE = "churn.csv"  # data file name
```

This code downloads a publicly available version of the dataset and then stores it in a Fabric lakehouse.

> [!IMPORTANT]
> **Make sure you [add a lakehouse](https://aka.ms/fabric/addlakehouse) to the notebook before running it. Failure to do so will result in an error.**


```python
import os, requests
if not IS_CUSTOM_DATA:
# Using synapse blob, this can be done in one line

# Download demo data files into lakehouse if not exist
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

Start recording the time it takes to run this notebook.


```python
# Record the notebook running time
import time

ts = time.time()
```

### Read raw data from the lakehouse

Reads raw data from the **Files** section of the lakehouse, adds additional columns for different date parts and the same information will be used to create partitioned delta table.


```python
df = (
    spark.read.option("header", True)
    .option("inferSchema", True)
    .csv("Files/churn/raw/churn.csv")
    .cache()
)
```

### Create a pandas dataframe from the dataset

This code converts the spark DataFrame to pandas DataFrame for easier processing and visualization.


```python
df = df.toPandas()
```

## Step 3: Exploratory Data Analysis

### Display raw data

Explore the raw data with `display`, do some basic statistics and show chart views. You first need to import required libraries for data visualization such as `seaborn` which is a Python data visualization library to provide a high-level interface for building visuals on dataframes and arrays. Learn more about [`seaborn`](https://seaborn.pydata.org/). 


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

### Use Data Wrangler to perform initial data cleansing

Launch Data Wrangler directly from the notebook to explore and transform any pandas dataframe. Under the notebook ribbon **Data** tab, you can use the Data Wrangler dropdown prompt to browse the activated pandas DataFrames available for editing and select the one you wish to open in Data Wrangler.

>[!NOTE]
>Data Wrangler can not be opened while the notebook kernel is busy. The cell execution must complete prior to launching Data Wrangler. [Learn more about Data Wrangler](https://aka.ms/fabric/datawrangler).

:::image type="content" source="./media/tutorial-bank-churn/select-data-wrangler.png" alt-text="Screenshot shows where to access the Data Wrangler.":::

Once the Data Wrangler is launched, a descriptive overview of the displayed data panel is generated as shown in the following images. It includes information about the DataFrame's dimension, missing values, etc. You can then use Data Wrangler to generate the script for dropping the rows with missing values, the duplicate rows and the columns with specific names, then copy the script into a cell.  The next cell shows that copied script.


:::image type="content" source="./media/tutorial-bank-churn/menu-data-wrangler.png" alt-text="Screenshot shows Data Wrangler menu."::: 
:::image type="content" source="./media/tutorial-bank-churn/missing-data-data-wrangler.png" alt-text="Screenshot shows Data Wrangler missing data display.":::




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

Use this code to determine categorical, numerical, and target attributes.


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

### The five-number summary 

Show the five-number summary (the minimum score, first quartile, median, third quartile, the maximum score) for the numerical attributes using box plots.


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
:::image type="content" source="media/tutorial-bank-churn/box-plots.jpg" alt-text="Notebook display of the boxplot for numerical attributes.":::

### Distribution of exited and non-exited customers 

Show the distribution of exited versus non-exited customers across the categorical attributes.


```python
attr_list = ['Geography', 'Gender', 'HasCrCard', 'IsActiveMember', 'NumOfProducts', 'Tenure']
fig, axarr = plt.subplots(2, 3, figsize=(15, 4))
for ind, item in enumerate (attr_list):
    sns.countplot(x = item, hue = 'Exited', data = df_clean, ax = axarr[ind%2][ind//2])
fig.subplots_adjust(hspace=0.7)
```
:::image type="content" source="media/tutorial-bank-churn/bar-charts.jpg" alt-text="Notebook display of the distribution of exited versus non-exited customers.":::


### Distribution of numerical attributes

Show the frequency distribution of numerical attributes using histogram.



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

:::image type="content" source="media/tutorial-bank-churn/numerical-attributes.jpg" alt-text="Notebook display of numerical attributes.":::

### Perform feature engineering 

The following feature engineering generates new attributes based on current attributes.


```python
df_clean["NewTenure"] = df_clean["Tenure"]/df_clean["Age"]
df_clean["NewCreditsScore"] = pd.qcut(df_clean['CreditScore'], 6, labels = [1, 2, 3, 4, 5, 6])
df_clean["NewAgeScore"] = pd.qcut(df_clean['Age'], 8, labels = [1, 2, 3, 4, 5, 6, 7, 8])
df_clean["NewBalanceScore"] = pd.qcut(df_clean['Balance'].rank(method="first"), 5, labels = [1, 2, 3, 4, 5])
df_clean["NewEstSalaryScore"] = pd.qcut(df_clean['EstimatedSalary'], 10, labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
```

### Use Data Wrangler to perform one-hot encoding

Following the same instructions discussed earlier to launch Data Wrangler, use the Data Wrangler to perform one-hot encoding. The next cell shows the copied  generated script for one-hot encoding.

:::image type="content" source="./media/tutorial-bank-churn/1-hot-encoding-data-wrangler.png" alt-text="Screenshot shows one-hot encoding in the Data Wrangler."::: 
:::image type="content" source="./media/tutorial-bank-churn/1-hot-encoding-select-columns-data-wrangler.png" alt-text="Screenshot shows selection of columns in the Data Wrangler.":::






```python
df_clean = pd.get_dummies(df_clean, columns=['Geography', 'Gender'])
```

### Create a delta table to generate the Power BI report


```python
table_name = "df_clean"
# Create PySpark DataFrame from Pandas
sparkDF=spark.createDataFrame(df_clean) 
sparkDF.write.mode("overwrite").format("delta").save(f"Tables/{table_name}")
print(f"Spark dataframe saved to delta table: {table_name}")
```

### Summary of observations from the exploratory data analysis

- Most of the customers are from France comparing to Spain and Germany, while Spain has the lower churn rate comparing to France and Germany.
- Most of the customers have credit cards.
- There are customers whose age and credit score are above 60 and below 400, respectively, but they can't be considered as outliers.
- Very few customers have more than two of the bank's products.
- Customers who aren't active have a higher churn rate.
- Gender and tenure years don't seem to have an impact on customer's decision to close the bank account.

## Step 4: Model training and tracking


With your data in place, you can now define the model. You'll apply Random Forrest and LightGBM models in this notebook. 

Use `scikit-learn` and `lightgbm` to implement the models within a few lines of code. Also use MLfLow and Fabric Autologging to track the experiments.

Here you'll load the delta table from the lakehouse. You may use other delta tables considering the lakehouse as the source.


```python
SEED = 12345
df_clean = spark.read.format("delta").load("Tables/df_clean").toPandas()
```

### Generate experiment for tracking and logging the models using MLflow

This section demonstrates how to generate an experiment, specify model and training parameters as well as scoring metrics, train the models, log them, and save the trained models for later use.


```python
import mlflow

# Set up experiment name
EXPERIMENT_NAME = "sample-bank-churn-experiment"  # Mlflow experiment name
```

Extending the MLflow autologging capabilities, autologging works by automatically capturing the values of input parameters and output metrics of a machine learning model as it is being trained. This information is then logged to your workspace, where it can be accessed and visualized using the MLflow APIs or the corresponding experiment in your workspace. 

When complete, your experiment will look like this image. All the experiments with their respective names are logged and you'll be able to track their parameters and performance metrics. To learn more about  autologging, see  [Autologging in Microsoft Fabric](https://aka.ms/fabric-autologging).

:::image type="content" source="./media/tutorial-bank-churn/experiment-runs.png" alt-text="Screenshot shows the experiment page for the bank-churn-experiment.":::

### Set experiment and autologging specifications


```python
mlflow.set_experiment(EXPERIMENT_NAME) # Use date stamp to append to experiment
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

### Prepare training and test datasets


```python
y = df_clean["Exited"]
X = df_clean.drop("Exited",axis=1)
# Train-Test Separation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=SEED)
```

### Apply SMOTE to the training data to synthesize new samples for the minority class

SMOTE should only be applied to the training dataset. You must leave the test dataset in its original imbalanced distribution in order to get a valid approximation of how the model will perform on the original data, which is representing the situation in production.


```python
from collections import Counter
from imblearn.over_sampling import SMOTE

sm = SMOTE(random_state=SEED)
X_res, y_res = sm.fit_resample(X_train, y_train)
new_train = pd.concat([X_res, y_res], axis=1)
```

### Model training

Train the model using Random Forest with maximum depth of four, with four features.


```python
mlflow.sklearn.autolog(registered_model_name='rfc1_sm')  # Register the trained model with autologging
rfc1_sm = RandomForestClassifier(max_depth=4, max_features=4, min_samples_split=3, random_state=1) # Pass hyperparameters
with mlflow.start_run(run_name="rfc1_sm") as run:
    rfc1_sm_run_id = run.info.run_id # Capture run_id for model prediction later
    print("run_id: {}; status: {}".format(rfc1_sm_run_id, run.info.status))
    # rfc1.fit(X_train,y_train) # imbalanaced training data
    rfc1_sm.fit(X_res, y_res.ravel()) # balanced training data
    rfc1_sm.score(X_test, y_test)
    y_pred = rfc1_sm.predict(X_test)
    cr_rfc1_sm = classification_report(y_test, y_pred)
    cm_rfc1_sm = confusion_matrix(y_test, y_pred)
    roc_auc_rfc1_sm = roc_auc_score(y_res, rfc1_sm.predict_proba(X_res)[:, 1])
```

Train the model using Random Forest with maximum depth of eight, with six features.


```python
mlflow.sklearn.autolog(registered_model_name='rfc2_sm')  # Register the trained model with autologging
rfc2_sm = RandomForestClassifier(max_depth=8, max_features=6, min_samples_split=3, random_state=1) # Pass hyperparameters
with mlflow.start_run(run_name="rfc2_sm") as run:
    rfc2_sm_run_id = run.info.run_id # Capture run_id for model prediction later
    print("run_id: {}; status: {}".format(rfc2_sm_run_id, run.info.status))
    # rfc2.fit(X_train,y_train) # imbalanced training data
    rfc2_sm.fit(X_res, y_res.ravel()) # balanced training data
    rfc2_sm.score(X_test, y_test)
    y_pred = rfc2_sm.predict(X_test)
    cr_rfc2_sm = classification_report(y_test, y_pred)
    cm_rfc2_sm = confusion_matrix(y_test, y_pred)
    roc_auc_rfc2_sm = roc_auc_score(y_res, rfc2_sm.predict_proba(X_res)[:, 1])
```

Train the model using LightGBM.


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
    # lgbm_sm_model.fit(X_train,y_train) # imbalanced training data
    lgbm_sm_model.fit(X_res, y_res.ravel()) # balanced training data
    y_pred = lgbm_sm_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    cr_lgbm_sm = classification_report(y_test, y_pred)
    cm_lgbm_sm = confusion_matrix(y_test, y_pred)
    roc_auc_lgbm_sm = roc_auc_score(y_res, lgbm_sm_model.predict_proba(X_res)[:, 1])
```

### Experiments artifact for tracking model performance

The experiment runs are automatically saved in the experiment artifact that can be found from the workspace. They're named based on the name used for setting the experiment. All of the trained models, their runs, performance metrics and model parameters are logged as can be seen from the experiment page shown in the image below.   

To view your experiments:
1. On the left panel, select your workspace.
1. Find and select the experiment name, in this case _sample-bank-churn-experiment_.

:::image type="content" source="./media/tutorial-bank-churn/experiment-runs-expanded.png" alt-text="Screenshot shows logged values for one of the models.":::

## Step 5: Evaluate and save the final machine learning model


Open the saved experiment from the workspace to select and save the best model.


```python
# Define run_uri to fetch the model
# mlflow client: mlflow.model.url, list model
load_model_rfc1_sm = mlflow.sklearn.load_model(f"runs:/{rfc1_sm_run_id}/model")
load_model_rfc2_sm = mlflow.sklearn.load_model(f"runs:/{rfc2_sm_run_id}/model")
load_model_lgbm1_sm = mlflow.lightgbm.load_model(f"runs:/{lgbm1_sm_run_id}/model")
```

### Assess the performances of the saved models on test dataset


```python
ypred_rfc1_sm = load_model_rfc1_sm.predict(X_test) # Random Forest with max depth of 4 and 4 features
ypred_rfc2_sm = load_model_rfc2_sm.predict(X_test) # Random Forest with max depth of 8 and 6 features
ypred_lgbm1_sm = load_model_lgbm1_sm.predict(X_test) # LightGBM
```

### Show True/False Positives/Negatives using the confusion matrix

Develop a script to plot the confusion matrix in order to evaluate the accuracy of the classification. You can also plot a confusion matrix using SynapseML tools, which is shown in the [Fraud Detection sample](https://aka.ms/samples/frauddectection).


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


Create a confusion matrix for Random Forest Classifier with maximum depth of four, with four features.



```python
cfm = confusion_matrix(y_test, y_pred=ypred_rfc1_sm)
plot_confusion_matrix(cfm, classes=['Non Churn','Churn'],
                      title='Random Forest with max depth of 4')
tn, fp, fn, tp = cfm.ravel()
```

:::image type="content" source="media/tutorial-bank-churn/confusion-random-forest-depth-4.jpg" alt-text="Notebook display of confusion matrix for Random Forest with max depth of four.":::

Create a confusion matrix for Random Forest Classifier with maximum depth of eight, with six features.


```python
cfm = confusion_matrix(y_test, y_pred=ypred_rfc2_sm)
plot_confusion_matrix(cfm, classes=['Non Churn','Churn'],
                      title='Random Forest with max depth of 8')
tn, fp, fn, tp = cfm.ravel()
```


:::image type="content" source="media/tutorial-bank-churn/confusion-random-forest-depth-8.jpg" alt-text="Notebook display of confusion matrix for Random Forest with max depth of eight.":::

Create the confusion matrix for LightGBM.


```python
cfm = confusion_matrix(y_test, y_pred=ypred_lgbm1_sm)
plot_confusion_matrix(cfm, classes=['Non Churn','Churn'],
                      title='LightGBM')
tn, fp, fn, tp = cfm.ravel()
```

:::image type="content" source="media/tutorial-bank-churn/confusion-lgbm.jpg" alt-text="Notebook display of confusion matrix for LightGBM.":::

### Save results for Power BI

Move model prediction results to Power BI Visualization by saving delta frame to lakehouse.


```python
df_pred = X_test.copy()
df_pred['y_test'] = y_test
df_pred['ypred_rfc1_sm'] = ypred_rfc1_sm
df_pred['ypred_rfc2_sm'] =ypred_rfc2_sm
df_pred['ypred_lgbm1_sm'] = ypred_lgbm1_sm
table_name = "df_pred_results"
sparkDF=spark.createDataFrame(df_pred)
sparkDF.write.mode("overwrite").format("delta").option("overwriteSchema", "true").save(f"Tables/{table_name}")
print(f"Spark dataframe saved to delta table: {table_name}")
```

## Step 6: Business Intelligence via Visualizations in Power BI

Use these steps to access your saved table in Power BI.

1. On the left, select **OneLake data hub**.
1. Select the lakehouse that you added to this notebook.
1. On the top right, select **Open** under the section titled **Open this Lakehouse**.
1. Select **New semantic model** on the top ribbon and select `df_pred_results`, then select **Continue** to create a new Power BI semantic model linked to the predictions.
1. On the tools at the top of the semantic model's page, select **New report** to open the Power BI report authoring page.

Some example visualizations are shown here. The data panel shows the delta tables and columns from the table to select. Upon selecting appropriate x and y axes, you can pick the filters and functions, for example, sum or average of the table column.

> [!NOTE]
> We show an illustrated example of how you would analyze the saved prediction results in Power BI. However, for a real customer churn use-case, the platform user may have to do more thorough ideation of what visualizations to create, based on subject matter expertise, and what their firm and business analytics team has standardized as metrics.

:::image type="content" source="./media/tutorial-bank-churn/power-bi-dashboard.png" alt-text="Screenshot shows a Power BI dashboard example.":::

The Power BI report shows that customers who use more than two of the bank products have a higher churn rate although few customers had more than two products. The bank should collect more data, but also investigate other features correlated with more products (see the plot in the bottom left panel).
Bank customers in Germany have a higher churn rate than in France and Spain (see the plot in the bottom right panel), which suggests that an investigation into what has encouraged customers to leave could be beneficial.
There are more middle aged customers (between 25-45) and customers between 45-60 tend to exit more.
Finally, customers with lower credit scores would most likely leave the bank for other financial institutes. The bank should look into ways that encourage customers with lower credit scores and account balances to stay with the bank.


```python
# Determine the entire runtime
print(f"Full run cost {int(time.time() - ts)} seconds.")
```

<!-- nbend -->

## Next steps

- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)


