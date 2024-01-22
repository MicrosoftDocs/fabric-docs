---
title: Known issue - Temp tables in Data Warehouse and SQL analytics endpoint
description: A known issue is posted where Temp tables in Data Warehouse and SQL analytics endpoint
author: mihart
ms.author: anirmale
ms.topic: troubleshooting
ms.date: 07/05/2023
ms.custom:
  - known-issue-447
  - ignite-2023
---

# Known issue - Temp table usage in Data Warehouse and SQL analytics endpoint

Users can create Temp tables in the Data Warehouse and in SQL analytics endpoint but data from user tables can't be inserted into Temp tables. Temp tables can't be joined to user tables.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

Users may notice that data from their user tables can't be inserted into a Temp table. Temp tables can't be joined to user tables.

## Solutions and workarounds

Use regular user tables instead of Temp tables.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
