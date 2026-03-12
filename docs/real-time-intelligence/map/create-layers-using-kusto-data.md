---
title: Add Kusto data to a map
description: Learn how to create layers using Kusto Tables, Functions, and Materialized Views in Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/12/2026
ms.search.form: Create layers using Kusto data
---

# Create layers using Kusto data

This article walks through adding KQL data from Kusto tables, functions, and materialized views to Fabric Maps and configuring the resulting layer for visualization. For more information on Kusto integration, see [Kusto integration in Fabric Maps](about-kusto-integration.md).

> [!IMPORTANT]
> Existing layers created from a KQL queryset tab will continue to work until June 29, 2026. To avoid service disruptions, migrate these queries to Kusto Functions as described in this article.
>
> For detailed steps, see [Migrate KQL Queryset to Kusto Tables, Functions, and Materialized Views](migrate-kusto-query-layer.md).

## Prerequisites

Before you begin, ensure that:

- You have access to a KQL database in Microsoft Fabric.
- The target table, function, or materialized view returns geometry columns.
- You have permission to create and edit maps in Fabric.

## Create a data layer from a KQL database

1. Open your map in Edit mode.
1. In the **Explorer**, select the **Fabric items** tab
1. Select the **Add** button, then select **KQL database** from the drop-down list.

    :::image type="content" source="media/layers/database/connect-kql-database.png" alt-text="A screenshot of the Explorer pane in Fabric Maps showing the Fabric items tab. The Add dropdown menu is open and displays three options: Lakehouse, KQL database, and Ontology (preview). Ontology (preview) is highlighted in the list. The interface provides access to data sources for adding to map layers.":::

1. Expand your connected **KQL database**, then expand Tables, Functions, or Materialized views.

    :::image type="content" source="media/layers/database/explorer-kql-database-view.png" alt-text="A screenshot of the Explorer pane in Fabric Maps showing the Fabric items tab with an expanded OneLake database. The database hierarchy displays three collapsible sections: Tables, Materialized Views, and Functions.":::

1. Right‑click the target entity, and select Show on map.

    :::image type="content" source="media/layers/database/show-on-map.png" alt-text="A screenshot of the Explorer pane in Fabric Maps with the Fabric items tab active. The context menu is open on a KQL database entity, displaying the Show on map option. The menu appears in the left sidebar above the map visualization, allowing users to add the selected Kusto data source as a layer.":::

    This action launches the data layer configuration wizard.

1. In the **Preview data** step, review the query output to confirm that the expected columns and values are returned. This preview reflects the data that is rendered on the map. Once confirmed, select **Next**.

    :::image type="content" source="media/layers/database/kql-data-preview-geometry-data.png" alt-text="Screenshot of the Fabric Maps Query result preview step showing a table with spatial data. The table displays columns for latitude, longitude, and geometry containing nine rows of data. The left sidebar shows three steps: Preview data (currently active and highlighted in teal), Set geometry and data refresh interval, and Review and add to map. At the bottom right are Cancel and Next buttons. This step allows users to verify that the expected columns and geographic coordinate values are present before configuring the layer.":::

1. In the **the Fabric Maps Set geometry and data refresh interval configuration** step, Specify how geometry is defined, then select **Next**.

    There are two options for defining geometry:

    1. **Latitude and longitude data are stored in separate columns**
        - Select **Latitude and longitude data located in separate columns**.
        - Choose the latitude and longitude columns from the list.
        - Select your desired data refresh interval.

        :::image type="content" source="media/layers/database/kql-database-configure-query-interval.png" alt-text="Screenshot of the Fabric Maps Set geometry and data refresh interval configuration step. The main panel displays a form with three sections: Data layer with a name field containing Latest flight data - US, Geometry data column with a dropdown set to Latitude and longitude data locate on separate columns, followed by Latitude column and Longitude column fields both populated, and Data refresh section with a dropdown set to 5 seconds. The left sidebar shows a three-step progress indicator with the current step Set geometry and data refresh interval highlighted in teal. At the bottom right are Back and Next buttons. This step allows users to specify geometry columns and set how frequently the map layer updates with new data.":::

    1. **Geometry data is stored in a single column**
        - Select **Geometry data locates on single column**.
        - Choose the geometry column from the list.
        - Select your desired data refresh interval.

        :::image type="content" source="media/layers/database/kql-data-configure-geometry-column.png" alt-text="Screenshot of the Fabric Maps Set geometry and data refresh interval configuration step for single geometry column. The form shows Data layer name field with Latest flight data - US, Geometry data column dropdown set to Geometry data locates on single column with a geometry column field populated, and Data refresh dropdown set to 5 seconds. The left sidebar displays the three-step progress indicator with Set geometry and data refresh interval highlighted. Back and Next buttons appear at the bottom right.":::

        > [!TIP]When to use dynamic geometry
        > Use a dynamic geometry column when your Kusto function returns non‑point geometries—such as lines or polygons—or when geometry is represented as GeoJSON. Dynamic geometry is well suited for routes, boundaries, and areas where latitude and longitude columns aren't sufficient. For more information, see [The dynamic data type](/kusto/query/scalar-data-types/dynamic?view=microsoft-fabric)

