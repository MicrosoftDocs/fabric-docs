---
title: Known issue - Making model changes to a semantic model might not work
description: A known issue is posted where making model changes to a semantic model might not work
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 11/15/2023
ms.custom: known-issue-549
---

# Known issue - Making model changes to a semantic model might not work

Making model changes in a Fabric Data Warehouse's semantic model might not work.  The types of model changes include, but aren't limited to, making changes to relationships, measures, and more.  When the change doesn't work, a data warehouse semantic model error appears.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

If impacted, you experience the following error while attempting to model the Semantic Model: `"You cannot use Direct Lake mode together with other storage modes in the same model. Composite model does not support Direct Lake mode. Please remove the unsupported tables or switch them to Direct Lake mode. See https://go.microsoft.com/fwlink/?linkid=2215281 to learn more."`

## Solutions and workarounds

If impacted, perform the following actions in the semantic model to work around the problem:

1. Select the **Manage Default Semantic Model** button
1. Unselect all objects
1. Select the **Save** button
1. Readd objects to the semantic model
1. Select the **Save** button

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
