---
title: Automate Variable library  APIs
description: Learn how to automate Variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 11/12/2024
#customer intent: As a developer, I want to learn how to automate Variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs, so that I can manage my content lifecycle.
---

# Automate Variable libraries by using APIs and Azure DevOps (preview)

You can use the [Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis) to fully automate the Variable library management.

If you're using the APIs as part of your lifecycle management, permissions for item reference are checked during Git Update and deployment pipeline deployment.

The following REST APIs are available for Variable library items:

* Create Variable library
* Delete Variable library
* Get Variable library
* Get Variable library definition
* Update
* Update Variable library definition


* **Read**/**Update** the Variable library item *schema*
* **Read**/**Update** the Variable library item *active value-set*

## Read the Variable library item information

* To view the item's schema, use the *Get item definition* API call. This call returns:
  * Variables - name, type, note, and default value
  * Value-sets – names and their adjustable variables’ value
* Use the *Get item* API call to view the active value-set of this item.

## Update the Variable library item information

* To update the item’s schema, use the *Update item definition* API call which returns:
  * Variables – Add variable/Remove variable/Edit variable (name, type, note, and default value)
  * value-sets – Add VS/Remove VS/Edit VS name/Edit VS’s variable value
* Use the custom property of active VS name in the *Update item* API call, to specify the active value-set for this item.

**Including this property is optional, but once included in the call, a value is required to prevent you from accidentally removing an active value-set removed without setting a different one to be active.

For example:

```json
{
  "properties": {
    "activeValueSetName": "TestStageVS",
  }
}
```

The Variable library item REST APIs support service principle.

## Variable library schema

The Variable library item schema is a JSON object that contains two parts:

* **Variables** file – The variables contained in the item, and their properties.
  * name
  * type
  * defaultValue
  * note (if any)
* **Value-sets** – A set of values for the variables. A value set consists of:
  * name
  * value

```json
"$schema": "https://developer.microsoft.com/json-schemas/fabric/item/VariablesLibrary/definition/1.0.0/schema.json",
{
  "variables": [
    {
      "name": "var1",
      "type": "string",
      "defaultValue": "value1",
      "note": "This is a note"
    },
    {
      "name": "var2",
      "type": "int",
      "defaultValue": 1
    }
  ],
}
```

```json
"$schema": "https://developer.microsoft.com/json-schemas/fabric/item/VariablesLibrary/definition/1.0.0/schema.json",
"valueSetName: "NewVS",
"overrides": [
  {
    "name": "var1",
    "value": "value1"
  }
 ]
}
```

## Considerations and limitations

Both item name and variable name are *not* case sensitive. Therefore, when consumer item requests a variable’s value resolution, we return the value even if the case doesn't match.
