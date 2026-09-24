---
title: Customize a map
description: Learn how to customize a map in Microsoft Fabric Real-Time Intelligence.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.date: 09/15/2025
ms.search.form: Customize the map
---

# Customize a map

Microsoft Fabric Maps provides two levels of customization. **Base map settings** control the overall appearance and behavior of the map, including the basemap style, map elements, interactive controls, initial view, and localization. These settings apply to the entire map and affect all layers. **Layer settings** control how individual datasets are rendered, including colors, labels, symbols, clustering, and data-driven styling. Changes to layer settings affect only the selected layer, making it possible to customize each dataset independently.

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)
* A [map](create-map.md) with editing permissions and connected data sources, either geoJson files in lakehouse, or KQL databases.

## Configure basemap settings

Map settings control the overall appearance and behavior of the map. You can choose a basemap style, configure the initial map view, show or hide map elements such as labels and boundaries, enable interactive controls, and select the display language for map labels.

Changes made to map settings apply to the entire map and affect all layers displayed on it.

:::image type="content" source="media/customize-map/ribbon-map-setting.png" lightbox="media/customize-map/ribbon-map-setting.png" alt-text="Screenshot of ribbon map settings.":::

There are five different categories of basemap settings:

* Style
* Initial map view
* Map elements
* Controls
* Localization

### Style

The map style determines the appearance of the basemap and provides geographic context for the data displayed on the map. Choose from a range of built-in styles, such as road, satellite, grayscale, and high-contrast themes, to match your visualization needs and improve readability for your audience.

:::image type="content" source="media/customize-map/base-map-style.png" lightbox="media/customize-map/base-map-style.png" alt-text="A screenshot showing the Basemap configuration panel's list of initial map view settings available for the basemap.":::

| Property | Description |
| -------- | ----------- |
| Map style | Sets the visual style of the basemap. Valid values: [Road, Satellite, Hybrid, Grayscale (Light), Grayscale (Dark), Night, High Contrast (Light), High Contrast (Dark), Blank, Blank (Accessible)](/azure/azure-maps/supported-map-styles). Default = *Grayscale (Light)*. |
| Background color | Sets the basemap background color. Available when **Map style** is set to **Blank** or **Blank (Accessible)**. |

### Initial map view

The initial map view defines the default location and perspective shown when the map first loads. Configure the starting center point, zoom level, pitch, and rotation to focus viewers on the most relevant geographic area and present the map from the desired viewpoint.

:::image type="content" source="media/customize-map/base-map-initial-map-view.png" lightbox="media/customize-map/base-map-initial-map-view.png" alt-text="A screenshot showing the basemap configuration panel's initial map view settings which includes latitude and longitude, zoom level, pitch, and compass.":::

| Property | Description |
| -------- | ----------- |
| Latitude | Sets the center latitude of the initial map view. Valid values: -90 to 90. |
| Longitude | Sets the center longitude of the initial map view. Valid values: -180 to 180. |
| Zoom level | Sets the initial zoom level of the map view. Valid values: 1 to 22. Default = *1*. |
| Pitch | Sets the viewing angle of the map relative to the horizon. Valid values: 0 to 60 degrees. Default = *0*. |
| Compass | Sets the initial map rotation. Valid values: -180 to 180 degrees. Default = *0*. |

### Map elements

Map elements provide extra geographic context by displaying labels, boundaries, roads, and building footprints. You can show or hide individual elements to reduce visual clutter, emphasize specific data layers, or create a map that is tailored to your audience and scenario.

:::image type="content" source="media/customize-map/base-map-elements.png" lightbox="media/customize-map/base-map-elements.png" alt-text="A screenshot showing the basemap configuration panel's map elements with toggle options for Labels, Country Region border, Administrative district border, Admin district 2 border, Road details, and Building footprints, each showing on or off status.":::

