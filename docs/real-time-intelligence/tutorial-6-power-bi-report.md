---
title: Real-Time Intelligence tutorial part  6- Create a Power BI report
description: Learn how to create a Power BI report from your KQL queryset Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
#customer intent: I want to learn how to Create a Power BI report from your KQL queryset
---
# Real-Time Intelligence tutorial part 6: Create a Power BI report

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 5: Create a Real-Time dashboard](tutorial-5-create-dashboard.md).

A Power BI report is a multi-perspective view into a semantic model, with visuals that represent findings and insights from that semantic model. In this section, you use a KQL query output to create a new Power BI report.

## Build a Power BI report

1. Copy and paste the following query into your KQL queryset. The output of this query is used as the semantic model for building the Power BI report. 

    ```kusto
    TutorialTable
    | summarize arg_max(Timestamp, No_Bikes,  No_Empty_Docks, Neighbourhood, Lat=todouble(Latitude), Lon=todouble(Longitude)) by BikepointID
    ```

1. Select **Build Power BI report**. The Power BI report editor opens with the query result available as a data source named **Kusto Query Result**.

### Add visualizations to the report

1. In the report editor, select **Visualizations** > **Map** icon.
     :::image type="icon" source="media/tutorial/map-icon.png" border="false":::
1. Drag the following fields from **Data** > **Kusto Query Result** to the **Visualizations** pane.
    * **Lat** > **Latitude**
    * **Lon** > **Longitude**
    * **No_Bikes** > **Bubble size**
    * **Neighbourhood** > **Add drill-through fields here**

    :::image type="content" source="media/tutorial/report-generated.png" alt-text="Screenshot of Power BI report generation window in Real-Time Intelligence.":::

1. In the report editr, select **Visualizations** > **Stacked column chart** icon.
    :::image type="icon" source="media/tutorial/stacked-column-chart-icon.png" border="false":::
1. Drag the following fields from **Data** > **Kusto Query Result** to the **Visualizations** pane.
    * **Neighbourhood** > **X-axis**
    * **No_Bikes** > **Y-axis**
    * **No_Empty_Docks** > **Y-axis**

    :::image type="content" source="media/tutorial/second-visual-report.png" alt-text="Screenshot of adding the second visual, a column chart, to the report.":::

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
> [Tutorial part 7: Clean up resources](tutorial-7-clean-up-resources.md)