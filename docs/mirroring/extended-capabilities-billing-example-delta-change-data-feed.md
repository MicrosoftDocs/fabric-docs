---
title: Change data feed pricing example for Mirroring - Microsoft Fabric
description: Walk through a worked pricing example for the Change Data Feed extended capability in Mirroring for Microsoft Fabric, including cost estimation using the Fabric Capacity Metrics app.
author: sbahadur
ms.author: sbahadur
ms.service: fabric
ms.subservice: mirroring
ms.topic: overview
ms.custom: ai-assisted
ms.date: 11/20/2026
ms.reviewer: shaween18
---

# Change data feed pricing example for Mirroring in Microsoft Fabric

This article provides a worked example of how Change Data Feed (CDF) billing works for a mirrored database in Microsoft Fabric. For an overview of the extended capabilities pricing model, see [Billing for extended capabilities in Mirroring](extended-capabilities-billing.md).

## Pricing scenario - Mirroring Change Data Feed for a transactional database

In this scenario, you enable Change Data Feed (CDF) on a mirrored database in Microsoft Fabric to capture row-level inserts, updates, and deletes from a transactional source system.

CDF is an extended capability in Mirroring. You pay for CDF based on the replication work for the entire mirror to process change data.

The prices used in the following example are hypothetical and don't represent actual pricing. These estimates demonstrate how you can estimate, plan, and manage costs for extended capabilities in Mirroring for Microsoft Fabric. Since Fabric capacities have unique prices across regions, this example uses pay-as-you-go pricing for a Fabric capacity at US West 2, at $0.18 per CU-hour.

### Scenario

A customer mirrors an Azure SQL Database into Microsoft Fabric and enables Change Data Feed so downstream analytics and data engineering workloads can consume inserts, updates, and deletes incrementally.

The mirrored database contains transactional tables that are updated throughout the business day. Use CDF because the customer needs row-level change history, including before and after values for updated rows.

### Configuration

| Configuration | Value |
| --- | --- |
| Source | Azure SQL Database |
| Mirrored item | One mirrored database |
| CDF-enabled tables | 20 transactional tables |
| Initial CDF data processed | 100 GB of existing transactional data across the CDF-enabled tables |
| Change volume | Approximately 10,000 row changes per hour |
| Average row image size | Approximately 200 bytes |
| Workload pattern | Mixed inserts, updates, and deletes |
| Billing period | 30 days |

### Pricing model

Change Data Feed uses the Data movement - incremental replication consumption meter and appears in the Capacity Metrics app as Mirror Replication Premium.

| Extended capability | Consumption meter | Fabric Capacity Unit consumption rate | Reporting granularity |
| --- | --- | --- | --- |
| Change Data Feed | Data movement - incremental replication | 3 CU-hours | Per mirrored database item |

> [!NOTE]
> Mirroring without extended capabilities is free. If you enable extended capabilities for the mirror, then pricing applies.

### Cost estimation using the Fabric Metrics app

The Microsoft Fabric Capacity Metrics app is the recommended way to estimate costs for CDF workloads. To estimate cost, filter usage for the mirrored database item and review the Mirror Replication Premium operation.

In this example, the CDF-enabled mirror has one initial CDF processing phase and then ongoing hourly incremental processing. The cost shown here represents only the Mirror Replication Premium work required for CDF.

#### Initial CDF processing

Assume the initial CDF processing phase handles 100 GB of existing transactional data across the CDF-enabled mirror with 20 tables. The Capacity Metrics app reports the following usage for that initial phase:

| Metric | Mirror Replication Premium |
| --- | --- |
| CU seconds | 144,000 CU seconds |
| Effective CU-hours | 144,000 / (60 * 60) = 40 CU-hours |
| Cost at $0.18/CU-hour | 40 * $0.18 = $7.20 |

#### Hourly incremental processing