| Property | Description |
| ---------| ----------- |
| Labels | Toggle the visibility of map labels such as road names, city names, and country/region names. Default = *on* |
| Country/Region border | Toggle the visibility of country/region borders on the map. Default = *on* |
| Administrative district border | Toggle visibility of borders for first-level administrative areas, such as states or provinces. Default = *on* |
| Admin district 2 border | Toggle visibility of borders for second-level administrative areas, such as counties. Default = *on* |
| Road details | Toggle visibility of detailed street layouts in populated areas. Default = *on* |
| Building footprints | Toggle visibility of building footprints at higher zoom levels. Default = *on* |

### Controls

Map controls add interactive tools that help users navigate and explore the map. Enable controls such as zoom, pitch, compass, and scale to allow viewers to adjust the map view and better understand the data being displayed.

:::image type="content" source="media/customize-map/base-map-controls.png" lightbox="media/customize-map/base-map-controls.png" alt-text="A screenshot of the Map controls section in the basemap configuration panel, showing toggle settings for Zoom control, Pitch control, Compass control, Scale control, Traffic control, and World wrap, along with the current enabled or disabled state of each map control.":::

| Property | Description |
| -------- | ----------- |
| Zoom control | Shows or hides the zoom control so users can adjust zoom interactively. Default = *on*. |
| Pitch control | Shows or hides the pitch control so users can adjust viewing angle interactively. Default = *on*. |
| Compass control | Shows or hides the compass control so users can adjust map rotation interactively. Default = *on*. |
| Scale control | Shows or hides the scale bar. Valid values: Metric units only. Default = *on*. |
| Traffic control | Shows or hides the traffic toggle button for real-time traffic flow. Default = *on*. |
| World wrap | Enables or disables seamless horizontal panning across the globe. Default = *on*. |

The following image shows a map with the Traffic toggle set to off.

:::image type="content" source="media/customize-map/traffic-off.png" lightbox="media/customize-map/traffic-off.png" alt-text="A screenshot of a Fabric Maps map with the traffic control set to off.":::

The following image shows a map with the Traffic toggle set to on.

:::image type="content" source="media/customize-map/traffic-on.png" lightbox="media/customize-map/traffic-on.png" alt-text="A screenshot of a Fabric Maps map with the traffic control displayed.":::

### Localization

Localization settings control how geographic information is presented to users. Configure the display language used for map labels and select the map view that determines how country/region and disputed boundary information appears on the map. These settings help ensure the map aligns with the language and regional conventions expected by your audience.

:::image type="content" source="media/customize-map/base-map-localization.png" lightbox="media/customize-map/base-map-localization.png" alt-text="A screenshot of the Localization section in the basemap configuration panel, showing the Language setting configured to follow the Fabric user language preference and the Map view setting set to Auto, allowing customization of map language and geopolitical boundary display.":::

