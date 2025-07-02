---
title: What is Spark run series analysis?
description: Learn about the Apache Spark run series analysis, including examples of the analysis and when to use it.
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.topic: overview
ms.custom: sfi-image-nochange
ms.date: 05/21/2024
ms.search.form: run_series_analysis
---

# What is Apache Spark run series analysis?  

> [!NOTE]
> The Apache Spark run series and anomaly analysis features support only Spark versions 3.4 and above for completed Spark applications.

The Apache Spark run series automatically categorizes your Spark applications based on recurring pipeline activities, manual notebook runs, or Spark job runs from the same notebook or Spark job definition.

The run series feature illustrates the duration trend and data input or output  trend for each Spark application instance. It automatically scans the run series, detects anomalies, and provides detailed views for individual Spark applications.

The run series analysis feature offers the following key capabilities:

- **Autotune analysis:** Use the run series analysis to compare autotune outcomes, view the Spark application performance, examine run-time breakdowns, and review autotuned Spark SQL query configurations.

- **Run Series Comparison:** Compare the notebook run duration with past runs, and evaluate the input and output data to understand the reasons behind prolonged run durations.

- **Outlier detection and analysis:** Detect and analyze outliers in the run series to identify potential causes.

- **Detailed run instance view:** Select a specific run instance to get detailed information on it's time distribution. These details be used to identify opportunities for performance enhancement, and the corresponding Spark configurations.

## When to use run series analysis?

The run series analysis feature is designed for performance tuning and optimization. If you're uncertain about the health of production jobs, you can use this feature. It automatically scans production jobs from different run series and performs health analysis. If you'd like to optimize a long-running job, you can compare it with other jobs, identify performance bottlenecks, and optimization opportunities. Additionally, you can use this feature to view the output of autotune and ensure optimal performance.

### Examples of a run series analysis

Here's an example of run series analysis from a notebook run instance. You can view the duration trend for this run series. Each vertical bar represents an instance of the notebook activity run, with the height indicating the run duration. Red bars indicate anomalies detected for that run instance. You can select each run instance to view more detailed information and zoom in or out for a specific time window.

:::image type="content" source="media\run-series-analyisis-overview\examples-of-a-run-series-analysis.png" alt-text="Screenshot showing examples of a run series analysis." lightbox="media\run-series-analyisis-overview\examples-of-a-run-series-analysis.png":::

### Access to the spark run series analysis

You can access the run series analysis feature through the monitoring hub's historical view, the notebook or spark job definition's recent runs panel, or from the spark application monitoring detail page. 

:::image type="content" source="media\run-series-analyisis-overview\how-to-access-to-the-spar-run-series-analysis.png" alt-text="Screenshot showing how to access to the spark run series analysis." lightbox="media\run-series-analyisis-overview\how-to-access-to-the-spar-run-series-analysis.png":::

## Related content

- [Apache Spark advisor for real-time advice on notebooks](spark-advisor-introduction.md)
- [Browse the Apache Spark applications in the Fabric monitoring hub](browse-spark-applications-monitoring-hub.md)
- [Browse item's recent runs](spark-item-recent-runs.md)
- [Monitor Spark jobs within a notebook](spark-monitor-debug.md)
- [Monitor your Apache Spark job definition](monitor-spark-job-definitions.md)
- [Apache Spark application detail monitoring](spark-detail-monitoring.md)
- [Use extended Apache Spark history server to debug and diagnose Apache Spark applications](apache-spark-history-server.md)
- [Monitor Spark capacity consumption](../data-engineering/monitor-spark-capacity-consumption.md)
