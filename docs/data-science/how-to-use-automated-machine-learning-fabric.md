---
title: Create AutoML trials in Fabric
description: Learn how to use AutoML to easily fit models to  your data (preview)
ms.topic: how-to
reviewer: ssalgado
author: midesa
ms.author: midesa
ms.date: 12/19/2023
---

# Create models with Automated ML (preview)

Automated Machine Learning (AutoML) encompasses a set of techniques and tools designed to streamline the process of training and optimizing machine learning models with minimal human intervention. The primary objective of AutoML is to simplify and accelerate the selection of the most suitable machine learning model and hyperparameters for a given dataset, a task that typically demands considerable expertise and computational resources. Within the Fabric framework, data scientists can leverage the ```flaml.AutoML``` module to automate various aspects of their machine learning workflows.

In this article, we will delve into the process of generating AutoML trials directly from code using a Spark dataset. Additionally, we will explore methods for converting this data into a Pandas dataframe and discuss techniques for parallelizing your experimentation trials.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

* Create a new [Fabric environment](../data-engineering/create-and-use-environment.md) or ensure you are running on the Fabric Runtime 1.2 (Spark 3.4 (or higher) and Delta 2.4)
* Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks).
* Attach your notebook to a lakehouse. On the left side of your notebook, select **Add** to add an existing lakehouse or create a new one.

## Load and prepare data

In this section, we'll specify the download settings for the data and then save it to the lakehouse.

### Download data

This code block downloads the data from a remote source and saves it to the lakehouse

```python
import os
import requests

IS_CUSTOM_DATA = False  # if TRUE, dataset has to be uploaded manually

if not IS_CUSTOM_DATA:
    # Specify the remote URL where the data is hosted
    remote_url = "https://synapseaisolutionsa.blob.core.windows.net/public/bankcustomerchurn"
    
    # List of data files to download
    file_list = ["churn.csv"]
    
    # Define the download path within the lakehouse
    download_path = "/lakehouse/default/Files/churn/raw"
    
    # Check if the lakehouse directory exists; if not, raise an error
    if not os.path.exists("/lakehouse/default"):
        raise FileNotFoundError("Default lakehouse not found. Please add a lakehouse and restart the session.")
    
    # Create the download directory if it doesn't exist
    os.makedirs(download_path, exist_ok=True)
    
    # Download each data file if it doesn't already exist in the lakehouse
    for fname in file_list:
        if not os.path.exists(f"{download_path}/{fname}"):
            r = requests.get(f"{remote_url}/{fname}", timeout=30)
            with open(f"{download_path}/{fname}", "wb") as f:
                f.write(r.content)
    
    print("Downloaded demo data files into lakehouse.")

```

### Load data into a Spark dataframe

The following code block loads the data from the CSV file into a Spark DataFrame and caches it for efficient processing.

```python
df = (
    spark.read.option("header", True)
    .option("inferSchema", True)
    .csv("Files/churn/raw/churn.csv")
    .cache()
)
```

This code assumes that the data file has been downloaded and is located in the specified path. It reads the CSV file into a Spark DataFrame, infers the schema, and caches it for faster access during subsequent operations.

### Prepare the data

In this section, we'll perform data cleaning and feature engineering on the dataset.

#### Clean data

First, we define a function to clean the data, which includes dropping rows with missing data, removing duplicate rows based on specific columns, and dropping unnecessary columns.

```python
# Define a function to clean the data
def clean_data(df):
    # Drop rows with missing data across all columns
    df = df.dropna(how="all")
    # Drop duplicate rows based on 'RowNumber' and 'CustomerId'
    df = df.dropDuplicates(subset=['RowNumber', 'CustomerId'])
    # Drop columns: 'RowNumber', 'CustomerId', 'Surname'
    df = df.drop('RowNumber', 'CustomerId', 'Surname')
    return df

# Create a copy of the original dataframe by selecting all the columns
df_copy = df.select("*")

# Apply the clean_data function to the copy
df_clean = clean_data(df_copy)

```

The ```clean_data``` function helps ensure the dataset is free of missing values and duplicates while removing unnecessary columns.

#### Feature engineering

Next, we perform feature engineering by creating dummy columns for the 'Geography' and 'Gender' columns using one-hot encoding.

```python
# Import PySpark functions
from pyspark.sql import functions as F

# Create dummy columns for 'Geography' and 'Gender' using one-hot encoding
df_clean = df_clean.select(
    "*",
    F.when(F.col("Geography") == "France", 1).otherwise(0).alias("Geography_France"),
    F.when(F.col("Geography") == "Germany", 1).otherwise(0).alias("Geography_Germany"),
    F.when(F.col("Geography") == "Spain", 1).otherwise(0).alias("Geography_Spain"),
    F.when(F.col("Gender") == "Female", 1).otherwise(0).alias("Gender_Female"),
    F.when(F.col("Gender") == "Male", 1).otherwise(0).alias("Gender_Male")
)

# Drop the original 'Geography' and 'Gender' columns
df_clean = df_clean.drop("Geography", "Gender")

```

