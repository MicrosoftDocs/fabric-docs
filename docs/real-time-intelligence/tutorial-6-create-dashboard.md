---
title: Real-Time Intelligence tutorial part 6 - Create a Real-Time Dashboard
description: Learn how to create a Real-Time Dashboard in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 10/27/2025
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to create a Real-Time Dashboard in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 6: Create a Real-Time Dashboard

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 5: Query streaming data using KQL](tutorial-5-query-data.md).

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

1. Select **Save to dashboard** > **New Real-Time Dashboard**.
1. Enter the following information:

    | Field | Value |
    | --- | --- |
    | **Name** | *TutorialDashboard* |
    | **Location** | The workspace in which you have created your resources |
    

1. Select **Create**.

The new Real-Time dashboard, *TutorialDashboard*, opens with the New tile. You can also access the Real-Time dashboard by browsing to your workspace and selecting the desired item.

## Add a new tile to the dashboard

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
> [Real-Time Intelligence tutorial part 7: Detect anomalies on an Eventhouse table](tutorial-7-create-anomaly-detection.md)
