---
title: 'Tutorial: Create, evaluate, and score a text classification model'
description: This tutorial demonstrates training and evaluating a text classification model by using a sample dataset of metadata for digitized books.
ms.author: lagayhar
author: lgayhardt
ms.reviewer: None
ms.topic: tutorial
ms.custom: sfi-image-nochange
ms.date: 04/16/2025
#customer intent: As a data scientist, I want to build a text classification model so I can predict a category based on a single attribute.
reviewer: s-polly
---

# Tutorial: Create, evaluate, and score a text classification model

This tutorial presents an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow for a text classification model, in [!INCLUDE [product-name](../includes/product-name.md)]. The scenario uses both Word2vec natural language processing (NLP), and logistic regression, on Spark, to determine the genre of a book from the British Library book dataset. The determination is solely based on the title of the book.

This tutorial covers these steps:

> [!div class="checklist"]
> * Install custom libraries
> * Load the data
> * Understand and process the data with exploratory data analysis
> * Train a machine learning model with both Word2vec NLP and logistic regression, and track experiments with MLflow and the Fabric autologging feature
> * Load the machine learning model for scoring and predictions

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

- If you don't have a Microsoft Fabric lakehouse, follow the steps in the [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md) resource to create one.

## Follow along in a notebook

To follow along in a notebook, you have these options:

- Open and run the built-in notebook.
- Upload your notebook from GitHub.

### Open the built-in notebook

The sample **Title genre classification** notebook accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

