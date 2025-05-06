---
title: Known issue - Premium capacity doesn't add excess usage into carry forward
description: A known issue is posted where premium capacity doesn't add excess usage into carry forward.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/02/2024
ms.custom: known-issue-878
---

# Known issue - Premium capacity doesn't add excess usage into carry forward

In most scenarios, carry forward logic avoids the need to trigger Autoscale for small bursts of usage. Autoscale is only triggered for longer overages as a way to avoid throttling. If you have Power BI Premium, you can set the maximum number of v-cores to use for Autoscale. You don't get any throttling behavior even if your usage is above 100% for a long time.

**Status:** Fixed: May 2, 2025

**Product Experience:** Power BI

## Symptoms

In some cases when you set the maximum number of v-cores to use for Autoscale, you don't see the Autoscale cores triggered as expected. If you face this known issue, you observe the following patterns using the Capacity Metrics App:

- Current usage is clearly higher than the 100% capacity units (CU) line in the Capacity Metrics App
- Little or no overages are added and accumulated during these spikes
- Throttling levels are low and not growing with the overages seen
- Maximum number of v-cores to use for Autoscale is set and active Autoscale isn't reaching it even after long periods higher than average

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
