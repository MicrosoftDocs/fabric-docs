---
title: Real-Time Intelligence tutorial part 6 - Create a Real-Time Dashboard
description: Learn how to create a Real-Time Dashboard in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 12/29/2025
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to create a Real-Time Dashboard in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 6: Create a Real-Time Dashboard

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 5: Query streaming data using KQL](tutorial-5-query-data.md).

In this part of the tutorial, you learn how to create a Real-Time Dashboard in Real-Time Intelligence. You create a Kusto Query Language (KQL) query, create a Real-Time Dashboard, add a new tile to the dashboard, and explore the data visually by adding an aggregation.

## Create a real-time dashboard

1. In your KQL queryset, copy, paste, and run the following query. You might have already run this query from the previous section in this tutorial.
    This query returns a column chart showing the most recent number of bikes by *BikepointID*.

    ```kusto
    AggregatedData
    | sort by BikepointID
    | render columnchart with (ycolumns=No_Bikes,xcolumn=BikepointID)
    ```

    :::image type="content" source="media/tutorial/bikes-by-bikepoint.png" alt-text="Screenshot of query showing column chart of bikes by bike point ID. " lightbox="media/tutorial/bikes-by-bikepoint.png":::

1. Select **Save to dashboard** > **New Real-Time Dashboard**.

1. Enter the following information:

    | Field | Value |
    | --- | --- |
    | **Name** | *TutorialDashboard* |
    | **Location** | The workspace in which you created your resources |

1. Select **Create**.

   The new real-time dashboard, *TutorialDashboard*, opens with the New tile. You can also access the real-time dashboard by browsing to your workspace and selecting the desired item.

   :::image type="content" source="media/tutorial/tutorial-dashboard-new-tile.png" alt-text="Screenshot of TutorialDashboard showing one new tile. " lightbox="media/tutorial/tutorial-dashboard-new-tile.png":::

<!-- ## Using Copilot. Content drafted, but not published as per Michal's request. Leaving here for future. 
## Generate a real-time dashboard using Copilot (preview)

The process uses AI to generate a Real-Time Dashboard from the streaming data in your table. You can then customize the dashboard by adding or modifying tiles as needed.

1. Open the Real-Time hub by selecting **Real-Time** from the left main menu. 

    You see the RawData and TransformedData tables that you created in previous tutorial steps, in the list of recent streaming data.

1. Select the *TransformedData* table's more actions **...** menu, and select **Create Real-Time Dashboard (Copilot)**.

   :::image type="content" source="media/tutorial/tutorial-dashboard-create-dashboard.png" alt-text="Screenshot of the Create Real-Time Dashboard (Copilot) option." lightbox="media/tutorial/tutorial-dashboard-create-dashboard.png":::

