---
title: Spark errors overview in Microsoft Fabric
description: Use this guide to identify and resolve common issues when running Spark jobs in Microsoft Fabric. Each section includes error examples, root causes, and actionable steps to help you recover efficiently.
ms.topic: overview
ms.date: 07/29/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Spark errors overview in Microsoft Fabric

Use this guide to identify and resolve common issues when running Spark jobs in Microsoft Fabric. Each section includes error examples, root causes, and actionable steps to help you recover efficiently.

> [!NOTE]
> This guide focuses on Spark execution errors, runtime failures, and job-specific issues. For **capacity and throttling errors**, **permission and authorization errors**, **session timeout errors**, or **library installation errors**, see [Troubleshoot permissions and capacity errors](troubleshoot-permissions-capacity.md), [Fabric notebooks troubleshooting guide](../data-science/fabric-notebooks-troubleshooting-guide.md), and [Manage Apache Spark libraries](library-management.md).

## Common Spark job issues at a glance

These are the most common categories of Spark job issues in Fabric, along with their associated error codes. Use this table to quickly navigate to the relevant guide for your error. If you tried the relevant steps and the issue persists, see [When to contact support](#when-to-contact-support).

| Category | Description |
|----|----|
| [Memory and performance issues](troubleshoot-spark-memory-performance.md) | Out-of-memory errors (exit code 137), executor crashes, container killed errors, data skew, and shuffle spill. Includes memory tuning strategies. |
| [SQL and schema errors](troubleshoot-spark-sql-schema-errors.md) | Query analysis failures, schema mismatches, column resolution errors, missing tables or views, cross-version behavior changes, and Parquet schema inference failures. |
| [Storage, file, and authentication errors](troubleshoot-spark-storage-connectivity-errors.md) | ABFS and JDBC connectivity failures, mounted path failures, missing files, unsupported encodings, and token or authorization errors. |
| [Session, configuration, and platform errors](troubleshoot-spark-session-configuration-errors.md) | Session startup and submit timeouts, invalid or read-only configuration values, and Native Execution Engine or metastore failures. |
| [Application code, data, and library errors](troubleshoot-spark-code-runtime-errors.md) | Delta Lake and streaming exceptions, user code errors, library installation failures, and NotebookUtils empty string errors. |

## Access the Spark UI

The Spark UI is Apache Spark's built-in monitoring interface for viewing detailed execution metrics and logs. While you access it from within the Fabric portal, it opens as a separate browser-based interface that provides low-level diagnostic information about your Spark jobs. Throughout this guide, troubleshooting steps reference specific tabs in the Spark UI to help you identify root causes, such as checking exit codes in the **Executors** tab, detecting data skew in the **Stages** tab, or reviewing memory usage in the **Storage** tab. Access the Spark UI whenever you need to investigate a failed or slow-running Spark job.

To access the Spark UI for your application:

1. From the left navigation in your Fabric workspace, select the ellipsis (**...**), then select **Monitor** to open the Monitor hub.

1. In the Monitor hub, select the **Filter** button.

1. Filter by **Item type**, and select the type of item you want to view (for example, **Notebook**).

1. From the table of activities, select an **Activity name** to open the activity detail page.

1. Select the **Jobs** tab.

1. Select the **Description** of a job to open the Spark UI in a new tab.

Key tabs in the Spark UI:

- **Jobs** — Shows active and completed Spark jobs.

- **Stages** — Shows task-level duration and data size (useful for skew detection).

- **Storage** — Shows cached DataFrames and memory usage.

- **Environment** — Shows all active Spark configurations.

- **Executors** — Shows executor status, memory, and exit codes.

## How to access logs

While the Spark UI provides visual insights into job execution patterns and resource usage, you need to download text log files when troubleshooting specific error messages, examining stack traces, or reviewing application output (stdout/stderr). Use logs when you need to see the exact wording of an error, trace a failure through detailed driver or executor logs, or review what your code printed during execution.

To view or download Spark logs (driver logs, executor logs, stdout, stderr):

- **Monitor hub (Logs tab):** In the Monitor hub, select **Apache Spark applications**, select your application, then select the **Logs** tab. Choose **Driver**, **Livy**, or **Prelaunch** logs from the left panel. Use keyword search or filter by **Notebook** or **Lakehouse** for high-concurrency sessions, then select **Download log** to save locally. Logs might not be available if the job was queued or if cluster creation failed. In that case, check capacity utilization in the Capacity Metrics app.

- **Extended Spark History Server:** For completed applications, open the History Server from the application detail page. Use the **Diagnosis** tab for data skew, time skew, and executor usage analysis. The **Executors** tab provides per-executor log download. For long-running jobs (over one hour, or executor logs exceeding 16 MB), logs are automatically split into hourly segments for easier navigation.

- **Spark monitoring REST APIs:** For programmatic or automated log retrieval, Fabric provides REST APIs for driver logs, executor logs, and application metadata. For more information, see [Monitor Spark applications using Spark monitoring APIs](spark-monitoring-api-overview.md).

- **VS Code:** When using notebooks in VS Code, select **View Recent Runs**, select a run, then download logs including stdout, stderr, and Spark driver log.

For detailed instructions on accessing logs, viewing executor rolling logs for long-running jobs, and troubleshooting with logs, see [Apache Spark application detail monitoring](spark-detail-monitoring.md#logs-tab) and [Use extended Apache Spark history server to debug and diagnose Apache Spark applications](apache-spark-history-server.md).

## When to contact support

If you've tried the relevant self-help steps and the issue persists, open a support ticket with:

- Spark Application ID (for example, application_XXXXX_YYYY)

- The exact error code and message from the Spark UI or driver logs

- Full stack trace (copy from driver logs stderr)

- Spark UI screenshots—Executors tab, Stages tab, Storage tab

- Your Spark configuration—node size, node count, runtime version, any custom spark.conf.set() values

- Approximate data size being processed

- Whether the issue is reproducible, intermittent, or new (was it previously working?)

- Any recent changes to data, code, environment, or runtime version

- The SQL query or code that caused the error (if applicable)

For more information on monitoring and instrumenting Spark applications, see [Spark Monitoring and Instrumentation](https://spark.apache.org/docs/latest/monitoring.html).

## Related content

- [Troubleshoot Spark memory and performance issues](troubleshoot-spark-memory-performance.md)
- [Troubleshoot Spark SQL and schema errors](troubleshoot-spark-sql-schema-errors.md)
- [Troubleshoot Spark storage, file, and authentication errors](troubleshoot-spark-storage-connectivity-errors.md)
- [Troubleshoot Spark session, configuration, and platform errors](troubleshoot-spark-session-configuration-errors.md)
- [Troubleshoot Spark application code, data, and library errors](troubleshoot-spark-code-runtime-errors.md)
- [Troubleshoot permissions and capacity errors](troubleshoot-permissions-capacity.md)
- [Manage Apache Spark libraries](library-management.md)
- [Monitor Spark jobs within a notebook](spark-monitor-debug.md)
- [Debug apps with Apache Spark history server](apache-spark-history-server.md)
- [Concurrency limits and queueing](spark-job-concurrency-and-queueing.md)
- [Apache Spark runtimes in Fabric](runtime.md)
- [Fabric lakehouse overview](lakehouse-overview.md)
