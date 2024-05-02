---
title: Lakehouse tutorial - Build a report
description: After ingesting data, and using notebooks to transform and prepare the data, you create a Power BI data model and create a report.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/01/2024
---

# Lakehouse tutorial: Building reports in Microsoft Fabric

In this section of the tutorial, you create a Power BI data model and create a report from scratch.

## Prerequisites

Before you begin this tutorial, you need to complete these steps:

- [Create a lakehouse](tutorial-build-lakehouse.md)
- [Ingest data into the lakehouse](tutorial-lakehouse-data-ingestion.md)
- [Prepare and transform the data using notebooks and Spark runtime](tutorial-lakehouse-data-preparation.md)

## Build a report

Power BI is natively integrated in the whole Fabric experience. This native integration includes a unique mode, called DirectLake, for accessing the data from the lakehouse to provide the most performant query and reporting experience. DirectLake is a groundbreaking new capability that allows you to analyze very large semantic models in Power BI. With DirectLake, you load parquet-formatted files directly from a data lake without needing to query a data warehouse or lakehouse endpoint, and without needing to import or duplicate data into a Power BI semantic model. DirectLake is a fast path to load the data from the data lake straight into the Power BI engine, ready for analysis.

In traditional DirectQuery mode, the Power BI engine directly queries the data from the source for each query execution, and the query performance depends on the data retrieval speed. DirectQuery eliminates the need to copy data, ensuring that any changes in the source are immediately reflected in query results. On the other hand, in the import mode, the performance is better because the data is readily available in memory without having to query the data from the source for each query execution, however the Power BI engine must first copy the data into the memory at data refresh time. Any changes to the underlying data source are picked up during the next data refresh (in scheduled as well as on-demand refresh).

DirectLake mode now eliminates this import requirement by loading the data files directly into memory. Because there's no explicit import process, it's possible to pick up any changes at the source as they occur, thus combining the advantages of DirectQuery and import mode while avoiding their disadvantages. DirectLake mode is the ideal choice for analyzing very large semantic models and semantic models with frequent updates at the source.

1. From your **wwilakehouse** lakehouse, select **SQL analytics endpoint** from the **Lakehouse** drop-down menu at the top right of the screen.

   :::image type="content" source="media\tutorial-lakehouse-build-report\load-data-choose-sql-endpoint.png" alt-text="Screenshot showing where to find and select SQL analytics endpoint from the top right drop-down menu.":::

1. From the SQL endpoint pane, you should be able to see all the tables you created. If you don't see them yet, select the **Refresh** icon at the top. Next, select the **Model** tab at the bottom to open the default Power BI semantic model.

   :::image type="content" source="media\tutorial-lakehouse-build-report\warehouse-mode-refresh-model.png" alt-text="Screenshot showing where to select the Refresh icon and the Model tab.":::

1. For this data model, you need to define the relationship between different tables so that you can create reports and visualizations based on data coming across different tables. From the **fact_sale** table, drag the **CityKey** field and drop it on the **CityKey** field in the **dimension_city** table to create a relationship. The **New relationship** dialog box appears.

   :::image type="content" source="media\tutorial-lakehouse-build-report\drag-drop-tables-relationships.png" alt-text="Screenshot showing drag and drop fields across tables to create relationships.":::

1. In the **New relationship** dialog box:

   - Table 1 is populated with **fact_sale** and the column of CityKey.

   - Table 2 is populated with **dimension_city** and the column of CityKey.

   - Cardinality: **Many to one (\*:1)**.

   - Cross filter direction: **Single**.

   - Leave the box next to **Make this relationship active** selected.

   - Select the box next to **Assume referential integrity**.

   - Select **OK**.

      :::image type="content" source="media\tutorial-lakehouse-build-report\create-relationship-dialog.png" alt-text="Screenshot of the New relationship dialog box, showing where to select Assume referential integrity.":::

   > [!NOTE]
   > When defining relationships for this report, make sure you have a many to one relationship from the **fact_sale** table (Table 1) to the **dimension_\*** tables (Table 2) and not vice versa.

1. Next, add these relationships with the same **New relationship** settings shown in the previous step, but with the following tables and columns:

   - StockItemKey(fact_sale) - StockItemKey(dimension_stock_item)
   - Salespersonkey(fact_sale) - EmployeeKey(dimension_employee)
   - CustomerKey(fact_sale) - CustomerKey(dimension_customer)
   - InvoiceDateKey(fact_sale) - Date(dimension_date)

   After you add these relationships, your data model is ready for reporting as shown in the following image:

   :::image type="content" source="media\tutorial-lakehouse-build-report\new-report-relationships.png" alt-text="Screenshot of a New report screen showing multiple table relationships.":::

