---
title: Known issue - New card visual conditional formatting rules don't work
description: A known issue is posted where New Card visual conditional formatting
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/20/2025
ms.custom: known-issue-1091
---

# Known issue - New Card visual conditional formatting

You can use the new card visual without small multiples or categories. If you add or change the conditionally formatted rules, the rules aren't applied. Existing rules remain unaffected as long as they aren't modified and saved. Additionally, conditional formatting and the new card visual with small multiples/categories continue to function correctly.

**Status:** Fixed: May 20, 2025

**Product Experience:** Power BI

## Symptoms

Conditional formatting doesn't work for the card visual if you make a change. If you leave the conditional formatting as is, the formatting continues to work.

## Solutions and workarounds

Don't change the conditional formatting on the new card visual. If you've already make a change, revert to an old version of the report where the conditional formatting wasn't changed and publish it. Alternatively, you can use small multiples to get conditional formatting working again.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
