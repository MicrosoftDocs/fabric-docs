---
title: Create an API-only eventstream with an Eventhouse direct ingestion destination
description: Learn how to use APIs only to create an Eventhouse, create a KQL table and mapping, and create an Eventstream in DirectIngestion mode.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 04/07/2026
ms.search.form: Eventstream REST API
ai-usage: ai-assisted
---

# Create an API-only eventstream with an Eventhouse direct ingestion destination

This article shows a practical API-only flow to set up an eventstream that writes to Eventhouse in **DirectIngestion** mode.

You complete three steps:

1. Create an Eventhouse.
1. Create a KQL table and ingestion mapping.
1. Create an Eventstream that uses Eventhouse DirectIngestion.

Each step uses the same structure:

1. API URL.
1. Token.
1. Request payload.
1. Response example.

## Prerequisites

- You have a Fabric workspace ID.
- You have permissions to create Eventhouse and Eventstream items in that workspace.
- You have permissions to run Kusto management commands on the target KQL database.
- You can acquire Microsoft Entra bearer tokens for Fabric and Kusto endpoints.

## Required references

- Eventhouse create API: <https://review.learn.microsoft.com/en-us/rest/api/fabric/eventhouse/items/create-eventhouse?branch=main&tabs=HTTP>
- Eventhouse definition: <https://review.learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/eventhouse-definition?branch=main>
- Kusto REST API overview: <https://kusto.azurewebsites.net/docs/kusto/api/rest/index.html>
- Eventstream create API: <https://review.learn.microsoft.com/en-us/rest/api/fabric/eventstream/items/create-eventstream?branch=main&tabs=HTTP>
- Eventstream definition template: <https://github.com/microsoft/fabric-event-streams/blob/main/API%20Templates/eventstream-definition.json>

## Authentication and permission requirements

To work with Fabric APIs, first get a Microsoft Entra token for the Fabric service. Then use that token in the `Authorization` header of your API call:

```http
Authorization: Bearer <access_token>
```

You can acquire a Fabric token in two ways:

1. Get a token using MSAL.NET.

  If your application accesses Fabric APIs by using a service principal, use MSAL.NET to acquire an access token. Follow [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart) to create a C# console app that acquires a Microsoft Entra token and calls a Fabric API.

1. Get a token from the Fabric portal.

  For testing, sign in to Fabric portal for the target tenant, press `F12`, open the browser developer console, run `powerBIAccessToken`, then copy the returned token.

> [!NOTE]
> If the eventstream you create includes any sources that use a cloud connection, make sure the identity you use to get the token has permission to access that cloud connection, whether it's a service principal or a user.
>
> The preceding methods describe the token for Fabric item APIs (Eventhouse and Eventstream). If your flow calls Kusto management endpoint `/v1/rest/mgmt`, get and use the Kusto token by following [Kusto REST request authentication](/kusto/api/rest/request).

If you authenticate by using a service principal, grant the following KQL data-plane permissions:

- `Database viewer`
- `Table ingestor`

You can grant these permissions in either of the following ways.

### Using Eventhouse UI

Run the following KQL commands in the Eventhouse UI:

```kql
.add database ['yourDatabase'] viewers (@'aadapp=<clientid>;<tenantid>')
.add table yourTable ingestors (@'aadapp=<id>;<directoryid>')
```

Replace `clientid` and `tenantid` with your service principal values.

These commands grant the service principal the required data-plane permissions so Eventhouse can create the connection and pull data from Eventstream. For more information, see [Security roles overview](/kusto/management/security-roles).

### Using Eventhouse REST API

If you prefer to manage permissions through the REST API, run the same KQL commands through the Kusto management endpoint.

For details, see:

- [Kusto REST API overview](/kusto/api/rest)
- [Manage database security roles](/kusto/management/manage-database-security-roles)
- [Manage table security roles](/kusto/management/manage-table-security-roles)

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
  "id": "836f69f0-e5f8-492b-8f6d-4b35080b6599",
  "type": "Eventhouse",
  "displayName": "eh-api-demo",
  "description": "",
  "workspaceId": "acd1d595-3e0e-4dfa-b912-45b87a11558b"
}
```

Capture these values for the next steps:

- `workspaceId`
- Eventhouse item ID (`itemId`)

## Step 1.5: Get the KQL database ID

DirectIngestion payload needs both `kqlDatabaseId` and `kqlDatabaseName`.

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
      "id": "32c20c8f-15aa-4325-90b6-6ebb4c4b59cf",
      "type": "KQLDatabase",
      "displayName": "eh-api-demo",
      "description": "eh-api-demo",
      "workspaceId": "acd1d595-3e0e-4dfa-b912-45b87a11558b",
      "properties": {
        "parentEventhouseItemId": "836f69f0-e5f8-492b-8f6d-4b35080b6599",
        "queryServiceUri": "https://trd-n1uzagn9dwt2sgr4vb.z3.kusto.fabric.microsoft.com",
        "ingestionServiceUri": "https://ingest-trd-n1uzagn9dwt2sgr4vb.z3.kusto.fabric.microsoft.com",
        "databaseType": "ReadWrite"
      },
      "sensitivityLabel": {
        "sensitivityLabelId": "9fbde396-1a24-4c79-8edf-9254a0f35055"
      }
    }
  ]
}
```

