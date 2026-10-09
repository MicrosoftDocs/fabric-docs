---
title: Extended Capabilities in Mirroring
description: Learn about extended mirroring features in Microsoft Fabric, including delta change data feed and mirroring views for advanced replication and analytics.
ms.date: 06/24/2026
ms.topic: overview
ai-usage: ai-assisted
ms.reviewer: sbahadur
---

# Extended capabilities in mirroring for Fabric

[!INCLUDE [Extended capabilities billing start note](includes/extended-capabilities-billing-start-note.md)]

Extended capabilities in mirroring for Microsoft Fabric are optional, paid features that build on the core mirroring experience. While core mirroring keeps operational data continuously available in OneLake at no cost for compute, extended capabilities provide granular change tracking, fresher data, and additional replication options.

Extended capabilities include:

- Delta change data feed: Tracks row-level inserts, updates, and deletes so only changed data is processed.
- Mirroring views: Replicates logical views from the source system instead of only physical tables.

Both capabilities run on the same managed mirroring foundation: secure source connectivity, near real-time replication, Delta Lake storage in OneLake, and seamless use across Fabric workloads such as SQL analytics, Spark, and Direct Lake.

## What's included by default vs. extended capabilities

| Core mirroring (free compute and storage) | Extended capabilities (paid) |
|---|---|
| Continuous replication of source tables into OneLake with near real-time freshness, Delta Lake format, and Fabric integration. | Optional features such as Delta change data feed and Mirroring views that add incremental change processing and view replication on top of core mirroring. |

## Delta change data feed (preview)

Delta change data feed (CDF) captures inserts, updates, and deletes, then applies them to Delta Lake tables in OneLake. This flow supports near real-time analytics without full reloads or heavy ETL pipelines. CDF is available for all mirroring sources, including open mirroring partners.

For full details on enabling, querying, and consuming change data, see [Delta change data feed in mirroring for Fabric](extended-capabilities-delta-change-data-feed.md).

## Mirroring views (preview)

Mirroring views replicate logical views from your source system instead of full physical tables. You can bring source filters, joins, and transformations into OneLake without building separate engineering pipelines.

> [!NOTE]
> Currently, views are only supported in preview in mirroring for Snowflake.

For full details on enabling and working with views, see [Mirroring views in Fabric](extended-capabilities-views.md).

## Pricing for extended capabilities

[!INCLUDE [Extended capabilities billing start note](includes/extended-capabilities-billing-start-note.md)]

Features such as delta change data feed and mirroring views require extra compute to continuously track, process, and apply incremental changes at fine granularity. These capabilities go beyond basic replication and are priced based on the actual work performed, so customers pay only for the added value they use.

Key pricing clarifications:

- **Billing is usage-based.** You're billed only for the incremental compute used when CDF processes real changes. There are no charges for idle time or empty runs (periods where no source data changes occur).
- **Core mirroring remains free.** Enabling CDF doesn't change the pricing for core mirroring. Continuous replication, Delta Lake conversion, OneLake integration, and SQL analytics endpoints remain free.
- **Storage for mirroring is free.** Storage for mirrored data in OneLake isn't billed separately. However, enabling CDF increases storage consumption because of additional `_change_data` files.
- **CDF is an add-on, not a replacement.** CDF billing is for the extended capability compute only. It doesn't retroactively charge for core mirroring activity.
- **You can control cost by selectively enabling CDF.** CDF is enabled at the mirrored database level. Enable CDF only on the mirrored databases that need incremental processing, and leave others on core mirroring.

For the pricing model, metering details, and billing scope, see [Billing for extended capabilities in mirroring](extended-capabilities-billing.md).

## When to use extended capabilities

Extended capabilities are useful when you need:

- Row-level change visibility (CDF).
- Near real-time incremental freshness (CDF).
- Incremental (change-only) data processing (CDF).
- Replication of source view logic (views).
- Low-latency analytics on operational systems.

These scenarios often benefit from delta change data feed and mirroring views because both features reduce full refreshes and complex ETL workflows.

## Related content

- [Delta change data feed in mirroring for Fabric](extended-capabilities-delta-change-data-feed.md)
- [Mirroring views in Fabric](extended-capabilities-views.md)
- [Billing for extended capabilities in mirroring](extended-capabilities-billing.md)
- [What is Mirroring in Fabric?](overview.md)
