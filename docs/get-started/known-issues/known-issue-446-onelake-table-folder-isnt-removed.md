---
title: Known issue - OneLake Table folder not removed when table dropped in Data Warehouse
description: A known issue is posted where oneLake Table folder not removed when table dropped in Data Warehouse
author: mihart
ms.author: anirmale
ms.topic: troubleshooting 
ms.date: 11/15/2023
ms.custom: known-issue-446
---

# Known issue - OneLake Table folder not removed when table dropped in Data Warehouse

When you drop a table in the Data Warehouse, it isn't removed from the folder in OneLake.

**Status:** Fixed: November 15, 2023

**Product Experience:** Data Warehouse

## Symptoms

After a user drops a table in the Data Warehouse using a TSQL query, the corresponding folder in OneLake, under Tables, isn't removed automatically and can't be dropped manually.

## Solutions and workarounds

None

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
