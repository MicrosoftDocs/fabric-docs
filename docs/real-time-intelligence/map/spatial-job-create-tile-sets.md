---
title: Spatial Job – Create tileset 
description: Learn how to create a Map tileset in Microsoft Fabric Real-Time Intelligence.
ms.reviewer: smunk
author: sipa
ms.author: sipa
ms.topic: tutorial
ms.custom:
ms.date: 09/15/2025
ms.search.form: Create and manage tilesets
---

# Spatial job – create tileset

Microsoft Fabric Map items enable users to visualize spatial data and derive insights by integrating both static and dynamic data sources. It uses raw data to create meaningful, actionable spatial information.

In certain cases, static spatial datasets can be extremely large, making smooth rendering on the map challenging. To overcome this, Map offers a specialized tool that converts extensive spatial data, such as GeoJSON files, into high-performance **tilesets**. Tilesets are commonly used in mapping platforms to visualize large datasets, such as roads, buildings, or environmental features, without overwhelming the system or the user. This conversion into tilesets enables efficient rendering, resulting in a smoother and more responsive mapping experience.

This tutorial shows you how to create tilesets from your source data.

## Introduction to tiles and tilesets

### Tiles

**Tiles** are small, square sections of a map that represent geographic data for a specific area and zoom level. Instead of rendering an entire map as a single image, Map divides it into tiles to improve performance and scalability. Each tile contains data such as points, lines, and polygons relevant to its geographic area.
<!----------------------------------------------------------------------------------------------------------------------------------------------------
There are two main types of tiles:

- **Raster tiles**: Prerendered images (like PNGs or JPEGs) that display map visuals.
- **Vector tiles**: Packets of geographic data (coordinates, attributes) that are rendered dynamically.

> [!NOTE]
> Map uses vector tiles as they allow for interactive styling and customization.
---------------------------------------------------------------------------------------------------------------------------------------------------->
### Tilesets

A Map **Tileset** is a structured collection of tiles that represent geographic data for a larger area—such as a city, country/region, or the entire globe. Each tile contains only the data relevant to its specific location, and tilesets are organized by zoom levels and tile coordinates. This structure allows mapping software to load only the necessary tiles for the current view, significantly improving rendering speed, scalability, and overall performance.

> [!NOTE]
> A format of tileset called [**PMTiles**](https://github.com/protomaps/PMTiles/blob/main/spec/v3/spec.md) is a modern, portable tileset for storing and delivering tiles. Unlike traditional tilesets that consist of thousands of small files organized in folders, PMTiles packages all tiles into a **single archive file**. This makes it easier to manage, distribute, and stream map data, especially for large datasets.

### Zoom level range and corresponding view

Zoom levels affect the resolution of map tiles. Lower zoom levels display fewer, larger tiles---meaning each tile covers a broader graphical range. In contrast, higher zoom levels show more, smaller tiles, each covering a smaller graphical area with increased detail. This approach manages both performance and visual accuracy. The table below outlines zoom levels with their associated map views. For more information, see [Zoom levels and tile grid in
Microsoft Azure Maps](/azure/azure-maps/zoom-levels-and-tile-grid?tabs=csharp).

| Zoom level | Typical view | Approximate distance range |
|--|--|--|
| 0-2 | Entire globe | Thousands of kilometers |
| 3-5 | Continents, large countries/regions, major rivers | Hundreds to thousands of kilometers |
| 6-8 | countries/regions, major cities | Tens to hundreds of kilometers |
| 9-11 | Cities, towns, highways | 5-50 kilometers |
| 12-14 | Neighborhoods, streets | 1-5 kilometers |
| 15-17 | Buildings, parks, detailed street layouts | 100 meters to 1 kilometer |
| 18-20 | Individual houses, entrances, trees | Less than 100 meters|

## Prerequisites

- A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).

- A [map](create-map.md) with editor permission.

- A [lakehouse](../../data-engineering/lakehouse-overview.md) is used to store GeoJSON files.

## Create a tileset

Select **New tileset** to open the creation wizard.

:::image type="content" source="media/spatial-job-create-tilesets/new-tile-set.png" lightbox="media/spatial-job-create-tilesets/new-tile-set.png" alt-text="A screenshot showing the new tileset button.":::

Alternatively, you can right-click on a GeoJSON file in lakehouse and then select **Create tileset** from the popup menu.

:::image type="content" source="media/spatial-job-create-tilesets/new-tile-set-option-lakehouse-files-dropdown.png" lightbox="media/spatial-job-create-tilesets/new-tile-set-option-lakehouse-files-dropdown.png" alt-text="A screenshot showing the new tileset option in the Lakehouse files dropdown menu.":::

