---
title: Pricing for Apache Airflow job
description: This article provides details of the pricing model of Apache Airflow job for Data Factory in Microsoft Fabric.
ms.reviewer: whhender
ms.author: abnarain
author: nabhishek
ms.topic: concept-article
ms.date: 10/17/2025
ms.custom: airflows
---

# Apache Airflow job pricing for Data Factory in Microsoft Fabric

Apache Airflow jobs let you build and schedule Apache Airflow Directed Acyclic Graphs (DAGs) in Microsoft Fabric. To learn more, check out [What are Apache Airflow job](apache-airflow-jobs-concepts.md).

## Apache Airflow job pricing model

Apache Airflow jobs are billed based on pool uptime. Each Apache Airflow job has its own isolated pool, so pools aren't shared between jobs. You can choose from two available pool types: Starter and Custom.

- The **Starter pool** provides zero-latency startup and shuts down automatically after 20 minutes of inactivity to help save costs.
- The **Custom pool** offers more flexibility with pools that stay running all the time, which is great for production scenarios where the Airflow scheduler needs to run 24/7.

>[!TIP]
> For more details about Apache Airflow pool types, see [Apache Airflow compute in Fabric](apache-airflow-compute.md).

The table below shows how much capacity units (CU) each Apache Airflow job uses based on its size. By default, both "Starter" and "Custom" pools use the Large size, but you can pick Small, if you use a Custom pool. Each Apache Airflow job runs on a cluster with three nodes, unless you turn on Autoscale or add extra nodes.


|Apache Airflow job  size (Base)  |Consumption Meters  |Fabric CU consumption rate  |Consumption reporting granularity      |
|---------|---------|---------|---------|
|Small     | ApacheAirflowJob Small | 5 CUs         | Per Apache Airflow job item |
|Large     | ApacheAirflowJob  Large | 10 CUs        | Per Apache Airflow job item |

Since Apache Airflow jobs support autoscaling to boost performance and flexibility, you can add extra nodes to your cluster as needed. Each extra node is billed according to the rates in the table below.


| Apache Airflow job extra node (Extra) | Consumption Meters | Fabric CU consumption rate | Consumption reporting granularity |
| ------------------------------------------ | ------------------ | -------------------------- | --------------------------------- |
| Small                                      | ApacheAirflowJob  Small | 0.6 CUs                    | Per Apache Airflow job item       |
| Large                                      | ApacheAirflowJob  Large | 1.3 CUs                    | Per Apache Airflow job item       |

## Changes to Microsoft Fabric workload consumption rate

Consumption rates can change at any time. Microsoft will try to let you know about updates through email and in-product notifications. Changes take effect on the date listed in the [Release Notes](https://aka.ms/fabricrm) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/blog/). If a change increases the capacity units (CU) needed for a workload, you can use the cancellation options for your payment method.

## Compute estimated costs using the Fabric Metrics App

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) lets you see how much capacity your Fabric workspaces are using. Capacity administrators can use it to track workload performance and compare usage to what's been purchased. The Metrics app is the best way to estimate the cost of running Apache Airflow jobs. 


The following table can be utilized as a template to compute estimated costs using Fabric Metrics app for a Apache Airflow job:

|Metric  |Apache Airflow job size  | Extra nodes  |
|---------|---------|---------|
|Total CUs     | ApacheAirflowJob Small CU seconds or ApacheAirflowJob Large (Base) | ApacheAirflowJob Small Extra Node or ApacheAirflowJob Large Extra Node CU seconds (Extra) |
|Effective CU-hours billed      | Base / (60*60)  CU-hour | Extra / (60*60)  CU-hour |

**Total Apache Airflow job cost** = (Base + Extra CU-hour) * (Fabric capacity per unit price)

## Related content

- [Pricing example scenarios](pricing-overview.md#pricing-examples)
- [Pricing pipelines](pricing-pipelines.md)
