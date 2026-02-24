---
title: Manage a lakehouse with the REST API
description: Learn how to create, update, delete, and maintain lakehouse tables programmatically by using the Microsoft Fabric REST API.
ms.reviewer: dacoelho
ms.topic: how-to
ms.date: 02/22/2026
ms.search.form: lakehouse api
---

# Manage a lakehouse with the REST API

This article walks through common scenarios for managing a lakehouse programmatically with the Microsoft Fabric REST API. Each section shows the HTTP request and response for a specific task so you can adapt the pattern to your automation scripts or applications.

For the full specification — including all parameters, required permissions, request schemas, and error codes — see the [Lakehouse REST API reference](/rest/api/fabric/lakehouse/items).

## Prerequisites

- [Get a Microsoft Entra token for the Fabric service](/rest/api/fabric/articles/get-started/fabric-api-quickstart) and include it in the `Authorization` header of every request.
- Replace `{workspaceId}` and `{lakehouseId}` in the examples below with your own values.

## Create, update, and delete a lakehouse

The following examples show how to provision a new lakehouse, rename it, retrieve its properties (including the auto-provisioned SQL analytics endpoint), and delete it. For the full parameter list and additional examples (such as creating a schema-enabled lakehouse or creating with a definition), see the [Lakehouse Items API reference](/rest/api/fabric/lakehouse/items).

### Create a lakehouse

To create a lakehouse in a workspace, send a POST request with the display name. Fabric automatically provisions a SQL analytics endpoint alongside the lakehouse.

**Request**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses
{ 
    "displayName": "demo"
} 
```

**Response**

```json
{
    "id": "56c6dedf-2640-43cb-a412-84faad8ad648", 
    "type": "Lakehouse", 
    "displayName": "demo", 
    "description": "", 
    "workspaceId": "fc67689a-442e-4d14-b3f8-085076f2f92f" 
} 
```

### Update a lakehouse

To rename a lakehouse or update its description, send a PATCH request with the new values.

**Request**

```http
PATCH https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}
{ 
    "displayName": "newname", 
    "description": "Item's New description" 
} 
```

**Response**

```json
{ 
    "id": "56c6dedf-2640-43cb-a412-84faad8ad648", 
    "type": "Lakehouse", 
    "displayName": "newname", 
    "description": "Item's New description", 
    "workspaceId": "fc67689a-442e-4d14-b3f8-085076f2f92f" 
} 
```

### Get lakehouse properties

Retrieve the lakehouse metadata, including the OneLake paths and the SQL analytics endpoint connection string.

**Request**

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId} 
```

**Response**

```json
{ 
    "id": "daaa77c7-9ef4-41fc-ad3c-f192604424f5", 
    "type": "Lakehouse", 
    "displayName": "demo", 
    "description": "", 
    "workspaceId": "bee6c118-c2aa-4900-9311-51546433bbb8", 
    "properties": { 
        "oneLakeTablesPath": "https://onelake.dfs.fabric.microsoft.com/{workspaceId}/{lakehouseId}/Tables", 
        "oneLakeFilesPath": "https://onelake.dfs.fabric.microsoft.com/{workspaceId}/{lakehouseId}/Files", 
        "sqlEndpointProperties": { 
            "connectionString": "A1bC2dE3fH4iJ5kL6mN7oP8qR9-C2dE3fH4iJ5kL6mN7oP8qR9sT0uV-datawarehouse.pbidedicated.windows.net", 
            "id": "0dfbd45a-2c4b-4f91-920a-0bb367826479", 
            "provisioningStatus": "Success" 
        } 
    } 
}
```

### Delete a lakehouse

Deleting a lakehouse removes its metadata and data. Shortcuts are removed, but the data at the shortcut target is preserved.

**Request**

```http
DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}
```

**Response**

The response body is empty.

## List the tables in a lakehouse

To retrieve all Delta tables in a lakehouse — for example, to build a data catalog or validate a deployment — use the List Tables endpoint. For the full parameter list, see the [Tables API reference](/rest/api/fabric/lakehouse/tables).

**Request**

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/tables 
```

**Response**

```json
{ 
    "continuationToken": null, 
    "continuationUri": null, 
    "data": [ 
        { 
            "type": "Managed", 
            "name": "demo1", 
            "location": "abfss://c522396d-7ac8-435d-8d77-442c3ff21295@onelake.dfs.fabric.microsoft.com/{workspaceId}/Tables/demo1", 
            "format": "delta" 
        } 
    ] 
} 
```

The List Tables API supports pagination. Pass `maxResults` as a query parameter to control page size. The response includes a `continuationUri` you can call to retrieve the next page.

### Paginate through a large table list

**Request**

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/tables?maxResults=1 
```

**Response**

```json
{ 
    "continuationToken": "+RID:~HTsuAOseYicH-GcAAAAAAA==#RT:1#TRC:1#ISV:2#IEO:65567#QCF:8#FPC:AgKfAZ8BnwEEAAe8eoA=", 
    "continuationUri": "https://api.fabric.microsoft.com:443/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/tables?continuationToken=%2BRID%3A~HTsuAOseYicH-GcAAAAAAA%3D%3D%23RT%3A1%23TRC%3A1%23ISV%3A2%23IEO%3A65567%23QCF%3A8%23FPC%3AAgKfAZ8BnwEEAAe8eoA%3D", 
    "data": [ 
        { 
            "type": "Managed", 
            "name": "nyctaxismall", 
            "location": "abfss://bee6c118-c2aa-4900-9311-51546433bbb8@onelake.dfs.fabric.microsoft.com/daaa77c7-9ef4-41fc-ad3c-f192604424f5/Tables/nyctaxismall", 
            "format": "delta" 
        } 
    ] 
}
```

