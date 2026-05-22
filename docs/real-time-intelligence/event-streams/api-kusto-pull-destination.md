---
title: Create an Eventstream with an Eventhouse DirectIngestion destination by using APIs
description: Learn how to use APIs to create an Eventhouse, create a KQL database with table and ingestion mapping in its definition, and create an Eventstream in DirectIngestion mode.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 04/07/2026
ms.search.form: Eventstream REST API
ai-usage: ai-assisted
---

# Create an eventstream with an eventhouse direct ingestion destination by using APIs

This article provides a step-by-step guide to create an Eventstream with an Eventhouse DirectIngestion destination by using APIs.

You complete three steps:

> [!div class="checklist"]
>
> - [Create an Eventhouse](/rest/api/fabric/eventhouse/items/create-eventhouse?tabs=HTTP).
> - [Create a KQL database](/rest/api/fabric/kqldatabase/items/create-kql-database?tabs=HTTP#create-a-readwrite-kql-database-with-definition-example) that includes the table and ingestion mapping in `DatabaseSchema.kql`.
> - [Create an item](/rest/api/fabric/core/items/create-item?tabs=HTTP) for Eventstream that uses Eventhouse DirectIngestion mode.

## Prerequisites

- You have access to a workspace with the **Fabric** capacity or **Fabric Trial** workspace type with Contributor or higher permissions.

## Authentication and permission requirements

To work with Fabric APIs, first get a Microsoft Entra ID token for the Fabric service, and then use that token in the Authorization header of the API call. You can get a Fabric token by using MSAL.NET.

**Get token using MSAL.NET**

If your application needs to access Fabric APIs using a **service principal**, you can use the MSAL.NET library to acquire an access token. Follow the [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart) to create a C# console app, which acquires a Microsoft Entra ID token by using the MSAL.NET library, and then uses the C# HttpClient to call the List Workspaces API.

> [!NOTE]
> If the Eventstream you create includes any sources that use a cloud connection, make sure the identity you use to get the token has permission to access that cloud connection, whether it's a service principal or a user.

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
  "displayName": "es-eh-demo"
}
```

If you need advanced provisioning by definition parts, use the Eventhouse definition contract in the reference docs.

### Response example

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "type": "Eventhouse",
  "displayName": "es-eh-demo",
  "description": "",
  "workspaceId": "00000000-0000-0000-0000-000000000000"
}
```

Capture the value for the next steps:

- Eventhouse item ID (`id`)

## Step 2: Create a KQL database with table and mapping in definition

Use the Fabric REST API to create the KQL database with its schema definition in a single call. This step uses only the Fabric API endpoints (no Eventhouse management endpoint calls are required). The new database is automatically added to the Eventhouse from Step 1 via `parentEventhouseItemId`, and the table and ingestion mapping are defined in `DatabaseSchema.kql`.

### API address and parameters

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/kqlDatabases
```

| Parameter | In | Required | Description |
|---|---|---|---|
| `workspaceId` | Path | Yes | The workspace ID where you created the Eventhouse in Step 1. This must be the same workspace. |

### Token

```http
Authorization: Bearer <fabric_access_token>
Content-Type: application/json
```

### Definition parts

Prepare two definition parts:

- `DatabaseProperties.json`: Binds the database to the Eventhouse from Step 1 using the `parentEventhouseItemId` field (this is the key connection between your database and eventhouse).
- `DatabaseSchema.kql`: Defines and creates the KQL table structure and ingestion mapping that will run automatically when the database is created.

`DatabaseProperties.json` example:

```json
{
  "databaseType": "ReadWrite",
  "parentEventhouseItemId": "<eventhouseItemId>",
  "oneLakeCachingPeriod": "P36500D",
  "oneLakeStandardStoragePeriod": "P36500D"
}
```

`DatabaseSchema.kql` example:

```kql
.create-merge table Orders (id:string, eventTime:datetime, amount:real)
.create-or-alter table Orders ingestion json mapping 'orders_json_map' "[{\"column\":\"id\",\"Properties\":{\"path\":\"$.id\"}},{\"column\":\"eventTime\",\"Properties\":{\"path\":\"$.eventTime\"}},{\"column\":\"amount\",\"Properties\":{\"path\":\"$.amount\"}}]"
```

### Encode definition parts to Base64

```powershell
$databaseProperties = @'
{
  "databaseType": "ReadWrite",
  "parentEventhouseItemId": "<eventhouseItemId>",
  "oneLakeCachingPeriod": "P36500D",
  "oneLakeStandardStoragePeriod": "P36500D"
}
'@

$databaseSchema = @'
.create-merge table Orders (id:string, eventTime:datetime, amount:real)
.create-or-alter table Orders ingestion json mapping 'orders_json_map' "[{\"column\":\"id\",\"Properties\":{\"path\":\"$.id\"}},{\"column\":\"eventTime\",\"Properties\":{\"path\":\"$.eventTime\"}},{\"column\":\"amount\",\"Properties\":{\"path\":\"$.amount\"}}]"
'@

