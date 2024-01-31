---
title: Known issue - OneLake compute transactions don't count against capacity limits
description: A known issue is posted where OneLake compute transactions don't count against capacity limits
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 01/22/2024
ms.custom: known-issue-553
---

# Known issue - OneLake compute transactions don't count against capacity limits

The Microsoft Fabric Capacity Metrics app doesn't show data for OneLake transaction usage reporting. OneLake compute doesn't appear in the Fabric Capacity Metrics app and doesn't count against capacity limits. OneLake storage reporting doesn't have any issues and is reported correctly.

Beginning February 19, 2024, the issue is corrected. Meanwhile, start monitoring your OneLake usage in the [Fabric Capacity Metrics app](/fabric/enterprise/metrics-app) and compare it to your capacity limit. You see OneLake usage labeled as background non-billable. After February 19, OneLake usage will change to background billable, meaning it counts against capacity limits.

OneLake storage reporting doesn't have any issues and is reported correctly.

**Status:** Fixed: January 19, 2024

**Product Experience:** OneLake

## Symptoms

You don't see OneLake compute usage in the Microsoft Fabric Capacity Metrics app.

## Solutions and workarounds

Beginning February 19, 2024, the issue is corrected. You can start monitoring your OneLake usage in the [Fabric Capacity Metrics app](/fabric/enterprise/metrics-app) and compare it to your capacity limits. The Metrics app shows OneLake usage labeled as **background non-billable**. After February 19, OneLake usage will change to **background billable**, meaning it counts against your capacity limits.

OneLake storage reporting doesn't have any issues and is reported correctly.

For updates and information about how to monitor your usage, check [OneLake consumption](/fabric/onelake/onelake-consumption).

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
