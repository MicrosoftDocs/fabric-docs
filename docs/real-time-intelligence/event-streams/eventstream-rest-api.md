---
title: Eventstream REST API
description: Learn how to call APIs to create and manage an Eventstream item in Fabric workspace. 
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 10/30/2024
ms.search.form: Eventstream REST API
---

# Eventstream REST API

This article provides a detailed specification for the Eventstream REST API and guides you on how to use Microsoft Fabric REST APIs to create and manage Eventstream items within a Fabric workspace.

For more information on Fabric REST APIs, visit: [Using the Microsoft Fabric REST APIs](/fabric-rest-apis-docs/blob/live/docs-ref-conceptual/using-fabric-apis.md)

Currently, Eventstream supports the following operations for creating and managing Eventstream items using REST API:

| API | Description |
| ----------- | ---------------------- |
| Create Eventstream with Definition | Use to get an Eventstream item definition with detailed information about its topology including source, destinations, operators, and streams |
| Get Eventstream Definition | Use to get an Eventstream item definition with detailed information about its topology including source, destinations, operators, and streams |
| Update Eventstream Definition | Use to update or edit an Eventstream item definition including source, destinations, operators, and streams |

## Eventstream item definition

In Fabric, an item represents a set of capabilities within a specific experience. For example, Eventstream is an item within the Real-time Intelligence experience. Users can create, edit, and delete items, with each item type offering different capabilities.

The Eventstream item definition follows a graph-like structure and consists of the following components:

```json

{
    "sources": "List of object (required) - Data sources that can be ingested into Eventstream for processing. This includes Azure streaming sources, third-party streaming sources, database CDC (change data capture), Azure Blob Storage events, and Fabric system events.",
    "operators": "List of object (required) - Event processors that handle real-time data streams, such as Filter, Aggregate, Group By, and Join.",
    "destinations": "List of object (required) - Endpoints within Fabric where processed data can be routed to, including Lakehouse, Eventhouse, Reflex, and others.",
    "streams": "List of object (required) - Data streams available for subscription and analysis in the Real-time Hub. There are two types of streams: default streams and derived streams."
}

```

