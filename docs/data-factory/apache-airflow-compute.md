---
title: Apache Airflow compute in Fabric
description: Learn about Apache Airflow pools in Microsoft Fabric, including node sizes, autoscaling, and how to pick the right capacity SKU for your needs.
ms.reviewer: seanmirabile
ms.date: 10/17/2025
ms.topic: concept-article
ai-usage: ai-assisted
---

# Apache Airflow compute in Fabric

This guide explains how Apache Airflow pools work in Microsoft Fabric. You'll learn about pool types, node sizes, autoscaling, and how to estimate costs. We'll also help you choose the right Fabric capacity SKU for your Apache Airflow workloads.

## Apache Airflow pool types

Microsoft Fabric offers two types of Apache Airflow pools:

- **Starter pools**: Good for development, testing, or jobs that run occasionally.
- **Custom pools**: Designed for production workloads that need to run all the time.

**Starter pools** use large nodes (about 4 vCPUs and 16-GB RAM) and start up quickly when you need them. They shut down automatically after 20 minutes of inactivity, so you don't pay for idle time. This makes them a good fit for dev/test or jobs that run infrequently.

**Custom pools** stay on all the time, so jobs start right away. You can pick small nodes (about 2 vCPUs, 8-GB RAM) or large nodes (about 4 vCPUs, 16-GB RAM), and you can add extra nodes or turn on autoscaling for more parallel processing.

## Choose the right pool for your scenario

| Pool type      | Intended use                  | Idle behavior                | Idle cost                | Job run delay                      |
|:--------------:|:----------------------------:|:----------------------------:|:------------------------:|:-----------------------------------:|
| Starter pool   | Dev/test or infrequent jobs  | Auto-shutdown after ~20 min  | No cost when idle        | Cold start (~3–5 min) after idle    |
| Custom pool    | Production, 24/7 scheduling  | Always on (unless paused)    | [Constant base cost](#capacity-units-and-pricing)| No delay    |

Starter pools work well if you don't need jobs to run all the time and can wait a few minutes for the cluster to start. Custom pools are better for production or jobs that need to run on a schedule.

Many teams use starter pools for dev/test and custom pools for production.

>[!TIP]
> Evaluate if a starter pool could meet your needs before committing to the cost of a custom pool’s permanent runtime. 

## Custom pool node sizes

Custom pools come in two sizes:

- **Small nodes**: About 2 vCPUs and 8-GB RAM.
- **Large nodes**: About 4 vCPUs and 16-GB RAM.

Each custom pool starts with three nodes by default—usually one scheduler, one web server, and one worker. These nodes run all the time unless you pause the pool manually.

Small pools use less capacity and cost less, but handle fewer parallel jobs. Large pools handle more jobs at once, but cost more.

### Autoscaling and extra nodes

Custom pools let you add extra worker nodes for more parallel processing. Each extra node adds about three more Apache Airflow workers. You can set a fixed number of extra nodes or turn on autoscaling.

- **Autoscaling**: Extra nodes start up only when needed, based on workload. When the load drops, they shut down automatically.
- **Fixed extra nodes**: These run all the time and add to your base cost.

> [!TIP]
> The base three nodes in a custom pool always run unless you pause the pool. Extra nodes scale in and out with your workload. If you add extra nodes, it's a good idea to use autoscaling and set a sensible maximum so you don't run more nodes than you need.

## Pick a Fabric capacity SKU

To run Apache Airflow custom pools, make sure your Fabric capacity is large enough:

- **Small pool (5 CUs base)**: F8 (8 CUs) is the minimum recommended.
- **Large pool (10 CUs base)**: F16 (16 CUs) is the minimum recommended.
- **Multiple pools or shared workloads**: Add up all your peak CU needs. For example, two large pools (2 × 10 CUs = 20 CUs) need F32 (32 CUs) to run smoothly with some buffer.

## Capacity units and pricing

Microsoft Fabric measures compute usage in **Capacity Units (CUs)**. All workloads, including Apache Airflow, use CUs.

For specifics about CUs and the pricing model for Apache Airflow pools, see [Apache Airflow job pricing for Data Factory in Microsoft Fabric](pricing-apache-airflow-job.md).

For pricing specifics in your region, see [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).


> [!TIP]
> Custom pools don't shut down automatically when idle.
>
> You pay for the base nodes (5 CUs for small, 10 CUs for large) as long as the pool is running, even if no jobs are running.
>
> If you want to save costs during downtime, you can manually pause a custom pool or your whole Fabric capacity. When paused, the pool stops using CUs, but you can't run jobs until you resume it. Resuming takes a few minutes.

## Best practices

When you plan your Apache Airflow pool setup, keep these best practices and cost factors in mind:

- **Pool size matters**
  - A large pool (10 CUs base) uses about twice as much capacity as a small pool (5 CUs base). Large pools support more parallel jobs, but you'll pay more for the extra capacity.

- **Extra nodes and scaling**
  - Adding one extra node increases your total capacity units (CUs) by about 12% for a small pool (from 5 to 5.6 CUs) or 13% for a large pool (from 10 to 11.3 CUs). Extra nodes are smaller than the base cluster, so the cost bump is moderate.
  - Autoscaling lets you add extra nodes only when needed, so you pay for extra capacity only during busy times.

- **Reserved vs. pay-as-you-go capacity**
  - Reserved capacity costs about 59% of pay-as-you-go rates, due to a discount. If you run Apache Airflow pools all day, every day, reserved capacity usually costs less overall.

- **Usage patterns**
  - The base cost stays the same as long as the pool is running, even if no jobs are running. Extra node costs go up and down with usage. To keep costs down, scale out only when you need more power, and scale in when things are quiet.

- **Right-size your pool**
  - Pick a pool size that matches your workload. Use small pools for lighter jobs and large pools for heavier or more parallel jobs. Autoscaling helps you handle spikes without overpaying when things are slow.

- **Monitor CU usage**
  - Use the Fabric Capacity Metrics App to track your Apache Airflow job's CU usage. This helps you understand peak and average usage, and plan your capacity.

- **Set autoscaling limits**
  - If you use autoscaling, set a maximum number of extra nodes that fit your capacity. For example, with F8 (8 CUs), don't let autoscaling add 3 large nodes (which would require ~3×1.3 = 3.9 CUs extra + 10 base = ~13.9 CUs total), which is more nodes than your capacity can handle. Cap the scale-out such that Total CUs (base + extras) ≤ your capacity size. This prevents performance issues or over-utilization.  

## Related content

- [Get started with Apache Airflow jobs](create-apache-airflow-jobs.md)
- [Apache Airflow Job workspace settings - Microsoft Fabric | Microsoft Learn](apache-airflow-jobs-workspace-settings.md)
- [Pricing for Apache Airflow jobs](pricing-apache-airflow-job.md)
- [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric)
- [Plan your Microsoft Fabric capacity size](../enterprise/plan-capacity.md)
