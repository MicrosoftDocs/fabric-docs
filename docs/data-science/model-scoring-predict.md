---
title: Model scoring with PREDICT
description: Learn how to operationalize machine learning models in Fabric from the secure boundaries of a notebook with a function called PREDICT.
ms.reviewer: mopeakande
ms.author: erenorbey
author: orbey
ms.topic: how-to
ms.date: 02/10/2023
ms.search.form: Predict
---

# Model scoring with PREDICT in Microsoft Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] empowers users to operationalize machine learning models from the secure boundaries of a notebook by using a function called PREDICT, which supports scoring at scale in any compute engine. Users can get started directly from a [!INCLUDE [product-name](../includes/product-name.md)] notebook or from a given model item page.

In this article, you'll learn how to call PREDICT directly from a notebook and how to generate code to call PREDICT from a given model's item page.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

## Limitations

- The PREDICT function is currently supported for a limited set of model types, including LightGBM and scikit-learn.

## Call PREDICT from a notebook

PREDICT supports MLflow-packaged models in the [!INCLUDE [product-name](../includes/product-name.md)] registry. If you've already trained and registered a model in your workspace, you can skip to Step 2 in the following procedure. If not, Step 1 provides a code sample to guide you through the creation and training of a logistic regression model. You can use this model to generate predictions at the end of the procedure if you don't use your own.

1. **Train a model and register it with MLflow**. The following code sample uses the MLflow API to create a machine learning experiment and start an MLflow run for a simple scikit-learn logistic regression model, tracking some metrics and parameters. The model version is then registered for prediction. See [how to train models with scikit-learn](train-models-scikit-learn.md) to learn more about training and tracking models of your own.

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

2. **Load in test data and convert it into a Spark DataFrame.** To generate predictions using the model trained in the previous step, you need test data in the form of a Spark DataFrame. You can substitute the value for the `test` variable in the following code with your own data.

   ```Python
   import pandas as pd

   # Create a simple test data from a dictionary of x values
   # You can substitute "test" below with your own data
   test = pd.DataFrame({'x': [-2, -1, 0, 1, 2, -1]})

   # Convert the test data into a Spark DataFrame
   test_spark = spark.createDataFrame(data=[(test.values.tolist(),)], schema=test.columns.to_list())
   ```

3. **Create an `MLFlowTransformer` object to load the model for inferencing.** To create an `MLFlowTransformer` object for generating predictions, we specify all the columns from the `test` data as model inputs, name the new output column `predictions` (although this column name could be any string), and provide the correct model name and version to use for generating predictions. If you're using your own model, substitute the values for the input columns, output column name, model name, and model version.

   ```Python
   from synapse.ml.predict import MLFlowTransformer

   # You can substitute values below for your own input columns,
   # output column name, model name, and model version
   model = MLFlowTransformer(
       inputCols=test_spark.columns,
       outputCol='predictions',
       modelName='sample-sklearn',
       modelVersion=1
   )
   ```

4. **Generate predictions using the PREDICT function.** To invoke the PREDICT function, you can use the Transformer API, the Spark SQL API, or user-defined functions (UDFs). The following sections show how to generate predictions with the test data and model defined in the previous steps, using the different methods for invoking PREDICT.

### PREDICT with the Transformer API

To invoke the PREDICT function with the Transformer API, you can use the model and the test data defined previously. If you've been using your own model, substitute the values for the model and the test data in the following code.

```Python
# You can substitute "model" and "test_spark" below with variables  
# for your own model and test data 
predictions = model.transform(test_spark)
predictions.show()
```

### PREDICT with the Spark SQL API

To invoke the PREDICT function with the Spark SQL API, you can use the model and the test data defined previously. If you've been using your own model, substitute the values for `model_name`, `model_version`, and `features` with the right values for your model name, model version, and your feature columns.

> [!NOTE]
> Using the Spark SQL API to generate predictions still requires you to create an `MLFlowTransformer` object (as in Step 3). This registers the model for use with the PREDICT keyword.

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

### PREDICT with a user-defined function

To invoke the PREDICT function with a user-defined function (UDF), you can use the model and the test data defined previously. If you've been using your own model, substitute the values for the features and model.

```Python
from pyspark.sql.functions import col, pandas_udf, udf, lit

# You can substitute "features" and "model" below with your 
features = test_spark.columns
lr_udf = model.to_udf()

test_spark.withColumn("PREDICT", lr_udf(*[col(f) for f in features])).show()
```

## Generate PREDICT code from a model item page

