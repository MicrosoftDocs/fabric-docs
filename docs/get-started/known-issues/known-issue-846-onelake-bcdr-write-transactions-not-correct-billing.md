---
title: Known issue - OneLake BCDR write transactions aren't categorized correctly for billing
description: A known issue is posted where OneLake BCDR write transactions aren't categorized correctly for billing.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/28/2025
ms.custom: known-issue-846
---

# Known issue - OneLake BCDR write transactions aren't categorized correctly for billing

You can enable Business Continuity and Disaster Recovery (BCDR) for a specific capacity in Fabric. The write transactions that OneLake reports that go through our client are categorized and billed as non-BCDR.

**Status:** Fixed: January 28, 2025

**Product Experience:** OneLake

## Symptoms

You see under-billing of write transactions since you're billed at the non-BCDR rate.

## Solutions and workarounds

We fixed the issue, and all BCDR operations via Redirect are now correctly labeled as BCDR. Because BCDR Write operations consume more compute units (CUs) compared to non-BCDR Writes, you see BCDR Write operations marked as nonbillable in the Microsoft Fabric Capacity Metrics app until January 2025. In January 2025, OneLake BCDR Write operations via Redirect become billable and start consuming the CUs.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
