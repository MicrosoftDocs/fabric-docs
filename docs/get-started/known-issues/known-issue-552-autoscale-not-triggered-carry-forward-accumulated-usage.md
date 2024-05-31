---
title: Known issue - Autoscale not triggered by carry forward accumulated usage
description: A known issue is posted where carry forward accumulated usage doesn't trigger Autoscale.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting
ms.service: powerbi
ms.subservice: pbi-troubleshooting
ms.date: 05/24/2024
ms.custom: known-issue-552
---

# Known issue - Autoscale not triggered by carry forward accumulated usage

This known issue relates to two main concepts on the premium capacity administration: Autoscale and carry forward usage.

Autoscale allows capacity administrators to automatically trigger individual Power BI v-cores whenever the capacity usage reaches the purchased capacity limits. With the latest updates on the capacity usage rules, we now allow capacity usage to consume future CPU. We also carry forward the excess usage to be burned down in the future windows. Capacity throttling is only applied when we [can't clear the carry forward usage after an extended period](../../enterprise/throttling.md#future-smoothed-consumption).

In this known issue, if you set a maximum of Autoscale v-cores to be used, Autoscale v-cores are only activated based on the current usage. Autoscale doesn't get activated by the excess carry forward usage.
If Autoscale v-cores are active due to current usage, they're used to burn down any carried forward usage.

Autoscale is a valuable mechanism to prevent capacity usage exceeding 100% and to add usage into the carry forward to be paid off in a future window.

**APPLIES TO:** ✔️ Power BI

**Status:** Fixed: May 2, 2024

**Problem area:** Capacity Management

## Symptoms

If you set up a maximum value of Autoscale v-cores, you might see the Autoscale v-cores activated don't appear to reach the maximum number. Autoscale v-cores are only activated for the current usage, so even if you accumulate carry forward, the carry forward usage doesn't count towards activating Autoscale. If Autoscale is activated through normal usage, the extra v-cores do still help pay off any accumulated carry forward.

## Solutions and workarounds

The known issue is fixed, and the Autoscale logic is different. Learn more at [Using Autoscale in Power BI Premium](/power-bi/enterprise/service-premium-auto-scale#when-is-autoscale-triggered).

## Related content

- [Using Autoscale with Power BI Premium](/power-bi/enterprise/service-premium-auto-scale)
- [Fabric capacity throttling logic](../../enterprise/throttling.md)
- [About known issues](/power-bi/troubleshoot/known-issues/power-bi-known-issues)
