---
title: "Data Warehouse Tutorial: Create a Direct Lake Semantic Model and Power BI Report"
description: "In this tutorial, learn how to create a Direct Lake semantic model and a Power BI report."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 07/15/2025
ms.topic: tutorial
---

# Tutorial: Create a Direct Lake semantic model and Power BI report

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this tutorial, you will create a Direct Lake semantic model and a Power BI report.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse](tutorial-ingest-data.md)

## Create a semantic model

In this task, learn how to create a Direct Lake semantic model based the `Wide World Importers` warehouse.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. Open the `Wide World Importers` warehouse.

1. Select **New semantic model**.

1. In the **New semantic model** window, in the **Direct Lake semantic model name** box, enter `Sales Model`.

1. Expand the `dbo` schema, expand the **Tables** folder, and then check the `dimension_city` and `fact_sale` tables.

   :::image type="content" source="media/tutorial-power-bi-report/new-semantic-model-settings.png" alt-text="Screenshot of the New semantic model windows, highlighting the name box, and the selection of the dimension city and fact sale tables.":::

1. Select **Confirm**.

1. To open the semantic model, return to the workspace landing page, and then select the `Sales Model` semantic model.

1. To open the model designer, on the menu, select **Open data model**.

   :::image type="content" source="media/tutorial-power-bi-report/open-data-model.png" alt-text="Screenshot of the menu, highlighting the Open data model option.":::

1. To create a relationship, in the model designer, on the **Home** ribbon, select **Manage relationships**.

   :::image type="content" source="media/tutorial-power-bi-report/home-ribbon-manage-relationships.png" alt-text="Screenshot of the model designer Home ribbon, highlighting the Manage relationships option.":::

1. In the **Manage relationship** window, select **+ New relationship**.

   :::image type="content" source="media/tutorial-power-bi-report/new-relationship-window-new-relationship.png" alt-text="Screenshot of the New relationship window, highlighting the + New relationship button.":::

1. In the **New relationship window**, complete the following steps to create the relationship:

    1. In the **From table** dropdown list, select the `dimension_city` table.

    1. In the **To table** dropdown list, select the `fact_sale` table.

    1. In the **Cardinality** dropdown list, select **One to many (1:\*)**.

    1. In the **Cross-filter direction** dropdown list, select **Single**.

    1. Check the **Assume referential integrity** box.

       :::image type="content" source="media/tutorial-power-bi-report/new-relationship-settings.png" alt-text="Screenshot of the New relationship window, highlighting the settings.":::

    1. Select **Save**.

1. In the **Manage relationship** window, select **Close**.

## Create a Power BI report

In this task, learn how to create a Power BI report based on the semantic model you created in the [first task](#create-a-semantic-model).

1. On the **Home** ribbon, select **New report**.

   :::image type="content" source="media/tutorial-power-bi-report/home-ribbon-new-report-option.png" alt-text="Screenshot of the model designer Home ribbon, highlighting the New report option.":::

1. In the report designer, complete the following steps to create a column chart visual:

   1. In the **Data** pane, expand the `fact_sale` table, and then check the `Profit` field.

   1. In the **Data** pane, expand the `dimension_city` table, and then check the `SalesTerritory` field.

       :::image type="content" source="media/tutorial-power-bi-report/column-chart-visual.png" border="true" alt-text="Screenshot of the column chart visual showing sum of profit by sales territory.":::

   1. If necessary, resize the column chart visual by dragging the corner of the visual.

   :::image type="content" source="media/tutorial-power-bi-report/report-visual-layout-1.png" alt-text="Diagram of the report page layout showing the chart visual placed in the report page.":::

1. Select anywhere on the blank canvas to ensure that the column chart visual is no longer selected.

1. Complete the following steps to create a map visual:

   1. In the **Visualizations** pane, select the **Azure Map** visual.

      :::image type="content" source="media/tutorial-power-bi-report/visualizations-pane-map-visual.png" alt-text="Screenshot of the Visualizations pane, highlighting the Azure Map visual.":::

   1. In the **Data** pane, from inside the `dimension_city` table, drag the `StateProvince` fields to the **Location** well in the **Visualizations** pane.

      :::image type="content" source="media/tutorial-power-bi-report/drag-state-province-field-location-well.png" alt-text="Screenshot of the Data pane, highlighting the drag operation to the Location well.":::

   1. In the **Data** pane, from inside the `fact_sale` table, check the `Profit` field to add it to the map visual **Size** well.

   :::image type="content" source="media/tutorial-power-bi-report/azure-map-visual.png" border="true" alt-text="Screenshot of the map visual showing sum of profit by location.":::

1. If necessary, reposition and resize the map visual to place it beneath the column chart visual at the bottom-left region of the report page.

   :::image type="content" source="media/tutorial-power-bi-report/report-visual-layout-2.png" alt-text="Diagram of the report page layout showing the chart visual placed at the bottom-left region of the report page.":::

1. Select anywhere on the blank canvas to ensure that the map visual is no longer selected.

1. Complete the following steps to create a table visual:

   1. In the **Visualizations** pane, select the **Table** visual.

      :::image type="content" source="media/tutorial-power-bi-report/visualizations-pane-table-visual.png" alt-text="Screenshot of the Visualizations pane, highlighting the Table visual.":::

   1. In the **Data** pane, check the following fields:

       1. `SalesTerritory` from the `dimension_city` table
       1. `StateProvince` from the `dimension_city` table
       1. `Profit` from the `fact_sale` table
       1. `TotalExcludingTax` from the `fact_sale` table

   :::image type="content" source="media/tutorial-power-bi-report/table-visual.png" border="true" alt-text="Screenshot of the table visual showing four columns of data.":::

1. If necessary, reposition and resize the table visual to place it in an empty region of the report page.

   :::image type="content" source="media/tutorial-power-bi-report/report-visual-layout-3.png" alt-text="Diagram of the report page layout showing the table visual placed in the report page.":::

1. Verify that the completed design of the report page resembles the following image.

   :::image type="content" source="media/tutorial-power-bi-report/completed-report-design.png" alt-text="Screenshot of the completed design of the report page.":::

1. To save the report, on the **Home** ribbon, select **File** > **Save**.

1. In the **Save your report** window, in the **Enter a name for your report** box, enter `Sales Analysis`.

1. Select **Save**.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Generate a report from the OneLake catalog](tutorial-build-report-onelake-data-hub.md)
