---
title: Create an Eventstream with an Eventhouse DirectIngestion destination by using APIs
description: Learn how to use APIs to create an Eventhouse, create a KQL table and ingestion mapping, and create an Eventstream in DirectIngestion mode.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 04/07/2026
ms.search.form: Eventstream REST API
ai-usage: ai-assisted
---

# Create an Eventstream with an Eventhouse DirectIngestion destination by using APIs

This article shows a practical API-only flow to set up an eventstream that writes to Eventhouse in **DirectIngestion** mode.

You complete four steps:

1. Create an Eventhouse.
1. Get the KQL database properties.
1. Create a KQL table and ingestion mapping.
1. Create an Eventstream that uses Eventhouse DirectIngestion mode.

## Prerequisites

- You have access to a workspace with the **Fabric** capacity or **Fabric Trial** workspace type with Contributor or higher permissions.
- You have permissions to run Kusto management commands on the target KQL database.

## Required references

- [Eventhouse create API](/rest/api/fabric/eventhouse/items/create-eventhouse?tabs=HTTP)
- [Eventhouse definition](/rest/api/fabric/articles/item-management/definitions/eventhouse-definition)
- [Kusto REST API overview](/kusto/api/rest)
- [Eventstream create API](/rest/api/fabric/eventstream/items/create-eventstream?tabs=HTTP)
- [Eventstream definition template example](api-create-with-definition.md)

## Authentication and permission requirements

To work with Fabric APIs, first get a Microsoft Entra token for the Fabric service. Then use that token in the Authorization header of your API call:

You can acquire a Fabric token in two ways:

1. Get a token using MSAL.NET.

  If your application accesses Fabric APIs by using a **service principal**, use MSAL.NET to acquire an access token. Follow [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart) to create a C# console app that acquires a Microsoft Entra token and calls a Fabric API.

1. Get a token from the Fabric portal.

    You can use your Microsoft Entra token to authenticate and test the Fabric APIs. Sign in to the Fabric portal for the tenant you want to test, press `F12` to open the browser developer tools, and then run the following command in the console:

    ```text
    powerBIAccessToken
    ```
    
> [!NOTE]
> If the eventstream you create includes any sources that use a cloud connection, make sure the identity you use to get the token has permission to access that cloud connection, whether it's a service principal or a user.
>
> The preceding methods describe the token for Fabric item APIs (Eventhouse and Eventstream). If your flow calls Kusto management endpoint `/v1/rest/mgmt`, get and use the Kusto token by following [Kusto REST request authentication](/kusto/api/rest/request).

If you authenticate by using a service principal, grant the following KQL data-plane permissions:

- `Database viewer`
- `Table ingestor`

You can grant these permissions in either of the following ways.

# [Using Eventhouse UI](#tab/using-eventhouse-ui)

Run the following KQL commands in the Eventhouse UI:

```kql
.add database ['yourDatabase'] viewers (@'aadapp=<clientid>;<tenantid>')
.add table yourTable ingestors (@'aadapp=<id>;<directoryid>')
```

Replace `clientid` and `tenantid` with your service principal values.

These commands grant the service principal the required data-plane permissions so Eventhouse can create the connection and pull data from Eventstream. For more information, see [Security roles overview](/kusto/management/security-roles).

# [Using Eventhouse REST API](#tab/using-eventhouse-rest-api)

If you prefer to manage permissions through the REST API, run the same KQL commands through the Kusto management endpoint.

For details, see:

- [Kusto REST API overview](/kusto/api/rest)
- [Manage database security roles](/kusto/management/manage-database-security-roles)
- [Manage table security roles](/kusto/management/manage-table-security-roles)

---

## Step 1: Create Eventhouse by API

### API address and parameters

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/eventhouses
```

| Parameter | In | Required | Description |
|---|---|---|---|
| `workspaceId` | Path | Yes | The workspace where the Eventhouse item is created. |

### Token

```http
Authorization: Bearer <fabric_access_token>
Content-Type: application/json
```

### Payload

Use a minimal payload to create the Eventhouse item.

```json
{
  "displayName": "eh-api-demo"
}
```

If you need advanced provisioning by definition parts, use the Eventhouse definition contract in the reference docs.

### Response example

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "type": "Eventhouse",
  "displayName": "eh-api-demo",
  "description": "",
  "workspaceId": "00000000-0000-0000-0000-000000000000"
}
```

Capture the value for the next steps:

- Eventhouse item ID (`id`)

## Step 2: Get the KQL database properties

Use this step to get the KQL database ID and Kusto engine endpoint for the next step.

