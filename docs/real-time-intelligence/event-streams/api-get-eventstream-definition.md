---
title: Get Eventstream item Definition
description: Learn how to call APIs to get an Eventstream item definition.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 12/16/2024
ms.search.form: Eventstream REST API
---

# Get Eventstream Definition

Use to get an Eventstream item definition with detailed information about its topology including source, destinations, operators, and streams

## Interface

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/eventstreams/{eventstreamId}/getDefinition
```

## URI Parameters

| Name | In | Required | Type | Description |
| ---- | ----- | ---- | ----- | ------------- |
| eventstreamId | path | True | string `uuid`| The eventstream ID. |
| workspaceId | path | True | string `uuid`| The workspace ID. |
| format | query | False | string | The format of the eventstream public definition. |

## Sample request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/eventstreams/bbbbcccc-1111-dddd-2222-eeee3333ffff/getDefinition
```

## Sample Response

The sample response includes a payload with a Base64-encoded string.

```json
{
  "definition": {
    "parts": [
      {
        "path": "eventstream.json",
        "payload": "SSdkIGxpa2UgdG8gdGVsbCBh..IGpva2UgZm9yIHlvdS4K",
        "payloadType": "InlineBase64"
      },
      {
        "path": ".platform",
        "payload": "ZG90UGxhdGZvcm1CYXNlNjRTdHJpbmc=",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

Below is the decoded payload content of the Base64 string for reference.

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
  "compatibilityLevel": "1.0"
}
```

## Related content

* [Get Eventstream Definition](/rest/api/fabric/eventstream/items/get-eventstream-definition)
