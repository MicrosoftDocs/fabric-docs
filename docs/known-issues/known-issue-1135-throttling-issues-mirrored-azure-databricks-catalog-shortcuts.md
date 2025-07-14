---
title: Known issue - Throttling issues with the Mirrored Azure Databricks catalog shortcuts
description: A known issue is posted where you see throttling issues with Mirrored Azure Databricks catalog shortcuts.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/03/2025
ms.custom: known-issue-1135
---

# Known issue - Throttling issues with Mirrored Azure Databricks catalog shortcuts

If you're using the Mirrored Azure Databricks catalog, you might experience throttling issues with shortcuts due to a recently introduced throttling limit.

**Status:** Fixed: July 3, 2025

**Product Experience:** OneLake

## Symptoms

You might see one of these symptoms if you face this issue:

- Mirrored Azure Databricks catalog tables don't show up in the SQL analytics endpoint and query execution might fail intermittently.
- Spark jobs or pipelines fail that target a read file path on the Mirrored Azure Databricks catalog.
- Reports fail to load when they contain a reference to the Mirrored Azure Databricks catalog tables.

## Solutions and workarounds

There's no workaround at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
