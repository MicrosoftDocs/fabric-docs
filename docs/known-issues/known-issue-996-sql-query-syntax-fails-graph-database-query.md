---
title: Known issue - Some SQL query syntax fails in a graph database query
description: A known issue is posted where some SQL query syntax fails in a graph database query.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/09/2025
ms.custom: known-issue-996
---

# Known issue - Some SQL query syntax fails in a graph database query

When you try to run a query against a graph database in the Fabric SQL editor, some graph database syntax doesn't work.

**Status:** Fixed: May 9, 2025

**Product Experience:** Databases

## Symptoms

You can run a query against a graph database in the Fabric SQL editor. When the query contains some graph database syntax, such as "->," the query fails.

## Solutions and workarounds

Use a different client tool, such as Visual Studio Code, Azure Data Studio, or SQL Server Management Studio, to run your query.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
