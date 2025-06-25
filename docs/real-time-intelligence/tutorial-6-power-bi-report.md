---
title: Real-Time Intelligence tutorial part 6 - Create a Power BI report
description: Learn how to create a Power BI report from your KQL queryset Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 11/19/2024
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to Create a Power BI report from your KQL queryset
---
# Real-Time Intelligence tutorial part 6: Create a Power BI report

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 5: Create a Real-Time dashboard](tutorial-4-create-dashboard.md).

A Power BI report is a multi-perspective view into a semantic model, with visuals that represent findings and insights from that semantic model. In this section, you use a KQL query output to create a new Power BI report.

## Build a Power BI report

1. Browse to the KQL database you created in a previous step, named *Tutorial*.
1. In the object tree, under the KQL database name, select the query workspace called **Tutorial_queryset**.
1. Copy and paste the following query into the query editor. The output of this query is used as the semantic model for building the Power BI report. 

    ```kusto
    RawData
    | summarize arg_max(Timestamp, No_Bikes,  No_Empty_Docks, Neighbourhood, Lat=todouble(Latitude), Lon=todouble(Longitude)) by BikepointID
    ```

1. Select **Create Power BI report**. The Power BI report editor opens with the query result available as a data source named **Kusto Query Result**.

### Add visualizations to the report

1. In the report editor, select **Visualizations** > **Stacked column chart** icon.
    :::image type="icon" source="media/tutorial/stacked-column-chart-icon.png" border="false":::
1. Drag the following fields from **Data** > **Kusto Query Result** to the **Visualizations** pane.
    * **Neighbourhood** > **X-axis**
    * **No_Bikes** > **Y-axis**
    * **No_Empty_Docks** > **Y-axis**

    :::image type="content" source="media/tutorial/second-visual-report.png" alt-text="Screenshot of adding the second visual, a column chart, to the report." lightbox="media/tutorial/second-visual-report.png":::

### Save the report

1. In the top left corner of the ribbon, select **File** > **Save**.
1. Enter the name *TutuorialReport*. Choose your workspace, and set sensitivity as Public.
1. Select **Continue**.
1. Select **Open the file in Power BI to view, edit, and get a shareable link.**

## Related content

For more information about tasks performed in this tutorial, see:

* [Visualize data in a Power BI report](create-powerbi-report.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 6: Set an alert on your eventstream](tutorial-6-set-alert.md)
