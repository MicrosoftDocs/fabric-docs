---
title: Basics to Create a Resolution File
description: Map your Azure Data Factory Linked Service to your Fabric Connection
ms.reviewer: ssrinivasara
ms.topic: include
ms.date: 09/17/2025
---

```json
[
  {
    "type": "LinkedServiceToConnectionId",
    "key": "<ADF LinkedService Name>",
    "value": "<Fabric Connection ID>"
  }
]
```

- The `type` is the type of mapping to perform. It's usually `LinkedServiceToConnectionId`, but you might also use [other types in special cases.](../migrate-pipelines-how-to-add-connections-to-resolutions-file.md#resolution-types)
- The `key` depends on the `type` you're using. For `LinkedServiceToConnectionId`, the `key` is the name of the [ADF linked service](/azure/data-factory/concepts-linked-services) that you want to map.
- The `value` is the GUID of the Fabric connection you want to map to. You can [find the GUID in settings of the Fabric connection](../migrate-pipelines-how-to-add-connections-to-resolutions-file.md#get-the-guid-for-your-connection).

So, for example, if you have two ADF linked services named `MyAzureBlobStorage` and `MySQLServer` that you want to map to Fabric connections, your file would look like this:

```json
[
  {
    "type": "LinkedServiceToConnectionId",
    "key": "MyAzureBlobStorage",
    "value": "aaaa0000-bb11-2222-33cc-444444dddddd"
  },
  {
    "type": "LinkedServiceToConnectionId",
    "key": "MySQLServer",
    "value": "bbbb1111-cc22-3333-44dd-555555eeeeee"
  }
]
```

Create your **Resolutions.json** file using this structure and save it somewhere on your machine so that PowerShell can access it.
