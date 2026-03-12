---
title: Create layers from lakehouse data in Fabric Maps
description: Learn how to create layers using lakehouse data in Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/13/2026
ms.search.form: Create layers from lakehouse data in Fabric Maps
---

# Create layers from lakehouse data in Fabric Maps

This article shows how to create map layers in Fabric Maps using data stored in a Microsoft Fabric lakehouse. You'll learn how to connect a map to a lakehouse, select supported geospatial data types, and configure the resulting map layers for visualization.

For conceptual background, see [Use lakehouse data in Fabric Maps](about-lakehouse-layers.md).

## Prerequisites

Before you begin, ensure that:

- You have a workspace with a Fabric-enabled capacity.
- You have permission to view the target lakehouse and create or edit maps.
- Your lakehouse contains supported geospatial data (for example, GeoJSON, PMTiles, or COG files).

## Connect a map to a lakehouse

1. Open your map in Edit mode.
1. Select **Add** button in the **Fabric items** tab, to open the OneLake catalog.

    :::image type="content" source="media/layers/lakehouse/add-lakehouse.png" alt-text="A screenshot showing the Explorer pane in Fabric Maps showing the Fabric items tab with the Add dropdown menu expanded, listing three options: Lakehouse, KQL database, and Ontology (preview), with Ontology (preview) highlighted.":::

1. Select the lakehouse that contains your geospatial data.
1. Select **Add**.

    :::image type="content" source="media/layers/lakehouse/catalog.png" alt-text="A screenshot showing the OneLake catalog dialog titled Choose the data you want to connect with. A table lists lakehouse items. An item is selected with a green checkbox. An Add button highlighted with a red border and a Cancel button appear in the bottom right corner.":::

Fabric Maps lists available tables and files from the selected lakehouse.

## Create a layer from vector data

### Add a GeoJSON file

GeoJSON is a widely used open standard format for representing geospatial data in a lightweight, human-readable way using JSON (JavaScript Object Notation). It's designed to encode geographic features and their attributes, making it easy to share and process spatial data across web applications and APIs. For more information, see [GeoJSON](https://geojson.org/).

1. In the OneLake catalog, expand the Files section of your lakehouse.
1. Select a **GeoJSON** file.
1. Choose **Show on map**.

:::image type="content" source="media/layers/lakehouse/show-on-map.png" alt-text="Screenshot of the OneLake file browser in Fabric Maps showing a GeoJSON file selected in the Files list. A context menu displays three options: Show on map (highlighted), Rename, and Delete. The file explorer sidebar on the left shows the GeoJSON folder expanded within the Geospatial Files section. A map preview appears on the right side of the interface.":::

Fabric Maps creates a vector layer and automatically detects the geometry type (point, line, or polygon).

> [!TIP]
> To get a larger canvas for your map, collapse the **Explorer** pane to expand the map view.
:::image type="content" source="media/layers/lakehouse/geo-json-after-zoom-fit.png" lightbox="media/layers/lakehouse/geo-json-after-zoom-fit.png" alt-text="Screenshot of the map after selecting 'Zoom to fit', where the map zoomed in to show only the portion of the map with data points displayed.":::

### Add a PMTiles file

**PMTiles** is a single-file archive format designed for storing and serving tiled geospatial data—such as vector and raster map tiles—in a highly efficient and portable way. Instead of managing thousands or millions of small tile files in a directory structure, PMTiles packages all tiles into one file, simplifying deployment and reducing storage and request overhead. For more information, see [PMTiles Concepts](https://docs.protomaps.com/pmtiles/).

1. In the OneLake catalog, expand the Files section of your lakehouse.
1. Select a **PMTiles** file.
1. Choose **Show on map**.

The PMTiles file is rendered as a vector tile layer optimized for interactive panning and zooming.

:::image type="content" source="media/layers/lakehouse/pm-tiles-visualization.png" lightbox="media/layers/lakehouse/pm-tiles-visualization.png" alt-text="Screenshot showing a list of PMTiles with the ellipsis menu selected on one of the files, showing the popup menu with 'show on map' highlighted.":::

The following screenshot shows the new data layer added to the map with the default layer color. The new data layer shows fire perimeter zones across California, represented using [polygon geometry](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6).

:::image type="content" source="media/layers/lakehouse/pm-tiles-show-map.png" lightbox="media/layers/lakehouse/pm-tiles-show-map.png" alt-text="Screenshot of the map showing the newly added data layer that was just added.":::

> [!NOTE]
> **Zoom to fit** is available for PMTiles when bounds information is included in the metadata.

For more information on data layer customization, see [Customize a map](customize-map.md).

## Create a layer from raster data

### Add a Cloud Optimized GeoTIFF (COG)

A Cloud Optimized GeoTIFF (COG) is a standard GeoTIFF file (.tiff) designed for cloud hosting. Its internal structure allows efficient access by enabling clients to retrieve only the portions of the file they need, rather than downloading the entire file. For more information, see [cogeo.org](https://cogeo.org/).

> [!IMPORTANT]
> Fabric Maps currently supports Cloud Optimized GeoTIFF (COG) files that meet the following requirements:
>
> - **Projection:** Only files using the EPSG:3857 (Web Mercator) projection system are supported.
> - **Bands:** Supported formats include 3-band RGB (Red, Green, Blue) and 4-band RGBA (Red, Green, Blue, Alpha for transparency). Single-band and other multi-band configurations aren't supported.
>
> Ensure your imagery is correctly formatted before uploading. Files that don't meet these requirements won't render and can trigger an error message.

1. Right-click the desired COG file and choose **Show on map**. The map automatically displays the spatial data using its default settings.

1. Navigate to the **Data layer** pane and select the ellipsis menu (**...**) to show the actions available in the layer.

1. Select **Zoom to fit** to take closer look at the data distribution.
    :::image type="content" source="media/layers/lakehouse/cog-file-example.png" lightbox="media/layers/lakehouse/cog-file-example.png" alt-text="Screenshot of a map with a Cloud Optimized GeoTIFF (COG) file overlaying it.":::

There are other data layer customization options available. For more information, see [Customize a map](customize-map.md).

> [!TIP]
> For scenarios that require custom basemaps or organization‑specific imagery, see [Bring your own imagery into Fabric Maps](https://blog.fabric.microsoft.com/en-US/blog/maps-in-microsoft-fabric-bring-your-own-imagery-into-real-time-intelligence/).

## Configure the layer

After adding a layer, you can:

- Rename the layer for clarity.
- Adjust visibility and ordering.
- Apply styling options such as color, opacity, and size (for vector layers).
- Configure labels and tooltips.

Changes apply immediately to the map canvas. For more information about layer settings, see [Customize a map](customize-map.md).

## Next steps

> [!div class="nextstepaction"]
> [Data layer management](data-layer-management.md)

> [!div class="nextstepaction"]
> [Data filtering in Fabric Maps](about-data-filtering.md)
