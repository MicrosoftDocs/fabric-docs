---
title: Fabric mirroring public REST API
description: This article describes the available REST APIs for Fabric mirroring.
author: xuyangit1
ms.author: xuyan
ms.topic: conceptual
ms.date: 11/01/2024
---

# Microsoft Fabric mirroring public REST API

The public APIs for Fabric mirroring consist of two categories: (1) [CRUD operations for Fabric mirrored database item](/rest/api/fabric/mirroreddatabase/items) and (2) [Start/stop and monitoring operations](/rest/api/fabric/mirroreddatabase/mirroring). The primary online reference documentation for Microsoft Fabric REST APIs can be found in [Microsoft Fabric REST API references](/rest/api/fabric/articles/).

> [!NOTE]
> These REST APIs don't apply to mirrored database from Azure Databricks.

## Create mirrored database

[REST API - Items - Create mirrored database](/rest/api/fabric/mirroreddatabase/items/create-mirrored-database)

Before you create mirrored database, the corresponding data source connection is needed. If you don't have a connection yet refer to [create new connection](/fabric/data-factory/data-source-management) and use that connection ID in following definition.

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases```

Body: 

```json
{
    "displayName": "Mirrored database 1",
    "description": "A mirrored database description",
    "definition": {
        "parts": [
            {
                "path": "mirroring.json",
                "payload": "eyAicHJvcGVydGllcy..WJsZSIgfSB9IH0gXSB9IH0",
                "payloadType": "InlineBase64"
            }
        ]
    }
}
```

The payload property in above body is Base64 encoded. You can use [Base64 Encode and Decode](https://www.base64encode.org/) to encode. The original JSON definition examples for different types of sources are as below:

### JSON definition example of Snowflake

```json
{
    "properties": {
        "source": {
            "type": "Snowflake",
            "typeProperties": {
                "connection": "a0a0a0a0-bbbb-cccc-dddd-e1e1e1e1e1e1",
                "database": "xxxx"
            }
        },
        "target": {
            "type": "MountedRelationalDatabase",
            "typeProperties": {
                "defaultSchema": "xxxx",
                "format": "Delta"
            }
        }
    }
}
```

### JSON definition example of Azure SQL Database

```json
{
    "properties": {
        "source": {
            "type": "AzureSqlDatabase",
            "typeProperties": {
                "connection": "a0a0a0a0-bbbb-cccc-dddd-e1e1e1e1e1e1"
            }
        },
        "target": {
            "type": "MountedRelationalDatabase",
            "typeProperties": {
                "defaultSchema": "xxxx",
                "format": "Delta"
            }
        }
    }
}
```

> [!NOTE]
> For Azure SQL Database, you will need to [enable system assigned managed identity](/fabric/database/mirrored-database/azure-sql-database-tutorial#enable-system-assigned-managed-identity-sami-of-your-azure-sql-logical-server) and grant it **Read,Write** permission to the mirrored database artifact before starting mirroring.


### JSON definition example of Azure Cosmos DB

```json
{
    "properties": {
        "source": {
            "type": "CosmosDb",
            "typeProperties": {
                "connection": "a0a0a0a0-bbbb-cccc-dddd-e1e1e1e1e1e1",
                "database": "xxxx"
            }
        },
        "target": {
            "type": "MountedRelationalDatabase",
            "typeProperties": {
                "defaultSchema": "xxxx",
                "format": "Delta"
            }
        }
    }
}
```

### JSON definition example of Snowflake with specified tables to replicate
Above examples apply to the scenario that automatically replicates all the tables in the specified database. If you want to specify the tables to replicate, you can specify the `mountedTables` property as below.

```json
{
    "properties": {
        "source": {
            "type": "Snowflake",
            "typeProperties": {
                "connection": "a0a0a0a0-bbbb-cccc-dddd-e1e1e1e1e1e1",
                "database": "xxxx"
            }
        },
        "target": {
            "type": "MountedRelationalDatabase",
            "typeProperties": {
                "defaultSchema": "xxxx",
                "format": "Delta"
            }
        },
        "mountedTables": [
            {
                "source": {
                    "typeProperties": {
                        "schemaName": "xxxx",
                        "tableName": "xxxx"
                    }
                }
            }
        ]
    }
}
```

Response 201:

```json
{ 
    "id": "<mirrored database ID>", 
    "type": "MirroredDatabase", 
    "displayName": "Mirrored database 1", 
    "description": "A mirrored database description", 
    "workspaceId": "<your workspace ID>" 
} 
```

## Delete mirrored database

[REST API - Items - Delete mirrored database](/rest/api/fabric/mirroreddatabase/items/delete-mirrored-database)

Example:

```DELETE https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases/<mirrored database ID> ```

Response 200: (No body)

## Get mirrored database

[REST API - Items - Get mirrored database](/rest/api/fabric/mirroreddatabase/items/get-mirrored-database)

Example:

```GET https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases/<mirrored database ID>```

Response 200:

```json
{
    "displayName": "Mirrored database 1",
    "description": "A mirrored database description.",
    "type": "MirroredDatabase",
    "workspaceId": "<your workspace ID>",
    "id": "<mirrored database ID>",
    "properties": {
        "oneLakeTablesPath": "https://onelake.dfs.fabric.microsoft.com/<your workspace ID>/<mirrored database ID>/Tables",
        "sqlEndpointProperties": {
            "connectionString": "xxxx.xxxx.fabric.microsoft.com",
            "id": "b1b1b1b1-cccc-dddd-eeee-f2f2f2f2f2f2",
            "provisioningStatus": "Success"
        },
        "defaultSchema": "xxxx"
    }
}
```

## Get mirrored database definition

[REST API - Items - Get mirrored database definition](/rest/api/fabric/mirroreddatabase/items/get-mirrored-database-definition)

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases/<mirrored database ID>/getDefinition```

