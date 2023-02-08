---
title: Train and evaluate a text classification model
description: AI sample for training and evaluating a text classification model.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: tutorial
ms.date: 02/10/2023
---

# Training and evaluating a text classification model

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

## Introduction

In this notebook, we'll demonstrate how to solve a text classification task with word2vec + linear-regression model on Spark.

The sample dataset we used here consists of metadata relating to books digitized by the British Library in partnership with Microsoft. It includes human generated labels for whether a book is 'fiction' or 'non-fiction'. We use this dataset to train a model for genre classification that predicts whether a book is 'fiction' or 'non-fiction' based on its title.

| BL record ID | Type of resource | Name | Dates associated with name | Type of name | Role | All names | Title | Variant titles | Series title | Number within series | Country of publication | Place of publication | Publisher | Date of publication | Edition | Physical description | Dewey classification | BL shelfmark | Topics | Genre | Languages | Notes | BL record ID for physical resource | classification_id | user_id | created_at | subject_ids | annotator_date_pub | annotator_normalised_date_pub | annotator_edition_statement | annotator_genre | annotator_FAST_genre_terms | annotator_FAST_subject_terms | annotator_comments | annotator_main_language | annotator_other_languages_summaries | annotator_summaries_language | annotator_translation | annotator_original_language | annotator_publisher | annotator_place_pub | annotator_country | annotator_title | Link to digitized book | annotated |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 014602826 | Monograph | Yearsley, Ann | 1753-1806 | person |  | More, Hannah, 1745-1833 [person] ; Yearsley, Ann, 1753-1806 [person] | Poems on several occasions [With a prefatory letter by Hannah More.] |  |  |  | England | London |  | 1786 | Fourth edition MANUSCRIPT note |  |  | Digital Store 11644.d.32 |  |  | English |  | 003996603 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | False |
| 014602830 | Monograph | A, T. |  | person |  | Oldham, John, 1653-1683 [person] ; A, T. [person] | A Satyr against Vertue. (A poem: supposed to be spoken by a Town-Hector [By John Oldham. The preface signed: T. A.]) |  |  |  | England | London |  | 1679 |  | 15 pages (4°) |  | Digital Store 11602.ee.10. (2.) |  |  | English |  | 000001143 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | False |

## Step 1: Load the data

### Notebook configurations

#### Install libraries

In this notebook, we'll use `wordcloud`, which first needs to be installed. The PySpark kernel will be restarted after `%pip install`, thus we need to install it before we run any other cells.

```python
# install wordcloud for text visualization
%pip install wordcloud
```

By defining the following parameters, we can apply this notebook on different datasets easily.

```python
IS_CUSTOM_DATA = False  # if True, dataset has to be uploaded manually by user
DATA_FOLDER = "Files/title-genre-classification"
DATA_FILE = "blbooksgenre.csv"

# data schema
TEXT_COL = "Title"
LABEL_COL = "annotator_genre"
LABELS = ["Fiction", "Non-fiction"]

EXPERIMENT_NAME = "aisample-textclassification"  # mlflow experiment name
```

