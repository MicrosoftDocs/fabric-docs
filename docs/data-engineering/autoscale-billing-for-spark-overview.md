---
title: Autoscale Billing for Spark in Microsoft Fabric
description: Learn about the Autoscale Billing model for Apache Spark in Microsoft Fabric and how it enables flexible, pay-as-you-go compute for Spark workloads.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/05/2026
ai-usage: ai-assisted
---

# Autoscale Billing for Spark in Microsoft Fabric

Autoscale Billing for Spark is a pay-as-you-go billing model for Apache Spark workloads in Microsoft Fabric. When enabled, Spark jobs no longer consume compute from your Fabric capacity. Instead, jobs use dedicated serverless resources that are billed independently.

This model complements the standard capacity model so you can choose the best option per workload.

## Choose between autoscale billing and capacity model

| Feature | Capacity model | Autoscale Billing for Spark |
|---|---|---|
| **Billing** | Fixed cost per capacity tier | Pay-as-you-go for Spark jobs |
| **Scaling** | Capacity shared across workloads | Spark scales independently |
| **Resource contention** | Possible between workloads | Dedicated compute limits for Spark |
| **Best use case** | Predictable workloads | Dynamic or bursty Spark jobs |

You can combine both models to balance cost and performance. For example, run stable recurring workloads on capacity and move bursty or ad hoc Spark workloads to autoscale billing.

## Key benefits

- **Cost efficiency**: Pay only for Spark job runtime.
- **Independent scaling**: Spark workloads run without affecting other capacity-based operations.
- **Enterprise-ready**: Integrates with Azure Quota Management for scaling flexibility.

## How autoscale billing works

When autoscale billing is enabled:

- Spark jobs are offloaded from Fabric capacity and don't consume CU from that capacity.
- You set a maximum CU limit for Spark workloads (a quota-like limit).
- Billing remains based on Spark usage rate (`0.5 CU hour`) and applies only to active job compute.
- When the CU limit is reached, interactive jobs are throttled and batch jobs are queued.
- Spark usage and cost are shown separately in the **Fabric Capacity Metrics app** and **Azure Cost Analysis**.

> [!IMPORTANT]
> Autoscale billing is **opt-in per capacity** and **does not burst from or fall back to** Fabric capacity. It is a separate serverless pay-as-you-go model.

## Job concurrency and queuing behavior

When autoscale billing is enabled, Spark concurrency is governed by the **maximum Capacity Unit (CU) limit** configured by the Fabric capacity admin. Unlike standard capacity, autoscale billing doesn't use bursting or smoothing.

- **Interactive Spark jobs** (for example Lakehouse operations, table preview, Load to Table, or interactive notebook queries) are **throttled** when available CUs are fully used.
- **Background Spark jobs** (triggered by pipelines, scheduler, API executions, Spark Job Definitions, or table maintenance) are **queued**.

The queue size is tied to the CU limit.

> [!NOTE]
> If the max CU limit is **2048**, the Spark queue can hold up to **2048 jobs**.

This behavior keeps allocation predictable and controllable while supporting high-volume Spark workloads.

## Request additional quotas

If your Data Engineering or Data Science workloads require a higher quota than your current maximum CU limit, request an increase in Azure Quotas:

1. Navigate to the [Azure portal](https://portal.azure.com) and sign in.
1. In the search bar, type and select **Azure Quotas**.
1. Choose **Microsoft Fabric** from the list of available services.
1. Select the subscription associated with your Fabric capacity.
1. Edit the quota limit by entering the new CU limit that you intend to acquire.
1. Submit your quota request.

:::image type="content" source="media/autoscale-billing-overview/autoscale-quotas.gif" alt-text="Diagram showing autoscale settings in capacity settings, including a toggle and slider for maximum capacity units." lightbox="media/autoscale-billing-overview/autoscale-quotas.gif":::

After approval, the updated CU limit is applied to your Fabric capacity.

## Related content

- [Configure Autoscale Billing for Spark](configure-autoscale-billing.md)
