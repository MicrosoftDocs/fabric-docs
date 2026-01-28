---
title: Get started with streaming data in lakehouse
description: Learn how to use an Apache Spark job definition to stream data into your lakehouse and then serve it through a SQL analytics endpoint.
ms.reviewer: tvilutis
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 07/20/2025
ms.search.form: Get Started Lakehouse Streaming SQL Endpoint
---

# Get streaming data into lakehouse and access with SQL analytics endpoint

This quickstart explains how to create a Spark Job Definition that contains Python code with Spark Structured Streaming to land data in a lakehouse and then serve it through a SQL analytics endpoint. After completing this quickstart, you'll have a Spark Job Definition that runs continuously and the SQL analytics endpoint can view the incoming data.

## Create a Python script

Use the following Python script to create a streaming Delta table in a lakehouse using Apache Spark. The script reads a stream of generated data (one row per second) and writes it in append mode to a Delta table named `streamingtable`. It stores the data and checkpoint info in the specified lakehouse.

1. Use the following Python code that uses Spark structured streaming to get data in a lakehouse table.

   ```python
   from pyspark.sql import SparkSession

   if __name__ == "__main__":
    # Start Spark session
    spark = SparkSession.builder \
        .appName("RateStreamToDelta") \
        .getOrCreate()

    # Table name used for logging
    tableName = "streamingtable"

    # Define Delta Lake storage path
    deltaTablePath = f"Tables/{tableName}"

    # Create a streaming DataFrame using the rate source
    df = spark.readStream \
        .format("rate") \
        .option("rowsPerSecond", 1) \
        .load()

    # Write the streaming data to Delta
    query = df.writeStream \
        .format("delta") \
        .outputMode("append") \
        .option("path", deltaTablePath) \
        .option("checkpointLocation", f"{deltaTablePath}/_checkpoint") \
        .start()

    # Keep the stream running
    query.awaitTermination()
   ```

1. Save your script as Python file (.py) in your local computer.

## Create a lakehouse

Use the following steps to create a lakehouse:

1. Sign in to the [Microsoft Fabric portal](https://app.fabric.microsoft.com).

1. Navigate to your desired workspace or create a new one if needed.

1. To create a lakehouse, select **New item** from the workspace, then select **Lakehouse** in the panel that opens.

   :::image type="content" source="media\get-started-streaming\new-lakehouse.png" alt-text="Screenshot showing new lakehouse dialog." lightbox="media\get-started-streaming\new-lakehouse.png":::

1. Enter name of your lakehouse and select **Create**.

## Create a Spark Job Definition

Use the following steps to create a Spark Job Definition:

1. From the same workspace where you created a lakehouse, select **New item**.

1. In the panel that opens, under **Get data**, select **Spark Job Definition**.

1. Enter name of your Spark Job Definition and select **Create**.

1. Select **Upload** and select the Python file you created in the previous step.

1. Under **Lakehouse Reference** choose the lakehouse you created.

## Set Retry policy for Spark Job Definition

Use the following steps to set the retry policy for your Spark job definition:

1. From the top menu, select the **Setting** icon.

   :::image type="content" source="media\get-started-streaming\sjd-settings.png" alt-text="Screenshot showing Spark Job Definition settings icon." lightbox="media\get-started-streaming\sjd-settings.png":::

1. Open the **Optimization** tab and set **Retry Policy** trigger **On**.

   :::image type="content" source="media\get-started-streaming\sjd-retry-on.png" alt-text="Screenshot showing Spark Job Definition optimization tab." lightbox="media\get-started-streaming\sjd-retry-on.png":::

1. Define maximum retry attempts or check **Allow unlimited attempts**.

1. Specify time between each retry attempt and select **Apply**.

> [!NOTE]
> There is a lifetime limit of 90 days for the retry policy setup. Once the retry policy is enabled, the job will be restarted according to the policy within 90 days. After this period, the retry policy will automatically cease to function, and the job will be terminated. Users will then need to manually restart the job, which will, in turn, re-enable the retry policy.

## Execute and monitor the Spark Job Definition

1. From the top menu, select the **Run** icon.

   :::image type="content" source="media\get-started-streaming\sjd-run.png" alt-text="Screenshot showing Spark Job Definition run icon." lightbox="media\get-started-streaming\sjd-run.png":::

1. Verify if the **Spark Job definition** was submitted successfully and running.

## View data using a SQL analytics endpoint

After the script runs, a table named *streamingtable* with *timestamp* and *value* columns is created in the lakehouse. You can view the data using the SQL analytics endpoint:

1. From the workspace, open your Lakehouse.

1. Switch to **SQL analytics endpoint** from the top-right corner.

1. From the left-navigation pane, expand **Schemas > dbo >Tables**, select *streamingtable* to preview the data.

## Related content

- [Spark Job Definition](spark-job-definition.md)
- [What is the SQL analytics endpoint for a lakehouse?](lakehouse-sql-analytics-endpoint.md)
