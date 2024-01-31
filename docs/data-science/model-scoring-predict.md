---
title: Model scoring with PREDICT
description: Learn how to operationalize machine learning models in Fabric with a scalable function called PREDICT.
ms.reviewer: franksolomon
ms.author: erenorbey
author: orbey
ms.topic: how-to
ms.custom: ignite-2023
ms.date: 11/15/2023
ms.search.form: Predict
---

# Machine learning model scoring with PREDICT in Microsoft Fabric

[!INCLUDE [product-name](../includes/product-name.md)] allows users to operationalize machine learning models with a scalable function called PREDICT, which supports batch scoring in any compute engine. Users can generate batch predictions directly from a [!INCLUDE [product-name](../includes/product-name.md)] notebook or from a given ML model's item page.



In this article, you learn how to apply PREDICT both ways, whether you're more comfortable writing code yourself or using a guided UI experience to handle batch scoring for you.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

## Limitations

- The PREDICT function is currently supported for a limited set of ML model flavors, including:
    - PyTorch
    - Sklearn
    - Spark
    - TensorFlow
    - ONNX
    - XGBoost
    - LightGBM
    - CatBoost
    - Statsmodels
    - Prophet
    - Keras
- PREDICT ***requires*** ML models to be saved in the MLflow format with their signatures populated.
- PREDICT ***does not*** support ML models with multi-tensor inputs or outputs.

## Call PREDICT from a notebook

PREDICT supports MLflow-packaged models in the [!INCLUDE [product-name](../includes/product-name.md)] registry. If there's an already trained and registered ML model in your workspace, you can skip to step 2. If not, step 1 provides sample code to guide you through training a sample logistic regression model. You can use this model to generate batch predictions at the end of the procedure.

1. **Train an ML model and register it with MLflow**. The following sample code uses the MLflow API to create a machine learning experiment and start an MLflow run for a scikit-learn logistic regression model. The model version is then stored and registered in the [!INCLUDE [product-name](../includes/product-name.md)] registry. See [how to train ML models with scikit-learn](train-models-scikit-learn.md) to learn more about training models and tracking experiments of your own.

    ```Python
    import mlflow
    import numpy as np 
    from sklearn.linear_model import LogisticRegression 
    from sklearn.datasets import load_diabetes
    from mlflow.models.signature import infer_signature 

    mlflow.set_experiment("diabetes-demo")
    with mlflow.start_run() as run:
        lr = LogisticRegression()
        data = load_diabetes(as_frame=True)
        lr.fit(data.data, data.target) 
        signature = infer_signature(data.data, data.target) 

        mlflow.sklearn.log_model(
            lr,
            "diabetes-model",
            signature=signature,
            registered_model_name="diabetes-model"
        ) 
    ```

2. **Load in test data as a Spark DataFrame.** To generate batch predictions using the ML model trained in the previous step, you need test data in the form of a Spark DataFrame. You can substitute the value for the `test` variable in the following code with your own data.

    ```Python
    # You can substitute "test" below with your own data
    test = spark.createDataFrame(data.frame.drop(['target'], axis=1))
    ```

3. **Create an `MLFlowTransformer` object to load the ML model for inferencing.** To create an `MLFlowTransformer` object for generating batch predictions, you must perform the following actions:
    - specify which columns from the `test` DataFrame you need as model inputs (in this case, all of them),
    - choose a name for the new output column (in this case, `predictions`), and
    - provide the correct model name and model version for generating those predictions.
  
    If you're using your own ML model, substitute the values for the input columns, output column name, model name, and model version.

    ```Python
    from synapse.ml.predict import MLFlowTransformer

    # You can substitute values below for your own input columns,
    # output column name, model name, and model version
    model = MLFlowTransformer(
        inputCols=test.columns,
        outputCol='predictions',
        modelName='diabetes-model',
        modelVersion=1
    )
    ```

4. **Generate predictions using the PREDICT function.** To invoke the PREDICT function, you can use the Transformer API, the Spark SQL API, or a PySpark user-defined function (UDF). The following sections show how to generate batch predictions with the test data and ML model defined in the previous steps, using the different methods for invoking PREDICT.

### PREDICT with the Transformer API

The following code invokes the PREDICT function with the Transformer API. If you've been using your own ML model, substitute the values for the model and test data.

```Python
# You can substitute "model" and "test" below with values  
# for your own model and test data 
model.transform(test).show()
```

### PREDICT with the Spark SQL API

The following code invokes the PREDICT function with the Spark SQL API. If you've been using your own ML model, substitute the values for `model_name`, `model_version`, and `features` with your model name, model version, and feature columns.

> [!NOTE]
> Using the Spark SQL API to generate predictions still requires you to create an `MLFlowTransformer` object (as in step 3).

```Python
from pyspark.ml.feature import SQLTransformer 

# You can substitute "model_name," "model_version," and "features" 
# with values for your own model name, model version, and feature columns
model_name = 'diabetes-model'
model_version = 1
features = test.columns

sqlt = SQLTransformer().setStatement( 
    f"SELECT PREDICT('{model_name}/{model_version}', {','.join(features)}) as predictions FROM __THIS__")

# You can substitute "test" below with your own test data
sqlt.transform(test).show()
```

### PREDICT with a user-defined function

The following code invokes the PREDICT function with a PySpark UDF. If you've been using your own ML model, substitute the values for the model and features.

