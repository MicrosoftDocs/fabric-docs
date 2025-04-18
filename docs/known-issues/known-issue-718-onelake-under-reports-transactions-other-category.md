---
title: Known issue - OneLake under-reports transactions in the Other category
description: A known issue is posted where OneLake under-reports transactions in the Other category.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/18/2025
ms.custom: known-issue-718
---

# Known issue - OneLake under-reports transactions in the Other category

OneLake is currently under-reporting **OneLake Other Operations Via Redirect** transactions that occur when a lakehouse automatically detects Delta tables. HTTP 404 errors aren't currently billed. When we fix the issue, your usage for the **OneLake Other Operations Via Redirect** transactions might go up. If your usage exceeds your capacity limits, your capacity might be throttled.

**Status:** Fixed: April 18, 2025

**Product Experience:** OneLake

## Symptoms

You currently don't see all OneLake transactions in the **Other** category being reported. The transactions not included are due to the polling detection for Delta table maintenance. For each table in a lakehouse, polls happen every 5 seconds for new updates. The polling is paused if the SQL analytics endpoint was inactive for the past 15 minutes. To be more specific, during each sync, the polling knows that during the previous sync it discovered the table has commit logs (for example 77.json). Now, in the current sync, it tries to find if 78.json exists. If the table doesn’t have any changes, then the call to 78.json triggers a 404 in OneLake. These 404 errors aren't currently billed.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