We also define some hyper-parameters for model training. **(DON'T modify these parameters unless you are aware of the meaning).**

```python
# hyper-params
word2vec_size = 128
min_word_count = 3
max_iter = 10
k_folds = 3
```

### Import dependencies

```python
import numpy as np
from itertools import chain

from wordcloud import WordCloud
import matplotlib.pyplot as plt
import seaborn as sns

import pyspark.sql.functions as F

from pyspark.ml import Pipeline
from pyspark.ml.feature import *
from pyspark.ml.tuning import CrossValidator, ParamGridBuilder
from pyspark.ml.classification import LogisticRegression
from pyspark.ml.evaluation import (
    BinaryClassificationEvaluator,
    MulticlassClassificationEvaluator,
)

from synapse.ml.stages import ClassBalancer
from synapse.ml.train import ComputeModelStatistics

import mlflow
```

### Download dataset and upload to Lakehouse

**Please add a Lakehouse to the notebook before running it.**

```python
if not IS_CUSTOM_DATA:
    # Download demo data files into lakehouse if not exist
    import os, requests

    remote_url = "https://synapseaisolutionsa.blob.core.windows.net/public/Title_Genre_Classification"
    fname = "blbooksgenre.csv"
    download_path = f"/lakehouse/default/{DATA_FOLDER}/raw"

    if not os.path.exists("/lakehouse/default"):
        raise FileNotFoundError(
            "Default lakehouse not found, please add a lakehouse and restart the session."
        )
    os.makedirs(download_path, exist_ok=True)
    if not os.path.exists(f"{download_path}/{fname}"):
        r = requests.get(f"{remote_url}/{fname}", timeout=30)
        with open(f"{download_path}/{fname}", "wb") as f:
            f.write(r.content)
    print("Downloaded demo data files into lakehouse.")
```

### Read data from Lakehouse

```python
raw_df = spark.read.csv(f"{DATA_FOLDER}/raw/{DATA_FILE}", header=True, inferSchema=True)

display(raw_df.limit(20))
```

## Step 2: Preprocess data

### Data clean

```python
df = (
    raw_df.select([TEXT_COL, LABEL_COL])
    .where(F.col(LABEL_COL).isin(LABELS))
    .dropDuplicates([TEXT_COL])
    .cache()
)

display(df.limit(20))
```

### Deal with unbalanced data

```python
cb = ClassBalancer().setInputCol(LABEL_COL)

df = cb.fit(df).transform(df)
display(df.limit(20))
```

### Tokenize

```python
## text transformer
tokenizer = Tokenizer(inputCol=TEXT_COL, outputCol="tokens")
stopwords_remover = StopWordsRemover(inputCol="tokens", outputCol="filtered_tokens")

## build the pipeline
pipeline = Pipeline(stages=[tokenizer, stopwords_remover])

token_df = pipeline.fit(df).transform(df)

display(token_df.limit(20))
```

### Visualization

Display a wordcloud for each class.

```python
# WordCloud
for label in LABELS:
    tokens = (
        token_df.where(F.col(LABEL_COL) == label)
        .select(F.explode("filtered_tokens").alias("token"))
        .where(F.col("token").rlike(r"^\w+$"))
    )

    top50_tokens = (
        tokens.groupBy("token").count().orderBy(F.desc("count")).limit(50).collect()
    )

    # Generate a word cloud image
    wordcloud = WordCloud(
        scale=10,
        background_color="white",
        random_state=42,  # Make sure the output is always the same for the same input
    ).generate_from_frequencies(dict(top50_tokens))

    # Display the generated image the matplotlib way:
    plt.figure(figsize=(10, 10))
    plt.title(label, fontsize=20)
    plt.axis("off")
    plt.imshow(wordcloud, interpolation="bilinear")
```

### Vectorize

We use word2vec to vectorize text.

```python
## label transformer
label_indexer = StringIndexer(inputCol=LABEL_COL, outputCol="labelIdx")
vectorizer = Word2Vec(
    vectorSize=word2vec_size,
    minCount=min_word_count,
    inputCol="filtered_tokens",
    outputCol="features",
)

## build the pipeline
pipeline = Pipeline(stages=[label_indexer, vectorizer])
vec_df = (
    pipeline.fit(token_df)
    .transform(token_df)
    .select([TEXT_COL, LABEL_COL, "features", "labelIdx", "weight"])
)

display(vec_df.limit(20))
```

## Step 3: Model training and evaluation

We've cleaned the dataset, dealt with unbalanced data, tokenized the text, displayed word cloud and vectorized the text.

Next, we'll train a linear regression model to classify the vectorized text.

### Split dataset into train and test

```python
(train_df, test_df) = vec_df.randomSplit((0.8, 0.2), seed=42)
```

### Create the model

```python
lr = (
    LogisticRegression()
    .setMaxIter(max_iter)
    .setFeaturesCol("features")
    .setLabelCol("labelIdx")
    .setWeightCol("weight")
)
```

### Train model with cross validation

```python
param_grid = (
    ParamGridBuilder()
    .addGrid(lr.regParam, [0.03, 0.1, 0.3])
    .addGrid(lr.elasticNetParam, [0.0, 0.1, 0.2])
    .build()
)

if len(LABELS) > 2:
    evaluator_cls = MulticlassClassificationEvaluator
    evaluator_metrics = ["f1", "accuracy"]
else:
    evaluator_cls = BinaryClassificationEvaluator
    evaluator_metrics = ["areaUnderROC", "areaUnderPR"]
evaluator = evaluator_cls(labelCol="labelIdx", weightCol="weight")

crossval = CrossValidator(
    estimator=lr, estimatorParamMaps=param_grid, evaluator=evaluator, numFolds=k_folds
)

model = crossval.fit(train_df)
```

### Evaluate the model

```python
predictions = model.transform(test_df)

display(predictions)
```

```python
log_metrics = {}
for metric in evaluator_metrics:
    value = evaluator.evaluate(predictions, {evaluator.metricName: metric})
    log_metrics[metric] = value
    print(f"{metric}: {value:.4f}")
```

```python
metrics = ComputeModelStatistics(
    evaluationMetric="classification", labelCol="labelIdx", scoredLabelsCol="prediction"
).transform(predictions)
display(metrics)
```

```python
# collect confusion matrix value
cm = metrics.select("confusion_matrix").collect()[0][0].toArray()
print(cm)

# plot confusion matrix
sns.set(rc={"figure.figsize": (6, 4.5)})
ax = sns.heatmap(cm, annot=True, fmt=".20g")
ax.set_title("Confusion Matrix")
ax.set_xlabel("Predicted label")
ax.set_ylabel("True label")
```

### Log and Load Model with MLflow

Now we get a good model, we can save it for later use. Here we use MLflow to log metrics/models, and load models back for prediction.

```python
# setup mlflow
mlflow.set_experiment(EXPERIMENT_NAME)
```

```python
# log model, metrics and params
with mlflow.start_run() as run:
    print("log model:")
    mlflow.spark.log_model(
        model,
        f"{EXPERIMENT_NAME}-lrmodel",
        registered_model_name=f"{EXPERIMENT_NAME}-lrmodel",
        dfs_tmpdir="Files/spark",
    )

    print("log metrics:")
    mlflow.log_metrics(log_metrics)

    print("log parameters:")
    mlflow.log_params(
        {
            "word2vec_size": word2vec_size,
            "min_word_count": min_word_count,
            "max_iter": max_iter,
            "k_folds": k_folds,
            "DATA_FILE": DATA_FILE,
        }
    )

    model_uri = f"runs:/{run.info.run_id}/{EXPERIMENT_NAME}-lrmodel"
    print("Model saved in run %s" % run.info.run_id)
    print(f"Model URI: {model_uri}")
```

```python
# load model back
loaded_model = mlflow.spark.load_model(model_uri, dfs_tmpdir="Files/spark")

# verify loaded model
predictions = loaded_model.transform(test_df)
display(predictions)
```
