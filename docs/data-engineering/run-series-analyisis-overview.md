---
title: Run Series Analysis Overview
description: The Spark Run Series automatically classifies your Spark applications from your recurring Pipeline activities, or manual Notebook runs, or Spark Job runs from the same Notebook or Spark Job Definition into respective run series.
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.topic: overview
ms.custom:
ms.date: 05/09/2024
ms.search.form: run_series_analysis
---

# Run Series Analysis Overview 

## What is the feature of spark run Series analysis? 

The Spark Run Series automatically classifies your Spark applications from your recurring Pipeline activities, or manual Notebook runs, or Spark Job runs from the same Notebook or Spark Job Definition into respective run series. The Run Series feature visualizes the duration trend for each Spark application instance, along with the corresponding data input and output trendline for Spark applications in the run series. It also auto-scans the run series and detects whether there are any anomalous Spark application runs. This feature enables you to view details for a particular Spark application. 

The Run Series Analysis feature offers the following key capabilities. 

- **Autotune analysis:** You can leverage the Run Series Analysis feature to compare and analyze the outcomes of Autotune, view the performance of each Spark application, examine the time execution breakdown for each run, and observe the auto-tuned configuration values for Spark SQL queries. 

- **Run Series Comparison:** You can compare the duration of a Notebook run with that of previous runs and evaluate the input and output data to understand the reasons behind prolonged run durations.

- **Outlier Detection and Analysis:** The system can detect outliers in the run series and analyze them to pinpoint potential contributing factors.

- **Detailed Run Instance View:** Clicking on a specific run instance provides detailed information on time distribution, which can be used to identify opportunities for performance enhancement, as well as the corresponding Spark configurations.

## When to use run series analysis?

The Run Series Analysis feature is designed for performance tuning and optimization. If you're uncertain about the health of production jobs, you can use this feature, which automatically scans production jobs from different run series and performs health analysis. If you'd like to optimize a long-running job, the Run Series Analysis feature lets you compare it with other jobs, and assists you identify performance bottlenecks and optimization opportunities. Additionally, you can use this feature to view the output of Autotune and ensure optimal performance. 

### Examples of a run series analysis 

Here is an example of Run Series Analysis from a Notebook run instances. You can view the duration trend for this run series. Each vertical bar represents an instance of the Notebook activity run, with the height indicating the run duration. If a bar is marked in red, it means an anomaly has been detected for that run instance. You can click each run instance to view more detailed information and zoom in or out for a specific time window.

:::image type="content" source="media\run-series-analyisis-overview\examples-of-a-run-series-analysis.png" alt-text="Screenshot showing examples of a run series analysis." lightbox="media\run-series-analyisis-overview\examples-of-a-run-series-analysis.png":::


### How to access to the spark run series analysis?

You can access the run series analysis feature through the monitoring hub's historical view, the notebook or spark job definition's recent runs panel, or the spark application monitoring detail page. 

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