$base64DatabaseProperties = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($databaseProperties))
$base64DatabaseSchema = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($databaseSchema))
```

### Request payload

```json
{
  "displayName": "es-kql-demo",
  "description": "KQL database created by API with schema definition",
  "definition": {
    "parts": [
      {
        "path": "DatabaseProperties.json",
        "payload": "<base64DatabaseProperties>",
        "payloadType": "InlineBase64"
      },
      {
        "path": "DatabaseSchema.kql",
        "payload": "<base64DatabaseSchema>",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

### Response

The API returns `202 Accepted` with a `Location` header for this long-running operation. Poll the endpoint in the `Location` header to check when the operation completes.

When the operation succeeds, the KQL database is created with the table `Orders` and the JSON ingestion mapping `orders_json_map` already configured.

Capture these values for Step 3:

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

### Eventstream topology payload

This sample payload uses `SampleData` as the source and `Eventhouse DirectIngestion` as the destination. Keep the destination properties aligned with your API version.

The topology defines three components:

| Component | Purpose |
|-----------|----------|
| `sources` | Input data source (in this example, a sample stock market data feed) |
| `streams` | Pipeline that routes data from sources to destinations, including default and derived streams |
| `destinations` | Output target where data flows (in this case, the eventhouse in direct ingestion mode) |

Make sure the `itemId` and `workspaceId` in your destination match the Eventhouse from Step 1, and the `tableName` and `mappingRuleName` match what you created in Step 2.

```json
{
  "sources": [
    {
      "name": "sample-data-source",
      "type": "SampleData",
      "properties": {
        "type": "StockMarket"
      }
    }
  ],
  "destinations": [
    {
      "name": "eventhouse-direct-ingestion",
      "type": "Eventhouse",
      "properties": {
        "dataIngestionMode": "DirectIngestion",
        "workspaceId": "<eventhouseWorkspaceId>",
        "itemId": "<eventhouseItemId>",
        "tableName": "Orders",
        "connectionName": "es-eh-conn-7f3a",
        "mappingRuleName": "orders_json_map"
      },
      "inputNodes": [
        {
          "name": "eventstream-main-stream"
        }
      ]
    }
  ],
  "streams": [
    {
      "name": "eventstream-main-stream",
      "type": "DefaultStream",
      "properties": {},
      "inputNodes": [
        {
          "name": "sample-data-source"
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
| `workspaceId` | The workspace ID where you created the Eventhouse in Step 1 |
| `itemId` | The Eventhouse item ID (`id`) returned in the Step 1 response |
| `connectionName` | Any unique name up to 40 characters. A random suffix is recommended, for example `es-eh-conn-7f3a`. |
| `tableName` | Table name from Step 2 |
| `mappingRuleName` | Mapping rule name from Step 2 |

### Encode the topology to Base64

```powershell
$json = Get-Content -Path "eventstream.json" -Raw
$bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
$base64Eventstream = [Convert]::ToBase64String($bytes)
```

### Sample request

The sample request includes a payload with two Base64-encoded definition parts: `eventstream.json` (the topology you defined above) and `.platform` (metadata file, required for all Fabric items).

```json
{
  "displayName": "es-directingest-demo",
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

To generate your own `.platform` payload value, do the following:

1. Create a `.platform` file by using the format shown in [Create Eventstream item with definition](api-create-with-definition.md).
1. Base64-encode the entire `.platform` file content by using the same approach shown in [Encode the topology to Base64](#encode-the-topology-to-base64).
1. Use the encoded string as the value for the `payload` field, replacing `<base64Platform>` in the sample request.

Example:

```json
{
  "path": ".platform",
  "payload": "ewogICIkc2NoZW1hIjogImh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vanNvbi1zY2hlbWFzL2ZhYnJpYy9naXRJbnRlZ3JhdGlvbi9wbGF0Zm9ybVByb3BlcnRpZXMvMi4wLjAvc2NoZW1hLmpzb24iLAogICJtZXRhZGF0YSI6IHsKICAgICJ0eXBlIjogIkV2ZW50c3RyZWFtIiwKICAgICJkaXNwbGF5TmFtZSI6ICJhbGV4LWVzMSIKICB9LAogICJjb25maWciOiB7CiAgICAidmVyc2lvbiI6ICIyLjAiLAogICAgImxvZ2ljYWxJZCI6ICIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiCiAgfQp9",
  "payloadType": "InlineBase64"
}
```

### Sample response

```http
202 Accepted
```

The API returns `202 Accepted` for this long-running operation. Depending on the client, the response body might be empty or might contain a literal `null`.
If the response includes a `Location` header, use it to poll for operation completion.

## End-to-end checklist

1. Get a Fabric token (`aud = https://api.fabric.microsoft.com`).
1. Create Eventhouse and capture `workspaceId` and `itemId`.
1. Create a KQL database with `DatabaseProperties.json` and `DatabaseSchema.kql`.
1. Build and Base64-encode `eventstream.json`.
1. Create Eventstream with an Eventhouse DirectIngestion destination.

## References

- [Eventhouse create API](/rest/api/fabric/eventhouse/items/create-eventhouse?tabs=HTTP)
- [Eventhouse definition](/rest/api/fabric/articles/item-management/definitions/eventhouse-definition)
- [Create KQL database API](/rest/api/fabric/kqldatabase/items/create-kql-database?tabs=HTTP#create-a-readwrite-kql-database-with-definition-example)
- [KQL database definition](/rest/api/fabric/articles/item-management/definitions/kql-database-definition)
- [Create item API (for Eventstream)](/rest/api/fabric/core/items/create-item?tabs=HTTP)
- [Eventstream definition template example](api-create-with-definition.md)

## Related content

- [Create Eventstream item with definition](api-create-with-definition.md)
- [Get Eventstream definition](api-get-eventstream-definition.md)
- [Update Eventstream definition](api-update-eventstream-definition.md)
- [Eventstream REST API](eventstream-rest-api.md)