[AIsample - Title Genre Classification.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Title%20Genre%20Classification.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Title%20Genre%20Classification.ipynb -->

## Step 1: Install custom libraries

For machine learning model development or ad-hoc data analysis, you might need to quickly install a custom library for your Apache Spark session. You have two options to install a library.

* To install a library, in your current notebook only, use the inline installation capabilities (`%pip` or `%conda`) of your notebook.
* As an alternative, you can create a Fabric environment, and install libraries from public sources or upload custom libraries to it. Then, your workspace admin can attach the environment as the default for the workspace. At that point, all the libraries in the environment become available for use in all notebooks and all Spark job definitions in that workspace. For more information about environments, visit the [create, configure, and use an environment in Microsoft Fabric](https://aka.ms/fabric/create-environment) resource.

For the classification model, use the `wordcloud` library to represent the word frequency in text. In `wordcloud` resources, the size of a word represents its frequency. For this tutorial, use `%pip install` to install `wordcloud` in your notebook.

> [!NOTE]
> The PySpark kernel restarts after `%pip install` runs. Install the libraries you need before you run any other cells.

```python
# Install wordcloud for text visualization by using pip
%pip install wordcloud
```

## Step 2: Load the data

The British Library book dataset has metadata about books from the British Library. A collaboration between the library and Microsoft digitized the original resources that became the dataset. The metadata is classification information that indicates whether or not a book is fiction or nonfiction. The following diagram shows a row sample of the dataset.

|BL record ID|Type of resource|Name|Dates associated with name|Type of name|Role|All names|Title|Variant titles|Series title|Number within series|Country of publication|Place of publication|Publisher|Date of publication|Edition|Physical description|Dewey classification|BL shelfmark|Topics|Genre|Languages|Notes|BL record ID for physical resource|classification_id|user_id|created_at|subject_ids|annotator_date_pub|annotator_normalised_date_pub|annotator_edition_statement|annotator_genre|annotator_FAST_genre_terms|annotator_FAST_subject_terms|annotator_comments|annotator_main_language|annotator_other_languages_summaries|annotator_summaries_language|annotator_translation|annotator_original_language|annotator_publisher|annotator_place_pub|annotator_country|annotator_title|Link to digitized book|annotated|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|014602826|Monograph|Yearsley, Ann|1753-1806|person||More, Hannah, 1745-1833 [person]; Yearsley, Ann, 1753-1806 [person]|Poems on several occasions [With a prefatory letter by Hannah More.]||||England|London||1786|Fourth edition MANUSCRIPT note|||Digital Store 11644.d.32|||English||003996603||||||||||||||||||||||False|
|014602830|Monograph|A, T.||person||Oldham, John, 1653-1683 [person]; A, T. [person]|A Satyr against Vertue. (A poem: supposed to be spoken by a Town-Hector [By John Oldham. The preface signed: T. A.])||||England|London||1679||15 pages (4°)||Digital Store 11602.ee.10. (2.)|||English||000001143||||||||||||||||||||||False|

With this dataset, our goal is to train a classification model that determines the genre of a book, based only on the book title.

Define the following parameters, to apply this notebook on different datasets:

```python
IS_CUSTOM_DATA = False  # If True, the user must manually upload the dataset
DATA_FOLDER = "Files/title-genre-classification"
DATA_FILE = "blbooksgenre.csv"

# Data schema
TEXT_COL = "Title"
LABEL_COL = "annotator_genre"
LABELS = ["Fiction", "Non-fiction"]

EXPERIMENT_NAME = "sample-aisample-textclassification"  # MLflow experiment name
```

### Download the dataset and upload to the lakehouse

The following code snippet downloads a publicly available version of the dataset, and then stores it in a Fabric lakehouse:

> [!IMPORTANT]
> [Add a lakehouse](https://aka.ms/fabric/addlakehouse) to the notebook before you run it. Failure to do so resultS in an error.

```python
if not IS_CUSTOM_DATA:
    # Download demo data files into the lakehouse, if they don't exist
    import os, requests

    remote_url = "https://synapseaisolutionsa.z13.web.core.windows.net/data/Title_Genre_Classification"
    fname = "blbooksgenre.csv"
    download_path = f"/lakehouse/default/{DATA_FOLDER}/raw"

    if not os.path.exists("/lakehouse/default"):
        # Add a lakehouse, if no default lakehouse was added to the notebook
        # A new notebook won't link to any lakehouse by default
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

### Import required libraries

Before any processing, you must import the required libraries, including the libraries for [Spark](https://spark.apache.org/) and [SynapseML](https://aka.ms/AboutSynapseML):

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

### Define hyperparameters

The following code snippet defines the necessary hyperparameters for model training:

> [!IMPORTANT]
> Modify these hyperparameters only if you understand each parameter.

```python
# Hyperparameters 
word2vec_size = 128  # The length of the vector for each word
min_word_count = 3  # The minimum number of times that a word must appear to be considered
max_iter = 10  # The maximum number of training iterations
k_folds = 3  # The number of folds for cross-validation
```

Start recording the time needed to run this notebook:

```python
# Record the notebook running time
import time

ts = time.time()
```

### Set up MLflow experiment tracking

Autologging extends the MLflow logging capabilities. Autologging automatically captures the input parameter values and output metrics of a machine learning model as you train it. You then log this information to the workspace. In the workspace, you can access and visualize the information with the MLflow APIs, or the corresponding experiment, in the workspace. For more information about autologging, visit the [Autologging in Microsoft Fabric](https://aka.ms/fabric-autologging) resource.

To disable Microsoft Fabric autologging in a notebook session, call `mlflow.autolog()` and set `disable=True`:

```python
# Set up Mlflow for experiment tracking

mlflow.set_experiment(EXPERIMENT_NAME)
mlflow.autolog(disable=True)  # Disable Mlflow autologging
```

### Read raw date data from the lakehouse

```python
raw_df = spark.read.csv(f"{DATA_FOLDER}/raw/{DATA_FILE}", header=True, inferSchema=True)
```

## Step 3: Perform exploratory data analysis

Explore the dataset with the `display` command, to view high-level statistics for the dataset and to show the chart views:

```python
display(raw_df.limit(20))
```

### Prepare the data

To clean the data, remove the duplicates:

```python
df = (
    raw_df.select([TEXT_COL, LABEL_COL])
    .where(F.col(LABEL_COL).isin(LABELS))
    .dropDuplicates([TEXT_COL])
    .cache()
)

display(df.limit(20))
```

Apply class balancing to address any bias:

```python
# Create a ClassBalancer instance, and set the input column to LABEL_COL
cb = ClassBalancer().setInputCol(LABEL_COL)

# Fit the ClassBalancer instance to the input DataFrame, and transform the DataFrame
df = cb.fit(df).transform(df)

# Display the first 20 rows of the transformed DataFrame
display(df.limit(20))
```

To tokenize the dataset, split the paragraphs and sentences into smaller units. This way, it becomes easier to assign meaning. Next, remove the stopwords to improve the performance. Stopword removal involves removal of words that commonly occur across all documents in the corpus. Stopword removal is one of the most commonly used preprocessing steps in natural language processing (NLP) applications. The following code snippet covers these steps:

```python
# Text transformer
tokenizer = Tokenizer(inputCol=TEXT_COL, outputCol="tokens")
stopwords_remover = StopWordsRemover(inputCol="tokens", outputCol="filtered_tokens")

# Build the pipeline
pipeline = Pipeline(stages=[tokenizer, stopwords_remover])

token_df = pipeline.fit(df).transform(df)

display(token_df.limit(20))
```

Display the wordcloud library for each class. A wordcloud library presents keywords that appear frequently in text data, is a visually prominent presentation. The wordcloud library is effective because the keyword rendering forms a cloudlike color picture, to better capture the main text data at a glance. Visit [this resource](https://github.com/amueller/word_cloud) for more information about wordcloud.

The following code snippet covers these steps:

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

    # Generate a wordcloud image
    wordcloud = WordCloud(
        scale=10,
        background_color="white",
        random_state=42,  # Make sure the output is always the same for the same input
    ).generate_from_frequencies(dict(top50_tokens))

    # Display the generated image by using matplotlib
    plt.figure(figsize=(10, 10))
    plt.title(label, fontsize=20)
    plt.axis("off")
    plt.imshow(wordcloud, interpolation="bilinear")
```

Finally, use Word2vec NLP to vectorize the text. The Word2vec NLP technique creates a vector representation of each word in the text. Words used in similar contexts, or that have semantic relationships, are captured effectively through their closeness in the vector space. This closeness indicates that similar words have similar word vectors. The following code snippet covers these steps:

```python
# Label transformer
label_indexer = StringIndexer(inputCol=LABEL_COL, outputCol="labelIdx")
vectorizer = Word2Vec(
    vectorSize=word2vec_size,
    minCount=min_word_count,
    inputCol="filtered_tokens",
    outputCol="features",
)

# Build the pipeline
pipeline = Pipeline(stages=[label_indexer, vectorizer])
vec_df = (
    pipeline.fit(token_df)
    .transform(token_df)
    .select([TEXT_COL, LABEL_COL, "features", "labelIdx", "weight"])
)

display(vec_df.limit(20))
```

## Step 4: Train and evaluate the model

With the data in place, define the model. In this section, you train a logistic regression model to classify the vectorized text.

### Prepare training and test datasets

The following code snippet splits the dataset:

```python
# Split the dataset into training and testing
(train_df, test_df) = vec_df.randomSplit((0.8, 0.2), seed=42)
```

### Track machine learning experiments

Machine learning experiment tracking manages all the experiments and their components - for example, parameters, metrics, models, and other artifacts. Tracking enables the organization and management of all the components that a specific machine learning experiment requires. It also enables the easy reproduction of past results with saved experiments. Visit [Machine learning experiments in Microsoft Fabric](./machine-learning-experiment.md) for more information.

A machine learning experiment is the primary unit of organization and control for all related machine learning runs. A run corresponds to a single execution of model code. The following code snippet covers these steps:

```python
# Build the logistic regression classifier
lr = (
    LogisticRegression()
    .setMaxIter(max_iter)
    .setFeaturesCol("features")
    .setLabelCol("labelIdx")
    .setWeightCol("weight")
)
```

### Tune hyperparameters

Build a grid of parameters to search over the hyperparameters. Then build a cross-evaluator estimator, to produce a `CrossValidator` model, as shown in the following code snippet:

```python
# Build a grid search to select the best values for the training parameters
param_grid = (
    ParamGridBuilder()
    .addGrid(lr.regParam, [0.03, 0.1])
    .addGrid(lr.elasticNetParam, [0.0, 0.1])
    .build()
)

if len(LABELS) > 2:
    evaluator_cls = MulticlassClassificationEvaluator
    evaluator_metrics = ["f1", "accuracy"]
else:
    evaluator_cls = BinaryClassificationEvaluator
    evaluator_metrics = ["areaUnderROC", "areaUnderPR"]
evaluator = evaluator_cls(labelCol="labelIdx", weightCol="weight")

# Build a cross-evaluator estimator
crossval = CrossValidator(
    estimator=lr,
    estimatorParamMaps=param_grid,
    evaluator=evaluator,
    numFolds=k_folds,
    collectSubModels=True,
)
```

### Evaluate the model

We can evaluate the models on the test dataset, to compare them. A well-trained model should demonstrate high performance, on the relevant metrics, when run against the validation and test datasets. The following code snippet covers these steps:

```python
def evaluate(model, df):
    log_metric = {}
    prediction = model.transform(df)
    for metric in evaluator_metrics:
        value = evaluator.evaluate(prediction, {evaluator.metricName: metric})
        log_metric[metric] = value
        print(f"{metric}: {value:.4f}")
    return prediction, log_metric
```

### Track experiments by using MLflow

Start the training and evaluation process. Use MLflow to track all experiments, and log the parameters, metrics, and models. In the workspace, all of this information is logged under the experiment name. The following code snippet covers these steps:

```python
with mlflow.start_run(run_name="lr"):
    models = crossval.fit(train_df)
    best_metrics = {k: 0 for k in evaluator_metrics}
    best_index = 0
    for idx, model in enumerate(models.subModels[0]):
        with mlflow.start_run(nested=True, run_name=f"lr_{idx}") as run:
            print("\nEvaluating on test data:")
            print(f"subModel No. {idx + 1}")
            prediction, log_metric = evaluate(model, test_df)

            if log_metric[evaluator_metrics[0]] > best_metrics[evaluator_metrics[0]]:
                best_metrics = log_metric
                best_index = idx

            print("log model")
            mlflow.spark.log_model(
                model,
                f"{EXPERIMENT_NAME}-lrmodel",
                registered_model_name=f"{EXPERIMENT_NAME}-lrmodel",
                dfs_tmpdir="Files/spark",
            )

            print("log metrics")
            mlflow.log_metrics(log_metric)

            print("log parameters")
            mlflow.log_params(
                {
                    "word2vec_size": word2vec_size,
                    "min_word_count": min_word_count,
                    "max_iter": max_iter,
                    "k_folds": k_folds,
                    "DATA_FILE": DATA_FILE,
                }
            )

    # Log the best model and its relevant metrics and parameters to the parent run
    mlflow.spark.log_model(
        models.subModels[0][best_index],
        f"{EXPERIMENT_NAME}-lrmodel",
        registered_model_name=f"{EXPERIMENT_NAME}-lrmodel",
        dfs_tmpdir="Files/spark",
    )
    mlflow.log_metrics(best_metrics)
    mlflow.log_params(
        {
            "word2vec_size": word2vec_size,
            "min_word_count": min_word_count,
            "max_iter": max_iter,
            "k_folds": k_folds,
            "DATA_FILE": DATA_FILE,
        }
    )

```

To view your experiments:

1. Select your workspace in the left nav
1. Find and select the experiment name - in this case, **sample_aisample-textclassification**

:::image type="content" source="./media/title-genre-classification/text-classification-experiment.png" alt-text="Screenshot of an experiment." lightbox="media/title-genre-classification/text-classification-experiment.png":::

## Step 5: Score and save prediction results

Microsoft Fabric allows users to operationalize machine learning models with the scalable `PREDICT` function. This function supports batch scoring (or batch inferencing) in any compute engine. You can create batch predictions straight from a notebook or from the item page for a particular model. For more information about the `PREDICT` function, and how to use it in Fabric, visit [Machine learning model scoring with PREDICT in Microsoft Fabric](./model-scoring-predict.md).

From our evaluation results, model 1 has the largest metrics for both Area Under the Precision-Recall Curve (AUPRC) and for Area Under the Curve Receiver Operating Characteristic (AUC-ROC). Therefore, you should use model 1 for prediction.

The AUC-ROC measure is widely used to measure binary classifiers performance. However, it sometimes becomes more appropriate to evaluate the classifier based on AUPRC measurements. The AUC-ROC chart visualizes the trade-off between true positive rate (TPR) and false positive rate (FPR). The AUPRC curve combines both precision (positive predictive value or PPV) and recall (true positive rate or TPR) in a single visualization. The following code snippets cover these steps:

```python
# Load the best model
model_uri = f"models:/{EXPERIMENT_NAME}-lrmodel/1"
loaded_model = mlflow.spark.load_model(model_uri, dfs_tmpdir="Files/spark")

# Verify the loaded model
batch_predictions = loaded_model.transform(test_df)
batch_predictions.show(5)
```

```python
# Code to save userRecs in the lakehouse
batch_predictions.write.format("delta").mode("overwrite").save(
    f"{DATA_FOLDER}/predictions/batch_predictions"
)
```

```python
# Determine the entire runtime
print(f"Full run cost {int(time.time() - ts)} seconds.")
```

<!-- nbend -->

## Related content

- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)