### API address and parameters

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/kqlDatabases
```

| Parameter | In | Required | Description |
|---|---|---|---|
| `workspaceId` | Path | Yes | The workspace that contains your Eventhouse and KQL databases. |

### Token

```http
Authorization: Bearer <fabric_access_token>
```

### Response example

```json
{
  "value": [
    {
      "id": "00000000-0000-0000-0000-000000000000",
      "type": "KQLDatabase",
      "displayName": "eh-api-demo",
      "description": "eh-api-demo",
      "workspaceId": "00000000-0000-0000-0000-000000000000",
      "properties": {
        "parentEventhouseItemId": "00000000-0000-0000-0000-000000000000",
        "queryServiceUri": "https://exampleeventhouse.z3.kusto.fabric.microsoft.com",
        "ingestionServiceUri": "https://ingest-exampleeventhouse.z3.kusto.fabric.microsoft.com",
        "databaseType": "ReadWrite"
      },
      "sensitivityLabel": {
        "sensitivityLabelId": "00000000-0000-0000-0000-000000000000"
      }
    }
  ]
}
```

In this response:

- `kqlDatabaseId` is `id`.
- `eventhouse-engine-endpoint` is `properties.queryServiceUri`. Use this value as the host for all Kusto management API calls in the next step.

If the workspace has multiple KQL databases, use `properties.parentEventhouseItemId` to select the database that belongs to the Eventhouse created in Step 1.

## Step 3: Create table and mapping rule with Kusto REST API

### API address and parameters

```http
POST https://<eventhouse-engine-endpoint>/v1/rest/mgmt
```

| Parameter | In | Required | Description |
|---|---|---|---|
| `<eventhouse-engine-endpoint>` | URL host | Yes | The Eventhouse/Kusto engine endpoint. |

### Token
 
To get `<kusto_access_token>`, request a token for the Kusto engine endpoint (`properties.queryServiceUri` from Step 2). Example:

```powershell
$clusterUrl = "https://exampleeventhouse.z3.kusto.fabric.microsoft.com"
$kustoAccessToken = (Get-AzAccessToken -ResourceUrl $clusterUrl).Token
```

Use `$kustoAccessToken` in the `Authorization` header.

### Create table

You can create the table in Eventhouse UI or by calling the Kusto management endpoint.

For command details, see [Create table command](/kusto/management/create-table-command).

# [Using Eventhouse UI](#tab/using-eventhouse-ui)

Run this KQL command:

```kql
.create table Orders (id:string, eventTime:datetime, amount:real)
```

# [Using Eventhouse REST API](#tab/using-eventhouse-rest-api)

```http
POST https://<eventhouse-engine-endpoint>/v1/rest/mgmt
```

Request body:

```json
{
  "db": "<kqlDatabaseName>",
  "csl": ".create table Orders (id:string, eventTime:datetime, amount:real)"
}
```

Response example:

```json
{
  "Tables": [
    {
      "TableName": "Table_0",
      "Rows": [
        ["Orders"]
      ]
    }
  ]
}
```

For details, see:

- [Kusto REST API overview](/kusto/api/rest)
- [Kusto REST request authentication](/kusto/api/rest/request)
- [Create table command](/kusto/management/create-table-command)

---

### Create JSON mapping rule

# [Using Eventhouse UI](#tab/using-eventhouse-ui)

Run this KQL command:

```kql
.create table Orders ingestion json mapping 'orders_json_map' '[{"column":"id","Properties":{"path":"$.id"}},{"column":"eventTime","Properties":{"path":"$.eventTime"}},{"column":"amount","Properties":{"path":"$.amount"}}]'
```

After the mapping is created, you can verify `ingestionMappingReference` usage with:

```kql
.ingest into table Orders (<data-source>) with (format="json", ingestionMappingReference="orders_json_map")
```

Replace `<data-source>` with your source path or URI.

# [Using Eventhouse REST API](#tab/using-eventhouse-rest-api)

```http
POST https://<eventhouse-engine-endpoint>/v1/rest/mgmt
```

Request body:

```json
{
  "db": "<kqlDatabaseName>",
  "csl": ".create table Orders ingestion json mapping 'orders_json_map' '[{\"column\":\"id\",\"Properties\":{\"path\":\"$.id\"}},{\"column\":\"eventTime\",\"Properties\":{\"path\":\"$.eventTime\"}},{\"column\":\"amount\",\"Properties\":{\"path\":\"$.amount\"}}]'"
}
```

> [!IMPORTANT]
> If the mapping name already exists, use a new name or use the alter command.

PowerShell example:

```powershell
$clusterUrl = "https://exampleeventhouse.z3.kusto.fabric.microsoft.com"
$token = (Get-AzAccessToken -ResourceUrl $clusterUrl).Token
$headers = @{
  Authorization = "Bearer $token"
  "Content-Type" = "application/json"
}

