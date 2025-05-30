---
title: Automate Variable library  APIs
description: Learn how to automate Variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 04/04/2025
#customer intent: As a developer, I want to learn how to automate Variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs, so that I can manage my content lifecycle.
---

# Automate variable libraries by using APIs and Azure DevOps (preview)

You can use the [Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis) to fully automate the Variable library management.

If you're using the APIs as part of your lifecycle management, permissions for item reference are checked during Git Update and deployment pipeline deployment.

## Prerequisites

To use the APIs, you need:

- The same prerequisites as for the [Variable library item](./get-started-variable-libraries.md#prerequisites).
- A Microsoft Entra token for Fabric service. Use the token in the authorization header of the API call. For information about how to get a token, see [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart).

## Variable library APIs

The [Variable library REST APIs](/rest/api/fabric/variablelibrary/items) allow you to perform the following functions:

- [Create Variable Library](/rest/api/fabric/variablelibrary/items/create-variable-library): Create a Variable library in the specified workspace.
- [Get Variable Library](/rest/api/fabric/variablelibrary/items/get-variable-library): Retrieve properties of a Variable library. You can also retrieve the active value set using the *VariableLibraryProperties* parameter.
- [Update Variable Library](/rest/api/fabric/variablelibrary/items/update-variable-library): Update a Variable library's properties. You can also update the active value set using the *VariableLibraryProperties* parameter.
- [Delete Variable Library](/rest/api/fabric/variablelibrary/items/delete-variable-library): Delete the specified Variable library.
- [List Variable Libraries](/rest/api/fabric/variablelibrary/items/list-variable-libraries): List Variable libraries in the specified workspace.
- [Get Variable Library Definition](/rest/api/fabric/variablelibrary/items/get-variable-library-definition): Retrieve the public [definition](./variable-library-cicd.md#variable-libraries-and-git-integration) of a Variable library.
- [Update Variable Library Definition](/rest/api/fabric/variablelibrary/items/update-variable-library-definition): Override the [definition](./variable-library-cicd.md#variable-libraries-and-git-integration) of a Variable library.

The Variable library item REST APIs support service principles.

## Examples

For some examples of how to use the APIs, see the [REST API documentation](/rest/api/fabric/variablelibrary/items) for each API.
For a breakdown of the definition structure of the Variable library, see the [Variable library definition](/rest/api/fabric/articles/item-management/definitions/variable-library-definition).

## Considerations and limitations

 [!INCLUDE [limitations](../includes/variable-library-limitations.md)]
