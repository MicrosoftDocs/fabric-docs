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


In this module, we use seaborn, which is a Python data visualization library that provides a high-level interface for building visuals on dataframes and arrays. For more information about seaborn, see [seaborn: statistical data visualization](https://seaborn.pydata.org/).

In this tutorial you learn to perform the following actions:

1. Read data stored from a delta table in the lakehouse.

1. Generate a random sample of the dataframe.

1. Convert a Spark dataframe to Pandas dataframe, which python visualization libraries support.

1. Perform exploratory data analysis using seaborn on the New York taxi yellow cab dataset. We do this by visualizing a trip duration variable against other categorical and numeric variables.

## Follow along in notebook
The python commands/script used in each step of this tutorial can be found in the accompanying notebook: **02 -Explore and Visualize Data using Notebooks**. Be sure to [attach a lakehouse to the notebook](tutorial-data-science-prepare-system.md#attach-a-lakehouse-to-the-notebooks) before executing it.

## Visualize and analyze

1. To get started, let’s read the delta table (saved in module 1) from the lakehouse and create a pandas dataframe on a random sample of the data.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\read-delta-table.png" alt-text="Screenshot of code sample to read the delta table and create a pandas dataframe." lightbox="media\tutorial-data-science-explore-notebook\read-delta-table.png":::

   > [!NOTE]
   > To minimize execution time, we are using a 1/1000 sample to explore and visualize ingested data.

1. Import required libraries and function required for visualizations, and set seaborn theme parameters that control aesthetics of the output visuals like style, color palette and size of the visual.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\import-libraries.png" alt-text="Screenshot of code sample for importing libraries." lightbox="media\tutorial-data-science-explore-notebook\import-libraries.png":::

1. Visualize distribution of trip duration(minutes) on linear and logarithmic scale by running the following set of commands.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\visualize-trip-duration.png" alt-text="Screenshot of a code sample for visualizing distribution of trip duration." lightbox="media\tutorial-data-science-explore-notebook\visualize-trip-duration.png":::

   :::image type="content" source="media\tutorial-data-science-explore-notebook\trip-duration-charts.png" alt-text="Screenshot of two charts for visualizing the distribution of trip duration." lightbox="media\tutorial-data-science-explore-notebook\trip-duration-charts.png":::

1. Create bins to segregate and understand distribution of tripDuration better. To do this, create a durationBin column using pandas operations to classify trip durations into buckets of **<10 Mins**, **10-30 Mins**, **30-60 Mins**, **1-2 Hrs**, **2-4 Hrs**, and **>4 Hrs**. Visualize the binned column using seaborn histogram plot.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\create-bins-plot-histogram.png" alt-text="Screenshot of code samples for creating bins and then visualizing your binned column with a histogram plot." lightbox="media\tutorial-data-science-explore-notebook\create-bins-plot-histogram.png":::

   :::image type="content" source="media\tutorial-data-science-explore-notebook\trip-distribution-duration-chart.png" alt-text="Bar chart of trip distribution by duration bins." lightbox="media\tutorial-data-science-explore-notebook\trip-distribution-duration-chart.png":::

1. Visualize the distribution of tripDuration and tripDistance and classify by passengerCount using seaborn scatterplot by running below commands.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\visualize-seaborn-scatterplot.png" alt-text="Screenshot of code sample for creating a seaborn scatterplot to visualize trip duration and distance." lightbox="media\tutorial-data-science-explore-notebook\visualize-seaborn-scatterplot.png":::

   :::image type="content" source="media\tutorial-data-science-explore-notebook\scatterplot-trip-details.png" alt-text="Scatterplot chart to visualize passenger count, trip duration, and trip distance." lightbox="media\tutorial-data-science-explore-notebook\scatterplot-trip-details.png":::

1. Visualize the overall distribution of ***passengerCount*** column to understand the most common ***passengerCount*** instances in the trips.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\passenger-count-distribution.png" alt-text="Screenshot of code sample for visualizing distribution of the passengerCount column." lightbox="media\tutorial-data-science-explore-notebook\passenger-count-distribution.png":::

   :::image type="content" source="media\tutorial-data-science-explore-notebook\passengercount-distribution-chart.png" alt-text="Bar chart to visualize the distribution of passenger count." lightbox="media\tutorial-data-science-explore-notebook\passengercount-distribution-chart.png":::

1. Create boxplots to visualize the distribution of ***tripDuration*** by passenger count. A boxplot is a useful tool to understand the variability, symmetry, and outliers of the data.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\boxplot-trip-duration-code.png" alt-text="Screenshot of code sample for creating a boxplot to visualize trip duration." lightbox="media\tutorial-data-science-explore-notebook\boxplot-trip-duration-code.png":::

   In the first figure, we visualize tripDuration without removing any outliers whereas in the second figure we're removing trips with duration greater than 3 hours and zero passengers.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\two-boxplots-trip-duration.png" alt-text="Screenshot of two boxplots to visualize trip duration, one with outliers and one without." lightbox="media\tutorial-data-science-explore-notebook\two-boxplots-trip-duration.png":::

1. Analyze the relationship of ***tripDuration*** and ***fareAmount*** classified by ***paymentType*** and ***VendorId*** using seaborn scatterplots.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\scatterplot-trip-duration-payment.png" alt-text="Screenshot of code sample to create a seaborn scatterplot for analyzing the relationship of trip details." lightbox="media\tutorial-data-science-explore-notebook\scatterplot-trip-duration-payment.png":::

   :::image type="content" source="media\tutorial-data-science-explore-notebook\two-scatterplots-fare-payment.png" alt-text="Screenshot of two scatterplot charts to visualize the relationship between trip duration, fare, and payment type." lightbox="media\tutorial-data-science-explore-notebook\two-scatterplots-fare-payment.png":::

1. Analyze the frequency of the taxi trips by hour of the day using a histogram of trip counts.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\code-histogram-trip-counts.png" alt-text="Screenshot of code sample for creating a histogram to analyze the frequency of trips." lightbox="media\tutorial-data-science-explore-notebook\code-histogram-trip-counts.png":::

   :::image type="content" source="media\tutorial-data-science-explore-notebook\histogram-trip-counts.png" alt-text="Histogram chart to visualize distribution of trips by hour of the day." lightbox="media\tutorial-data-science-explore-notebook\histogram-trip-counts.png":::

1. Analyze average taxi trip duration by hour and day together by using a seaborn heatmap. The below cell creates a pandas pivot table by grouping the trips by hour and ***dayName*** columns and getting a mean of the tripDuration values. This pivot table is used to create a heatmap using seaborn as shown in the following example.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\seaborn-heatmap-code.png" alt-text="Screenshot of code sample to create a pivot table, which can then create a heatmap." lightbox="media\tutorial-data-science-explore-notebook\seaborn-heatmap-code.png":::

   :::image type="content" source="media\tutorial-data-science-explore-notebook\pivot-table-heat-map.png" alt-text="Pandas pivot table used for a seaborn heatmap to analyze trip duration by hour and day." lightbox="media\tutorial-data-science-explore-notebook\pivot-table-heat-map.png":::

1. Finally let’s create a correlation plot, which is a useful tool for exploring the relationships among numerical variables in a dataset. It displays the data points for each pair of variables as a scatterplot and calculates the correlation coefficient for each pair. The correlation coefficient indicates how strongly and in what direction the variables are related. A positive correlation means that the variables tend to increase or decrease together, while a negative correlation means that they tend to move in opposite directions. In this example, we're generating correlation plot for a subset of columns in the dataframe for analysis.

   :::image type="content" source="media\tutorial-data-science-explore-notebook\correlation-plot-code.png" alt-text="Screenshot of code sample to create a correlation plot." lightbox="media\tutorial-data-science-explore-notebook\correlation-plot-code.png":::

   :::image type="content" source="media\tutorial-data-science-explore-notebook\correlation-plot-trip-details.png" alt-text="Correlation plot to visualize relationships between various trip details." lightbox="media\tutorial-data-science-explore-notebook\correlation-plot-trip-details.png":::

## Observations from exploration data analysis

- Some trips in the sample data have a passenger count of 0 but most trips have a passenger count between 1-6.
- tripDuration column has outliers with a comparatively small number of trips having ***tripDuration*** of greater than 3 hours.
- The outliers for TripDuration are specifically present for vendorId 2.
- Some trips have zero tripdistance and hence they can be canceled and filtered out from any modeling.
- A small number of trips have no passengers(0) and hence can be filtered out.
- fareAmount column contains negative outliers, which can be removed from model training.
- The number of trips starts rising around 16:00 hours and peaks between 18:00 - 19:00 hours.

## Next steps

- [Module 3: Perform data cleansing and preparation using Apache Spark](tutorial-data-science-data-cleanse.md)
