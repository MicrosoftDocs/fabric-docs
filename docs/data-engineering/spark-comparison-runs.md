---
title: Apache Spark applications comparison
description: This article introduces the Compare runs feature of Spark applications.
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.topic: how-to
ms.custom:
ms.date: 06/26/2025
ms.search.form: Apache Spark applications comparison
---

# Apache Spark applications comparison

This article introduces the Compare runs feature of Spark applications. By comparing the duration trend and data input or output trend for each Spark application instance, you can intuitively see how this run compares to the baseline run. 

## Access the compare run feature 

You can access the compare run feature from the [Monitor Run series](apache-spark-monitor-run-series.md#access-the-monitor-run-series-feature):

1. Go to the Monitor Run series page.
2. Switch to Compare runs tab.

:::image type="content" source="media\spark-comparison-runs\access-the-compare-run-feature.png" alt-text="Screenshot showing access the compare run feature." lightbox="media\spark-comparison-runs\access-the-compare-run-feature.png":::

View Spark application runs list. This list shows only the Spark application runs that are in the Completed state. The Spark applications in the Queued, Launching, Submitting, and Running states are filtered. 

By default, the run entered by the user from the Monitoring Center/Recent Runs panel is considered base run. The base run is a reference Spark application that serves as a baseline for comparing the performance and metrics of other Spark applications. Users can also clear all selections to re-label (select the flag icon button) the base run. You can select up to 4 runs to compare, this selection includes the base run. c

:::image type="content" source="media\spark-comparison-runs\view-spark-application-runs-list.png" alt-text="Screenshot showing view spark application runs list." lightbox="media\spark-comparison-runs\view-spark-application-runs-list.png":::


## View Compare Panel

In the compare panel, you can view the comparison of the performance and metrics of the base run Spark application and other Spark applications 

Once you have selected the runs for comparison, the Compare Panel provides a side-by-side visualization of key performance metrics. Here, you can examine variations in execution duration, input and output data volumes, and other important Spark application parameters. The panel highlights (Delta to the base run (delta %)) differences and trends, making it easier to identify regressions, improvements, or anomalies between runs. 

:::image type="content" source="media\spark-comparison-runs\compare-panel.png" alt-text="Screenshot showing compare panel." lightbox="media\spark-comparison-runs\compare-panel.png":::

For anomaly Spark applications run, potential cause is listed in the comparison list, and the activities that take the most time during the run are listed. 

:::image type="content" source="media\spark-comparison-runs\anomaly-spark-applications-run.png" alt-text="Screenshot showing anomaly spark applications run." lightbox="media\spark-comparison-runs\anomaly-spark-applications-run.png":::

The following table describes the comparison metrics and their definitions: 

| **API Metric Name** | **Description** (All time-related metrics are measured in seconds, and all byte-related metrics are measured in bytes) |
| --- | --- |
| Shuffle Write Records| Total number of rows shuffle write. |
| Allocated executors | Minimum to maximum number of executors allocated during the run. |
| Anomaly | Indicates whether the current run is considered a slow run. |
| Expected duration | Predicted duration for the current run, based on historical data. |
| Potential Causes | Root causes contributing to the anomaly, along with their estimated contribution percentages. |
| TotalDuration | Total duration of the Spark application. |
| JobCount | Number of jobs executed. |
| QueryCount | Number of SQL queries processed. |
| TaskCount | Total number of tasks executed. |
| ReadRows | Total number of rows read. |
| WriteRows | Total number of rows written. |
| JoinCount | Number of join operations. |
| ScanCount | Number of scan operations. |
| FilterCount | Number of filter operations. |
| UnionCount | Number of union operations. |
| CollectCount | Number of collect operations. |
| HashAggregateCount | Number of hash aggregate operations. |
| ExchangeCount | Number of shuffle exchanges.|
| ShuffleReadLocalBytes | Bytes read from local shuffle data. |
| ShuffleReadRemoteBytes | Bytes read from remote shuffle data.|
| ShuffleWriteBytes | Bytes written for shuffles. |
| ReadBytes | Total bytes read.|
| WriteBytes | Total bytes written. |
| MemorySpilledBytes | Bytes spilled to memory. |
| DiskSpilledBytes | Bytes spilled to disk. |
| GCTime | Time spent in garbage collection (seconds). |
| StageCount | Number of stages completed. |
| ShuffleMapStageCount | Number of shuffle map stages. |
| ResultStageCount | Number of result stages. |
| CompilationTime | Time spent compiling (seconds).|
| ExecutionTime | Total execution time (seconds). |
| IdleTime | Total idle time (seconds). |
| CoreAllocation | Average number of cores allocated. |
| UtilizationPercentage | Percentage of core utilization. |
| TaskDuration | Duration of all tasks combined (seconds). |
| ShuffleTime | Time spent in shuffle operations (seconds). ShuffleTime = ShuffleReadTime + ShuffleWriteTime |
| IOTime | Time spent in I/O operations (seconds). IOTime = ReadTime + WriteTime |
| CPUTime | Time spent by CPU on tasks (seconds). |
| ShuffleReadTime | Time spent reading shuffle data (seconds). |
| ShuffleWriteTime | Time spent writing shuffle data (seconds). |
| ReadTime | Time spent reading data (seconds). |
| WriteTime | Time spent writing data (seconds). |
| SerializationTime | Time spent serializing data (seconds). |
| DeserializeTime | Time spent deserializing data (seconds). |
| ExecutorComputingTime | Computing time spent by executors (seconds). |
| ApplicationRunTime | Total application runtime (seconds). |
| OverheadTime | Time spent in overhead (seconds).|
| QueueingTime | Time elapsed between when the job was submitted by the user (submitTime) and when the GJS system began processing the job (startTime) (seconds). |
| StartingTime | Time elapsed between the GJS system's recorded job start (startTime) and the actual application execution start time (seconds). |

## Related content

The next step after viewing the details of an Apache Spark application is to view **Spark job progress** below the Notebook cell. You can refer to:

- [Notebook contextual monitoring and debugging](spark-monitor-debug.md)
