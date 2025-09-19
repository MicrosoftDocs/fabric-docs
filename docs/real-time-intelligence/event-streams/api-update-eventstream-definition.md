---
title: Update Eventstream item Definition
description: Learn how to call APIs to update an Eventstream item definition in Fabric workspace.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 09/08/2025
ms.search.form: Eventstream REST API
---

# Update Eventstream Definition

Use to update or edit an Eventstream item definition including source, destinations, operators, and streams

## Interface

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/eventstreams/{eventstreamId}/updateDefinition
```

## URI Parameters

| Name | In | Required | Type | Description |
| ---- | ----- | ---- | ----- | ------------- |
| eventstreamId | path | True | string `uuid`| The eventstream ID. |
| workspaceId | path | True | string `uuid`| The workspace ID. |
| updateMetadata | query | False | boolean | Whether to update the item's metadata if provided in the `.platform` file. True - Update the metadata if provided in the `.platform` file as part of the definition, False - Don't update the metadata. |


## Sample request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/eventstreams/bbbbcccc-1111-dddd-2222-eeee3333ffff/updateDefinition?updateMetadata=True

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

## Example of payload content decoded from Base64

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

## Sample response

```http
    Location: https://api.fabric.microsoft.com/v1/operations/ccccdddd-2222-eeee-3333-ffff4444aaaa
    x-ms-operation-id: ccccdddd-2222-eeee-3333-ffff4444aaaa
    Retry-After: 30
```

## Related content

* [Update Eventstream Definition](/rest/api/fabric/eventstream/items/update-eventstream-definition)
