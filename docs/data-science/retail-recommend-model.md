---
title: Create, evaluate, and deploy a recommendation system
description: An e2e sample for building a retail book recommender.
ms.reviewer: lagayhar
ms.author: narsam
author: narmeens
ms.topic: tutorial
ms.date: 02/10/2023
---

# Creating, evaluating, and deploying a recommendation system

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this notebook, we'll demonstrate data engineering and data science workflow with an e2e sample. The scenario is to build a recommender for online book recommendation.

There are different types of recommendation algorithms, we'll use a model based collaborative filtering algorithm named Alternating Least Squares (ALS) matrix factorization in this notebook.

:::image type="content" source="media/retail-recommend-model/recommenders-matrix-factorisation.png" alt-text="Chart showing different types of recommendation algorithms." lightbox="media/retail-recommend-model/recommenders-matrix-factorisation.png":::

ALS attempts to estimate the ratings matrix R as the product of two lower-rank matrices, X and Y, i.e. X * Yt = R. Typically these approximations are called 'factor' matrices.

The general approach is iterative. During each iteration, one of the factor matrices is held constant, while the other is solved for using least squares. The newly solved factor matrix is then held constant while solving for the other factor matrix.

:::image type="content" source="media/retail-recommend-model/factor-matrices.png" alt-text="Screenshot of two side by side factor matrices." lightbox="media/retail-recommend-model/factor-matrices.png":::

## Step 1: Load the data

```
+--- Book-Recommendation-Dataset
|   +--- Books.csv
|   +--- Ratings.csv
|   +--- Users.csv
```

- Books.csv

