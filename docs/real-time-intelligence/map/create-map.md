---
title: Create a map
description: Learn how to create a map in Real-Time Intelligence.
ms.reviewer: smunk
author: sipa
ms.author: sipa
ms.topic: how-to
ms.custom:
ms.date: 10/17/2025
ms.search.form: Create a map
---

# Create a map (preview)

Map (preview) is a powerful geospatial visualization platform that transforms spatial data, whether static or real-time, into actionable intelligence. By uncovering patterns, relationships, and trends across space and time, Map reveals insights often missed in traditional charts and tables, helping you make informed decisions with greater clarity.

> [!IMPORTANT]
> Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality may change.

Map offers robust customization capabilities that let you tailor visualizations to your audience and data content. Overlay diverse data layers—such as bubbles, heatmaps, lines, polygons, and 3D extrusions—to represent complex spatial relationships. Each layer supports advanced styling options including color schemes, opacity, stroke width, interactive tooltips, and data labels. To enhance clarity and emphasize key insights, choose from multiple map styles like Grayscale, Road, Satellite, or Night.

## Prerequisites

* A [workspace](../../fundamentals/workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity). For more information on creating a workspace, see [Create a workspace](../../fundamentals/create-workspaces.md)

## Enable tenant settings in the admin portal

> [!IMPORTANT]
> Only the tenant admin is authorized to perform this step.

1. Go to the [admin portal](../../admin/admin-center.md).
1. Select the **Tenant settings** tab in the [admin portal](../../admin/tenant-settings-index.md) and search for *Map*. For more information, see [About tenant settings](../../admin/about-tenant-settings.md).
1. Toggle the button for **Users can create Maps (preview)** to **Enabled** then select **Apply**. For more information, see [Tenant settings](../../admin/tenant-settings-index.md).
  :::image type="content" source="media/create-map/tenant-setting-microsoft-fabric-section-enable-map.png" lightbox="media/create-map/tenant-setting-microsoft-fabric-section-enable-map.png" alt-text="Screenshot of tenant settings for Maps showing the toggle button for the Users can create Maps setting.":::
1. If your Fabric capacity is located outside the EU or US regions, you must enable the Azure Maps services tenant settings. Begin by searching for **Azure Maps services** in the tenant settings, then toggle the option **Data sent to Azure Maps can be processed outside your capacity's geography region, compliance boundary, or national cloud instance** to **Enabled**.
1. Select **Apply**

For more information, see [Azure Maps service tenant settings – Microsoft Fabric](../../admin/map-settings.md).

:::image type="content" source="media/create-map/tenant-setting-azure-maps-services-section-cross-region-processing.png" lightbox="media/create-map/tenant-setting-azure-maps-services-section-cross-region-processing.png" alt-text="Screenshot of tenant settings for Map showing the toggle button for the specified setting.":::

## New map

Maps exist within the context of a workspace, and every map is associated with the workspace it was created in.

To create a new map:

1. Select the desired workspace.
1. Select **+ New item**.
1. In the **New item** window, select **Map (preview)**.
  :::image type="content" source="media/create-map/new-item-button.png" lightbox="media/create-map/new-item-button.png" alt-text="Screenshot of the New item page with Map filtered.":::
1. On the **New Map** popup, enter a name for the map. Configure workspace you want to save to and select **Create**.
  :::image type="content" source="media/create-map/create-map.png" alt-text="Screenshot of the New Map page with a name for the map and default workspace.":::
1. A new map is created in your workspace.
  :::image type="content" source="media/create-map/map-with-empty-state.png" alt-text="Screenshot of a newly created Map editor in Microsoft Fabric, showing an empty map canvas.":::

## Visualize spatial data

You can start visualizing spatial data on the map canvas by connecting to supported data sources. Map currently supports connections to Lakehouses and Eventhouses. Refer to the following sections for instructions on establishing these connections, along with details about supported data formats and item types in Microsoft Fabric.

