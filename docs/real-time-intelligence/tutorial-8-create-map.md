---
title: Real-Time Intelligence tutorial part 7 - Create a Map
description: Learn how to detect anomalies on your Eventhouse table in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 11/19/2024
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to detect anomalies on my Eventhouse table in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 8: Create a Map

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 7: Detect anomalies on an Eventhouse table](tutorial-7-create-anomaly-detection.md).

In this part of the tutorial, you learn how to create a map using geospatial data.

## Create KQL Queryset tab used by Map

1. Open the **Tutorial** eventhouse that you created in the previous part of the tutorial.
1. Select the **Tutorial_queryset**, open a new query tab and paste the following query.

    ```kusto
    TransformedData
    | where ingestion_time() > ago(30d)
    | project Street, Neighbourhood, toreal(Latitude), toreal(Longitude), No_Bikes, No_Empty_Docks
    | summarize sum(No_Bikes), sum(No_Empty_Docks) by Street, Neighbourhood, Latitude, Longitude
    ```

    ![Screenshot of kql query for map.](media/map-kql-query.png)

## Create a Lakehouse and upload GeoJson files

1. Browse to the workspace and in upper left corner select the **+ New item** button. Then search for and select **Lakehouse**.

    ![Screenshot of lakehouse creation.](media/lakehouse.png)

1. Enter **TutorialLakehouse** as Name
1. Right-click the **File** node and under **Upload**, select **Upload files**.
1. Download the following two GeoJSON files from media section and upload them to the Lakehouse.
    - london-boroughs.geojson
    - buckingham-palace-road.json

    ![Screenshot of files upload to lakehouse.](media/lakehouse-upload-files.png)

## Create a Map

1. Browse to the workspace and in upper left corner select the **+ New item** button. Then search for and select **Map**.

    ![Screenshot of map item creation.](media/map-item-creation.png)

1. Enter **`TutorialMap`** as Name

## Add Eventhouse data to the Map

1. In the **Explorer** pane, select **Eventhouse** and select **+ Add data items** and choose the **Tutorial** eventhouse.
1. Under Tutorial, select the **Tutorial_queryset** and right-click on the tab and select **Show on map**

    ![Screenshot of eventhouse queryset tab selection](media/map-eventhouse.png)

1. A new window showing data preview of the query opens. Click **Next** and enter **`BikeLatLong`** as Name. Select the **Latitude** and **Longitude** columns. Under **Data refresh interval** select 5 minutes. Click **Next**.

    ![Screenshot of map latitude and longitude selection](media/map-eventhouse-config.png)

1. In the next screen, click **Add to map**.
1. Right-click on **BikeLatLong** under **Data layers** and select **Zoom to fit** to zoom into London area showing bike stations on the map.
1. Under General settings, add Street and Neighbourhood under Tooltips.
1. Under Point settings, toggle **Enable series group** and select **Neighbourhood**, change **Size** to **By data** and select **sum_No_Empty_Docks**. This should immediately take effect on the map with bubble sizes representing the number of empty docks and colors representing different neighbourhoods.

    ![Screenshot of bubble map](media/bubble-map.png)

## Add GeoJSON files from Lakehouse to the Map

1. In the **Explorer** pane, select **Lakehouse** and select **+ Add data items** and choose the **TutorialLakehouse** lakehouse.
1. Under TutorialLakehouse, select the **london-boroughs.geojson** file and right-click on the file and select **Show on map**. Repeat the step for **buckingham-palace-road.json** file.

    ![Screenshot of geojson selection](media/geojson-selection.png)

1. We should see the borough boundaries and Buckingham Palace road on the map. You can toggle visibility of each layer by clicking the eye icon next to each layer under **Data layers**.

    ![Screenshot of 3 data layers](media/map-data-layers.png)

1. Right-click on **buckingham-palace-road** under **Data layers** and select **Zoom to fit** to zoom into Buckingham Palace road area on the map.

    ![Screenshot of 3 data layers](media/zoom-buckingham-palace.png)

1. Select **Save**

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 9: Clean up resources](tutorial-9-clean-up-resources.md)

