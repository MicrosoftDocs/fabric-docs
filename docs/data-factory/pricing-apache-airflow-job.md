---
title: Pricing for Data workflow 
description: This article provides details of the pricing model of Data workflow for Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: abnarain
author: nabhishek
ms.topic: conceptual
ms.date: 11/15/2023
---

# Data workflows pricing for Data Factory in Microsoft Fabric

Data workflows allows you to build and schedule Apache Airflow DAGs in Microsoft Fabric. For more details refer [What are Data Workflows](data-workflows-concepts.md).



## Dataflow workflows pricing model

Data workflows are charged based on pool uptime. There are two types of pools available: Starter and Custom.

- The **Starter pool** provides zero-latency startup and automatically shuts down after 20 minutes of inactivity to optimize costs.
- The **Custom pool** offers higher flexibility with always-running pools, which are required for production scenarios where the Airflow scheduler needs to be running 24/7.

The table below describes the CU consumption based on the size used for data workflows. By default, we use Large in both “Starter” and “Custom” pools. Small can be selected using the Custom pool. Each data workflow consists of an Apache Airflow cluster containing 3 nodes.

|Data workflow  size (Base)  |Consumption Meters  |Fabric CU consumption rate  |Consumption reporting granularity      |
|---------|---------|---------|---------|
|Small     | DataWorkflow Small | 5 CUs per hour         | Per Dataflow workflow item |
|Large     | DataWorkflow Large | 10 CUs per hour        | Per Dataflow workflow item |

Since data workflows support auto-scaling for better performance and scalability, you can add additional nodes to your data workflows. Each additional node will be charged based on the table below.

| Data workflow additional node (Extra) | Consumption Meters | Fabric CU consumption rate | Consumption reporting granularity |
| ------------------------------------- | ------------------ | -------------------------- | --------------------------------- |
| Small                                 | DataWorkflow Small | 0.6 CUs per hour           | Per Dataflow workflow item        |
| Large                                 | DataWorkflow Large | 1.3 CUs per hour           | Per Dataflow workflow item        |

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email and in-product notification. Changes are effective on the date stated in the [Release Notes](/fabric/release-plan/data-factory) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.

## Compute estimated costs using the Fabric Metrics App

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workspaces tied to a capacity. It's used by capacity administrators to monitor the performance of workloads and their usage compared to purchased capacity. Using the Metrics app is the most accurate way to estimate the costs of Data workflows.  

The following table can be utilized as a template to compute estimated costs using Fabric Metrics app for a Data workflow:

|Metric  |Data workflow size  |Additional nodes  |
|---------|---------|---------|
|Total CUs     | DataWorkflow Small CU seconds or DataWorkflow Large (Base) | DataWorkflow Small Extra Node or DataWorkflow Large Extra Node CU seconds (Extra) |
|Effective CU-hours billed      | Base / (60*60)  CU-hour | Extra / (60*60)  CU-hour |

**Total Data workflow cost** = (Base + Extra CU-hour) * (Fabric capacity per unit price)



## Related content

- [Pricing example scenarios](pricing-overview.md#pricing-examples)
- [Pricing data pipelines](pricing-pipelines.md)
