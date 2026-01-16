---
title: Analyze Spark Jobs with Job Insight Library (Preview)
description: Job insight is a Java-based diagnostic library that helps you interactively analyze completed Spark applications in Microsoft Fabric.
ms.reviewer: jejiang
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.date: 08/23/2025
ms.search.form: Job insight
---

# Analyze Spark Jobs with Job Insight Library (Preview)

Job insight is a Java-based diagnostic library designed to help you interactively analyze completed Spark applications in Microsoft Fabric. Job insight lets you gain deeper insights into Spark jobs by retrieving structured execution data such as queries, jobs, stages, tasks, and executors within your Fabric Spark notebooks using Scala.

Whether you're troubleshooting performance issues or conducting custom diagnostics, Job insight library lets you work with Spark telemetry as native Spark Datasets, making it easier to troubleshoot performance issues and explore execution insights.

> [!NOTE]
> Accessing the Job insight library using PySpark isn't supported yet.

## Prerequisites

- Only Scala is supported.

- Requires Fabric Runtime 1.3 or later (with Spark 3.5+).

- PySpark does not support access to the Job Insight library.

## Key capabilities

- Interactive Spark job analysis: Access Spark execution metrics, including job, stage, and executor details.

- Persist execution metrics: Save Spark job execution metrics to lakehouse tables for reporting and integration.

- Spark event log copy: Export event logs to OneLake or Azure Data Storage.


## Sample Notebook

You can use the provided sample notebook [(sample ipynb file)](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-engineering/SparkMonitoring/JobInsightSample/JobInsight_SampleNotebook.ipynb) to get started. The notebook includes:

- Sample `analyze()` and `loadJobInsight()` code
- Display commands (for example, `queries.show()`)
- Event log copy examples.


## Getting started

### 1. Analyze a completed Spark job

Extract structured execution data from a completed Spark job with the `analyze` API:

```scala
import com.microsoft.jobinsight.diagnostic.SparkDiagnostic
val jobInsight = SparkDiagnostic.analyze( 
    $workspaceId, 
    $artifactId, 
    $livyId, 
    $jobType, 
    $stateStorePath, 
     $attemptId 
) 
val queries = jobInsight.queries 
val jobs = jobInsight.jobs 
val stages = jobInsight.stages 
val tasks = jobInsight.tasks 
val executors = jobInsight.executors 
```

### 2. Save metrics and logs to a lakehouse

Save analysis output to lakehouse tables for reporting or integration:

```scala
val df = jobInsight.queries 
df.write 
.format("delta") 
.mode("overwrite") 
.saveAsTable("sparkdiagnostic_lh.Queries") 
```

Apply the same logic to other components such as jobs, stages, or executors.

### 3. Reload previous analysis

If you've already run an analysis and saved the output, reload it without repeating the process:

```scala
import com.microsoft.jobinsight.diagnostic.SparkDiagnostic 
val jobInsight = SparkDiagnostic.loadJobInsight( 
    $stateStorePath 
) 
val queries = jobInsight.queries 
val jobs = jobInsight.jobs 
val stages = jobInsight.stages 
val tasks = jobInsight.tasks 
val executors = jobInsight.executors
```

### 4. Copy spark event logs

Copy Spark event logs to an ABFSS location (like OneLake or Azure Data Lake Storage (ADLS) Gen2) with this API: 

```scala
import com.microsoft.jobinsight.diagnostic.LogUtils 
val contentLength = LogUtils.copyEventLog( 
    $workspaceId, 
    $artifactId, 
    $livyId, 
    $jobType, 
    $targetDirectory, 
    $asyncMode, 
    $attemptId 
)
```

## Best practices

Ensure you have the correct read/write permissions for all ABFSS paths.

- Save `analyze()` outputs to a durable location for reuse.

- Use `asyncMode = true` when copying logs for large jobs to reduce latency.

- Monitoring event log size and structure, to avoid deserialization issues.


## Troubleshooting

| Issue | Resolution |
|---|---|
| Write access denied | Check write permissions for the target ABFSS directory. |
| stateStorePath already exists | Use a new path that doesn't already exist for each call to analyze(). |

## Related content

- [Apache Spark advisor for real-time advice on notebooks](spark-advisor-introduction.md)

- [Browse the Apache Spark applications in the Fabric monitoring hub](browse-spark-applications-monitoring-hub.md)

- [Browse item's recent runs](spark-item-recent-runs.md)

- [Monitor Spark jobs within a notebook](spark-monitor-debug.md)

- [Monitor your Apache Spark job definition](monitor-spark-job-definitions.md)

