---
title: 'Tutorial: Create, evaluate, and score a recommendation system'
description: This demonstration shows the data engineering and data science workflow for building a system that provides online book recommendations.
ms.reviewer: lagayhar
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 08/23/2023
#customer intent: As a data scientist, I want to build a recommendation model so I can create personalized recommendations.
---

# Tutorial: Create, evaluate, and score a recommendation system

In this tutorial, you walk through an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow in [!INCLUDE [product-name](../includes/product-name.md)]. The scenario is to build a model for online book recommendations. The main steps in this tutorial are:

> [!div class="checklist"]
>
> - Upload the data into a lakehouse.
> - Perform exploratory analysis on the data.
> - Train a model and log it by using MLflow.
> - Load the model and make predictions.

There are various types of recommendation algorithms. This tutorial uses a model-based collaborative filtering algorithm named Alternating Least Squares (ALS) matrix factorization.

:::image type="content" source="media/retail-recommend-model/recommenders-matrix-factorisation.png" alt-text="Chart that shows types of recommendation algorithms." lightbox="media/retail-recommend-model/recommenders-matrix-factorisation.png":::

ALS tries to estimate the ratings matrix R as the product of two lower-rank matrices, U and V, where U * Vt = R. Typically, these approximations are called *factor* matrices.

The general approach is iterative. During each iteration, one of the factor matrices is held constant, while you solve the other for using least squares. The newly solved factor matrix is then held constant while you solve the other factor matrix.

:::image type="content" source="media/retail-recommend-model/factor-matrices.png" alt-text="Screenshot of two side-by-side factor matrices." lightbox="media/retail-recommend-model/factor-matrices.png":::

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

- If you don't have a Microsoft Fabric lakehouse, create one by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Follow along in a notebook

You can follow along in a notebook in one of two ways:

- Open and run the built-in notebook in the Synapse Data Science experience.
- Upload your notebook from GitHub to the Synapse Data Science experience.

### Open the built-in notebook

**Book recommendation** is the sample notebook that accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