1. A dialog box appears to show the AI-generation stages, and a link to review the [general preview terms](https://azure.microsoft.com/support/legal/preview-supplemental-terms). Select **Get started** to proceed.

    :::image type="content" source="media/tutorial/tutorial-dashboard-get-started.png" alt-text="Screenshot of the Generate a real-time dashboard with the get started button highlighted." lightbox="media/tutorial/tutorial-dashboard-get-started.png":::

    Watch the progression indicator as the AI generates the dashboard. This process may take a few moments. You can stop the process by selecting the **Stop dashboard generation** button.

1. You're prompted to name your new dashboard, and select the Workspace location. Enter *TutorialDashboardAI* and select **Create**.

    :::image type="content" source="media/tutorial/tutorial-dashboard-name-dashboard.png" alt-text="Screenshot of the Name your dashboard dialog with TutorialDashboardAI entered." lightbox="media/tutorial/tutorial-dashboard-name-dashboard.png":::

Copilot automatically generates the Copilot Insights page and Profile page, both with multiple tiles. The Insights page provides a quick overview of the data, while the Profile page offers detailed information about the data structure and statistics.

:::image type="content" source="media/tutorial/tutorial-dashboard-copilot-insights.png" alt-text="Screenshot of the AI-generated dashboard with multiple tiles." lightbox="media/tutorial/tutorial-dashboard-copilot-insights.png":::

--> 

## Add a new tile by using a query

Make sure that you're in **Editing** mode in the dashboard before beginning the following steps. If you're not in **Editing** mode, toggle from **Viewing** on the top right corner of the dashboard.

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

    :::image type="content" source="media/tutorial/final-dashboard.png" alt-text="Screenshot of final dashboard with two tiles." lightbox="media/tutorial/final-dashboard.png":::

1. Save the dashboard by selecting the **Save** icon on the top left corner of the dashboard.

## Customize tile visuals

The tile customization options depend on the type of visual you use. For example, with a bar chart, you can change the bar orientation, adjust axis labels, and more. With a table visual, you can add or remove columns, change column order, and apply sorting.

To customize the visualization of a tile on your dashboard, follow these steps:

1. Make sure you're in editing mode.

   :::image type="content" source="media/tutorial/tutorial-dashboard-edit-mode.png" alt-text="Screenshot of editing and viewing mode toggle." lightbox="media/tutorial/tutorial-dashboard-edit-mode.png":::

1. Select the **Edit** icon on the tile that you want to customize. The **Visual formatting** pane opens.

1. Edit the underlying query or the [visualization customization properties](dashboard-visuals-customize.md#customization-properties).

    :::image type="content" source="media/tutorial/tutorial-dashboard-customize.png" alt-text="Screenshot of the dashboard tile formatting options pane." lightbox="media/tutorial/tutorial-dashboard-customize.png":::

1. Select **Apply changes** to save your changes and return to the dashboard.

## Set an alert

You can set up [Activator](data-activator/activator-introduction.md) alerts on your Real-Time Dashboard tiles to get notified when certain conditions are met in your data. Set up an alert on the *Bike locations Map* tile to get notified when the number of bikes at any station exceeds a certain threshold.

1. From the new bar chart tile, select the Alert icon. Or, from the **More options** (three dots) menu, select **Set Alert**.

   :::image type="content" source="media/tutorial/tutorial-dashboard-set-alert.png" alt-text="Screenshot of the set alert option." lightbox="media/tutorial/tutorial-dashboard-set-alert.png":::

1. In the **Add rule** pane, enter the following information:

    | Field | Value |
    | --- | --- |
    | **Details** |
    | **Rule name** | *High Bike Count Alert* |
    | **Monitor** |
    | **Run query every** | *5 minutes* |
    | **Condition** |
    | **Check** | On each event grouped by* |
    | **Grouping field** | *No_Bikes* |
    | **When** | *BikepointID* |
    | **Condition** | *Is greater than* |
    | **Value** | *30* |
    | **Occurrence** | *Every time the condition is met* |
    | **Action** |
    | **Select action** | *Message to individuals* |
    | **To** | *Your Teams user name* |
    | **Headline** | *Activator alert High Bike Count Alert* |
    | **Notes** | *The condition for 'High Bike Count Alert' has been met* |
    | **Save location** |
    | **Workspace** | *The workspace where the tutorial resources reside* |
    | **Item** | *Tutorial* |

1. Select **Create**. When you see the success message, select **Open**.

   :::image type="content" source="media/tutorial/tutorial-dashboard-alert-open.png" alt-text="Screenshot alert summary with the open button highlighted." lightbox="media/tutorial/tutorial-dashboard-alert-open.png":::

1. From the Activator Alerts page, you can view and manage your alert definitions, see analytics, and alert history. 

   For more details, see [Create alerts for a Real-Time Dashboard](data-activator/activator-get-data-real-time-dashboard.md).

## Share the dashboard

When you share a real-time dashboard, you can specify if the user can view, edit, or share. These permissions are for the real-time dashboard itself and not the underlying data.

Share the database first, and then share the dashboard.

1. Open the **Tutorial** eventhouse, select **Databases**, and select the **Share** button.

   :::image type="content" source="media/tutorial/tutorial-share-databases.png" alt-text="Screenshot of the Tutorial database share configuration screen." lightbox="media/tutorial/tutorial-share-databases.png":::

1. Enter the name or email address of the user or group you want to share the dashboard with. Add a message if desired, and select **Grant**.

1. Open the **TutorialDashboard**, and select the **Share** button.

   :::image type="content" source="media/tutorial/tutorial-dashboard-share.png" alt-text="Screenshot of the Tutorial dashboard share configuration screen." lightbox="media/tutorial/tutorial-dashboard-share.png":::

1. Authorize the same user or group you shared the database with, set the permission level, add a message if desired, and select **Send**.

## Related content

For more information about tasks performed in this tutorial, see:
* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
* [arg_max() function](/azure/data-explorer/kusto/query/arg-max-aggregation-function?context=/fabric/context/context-rti&pivots=fabric)
* [render operator](/azure/data-explorer/kusto/query/render-operator?context=/fabric/context/context-rti&pivots=fabric)

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 7: Detect anomalies on an Eventhouse table](tutorial-7-create-anomaly-detection.md)