$mappingName = "orders_json_map_retry1"
$mappingJson = @(
  @{ column = "id"; Properties = @{ path = "$.id" } },
  @{ column = "eventTime"; Properties = @{ path = "$.eventTime" } },
  @{ column = "amount"; Properties = @{ path = "$.amount" } }
) | ConvertTo-Json -Compress

$body = @{
  db = "eh-api-demo"
  csl = ".create table Orders ingestion json mapping '$mappingName' '$mappingJson'"
} | ConvertTo-Json -Compress

Invoke-RestMethod -Method POST -Uri "$clusterUrl/v1/rest/mgmt" -Headers $headers -Body $body
```

Response example:

```json
{
  "Tables": [
    {
      "TableName": "Table_0",
      "Rows": [
        ["orders_json_map", "Json"]
      ]
    }
  ]
}
```

For API and mapping details, see:

- [Kusto REST API overview](/kusto/api/rest)
- [Kusto REST request authentication](/kusto/api/rest/request)
- [Create ingestion mapping command](/kusto/management/create-ingestion-mapping-command)
- [Mapping with ingestionMappingReference](/kusto/management/mappings?view=microsoft-fabric#mapping-with-ingestionmappingreference)

---

At this point you have:

- `tableName`: `Orders`
- `mappingRuleName`: `orders_json_map`

## Step 4: Create Eventstream in DirectIngestion mode

### API address and parameters

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items
```

| Parameter | In | Required | Description |
|---|---|---|---|
| `workspaceId` | Path | Yes | The workspace where the Eventstream item is created. |

### Eventstream topology payload (decoded `eventstream.json`)

This sample payload uses `SampleData` as the source and `Eventhouse` as the destination in `DirectIngestion` mode. Keep the destination properties aligned with your API version.

```json
{
  "sources": [
    {
      "name": "SampleDataSource",
      "type": "SampleData",
      "properties": {
        "type": "StockMarket"
      }
    }
  ],
  "destinations": [
    {
      "name": "EventhouseDirectIngestion",
      "type": "Eventhouse",
      "properties": {
        "dataIngestionMode": "DirectIngestion",
        "workspaceId": "<eventhouseWorkspaceId>",
        "itemId": "<eventhouseItemId>",
        "tableName": "Orders",
        "connectionName": "eventhouse-conn-7f3a",
        "mappingRuleName": "orders_json_map"
      },
      "inputNodes": [
        {
          "name": "Eventstream1-stream"
        }
      ]
    }
  ],
  "streams": [
    {
      "name": "Eventstream1-stream",
      "type": "DefaultStream",
      "properties": {},
      "inputNodes": [
        {
          "name": "SampleDataSource"
        }
      ]
    }
  ],
  "operators": [],
  "compatibilityLevel": "1.1"
}
```

Destination fields used in DirectIngestion mode:

| Field | Value source |
|---|---|
| `workspaceId` | Eventhouse workspace ID from step 1 |
| `itemId` | Eventhouse item ID from step 1 |
| `connectionName` | Any unique name. A random suffix is recommended, for example `eventhouse-conn-7f3a`. |
| `tableName` | Table name from step 3 |
| `mappingRuleName` | Mapping rule name from step 3 |

### Encode the topology to Base64

```powershell
$json = Get-Content -Path "eventstream.json" -Raw
$bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
$base64Eventstream = [Convert]::ToBase64String($bytes)
```

### Sample request

The sample request includes a payload with Base64-encoded definition parts.

```json
{
  "displayName": "myEventstream",
  "type": "Eventstream",
  "description": "Eventstream created by API in DirectIngestion mode",
  "definition": {
    "parts": [
      {
        "path": "eventstream.json",
        "payload": "<base64Eventstream>",
        "payloadType": "InlineBase64"
      },
      {
        "path": ".platform",
        "payload": "<base64Platform>",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

### Sample response

```http
null
```

## End-to-end checklist

1. Get a Fabric token (`aud = https://api.fabric.microsoft.com`).
1. Create Eventhouse and capture `workspaceId` and `itemId`.
1. Get `kqlDatabaseName` and `eventhouse-engine-endpoint`.
1. Get a Kusto token for `<eventhouse-engine-endpoint>`.
1. Create `tableName` and `mappingRuleName`.
1. Build and Base64-encode `eventstream.json`.
1. Create Eventstream and track operation status.

## Related content

- [Create Eventstream item with definition](api-create-with-definition.md)
- [Get Eventstream definition](api-get-eventstream-definition.md)
- [Update Eventstream definition](api-update-eventstream-definition.md)
- [Eventstream REST API](eventstream-rest-api.md)
