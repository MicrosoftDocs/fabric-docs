---
title: Apache Spark Applications Comparison
description: This article introduces the Compare runs feature of Spark applications.
ms.reviewer: jejiang
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 06/26/2025
ms.search.form: Apache Spark applications comparison
---

# Apache Spark applications comparison (preview)

The Spark applications comparison feature allows you to analyze and compare the performance of multiple Spark application runs. By examining trends in duration, input/output data, and other metrics, you can quickly spot regressions, improvements, or anomalies relative to a baseline run.

## Access the Spark applications comparison feature 

You can access the Spark applications comparison from the [Monitor run series](apache-spark-monitor-run-series.md#access-the-monitor-run-series-feature) page:

1. Go to the **Monitor run series** page.
2. Switch to the **Compare runs** tab.

:::image type="content" source="media\spark-comparison-runs\access-the-compare-run-feature.png" alt-text="Screenshot showing access the compare run feature." lightbox="media\spark-comparison-runs\access-the-compare-run-feature.png":::

## Spark application runs list

- Only completed Spark applications are displayed. 
- Applications in Queued, Launching, Submitting, or Running status are excluded. 
- By default, the run you open from Monitoring Center or Recent Runs is set as the base run. The base run serves as the baseline for performance and metric comparisons. 
- You can select up to four completed runs (including the base run) for comparison. 
- Use the flag icon to reassign the base run at any time. 

:::image type="content" source="media\spark-comparison-runs\view-spark-application-runs-list.png" alt-text="Screenshot showing view spark application runs list." lightbox="media\spark-comparison-runs\view-spark-application-runs-list.png":::

> [!NOTE]
> Spark applications comparison currently supports comparing runs within the same artifact (for example, within a single Notebook or Spark Job Definition). Cross-artifact comparisons are not yet supported.

## View the compare panel

Once runs are selected, the compare panel displays a side-by-side visualization of key metrics across the chosen Spark applications. 

Here, you can:

- Compare execution duration, input/output volumes, and other metrics. 
- Review deltas (%) relative to the base run to easily spot regressions or optimizations. 
- Identify anomalies and surface likely causes. 

:::image type="content" source="media\spark-comparison-runs\compare-panel.png" alt-text="Screenshot showing compare panel." lightbox="media\spark-comparison-runs\compare-panel.png":::

## Anomalous runs

If a run is flagged as anomalous, the compare panel highlights: 

- Potential causes of the anomaly, with estimated contribution percentages. 
- Time-intensive activities consumed the most execution time. 

This enables you to quickly diagnose whether regressions stem from query inefficiencies, shuffle skew, resource bottlenecks, or other factors. 

:::image type="content" source="media\spark-comparison-runs\anomaly-spark-applications-run.png" alt-text="Screenshot showing anomaly spark applications run." lightbox="media\spark-comparison-runs\anomaly-spark-applications-run.png":::

## Deep dive with Spark L2 monitoring

From the Spark applications comparison view, you can drill down into Spark L2 monitoring pages for any run to access detailed information, including job, query, and task-level insights, logs, and Notebook snapshots.

## Comparison metrics

The following table defines all available comparison metrics. 
(All time metrics are in **seconds**, and all data metrics are in **bytes** unless otherwise noted.) 

| **Metric** | **Description** |
| --- | --- |
| Shuffle Write Records| Total number of rows written during shuffle. |
| Allocated Executors | Range (min-max) of executors allocated during the run.  |
| Anomaly | Indicates whether the run is flagged as anomalous (slow run). |
| Expected Duration | Predicted run time based on historical data. |
| Potential Causes | Root causes for anomalies, with estimated contribution percentages. |
| TotalDuration | Total duration of the Spark application. |
| JobCount | Number of jobs executed. |
| QueryCount | Number of SQL queries processed. |
| TaskCount | Total number of tasks executed. |
| ReadRows | Total rows read. |
| WriteRows | Total rows written. |
| JoinCount | Number of join operations. |
| ScanCount | Number of scan operations. |
| FilterCount | Number of filter operations. |
| UnionCount | Number of union operations. |
| CollectCount | Number of collect operations. |
| HashAggregateCount | Number of hash aggregate operations. |
| ExchangeCount | Number of shuffle exchanges.|
| ShuffleReadLocalBytes | Bytes read from local shuffle data. |
| ShuffleReadRemoteBytes | Bytes read from remote shuffle data.|
| ShuffleWriteBytes | Bytes written during shuffle. |
| ReadBytes | Total bytes read.|
| WriteBytes | Total bytes written. |
| MemorySpilledBytes | Bytes spilled to memory. |
| DiskSpilledBytes | Bytes spilled to disk. |
| GCTime | Time spent in garbage collection. |
| StageCount | Number of stages completed. |
| ShuffleMapStageCount | Number of shuffle map stages. |
| ResultStageCount | Number of result stages. |
| CompilationTime | Time spent on code compilation. |
| ExecutionTime | Total execution time. |
| IdleTime | Total idle time. |
| CoreAllocation | Average number of cores allocated.|
| UtilizationPercentage | Percentage of core utilization. |
| TaskDuration | Combined duration of all tasks. |
| ShuffleTime | Time spent in shuffle operations (ShuffleReadTime + ShuffleWriteTime). |
| IOTime | Time spent in I/O operations (ReadTime + WriteTime). |
| CPUTime | CPU time spent on tasks. |
| ShuffleReadTime | Time spent reading shuffle data. |
| ShuffleWriteTime | Time spent writing shuffle data. |
| ReadTime | Time spent reading data. |
| WriteTime | Time spent writing data. |
| SerializationTime | Time spent serializing data. |
| DeserializeTime | Time spent deserializing data. |
| ExecutorComputingTime | Total executor computing time. |
| ApplicationRunTime | Total application runtime. |
| OverheadTime | Time spent in overhead. |
| QueueingTime | Time from job submission to processing start. |
| StartingTime | Time from recorded start to actual execution start. |

## Related content

After reviewing Spark Applications Comparison, you may also want to explore:

- [What is Spark run series analysis?](run-series-analyisis-overview.md)
- [Apache Spark application detail monitoring](spark-detail-monitoring.md)
- [Notebook contextual monitoring and debugging](spark-monitor-debug.md)

