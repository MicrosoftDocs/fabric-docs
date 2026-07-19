---
title: Manage Fabric materialized lake views with public APIs
description: Learn how to use Fabric REST APIs to schedule, run, and manage materialized lake views.
ms.topic: reference
ms.reviewer: rkottackal
ms.date: 07/01/2026
ms.search.form: MLV REST API
---

# Manage and refresh materialized lake views in Fabric with APIs

Microsoft Fabric REST APIs enable you to manage and refresh Materialized Lake Views (MLVs) programmatically. You can automate lineage refresh operations and integrate them with other tools and systems.

## Prerequisites

Before you use the materialized lake views REST APIs, complete these prerequisites:

- [Register an application with Microsoft Entra ID](/rest/api/fabric/articles/get-started/fabric-api-quickstart) with appropriate [identity](/fabric/admin/service-admin-portal-developer#service-principals-can-call-fabric-public-apis). Acquire an access token with appropriate [scopes](/rest/api/fabric/articles/scopes) and pass it in the `Authorization` header of every request.
- Replace the placeholders including `{WORKSPACE_ID}` and `{LAKEHOUSE_ID}` with appropriate `WorkspaceId` and `LakehouseId`. To find these IDs, open the lakehouse in the Fabric portal — the URL contains both: `https://app.fabric.microsoft.com/groups/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}`. Alternatively, you can list the workspaces and lakehouses using Fabric REST APIs to access them programmatically.

The following **job scheduler** actions are available for materialized lake views.

|Action|Description|
|---------|---------|
|[Create Refresh Schedule for MLV](#create-refresh-schedule-for-mlv)|Create a schedule for periodic refresh of MLVs.|
|[Get Schedule for MLV](#get-schedule-for-mlv)|Get details of an existing refresh schedule.|
|[List Schedules for MLV](#list-schedules-for-mlv)|List all refresh schedules.|
|[Update Refresh Schedule for MLV](#update-refresh-schedule-for-mlv)|Update an existing refresh schedule.|
|[Delete Refresh Schedule for MLV](#delete-refresh-schedule-for-mlv)|Delete a refresh schedule.|
|[Run On Demand Refresh for MLVs](#run-on-demand-refresh-for-mlvs)|Run an immediate refresh of MLVs.|
|[List Job Instances for MLV](#list-job-instances-for-mlv)|List all refresh job instances.|
|[Get Job Instance Details for MLV](#get-job-instance-details-for-mlv)|Get details of a specific refresh job, such as status.|
|[Cancel Job Instance for MLV](#cancel-job-instance-for-mlv)|Cancel an in-progress refresh job.|

For more information, see [job scheduler](/rest/api/fabric/core/job-scheduler), where `{item}` is Lakehouse and `{jobType}` is `RefreshMaterializedLakeViews`.

An MLV execution definition is a saved configuration that specifies which materialized lake views to refresh, which upstream lakehouses to include, and which refresh mode and Spark environment to use. It defines a subset of the [lineage](./view-lineage.md) that can be refreshed independently.

The following actions are available for **MLV execution definitions**.

|Action|Description|
|---------|---------|
|[Create MLV Execution Definition](#create-mlv-execution-definition)|Create a new MLV execution definition.|
|[List MLV Execution Definitions](#list-mlv-execution-definitions)|List all MLV execution definitions.|
|[Get MLV Execution Definition](#get-mlv-execution-definition)|Get details of an existing MLV execution definition.|
|[Update MLV Execution Definition](#update-mlv-execution-definition)|Update an existing MLV execution definition.|
|[Delete MLV Execution Definition](#delete-mlv-execution-definition)|Delete an MLV execution definition.|

For more information, see [materialized lake views](/rest/api/fabric/lakehouse/materialized-lake-views).

The following diagrams show how to refresh materialized lake views, with or without an MLV execution definition.

**Use case 1: Refresh all MLVs in a lakehouse (default)**

:::image type="content" source="./media/materialized-lake-views-public-api/materialized-lake-views-refresh-all.png" alt-text="Screenshot showing sequence diagram for refresh of all mlvs." border="true" lightbox="./media/materialized-lake-views-public-api/materialized-lake-views-refresh-all.png":::

**Use case 2: Refresh specific MLVs or a subset of the lineage**

:::image type="content" source="./media/materialized-lake-views-public-api/materialized-lake-views-refresh-specific.png" alt-text="Screenshot showing sequence diagram for refresh of specific mlvs." border="true" lightbox="./media/materialized-lake-views-public-api/materialized-lake-views-refresh-specific.png":::

> [!NOTE]
> These scenarios cover usage examples specific to materialized lake views. Examples for common Fabric item APIs aren't included.

## Examples of refreshing materialized lake views using APIs

Each example shows the HTTP method, endpoint URL, and sample request/response payloads.

### Create Refresh Schedule for MLV

Create a schedule for periodic lineage refresh. To refresh only a subset of the lineage, provide the 'mlvExecutionDefinitionId' in `executionData`. For more information, see [Create Refresh Materialized Lake Views Schedule](/rest/api/fabric/lakehouse/background-jobs/create-refresh-materialized-lake-views-schedule) and [Get MLV Execution Definition](#get-mlv-execution-definition).

**Sample request without MLV Execution Definition**:

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

**Sample request with MLV Execution Definition**:

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

### Get Schedule for MLV

Get details of an existing refresh schedule. For more information, see [get item schedules](/rest/api/fabric/core/job-scheduler/get-item-schedule) with `{item}` as Lakehouse and `{jobType}` as `RefreshMaterializedLakeViews`.

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
  "executionData": {
    "mlvExecutionDefinitionId": "<mlvExecutionDefinitionId>"
  },
  "owner": {
    "id": "<ownerId>",
    "type": "User"
  }
}
```

### List Schedules for MLV

List all refresh schedules. For more information, see [List Item Schedules](/rest/api/fabric/core/job-scheduler/list-item-schedules) with `{item}` as Lakehouse and `{jobType}` as `RefreshMaterializedLakeViews`.

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

### Update Refresh Schedule for MLV

Update an existing refresh schedule. For more information, see [Update Refresh Materialized Lake Views Schedule](/rest/api/fabric/lakehouse/background-jobs/update-refresh-materialized-lake-views-schedule).

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
  },
  "executionData": {
    "mlvExecutionDefinitionId": "<mlvExecutionDefinitionId>"
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
  "executionData": {
    "mlvExecutionDefinitionId": "<mlvExecutionDefinitionId>"
  },
  "owner": {
    "id": "<ownerId>",
    "type": "User"
  }
}
```

### Delete Refresh Schedule for MLV

Delete a refresh schedule. For more information, see [Delete Refresh Materialized Lake Views Schedule](/rest/api/fabric/lakehouse/background-jobs/delete-refresh-materialized-lake-views-schedule).

**Sample request**:

```http
DELETE https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{scheduleId}
```

**Sample response**:

Status code:
200 OK

### Run On Demand Refresh for MLVs

Run an immediate refresh of lineage. To refresh only a subset of the lineage, provide the 'mlvExecutionDefinitionId' in `executionData`. For more information, see [Run On Demand Refresh Materialized Lake Views](/rest/api/fabric/lakehouse/background-jobs/run-on-demand-refresh-materialized-lake-views) and [Get MLV Execution Definition](#get-mlv-execution-definition).

**Sample request without MLV Execution Definition**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/instances
```

**Sample request with MLV Execution Definition**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/instances

{
  "executionData": {
    "mlvExecutionDefinitionId": "<mlvExecutionDefinitionId>"
  }
}
```

**Sample response**:

Status code:
202 Accepted

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/<WORKSPACE_ID>/lakehouses/<LAKEHOUSE_ID>/jobs/instances/<jobInstanceId>
Retry-After: 60
```

With the `Location` header, you can use [Get Item Job Instance](/rest/api/fabric/core/job-scheduler/get-item-job-instance) to check job status or [Cancel Item Job Instance](/rest/api/fabric/core/job-scheduler/cancel-item-job-instance) to cancel the run.

### List Job Instances for MLV

List all refresh job instances. For more information, see [List Item Job Instances](/rest/api/fabric/core/job-scheduler/list-item-job-instances) with `{item}` as Lakehouse and `{jobType}` `RefreshMaterializedLakeViews`. The job status reflects the status in Monitor hub.

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

### Get Job Instance Details for MLV

Get status and details for a specific refresh job instance. For more information, see [Get Item Job Instance](/rest/api/fabric/core/job-scheduler/get-item-job-instance) with `{item}` as Lakehouse. The job status reflects the status in Monitor hub.

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

### Cancel Job Instance for MLV

Cancel an in-progress refresh job. For more information, see [Cancel Item Job Instance](/rest/api/fabric/core/job-scheduler/cancel-item-job-instance) with `{item}` as Lakehouse.

**Sample request**:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances/{jobInstanceId}/cancel
```

**Sample response**:

Status code:
202 Accepted

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/<WORKSPACE_ID>/lakehouses/<LAKEHOUSE_ID>/jobs/instances/<jobInstanceId>
Retry-After: 60
```

## Examples of using MLV execution definition APIs

Each example shows the HTTP method, endpoint URL, and sample request/response payloads.

### Create MLV Execution Definition

Create a new MLV execution definition that specifies which MLVs and upstream lakehouses to include, along with the refresh mode and Spark environment. For more information, see [Create Mlv Execution Definition](/rest/api/fabric/lakehouse/materialized-lake-views/create-mlv-execution-definition).

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

### List MLV Execution Definitions

List all MLV execution definitions. For more information, see [List Mlv Execution Definitions](/rest/api/fabric/lakehouse/materialized-lake-views/list-mlv-execution-definitions).

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

### Get MLV Execution Definition

Get details of an existing MLV execution definition, including the MLVs to refresh, upstream lakehouses to include, refresh mode, and Spark environment. For more information, see [Get Mlv Execution Definition](/rest/api/fabric/lakehouse/materialized-lake-views/get-mlv-execution-definition).

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

### Update MLV Execution Definition

Update an existing MLV execution definition. Only the fields provided in the request body are updated; omitted fields retain their existing values. For more information, see [Update Mlv Execution Definition](/rest/api/fabric/lakehouse/materialized-lake-views/update-mlv-execution-definition).

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

### Delete MLV Execution Definition

Delete an MLV execution definition. Any schedules linked to it are also removed. For more information, see [Delete Mlv Execution Definition](/rest/api/fabric/lakehouse/materialized-lake-views/delete-mlv-execution-definition).

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
  - The [job scheduler](/rest/api/fabric/core/job-scheduler/list-item-job-instances?tabs=HTTP#limitations) API returns a limited number of completed and active jobs, which can affect visibility into historical or concurrent executions.
  - The [throttling limits](/rest/api/fabric/articles/throttling) for Fabric public APIs apply to materialized lake views APIs.
- *Job status display:* The status returned by [list item job instances](#list-job-instances-for-mlv) and [get item job instance](#get-job-instance-details-for-mlv) reflects status in Monitor hub. It might differ from materialized lake views [run history](./run-history.md#view-recent-refreshes) status (for example, **Skipped** appears as **Canceled** in Monitor hub).
- *Refresh limits:* For refresh constraints, see [permissions and limitations](./schedule-lineage-run.md#permissions-and-limitations).

## Related content

- [Microsoft Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart)
- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
- [Lakehouse jobs](/rest/api/fabric/articles/get-started/fabric-api-quickstart)
- [MLV Execution Definition APIs](/rest/api/fabric/lakehouse/materialized-lake-views)