### Step 1: Connect to a lakehouse and select source files

Start by connecting to at least one lakehouse that contains GeoJSON files. You can choose multiple files to convert into a vector tileset.

> [!NOTE]
>
> - Currently, Map supports only valid [GeoJSON](https://datatracker.ietf.org/doc/html/rfc7946) files with the *.geojson* extension as source files.
> - The combined size of all selected files for a single conversion job must not exceed **1 GB**.

:::image type="content" source="media/spatial-job-create-tilesets/select-source-file.png" lightbox="media/spatial-job-create-tilesets/select-source-file.png" alt-text="A screenshot showing source files that can be selected.":::

:::image type="content" source="media/spatial-job-create-tilesets/selected-source-files.png" lightbox="media/spatial-job-create-tilesets/selected-source-files.png" alt-text="A screenshot showing the selected source files.":::

### Step 2: Configure tileset metadata

Specify the output location and name for your tileset. You can also add a description and copyright details if desired.

:::image type="content" source="media/spatial-job-create-tilesets/tile-set-options.png" lightbox="media/spatial-job-create-tilesets/tile-set-options.png" alt-text="A screenshot showing the tileset options screen.":::

> [!NOTE]
> The output files are generated in the [PMTiles](https://docs.protomaps.com/pmtiles/) format.

### Step 3: Configure layer settings

Each file is processed as an individual layer within the tileset.

Next, set the following configuration options:

- **Layer name**: You can assign a custom name to each layer or use the default name, which matches the file name.
- **Zoom level range**: Define the minimum and maximum zoom levels for your spatial data visibility. For more information, see [zoom level range](#zoom-level-range-and-corresponding-view).

  > [!NOTE]
  > Things to keep in mind with configuring zoom levels:
  >
  > - Using a wider zoom level range generates more tiles, which can increase processing time.
  > - The supported zoom levels range from 5 to 18.

- **Feature properties**: For GeoJSON datasets, you can choose whether to include all feature properties along with the geometries or only the geometries.

  > [!NOTE]
  > Including all feature properties increase the size of the tiles and extend processing time.

:::image type="content" source="media/spatial-job-create-tilesets/configure-layer-settings.png" lightbox="media/spatial-job-create-tilesets/configure-layer-settings.png" alt-text="A screenshot showing the layer options screen.":::

### Step 4: Review and create tileset

Review the configuration from previous steps, then select **Create** to start the spatial job.

:::image type="content" source="media/spatial-job-create-tilesets/review-create.png" lightbox="media/spatial-job-create-tilesets/review-create.png" alt-text="A screenshot showing the layer options review screen.":::

> [!NOTE]
> The overall zoom level range for the tileset is automatically determined based on the settings defined in each individual layer.

## Monitor the Tileset Creation Job

After starting the tileset creation process, a notification will confirm that the job is in progress. You can select **View Tileset Job** to see details of all recent runs for this spatial operation in the Map.

:::image type="content" source="media/spatial-job-create-tilesets/notifications.png" lightbox="media/spatial-job-create-tilesets/notifications.png" alt-text="A screenshot showing the notifications dialog.":::

> [!NOTE]
> The tileset creation job operates as a [Long Running Operation](/rest/api/fabric/articles/long-running-operation).

Select **Go to Monitor** to view more job history related to this Map item.

:::image type="content" source="media/spatial-job-create-tilesets/recent-runs.png" lightbox="media/spatial-job-create-tilesets/recent-runs.png" alt-text="A screenshot showing the recent runs.":::

Select the **View details** icon to display more information about the selected job.

:::image type="content" source="media/spatial-job-create-tilesets/monitor.png" lightbox="media/spatial-job-create-tilesets/monitor.png" alt-text="A screenshot showing the monitor screen, which allows you to view and track the status of the activities all the workspaces you have permissions to see in Microsoft Fabric.":::

:::image type="content" source="media/spatial-job-create-tilesets/monitor-details.png" lightbox="media/spatial-job-create-tilesets/monitor-details.png" alt-text="A screenshot showing the monitor job screen.":::

> [!TIP]
>
> When you open the Monitor page from a notification panel, it automatically filters by the active map item at that moment. If you later start a new job with a different map item and revisit the Monitor page in the same browser tab, it will only show data for the new map item—not the previous one.

## Cancel tileset creation

To cancel the tileset creation, open the **Monitor** page and select the **Cancel** icon next to the corresponding job.

:::image type="content" source="media/spatial-job-create-tilesets/cancel-job.png" lightbox="media/spatial-job-create-tilesets/cancel-job.png" alt-text="A screenshot showing the details of the selected job being monitored.":::

> [!NOTE]
> Users can only cancel a job when the status is **In progress**.
