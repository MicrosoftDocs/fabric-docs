---
title: Monitor Fabric items with item job event logs
description: Monitor job results for Fabric items with Item Job Event Logs. Analyze performance, identify failed jobs, and track trends using Eventhouse KQL database logs.
#customer intent: As a data engineer, I want to analyze job performance and trends so that I can optimize resource usage in my Fabric workspace.
author: SnehaGunda
ms.author: sngun
ms.reviewer: liul
ms.date: 01/09/2026
ms.topic: concept-article
---

# Monitor Fabric items with item job event logs

Item job event logs are part of [workspace monitoring logs](workspace-monitoring-overview.md) and are stored in the Eventhouse KQL database. Use these logs to monitor job results for Fabric items, such as:

- Analyze job performance and trends.
- identify failed or long-running jobs by capacity, workspace, item type, or user.

## Supported item and job types

The following table lists the supported Fabric item types and their corresponding job types that generate event logs. Use it as a reference to understand which operations are tracked.

| **Item type** | **Job type** |
|--|--|
| Data Pipeline | Data Pipeline |
| Notebook | RunNotebook, RunNotebookInteractive, PipelineRunNotebook, SparkSecurityControl |
| Lakehouse | TableMaintenance, TableLoad, LakehouseOperation, LivyBatch, LivySession, MaterializedLakeViews, SparkSecurityControl |
| Warehouse | DatamartBatch, SqlAnalyticsEndpoint |
| DatamartBatch | SparkJobDefinition, sparkjob, SparkSecurityControl |
| CopyJob | CopyJob |
| DataflowFabric | Refresh, Publish |
| DBTItem | DBTItem |
| DigitalOperationsOperationalInsight | UpdateLibrariesJob |
| MLExperiment | MLExperimentRun |
| GraphIndex | Algorithm, Load, Refresh |
| DigitalTwinBuilder | UpdateLibrariesJob |
| DigitalTwinBuilderFlow | ExecuteOperations |
| Databricks | SyncJob |
| DigitalOperationsAction | ExecuteOperations |
| SustainabilityDataManager | IngestAzureEmissions, IngestM365Emissions |

## Item job event logs schema

The following table defines the schema of the event log data, including column names, data types, and descriptions. It helps you interpret log entries and build queries.

| **Column name**                  | **Type**     | **Description** |
|----------------------------------|-------------|------------------|
| Timestamp                        | datetime    | UTC timestamp when the log entry was generated. |
| ItemId                           | string      | Unique ID of the item logging the data. |
| ItemKind                         | string      | Type of item logging the operation. |
| ItemName                         | string      | Name of the Fabric item logging this operation. |
| WorkspaceId                      | string      | Unique ID of the Fabric workspace containing the item. |
| WorkspaceName                    | string      | Name of the workspace containing the item. |
| CapacityId                       | string      | Unique ID of the capacity hosting the item. |
| DurationMs                       | long        | Time taken by the job in milliseconds. |
| ExecutingPrincipalId             | string      | User ID or service principal ID executing the job. |
| ExecutingPrincipalType           | string      | Indicates user or service principal. |
| WorkspaceMonitoringTableName     | string      | Name of the table where records belong. |
| JobInstanceId                    | string      | Unique ID of the job instance. |
| JobInvokeType                    | string      | Job trigger type: on-demand or scheduled. |
| JobType                          | string      | Job type (see table above). |
| JobStatus                        | string      | Status: Not started, In progress, Completed, Failed. |
| JobDefinitionObjectId            | string      | ID of the scheduler that triggered the job. |
| JobScheduleTime                  | datetime    | Scheduled job start time. |
| JobStartTime                     | datetime    | Actual job start time. |
| JobEndTime                       | datetime    | Actual job end time. |

## Considerations

If the *ItemJobEventLogs* table is missing from the Eventhouse, it may be because the Eventhouse was created before this feature became available. Use the following steps to fix this issue:

1. Go to the **Monitoring** tab in the workspace settings pane.

1. Turn off the **Log workspace activity** setting, then turn it on again.

## Related content

* [Enable workspace monitoring](enable-workspace-monitoring.md)
* [What is workspace monitoring?](workspace-monitoring-overview.md)