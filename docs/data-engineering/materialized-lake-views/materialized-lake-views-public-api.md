---
title: Manage Fabric materialized lake views with public APIs
description: Learn about public APIs for Fabric materialized lake views.
ms.topic: reference
author: rkottackal
ms.author: rkottackal
ms.reviewer: nijelsf
ms.date: 08/20/2025
ms.search.form: MLV REST API
---

# Manage and refresh materialized lake views in Fabric with APIs

The Microsoft Fabric REST APIs provide service endpoints for management of Fabric items. This article describes the public REST APIs available for materialized lake views and their usage.

[!INCLUDE [preview-note](./includes/materialized-lake-views-preview-note.md)]

With materialized lake view APIs, data engineers and citizen developers can automate their own lineages. These APIs also make it easy for users to manage Fabric materialized lake views (MLV) and integrate it with other tools and systems.

The following **job scheduler** actions are available for materialized lake views with user authentication.

|Action|Description|
|---------|---------|
|[Create Item Schedule](#create-schedule-for-mlv-in-lakehouse)|Create a new schedule to refresh MLV lineage in Lakehouse.|
|[Get Item Schedule](#get-schedule-for-mlv-in-lakehouse)|Get details for an existing schedule to refresh MLV lineage in Lakehouse.|
|[List Item Schedules](#list-schedules-for-mlv-in-lakehouse)|List schedules created for refresh of MLV lineage in Lakehouse.|
|[Update Item Schedule](#update-schedule-for-mlv-in-lakehouse)|Update an existing schedule for refreshing MLV lineage.|
|[Delete Item Schedule](#delete-schedule-for-mlv-in-lakehouse)|Delete a schedule for refresh of MLV lineage in Lakehouse.|
|[Run On Demand Item Job](#run-on-demand-job-for-mlv-in-lakehouse)|Refresh MLV lineage in Lakehouse as an on demand job.|
|[List Item Job Instances](#list-job-instances-for-mlv-in-lakehouse)|List all job instances created for refresh of MLV lineage in Lakehouse.|
|[Get Item Job Instance](#get-job-instance-details-for-mlv-in-lakehouse)|Get job instance details for completed refresh of MLV lineage in Lakehouse such as status.|
|[Cancel Item Job Instance](#cancel-job-instance-for-mlv-in-lakehouse)|Cancel an ongoing refresh of MLV lineage in Lakehouse.|

For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler) with `{jobType}` as 'RefreshMaterializedLakeViews'.

> [!NOTE]
> These scenarios only cover materialized lake views-unique usage examples. Examples for common Fabric item API aren't covered here.

## Prerequisites

- To use Fabric REST API, you need to [register an application with Microsoft Entra ID and get Microsoft Entra token for Fabric service](/rest/api/fabric/articles/get-started/fabric-api-quickstart). Then you can use that token in the authorization header of the API call.
- Fabric REST APIs for MLV support [Microsoft Entra users](/fabric/admin/service-admin-portal-developer#service-principals-can-call-fabric-public-apis). The authorization method and [scope](/rest/api/fabric/articles/scopes#specific-fabric-rest-apis-scopes) assigned in invoking REST APIs should be chosen based on how the REST APIs are accessed.
- Fabric Rest API defines a unified endpoint for operations and provide access to various operations on lineage. Replace placeholders such as `{WORKSPACE_ID}`, `{LAKEHOUSE_ID}`, and payload details in the below examples with appropriate values when invoking the API requests.

## Examples of REST API usage with materialized lake views

Use the following APIs to schedule, run, retrieve, and remove jobs/schedules for refresh of materialized lake views lineage.

### Create Schedule for MLV in Lakehouse

Create a new schedule to periodically refresh MLV lineage. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/create-item-schedule?tabs=HTTP). Currently, MLV supports only one active refresh schedule per lineage. Use [Update Schedule](#update-schedule-for-mlv-in-lakehouse) to update an existing schedule.

**Sample request**:

```http 
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules

{
  "enabled": true,
  "configuration": {
    "startDateTime": "YYYY-MM-DDTHH:mm:ss",
    "endDateTime": "YYYY-MM-DDTHH:mm:ss",
    "localTimeZoneId": "Central Standard Time",
    "type": "Cron",
    "interval": 10
  }
}
```

**Sample response**:

Status code:
201 Created

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/<scheduleId>
```

```json
{
  "id": "<scheduleId>",
  "enabled": true,
  "createdDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "configuration": {
    "startDateTime": "YYYY-MM-DDTHH:mm:ss",
    "endDateTime": "YYYY-MM-DDTHH:mm:ss",
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

Get details of an existing MLV lineage refresh schedule. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/get-item-schedule?tabs=HTTP).

**Sample request**:

```http 
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{scheduleId}
```

**Sample response**:

Status code:
200 OK

```json
{
  "id": "<scheduleId>",
  "enabled": true,
  "createdDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "configuration": {
    "startDateTime": "YYYY-MM-DDTHH:mm:ss",
    "endDateTime": "YYYY-MM-DDTHH:mm:ss",
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

### List Schedules for MLV in Lakehouse

List all refresh schedules created for MLV lineage. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/list-item-schedules?tabs=HTTP).

**Sample request**:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules
```

**Sample response**:

Status code:
200 OK

```json
{
  "value": [
    {
      "id": "<scheduleId_1",
      "enabled": true,
      "createdDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
      "configuration": {
        "startDateTime": "YYYY-MM-DDTHH:mm:ss",
        "endDateTime": "YYYY-MM-DDTHH:mm:ss",
        "localTimeZoneId": "Central Standard Time",
        "type": "Weekly",
        "weekdays": [
          "Monday",
          "Tuesday"
        ],
        "times": [
          "HH:mm",
          "HH:mm"
        ]
      },
      "owner": {
        "id": "<ownerid>",
        "type": "User"
      }
    },
    {
      "id": "scheduleId_2",
      "enabled": true,
      "createdDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
      "configuration": {
        "startDateTime": "YYYY-MM-DDTHH:mm:ss",
        "endDateTime": "YYYY-MM-DDTHH:mm:ss",
        "localTimeZoneId": "Central Standard Time",
        "type": "Daily",
        "times": [
          "HH:mm",
          "HH:mm"
        ]
      },
      "owner": {
        "id": "<ownerid>",
        "type": "User"
      }
    }
  ]
}
```

### Update Schedule for MLV in Lakehouse

Update an existing refresh schedule for MLV lineage. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/update-item-schedule?tabs=HTTP). Currently, MLV supports only one active schedule per lineage.

**Sample request**:

```http 
PATCH https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{scheduleId}

{
  "enabled": true,
  "configuration": {
    "startDateTime": "YYYY-MM-DDTHH:mm:ss",
    "endDateTime": "YYYY-MM-DDTHH:mm:ss",
    "localTimeZoneId": "Central Standard Time",
    "type": "Cron",
    "interval": 10
  }
}
```

**Sample response**:

Status code:
200 OK`

```json
{
  "id": "<scheduleId>",
  "enabled": true,
  "createdDateTime": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "configuration": {
    "startDateTime": "YYYY-MM-DDTHH:mm:ss",
    "endDateTime": "YYYY-MM-DDTHH:mm:ss",
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

Delete an existing refresh schedule for MLV lineage. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/delete-item-schedule?tabs=HTTP).

**Sample request**:

```http 
DELETE https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{scheduleId}
```

**Sample response**:

Status code:
200 OK

### Run On Demand Job for MLV in Lakehouse

Trigger an immediate refresh of MLV lineage in Lakehouse using an on-demand job. Spark job starts executing after a successful request. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/run-on-demand-item-job?tabs=HTTP).

**Sample request**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances?jobType=RefreshMaterializedLakeViews
```

**Sample response**:

Status code:
202 Accepted

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/<WORKSPACE_ID>/lakehouses/<LAKEHOUSE_ID>/jobs/instances/<jobInstanceId>
Retry-After: 60
```

With `location`, you can use [Get Item Job Instance](/rest/api/fabric/core/job-scheduler/get-item-job-instance) to view job status or use [Cancel Item Job Instance](/rest/api/fabric/core/job-scheduler/cancel-item-job-instance) to cancel the current lineage run.

### List Job Instances for MLV in Lakehouse

Lists job instances executed for MLV lineage refresh in a Lakehouse. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/list-item-job-instances?tabs=HTTP). The job status returned reflects the status shown in Monitor hub.

**Sample request**:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/instances
```

**Sample response**:

Status code:
200

```json
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

Get execution details such as status and ID for a specific MLV lineage refresh job instance. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/get-item-job-instance?tabs=HTTP). The job status returned reflects the status shown in Monitor hub.

**Sample request**:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances/{jobInstanceId}
```

**Sample response**:

Status code:
200

```json
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

Cancel an ongoing refresh MLV lineage job. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/cancel-item-job-instance?tabs=HTTP).

**Sample request**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{jobInstanceId}/cancel
```

**Sample response**:

Status code:
202 Accepted

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/<worksapceId>/lakehouses/<LAKEHOUSE_ID>/jobs/instances/<jobInstanceId>
Retry-after: 60
```

## Known limitations

- *Service Principal Authentication:* Currently, Materialized Lake Views (MLV) don't support authentication via service principals.
- *Schedule Limits per Lakehouse:*  The [job scheduler](/rest/api/fabric/core/job-scheduler/create-item-schedule) enforces limits on the number of schedules that can be configured per lakehouse. Users should plan accordingly to avoid exceeding these limits.
- *Single Schedule per Lineage:* MLV supports only one active refresh schedule per lineage. Attempting to create more than one refresh schedules for a lineage might result in UI instability.
- *Job Status Display:* The job status returned by [list item job instances](#list-job-instances-for-mlv-in-lakehouse) and [get item job instance](#get-job-instance-details-for-mlv-in-lakehouse) APIs reflects the status shown in Monitor hub. This status might differ from the status displayed on the MLV [run history](./run-history.md#following-are-the-possible-states-for-a-run-in-lineage-view) such as Skipped gets shown as Canceled on Monitor hub.
- *Entity Display Limits:* The [job scheduler](/rest/api/fabric/core/job-scheduler/list-item-job-instances?tabs=HTTP#limitations) interface displays a limited number of completed and active jobs. This limitation might affect visibility into historical or concurrent job executions.

## Related content

- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
