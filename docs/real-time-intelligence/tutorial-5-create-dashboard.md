---
title: Real-Time Intelligence tutorial part 5 - Create a Real-Time Dashboard
description: Learn how to create a Real-Time Dashboard in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 12/02/2024
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to create a Real-Time Dashboard in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 5: Create a Real-Time Dashboard

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 4: Query streaming data](tutorial-3-query-data.md).

In this part of the tutorial, you learn how to create a Real-Time Dashboard in Real-Time Intelligence. You create a Kusto Query Language (KQL) query, create a Real-Time Dashboard, add a new tile to the dashboard, and explore the data visually by adding an aggregation.

## Create a Real-Time Dashboard

1. In your KQL queryset, copy/paste, and run the following query. This query might already have been run from the previous section in this tutorial.
    This query returns a column chart showing the most recent number of bikes by *BikepointID*.

    ```kusto
    AggregatedData
    | sort by BikepointID
    | render columnchart with (ycolumns=No_Bikes,xcolumn=BikepointID)
    ```

    :::image type="content" source="media/tutorial/bikes-by-bikepoint.png" alt-text="Screenshot of query showing column chart of bikes by bike point ID. ":::

1. Select **Pin to dashboard**.
1. Enter the following information:

    :::image type="content" source="media/tutorial/pin-dashboard.png" alt-text="Screenshot of pinning query to dashboard in Real-Time Intelligence.":::

    | Field | Value |
    | --- | --- |
    | **Create new tile** | *In a new dashboard* |
    | **Dashboard name** | *TutorialDashboard* |
    | **Tile name** | *Recent bikes by Timepoint* |
    | **Open dashboard after creation** | *Selected* |

1. Select **Create**.

Since you've selected **Open dashboard after creation**, the new Real-Time dashboard, *TutorialDashboard*, opens with the *Recent bikes by Bikepoint* tile. You can also access the Real-Time dashboard by browsing to your workspace and selecting the desired item.

## Add a new tile to the dashboard

1. On the top menu bar, toggle from **Viewing** mode to **Editing** mode.
1. Select **New tile**

    :::image type="content" source="media/tutorial/new-tile.png" alt-text="Screenshot of Real-Time Dashboard in editing mode with new tile selected.":::

1. In the query editor, enter the following query:

    ```kusto
    RawData
    | where Neighbourhood == "Chelsea"
    ```

1. From the menu ribbon, Select **Apply changes**.
    A new tile is created.
1. Rename the tile by selecting the **More menu [...]** on the top right corner of the tile > **Rename tile**.
1. Enter the new name *Chelsea bikes* to rename the tile.

## Explore the data visually by adding an aggregation

1. On the new **Chelsea bikes** tile, select the **Explore** icon. :::image type="icon" source="media/tutorial/explore-icon.png" border="false":::
1. Select **+ Add** > **Aggregation**.
1. Select **Operator** > **max** and **Column** > *No_Bikes*.
1. Under **Display Name**, enter *Max_Bikes*.
1. Select **+ Add grouping**.
1. Select **Group by** > *Street*.
1. Select **Apply**.
    
    :::image type="content" source="media/tutorial/aggregation-tool.png" alt-text="Screenshot of exploration tool showing max number of bikes by street.":::
    
    Notice that the query elements are updated to include the **max(No_Bikes) by Street** aggregation. The resulting table changed to show the total count of bike locations by street.
1. Change the **Visual type** to **Bar chart**.
1. Select **Pin to dashboard** > **In this dashboard**.

## Add a map tile

1. Select **New tile**.
1. In the query editor, enter and run the following query:

    ```kusto
    RawData
    | where Timestamp > ago(1h)
    ```

1. Above the results pane, select **+ Add visual**.
1. In the **Visual formatting** pane, enter the following information:

    | Field | Value |
    | --- | --- |
    | Tile name | *Bike locations Map* |
    | **Visual type** | *Map* |
    | **Define location by** | *Latitude and longitude* |
    | **Latitude column** | *Latitude* |
    | **Longitude column** | *Longitude* |
    | **Label column** | *BikepointID* |

1. Select **Apply changes**.
    You can resize the tiles and zoom in on the map as desired.

    :::image type="content" source="media/tutorial/final-dashboard.png" alt-text="Screenshot of final dashboard with three tiles." lightbox="media/tutorial/final-dashboard.png":::

1. Save the dashboard by selecting the **Save** icon on the top left corner of the dashboard.

## Related content

For more information about tasks performed in this tutorial, see:
* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
* [arg_max() function](/azure/data-explorer/kusto/query/arg-max-aggregation-function?context=/fabric/context/context-rti&pivots=fabric)
* [render operator](/azure/data-explorer/kusto/query/render-operator?context=/fabric/context/context-rti&pivots=fabric)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 6: Create a Power BI report](tutorial-6-power-bi-report.md)
