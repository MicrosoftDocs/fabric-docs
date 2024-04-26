---
title: Known issue - Shortcut data inaccessible if data is in a paused capacity
description: A known issue is posted where shortcut data inaccessible if data is in a paused capacity.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/25/2024
ms.custom: known-issue-701
---

# Known issue - Shortcut data inaccessible if data is in a paused capacity

You can create a shortcut in an item in a workspace associated with one capacity. The shortcut points to data in an item in another workspace in second capacity. If the second capacity hosting the data is paused, the data is inaccessible when you access the shortcut in the first capacity.

**Status:** Open

**Product Experience:** OneLake

## Symptoms

You can't access the data using a shortcut if the workspace that contains the data is associated with a paused capacity.

## Solutions and workarounds

The only workaround is to resume the capacity that is hosting the data.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