1. In the **Review and add to map** step, confirm the settings as expected. Once confirmed, select **Add to map**.

    With Geometry data in two columns:

    :::image type="content" source="media/layers/database/kql-database-review-and-add-to-map.png" alt-text="Fabric Maps Review and add to map configuration step. Form displays Data source: KQL database RandomRealTimeData, Function: RealTimeDataFunction1, Data layer name: Latest flight data - US, Geometry data column: Latitude and longitude data located in separate columns with populated latitude and longitude fields, Data refresh: 5 seconds. Left sidebar shows three-step progress: Preview data, Set geometry, and data refresh interval, and Review and add to map (currently highlighted in teal). Bottom right contains Back and Add to map buttons for finalizing Kusto layer configuration.":::

    With Geometry data in a single column:

    :::image type="content" source="media/layers/database/kql-data-review-geometry.png" alt-text="Fabric Maps Review and add to map configuration step. Form displays Data source: KQL database RandomRealTimeData, Function: RealTimeDataFunction1, Data layer name: Latest flight data - US, Geometry data column: Geometry data locates on single column with populated geometry field, Data refresh: 5 seconds. Left sidebar shows three-step progress: Preview data, Set geometry, and data refresh interval, and Review and add to map (currently highlighted in teal). Bottom right contains Back and Add to map buttons for finalizing Kusto layer configuration.":::

1. Once your layer is created, you can focus the map to zoom into where the data elements are located. To do this. select the data layer context menu (**...**) then **Zoom to fit**.

    :::image type="content" source="media/layers/database/kql-database-auto-zoom-to-fit.png" alt-text="Screenshot of the Fabric Maps interface showing a data layer context menu with the Zoom to fit option highlighted.":::

## Configure styling and filtering

After the layer is added, you can:

1. Change the layer type to **Marker** for point-based layers.
1. Apply color, size, and rotation using data-driven styling.
1. Enable clustering for dense datasets.
1. Add filters to restrict the displayed features based on field values.

These options allow you to tailor the visualization to your scenario without modifying the underlying KQL entity.

- For more information on layer styling, see [Customize a map](customize-map.md).
- For more information on data filtering in layers, see [Data filtering in Fabric Maps](about-data-filtering.md).

The following screenshot demonstrates a polygon-based data layer that autorefreshes every 5 seconds:

:::image type="content" source="media/layers/database/kusto-data-refresh-polygon.gif" alt-text="Animated demonstration of Fabric Maps showing a polygon layer updating in real time as new flight data arrives. The map displays colored polygons across the United States representing data points, with the layer configuration panel visible on the left side. The polygons change color and position as the data refreshes every 5 seconds, illustrating how live Kusto data flows into map visualizations.":::

The following screenshot demonstrates a point-based data layer that autorefreshes every 5 seconds:

:::image type="content" source="media/layers/database/kql-database-layer-refresh.gif" alt-text="Animated demonstration of Fabric Maps displaying a real-time updating polygon layer across a US map. The map shows colored points representing flight data points distributed throughout the United States. As new data arrives, the points change color and shift position, refreshing every 5 seconds. The layer configuration panel is visible on the left sidebar. This animation illustrates how live Kusto data continuously flows into and updates map visualizations.":::

## Next steps

To learn more about custom styling:

> [!div class="nextstepaction"]
> [Customize a map](customize-map.md)

To learn more about data filtering:

> [!div class="nextstepaction"]
> [Data filtering in Fabric Maps](about-data-filtering.md)
