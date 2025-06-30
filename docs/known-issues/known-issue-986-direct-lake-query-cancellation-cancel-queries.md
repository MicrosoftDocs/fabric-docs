---
title: Known issue - Direct Lake query cancellation might cancel other queries
description: A known issue is posted where Direct Lake query cancellation might cancel other queries.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/25/2025
ms.custom: known-issue-986
---

# Known issue - Direct Lake query cancellation might cancel other queries

You can use Direct Lake as a storage mode for your semantic model. If you cancel a query on a Direct Lake semantic model table, the model might occasionally also cause the cancellation of other queries which read the same table.

**Status:** Fixed: June 25, 2025

**Product Experience:** Power BI

## Symptoms

Queries might fail with user a cancellation error, despite the user not canceling the query. If a visual uses the query that was canceled, you might receive an error. The error message is similar to: `Error fetching data for this visual. The operation was cancelled by the user.`

## Solutions and workarounds

To work around this issue, refresh the failed visuals.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
