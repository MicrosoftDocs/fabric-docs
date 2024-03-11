---
title: Data warehouse tutorial - create Power BI reports
description: In this tutorial step, learn how to create and save several types of Power BI reports with the data you ingested in earlier tutorial steps.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Tutorial: Create Power BI reports

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Learn how to create and save several types of Power BI reports.

## Create reports

1. Select the **Model** view from the options in the bottom left corner, just outside the canvas.

   :::image type="content" source="media\tutorial-power-bi-report\select-model-view.png" alt-text="Screenshot of the bottom left corner of the screen, showing where to select the Model view option.":::

1. From the `fact_sale` table, drag the `CityKey` field and drop it onto the `CityKey` field in the `dimension_city` table to create a relationship.

   :::image type="content" source="media\tutorial-power-bi-report\drag-field-drop-table.png" alt-text="Screenshot of two table field lists, showing where to drag a field from one table to another.":::

1. On the **Create Relationship** settings:

   1. Table 1 is populated with `fact_sale` and the column of `CityKey`.
   1. Table 2 is populated with `dimension_city` and the column of `CityKey`.
   1. **Cardinality**: select **Many to one (\*:1)**.
   1. **Cross filter direction**: select **Single**.
   1. Leave the box next to **Make this relationship active** checked.
   1. Check the box next to **Assume referential integrity**.

   :::image type="content" source="media\tutorial-power-bi-report\create-relationship-dialog.png" alt-text="Screenshot of the Create Relationship screen, showing the specified values and where to select Assume referential integrity.":::

1. Select **Confirm**.

1. From the **Home** tab of the ribbon, select **New report**.

1. Build a **Column chart** visual:

   1. On the **Data** pane, expand **fact_sales** and check the box next to **Profit**. This creates a column chart and adds the field to the Y-axis.
   1. On the **Data** pane, expand **dimension_city** and check the box next to **SalesTerritory**. This adds the field to the X-axis.
   1. Reposition and resize the column chart to take up the top left quarter of the canvas by dragging the anchor points on the corners of the visual.

      :::image type="content" source="media\tutorial-power-bi-report\new-visual-canvas-anchor.png" alt-text="Screenshot showing where to find the anchor point at the corner of a new visual report in the canvas screen." lightbox="media\tutorial-power-bi-report\new-visual-canvas-anchor.png":::

1. Select anywhere on the blank canvas (or press the `Esc` key) so the column chart visual is no longer selected.

1. Build a **Maps** visual:

   1. On the **Visualizations** pane, select the **Azure Map** visual.

      :::image type="content" source="media\tutorial-power-bi-report\visualizations-pane-arcgis-maps.png" alt-text="Screenshot of the Visualizations pane showing where to select the ArcGIS Maps for Power BI option.":::

   1. From the **Data** pane, drag **StateProvince** from the `dimension_city` table to the **Location** bucket on the **Visualizations** pane.
   1. From the **Data** pane, drag **Profit** from the `fact_sale` table to the **Size** bucket on the **Visualizations** pane.

      :::image type="content" source="media\tutorial-power-bi-report\drag-data-to-visualization.png" alt-text="Screenshot of the Data pane next to the Visualization pane, showing where to drag the relevant data.":::

   1. If necessary, reposition and resize the map to take up the bottom left quarter of the canvas by dragging the anchor points on the corners of the visual.

      :::image type="content" source="media\tutorial-power-bi-report\canvas-two-visual-reports.png" alt-text="Screenshot of the canvas next to the Visualization and Data panes, showing a bar chart and a map plot on the canvas." lightbox="media\tutorial-power-bi-report\canvas-two-visual-reports.png":::

1. Select anywhere on the blank canvas (or press the Esc key) so the map visual is no longer selected.

1. Build a **Table** visual:

   1. On the **Visualizations** pane, select the **Table** visual.

      :::image type="content" source="media\tutorial-power-bi-report\select-table-visualization.png" alt-text="Screenshot of the Visualizations pane showing where to select the Table option.":::

   1. From the **Data** pane, check the box next to **SalesTerritory** on the `dimension_city` table.
   1. From the **Data** pane, check the box next to **StateProvince** on the `dimension_city` table.
   1. From the **Data** pane, check the box next to **Profit** on the `fact_sale` table.
   1. From the **Data** pane, check the box next to **TotalExcludingTax** on the `fact_sale` table.
   1. Reposition and resize the column chart to take up the right half of the canvas by dragging the anchor points on the corners of the visual.

      :::image type="content" source="media\tutorial-power-bi-report\canvas-three-reports.png" alt-text="Screenshot of the canvas next to the Visualization and Data panes, which show where to select the specified details. The canvas contains a bar chart, a map plot, and a table." lightbox="media\tutorial-power-bi-report\canvas-three-reports.png":::

1. From the ribbon, select **File** > **Save**.

1. Enter **Sales Analysis** as the name of your report.

1. Select **Save**.

   :::image type="content" source="media\tutorial-power-bi-report\save-sales-analysis-report.png" alt-text="Screenshot of the Save your report dialog box with Sales Analysis entered as the report name.":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Build a report from the OneLake data hub](tutorial-build-report-onelake-data-hub.md)
