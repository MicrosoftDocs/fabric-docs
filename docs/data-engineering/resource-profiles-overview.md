---
title: Resource profiles in Microsoft Fabric overview
description: Understand what Spark resource profiles are in Microsoft Fabric, how the built-in profiles map to workloads, and how auto-update keeps their configurations current.
ms.service: fabric
ms.subservice: data-engineering
ms.topic: overview
ms.date: 07/23/2026
author: SnehaGunda
ms.author: sngun
ms.reviewer: saravi
ai-usage: ai-assisted
---

# Resource profiles in Microsoft Fabric overview

Resource profiles in Microsoft Fabric are predefined sets of Apache Spark configurations that tune your workspace for a specific workload pattern—such as read-heavy analytics or write-heavy ingestion—without manual trial and error. Setting a single property applies a tested collection of Spark and Delta Lake settings, giving you predictable performance by default.

This article explains the concepts behind resource profiles, the difference between selecting a profile and enabling *auto-update*, and how V-Order fits in. Use it as a starting point before you configure profiles or inspect their exact configuration values.

## Key concepts

Two related but distinct mechanisms are involved. Keeping them separate avoids the most common source of confusion.

### 1. The resource profile

A resource profile is the workload preset you select through the `spark.fabric.resourceProfile` property. Setting this property applies that profile's default set of Spark and Delta Lake configurations to your Spark sessions. For example, selecting `readHeavyForPBI` enables V-Order because `spark.sql.parquet.vorder.default=true` is part of that profile's configuration set.

You always have exactly one active profile. New Fabric workspaces default to `writeHeavy`, in which V-Order is disabled to favor ingestion performance. You never "turn off" resource profiles; instead, you switch to a different built-in profile or to `custom` to define your own configurations.

### 2. Auto-update

Auto-update is an optional capability that keeps a profile's configuration aligned with the latest optimizations that Fabric ships over time. It's expressed through the `spark.fabric.resourceProfile.<profileName>AutoUpdate` properties—for example, `spark.fabric.resourceProfile.readHeavyForPBIAutoUpdate`.

Keep the following in mind:

- **Auto-update variants are not separate profiles.** `readHeavyForPBIAutoUpdate` is the auto-update form of the same `readHeavyForPBI` profile—not a new or different profile.
- **Auto-update isn't required to get a profile's benefits.** Selecting `readHeavyForPBI` already enables V-Order today. Auto-update governs whether Fabric may refresh those tuned values automatically in the future, not whether they apply now.
- **Auto-update stays within your profile's boundaries.** It adjusts Delta Lake write behavior and file layout for your workload type. It doesn't change your pool size, node configuration, or autoscale settings.

## Available profiles

| Profile | Optimized for | V-Order default |
| --- | --- | --- |
| `readHeavyForPBI` | Power BI and DirectLake queries over Delta tables | Enabled |
| `readHeavyForSpark` | Spark workloads with frequent reads | Disabled (optimized write) |
| `writeHeavy` (default) | High-frequency ingestion, ETL, and streaming | Disabled |
| `custom` | Fully user-defined configuration | User-defined |

To enable V-Order through a profile for Power BI and DirectLake scenarios, use `readHeavyForPBI`. For the complete list of properties each profile applies, see [Resource profile configurations](configure-resource-profile-configurations.md).

## Choose your next step

- To learn how to select a workload-based recommendation and apply a profile to your workspace, see [Configure resource profiles](configure-resource-profiles.md).
- To review the exact Spark and Delta Lake properties that each profile and auto-update variant applies, see [Resource profile configurations](configure-resource-profile-configurations.md).
- To understand how V-Order accelerates read-heavy workloads, see [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md).

## Related content

- [Configure resource profiles](configure-resource-profiles.md)
- [Resource profile configurations](configure-resource-profile-configurations.md)
- [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md)