To create and manage an Eventstream item using API, you need to structure the API body and specify the values for each field. Then use [Base64 Encode and Decode](https://www.base64encode.org/) to encode your payload in the API call. Here's an example of Eventstream API body with base64 decoded:

```json
{
  "sources": [
    {
      "id": "1c2f8876-0616-4936-b44a-c96f153c5a09",
      "name": "AzureEventHub",
      "type": "AzureEventHub",
      "properties": {
        "dataConnectionId": "7b8187ad-4d58-4dc9-a953-4f6ac3636bef",
        "consumerGroupName": "$Default",
        "inputSerialization": {
          "type": "Json",
          "properties": {
            "encoding": "UTF8"
          }
        }
      }
    }
  ],
  "destinations": [
    {
      "id": "d843812d-c7b4-4bec-ae8c-74a553d07c66",
      "name": "kql",
      "type": "Eventhouse",
      "properties": {
        "dataIngestionMode": "ProcessedIngestion",
        "workspaceId": "0a47cd64-0aaf-488b-8038-4816153bd14b",
        "itemId": "5726a793-ccf2-4dd9-ac84-ec8f74aa22a2",
        "databaseName": "alex-eh2",
        "tableName": "table1016",
        "inputSerialization": {
          "type": "Json",
          "properties": {
            "encoding": "UTF8"
          }
        }
      },
      "inputNodes": []
    }
  ],
  "streams": [],
  "operators": [
    {
      "name": "Filter",
      "type": "Filter",
      "inputNodes": [
        {
          "name": "eventstream-1"
        }
      ],
      "properties": {
        "conditions": [
          {
            "column": {
              "expressionType": "ColumnReference",
              "node": null,
              "columnName": "BikepointID",
              "columnPathSegments": []
            },
            "operatorType": "NotEquals",
            "value": {
              "expressionType": "Literal",
              "dataType": "Nvarchar(max)",
              "value": "0"
            }
          }
        ]
      },
      "inputSchemas": [
        {
          "name": "alex-oct-stream",
          "schema": {
            "columns": [
              {
                "name": "BikepointID",
                "type": "Nvarchar(max)",
                "fields": null,
                "items": null
              },
              {
                "name": "Street",
                "type": "Nvarchar(max)",
                "fields": null,
                "items": null
              },
              {
                "name": "Latitude",
                "type": "Float",
                "fields": null,
                "items": null
              },
              {
                "name": "Longitude",
                "type": "Float",
                "fields": null,
                "items": null
              },
              {
                "name": "No_Bikes",
                "type": "BigInt",
                "fields": null,
                "items": null
              }
            ]
          }
        }
      ]
    }
   ],
  "compatibilityLevel": "1.0"
}
```

### Source

To define an Eventstream source in the API body, make sure each field and property is specified correctly according to the table.

| **Field** | **Type** | **Description**  | **Requirement**  | **Allowed Values / Format**  |
|-----------|----------|------------------|------------------|-------------------------|
| `id`      | String (UUID)  | The unique identifier of the source, generated by the system.   | Optional in **CREATE**, required in **UPDATE** | UUID format    |
| `name`       | String         | A unique name for the source, used to identify it within Eventstream.  | Required  | Any valid string  |
| `type`       | String (enum)  | Specifies the type of source. Must match one of the predefined values.    | Required   | `"AmazonKinesis"`, `"AmazonMSKKafka"`, `"ApacheKafka"`, `"AzureCosmosDBCDC"`, `"AzureEventHub"`, `"AzureIoTHub"`, `"AzureSQLDBCDC"`, `"AzureSQLMIDBCDC"`, `"ConfluentCloud"`, `"CustomEndpoint"`, `"GooglePubSub"`, `"MySQLCDC"`, `"PostgreSQLCDC"`, `"SampleData"` |
| `properties` | Object         | Other settings specific to the selected source type. | Required                            | Example for `AzureEventHub` type: `dataConnectionId`,`consumerGroupName`,`inputSerialization`   |

---

Example of Eventstream source in API body:

```json
{
  "sources": [
    {
      "id": "1c2f8876-0616-4936-b44a-c96f153c5a09",
      "name": "AzureEventHub",
      "type": "AzureEventHub",
      "properties": {
        "dataConnectionId": "7b8187ad-4d58-4dc9-a953-4f6ac3636bef",
        "consumerGroupName": "$Default",
        "inputSerialization": {
          "type": "Json",
          "properties": {
            "encoding": "UTF8"
          }
        }
      }
    }
  ]
}
```

### Destination

To define an Eventstream destination in the API body, make sure each field and property is specified correctly according to the table.

| **Field** | **Type** | **Description**  | **Requirement**  | **Allowed Values / Format**  |
|-----------|----------|------------------|------------------|-------------------------|
| `id`      | String (UUID)  | The unique identifier of the destination, generated by the system.   | Optional in **CREATE**, required in **UPDATE** | UUID format    |
| `name`       | String         | A unique name for the destination, used to identify it within Eventstream.  | Required  | Any valid string  |
| `type`       | String (enum)  | Specifies the type of destination. Must match one of the predefined values.    | Required   | `"CustomEndpoint"`, `"Eventhouse"`, `"Lakehouse"` |
| `properties` | Object         | Other settings specific to the selected destination type. | Required    | Example for `Eventhouse` type: `"dataIngestionMode"`, `"workspaceId"`, `"itemId"`, `"databaseName"`  |
| `inputNodes` | Array         | A reference to the input nodes for the destination, such as your Eventstream name or an operator name. | Required     | Example: `eventstream-1`   |

---

Example of Eventstream source in API body:

```json
{
  "destinations": [
    {
      "id": "d843812d-c7b4-4bec-ae8c-74a553d07c66",
      "name": "kql",
      "type": "Eventhouse",
      "properties": {
        "dataIngestionMode": "ProcessedIngestion",
        "workspaceId": "0a47cd64-0aaf-488b-8038-4816153bd14b",
        "itemId": "5726a793-ccf2-4dd9-ac84-ec8f74aa22a2",
        "databaseName": "alex-eh2",
        "tableName": "table1016",
        "inputSerialization": {
          "type": "Json",
          "properties": {
            "encoding": "UTF8"
          }
        }
      },
      "inputNodes": [
         {
            "name": "eventstream-1"
         }
      ]
    }
  ]
}
```

### Operator

To define an Eventstream operator in the API body, make sure each field and property is specified correctly according to the table.

| **Field** | **Type** | **Description**  | **Requirement**  | **Allowed Values / Format**  |
|-----------|----------|------------------|------------------|-------------------------|
| `name`       | String         | A unique name for the operator. | Required  | Any valid string  |
| `type`       | String (enum)  | Specifies the type of operator. Must match one of the predefined values.   | Required   | `"Filter"`, `"Join"`, `"ManageFields"`, `"Aggregate"`, `"GroupBy"`, `"Union"`, `"Expand"` |
| `properties` | Object         | Other settings specific to the selected operator type. | Required    | Example for `Filter` type: `"conditions"` |
| `inputNodes` | Array          | A list of references to the input nodes of the operator. | Required     | Example: `eventstream-1`   |
| `inputSchemas` | Array          | A list of references to the input nodes of the operator. | Required     | Example for `Filter` type: `"schema"`  |

---

Example of Eventstream operator in API body:

```json
{
  "inputSchemas": [
        {
          "name": "alex-oct-stream",
          "schema": {
            "columns": [
              {
                "name": "BikepointID",
                "type": "Nvarchar(max)",
                "fields": null,
                "items": null
              },
              {
                "name": "Street",
                "type": "Nvarchar(max)",
                "fields": null,
                "items": null
              },
              {
                "name": "Latitude",
                "type": "Float",
                "fields": null,
                "items": null
              },
              {
                "name": "Longitude",
                "type": "Float",
                "fields": null,
                "items": null
              },
              {
                "name": "No_Bikes",
                "type": "BigInt",
                "fields": null,
                "items": null
              }
            ]
          }
        }
  ]
}
```

### Stream

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
      "id": "e6236b9f-e921-4cb4-9e38-a61186ea381e",
      "name": "stream-1",
      "type": "DefaultStream",
      "properties": {},
      "inputNodes": [
        {
          "name": "bike"
        }
      ]
    }
  ],
}
```

## Authentication

To work with Fabric APIs, you first need to get a Microsoft Entra token for Fabric service, then use that token in the authorization header of the API call. There are two options to acquire Microsoft Entra token.

### Option 1: Get token using MSAL.NET

Follow the [Fabric API quickstart](/docs-ref-conceptual/get-started/fabric-API-quickstart.md) to create a C# console app, which acquires an Azure AD (AAD) token using MSAL.Net library, then use C# HttpClient to call List workspaces API.

### Option 2: Get token using the Fabric Portal

Sign in into the Fabric Portal for the Tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

```
powerBIAccessToken
```

Copy the token and paste it into your application.

## Create Eventstream item with Definition

### Request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items
```

