---
title: Automate variable libraries  APIs
description: Learn how to automate variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 11/12/2024
#customer intent: As a developer, I want to learn how to automate variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs, so that I can manage my content lifecycle.
---

# Automate variable libraries by using APIs and Azure DevOps (preview)

You can use the [Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis) to fully automate teh variable library management. Here are a few examples of what can be done by using the APIs:

* **Read**/**Update** the variable library item *schema*
* **Read**/**Update** the variable library item *active value-set*

## Read the variable library item information

* Use the ‘Get item definition’ API call, to view the item’s schema:
  * Variables - name, type, note and default value
  * Value-sets – names and their adjustable variables’ value
* Use the ‘Get item’ API call to view under the custom property section the active value-set name of this item.

## Update the variable library item information

* Use the ‘Update item definition’ API call, to update the item’s schema:
  * Variables – Add variable/Remove variable/Edit variable (name, type, note and default value)
  * value-sets – Add VS/Remove VS/Edit VS name/Edit VS’s variable value
* Use the custom property of active VS name in the ‘Update item’ API call, to specify the active value-set for this item.

**Including this property is optional, but once included in the call, a value for it is mandatory to prevent you from accidentally removing an active value-set removed without setting a different one to be active.

For example:

```json
{
  "properties": {
    "activeValueSetName": "TestStageVS",
  }
}
```

The variable library item CRUD APIs support service principle.

## Considerations and limitations

* Users can add *up to 1000 variables* and *up to 1000 value-sets*, as long as the total number of cells in the alternative value-sets is under 10,000 cells and the item’s size not bigger than 3MB. This is validated when the user saves changes.
* The note field can have up to 2048 chars.
* The value-set description field can have up to 2048 chars.
* Both item name and variable name are *not* case sensitive. Therefore, when consumer item requests a variable’s value resolution, we return the value even if the case doesn't match.
