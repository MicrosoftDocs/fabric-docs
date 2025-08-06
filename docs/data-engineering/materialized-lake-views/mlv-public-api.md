---
title: Manage Fabric materialized lake views with public APIs
description: Learn about the Fabric materialized lake views public APIs.
ms.topic: conceptual
author: rkottackal
ms.author: rkottackal
ms.reviewer: nijelsf
ms.date: 08/06/2025
ms.search.form: MLV REST API
---


The Microsoft Fabric REST API provides a service endpoint for management of Fabric items. This article describes the REST APIs available for materialized lake views REST APIs and their usage.

[!INCLUDE [preview-note](./includes/materialized-lake-views-preview-note.md)]

With materialized lake view APIs, data engineers and citizen developers can automate their own pipelines. These APIs also make it easy for users to manage Fabric materialized lake views and integrate it with other tools and systems.

The following **Job scheduler** actions are available for materialized lake views with user  authentication:

|Action|Description|
|---------|---------|
|Create Schedule for MLV in Lakehouse|Create schedule to run lineage in MLV.|
|Get Schedule for MLV in Lakehouse|Get schedule details for MLV lineage.|
|Delete Schedule for MLV in Lakehouse|Delete schedule created for MLV lineage.|
|Run On Demand Job for MLV in Lakehouse|Run MLV lineage as an on demand job.|
|List Job Instances for MLV in Lakehouse|List all job instances created for MLV lineage. |
|Get Job Instance for MLV in Lakehouse|Get job instance details of MLV lineage execution such as status.|
|Cancel Job Instance for MLV in Lakehouse|Cancel an ongoing execution of lineage job in MLV.|

For more information, see [Job Scheduler](/rest/api/fabric/core/job-scheduler).

> [!NOTE]
> These scenarios only cover materialized lake views-unique usage examples. Fabric item common API examples are not covered here.

## Prerequisites

- To use the Fabric REST API, you need to [register an application with Microsoft Entra ID](/rest/api/fabric/articles/get-started/) and [get Microsoft Entra token for Fabric service](/rest/api/fabric/articles/get-started/fabric-api-quickstart). Then use that token in the authorization header of the API call.
- Fabric REST APIs for MLV support [Microsoft Entra users](/fabric/admin/service-admin-portal-developer#service-principals-can-call-fabric-public-apis). The authorization method and [scope](/rest/api/fabric/articles/scopes#specific-fabric-rest-apis-scopes) assigned in invoking REST APIs should be chosen based on how the REST APIs are accessed.
- Fabric Rest API defines a unified endpoint for operations and provide access to various operations on lineage. Replace placeholders such as `{WORKSPACE_ID}`, `{LAKEHOUSE_ID}`, and payload details with appropriate values when invoking the API requests.

## Examples of REST API usage with Materialized lake views

Use the following APIs to schedule, execute, get/remove job/schedule jobs in materialized lake views.

### Create Schedule for MLV in Lakehouse

Create a new schedule to run lineage in MLV. Currently, MLV UI supports only one schedule per MLV lineage.

**Sample request**:

```http 
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules

{
  "enabled": true,
  "configuration": {
    "startDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
    "endDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
    "localTimeZoneId": "Central Standard Time",
    "type": "Cron",
    "interval": 10
  }
}
```

**Sample response**:

Status code:
201
```
Location: https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/<scheduleId>
```

```rest
{
  "id": "<scheduleId>",
  "enabled": true,
  "createdDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "configuration": {
    "startDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
    "endDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
    "localTimeZoneId": "Central Standard Time",
    "type": "Cron",
    "interval": 10
  },
  "owner": {
    "id": "<ownerId>",
    "type": "User"
  }
}
```

### Get Schedule for MLV in Lakehouse

Get details of an existing schedule for MLV.

**Sample request**:

```http 
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{scheduleId}
```

**Sample response**:

Status code:
200 OK
```rest
{
  "id": "<scheduleId>",
  "enabled": true,
  "createdDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "configuration": {
    "startDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
    "endDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
    "localTimeZoneId": "Central Standard Time",
    "type": "Cron",
    "interval": 10
  },
  "owner": {
    "id": "<ownerId>",
    "type": "User"
  }
}
```

### Delete Schedule for MLV in Lakehouse

Delete an existing schedule for MLV.

**Sample request**:

```http 
DELETE https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{scheduleId}
```

**Sample response**:

Status code:
200 OK

### Run On Demand Job for MLV in Lakehouse

Run MLV lineage as an on demand job. Spark job starts executing after a successful request.

**Sample request**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances?jobType=RefreshMaterializedLakeViews
```

**Sample response**:

Status code:
202 Accepted 
```
Location: https://api.fabric.microsoft.com/v1/workspaces/<WORKSPACE_ID>/lakehouses/<LAKEHOUSE_ID>/jobs/instances/<jobInstanceId>

Retry-After: 60
```

With `location`, you can use [Get Item Job Instance](/rest/api/fabric/core/job-scheduler/get-item-job-instance) to view job status or use [Cancel Item Job Instance](/rest/api/fabric/core/job-scheduler/cancel-item-job-instance) to cancel the current lineage run.

### List Job Instances for MLV in Lakehouse

Lists job instances for MLV in a Lakehouse.

**Sample request**:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/instances
```

**Sample response**:

Status code:
200
```rest
{
  "value": [
    {
      "id": "<jobInstanceId_1>",
      "itemId": "<LAKEHOUSE_ID>",
      "jobType": "RefreshMaterializedLakeViews",
      "invokeType": "Manual",
      "status": "<status>",
      "rootActivityId": "<rootActivityId_1>",
      "startTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
      "endTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
      "failureReason": null
    },
    {
      "id": "<jobInstanceId_2>",
      "itemId": "<LAKEHOUSE_ID>",
      "jobType": "RefreshMaterializedLakeViews",
      "invokeType": "Scheduled",
      "status": "<status>",
      "rootActivityId": "rootActivityId_2",
      "startTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
      "endTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
      "failureReason": null
    }
  ]
}
```

### Get Job Instance details for MLV in Lakehouse

Get details such as status and id corresponsing to a run in MLV.

**Sample request**:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances/{jobInstanceId}
```

**Sample response**:

Status code:
200

```rest
{
  "id": "<id>",
  "itemId": "<itemId>",
  "jobType": "RefreshMaterializedLakeViews",
  "invokeType": "<invokeType>",
  "status": "<status>",
  "rootActivityId": "<rootActivityId>",
  "startTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "endTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "failureReason": null
}
```

### Cancel Job Instance for MLV in Lakehouse

Cancel an ongoing job run of lineage in MLV.

**Sample request**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{jobInstanceId}/cancel
```

**Sample response**:

Status code:
202 Accepted
```
Location: https://api.fabric.microsoft.com/v1/workspaces/<worksapceId>/lakehouses/<LAKEHOUSE_ID>/jobs/instances/<jobInstanceId>
Retry-after: 60
```

## Current limitations

- Service Principal authentication is not currently supported for MLV.
- Be informed of the limits on number of schedules supported per lakehouse by [Job scheduler](/rest/api/fabric/core/job-scheduler/create-item-schedule).
- Be informed of the limits on completed and active jobs displayed by [Job scheduler](/rest/api/fabric/core/job-scheduler/list-item-job-instances?tabs=HTTP#limitations).
- Currently, MLV UI supports only one schedule per MLV lineage.

## Related content

- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
