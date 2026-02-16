---
title: How to create tilesets 
description: Learn how to create a map tileset in Microsoft Fabric Real-Time Intelligence.
ms.reviewer: smunk
author: sipa
ms.author: sipa
ms.topic: how-to
ms.custom:
ms.date: 02/16/2026
ms.search.form: Create a tileset, Creating tilesets, how to create tilesets, tileset
---

# Create tilesets (preview)

Large static spatial datasets can be expensive to render directly on a map. To improve performance, Fabric Maps can convert GeoJSON files into high‑performance tilesets that enable faster rendering and smoother interaction. For background concepts, see [What is a tileset in Fabric Maps?](about-tile-sets.md).

> [!IMPORTANT]
> Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality may change.

## Prerequisites

- A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
- A [map](create-map.md) with editor permission. To create a tileset, you must have edit permissions on the map. Edit access is granted through Fabric workspace roles (Contributor, Member, or Admin) or item‑level permissions on the map. For more information, see [Manage Map permissions](manage-map-permissions.md).
- A [lakehouse](../../data-engineering/lakehouse-overview.md) to store GeoJSON files.

## Create a tileset

Select **New tileset** to open the creation wizard.

:::image type="content" source="media/spatial-job-create-tilesets/new-tile-set.png" lightbox="media/spatial-job-create-tilesets/new-tile-set.png" alt-text="A screenshot showing the new tileset button.":::

Alternatively, you can right-click on a GeoJSON file in lakehouse and then select **Create tileset** from the popup menu.

:::image type="content" source="media/spatial-job-create-tilesets/new-tile-set-option-lakehouse-files-dropdown.png" lightbox="media/spatial-job-create-tilesets/new-tile-set-option-lakehouse-files-dropdown.png" alt-text="A screenshot showing the new tileset option in the Lakehouse files dropdown menu.":::

> [!NOTE]
> Fabric Maps only supports one active job per item at a time.

### Step 1: Connect to a lakehouse and select source files

Start by connecting to at least one lakehouse that contains GeoJSON files. You can choose multiple files to convert into a vector tileset.

> [!NOTE]
>
> - Currently, Fabric Maps supports only valid [GeoJSON](https://datatracker.ietf.org/doc/html/rfc7946) files with the *.geojson* extension as source files.
> - The combined size of all selected files for a single conversion job must not exceed **1 GB**.

:::image type="content" source="media/spatial-job-create-tilesets/select-source-file.png" lightbox="media/spatial-job-create-tilesets/select-source-file.png" alt-text="A screenshot showing source files that can be selected.":::

:::image type="content" source="media/spatial-job-create-tilesets/selected-source-files.png" lightbox="media/spatial-job-create-tilesets/selected-source-files.png" alt-text="A screenshot showing the selected source files.":::

### Step 2: Configure tileset metadata

Specify the output location and name for your tileset. You can also add a description and copyright details if desired.

:::image type="content" source="media/spatial-job-create-tilesets/tile-set-options.png" lightbox="media/spatial-job-create-tilesets/tile-set-options.png" alt-text="A screenshot showing the tileset options screen.":::

> [!NOTE]
> The output tileset is generated in the [PMTiles](https://docs.protomaps.com/pmtiles/) format, which packages all tiles into a single portable archive file.

### Step 3: Configure layer settings

Each file is processed as an individual layer within the tileset.

Next, set the following configuration options:

- **Layer name**: You can assign a custom name to each layer or use the default name, which matches the file name.
- **Zoom level range**: Define the minimum and maximum zoom levels for your spatial data visibility. For more information, see [Understanding zoom levels in tilesets](about-tile-sets.md#understanding-zoom-levels-in-tilesets).

  > [!NOTE]
  > Things to keep in mind with configuring zoom levels:
  >
  > - Using a wider zoom level range generates more tiles, which can increase processing time.
  > - The supported zoom levels range from 5 to 18.

- **Feature properties**: For GeoJSON datasets, you can choose whether to include all feature properties along with the geometries or only the geometries.

  > [!NOTE]
  > Including all feature properties increases the size of the tiles and extends processing time.

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

Select **Go to Monitor** to view more job history related to this map item.

:::image type="content" source="media/spatial-job-create-tilesets/recent-runs.png" lightbox="media/spatial-job-create-tilesets/recent-runs.png" alt-text="A screenshot showing the recent runs.":::

Select the **View details** icon to display more information about the selected job.

:::image type="content" source="media/spatial-job-create-tilesets/monitor.png" lightbox="media/spatial-job-create-tilesets/monitor.png" alt-text="A screenshot showing the monitor screen, which allows you to view and track the status of the activities all the workspaces you have permissions to see in Microsoft Fabric.":::

:::image type="content" source="media/spatial-job-create-tilesets/monitor-details.png" lightbox="media/spatial-job-create-tilesets/monitor-details.png" alt-text="A screenshot showing the monitor job screen.":::

> [!TIP]
>
> When you open the Monitor page from a notification panel, it automatically filters by the active map item at that moment. If you later start a new job with a different map item and revisit the Monitor page in the same browser tab, it only shows data for the new map item—not the previous one.

## Cancel tileset creation

To cancel the tileset creation, open the **Monitor** page and select the **Cancel** icon next to the corresponding job.

:::image type="content" source="media/spatial-job-create-tilesets/cancel-job.png" lightbox="media/spatial-job-create-tilesets/cancel-job.png" alt-text="A screenshot showing the details of the selected job being monitored.":::

> [!NOTE]
> Users can only cancel a job when the status is **In progress**.

## Next steps

> [!div class="nextstepaction"]
> [Add data to a map – PMTiles](create-map.md#add-data-to-the-map---pmtiles)