## Load a file into a Delta table

To convert CSV or Parquet files into Delta tables without writing Spark code, use the Load Table API. This is the programmatic equivalent of the [Load to Tables](load-to-tables.md) feature in the lakehouse UI. For the full parameter list, see the [Load Table API reference](/rest/api/fabric/lakehouse/tables/load-table).

The operation is asynchronous. Follow these steps:

1. Upload files to the lakehouse **Files** section by using OneLake APIs.
1. Submit the load request.
1. Poll the operation status until it completes.

The following examples assume the files are already uploaded.

### Submit the load request

This example loads a CSV file named `demo.csv` into a table named `demo`, overwriting any existing data. Set `mode` to `Append` to add rows instead. Set `pathType` to `Folder` to load all files in a folder.

**Request**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/tables/demo/load 
{ 
    "relativePath": "Files/demo.csv", 
    "pathType": "File", 
    "mode": "Overwrite", 
    "formatOptions": 
    { 
        "header": true, 
        "delimiter": ",", 
        "format": "Csv" 
    } 
}
```

The response doesn't include a body. Instead, the `Location` header contains a URI you use to poll the operation status. The URI follows this pattern:

`https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/operations/{operationId}`

### Poll the load operation status

Use the `operationId` from the `Location` header to check progress:

**Request**

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/operations/{operationId}
```

**Response**

```json
{ 
    "Status": 3, 
    "CreatedTimeUtc": "", 
    "LastUpdatedTimeUtc": "", 
    "PercentComplete": 100, 
    "Error": null 
} 
```

Possible operation status for load to tables:

* 1 - Operation not started
* 2 - Running
* 3 - Success
* 4 - Failed

## Run table maintenance on a Delta table

To optimize Delta tables — applying bin-compaction, V-Order, Z-Order, or VACUUM — without opening the lakehouse UI, use the Table Maintenance API. This is the programmatic equivalent of the [table maintenance feature](lakehouse-table-maintenance.md). For the full parameter list, see the [Table Maintenance API reference](/rest/api/fabric/lakehouse/background-jobs/run-on-demand-table-maintenance).

The operation is asynchronous. Follow these steps:

1. Submit the table maintenance request.
1. Poll the operation status until it completes.

### Submit the table maintenance request

This example applies V-Order optimization and Z-Order on the `tipAmount` column, and runs VACUUM with a seven-day-one-hour retention period.

**Request**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/jobs/TableMaintenance/instances
{
    "executionData": {
        "tableName": "{table_name}",
        "schemaName": "{schema_name}",
        "optimizeSettings": {
            "vOrder": true,
            "zOrderBy": [
                "tipAmount"
            ]
        },
        "vacuumSettings": {
            "retentionPeriod": "7:01:00:00"
        }
    }
}
```

The response doesn't include a body. The `Location` header contains a URI you use to poll the operation status:

`https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{lakehouseId}/jobs/instances/{operationId}`

The run endpoint is lakehouse-scoped, but job-instance polling uses the generic item job endpoint (`/items/{itemId}/jobs/instances/{jobInstanceId}`) by design.

> [!IMPORTANT]
> Setting a retention period shorter than seven days impacts Delta time travel and can cause reader failures or table corruption if snapshots or uncommitted files are still in use. For that reason, table maintenance in both the Fabric UI and REST APIs rejects retention periods under seven days by default. To allow a shorter interval, set `spark.databricks.delta.retentionDurationCheck.enabled` to `false` in workspace settings; table maintenance jobs then use that configuration during execution.

### Poll the table maintenance status

Use the `operationId` from the `Location` header to check job status:

**Request**

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{lakehouseId}/jobs/instances/{operationId}
```

This polling route intentionally uses `items` rather than `lakehouses`.

**Response**

```json
{
    "id": "{operationId}",
    "itemId": "431e8d7b-4a95-4c02-8ccd-6faef5ba1bd7",
    "jobType": "TableMaintenance",
    "invokeType": "Manual",
    "status": "Completed",
    "rootActivityId": "8c2ee553-53a4-7edb-1042-0d8189a9e0ca",
    "startTimeUtc": "2023-04-22T06:35:00.7812154",
    "endTimeUtc": "2023-04-22T06:35:00.8033333",
    "failureReason": null
}
```

Possible operation status for table maintenance:

* NotStarted - Job not started
* InProgress - Job in progress
* Completed - Job completed
* Failed - Job failed
* Canceled - Job canceled
* Deduped - An instance of the same job type is already running and this job instance is skipped

## Related content

- [Lakehouse REST API reference](/rest/api/fabric/lakehouse/items)
- [Load to Tables](load-to-tables.md)
- [Use table maintenance feature to manage delta tables in Fabric](lakehouse-table-maintenance.md)
- [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md)
- [Fabric REST API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart)
