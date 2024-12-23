---
title: Get Eventstream item Definition
description: Learn how to call APIs to get an Eventstream item definition.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
  - ignite-2024
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
POST https://api.fabric.microsoft.com/v1/workspaces/6e335e92-a2a2-4b5a-970a-bd6a89fbb765/eventstreams/cfafbeb1-8037-4d0c-896e-a46fb27ff229/getDefinition
```

## Sample Response

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

## Related content

* [Get Eventstream Definition](/rest/api/fabric/eventstream/items/get-eventstream-definition)