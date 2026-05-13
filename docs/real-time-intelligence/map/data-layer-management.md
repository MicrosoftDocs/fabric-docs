---
title: Manage data layers in Fabric Maps
description: Learn how to manage data layers in Fabric Maps, including showing or hiding layers, renaming, duplicating, deleting, and zooming to fit.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/13/2026
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

By default, a data layer uses the name of the entity it was created from. You can change the name at the time of creation, and can also change it at any point after. The following steps show how to change the name of an existing data layer.

1. Select the data layer to rename, then select **Rename** in the popup menu.
  :::image type="content" source="media/layers/data-layer-management/data-layer-rename.png" lightbox="media/layers/data-layer-management/data-layer-rename.png" alt-text="Screenshot of rename action of data layer.":::
1. Enter the new name, then select **Rename**.
  :::image type="content" source="media/layers/data-layer-management/data-layer-renaming.png" lightbox="media/layers/data-layer-management/data-layer-renaming.png" alt-text="Screenshot of renaming data layer.":::

## Duplicate data layers

A new data layer can be created by duplicating an existing one. After duplication, customize the layer's name and settings to highlight specific data dimensions or attributes.

> [!NOTE]
> Enabling **Clustering** on a duplicated layer applies clustering to both layers because they reference the same dataset.

1. Choose the data layer you want to duplicate, then select **Duplicate** in the popup menu.
  :::image type="content" source="media/layers/data-layer-management/data-layer-before-duplicated.png" lightbox="media/layers/data-layer-management/data-layer-before-duplicated.png" alt-text="Screenshot before duplicating the data layer.":::
1. A new data layer is created with the same settings as the original, except the name includes "(copy)" to indicate duplication.
  :::image type="content" source="media/layers/data-layer-management/data-layer-duplicated.png" lightbox="media/layers/data-layer-management/data-layer-duplicated.png" alt-text="Screenshot of the duplicated data layer.":::

## Zoom to fit

Zoom to fit centers the map view on the selected data layer and adjusts it to display the full extent of that layer, making it easier to locate and explore spatial data.

1. Choose the data layer you want to view, then select **Zoom to fit** in the popup menu.
  :::image type="content" source="media/layers/data-layer-management/data-layer-zoom-fit.png" lightbox="media/layers/data-layer-management/data-layer-zoom-fit.png" alt-text="Screenshot of zoom to fit action of data layer.":::
1. The map view centers on the selected data layer and adjusts to display its full spatial extent.
  :::image type="content" source="media/layers/data-layer-management/data-layer-after-zoom-fit.png" lightbox="media/layers/data-layer-management/data-layer-after-zoom-fit.png" alt-text="Screenshot of after selecting zoom to fit action of data layer.":::

> [!NOTE]
> **Zoom to fit** is unavailable for PMTiles layers when bounds metadata is missing.

## Delete data layers

Delete a data layer to permanently remove it from the map. The following steps show how to delete an existing data layer.

1. Choose the data layer you want to remove from the map, then select **Delete** in the popup menu.
  :::image type="content" source="media/layers/data-layer-management/data-layer-delete.png" lightbox="media/layers/data-layer-management/data-layer-delete.png" alt-text="Screenshot of delete data layer.":::

1. The layer is removed from both the map and the **Data layers** list.
  :::image type="content" source="media/layers/data-layer-management/data-layer-after-delete.png" lightbox="media/layers/data-layer-management/data-layer-after-delete.png" alt-text="Screenshot showing results after deleting the data layer.":::

## Next steps

> [!div class="nextstepaction"]
> [Data filtering in Fabric Maps](about-data-filtering.md)

> [!div class="nextstepaction"]
> [Customize a map](customize-map.md)
