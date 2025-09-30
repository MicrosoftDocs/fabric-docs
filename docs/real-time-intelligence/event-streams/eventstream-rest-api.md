---
title: Eventstream REST API
description: Learn how to call APIs to create and manage an Eventstream item in Fabric workspace.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 09/08/2025
ms.search.form: Eventstream REST API
---

# Eventstream REST API

The Microsoft Fabric REST APIs enable you to automate Fabric procedures and processes, helping your organization complete tasks more efficiently and accurately. By automating these workflows, you can reduce errors, improve productivity, and achieve cost savings across your operations.

In Fabric, an **item** represents a set of capabilities within a specific experience. For example, Eventstream is an item under the Real-time Intelligence experience. Each item in Fabric is defined by an **item definition**—an object that outlines the structure, format, and key components that make up the item.

This article offers a comprehensive guide on using the Microsoft Fabric REST APIs to create and manage Eventstream items within your Fabric workspace. You find detailed specifications for each Eventstream API operation, along with instructions for setting up and configuring your API calls.

For a complete overview of Microsoft Fabric REST APIs, visit: [Using the Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis)

## Supported Eventstream APIs

Currently, Eventstream supports the following definition based APIs:

| APIs | Description |
| ----------- | ---------------------- |
| [Create Eventstream item with definition](api-create-with-definition.md) | Use to create an Eventstream item in the workspace with detailed information about its topology including source, destinations, operators, and streams. |
| [Get Eventstream item definition](api-get-eventstream-definition.md) | Use to get an Eventstream item definition with detailed information about its topology including source, destinations, operators, and streams. |
| [Update Eventstream item definition](api-update-eventstream-definition.md) | Use to update or edit an Eventstream item definition including source, destinations, operators, and streams. |

To manage your Eventstream items using CRUD operations, visit [Fabric REST APIs - Eventstream](/rest/api/fabric/eventstream/items). These APIs support the following operations:

* Create Eventstream
* Delete Eventstream
* Get Eventstream
* List Eventstreams
* Update Eventstream

## How to call Eventstream API?

### Step 1: Authenticate to Fabric

To work with Fabric APIs, you first need to get a Microsoft Entra token for Fabric service, then use that token in the authorization header of the API call. There are two options to acquire Microsoft Entra token.

**Option 1: Get token using MSAL.NET**

If your application needs to access Fabric APIs using a **service principal**, you can use the MSAL.NET library to acquire an access token. Follow the [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart) to create a C# console app, which acquires an Azure AD (AAD) token using MSAL.Net library, then use C# HttpClient to call List workspaces API.

**Option 2: Get token using the Fabric Portal**

You can use your Azure AD token to authenticate and test the Fabric APIs. Sign in into the Fabric Portal for the Tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

```
powerBIAccessToken
```

Copy the token and paste it into your application.

### Step 2: Prepare for an Eventstream body in JSON

Create a JSON payload that will be converted to base64 in the API request. The Eventstream item definition follows a graph-like structure and consists of the following components:

