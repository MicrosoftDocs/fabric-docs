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

This article provides a step-by-step guide to create an Eventstream with an Eventhouse DirectIngestion destination by using APIs.

You complete four steps:

> [!div class="checklist"]
>
> - Create an Eventhouse.
> - Get the KQL database properties.
> - Create a KQL table and ingestion mapping.
> - Create an Eventstream that uses Eventhouse DirectIngestion mode.

## Prerequisites

- You have access to a workspace with the **Fabric** capacity or **Fabric Trial** workspace type with Contributor or higher permissions.
- You have permissions to run Eventhouse management commands on the target KQL database.

## References

- [Eventhouse create API](/rest/api/fabric/eventhouse/items/create-eventhouse?tabs=HTTP)
- [Eventhouse definition](/rest/api/fabric/articles/item-management/definitions/eventhouse-definition)
- [Eventhouse REST API overview](/kusto/api/rest)
- [Eventstream create API](/rest/api/fabric/eventstream/items/create-eventstream?tabs=HTTP)
- [Eventstream definition template example](api-create-with-definition.md)

## Authentication and permission requirements

To work with Fabric APIs, first get a Microsoft Entra ID token for the Fabric service, and then use that token in the Authorization header of the API call. You can get a Fabric token by using MSAL.NET.

**Get token using MSAL.NET**

If your application needs to access Fabric APIs using a **service principal**, you can use the MSAL.NET library to acquire an access token. Follow the [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart) to create a C# console app, which acquires a Microsoft Entra ID token by using the MSAL.NET library, and then uses the C# HttpClient to call the List Workspaces API.

> [!NOTE]
> If the Eventstream you create includes any sources that use a cloud connection, make sure the identity you use to get the token has permission to access that cloud connection, whether it's a service principal or a user.

### Get an Eventhouse token for the management endpoint

Use an Eventhouse token, not a Fabric token, when your flow calls the Eventhouse management endpoint `/v1/rest/mgmt`.

Get the token for the Eventhouse engine endpoint returned in Step 2 (`properties.queryServiceUri`). For example:

```powershell
$clusterUrl = "https://exampleeventhouse.z3.kusto.fabric.microsoft.com"
$azToken = Get-AzAccessToken -ResourceUrl $clusterUrl
if ($azToken.Token -is [securestring]) {
  $kustoAccessToken = [System.Net.NetworkCredential]::new("", $azToken.Token).Password
}
else {
  $kustoAccessToken = $azToken.Token
}
```

Use `$kustoAccessToken` in the Authorization header for Eventhouse management API calls. For more information, see [Eventhouse REST request authentication](/kusto/api/rest/request).

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

If you prefer to manage permissions through the REST API, run the same KQL commands through the Eventhouse management endpoint.

For details, see:

- [Eventhouse REST API overview](/kusto/api/rest)
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

In this step, you get the KQL database ID and Eventhouse engine endpoint for use in the next step.

### API address and parameters

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/kqlDatabases
```

This endpoint returns all KQL databases in the workspace. Use the Eventhouse item ID from Step 1 to select the target database by matching `properties.parentEventhouseItemId`.

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

- `kqlDatabaseName` is `displayName`. Use this value for the `db` field in Eventhouse management request bodies.
- `eventhouse-engine-endpoint` is `properties.queryServiceUri`. Use this value for the next step.

## Step 3: Create table and mapping rule with Eventhouse REST API

### API address and parameters

```http
POST https://<eventhouse-engine-endpoint>/v1/rest/mgmt
```

| Parameter | In | Required | Description |
|---|---|---|---|
| `<eventhouse-engine-endpoint>` | URL host | Yes | The Eventhouse/Kusto engine endpoint. |

### Token
 
Use the Eventhouse token described in [Get an Eventhouse token for the management endpoint](#get-an-eventhouse-token-for-the-management-endpoint).

### Create table

You can create the table in Eventhouse UI or by calling the Eventhouse management endpoint.

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
$azToken = Get-AzAccessToken -ResourceUrl $clusterUrl
if ($azToken.Token -is [securestring]) {
  $token = [System.Net.NetworkCredential]::new("", $azToken.Token).Password
}
else {
  $token = $azToken.Token
}
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
- [Mapping with ingestionMappingReference](/kusto/management/mappings#mapping-with-ingestionmappingreference)

---

At this point, you have:

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

### Eventstream topology payload

This sample payload uses `SampleData` as the source and `Eventhouse DirectIngestion` as the destination. Keep the destination properties aligned with your API version.

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
| `connectionName` | Any unique name up to 40 characters. A random suffix is recommended, for example `eventhouse-conn-7f3a`. |
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

To generate your own `.platform` payload, do the following:

1. Create a `.platform` file by using the format shown in [Create Eventstream item with definition](api-create-with-definition.md).
1. Base64-encode the `.platform` file content by using the same approach shown in [Encode the topology to Base64](#encode-the-topology-to-base64).
1. Replace the example `.platform` payload value in the sample request with your encoded string.

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
1. Get `eventhouse-engine-endpoint`.
1. Get an Eventhouse token for `<eventhouse-engine-endpoint>`.
1. Create `tableName` and `mappingRuleName`.
1. Build and Base64-encode `eventstream.json`.
1. Create Eventstream with an Eventhouse DirectIngestion destination.

## Related content

- [Create Eventstream item with definition](api-create-with-definition.md)
- [Get Eventstream definition](api-get-eventstream-definition.md)
- [Update Eventstream definition](api-update-eventstream-definition.md)
- [Eventstream REST API](eventstream-rest-api.md)