### Example of payload content decoded from Base64

```json
{
  "sources": [
    {
      "name": "AzureEventHub",
      "type": "AzureEventHub",
      "properties": {
        "dataConnectionId": "7b8187ad-4d58-4dc9-a953-4f6ac3636bef",
        "consumerGroupName": "$Default",
        "inputSerialization": {
          "type": "Json",
          "properties": {
            "encoding": "UTF8"
          }
        }
      }
    }
  ],
  "destinations": [
    {
      "name": "kql",
      "type": "Eventhouse",
      "properties": {
        "dataIngestionMode": "ProcessedIngestion",
        "workspaceId": "0a47cd64-0aaf-488b-8038-4816153bd14b",
        "itemId": "5726a793-ccf2-4dd9-ac84-ec8f74aa22a2",
        "databaseName": "alex-eh2",
        "tableName": "table1016",
        "inputSerialization": {
          "type": "Json",
          "properties": {
            "encoding": "UTF8"
          }
        }
      },
      "inputNodes": []
    }
  ],
  "streams": [],
  "operators": [],
  "compatibilityLevel": "1.0"
}

```

### Response

```json
{
   "202": {
      "headers": {
            "Location": "https://api.fabric.microsoft.com/v1/operations/0acd697c-1550-43cd-b998-91bfbfbd47c6",
            "x-ms-operation-id": "0acd697c-1550-43cd-b998-91bfbfbd47c6",
            "Retry-After": 30
      }
   }
}

```

## Get Eventstream definition

