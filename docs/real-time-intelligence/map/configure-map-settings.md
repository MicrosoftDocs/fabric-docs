---
title: Configure map settings in Fabric Maps
description: Learn how to configure map-wide appearance and behavior settings in Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 09/22/2026
ms.search.form: Configure map settings
---

# Configure map settings in Fabric Maps

Map settings control the overall appearance and behavior of a Fabric map. You can choose a basemap style, configure the initial map view, show or hide map elements such as labels and boundaries, enable interactive controls, and select the display language for map labels. These settings apply to the entire map and affect all layers.

For settings that control how an individual layer is rendered, see [Configure layer settings in Fabric Maps](customize-map.md).

## Prerequisites

- A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
- A [map](create-map.md) that you have permission to edit.

## Open map settings

Open the map in edit mode, and then select **Map settings** on the ribbon.

:::image type="content" source="media/customize-map/ribbon-map-setting.png" lightbox="media/customize-map/ribbon-map-setting.png" alt-text="Screenshot of the Map settings command on the Fabric Maps ribbon.":::

The **Basemap settings** pane contains five categories:

- Style
- Initial map view
- Map elements
- Controls
- Localization

## Style

The map style determines the appearance of the basemap and provides geographic context for the data displayed on the map. Choose from built-in styles such as road, satellite, grayscale, and high-contrast themes to match your visualization needs and improve readability.

:::image type="content" source="media/customize-map/base-map-style.png" lightbox="media/customize-map/base-map-style.png" alt-text="Screenshot of the Style section in the Basemap settings pane.":::

| Property | Description |
| -------- | ----------- |
| Map style | Sets the visual style of the basemap. Valid values: [Road, Satellite, Hybrid, Grayscale (Light), Grayscale (Dark), Night, High Contrast (Light), High Contrast (Dark), Blank, Blank (Accessible)](/azure/azure-maps/supported-map-styles). Default = *Grayscale (Light)*. |
| Background color | Sets the basemap background color. Available when **Map style** is set to **Blank** or **Blank (Accessible)**. |

## Initial map view

The initial map view defines the default location and perspective shown when the map first loads. Configure the starting center point, zoom level, pitch, and rotation to focus viewers on the most relevant geographic area.

:::image type="content" source="media/customize-map/base-map-initial-map-view.png" lightbox="media/customize-map/base-map-initial-map-view.png" alt-text="Screenshot of the Initial map view section in the Basemap settings pane showing latitude, longitude, zoom level, pitch, and compass settings.":::

| Property | Description |
| -------- | ----------- |
| Latitude | Sets the center latitude of the initial map view. Valid values: -90 to 90. |
| Longitude | Sets the center longitude of the initial map view. Valid values: -180 to 180. |
| Zoom level | Sets the initial zoom level of the map view. Valid values: 1 to 22. Default = *1*. |
| Pitch | Sets the viewing angle of the map relative to the horizon. Valid values: 0 to 60 degrees. Default = *0*. |
| Compass | Sets the initial map rotation. Valid values: -180 to 180 degrees. Default = *0*. |

## Map elements

Map elements provide extra geographic context by displaying labels, boundaries, roads, and building footprints. Show or hide individual elements to reduce visual clutter or emphasize specific data layers.

:::image type="content" source="media/customize-map/base-map-elements.png" lightbox="media/customize-map/base-map-elements.png" alt-text="Screenshot of the Map elements section in the Basemap settings pane showing settings for labels, borders, roads, and building footprints.":::

| Property | Description |
| -------- | ----------- |
| Labels | Toggles the visibility of map labels such as road names, city names, and country or region names. Default = *on*. |
| Country/Region border | Toggles the visibility of country or region borders. Default = *on*. |
| Administrative district border | Toggles the visibility of borders for first-level administrative areas, such as states or provinces. Default = *on*. |
| Admin district 2 border | Toggles the visibility of borders for second-level administrative areas, such as counties. Default = *on*. |
| Road details | Toggles the visibility of detailed street layouts in populated areas. Default = *on*. |
| Building footprints | Toggles the visibility of building footprints at higher zoom levels. Default = *on*. |

## Controls

Map controls provide interactive tools that help users navigate and explore the map. Enable controls such as zoom, pitch, compass, and scale to allow viewers to adjust the map view.

:::image type="content" source="media/customize-map/base-map-controls.png" lightbox="media/customize-map/base-map-controls.png" alt-text="Screenshot of the Controls section in the Basemap settings pane showing zoom, pitch, compass, scale, traffic, and world wrap controls.":::

| Property | Description |
| -------- | ----------- |
| Zoom control | Shows or hides the zoom control. Default = *on*. |
| Pitch control | Shows or hides the pitch control. Default = *on*. |
| Compass control | Shows or hides the compass control. Default = *on*. |
| Scale control | Shows or hides the scale bar. Valid values: Metric units only. Default = *on*. |
| Traffic control | Shows or hides the traffic toggle for real-time traffic flow. Default = *on*. |
| World wrap | Enables or disables seamless horizontal panning across the globe. Default = *on*. |

The following image shows a map with the traffic toggle turned off.

:::image type="content" source="media/customize-map/traffic-off.png" lightbox="media/customize-map/traffic-off.png" alt-text="Screenshot of a Fabric map with the traffic toggle turned off.":::

The following image shows a map with the traffic toggle turned on.

:::image type="content" source="media/customize-map/traffic-on.png" lightbox="media/customize-map/traffic-on.png" alt-text="Screenshot of a Fabric map displaying real-time traffic flow.":::

## Localization

Localization settings control how geographic information is presented. Configure the language used for map labels and the map view that determines how country or region and disputed boundary information appears.

:::image type="content" source="media/customize-map/base-map-localization.png" lightbox="media/customize-map/base-map-localization.png" alt-text="Screenshot of the Localization section in the Basemap settings pane showing the display language and map view settings.":::

| Property | Description |
| -------- | ----------- |
| Display language | Sets the language used for map labels. The default uses the language configured for the Fabric user. For more information, see [Localization support in Azure Maps](/azure/azure-maps/supported-languages?pivots=service-previous). |
| Map view | Sets which geopolitically disputed map content, including borders and labels, is displayed. Default = *Auto*. For more information, see [Azure Maps supported views](/azure/azure-maps/supported-languages?pivots=service-latest#azure-maps-supported-views). |

## Related content

- [Configure layer settings in Fabric Maps](customize-map.md)
- [Create a map](create-map.md)
- [Fabric Maps layers](about-layers.md)
