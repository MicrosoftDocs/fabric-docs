---
title: 'Tutorial: Use R to predict flight delay'
description: This tutorial shows how to predict flight delay by using tidymodels packages and build a Power BI report on the results.
ms.reviewer: sgilley
author: ruixinxu
ms.author: ruxu
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 01/22/2024
ms.search.form: R Language
#customer intent: As a data scientist, I want to build a machine learning model by using R so I can predict delays.
---

# Tutorial: Use R to predict flight delay

This tutorial presents an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow in [!INCLUDE [product-name](../includes/product-name.md)]. It uses the [nycflights13](https://github.com/hadley/nycflights13) data, and R, to predict whether or not a plane arrives more than 30 minutes late. It then uses the prediction results to build an interactive Power BI dashboard.

In this tutorial, you learn how to:

> [!div class="checklist"]
> - Use [tidymodels](https://www.tidymodels.org/) packages ([recipes](https://recipes.tidymodels.org/), [parsnip](https://parsnip.tidymodels.org/), [rsample](https://rsample.tidymodels.org/), [workflows](https://workflows.tidymodels.org/)) to process data and train a machine learning model
> - Write the output data to a lakehouse as a delta table
> - Build a Power BI visual report to directly access data in that lakehouse

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
[!INCLUDE [r-prerequisites](./includes/r-notebook-prerequisites.md)]

## Install packages

Install the nycflights13 package to use the code in this tutorial.

```r
install.packages("nycflights13")
```

```r
# Load the packages
library(tidymodels)      # For tidymodels packages
library(nycflights13)    # For flight data
```

## Explore the data

The `nycflights13` data has information about 325,819 flights that arrived near New York City in 2013. First, view the distribution of flight delays. This graph shows that the distribution of the arrival delays is right skewed. It has a long tail in the high values.

```r
ggplot(flights, aes(arr_delay)) + geom_histogram(color="blue", bins = 300)
```

:::image type="content" source="media/r-flight-delay/flight-delay.png" alt-text="Screenshot that shows a graph of flight delays.":::

Load the data, and make a few changes to the variables:

```r
set.seed(123)

flight_data <- 
  flights %>% 
  mutate(
    # Convert the arrival delay to a factor
    arr_delay = ifelse(arr_delay >= 30, "late", "on_time"),
    arr_delay = factor(arr_delay),
    # You'll use the date (not date-time) for the recipe that you'll create
    date = lubridate::as_date(time_hour)
  ) %>% 
  # Include weather data
  inner_join(weather, by = c("origin", "time_hour")) %>% 
  # Retain only the specific columns that you'll use
  select(dep_time, flight, origin, dest, air_time, distance, 
         carrier, date, arr_delay, time_hour) %>% 
  # Exclude missing data
  na.omit() %>% 
  # For creating models, it's better to have qualitative columns
  # encoded as factors (instead of character strings)
  mutate_if(is.character, as.factor)
```

Before we build the model, consider a few specific variables that are important for both preprocessing and modeling.

Variable `arr_delay` is a factor variable. For logistic regression model training, it's important that the outcome variable is a factor variable.

```r
glimpse(flight_data)
```

About 16% of the flights in this dataset arrived more than 30 minutes late.

```r
flight_data %>% 
  count(arr_delay) %>% 
  mutate(prop = n/sum(n))
```

The `dest` feature has 104 flight destinations.

```r
unique(flight_data$dest)
```

There are 16 distinct carriers.

```r
unique(flight_data$carrier)
```

## Split the data

Split the single dataset into two sets: a *training* set and a *testing* set. Keep most of the rows in the original dataset (as a randomly chosen subset) in the training dataset. Use the training dataset to fit the model, and use the testing dataset to measure model performance.

Use the `rsample` package to create an object that contains information about how to split the data. Then, use two more `rsample` functions to create DataFrames for the training and testing sets:

```r
set.seed(123)
# Keep most of the data in the training set 
data_split <- initial_split(flight_data, prop = 0.75)

# Create DataFrames for the two sets:
train_data <- training(data_split)
test_data  <- testing(data_split)
```

## Create a recipe and roles

Create a recipe for a simple logistic regression model. Before training the model, use a recipe to create new predictors, and conduct the preprocessing that the model requires.

Use the `update_role()` function so that the recipes know that `flight` and `time_hour` are variables, with a custom role called `ID`. A role can have any character value. The formula includes all variables in the training set, other than `arr_delay`, as predictors. The recipe keeps these two ID variables but doesn't use them as either outcomes or predictors.

```r
flights_rec <- 
  recipe(arr_delay ~ ., data = train_data) %>% 
  update_role(flight, time_hour, new_role = "ID") 
```

To view the current set of variables and roles, use the `summary()` function:

```r
summary(flights_rec)
```

## Create features

Do some feature engineering to improve your model. The flight date might have a reasonable effect on the likelihood of a late arrival.

```r
flight_data %>% 
  distinct(date) %>% 
  mutate(numeric_date = as.numeric(date)) 
```

It might help to add model terms derived from the date that potentially have importance to the model. Derive the following meaningful features from the single date variable:

- Day of the week
- Month
- Whether or not the date corresponds to a holiday

Add the three steps to your recipe:

```r
flights_rec <- 
  recipe(arr_delay ~ ., data = train_data) %>% 
  update_role(flight, time_hour, new_role = "ID") %>% 
  step_date(date, features = c("dow", "month")) %>%               
  step_holiday(date, 
               holidays = timeDate::listHolidays("US"), 
               keep_original_cols = FALSE) %>% 
  step_dummy(all_nominal_predictors()) %>% 
  step_zv(all_predictors())
```

## Fit a model with a recipe

Use logistic regression to model the flight data. First, build a model specification with the `parsnip` package:

```r
lr_mod <- 
  logistic_reg() %>% 
  set_engine("glm")
```

Use the `workflows` package to bundle your `parsnip` model (`lr_mod`) with your recipe (`flights_rec`):

```r
flights_wflow <- 
  workflow() %>% 
  add_model(lr_mod) %>% 
  add_recipe(flights_rec)

flights_wflow
```

## Train the model

This function can prepare the recipe, and train the model from the resulting predictors:

```r
flights_fit <- 
  flights_wflow %>% 
  fit(data = train_data)
```

Use the helper functions `xtract_fit_parsnip()` and `extract_recipe()` to extract the model or recipe objects from the workflow. In this example, pull the fitted model object, then use the `broom::tidy()` function to get a tidy tibble of model coefficients:

```r
flights_fit %>% 
  extract_fit_parsnip() %>% 
  tidy()
```

## Predict results

A single call to `predict()` uses the trained workflow (`flights_fit`) to make predictions with the unseen test data. The `predict()` method applies the recipe to the new data, then passes the results to the fitted model.

```r
predict(flights_fit, test_data)
```

Get the output from `predict()` to return the predicted class: `late` versus `on_time`. However, for the predicted class probabilities for each flight, use `augment()` with the model, combined with test data, to save them together:

```r
flights_aug <- 
  augment(flights_fit, test_data)
```

Review the data:

```r
glimpse(flights_aug)
```

## Evaluate the model

We now have a tibble with the predicted class probabilities. In the first few rows, the model correctly predicted five on-time flights (values of `.pred_on_time` are `p > 0.50`). However, we have 81,455 rows total to predict.

We need a metric that tells how well the model predicted late arrivals, compared to the true status of your outcome variable, `arr_delay`.

Use the Area Under the Curve Receiver Operating Characteristic (AUC-ROC) as the metric. Compute it with `roc_curve()` and `roc_auc()`, from the `yardstick` package:

```r
flights_aug %>% 
  roc_curve(truth = arr_delay, .pred_late) %>% 
  autoplot()
```

## Build a Power BI report

The model result looks good. Use the flight delay prediction results to build an interactive Power BI dashboard. The dashboard shows the number of flights by carrier, and the number of flights by destination. The dashboard can filter by the delay prediction results.

:::image type="content" source="media/r-flight-delay/power-bi-report.png" alt-text="Screenshot that shows bar charts for number of flights by carrier and number of flights by destination in a Power BI report.":::

Include the carrier name and airport name in the prediction result dataset:

```r
  flights_clean <- flights_aug %>% 
  # Include the airline data
  left_join(airlines, c("carrier"="carrier"))%>% 
  rename("carrier_name"="name") %>%
  # Include the airport data for origin
  left_join(airports, c("origin"="faa")) %>%
  rename("origin_name"="name") %>%
  # Include the airport data for destination
  left_join(airports, c("dest"="faa")) %>%
  rename("dest_name"="name") %>%
  # Retain only the specific columns you'll use
  select(flight, origin, origin_name, dest,dest_name, air_time,distance, carrier, carrier_name, date, arr_delay, time_hour, .pred_class, .pred_late, .pred_on_time)
```

Review the data:

```R
glimpse(flights_clean)
```

Convert the data to a Spark DataFrame:

```R
sparkdf <- as.DataFrame(flights_clean)
display(sparkdf)
```

Write the data into a delta table in your lakehouse:

```R
# Write data into a delta table
temp_delta<-"Tables/nycflight13"
write.df(sparkdf, temp_delta ,source="delta", mode = "overwrite", header = "true")
```

Use the delta table to create a semantic model.

1. On the left, select **OneLake data hub**
1. Select the lakehouse that you attached to your notebook
1. Select **Open**

    :::image type="content" source="media/r-flight-delay/open-lakehouse.png" alt-text="Screenshot that shows the button to open a lakehouse.":::

1. Select **New semantic model**
1. Select **nycflight13** for your new semantic model, then select **Confirm**
1. Your semantic model is created. Select **New report**
1. Select or drag fields from the **Data** and **Visualizations** panes onto the report canvas to build your report

    :::image type="content" source="media/r-flight-delay/power-bi-data.png" alt-text="Screenshot that shows data and visualization details for a report.":::

To create the report shown at the beginning of this section, use these visualizations and data:

1. :::image type="icon" source="media/r-flight-delay/stacked-bar.png" border="false" alt-text="Screenshot showing a stacked barchart icon"::: Stacked bar chart with:
    1. Y-axis: **carrier_name**
    1. X-axis: **flight**. Select **Count** for the aggregation
    1. Legend: **origin_name**
1. :::image type="icon" source="media/r-flight-delay/stacked-bar.png" border="false" alt-text="Screenshot showing a stacked barchart icon"::: Stacked bar chart with:
    1. Y-axis: **dest_name**
    1. X-axis: **flight**. Select **Count** for the aggregation
    1. Legend: **origin_name**
1. :::image type="icon" source="media/r-flight-delay/slicer.png" border="false" alt-text="Screenshot showing a slicer icon"::: Slicer with:
    1. Field: **_pred_class**
1. :::image type="icon" source="media/r-flight-delay/slicer.png" border="false" alt-text="Screenshot showing a slicer icon"::: Slicer with:
    1. Field: **_pred_late**

## Related content

- [How to use SparkR](./r-use-sparkr.md)
- [How to use sparklyr](./r-use-sparklyr.md)
- [How to use Tidyverse](./r-use-tidyverse.md)
- [R library management](./r-library-management.md)
- [Visualize data in R](r-visualization.md)
- [Tutorial: Use R to predict avocado prices](./r-avocado.md)