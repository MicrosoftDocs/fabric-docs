---
title: Create a map
description: Learn how to create a map in Fabric Maps to visualize spatial data in Real-Time Intelligence.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.date: 03/20/2026
ms.search.form: Create a map
---

# Create a map

Fabric Maps lets you visualize spatial data—static or real time—directly in Microsoft Fabric. By creating a map, you can explore patterns and relationships across space and time that are difficult to see in traditional charts and tables.

## Prerequisites

* A [workspace](../../fundamentals/workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity). For more information on creating a workspace, see [Create a workspace](../../fundamentals/create-workspaces.md)
* Permission to create items in the workspace.

## Enable Maps in tenant settings

> [!IMPORTANT]
> Only the tenant admin is authorized to perform this step.

1. Go to the [admin portal](../../admin/admin-center.md).
1. Select the **Tenant settings** tab in the [admin portal](../../admin/tenant-settings-index.md) and search for *Map*. For more information, see [About tenant settings](../../admin/about-tenant-settings.md).
1. If your Fabric capacity is located outside the EU or US regions, you must enable the Azure Maps services tenant settings. Begin by searching for **Azure Maps services** in the tenant settings, then toggle the option **Data sent to Azure Maps can be processed outside your capacity's geography region, compliance boundary, or national cloud instance** to **Enabled**.
1. Select **Apply**

For more information, see [Azure Maps service tenant settings – Microsoft Fabric](../../admin/map-settings.md).

:::image type="content" source="media/create-map/tenant-setting-azure-maps-services-section-cross-region-processing.png" lightbox="media/create-map/tenant-setting-azure-maps-services-section-cross-region-processing.png" alt-text="Screenshot of tenant settings for Map showing the toggle button for the specified setting.":::

## New map

Maps exist within the context of a workspace, and every map is associated with the workspace it was created in.

To create a new map:

1. Select the desired workspace.
1. Select **+ New item**.
1. In the **New item** window, select **Map**.
  :::image type="content" source="media/create-map/new-item-button.png" lightbox="media/create-map/new-item-button.png" alt-text="Screenshot of the New item page with Map filtered.":::
1. On the **New Map** dialog, enter a name, confirm the workspace, and select **Create**.
  :::image type="content" source="media/create-map/create-map.png" alt-text="Screenshot of the New Map page with a name for the map and default workspace.":::
1. A new map is created in your workspace.
  :::image type="content" source="media/create-map/map-with-empty-state.png" alt-text="Screenshot of a newly created Map editor in Microsoft Fabric, showing an empty map canvas.":::

## Visualize spatial data

After creating a map, you can visualize spatial data by adding layers from supported data sources. Map currently supports connections to Lakehouses and Eventhouses. For more information on establishing these connections to create map layers in Fabric Maps, see [Fabric Maps layers](about-layers.md).

## Next steps

> [!div class="nextstepaction"]
> [Fabric Maps layers](about-layers.md)

> [!div class="nextstepaction"]
> [Customize a map](customize-map.md)

> [!div class="nextstepaction"]
> [Share a map](share-map.md)
