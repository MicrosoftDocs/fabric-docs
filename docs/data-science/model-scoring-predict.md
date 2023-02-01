---
title: Model scoring with PREDICT
description: Learn how to use the PREDICT function in supported models.
ms.reviewer: msakande
ms.author: negust
author: nelgson
ms.topic: <how-to, conceptual, tutorial, quickstart, overview> 
ms.date: 02/10/2023
---

# Model scoring with PREDICT

[!INCLUDE [product-name](../includes/product-name.md)] empowers users to operationalize machine learning models from the secure boundaries of a notebook with a function called PREDICT. Users can get started directly from a [!INCLUDE [product-name](../includes/product-name.md)] notebook or from a given model item page. An end-to-end prediction example using a fraud detection model can be found in the “Sample Notebooks” folder.

> [!NOTE]
> The PREDICT function is currently supported for only a limited set of model flavors, including LightGBM and Scikit-Learn. Support for additional model flavors (ONNX, PyTorch, TensorFlow) is forthcoming.

## Calling PREDICT from a notebook

PREDICT supports MLFlow-packaged models in the [!INCLUDE [product-name](../includes/product-name.md)] registry. If you’ve already trained and registered a model, you can skip to Step 2 in the following procedure. If not, Step 1 provides a code sample to guide you through the creation and training of a simple logistic regression model. This is the model that will be used to generate predictions in the last step if you don’t use your own.

1. **Train a model and register it with** **MLFlow**. The following code sample uses the MLFlow API to create a machine learning experiment and start an MLFlow run for a simple Scikit-Learn logistic regression model, tracking its metrics and parameters. The model version is then registered for prediction. (For more in-depth instructions about the training process, see our how-to guide on training models.)

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

2. **Load in a test dataset and convert it into a Spark DataFrame.** To generate predictions using the model trained in the previous example, we can create a simple test dataset. Substituting the indicated variables in the following example allows you to change this data for testing your own model.

```Python
import pandas as pd

# Create a simple test dataset from a dictionary of x values
# You can substitute “test" below with your own dataset
test = pd.DataFrame({'x': [-2, -1, 0, 1, 2, -1]})

# Convert the test dataset into a Spark DataFrame
test_spark = spark.createDataFrame(data=[(test.values.tolist(),)], schema=test.columns.to_list())
```

3. **Create an** **MLFlow Transformer to load the model for inferencing.** The following code sample can be modified—with substitutions for the indicated parameters—to create a Transformer for generating predictions. In this case, we’re specifying all the columns from the test dataset as model inputs, naming the output column “predictions,” and generating our predictions with the model version trained earlier.

```Python
from synapse.ml.predict import MLFlowTransformer

# You can substitute values below for your own input columns
# output column name, model name, and model version
model = MLFlowTransformer(
    inputCols=test_spark.columns,
    outputCol='predictions',
    modelName='sample-sklearn',
    modelVersion=1
)
```

4. **Generate predictions using the PREDICT function.** The PREDICT function can be invoked with the Transformer API, the Spark SQL API, or user-defined functions (UDFs). The following code snippets generate predictions using the test data and model defined in the preview steps.

### PREDICT with the Transformer API

```Python
# You can substitute “model” and “test_spark” below with variables  
# for your own model and test data 
predictions = model.transform(test_spark)
predictions.show()
```

### PREDICT with the Spark SQL API

```Python
from pyspark.ml.feature import SQLTransformer 

# You can substitute “model_name,” “model_version,” and “features” below # with variables for your own model name, model version, and feature columns
model_name = 'sample-sklearn'
model_version = 1
features = test_spark.columns

sqlt = SQLTransformer().setStatement( 
    f"SELECT PREDICT('{model_name}/{model_version}', {','.join(features)}) as prediction FROM __THIS__")

# You can substitute “test_spark” below with your own test data
predictions = sqlt.transform(test_spark)
predictions.show()
```

> [!NOTE]
> Using the Spark SQL API to generate predictions still requires you to create an MLFlow Transformer (as in Step 3). This registers the model for use with the PREDICT keyword.

### PREDICT with a user-defined function (UDF)

```Python
from pyspark.sql.functions import col, pandas_udf, udf, lit

# You can substitute “features” and "model” below with your 
features = test_spark.columns
lr_udf = model.to_udf()

test_spark.withColumn("PREDICT", lr_udf(*[col(f) for f in features])).show()
```

## Generating PREDICT code from a model item page

Users can generate code to call PREDICT for a specific model by navigating to the item page for the desired model version and clicking the “Apply model” prompt.

### Using an interactive scoring wizard

The “Apply model” prompt includes an option to generate PREDICT code with prepopulated parameters using an interactive scoring wizard. The wizard walks users through a series of steps to select the source data for scoring, map it correctly to the model’s inputs, specify the destination for the model’s outputs, and create a notebook that will generate scores using PREDICT.

> [!NOTE]
> The scoring wizard is currently supported only for models that have been saved in the MLFlow format with their model signatures populated. For other models, please use the customizable code template provided on the model version’s page, or consult documentation for calling PREDICT directly from a notebook.

To use the scoring wizard, navigate to the artifact page for a given model version and click “Apply this model in wizard” from the “Apply model” dropdown. The interface will guide you through the following steps.

1. **Select input table.** Browse the provided dropdown menus to select an input table from among the Lakehouses in your current Workspace. In the next step, the columns from this table will be mapped to the model’s inputs to generate predictions.
1. **Map input columns.** Use the provided dropdowns to match columns from the selected table to each of the model’s listed input fields, which have been pulled from the model’s signature. Note that an input column must be provided for all the model’s required fields—and that the data types for the selected columns must match the model’s expected data types.

> [!TIP]
> The wizard will prepopulate the mapping if the names of the input table’s columns match those logged in the model signature.

3. **Create output table.** Provide a name for a new table within your current Workspace’s selected Lakehouse where the model’s predictions will be stored. By default, this table will be created in the same Lakehouse as the input table, but the option to change the destination Lakehouse is also available.
1. **Map output column(s).** Use the provided text field(s) to name the column(s) in the output table where the model’s predictions will be stored.
1. **Configure notebook.** Provide a name for a new notebook where the PREDICT code generated by the wizard will be stored. The generated code will be displayed as a preview in this step if you wish to copy it to your clipboard and paste it into an existing notebook instead.
1. **Review and finish.** Review the designated model version, input table, output table, and notebook name. Click “Create notebook” to add a new notebook with the generated code to your workspace.

### Using a customizable code template

The “Apply model” prompt also includes an option to copy a customizable code template, which can be pasted into a notebook as a new cell to generate model predictions. Unlike the scoring wizard, the code template requires users to update the following fields manually before it can be successfully run:

- **INPUT_TABLE:** The path for the table that will provide inputs to the model
- **INPUT_COLS:** The array of column names that will be provided as inputs
- **OUTPUT_COLS:** The name for the column where predictions will be landed
- **MODEL_NAME:** The name of the model used to generate predictions
- **MODEL_VERSION:** The version of the model used to generate predictions
- **OUTPUT_TABLE:** The path for the table where the predictions will be stored

```Python
import mlflow 
from trident.mlflow import get_sds_url 
from synapse.ml.predict import MLFlowTransformer 
 
spark.conf.set("spark.synapse.ml.predict.enabled", "true") 
mlflow.set_tracking_uri(get_sds_url()) 
 
df = spark.read.format("delta").load( 
    <INPUT_TABLE> 
) 
 
model = MLFlowTransformer( 
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
