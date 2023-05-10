---
title: Data science tutorial - explore and visualize data with notebooks
description: In this second module, learn how to read data from a delta table, generate a random dataframe sample, convert a dataframe, and perform exploratory data analysis.
ms.reviewer: mopeakande
ms.author: mopeakande
author: msakande
ms.topic: tutorial
ms.date: 5/4/2023
---

# Module 2: Explore and visualize data using Microsoft Fabric notebooks

The python runtime environment in Fabric notebooks comes with various preinstalled open-source libraries for building visualizations like matplotlib, seaborn, Plotly and more.

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this module, we use seaborn, which is a Python data visualization library that provides a high-level interface for building visuals on dataframes and arrays. For more information about seaborn, see [seaborn: statistical data visualization](https://seaborn.pydata.org/).

In this tutorial you learn to perform the following actions:

1. Read data stored from a delta table in the lakehouse.

1. Generate a random sample of the dataframe.

1. Convert a Spark dataframe to Pandas dataframe, which python visualization libraries support.

1. Perform exploratory data analysis using seaborn on the New York taxi yellow cab dataset. We do this by visualizing a trip duration variable against other categorical and numeric variables.

## Follow along in notebook

The python commands/script used in each step of this tutorial can be found in the accompanying notebook; [02-explore-and-visualize-data-using-notebooks.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/02-explore-and-visualize-data-using-notebooks.ipynb). Be sure to [attach a lakehouse to the notebook](tutorial-data-science-prepare-system.md#attach-a-lakehouse-to-the-notebooks) before executing it.

## Visualize and analyze

1. To get started, let's read the delta table (saved in module 1) from the lakehouse and create a pandas dataframe on a random sample of the data.

   ```python
   data = spark.read.format("delta").load("Tables/nyctaxi_raw")
   SEED = 1234
   sampled_df = data.sample(True, 0.001, seed=SEED).toPandas()
   ```

   > [!NOTE]
   > To minimize execution time, we are using a 1/1000 sample to explore and visualize ingested data.

1. Import required libraries and function required for visualizations, and set seaborn theme parameters that control aesthetics of the output visuals like style, color palette and size of the visual.

   ```python
   import seaborn as sns
   import matplotlib.pyplot as plt
   import matplotlib.ticker as mticker
   import numpy as np
   sns.set_theme(style="whitegrid", palette="tab10", rc = {'figure.figsize':(9,6)})
   ```

1. Visualize distribution of trip duration(minutes) on linear and logarithmic scale by running the following set of commands.

   ```python
   ## Compute trip duration(in minutes) on the sample using pandas
   sampled_df['tripDuration'] = (sampled_df['tpepDropoffDateTime'] - sampled_df['tpepPickupDateTime']).astype('timedelta64[m]')
   sampled_df = sampled_df[sampled_df["tripDuration"] > 0]

   fig, axes = plt.subplots(1, 2, figsize=(18, 6))
   sns.histplot(ax=axes[0],data=sampled_df,
               x="tripDuration",
               stat="count",
               discrete=True).set(title='Distribution of trip duration(minutes)')
   sns.histplot(ax=axes[1],data=sampled_df,
               x="tripDuration",
               stat="count", 
               log_scale= True).set(title='Distribution of trip duration(log scale)')
   axes[1].xaxis.set_major_formatter(mticker.ScalarFormatter())
   ```

   :::image type="content" source="media\tutorial-data-science-explore-notebook\trip-duration-charts.png" alt-text="Screenshot of two charts for visualizing the distribution of trip duration." lightbox="media\tutorial-data-science-explore-notebook\trip-duration-charts.png":::

1. Create bins to segregate and understand distribution of tripDuration better. To do this, create a durationBin column using pandas operations to classify trip durations into buckets of **<10 Mins**, **10-30 Mins**, **30-60 Mins**, **1-2 Hrs**, **2-4 Hrs**, and **>4 Hrs**. Visualize the binned column using seaborn histogram plot.

   ```python
   ## Create bins for tripDuration column
   sampled_df.loc[sampled_df['tripDuration'].between(0, 10, 'both'), 'durationBin'] = '< 10 Mins'
   sampled_df.loc[sampled_df['tripDuration'].between(10, 30, 'both'), 'durationBin'] = '10-30 Mins'
   sampled_df.loc[sampled_df['tripDuration'].between(30, 60, 'both'), 'durationBin'] = '30-60 Mins'
   sampled_df.loc[sampled_df['tripDuration'].between(60, 120, 'right'), 'durationBin'] = '1-2 Hrs'
   sampled_df.loc[sampled_df['tripDuration'].between(120, 240, 'right'), 'durationBin'] = '2-4 Hrs'
   sampled_df.loc[sampled_df['tripDuration'] > 240, 'durationBin'] = '> 4 Hrs'

   # Plot histogram using the binned column
   sns.histplot(data=sampled_df, x="durationBin", stat="count", discrete=True, hue = "durationBin")
   plt.title("Trip Distribution by Duration Bins")
   plt.xlabel('Trip Duration')
   plt.ylabel('Frequency')
   ```

   :::image type="content" source="media\tutorial-data-science-explore-notebook\trip-distribution-duration-chart.png" alt-text="Bar chart that shows the distribution of trip duration by duration bins." lightbox="media\tutorial-data-science-explore-notebook\trip-distribution-duration-chart.png":::

1. Visualize the distribution of tripDuration and tripDistance and classify by passengerCount using seaborn scatterplot by running below commands.

   ```python
   sns.scatterplot(data=sampled_df, x="tripDistance", y="tripDuration", hue="passengerCount")
   ```

   :::image type="content" source="media\tutorial-data-science-explore-notebook\scatterplot-trip-details.png" alt-text="Scatterplot chart that shows the distribution of trip duration and trip distance classified by passenger count." lightbox="media\tutorial-data-science-explore-notebook\scatterplot-trip-details.png":::

1. Visualize the overall distribution of ***passengerCount*** column to understand the most common ***passengerCount*** instances in the trips.

   ```python
   sns.histplot(data=sampled_df, x="passengerCount", stat="count", discrete=True)
   plt.title("Distribution of passenger count")
   plt.xlabel('No. of Passengers')
   plt.ylabel('Number of trips')
   ```

   :::image type="content" source="media\tutorial-data-science-explore-notebook\passenger-count-distribution-chart.png" alt-text="Bar chart to show the most common number of passengers in the taxi trips." lightbox="media\tutorial-data-science-explore-notebook\passenger-count-distribution-chart.png":::

1. Create boxplots to visualize the distribution of ***tripDuration*** by passenger count. A boxplot is a useful tool to understand the variability, symmetry, and outliers of the data.

   ```python
   # The threshold was calculated by evaluating mean trip duration (~15 minutes) + 3 standard deviations (58 minutes), i.e. roughly 3 hours.
   fig, axes = plt.subplots(1, 2, figsize=(18, 6))
   sns.boxplot(ax=axes[0], data=sampled_df, x="passengerCount", y="tripDuration").set(title='Distribution of Trip duration by passengerCount')
   sampleddf_clean = sampled_df[(sampled_df["passengerCount"] > 0) & (sampled_df["tripDuration"] < 189)]
   sns.boxplot(ax=axes[1], data=sampleddf_clean, x="passengerCount", y="tripDuration").set(title='Distribution of Trip duration by passengerCount (outliers removed)')
   ```

   In the first figure, we visualize tripDuration without removing any outliers whereas in the second figure we're removing trips with duration greater than 3 hours and zero passengers.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\two-boxplots-trip-duration.png" alt-text="Screenshot of two boxplots to visualize trip duration, one with outliers and one without." lightbox="media\tutorial-data-science-explore-notebook\two-boxplots-trip-duration.png":::

1. Analyze the relationship of ***tripDuration*** and ***fareAmount*** classified by ***paymentType*** and ***VendorId*** using seaborn scatterplots.

   ```python
   f, axes = plt.subplots(1, 2, figsize=(18, 6))
   sns.scatterplot(ax =axes[0], data=sampled_df, x="fareAmount", y="tripDuration",  hue="paymentType")
   sns.scatterplot(ax =axes[1],data=sampled_df, x="fareAmount", y="tripDuration",  hue="vendorID")
   plt.title("Distribution of tripDuration by fareAmount")
   plt.show()
   ```

   :::image type="content" source="media\tutorial-data-science-explore-notebook\two-scatterplots-fare-payment.png" alt-text="Screenshot of two scatterplot charts to visualize the relationship between trip duration, fare, and payment type." lightbox="media\tutorial-data-science-explore-notebook\two-scatterplots-fare-payment.png":::

1. Analyze the frequency of the taxi trips by hour of the day using a histogram of trip counts.

   ```python
   sampled_df['hour'] = sampled_df['tpepPickupDateTime'].dt.hour
   sampled_df['dayofweek'] = sampled_df['tpepDropoffDateTime'].dt.dayofweek
   sampled_df['dayname'] = sampled_df['tpepDropoffDateTime'].dt.day_name()
   sns.histplot(data=sampled_df, x="hour", stat="count", discrete=True, kde=True)
   plt.title("Distribution by Hour of the day")
   plt.xlabel('Hours')
   plt.ylabel('Count of trips')
   plt.show()
   ```

   :::image type="content" source="media\tutorial-data-science-explore-notebook\histogram-trip-counts.png" alt-text="Histogram chart to show the number of taxi trips by the hour of the day." lightbox="media\tutorial-data-science-explore-notebook\histogram-trip-counts.png":::

1. Analyze average taxi trip duration by hour and day together by using a seaborn heatmap. The below cell creates a pandas pivot table by grouping the trips by hour and ***dayName*** columns and getting a mean of the tripDuration values. This pivot table is used to create a heatmap using seaborn as shown in the following example.

   ```python
   pv_df = sampled_df[sampled_df["tripDuration"]<180]\
         .groupby(["hour","dayname"]).mean("tripDuration")\
         .reset_index().pivot("hour", "dayname", "tripDuration")
   sns.heatmap(pv_df,annot=True,fmt='.2f', cmap="Blues").set(xlabel=None)
   ```

   :::image type="content" source="media\tutorial-data-science-explore-notebook\pivot-table-heat-map.png" alt-text="Heat map over a pandas table to show the average duration of trips by hour and day." lightbox="media\tutorial-data-science-explore-notebook\pivot-table-heat-map.png":::

1. Finally let's create a correlation plot, which is a useful tool for exploring the relationships among numerical variables in a dataset. It displays the data points for each pair of variables as a scatterplot and calculates the correlation coefficient for each pair. The correlation coefficient indicates how strongly and in what direction the variables are related. A positive correlation means that the variables tend to increase or decrease together, while a negative correlation means that they tend to move in opposite directions. In this example, we're generating correlation plot for a subset of columns in the dataframe for analysis.

   ```python
   cols_to_corr = ['tripDuration','fareAmount', 'passengerCount', 'tripDistance', 'extra', 'mtaTax',
         'improvementSurcharge', 'tipAmount', 'hour',"dayofweek"]
   sns.heatmap(data = sampled_df[cols_to_corr].corr(),annot=True,fmt='.3f', cmap="Blues")
   ```

   :::image type="content" source="media\tutorial-data-science-explore-notebook\correlation-plot-trip-details.png" alt-text="Correlation plot table that shows relationships between pairs of trip variables." lightbox="media\tutorial-data-science-explore-notebook\correlation-plot-trip-details.png":::

## Observations from exploration data analysis

- Some trips in the sample data have a passenger count of 0 but most trips have a passenger count between 1-6.
- tripDuration column has outliers with a comparatively small number of trips having ***tripDuration*** of greater than 3 hours.
- The outliers for TripDuration are specifically present for vendorId 2.
- Some trips have zero trip distance and hence they can be canceled and filtered out from any modeling.
- A small number of trips have no passengers(0) and hence can be filtered out.
- fareAmount column contains negative outliers, which can be removed from model training.
- The number of trips starts rising around 16:00 hours and peaks between 18:00 - 19:00 hours.

## Next steps

- [Module 3: Perform data cleansing and preparation using Apache Spark](tutorial-data-science-data-cleanse.md)