### Request

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/eventstreams/{eventstreamId}/getDefinition
```

### Response

```JSON
{
 "definition": {
  "parts": [
   {
    "path": "eventstream.json",
    "payload": "ew0KICAic291cmNlcyI6IFsNCiAgICB7DQogICAgICAiaWQiOiAiMWMyZjg4NzYtMDYxNi00OTM2LWI0NGEtYzk2ZjE1M2M1YTA5IiwNCiAgICAgICJuYW1lIjogIkF6dXJlRXZlbnRIdWIiLA0KICAgICAgInR5cGUiOiAiQXp1cmVFdmVudEh1YiIsDQogICAgICAicHJvcGVydGllcyI6IHsNCiAgICAgICAgImRhdGFDb25uZWN0aW9uSWQiOiAiN2I4MTg3YWQtNGQ1OC00ZGM5LWE5NTMtNGY2YWMzNjM2YmVmIiwNCiAgICAgICAgImNvbnN1bWVyR3JvdXBOYW1lIjogIiREZWZhdWx0IiwNCiAgICAgICAgImlucHV0U2VyaWFsaXphdGlvbiI6IHsNCiAgICAgICAgICAidHlwZSI6ICJKc29uIiwNCiAgICAgICAgICAicHJvcGVydGllcyI6IHsNCiAgICAgICAgICAgICJlbmNvZGluZyI6ICJVVEY4Ig0KICAgICAgICAgIH0NCiAgICAgICAgfQ0KICAgICAgfQ0KICAgIH0NCiAgXSwNCiAgImRlc3RpbmF0aW9ucyI6IFsNCiAgICB7DQogICAgICAiaWQiOiAiZDg0MzgxMmQtYzdiNC00YmVjLWFlOGMtNzRhNTUzZDA3YzY2IiwNCiAgICAgICJuYW1lIjogImtxbCIsDQogICAgICAidHlwZSI6ICJFdmVudGhvdXNlIiwNCiAgICAgICJwcm9wZXJ0aWVzIjogew0KICAgICAgICAiZGF0YUluZ2VzdGlvbk1vZGUiOiAiUHJvY2Vzc2VkSW5nZXN0aW9uIiwNCiAgICAgICAgIndvcmtzcGFjZUlkIjogIjBhNDdjZDY0LTBhYWYtNDg4Yi04MDM4LTQ4MTYxNTNiZDE0YiIsDQogICAgICAgICJpdGVtSWQiOiAiNTcyNmE3OTMtY2NmMi00ZGQ5LWFjODQtZWM4Zjc0YWEyMmEyIiwNCiAgICAgICAgImRhdGFiYXNlTmFtZSI6ICJhbGV4LWVoMiIsDQogICAgICAgICJ0YWJsZU5hbWUiOiAidGFibGUxMDE2IiwNCiAgICAgICAgImlucHV0U2VyaWFsaXphdGlvbiI6IHsNCiAgICAgICAgICAidHlwZSI6ICJKc29uIiwNCiAgICAgICAgICAicHJvcGVydGllcyI6IHsNCiAgICAgICAgICAgICJlbmNvZGluZyI6ICJVVEY4Ig0KICAgICAgICAgIH0NCiAgICAgICAgfQ0KICAgICAgfSwNCiAgICAgICJpbnB1dE5vZGVzIjogW10NCiAgICB9DQogIF0sDQogICJzdHJlYW1zIjogW10sDQogICJvcGVyYXRvcnMiOiBbXSwNCiAgImNvbXBhdGliaWxpdHlMZXZlbCI6ICIxLjAiDQp9",
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


## Update Eventstream definition

### Request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items
```

### Example of payload content decoded from Base64

```json
{
  "sources": [
    {
      "id": "1c2f8876-0616-4936-b44a-c96f153c5a09",
      "name": "AzureEventHub",
      "type": "AzureEventHub",
      "properties": {
        "dataConnectionId": "7b8187ad-4d58-4dc9-a953-4f6ac3636bef",
        "consumerGroupName": "$Default",
        "inputSerialization": {
          "type": "Json",
          "properties": {
            "encoding": "UTF8"
          }
        }
      }
    }
  ],
  "destinations": [
    {
      "id": "7f9c8876-0616-4936-b44a-c96f153c9bv0",
      "name": "kql",
      "type": "Eventhouse",
      "properties": {
        "dataIngestionMode": "ProcessedIngestion",
        "workspaceId": "0a47cd64-0aaf-488b-8038-4816153bd14b",
        "itemId": "5726a793-ccf2-4dd9-ac84-ec8f74aa22a2",
        "databaseName": "alex-eh2",
        "tableName": "table1016",
        "inputSerialization": {
          "type": "Json",
          "properties": {
            "encoding": "UTF8"
          }
        }
      },
      "inputNodes": []
    }
  ],
  "streams": [],
  "operators": [],
  "compatibilityLevel": "1.0"
}

```

### Response

```json
{
   "202": {
      "headers": {
            "Location": "https://api.fabric.microsoft.com/v1/operations/0acd697c-1550-43cd-b998-91bfbfbd47c6",
            "x-ms-operation-id": "0acd697c-1550-43cd-b998-91bfbfbd47c6",
            "Retry-After": 30
      }
   }
}

```


## Related content

- [Eventstream definition](/rest/api/fabric/articles/item-management/definitions/eventstream-definition.md)
- [Using the Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis.md)
