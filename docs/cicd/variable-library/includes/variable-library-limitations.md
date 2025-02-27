---
title: Include file for Variable library limitations
description: This include file lists all the considerations limitations to consider when working with Variable libraries. 
author: mberdugo
ms.author: monaberdugo
ms.topic: include
ms.custom: 
ms.date: 02/16/2025
---

### Size limitations

* There can be *up to 1,000 variables* and *up to 1,000 value-sets*, as long as the total number of cells in the alternative value-sets is under 10,000 cells, and the item’s size not bigger than 3 MB. This is validated when the user saves changes.
* The note field can have up to 2,048 characters.
* The value-set description field can have up to 2,048 characters.
* There's no limitation to the number of value sets you can have in the Variable library as long as the total size of the items doesn't exceed 50 MB.

### Alternative value set limitations

* Alternative value sets in the Variable library appear in the order they were added. Currently, you can't reorder them or change their order in the UI. To change the order, edit the JSON file directly.
* The name of each value set must be unique within the Variable library.
* Variable names must be unique within a Variable library. You can have two variables with the same name in a workspace if they are in different items.
* There is one and only one active value set in a Variable library at a time. You can't delete the active value set. To delete it, first set another value set to be active.

### Automation considerations

* Item names and variable names are *not* case sensitive. Therefore, when a consumer item requests a variable’s value resolution, we return the value even if the case doesn't match.

