---
title: Apache Airflow Compute in Fabric
description: Understand Microsoft Fabric's Airflow pools. Learn about Small vs. Large nodes, autoscaling, and how to choose the right capacity SKU for your needs.
author: Mirabile-S
ms.author: seanmirabile
ms.reviewer: whhender
ms.date: 10/17/2025
ms.topic: concept-article
ai-usage: ai-assisted
---

# Microsoft Fabric Airflow compute

This guide explains the available options for Apache Airflow custom pools in Microsoft Fabric and their performance and cost implications. We cover Pool options, Small vs. Large node pools, the effects of autoscaling and extra nodes, and an analysis of capacity unit (CU) consumption. We also discuss usage scenarios (dev/test vs. production) and recommend how to choose an appropriate Fabric Capacity SKU for your Airflow workloads. The goal is to help technical users make informed decisions that balance performance and cost. 

## Starter pools vs. custom pools

Microsoft Fabric offers two types of Airflow pools: **Starter Pools** and **Custom Pools**. Understanding their differences helps you choose the right option for your workload. 

The **Starter Pool** is the default choice, designed for simplicity and cost efficiency. It uses a Large compute size (around 4 vCPUs and 16-GB RAM) and starts instantly when needed. To save costs, it automatically shuts down after 20 minutes of inactivity, making it ideal for development or intermittent workloads. 

**Custom Pools** are built for production scenarios where the Airflow scheduler must run continuously. They're always-on, ensuring jobs start without delay. Unlike Starter Pools, Custom Pools let you choose the node size, either Small (≈2 vCPUs, 8-GB RAM) or Large (≈4 vCPUs, 16-GB RAM) and enable autoscaling or add extra nodes for higher concurrency. 

## Small vs. large nodes in custom pools

**Node size options:** Microsoft Fabric allows Airflow custom pools in two sizes – Small and Large. In practice, a large pool can handle more parallel Airflow workloads while a small pool is suited for lighter loads. Both pool sizes deploy as a three node cluster by default (typically one Airflow scheduler, one web server, and one worker node). 

**Always-on cluster:** The base three node cluster of a custom pool runs continuously unless you manually pause it, which means it will always steadily consume capacity units (CUs) at a rate of about 5 CUs for Small, or 10 CUs for Large. This persistent runtime ensures the Airflow scheduler is always available to start jobs immediately, but it also means there's a constant cost (more on this below). Microsoft recommends using Starter pools for dev/test scenarios (Starter pools automatically shut down after 20 minutes of idle time) and Custom pools for production where you need the scheduler running 24/7. In other words, for development or infrequent workloads, a Starter pool can save costs by not running when idle, whereas for mission-critical production pipelines that run continuously or frequently, a Custom pool is preferred to avoid startup delays. 

## "Always on" base cost implications

Unlike Starter pools, custom pools don't auto-shutdown when idle. This means you'll incur the base 5 CUs (Small) or 10 CUs (Large) continuously regardless of whether Airflow jobs are running or not. Even if no DAGs are executing overnight or during a lull, the cluster’s base compute capacity is still allocated and billed. This is essentially the trade-off for instant scheduling without a cold start delay. (By contrast, a Starter pool would shut down after being idle and cost nothing until it starts up again, at the expense of a cold start when a new job triggers.) 

*Manual pause option:* If needed, you *can* manually pause a custom pool (or the entire Fabric capacity) during extended downtimes to save on costs. Pausing deallocates the cluster so that it stops consuming CUs. However, no scheduling or job execution can occur while the pool is paused, so this is only practical if you're confident no workflows need to run during that period. Once resumed, the pool will take a few minutes to become available (similar to a cold start). 

## Autoscaling and extra nodes

One advantage of custom pools is the ability to add extra worker nodes to increase parallel processing capacity. You can configure static extra nodes or enable autoscaling to dynamically spin up extra nodes based on workload demand. Each extra node contributes roughly three more Airflow workers that can execute tasks in parallel, increasing the throughput of your DAGs. 

