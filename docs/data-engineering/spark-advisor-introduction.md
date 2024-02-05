---
title: Apache Spark advisor for real-time advice on notebooks
description: The Apache Spark advisor analyzes commands and code run by Apache Spark and displays real-time advice for notebook runs.
author: jejiang
ms.author: jejiang
ms.topic: overview
ms.date: 02/25/2023
ms.custom:
  - template-howto
  - build-2023
  - ignite-2023
ms.search.form: View Spark advisor within a notebook
---

# Apache Spark advisor for real-time advice on notebooks

The Apache Spark advisor analyzes commands and code run by Apache Spark and displays real-time advice for Notebook runs. The Apache Spark advisor has built-in patterns to help users avoid common mistakes. It offers recommendations for code optimization, performs error analysis, and locates the root cause of failures.

## Built-in advice

The Spark advisor, a tool integrated with Impulse, provides built-in patterns for detecting and resolving issues in Apache Spark applications. This article explains some of the patterns included in the tool.

You can open the **Recent runs** pane based on the type of advice you need.

### May return inconsistent results when using 'randomSplit'

Inconsistent or inaccurate results may be returned when working with the  *randomSplit* method. Use Apache Spark (RDD) caching before using the randomSplit() method.

Method randomSplit() is equivalent to performing sample() on your data frame multiple times.  Where each sample refetches, partitions, and sorts your data frame within partitions. The data distribution across partitions and sorting order is important for both randomSplit() and sample(). If either changes upon data refetch, there may be duplicates or missing values across splits. And the same sample using the same seed may produce different results.

These inconsistencies may not happen on every run, but to eliminate them completely, cache your data frame, repartition on a column(s), or apply aggregate functions such as *groupBy*.

### Table/view name is already in use

A view already exists with the same name as the created table, or a table already exists with the same name as the created view. When this name is used in queries or applications, only the view will be returned no matter which one created first. To avoid conflicts, rename either the table or the view.

### Unable to recognize a hint

```scala
spark.sql("SELECT /*+ unknownHint */ * FROM t1")
```

### Unable to find a specified relation name(s)

Unable to find the relation(s) specified in the hint. Verify that the relation(s) are spelled correctly and accessible within the scope of the hint.

```scala
spark.sql("SELECT /*+ BROADCAST(unknownTable) */ * FROM t1 INNER JOIN t2 ON t1.str = t2.str")
```

### A hint in the query prevents another hint from being applied

The selected query contains a hint that prevents another hint from being applied.

```scala
spark.sql("SELECT /*+ BROADCAST(t1), MERGE(t1, t2) */ * FROM t1 INNER JOIN t2 ON t1.str = t2.str")
```

### Enable 'spark.advise.divisionExprConvertRule.enable' to reduce rounding error propagation

This query contains the expression with Double type. We recommend that you enable the configuration 'spark.advise.divisionExprConvertRule.enable', which can help reduce the division expressions and to reduce the rounding error propagation.

```console
"t.a/t.b/t.c" convert into "t.a/(t.b * t.c)"
````

### Enable 'spark.advise.nonEqJoinConvertRule.enable' to improve query performance

This query contains time consuming join due to "Or" condition within query. We recommend that you enable the configuration 'spark.advise.nonEqJoinConvertRule.enable', which can help to convert the join triggered by "Or" condition to SMJ or BHJ to accelerate this query.

## User experience

The Apache Spark advisor displays the advice, including info, warnings, and errors, at Notebook cell output in real-time.

- Info
    :::image type="content" source="media\spark-advisor-introduction\info.png" alt-text="Screenshot showing the info.":::

- Warning
    :::image type="content" source="media\spark-advisor-introduction\warning.png" alt-text="Screenshot showing the warning.":::

- Error
    :::image type="content" source="media\spark-advisor-introduction\errors.png" alt-text="Screenshot showing the errors.":::

## Related content

- [Monitor Apache Spark jobs within notebooks](spark-monitor-debug.md)
- [Monitor Apache Spark job definition](monitor-spark-job-definitions.md)
- [Monitor Apache Spark application details](spark-detail-monitoring.md)
