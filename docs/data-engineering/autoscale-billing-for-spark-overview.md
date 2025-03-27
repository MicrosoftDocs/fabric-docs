---
title: Autoscale Billing for Spark in Microsoft Fabric
description: Learn about the Autoscale Billing model for Apache Spark in Microsoft Fabric and how it enables flexible, pay-as-you-go compute for Spark workloads.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.custom:
ms.date: 03/26/2025
---

# Autoscale Billing for Spark in Microsoft Fabric

Autoscale Billing for Spark introduces a new pay-as-you-go billing model for Apache Spark workloads in Microsoft Fabric, designed to provide greater flexibility and cost optimization. With this model enabled, Spark jobs no longer consume compute from the Fabric capacity but instead use dedicated, serverless resources billed independently—similar to Azure Synapse Spark.

This model complements the existing capacity-based model in Fabric, allowing organizations to choose the right compute model for their workloads.

> [!NOTE]
> Autoscale Billing is available for workspaces hosted on F2 capacity or higher and must be explicitly enabled per workspace.

## Choosing between Autoscale Billing and Capacity Model

| Feature               | Capacity Model                        | Autoscale Billing for Spark            |
|-----------------------|----------------------------------------|----------------------------------------|
| **Billing**           | Fixed cost per capacity tier           | Pay-as-you-go for Spark jobs           |
| **Scaling**           | Capacity shared across workloads       | Spark scales independently             |
| **Resource Contention** | Possible between workloads             | Dedicated compute limits for Spark              |
| **Best Use Case**     | Predictable workloads                  | Dynamic or bursty Spark jobs           |

By strategically using both models, teams can balance cost and performance—running stable, recurring jobs on capacity while offloading ad-hoc or compute-heavy Spark workloads to Autoscale Billing.

## Key benefits

- ✅ **Cost efficiency** – Pay only for Spark job runtime.
- ✅ **Independent scaling** – Spark workloads run without affecting other capacity-based operations.
- ✅ **Enterprise-ready** – Integrates with Azure Quota Management for scaling flexibility.

## How Autoscale Billing works

When enabled, Autoscale Billing changes how Spark workloads are handled:

- Spark jobs will be offloaded from the Fabic Capacity and do **not** consume CU from Fabric capacity.
- A max CU limit can be configured to align with budget or governance policies. This limit is just a max limit(more like a quota) for your Spark workloads. You only get charged for the CUs your jobs use and there is no idle compute costs.
- There is no change to the bill rate for Spark. Cost of Spark remains the same which is 0.5 CU Hour 
- Once the CU limit is reached, Spark jobs will queue (batch) or throttle (interactive).
- Spark usage and cost are reported separately in the **Fabric Capacity Metrics App** and **Azure Cost Analysis**.

:::image type="content" source="media\autoscale-billing-overview\autoscale-billing-diagram.gif" alt-text="Diagram showing how Autoscale Billing for Spark operates separately from Fabric capacity." lightbox="media\autoscale-billing-overview\autoscale-billing-diagram.gif":::

> [!IMPORTANT]
> Autoscale Billing is **opt-in per Capacity** and **does not burst from or fall back to** the Fabric capacity. It is purely serverless and pay-as-you-go. You enable the autoscale billing and you set the max limits and only get charged for CUs consumed by the jobs that you run.

## Job concurrency and queuing behavior

When Autoscale Billing is enabled, Spark job concurrency is governed by the **maximum Capacity Unit (CU) limit** defined by the Fabric Capacity Admin. Unlike the standard capacity model, there is **no bursting or smoothing**.

- **Interactive Spark jobs** (such as *Lakehouse operations*, *table preview*, *Load to Table*, or *interactive notebook queries*) will be **throttled** once the available CUs are fully utilized.
- **Background Spark jobs** (triggered by *pipelines*, *job scheduler*, *API executions*, *Spark job definitions*, or *table maintenance*) will be **queued**.

The queue size is directly tied to the CU limit:

> For example, if the max CU limit is set to **2048**, the Spark job queue can hold up to **2048 jobs**.

This model ensures that resource allocation remains predictable and controllable while still supporting high-volume, bursty workloads.

## Next steps

- [Configure Autoscale Billing for Spark](configure-autoscale-billing.md)
- [Monitor usage and optimize spend](monitor-autoscale-usage.md)