| ISBN | Book-Title | Book-Author | Year-Of-Publication | Publisher | Image-URL-S | Image-URL-M | Image-URL-l |
|---|---|---|---|---|---|---|---|
| 0195153448 | Classical Mythology | Mark P. O. Morford | 2002 | Oxford University Press | [http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg](http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg) | [http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg](http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg) | [http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg](http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg) |
| 0002005018 | Clara Callan | Richard Bruce Wright | 2001 | HarperFlamingo Canada | [http://images.amazon.com/images/P/0002005018.01.THUMBZZZ.jpg](http://images.amazon.com/images/P/0002005018.01.THUMBZZZ.jpg) | [http://images.amazon.com/images/P/0002005018.01.MZZZZZZZ.jpg](http://images.amazon.com/images/P/0002005018.01.MZZZZZZZ.jpg) | [http://images.amazon.com/images/P/0002005018.01.LZZZZZZZ.jpg](http://images.amazon.com/images/P/0002005018.01.LZZZZZZZ.jpg) |

- Ratings.csv

| User-ID | ISBN | Book-Rating |
|---|---|---|
| 276725 | 034545104X | 0 |
| 276726 | 0155061224 | 5 |

- Users.csv

| User-ID | Location | Age |
|---|---|---|
| 1 | "nyc new york usa" |  |
| 2 | "stockton california usa" | 18.0 |

**By defining below parameters, we can apply this notebook on different datasets easily.**

```python
IS_CUSTOM_DATA = False  # if True, dataset has to be uploaded manually

USER_ID_COL = "User-ID"  # must not be '_user_id' for this notebook to run successfully
ITEM_ID_COL = "ISBN"  # must not be '_item_id' for this notebook to run successfully
ITEM_INFO_COL = (
    "Book-Title"  # must not be '_item_info' for this notebook to run successfully
)
RATING_COL = (
    "Book-Rating"  # must not be '_rating' for this notebook to run successfully
)
IS_SAMPLE = True  # if True, use only <SAMPLE_ROWS> rows of data for training, otherwise use all data
SAMPLE_ROWS = 5000  # if IS_SAMPLE is True, use only this number of rows for training

DATA_FOLDER = "Files/book-recommendation/"  # folder containing the dataset
ITEMS_FILE = "Books.csv"  # file containing the items information
USERS_FILE = "Users.csv"  # file containing the users information
RATINGS_FILE = "Ratings.csv"  # file containing the ratings information

EXPERIMENT_NAME = "aisample-recommendation"  # mlflow experiment name
```

### Download dataset and upload to Lakehouse

**Please add a Lakehouse to the notebook before running it.**

```python
if not IS_CUSTOM_DATA:
    # Download demo data files into lakehouse if not exist
    import os, requests

    remote_url = "https://synapseaisolutionsa.blob.core.windows.net/public/Book-Recommendation-Dataset"
    file_list = ["Books.csv", "Ratings.csv", "Users.csv"]
    download_path = f"/lakehouse/default/{DATA_FOLDER}/raw"

    if not os.path.exists("/lakehouse/default"):
        raise FileNotFoundError(
            "Default lakehouse not found, please add a lakehouse and restart the session."
        )
    os.makedirs(download_path, exist_ok=True)
    for fname in file_list:
        if not os.path.exists(f"{download_path}/{fname}"):
            r = requests.get(f"{remote_url}/{fname}", timeout=30)
            with open(f"{download_path}/{fname}", "wb") as f:
                f.write(r.content)
    print("Downloaded demo data files into lakehouse.")
```

```python
# to record the notebook running time
import time

ts = time.time()
```

### Read data from Lakehouse

```python
df_items = (
    spark.read.option("header", True)
    .option("inferSchema", True)
    .csv(f"{DATA_FOLDER}/raw/{ITEMS_FILE}")
    .cache()
)

df_ratings = (
    spark.read.option("header", True)
    .option("inferSchema", True)
    .csv(f"{DATA_FOLDER}/raw/{RATINGS_FILE}")
    .cache()
)

df_users = (
    spark.read.option("header", True)
    .option("inferSchema", True)
    .csv(f"{DATA_FOLDER}/raw/{USERS_FILE}")
    .cache()
)
```

## Step 2. Exploratory data analysis

### Display raw data

We can explore the raw data with `display`, do some basic statistics or even show chart views.

```python
import pyspark.sql.functions as F
from pyspark.ml.feature import StringIndexer
```

```python
display(df_items, summary=True)
```

Add `_item_id` column for later usage. `_item_id` must be integer for recommendation models. Here we leverage `StringIndexer` to transform `ITEM_ID_COL` to indices.

```python
df_items = (
    StringIndexer(inputCol=ITEM_ID_COL, outputCol="_item_id")
    .setHandleInvalid("skip")
    .fit(df_items)
    .transform(df_items)
    .withColumn("_item_id", F.col("_item_id").cast("int"))
)
```

Display and check if the `_item_id` increases monotonically and successively as we expected.

```python
display(df_items.sort(F.col("_item_id").desc()))
```

```python
display(df_users, summary=True)
```

There's a missing value in `User-ID`, we'll drop the row with missing value. It doesn't matter if customized dataset doesn't have missing value.

```python
df_users = df_users.dropna(subset=(USER_ID_COL))
```

```python
display(df_users, summary=True)
```

Add `_user_id` column for later usage. `_user_id` must be integer for recommendation models. Here we leverage `StringIndexer` to transform `USER_ID_COL` to indices.

In this book dataset, we already have `User-ID` column, which is integer. But we still add `_user_id` column
for compatibility to different datasets, making this notebook more robust.

```python
df_users = (
    StringIndexer(inputCol=USER_ID_COL, outputCol="_user_id")
    .setHandleInvalid("skip")
    .fit(df_users)
    .transform(df_users)
    .withColumn("_user_id", F.col("_user_id").cast("int"))
)
```

```python
display(df_users.sort(F.col("_user_id").desc()))
```

```python
display(df_ratings, summary=True)
```

Get the distinct ratings and save them to a list `ratings` for later use.

```python
ratings = [i[0] for i in df_ratings.select(RATING_COL).distinct().collect()]
print(ratings)
```

### Merge data

Merge raw dataframes into one dataframe for more comprehensive analysis.

```python
df_all = df_ratings.join(df_users, USER_ID_COL, "inner").join(
    df_items, ITEM_ID_COL, "inner"
)
df_all_columns = [
    c for c in df_all.columns if c not in ["_user_id", "_item_id", RATING_COL]
]

# with this step, we can reorder the columns to make sure _user_id, _item_id and RATING_COL are the first three columns
df_all = (
    df_all.select(["_user_id", "_item_id", RATING_COL] + df_all_columns)
    .withColumn("id", F.monotonically_increasing_id())
    .cache()
)

display(df_all)
```

```python
print(f"Total Users: {df_users.select('_user_id').distinct().count()}")
print(f"Total Items: {df_items.select('_item_id').distinct().count()}")
print(f"Total User-Item Interactions: {df_all.count()}")
```

### Compute and plot most popular items

```python
# import libs

import pandas as pd  # dataframes
import matplotlib.pyplot as plt  # plotting
import seaborn as sns  # plotting

color = sns.color_palette()  # adjusting plotting style
```

```python
# compute top popular products
df_top_items = (
    df_all.groupby(["_item_id"])
    .count()
    .join(df_items, "_item_id", "inner")
    .sort(["count"], ascending=[0])
)
```

```python
# find top <topn> popular items
topn = 10
pd_top_items = df_top_items.limit(topn).toPandas()
pd_top_items.head()
```

Top `<topn>` popular items, which can be used for **recommendation section "Popular"** or **"Top purchased"**.

```python
# Plot top <topn> items
f, ax = plt.subplots(figsize=(12, 10))
plt.xticks(rotation="vertical")
sns.barplot(x=ITEM_INFO_COL, y="count", data=pd_top_items)
plt.ylabel("Number of Ratings for the Item")
plt.xlabel("Item Name")
plt.show()
```

## Step 3. Model development and deploy

So far, we've explored the dataset, added unique IDs to our users and items, and plotted top items. Next, we'll train an Alternating Least Squares (ALS) recommender to give users personalized recommendations

### Prepare training and testing data

```python
if IS_SAMPLE:
    # need to sort by '_user_id' before limit, so as to make sure ALS work normally.
    # if train and test dataset have no common _user_id, ALS will fail
    df_all = df_all.sort("_user_id").limit(SAMPLE_ROWS)

# cast column into the correct types
df_all = df_all.withColumn(RATING_COL, F.col(RATING_COL).cast("float"))

# By using fraction between 0 to 1, it returns the approximate number of the fraction of the dataset.
# fraction = 0.8 means 80% of the dataset.
# Note that rating = 0 means the user didn't rate the item, so we can't use it for training.
# With below steps, we'll select 80% the dataset with rating > 0 as training dataset.
fractions_train = {0: 0}
fractions_test = {0: 0}
for i in ratings:
    if i == 0:
        continue
    fractions_train[i] = 0.8
    fractions_test[i] = 1
train = df_all.sampleBy(RATING_COL, fractions=fractions_train)

# join with leftanti means not in, thus below step will select all rows from df_all
# with rating > 0 and not in train dataset, i.e., the left 20% of the dataset as test dataset.
test = df_all.join(train, on="id", how="leftanti").sampleBy(
    RATING_COL, fractions=fractions_test
)
```

```python
# compute the sparsity of the dataset
def get_mat_sparsity(ratings):
    # Count the total number of ratings in the dataset
    count_nonzero = ratings.select(RATING_COL).count()
    print(f"Number of rows: {count_nonzero}")

    # Count the number of distinct user_id and distinct product_id
    total_elements = (
        ratings.select("_user_id").distinct().count()
        * ratings.select("_item_id").distinct().count()
    )

    # Divide the numerator by the denominator
    sparsity = (1.0 - (count_nonzero * 1.0) / total_elements) * 100
    print("The ratings dataframe is ", "%.4f" % sparsity + "% sparse.")


get_mat_sparsity(df_all)
```

```python
# check the id range
# ALS only supports values in Integer range
print(f"max user_id: {df_all.agg({'_user_id': 'max'}).collect()[0][0]}")
print(f"max user_id: {df_all.agg({'_item_id': 'max'}).collect()[0][0]}")
```

### Define the model

With our data in place, we can now define the recommendation model. We'll apply Alternating Least Squares (ALS) model in this notebook.

Spark ML provides a convenient API in building the model. However, the model isn't good enough at handling problems like data sparsity and cold start. We'll combine cross validation and auto hyperparameter tuning to improve the performance of the model.

```python
# Specify training parameters
num_epochs = 1
rank_size_list = [64, 128]
reg_param_list = [0.01, 0.1]
model_tuning_method = "TrainValidationSplit"  # TrainValidationSplit or CrossValidator
```

```python
from pyspark.ml.evaluation import RegressionEvaluator
from pyspark.ml.recommendation import ALS
from pyspark.ml.tuning import ParamGridBuilder, CrossValidator, TrainValidationSplit

# Build the recommendation model using ALS on the training data
# Note we set cold start strategy to 'drop' to ensure we don't get NaN evaluation metrics
als = ALS(
    maxIter=num_epochs,
    userCol="_user_id",
    itemCol="_item_id",
    ratingCol=RATING_COL,
    coldStartStrategy="drop",
    implicitPrefs=False,
    nonnegative=True,
)
```

### Model training and hyper-tunning

```python
# Define tuning parameters
param_grid = (
    ParamGridBuilder()
    .addGrid(als.rank, rank_size_list)
    .addGrid(als.regParam, reg_param_list)
    .build()
)

print("Number of models to be tested: ", len(param_grid))
```

```python
# Define evaluator, set rmse as loss
evaluator = RegressionEvaluator(
    metricName="rmse", labelCol=RATING_COL, predictionCol="prediction"
)
```

```python
# Build cross validation using CrossValidator and TrainValidationSplit
if model_tuning_method == "CrossValidator":
    tuner = CrossValidator(
        estimator=als, estimatorParamMaps=param_grid, evaluator=evaluator, numFolds=5
    )
elif model_tuning_method == "TrainValidationSplit":
    tuner = TrainValidationSplit(
        estimator=als,
        estimatorParamMaps=param_grid,
        evaluator=evaluator,
        # 80% of the data will be used for training, 20% for validation.
        trainRatio=0.8,
    )
else:
    raise ValueError(f"Unknown model_tuning_method: {model_tuning_method}")
```

```python
import numpy as np
import pandas as pd

# Train and Extract best model
models = tuner.fit(train)
model = models.bestModel

if model_tuning_method == "CrossValidator":
    metrics = models.avgMetrics
elif model_tuning_method == "TrainValidationSplit":
    metrics = models.validationMetrics
else:
    raise ValueError(f"Unknown model_tuning_method: {model_tuning_method}")

param_maps = models.getEstimatorParamMaps()
best_params = param_maps[np.argmin(metrics)]
pd_metrics = pd.DataFrame(data={"Metric": metrics})

print("** Best Model **")
for k in best_params:
    print(f"{k.name}: {best_params[k]}")

# collect metrics
param_strings = []
for param_map in param_maps:
    # use split to remove the prefix 'ALS__' in param name
    param_strings.append(
        " ".join(f"{str(k).split('_')[-1]}={v}" for (k, v) in param_map.items())
    )
pd_metrics["Params"] = param_strings
```

```python
# Plot metrics of different submodels
f, ax = plt.subplots(figsize=(12, 5))
sns.lineplot(x=pd_metrics["Params"], y=pd_metrics["Metric"])
plt.ylabel("Loss: RMSE")
plt.xlabel("Params")
plt.title("Loss of SubModels")
plt.show()
```

### Model evaluation

We now have the best model, then we can do more evaluations on the test data.

If we trained the model well, it should have high metrics on both train and test datasets.

If we see only good metrics on train, then the model is overfitted, we may need to increase training data size.

If we see bad metrics on both datasets, then the model isn't defined well, we may need to change model architecture or at least fine tune hyper parameters.

```python
def evaluate(model, data):
    """
    Evaluate the model by computing rmse, mae, r2 and var over the data.
    """

    predictions = model.transform(data).withColumn(
        "prediction", F.col("prediction").cast("double")
    )

    # show 10 predictions
    predictions.select("_user_id", "_item_id", RATING_COL, "prediction").limit(
        10
    ).show()

    # initialize the regression evaluator
    evaluator = RegressionEvaluator(predictionCol="prediction", labelCol=RATING_COL)

    _evaluator = lambda metric: evaluator.setMetricName(metric).evaluate(predictions)
    rmse = _evaluator("rmse")
    mae = _evaluator("mae")
    r2 = _evaluator("r2")
    var = _evaluator("var")

    print(f"RMSE score = {rmse}")
    print(f"MAE score = {mae}")
    print(f"R2 score = {r2}")
    print(f"Explained variance = {var}")

    return predictions, (rmse, mae, r2, var)
```

Evaluation on training data

```python
_ = evaluate(model, train)
```

Evaluation on test data.

If R2 is negative, it means the trained model is worse than a horizontal straight line.

```python
_, (rmse, mae, r2, var) = evaluate(model, test)
```

### Log and load model with MLflow

Now we get a good model, we can save it for later use. Here we use MLflow to log metrics/models, and load models back for prediction.

```python
# setup mlflow
import mlflow

mlflow.set_experiment(EXPERIMENT_NAME)
```

```python
# log model, metrics and params
with mlflow.start_run() as run:
    print("log model:")
    mlflow.spark.log_model(
        model,
        f"{EXPERIMENT_NAME}-alsmodel",
        registered_model_name=f"{EXPERIMENT_NAME}-alsmodel",
        dfs_tmpdir="Files/spark",
    )

    print("log metrics:")
    mlflow.log_metrics({"RMSE": rmse, "MAE": mae, "R2": r2, "Explained variance": var})

    print("log parameters:")
    mlflow.log_params(
        {
            "num_epochs": num_epochs,
            "rank_size_list": rank_size_list,
            "reg_param_list": reg_param_list,
            "model_tuning_method": model_tuning_method,
            "DATA_FOLDER": DATA_FOLDER,
        }
    )

    model_uri = f"runs:/{run.info.run_id}/{EXPERIMENT_NAME}-alsmodel"
    print("Model saved in run %s" % run.info.run_id)
    print(f"Model URI: {model_uri}")
```

```python
# load model back
# mlflow will use PipelineModel to wrapper the original model, thus here we extract the original ALSModel from the stages.
loaded_model = mlflow.spark.load_model(model_uri, dfs_tmpdir="Files/spark").stages[-1]
```

## Step 4. Save prediction results

### Model deploy and prediction

#### Offline recommendation

Recommend 10 items for each user.

##### Save offline recommendation results

```python
# Generate top 10 product recommendations for each user
userRecs = loaded_model.recommendForAllUsers(10)
```

```python
# convert recommendations into interpretable format
userRecs = (
    userRecs.withColumn("rec_exp", F.explode("recommendations"))
    .select("_user_id", F.col("rec_exp._item_id"), F.col("rec_exp.rating"))
    .join(df_items.select(["_item_id", "Book-Title"]), on="_item_id")
)
userRecs.limit(10).show()
```

```python
# code for saving userRecs into lakehouse
userRecs.write.format("delta").mode("overwrite").save(
    f"{DATA_FOLDER}/predictions/userRecs"
)
```

```python
print(f"Full run cost {int(time.time() - ts)} seconds.")
```
