---
title: Tilesets in Fabric Maps 
description: Learn about tilesets and PMTiles in Microsoft Fabric Maps.
ms.reviewer: smunk
author: sipa
ms.author: sipa
ms.topic: article
ms.custom:
ms.date: 02/16/2026
ms.search.form: What is a tileset, tileset, What is a PMtile, PMtile
---

# What is a tileset in Fabric Maps? (preview)

Microsoft Fabric Maps uses tilesets to efficiently visualize large static spatial datasets. By dividing geographic data into preprocessed tiles across zoom levels, tilesets enable fast rendering and smooth interaction when working with large maps.

This article explains the core concepts behind tiles, tilesets, and PMTiles in Fabric Maps, and when to use a tileset instead of rendering raw spatial data directly. For step‑by‑step instructions on using tilesets in Fabric Maps, see [Create tilesets](create-tile-sets.md).

## Introduction to tiles and tilesets

### Tiles

**Tiles** are small, square sections of a map that represent geographic data for a specific area and zoom level. Instead of rendering an entire map as a single image, Fabric Maps divides it into tiles to improve performance and scalability. Each tile contains data such as points, lines, and polygons relevant to its geographic area.

#### Map tile types

There are two main types of tiles supported in Microsoft Fabric Maps:

- **Raster tiles**: Prerendered image tiles (such as PNG or JPEG) that provide fixed map visuals.
- **Vector tiles**: Data packets containing geographic features, rendered dynamically for customizable styling.

> [!NOTE]
> Fabric Maps supports PMTiles created from both raster and vector tiles. **However, Fabric Maps can currently generate PMTiles only from vector tiles**.

##### Map tile type comparison

| Feature         | Raster tiles                          | Vector tiles                               |
|-----------------|---------------------------------------|--------------------------------------------|
| **Format**      | Prerendered images (PNG, JPEG)       | Data packets (geometry + attributes)       |
| **Styling**     | Fixed, can't be changed client-side  | Dynamic, customizable on the client        |
| **Performance** | Larger files, slower zoom transitions | Smaller payloads, smooth zoom and rotation |
| **Use Cases**   | Static imagery (satellite, terrain)   | Interactive maps with dynamic styling      |

### Tilesets

A tileset is a structured collection of map tiles that represent geographic data for a large area—ranging from a city to the entire globe.

Each tile in the tileset contains only the data relevant to a specific location and is organized by [zoom level](#understanding-zoom-levels-in-tilesets) and tile coordinates. This structure allows Fabric Maps to load only the tiles needed for the current map view, improving rendering performance, scalability, and responsiveness compared to rendering raw spatial data.

### PMTiles

Fabric Maps uses **PMTiles** as its tileset format. PMTiles is a modern, portable format that packages tiles for multiple zoom levels into a **single archive file**. Compared to folder-based tilesets, this approach simplifies storage, distribution, and streaming—especially for large spatial datasets.

Key benefits of PMTiles include:

- Efficient, responsive map interactions at scale  
- Reduced network and storage overhead compared to folder-based tilesets  
- Support for serverless delivery from cloud storage and CDNs  

In Fabric Maps, PMTiles are stored as files in a **lakehouse** and consumed directly by the map. When a map is viewed, Fabric Maps requests only the tile data required for the current zoom level and map extent. This selective loading reduces data transfer and improves rendering performance when working with large static spatial datasets.

Fabric Maps currently supports generating PMTiles from valid GeoJSON files using vector tiles, as described in [Create tilesets](create-tile-sets.md). For more information about using PMTiles in maps, see [Add data to the map – PMTiles](create-map.md#add-data-to-the-map---pmtiles) in the *Create a map* article.

#### Understanding zoom levels in tilesets

Zoom levels define how much geographic detail is shown on a map at different scales. In a tileset, spatial data is organized into tiles across multiple zoom levels so that Fabric Maps can load only the data needed for the current view. Lower zoom levels display broader areas with less detail, while higher zoom levels show smaller areas with greater detail, helping balance performance and visual clarity.

Zoom levels are defined when you [Create a tileset](create-tile-sets.md#create-a-tileset). Fabric Maps supports zoom levels from 5 through 18, which balance visual detail, performance, and tileset size.

| Zoom level | Typical view | Approximate distance range |
|--|--|--|
| 0-2 | Entire globe | Thousands of kilometers |
| 3-5 | Continents, large countries/regions, major rivers | Hundreds to thousands of kilometers |
| 6-8 | countries/regions, major cities | Tens to hundreds of kilometers |
| 9-11 | Cities, towns, highways | 5-50 kilometers |
| 12-14 | Neighborhoods, streets | 1-5 kilometers |
| 15-17 | Buildings, parks, detailed street layouts | 100 meters to 1 kilometer |
| 18-20 | Individual houses, entrances, trees | Less than 100 meters|

For more information on zoom levels, see [Zoom levels and tile grid in
Microsoft Azure Maps](/azure/azure-maps/zoom-levels-and-tile-grid?tabs=csharp).

### Why use tilesets?

Large static spatial datasets—such as road networks, buildings, or environmental boundaries—can be expensive to render directly. Tilesets improve performance by:

- Loading only the data relevant to the current map view
- Reducing client-side rendering overhead
- Supporting smooth zooming and panning at different levels of detail.

Tilesets are designed to efficiently render large spatial datasets by loading only the data needed for the current map view.

## Next steps

> [!div class="nextstepaction"]
> [Create a tileset](create-tile-sets.md)
