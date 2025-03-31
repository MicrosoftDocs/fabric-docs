---
title: Automate Variable library  APIs
description: Learn how to automate Variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 03/04/2025
#customer intent: As a developer, I want to learn how to automate Variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs, so that I can manage my content lifecycle.
---

# Automate Variable libraries by using APIs and Azure DevOps (preview)

You can use the [Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis) to fully automate the Variable library management.

If you're using the APIs as part of your lifecycle management, permissions for item reference are checked during Git Update and deployment pipeline deployment.

## Prerequisites

To use the APIs, you need:

- The same prerequisites as for the [Variable library item](./get-started-variable-libraries.md#prerequisites).
- A Microsoft Entra token for Fabric service. Use the token in the authorization header of the API call. For information about how to get a token, see [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart).

## Variable library APIs

The [Variable library REST APIs](/rest/api/fabric/variablelibrary/items) allow you to perform the following functions:

- [Create Variable Library](/rest/api/fabric/variablelibrary/items/create-variable-library): Create a Variable library in the specified workspace.
- [Get Variable Library](/rest/api/fabric/variablelibrary/items/get-variable-library): Returns properties of the specified Variable library.
- [Update Variable Library](/rest/api/fabric/variablelibrary/items/update-variable-library): Updates the properties of the specified Variable library.
- [Delete Variable Library](/rest/api/fabric/variablelibrary/items/delete-variable-library): Delete the specified Variable library.
- [List Variable Libraries](/rest/api/fabric/variablelibrary/items/list-variable-libraries): Returns a list of Variable libraries from the specified workspace.
- [Get Variable Library Definition](/rest/api/fabric/variablelibrary/items/get-variable-library-definition): Returns the specified Variable library public [definition](./variable-library-cicd.md#variable-libraries-and-git-integration) including value sets.
- [Update Variable Library Definition](/rest/api/fabric/variablelibrary/items/update-variable-library-definition): Updates the specified Variable library public [definition](./variable-library-cicd.md#variable-libraries-and-git-integration) including value sets.
- Set active value set: Set the [active value set](./variable-library-overview.md#alternative-value-sets) for the specified Variable library.

The Variable library item REST APIs support service principles.

## Examples

Here are some examples of how to use the APIs to do somme common tasks:

### Create a Variable library

```http
POST https://{region}.dev.fabric.microsoft.com/api/v1.0/variablelibrary/items/create-variable-library
```

### Get a Variable library definition

```http
GET https://{region}.dev.fabric.microsoft.com/api/v1.0/variablelibrary/items/get-variable-library?workspaceId={workspaceId}&itemId={itemId}
```

### Change the value of a variable in the Variable library

```http
POST https://{region}.dev.fabric.microsoft.com/api/v1.0/variablelibrary/items/update-variable-library-definition
```

## Considerations and limitations

 [!INCLUDE [limitations](./includes/variable-library-limitations.md)]
