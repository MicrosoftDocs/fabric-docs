---
title: Extended Capabilities in Mirroring
description: Learn about extended mirroring features in Microsoft Fabric, including change data feed and mirroring views for advanced replication and analytics.
ms.date: 02/24/2026
ms.topic: overview
ai-usage: ai-assisted
---

# Extended capabilities in mirroring for Fabric

Mirroring in Microsoft Fabric keeps operational data available in OneLake for analytics with low latency. Extended capabilities are optional, paid features for teams that need more control over replication and freshness.

Currently, extended capabilities let you:

- Track source changes at row level.
- Process only changed data.
- Replicate source views instead of only physical tables.

These capabilities use the same managed mirroring foundation: secure source connections, near real-time replication, Delta Lake conversion, and integration with Fabric workloads such as SQL analytics, Spark, and Direct Lake.

## Change data feed (CDF) (preview)

Change data feed (CDF) captures inserts, updates, and deletes, then applies them to Delta Lake tables in OneLake. This flow supports near real-time analytics without full reloads or heavy ETL pipelines.

- Continuously processes incremental changes (delta-based).
- Uses change-only processing.
- Supports downstream incremental processing.
- Is available for all mirroring sources, including open mirroring partners.

### Enable change data feed

1. For any mirrored source, select the gear icon to open the configuration dashboard.
1. Under **Delta table management**, select the check box to **Enable delta change data feed**.

:::image type="content" source="media/mirroring-extended-capabilities/enable-change-data-feed.png" alt-text="Screenshot of the Oracle Database mirroring configuration dashboard showing Change Data Feed settings, OneLake data access options, and replication status.":::

## Mirroring views (preview)

Mirroring views replicate logical views from your source system instead of full physical tables. You can bring source filters, joins, and transformations into OneLake without building separate engineering pipelines.

- Replicates view logic from the source system.
- Reduces extra processing in Fabric.
- Helps downstream users query shaped data.

> [!NOTE]
> Currently, views are only supported in preview in mirroring for Snowflake.

## Extended capabilities pricing model

| **Aspect**  | **Change Delta Feed (Extended Capability)**  | **Views (Extended Capability)**  |
|----|----|----|
| Consumption Meter  | Data movement – incremental replication  | Data movement – incremental replication  |
| Fabric Capacity Unit (CU) consumption rate  | 3 CU‑hours  | 3 CU‑hours  |
| Runtime model  | Continuous, iteration‑based  | Continuous, incremental view processing  |
| Granularity  | Per‑second billing granularity  | Per‑capability reporting per mirrored database item  |
| Empty runs  | Not charged (initially)  | Not applicable (views reflect source‑defined projections)  |
| Reporting granularity  | Per mirrored database item  | Per mirrored database item  |

Extended capabilities are billed by actual replication work, using the same pricing approach as [Incremental Copy in Copy Job](/fabric/data-factory/pricing-copy-job). Charges map to Fabric Capacity Units (CUs), and billing is based on usage.

Currently:

- Billing is based on replication work performed.
- Idle or always-on time isn't billed.
- CDF billing applies to the full mirror replication workload, including all tables and views (if present).
- Multiple extended capabilities are billed as one unified charge per mirror.
- Core mirroring compute remains free.

### CDF pricing details

CDF uses the DataMovementIncrementalCopy meter and follows the same pricing principles as [Incremental Copy in Copy Job](/fabric/data-factory/pricing-copy-job). Billing uses per-second runtime and consumed throughput resources. In parallel execution, billing includes the total active child jobs.

Currently, empty iterations aren't billed. Iterations with system errors aren't billed, while iterations with user errors are billed. The operation name appears as Mirror Replication Premium using DataMovementIncrementalCopy.

## When to use extended capabilities

Extended capabilities are useful when you need:

- Row-level change visibility.
- Near real-time freshness.
- Incremental (change-only) data processing.
- Replication of source view logic.
- Low-latency analytics on operational systems.

These scenarios often benefit from CDF and mirroring views because both features reduce full refreshes and complex ETL workflows.

## Related content

[Mirroring for Microsoft Fabric overview](mirroring-overview.md)