---
title: Known issue - Relationships in the default semantic model get dropped
description: A known issue is posted where the relationships in the default semantic model get dropped
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 01/08/2024
ms.custom: known-issue-592
---

# Known issue - Relationships in the default semantic model get dropped

You see that some relationships no longer exist in the default semantic model.  Earlier, the structure of the underlying table changed, such as adding or removing a column.  The change leads to the table being recreated in the SQL endpoint, which could potentially disrupt and drop the existing relationships in the default semantic model.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

When viewing the default semantic model, you no longer see relationships that previously existed.

## Solutions and workarounds

To mitigate the issue, you can recreate the missing relationships in the default semantic model.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
