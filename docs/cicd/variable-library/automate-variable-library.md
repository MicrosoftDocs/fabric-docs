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

The following table lists the APIs available for the variable library in Fabric.

| Request | Action                          |
|---------|---------------------------------|
| [Create Variable Library](/rest/api/fabric/variablelibrary/items/create-variable-library)  | Create a VariableLibrary in the specified workspace               |
| [Get Variable Library](/rest/api/fabric/variablelibrary/items/get-variable-library)     | Returns properties of the specified VariableLibrary.            |
| [Update Variable Library](/rest/api/fabric/variablelibrary/items/update-variable-library)  | Updates the properties of the specified VariableLibrary                   |
| [Delete Variable Library](/rest/api/fabric/variablelibrary/items/delete-variable-library)  | Delete the specified VariableLibrary                          |
| [List Variable Libraries](/rest/api/fabric/variablelibrary/items/list-variable-libraries) | Returns a list of VariableLibraries from the specified workspace.      |
| [Get Variable Library Definition](/rest/api/fabric/variablelibrary/items/get-variable-library-definition) | Returns the specified VariableLibrary public definition.              |
| Location | Status Failed                  |
| Result   | Get result                     |
|          | Base64       |
| [Update Variable Library Definition](/rest/api/fabric/variablelibrary/items/update-variable-library-definition) | Import                |
|          | Import with change |
| Get + active value set |                  |
| Set value set | Set/change active value set |
| Create with definition | create Variable Library with content (definition/ payloads) |
|          | Test conflict name (already exist) |

The Variable library item REST APIs support service principle.

## Considerations and limitations

 [!INCLUDE [limitations](./includes/variable-library-limitations.md)]