You can choose one of the following options to generate code that calls PREDICT for a specific model's version.
- Use an interactive scoring wizard to generate the model prediction code based on prepopulated parameters
- Copy a code template into a notebook and customize it to generate the model prediction code

### Use an interactive scoring wizard

The interactive scoring wizard walks you through steps to select the source data for scoring, map the data correctly to the model's inputs, specify the destination for the model's outputs, and create a notebook that uses PREDICT to generate and store scores.

> [!NOTE]
> The scoring wizard is currently supported only for models that have been saved in the MLflow format with their model signatures populated. For other models, use the customizable code template provided on the model version's page, or [call PREDICT directly from a notebook](#call-predict-from-a-notebook).

To use the scoring wizard,
1. Go to the item page for a given model version.
1. Select **Apply this model in wizard** from the **Apply model** dropdown.

    :::image type="content" source="media/model-scoring-predict/apply-model.png" alt-text="Screenshot of the prompt to apply a model from its item page." lightbox="media/model-scoring-predict/apply-model.png":::

    The selection opens up the "Apply model predictions" window at the "Select input table" step.

1. Select an input table from one of the Lakehouses in your current workspace.

    :::image type="content" source="media/model-scoring-predict/select-input-table.png" alt-text="Screenshot of the step to select an input table for model predictions." lightbox="media/model-scoring-predict/select-input-table.png":::

1. Select **Next** to go to the "Map input columns" step.
1. Map column names from the input table to the model's input fields that have been pulled from the model's signature. You must provide an input column for all the model's required fields. Also, the data types for the selected columns must match the model's expected data types.

    > [!TIP]
    > The wizard will prepopulate the mapping if the names of the input table's columns match those logged in the model signature.

    :::image type="content" source="media/model-scoring-predict/map-input-columns.png" alt-text="Screenshot of the step to map input columns for model predictions." lightbox="media/model-scoring-predict/map-input-columns.png":::

1. Select **Next** to go to the "Create output table" step.
1. Provide a name for a new table within the selected Lakehouse of your current workspace. This Lakehouse will store the output table that will contain the model's input values and predictions. By default, this table will be created in the same Lakehouse as the input table, but the option to change the destination Lakehouse is also available.

    :::image type="content" source="media/model-scoring-predict/create-output-table.png" alt-text="Screenshot of the step to create an output table for model predictions." lightbox="media/model-scoring-predict/create-output-table.png":::

1. Select **Next** to go to the "Map output columns" step.
1. Use the provided text field(s) to name the column(s) in the output table that will store the model's predictions.

    :::image type="content" source="media/model-scoring-predict/map-output-columns.png" alt-text="Screenshot of the step to map output columns for model predictions." lightbox="media/model-scoring-predict/map-output-columns.png":::

1. Select **Next** to go to the "Configure notebook" step.
1. Provide a name for a new notebook that will store the generated PREDICT code. The wizard displays a preview of the generated code at this step. You can copy the code to your clipboard and paste it into an existing notebook if you like.

    :::image type="content" source="media/model-scoring-predict/configure-notebook.png" alt-text="Screenshot of the step to configure a notebook for model predictions." lightbox="media/model-scoring-predict/configure-notebook.png":::

1. Select **Next** to go to the "Review and finish" step.
1. Review the details on the summary page and select **Create notebook** to add the new notebook with its generated code to your workspace.

    :::image type="content" source="media/model-scoring-predict/review-and-finish.png" alt-text="Screenshot of the review-and-finish step for model predictions." lightbox="media/model-scoring-predict/review-and-finish.png":::

### Use a customizable code template

To use a code template to generate the model's prediction code:

1. Go to the item page for a given model version.
1. Select **Copy code to apply** from the **Apply model** dropdown. The selection allows you to copy a customizable code template.

You can paste this code template as a new cell in a notebook to generate model predictions. To successfully run the code template, you need to manually replace the placeholders in the code template as follows:

- `<INPUT_TABLE>`: The file path for the table that will provide inputs to the model
- `<INPUT_COLS>`: An array of column names from the input table to feed as inputs to the model
- `<OUTPUT_COLS>`: A name for a new column where predictions will land in the output table
- `<MODEL_NAME>`: The name of the model to use for generating predictions
- `<MODEL_VERSION>`: The version of the model to use for generating predictions
- `<OUTPUT_TABLE>`: The file path for the table that will store the predictions

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

- [End-to-end prediction example using a fraud detection model](fraud-detection.md)
- [How to train models with scikit-learn in Microsoft Fabric](train-models-scikit-learn.md)
