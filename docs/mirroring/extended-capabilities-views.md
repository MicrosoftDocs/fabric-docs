---
title: Microsoft Fabric Mirroring Views
description: Learn how to enable and use mirroring views in Microsoft Fabric to replicate logical views from your source system into OneLake.
ms.date: 06/24/2026
ms.topic: how-to
ai-usage: ai-assisted
ms.reviewer: sbahadur
---

# Mirroring views in Fabric

Mirroring views replicate logical views from your source system instead of full physical tables. You can bring source filters, joins, and transformations into OneLake without building separate engineering pipelines.

- Replicates view logic from the source system without requiring you to rebuild queries in Fabric.
- Eliminates the need to build separate Spark or SQL pipelines to reshape source data.
- Helps downstream users query shaped, filtered, or joined data directly in OneLake.

> [!NOTE]
> Currently, views are supported only in preview for mirroring for Snowflake.

## Prerequisites

- A [Microsoft Fabric capacity](/fabric/enterprise/licenses#capacity) (F2 or higher) or Fabric trial.
- A Snowflake data source configured for mirroring.

## Enable mirroring views

You can enable views in two ways:

- During the creation experience for a new mirrored database.
- For an existing mirrored database, through the configuration dashboard on the mirroring monitoring page.

After you connect to your Snowflake database, **Views** appears on the table selection screen. (This example enables views for a Snowflake source.)

:::image type="content" source="media/mirroring-extended-capabilities/enable-views.png" lightbox="media/mirroring-extended-capabilities/enable-views.png" alt-text="Screenshot of the Snowflake mirroring configuration dashboard showing the option to select (and therefore enable) views.":::

After you select the views that you want to replicate, a dialog box prompts you to acknowledge that enabling extended capabilities incurs billing charges before you proceed.

:::image type="content" source="media/mirroring-extended-capabilities/enable-extended-capabilities.png" lightbox="media/mirroring-extended-capabilities/enable-extended-capabilities.png" alt-text="Screenshot of the extended capabilities in mirroring dialog to enable extended capabilities and acknowledge billing implications.":::

## How mirroring views work

When you enable views for a mirrored database, Fabric materializes the view results into OneLake as Delta tables on a scheduled cadence. The replication process works as follows:

1. Fabric reads the view definition from the source system (Snowflake).
1. Fabric materializes the view—it runs the query and stores the results as a Delta table in OneLake.
1. You can query the materialized view through the SQL analytics endpoint, Spark, and Direct Lake.
1. Fabric refreshes the view every 12 hours to keep the data current.

## Pricing

[!INCLUDE [Extended capabilities billing start note](includes/extended-capabilities-billing-start-note.md)]

Mirroring views requires extra compute to materialize and periodically refresh view results. Pricing is based on the actual compute work performed during each refresh cycle.

For the full pricing model, metering details, and billing scope, see [Billing for extended capabilities in mirroring](extended-capabilities-billing.md).

## Limitations

- Snowflake is the only source that supports views.
- Fabric refreshes views every 12 hours, rather than in near real time as it does for table mirroring.
- Complex views with nested subqueries or unsupported functions might not replicate successfully.

## Related content

- [Extended capabilities in mirroring for Fabric](extended-capabilities.md)
- [Delta change data feed in mirroring for Fabric](extended-capabilities-delta-change-data-feed.md)
- [Billing for extended capabilities in mirroring](extended-capabilities-billing.md)
- [Mirroring Snowflake in Microsoft Fabric](snowflake.md)
