---
title: Save a Fabric map to a Real-Time Dashboard
description: Learn how to save a Fabric map to a new or existing Real-Time Dashboard.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 09/28/2026
ms.search.form: Fabric Maps, Real-Time Dashboard, save map to dashboard, Fabric Maps tile
---

# Save a Fabric map to a Real-Time Dashboard

Save an existing Fabric map to a new or existing Real-Time Dashboard to display spatial context alongside real-time metrics. The dashboard adds a Fabric Maps tile that references the source map item and renders its saved data sources, queries, layers, and styling.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

The dashboard doesn't copy the map configuration. Continue to manage the data sources, queries, layers, filters, and styling in the source map item. To display saved map configuration changes in an open dashboard, reload the dashboard page.

> [!NOTE]
> Real-Time Dashboard parameters don't filter or otherwise modify a Fabric Maps tile.

For information about other ways to share and reuse a map, see [Sharing Microsoft Fabric Maps](sharing-maps.md).

## Prerequisites

Before you begin, ensure you have:

- An existing Fabric map.
- Permission to edit the source map item.
- Edit permission for the target workspace and dashboard when saving to an existing dashboard.
- Permission to create items in the target workspace when creating a dashboard.

The destination dashboard can be in a different workspace from the source map.

## Save a map to a dashboard

1. Open the Fabric map.
1. Select **Save to dashboard**.
1. Choose whether to save the map to a new or existing Real-Time Dashboard.

<!-- Confirm the final location of Save to dashboard in the Fabric Maps toolbar and the exact labels for the new-dashboard and existing-dashboard choices. -->

### Save to a new Real-Time Dashboard

1. Select the option to create a new Real-Time Dashboard.
1. Enter a dashboard name and select the destination workspace.
1. Select **Create**.
1. To view the result, select **Open dashboard**.
1. In the Real-Time Dashboard, move the tile to the desired page, rename it, and adjust its size as needed.

<!-- Confirm the final labels and order of fields in the new-dashboard dialog. -->

### Save to an existing Real-Time Dashboard

1. Select the option to use an existing Real-Time Dashboard.
1. Select the destination workspace and dashboard.
1. Select the action that adds the map to the dashboard.
1. To view the result, select **Open dashboard**.
1. In the Real-Time Dashboard, move the tile to the desired page, rename it, and adjust its size as needed.

<!-- Replace "the action that adds the map" with the final button label. -->

You can save the same map to multiple dashboards. If the destination dashboard already contains the map, saving it again creates another Fabric Maps tile.

## Work with the Fabric Maps tile

The Fabric Maps tile renders the source map in view-only mode. Dashboard viewers can:

- Zoom the map.
- Pan the map.
- Hover over supported features.
- View basic tooltips.
- Temporarily add, modify, or remove unlocked map-layer filters.

The tile also supports the standard Real-Time Dashboard resize and maximize capabilities.

<!-- Engineering confirmation needed: identify the exact standard RTD tile actions supported by Fabric Maps tiles. The PM response was tentative for rename, duplicate, Share visual, export, resize, and maximize. Only resize and maximize are included here because they were part of the original MVP scope. -->

Dashboard authors and viewers can interact with map-layer filters as they can in Fabric Maps view mode. They can add, modify, or remove unlocked filters, but they can't remove locked filters. Filter changes made in the dashboard are temporary and aren't saved to the source map item. Open the source map item to permanently change its queries, data sources, layers, filters, or styling.

## Refresh and source map updates

The tile uses the source map's layer refresh behavior and participates in Real-Time Dashboard refresh cycles. However, an open dashboard doesn't automatically detect saved map configuration changes. Reload the dashboard page to display changes to the source map's queries, layers, filters, or styling.

## Permissions

Saving a map to a dashboard doesn't grant access to either item or to the map's underlying data. A dashboard viewer needs:

- Access to the Real-Time Dashboard.
- Access to the source map item.
- Access to every underlying data source required by the map.

The dashboard viewer's identity and permissions authorize access to the map and its underlying data sources. The dashboard editor's identity doesn't provide access to the referenced map data.

If a viewer can open the dashboard but can't access the map or one of its data sources, the Fabric Maps tile displays an error state.

## Lifecycle behavior

The dashboard references the source map by item ID:

- If you rename or move the map, the tile continues to reference it.
- If you delete the map or the viewer loses access, the tile displays an error state.
- Multiple dashboard tiles and multiple dashboards can reference the same map.

<!-- Follow up: confirm behavior when a dashboard is copied, moved, exported and imported, deployed through a pipeline, or synchronized through Git without the referenced map. -->

## Supported map content

The Fabric Maps tile supports the same data sources and layer types as the source map unless a limitation is explicitly documented.

<!-- Follow up: identify any source, layer, authentication, network, or rendering exceptions before publication. -->

## Limitations and considerations

- The Fabric Maps tile is view-only.
- Filter changes you make in the dashboard are temporary and don't save to the source map item.
- You can't edit the map's queries, data sources, layers, or styling from the dashboard.
- The Fabric Maps tile doesn't use Real-Time Dashboard parameters. As a result, cross-filters and drillthroughs, which pass values through dashboard parameters, don't filter or modify the map.
- Tile interactions in this release are limited to zoom, pan, hover, basic tooltips, and temporary map-layer filtering.
- You must have access to the dashboard, map item, and all required map data sources.
- A deleted or inaccessible source map causes the tile to display an error state.

## Next steps

> [!div class="nextstepaction"]
> [Create a Real-Time Dashboard](../dashboard-real-time-create.md)

For access requirements, see [Permissions in Fabric Maps](about-map-permissions.md).

<!-- End of article. -->