[AIsample - Book Recommendation.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Book%20Recommendation.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

## Step 1: Load the data

The book recommendation dataset in this scenario consists of three separate datasets:

- *Books.csv*: Each book is identified with an International Standard Book Number (ISBN), with invalid dates already removed. The data set includes additional information, such as the title, author, and publisher. If a book has multiple authors, only the first is listed. URLs point to Amazon for cover images in three sizes.

  | ISBN | Book-Title | Book-Author | Year-Of-Publication | Publisher | Image-URL-S | Image-URL-M | Image-URL-l |
  |---|---|---|---|---|---|---|---|
  | 0195153448 | Classical Mythology | Mark P. O. Morford | 2002 | Oxford University Press | [http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg](http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg) | [http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg](http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg) | [http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg](http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg) |
  | 0002005018 | Clara Callan | Richard Bruce Wright | 2001 | HarperFlamingo Canada | [http://images.amazon.com/images/P/0002005018.01.THUMBZZZ.jpg](http://images.amazon.com/images/P/0002005018.01.THUMBZZZ.jpg) | [http://images.amazon.com/images/P/0002005018.01.MZZZZZZZ.jpg](http://images.amazon.com/images/P/0002005018.01.MZZZZZZZ.jpg) | [http://images.amazon.com/images/P/0002005018.01.LZZZZZZZ.jpg](http://images.amazon.com/images/P/0002005018.01.LZZZZZZZ.jpg) |

- *Ratings.csv*: Ratings for each book are either explicit (provided by users on a scale of 1 to 10) or implicit (observed without user input, and indicated by 0).

  | User-ID | ISBN | Book-Rating |
  |---|---|---|
  | 276725 | 034545104X | 0 |
  | 276726 | 0155061224 | 5 |

- *Users.csv*: User IDs are anonymized and mapped to integers. Demographic data, such as location and age, are provided if available. If this data is unavailable, the value is `null`.

  | User-ID | Location | Age |
  |---|---|---|
  | 1 | "nyc new york usa" |  |
  | 2 | "stockton california usa" | 18.0 |

Define the following parameters so that you can apply the code in this tutorial to different datasets:

```python
IS_CUSTOM_DATA = False  # If True, the dataset has to be uploaded manually

USER_ID_COL = "User-ID"  # Must not be '_user_id' for this notebook to run successfully
ITEM_ID_COL = "ISBN"  # Must not be '_item_id' for this notebook to run successfully
ITEM_INFO_COL = (
    "Book-Title"  # Must not be '_item_info' for this notebook to run successfully
)
RATING_COL = (
    "Book-Rating"  # Must not be '_rating' for this notebook to run successfully
)
IS_SAMPLE = True  # If True, use only <SAMPLE_ROWS> rows of data for training; otherwise, use all data
SAMPLE_ROWS = 5000  # If IS_SAMPLE is True, use only this number of rows for training

DATA_FOLDER = "Files/book-recommendation/"  # Folder that contains the datasets
ITEMS_FILE = "Books.csv"  # File that contains the item information
USERS_FILE = "Users.csv"  # File that contains the user information
RATINGS_FILE = "Ratings.csv"  # File that contains the rating information

EXPERIMENT_NAME = "aisample-recommendation"  # MLflow experiment name
```

### Download data and store it in a lakehouse

The following code downloads the dataset and then stores it in the lakehouse.

> [!IMPORTANT]
> [Add a lakehouse to the notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks) before you run this code.

```python
if not IS_CUSTOM_DATA:
    # Download data files into a lakehouse if they don't exist
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

### Set up the MLflow experiment tracking

Use the following code to set up the MLflow experiment tracking. Autologging is disabled for this example. For more information, see the [Autologging in Microsoft Fabric](/fabric/data-science/mlflow-autologging) article.

```python
# Set up MLflow for experiment tracking
import mlflow

mlflow.set_experiment(EXPERIMENT_NAME)
mlflow.autolog(disable=True)  # Disable MLflow autologging
```

### Read data from the lakehouse

After the right data is in the lakehouse, you can read the three datasets into separate Spark DataFrames in the notebook. The file paths in the following code use the parameters that you defined earlier.

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

## Step 2: Perform exploratory data analysis

### Display raw data

You can explore each of the DataFrames by using the `display` command. This command allows you to view high-level statistics of the DataFrames and understand how different columns in the datasets are related to each other. Before you explore the datasets, use the following code to import the required libraries:

```python
import pyspark.sql.functions as F
from pyspark.ml.feature import StringIndexer
import matplotlib.pyplot as plt
import seaborn as sns
color = sns.color_palette()  # Adjusting plotting style
import pandas as pd  # DataFrames
```

Use the following code to look at the DataFrame that contains the book data:

```python
display(df_items, summary=True)
```

Add an `_item_id` column for later use. The `_item_id` value must be an integer for recommendation models. The following code uses `StringIndexer` to transform `ITEM_ID_COL` to indices.

```python
df_items = (
    StringIndexer(inputCol=ITEM_ID_COL, outputCol="_item_id")
    .setHandleInvalid("skip")
    .fit(df_items)
    .transform(df_items)
    .withColumn("_item_id", F.col("_item_id").cast("int"))
)
```

Display the DataFrame and check whether the `_item_id` value increases monotonically and successively as expected:

```python
display(df_items.sort(F.col("_item_id").desc()))
```

Use the following code to plot the top 10 authors with the maximum number of books. Agatha Christie is the leading author with more than 600 books, followed by William Shakespeare.

```python
df_books = df_items.toPandas() # Create a pandas DataFrame from the Spark DataFrame for visualization
plt.figure(figsize=(8,5))
sns.countplot(y="Book-Author",palette = 'Paired', data=df_books,order=df_books['Book-Author'].value_counts().index[0:10])
plt.title("Top 10 authors with maximum number of books")
```

:::image type="content" source="./media/retail-recommend-model/top-authors.png" alt-text="Graph of the top 10 authors with the maximum number of books.":::

Next, display the DataFrame that contains the user data:

```python
display(df_users, summary=True)
```

If there's a missing value in `User-ID`, drop the row with the missing value. It doesn't matter if a customized dataset doesn't have a missing value.

```python
df_users = df_users.dropna(subset=(USER_ID_COL))
display(df_users, summary=True)
```

Add a `_user_id` column for later use. The `_user_id` value must be an integer for recommendation models. In the following code, you use `StringIndexer` to transform `USER_ID_COL` to indices.

The book dataset already contains a `User-ID` column, which is an integer. However, adding a `_user_id` column for compatibility with different datasets makes this example more robust. To add the `_user_id` column, use the following code:

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

To view the rating data, use the following code:

```python
display(df_ratings, summary=True)
```

Get the distinct ratings and save them to a list named `ratings` for later use:

```python
ratings = [i[0] for i in df_ratings.select(RATING_COL).distinct().collect()]
print(ratings)
```

To display the top 10 books with the highest ratings, use the following code:

```python
plt.figure(figsize=(8,5))
sns.countplot(y="Book-Title",palette = 'Paired',data= df_books, order=df_books['Book-Title'].value_counts().index[0:10])
plt.title("Top 10 books per number of ratings")
```

*Selected Poems* is most favorable among users, according to ratings. The books *Adventures of Huckleberry Finn*, *The Secret Garden*, and *Dracula* have the same rating.

:::image type="content" source="./media/retail-recommend-model/top-books.png" alt-text="Graph of the top-rated books.":::

### Merge data

Merge the three DataFrames into one DataFrame for a more comprehensive analysis:

```python
df_all = df_ratings.join(df_users, USER_ID_COL, "inner").join(
    df_items, ITEM_ID_COL, "inner"
)
df_all_columns = [
    c for c in df_all.columns if c not in ["_user_id", "_item_id", RATING_COL]
]

# Reorder the columns to ensure that _user_id, _item_id, and Book-Rating are the first three columns
df_all = (
    df_all.select(["_user_id", "_item_id", RATING_COL] + df_all_columns)
    .withColumn("id", F.monotonically_increasing_id())
    .cache()
)

display(df_all)
```

To display a count of the total distinct users, books, and interactions, use the following code:

```python
print(f"Total Users: {df_users.select('_user_id').distinct().count()}")
print(f"Total Items: {df_items.select('_item_id').distinct().count()}")
print(f"Total User-Item Interactions: {df_all.count()}")
```

### Compute and plot the most popular items

To compute the most popular books, use the following code. It displays the top 10 most popular books.

```python
# Compute top popular products
df_top_items = (
    df_all.groupby(["_item_id"])
    .count()
    .join(df_items, "_item_id", "inner")
    .sort(["count"], ascending=[0])
)

# Find top <topn> popular items
topn = 10
pd_top_items = df_top_items.limit(topn).toPandas()
pd_top_items.head(10)
```

> [!TIP]
> You can use the `<topn>` value for **Popular** or **Top purchased** recommendation sections.

```python
# Plot top <topn> items
f, ax = plt.subplots(figsize=(10, 5))
plt.xticks(rotation="vertical")
sns.barplot(y=ITEM_INFO_COL, x="count", data=pd_top_items)
ax.tick_params(axis='x', rotation=45)
plt.xlabel("Number of Ratings for the Item")
plt.show()
```

:::image type="content" source="./media/retail-recommend-model/most-popular-books.png" alt-text="Graph of the most popular books." lightbox="./media/retail-recommend-model/most-popular-books.png":::

### Prepare training and testing datasets

Before training, you need to perform some data preparation steps for the ALS matrix. Use the following code to prepare the data. The code performs the following actions:

- Casts the rating column into the correct type
- Samples the training data with user ratings
- Splits the data into training and testing datasets

```python
if IS_SAMPLE:
    # Must sort by '_user_id' before performing limit to ensure that ALS works normally
    # If training and testing datasets have no common _user_id, ALS will fail
    df_all = df_all.sort("_user_id").limit(SAMPLE_ROWS)

# Cast the column into the correct type
df_all = df_all.withColumn(RATING_COL, F.col(RATING_COL).cast("float"))

# Using a fraction between 0 and 1 returns the approximate size of the dataset; for example, 0.8 means 80% of the dataset
# Rating = 0 means the user didn't rate the item, so it can't be used for training
# We use the 80% of the dataset with rating > 0 as the training dataset
fractions_train = {0: 0}
fractions_test = {0: 0}
for i in ratings:
    if i == 0:
        continue
    fractions_train[i] = 0.8
    fractions_test[i] = 1
# Training dataset
train = df_all.sampleBy(RATING_COL, fractions=fractions_train)

# Join with leftanti will select all rows from df_all with rating > 0 and not in the training dataset; for example, the remaining 20% of the dataset
# Testing dataset
test = df_all.join(train, on="id", how="leftanti").sampleBy(
    RATING_COL, fractions=fractions_test
)
```

To gain a better understanding of the data and the current problem, use the following code to compute the sparsity of the dataset. Sparsity refers to the situation in which feedback data is sparse and not sufficient to identify similarities in users' interests.

```python
# Compute the sparsity of the dataset
def get_mat_sparsity(ratings):
    # Count the total number of ratings in the dataset - used as numerator
    count_nonzero = ratings.select(RATING_COL).count()
    print(f"Number of rows: {count_nonzero}")

    # Count the total number of distinct user_id and distinct product_id - used as denominator
    total_elements = (
        ratings.select("_user_id").distinct().count()
        * ratings.select("_item_id").distinct().count()
    )

    # Calculate the sparsity by dividing the numerator by the denominator
    sparsity = (1.0 - (count_nonzero * 1.0) / total_elements) * 100
    print("The ratings dataframe is ", "%.4f" % sparsity + "% sparse.")

get_mat_sparsity(df_all)
```

```python
# Check the ID range
# ALS supports only values in the integer range
print(f"max user_id: {df_all.agg({'_user_id': 'max'}).collect()[0][0]}")
print(f"max user_id: {df_all.agg({'_item_id': 'max'}).collect()[0][0]}")
```

## Step 3: Develop and train the model

You explored the dataset, added unique IDs to users and items, and plotted top items. Next, train an ALS model to give users personalized recommendations.

### Define the model

Spark ML provides a convenient API for building the ALS model. However, the model isn't good enough at handling problems like data sparsity and cold start (making recommendations when the users or items are new). To improve the performance of the model, you can combine cross-validation and automatic hyperparameter tuning.

To import libraries required for training and evaluating the model, use the following code:

```python
# Import Spark required libraries
from pyspark.ml.evaluation import RegressionEvaluator
from pyspark.ml.recommendation import ALS
from pyspark.ml.tuning import ParamGridBuilder, CrossValidator, TrainValidationSplit

# Specify the training parameters
num_epochs = 1  # Number of epochs; here we use 1 to reduce the training time
rank_size_list = [64]  # The values of rank in ALS for tuning
reg_param_list = [0.01, 0.1]  # The values of regParam in ALS for tuning
model_tuning_method = "TrainValidationSplit"  # TrainValidationSplit or CrossValidator
# Build the recommendation model by using ALS on the training data
# We set the cold start strategy to 'drop' to ensure that we don't get NaN evaluation metrics
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

### Tune model hyperparameters

To search over the hyperparameters, use the following code to construct a grid of parameters. The code also creates a regression evaluator that uses the root-mean-square error (RMSE) as the evaluation metric.

```python
#  Construct a grid search to select the best values for the training parameters
param_grid = (
    ParamGridBuilder()
    .addGrid(als.rank, rank_size_list)
    .addGrid(als.regParam, reg_param_list)
    .build()
)

print("Number of models to be tested: ", len(param_grid))

# Define the evaluator and set the loss function to the RMSE 
evaluator = RegressionEvaluator(
    metricName="rmse", labelCol=RATING_COL, predictionCol="prediction"
)
```

Use the following code to initiate different model tuning methods based on the preconfigured parameters. For more information on model tuning, see [ML Tuning: model selection and hyperparameter tuning](https://spark.apache.org/docs/latest/ml-tuning.html) on the Apache Spark website.

```python
# Build cross-validation by using CrossValidator and TrainValidationSplit
if model_tuning_method == "CrossValidator":
    tuner = CrossValidator(
        estimator=als,
        estimatorParamMaps=param_grid,
        evaluator=evaluator,
        numFolds=5,
        collectSubModels=True,
    )
elif model_tuning_method == "TrainValidationSplit":
    tuner = TrainValidationSplit(
        estimator=als,
        estimatorParamMaps=param_grid,
        evaluator=evaluator,
        # 80% of the training data will be used for training; 20% for validation
        trainRatio=0.8,
        collectSubModels=True,
    )
else:
    raise ValueError(f"Unknown model_tuning_method: {model_tuning_method}")
```

### Evaluate the model

Modules should be evaluated against the test data. If a model is well trained, it should have high metrics on the dataset.

If the model is overfitted, you might need to increase the size of the training data or reduce some of the redundant features. You might also need to change the model's architecture or fine-tune its hyperparameters.

To define an evaluation function, use the following code.

> [!NOTE]
> If the R-squared metric value is negative, it indicates that the trained model performs worse than a horizontal straight line. This finding suggests that the trained model doesn't explain the data.

```python
def evaluate(model, data, verbose=0):
    """
    Evaluate the model by computing rmse, mae, r2, and variance over the data.
    """

    predictions = model.transform(data).withColumn(
        "prediction", F.col("prediction").cast("double")
    )

    if verbose > 1:
        # Show 10 predictions
        predictions.select("_user_id", "_item_id", RATING_COL, "prediction").limit(
            10
        ).show()

    # Initialize the regression evaluator
    evaluator = RegressionEvaluator(predictionCol="prediction", labelCol=RATING_COL)

    _evaluator = lambda metric: evaluator.setMetricName(metric).evaluate(predictions)
    rmse = _evaluator("rmse")
    mae = _evaluator("mae")
    r2 = _evaluator("r2")
    var = _evaluator("var")

    if verbose > 0:
        print(f"RMSE score = {rmse}")
        print(f"MAE score = {mae}")
        print(f"R2 score = {r2}")
        print(f"Explained variance = {var}")

    return predictions, (rmse, mae, r2, var)
```

### Track the experiment by using MLflow

Use MLflow to track all the experiments and to log parameters, metrics, and models. To start training and evaluating models, use the following code:

```python
from mlflow.models.signature import infer_signature

with mlflow.start_run(run_name="als"):
    # Train models
    models = tuner.fit(train)
    best_metrics = {"RMSE": 10e6, "MAE": 10e6, "R2": 0, "Explained variance": 0}
    best_index = 0
    # Evaluate models
    # Log models, metrics, and parameters
    for idx, model in enumerate(models.subModels):
        with mlflow.start_run(nested=True, run_name=f"als_{idx}") as run:
            print("\nEvaluating on testing data:")
            print(f"subModel No. {idx + 1}")
            predictions, (rmse, mae, r2, var) = evaluate(model, test, verbose=1)

            signature = infer_signature(
                train.select(["_user_id", "_item_id"]),
                predictions.select(["_user_id", "_item_id", "prediction"]),
            )
            print("log model:")
            mlflow.spark.log_model(
                model,
                f"{EXPERIMENT_NAME}-alsmodel",
                signature=signature,
                registered_model_name=f"{EXPERIMENT_NAME}-alsmodel",
                dfs_tmpdir="Files/spark",
            )
            print("log metrics:")
            current_metric = {
                "RMSE": rmse,
                "MAE": mae,
                "R2": r2,
                "Explained variance": var,
            }
            mlflow.log_metrics(current_metric)
            if rmse < best_metrics["RMSE"]:
                best_metrics = current_metric
                best_index = idx

            print("log parameters:")
            mlflow.log_params(
                {
                    "subModel_idx": idx,
                    "num_epochs": num_epochs,
                    "rank_size_list": rank_size_list,
                    "reg_param_list": reg_param_list,
                    "model_tuning_method": model_tuning_method,
                    "DATA_FOLDER": DATA_FOLDER,
                }
            )
    # Log the best model and related metrics and parameters to the parent run
    mlflow.spark.log_model(
        models.subModels[best_index],
        f"{EXPERIMENT_NAME}-alsmodel",
        signature=signature,
        registered_model_name=f"{EXPERIMENT_NAME}-alsmodel",
        dfs_tmpdir="Files/spark",
    )
    mlflow.log_metrics(best_metrics)
    mlflow.log_params(
        {
            "subModel_idx": idx,
            "num_epochs": num_epochs,
            "rank_size_list": rank_size_list,
            "reg_param_list": reg_param_list,
            "model_tuning_method": model_tuning_method,
            "DATA_FOLDER": DATA_FOLDER,
        }
    )
```

To view the logged information for the training run, select the experiment named `aisample-recommendation` from your workspace. If you changed the experiment name, select the experiment that has the name you specified. The logged information is similar to the following image:

:::image type="content" source="./media/retail-recommend-model/experiment-logs.png" alt-text="Screenshot of the experiment logs." lightbox="./media/retail-recommend-model/experiment-logs.png":::

## Step 4: Load the final model for scoring and make predictions

After you finish training and select the best model, load the model for scoring (sometimes called inferencing). The following code loads the model and uses predictions to recommend the top 10 books for each user:

```python
# Load the best model
# MLflow uses PipelineModel to wrap the original model, so we extract the original ALSModel from the stages
model_uri = f"models:/{EXPERIMENT_NAME}-alsmodel/1"
loaded_model = mlflow.spark.load_model(model_uri, dfs_tmpdir="Files/spark").stages[-1]

# Generate top 10 book recommendations for each user
userRecs = loaded_model.recommendForAllUsers(10)

# Represent the recommendations in an interpretable format
userRecs = (
    userRecs.withColumn("rec_exp", F.explode("recommendations"))
    .select("_user_id", F.col("rec_exp._item_id"), F.col("rec_exp.rating"))
    .join(df_items.select(["_item_id", "Book-Title"]), on="_item_id")
)
userRecs.limit(10).show()
```

The output is similar to the following table:

|_item_id|_user_id|   rating|          Book-Title|
|--------|--------|---------|--------------------|
|   44865|       7|7.9996786|Lasher: Lives of ...|
|     786|       7|6.2255826|The Piano Man's D...|
|   45330|       7| 4.980466|       State of Mind|
|   38960|       7| 4.980466|  All He Ever Wanted|
|  125415|       7| 4.505084|Harry Potter and ...|
|   44939|       7|4.3579073|Taltos: Lives of ...|
|  175247|       7|4.3579073|The Bonesetter's ...|
|  170183|       7| 4.228735|Living the Simple...|
|   88503|       7| 4.221206|Island of the Blu...|
|   32894|       7|3.9031885|     Winter Solstice|

### Save the predictions to the lakehouse

To write the recommendations back to the lakehouse, use the following code:

```python
# Code to save userRecs into the lakehouse
userRecs.write.format("delta").mode("overwrite").save(
    f"{DATA_FOLDER}/predictions/userRecs"
)
```

## Related content

- [Train and evaluate a text classification model](title-genre-classification.md)
- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)