| **Field** | **Description** |
| --------  | ---------------- |
| [Sources](#sources) | Data sources that can be ingested into Eventstream for processing. Supported data sources include Azure streaming sources, third-party streaming sources, database CDC (change data capture), Azure Blob Storage events, and Fabric system events. |
| [Destinations](#destinations) | Endpoints within Fabric where processed data can be routed to, including Lakehouse, Eventhouse, Activator, and others. |
| [Operators](#operators) | Event processors that handle real-time data streams, such as Filter, Aggregate, Group By, and Join. |
| [Streams](#streams) | Data streams available for subscription and analysis in the Real-time Hub. There are two types of streams: default streams and derived streams. |

Use the [API templates in GitHub](https://github.com/microsoft/fabric-event-streams/blob/main/API%20Templates/eventstream-definition.json) to help define your Eventstream body.

You can refer to [this Swagger document](/rest/api/fabric/eventstream/topology/get-eventstream-topology?tabs=HTTP#definitions) for details on each API property, and it also guides you in defining an Eventstream API payload.

If you're using **Eventhouse direct ingestion mode** destination, ensure that the `connectionName` and `mappingRuleName` property is correctly specified. To find the correct `connectionName`, navigate to your Eventhouse KQL database, select **Data streams**, and copy the desired `connectionName`. For detailed instructions on creating ingestion mappings, see [Mapping with ingestionMappingReference](/kusto/management/mappings?#mapping-with-ingestionmappingreference).

For more details about defining an Eventstream item, check out [Eventstream item definition](#eventstream-item-definition) section.

**Example of Eventstream definition in JSON:**

```json
{
  "sources": [
    {
      "name": "SqlServerOnVmDbCdc",
      "type": "SQLServerOnVMDBCDC",
      "properties":
      {
        "dataConnectionId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
        "tableName": ""
      }
    }
  ],
  "destinations": [
    {
      "name": "Lakehouse",
      "type": "Lakehouse",
      "properties":
      {
        "workspaceId": "bbbb1111-cc22-3333-44dd-555555eeeeee",
        "itemId": "cccc2222-dd33-4444-55ee-666666ffffff",
        "schema": "",
        "deltaTable": "newTable",
        "minimumRows": 100000,
        "maximumDurationInSeconds": 120,
        "inputSerialization":
        {
          "type": "Json",
          "properties":
          {
            "encoding": "UTF8"
          }
        }
      },
      "inputNodes": [{"name": "derivedStream"}]
    }
  ],
  "streams": [
    {
      "name": "myEventstream-stream",
      "type": "DefaultStream",
      "properties":
      {},
      "inputNodes": [{"name": "SqlServerOnVmDbCdc"}]
    },
    {
      "name": "derivedStream",
      "type": "DerivedStream",
      "properties":
      {
        "inputSerialization":
        {
          "type": "Json",
          "properties":
          {
            "encoding": "UTF8"
          }
        }
      },
      "inputNodes": [{"name": "GroupBy"}]
    }
  ],
  "operators": [
    {
      "name": "GroupBy",
      "type": "GroupBy",
      "inputNodes": [{"name": "myEventstream-stream"}],
      "properties":
      {
        "aggregations": [
          {
            "aggregateFunction": "Average",
            "column":
            {
              "expressionType": "ColumnReference",
              "node": null,
              "columnName": "payload",
              "columnPathSegments": [{"field": "ts_ms"}]
            },
            "alias": "AVG_ts_ms"
          }
        ],
        "groupBy": [],
        "window":
        {
          "type": "Tumbling",
          "properties":
          {
            "duration":
            {
              "value": 5,
              "unit": "Minute"
            },
            "offset":
            {
              "value": 1,
              "unit": "Minute"
            }
          }
        }
      }
    }
  ],
  "compatibilityLevel": "1.1"
}
```

### Step 3: Create a base64 string of Eventstream JSON

Use a tool like [Base64 Encode and Decode](https://www.base64encode.org/) to convert the Eventstream JSON into base64 string.

:::image type="content" source="media/eventstream-rest-api/encode-eventstream-json.png" alt-text="A screenshot of encoding Eventstream JSON into base64 string." lightbox="media/eventstream-rest-api/encode-eventstream-json.png":::

### Step 4: Create the API request body

Use the Base64-encoded Eventstream JSON in the previous step as the content for the API request body.

Here’s an example of a payload with the Base64-encoded string:

```json
{
 "definition": {
  "parts": [
   {
    "path": "eventstream.json",
    "payload": "ewogICJzb3VyY2VzIjogWwogICAgewogICAgICAibmFtZSI6ICJTcWxTZXJ2ZXJPblZtRGJDZGMiLAogICAgICAidHlwZSI6ICJTUUxTZXJ2ZXJPblZNREJDREMiLAogICAgICAicHJvcGVydGllcyI6CiAgICAgIHsKICAgICAgICAiZGF0YUNvbm5lY3Rpb25JZCI6ICJhYWFhYWFhYS0wMDAwLTExMTEtMjIyMi1iYmJiYmJiYmJiYmIiLAogICAgICAgICJ0YWJsZU5hbWUiOiAiIgogICAgICB9CiAgICB9CiAgXSwKICAiZGVzdGluYXRpb25zIjogWwogICAgewogICAgICAibmFtZSI6ICJMYWtlaG91c2UiLAogICAgICAidHlwZSI6ICJMYWtlaG91c2UiLAogICAgICAicHJvcGVydGllcyI6CiAgICAgIHsKICAgICAgICAid29ya3NwYWNlSWQiOiAiYmJiYjExMTEtY2MyMi0zMzMzLTQ0ZGQtNTU1NTU1ZWVlZWVlIiwKICAgICAgICAiaXRlbUlkIjogImNjY2MyMjIyLWRkMzMtNDQ0NC01NWVlLTY2NjY2NmZmZmZmZiIsCiAgICAgICAgInNjaGVtYSI6ICIiLAogICAgICAgICJkZWx0YVRhYmxlIjogIm5ld1RhYmxlIiwKICAgICAgICAibWluaW11bVJvd3MiOiAxMDAwMDAsCiAgICAgICAgIm1heGltdW1EdXJhdGlvbkluU2Vjb25kcyI6IDEyMCwKICAgICAgICAiaW5wdXRTZXJpYWxpemF0aW9uIjoKICAgICAgICB7CiAgICAgICAgICAidHlwZSI6ICJKc29uIiwKICAgICAgICAgICJwcm9wZXJ0aWVzIjoKICAgICAgICAgIHsKICAgICAgICAgICAgImVuY29kaW5nIjogIlVURjgiCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICB9LAogICAgICAiaW5wdXROb2RlcyI6IFt7Im5hbWUiOiAiZGVyaXZlZFN0cmVhbSJ9XQogICAgfQogIF0sCiAgInN0cmVhbXMiOiBbCiAgICB7CiAgICAgICJuYW1lIjogIm15RXZlbnRzdHJlYW0tc3RyZWFtIiwKICAgICAgInR5cGUiOiAiRGVmYXVsdFN0cmVhbSIsCiAgICAgICJwcm9wZXJ0aWVzIjoKICAgICAge30sCiAgICAgICJpbnB1dE5vZGVzIjogW3sibmFtZSI6ICJTcWxTZXJ2ZXJPblZtRGJDZGMifV0KICAgIH0sCiAgICB7CiAgICAgICJuYW1lIjogImRlcml2ZWRTdHJlYW0iLAogICAgICAidHlwZSI6ICJEZXJpdmVkU3RyZWFtIiwKICAgICAgInByb3BlcnRpZXMiOgogICAgICB7CiAgICAgICAgImlucHV0U2VyaWFsaXphdGlvbiI6CiAgICAgICAgewogICAgICAgICAgInR5cGUiOiAiSnNvbiIsCiAgICAgICAgICAicHJvcGVydGllcyI6CiAgICAgICAgICB7CiAgICAgICAgICAgICJlbmNvZGluZyI6ICJVVEY4IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgfSwKICAgICAgImlucHV0Tm9kZXMiOiBbeyJuYW1lIjogIkdyb3VwQnkifV0KICAgIH0KICBdLAogICJvcGVyYXRvcnMiOiBbCiAgICB7CiAgICAgICJuYW1lIjogIkdyb3VwQnkiLAogICAgICAidHlwZSI6ICJHcm91cEJ5IiwKICAgICAgImlucHV0Tm9kZXMiOiBbeyJuYW1lIjogIm15RXZlbnRzdHJlYW0tc3RyZWFtIn1dLAogICAgICAicHJvcGVydGllcyI6CiAgICAgIHsKICAgICAgICAiYWdncmVnYXRpb25zIjogWwogICAgICAgICAgewogICAgICAgICAgICAiYWdncmVnYXRlRnVuY3Rpb24iOiAiQXZlcmFnZSIsCiAgICAgICAgICAgICJjb2x1bW4iOgogICAgICAgICAgICB7CiAgICAgICAgICAgICAgImV4cHJlc3Npb25UeXBlIjogIkNvbHVtblJlZmVyZW5jZSIsCiAgICAgICAgICAgICAgIm5vZGUiOiBudWxsLAogICAgICAgICAgICAgICJjb2x1bW5OYW1lIjogInBheWxvYWQiLAogICAgICAgICAgICAgICJjb2x1bW5QYXRoU2VnbWVudHMiOiBbeyJmaWVsZCI6ICJ0c19tcyJ9XQogICAgICAgICAgICB9LAogICAgICAgICAgICAiYWxpYXMiOiAiQVZHX3RzX21zIgogICAgICAgICAgfQogICAgICAgIF0sCiAgICAgICAgImdyb3VwQnkiOiBbXSwKICAgICAgICAid2luZG93IjoKICAgICAgICB7CiAgICAgICAgICAidHlwZSI6ICJUdW1ibGluZyIsCiAgICAgICAgICAicHJvcGVydGllcyI6CiAgICAgICAgICB7CiAgICAgICAgICAgICJkdXJhdGlvbiI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAidmFsdWUiOiA1LAogICAgICAgICAgICAgICJ1bml0IjogIk1pbnV0ZSIKICAgICAgICAgICAgfSwKICAgICAgICAgICAgIm9mZnNldCI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAidmFsdWUiOiAxLAogICAgICAgICAgICAgICJ1bml0IjogIk1pbnV0ZSIKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgIH0KICAgICAgfQogICAgfQogIF0sCiAgImNvbXBhdGliaWxpdHlMZXZlbCI6ICIxLjEiCn0=",
    "payloadType": "InlineBase64"
   },
   {
    "path": ".platform",
    "payload": "ewogICIkc2NoZW1hIjogImh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vanNvbi1zY2hlbWFzL2ZhYnJpYy9naXRJbnRlZ3JhdGlvbi9wbGF0Zm9ybVByb3BlcnRpZXMvMi4wLjAvc2NoZW1hLmpzb24iLAogICJtZXRhZGF0YSI6IHsKICAgICJ0eXBlIjogIkV2ZW50c3RyZWFtIiwKICAgICJkaXNwbGF5TmFtZSI6ICJhbGV4LWVzMSIKICB9LAogICJjb25maWciOiB7CiAgICAidmVyc2lvbiI6ICIyLjAiLAogICAgImxvZ2ljYWxJZCI6ICIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiCiAgfQp9",
    "payloadType": "InlineBase64"
   }
  ]
 }
}

```

### Step 5: Create an Eventstream item using API

In your application, send a request to create an Eventstream item with the Base64-encoded string in the payload.

**PowerShell Example:**

```powershell
$evenstreamAPI = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/items" 

## Invoke the API to create the Eventstream
Invoke-RestMethod -Headers $headerParams -Method POST -Uri $evenstreamAPI -Body ($body) -ContentType "application/json"

```

## Eventstream item definition

The Eventstream item definition has a graph-like structure consisting of four components: sources, destinations, operators, and streams.

### Sources

To define an Eventstream source in the API body, make sure each field and property is specified correctly according to the table.

| **Field** | **Type** | **Description**  | **Requirement**  | **Allowed Values / Format**  |
|-----------|----------|------------------|------------------|-------------------------|
| `id`      | String (UUID)  | The unique identifier of the source, generated by the system.   | Optional in **CREATE**, required in **UPDATE** | UUID format    |
| `name`       | String         | A unique name for the source, used to identify it within Eventstream.  | Required  | Any valid string  |
| `type` | String (enum) | Specifies the type of source. Must match one of the predefined values. | Required | `AmazonKinesis`, `AmazonMSKKafka`, `ApacheKafka`, `AzureCosmosDBCDC`,`AzureBlobStorageEvents`, `AzureEventHub`, `AzureIoTHub`, `AzureSQLDBCDC`, `AzureSQLMIDBCDC`, `ConfluentCloud`, `CustomEndpoint`, `FabricCapacityUtilizationEvents`, `GooglePubSub`, `MySQLCDC`, `PostgreSQLCDC`, `SampleData`, `FabricWorkspaceItemEvents`, `FabricJobEvents`, `FabricOneLakeEvents` |
| `properties` | Object         | Other settings specific to the selected source type. | Required                            | Example for `AzureEventHub` type: `dataConnectionId`,`consumerGroupName`,`inputSerialization`   |

---

Example of Eventstream source in API body:

```json
{
  "sources": [
    {
      "id": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
      "name": "AzureEventHubSource",
      "type": "AzureEventHub",
      "properties":
      {
        "dataConnectionId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
        "consumerGroupName": "$Default",
        "inputSerialization":
        {
          "type": "Json",
          "properties":
          {
            "encoding": "UTF8"
          }
        }
      }
    }
  ]
}
```

### Destinations

To define an Eventstream destination in the API body, make sure each field and property is specified correctly according to the table.

| **Field** | **Type** | **Description**  | **Requirement**  | **Allowed Values / Format**  |
|-----------|----------|------------------|------------------|-------------------------|
| `id`      | String (UUID)  | The unique identifier of the destination, generated by the system.   | Optional in **CREATE**, required in **UPDATE** | UUID format    |
| `name`       | String         | A unique name for the destination, used to identify it within Eventstream.  | Required  | Any valid string  |
| `type` | String (enum) | Specifies the type of destination. Must match one of the predefined values. | Required | `"Activator"`, `"CustomEndpoint"`, `"Eventhouse"`, `"Lakehouse"` |
| `properties` | Object         | Other settings specific to the selected destination type. | Required    | Example for `Eventhouse` type: `"dataIngestionMode"`, `"workspaceId"`, `"itemId"`, `"databaseName"`  |
| `inputNodes` | Array         | A reference to the input nodes for the destination, such as your Eventstream name or an operator name. | Required     | Example: `eventstream-1`   |

Again, if you're using **Eventhouse direct ingestion mode** destination, ensure that the `connectionName` and `mappingRuleName` property is correctly specified. To find the correct `connectionName`, navigate to your Eventhouse KQL database, select **Data streams**, and copy the desired `connectionName`. For detailed instructions on creating ingestion mappings, see [Mapping with ingestionMappingReference](/kusto/management/mappings?#mapping-with-ingestionmappingreference).

---

Example of Eventstream source in API body:

```json
{
  "destinations": [
    {
      "id": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
      "name": "EventhouseDestination",
      "type": "Eventhouse",
      "properties":
      {
        "dataIngestionMode": "ProcessedIngestion",
        "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
        "itemId": "cccc2222-dd33-4444-55ee-666666ffffff",
        "databaseName": "myeventhouse",
        "tableName": "mytable",
        "inputSerialization":
        {
          "type": "Json",
          "properties":
          {
            "encoding": "UTF8"
          }
        }
      },
      "inputNodes": [{"name": "eventstream-1"}]
    }
  ]
}
```

### Operators

To define an Eventstream operator in the API body, make sure each field and property is specified correctly according to the table.

| **Field** | **Type** | **Description**  | **Requirement**  | **Allowed Values / Format**  |
|-----------|----------|------------------|------------------|-------------------------|
| `name`       | String         | A unique name for the operator. | Required  | Any valid string  |
| `type`       | String (enum)  | Specifies the type of operator. Must match one of the predefined values.   | Required   | `"Filter"`, `"Join"`, `"ManageFields"`, `"Aggregate"`, `"GroupBy"`, `"Union"`, `"Expand"` |
| `properties` | Object         | Other settings specific to the selected operator type. | Required    | Example for `Filter` type: `"conditions"` |
| `inputNodes` | Array          | A list of references to the input nodes of the operator. | Required     | Example: `eventstream-1`   |
| `inputSchemas` | Array          | A list of references to the input nodes of the operator. | Optional     | Example for `Filter` type: `"schema"`  |

---

Example of Eventstream operator in API body:

```json
{
  "operators": [
    {
      "name": "FilterName",
      "type": "Filter",
      "inputNodes": [{"name": "eventstream-1"}],
      "properties":
      {
        "conditions": [
          {
            "column":
            {
              "node": "nodeName",
              "columnName": "columnName",
              "columnPath": ["path","to","column"]
            },
            "operator": "Equals",
            "value":
            {
              "dataType": "nvarchar(max)",
              "value": "stringValue"
            }
          }
        ]
      }
    }
  ]
}
```

### Streams

To define a stream in the API body, make sure each field and property is specified correctly according to the table.

| **Field** | **Type** | **Description**  | **Requirement**  | **Allowed Values / Format**  |
|-----------|----------|------------------|------------------|-------------------------|
| `id`      | String (UUID)  | The unique identifier of the stream, generated by the system.   | Optional | UUID format    |
| `name`       | String         | A unique name for the stream. | Required  | Any valid string  |
| `type` | String (enum)   |  Specifies the type of stream. Must match one of the predefined values.   | Required   | `"DefaultStream"`, `"DerivedStream"` |
| `properties` | Object         | Other settings specific to the selected stream type. | Required    | Example for `Filter` type: `"conditions"` |
| `inputNodes` | Array          | A list of references to the input nodes of the stream. | Optional     | Example: `[]`, `"eventstream-1"`   |

---

Example of stream in API body:

```json
{
  "streams": [
    {
      "name": "myEventstream-stream",
      "type": "DefaultStream",
      "properties":
      {},
      "inputNodes": [{"name": "sourceName"}]
    },
    {
      "name": "DerivedStreamName",
      "type": "DerivedStream",
      "properties":
      {
        "inputSerialization":
        {
          "type": "Json",
          "properties":
          {
            "encoding": "UTF8"
          }
        }
      },
      "inputNodes": [{"name": "FilterName"}]
    }
  ]
}
```

## Related content

* [Using the Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis)
* [Eventstream item definition](/rest/api/fabric/articles/item-management/definitions/eventstream-definition)