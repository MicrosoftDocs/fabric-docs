---
title: Overview for Microsoft Fabric Maps
description: Learn about services and capabilities in Microsoft Fabric Maps and how to use them in your solutions.
ms.reviewer: smunk
author: sipa
ms.author: sipa
ms.topic: overview
ms.custom:
ms.date: 2/23/2026
ms.search.form: 
---

# What is Fabric Maps? (preview)

Microsoft Fabric Maps let you visualize real-time and historical location data in Microsoft Fabric, helping you monitor live events, analyze spatial patterns, and understand geographic context alongside time-based insights.

Maps are built to work with data in space and time. You can visualize real‑time event data queried from [Eventhouses](../eventhouse.md) using [Kusto Query Language (KQL)](/kusto/query/?view=microsoft-fabric), and historical or static spatial data stored in a [Lakehouse](/fabric/data-engineering/lakehouse-overview). This combination makes it possible to view live operational activity in geographic context while maintaining access to historical reference data.

> [!IMPORTANT]
> Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality may change.

## How maps fit into Real-Time Intelligence

In a Real-Time Intelligence solution, data is ingested from streaming sources, processed and stored in Eventhouses, and a visual endpoint in this workflow by rendering query results as spatial layers that refresh as new data arrives. Each map is a first‑class Fabric item that belongs to a workspace and participates in Fabric's permission, sharing, and lifecycle management model.

Fabric Maps display data through layers, where each layer represents a specific dataset or query result. Layers can visualize points, lines, or polygons, allowing you to emphasize different spatial aspects of the data—such as density, movement, or geographic boundaries—within a single map view. For more information on data layers, see [Add data to a map](create-map.md#add-data-to-a-map---geojson).

## Working with real-time and historical spatial data

Fabric Maps support both real-time and static spatial data. Eventhouse-based layers can refresh at defined intervals to reflect the latest streaming data, enabling continuous monitoring of live events. At the same time, Lakehouse-based layers can provide historical or reference data, such as boundaries or known locations, to add context to what is happening right now.

This combination is especially useful in scenarios where incoming events need to be evaluated against known geography, routes, or regions.

### Imagery data sources

In addition to vector data layers, Fabric Maps support imagery data sources that provide raster basemap and custom imagery layers. These imagery layers, powered by Azure Maps or stored in OneLake, add geographic context beneath vector and real-time data, helping users interpret spatial patterns and operational activity within their physical environment. For more information, see [Add data to a map - Cloud Optimized GeoTIFF (COG)](create-map.md#add-data-to-a-map---cloud-optimized-geotiff-cog).

## Using Azure Maps services with Fabric Maps

Fabric Maps are commonly used together with Azure Maps REST APIs to enrich spatial workflows. In routing and logistics scenarios, an Azure Maps service such as the Route Directions API can be used to calculate routes or determine optimized paths based on incoming location data. The resulting route geometry is stored in Fabric—typically in a Lakehouse or generated through a notebook—and then added to a map as a layer for visualization and analysis. For an example, see [Tutorial: Build real-time work order routing with Fabric Maps](tutorial-real-time-work-order-routing-application.md).

This approach separates geospatial computation from visualization. Azure Maps services perform spatial processing, while Fabric Maps focus on presenting continuously updated geographic insights within a Real-Time Intelligence solution.

## Common scenarios

Maps in Real-Time Intelligence are suited for a range of location‑based scenarios, including:

- Monitoring live operational events on a map as they occur  
- Visualizing the movement or flow of entities in real time  
- Analyzing geographic distribution patterns in streaming data  
- Combining historical and real-time spatial data in a single view

By integrating real-time analytics with geographic context, Maps help transform streaming data into actionable, location‑aware insights.

## Next steps

> [!div class="nextstepaction"]
> [Create a map](create-map.md)

> [!div class="nextstepaction"]
> [Tutorial: Build real-time routing workflow with Fabric Maps](tutorial-real-time-work-order-routing-application.md)

> [!div class="nextstepaction"]
> [What is Azure Maps?](/azure/azure-maps/about-azure-maps)

> [!div class="nextstepaction"]
> [What is Real-Time Intelligence?](../overview.md)  
