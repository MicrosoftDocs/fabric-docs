---
title: dbt Job Pricing in Microsoft Fabric
description: Discover the pricing model for dbt jobs in Microsoft Fabric, including CU consumption rates, cost estimation, and workload monitoring tools.
ms.reviewer: akurnala
ms.date: 01/28/2026
ms.topic: article
---

# dbt job pricing for Microsoft Fabric

The [dbt job in Microsoft Fabric](dbt-job-overview.md) enables analytics engineers and data analysts to author, operationalize, and schedule SQL-based dbt workflows natively within the Fabric environment.

:::image type="content" source="media/dbt-job-pricing/dbt-job-overview.png" alt-text="Representation of the dbt job runtime, showing the stages of the runtime before the job is executed on the connected data sources.":::

When you run a dbt job in Microsoft Fabric, [Fabric Capacity Units (CUs)](/fabric/enterprise/licenses#capacity) are consumed based on the execution of dbt transformations. The dbt job CUs billed are for compilation, execution, and orchestration of dbt SQL in data stores.

## Pricing model

The following table shows a breakdown of the pricing model for dbt jobs in Microsoft Fabric:

| **dbt job Operation** | **Consumption Meter** | **Fabric Capacity Units (CU) consumption rate** | **Consumption reporting granularity** |
|----|----|----|----|
| dbt job execution | Data transformation - dbt job | 2 CU hours | Per DbtItem |

dbt jobs are billed based on the **job run duration in hours** and the compute resources used to execute dbt SQL models on Fabric Data Warehouse or Lakehouse.

## How CU consumption is calculated

For each dbt job run, CUs are consumed for the **entire duration of the dbt job execution**. Job execution includes:

- SQL compilation and execution of dbt models
- Dependency resolution across dbt models
- Execution of incremental or full-refresh dbt models

The approved consumption rate for dbt jobs is **2 CU hours**.

At the end of each dbt job run, the total CU consumption is calculated based on the execution duration. The consumption is billed according to the [Fabric capacity pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric) for the region where the capacity is deployed.

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email and in-product notifications. Changes are effective on the date stated in the release notes and the Microsoft Fabric blog.

If any change to a Microsoft Fabric workload consumption rate materially increases the capacity units (CU) required to use dbt jobs, customers can use the cancellation options available for the chosen payment method.

## Compute estimated costs using the Fabric Metrics App

The [Microsoft Fabric Capacity Metrics app](/fabric/enterprise/metrics-app) provides visibility into capacity usage for all Fabric workspaces tied to a capacity. Capacity administrators can use the app to monitor dbt job executions and their CU consumption relative to purchased capacity.

The following table can be used as a template to compute estimated costs for a dbt job run:

| **Metric**        | **dbt job Execution**                |
|-------------------|--------------------------------------|
| Total CU seconds  | x CU seconds                         |
| Effective CU-hour | x CU seconds / (60 × 60) = X CU-hour |

**Total cost:** (X CU-hour) × (Fabric capacity per unit price)

## Related content

- [Microsoft Fabric Capacity Metrics app](/fabric/enterprise/metrics-app)
- [dbt job overview in Microsoft Fabric](dbt-job-overview.md)