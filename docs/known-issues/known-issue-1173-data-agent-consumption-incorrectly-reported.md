---
title: Known issue - Data Agent consumption incorrectly reported against default workspace capacity
description: A known issue is posted where your Data Agent consumption incorrectly reported against default workspace capacity.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/17/2025
ms.custom: known-issue-1173
---

# Known issue - Data Agent consumption incorrectly reported against default workspace capacity

We recently introduced Fabric Copilot Capacity (FCC) as a shared tenant-wide capacity for running compute-intensive AI features, such as Copilot and the Data Agent (formerly known as Data agent). However, we identified an issue where Data Agent usage, when expected to be reported against FCC, is instead being attributed to the regular capacity assigned to the workspace. This misattribution doesn't result in over- or under-charging, but it might cause confusion, as the usage appears under the wrong capacity category.

**Status:** Open

**Product Experience:** Data Science

## Symptoms

You see that your Data Agent consumption appears under the wrong capacity category.

## Solutions and workarounds

There's no workaround at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
