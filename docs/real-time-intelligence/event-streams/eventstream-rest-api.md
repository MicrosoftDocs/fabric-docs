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

The Microsoft Fabric REST APIs enable you to automate Fabric procedures and processes, helping your organization complete tasks more efficiently and accurately. By automating these workflows, you can reduce errors, improve productivity, and achieve cost savings across your operations.

In Fabric, an **item** represents a set of capabilities within a specific experience. For example, Eventstream is an item under the Real-time Intelligence experience. Each item in Fabric is defined by an **item definition**—an object that outlines the structure, format, and key components that make up the item.

This article offers a comprehensive guide on using the Microsoft Fabric REST APIs to create and manage Eventstream items within your Fabric workspace. You find detailed specifications for each Eventstream API operation, along with instructions for setting up and configuring your API calls.

For a complete overview of Microsoft Fabric REST APIs, visit: [Using the Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis)

## Supported Eventstream APIs

Currently, Eventstream supports the following definition based APIs:

| APIs | Description |
| ----------- | ---------------------- |
| [Create Eventstream item with definition](#create-eventstream-item-with-definition) | Use to get an Eventstream item definition with detailed information about its topology including source, destinations, operators, and streams |
| [Get Eventstream item definition](#get-eventstream-item-definition) | Use to get an Eventstream item definition with detailed information about its topology including source, destinations, operators, and streams |
| [Update Eventstream item definition](#update-eventstream-item-definition) | Use to update or edit an Eventstream item definition including source, destinations, operators, and streams |

To manage your Eventstream items using CRUD operations, visit [Fabric REST APIs - Eventstream](/rest/api/fabric/eventstream/items). These APIs support the following operations:

* Create Eventstream
* Delete Eventstream
* Get Eventstream
* List Eventstreams
* Update Eventstream

## Authentication

To work with Fabric APIs, you first need to get a Microsoft Entra token for Fabric service, then use that token in the authorization header of the API call. There are two options to acquire Microsoft Entra token.

### Option 1: Get token using MSAL.NET

Follow the [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart) to create a C# console app, which acquires an Azure AD (AAD) token using MSAL.Net library, then use C# HttpClient to call List workspaces API.

### Option 2: Get token using the Fabric Portal

Sign in into the Fabric Portal for the Tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

```
powerBIAccessToken
```

Copy the token and paste it into your application.

## Define an Eventstream Item in the API Body

The Eventstream item definition follows a graph-like structure and consists of the following components:

| **Field** | **Description** |
| --------  | ---------------- |
| [Sources](#sources) | Data sources that can be ingested into Eventstream for processing. Supported data sources include Azure streaming sources, third-party streaming sources, database CDC (change data capture), Azure Blob Storage events, and Fabric system events. |
| [Destinations](#destinations) | Endpoints within Fabric where processed data can be routed to, including Lakehouse, Eventhouse, Reflex, and others. |
| [Operators](#operators) | Event processors that handle real-time data streams, such as Filter, Aggregate, Group By, and Join. |
| [Streams](#streams) | Data streams available for subscription and analysis in the Real-time Hub. There are two types of streams: default streams and derived streams. |

To create an Eventstream item through the API, you need to structure the API body carefully and assign values to each required field. You can use the provided [API templates in GitHub](https://github.com/microsoft/fabric-event-streams/blob/main/API%20Templates/eventstream-definition.json) to help define your Eventstream item. After preparing the API payload, use a tool like [Base64 Encode and Decode](https://www.base64encode.org/) to encode it before including it in the API call.

Here's an example of Eventstream API body with base64 decoded:

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
  ],
  "destinations": [
    {
      "id": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
      "name": "EventhouseDestination",
      "type": "Eventhouse",
      "properties":
      {
        "dataIngestionMode": "ProcessedIngestion",
        "workspaceId": "bbbb1111-cc22-3333-44dd-555555eeeeee",
        "itemId": "cccc2222-dd33-4444-55ee-666666ffffff",
        "databaseName": "mydatabase",
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
      "inputNodes": []
    }
  ],
  "streams": [],
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
              "expressionType": "ColumnReference",
              "node": null,
              "columnName": "BikepointID",
              "columnPathSegments": []
            },
            "operatorType": "NotEquals",
            "value":
            {
              "expressionType": "Literal",
              "dataType": "Nvarchar(max)",
              "value": "0"
            }
          }
        ]
      }
    }
  ],
  "compatibilityLevel": "1.0"
}
```

### Sources

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
| `type`       | String (enum)  | Specifies the type of destination. Must match one of the predefined values.    | Required   | `"CustomEndpoint"`, `"Eventhouse"`, `"Lakehouse"` |
| `properties` | Object         | Other settings specific to the selected destination type. | Required    | Example for `Eventhouse` type: `"dataIngestionMode"`, `"workspaceId"`, `"itemId"`, `"databaseName"`  |
| `inputNodes` | Array         | A reference to the input nodes for the destination, such as your Eventstream name or an operator name. | Required     | Example: `eventstream-1`   |

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
      "inputNodes": [],
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
      "id": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
      "name": "stream-1",
      "type": "DefaultStream",
      "properties":
      {},
      "inputNodes": [{"name": "bike"}]
    }
  ]
}
```

## Create Eventstream item with Definition

* **Request**

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items
    ```

* **Example of payload content decoded from Base64**

    ```json
    {
      "sources": [
        {
          "name": "AzureEventHubSource",
          "type": "AzureEventHub",
          "properties":
          {
            "dataConnectionId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
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
      ],
      "destinations": [
        {
          "name": "EventhouseDestination",
          "type": "Eventhouse",
          "properties":
          {
            "dataIngestionMode": "ProcessedIngestion",
            "workspaceId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
            "itemId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
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
          "inputNodes": []
        }
      ],
      "streams": [],
      "operators": [],
      "compatibilityLevel": "1.0"
    }
    
    ```

* **Response**

    ```json
    {
       "202": {
          "headers": {
                "Location": "https://api.fabric.microsoft.com/v1/operations/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
                "x-ms-operation-id": "bbbbbbbb-1111-2222-3333-cccccccccccc",
                "Retry-After": 30
          }
       }
    }
    
    ```

## Get Eventstream item definition

* **Request**

    ```http
    GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/eventstreams/{eventstreamId}/getDefinition
    ```

* **Response**

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

## Update Eventstream item definition

* **Request**

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items
    ```

* **Example of payload content decoded from Base64**

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
      ],
      "destinations": [
        {
          "id": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
          "name": "EventhouseDestination",
          "type": "Eventhouse",
          "properties":
          {
            "dataIngestionMode": "ProcessedIngestion",
            "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
            "itemId": "cccccccc-2222-3333-4444-dddddddddddd",
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
          "inputNodes": []
        }
      ],
      "streams": [],
      "operators": [],
      "compatibilityLevel": "1.0"
    }
    
    ```

* **Response**

    ```json
    {
       "202": {
          "headers": {
                "Location": "https://api.fabric.microsoft.com/v1/operations/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
                "x-ms-operation-id": "bbbbbbbb-1111-2222-3333-cccccccccccc",
                "Retry-After": 30
          }
       }
    }
    ```

## Related content

* [Using the Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis)
