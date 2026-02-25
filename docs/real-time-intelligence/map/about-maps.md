---
title: About Map items in Microsoft Fabric
description: Learn about map items in Fabric
ms.reviewer: smunk
author: sipa
ms.author: sipa
ms.date: 02/16/2025
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.search.form: Map item 
---

# What is a map in Fabric Maps?

A map in Fabric Maps is a first‑class Fabric item used to visualize and analyze spatial data in Microsoft Fabric. A map connects to your historical or real‑time data sources and renders that data as interactive geographic layers, allowing you to explore patterns, relationships, and trends based on location.

Maps are designed analytical scenarios where *where something happens* is as important as *when it happens*.

For a high‑level overview of the Fabric Maps capability, see [What is Fabric Maps?](about-fabric-maps.md).

> [!IMPORTANT]
> Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality may change.

## What is a map item?

A map is an interactive visualization canvas that lives in a Fabric workspace. Each map:

- Is stored as a Fabric item
- References one or more spatial data sources
- Renders data as layered geographic features on a basemap
- Supports both static and real‑time data

Unlike static images or exported visuals, map items remain connected to their underlying data and update automatically when the data changes.

## Data sources used by maps

Maps don't store data directly. Instead, they reference spatial data stored in other Fabric items, including:

- **Lakehouses** for historical or batch spatial data (such as GeoJSON files)
- **Eventhouses and KQL databases** for streaming or near‑real‑time data

This separation allows you to govern, secure, and reuse your data independently of how it's visualized.

## Static and real‑time mapping

Fabric Maps supports both static and real‑time scenarios:

- **Static mapping** is commonly used for datasets that change infrequently, such as boundaries, infrastructure, or environmental features.
- **Real‑time mapping** is used to visualize live data streams, such as asset locations, events, or operational telemetry.

The same map can combine both types of data, enabling side‑by‑side analysis of historical context and live activity.

## Layers and visualization

Maps visualize data through layers. Each layer represents a dataset rendered in a geographic form, such as:

- Points
- Lines
- Polygons
- Heatmaps
- Extrusions

Layers can be styled independently to control appearance, interactivity, and visibility. This layered approach makes it possible to overlay multiple datasets and explore how they relate spatially.

## Maps and tilesets

Maps and tilesets serve different purposes in Fabric Maps:

- A **map** is the visualization and interaction surface.
- A **tileset** is an optimized, preprocessed representation of large spatial datasets.

Tilesets are commonly used as data sources for maps when working with large or complex static datasets. For more information, see:

- [What is a tileset in Fabric Maps?](about-tile-sets.md)
- [Create a tileset](create-tile-sets.md)

## Map item permissions

Maps are Fabric items stored in a workspace and are governed by Fabric's permission model. Access to a map depends on workspace roles, map-level sharing, and permissions on the underlying data sources.

To understand how permissions work in Fabric Maps, see [Permissions in Fabric Maps](about-map-permissions.md).

## When to use a map

Use a map when you need to:

- Explore data by geographic location
- Monitor live spatial activity
- Combine historical and real‑time spatial data
- Share interactive geographic insights with others

Maps are particularly well suited for operational intelligence, routing, asset tracking, and location‑based analytics scenarios.

## Next steps

To learn how to create and configure a map:

> [!div class="nextstepaction"]
> [Create a map](create-map.md)

To customize map appearance and behavior:

> [!div class="nextstepaction"]
> [Customize a map](customize-map.md)

To understand the broader Fabric Maps capability:

> [!div class="nextstepaction"]
> [What is Fabric Maps?](about-fabric-maps.md)

For a tutorial demonstrating an end-to-end mapping scenario:

> [!div class="nextstepaction"]
> [Tutorial: Build real-time work order routing with Fabric Maps](tutorial-real-time-work-order-routing-application.md)
