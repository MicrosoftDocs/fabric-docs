---
title: Train a Text Classifier
description: Train a Text Classifier
ms.topic: overview
ms.reviewer: jessiwang
author: jessiwang
ms.author: jessiwang
ms.date: 05/02/2023
---
# Deep Learning - Deep Text Classifier

In this tutorial, we demonstrate how to train and evaluate a deep text classifier using SynapseML. The classifier is trained on the Emotion Classification dataset, which contains text data labeled with emotions such as happiness, sadness, and anger.


## Environment Setup

First, install the cloudpickle package to use the Synapse module with Horovod.


```python
# install cloudpickle 2.0.0 to add synapse module for usage of horovod
%pip install cloudpickle==2.0.0 --force-reinstall --no-deps
```

Next, import Synapse and register it with cloudpickle.


```python
import synapse
import cloudpickle

cloudpickle.register_pickle_by_value(synapse)
```

Verify that the Horovod build is working.


```python
! horovodrun --check-build
```

## Read Dataset

Retrieve the Emotion Classification dataset and divide it into training and testing datasets.


```python
import urllib

urllib.request.urlretrieve(
    "https://mmlspark.blob.core.windows.net/publicwasb/text_classification/Emotion_classification.csv",
    "/tmp/Emotion_classification.csv",
)

import pandas as pd
from pyspark.ml.feature import StringIndexer

df = pd.read_csv("/tmp/Emotion_classification.csv")
df = spark.createDataFrame(df)

indexer = StringIndexer(inputCol="Emotion", outputCol="label")
indexer_model = indexer.fit(df)
df = indexer_model.transform(df).drop(("Emotion"))

train_df, test_df = df.randomSplit([0.85, 0.15], seed=1)
display(train_df)
```

## Training

Set up the training process using a pretrained BERT model as the foundation.


```python
from horovod.spark.common.store import DBFSLocalStore
from pytorch_lightning.callbacks import ModelCheckpoint
from synapse.ml.dl import *

checkpoint = "bert-base-uncased"
run_output_dir = f"/dbfs/FileStore/test/{checkpoint}"
store = DBFSLocalStore(run_output_dir)

epochs = 1

callbacks = [ModelCheckpoint(filename="{epoch}-{train_loss:.2f}")]
```

Create an instance of the DeepTextClassifier from SynapseML's `synapse.ml.dl` library, and fit the data.


```python
deep_text_classifier = DeepTextClassifier(
    checkpoint=checkpoint,
    store=store,
    callbacks=callbacks,
    num_classes=6,
    batch_size=16,
    epochs=epochs,
    validation=0.1,
    text_col="Text",
)

deep_text_model = deep_text_classifier.fit(train_df.limit(6000).repartition(50))
```

## Prediction

Finally, evaluate the performance of the trained model on the test dataset.


```python
from pyspark.ml.evaluation import MulticlassClassificationEvaluator

pred_df = deep_text_model.transform(test_df.limit(500))
evaluator = MulticlassClassificationEvaluator(
    predictionCol="prediction", labelCol="label", metricName="accuracy"
)
print("Test accuracy:", evaluator.evaluate(pred_df))
```
