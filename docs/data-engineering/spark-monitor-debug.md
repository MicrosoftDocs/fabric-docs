---
title: Notebook contextual monitoring and debugging
description: Learn how to view Apache Spark job progress below the Notebook cell.
ms.reviewer: snehagunda
author: jejiang
ms.author: jejiang
ms.topic: how-to 
ms.custom: build-2023
ms.date: 02/24/2023
ms.search.form: Monitor notebook all runs, monitor Spark jobs within a notebook 
---

# Notebook contextual monitoring & debugging

[!INCLUDE [preview-note](../includes/preview-note.md)]

Notebook is purely Apache Spark based. Code cells are executed on the serverless remotely. A Spark job progress indicator is provided with a real-time progress bar appears to help you understand the job execution status.

## Monitor Job progress 

Run the following sample code and validate the Spark job progress indicator below the Notebook cell.
 
 ```Python 
%%spark 
import org.apache.spark.sql.functions.{ countDistinct, col, count, when } 
val df = spark.range(0, 100000000) 
df.select(df.columns.map(c => countDistinct(col(c)).alias(c)): _*).collect
```

:::image type="content" source="media\spark-monitor-debug\spark-monitor-progress.png" alt-text="Screenshot showing Notebook cell and Spark job progress list." lightbox="media\spark-monitor-debug\spark-monitor-progress.png":::

## Spark Advisor recommendation 

Also supports viewing Spark Advisor info advice, after applying the advice, you would have chance to improve your execution performance, decrease cost and fix the execution failures. Run the sample code below and validate the Spark advisor info message below the Notebook cell.

```Python
%%spark
val rdd = sc.parallelize(1 to 1000000)
val rdd2 = rdd.repartition(64)
val Array(train, test) = rdd2.randomSplit(Array(70, 30), 1)
train.takeOrdered(10)
```

:::image type="content" source="media\spark-monitor-debug\spark-advisor-info-advice.png" alt-text="Screenshot showing Notebook cell and Spark advisor advice." lightbox="media\spark-monitor-debug\spark-advisor-info-advice.png":::

### View advice

Icon with blue light bulbs indicate suggestions are available for commands. The box shows the number of different suggestions.

:::image type="content" source="media\spark-monitor-debug\light-bulb.png" alt-text="Screenshot showing light bulb." lightbox="media\spark-monitor-debug\light-bulb.png":::

Click the light bulb to expand and view the advice. One or more pieces of advice will become visible.

:::image type="content" source="media\spark-monitor-debug\light-bulb-to-expand-the-box.png" alt-text="Screenshot showing light bulb to expand the box." lightbox="media\spark-monitor-debug\light-bulb-to-expand-the-box.png":::

## Spark Advisor skew detection

It also supports viewing Spark Advisor skew detection. Run the sample code below and view the Data skew + time skew warning message below the Notebook cell.

```Python
%%spark
import org.apache.spark.SparkContext
import java.util.Random
def testDataSkew(sc: SparkContext): Unit = {
    val numMappers = 400
    val numKVPairs = 100000
    val valSize = 256
    val numReducers = 200
    val biasPct = 0.4
    val biasCount = numKVPairs * biasPct
    for (i <- 1 to 2) {
      val query = sc.parallelize(0 until numMappers, numMappers).flatMap { p =>
        val ranGen = new Random
        val arr1 = new Array[(Int, Array[Byte])](numKVPairs)
        for (i <- 0 until numKVPairs) {
          val byteArr = new Array[Byte](valSize)
          ranGen.nextBytes(byteArr)
          var key = ranGen.nextInt(Int.MaxValue)
          if(i <= biasCount) {
            key = 1
          }
          arr1(i) = (key, byteArr)
        }
        arr1
      }.groupByKey(numReducers)
      println(query.count())
    }
  }
  testDataSkew(sc)
```

:::image type="content" source="media\spark-monitor-debug\spark-advisor-skew-detection.png" alt-text="Screenshot showing Data Skew Analysis details." lightbox="media\spark-monitor-debug\spark-advisor-skew-detection.png":::

## Real-time logs

The log item is shown in cell output, which will display the real-time log. You can search keywords in searchbox or check filter errors and warnings to filter the logs you need.

:::image type="content" source="media\spark-monitor-debug\real-time-logs.png" alt-text="Screenshot showing the real time logs under the code cell." lightbox="media\spark-monitor-debug\real-time-logs.png":::

## Access Spark UI and monitoring detail page
The number of tasks per each job or stage helps you to identify the parallel level of your spark job. You can also drill deeper to the Spark UI of a specific job (or stage) via selecting the link on the job (or stage) name. And you can also drill down to a specific job (or stage) by selecting the Spark Web UI link in the expand menu to open the Spark History Server.

:::image type="content" source="media\spark-monitor-debug\access-spark-ui-and-monitoring-detail-page.png" alt-text="Screenshot showing the access spark ui and monitoring detail page." lightbox="media\spark-monitor-debug\access-spark-ui-and-monitoring-detail-page.png":::

## Next steps

- [Spark advisor](spark-advisor-introduction.md)
- [Apache Spark application detail monitoring](spark-detail-monitoring.md)
