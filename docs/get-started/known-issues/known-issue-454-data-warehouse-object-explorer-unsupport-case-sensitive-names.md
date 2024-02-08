---
title: Known issue - The Data Warehouse Object Explorer doesn't support case-sensitive object names
description: A known issue is posted where the Data Warehouse Object Explorer doesn't support case-sensitive object names
author: mihart
ms.author: anirmale
ms.topic: troubleshooting 
ms.date: 07/10/2023
ms.custom: known-issue-454
---

# Known issue - The Data Warehouse Object Explorer doesn't support case-sensitive object names
The object explorer fails to display the Fabric Data Warehouse objects (ex. tables, views, etc.) when have same noncase sensitive name (ex. table1 and Table1). In case there are two objects with same name, one displays in the object explorer. but, if there's three or more objects, nothing gets display. The objects show and can be used from system views (ex. sys.tables). The objects aren't available in the object explorer.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

If the customer notice the object shares the same noncase sensitive name as another object listed in a system view and is working as intended, but isn't listed in the object explorer, then the customer has encountered this known issue.

## Solutions and workarounds

Recommend naming objects with different names and not relying on case-sensitivity as it helps avoid any inconsistency from not being listed in the object explorer, but listed in system views

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
