---
title: Configure On-demand Billing for Spark in Microsoft Fabric
description: Learn how to enable On-demand Billing for Apache Spark workloads in Microsoft Fabric and configure maximum capacity units.
ms.reviewer: saravi
ms.topic: how-to
ms.custom:
  - fabcon-2025
ms.date: 03/05/2026
ai-usage: ai-assisted
---

# Configure on-demand billing for Spark in Microsoft Fabric

On-demand billing for Spark provides serverless, pay-as-you-go compute for Spark workloads in Microsoft Fabric. When you enable it, Spark jobs no longer consume shared Fabric capacity.

This article explains how to enable on-demand billing for a Fabric capacity and configure the maximum Capacity Unit (CU) limit.

## Requirements

- **Capacity**: Supported only for **Fabric F-SKUs** (F2 and above). Not supported on **P-SKUs** or **Fabric trial capacities**.
- **Role**: You must be a **Fabric Capacity Administrator**.

> [!IMPORTANT]
> Enabling, disabling, or reducing the **Maximum Capacity Units** setting cancels active Spark jobs that are currently running under on-demand billing.

## Configure on-demand billing

1. Open the [Fabric Admin portal](https://app.fabric.microsoft.com/admin-portal).
1. Under **Governance and insights**, select **Admin portal**.
1. Select **Capacity settings**, then open the **Fabric Capacity** tab.
1. Select the capacity you want to configure.
1. In **Capacity settings**, scroll to **On-demand Billing for Fabric Spark**.
1. Turn on **On-demand Billing**.
1. Use the slider to set **Maximum Capacity Units (CU)** for Spark jobs.

    :::image type="content" source="media/autoscale-configure/on-demand-billing-settings.png" alt-text="Screenshot showing the On-demand billing toggle and CU slider in capacity settings." lightbox="media/autoscale-configure/on-demand-billing-settings.png":::

1. Select **Apply**.


The maximum CU value available on the slider depends on your approved Azure quota and subscription type.

> [!NOTE]
> After you save the setting, Spark pools can use the CU quota defined by on-demand billing.

## Resize and reset capacity for cost optimization

After you enable on-demand billing, consider downsizing your Fabric capacity if Spark workloads no longer use reserved capacity.

1. Go to the [Azure portal](https://portal.azure.com/auth/login/).
1. Search for and select your **Fabric capacity**.
1. Select **Pause**.
1. Wait about 5 minutes, then select **Resume**.
1. Resize to a lower SKU that fits remaining workloads (for example, Power BI, Data Warehouse, Real-Time Intelligence, and Databases).

> [!NOTE]
> Only Azure administrators can resize SKUs, and that change is done in Azure portal.

## Monitor billing and usage

After you enable on-demand billing, monitor your spend in Azure Cost Analysis:

1. Go to the [Azure portal](https://portal.azure.com).
1. Select the **Subscription** linked to your Fabric capacity.
1. Open **Cost Analysis**.
1. Filter by the Fabric capacity resource.
1. Select meter `On-demand for Spark Capacity Usage CU`.
1. Review Spark compute spend.

    :::image type="content" source="media/autoscale-configure/on-demand-cost-analysis.png" alt-text="Screenshot showing Spark usage tracking in Azure Cost Analysis." lightbox="media/autoscale-configure/on-demand-cost-analysis.png":::

## Request additional quotas

If your workloads need a higher CU limit, submit a quota increase request:

1. Go to the [Azure portal](https://portal.azure.com) and sign in.
1. Search for **Azure Quotas**.
1. Select **Microsoft Fabric**.
1. Choose the subscription associated with your Fabric capacity.
1. Enter the new CU limit.
1. Submit the request.

    :::image type="content" source="media/autoscale-configure/on-demand-quotas.gif" alt-text="Graphic showing how to request a higher Fabric quota in Azure Quotas." lightbox="media/autoscale-configure/on-demand-quotas.gif":::

After approval, the updated CU limit is applied to your capacity.

## Related content

- [Overview of on-demand billing for Spark](autoscale-billing-for-spark-overview.md)
