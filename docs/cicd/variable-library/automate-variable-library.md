---
title: Automate Variable Library APIs
description: Learn how to automate variable libraries in the Microsoft Fabric application lifecycle management (ALM) tool by using APIs.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 04/04/2025
#customer intent: As a developer, I want to learn how to automate variable libraries in the Microsoft Fabric application lifecycle management (ALM) tool by using APIs, so that I can manage my content lifecycle.
---

# Automate variable libraries by using APIs

You can use the [Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis) to fully automate the management of variable libraries in application lifecycle management (ALM).

If you're using the APIs as part of your lifecycle management, permissions for item reference are checked during Git update and pipeline deployment.

> [!NOTE]
> The Fabric variable library item is currently in preview.

## Prerequisites

To use the APIs, you need:

- The same prerequisites as for the [variable library item](./get-started-variable-libraries.md#prerequisites).
- A Microsoft Entra token for the Fabric service. Use the token in the authorization header of the API call. For information about how to get a token, see [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart).

## Variable library APIs

You can use the [variable library REST APIs](/rest/api/fabric/variablelibrary/items) to perform the following functions:

- [Create a variable library](/rest/api/fabric/variablelibrary/items/create-variable-library): Create a variable library in the specified workspace.
- [Get a variable library](/rest/api/fabric/variablelibrary/items/get-variable-library): Retrieve properties of a variable library. You can also retrieve the active value set by using the `VariableLibraryProperties` parameter.
- [Update a variable library](/rest/api/fabric/variablelibrary/items/update-variable-library): Update a variable library's properties. You can also update the active value set by using the `VariableLibraryProperties` parameter.
- [Delete a variable library](/rest/api/fabric/variablelibrary/items/delete-variable-library): Delete the specified variable library.
- [List variable libraries](/rest/api/fabric/variablelibrary/items/list-variable-libraries): List variable libraries in the specified workspace.
- [Get a variable library's definition](/rest/api/fabric/variablelibrary/items/get-variable-library-definition): Retrieve the public [definition](./variable-library-cicd.md#variable-libraries-and-git-integration) of a variable library.
- [Update a variable library's definition](/rest/api/fabric/variablelibrary/items/update-variable-library-definition): Override the [definition](./variable-library-cicd.md#variable-libraries-and-git-integration) of a variable library.

The variable library REST APIs support service principals.

## Examples

For some examples of how to use the APIs, see the [REST documentation](/rest/api/fabric/variablelibrary/items) for each API.

For a breakdown of the definition structure of a variable library, see [Variable library definition](/rest/api/fabric/articles/item-management/definitions/variable-library-definition).

## Considerations and limitations

[!INCLUDE [limitations](../includes/variable-library-limitations.md)]
