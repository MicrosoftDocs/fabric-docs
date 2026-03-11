---
title: Add Kusto data to a map
description: Learn how to create layers using Kusto Tables, Functions, and Materialized Views in Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/12/2026
ms.search.form: Kusto, fabric maps layers, kusto layer
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
- The target table, function, or materialized view returns latitude and longitude columns.
- You have permission to create and edit maps in Fabric.

## Create a data layer from a KQL database

1. Open your map in Edit mode.
1. In the **Explorer**, select the **Fabric items** tab
1. Select the **Add** button, then select **KQL database** from the drop-down list.

    :::image type="content" source="media/layers/database/connect-kql-database.png" alt-text="A screenshot of the Explorer pane in Fabric Maps showing the Fabric items tab. The Add dropdown menu is open and displays three options: Lakehouse, KQL database, and Ontology (preview). Ontology (preview) is highlighted in the list. The interface provides access to data sources for adding to map layers.":::

1. Expand your connected **KQL database**, then expand Tables, Functions, or Materialized views.

    :::image type="content" source="media/layers/database/explorer-kql-database-view.png" alt-text="A screenshot of the Explorer pane in Fabric Maps showing the Fabric items tab with an expanded OneLake database. The database hierarchy displays three collapsible sections: Tables, Materialized Views, and Functions.":::

1. Right‑click the target object, and select Show on map.

    :::image type="content" source="media/layers/database/show-on-map.png" alt-text="A screenshot of the Explorer pane in Fabric Maps with the Fabric items tab active. The context menu is open on a KQL database object, displaying the Show on map option. The menu appears in the left sidebar above the map visualization, allowing users to add the selected Kusto data source as a layer.":::

    This action launches the data layer configuration wizard.

1. In the **Preview data** step, review the query output to confirm that the expected columns and values are returned. This preview reflects the data that is rendered on the map. Once confirmed, select **Next**.

    :::image type="content" source="media/layers/database/kql-database-preview.png" alt-text="Screenshot of the Fabric Maps Query result preview step showing a table with spatial data. The table displays columns for update_time, device_id, latitude, and longitude, containing nine rows of data from device_1 through device_9 with timestamps from 2026-03-10T09:02:25. The left sidebar shows three steps: Preview data (currently active and highlighted in teal), Set geometry and data refresh interval, and Review and add to map. At the bottom right are Cancel and Next buttons. This step allows users to verify that the expected columns and geographic coordinate values are present before configuring the layer.":::

1. In the **the Fabric Maps Set geometry and data refresh interval configuration** step, Specify how geometry is defined, then select **Next**:
    - Select **Latitude and longitude data located in separate columns**.
    - Choose the latitude and longitude columns from the list.
    - Select your desired data refresh interval.

    :::image type="content" source="media/layers/database/kql-database-configure-query-interval.png" alt-text="Screenshot of the Fabric Maps Set geometry and data refresh interval configuration step. The main panel displays a form with three sections: Data layer with a name field containing Latest flight data - US, Geometry data column with a dropdown set to Latitude and longitude data locate on separate columns, followed by Latitude column and Longitude column fields both populated, and Data refresh section with a dropdown set to 5 seconds. The left sidebar shows a three-step progress indicator with the current step Set geometry and data refresh interval highlighted in teal. At the bottom right are Back and Next buttons. This step allows users to specify geometry columns and set how frequently the map layer updates with new data.":::

1. In the **Review and add to map** step, confirm the settings as expected. Once confirmed, select **Add to map**.

    :::image type="content" source="media/layers/database/kql-database-review-and-add-to-map.png" alt-text="Screenshot of the Fabric Maps Review and add to map configuration step. The main panel shows a form with Data source section displaying KQL database and RandomRealTimeData, Function field showing RealTimeDataFunction1, Data layer section with Name field containing Latest flight data - US, Geometry data column section set to Latitude and longitude data locate on separate columns with latitude and longitude columns populated, and Data refresh section set to 5 seconds. The left sidebar displays a three-step progress indicator with Review and add to map highlighted in teal as the current step, preceded by Preview data and Set geometry and data refresh interval. At the bottom right are Back and Add to map buttons. This final configuration step allows users to verify all settings before adding the Kusto layer to the map.":::

1. Once your layer is created, you can focus the map to zoom into where the data elements are located. To do this. select the data layer context menu (**...**) then **Zoom to fit**.

    :::image type="content" source="media/layers/database/kql-database-auto-zoom-to-fit.png" alt-text="Screenshot of the Fabric Maps interface showing a data layer context menu with the Zoom to fit option highlighted.":::

## Style and filter the layer

After the layer is added, you can:

1. Change the layer type to **Marker**.
1. Apply color, size, and rotation using data‑driven styling.
1. Enable clustering for dense datasets.
1. Add filters to restrict the displayed features based on field values.

These options allow you to tailor the visualization to your scenario without modifying the underlying KQL object.

## Next steps

To learn more about custom styling:

> [!div class="nextstepaction"]
> [Customize a map](customize-map.md)

To learn more about data filtering:

> [!div class="nextstepaction"]
> [Data filtering in Fabric Maps](about-data-filtering.md)
