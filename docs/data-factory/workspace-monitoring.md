---
title: Enable Workspace Monitoring in Microsoft Fabric
description: Discover how Workspace Monitoring helps you track pipeline runs, analyze logs with KQL, and optimize performance with detailed diagnostics.
ms.reviewer: conxu-ms
ms.date: 12/09/2025
ms.topic: how-to
ai-usage: ai-assisted
---

# Enable workspace monitoring in Microsoft Fabric

Workspace monitoring gives you log-level visibility for all items in a workspace, including pipelines. It stores execution logs in a monitoring eventhouse so you can query and analyze them using KQL (Kusto Query Language).

## Enable workspace monitoring

1. In your Fabric workspace, select **Workspace Settings**, then select the **Monitoring** tab.

   :::image type="content" source="media/monitor-pipeline-runs/workspace-monitoring-settings.png" alt-text="Screenshot of workspace settings showing the option to toggle on workspace monitoring.":::

1. Turn on **Log workspace activity**. This creates an eventhouse in your workspace to store logs. Fabric also creates a read-only KQL database inside the eventhouse for monitoring data.

   :::image type="content" source="media/monitor-pipeline-runs/monitoring-kql-database.png" alt-text="Screenshot of the items generated from workspace monitoring.":::

1. Go to the KQL database. You can find it in the **Monitoring database** link within the monitoring settings or in your workspace.

1. In the KQL database, the **ItemJobEventLogs** table captures pipeline-level events from your workspace. Logs include pipeline name, run status, timestamps, and system diagnostics.

    :::image type="content" source="media/monitor-pipeline-runs/pipeline-workspace-monitoring.png" alt-text="Screenshot of the pipeline workspace monitoring table." lightbox="media/monitor-pipeline-runs/pipeline-workspace-monitoring.png":::

## Troubleshooting missing monitoring tables

When new workspace monitoring tables become available and you don't see them in your existing monitoring eventhouse, recreate workspace monitoring for the workspace by deleting the previous eventhouse and re-adding it to your workspace. Recreating the monitoring eventhouse provisions the latest monitoring schema and ensures newly available tables are visible. Be sure to save any custom Kql queries before removing the existing monitoring eventhouse. The monitoring experience is backed by a monitoring eventhouse and monitoring Kql database that are created when workspace monitoring is enabled.

## Review logged data

The **ItemJobEventLogs** table includes pipeline-level (L1 across Data Factory items) execution data:
- Pipeline name  
- Run status (Success/Failed)  
- Start and end timestamps  
- System diagnostics  

For pipeline activity-level (L2) monitoring, you can find more logs in the **FabricDataPipelinesActivityRunsLogs** table:

- Pipeline name and run identifier  
- Activity name and type  
- Activity status (In Progress, Succeeded, Failed)  
- Activity start and end timestamps  
- Execution duration  
- Failure type

:::image type="content" source="media/monitor-pipeline-runs/pipeline-activity-workspace-monitoring.png" alt-text="Screenshot of the pipeline L2 workspace monitoring table.":::

## Query logs

1. Go to the monitoring eventhouse.
1. Use KQL queries to analyze:
   - Success and failure trends
   - Performance metrics

Here's an example query:

```kql
ItemJobEventLogs 
| where ItemKind == "Pipeline" 
| summarize count() by JobStatus 
```

## Use query logs to create an alert for workspace-wide pipeline failures 

Use a KQL Queryset to detect pipeline failures across the workspace. Here is an example query that returns recent failures: 

```kql
ItemJobEventLogs 
| extend SecondsAgo = datetime_diff('second', now(), ingestion_time()) 
| where JobType == 'Pipeline' and JobStatus == 'Failed' 
| where SecondsAgo <= 540 
| order by Timestamp desc 
| project Timestamp, ItemName, WorkspaceName, JobStartTime, JobEndTime, JobStatus 
```

### ItemJobEventLogs schema

The following table describes the schema of `ItemJobEventLogs` (item-level, L2):

