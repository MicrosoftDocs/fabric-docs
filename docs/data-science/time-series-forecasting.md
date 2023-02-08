---
title: Train and evaluate time series forecasting model
description: AI sample for training and evaluating a time series forecasting model.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: tutorial
ms.date: 02/10/2023
---

# Training and evaluating time series forecasting model

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

## Introduction

In this notebook, we'll develop a program to forecast time series data that has seasonal cycles. We'll use [NYC Property Sales data](https://www1.nyc.gov/site/finance/about/open-portal.page) range from 2003 to 2015 published by NYC Department of Finance on the [NYC Open Data Portal](https://opendata.cityofnewyork.us/).

The dataset is a record of every building sold in New York City property market during 13-year period. Refer to [Glossary of Terms for Property Sales Files](https://www1.nyc.gov/assets/finance/downloads/pdf/07pdf/glossary_rsf071607.pdf) for definition of columns in the spreadsheet. The dataset looks like the following table:

| borough | neighborhood | building_class_category | tax_class | block | lot | easement | building_class_at_present | address | apartment_number | zip_code | residential_units | commercial_units | total_units | land_square_feet | gross_square_feet | year_built | tax_class_at_time_of_sale | building_class_at_time_of_sale | sale_price | sale_date |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Manhattan | ALPHABET CITY | 07  RENTALS - WALKUP APARTMENTS | 0.0 | 384.0 | 17.0 |  | C4 | 225 EAST 2ND   STREET |  | 10009.0 | 10.0 | 0.0 | 10.0 | 2145.0 | 6670.0 | 1900.0 | 2.0 | C4 | 275000.0 | 2007-06-19 |
| Manhattan | ALPHABET CITY | 07  RENTALS - WALKUP APARTMENTS | 2.0 | 405.0 | 12.0 |  | C7 | 508 EAST 12TH   STREET |  | 10009.0 | 28.0 | 2.0 | 30.0 | 3872.0 | 15428.0 | 1930.0 | 2.0 | C7 | 7794005.0 | 2007-05-21 |

We'll build up a model to forecast monthly volume of property trade based on history data. In order to forecast, we'll use [Facebook Prophet](https://facebook.github.io/prophet/), which provides fast and automated forecast procedure and handles seasonality well.

## Install Prophet

Let's first install [Facebook Prophet](https://facebook.github.io/prophet/). It uses a decomposable time series model that consists of three main components: trend, seasonality, and holidays.

For the trend part, Prophet assumes piece-wise constant rate of growth with automatic change point selection.

For seasonality part, Prophet models weekly and yearly seasonality using Fourier Series. Since we're using monthly data, so we won't have weekly seasonality and won't considering holidays.

```python
!pip install prophet
```

## Step 1: Load the data

### Download dataset and upload to Lakehouse

There are 15 csv files containing property sales records from five boroughs in New York since 2003 to 2015. For your convenience, these files are compressed in `nyc_property_sales.tar` and are available in a public blob storage.

```python
URL = "https://synapseaisolutionsa.blob.core.windows.net/public/NYC_Property_Sales_Dataset/"
TAR_FILE_NAME = "nyc_property_sales.tar"
DATA_FOLER = "Files/NYC_Property_Sales_Dataset"
TAR_FILE_PATH = f"/lakehouse/default/{DATA_FOLER}/tar/"
CSV_FILE_PATH = f"/lakehouse/default/{DATA_FOLER}/csv/"
```

```python
import os

if not os.path.exists("/lakehouse/default"):
    # ask user to add a lakehouse if no default lakehouse added to the notebook.
    # a new notebook will not link to any lakehouse by default.
    raise FileNotFoundError(
        "Default lakehouse not found, please add a lakehouse for the notebook."
    )
else:
    # check if the needed files are already in the lakehouse, try to download and unzip if not.
    if not os.path.exists(f"{TAR_FILE_PATH}{TAR_FILE_NAME}"):
        os.makedirs(TAR_FILE_PATH, exist_ok=True)
        os.system(f"wget {URL}{TAR_FILE_NAME} -O {TAR_FILE_PATH}{TAR_FILE_NAME}")

    os.makedirs(CSV_FILE_PATH, exist_ok=True)
    os.system(f"tar -zxvf {TAR_FILE_PATH}{TAR_FILE_NAME} -C {CSV_FILE_PATH}")
```

### Create dataframe from Lakehouse

The `display` function print the dataframe and automatically gives chart views.

```python
df = (
    spark.read.format("csv")
    .option("header", "true")
    .load("Files/NYC_Property_Sales_Dataset/csv")
)
display(df)
```

## Step 2: Data preprocessing

### Type conversion and filtering

Lets do some necessary type conversion and filtering.

- Need convert sale prices to integers.
- Need exclude irregular sales data. For example, a $0 sale indicates ownership transfer without cash consideration.
- Exclude building types other than A class.

The reason to choose only market of A class building for analysis is that seasonal effect is ineligible coefficient for A class building. The model we'll use outperform many others in including seasonality, which is common needs in time series analysis.

```python
# import libs
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

Now, let's take a look at the trend of property trade trend at NYC. The yearly seasonality is clear on the chosen building class. The peak buying seasons are usually spring and fall.

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

## Step 3: Model training and evaluation

### Model fitting

To do model fitting, we just need to rename the time axis to 'ds' and value axis to 'y'.

```python
import pandas as pd

df_pandas["ds"] = pd.to_datetime(df_pandas["month"])
df_pandas["y"] = df_pandas["total_sales"]
```

Now let's fit the model. We'll choose to use 'multiplicative' seasonality, it means seasonality is no longer a constant additive factor like default assumed by Prophet. As you can see in a previous cell, we printed the total property sale data per month, and the vibration amplitude isn't consistent. It means using simple additive seasonality won't fit the data well.
In addition, we'll use Markov Chain Monte Carlo (MCMC) that gives mean of posteriori distribution. By default, Prophet uses Stan's L-BFGS to fit the model, which finds a maximum a posteriori probability(MAP) estimate.

```python
from prophet import Prophet
from prophet.plot import add_changepoints_to_plot

m = Prophet(
    seasonality_mode="multiplicative", weekly_seasonality=False, mcmc_samples=1000
)
m.fit(df_pandas)
```

Let's use built-in functions in Prophet to show the model fitting results. The black dots are data points used to train the model. The blue line is the prediction and the light blue area shows uncertainty intervals.

```python
future = m.make_future_dataframe(periods=12, freq="M")
forecast = m.predict(future)
fig = m.plot(forecast)
```

Prophet assumes piece-wise constant growth, thus you can plot the change points of the trained model.

```python
fig = m.plot(forecast)
a = add_changepoints_to_plot(fig.gca(), m, forecast)
```

Visualize trend and yearly seasonality. The light blue area reflects uncertainty.

```python
fig2 = m.plot_components(forecast)
```

### Cross validation

We can use Prophet's built-in cross validation functionality to measure the forecast error on historical data. The following parameters mean we should start with 11 years of training data, then make predictions every 30 days within a one year horizon.

```python
from prophet.diagnostics import cross_validation
from prophet.diagnostics import performance_metrics

df_cv = cross_validation(m, initial="11 Y", period="30 days", horizon="365 days")
df_p = performance_metrics(df_cv, monthly=True)
```

```python
display(df_p)
```

## Step 4: Log and load model with MLflow

We can now store the trained model for later use.

```python
# setup mlflow
import mlflow

EXPERIMENT_NAME = "aisample-timeseries"
mlflow.set_experiment(EXPERIMENT_NAME)
```

```python
# log the model and parameters
model_name = f"{EXPERIMENT_NAME}-prophet"
with mlflow.start_run() as run:
    mlflow.prophet.log_model(m, model_name, registered_model_name=model_name)
    mlflow.log_params({"seasonality_mode": "multiplicative", "mcmc_samples": 1000})
    model_uri = f"runs:/{run.info.run_id}/{model_name}"
    print("Model saved in run %s" % run.info.run_id)
    print(f"Model URI: {model_uri}")
```

```python
# load the model back
loaded_model = mlflow.prophet.load_model(model_uri)
```