### Connect to lakehouses

1. Select **Add data items** to open OneLake catalog.
  :::image type="content" source="media/create-map/connect-lakehouse.png" lightbox="media/create-map/connect-lakehouse.png" alt-text="Screenshot of blank map and highlighting add data items button to connect to lakehouse.":::
1. The OneLake catalog lists all the lakehouses that you have permission to access. Use the search box if needed. Select **Connect** to connect the selected lakehouse to the map item.
  :::image type="content" source="media/create-map/onelake-catalog-lakehouse.png"  lightbox="media/create-map/onelake-catalog-lakehouse.png" alt-text="Screenshot of OneLake catalog to choose the data you want to connect.":::
1. A node now appears in the Explorer pane. Expand it to view the directories and detailed file list in the Files pane.
  :::image type="content" source="media/create-map/explorer-lakehouse-view.png" lightbox="media/create-map/explorer-lakehouse-view.png" alt-text="Screenshot of OneLake catalog showing GeospatialFiles.":::

### Lakehouse supported data types and limitations

Currently Map supports the following data types:

* [GeoJSON](#add-data-to-a-map---geojson) format with **.geojson** file extension and size limitation up to **20MB**.
* [PMTiles](#add-data-to-the-map---pmtiles) format with **.pmtiles** file extension.
* [Cloud Optimized GeoTIFF (COG)](#add-data-to-a-map---cloud-optimized-geotiff-cog) format with a **.tiff** or **.tif** file extension.

> [!NOTE]
> GeoJSON files larger than **20MB** must be converted into a tileset in order to be used by Microsoft Fabric Map. For more information on how to convert a GeoJSON file into tileset, see **[Create a tileset](create-tile-sets.md)**.

#### Add data to a map - GeoJSON

GeoJSON is a widely used open standard format for representing geospatial data in a lightweight, human-readable way using JSON (JavaScript Object Notation). It's designed to encode geographic features and their attributes, making it easy to share and process spatial data across web applications and APIs. For more information, see [GeoJSON](https://geojson.org/).

1. Right-click the desired GeoJSON file and choose **Show on map**. The map automatically displays the spatial data using its default settings.
  :::image type="content" source="media/create-map/geo-json-visualization.png" lightbox="media/create-map/geo-json-visualization.png" alt-text="Screenshot with a list of GeoJSON files that can be added to the map.":::
1. The following screenshot shows the data layer added to the map. This data layer consists of power plant locations ([point geometry](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.2)) in California using the default layer color.
    :::image type="content" source="media/create-map/geo-json-show-map.png" lightbox="media/create-map/geo-json-show-map.png" alt-text="Screenshot of GeoJSON point data rendered on the map that consist of power plant locations in California.":::
1. Navigate to the **Data layer** pane and select the ellipsis menu (**...**) to show the actions available in the layer.
    :::image type="content" source="media/create-map/geo-json-layer-with-more-icon.png" lightbox="media/create-map/geo-json-layer-with-more-icon.png" alt-text="Screenshot of the data layer view with the ellipsis menu highlighted.":::
1. Right-click **Zoom to fit** to take closer look at the data distribution.
    :::image type="content" source="media/create-map/geo-json-zoom-fit-action.png" lightbox="media/create-map/geo-json-zoom-fit-action.png" alt-text="Screenshot of the map showing the 'Zoom to fit' option.":::
    > [!TIP]
    > To get a larger canvas for your map, collapse the **Explorer** pane to expand the map view.
    :::image type="content" source="media/create-map/geo-json-after-zoom-fit.png" lightbox="media/create-map/geo-json-after-zoom-fit.png" alt-text="Screenshot of the map after selecting 'Zoom to fit', where the map zoomed in to show only the portion of the map with data points displayed.":::

There are other data layer customization options available. For more information, see [Customize a map](customize-map.md).

#### Add data to the map - PMTiles

**PMTiles** is a single-file archive format designed for storing and serving tiled geospatial data—such as vector and raster map tiles—in a highly efficient and portable way. Instead of managing thousands or millions of small tile files in a directory structure, PMTiles packages all tiles into one file, simplifying deployment and reducing storage and request overhead. For more information, see [PMTiles Concepts](https://docs.protomaps.com/pmtiles/).

* Right-click the desired PMTiles file and choose **Show on map**. The map automatically displays the spatial data using its default settings.

  :::image type="content" source="media/create-map/pm-tiles-visualization.png" lightbox="media/create-map/pm-tiles-visualization.png" alt-text="Screenshot showing a list of PMTiles with the ellipsis menu selected on one of the files, showing the popup menu with 'show on map' highlighted.":::

The following screenshot shows the new data layer added to the map with the default layer color. The new data layer shows fire perimeter zones across California, represented using [polygon geometry](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6).

:::image type="content" source="media/create-map/pm-tiles-show-map.png" lightbox="media/create-map/pm-tiles-show-map.png" alt-text="Screenshot of the map showing the newly added data layer that was just added.":::

> [!NOTE]
> **Zoom to fit** is available for PMTiles when bounds information is included in the metadata.

For more information on data layer customization, see [Customize a map](customize-map.md).

#### Add data to a map - Cloud Optimized GeoTIFF (COG)

A Cloud Optimized GeoTIFF (COG) is a standard GeoTIFF file (.tiff) designed for cloud hosting. Its internal structure allows efficient access by enabling clients to retrieve only the portions of the file they need, rather than downloading the entire file. For more information, see [cogeo.org](https://cogeo.org/).

> [!IMPORTANT]
> Fabric Maps currently supports Cloud Optimized GeoTIFF (COG) files that meet the following requirements:
>
> * **Projection:** Only files using the EPSG:3857 (Web Mercator) projection system are supported.
> * **Bands:** Supported formats include 3-band RGB (Red, Green, Blue) and 4-band RGBA (Red, Green, Blue, Alpha for transparency). Single-band and other multi-band configurations aren't supported.
>
> Ensure your imagery is correctly formatted before uploading. Files that don't meet these requirements won't render and can trigger an error message.

1. Right-click the desired COG file and choose **Show on map**. The map automatically displays the spatial data using its default settings.

1. Navigate to the **Data layer** pane and select the ellipsis menu (**...**) to show the actions available in the layer.

1. Select **Zoom to fit** to take closer look at the data distribution.
    :::image type="content" source="media/create-map/cog-file-example.png" lightbox="media/create-map/cog-file-example.png" alt-text="Screenshot of a map with a Cloud Optimized GeoTIFF (COG) file overlaying it.":::

There are other data layer customization options available. For more information, see [Customize a map](customize-map.md).

> [!TIP]
> For scenarios that require custom basemaps or organization‑specific imagery, see [Bring your own imagery into Fabric Maps](https://blog.fabric.microsoft.com/en-US/blog/maps-in-microsoft-fabric-bring-your-own-imagery-into-real-time-intelligence/).

### Connect to Eventhouse/KQL databases

1. Switch to the **Eventhouse** tab and select **Add data items** to open the OneLake catalog.
  :::image type="content" source="media/create-map/connect-eventhouse.png" lightbox="media/create-map/connect-eventhouse.png" alt-text="Screenshot of map and highlighting add data items button to connect to eventhouse.":::
1. The OneLake catalog displays all KQL databases the user is authorized to access. Select **Connect** to link a KQL Database under Eventhouse to this map item.
  :::image type="content" source="media/create-map/onelake-catalog-eventhouse.png" lightbox="media/create-map/onelake-catalog-eventhouse.png" alt-text="Screenshot of OneLake catalog with filtering to eventhouses.":::
1. Expand the left pane to view the internal KQL queryset and KQL queries.
  :::image type="content" source="media/create-map/explorer-eventhouse-view.png" lightbox="media/create-map/explorer-eventhouse-view.png" alt-text="Screenshot of OneLake catalog with filtering to eventhouse.":::

### Eventhouse support

Map supports *Internal KQL Querysets* created with the KQL Database:

:::image type="content" source="media/create-map/eventhouse-internal-queryset.png" alt-text="Screenshot of the eventhouse Internal KQL Querysets.":::

But doesn't support:

* [Workspace-level KQL Querysets](../create-query-set.md).
* [Management commands](/kusto/management/?view=microsoft-fabric&preserve-view=true) aren't supported in KQL queries.
* [Database shortcut](../database-shortcut.md).

> [!NOTE]
> Each tab supports only one query. Using multiple queries in a single tab results in a syntax error.

#### Use KQL queries to add data to map

> [!NOTE]
> Prepare the KQL queries before rendering begins on the Map, and ensure they include spatial data. Use the **Refresh** action to retrieve the latest KQL queries from the KQL Database.

1. Select the KQL query that you want to render on the map by right-clicking on it and selecting **Show on map** from the popup menu to launch the configuration wizard.
  :::image type="content" source="media/create-map/kql-data-visualization.png" lightbox="media/create-map/kql-data-visualization.png" alt-text="Screenshot of Add KQL query to the map.":::
1. In **Preview data**, select the desired KQL query, then select **Next** to proceed.
  :::image type="content" source="media/create-map/kql-data-preview.png" lightbox="media/create-map/kql-data-preview.png" alt-text="Screenshot of KQL query data preview.":::
1. Enter the desired name and query refresh interval, then select **Next** to proceed to **Review and add to map**.
  :::image type="content" source="media/create-map/kql-data-configure-query-interval.png" lightbox="media/create-map/kql-data-configure-query-interval.png" alt-text="Screenshot of KQL query configuration interval.":::
1. After reviewing the configuration, select **Add to map** to add the new data layer to the map.
  :::image type="content" source="media/create-map/kql-data-review-and-add-map.png" lightbox="media/create-map/kql-data-review-and-add-map.png" alt-text="Screenshot of review of KQL query visualization settings.":::
1. Select **Zoom to fit** from the new layers drop-down menu in the **Data layers** view.
  :::image type="content" source="media/create-map/kql-data-zoom-fit.png" lightbox="media/create-map/kql-data-zoom-fit.png" alt-text="Screenshot of the 'zoom to fit' setting.":::
1. The map is now zoomed in, enabling you to visually inspect the data with improved readability.
  :::image type="content" source="media/create-map/kql-data-after-zoom-fit.png" lightbox="media/create-map/kql-data-after-zoom-fit.png" alt-text="Screenshot showing the map after the 'zoom to fit' setting was selected.":::
1. The query refresh interval enables you to visualize changes in real-time as shown in the following screenshot.
  :::image type="content" source="media/create-map/kql-data-layer-refresh.gif" lightbox="media/create-map/kql-data-layer-refresh.gif" alt-text="Screenshot of the map showing it refreshing the point data, showing how the map updates in real-time.":::
1. Select the **Save** button in the upper left side of the screen to save all of the map changes.
  :::image type="content" source="media/create-map/save-map.png" lightbox="media/create-map/save-map.png" alt-text="Screenshot of saving the map.":::

## Data layer management

When managing multiple data layers on a map, maintaining organization is key to creating clear and effective visualizations. The Data layer pane provides essential tools to help you manage layers efficiently, including options to **Reorder**, **Rename**, **Delete**, and **Duplicate**. The following section outlines best practices for layer management, supporting the creation of clean, maintainable, and insightful spatial visualizations.

### Show or hide data layer

* Show the data layer.
  :::image type="content" source="media/create-map/data-layer-show.png" lightbox="media/create-map/data-layer-show.png"  alt-text="Screenshot of showing the data layer.":::
* Hide the data layer.
  :::image type="content" source="media/create-map/data-layer-hide.png" lightbox="media/create-map/data-layer-hide.png" alt-text="Screenshot of hiding the data layer.":::

### Reorder data layer

Drag a data layer to change its display order relative to other layers on the map.

The following screenshot demonstrates how to reorder data layers. To improve visual clarity in overlapping areas, move the Power Plant layer to the topmost position on the map. Placing layers based on point geometries above layers based on polygon geometries makes them easier to observe and interpret within the spatial visualization.

:::image type="content" source="media/create-map/data-layer-reorder.gif" lightbox="media/create-map/data-layer-reorder.gif" alt-text="Screenshot of reordering the data layer.":::

### Rename data layer

By default the name of the data layer is the name of the query it was created from. You can change the name at the time of creation, and can also change it at any point after. The following steps show how to change the name of an existing data layer.

1. Select the data layer to rename, then select **Rename** in the popup menu.
  :::image type="content" source="media/create-map/data-layer-rename.png" lightbox="media/create-map/data-layer-rename.png" alt-text="Screenshot of rename action of data layer.":::
1. Enter the new name, then select **Rename**.
  :::image type="content" source="media/create-map/data-layer-renaming.png" lightbox="media/create-map/data-layer-renaming.png" alt-text="Screenshot of renaming data layer.":::

### Duplicate data layer

A new data layer can be created by duplicating an existing one. After duplication, customize the layer's name and settings to highlight specific data dimensions or attributes.

> [!NOTE]
> Enabling **Clustering** while duplicating data layers applies clustering effects to both layers, as they reference the same dataset.

1. Choose the data layer you want to copy, then select **Duplicate** in the popup menu.
  :::image type="content" source="media/create-map/data-layer-before-duplicated.png" lightbox="media/create-map/data-layer-before-duplicated.png" alt-text="Screenshot before duplicating the data layer.":::
1. A new data layer is created with the same settings as the original, except the name includes "(copy)" to indicate duplication.
  :::image type="content" source="media/create-map/data-layer-duplicated.png" lightbox="media/create-map/data-layer-duplicated.png" alt-text="Screenshot of the duplicated data layer.":::

### Zoom to fit

Zoom to fit centers the map view on the selected data layer and adjusts it to display the full extent of that layer, making it easier to locate and explore spatial data.

1. Choose the data layer you want to view, then select **Zoom to fit** in the popup menu.
  :::image type="content" source="media/create-map/data-layer-zoom-fit.png" lightbox="media/create-map/data-layer-zoom-fit.png" alt-text="Screenshot of zoom to fit action of data layer.":::
1. The map view centers on the selected data layer and adjusts to display its full spatial extent.
  :::image type="content" source="media/create-map/data-layer-after-zoom-fit.png" lightbox="media/create-map/data-layer-after-zoom-fit.png" alt-text="Screenshot of after selecting zoom to fit action of data layer.":::

> [!NOTE]
> **Zoom to fit** is unavailable for PMTiles when bounds information is missing.

### Delete data layer

Delete a data layer when you need to permanently remove it from the map. The following steps show how to delete an existing data layer.

1. Choose the data layer you want to remove from the map, then select **Delete** in the popup menu.
  :::image type="content" source="media/create-map/data-layer-delete.png" lightbox="media/create-map/data-layer-delete.png" alt-text="Screenshot of delete data layer.":::

1. The layer is removed from both the map and the **Data layers** list.
  :::image type="content" source="media/create-map/data-layer-after-delete.png" lightbox="media/create-map/data-layer-after-delete.png" alt-text="Screenshot showing results after deleting the data layer.":::

> [!div class="nextstepaction"]
> [Customize a map](customize-map.md)

> [!div class="nextstepaction"]
> [Share a map](share-map.md)
