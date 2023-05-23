---
title: Data science tutorial - data cleansing and preparation
description: In this third module, learn how to read the raw data from a lakehouse table, and clean and transform that data to be ready for training machine learning models.
ms.reviewer: mopeakande
ms.author: mopeakande
author: msakande
ms.topic: tutorial
ms.custom: build-2023
ms.date: 5/4/2023
---

# Module 3: Perform data cleansing and preparation using Apache Spark

The [NYC Yellow Taxi dataset](/azure/open-datasets/dataset-taxi-yellow?tabs=pyspark) contains over 1.5 Billion trip records with each month of trip data running into millions of records, which makes processing these records computationally expensive and often not feasible with nondistributed processing engines.

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this tutorial, we demonstrate how to use Apache Spark notebooks to clean and prepare the taxi trips dataset. Spark's optimized distribution engine makes it ideal for processing large volumes of data.

> [!TIP]
> For datasets of relatively small size, use the Data Wrangler UI, which is a notebook-based graphical user interface tool that provides interactive exploration and a data cleansing experience for users working with pandas dataframes on Microsoft Fabric notebooks.

In the following steps, you read the raw NYC Taxi data from a lakehouse delta lake table (saved in module 1), and perform various operations to clean and transform that data to prepare it for training machine learning models.

## Follow along in notebook

The python commands/script used in each step of this tutorial can be found in the accompanying notebook: [03-perform-data-cleansing-and-preparation-using-apache-spark.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/03-perform-data-cleansing-and-preparation-using-apache-spark.ipynb). Be sure to [attach a lakehouse to the notebook](tutorial-data-science-prepare-system.md#attach-a-lakehouse-to-the-notebooks) before executing it.

## Cleanse and prepare

1. Load NYC yellow taxi Data from lakehouse delta table ***nyctaxi_raw*** using the `spark.read` command.

   ```python
   nytaxi_df = spark.read.format("delta").load("Tables/nyctaxi_raw")
   ```

1. To aid the data cleansing process, next we use Apache Spark's built-in summary feature that generates summary statistics, which are numerical measures that describe aspects of a column in the dataframe. These measures include count, mean, standard deviation, min, and max. Use the following command to view the summary statistics of all columns in the ***taxi*** dataset.

   ```python
   display(nytaxi_df.summary())
   ```

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

   ```python
   from pyspark.sql.functions import col,when, dayofweek, date_format, hour,unix_timestamp, round, dayofmonth, lit
   nytaxidf_prep = nytaxi_df.withColumn('pickupDate', col('tpepPickupDateTime').cast('date'))\
                              .withColumn("weekDay", dayofweek(col("tpepPickupDateTime")))\
                              .withColumn("weekDayName", date_format(col("tpepPickupDateTime"), "EEEE"))\
                              .withColumn("dayofMonth", dayofweek(col("tpepPickupDateTime")))\
                              .withColumn("pickupHour", hour(col("tpepPickupDateTime")))\
                              .withColumn("tripDuration", (unix_timestamp(col("tpepDropoffDateTime")) - unix_timestamp(col("tpepPickupDateTime")))/60)\
                              .withColumn("timeBins", when((col("pickupHour") >=7) & (col("pickupHour")<=10) ,"MorningRush")\
                              .when((col("pickupHour") >=11) & (col("pickupHour")<=15) ,"Afternoon")\
                              .when((col("pickupHour") >=16) & (col("pickupHour")<=19) ,"EveningRush")\
                              .when((col("pickupHour") <=6) | (col("pickupHour")>=20) ,"Night"))\
                              .filter("""fareAmount > 0 AND fareAmount < 100 and tripDistance > 0 AND tripDistance < 100 
                                       AND tripDuration > 0 AND tripDuration <= 189 
                                       AND passengerCount > 0 AND passengerCount <= 8
                                       AND startLat IS NOT NULL AND startLon IS NOT NULL AND endLat IS NOT NULL AND endLon IS NOT NULL""")
   ```

   > [!NOTE]
   > Apache Spark uses Lazy evaluation paradigm which delays the execution of transformations until an action is triggered. This allows Spark to optimize the execution plan and avoid unnecessary computations. In this step, the definitions of the transformations and filters are created. The actual cleansing and transformation will be triggered once data is written (an action) in the next step.

1. Once we've defined the cleaning steps and assigned them to a dataframe named ***nytaxidf_prep***, we write the cleansed and prepared data to a new delta table (***nyctaxi_prep***) in the attached lakehouse, using the following set of commands.

   ```python
   table_name = "nyctaxi_prep"
   nytaxidf_prep.write.mode("overwrite").format("delta").save(f"Tables/{table_name}")
   print(f"Spark dataframe saved to delta table: {table_name}")
   ```

The cleansed and prepared data produced in this module is now available in the lakehouse as a delta table and can be used for further processing and generating insights.

## Next steps

- [Module 4: Train and register machine learning models in Microsoft Fabric](tutorial-data-science-train-models.md)
