---
title: Known issue - Data Warehouse only publishes Delta Lake Logs for Inserts
description: A known issue is posted where Data Warehouse only publishes Delta Lake Logs for Inserts
author: mihart
ms.author: anirmale
ms.topic: troubleshooting 
ms.date: 07/10/2023
ms.custom: known-issue-453
---

# Known issue - Data Warehouse only publishes Delta Lake Logs for Inserts

delta tables referencing to lakehouse shortcuts, created using data warehouse tables don't update when there's is an 'update' or 'delete' operations performed in data warehouse table.
The following limitation is part of our public documentation as well: (/fabric/data-warehouse/query-delta-lake-logs#limitations)

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

user querying the table through a shortcut or directly through the delta Lake Log, experience that the table is missing data and data mismatch from what user sees, when queried through the data warehouse Directly.

## Solutions and workarounds

To ensure you have the data in delta tables referenced to the shortcut, after the update / delete operations in data warehouse table, - CTAS the table - Drop the old table - CTAS again to the original table name - Drop the existing shortcut - Re-create the shortcut to lakehouse

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
