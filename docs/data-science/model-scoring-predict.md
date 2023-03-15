---
title: Model scoring with PREDICT
description: Learn how to use the PREDICT function in supported models.
ms.reviewer: mopeakande
ms.author: erenorbey
author: orbey
ms.topic: how-to
ms.date: 02/10/2023
---

# Model scoring with PREDICT

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

[!INCLUDE [product-name](../includes/product-name.md)] empowers users to operationalize machine learning models from the secure boundaries of a notebook by using a function called PREDICT. Users can get started directly from a [!INCLUDE [product-name](../includes/product-name.md)] notebook or from a given model item page.

In this article, you'll learn to call PREDICT from a notebook and generate code to call PREDICT for a given model from the model's item page.

> [!NOTE]
> The PREDICT function is currently supported for a limited set of model types, including LightGBM and scikit-learn.

## Prerequisites

- A Power BI Premium subscription. If you don't have one, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
- A Power BI Workspace with assigned premium capacity.

## Call PREDICT from a notebook

PREDICT supports MLflow-packaged models in the [!INCLUDE [product-name](../includes/product-name.md)] registry. If you've already trained and registered a model, you can skip to Step 2 in the following procedure. If not, Step 1 provides a code sample to guide you through the creation and training of a logistic regression model. You can use this model to generate predictions in the last step of the procedure if you don't use your own.

1. **Train a model and register it with MLflow**. The following code sample uses the MLflow API to create a machine learning experiment and start an MLflow run for a simple scikit-learn logistic regression model, tracking its metrics and parameters. The model version is then registered for prediction. See [how to train models with scikit-learn](train-models-scikit-learn.md) to learn more about training and tracking a scikit-learn model.

   ```Python
   import mlflow
   import numpy as np 
   from sklearn.linear_model import LogisticRegression 
   from mlflow.models.signature import infer_signature 
  
   lr = LogisticRegression() 
   X = np.array([-2, -1, 0, 1, 2, 1]).reshape(-1, 1) 
   y = np.array([0, 0, 1, 1, 1, 0]) 
   lr.fit(X, y) 
   score = lr.score(X, y) 
   signature = infer_signature(X, y) 
  
   mlflow.set_experiment("sample-sklearn")
   with mlflow.start_run() as run: 
       mlflow.log_metric("score", score)  
       mlflow.log_param("alpha", "alpha")
  
       mlflow.sklearn.log_model(lr, "sklearn-model", signature=signature) 
       print("Model saved in run_id=%s" % run.info.run_id)
      
       mlflow.register_model( 
          "runs:/{}/sklearn-model".format(run.info.run_id), "sample-sklearn"
       )
    ```

2. **Load in test data and convert it into a Spark DataFrame.** To generate predictions using the model trained in the previous step, we can create a simple test data. You can substitute the value for the `test` variable in the following code snippet with data for testing your model.

   ```Python
   import pandas as pd

   # Create a simple test data from a dictionary of x values
   # You can substitute "test" below with your own data
   test = pd.DataFrame({'x': [-2, -1, 0, 1, 2, -1]})

   # Convert the test data into a Spark DataFrame
   test_spark = spark.createDataFrame(data=[(test.values.tolist(),)], schema=test.columns.to_list())
   ```

3. **Create an MLflow Transformer to load the model for inferencing.** To create an MLflow Transformer object for generating predictions, we specify all the columns from the `test` data as model inputs, name the output column `predictions`, and provide the correct model name and version to use for generating predictions. If you're using your own model, substitute the values for the input columns, output column name, model name, and model version with the appropriate ones for your model.

   ```Python
   from synapse.ml.predict import MLflowTransformer

   # You can substitute values below for your own input columns
   # output column name, model name, and model version
   model = MLflowTransformer(
       inputCols=test_spark.columns,
       outputCol='predictions',
       modelName='sample-sklearn',
       modelVersion=1
   )
   ```

4. **Generate predictions using the PREDICT function.** To invoke the PREDICT function, you can use the Transformer API, the Spark SQL API, or user-defined functions (UDFs). The following sections show how to generate predictions with the test data and model defined in the previous steps, using the different methods for invoking PREDICT.

### PREDICT with the Transformer API

To invoke the PREDICT function with the transformer API, use the model and the test data defined previously. If you've been using your own model, substitute the values for the model and the test data in the following code.

```Python
# You can substitute "model" and "test_spark" below with variables  
# for your own model and test data 
predictions = model.transform(test_spark)
predictions.show()
```

### PREDICT with the Spark SQL API

To invoke the PREDICT function with the Spark SQL API, use the model and the test data defined previously. If you've been using your own model, substitute the values for `model_name`, `model_version`, and `features` with the corresponding values for your model and feature columns.