1. Select **New report** to start creating reports/dashboards in Power BI. On the Power BI report canvas, you can create reports to meet your business requirements by dragging required columns from the **Data** pane to the canvas and using one or more of available visualizations.

   :::image type="content" source="media\tutorial-lakehouse-build-report\report-canvas-drag-columns.png" alt-text="Screenshot of the Power BI report canvas, showing where to select columns in the Data pane." lightbox="media\tutorial-lakehouse-build-report\report-canvas-drag-columns.png":::

1. Add a title:
   1. In the Ribbon, select **Text box**.

   1. Type in **WW Importers Profit Reporting**.

   1. Highlight the text, increase the size to 20, and move it to the upper left of the report page.

1. Add a Card:
   1. On the **Data** pane, expand **fact_sale**, and check the box next to **Profit**. This selection creates a column chart and adds the field to the Y-axis.

   1. With the chart selected, select the **Card** visual in the visualization pane. This selection converts the visual to a card.

   1. Place the card under the title.

      :::image type="content" source="media\tutorial-lakehouse-build-report\card-visualization.png" alt-text="Screenshot showing a visual converted to a card." lightbox="media\tutorial-lakehouse-build-report\card-visualization.png":::

1. Add a Bar chart:
   1. On the **Data** pane, expand **fact_sales** and check the box next to **Profit**. This selection creates a column chart and adds the field to the X-axis.

   1. On the **Data** pane, expand **dimension_city** and check the box for **SalesTerritory**. This selection adds the field to the Y-axis.

   1. With the bar chart selected, select the **Clustered bar chart** visual in the visualization pane. This selection converts the column chart into a bar chart.

      :::image type="content" source="media\tutorial-lakehouse-build-report\build-visual-bar-chart.png" alt-text="Screenshot of the Build visual screen, showing where to select the Clustered bar chart icon.":::

   1. Resize the Bar chart and move it under the title and Card.

      :::image type="content" source="media\tutorial-lakehouse-build-report\resize-bar-chart-under-card.png" alt-text="Screenshot of a resized bar chart positioned below a card.":::

1. Click anywhere on the blank canvas (or press the Esc key) to deselect the bar chart.

1. Build a stacked area chart visual:
   1. On the **Visualizations** pane, select the **Stacked area chart** visual.

      :::image type="content" source="media\tutorial-lakehouse-build-report\stacked-area-chart.png" alt-text="Screenshot of the visualizations pane, showing where to select Stacked area chart.":::

   1. Reposition and resize the stacked area chart to the right of the card and bar chart visuals created in the previous steps.

   1. On the **Data** pane, expand **fact_sales** and check the box next to **Profit**. Expand **dimension_date** and check the box next to **FiscalMonthNumber**. This selection creates a filled line chart showing profit by fiscal month.

   1. On the **Data** pane, expand **dimension_stock_item** and drag **BuyingPackage** into the Legend field well. This selection adds a line for each of the Buying Packages.

      :::image type="content" source="media\tutorial-lakehouse-build-report\data-pane-change-chart.png" alt-text="Screenshot of the data pane showing how to add lines to the chart.":::

1. Click anywhere on the blank canvas (or press the Esc key) to deselect the stacked area chart.

1. Build a column chart:
   1. On the **Visualizations** pane, select the **Stacked column chart** visual.

      :::image type="content" source="media\tutorial-lakehouse-build-report\select-stacked-column-chart.png" alt-text="Screenshot showing where to select Stacked column chart.":::

   1. On the **Data** pane, expand **fact_sales** and check the box next to **Profit**. This selection adds the field to the Y-axis.

   1. On the **Data** pane, expand **dimension_employee** and check the box next to **Employee**. This selection adds the field to the X-axis.

      :::image type="content" source="media\tutorial-lakehouse-build-report\add-field-x-axis.png" alt-text="Screenshot showing how to add a field to the x axis.":::

1. Click anywhere on the blank canvas (or press the Esc key) to deselect the chart.

1. From the ribbon, select **File** > **Save**.

1. Enter the name of your report as **Profit Reporting**.

1. Select **Save**.

## Next step

> [!div class="nextstepaction"]
> [Clean up resources](tutorial-lakehouse-clean-up.md)
