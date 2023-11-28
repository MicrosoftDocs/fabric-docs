---
title: Lakehouse management API
description: Manage the lakehouse in Microsoft Fabric with REST API
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form: lakehouse api
---

# Manage lakehouse in Microsoft Fabric with REST API

The Microsoft Fabric Rest API provides service endpoint for the CRUD operation of a Fabric item. The following actions are available for the Lakehouse:

|Action   |Description  |
|---------|---------|
|Create         |Creates a lakehouse inside a workspace. A SQL analytics endpoint also gets provisioned along with the lakehouse.|
|Update         |Updates the name of a lakehouse and the SQL analytics endpoint.|
|Delete         |Deletes lakehouse and the associated SQL analytics endpoint.|
|Get properties |Gets the properties of a lakehouse and the SQL analytics endpoint.|
|List tables    |List tables in the lakehouse.|
|Table load|Creates delta tables from CSV and parquet files and folders.|
|Table maintenance|Apply bin-compaction, V-Order, and removal of unreferenced and old files.|

## Prerequisites

Microsoft Fabric Rest API defines a unified endpoint for operations. The endpoint is `https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items`. The placeholders `{workspaceId}` and `{lakehouseId}` should be replaced with the appropriate values when issuing the commands exemplified in this article.

## Lakehouse CRUD

Use the following API to perform creation, modifications, and removal of the lakehouse inside a workspace.

### Create a lakehouse

**Request:**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items 
{ 
    "displayName": "demo", 
    "type": "Lakehouse" 
} 
```

**Response:**

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

Update the description and rename the Lakehouse.

**Request:**

```http
PATCH https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/dc39f96a-47d7-4c2d-9358-740f50c0aa31 
{ 
    "displayName": "newname", 
    "description": "Item's New description" 
} 
```

**Response:**

```json
{ 
    "id": "56c6dedf-2640-43cb-a412-84faad8ad648", 
    "type": "Lakehouse", 
    "displayName": "newname", 
    "description": "", 
    "workspaceId": "fc67689a-442e-4d14-b3f8-085076f2f92f" 
} 
```

### Get lakehouse properties

**Request:**

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId} 
```

**Response:**

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
            "connectionString": "hkpobavgthae5kji5cuqxtivcu-dda6npvkyiaeteyrkfkgim53xa-datawarehouse.pbidedicated.windows.net", 
            "id": "0dfbd45a-2c4b-4f91-920a-0bb367826479", 
            "provisioningStatus": "Success" 
        } 
    } 
}
```

### Delete a lakehouse

When you delete a lakehouse, the object metadata and data are deleted. Shortcut references are deleted, but the data is preserved at the target.

**Request:**

```http
DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{lakehouseId}
```

**Response:** __Empty__

## List tables in a Lakehouse

**Request:**

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/tables 
```

**Response:**

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

The list tables API __supports pagination__. Provide maxResults per page as a parameter to the request and the API responds with the continuation URI that can be used to get the next page of results.

### Pagination example

**Request:**

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/tables?maxResults=1 
```

**Response:**

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

## Load to tables

This API surfaces the capabilities of the [Load to Tables](load-to-tables.md) lakehouse feature. With this API, it's possible to load CSV and parquet files to new or existing delta lake tables in the lakehouse.

This API is asynchronous, so three steps are required:

1. Upload files and folders to Lakehouse's **Files** section using OneLake APIs.
1. Submit load to tables API request.
1. Track the status of the operation until completion.

The Following sections assume the files were already uploaded.

### Load to tables API request

The ``mode`` parameter supports ``overwrite`` and ``append`` operations.
``pathType`` parameter specified if loading individual files or all files from specified folder.
Both ```CSV``` and ```parquet``` are supported as the file ``format`` parameter.

This example uploads a CSV file named ```demo.csv``` into an existing table named ``demo``.

**Request:**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/tables/demo/load 
{ 
    "relativePath": "Files/demo.csv", 
    "pathType": "File", 
    "mode": "overwrite", 
    "formatOptions": 
    { 
        "header": true, 
        "delimiter": ",", 
        "format": "CSV" 
    } 
}
```

The response header contains the URI to poll the status of the asynchronous operations. The URI is in the __Location__ variable of the response header.

The Location variable contains an URI as following: ``https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/operations/32ad6d2a-82bb-420d-bb57-4620c8860373``. The guid ``32ad6d2a-82bb-420d-bb57-4620c8860373`` is the operation ID to query the status of running load to tables operations as described in the next section.

### Monitoring Load to tables operations

After capturing the operationId from the response of the load to tables API request, execute the following request:

**Request:**

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/operations/{operationId}
```

**Response:**

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

## Table maintenance

This API surfaces the capabilities of the Lakehouse [table maintenance feature](lakehouse-table-maintenance.md). With this API, it's possible to apply bin-compaction, V-Order, and unreferenced old files cleanup.

This API is asynchronous, so two steps are required:

1. Submit table maintenance API request.
1. Track the status of the operation until completion.

### Table maintenance API request

This example executes a table maintenance job that applies V-Order to a table, while also applying Z-Order to the ``tipAmount`` column and executing the ``VACUUM`` operation with a retention of seven days and one hour.

**Request:**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{lakehouseId}/jobs/instances?jobType=TableMaintenance
{
    "executionData": {
        "tableName": "{table_name}",
        "optimizeSettings": {
            "vOrder": true,
            "zOrderBy": [
                "tipAmount"
            ]
        },
        "vacuumSettings": {
            "retentionPeriod": "7.01:00:00"
        }
    }
}
 
```

The response header contains the URI to poll the status of the asynchronous operations. The URI is in the __Location__ variable of the response header.

The Location variable contains an URI as following: ``https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{lakehouseId}/jobs/instances/f2d65699-dd22-4889-980c-15226deb0e1b``. The guid ``f2d65699-dd22-4889-980c-15226deb0e1b`` is the operation ID to query the status of running table maintenance operations as described in the next section.

### Monitoring table maintenance operations

After capturing *operationId* from the response of the load to tables API request, execute the following request:

**Request:**

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{lakehouseId}/jobs/instances/{operationId}
```

**Response:**

```json
{
    "parameters": {
        "workspaceId": "{workspaceId}",
        "itemId": "{lakehouseId}",
        "jobInstanceId": "{operationId}"
    },
    "responses": {
        "200": {
            "body": {
                "id": "{operationId}",
                "itemId": "431e8d7b-4a95-4c02-8ccd-6faef5ba1bd7",
                "jobType": "DefaultJob",
                "invokeType": "Manual",
                "status": "Completed",
                "rootActivityId": "8c2ee553-53a4-7edb-1042-0d8189a9e0ca",
                "startTimeUtc": "2023-04-22T06:35:00.7812154",
                "endTimeUtc": "2023-04-22T06:35:00.8033333",
                "failureReason": null
            }
        }
    }
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

- [Load to Tables](load-to-tables.md) Lakehouse feature.
- [Use table maintenance feature to manage delta tables in Fabric](lakehouse-table-maintenance.md).
- [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md).