**Autoscaling behavior:** Extra nodes don't run continuously by default. If Autoscale is enabled, the Fabric service spawns extra nodes only when the current workload exceeds the capacity of the base workers (for example, when there are more queued tasks than the base cluster can handle). These nodes will automatically shut down when the load subsides, and they're no longer needed. This means the actual CU consumption for extra nodes directly follows your usage patterns – if your Airflow workflows have periodic spikes in activity, autoscaling ensures you only pay for the extra nodes during those high-load periods. On the other hand, if your Airflow jobs are consistently busy or if you configure a fixed number of extra nodes to always be present, you'll be paying for the extra CUs continuously (similar to the base nodes). 

> [!NOTE]
> The base 3 nodes always run full-time in a custom pool (incurring the fixed 5 or 10 CU cost). Only the extra nodes scale in/out with usage. If you don’t configure any extra nodes, your cost is just the fixed base cost. If you do add extra nodes, we recommend you enable autoscaling (and set a sensible maximum) so that you’re not running all extra nodes 100% of the time needlessly. This prevents waste if the extra capacity is only needed intermittently. 

## Capacity units and pricing basics

Microsoft Fabric measures compute consumption in **Capacity Units (CUs)** – a normalized unit of compute resource usage across the platform. All Fabric workloads (including Airflow) consume CUs. Understanding the CU consumption rates for Airflow pools is key to estimating cost: 

- A **Small custom pool’s base cluster** consumes **5 CUs** continuously. 

- A **Large custom pool’s base cluster** consumes **10 CUs** continuously. 

- **Each extra Small-node** (when active) adds about **0.6 CUs** of consumption. 

- **Each extra Large-node** (when active) adds about **1.3 CUs** of consumption. 

These rates are applied per second of runtime. Over time, they accumulate into CU-hours (for example, running a Small pool for one hour uses 5 CU-hours; if one extra small-node ran for that same hour, it would add 0.6 CU-hours for a total of 5.6 CU-hours). 

**Cost per CU-hour:** As of the current pricing, 1 CU-hour on a pay-as-you-go plan costs about \$0.18. If you have Reserved capacity, the effective rate is lower – roughly \$0.107 per CU-hour, which is about 59% of the pay-as-you-go rate (a ~41% discount). These figures are based on Microsoft’s Fabric pricing in USD for a typical region (East US for example). They'll be used in the [following cost examples](#analysis-of-cost-scenarios). (Keep in mind Azure considers 730 hours as roughly one month for pricing purposes.) 

## Analysis of cost scenarios

- A **Large pool (10 CUs base)** costs roughly double what a Small pool (5 CUs base) costs for the always-on cluster 

- **Adding one extra node** increases costs only modestly in comparison.  

- Small pool, going from 5 CUs to 5.6 CUs is about a 12% increase in CU consumption.  

- Large pool, 10 to 11.3 CUs is a 13% increase.  

- This also reflects that an extra node is smaller (in CPU/RAM) than the entire base cluster. 

- Choosing a **Reserved capacity** yields significant savings if you run these workloads continuously. Reserved costs are about 59% of the pay-as-you-go costs (due to the ~41% discount). If you plan to operate Airflow pools 24/7 in production, reserved capacity is highly cost-effective. 

- **Usage patterns matter:** The base cost remains fixed as long as the pool is up; the extra node costs scale with usage. The key to optimizing cost is to minimize how long extra nodes remain active—scale out only when necessary and scale in when idle. 

- Always **match the pool size to your workload**. Choose Small vs Large based on the parallelism and load you need, and then use autoscaling to handle spikes efficiently. 

## Dev/test vs. production: Starter vs. custom pools

It’s important to choose the right type of Airflow pool for your scenario: 

- **Starter pools** (included by default in Fabric) are great for *development, testing,* or infrequent workflows. 

- **Custom pools** are intended for *production* or mission-critical workflows that require continuous availability. 

The fundamental differences are outlined in this table: 

| **Pool Type**      | **Intended Usage**                         | **Idle Behavior**                           | **Idle Cost**                       | **Startup Delay**                                         |
|:------------------:|:------------------------------------------:|:-------------------------------------------:|:-----------------------------------:|:---------------------------------------------------------:|
| **Starter Pool**   | Dev/Test environments or infrequent jobs   | Auto-shutdown after ~20 min of inactivity | No cost when idle (0 CUs when off)  | Requires cold start (~3-5 min spin-up) when a new job triggers after idle  |
| **Custom Pool**    | Production pipelines needing 24/7 scheduling | Always on (runs continuously unless manually paused) | Constant base cost (5 or 10 CUs even if idle) | No cold start delay (scheduler is already running)         |