After the initial CDF processing phase, assume the mirror processes approximately 10,000 row changes per hour. For each hourly incremental processing window, the Capacity Metrics app reports the following usage:

| Metric | Mirror Replication Premium |
| --- | --- |
| CU seconds per hour | 1,800 CU seconds |
| Effective CU-hours per hour | 1,800 / (60 * 60) = 0.5 CU-hours |
| Cost per hour at $0.18/CU-hour | 0.5 * $0.18 = $0.09 |

#### Monthly total

For a 30-day billing period, there are 720 hourly incremental processing windows.

| Component | CU-hours | Cost |
| --- | --- | --- |
| Initial CDF processing | 40 CU-hours | $7.20 |
| Hourly incremental processing | 0.5 CU-hours * 720 hours = 360 CU-hours | $0.09 * 720 hours = $64.80 |
| Total | 400 CU-hours | $72.00 |

Estimated monthly cost at $0.18/CU-hour:

(40 CU-hours + 360 CU-hours) * $0.18/CU-hour = $72.00

#### Alternative example: five-minute incremental processing after initial snapshot

In this alternative example, the customer enables CDF after the initial mirror snapshot is already complete. Because the initial snapshot used core mirroring, there's no CDF charge for that initial snapshot. CDF charges begin only when incremental changes are processed after CDF is enabled.

This workload has a higher change volume than the hourly example and includes additional per-run overhead for frequent five-minute processing windows.

| Configuration | Value |
| --- | --- |
| Source | Azure SQL Database |
| Mirrored item | One mirrored database |
| CDF enablement timing | Enabled after the initial mirror snapshot completed |
| CDF initial snapshot charge | $0.00 |
| CDF-enabled tables | 50 transactional tables |
| Change volume | Approximately 250,000 row changes per five-minute window |
| Average row image size | Approximately 500 bytes |
| Processing cadence | Every 5 minutes |
| Billing period | 30 days |

| Metric | Mirror Replication Premium |
| --- | --- |
| Five-minute windows in 30 days | 30 days * 24 hours * 12 windows/hour = 8,640 windows |
| Incremental change processing per window | 1,200 CU seconds |
| Per-run overhead per window | 300 CU seconds |
| Total CU seconds per five-minute window | 1,200 + 300 = 1,500 CU seconds |
| Effective CU-hours per five-minute window | 1,500 / (60 * 60) = 0.4167 CU-hours |
| Cost per five-minute window at $0.18/CU-hour | 0.4167 * $0.18 = $0.075 |

| Component | CU-hours | Cost |
| --- | --- | --- |
| Initial mirror snapshot before CDF was enabled | 0 CDF CU-hours | $0.00 |
| Five-minute incremental processing | 0.4167 CU-hours * 8,640 windows = 3,600 CU-hours | $0.075 * 8,640 windows = $648.00 |
| Total CDF charge | 3,600 CU-hours | $648.00 |

### Cost drivers

CDF cost depends on the amount of incremental replication work required to capture and apply changes.

| Cost driver | Impact |
| --- | --- |
| Update and delete volume | Very high |
| Insert volume | Low |
| Change frequency | Very high |
| Number of CDF-enabled tables | High |
| Row width | High |
| Number of mirrored databases | Medium |

Update-heavy and delete-heavy workloads can consume more capacity because CDF must preserve before and after row images.

### Key takeaways

- CDF is billed as Mirror Replication Premium by using the Data movement - incremental replication meter.
- CDF is usage-based and doesn't charge for idle time or empty iterations.
- Update-heavy and delete-heavy workloads usually consume more capacity than insert-only workloads.
- Use the Capacity Metrics app to monitor actual CU consumption for each mirrored database item.

## Related content

- [Billing for extended capabilities in Mirroring](extended-capabilities-billing.md)
- [Views pricing example for Mirroring](extended-capabilities-billing-example-views.md)
- [Pricing for Incremental Copy in Copy Job](/fabric/data-factory/pricing-copy-job)