Response 200:

```json
{ 
    "definition": { 
        "parts":[ 
            { 
                "path": "mirroring.json", 
                "payload": "eyAicHJvcGVydGllcy..WJsZSIgfSB9IH0gXSB9IH0", 
                "payloadType": "InlineBase64" 
            } 
        ] 
    } 
} 
```

## List mirrored databases

[REST API - Items - List mirrored databases](/rest/api/fabric/mirroreddatabase/items/list-mirrored-databases)

Example:

```GET https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases```

Response 200:

```json
{ 
    "value": [ 
        {
            "displayName": "Mirrored database 1",
            "description": "A mirrored database description.",
            "type": "MirroredDatabase",
            "workspaceId": "<your workspace ID>",
            "id": "<mirrored database ID>",
            "properties": {
                "oneLakeTablesPath": "https://onelake.dfs.fabric.microsoft.com/<your workspace ID>/<mirrored database ID>/Tables",
                "sqlEndpointProperties": {
                    "connectionString": "xxxx.xxxx.fabric.microsoft.com",
                    "id": "b1b1b1b1-cccc-dddd-eeee-f2f2f2f2f2f2",
                    "provisioningStatus": "Success"
                },
                "defaultSchema": "xxxx"
            }
        }
    ] 
} 
```

## Update mirrored database

[REST API - Items - Update mirrored database](/rest/api/fabric/mirroreddatabase/items/update-mirrored-database)

Example:

```PATCH https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases/<mirrored database ID>```

Body:
```json
{
    "displayName": "MirroredDatabase's New name",
    "description": "A new description for mirrored database."
}
```

Response 200:

```json
{
    "displayName": "MirroredDatabase's New name",
    "description": "A new description for mirrored database.",
    "type": "MirroredDatabase",
    "workspaceId": "<your workspace ID>",
    "id": "<mirrored database ID>"
}
```

## Update mirrored database definition

[REST API - Items - Update mirrored database definition](/rest/api/fabric/mirroreddatabase/items/update-mirrored-database-definition)

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases/<mirrored database ID>/updateDefinition```

Body:

```json
{ 
  "definition": { 
    "parts": [ 
      { 
        "path": "mirroring.json", 
        "payload": "eyAicHJvcGVydGllcy..WJsZSIgfSB9IH0gXSB9IH0", 
        "payloadType": "InlineBase64" 
      } 
    ] 
  } 
}
```

Response 200: (No body)

> [!NOTE]
> This API supports adding/removing tables by refreshing the `mountedTables` property. It also supports updating the source connection ID, database name and default schema (these three properties can only be updated when **Get mirroring status** api returns `Initialized`/`Stopped`).

## Get mirroring status

[REST API - Mirroring - Get mirroring status](/rest/api/fabric/mirroreddatabase/mirroring/get-mirroring-status)

This API returns the status of mirrored database instance. The list of available statuses are provided at [values of MirroringStatus](/rest/api/fabric/mirroreddatabase/mirroring/get-mirroring-status?tabs=HTTP#mirroringstatus).

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases/<mirrored database ID>/getMirroringStatus```

Response 200:

```json
{
    "status": "Running"
}
```

## Start mirroring

[REST API - Mirroring - Start mirroring](/rest/api/fabric/mirroreddatabase/mirroring/start-mirroring)

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases/<mirrored database ID>/startMirroring```

Response 200: (No body)

> [!NOTE]
> Mirroring can not be started when above **Get mirroring status** api returns `Initializing` status.

## Get tables mirroring status

[REST API - Mirroring - Get tables mirroring status](/rest/api/fabric/mirroreddatabase/mirroring/get-tables-mirroring-status)

If mirroring is started and **Get mirroring status** API returns `Running` status, this API returns the status and metrics of tables replication.

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases/<mirrored database ID>/getTablesMirroringStatus```

Response 200:

```json
{
    "continuationToken": null,
    "continuationUri": null,
    "data": [
        {
            "sourceSchemaName": "dbo",
            "sourceTableName": "test",
            "status": "Replicating",
            "metrics": {
                "processedBytes": 1247,
                "processedRows": 6,
                "lastSyncDateTime": "2024-10-08T05:07:11.0663362Z"
            }
        }
    ]
}
```

## Stop mirroring

[REST API - Mirroring - Stop mirroring](/rest/api/fabric/mirroreddatabase/mirroring/stop-mirroring)

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your workspace ID>/mirroredDatabases/<mirrored database ID>/stopMirroring```

Response 200: (No body)

> [!NOTE]
> After stopping mirroring, you can call **Get mirroring status** api to query the mirroring status.

## Microsoft Fabric .NET SDK

The .NET SDK that supports Fabric mirroring is available at [Microsoft Fabric .NET SDK](https://www.nuget.org/packages/Microsoft.Fabric.Api/1.0.0-beta.11). The version needs to be >= 1.0.0-beta.11.

## Known limitations

- Service Principal/Managed identity are currently not supported.

## Related content

- [REST API - Items](/rest/api/fabric/core/items)
