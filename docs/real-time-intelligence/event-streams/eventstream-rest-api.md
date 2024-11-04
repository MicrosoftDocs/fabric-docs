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

## Eventstream item definition

In Fabric, an “item” represents a set of capabilities within a specific experience. For example, Eventstream is an item within the Real-time Intelligence experience. Users can create, edit, and delete items, with each item type offering different capabilities.

The Eventstream item definition follows a graph-like structure and consists of the following components:

* **Sources**: Data sources that can be ingested into Eventstream for processing. This includes Azure streaming sources, third-party streaming sources, database CDC (change data capture), Azure Blob Storage events, and Fabric system events.
* **Operators**: Event processors that handle real-time data streams, such as Filter, Aggregate, Group By, and Join.
* **Destinations**: Endpoints within Fabric where processed data can be routed to, including Lakehouse, Eventhouse, Reflex, and others.
* **Streams**: Data streams available for subscription and analysis in the Real-time Hub. There are two types of streams: default streams and derived streams.

An example of an Eventstream item definition:

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

## Authentication

### Get token using MSAL.NET


### Get token using the Fabric Portal

Sign in into the Fabric Portal for the Tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

powerBIAccessToken

Copy the token and paste it for the ClientId variable.




Eventstream API payload template



## Eventstream REST APIs

APIs 

| API | Description |
| ----------- | ---------------------- |
| Create Eventstream with Definition | Use to get an Eventstream item definition with detailed information about its topology including source, destinations, operators, and streams |
| Get Eventstream Definition | Use to get an Eventstream item definition with detailed information about its topology including source, destinations, operators, and streams |
| Update Eventstream Definition | Use to update or edit an Eventstream item definition including source, destinations, operators, and streams |


## Item definition

### payload structure

### properties, payload fields



Eventstream API payload is made of 5 properties in the top-level structure.

1. sources

    | Field | Description | Propertieis |
    | --- | --- | --- |
    | 32  | 32  | 323 |

1. destinations
1. operators
1. streams
1. 

### Example Payload





## Create Eventstream item with Definition

POST ....









## Get Eventstream definition







## Update Eventstream definition








## Related content

To learn how to add other sources to an eventstream, see the following articles: 

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
