---
title: Known issue - OneLake under-reports transactions in the Other category
description: A known issue is posted where OneLake under-reports transactions in the Other category.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 12/11/2024
ms.custom: known-issue-718
---

# Known issue - OneLake under-reports transactions in the Other category

OneLake is currently under-reporting **OneLake Other Operations Via Redirect** transactions that occur when a lakehouse automatically detects Delta tables. HTTP 400 errors other than 401 and 403 errors aren't billed. When we fix the issue, your usage for the **OneLake Other Operations Via Redirect** transactions might go up. If your usage exceeds your capacity limits, your capacity might be throttled.

**Status:** Open

**Product Experience:** OneLake

## Symptoms

You currently don't see all OneLake transactions in the **Other** category being reported.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
