---
title: Known issue - Data Warehouse only publishes Delta Lake logs for inserts
description: A known issue is posted where Data Warehouse only publishes Delta Lake logs for inserts
author: mihart
ms.author: anirmale
ms.topic: troubleshooting 
ms.date: 11/15/2023
ms.custom: known-issue-453
---

# Known issue - Data Warehouse only publishes Delta Lake logs for inserts

Delta tables referencing Lakehouse shortcuts that are created using Data Warehouse tables, don't update when there's an 'update' or 'delete' operation performed on the Data Warehouse table.
The limitation is listed in our public documentation: (/fabric/data-warehouse/query-delta-lake-logs#limitations)

**Status:** Fixed: November 15, 2023

**Product Experience:** Data Warehouse

## Symptoms

The data that a customer sees when querying the Delta table by using either a shortcut or using the Delta Lake log, doesn't match the data shown when using Data Warehouse.

## Solutions and workarounds

 To ensure that the data in the Delta tables references the shortcut, try the following steps.
 1. Create Table as Select (CTAS)
 2. Drop the old table
 3. CTAS again to the original table name
 4. Drop the existing shortcut
 5. Re-create the shortcut to Lakehouse

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