```Python
from pyspark.sql.functions import col, pandas_udf, udf, lit

# You can substitute "model" and "features" below with your own values
my_udf = model.to_udf()
features = test.columns

test.withColumn("PREDICT", my_udf(*[col(f) for f in features])).show()
```

## Generate PREDICT code from an ML model's item page

From any ML model's item page, you can choose either of the following options to start generating batch predictions for a specific model version with PREDICT.
- Use a guided UI experience to generate PREDICT code
- Copy a code template into a notebook and customize the parameters yourself

### Use a guided UI experience

The guided UI experience walks you through steps to:

- Select source data for scoring
- Map the data correctly to your ML model's inputs
- Specify the destination for your model's outputs
- Create a notebook that uses PREDICT to generate and store prediction results

To use the guided experience,
1. Go to the item page for a given ML model version.
1. Select **Apply this model in wizard** from the **Apply this version** dropdown.

    :::image type="content" source="media/model-scoring-predict/apply-model.png" alt-text="Screenshot of the prompt to apply an ML model from its item page." lightbox="media/model-scoring-predict/apply-model.png":::

    The selection opens up the "Apply ML model predictions" window at the "Select input table" step.

1. Select an input table from one of the lakehouses in your current workspace.

    :::image type="content" source="media/model-scoring-predict/select-input-table.png" alt-text="Screenshot of the step to select an input table for ML model predictions." lightbox="media/model-scoring-predict/select-input-table.png":::

1. Select **Next** to go to the "Map input columns" step.
1. Map column names from the source table to the ML model's input fields, which are pulled from the model's signature. You must provide an input column for all the model's required fields. Also, the data types for the source columns must match the model's expected data types.

    > [!TIP]
    > The wizard will prepopulate this mapping if the names of the input table's columns match the column names logged in the ML model signature.

    :::image type="content" source="media/model-scoring-predict/map-input-columns.png" alt-text="Screenshot of the step to map input columns for ML model predictions." lightbox="media/model-scoring-predict/map-input-columns.png":::

1. Select **Next** to go to the "Create output table" step.
1. Provide a name for a new table within the selected lakehouse of your current workspace. This output table stores your ML model's input values with the prediction values appended. By default, the output table is created in the same lakehouse as the input table, but the option to change the destination lakehouse is also available.

    :::image type="content" source="media/model-scoring-predict/create-output-table.png" alt-text="Screenshot of the step to create an output table for ML model predictions." lightbox="media/model-scoring-predict/create-output-table.png":::

1. Select **Next** to go to the "Map output columns" step.
1. Use the provided text fields to name the columns in the output table that stores the ML model's predictions.

    :::image type="content" source="media/model-scoring-predict/map-output-columns.png" alt-text="Screenshot of the step to map output columns for ML model predictions." lightbox="media/model-scoring-predict/map-output-columns.png":::

1. Select **Next** to go to the "Configure notebook" step.
1. Provide a name for a new notebook that will run the generated PREDICT code. The wizard displays a preview of the generated code at this step. You can copy the code to your clipboard and paste it into an existing notebook if you prefer.

    :::image type="content" source="media/model-scoring-predict/configure-notebook.png" alt-text="Screenshot of the step to configure a notebook for ML model predictions." lightbox="media/model-scoring-predict/configure-notebook.png":::

1. Select **Next** to go to the "Review and finish" step.
1. Review the details on the summary page and select **Create notebook** to add the new notebook with its generated code to your workspace. You're taken directly to that notebook, where you can run the code to generate and store predictions.

    :::image type="content" source="media/model-scoring-predict/review-and-finish.png" alt-text="Screenshot of the review-and-finish step for ML model predictions." lightbox="media/model-scoring-predict/review-and-finish.png":::

### Use a customizable code template

To use a code template for generating batch predictions:

1. Go to the item page for a given ML model version.
1. Select **Copy code to apply** from the **Apply this version** dropdown. The selection allows you to copy a customizable code template.

You can paste this code template into a notebook to generate batch predictions with your ML model. To successfully run the code template, you need to manually replace the following values:

- `<INPUT_TABLE>`: The file path for the table that provides inputs to the ML model
- `<INPUT_COLS>`: An array of column names from the input table to feed to the ML model
- `<OUTPUT_COLS>`: A name for a new column in the output table that stores predictions
- `<MODEL_NAME>`: The name of the ML model to use for generating predictions
- `<MODEL_VERSION>`: The version of the ML model to use for generating predictions
- `<OUTPUT_TABLE>`: The file path for the table that stores the predictions

:::image type="content" source="media/model-scoring-predict/copy-code.png" alt-text="Screenshot of the copy-code template for ML model predictions." lightbox="media/model-scoring-predict/copy-code.png":::

```Python
import mlflow 
from synapse.ml.predict import MLFlowTransformer 
 
df = spark.read.format("delta").load( 
    <INPUT_TABLE> # Your input table filepath here
) 
 
model = MLFlowTransformer( 
    inputCols=<INPUT_COLS>, # Your input columns here
    outputCol=<OUTPUT_COLS>, # Your new column name here
    modelName=<MODEL_NAME>, # Your ML model name here
    modelVersion=<MODEL_VERSION> # Your ML model version here
) 
df = model.transform(df) 
 
df.write.format('delta').mode("overwrite").save( 
    <OUTPUT_TABLE> # Your output table filepath here
)  
```

## Related content

- [End-to-end prediction example using a fraud detection model](fraud-detection.md)
- [How to train ML models with scikit-learn in Microsoft Fabric](train-models-scikit-learn.md)