In this response:

- `kqlDatabaseId` is `id`.
- `kqlDatabaseName` is `displayName`.

If the workspace has multiple KQL databases, use `properties.parentEventhouseItemId` to select the database that belongs to the Eventhouse created in Step 1.

## Step 2: Create table and mapping rule with Kusto REST API

### API address and parameters

```http
POST https://<eventhouse-engine-endpoint>/v1/rest/mgmt
```

| Parameter | In | Required | Description |
|---|---|---|---|
| `<eventhouse-engine-endpoint>` | URL host | Yes | The Eventhouse/Kusto engine endpoint. |

### Token

```http
Authorization: Bearer <kusto_access_token>
Content-Type: application/json
```

### Create table

You can create the table in Eventhouse UI or by calling the Kusto management endpoint.

For command details, see [Create table command](/kusto/management/create-table-command).

# [Using Eventhouse UI](#tab/using-eventhouse-ui)

Run this KQL command:

```kql
.create table Orders (id:string, eventTime:datetime, amount:real)
```

# [Using Eventhouse REST API](#tab/using-eventhouse-rest-api)

Call `POST https://<eventhouse-engine-endpoint>/v1/rest/mgmt` and submit the same `.create table` command in the `csl` field.

For API details, see:

- [Kusto REST API overview](/kusto/api/rest)
- [Kusto REST request authentication](/kusto/api/rest/request)
- [Create table command](/kusto/management/create-table-command)

---

### Create JSON mapping rule

# [Using Eventhouse UI](#tab/using-eventhouse-ui)

Run this KQL command:

```kql
.create table Orders ingestion json mapping 'orders_json_map' '[{"column":"id","path":"$.id"},{"column":"eventTime","path":"$.eventTime"},{"column":"amount","path":"$.amount"}]'
```

After the mapping is created, you can verify `ingestionMappingReference` usage with:

```kql
.ingest into table Orders (<data-source>) with (format="json", ingestionMappingReference="orders_json_map")
```

Replace `<data-source>` with your source path or URI.

# [Using Eventhouse REST API](#tab/using-eventhouse-rest-api)

Call `POST https://<eventhouse-engine-endpoint>/v1/rest/mgmt` and submit the same `.create table ... ingestion ... mapping` command in the `csl` field.

For API and mapping details, see:

- [Kusto REST API overview](/kusto/api/rest)
- [Kusto REST request authentication](/kusto/api/rest/request)
- [Create ingestion mapping command](/kusto/management/create-ingestion-mapping-command)
- [Mapping with ingestionMappingReference](/kusto/management/mappings?view=microsoft-fabric#mapping-with-ingestionmappingreference)

---

At this point you have:

- `tableName`: `Orders`
- `mappingRuleName`: `orders_json_map`

## Step 3: Create Eventstream in DirectIngestion mode

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
        "sampleDataType": "StockMarket"
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
        "kqlDatabaseId": "<kqlDatabaseId>",
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
| `kqlDatabaseId` | KQL database ID from step 1.5 |
| `connectionName` | Any unique name. A random suffix is recommended, for example `eventhouse-conn-7f3a`. |
| `tableName` | Table name from step 2 |
| `mappingRuleName` | Mapping rule name from step 2 |

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
Location: https://api.fabric.microsoft.com/v1/operations/ccccdddd-2222-eeee-3333-ffff4444aaaa
x-ms-operation-id: ccccdddd-2222-eeee-3333-ffff4444aaaa
Retry-After: 30
```

## End-to-end checklist

1. Get a Fabric token (`aud = https://api.fabric.microsoft.com`).
1. Create Eventhouse and capture `workspaceId` and `itemId`.
1. Get `kqlDatabaseId` and `kqlDatabaseName`.
1. Get a Kusto token for `<eventhouse-engine-endpoint>`.
1. Create `tableName` and `mappingRuleName`.
1. Build and Base64-encode `eventstream.json`.
1. Create Eventstream and track operation status.

## Related content

- [Create Eventstream item with definition](api-create-with-definition.md)
- [Get Eventstream definition](api-get-eventstream-definition.md)
- [Update Eventstream definition](api-update-eventstream-definition.md)
- [Eventstream REST API](eventstream-rest-api.md)
