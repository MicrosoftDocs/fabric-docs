---
title: Extended Capabilities in Mirroring
description: Learn about extended mirroring features in Microsoft Fabric, including delta change data feed and mirroring views for advanced replication and analytics.
ms.date: 03/11/2026
ms.topic: overview
ai-usage: ai-assisted
ms.reviewer: sbahadur
---

# Extended capabilities in mirroring for Fabric

[!INCLUDE [Extended capabilities billing start note](includes/extended-capabilities-billing-start-note.md)]

Extended capabilities in mirroring for Microsoft Fabric are optional, paid features that build on the core mirroring experience. While core mirroring keeps operational data continuously available in OneLake at no cost for compute, extended capabilities provide more granular change tracking, fresher data, and richer replication options for advanced analytics scenarios.

Today, extended capabilities include:

- Delta change data feed: Tracks row-level inserts, updates, and deletes so only changed data is processed.
- Mirroring views: Replicates logical views from the source system instead of only physical tables.

Both capabilities run on the same managed mirroring foundation: secure source connectivity, near real-time replication, Delta Lake storage in OneLake, and seamless use across Fabric workloads like SQL analytics, Spark, and Direct Lake.

## What's included by default vs. extended capabilities

| Core mirroring (free compute and storage) | Extended capabilities (paid) |
|---|---|
| Continuous replication of source tables into OneLake with near real-time freshness, Delta Lake format, and Fabric integration. | Optional features like Delta change data feed and Mirroring views that add incremental change processing and view replication on top of core mirroring. |

## Delta change data feed (preview)

Delta change data feedcaptures inserts, updates, and deletes, then applies them to Delta Lake tables in OneLake. This flow supports near real-time analytics without full reloads or heavy ETL pipelines.

- Continuously processes incremental changes (delta-based).
- Uses change-only processing.
- Supports downstream incremental processing.
- Is available for all mirroring sources, including open mirroring partners.

### Enable delta change data feed

Delta change data feed is enabled per mirrored database.

1. For any mirrored source, select the gear icon to open the configuration dashboard.
1. Under **Delta table management**, select the check box to **Enable delta change data feed**.

:::image type="content" source="media/mirroring-extended-capabilities/enable-change-data-feed.png" alt-text="Screenshot of the Oracle Database mirroring configuration dashboard showing delta change data feed settings, OneLake data access options, and replication status.":::

## Mirroring views (preview)

Mirroring views replicate logical views from your source system instead of full physical tables. You can bring source filters, joins, and transformations into OneLake without building separate engineering pipelines.

- Replicates view logic from the source system.
- Reduces extra processing in Fabric.
- Helps downstream users query shaped data.

> [!NOTE]
> Currently, views are only supported in preview in mirroring for Snowflake.

### Enable views

You can enable views two ways:

- During the creation experience for a new mirrored database.
- For an existing mirrored database, through the configuration dashboard on the mirroring monitoring page.

Once you establish a connection to your Snowflake database, you see **Views** as part of the table selection screen. (In this example, we're enabling views for a Snowflake source by selecting them.)

:::image type="content" source="media/mirroring-extended-capabilities/enable-views.png" lightbox="media/mirroring-extended-capabilities/enable-views.png" alt-text="Screenshot of the Snowflake mirroring configuration dashboard showing the option to select (and therefore enable) views.":::

After you select the views that you want to replicate, a dialog box appears asking you to agree enabling extended capabilities, and billing charges, before you proceed.

:::image type="content" source="media/mirroring-extended-capabilities/enable-extended-capabilities.png" lightbox="media/mirroring-extended-capabilities/enable-extended-capabilities.png" alt-text="Screenshot of the extended capabilities in mirroring dialog to enable extended capabilities and acknowledge billing implications.":::

## Pricing for extended capabilities

[!INCLUDE [Extended capabilities billing start note](includes/extended-capabilities-billing-start-note.md)]

Features like delta change data feed and mirroring views require extra compute to continuously track, process, and apply incremental changes at fine granularity. These capabilities go beyond basic replication and are priced based on the actual work performed, so customers pay only for the added value they use.

For the pricing model, metering details, and billing scope, see [pricing for extended capabilities in mirroring](extended-capabilities-billing.md).

## When to use extended capabilities

Extended capabilities are useful when you need:

- Row-level change visibility.
- Near real-time freshness.
- Incremental (change-only) data processing.
- Replication of source view logic.
- Low-latency analytics on operational systems.

These scenarios often benefit from delta change data feed and mirroring views because both features reduce full refreshes and complex ETL workflows.

## Related content

- [Billing for extended capabilities in mirroring](extended-capabilities-billing.md)
- [Mirroring for Microsoft Fabric overview](overview.md)