---
title: Known issue - Direct Lake query cancellation causes model to fall back to DirectQuery
description: A known issue is posted where Direct Lake query cancellation causes model to fall back to DirectQuery
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/05/2025
ms.custom: known-issue-985
---

# Known issue - Direct Lake query cancellation causes model to fall back to DirectQuery

You can use Direct Lake as a storage mode for your semantic model. If you cancel a query on a Direct Lake semantic model table, the query falls back to DirectQuery mode. At the same time, Direct Lake storage mode is disabled temporarily on the semantic model.

**Status:** Fixed: June 12, 2025

**Product Experience:** Power BI

## Symptoms

On "Direct Lake Only" semantic models, queries/visuals might fail with transient error. On "Automatic" mode semantic models, query performance might be temporarily impacted. If a visual uses the query that was canceled, you might receive an error. The error message is similar to: `Error fetching data for this visual. The operation was cancelled by the user.`

## Solutions and workarounds

To avoid query failures, enable "Automatic" Direct Lake behavior.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)