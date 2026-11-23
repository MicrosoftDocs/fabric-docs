---
title: Monitor on-demand billing usage (preview)
description: Learn how to monitor on-demand billing consumption, track usage against spend limits, and manage quotas in Microsoft Fabric.
ms.topic: how-to
ms.reviewer: mboris, harieswar
ms.date: 11/06/2026
ai-usage: ai-generated
---

# Monitor on-demand billing usage in Microsoft Fabric

> [!IMPORTANT]
> On-demand billing is currently in preview.
> This information relates to a prerelease product that might be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

After you enable an on-demand billing category or create an F0 capacity, use the Microsoft Fabric Capacity Metrics app to track consumption. Use **Quotas** in the Azure portal to view quotas and start quota increase requests. For more information, see [On-demand billing in Microsoft Fabric](on-demand-billing.md).

## Prerequisites

- **Role**: A capacity admin must install and configure the Capacity Metrics app. To view an installed report, you need access to the report from the capacity admin who shares it.
- **Capacity Metrics app**: Install the app if you haven't already. For instructions, see [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md).

## Monitor on-demand billing consumption

The Capacity Metrics app shows on-demand consumption at the capacity and billing category levels.

### View on-demand compute

Use the **On-demand compute** tab to see consumption for each billing category.

1. Open the **Microsoft Fabric Capacity Metrics** app.

1. Select the capacity you want to monitor.

1. Go to the **On-demand compute** tab.

> [!NOTE]
> In a region with no on-demand billing-enabled capacities, some visuals on the **On-demand compute** page might appear blank or display an error.

The **On-demand compute** tab shows:

- **Cumulative CU-hour consumption** for each billing category over the selected time period.
- **Usage relative to spend limits** for each category, so you can see how close you are to your configured limits.
- **Consumption trends** over the past 14 days.
- **Overall consumption** across all billing categories on the capacity.
- **Consumption per item type, item, and operation** for detailed analysis.

> [!NOTE]
> The following limitations apply to on-demand billing limits:
>
> - VNet data gateways don't currently enforce the on-demand limit configured for a 24-hour period. Gateway uptime consumption, measured in CU-hours, can exceed that limit. As a workaround, run the gateway on an F2 or larger Fabric capacity and disable the serverless usage threshold.

### Understand the consumption view

The consumption view shows how CU-hours add up over the rolling 24-hour window for each billing category. When you enable on-demand billing for a category, its consumption appears on the **On-demand compute** tab. When you disable on-demand billing, new consumption returns to the **Compute** tab.

> [!TIP]
> Review the **On-demand compute** tab regularly during the first few weeks after enabling on-demand billing. This practice helps you establish baseline consumption patterns and set appropriate spend limits.

### Azure bill

Your Azure bill reports on-demand consumption through separate Azure on-demand billing meters. A billing category can include operations mapped to multiple meters. You can distinguish between:

- **Capacity charges** for Fabric capacities (F2 or higher).
- **On-demand charges** reported through on-demand billing meters.
- **Storage charges** billed separately from compute.

## Manage on-demand billing quotas

Microsoft manages quotas to protect against fraud and maintain service health. On-demand billing has two quota types:

- **On-demand billing quota**
- **On-demand billing-enabled capacity quota**

For more information, see [View and increase on-demand billing quotas](fabric-on-demand-billing-quotas.md).

Use the [on-demand billing quota guidance](fabric-on-demand-billing-quotas.md) as the authoritative instructions for viewing quotas and requesting an increase. An approved quota increase doesn't change an existing spend limit for the on-demand billing category. Update the spend limit separately in **Capacity settings** if you want the category to use the increased quota.

## Other monitoring surfaces

The following limitations apply to other Fabric monitoring experiences:

- The Monitor hub capacity-health page doesn't visualize on-demand billing consumption. Use the **On-demand compute** page in the Capacity Metrics app instead.
- During the public preview of on-demand billing, the capacity operation event schema doesn't distinguish between operations that use provisioned capacity and operations that use on-demand billing. For more information, see [Explore Fabric capacity operation events](../real-time-hub/explore-fabric-capacity-operation-events.md).
- Capacity overview events don't include on-demand consumption for F0 or hybrid capacities.

## Related content

- [On-demand billing in Microsoft Fabric](on-demand-billing.md)
- [Set up on-demand billing in Microsoft Fabric](on-demand-billing-setup.md)
- [Understand on-demand billing meters and multipliers](on-demand-billing-meters-multipliers.md)
- [View and increase on-demand billing quotas](fabric-on-demand-billing-quotas.md)
- [What is the Microsoft Fabric Capacity Metrics app?](metrics-app.md)
- [Microsoft Fabric capacity quotas](fabric-quotas.md)
