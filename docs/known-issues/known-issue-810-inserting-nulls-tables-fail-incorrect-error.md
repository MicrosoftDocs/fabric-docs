---
title: Known issue - Inserting nulls into Data Warehouse tables fail with incorrect error message
description: A known issue is posted where inserting nulls into Data Warehouse tables fail with incorrect error message.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/21/2025
ms.custom: known-issue-810
---

# Known issue - Inserting nulls into Data Warehouse tables fail with incorrect error message

When you insert **NULL** values into **NOT NULL** columns in SQL tables, the SQL query fails as expected. However, the error message returned references the incorrect column.

**Status:** Fixed: March 21, 2025

**Product Experience:** Data Warehouse

## Symptoms

You might see a failure when executing a SQL query to insert into a Data Warehouse table. The error message is similar to: `Cannot insert the value NULL into column <columnname>, table <tablename>`. When the query fails, the column referenced isn't the column that caused the error.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
