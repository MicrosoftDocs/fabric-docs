---
title: Include file for value set limitations
description: This file lists the limitations to consider when you work with value sets. 
author: billmath
ms.author: billmath
ms.topic: include
ms.custom: 
ms.date: 03/16/2025
---

### Limitations for alternative value sets

* Alternative value sets in a variable library appear in the order in which you added them. Currently, you can't reorder them in the UI. To change the order, edit the JSON file directly.
* The name of each value set must be unique within a variable library.
* Variable names must be unique within a variable library. You can have two variables with the same name in a workspace if they're in different items.
* There's always one (and only one) active value set in a variable library at a time. You can't delete a value set while it's active. To delete it, first configure another value set to be active. You can have a different active value set for each stage of a deployment pipeline.
