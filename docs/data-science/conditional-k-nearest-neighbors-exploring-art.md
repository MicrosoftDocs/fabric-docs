---
title: Conditional k-NN (K-Nearest-Neighbors) Art Exploration Across Cultures
description: A guideline for match-finding via k-nearest-neighbors.
ms.topic: how-to
ms.custom: 
ms.author: scottpolly
author: s-polly
ms.reviewer: scottpolly
reviewer: JessicaXYWang
ms.date: 04/04/2025
---

# Explore art across culture and mediums with the fast, conditional, k-nearest neighbors algorithm

This article describes match-finding via the [k-nearest-neighbors algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm). You build code resources that allow queries involving cultures and mediums of art amassed from the Metropolitan Museum of Art in NYC and the Amsterdam Rijksmuseum.

## Prerequisites

- A notebook attached to a lakehouse. Visit [Explore the data in your lakehouse with a notebook](../data-engineering/lakehouse-notebook-explore.md#open-or-create-a-notebook-from-a-lakehouse) for more information.

## Overview of the BallTree

The k-NN model relies on the [BallTree](https://en.wikipedia.org/wiki/Ball_tree) data structure. The BallTree is a recursive binary tree, where each node (or "ball") contains a partition, or subset, of the data points you want to query. To build a BallTree, determine the "ball" center (based on a certain specified feature) closest to each data point. Then, assign each data point to that corresponding closest "ball." Those assignments create a structure that allows for binary tree-like traversals, and lends itself to finding k-nearest neighbors at a BallTree leaf.

## Setup

Import the necessary Python libraries, and prepare the dataset:

```python
from synapse.ml.core.platform import *

if running_on_binder():
    from IPython import get_ipython
```

```python
from pyspark.sql.types import BooleanType
from pyspark.sql.types import *
from pyspark.ml.feature import Normalizer
from pyspark.sql.functions import lit, array, array_contains, udf, col, struct
from synapse.ml.nn import ConditionalKNN, ConditionalKNNModel
from PIL import Image
from io import BytesIO

import requests
import numpy as np
import matplotlib.pyplot as plt
from pyspark.sql import SparkSession

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()

```

The dataset comes from a table that contains artwork information from both the Met Museum and the Rijksmuseum. The table has this schema:

- **ID**: A unique identifier for each specific piece of art
  - Sample Met ID: *388395*
  - Sample Rijks ID: *SK-A-2344*
- **Title**: Art piece title, as written in the museum's database
- **Artist**: Art piece artist, as written in the museum's database
- **Thumbnail_Url**: Location of a JPEG thumbnail of the art piece
- **Image_Url** Website URL location of the art piece image, hosted on the Met/Rijks website
- **Culture**: Culture category of the art piece
  - Sample culture categories: *latin American*, *Egyptian*, etc.
- **Classification**: Medium category of the art piece
  - Sample medium categories: *woodwork*, *paintings*, etc.
- **Museum_Page**: URL link to the art piece, hosted on the Met/Rijks website
- **Norm_Features**: Embedding of the art piece image
- **Museum**: The museum hosting the actual art piece

```python
# loads the dataset and the two trained conditional k-NN models for querying by medium and culture
df = spark.read.parquet(
    "wasbs://publicwasb@mmlspark.blob.core.windows.net/met_and_rijks.parquet"
)
display(df.drop("Norm_Features"))
```

## To build the query, define the categories

Use two k-NN models: one for culture, and one for medium:

```python
# mediums = ['prints', 'drawings', 'ceramics', 'textiles', 'paintings', "musical instruments","glass", 'accessories', 'photographs',  "metalwork",
#           "sculptures", "weapons", "stone", "precious", "paper", "woodwork", "leatherwork", "uncategorized"]

mediums = ["paintings", "glass", "ceramics"]

# cultures = ['african (general)', 'american', 'ancient american', 'ancient asian', 'ancient european', 'ancient middle-eastern', 'asian (general)',
#            'austrian', 'belgian', 'british', 'chinese', 'czech', 'dutch', 'egyptian']#, 'european (general)', 'french', 'german', 'greek',
#            'iranian', 'italian', 'japanese', 'latin american', 'middle eastern', 'roman', 'russian', 'south asian', 'southeast asian',
#            'spanish', 'swiss', 'various']

cultures = ["japanese", "american", "african (general)"]

# Uncomment the above for more robust and large scale searches!

classes = cultures + mediums

medium_set = set(mediums)
culture_set = set(cultures)
selected_ids = {"AK-RBK-17525-2", "AK-MAK-1204", "AK-RAK-2015-2-9"}

small_df = df.where(
    udf(
        lambda medium, culture, id_val: (medium in medium_set)
        or (culture in culture_set)
        or (id_val in selected_ids),
        BooleanType(),
    )("Classification", "Culture", "id")
)

small_df.count()
```

## Define and fit conditional k-NN models

Create conditional k-NN models for both the medium and culture columns. Each model takes

- an output column
- a features column (feature vector)
- a values column (cell values under the output column)
- a label column (the quality that the respective k-NN is conditioned on)

```python
medium_cknn = (
    ConditionalKNN()
    .setOutputCol("Matches")
    .setFeaturesCol("Norm_Features")
    .setValuesCol("Thumbnail_Url")
    .setLabelCol("Classification")
    .fit(small_df)
)
```

```python
culture_cknn = (
    ConditionalKNN()
    .setOutputCol("Matches")
    .setFeaturesCol("Norm_Features")
    .setValuesCol("Thumbnail_Url")
    .setLabelCol("Culture")
    .fit(small_df)
)
```

## Define matching and visualizing methods

After the initial dataset and category setup, prepare the methods to query and visualize the results of the conditional k-NN:

`addMatches()` creates a Dataframe with a handful of matches per category:

```python
def add_matches(classes, cknn, df):
    results = df
    for label in classes:
        results = cknn.transform(
            results.withColumn("conditioner", array(lit(label)))
        ).withColumnRenamed("Matches", "Matches_{}".format(label))
    return results
```

`plot_urls()` calls `plot_img` to visualize top matches for each category into a grid:

```python
def plot_img(axis, url, title):
    try:
        response = requests.get(url)
        img = Image.open(BytesIO(response.content)).convert("RGB")
        axis.imshow(img, aspect="equal")
    except:
        pass
    if title is not None:
        axis.set_title(title, fontsize=4)
    axis.axis("off")


def plot_urls(url_arr, titles, filename):
    nx, ny = url_arr.shape

    plt.figure(figsize=(nx * 5, ny * 5), dpi=1600)
    fig, axes = plt.subplots(ny, nx)

    # reshape required in the case of 1 image query
    if len(axes.shape) == 1:
        axes = axes.reshape(1, -1)

    for i in range(nx):
        for j in range(ny):
            if j == 0:
                plot_img(axes[j, i], url_arr[i, j], titles[i])
            else:
                plot_img(axes[j, i], url_arr[i, j], None)

    plt.savefig(filename, dpi=1600)  # saves the results as a PNG

    display(plt.show())
```

## Put everything together

To take in

- the data
- the conditional k-NN models
- the art ID values to query on
- the file path where the output visualization is saved

define a function called `test_all()`

The medium and culture models were previously trained and loaded.

```python
# main method to test a particular dataset with two conditional k-NN models and a set of art IDs, saving the result to filename.png

def test_all(data, cknn_medium, cknn_culture, test_ids, root):
    is_nice_obj = udf(lambda obj: obj in test_ids, BooleanType())
    test_df = data.where(is_nice_obj("id"))

    results_df_medium = add_matches(mediums, cknn_medium, test_df)
    results_df_culture = add_matches(cultures, cknn_culture, results_df_medium)

    results = results_df_culture.collect()

    original_urls = [row["Thumbnail_Url"] for row in results]

    culture_urls = [
        [row["Matches_{}".format(label)][0]["value"] for row in results]
        for label in cultures
    ]
    culture_url_arr = np.array([original_urls] + culture_urls)[:, :]
    plot_urls(culture_url_arr, ["Original"] + cultures, root + "matches_by_culture.png")

    medium_urls = [
        [row["Matches_{}".format(label)][0]["value"] for row in results]
        for label in mediums
    ]
    medium_url_arr = np.array([original_urls] + medium_urls)[:, :]
    plot_urls(medium_url_arr, ["Original"] + mediums, root + "matches_by_medium.png")

    return results_df_culture
```

## Demo

The following cell performs batched queries, given the desired image IDs and a filename to save the visualization.

```python
# sample query
result_df = test_all(small_df, medium_cknn, culture_cknn, selected_ids, root=".")
```

## Related content

- [How to use ONNX with SynapseML - Deep Learning](onnx-overview.md)
- [How to use Kernel SHAP to explain a tabular classification model](tabular-shap-explainer.md)
- [How to use SynapseML for multivariate anomaly detection](isolation-forest-multivariate-anomaly-detection.md)