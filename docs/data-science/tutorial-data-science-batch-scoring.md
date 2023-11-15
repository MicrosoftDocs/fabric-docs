---
title: "Tutorial: Perform batch scoring and save predictions"
description: In this fourth part of the tutorial series, learn how to import a trained and registered model and perform batch predictions on a test dataset.
ms.reviewer: sgilley
ms.author: narsam
author: narmeens
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/16/2023
---

# Tutorial Part 4: Perform batch scoring and save predictions to a lakehouse

In this tutorial, you'll learn to import the registered LightGBMClassifier model that was trained in part 3 using the Microsoft Fabric MLflow model registry, and perform batch predictions on a test dataset loaded from a lakehouse.



Microsoft Fabric allows you to operationalize machine learning models with a scalable function called PREDICT, which supports batch scoring in any compute engine. You can generate batch predictions directly from a Microsoft Fabric notebook or from a given model's item page. Learn about [PREDICT](https://aka.ms/fabric-predict).  

To generate batch predictions on the test dataset, you'll use version 1 of the trained LightGBM model that demonstrated the best performance among all trained machine learning models. You'll load the test dataset into a spark DataFrame and create an MLFlowTransformer object to generate batch predictions. You can then invoke the PREDICT function using one of following three ways:

> [!div class="checklist"]
>
> * Transformer API from SynapseML
> * Spark SQL API
> * PySpark user-defined function (UDF)

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

This part 4 of 5 in the tutorial series. To complete this tutorial, first complete:

* [Part 1: Ingest data into a Microsoft Fabric lakehouse using Apache Spark](tutorial-data-science-ingest-data.md).  
* [Part 2: Explore and visualize data using Microsoft Fabric notebooks](tutorial-data-science-explore-notebook.md) to learn more about the data.
* [Part 3: Train and register machine learning models](tutorial-data-science-train-models.md).

## Follow along in notebook

[4-predict.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/4-predict.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

> [!IMPORTANT]
> Attach the same lakehouse you used in the other parts of this series.

<!-- nbstart https://raw.githubusercontent.com/sdgilley/fabric-samples/sdg-new-happy-path/docs-samples/data-science/data-science-tutorial/4-predict.ipynb -->

## Load the test data

Load the test data that you saved in Part 3.


```python
df_test = spark.read.format("delta").load("Tables/df_test")
display(df_test)
```

### PREDICT with the Transformer API

To use the Transformer API from SynapseML, you'll need to first create an MLFlowTransformer object.

### Instantiate MLFlowTransformer object

The MLFlowTransformer object is a wrapper around the MLFlow model that you registered in Part 3. It allows you to generate batch predictions on a given DataFrame. To instantiate the MLFlowTransformer object, you'll need to provide the following parameters:

- The columns from the test DataFrame that you need as input to the model (in this case, you would need all of them).
- A name for the new output column (in this case, predictions).
- The correct model name and model version to generate the predictions (in this case, `lgbm_sm` and version 1).


```python
from synapse.ml.predict import MLFlowTransformer

model = MLFlowTransformer(
    inputCols=list(df_test.columns),
    outputCol='predictions',
    modelName='lgbm_sm',
    modelVersion=1
)
```

Now that you have the MLFlowTransformer object, you can use it to generate batch predictions.


```python
import pandas

predictions = model.transform(df_test)
display(predictions)
```

### PREDICT with the Spark SQL API

The following code invokes the PREDICT function with the Spark SQL API.

```python
from pyspark.ml.feature import SQLTransformer 

# Substitute "model_name", "model_version", and "features" below with values for your own model name, model version, and feature columns
model_name = 'lgbm_sm'
model_version = 1
features = df_test.columns

sqlt = SQLTransformer().setStatement( 
    f"SELECT PREDICT('{model_name}/{model_version}', {','.join(features)}) as predictions FROM __THIS__")

# Substitute "X_test" below with your own test dataset
display(sqlt.transform(df_test))
```

### PREDICT with a user-defined function (UDF)

The following code invokes the PREDICT function with a PySpark UDF.

```python
from pyspark.sql.functions import col, pandas_udf, udf, lit

# Substitute "model" and "features" below with values for your own model name and feature columns
my_udf = model.to_udf()
features = df_test.columns

display(df_test.withColumn("predictions", my_udf(*[col(f) for f in features])))
```
Note that you can also generate PREDICT code from a model's item page. Learn about [PREDICT](https://aka.ms/fabric/predict-from-model-item).

## Write model prediction results to the lakehouse

Once you have generated batch predictions, write the model prediction results back to the lakehouse.  

```python
# Save predictions to lakehouse to be used for generating a Power BI report
table_name = "customer_churn_test_predictions"
predictions.write.format('delta').mode("overwrite").save(f"Tables/{table_name}")
print(f"Spark DataFrame saved to delta table: {table_name}")
```

<!-- nbend -->


## Next step

Continue on to:

> [!div class="nextstepaction"]
> [Part 5: Create a Power BI report to visualize predictions](tutorial-data-science-create-report.md)
