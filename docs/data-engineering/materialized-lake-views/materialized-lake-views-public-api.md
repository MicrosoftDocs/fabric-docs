---
title: Manage Fabric materialized lake views with public APIs
description: Learn how to use Fabric REST APIs to schedule, run, and manage materialized lake views.
ms.topic: reference
ms.reviewer: rkottackal
ms.date: 05/23/2026
ms.search.form: MLV REST API
---

# Manage and refresh materialized lake views in Fabric with APIs

This article describes the Microsoft Fabric REST APIs available for managing materialized lake views and how to use them. With materialized lake view APIs, data engineers and citizen developers can automate lineage operations and integrate them with other tools and systems.

The following **job scheduler** actions are available for materialized lake views with user authentication.

|Action|Description|
|---------|---------|
|[Create Item Schedule](#create-schedule-for-mlv-in-lakehouse)|Create a new schedule to refresh materialized lake views lineage in a lakehouse.|
|[Get Item Schedule](#get-schedule-for-mlv-in-lakehouse)|Get details for an existing schedule to refresh materialized lake views lineage in a lakehouse.|
|[List Item Schedules](#list-schedules-for-mlv-in-lakehouse)|List schedules created for refresh of materialized lake views lineage in a lakehouse.|
|[Update Item Schedule](#update-schedule-for-mlv-in-lakehouse)|Update an existing schedule for refreshing materialized lake views lineage.|
|[Delete Item Schedule](#delete-schedule-for-mlv-in-lakehouse)|Delete a schedule for refresh of materialized lake views lineage in a lakehouse.|
|[Run On Demand Item Job](#run-on-demand-job-for-mlv-in-lakehouse)|Refresh materialized lake views lineage in a lakehouse as an on-demand job.|
|[List Item Job Instances](#list-job-instances-for-mlv-in-lakehouse)|List all job instances created for refresh of materialized lake views lineage in a lakehouse.|
|[Get Item Job Instance](#get-job-instance-details-for-mlv-in-lakehouse)|Get details for a completed materialized lake views lineage refresh in a lakehouse, such as status.|
|[Cancel Item Job Instance](#cancel-job-instance-for-mlv-in-lakehouse)|Cancel an ongoing materialized lake views lineage refresh in a lakehouse.|

For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler) with `{jobType}` as 'RefreshMaterializedLakeViews'.

An execution definition is a saved configuration that defines a segment of the [lineage](./view-lineage.md) that can be independently refreshed — which materialized lake views to include, which upstream lakehouses to consider, and the refresh mode and the Spark environment to be used dring refresh. The following **execution definition** actions are available for materialized lake views. 

|Action|Description|
|---------|---------|
|[Create Execution Definition](#create-execution-definition-for-mlv-in-lakehouse)|Create a new execution definition for materialized lake views lineage in a lakehouse.|
|[List Execution Definitions](#list-execution-definitions-for-mlv-in-lakehouse)|List execution definitions created for materialized lake views lineage in a lakehouse.|
|[Get Execution Definition](#get-execution-definition-for-mlv-in-lakehouse)|Get details for an existing execution definition in a lakehouse.|
|[Update Execution Definition](#update-execution-definition-for-mlv-in-lakehouse)|Update an existing execution definition for materialized lake views lineage.|
|[Delete Execution Definition](#delete-execution-definition-for-mlv-in-lakehouse)|Delete an execution definition for materialized lake views lineage in a lakehouse.|

For more information, see [materialized lake views](/rest/api/fabric/lakehouse/materialized-lake-views).

> [!NOTE]
> These scenarios cover usage examples specific to materialized lake views. Examples for common Fabric item APIs aren't included.

## Prerequisites

Before you use the materialized lake views REST APIs, complete these prerequisites:
- To use Fabric REST APIs, [register an application with Microsoft Entra ID and get a Microsoft Entra token for Fabric](/rest/api/fabric/articles/get-started/fabric-api-quickstart). Use that token in the authorization header.
- Fabric REST APIs for MLV support [Microsoft Entra users](/fabric/admin/service-admin-portal-developer#service-principals-can-call-fabric-public-apis). Choose authorization method and [scope](/rest/api/fabric/articles/scopes#specific-fabric-rest-apis-scopes) based on how your app accesses the APIs.
- Fabric REST APIs use a unified endpoint model for lineage operations. Replace placeholders such as `{WORKSPACE_ID}`, `{LAKEHOUSE_ID}`, and payload values in the examples before calling the APIs.

## Examples of REST API usage with materialized lake views

Use the following Fabric REST APIs to schedule, run, retrieve, and manage refresh jobs and schedules for materialized lake views lineage in a lakehouse. Each example shows the HTTP method, endpoint URL, and sample request/response payloads.

### Create Schedule for MLV in Lakehouse

Create a new schedule to periodically refresh materialized lake views lineage in a lakehouse. To create a schedule to periodically refresh materialized lake views forming an execution definition, pass the execution definition ID in `executionData` so the Job Scheduler knows which views to refresh and with what settings.  For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/create-item-schedule?tabs=HTTP). 

**Sample request without Execution Definition**:

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

**Sample request with Execution Definition**:

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
  },
  "executionData": {
    "mlvExecutionDefinitionId": "<mlvExecutionDefinitionId>"
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

Get details of an existing materialized lake views lineage refresh schedule in a lakehouse. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/get-item-schedule?tabs=HTTP).

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

List all refresh schedules created for materialized lake views lineage in a lakehouse. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/list-item-schedules?tabs=HTTP).

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
      "id": "<scheduleId_1>",
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
        "id": "<ownerId>",
        "type": "User"
      }
    },
    {
      "id": "<scheduleId_2>",
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
        "id": "<ownerId>",
        "type": "User"
      }
    }
  ]
}
```

### Update Schedule for MLV in Lakehouse

Update an existing refresh schedule for materialized lake views lineage in a lakehouse. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/update-item-schedule?tabs=HTTP). Currently, materialized lake views support only one active schedule per lineage.

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

### Delete Schedule for MLV in Lakehouse

Delete an existing refresh schedule for materialized lake views lineage in a lakehouse. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/delete-item-schedule?tabs=HTTP).

**Sample request**:

```http 
DELETE https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{scheduleId}
```

**Sample response**:

Status code:
200 OK

### Run On Demand Job for MLV in Lakehouse

Trigger an immediate refresh of all materialized lake views in a lakehouse using an on-demand job. To trigger an immediate refresh of materialized lake views forming an execution definition, pass the execution definition ID in `executionData` so the Job Scheduler knows which views to refresh and with what settings. The Spark job starts executing after a successful request. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/run-on-demand-item-job?tabs=HTTP).

**Sample request with out Execution Definition**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/instances
```

**Sample request with Execution Definition**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/instances

{
  "executionData": {
    "mlvExecutionDefinitionId": "<mlvExecutionDefinitionId>"
  }
}
```

> [!NOTE]
> Official Job Scheduler documentation supports a `{jobType}` path parameter for run-on-demand requests. The API maintains query-parameter `jobType` patterns for backward compatibility.

**Sample response**:

Status code:
202 Accepted

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/<WORKSPACE_ID>/lakehouses/<LAKEHOUSE_ID>/jobs/instances/<jobInstanceId>
Retry-After: 60
```

With `location`, you can use [Get Item Job Instance](/rest/api/fabric/core/job-scheduler/get-item-job-instance) to view job status or use [Cancel Item Job Instance](/rest/api/fabric/core/job-scheduler/cancel-item-job-instance) to cancel the current lineage run.

### List Job Instances for MLV in Lakehouse

List job instances executed for materialized lake views lineage refresh in a lakehouse. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/list-item-job-instances?tabs=HTTP). The job status returned reflects the status shown in Monitoring hub.

**Sample request**:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/instances
```

**Sample response**:

Status code:
200 OK

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

### Get job instance details for MLV in Lakehouse

Get execution details such as status and ID for a specific materialized lake views lineage refresh job instance in a lakehouse. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/get-item-job-instance?tabs=HTTP). The job status returned reflects the status shown in Monitoring hub.

**Sample request**:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances/{jobInstanceId}
```

**Sample response**:

Status code:
200 OK

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

Cancel an ongoing materialized lake views lineage refresh job in a lakehouse. For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler/cancel-item-job-instance?tabs=HTTP).

**Sample request**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances/{jobInstanceId}/cancel
```

**Sample response**:

Status code:
202 Accepted

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/lakehouses/<LAKEHOUSE_ID>/jobs/instances/<jobInstanceId>
Retry-After: 60
```

## Examples of REST API usage with execution definitions

Use the following Fabric REST APIs to create, manage, and run execution definitions for materialized lake views lineage in a lakehouse. Each example shows the HTTP method, endpoint URL, and sample request/response payloads.

### Create Execution Definition for MLV in Lakehouse

Create a new execution definition for materialized lake views lineage in a lakehouse. An execution definition identifies which views and upstream lakehouses to include, along with the refresh mode and Spark environment. For more information, see [Create Mlv Execution Definition](/rest/api/fabric/lakehouse/materialized-lake-views/create-mlv-execution-definition).

**Sample request**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/mlvexecutiondefinitions

{
  "displayName": "Gold Chain – Sales",
  "description": "Nightly refresh for the Sales gold-layer views",
  "settings": {
    "environment": {
      "referenceType": "ById",
      "itemId": "<ENVIRONMENT_ID>",
      "workspaceId": "<ENVIRONMENT_WORKSPACE_ID>"
    },
    "refreshMode": "Optimal"
  },
  "currentLakehouseExecutionContext": {
    "mode": "Selected",
    "selectedMlvs": [
      "dbo.gold_sales_summary",
      "dbo.gold_sales_daily"
    ]
  },
  "extendedLineageExecutionContext": {
    "mode": "All"
  }
}
```

**Sample response**:

Status code:
201 Created

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/mlvexecutiondefinitions/<mlvExecutionDefinitionId>
```

```json
{
  "id": "<mlvExecutionDefinitionId>",
  "displayName": "Gold Chain – Sales",
  "description": "Nightly refresh for the Sales gold-layer views",
  "settings": {
    "environment": {
      "referenceType": "ById",
      "itemId": "<ENVIRONMENT_ID>",
      "workspaceId": "<ENVIRONMENT_WORKSPACE_ID>"
    },
    "refreshMode": "Optimal"
  },
  "currentLakehouseExecutionContext": {
    "mode": "Selected",
    "selectedMlvs": [
      "dbo.gold_sales_summary",
      "dbo.gold_sales_daily"
    ]
  },
  "extendedLineageExecutionContext": {
    "mode": "All"
  }
}
```

### List Execution Definitions for MLV in Lakehouse

List all execution definitions created for materialized lake views lineage in a lakehouse. For more information, see [List Mlv Execution Definitions](/rest/api/fabric/lakehouse/materialized-lake-views/list-mlv-execution-definitions).

**Sample request**:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/mlvexecutiondefinitions
```

**Sample response**:

Status code:
200 OK

```json
{
  "value": [
    {
      "id": "<mlvExecutionDefinitionId_1>",
      "displayName": "Gold Chain – Sales",
      "description": "Nightly refresh for the Sales gold-layer views",
      "settings": {
        "environment": {
          "referenceType": "ById",
          "itemId": "<ENVIRONMENT_ID>",
          "workspaceId": "<ENVIRONMENT_WORKSPACE_ID>"
        },
        "refreshMode": "Optimal"
      },
      "currentLakehouseExecutionContext": {
        "mode": "Selected",
        "selectedMlvs": [
          "dbo.gold_sales_summary",
          "dbo.gold_sales_daily"
        ]
      },
      "extendedLineageExecutionContext": {
        "mode": "All"
      }
    },
    {
      "id": "<mlvExecutionDefinitionId_2>",
      "displayName": "Silver Chain – Customers",
      "currentLakehouseExecutionContext": {
        "mode": "All"
      }
    }
  ]
}
```

### Get Execution Definition for MLV in Lakehouse

Get details of an existing execution definition for materialized lake views lineage in a lakehouse. For more information, see [Get Mlv Execution Definition](/rest/api/fabric/lakehouse/materialized-lake-views/get-mlv-execution-definition).

**Sample request**:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/mlvexecutiondefinitions/{mlvExecutionDefinitionId}
```

**Sample response**:

Status code:
200 OK

```json
{
  "id": "<mlvExecutionDefinitionId>",
  "displayName": "Gold Chain – Sales",
  "description": "Nightly refresh for the Sales gold-layer views",
  "settings": {
    "environment": {
      "referenceType": "ById",
      "itemId": "<ENVIRONMENT_ID>",
      "workspaceId": "<ENVIRONMENT_WORKSPACE_ID>"
    },
    "refreshMode": "Optimal"
  },
  "currentLakehouseExecutionContext": {
    "mode": "Selected",
    "selectedMlvs": [
      "dbo.gold_sales_summary",
      "dbo.gold_sales_daily"
    ]
  },
  "extendedLineageExecutionContext": {
    "mode": "All"
  }
}
```

### Update Execution Definition for MLV in Lakehouse

Update an existing execution definition for materialized lake views lineage in a lakehouse. Only the fields provided in the request body are updated; omitted fields retain their existing values. For more information, see [Update Mlv Execution Definition](/rest/api/fabric/lakehouse/materialized-lake-views/update-mlv-execution-definition).

**Sample request**:

```http
PATCH https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/mlvexecutiondefinitions/{mlvExecutionDefinitionId}

{
  "displayName": "Updated Gold Chain – Sales",
  "settings": {
    "refreshMode": "Full"
  },
  "currentLakehouseExecutionContext": {
    "mode": "All"
  },
  "extendedLineageExecutionContext": {
    "mode": "Selected",
    "selectedLakehouses": [
      {
        "referenceType": "ById",
        "itemId": "<UPSTREAM_LAKEHOUSE_ID>",
        "workspaceId": "<UPSTREAM_WORKSPACE_ID>"
      }
    ]
  }
}
```

**Sample response**:

Status code:
200 OK

```json
{
  "id": "<mlvExecutionDefinitionId>",
  "displayName": "Updated Gold Chain – Sales",
  "description": "Nightly refresh for the Sales gold-layer views",
  "settings": {
    "environment": {
      "referenceType": "ById",
      "itemId": "<ENVIRONMENT_ID>",
      "workspaceId": "<ENVIRONMENT_WORKSPACE_ID>"
    },
    "refreshMode": "Full"
  },
  "currentLakehouseExecutionContext": {
    "mode": "All"
  },
  "extendedLineageExecutionContext": {
    "mode": "Selected",
    "selectedLakehouses": [
      {
        "referenceType": "ById",
        "itemId": "<UPSTREAM_LAKEHOUSE_ID>",
        "workspaceId": "<UPSTREAM_WORKSPACE_ID>"
      }
    ]
  }
}
```

### Delete Execution Definition for MLV in Lakehouse

Delete an existing execution definition for materialized lake views lineage in a lakehouse. Any schedules linked to this execution definition are also removed. For more information, see [Delete Mlv Execution Definition](/rest/api/fabric/lakehouse/materialized-lake-views/delete-mlv-execution-definition).

**Sample request**:

```http
DELETE https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/mlvexecutiondefinitions/{mlvExecutionDefinitionId}
```

**Sample response**:

Status code:
200 OK

## Known limitations

The following limitations apply to the materialized lake views REST APIs:

- *Limits of Job Scheduler APIs:*
  - The [job scheduler](/rest/api/fabric/core/job-scheduler/create-item-schedule) enforces limits on how many schedules can be configured per lakehouse.
  - The [job scheduler](/rest/api/fabric/core/job-scheduler/list-item-job-instances?tabs=HTTP#limitations) interface displays a limited number of completed and active jobs, which can affect visibility into historical or concurrent executions.
  - The [throttling limits](/rest/api/fabric/articles/throttling) set on all Fabric Public APIs are applicable to materialized lake views APIs.
- *Job status display:* The status returned by [list item job instances](#list-job-instances-for-mlv-in-lakehouse) and [get item job instance](#get-job-instance-details-for-mlv-in-lakehouse) reflects Monitor hub status. It might differ from materialized lake views [run history](./run-history.md#run-states-in-lineage-view) status (for example, **Skipped** can appear as **Canceled** in Monitor hub).
- *Run duration:* A single refresh run fails if it exceeds 24 hours.
- *Overlapping runs:* If two runs target the same materialized lake view at the same time, Fabric skips the overlapping view in the newer run and continues refreshing the rest. Check [run history](./run-history.md) for skipped views.
- *Limits of MLV execution definition APIs:* Cross-workspace lineage require access on each workspace involved. MLVs cannot be refreshed using an environment or refresh upstream lakehouses from a different capacity than the current lakehouse.

## Related content

- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