In short, if your Airflow process can tolerate a cold start delay and doesn’t run continuously, a Starter pool can be far cheaper because it frees resources when idle. Starter pools are automatically created and managed by Fabric; they use a preheated cluster that turns off when not in use. The downside is the next time a DAG triggers after a period of idleness, the cluster needs to spin up (which could take a few minutes). 

If your workflows require steady or frequent scheduling, or you have strict SLAs that demand the scheduler is always ready, then a Custom pool is the better choice despite its always-on cost. Always evaluate if a Starter pool could meet your needs before committing to the cost of a custom pool’s permanent runtime. Many teams use Starter pools for dev/test and switch to Custom pools for production deployments. 

## Choosing an appropriate Fabric capacity SKU

To run Airflow custom pools, you need to make sure your Microsoft Fabric capacity can handle your pool’s needs. The size and number of your Airflow pools helps determine which Fabric SKU to choose: 

- **Small Pool (5 CUs base):** Needs at least 5 CUs, so F8 (8 CUs) is the minimum recommended. This gives enough room for the pool and some extra nodes. 

- **Large Pool (10 CUs base):** Needs at least 10 CUs, so F16 (16 CUs) is the right choice. This covers the base and allows for scaling out. 

- **Multiple Pools or Shared Workloads:** If you’re running several pools or sharing capacity with other workloads, add up all your peak CU needs. For example, two Large pools (2 × 10 CUs = 20 CUs) would require F32 (32 CUs) to run smoothly with some buffer. 

## Best practices and considerations

- **Monitor Actual CU Usage:** Take advantage of the Fabric Capacity Metrics App (if available in the Fabric portal) to watch your Airflow job’s CU consumption in real time. It will show how many CUs are used by the base and extra nodes over time. This data is invaluable for understanding your peak usage, average usage, and idle periods. You can also use the Azure Pricing Calculator or any Capacity Estimator tools provided by Microsoft to model your costs by inputting your expected usage hours and concurrency. Regularly monitoring ensures there are no surprises in your bill and helps right-size your capacity. 

- **Configure Autoscaling Wisely:** If you enable autoscaling for extra nodes, set a maximum number of extra nodes that align with your capacity limits. For example, if you only have an F8 capacity (8 CUs), don't allow autoscaling to add 3 large nodes (which would require ~3×1.3 = 3.9 CUs extra + 10 base = ~13.9 CUs total) because you would exceed your available CUs. Essentially, cap the scale-out such that Total CUs (base + extras) ≤ your capacity size. This prevents performance issues or over-utilization.  

By understanding the sizing options (Small vs Large nodes) and how they consume capacity, along with how features like autoscaling and reserved pricing affect costs, you can configure Airflow custom pools optimally for your scenario. In summary, Small pools (5 CUs base) cost about half as much as Large pools (10 CUs) for the always-on part; extra nodes add cost roughly linearly with their usage. Pay-as-you-go is flexible for sporadic or initial usage, but if you run production jobs continuously, purchasing a Fabric capacity (for example, F8 for Small, F16 for Large) and using reserved pricing will drastically reduce the monthly cost. Always tailor the pool size and scaling settings to your DAG patterns (concurrency, schedule frequency, idle time) to strike the right balance between performance and cost efficiency. With this and monitoring of your actual usage, you can confidently choose a pool configuration and capacity SKU that meets your needs without overspending. 

- [Microsoft Fabric concepts - Microsoft Fabric | Microsoft Learn](/fabric/enterprise/licenses#capacity) 

- [Microsoft Fabric - Pricing | Microsoft Azure](https://azure.microsoft.com/en-us/pricing/details/microsoft-fabric/?msockid=28b819e96af26c1909f70b906ba46d0f) 

- [Plan your capacity size - Microsoft Fabric | Microsoft Learn](/fabric/enterprise/plan-capacity) 

- [Pricing for Apache Airflow job - Microsoft Fabric | Microsoft Learn](/fabric/data-factory/pricing-apache-airflow-job) 

- [Apache Airflow Job workspace settings - Microsoft Fabric | Microsoft Learn](/fabric/data-factory/apache-airflow-jobs-workspace-settings)
