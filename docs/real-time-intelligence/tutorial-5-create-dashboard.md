---
title: Real-Time Intelligence tutorial part 5 - Create a Real-Time dashboard
description: Learn how to create a Real-Time dashboard in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
#customer intent: I want to learn how to create a Real-Time dashboard in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 5: Create a Real-Time dashboard

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 3: Query streaming data in a KQL queryset](tutorial-4-query-data.md).

In this part of the tutorial, you learn how to create a Real-Time dashboard in Real-Time Intelligence. You create a KQL query, create a Real-Time dashboard, add a new tile to the dashboard, and explore the data visually by adding an aggregation.

## Create a Real-Time dashboard

1. In your KQL queryset, named *TutorialQueryset*, copy/paste and run the following query. This query returns a column chart showing the most recent number of bikes by *BikepoointID*

    ```kusto
    TutorialTable
    | summarize arg_max(Timestamp, No_Bikes) by BikepointID
    | sort by BikepointID
    | render columnchart with (ycolumns=No_Bikes, xcolumn= BikepointID)
    ```

    :::image type="content" source="media/tutorial/bikes-by-bikepoint.png" alt-text="Screenshot of query showing column chart of bikes by bike point ID. ":::

1. Select **Pin to dashboard**. 
1. Enter the following information:

    | Field | Value |
    | --- | --- |
    | **Create new tile** | *In a new dashboard* |
    | **Dashboard name** | *TutorialDashboard* |
    | **Tile name** | *Recent bikes by Bikepoint* |
    | **Open dashboard after creation** | *Selected* |

1. Select **Create**.

    :::image type="content" source="media/tutorial/pin-to-dashboard.png" alt-text="Screenshot of pinning query to dashboard in Real-Time Intelligence.":::

The new dashboard, *TutorialDashboard*, opens with the *Recent bikes by Bikepoint* tile.

## Add a new tile to the dashboard

1. On the top menu bar, toggle from **Viewing** mode to **Editing** mode.
1. Select **New tile**

    :::image type="content" source="media/tutorial/new-tile.png" alt-text="Screenshot of Real-Time dashboard in editing mode with new tile selected.":::

1. Enter the following query:

    ```kusto
    TutorialTable
    | where Neighbourhood == "Chelsea"
    ```

1. In **Tile name**, enter *Chelsea bikes*. 
1. Select **Apply changes**.

## Explore the data visually by adding an aggregation

1. On the new **Chelsea bikes** tile, select the **Explore** icon :::image type="icon" source="media/tutorial/explore-icon.png" border="false":::.

    :::image type="content" source="media/tutorial/add-aggregation.gif" alt-text="GIF of how to visually add and modify the query." border="false":::

1. Select **+ Add** > **Aggregation**.
1. Select **+ Add grouping**.
1. Select **Group by** > *Street*.
1. Select **Apply**.

    Notice that the query elements are updated to include the green **count() by Street** aggregation. The resulting table has been changed to show the total count of bike locations by street.

## Related content

For more information about tasks performed in this tutorial, see:
* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
* [arg_max() function](/azure/data-explorer/kusto/query/arg-max-aggregation-function?context=/fabric/context/context-rti&pivots=fabric)
* [render operator](/azure/data-explorer/kusto/query/render-operator?context=/fabric/context/context-rti&pivots=fabric)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 6: Create a Power BI report from your KQL queryset](tutorial-6-power-bi-report.md)