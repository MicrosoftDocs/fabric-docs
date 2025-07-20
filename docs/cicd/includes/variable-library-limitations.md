---
title: Include file for Variable library limitations
description: This file lists all the considerations limitations to consider when working with Variable libraries. 
author: billmath
ms.author: billmath
ms.topic: include
ms.custom: 
ms.date: 03/16/2025
---

### Size limitations

* There can be *up to 1,000 variables* and *up to 1,000 value-sets*, as long as the total number of cells in the alternative value-sets is under 10,000 cells, and the item’s size not bigger than 1 MB. This is validated when the user saves changes.
* The note field can have up to 2,048 characters.
* The value-set description field can have up to 2,048 characters.

### Alternative value set limitations

* Alternative value sets in the Variable library appear in the order they were added. Currently, you can't reorder them in the UI. To change the order, edit the JSON file directly.
* The name of each value set must be unique within the Variable library.
* Variable names must be unique within a Variable library. You can have two variables with the same name in a workspace if they are in different items.
* There's always one and only one active value set in a Variable library at a time. You can't delete the active value set. To delete it, first set another value set to be active. You can set a different active value set for each stage of a deployment pipeline.
