---
title: Real-Time Intelligence tutorial part 8 - Create a map using geospatial data
description: Tutorial- Learn how to create a map in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: tutorial
ms.date: 12/09/2025
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to create a map in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 8: Create a map using geospatial data

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 7: Detect anomalies on an Eventhouse table](tutorial-7-create-anomaly-detection.md).

In this part of the tutorial, you learn how to create a map using geospatial data.

## Create a KQL Queryset tab to be used by the map

1. Open the **Tutorial** eventhouse that you created in the previous part of the tutorial.
1. Select the **Tutorial_queryset**.
1. Select the **+** button on the ribbon to create a new tab.
1. Select the pencil icon on the tab and rename the query tab *Show on map*.
1. Copy/paste and run the following query.

    ```kusto
    TransformedData
    | where ingestion_time() > ago(30d)
    | project Street, Neighbourhood, toreal(Latitude), toreal(Longitude), No_Bikes, No_Empty_Docks
    | summarize sum(No_Bikes), sum(No_Empty_Docks) by Street, Neighbourhood, Latitude, Longitude
    ```

    :::image type="content" source="media/tutorial/show-on-map.png" alt-text="Screenshot of kql query for map." lightbox="media/tutorial/show-on-map.png":::

## Create a Lakehouse and upload GeoJson files

1. Browse to your workspace and in upper left corner select the **+ New item** button. Then search for and select **Lakehouse**.

    :::image type="content" source="media/tutorial/lakehouse.png" alt-text="Screenshot of lakehouse creation." lightbox="media/tutorial/lakehouse.png":::

1. Enter **TutorialLakehouse** as name.
1. Select the workspace in which you've created your resources. 
1. Right-click the **File** node and under **Upload**, select **Upload files**.
1. Download the following two GeoJSON files from the following links and upload them to the Lakehouse.
    - [london-boroughs.geojson](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/london-boroughs.geojson)
    - [buckingham-palace-road.json](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/buckingham-palace-road.geojson)

    :::image type="content" source="media/tutorial/lakehouse-upload-files.png" alt-text="Screenshot of files upload to lakehouse." lightbox="media/tutorial/lakehouse-upload-files.png":::

## Create a map

1. Browse to your workspace and in upper left corner select the **+ New item** button. Then search for and select **Map**.

    :::image type="content" source="media/tutorial/map-item-creation.png" alt-text="Screenshot of map item creation." lightbox="media/tutorial/map-item-creation.png":::

1. Enter *TutorialMap* in **Name**, and select **Create**

## Add Eventhouse data to the map

1. In the **Explorer** pane, select **Eventhouse** and select **+ Add data items** and choose the **Tutorial** eventhouse.
1. Select **Connect**.
1. Under Tutorial, select the **Tutorial_queryset**.
1. Select the more menu (**...**) next to **Show on map** and select **Show on map**.

    :::image type="content" source="media/tutorial/map-eventhouse.png" alt-text="Screenshot of eventhouse queryset tab selection." lightbox="media/tutorial/map-eventhouse.png":::

1. A new window showing data preview of the query opens. Select **Next** .
1. Enter *BikeLatLong* as Name. Select the **Latitude** and **Longitude** columns. Under **Data refresh interval** select 5 minutes. Select **Next**.

    :::image type="content" source="media/tutorial/map-eventhouse-configure.png" alt-text="Screenshot of map latitude and longitude selection." lightbox="media/tutorial/map-eventhouse-configure.png":::

1. In the next screen, select **Add to map**.
1. Right-click on **BikeLatLong** under **Data layers** and select **Zoom to fit** to zoom into London area showing bike stations on the map.
1. Under General settings, add Street and Neighbourhood under Tooltips.
1. Under Point settings, toggle **Enable series group** and select **Neighbourhood**.
1. Change **Size** to **By data** and select **sum_No_Empty_Docks**. 

    This should immediately take effect on the map with bubble sizes representing the number of empty docks and colors representing different neighbourhoods.

    :::image type="content" source="media/tutorial/bubble-map.png" alt-text="Screenshot of bubble map." lightbox="media/tutorial/bubble-map.png":::

## Add GeoJSON files from Lakehouse to the map

1. In the **Explorer** pane, select **Lakehouse** and select **+ Add data items** and 
1. Choose the **TutorialLakehouse** lakehouse and select **Connect**.
1. Under TutorialLakehouse, select the **london-boroughs.geojson** file and right-click on the file and select **Show on map**. Repeat the step for **buckingham-palace-road.json** file.

    :::image type="content" source="media/tutorial/selection.png" alt-text="Screenshot of geojson selection." lightbox="media/tutorial/selection.png":::

1. We should see the borough boundaries and Buckingham Palace road on the map. You can toggle visibility of each layer by clicking the eye icon next to each layer under **Data layers**.

    :::image type="content" source="media/tutorial/map-data-layers.png" alt-text="Screenshot of 3 data layers in map." lightbox="media/tutorial/map-data-layers.png":::

1. Right-click on **buckingham-palace-road** under **Data layers** and select **Zoom to fit** to zoom into Buckingham Palace road area on the map.

    :::image type="content" source="media/tutorial/zoom-buckingham-palace.png" alt-text="Screenshot of 3 data layers." lightbox="media/tutorial/zoom-buckingham-palace.png":::

1. From the menu bar, select the **Save** icon.


## Related content

For more information about tasks performed in this tutorial, see:
* [Create a map (preview)](map/create-map.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 9: Clean up resources](tutorial-9-clean-up-resources.md)

