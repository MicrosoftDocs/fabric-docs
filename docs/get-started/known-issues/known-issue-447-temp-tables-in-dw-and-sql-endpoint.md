---
title: Known issue - Temp tables in data warehouse and sql endpoint
description: A known issue is posted where temp tables in data warehouse and sql endpoint
author: mihart
ms.author: anirmale
ms.topic: troubleshooting 
ms.date: 07/05/2023
ms.custom: known-issue-447
---

# Known issue - Temp tables in Data Warehouse and SQL Endpoint

Users can create Temp tables in the Data Warehouse and SQL Endpoint but has data retrieval limits.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

The user table data can't be inserted into Temp Table, also no join relationship can't be established with user Table.

## Solutions and workarounds

Use regular user tables instead of Temp Tables.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
