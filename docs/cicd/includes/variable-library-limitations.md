---
title: Include file for variable library limitations
description: This file lists all the limitations to consider when you work with variable libraries. 
author: billmath
ms.author: billmath
ms.topic: include
ms.custom: 
ms.date: 12/15/2025
---

### Limitations for variables

* There can be *up to 1,000 variables* and *up to 1,000 value sets*, as long as you meet both of these requirements:

  * The total number of cells in the alternative value sets is less than 10,000.
  * The item's size doesn't exceed 1 MB.
  
  These requirements are validated when you save changes.
* The note field can have up to 2,048 characters.
* The value-set description field can have up to 2,048 characters.

### Limitations for alternative value sets

* Alternative value sets in a variable library appear in the order in which you added them. Currently, you can't reorder them in the UI. To change the order, edit the JSON file directly.
* The name of each value set must be unique within a variable library.
* Variable names must be unique within a variable library. You can have two variables with the same name in a workspace if they're in different items.
* There's always one (and only one) active value set in a variable library at a time. You can't delete a value set while it's active. To delete it, first configure another value set to be active. You can have a different active value set for each stage of a deployment pipeline.
