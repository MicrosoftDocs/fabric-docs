---
title: Kusto integration in Fabric Maps
description: Learn about Kusto integration in Fabric Maps
ms.reviewer: smunk, sipa
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/12/2026
ms.search.form: Fabric Maps layers, layers, map layers, Kusto integration, Kusto integration in Fabric Maps
---

# Kusto integration in Fabric Maps

Fabric Maps integrates with Azure Data Explorer (Kusto) to let you visualize spatial data directly from KQL tables, functions, and materialized views. This integration enables near real‑time mapping scenarios, supports rich styling and filtering, and aligns Fabric Maps with the broader Real‑Time Intelligence experience in Microsoft Fabric.

With Kusto integration, you can:

- Create map layers directly from KQL tables, functions, or materialized views.
- Visualize continuously updating data on a map using configurable refresh intervals.
- Apply the same styling, labeling, clustering, and filtering capabilities used by other Fabric Maps data layers.

> [!IMPORTANT]
> Embedded KQL querysets in maps are being deprecated. Migration guidance is provided to help you move existing querysets to Kusto tables, functions, or materialized views.

## Supported Kusto objects

Fabric Maps supports the following Kusto objects as data sources:

- **Tables** – Queryable datasets stored in a KQL database.
- **Functions** – Reusable KQL definitions that encapsulate query logic.
- **Materialized views** – Persisted query results optimized for fast, repeated access.

These objects appear as distinct nodes under a connected KQL database in the Explorer, making them discoverable and reusable across map layers.

## How Kusto data becomes a map layer

When you add a Kusto object to a map, Fabric Maps treats the query result as a point‑based data layer. You define which columns contain latitude and longitude values, and Fabric Maps renders each row as a map feature.

A configuration wizard guides you through:

- Previewing the query results.
- Selecting geometry columns.
- Defining a data refresh interval.
- Reviewing and adding the layer to the map.

## Data refresh behavior

Kusto‑backed layers can refresh automatically at a configured interval. This makes them suitable for monitoring scenarios such as telemetry, device tracking, or live operational data.

## Styling and interaction

Once added, Kusto layers behave like other point layers in Fabric Maps. You can:

- Use marker layers and custom symbols.
- Apply data‑driven styling and labels.
- Enable clustering.
- Apply interactive filters to focus on subsets of the data.

## Limitations

The following limitations apply to Kusto integration in Fabric Maps:

- The result dataset size can't exceed 20 MB.
- Kusto functions with parameters aren't supported.

These constraints align with existing limits for GeoJSON‑based data layers.

## Next steps

> [!div class="nextstepaction"]
> [Create layers using Kusto data](create-layers-using-kusto-data.md)

> [!div class="nextstepaction"]
> [Data filtering](about-data-filtering.md)
