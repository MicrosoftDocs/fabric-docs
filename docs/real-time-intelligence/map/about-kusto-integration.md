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

Fabric Maps integrates with Kusto databases to let you visualize spatial data directly from KQL tables, functions, and materialized views. This integration enables near real‑time mapping scenarios, supports rich styling and filtering, and aligns Fabric Maps with the broader Real‑Time Intelligence experience in Microsoft Fabric.

With Kusto integration, you can:

- Create map layers directly from KQL tables, functions, or materialized views.
- Visualize continuously updating data on a map using configurable refresh intervals.
- Apply the same styling, labeling, clustering, and filtering capabilities used by other Fabric Maps data layers.

> [!IMPORTANT]
> Embedded KQL querysets are deprecated for use in Fabric Maps. You can no longer create new map layers using KQL querysets.  
> 
> Existing map layers created from KQL querysets will continue to function until **June 29, 2026**.  
> 
> To ensure continued support, migrate your existing layers to Kusto functions. For more information, see [Migrate KQL Queryset to Kusto function](migrate-kusto-query-layer.md).

## Supported Kusto entities

Fabric Maps supports the following Kusto [Entity types](/kusto/query/schema-entities?view=microsoft-fabric) as data sources:

- **Tables** – Queryable datasets stored in a KQL database. For more information, see [Tables](/kusto/query/schema-entities/tables?view=microsoft-fabric).
- **Functions** – KQL functions can be either built-in or user-defined. Fabric Maps supports **user-defined, stored functions** that return tabular results (table or view shape). Built-in functions and non-tabular functions aren't supported. FOr more information, see [Function types](/kusto/query/functions/?view=microsoft-fabric) and [Stored functions](/kusto/query/schema-entities/stored-functions?view=microsoft-fabric).
- **Materialized views** – Persisted query results optimized for fast, repeated access. For more information, see [Materialized views](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric)

These entities appear as distinct nodes under a connected KQL database in the Explorer, making them discoverable and reusable across map layers.

## How Kusto data becomes a map layer

When you add a Kusto entity to a map, Fabric Maps treats the query result as a vector layer. You define which columns contain latitude and longitude values, and Fabric Maps renders each row as a map feature.

A configuration wizard guides you through:

- Previewing the query results.
- Selecting geometry columns.
- Defining a data refresh interval.
- Reviewing and adding the layer to the map.

## Data refresh behavior

Kusto‑backed layers can refresh automatically at a configured interval. This makes them suitable for monitoring scenarios such as telemetry, device tracking, or live operational data.

## Styling and interaction

Once added, Kusto layers behave like other vector layers in Fabric Maps. You can:

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
