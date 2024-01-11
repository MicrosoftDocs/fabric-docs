---
title: Get started with streaming data in lakehouse
description: Learn how to stream data into lakehouse and serve it through SQL analytics endpoint.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Get Started Lakehouse Streaming SQL Endpoint
---

# Get streaming data into lakehouse and access with SQL analytics endpoint

This quickstart explains how to create a Spark Job Definition that contains Python code with Spark Structured Streaming to land data in a lakehouse and then serve it through a SQL analytics endpoint. After completing this quickstart, you'll have a Spark Job Definition that runs continuously and the SQL analytics endpoint can view the incoming data.

## Create a Python script

1. Use the following Python code that uses Spark structured streaming to get data in a lakehouse table.

   ```python
   import sys
   from pyspark.sql import SparkSession
   
   if __name__ == "__main__":
       spark = SparkSession.builder.appName("MyApp").getOrCreate()
   
       tableName = "streamingtable"
       deltaTablePath = "Tables/" + tableName
   
       df = spark.readStream.format("rate").option("rowsPerSecond", 1).load()

       query = df.writeStream.outputMode("append").format("delta").option("path", deltaTablePath).option("checkpointLocation", deltaTablePath + "/checkpoint").start()
       query.awaitTermination()
   ```

1. Save your script as Python file (.py) in your local computer.

## Create a lakehouse

Use the following steps to create a lakehouse:

1. In Microsoft Fabric, select the **Synapse Data Engineering** experience.

1. Navigate to your desired workspace or create a new one if needed.

1. To create a lakehouse, select the **Lakehouse** icon under the **New** section in the main pane.

   :::image type="content" source="media\get-started-streaming\new-lakehouse.png" alt-text="Screenshot showing new lakehouse dialog":::

1. Enter name of your lakehouse and select **Create**.

## Create a Spark Job Definition

Use the following steps to create a Spark Job Definition:

1. From the same workspace where you created a lakehouse, select the **Create** icon from the left menu.

1. Under "Data Engineering", select **Spark Job Definition**.

   :::image type="content" source="media\get-started-streaming\new-sjd.png" alt-text="Screenshot showing new Spark Job Definition dialog":::

1. Enter name of your Spark Job Definition and select **Create**.

1. Select **Upload** and select the Python file you created in the previous step.

1. Under **Lakehouse Reference** choose the lakehouse you created.

## Set Retry policy for Spark Job Definition

Use the following steps to set the retry policy for your Spark job definition:

1. From the top menu, select the **Setting** icon.

   :::image type="content" source="media\get-started-streaming\sjd-settings.png" alt-text="Screenshot showing Spark Job Definition settings icon":::

1. Open the **Optimization** tab and set **Retry Policy** trigger **On**.

   :::image type="content" source="media\get-started-streaming\sjd-retry-on.png" alt-text="Screenshot showing Spark Job Definition optimization tab":::

1. Define maximum retry attempts or check **Allow unlimited attempts**.

1. Specify time between each retry attempt and select **Apply**.

> [!NOTE]
> There is a lifetime limit of 90 days for the retry policy setup. Once the retry policy is enabled, the job will be restarted according to the policy within 90 days. After this period, the retry policy will automatically cease to function, and the job will be terminated. Users will then need to manually restart the job, which will, in turn, re-enable the retry policy.

## Execute and monitor the Spark Job Definition

1. From the top menu, select the **Run** icon.

   :::image type="content" source="media\get-started-streaming\sjd-run.png" alt-text="Screenshot showing Spark Job Definition run icon":::

1. Verify if the **Spark Job definition** was submitted successfully and running.

## View data using a SQL analytics endpoint

1. In workspace view, select your Lakehouse.

1. From the right corner, select **Lakehouse** and select **SQL analytics endpoint**.

1. In the SQL analytics endpoint view under **Tables**, select the table that your script uses to land data. You can then preview your data from the SQL analytics endpoint.

## Related content

- [Spark Job Definition](spark-job-definition.md)
- [What is the SQL analytics endpoint for a lakehouse?](lakehouse-sql-analytics-endpoint.md)