| Property | Description |
| -------- | ----------- |
| Display language | Sets the language used for map labels. The list includes the countries or regions supported by Fabric Maps. Default = *Default*, which means map labels use the language configured for the Fabric user. For more information, see [Localization support in Azure Maps](/azure/azure-maps/supported-languages?pivots=service-previous). |
| Map view | Sets which geopolitically disputed map content (including borders and labels) is displayed. Default = *Auto*. For more information, see [Azure Maps supported views](/azure/azure-maps/supported-languages?pivots=service-latest#azure-maps-supported-views). |

## Configure layer settings

Layer settings control how the selected data layer is rendered. The available settings depend on the layer's geometry type and, for point geometry, the selected point layer type. Changes to layer settings affect only the selected layer and don't modify the basemap settings.

Fabric Maps automatically determines the geometry type from the data source. The supported geometry types are **point**, **line**, and **polygon**. Point layers can use one of three layer types: **bubble**, **marker**, or **heatmap**.

There are three groups of layer settings:

* [Geometry type settings](#geometry-type-settings): Control the appearance and behavior of the selected point, line, or polygon layer.
* [Data label settings](#data-label-settings): Control the text displayed for features in the selected layer.
* [Visibility settings](#visibility-settings): Control when features appear and which properties are available in tooltips.

> [!NOTE]
> GeoJSON multigeometries, such as `MultiPoint`, `MultiLineString`, and `MultiPolygon`, use the settings for their corresponding geometry family: point, line, or polygon.

### Geometry type settings

Geometry type settings are specific to the geometry type automatically selected from the input data. The settings available in the **Layer settings** pane vary by geometry type.

#### Polygon settings

Polygon layers display areas such as boundaries, zones, or service areas. You can change the fill appearance and optionally apply data-driven colors or 3D extrusion.

:::image type="content" source="media/customize-map/polygon-visual-basic.png" lightbox="media/customize-map/polygon-visual-basic.png" alt-text="A screenshot of Fabric Maps displaying California historic fire perimeters as red polygons with metadata on year, cause, and acreage for each fire event.":::

| Setting | Description |
| ------- | ----------- |
| Fill color | Sets the fill color for polygon features. When **Enable data-driven styling** is off, select one color for all polygon features. When data-driven styling is enabled and a valid data field is selected in **Color by**, select a color palette or customize colors for the selected values. |
| Fill opacity | Sets the opacity of polygon features. Valid values: 0% (fully transparent) to 100% (fully opaque). |
| Enable data-driven styling | Enables color-based polygon styling using data values. Choose **Category** to assign colors to distinct values or **Value range** to apply colors across a numeric scale instead of using a single fill color. Default = *off*. For more information, see [Data-driven styling for map layers](#data-driven-styling-for-map-layers). |
| Color by | Sets the data property whose values determine polygon color. Available when **Enable data-driven styling** is on. |
| Style by | Specifies how values in the **Color by** field are mapped to colors. Choose **Category** to assign a distinct color to each unique value, or **Value range** to map numeric values using a continuous color gradient. Available when a valid field is selected in **Color by**. |
| Choose a method | Specifies how numeric values are mapped to colors when **Style by** is set to **Value range**. Valid values: **Gradient**, which maps values across a continuous color range; and **Steps**, which groups values into discrete ranges with separate colors. Available when **Style by** is set to **Value range**. |
| Enable extrusion | Enables 3D polygon extrusion using a height source. Default = *off*. When enabled, **Height** and **Use original height** appear. For more information, see [Enable extrusion](#enable-extrusion). |
| Height | Sets the numeric data property used for extrusion height. Available when **Enable extrusion** is on. |
| Use original height | Uses the original height value from the data source for extrusion instead of a selected property. Available when **Enable extrusion** is on. |

> [!NOTE]
> The **Fill color** setting appears first when data-driven styling is off. When data-driven styling is enabled, it appears after the data-driven styling settings and provides color palette or color-swatch options.

##### Enable extrusion

The following screenshot shows polygon features rendered with 3D extrusion. The extrusion height is based on the configured height source.

:::image type="content" source="media/customize-map/polygon-visual-enable-extrusion.png" lightbox="media/customize-map/polygon-visual-enable-extrusion.png" alt-text="A screenshot of a 3D Fabric Map of Seattle area showing building extrusions with varied heights based on elevation data, creating a realistic urban landscape.":::

#### Line settings

Line layers display linear features such as roads, paths, routes, and boundaries.

:::image type="content" source="media/customize-map/line-visual-basic.png" lightbox="media/customize-map/line-visual-basic.png" alt-text="A screenshot of Fabric Maps displaying National Forest trails near Mount Rainier rendered as line features with color and stroke width styling.":::

| Setting | Description |
| ------- | ----------- |
| Stroke opacity | Sets the opacity of line features. Valid values: 1% to 100%. |
| Stroke width | Sets the width of line features in pixels. |
| Enable data-driven styling | Enables color-based line styling using data values. Choose **Category** to assign distinct colors to values or **Value range** to apply colors across a numeric scale instead of using a single line color. Default = *off*. For more information, see [Data-driven styling for map layers](#data-driven-styling-for-map-layers). |
| Color by | Sets the data property whose values determine line color. Available when **Enable data-driven styling** is on. |
| Style by | Specifies how the numeric field selected in **Color by** is mapped to colors. Choose **Category** to assign distinct colors to values or **Value range** to map values across a continuous color range. Available when a numeric field is selected in **Color by**. |
| Choose a method | Specifies how numeric values are mapped to colors when **Style by** is set to **Value range**. Valid values: **Gradient**, which maps values across a continuous color range; and **Steps**, which groups values into discrete ranges with separate colors. Available when **Style by** is set to **Value range**. |
| Fill color | Sets the line color. When **Enable data-driven styling** is off, select one color for all line features. When data-driven styling is enabled and a valid data field is selected in **Color by**, select a color palette or customize colors for the selected values. |

> [!NOTE]
> When categorical styling is enabled, up to 100 distinct values are assigned unique colors. Additional values are grouped as **Others** and displayed in gray.

#### Point settings

Point layers display individual locations or events. Select a point **Layer type** to choose how the point data is rendered:

* **Bubble** displays points as circles.
* **Marker** displays points as built-in icons or custom images.
* **Heatmap** displays point density using a color gradient.

##### Bubble layer

Bubble layers display points as circles. Use size, color, opacity, and clustering to show differences between locations or to reduce visual clutter.

:::image type="content" source="media/customize-map/bubble-visual.png" lightbox="media/customize-map/bubble-visual.png" alt-text="A screenshot of Fabric Maps showing EV charging station locations across Washington state represented as bubbles.":::

| Setting | Description |
| ------- | ----------- |
| Fill color | Sets the fill color of bubble features. When **Enable data-driven styling** is off, select one color for all bubble features. When data-driven styling is enabled and a valid data field is selected in **Color by**, select a color palette or customize colors for the selected values. |
| Stroke color | Sets the border color of bubble features. |
| Stroke width | Sets the border width in pixels. |
| Opacity | Sets the opacity of bubble features. Valid values: 0% (fully transparent) to 100% (fully opaque). |
| Size | Sets how bubble size is determined: **Fixed size** or **By data**. |
| Fixed size | Sets one fixed bubble size for all points. Available when **Size** is set to **Fixed size**. |
| By data | Scales bubble size using a numeric data property. Available when **Size** is set to **By data**. |
| Enable data-driven styling | Enables bubble color styling by selected data values using either **Category** or **Value range** styling modes instead of one fixed bubble color. Default = *off*. For more information, see [Data-driven styling for map layers](#data-driven-styling-for-map-layers). |
| Color by | Sets the data property whose values determine bubble color. Available when **Enable data-driven styling** is on. |
| Style by | Specifies how values in the **Color by** field are mapped to colors. Choose **Category** to assign a distinct color to each unique value, or **Value range** to map numeric values using a continuous color gradient. Available when a valid field is selected in **Color by**. |
| Choose a method | Specifies how numeric values are mapped to colors when **Style by** is set to **Value range**. Valid values: **Gradient**, which maps values across a continuous color range; and **Steps**, which groups values into discrete ranges with separate colors. Available when **Style by** is set to **Value range**. |
| Enable clustering | Groups nearby points into clusters to reduce visual clutter. Default = *off*. When enabled, **Cluster size** and **Aggregate by** appear. |
| Cluster size | Sets the size of clustered points. Available when **Enable clustering** is on. |
| Aggregate by | Sets the numeric data property used to summarize points in each cluster. Available when **Enable clustering** is on. |

###### Bubble clustering

The following screenshots show bubble points grouped into clusters. Zooming in reveals more granular clusters and individual points.

:::image type="content" source="media/customize-map/bubble-visual-clustering.png" lightbox="media/customize-map/bubble-visual-clustering.png" alt-text="A screenshot of Fabric Maps showing New York City alternate fuel locations with clustering enabled.":::

:::image type="content" source="media/customize-map/bubble-visual-clustering-zoom-in.png" lightbox="media/customize-map/bubble-visual-clustering-zoom-in.png" alt-text="A screenshot of Fabric Maps showing a zoomed-in view of the New York City alt fuel locations, showing more granular clustering patterns at higher zoom level.":::

##### Marker layer

Marker layers display points as icons. You can use a built-in Fluent icon or a custom image stored in a Lakehouse.

:::image type="content" source="media/customize-map/custom-markers.png" lightbox="media/customize-map/custom-markers.png" alt-text="A screenshot of Fabric Maps showing public school locations in a suburban area with custom purple school building markers and labels. Settings panel on the right displays marker customization options including symbol, stroke color, size, rotation, opacity, and marker anchor.":::

| Setting | Description |
| ------- | ----------- |
| Symbol | Sets the icon used to represent each point. |
| Fill color | Sets the fill color of supported built-in symbols. When **Enable data-driven styling** is off, select one color for all supported symbols. When data-driven styling is enabled and a valid data field is selected in **Color by**, select a color palette or customize colors for the selected values. This setting might not apply to custom images. |
| Stroke color | Sets the border color of the marker. |
| Stroke width | Sets the border width in pixels. |
| Enable data-driven styling | Enables marker color styling by selected data values using either **Category** or **Value range** styling modes instead of one fixed marker color. Default = *off*. Custom images might not support data-driven color styling. For more information, see [Data-driven styling for map layers](#data-driven-styling-for-map-layers). |
| Color by | Sets the data property whose values determine marker color. Available when **Enable data-driven styling** is on. |
| Style by | Specifies how values in the **Color by** field are mapped to colors. Choose **Category** to assign a distinct color to each unique value, or **Value range** to map numeric values using a continuous color gradient. Available when a valid field is selected in **Color by**. |
| Choose a method | Specifies how numeric values are mapped to colors when **Style by** is set to **Value range**. Valid values: **Gradient**, which maps values across a continuous color range; and **Steps**, which groups values into discrete ranges with separate colors. Available when **Style by** is set to **Value range**. |
| Size | Sets the marker size. |
| Rotation | Sets how marker rotation is determined: **Fixed rotation** or **By data**. |
| Fixed rotation | Sets one fixed marker rotation value. Available when **Rotation** is set to **Fixed rotation**. |
| By data | Sets marker rotation from a selected data property. Available when **Rotation** is set to **By data**. |
| Opacity | Sets the opacity of marker features. Valid values: 0% (fully transparent) to 100% (fully opaque). |
| Marker overlap | Enables or disables overlap between markers and other map elements. |
| Marker anchor | Sets which point on the icon is anchored to the feature's geographic position. |
| Rotation alignment to map | Sets whether the marker rotates with map orientation. |
| Pitch alignment to map | Sets whether the marker follows map pitch. |
| Enable clustering | Groups nearby points into clusters to reduce visual clutter. Default = *off*. When enabled, **Cluster size** and **Aggregate by** appear. |
| Cluster size | Sets the size of clustered markers. Available when **Enable clustering** is on. |
| Aggregate by | Sets the numeric data property used to summarize points in each cluster. Available when **Enable clustering** is on. |

> [!IMPORTANT]
>
> The built-in **Airplane** and **Arrow** marker icons are updated (as of August 2026) so that their default orientation at **0° rotation** points **north**. This change aligns the marker artwork with the standard map rotation convention used by Fabric Maps.
>
> If your map uses the **Airplane** or **Arrow** marker icons together with a rotation field or custom rotation values, the marker orientation might appear different after upgrading. Review and, if necessary, adjust any fixed rotation values or rotation logic to preserve the intended visual appearance.
>
> This change only affects the built-in **Airplane** and **Arrow** marker icons. All other built-in marker icons are unaffected.

###### Custom markers

To use a custom image as a marker, browse the files in a Lakehouse and select a supported image format such as **SVG**, **PNG**, or **JPG**. After you select the image, Fabric Maps uses it as the symbol for point data.

:::image type="content" source="media/customize-map/create-custom-marker.png" lightbox="media/customize-map/create-custom-marker.png" alt-text="A screenshot of the Fabric Maps customization panel displaying various icon options for custom marker selection with a create button at the bottom.":::

> [!TIP]
> **SVG** works best for custom marker images that need to scale across zoom levels. SVG icons are vector-based and resize without losing sharpness, keeping markers crisp and readable at different sizes. **PNG** and **JPG** are raster formats and might appear blurry or pixelated when scaled up. Custom marker images must be 1 MB or smaller.

##### Heatmap layer

Heatmap layers use color gradients to show the density of point features. Use intensity, radius, and weight to control how each point contributes to the heatmap.

:::image type="content" source="media/customize-map/heatmap-visual-default.png" lightbox="media/customize-map/heatmap-visual-default.png" alt-text="A screenshot of Fabric Maps displaying a heat map visualization with default color gradient showing data point density and spatial concentration.":::

| Setting | Description |
| ------- | ----------- |
| Color gradient | Sets the color gradient used to represent point density. Select one gradient for the layer to map low-to-high density values. |
| Opacity | Sets the opacity of the heatmap. |
| Intensity | Sets the multiplier applied to each point's weight. |
| Radius | Sets the pixel radius used to render each point's influence. |
| Weight | Sets each point's contribution using a numeric data property. Default = *1* when no property is specified. |
| Enable clustering | Groups nearby points into clusters to reduce visual clutter. Default = *off*. When enabled, **Cluster size** and **Aggregate by** appear. |
| Cluster size | Sets the size of clustered heatmap points. Available when **Enable clustering** is on. |
| Aggregate by | Sets the numeric data property used to summarize points in each cluster. Available when **Enable clustering** is on. |

###### Apply weight

The following screenshot shows a heatmap in which a numeric property contributes different amounts of intensity to each point.

:::image type="content" source="media/customize-map/heatmap-visual-with-weight.png" lightbox="media/customize-map/heatmap-visual-with-weight.png" alt-text="A screenshot of Fabric Maps of New York City taxi trips displayed as heat map with fare amount used as weight variable, lower opacity applied for visibility.":::

###### Clustered heatmap

The following screenshot shows a clustered heatmap with adjusted radius and intensity settings.

:::image type="content" source="media/customize-map/heatmap-visual-clustering.png" lightbox="media/customize-map/heatmap-visual-clustering.png" alt-text="A screenshot of Fabric Maps displaying a clustered heat map visualization with adjusted radius and intensity parameters revealing spatial data density patterns.":::

### Data label settings

Data labels display text from a selected data property directly on the map. To display labels, turn on **Enable data labels** and then configure the label properties.

The following examples show data labels on point, line, and polygon layers.

:::image type="content" source="media/customize-map/data-labels-points.png" lightbox="media/customize-map/data-labels-points.png" alt-text="Screenshot of Fabric Maps displaying public school locations as points with school names shown as data labels on the map.":::

:::image type="content" source="media/customize-map/data-labels-lines.png" lightbox="media/customize-map/data-labels-lines.png" alt-text="Screenshot of Fabric Maps showing National Forest System trails as lines with each trail labeled by its official name.":::

:::image type="content" source="media/customize-map/data-labels-polygons.png" lightbox="media/customize-map/data-labels-polygons.png" alt-text="A screenshot of Fabric Maps displaying polygons representing historic fire perimeter areas with each labeled using the official fire name.":::

| Setting | Description |
| ------- | ----------- |
| Enable data labels | Shows or hides data labels for the selected layer. When enabled, the remaining data-label settings appear. |
| Data labels | Sets the data property whose values appear as labels. Available when **Enable data labels** is on. |
| Font weight | Sets label weight. Valid values: **Regular**, **Medium**, **Bold**. Available when **Enable data labels** is on. |
| Text color | Sets the label text color. Available when **Enable data labels** is on. |
| Text size | Sets label text size. Valid values: 8 to 48. Default = *12*. Available when **Enable data labels** is on. |
| Text stroke color | Sets the text outline color. Available when **Enable data labels** is on. |
| Text stroke width | Sets the text outline width. Valid values: 0 to 10. Default = *1*. Available when **Enable data labels** is on. |
| Label position | Sets label position relative to the associated feature. For line layers, choose top, bottom, or center. For polygon layers, labels are centered by default. For point layers, choose top center, bottom center, top left, top right, bottom left, or bottom right. Available when **Enable data labels** is on. |
| Data label overlap | Sets whether labels can overlap map symbols. Available when **Enable data labels** is on. |

### Visibility settings

Visibility settings control when a layer is displayed and which data properties are available when users hover over its features.

| Setting | Description |
| ------- | ----------- |
| Zoom level | Sets the zoom range in which the layer is displayed. Data appears when zoom is greater than or equal to `minZoom` and less than `maxZoom` (for example, `maxZoom` 23 displays through zoom level 22; `minZoom` 0 displays from zoom level 0). Not supported when using PMTiles as the data source. |
| Tooltips | Sets which data properties are shown when a user hovers over a map feature. |

## Data-driven styling for map layers

Data-driven styling lets you control how vector layers are colored based on property values in your dataset, instead of applying one fixed color to all features. This approach helps highlight patterns, trends, and outliers directly on the map.

Data-driven styling is supported for the following layer types:

* [Line](#line-settings)
* [Polygon](#polygon-settings)
* [Bubble](#bubble-layer)
* [Marker](#marker-layer)

In the **Layer settings** pane, configure data-driven color styling through:

* **Color by**: Selects the data property used for color mapping.
* **Style by**: Selects the styling mode (**Category** or **Value range**).
* **Choose a method**: Available when **Style by** is set to **Value range** and lets you choose **Steps** or **Gradient**.

| Styling mode | Description | Supported data types | Available methods | Typical use cases |
| ------------ | ----------- | -------------------- | ----------------- | ----------------- |
| **Category** | Assigns a distinct color to each unique value in the selected property and displays a discrete legend. | Text or categorical fields | Not applicable | Status values (for example, *Active* and *Inactive*), asset types, regions, ownership, or other discrete classifications. |
| **Value range** | Assigns colors based on numeric value intervals and displays a range-based legend. | Numeric fields | **Steps** or **Gradient** | Altitude, speed, temperature, utilization, risk score, and other continuous measures. |

### Use data‑driven styling on a map layer

1. Open the map in **Edit** mode.
1. Select a vector data layer (line, polygon, bubble, or marker).
1. In the **Layer settings** pane, select **Enable data‑driven styling**.

    :::image type="content" source="media/customize-map/data-driven-styling.png" lightbox="media/customize-map/data-driven-styling.png" alt-text="Screenshot of the Layer Settings pane showing data-driven styling enabled with fields for Color by, Style by, and method selection.":::

1. In **Color by**, select the property that drives color.
1. In **Style by**, select one of the following options:
   * **Category**
   * **Value range**
1. If you select **Value range**, in **Choose a method**, select either **Steps** or **Gradient**.

### Configure value range methods

When you set **Style by** to **Value range**, use one of these methods:

* **Steps**: Divides the numeric domain into discrete buckets, where each bucket gets a distinct color. Use this method when you want explicit class breaks.
* **Gradient**: Applies a continuous color ramp across the numeric domain. Use this method when you want smooth visual transitions between low and high values.

### Rotate markers by data field

Marker layers support data-driven rotation, which is useful for directional data such as heading, bearing, or wind direction.

1. Select a **Marker** layer.
1. In **Rotation**, select **By data**.
1. In **Rotation property**, select a numeric field.

Use data values in the range **0 to 360** so markers rotate correctly.

### Additional behavior and considerations

* The **Data layer** pane displays a color legend for both **Category** and **Value range** styles.
* For **Category** styling, the legend automatically collapses when more than 10 items are shown; select **Show more** to expand.
* For **Category** styling, the legend supports up to 100 categories. Additional values appear as **Other**.
* For marker layers, data-driven color styling is supported for built-in marker symbols, except when using gradient-based color styling. Custom marker images don't support data-driven color styling.
* Data-driven styling works with other layer features such as **filters** and **labels**. Due to a current limitation, legends for PMTiles-based layers don't update when filters are applied and continue to display values for the unfiltered dataset.
