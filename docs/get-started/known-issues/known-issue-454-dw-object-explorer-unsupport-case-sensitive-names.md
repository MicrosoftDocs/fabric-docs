---
title: Known issue - Warehouse's object explorer doesn't support case-sensitive object names
description: A known issue is posted where Warehouse's object explorer doesn't support case-sensitive object names
author: mihart
ms.author: anirmale
ms.topic: troubleshooting 
ms.date: 07/10/2023
ms.custom: known-issue-454
---

# Known issue - Warehouse's object explorer doesn't support case-sensitive object names
Fabric warehouse objects (ex. tables, views, etc.) having same noncase sensitive name (ex. table1 and table1) display in the object explorer. If there are two objects with the same name, one displays in the object explorer. but, if there's three or more, none gets displayed. The objects show up in system views (ex. sys.tables) and can be used but unavailable in the object explorer.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

If the customer notices the object shares the same noncase sensitive name as another object listed in a system view and is working as intended, but isn't listed in the object explorer, then the customer has encountered this known issue.

## Solutions and workarounds

Recommend naming objects with different names and not relying on case-sensitivity as it helps avoid any inconsistency from not being listed in the object explorer, but listed in system views

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
