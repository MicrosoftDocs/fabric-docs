---
title: Known issue - New card and reference label tabular layout content hidden or truncated
description: A known issue is posted where Issues with New Card and Reference Label Tabular Layout
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/26/2024
ms.custom: known-issue-764
---

# Known issue - Issues with New Card and Reference Label Tabular Layout

There are two issues in the new card with reference labels using tabular layout. Firstly, if you reduce the font size, you might see content disappearing. Second, you might see space reserved for the **Detail** label. The space reserved is shown even when the **Detail** label is turned off, which causes content to move left and possibly truncate the **Title** label.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

In a new card, the reference label **Title** or **Value** might disappear if the font size is smaller than 12 in the tabular layout style. The reference label **Title** might truncate early and show an ellipsis. The reference **Value** might shift left, even if **Detail** label is turned off in the tabular layout style.

## Solutions and workarounds

For the first issue, turn on the **Detail** label and reduce the font size. For the second issue, there's no workaround at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)