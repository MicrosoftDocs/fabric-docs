---
title: Known issue - SQL database creation fails to create child items when item with same name exists
description: A known issue is posted where SQL database creation fails to create child items when item with same name exists.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/27/2025
ms.custom: known-issue-965
---

# Known issue - Database creation fails to create child items when item with same name exists

When you create a Fabric SQL Database, it automatically creates a child SQL analytics endpoint and a child semantic model with the same name as the SQL database. If the workspace already contains a SQL analytics endpoint or a semantic model with the same name, the creation of the child items fails.

**Status:** Fixed: June 27, 2025

**Product Experience:** Databases

## Symptoms

You created an SQL database with the same name as a SQL analytics endpoint or semantic model in that workspace. The child items for that SQL database weren't created. You can't query the mirrored data for this database.

## Solutions and workarounds

Before creating the SQL database, check if the target workspace already contains a SQL analytics endpoint or semantic model with the same name. Choose a different name for your new SQL database.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
