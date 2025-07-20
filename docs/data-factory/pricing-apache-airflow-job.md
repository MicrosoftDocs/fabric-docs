---
title: Pricing for Apache Airflow job
description: This article provides details of the pricing model of Apache Airflow job for Data Factory in Microsoft Fabric.
ms.reviewer: whhender
ms.author: abnarain
author: nabhishek
ms.topic: conceptual
ms.date: 11/15/2023
ms.custom: airflows
---

# Apache Airflow job pricing for Data Factory in Microsoft Fabric

Apache Airflow jobs allow you to build and schedule Apache Airflow Directed Acyclic Graphs in Microsoft Fabric. For more details, refer [What are Apache Airflow job](apache-airflow-jobs-concepts.md).



## Apache Airflow job pricing model

Apache Airflow job is charged based on pool uptime. Each Apache Airflow job has it's own isolated pool which are not shared across Apache Airflow jobs. There are two types of pools available: Starter and Custom.

- The **Starter pool** provides zero-latency startup and automatically shuts down after 20 minutes of inactivity to optimize costs.
- The **Custom pool** offers higher flexibility with always-running pools, which are required for production scenarios where the Airflow scheduler needs to be running 24/7.

The table below describes the CU consumption based on the size used for Apache Airflow job. By default, we use Large in both "Starter" and "Custom" pools. Small can be selected using the Custom pool. Each Apache Airflow job consists of an Apache Airflow cluster containing three nodes (unless you configure autoscale or add extra nodes).

|Apache Airflow job  size (Base)  |Consumption Meters  |Fabric CU consumption rate  |Consumption reporting granularity      |
|---------|---------|---------|---------|
|Small     | DataWorkflow Small | 5 CUs         | Per Apache Airflow job item |
|Large     | DataWorkflow Large | 10 CUs        | Per Apache Airflow job item |

Since Apache Airflow job support autoscaling for better performance and scalability, you can add extra nodes to your data workflows. Each extra node is charged based on the table below.

| Apache Airflow job extra node (Extra) | Consumption Meters | Fabric CU consumption rate | Consumption reporting granularity |
| ------------------------------------------ | ------------------ | -------------------------- | --------------------------------- |
| Small                                      | DataWorkflow Small | 0.6 CUs                    | Per Apache Airflow job item       |
| Large                                      | DataWorkflow Large | 1.3 CUs                    | Per Apache Airflow job item       |

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email and in-product notification. Changes are effective on the date stated in the [Release Notes](https://aka.ms/fabricrm) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.

## Compute estimated costs using the Fabric Metrics App

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workspaces tied to a capacity. It's used by capacity administrators to monitor the performance of workloads and their usage compared to purchased capacity. Using the Metrics app is the most accurate way to estimate the costs of Apache Airflow job.  

The following table can be utilized as a template to compute estimated costs using Fabric Metrics app for a Apache Airflow job:

|Metric  |Apache Airflow job size  | Extra nodes  |
|---------|---------|---------|
|Total CUs     | DataWorkflow Small CU seconds or DataWorkflow Large (Base) | DataWorkflow Small Extra Node or DataWorkflow Large Extra Node CU seconds (Extra) |
|Effective CU-hours billed      | Base / (60*60)  CU-hour | Extra / (60*60)  CU-hour |

**Total Apache Airflow job cost** = (Base + Extra CU-hour) * (Fabric capacity per unit price)

## Related content

- [Pricing example scenarios](pricing-overview.md#pricing-examples)
- [Pricing data pipelines](pricing-pipelines.md)