Here, we use one-hot encoding to convert categorical columns into binary dummy columns, making them suitable for machine learning algorithms.

#### Display cleaned data

Finally, we display the cleaned and feature-engineered dataset using the display function.

```python

display(df_clean)

```

This step allows you to inspect the resulting DataFrame with the applied transformations.

### Save to lakehouse

Now, we will save the cleaned and feature-engineered dataset to the lakehouse.

```python
# Create PySpark DataFrame from Pandas
df_clean.write.mode("overwrite").format("delta").save(f"Tables/churn_data_clean")
print(f"Spark dataframe saved to delta table: churn_data_clean")
```

Here, we take the cleaned and transformed PySpark DataFrame, ```df_clean```, and save it as a Delta table named "churn_data_clean" in the lakehouse. We use the Delta format for efficient versioning and management of the dataset. The ```mode("overwrite")``` ensures that any existing table with the same name is overwritten, and a new version of the table is created.

### Create test and training datasets

Next, we will create the test and training datasets from the cleaned and feature-engineered data.

In the provided code section, we load a cleaned and feature-engineered dataset from the lakehouse using Delta format, split it into training and testing sets with an 80-20 ratio, and prepare the data for machine learning. This preparation involves importing the ```VectorAssembler``` from PySpark ML to combine feature columns into a single "features" column. Subsequently, we use the ```VectorAssembler``` to transform the training and testing datasets, resulting in ```train_data``` and ```test_data``` DataFrames that contain the target variable "Exited" and the feature vectors. These datasets are now ready for use in building and evaluating machine learning models.

```python
# Import the necessary library for feature vectorization
from pyspark.ml.feature import VectorAssembler

# Load the cleaned and feature-engineered dataset from the lakehouse
df_final = spark.read.format("delta").load("Tables/churn_data_clean")

# Train-Test Separation
train_raw, test_raw = df_final.randomSplit([0.8, 0.2], seed=41)

# Define the feature columns (excluding the target variable 'Exited')
feature_cols = [col for col in df_final.columns if col != "Exited"]

# Create a VectorAssembler to combine feature columns into a single 'features' column
featurizer = VectorAssembler(inputCols=feature_cols, outputCol="features")

# Transform the training and testing datasets using the VectorAssembler
train_data = featurizer.transform(train_raw)["Exited", "features"]
test_data = featurizer.transform(test_raw)["Exited", "features"]

```

## Train baseline model

Using the featurized data, we'll train a baseline machine learning model, configure MLflow for experiment tracking, define a prediction function for metrics calculation, and finally, view and log the resulting ROC AUC score.

### Set logging level

Here, we configure the logging level to suppress unnecessary output from the Synapse.ml library, keeping the logs cleaner.

```python
import logging
 
logging.getLogger('synapse.ml').setLevel(logging.ERROR)
```

### Configure MLflow

In this section, we configure MLflow for experiment tracking. We set the experiment name to "automl_sample" to organize the runs. Additionally, we enable automatic logging, ensuring that model parameters, metrics, and artifacts are automatically logged to MLflow.

```python
import mlflow

# Set the MLflow experiment to "automl_sample" and enable automatic logging
mlflow.set_experiment("automl_sample")
mlflow.autolog(exclusive=False)

```

### Train and evaluate the model

Finally, we train a LightGBMClassifier model on the provided training data. The model is configured with the necessary settings for binary classification and imbalance handling. We then use this trained model to make predictions on the test data. We extract the predicted probabilities for the positive class and the true labels from the test data. Afterward, we calculate the ROC AUC score using sklearn's ```roc_auc_score``` function.

```python
from synapse.ml.lightgbm import LightGBMClassifier
from sklearn.metrics import roc_auc_score

# Assuming you have already defined 'train_data' and 'test_data'

with mlflow.start_run(run_name="default") as run:
    # Create a LightGBMClassifier model with specified settings
    model = LightGBMClassifier(objective="binary", featuresCol="features", labelCol="Exited")
    
    # Fit the model to the training data
    model = model.fit(train_data)

    # Get the predictions
    predictions = model.transform(test_data)

    # Extract the predicted probabilities for the positive class
    y_pred = predictions.select("probability").rdd.map(lambda x: x[0][1]).collect()

    # Extract the true labels from the 'test_data' DataFrame
    y_true = test_data.select("Exited").rdd.map(lambda x: x[0]).collect()

    # Compute the ROC AUC score
    roc_auc = roc_auc_score(y_true, y_pred)

    # Log the ROC AUC score with MLflow
    mlflow.log_metric("ROC_AUC", roc_auc)

    # Print or log the ROC AUC score
    print("ROC AUC Score:", roc_auc)

```

From here, we can see that our resulting model achieves a ROC AUC score of 84%.

## Create an AutoML trial with FLAML

In this section, we'll create an AutoML trial using the FLAML package, configure the trial settings, convert the Spark dataset to a Pandas on Spark dataset, run the AutoML trial, and view the resulting metrics.

### Configure the AutoML trial

