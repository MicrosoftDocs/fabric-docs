---
title: Set up on-demand billing (preview)
description: Learn how to enable on-demand billing on a Fabric capacity, create an F0 capacity, and configure spend limits.
ms.topic: how-to
ms.reviewer: mboris
author: harieswar7
ms.author: harieswar
ms.date: 11/06/2026
ai-usage: ai-generated
---

# Set up on-demand billing in Microsoft Fabric

> [!IMPORTANT]
> On-demand billing is currently in preview.
> This information relates to a prerelease product that might be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

You can enable an on-demand billing category on an existing Fabric capacity (F2 or higher), or you can create an F0 capacity with no provisioned CUs. A capacity with one or more enabled categories is a hybrid capacity. For more information, see [On-demand billing in Microsoft Fabric](on-demand-billing.md).

## Prerequisites

- **Role**: You must be a capacity admin to enable on-demand billing or set spend limits. To create an F0 capacity, you need permission to create resources in the Azure subscription. To upgrade or downgrade a capacity, you also need the Azure RBAC actions listed in [Scale your Fabric capacity](scale-capacity.md#prerequisites) on the capacity resource.
- **Quota**: Your subscription must have available on-demand billing quota and on-demand billing-enabled capacity quota for the region. Check your quotas on the **Quotas** page in the Azure portal before enabling on-demand billing. For instructions, see [View and increase on-demand billing quotas](fabric-on-demand-billing-quotas.md).

## Enable on-demand billing for a billing category

When you enable on-demand billing for a category on a paid capacity, operations in that category run outside the capacity's CU limit and are billed separately.

1. Sign in to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal) and go to **Capacity settings**.

1. Select one of your **Fabric capacities**.

1. On the **Details** tab, expand the **On-demand billing** section.

1. Find a billing category, and turn the toggle **On**.

> [!NOTE]
> On-demand Billing for Apache Spark is a separate billing scenario with its own configuration and meter. To learn more, see [On-demand Billing for Spark](../data-engineering/autoscale-billing-for-spark-overview.md).

### Disable on-demand billing for a billing category

To disable on-demand billing, go to the **On-demand billing** section from [Enable on-demand billing for a billing category](#enable-on-demand-billing-for-a-billing-category) and turn the category toggle **Off**.

For details about billing transitions, see [Transition behavior](on-demand-billing.md#transition-behavior).

## Set up spend limits

Spend limits help protect against unexpected expenses by rejecting new operations when a billing category reaches its configured CU-hour threshold for the preceding rolling 24-hour window. A spend limit isn't a hard consumption or billing cap.

1. In **Capacity settings**, select the capacity.

1. In the **On-demand billing** section, find the billing category. Select the **gear icon** next to the category toggle.

1. Enter a value in the **Spend limit** field, measured in CU-hours.

1. Select **Apply**.

Key considerations for spend limits:

- Setting the spend limit to **0** rejects new operations for that category. In-progress operations continue to completion, and operations that don't currently enforce spend limits can continue to consume CUs.
- The maximum value is the quota assigned to that category.
- If you lower the spend limit and it causes the current usage to exceed the new limit, in-progress jobs continue to completion but new jobs are rejected.
- Changes to the spend limit can take a few minutes to take effect.
- If operations are rejected because a spend limit is reached, increase the limit if quota is available or wait for older consumption to age out of the rolling 24-hour window. Check the current limit in **Capacity settings** > **On-demand billing**.

> [!NOTE]
> The following limitations apply to on-demand billing limits:
>
> - VNet data gateways don't currently enforce the on-demand limit configured for a 24-hour period. Gateway uptime consumption, measured in CU-hours, can exceed that limit. As a workaround, run the gateway on an F2 or larger Fabric capacity and disable the serverless usage threshold.

## Create an F0 capacity

An F0 capacity has zero provisioned CUs. All supported billing categories use on-demand billing, and operations are billed through their mapped on-demand billing meters.

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Search for **Microsoft Fabric** and select it.

1. Select **Create**.

1. For the capacity SKU, select **F0**.

1. Complete the remaining fields (subscription, resource group, region, and capacity name).

1. Select **Review + create**, and then select **Create**.

After the F0 capacity is created, set category spend limits in the Fabric admin portal. For instructions, see [Set up spend limits](#set-up-spend-limits).

> [!NOTE]
>
> - You can't turn off on-demand billing on an F0 capacity. To use provisioned CUs, upgrade to a paid SKU.
>
> - Workspace monitoring isn't supported for workspaces assigned to an F0 capacity.
>
> - To run Spark workloads on an F0 capacity, explicitly enable [On-demand Billing for Spark](../data-engineering/configure-autoscale-billing.md) and configure the maximum CUs available to Spark. Spark doesn't use an on-demand billing category spend limit. The highest maximum CU value you can configure is determined by the available capacity quota for the subscription and region.

## Upgrade from F0 to a paid SKU

When your consumption patterns stabilize and you want to benefit from reserved-instance discounts, upgrade to a paid capacity.

Before the upgrade, verify that the subscription has enough available [capacity quota](fabric-on-demand-billing-quotas.md) in the capacity's region for the target SKU. On-demand billing quota doesn't provide quota for a paid capacity SKU.

1. In the Azure portal, go to your F0 capacity resource.

1. Select **Scale**, and then select **Change size**.

1. Select the target SKU (for example, F64).

1. Select **Resize**.

After the upgrade:

- On-demand billing is disabled for all categories.
- New operations use the shared capacity. You can enable on-demand billing again for individual categories.

For details about billing transitions after an upgrade, see [Transition behavior](on-demand-billing.md#transition-behavior).

## Downgrade from a paid SKU to F0

To switch back to a pure pay-as-you-go model, downgrade a paid capacity to F0.

1. In the Azure portal, go to your capacity resource.

1. Select **Scale**, and then select **Change size**.

1. Select **F0**.

1. Select **Resize**.

After the downgrade:

- All supported billing categories use on-demand billing, and you can't turn them off.
- The rolling 24-hour spend limit window starts fresh for each billing category.

For details about billing transitions after a downgrade, see [Transition behavior](on-demand-billing.md#transition-behavior).

## Pause and resume an F0 capacity

You can pause an F0 capacity the same way you pause any Fabric capacity. When the capacity is paused, its billing categories stop accepting requests. For more information, see [Pause and resume your capacity](pause-resume.md).

## Related content

- [On-demand billing in Microsoft Fabric](on-demand-billing.md)
- [Monitor on-demand billing usage in Microsoft Fabric](on-demand-billing-monitor.md)
- [Understand on-demand billing meters and multipliers](on-demand-billing-meters-multipliers.md)
- [View and increase on-demand billing quotas](fabric-on-demand-billing-quotas.md)
- [Pause and resume your capacity](pause-resume.md)
- [Microsoft Fabric capacity quotas](fabric-quotas.md)
