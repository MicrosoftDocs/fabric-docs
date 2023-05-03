---
title: Data science tutorial - data cleansing and preparation
description: In this third module, learn how to read the raw data from a lakehouse table, and clean and transform that data to be ready for training machine learning models.
ms.reviewer: mopeakande
ms.author: mopeakande
author: msakande
ms.topic: tutorial
ms.date: 5/4/2023
---

# Module 3: Perform data cleansing and preparation using Apache Spark

The [NYC Yellow Taxi dataset](/azure/open-datasets/dataset-taxi-yellow?tabs=pyspark) contains over 1.5 Billion trip records with each month of trip data running into millions of records, which makes processing these records computationally expensive and often not feasible with nondistributed processing engines.

In this tutorial, we demonstrate how to use Apache Spark notebooks to clean and prepare the taxi trips dataset. Spark's optimized distribution engine makes it ideal for processing large volumes of data.

> [!TIP]
> For datasets of relatively small size, use the Data Wrangler UI, which is a notebook-based graphical user interface tool that provides interactive exploration and a data cleansing experience for users working with pandas dataframes on Microsoft Fabric notebooks.

In the following steps, you read the raw NYC Taxi data from a lakehouse delta lake table (saved in module 1), and perform various operations to clean and transform that data to prepare it for training machine learning models.

## Follow along in notebook
The python commands/script used in each step of this tutorial can be found in the accompanying notebook: **03 - Perform Data Cleansing and preparation using Apache Spark**.

## Cleanse and prepare

1. Load NYC yellow taxi Data from lakehouse delta table ***nyctaxi_raw*** using the `spark.read` command.

   :::image type="content" source="media\tutorial-data-science-data-cleanse\load-data-spark-read.png" alt-text="Screenshot of code sample for loading data with the spark.read command." lightbox="media\tutorial-data-science-data-cleanse\load-data-spark-read.png":::

1. To aid the data cleansing process, next we use Apache Spark’s built-in summary feature that generates summary statistics, which are numerical measures that describe aspects of a column in the dataframe. These measures include count, mean, standard deviation, min, and max. Use the following command to view the summary statistics of all columns in the ***ytaxi*** dataset.

   :::image type="content" source="media\tutorial-data-science-data-cleanse\view-summary-statistics.png" alt-text="Screenshot of code sample to view summary statistics." lightbox="media\tutorial-data-science-data-cleanse\view-summary-statistics.png":::

   > [!NOTE]
   > Generating summary statistics is a computationally expensive process and can take considerable amount of execution time based on the size of the dataframe. In this tutorial, the step takes between two and three minutes.

   :::image type="content" source="media\tutorial-data-science-data-cleanse\list-summary.png" alt-text="Screenshot of the list of generated summary statistics." lightbox="media\tutorial-data-science-data-cleanse\list-summary.png":::

1. In this step, we clean the ***nytaxi_df*** dataframe and add more columns derived from the values of existing columns.

   The following is the set of operations performed in this step:

   1. Add derived Columns
      - pickupDate - convert datetime to date for visualizations and reporting
      - weekDay - day number of the week
      - weekDayName - day names abbreviated
      - dayofMonth - day number of month
      - pickupHour - hour of pickup time
      - tripDuration - representing duration in minutes of the trip
      - timeBins - Binned time of the day

   1. Filter Conditions
      - fareAmount is between and 100.
      - tripDistance greater than 0.
      - tripDuration is less than 3 hours (180 minutes).
      - passengerCount is between 1 and 8.
      - startLat, startLon, endLat, endLon aren't NULL.
      - Remove outstation trips(outliers) tripDistance>100.

   :::image type="content" source="media\tutorial-data-science-data-cleanse\cleanse-add-columns-code.png" alt-text="Screenshot of code to cleanse data and add columns, with labels on the lines of code for the derived columns and filters to clean data." lightbox="media\tutorial-data-science-data-cleanse\cleanse-add-columns-code.png":::

   > [!NOTE]
   > Apache Spark uses Lazy evaluation paradigm which delays the execution of transformations until an action is triggered. This allows Spark to optimize the execution plan and avoid unnecessary computations. In this step, the definitions of the transformations and filters are created. The actual cleansing and transformation will be triggered once data is written (an action) in the next step.

1. Once we've defined the cleaning steps and assigned them to a dataframe named ***nytaxidf_prep***, we write the cleansed and prepared data to a new delta table (***nyctaxi_prep***) in the attached lakehouse, using the following set of commands.

   :::image type="content" source="media\tutorial-data-science-data-cleanse\write-new-delta-table.png" alt-text="Screenshot of code sample to write data to a new delta table." lightbox="media\tutorial-data-science-data-cleanse\write-new-delta-table.png":::

The cleansed and prepared data produced in this module is now available in the lakehouse as a delta table and can be used for further processing and generating insights.

## Next steps

- [Module 4: Train and register machine learning models in Microsoft Fabric](tutorial-data-science-train-models.md)
