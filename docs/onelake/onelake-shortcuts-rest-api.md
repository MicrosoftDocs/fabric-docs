---
title: Use OneLake shortcuts REST APIs
description: OneLake offers REST APIs for shortcuts, allowing you to manage shortcut definitions within OneLake. Learn how to use these REST APIs.
ms.reviewer: eloldag
ms.author: mahi
author: Matt1883
ms.search.form: Shortcuts
ms.topic: conceptual
ms.date: 1/13/2023
---

# Use OneLake shortcuts REST APIs

You can use the OneLake shortcuts REST APIs to programatically create, get, and delete [OneLake shortcuts](onelake-shortcuts.md). This article shows you how to perform each of these operations.

For the full list of supported operations, see the [OneLake shortcuts REST API reference material](/rest/api/fabric/core/onelake-shortcuts).

> [!IMPORTANT]
> The OneLake shortcuts REST APIs in Microsoft Fabric are currently in PREVIEW.

## Prerequisites

* To familiarize yourself with the Fabric REST APIs and set up your local environment or app, follow the [Fabric API quickstart guide](/rest/api/fabric/articles/get-started/fabric-api-quickstart).  
* Create a Fabric workspace and lakehouse if you don't already have one you plan to use. Copy the workspace and lakehouse IDs from the lakehouse URL; these are GUIDs.

## Create shortcuts

To create a new shortcut, use the [Create shortcut operation](/rest/api/fabric/core/onelake-shortcuts/create-shortcut). Sample requests and responses are below.

### OneLake shortcuts

Here's how to create a new internal OneLake shortcut programmatically using the [OneLake shortcuts REST API](/rest/api/fabric/core/onelake-shortcuts/create-shortcut). To create these shortcuts with the UI, [follow this guide](create-onelake-shortcut.md).

Perform the following REST API operation.

#### Request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/shortcuts
```

```json
{
  "path": "Tables", //path to shortcut parent directory
  "name": "PartnerSales", //shortcut directory name
  "target": {
    "oneLake": {
      "workspaceId": "1f8a7a49-9411-489b-8c80-310d9cb5e4c2", //target workspace ID
      "itemId": "18ca5daa-e5af-4222-b168-2dafc7af4a45", //target data item ID (e.g., a lakehouse)
      "path": "/Tables/ContosoSales" //path to target directory
    }
  }
}
```

#### Response

Status code: `201`

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/caa1a599-df36-4f94-83b4-d422aaa07a6f/items/b0000523-0cae-487a-aa62-48f7e61278f8/shortcuts/Tables/PartnerSales
```

```json
{
  "path": "Tables",
  "name": "PartnerSales",
  "target": {
    "oneLake": {
      "workspaceId": "1f8a7a49-9411-489b-8c80-310d9cb5e4c2",
      "itemId": "18ca5daa-e5af-4222-b168-2dafc7af4a45",
      "path": "/Tables/ContosoSales"
    }
  }
}
```

### Azure Data Lake Storage (ADLS) Gen2

Here's how to create a new ADLS Gen2 shortcut programmatically using the [OneLake shortcuts REST API](/rest/api/fabric/core/onelake-shortcuts/create-shortcut). To create these shortcuts with the UI, [follow this guide](create-adls-shortcut.md).

First [create a cloud connection](../data-factory/data-source-management.md#add-a-data-source) to be used by the shortcut when connecting to the ADLS Gen2 data location. Open the cloud connection's Settings view and copy the connection ID; this is a GUID.

Perform the following REST API operation.

#### Request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/shortcuts
```

```json
{
  "path": "Files/landingZone", //path to shortcut parent directory
  "name": "PartnerProducts", //shortcut directory name
  "target": {
    "adlsGen2": {
      "location": "https://contosoadlsaccount.dfs.core.windows.net", //ADLS Gen2 account endpoint
      "subpath": "/mycontainer/data/ContosoProducts", //path to target directory (including container)
      "connectionId": "91324db9-8dc4-4730-a1e5-bafabf1fb91e" //cloud connection ID for the ADLS Gen2 account with the same location
    }
  }
}
```

#### Response

Status code: `201`

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/caa1a599-df36-4f94-83b4-d422aaa07a6f/items/b0000523-0cae-487a-aa62-48f7e61278f8/shortcuts/Files/landingZone/PartnerProducts
```

```json
{
  "path": "Files/landingZone",
  "name": "PartnerProducts",
  "target": {
    "adlsGen2": {
      "location": "https://contosoadlsaccount.dfs.core.windows.net",
      "subpath": "/mycontainer/data/ContosoProducts",
      "connectionId": "91324db9-8dc4-4730-a1e5-bafabf1fb91e"
    }
  }
}
```

### Amazon S3

Here's how to create a new Amazon S3 shortcut programmatically using the [OneLake shortcuts REST API](/rest/api/fabric/core/onelake-shortcuts/create-shortcut). To create these shortcuts with the UI, [follow this guide](create-s3-shortcut.md).

First [create a cloud connection](../data-factory/data-source-management.md#add-a-data-source) to be used by the shortcut when connecting to the Amazon S3 data location. Open the cloud connection's Settings view and copy the connection ID; this is a GUID.

Perform the following REST API operation.

#### Request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/shortcuts
```

```json
{
  "path": "Files/landingZone", //path to shortcut parent directory
  "name": "PartnerEmployees", //shortcut directory name
  "target": {
    "adlsGen2": {
      "location": "https://my-s3-bucket.s3.us-west-2.amazonaws.com", //Amazon AWS S3 bucket endpoint (virtual hosted style)
      "subpath": "/data/ContosoEmployees", //path to target directory within bucket
      "connectionId": "cf480513-2c1c-46b2-958a-42556ee584c3" //cloud connection ID for the Amazon S3 bucket with the same location
    }
  }
}
```

#### Response

Status code: `201`

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/caa1a599-df36-4f94-83b4-d422aaa07a6f/items/b0000523-0cae-487a-aa62-48f7e61278f8/shortcuts/Files/landingZone/PartnerEmployees
```

```json
{
  "path": "Files/landingZone",
  "name": "PartnerEmployees",
  "target": {
    "adlsGen2": {
      "location": "https://my-s3-bucket.s3.us-west-2.amazonaws.com",
      "subpath": "/data/ContosoEmployees",
      "connectionId": "cf480513-2c1c-46b2-958a-42556ee584c3"
    }
  }
}
```

## Get shortcut definition

To get the definition of a specific shortcut, use the [Get shortcut operation](/rest/api/fabric/core/onelake-shortcuts/get-shortcut). Sample request and response are below.

#### Request

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/shortcuts/{shortcutPath}/{shortcutName}
```

#### Response

Status code: `200`

```json
{
  "path": "Files/landingZone",
  "name": "PartnerProducts",
  "target": {
    "adlsGen2": {
      "location": "https://contosoadlsaccount.dfs.core.windows.net",
      "subpath": "/mycontainer/data/ContosoProducts",
      "connectionId": "91324db9-8dc4-4730-a1e5-bafabf1fb91e"
    }
  }
}
```

## Delete shortcut

To delete a shortcut, use the [Delete shortcut operation](/rest/api/fabric/core/onelake-shortcuts/create-shortcut). Sample request and response are below.

#### Request

```http
DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/shortcuts/{shortcutPath}/{shortcutName}
```

#### Response

Status code: `200`