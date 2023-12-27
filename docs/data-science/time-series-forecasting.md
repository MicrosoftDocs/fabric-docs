---
title: 'Tutorial: Train and evaluate a time series forecasting model'
description: This demonstration shows how to develop a model to forecast time series data that has seasonal cycles.
ms.reviewer: franksolomon
ms.author: narsam
author: narmeens
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/15/2023
#customer intent: As a data scientist, I want to build a time series model with trend and seasonality information to forecast future cycles.
---

# Train and evaluate a time series forecasting model

In this tutorial, you walk through an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow in [!INCLUDE [product-name](../includes/product-name.md)]. The scenario is to build a program to forecast time series data that has seasonal cycles. You use the [NYC property sales dataset](https://www1.nyc.gov/site/finance/about/open-portal.page) with dates that range from 2003 through 2015. This dataset is published by the New York City Department of Finance on the [NYC Open Data portal](https://opendata.cityofnewyork.us/).

The main steps in this tutorial are:

> [!div class="checklist"]
>
> - Upload the data into a lakehouse.
> - Perform exploratory analysis on the data.
> - Train a model.
> - Log and load the model by using MLflow.

## Prerequisites

- Familiarity with [Microsoft Fabric notebooks](/fabric/data-engineering/how-to-use-notebook).
- A lakehouse to store data for this example. For more information, see [Add a lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).

## Follow along in a notebook

You can follow along in a notebook in one of two ways:

- Open and run the built-in notebook in the Synapse Data Science experience.
- Upload your notebook from GitHub to the Synapse Data Science experience.

### Open the built-in notebook

**Time series** is the sample notebook that accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

[AIsample - Time Series Forecasting.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Time%20Series%20Forecasting.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Time%20Series%20Forecasting.ipynb -->

## About the dataset

The dataset is a record of every building sold in the New York City property market during a 13-year period. For definitions of columns in the spreadsheet, refer to [Glossary of Terms for Property Sales Files](https://www1.nyc.gov/assets/finance/downloads/pdf/07pdf/glossary_rsf071607.pdf) on the NYC Department of Finance website. The dataset looks like the following table:

| borough | neighborhood | building_class_category | tax_class | block | lot | easement | building_class_at_present | address | apartment_number | zip_code | residential_units | commercial_units | total_units | land_square_feet | gross_square_feet | year_built | tax_class_at_time_of_sale | building_class_at_time_of_sale | sale_price | sale_date |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Manhattan | ALPHABET CITY | 07  RENTALS - WALKUP APARTMENTS | 0.0 | 384.0 | 17.0 |  | C4 | 225 EAST 2ND   STREET |  | 10009.0 | 10.0 | 0.0 | 10.0 | 2145.0 | 6670.0 | 1900.0 | 2.0 | C4 | 275000.0 | 2007-06-19 |
| Manhattan | ALPHABET CITY | 07  RENTALS - WALKUP APARTMENTS | 2.0 | 405.0 | 12.0 |  | C7 | 508 EAST 12TH   STREET |  | 10009.0 | 28.0 | 2.0 | 30.0 | 3872.0 | 15428.0 | 1930.0 | 2.0 | C7 | 7794005.0 | 2007-05-21 |

You'll build a model to forecast the monthly volume of property trades based on history data. The forecast uses [Facebook Prophet](https://facebook.github.io/prophet/), which provides a fast and automated forecast procedure. It also handles seasonality well.

## Install Prophet

First, install [Facebook Prophet](https://facebook.github.io/prophet/). Facebook developed the Prophet open-source time series forecasting library. It uses a decomposable time series model that has three main components: trend, seasonality, and holiday.

For the trend component, Prophet assumes a piece-wise constant rate of growth, with automatic selection of change points.

For the seasonality component, Prophet models weekly and yearly seasonality by using Fourier series. Because this tutorial uses monthly data, you'll avoid weekly seasonality, and you'll avoid holidays.

```shell
!pip install prophet
```

## Step 1: Load the data

### Download the dataset and upload to a data lakehouse

A data lakehouse is a data architecture that provides a central repository for data. There are 15 .csv files that contain property sales records from five boroughs in New York from 2003 through 2015. For convenience, these files are compressed in the *nyc_property_sales.tar* file. This file is available in a public blob storage resource.

```python
URL = "https://synapseaisolutionsa.blob.core.windows.net/public/NYC_Property_Sales_Dataset/"
TAR_FILE_NAME = "nyc_property_sales.tar"
DATA_FOLDER = "Files/NYC_Property_Sales_Dataset"
TAR_FILE_PATH = f"/lakehouse/default/{DATA_FOLER}/tar/"
CSV_FILE_PATH = f"/lakehouse/default/{DATA_FOLER}/csv/"
```

```python
import os

if not os.path.exists("/lakehouse/default"):
    # Ask the user to add a lakehouse if no default lakehouse is added to the notebook.
    # A new notebook will not link to any lakehouse by default.
    raise FileNotFoundError(
        "Default lakehouse not found, please add a lakehouse for the notebook."
    )
else:
    # Check if the needed files are already in the lakehouse. Try to download and unzip if not.
    if not os.path.exists(f"{TAR_FILE_PATH}{TAR_FILE_NAME}"):
        os.makedirs(TAR_FILE_PATH, exist_ok=True)
        os.system(f"wget {URL}{TAR_FILE_NAME} -O {TAR_FILE_PATH}{TAR_FILE_NAME}")

    os.makedirs(CSV_FILE_PATH, exist_ok=True)
    os.system(f"tar -zxvf {TAR_FILE_PATH}{TAR_FILE_NAME} -C {CSV_FILE_PATH}")
```

### Create a DataFrame from the lakehouse

The `display` function prints the DataFrame and automatically gives chart views.

```python
df = (
    spark.read.format("csv")
    .option("header", "true")
    .load("Files/NYC_Property_Sales_Dataset/csv")
)
display(df)
```

## Step 2: Preprocess data

### Type conversion and filtering

For type conversion and filtering:

- Cast the sale prices to integers.
- Exclude irregular sales data. For example, a $0 sale indicates an ownership transfer without cash consideration.
- Include only class A (residential) buildings, and exclude all other building types.

This analysis uses only class A buildings because the seasonality effect becomes an ineligible coefficient for class A buildings. This model outperforms many others because it includes seasonality, which is important data for time series analysis.

```python
# Import libraries
import pyspark.sql.functions as F
from pyspark.sql.types import *
```

```python
df = df.withColumn(
    "sale_price", F.regexp_replace("sale_price", "[$,]", "").cast(IntegerType())
)
df = df.select("*").where(
    'sale_price > 0 and total_units > 0 and gross_square_feet > 0 and building_class_at_time_of_sale like "A%"'
)
```

```python
monthly_sale_df = df.select(
    "sale_price",
    "total_units",
    "gross_square_feet",
    F.date_format("sale_date", "yyyy-MM").alias("month"),
)
```

```python
display(df)
```

```python
summary_df = (
    monthly_sale_df.groupBy("month")
    .agg(
        F.sum("sale_price").alias("total_sales"),
        F.sum("total_units").alias("units"),
        F.sum("gross_square_feet").alias("square_feet"),
    )
    .orderBy("month")
)
```

```python
display(summary_df)
```

### Visualization

Examine the trend of property trades in NYC. The yearly seasonality is clear for the class A type of buildings. The peak buying seasons are usually spring and fall.

```python
df_pandas = summary_df.toPandas()
```

```python
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

f, (ax1, ax2) = plt.subplots(2, 1, figsize=(35, 10))
plt.sca(ax1)
plt.xticks(np.arange(0, 15 * 12, step=12))
plt.ticklabel_format(style="plain", axis="y")
sns.lineplot(x="month", y="total_sales", data=df_pandas)
plt.ylabel("Total Sales")
plt.xlabel("Time")
plt.title("Total Property Sales by Month")

plt.sca(ax2)
plt.xticks(np.arange(0, 15 * 12, step=12))
plt.ticklabel_format(style="plain", axis="y")
sns.lineplot(x="month", y="square_feet", data=df_pandas)
plt.ylabel("Total Square Feet")
plt.xlabel("Time")
plt.title("Total Property Square Feet Sold by Month")
plt.show()
```

## Step 3: Train and evaluate the model

### Model fitting

Rename the time axis to `ds` and the value axis to `y`:

```python
import pandas as pd

df_pandas["ds"] = pd.to_datetime(df_pandas["month"])
df_pandas["y"] = df_pandas["total_sales"]
```

Now, fit the model. Choose `multiplicative` seasonality, to reflect the fact that seasonality is no longer a constant additive factor like the default that Prophet assumes. As shown in a previous cell, you printed the data for total property sales per month, and the vibration amplitude isn't consistent. This means that simple additive seasonality won't fit the data well.

Use Markov Chain Monte Carlo (MCMC) methods to calculate the posterior mean distribution. By default, Prophet uses the Stan L-BFGS method to fit the model, which finds a maximum *a posteriori* probability (MAP) estimate.

```python
from prophet import Prophet
from prophet.plot import add_changepoints_to_plot

m = Prophet(
    seasonality_mode="multiplicative", weekly_seasonality=False, mcmc_samples=1000
)
m.fit(df_pandas)
```

The built-in functions in Prophet can show the results of model fitting. The black dots are data points for training the model. The blue line is the prediction, and the light blue area shows uncertainty intervals.

```python
future = m.make_future_dataframe(periods=12, freq="M")
forecast = m.predict(future)
fig = m.plot(forecast)
```

Prophet assumes piece-wise constant growth, so you can plot the change points of the trained model:

```python
fig = m.plot(forecast)
a = add_changepoints_to_plot(fig.gca(), m, forecast)
```

Visualize trend and yearly seasonality. The light blue area reflects uncertainty.

```python
fig2 = m.plot_components(forecast)
```

### Cross-validation

You can use the Prophet built-in cross-validation functionality to measure the forecast error on historical data. The following parameters indicate that you should start with 11 years of training data and then make predictions every 30 days, within a one-year horizon.

```python
from prophet.diagnostics import cross_validation
from prophet.diagnostics import performance_metrics

df_cv = cross_validation(m, initial="4017 days", period="30 days", horizon="365 days")
df_p = performance_metrics(df_cv, monthly=True)
```

```python
display(df_p)
```

## Step 4: Log and load the model by using MLflow

Store the trained model for later use:

```python
# Set up MLflow
import mlflow

EXPERIMENT_NAME = "aisample-timeseries"
mlflow.set_experiment(EXPERIMENT_NAME)
```

```python
# Log the model and parameters
model_name = f"{EXPERIMENT_NAME}-prophet"
with mlflow.start_run() as run:
    mlflow.prophet.log_model(m, model_name, registered_model_name=model_name)
    mlflow.log_params({"seasonality_mode": "multiplicative", "mcmc_samples": 1000})
    model_uri = f"runs:/{run.info.run_id}/{model_name}"
    print("Model saved in run %s" % run.info.run_id)
    print(f"Model URI: {model_uri}")
```

```python
# Load the model back
loaded_model = mlflow.prophet.load_model(model_uri)
```

<!-- nbend -->

## Related content

- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)
