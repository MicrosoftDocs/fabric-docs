---
title: Known issue - Insert statements across tables in different data warehouses fail
description: A known issue is posted where insert statements across tables in different data warehouses fail.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/06/2025
ms.custom: known-issue-1114
---

# Known issue - Insert statements across tables in different data warehouses fail

You can run an INSERT statement across tables in different items. In rare circumstances, the tables have the same object_id, which causes the insert to fail.

**Status:** Fixed: May 6, 2025

**Product Experience:** Data Warehouse

## Symptoms

There are two different symptoms associated with this issue:

- When executing an INSERT statement across tables in different items that have the same object_id and identical schemas, NULL values are inserted into the target table
- When executing an INSERT statement across tables in different items that have the same object_id but different schemas, the INSERT fails with the error: `There was an error reading column mapping information for column: 'XXXXX'", where 'XXXXX' is an arbitrary column name in the target table.`

## Solutions and workarounds

To work around this issue, create a new data warehouse table. Ensure the target and sources of the INSERT statement across databases [don't have the same object_id](/sql/t-sql/functions/object-id-transact-sql).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