```Python
from pyspark.ml.feature import SQLTransformer 

# You can substitute "model_name," "model_version," and "features" 
# with variables for your own model name, model version, and feature columns
model_name = 'sample-sklearn'
model_version = 1
features = test_spark.columns

sqlt = SQLTransformer().setStatement( 
    f"SELECT PREDICT('{model_name}/{model_version}', {','.join(features)}) as prediction FROM __THIS__")

# You can substitute "test_spark" below with your own test data
predictions = sqlt.transform(test_spark)
predictions.show()
```

> [!NOTE]
> Using the Spark SQL API to generate predictions still requires you to create an MLflow Transformer (as in Step 3). This registers the model for use with the PREDICT keyword.

### PREDICT with a user-defined function

To invoke the PREDICT function with a user-defined function (UDF), use the model and the test data defined previously. If you've been using your own model, substitute the values for the features and model with the corresponding values for your feature columns and model.

```Python
from pyspark.sql.functions import col, pandas_udf, udf, lit

# You can substitute "features" and "model" below with your 
features = test_spark.columns
lr_udf = model.to_udf()

test_spark.withColumn("PREDICT", lr_udf(*[col(f) for f in features])).show()
```

## Generate PREDICT code from a model item page

To generate code that calls PREDICT for a specific model:

- Go to the item page for the desired model version.
- Select the **Apply model** prompt. This prompt includes options to:
    - Generate PREDICT code with prepopulated parameters using an interactive scoring wizard, or
    - Copy a customizable code template to use in generating model predictions.

### Use an interactive scoring wizard

The **Apply model** prompt includes an option to generate PREDICT code with prepopulated parameters using an interactive scoring wizard. The wizard walks you through steps to select the source data for scoring, map the data correctly to the model's inputs, specify the destination for the model's outputs, and create a notebook that uses PREDICT to generate scores.

> [!NOTE]
> The scoring wizard is currently supported only for models that have been saved in the MLflow format with their model signatures populated. For other models, use the customizable code template provided on the model version's page, or [call PREDICT directly from a notebook](#call-predict-from-a-notebook).

To use the scoring wizard,
- Go to the artifact page for a given model version.
- Select **Apply this model in wizard** from the **Apply model** dropdown. The interface guides you through the following steps:

1. **Select input table.** Browse the provided dropdown menus to select an input table from among the Lakehouses in your current Workspace.
1. **Map input columns.** Use the provided dropdowns to match columns from the selected table to each of the model's listed input fields, which have been pulled from the model's signature. You must provide an input column for all the model's required fields. Also, the data types for the selected columns must match the model's expected data types.

    > [!TIP]
    > The wizard will prepopulate the mapping if the names of the input table's columns match those logged in the model signature.

1. **Create output table.** Provide a name for a new table within your current Workspace's selected Lakehouse. This Lakehouse will store the output table that will contain the model's input values and predictions. By default, this table will be created in the same Lakehouse as the input table, but the option to change the destination Lakehouse is also available.
1. **Map output column(s).** Use the provided text field(s) to name the column(s) in the output table where the model's predictions will be stored.
1. **Configure notebook.** Provide a name for a new notebook where the PREDICT code generated by the wizard will be stored. The generated code will be displayed as a preview in this step. You can copy the code to your clipboard and paste it into an existing notebook instead.
1. **Review and finish.** Review the designated model version, input table, output table, and notebook name. Select **Create notebook** to add the new notebook with the generated code to your workspace.

### Use a customizable code template

The **Apply model** prompt also includes an option to copy a customizable code template. You can paste this code template into a notebook as a new cell to generate model predictions. To successfully run the code template, you need to manually replace the placeholders in the code template as follows:

- `<INPUT_TABLE>`: The path for the table that will provide inputs to the model
- `<INPUT_COLS>`: The array of column names to use as inputs
- `<OUTPUT_COLS>`: The name of the column where predictions will land
- `<MODEL_NAME>`: The name of the model to use for generating predictions
- `<MODEL_VERSION>`: The version of the model to use for generating predictions
- `<OUTPUT_TABLE>`: The path for the table that will store the predictions

```Python
import mlflow 
from trident.mlflow import get_sds_url 
from synapse.ml.predict import MLflowTransformer 
 
spark.conf.set("spark.synapse.ml.predict.enabled", "true") 
mlflow.set_tracking_uri(get_sds_url()) 
 
df = spark.read.format("delta").load( 
    <INPUT_TABLE> 
) 
 
model = MLflowTransformer( 
    inputCols=<INPUT_COLS>, 
    outputCol=<OUTPUT_COLS>, 
    modelName=<MODEL_NAME>, 
    modelVersion=<MODEL_VERSION> 
) 
df = model.transform(df) 
 
df.write.format('delta').mode("overwrite").save( 
    <OUTPUT_TABLE> 
)  
```

## Next steps

- How-to: Apply model for batch scoring (PREDICT)
- [End-to-end prediction example using a fraud detection model](fraud-detection.md)
