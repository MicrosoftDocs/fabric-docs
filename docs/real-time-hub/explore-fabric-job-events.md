---
title: Explore Job events in Fabric Real-Time hub
description: This article shows how to explore Job events in Fabric Real-Time hub.
author: robece
ms.author: robece
ms.topic: how-to
ms.date: 12/11/2025
---

# Explore Job events in Fabric Real-Time hub

Real-Time hub allows you to discover and subscribe to changes produced when Fabric runs a job. For example, you can react to changes when running a scheduled pipeline, or running a notebook. Each of these activities can generate a corresponding job, which in turn generates a set of corresponding job events.

Job events allow you to monitor job results in time and set up alerts using Activator alerting capabilities. For example, when the scheduler triggers a new job, or a job fails, you can receive an email alert. This way, even if you aren't in front of the computer, you can still get the information you care about. 

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## View Job events detail page

1. In **Real-Time hub**, select **Fabric events**.
1. Select **Job events** from the list.

    :::image type="content" source="./media/explore-fabric-job-events/job-events.png" alt-text="Screenshot that shows the selection of Job events on the Fabric events page." lightbox="./media/explore-fabric-job-events/job-events.png":::
1. You should see the detail view for Job events.

    :::image type="content" source="./media/explore-fabric-job-events/detail-page.png" alt-text="Screenshot that shows the detail page for Job events." lightbox="./media/explore-fabric-job-events/detail-page.png":::

## Actions

At the top of the detail page, you see the following two actions.

- **Create eventstream**, which lets you create an eventstream based on events from the selected Job.
- **Set alert**, which lets you set an alert when an operation is done for a Job, such as a job is created or changed. 

    :::image type="content" source="./media/explore-fabric-job-events/actions.png" alt-text="Screenshot that shows actions on the Job events detail page.":::


## See what's using this category

This section shows the artifacts using Job events. Here are the columns and their descriptions:

| Column | Description |
| ------ | ------------ |
| Name | Name of the artifact that's using Job events. |
| Type | Artifact type – Activator or Eventstream |
| Workspace | Workspace where the artifact lives. |
| Source | Name of the workspace that is source of the events. |

## Job events profile

:::image type="content" source="./media/explore-fabric-job-events/profile.png" alt-text="Screenshot that shows the Profile section of the Job events detail page.":::

### Event types

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.ItemJobCreated | Raised when the Fabric platform creates or triggers a job, manually or scheduled. |
| Microsoft.Fabric.ItemJobStatusChanged | Raised when the job status changes to another non-terminal state. <p>This event isn't raised if the workload doesn't push when the status changes. The job status might change from created to completed directly. 
| Microsoft.Fabric.ItemJobSucceeded | Raised when the job completes successfully. |     
| Microsoft.Fabric.ItemJobFailed | Raised when the job fails, including job getting stuck or canceled. |

### Supported item types

| Item type |
| --------------- | 
| Pipeline |
| Notebook |
| Lakehouse |
| Sql Analytics Endpoint |
| Spark Job Definition |
| CopyJob |
| Dataflow gen2 |
| DBT Item |
| Digital Operations |
| MLExperiment |
| GraphIndex |
| Digital Twin Builder |
| Digital Twin Builder Flow |
| Databricks |
| KQL Database |
| Snowflake database |
| Anomaly detector |
| User data functions |
| Azure maps |

### Schemas
An event has the following top-level data:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ----- |
| `source` | string | Identifies the context in which an event happened. A tenant ID. | `aaaabbbb-0000-cccc-1111-dddd2222eeee` |
| `subject` | string | Identifies the subject of the event in the context of the event producer. | `/workspaces/<WORKSPACEID>/items/<ARTIFACTID>/jobs/instances/{JOBID}`  |
| `type` | string | One of the registered event types for this event source. | `Microsoft.Fabric.ItemJobCreated` |
| `time` | timestamp | The time the event is generated based on the provider's UTC time. | `2017-06-26T18:41:00.9584103Z` |
| `id` | string | Unique identifier for the event. | `bbbbbbbb-1111-2222-3333-cccccccccccc` |
| `data` | object | Event data. | See the next table for details. |
| `specversion` | string | The version of the Cloud Event spec. | `1.0` |
| `dataschemaversion` | string  | The version of the data schema. | `1.0` |
| `capacityId` | guid | The capacity ID. | `bbbbbbbb-1111-2222-3333-cccccccccccc` |



The `data` object has the following properties: 

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- | 
| `data.itemId` | guid | The ID of the item or artifact. | `cccccccc-8888-9999-0000-dddddddddddd` |
| `data.itemKind` | string | The kind or type of the item or artifact. | `Lakehouse` |
| `data.itemName` | string | The item or artifact name. | `myitem` |
| `data.workspaceId` | guid | The ID of the workspace. | `aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb` |
| `data.workspaceName` | string | The name of the workspace. | `myworkspace` |
| `data.executingPricipalId` | guid | ID of the service principal used to execute the job. | `a0a0a0a0-bbbb-cccc-dddd-e1e1e1e1e1e1` |
| `data.executingPriciplaType` | string | The type of the executing principal ID. | `User or Service Principal` |
| `data.jobInstanceId` | guid | The ID of the job. | `dddddddd-3333-4444-5555-eeeeeeeeeeee` |
| `data.jobStatus` | string | The status of this job. | `InProgress` |
| `data.jobType` | string | The type of this job. | `RunNotebook` |
| `data.jobInovkeType` | string | The invocation type of this job. | `Scheduled or Manual` |
| `data.jobScheduleTime` | timestamp | The job's schedule time. | `2017-06-26T18:41:00.9584103Z` |
| `data.jobStartTime` | timestamp | The job's start time. | `2017-06-26T18:41:00.9584103Z` |
| `data.jobEndTime` | timestamp | The job's end time. | `2017-06-26T18:41:00.9584103Z` |

## Subscribe permission
For more information, see [subscribe permission for Fabric events](fabric-events-subscribe-permission.md).

## Related content

- [Explore Azure blob storage events](explore-azure-blob-storage-events.md)
