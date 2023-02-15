---
title: Notebook contextual monitoring and debugging
description: Learn how to view Spark job progress below the Notebook cell.
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.topic: how-to
ms.date: 02/24/2023
---

# Notebook contextual monitoring and debugging

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Notebook is purely Spark based. Code cells are executed on the serverless remotely. A Spark job progress indicator is provided with a real-time progress bar appears to help you understand the job execution status.

## Monitor job progress

Run the following sample code and validate the Spark job progress indicator below the Notebook cell.

```Python
%%spark 
import org.apache.spark.sql.functions.{ countDistinct, col, count, when } 
val df = spark.range(0, 100000000) 
df.select(df.columns.map(c => countDistinct(col(c)).alias(c)): _*).collect
```

:::image type="content" source="media\spark-monitor-debug\spark-monitor-progress.png" alt-text="Screenshot showing Notebook cell and Spark job progress list." lightbox="media\spark-monitor-debug\spark-monitor-progress.png":::

## Access Spark UI and monitoring detail page

The number of tasks per each job or stage helps you to identify the parallel level of your spark job. You can also drill deeper to the Spark UI of a specific job (or stage) via selecting the link on the job (or stage) name. And you can also drill down to a specific job (or stage) by selecting the Spark Web UI link in the expand menu to open the Spark History Server.

:::image type="content" source="media\spark-monitor-debug\spark-monitor-details.png" alt-text="Screenshot showing where to access detailed information about a Spark job." lightbox="media\spark-monitor-debug\spark-monitor-details.png":::

## Spark Advisor info advice

Also supports viewing Spark Advisor info advice, after applying the advice, you would have chance to improve your execution performance, decrease cost and fix the execution failures. Run the following sample code and validate the Spark advisor info message below the Notebook cell.

```Python
%%spark
val rdd = sc.parallelize(1 to 1000000)
val rdd2 = rdd.repartition(64)
val Array(train, test) = rdd2.randomSplit(Array(70, 30), 1)
train.takeOrdered(10)
```

:::image type="content" source="media\spark-monitor-debug\spark-advisor-info-advice.png" alt-text="Screenshot showing Notebook cell and Spark Advisor advice." lightbox="media\spark-monitor-debug\spark-advisor-info-advice.png":::

## Spark Advisor skew detection

It also supports viewing Spark Advisor skew detection. Run the following sample code and view the Data skew + time skew warning message below the Notebook cell.

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

## Next steps

- Spark Advisor
- [Spark application detail monitoring](spark-detail-monitoring.md)
