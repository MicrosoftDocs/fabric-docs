---
title: Autoscale Throughput in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Learn about the benefits and use cases for autoscale throughput in your Cosmos DB database within Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/14/2025
show_latex: true
appliesto:
- ✅ Cosmos DB in Fabric
---

# Autoscale throughput in Cosmos DB in Microsoft Fabric (preview)

Autoscale provisioned throughput is well suited for mission-critical workloads that have variable or unpredictable traffic patterns, and require service level agreements (SLAs) on high performance and scale. Autoscale by default scales workloads based on the most active region and partition. For nonuniform workloads that have different workload patterns across regions and partitions, this scaling can cause unnecessary scale-ups. Dynamic scaling or dynamic autoscale is an enhancement to autoscale provisioned throughout that helps scaling of such nonuniform workloads independently based on usage, at per region and per partition level. Dynamic scaling allows you to save cost if you often experience hot partitions and/or have multiple regions.

## Benefits

Azure Cosmos DB databases and containers that are configured with autoscale provisioned throughput have the following benefits:

- **Simple:** Autoscale removes the complexity of managing RU/s with custom scripting or manually scaling capacity.

- **Scalable:** Databases and containers automatically scale the provisioned throughput as needed. There's no disruption to client connections, applications, or to Azure Cosmos DB SLAs.

- **Cost-effective:** Autoscale helps optimize your RU/s usage and cost usage by scaling down when not in use. You only pay for the resources that your workloads need on a per-hour basis. Of all hours in a month, if you set autoscale max RU/s (`Tmax`) and use the full amount (`Tmax`) for `66%` of the hours or less, you can save with autoscale. In addition with dynamic scaling, adding a secondary region for high availability is more cost-efficient as each region and partition scales independently based on actual usage.

- **Highly available:** Databases and containers using autoscale use the same globally distributed, fault-tolerant, highly available Azure Cosmos DB backend to ensure data durability and high availability.

## Dynamic scaling

Dynamic scaling is the generic term for the independent scaling of resources at the region and partition level, based on actual usage patterns. Autoscale is Cosmos DB's implementation of dynamic scaling. This approach is especially beneficial for workloads with uneven or unpredictable traffic, and is ideal for scenarios such as:

- Database workloads that have a highly trafficked primary region and a secondary passive region for disaster recovery.
  
  - With dynamic scaling, achieving high availability with multiple regions is more cost effective. The secondary region independently and automatically scales down while idle. The secondary region also automatically scales up as it becomes active and while handling write replication traffic from the primary region.

- Multi-region database workloads.

  - These workloads often observe uneven distribution of requests across regions due to natural traffic growth and dips throughout the day. For example, a database might be active during business hours across globally distributed time zones.

## Use cases

Autoscale in Cosmos DB can be used for various workloads. The use cases of autoscale include, but aren't limited to:

- **Variable or unpredictable workloads:** When your workloads have variable or unpredictable spikes in usage, autoscale helps by automatically scaling up and down based on usage. With autoscale, you no longer need to manually allocate throughput for peak or average capacity. Examples include:

  - Retail websites that have different traffic patterns depending on seasonality
  
  - Internet of things (IoT) workloads that have spikes at various times during the day
  
  - Line of business applications that see peak usage a few times a month or year, and more.

- **New applications:** If you're developing a new application and not sure about the throughput (RU/s) you need, autoscale makes it easy to get started. You can start with the autoscale entry point of $100 - 1000 RU/s$, monitor your usage, and determine the right RU/s over time.

- **Infrequently used applications:** If you have an application, which is only used for a few hours several times a day, week, or month—such as a low-volume application/web/blog site. Autoscale adjusts the capacity to handle peak usage and scales down when it's over.

- **Development and test workloads:** If you or your team use Azure Cosmos DB databases and containers during work hours, but don't need them on nights or weekends, autoscale helps save cost by scaling down to a minimum when not in use.

- **Scheduled production workloads/queries:** If you have a series of scheduled requests, operations, or queries that you want to run during idle periods, you can do that easily with autoscale. When you need to run the workload, the throughput automatically scales to needed value and scales down afterward.

Building a custom solution to these problems not only requires an enormous amount of time, but also introduces complexity in your application's configuration or code. Autoscale enables the above scenarios out of the box and removes the need for custom or manual scaling of capacity.

## Under the hood

When configuring containers and databases with autoscale, you specify the maximum throughput `Tmax` required. Azure Cosmos DB scales the throughput `T` such $0.1*Tmax <= T <= Tmax$. For example, if you set the maximum throughput to `20000` RU/s, the throughput scales between `2000` to `20000` RU/s. Because scaling is automatic and instantaneous, at any point in time, you can consume up to the provisioned `Tmax` with no delay.

Each hour, you're billed for the highest throughput `T` the system scaled to within the hour. When dynamic scaling is enabled, scaling is based on the RU/s usage at each physical partition and region. As each partition and region scale independently, this pattern can lead to cost savings for nonuniform workloads, as unnecessary scale-ups are avoided.

The entry point for autoscale maximum throughput `Tmax` starts at `1000` RU/s, which scales between $100 - 1000 RU/s$. You can set `Tmax` in increments of `1000` RU/s and change the value at any time.

For example, if we have a collection with **`1000` RU/s** and **`2`** partitions, each partition can go up to **`500` RU/s**. For one hour of activity, the utilization would be similar to this table:

| Region | Partition | Throughput | Utilization | Notes |
| --- | --- | --- | --- | --- |
| **Write** | `P1` | $<= 500 RU/s$ | `100%` | `500 RU/s` consisting of `50` RU/s used for write operations and `450` RU/s for read operations. |
| **Write** | `P2` | $<= 200 RU/s$ | `40%` | `200 RU/s` consisting of all read operations. |
| **Read** | `P1` | $<= 150 RU/s$ | `30%` | `150 RU/s` consisting of `50` RU/s used for writes replicated from the write region. `100` RU/s are used for read operations in this region. |
| **Read** | `P2` | $<= 50 RU/s$ | `10%` | |

Without dynamic scaling, all partitions are scaled uniformly based on the hottest partition. In this example, because the hottest partition had `100%` utilization, all partitions in both the write and read regions are scaled to `1000` RU/s, making the total RU/s scaled to **`2000` RU/s**.

With dynamic scaling, because each partition and region's throughput is scaled independently, the total RU/s scaled to would be **`900` RU/s**, which better reflects the actual traffic pattern and lowers costs.

## Related content

- [Configure a container in Cosmos DB in Microsoft Fabric](how-to-configure-container.md)
- [Explore request units in Cosmos DB in Microsoft Fabric](request-units.md)
