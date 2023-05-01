---
title: "Synapse Real-Time Analytics tutorial part 3: Explore data and build report"
description: Part 3 of the Real-Time Analytics tutorial in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Real-Time Analytics tutorial part 3: Explore data and build report

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 2: Get data with Eventstream](tutorial-2-event-streams.md)

## Explore data

1.  Navigate to your Trident workspace homepage, and select the **NycTaxiDB** KQL database.
    
    :::image type="content" source="media/realtime-analytics-tutorial/go-to-database.png" alt-text="Screenshot of selecting NYC taxi database in Real-Time Analytics in Microsoft Fabric.":::

1.  In the object tree, select the table **nytaxitrips**
1.  In the top right corner, select **Check your data**.
    
    :::image type="content" source="media/realtime-analytics-tutorial/check-your-data.png" alt-text="Screenshot of object tree with table selected and check your data."  lightbox="media/realtime-analytics-tutorial/check-your-data.png":::

1.  Paste the following query in the query editor and select **Run**.

    ```kusto 
    nyctaxitrips
    | summarize avg(fare_amount) by HourOfDay = hourofday(tpep_dropoff_datetime)
    ```

## Build a Power BI report from the query output

1.  Select **Build Power BI Report.**  The report you create in this step is based on the query output from the previous step.
    
    :::image type="content" source="media/realtime-analytics-tutorial/build-power-bi-report.png" alt-text="Screenshot of query results with building Power BI report selected in Real-Time Analytics in Microsoft Fabric.":::

    An empty Power BI report editing window will open.
1.  Select **Stacked Column Chart** in the Visualizations pane. 
1. In the **Data** pane on the right side, expand the **Kusto Query Result** to view the *avg_fare_amount* and *HourOfDay* fields.
1. Drag the **HourOfDay** field to the **X-axis** and **avg_fare_amount** to the **Y-axis**

    :::image type="content" source="media/realtime-analytics-tutorial/create-power-bi-visual.png" alt-text="Screenshot of creating Power BI visual from quick query output in Real-Time Analytics in Microsoft Fabric.":::

1.  In the top left corner of the ribbon, select **File** > **Save**.
1.  Enter the name *nyctaxitripstats*. Choose your workspace, and set sensitivity as *Public*.
1. Select **Continue**.
1. Select **Open the file in Power BI to view, edit, and get a shareable link**. 
    
    :::image type="content" source="media/realtime-analytics-tutorial/open-in-power-BI.png" alt-text="Screenshot of opening in Power BI in Real-Time Analytics in Microsoft Fabric.":::

    A new tab opens with the Power BI report selected.

## Change refresh settings

1. On the ribbon, select the **Edit** (pencil) button. :::image type="icon" source="media/realtime-analytics-tutorial/edit-pencil-icon.png" border="false":::
1. In the **Visualizations** pane, select the paintbrush icon to **Format page**.
1. Expand **Page Refresh**.

    :::image type="content" source="media/realtime-analytics-tutorial/page-refresh-on.png" alt-text="Screenshot of page refresh details in Real-Time Analytics in Microsoft Fabric.":::

1. Toggle **Page Refresh** to **On** and set the refresh interval to 10 seconds.

    > [!NOTE]
    >  The refresh interval can only be greater than or equal to the Admin interval.

1. Select the **Save** icon on the ribbon.

    The Power BI report now auto-refreshes on streaming data arriving in a KQL database from an eventstream.

## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 4: Enrich your data](tutorial-4-enrich-data.md)