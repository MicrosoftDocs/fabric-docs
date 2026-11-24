---
title: Views pricing example for Mirroring - Microsoft Fabric
description: Walk through a worked pricing example for the Views extended capability in Mirroring for Microsoft Fabric, including cost estimation using the Fabric Capacity Metrics app.
author: sbahadur
ms.author: sbahadur
ms.service: fabric
ms.subservice: mirroring
ms.topic: overview
ms.custom: ai-assisted
ms.date: 11/20/2026
ms.reviewer: shaween18
---

# Views pricing example for Mirroring in Microsoft Fabric

This article walks through a worked example of how Views billing works for a mirrored database in Microsoft Fabric. For an overview of the extended capabilities pricing model, see [Billing for extended capabilities in Mirroring](extended-capabilities-billing.md).

## Pricing scenario - Mirroring Snowflake views

In this scenario, you enable Views as an extended capability in Mirroring for Microsoft Fabric so you can replicate logical views from Snowflake into OneLake.

Views are an extended capability in Mirroring. You pay for Views based on the replication work required to process view results.

The prices used in the following example are hypothetical and don't represent actual pricing. These estimates demonstrate how you can estimate, plan, and manage costs for extended capabilities in Mirroring for Microsoft Fabric. Since Fabric capacities have unique prices across regions, this example uses pay-as-you-go pricing for a Fabric capacity at US West 2, at $0.18 per CU-hour.

### Scenario

A customer mirrors Snowflake data into Microsoft Fabric and enables Views so reporting-ready projections from Snowflake can be made available in OneLake.

The customer uses views to bring curated business logic, filters, joins, and transformations from Snowflake into Fabric without creating separate data engineering pipelines.

> [!NOTE]
> Views are currently supported only for mirroring for Snowflake.

### Configuration

| Configuration | Value |
| --- | --- |
| Source | Snowflake |
| Mirrored item | One mirrored database |
| Views enabled | 150 Snowflake views |
| View size | 1 million to 50 million rows per view |
| Refresh frequency | Every 12 hours |
| Workload pattern | Reporting and analytics views |
| Billing period | 30 days |

### Pricing model

Views use the Data movement - incremental replication consumption meter and appear in the Capacity Metrics app as Mirror Replication Premium.

| Extended capability | Consumption meter | Fabric Capacity Unit consumption rate | Reporting granularity |
| --- | --- | --- | --- |
| Views | Data movement - incremental replication | 3 CU-hours | Per views in a mirrored database item |

> [!NOTE]
> Mirroring without extended capabilities is free. Charges for enabling Views apply only to the extended capability workload.

### Cost estimation by using the Fabric Metrics app

The Microsoft Fabric Capacity Metrics app is the recommended way to estimate costs for Views workloads. To estimate cost, filter usage for the mirrored database item and review the Mirror Replication Premium operation.

In this example, Views don't have a separate initial load cost. The example shows the cost for each 12-hour view refresh and then rolls that up to a 30-day monthly estimate.

#### Per-refresh view processing

Assume the Capacity Metrics app reports the following usage for each 12-hour view refresh:

| Metric | Mirror Replication Premium |
| --- | --- |
| CU seconds per refresh | 120,000 CU seconds |
| Effective CU-hours per refresh | 120,000 / (60 * 60) = 33.33 CU-hours |
| Cost per refresh at $0.18/CU-hour | 33.33 * $0.18 = $6.00 |

#### Monthly total

For a 30-day billing period with refreshes every 12 hours, there are 60 view refreshes.

| Component | CU-hours | Cost |
| --- | --- | --- |
| 12-hour view refresh processing | 33.33 CU-hours * 60 refreshes = 2,000 CU-hours | $6.00 * 60 refreshes = $360.00 |
| Total | 2,000 CU-hours | $360.00 |

Estimated monthly cost at $0.18/CU-hour:

33.33 CU-hours/refresh * 60 refreshes * $0.18/CU-hour = $360.00

### Key takeaways

- You pay for views as Mirror Replication Premium through the Data movement - incremental replication meter.
- If your mirror includes tables and views and change data feed (CDF) is disabled, you only pay for processing the views. If CDF is enabled, billing covers the full mirror replication workload, including tables and views, as one unified charge.
- Snowflake mirroring currently supports views.
- The cost mainly depends on the number of views, the size of the views, and how often you process them.
- Use the Capacity Metrics app to monitor actual CU consumption for views in each mirrored database item.

## Related content

- [Billing for extended capabilities in Mirroring](extended-capabilities-billing.md)
- [Change data feed pricing example for Mirroring](extended-capabilities-billing-example-delta-change-data-feed.md)
- [Pricing for Incremental Copy in Copy Job](/fabric/data-factory/pricing-copy-job)
