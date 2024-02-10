---
title: 'Tutorial: Create, evaluate, and score a text classification model'
description: This tutorial demonstrates training and evaluating a text classification model by using a sample dataset of metadata for digitized books.
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 01/22/2024
#customer intent: As a data scientist, I want to build a text classification model so I can predict a category based on a single attribute.
---

# Tutorial: Create, evaluate, and score a text classification model

This tutorial presents an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow for a text classification model, in [!INCLUDE [product-name](../includes/product-name.md)]. The scenario uses word2vec and logistic regression, on Spark, to determine the genre of a book from the British Library book dataset, solely based on the book's title.

This tutorial covers these steps:

> [!div class="checklist"]
> * Install custom libraries
> * Load the data
> * Understand and process the data with exploratory data analysis
> * Train a machine learning model with word2vec and logistic regression, and track experiments by with MLflow and the Fabric autologging feature
> * Load the machine learning model for scoring and predictions

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

- If you don't have a Microsoft Fabric lakehouse, create one by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Follow along in a notebook

You can choose one of these options to follow along in a notebook:

- Open and run the built-in notebook in the Synapse Data Science experience
- Upload your notebook from GitHub to the Synapse Data Science experience

### Open the built-in notebook

The sample **Title genre classification** notebook accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

[AIsample - Title Genre Classification.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Title%20Genre%20Classification.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Title%20Genre%20Classification.ipynb -->

## Step 1: Install custom libraries

For machine learning model development or ad-hoc data analysis, you might need to quickly install a custom library for your Apache Spark session. You have two options to install libraries.

* Use the inline installation capabilities (`%pip` or `%conda`) of your notebook to install a library, in your current notebook only.
* Alternatively, you can create a Fabric environment, install libraries from public sources or upload custom libraries to it, and then your workspace admin can attach the environment as the default for the workspace. All the libraries in the environment will then become available for use in any notebooks and Spark job definitions in the workspace. For more information on environments, see [create, configure, and use an environment in Microsoft Fabric](https://aka.ms/fabric/create-environment).

For the classification model, use the `wordcloud` library to represent the word frequency in text, where the size of a word represents its frequency. For this tutorial, use `%pip install` to install `wordcloud` in your notebook.

> [!NOTE]
> The PySpark kernel restarts after `%pip install` runs. Install the needed libraries before you run any other cells.

```python
# Install wordcloud for text visualization by using pip
%pip install wordcloud
```

## Step 2: Load the data

The dataset has metadata about books from the British Library that a collaboration between the library and Microsoft digitized. The metadata is classification information to indicate whether a book is fiction or nonfiction. With this dataset, the goal is to train a classification model that determines the genre of a book, only based on its title.

|BL record ID|Type of resource|Name|Dates associated with name|Type of name|Role|All names|Title|Variant titles|Series title|Number within series|Country of publication|Place of publication|Publisher|Date of publication|Edition|Physical description|Dewey classification|BL shelfmark|Topics|Genre|Languages|Notes|BL record ID for physical resource|classification_id|user_id|created_at|subject_ids|annotator_date_pub|annotator_normalised_date_pub|annotator_edition_statement|annotator_genre|annotator_FAST_genre_terms|annotator_FAST_subject_terms|annotator_comments|annotator_main_language|annotator_other_languages_summaries|annotator_summaries_language|annotator_translation|annotator_original_language|annotator_publisher|annotator_place_pub|annotator_country|annotator_title|Link to digitized book|annotated|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|014602826|Monograph|Yearsley, Ann|1753-1806|person||More, Hannah, 1745-1833 [person]; Yearsley, Ann, 1753-1806 [person]|Poems on several occasions [With a prefatory letter by Hannah More.]||||England|London||1786|Fourth edition MANUSCRIPT note|||Digital Store 11644.d.32|||English||003996603||||||||||||||||||||||False|
|014602830|Monograph|A, T.||person||Oldham, John, 1653-1683 [person]; A, T. [person]|A Satyr against Vertue. (A poem: supposed to be spoken by a Town-Hector [By John Oldham. The preface signed: T. A.])||||England|London||1679||15 pages (4°)||Digital Store 11602.ee.10. (2.)|||English||000001143||||||||||||||||||||||False|

Define the following parameters so that you can apply this notebook on different datasets:

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

This code downloads a publicly available version of the dataset, and then stores it in a Fabric lakehouse.

> [!IMPORTANT]
> [Add a lakehouse](https://aka.ms/fabric/addlakehouse) to the notebook before you run it. Failure to do so will result in an error.

```python
if not IS_CUSTOM_DATA:
    # Download demo data files into the lakehouse, if they don't exist
    import os, requests

    remote_url = "https://synapseaisolutionsa.blob.core.windows.net/public/Title_Genre_Classification"
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

Before any processing, you need to import required libraries, including the libraries for [Spark](https://spark.apache.org/) and [SynapseML](https://aka.ms/AboutSynapseML):

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

Define some hyperparameters for model training.

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

Autologging extends the MLflow logging capabilities. Autologging automatically captures the input parameter values and output metrics of a machine learning model as you train it. You then log this information to the workspace. In the workspace, you can access and visualize the information with the MLflow APIs, or the corresponding experiment, in the workspace. To learn more about autologging, see [Autologging in Microsoft Fabric](https://aka.ms/fabric-autologging).

```python
# Set up Mlflow for experiment tracking

mlflow.set_experiment(EXPERIMENT_NAME)
mlflow.autolog(disable=True)  # Disable Mlflow autologging
```

To disable Microsoft Fabric autologging in a notebook session, call `mlflow.autolog()` and set `disable=True`:

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

Remove the duplicates to clean the data:

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

Split the paragraphs and sentences into smaller units, to tokenize the dataset. This way, it becomes easier to assign meaning. Then, remove the stopwords to improve the performance. Stopword removal involves removal of words that commonly occur across all documents in the corpus. Stopword removal is one of the most commonly used preprocessing steps in natural language processing (NLP) applications.

```python
# Text transformer
tokenizer = Tokenizer(inputCol=TEXT_COL, outputCol="tokens")
stopwords_remover = StopWordsRemover(inputCol="tokens", outputCol="filtered_tokens")

# Build the pipeline
pipeline = Pipeline(stages=[tokenizer, stopwords_remover])

token_df = pipeline.fit(df).transform(df)

display(token_df.limit(20))
```

Display the wordcloud library for each class. A wordcloud library is a visually prominent presentation of keywords that appear frequently in text data. The wordcloud library is effective because the rendering of keywords forms a cloudlike color picture, to better capture the main text data at a glance. [Learn more about wordcloud](https://github.com/amueller/word_cloud).

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

Finally, use word2vec to vectorize the text. The word2vec technique creates a vector representation of each word in the text. Words used in similar contexts, or that have semantic relationships, are captured effectively through their closeness in the vector space. This closeness indicates that similar words have similar word vectors.

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

```python
# Split the dataset into training and testing
(train_df, test_df) = vec_df.randomSplit((0.8, 0.2), seed=42)
```

### Track machine learning experiments

A machine learning experiment is the primary unit of organization and control for all related machine learning runs. A run corresponds to a single execution of model code.

Machine learning experiment tracking manages all the experiments and their components, for example parameters, metrics, models, and other artifacts. Tracking enables organization of all the required components of a specific machine learning experiment. It also enables the easy reproduction of past results with saved experiments. [Learn more about machine learning experiments in Microsoft Fabric](https://aka.ms/synapse-experiment).

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

Build a grid of parameters to search over the hyperparameters. Then build a cross-evaluator estimator, to produce a `CrossValidator` model:

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

We can evaluate the models on the test dataset, to compare them. A well trained model should demonstrate high performance, on the relevant metrics, when run against the validation and test datasets.

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

Start the training and evaluation process. Use MLflow to track all experiments, and log parameters, metrics, and models. All this information is logged under the experiment name in the workspace.

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

Microsoft Fabric allows users to operationalize machine learning models with the `PREDICT` scalable function. This function supports batch scoring (or batch inferencing) in any compute engine. You can create batch predictions straight from a notebook or the item page for a particular model. To learn more about PREDICT and how to use it in Fabric, see [Machine learning model scoring with PREDICT in Microsoft Fabric](https://aka.ms/fabric-predict).

From the preceding evaluation results, model 1 has the largest metrics for both Area Under the Precision-Recall Curve (AUPRC) and for Area Under the Curve Receiver Operating Characteristic (AUC-ROC). Therefore, you should use model 1 for prediction.

The AUC-ROC measure is widely used to measure binary classifiers performance. However, it sometimes becomes more appropriate to evaluate the classifier based on AUPRC measurements. The AUC-ROC chart visualizes the trade-off between true positive rate (TPR) and false positive rate (FPR). The AUPRC curve combines precision (positive predictive value or PPV) and recall (true positive rate or TPR) in a single visualization.

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