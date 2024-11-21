---
title: Automate variable libraries  APIs
description: Learn how to automate variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 08/12/2024
#customer intent: As a developer, I want to learn how to automate variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs, so that I can manage my content lifecycle.
---

# Automate variable libraries by using APIs and Azure DevOps (preview)

The Microsoft Fabric [variable library item](variable-library-overview.md) enables .

With [Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis), you can automate the values of Fabric variable library item and   . This efficiency leads to cost savings and improved productivity.

This article describes how to use the [variable library item REST APIs](/rest/api/fabric/core/git) to automate Git integration in Microsoft Fabric.

## Considerations and limitations

* Users can add *up to 1000 variables* and *up to 1000 value-sets*, if the total number of cells in the alternative value-sets is under 10,000 cells and the item’s size is up to 3MB. This is validated when the user saves changes.
* The note field can have up to 2048 chars.
* The value-set description field can have up to 2048 chars.
* Both item name and variable name are *not* case sensitive, so when consumer item requests a variable’s value resolution, we return the value even if the case doesn't match.
