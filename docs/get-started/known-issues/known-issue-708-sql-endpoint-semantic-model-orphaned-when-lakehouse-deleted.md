---
title: Known issue - SQL endpoint and semantic model are orphaned when a lakehouse is deleted
description: A known issue is posted where the SQL analytics endpoint and default semantic model are orphaned when a lakehouse is deleted.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/01/2024
ms.custom: known-issue-708
---

# Known issue - SQL endpoint and semantic model are orphaned when a lakehouse is deleted

A lakehouse has an associated SQL analytics endpoint and default semantic model. When the lakehouse is deleted, the two associated items should also be deleted. The two associated items currently remain and can't be deleted.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

When a lakehouse is deleted, the associated SQL analytics endpoint and the default semantic model remain in the workspace.

## Solutions and workarounds

Once the fix for this issue is released, the orphaned items are deleted automatically.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