| **Column name** | **Column type** | **Description** |
|----|----|----|
| Timestamp | datetime | The timestamp (UTC) when the log entry was generated. |
| ItemId | string | Unique ID of the item that's logging the data. |
| ItemKind | string | Type of item that's logging the operation. |
| ItemName | string | The name of the Fabric item that's logging this operation. |
| WorkspaceId | string | Unique identifier of the Fabric workspace that contains the item. |
| WorkspaceName | string | The name of the workspace that contains the item. |
| CapacityId | string | Unique identifier of the capacity that hosts the item. |
| DurationMs | long | Amount of time in milliseconds taken by the job. |
| ExecutingPrincipalId | string | User ID or service principal ID that runs the job. |
| ExecutingPrincipalType | string | User or service principal that runs the job. |
| WorkspaceMonitoringTableName | string | The name of the table where records belong. |
| JobInstanceId | string | Unique identifier of the job instance. |
| JobInvokeType | string | On demand or scheduled. |
| JobType | string | Job type. Values are listed in the job type table above. |
| JobStatus | string | Status of the job. Values can be Not started, In progress, Completed, or Failed. |
| JobDefinitionObjectId | string | ID of the scheduler that triggered the job. |
| JobScheduleTime | datetime | Scheduled job start time. |
| JobStartTime | datetime | Actual job start time. |
| JobEndTime | datetime | Actual job end time. |

### FabricDataPipelinesActivityRunsLogs schema

The following table describes the schema of `FabricDataPipelinesActivityRunsLogs` (activity-level, L2):

| **Column name** | **Column type** | **Description** |
|----|----|----|
| Timestamp | datetime | The timestamp (UTC) when the log entry was generated. |
| OperationName | string | The name of the operation executed for the activity. |
| ItemId | string | Unique ID of the pipeline associated with the activity. |
| ItemKind | string | Type of item generating the log (for example, Pipeline). |
| ItemName | string | The name of the pipeline that contains the activity. |
| WorkspaceId | string | Unique identifier of the Fabric workspace that contains the pipeline. |
| WorkspaceName | string | The name of the workspace that contains the pipeline. |
| CapacityId | string | Unique identifier of the capacity that hosts the pipeline execution. |
| CapacityName | string | The name of the capacity that hosts the pipeline execution. |
| CorrelationId | string | Identifier used to correlate related operations across pipeline and activity runs. |
| OperationId | string | Unique identifier of the activity-level operation. |
| Region | string | The region where the activity execution occurred. |
| Identity | string | Identifier of the user or service principal associated with the operation. |
| CustomerTenantId | string | Unique identifier of the customer tenant. |
| WorkspaceMonitoringTableName | string | The name of the table where records belong. |
| DurationMs | long | Amount of time in milliseconds taken by the operation. |
| Status | string | Status of the activity operation (for example, Succeeded or Failed). |
| PipelineRunId | string | Unique identifier of the pipeline run associated with the activity. |
| ActivityIterationCount | int | The iteration count for activities that execute multiple times (for example, loop activities). |
| ActivityName | string | The name of the activity. |
| ActivityType | string | Type of activity (for example, Copy, Notebook, Dataflow). |
| OperationStartTime | datetime | Actual start time of the activity execution. |
| OperationEndTime | datetime | Actual end time of the activity execution. |
| FailureType | string | Type of failure encountered during execution (if applicable). |
| GatewayType | string | Type of gateway used for the activity execution (if applicable). |
| PremiumCapacitySku | string | The SKU of the premium capacity used for execution. |
| CpuCoreMs | long | CPU usage for the activity execution in core milliseconds. |
| IngestionTime | datetime | The time at which the log record was ingested into the monitoring system. |


## Best practices

- Use workspace monitoring for deep analysis and custom reporting.
- Combine workspace monitoring with the monitoring hub for quick operational checks across workspaces.

## Known limitations

- Error details and diagnostics aren't supported.

## Related content

- [How to monitor pipeline runs](/fabric/data-factory/monitor-pipeline-runs)
- [How to monitor pipeline runs in Monitoring hub](/fabric/data-factory/monitoring-hub-pipeline-runs)