Here, we import the necessary classes and modules from the FLAML package and create an instance of AutoML, which will be used to automate the machine learning pipeline.

```python
# Import the AutoML class from the FLAML package
from flaml import AutoML
from flaml.automl.spark.utils import to_pandas_on_spark

# Create an AutoML instance
automl = AutoML()

```

### Configure settings

In this section, we define the configuration settings for the AutoML trial.

```python
# Define AutoML settings
settings = {
    "time_budget": 250,         # Total running time in seconds
    "metric": 'roc_auc',       # Optimization metric (ROC AUC in this case)
    "task": 'classification',  # Task type (classification)
    "log_file_name": 'flaml_experiment.log',  # FLAML log file
    "seed": 41,                # Random seed
    "force_cancel": True,      # Force stop training once time_budget is used up
    "mlflow_exp_name": "automl_sample"      # MLflow experiment name
}

```

### Convert to Pandas on Spark

To run AutoML with a Spark-based dataset, we need to convert it to a Pandas on Spark dataset using the ```to_pandas_on_spark``` function. This enables FLAML to work with the data efficiently.

```python
# Convert the Spark training dataset to a Pandas on Spark dataset
df_automl = to_pandas_on_spark(train_data)

```

### Run the AutoML trial

Now, we execute the AutoML trial. We use a nested MLflow run to track the experiment within the existing MLflow run context. The AutoML trial is performed on the Pandas on Spark dataset (```df_automl```) with the target variable "```Exited``` and the defined settings are passed to the ```fit``` function for configuration.

```python
'''The main flaml automl API'''

with mlflow.start_run(nested=True):
    automl.fit(dataframe=df_automl, label='Exited', isUnbalance=True, **settings)
```

### View resulting metrics

In this final section, we retrieve and display the results of the AutoML trial. These metrics provide insights into the performance and configuration of the AutoML model on the given dataset.

```python
# Retrieve and display the best hyperparameter configuration and metrics
print('Best hyperparameter config:', automl.best_config)
print('Best ROC AUC on validation data: {0:.4g}'.format(1 - automl.best_loss))
print('Training duration of the best run: {0:.4g} s'.format(automl.best_config_train_time))

```

## Parallelize your AutoML trial with Apache Spark

In scenarios where your dataset can fit into a single node and you want to leverage the power of Spark for running multiple parallel AutoML trials simultaneously, you can follow these steps:

### Convert to Pandas dataframe

To enable parallelization, your data must first be converted into a Pandas DataFrame.

```python
pandas_df = train_raw.toPandas()

```

Here, we convert the ```train_raw``` Spark DataFrame into a Pandas DataFrame named ```pandas_df``` to make it suitable for parallel processing.

### Configure parallelization settings

Set ```use_spark``` to ```True``` to enable Spark-based parallelism. By default, FLAML will launch one trial per executor. You can customize the number of concurrent trials by using the ```n_concurrent_trials``` argument.

```python
settings = {
    "time_budget": 250,           # Total running time in seconds
    "metric": 'roc_auc',         # Optimization metric (ROC AUC in this case)
    "task": 'classification',    # Task type (classification)
    "seed": 41,                  # Random seed
    "use_spark": True,           # Enable Spark-based parallelism
    "n_concurrent_trials": 3,    # Number of concurrent trials to run
    "force_cancel": True,        # Force stop training once time_budget is used up
    "mlflow_exp_name": "automl_sample"  # MLflow experiment name

}
```
In these settings, we specify that we want to utilize Spark for parallelism by setting ```use_spark``` to ```True```. We also set the number of concurrent trials to 3, meaning that three trials will run in parallel on Spark.

To learn more about how to parallelize your AutoML trails, you can visit the [FLAML documentation for parallel Spark jobs](https://microsoft.github.io/FLAML/docs/Examples/Integrate%20-%20Spark#parallel-spark-jobs).

### Run the AutoML trial in parallel

Now, we will run the AutoML trial in parallel with the specified settings. We will use a nested MLflow run to track the experiment within the existing MLflow run context.

```python
'''The main FLAML AutoML API'''
with mlflow.start_run(nested=True, run_name="parallel_trial"):
    automl.fit(dataframe=pandas_df, label='Exited', **settings)

```

This will now execute the AutoML trial with parallelization enabled. The ```dataframe``` argument is set to the Pandas DataFrame ```pandas_df```, and other settings are passed to the ```fit``` function for parallel execution.

### View metrics

After running the parallel AutoML trial, retrieve and display the results, including the best hyperparameter configuration, ROC AUC on the validation data, and the training duration of the best-performing run.

```python
''' retrieve best config'''
print('Best hyperparmeter config:', automl.best_config)
print('Best roc_auc on validation data: {0:.4g}'.format(1-automl.best_loss))
print('Training duration of best run: {0:.4g} s'.format(automl.best_config_train_time))
```

## Next steps

* [Learn about AutoML in Fabric](../data-science/automated-machine-learning-fabric.md)
* [Visualize the results of your AutoML trial](../data-science/tuning-automated-machine-learning-visualizations.md)
