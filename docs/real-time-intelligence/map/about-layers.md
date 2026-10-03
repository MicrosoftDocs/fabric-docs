---
title: Fabric Maps layers
description: Learn about Fabric Maps layers
ms.reviewer: smunk, sipa
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 09/13/2026
ms.search.form: Fabric Maps layers, layers, map layers
---

# Fabric Maps layers

Fabric Maps visualize spatial data through layers, where each layer represents a distinct dataset, query result, or imagery source rendered on a map. Layers are the primary building blocks of a map and allow you to combine real‑time events, historical spatial data, and imagery into a single, interactive geographic view.
Each layer is independently configured, styled, and controlled, enabling you to emphasize different spatial aspects of your data—such as location, movement, boundaries, or density—within the same map.

## What is a layer?

A layer represents one logical set of spatial information displayed on a map. Layers can visualize:

- Vector data derived from queries or files (points, lines, and polygons)
- Imagery data that provides raster context beneath vector layers

Layers are rendered together in a single map canvas and can be reordered, shown or hidden, and styled independently.

> [!NOTE]
> A Fabric map can contain multiple layers of different types, allowing you to combine real‑time and historical data with geographic context in one view.

## Types of layers in Fabric Maps

Fabric Maps support two primary categories of layers:

### Vector data layers

Vector layers visualize discrete spatial features. Use them to represent entities, routes, or geographic regions. Depending on the underlying geometry, vector layers can display:

- Points, such as asset locations or incoming events
- Lines, such as paths, routes, or trajectories
- Polygons, such as service areas, boundaries, or zones

You can source vector layers from:

- Eventhouses, using Kusto Query Language (KQL) for real‑time or near‑real‑time data
- Lakehouses, using stored spatial files for historical or reference data
- External feature services, using WFS, OGC API - Features, or Esri Feature Service endpoints for remotely hosted vector data

Vector layers support styling, filtering, labeling, and interaction to highlight patterns and relationships in your data.

External feature service layers can also use a server-side source query to control which records and fields are retrieved before map-layer filtering is applied. For more information, see [External feature services in Fabric Maps](about-external-feature-services.md).

### Imagery layers

Imagery layers provide raster context for your map. You can reorder imagery and vector layers to control how they overlap. Place imagery beneath vector layers when you want the imagery to provide geographic or thematic context without obscuring the vector data.

Fabric Maps supports imagery layers from the following sources:

- **Built‑in basemaps powered by Azure Maps**, including the **Satellite** and **Hybrid** map styles, which provide global imagery coverage.
- **Custom imagery stored in OneLake**, such as Cloud Optimized GeoTIFF (COG) files.
- **External imagery sources**, such as WMS and WMTS services.

You can reorder, toggle, and blend imagery layers with vector layers by using opacity controls.

> [!TIP]
> Use imagery layers to provide geographic context—such as terrain, satellite imagery, or thematic raster data—while keeping analytical focus on vector layers that represent your operational data.

## How layers work together

You render layers in a defined order, so you can stack imagery and vector data to create meaningful spatial visualizations. Common patterns include:

- Using imagery layers as a background for real‑time event data
- Overlaying historical reference boundaries on live operational streams
- Combining multiple vector layers to compare different datasets in the same geographic space

Because you configure each layer independently, you can update, filter, or style one layer without affecting others.

> [!TIP]
> Duplicating a layer is a quick way to create alternate views of the same data with different styling or filters.
>
> **Limitation**: When you duplicate a layer that contains **point data**, the **clustering setting** is shared between the original layer and the duplicated layer. If you enable or disable clustering in one layer, the change automatically applies to the other.

## Layers in Real‑Time Intelligence solutions

In Real‑Time Intelligence scenarios, layers enable Fabric Maps to serve as a visual endpoint for streaming analytics workflows. Real‑time layers can refresh as new data arrives, while static layers provide geographic context and reference information.

By using this layered approach, you can monitor live events, analyze spatial patterns, and correlate real‑time activity with known locations or regions.

## Next steps

> [!div class="nextstepaction"]
> [External feature services in Fabric Maps](about-external-feature-services.md)

> [!div class="nextstepaction"]
> [Create layers using WMS and WMTS imagery sources](about-external-sourced-imagery.md)

> [!div class="nextstepaction"]
> [Data filtering](about-data-filtering.md)
