---
title: Data Access Roles REST APIs
description: Data Access Roles REST APIs 
ms.reviewer: aamerril
ms.author: yuturchi
author: yuturchi
ms.topic: conceptual
ms.date: 04/01/2024
---

# OneLake Data Access Roles REST APIs

You can use the OneLake data access roles REST APIs to programatically create, update and list [OneLake RBAC Roles](../security/data-access-control-model.md). This article shows you how to perform each of these operations.

For the full list of supported operations, see the [OneLake Data Access Roles REST API reference material](/rest/api/fabric/core/onelake-data-access-roles-apis).

> [!IMPORTANT]
> The OneLake Data Access Roles REST APIs in Microsoft Fabric are currently in PREVIEW.

## Prerequisites

* To familiarize yourself with the Fabric REST APIs and set up your local environment or app, follow the [Fabric API quickstart guide](/rest/api/fabric/articles/get-started/fabric-api-quickstart).  
* Create a Fabric workspace and lakehouse if you don't already have one you plan to use. Copy the workspace and lakehouse IDs from the lakehouse URL; these are GUIDs.

## Create or Update data access roles

To create a new role, use the [Put Data Access Roles operation](/rest/api/fabric/core//onelake-data-access-security/create-or-update-data-access-roles). Sample requests and responses are below.

Here's how to create a new internal OneLake shortcut programmatically.

Perform the following REST API operation.

### Request

```http
PUT https://api.fabric.microsoft.com/v1/workspaces/cfafbeb1-8037-4d0c-896e-a46fb27ff222/items/25bac802-080d-4f73-8a42-1b406eb1fceb/dataAccessRoles?dryRun=False
```

```json
{
  "dataAccessRoles": [
    {
      "name": "default_role_1",
      "decisionRules": [
        {
          "effect": "Permit",
          "permission": [
            {
              "attributeName": "Path",
              "attributeValueIncludedIn": [
                "*"
              ]
            },
            {
              "attributeName": "Action",
              "attributeValueIncludedIn": [
                "Read"
              ]
            }
          ]
        }
      ],
      "members": {
        "fabricItemMembers": [
          {
            "itemAccess": [
              "ReadAll"
            ],
            "sourcePath": "cfafbeb1-8037-4d0c-896e-a46fb27ff222/25bac802-080d-4f73-8a42-1b406eb1fceb"
          }
        ]
      }
    }
  ]
}
```

#### Response

Status code: `200`

```http
ETag: 33a64df551425fcc55e4d42a148795d9f25f89d4
```

## List Data Access Roles

To list data access roles for the specific Fabric Item, use the [Get data access roles](/rest/api/fabric/core/onelake-data-access-security/list-data-access-roles). Sample request and response are below.

### Request

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/dataAccessRoles
```

### Response

Status code: `200`

```json
TBD
```

## Related content

- [Fabric and OneLake Security](./fabric-and-onelake-security.md)
- [Data Access Control Model](./data-access-control-model.md)