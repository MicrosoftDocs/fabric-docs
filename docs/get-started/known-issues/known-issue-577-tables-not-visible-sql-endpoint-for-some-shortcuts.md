---
title: Known issue - Tables aren't visible to the SQL analytics endpoint for some shortcuts
description: A known issue is posted where tables aren't visible to the SQL analytics endpoint for some shortcuts
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 02/02/2023
ms.custom: known-issue-577
---

# Known issue - Tables aren't visible to the SQL analytics endpoint for some shortcuts

If you have an internal shortcut that points to an external shortcut across artifacts, the tables in that shortcut don't show up in the Lakehouse SQL analytics endpoint. For example, you have a Lakehouse named **LH1** that contains an external shortcut named **accounts**. You also have a second Lakehouse named **LH2** that contains an internal (OneLake) shortcut named **accounts_int** pointing to **LH1**'s **accounts** shortcut. The table associated with **LH2**'s **accounts_int** shortcut doesn't appear and isn't discovered in **LH2**'s SQL analytics endpoint.

**Status:** Fixed: February 2, 2024

**Product Experience:** OneLake

## Symptoms

The SQL analytics endpoint and semantic model (dataset) associated with an internal shortcut that points to an external shortcut across artifacts doesn't display the shortcut tables.

## Solutions and workarounds

As a workaround, move both shortcuts to the same Lakehouse. If not possible, there are no other workarounds at this time. This article will be updated when the fix is released.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)