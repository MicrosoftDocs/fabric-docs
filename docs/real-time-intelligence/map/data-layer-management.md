---
title: Manage data layers in Fabric Maps
description: Learn how to manage data layers in Fabric Maps, including showing or hiding layers, renaming, duplicating, deleting, and zooming to fit.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 09/13/2026
ms.search.form: Data layer management
---

# Manage data layers in Fabric Maps

When a map contains multiple data layers, keeping them organized helps maintain clarity and usability. The **Data layers** pane provides tools to manage layers, including reordering, renaming, duplicating, and deleting layers. This article explains how to use these tools to keep your maps clean, maintainable, and easy to interpret.

## Show or hide data layers

* Select the visibility icon to show a data layer.
  :::image type="content" source="media/layers/data-layer-management/data-layer-show.png" lightbox="media/layers/data-layer-management/data-layer-show.png"  alt-text="Screenshot of showing the data layer.":::
* Select the visibility icon again to hide a data layer.
  :::image type="content" source="media/layers/data-layer-management/data-layer-hide.png" lightbox="media/layers/data-layer-management/data-layer-hide.png" alt-text="Screenshot of hiding the data layer.":::

## Reorder data layers

Drag a data layer to change its display order relative to other layers on the map.

The following screenshot demonstrates how to reorder data layers. To improve visual clarity in overlapping areas, move the Power Plant layer to the topmost position on the map. Placing point‑based layers above polygon layers makes overlapping features easier to see and interpret.

:::image type="content" source="media/layers/data-layer-management/data-layer-reorder.gif" lightbox="media/layers/data-layer-management/data-layer-reorder.gif" alt-text="Screenshot of reordering the data layer.":::

## Rename data layers

By default, a data layer uses the name of the entity it was created from. You can change the name when you create the layer, and you can also change it later. The following steps show how to change the name of an existing data layer.

1. Select the data layer to rename, and then select **Rename** in the popup menu.
  :::image type="content" source="media/layers/data-layer-management/data-layer-rename.png" lightbox="media/layers/data-layer-management/data-layer-rename.png" alt-text="Screenshot of rename action of data layer.":::
1. Enter the new name, and then select **Rename**.
  :::image type="content" source="media/layers/data-layer-management/data-layer-renaming.png" lightbox="media/layers/data-layer-management/data-layer-renaming.png" alt-text="Screenshot of renaming data layer.":::

## Duplicate data layers

You can create a new data layer by duplicating an existing one. After duplication, customize the layer's name and settings to highlight specific data dimensions or attributes.

When you duplicate an external feature service layer, both layers reference the same data source, connection, source query, and output fields. Map-layer filters and visual settings are independent for each layer. You can't edit the source query or output fields after you add the layer in this release.

> [!NOTE]
> When you enable **Clustering** on a duplicated layer, clustering applies to both layers because they reference the same dataset.

1. Choose the data layer you want to duplicate, and then select **Duplicate** in the popup menu.
  :::image type="content" source="media/layers/data-layer-management/data-layer-before-duplicated.png" lightbox="media/layers/data-layer-management/data-layer-before-duplicated.png" alt-text="Screenshot before duplicating the data layer.":::
1. A new data layer is created with the same settings as the original, except the name includes "(copy)" to indicate duplication.
  :::image type="content" source="media/layers/data-layer-management/data-layer-duplicated.png" lightbox="media/layers/data-layer-management/data-layer-duplicated.png" alt-text="Screenshot of the duplicated data layer.":::

## Refresh external feature services

Map editors can refresh an individual external feature service connection or the entire map:

* In **External sources**, open the connection context menu and select **Refresh** to retrieve the latest service metadata, including newly added fields, layers, or collections. To use a newly added field, add the source layer again and select the field.
* Select **Refresh** for the map item to query the saved layers for current data. This action doesn't change the saved source query.

Saved output fields, styling, legends, visibility, and layer order persist after either refresh action. Changes to the map configuration persist only after you save the map. Viewers can't refresh external feature service data in this release.

<!-- Add screenshots of the connection-level and map-level Refresh actions. -->

## Zoom to fit

Zoom to fit centers the map view on the selected data layer and adjusts it to display the full extent of that layer, making it easier to locate and explore spatial data.

1. Choose the data layer you want to view, and then select **Zoom to fit** in the popup menu.
  :::image type="content" source="media/layers/data-layer-management/data-layer-zoom-fit.png" lightbox="media/layers/data-layer-management/data-layer-zoom-fit.png" alt-text="Screenshot of zoom to fit action of data layer.":::
1. The map view centers on the selected data layer and adjusts to display its full spatial extent.
  :::image type="content" source="media/layers/data-layer-management/data-layer-after-zoom-fit.png" lightbox="media/layers/data-layer-management/data-layer-after-zoom-fit.png" alt-text="Screenshot of after selecting zoom to fit action of data layer.":::

> [!NOTE]
> **Zoom to fit** is unavailable for PMTiles layers when bounds metadata is missing.

## Delete data layers

Delete a data layer to permanently remove it from the map. The following steps show how to delete an existing data layer.

1. Choose the data layer you want to remove from the map, and then select **Delete** in the popup menu.
  :::image type="content" source="media/layers/data-layer-management/data-layer-delete.png" lightbox="media/layers/data-layer-management/data-layer-delete.png" alt-text="Screenshot of delete data layer.":::

1. The layer is removed from both the map and the **Data layers** list.

## Next steps

> [!div class="nextstepaction"]
> [Data filtering in Fabric Maps](about-data-filtering.md)

> [!div class="nextstepaction"]
> [Customize a map](customize-map.md)
