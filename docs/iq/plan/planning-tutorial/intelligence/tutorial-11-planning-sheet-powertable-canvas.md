---
title: Create a planning sheet, PowerTable, and canvas integration
description: Learn how to create a planning sheet with a simulation, embed it in an intelligence sheet, create a PowerTable, and display both on the same canvas.
ms.topic: tutorial
ms.date: 09/11/2026
---

# Fabric planning tutorial part 11: Create a planning sheet, PowerTable, and canvas integration

In this tutorial, you create a planning sheet named `Financial Plan`, add a simulation based on the **Plan** measure, and embed the planning sheet in an intelligence sheet. You then create a PowerTable named `Sales Detail`, connect it to the Enterprise Dataset semantic model, and embed it alongside the planning sheet.

## Prerequisites

Before you begin, ensure that you have:

- Access to a Microsoft Fabric workspace with planning and permission to create planning sheets, intelligence sheets, and PowerTable sheets.
- Access to the Enterprise Dataset semantic model.
- Completed [Build a P&L intelligence sheet](tutorial-10-build-profit-and-loss-intelligence.md).
- The Enterprise Dataset sample. You can download the sample from the [Fabric samples GitHub repository](https://github.com/jagan0506/fabric-samples/blob/add-plan-enterprise-dataset/docs-samples/iq/plan/Enterprise%20Dataset.pbix).

## Create a planning sheet

Create a planning sheet named `Financial Plan`, connect the account hierarchy and measures, and configure the display.

1. On the **Home** tab, select **New Planning Sheet**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/create-planning-sheet.png" alt-text="Screenshot of the Home tab with New Planning Sheet selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/create-planning-sheet.png":::

2. When prompted, enter `Financial Plan` as the name, and then select **Create**.

3. On the right, select the **Fields** tab.

4. In the **Data** pane, expand **[Dim] Account**, and then select **Account Hierarchy**.

5. Add **Account Hierarchy** to **Rows**.

6. Under **Measures** > **Financial** > **Base Measures**, add **Actuals**, **Plan**, and **Forecast** to **Values**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-planning-sheet-fields.png" alt-text="Screenshot of the Fields and Data panes with Account Hierarchy and Actuals, Plan, and Forecast selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-planning-sheet-fields.png":::

7. On the **Format** tab, select **Appearance**. Search for `Ragged`, and turn on **Ragged Hierarchy**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/enable-ragged-hierarchy.png" alt-text="Screenshot of the Appearance pane with Ragged Hierarchy search results and the toggle." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/enable-ragged-hierarchy.png":::

   Ragged hierarchy formatting displays the account hierarchy without showing blank levels for accounts that don't use every hierarchy level.

8. Select **Auto Fit** > **Fit to Content** to widen the columns to fit their content.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/fit-column-to-content.png" alt-text="Screenshot of the Auto Fit menu with Fit to Content selected for the planning sheet columns." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/fit-column-to-content.png":::

## Add a planning simulation

Insert a simulation column based on **Plan**, set its value range, and enter scenario adjustments.

1. Select the **Plan** column header.

2. On the **Planning** tab, select **Insert Column** > **Simulate**. If prompted to save the planning sheet, confirm the save and continue.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/insert-simulation-column.png" alt-text="Screenshot of the Planning tab with Insert Column and Simulate selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/insert-simulation-column.png":::

3. In the **Simulation** pane, keep **Simulation based on** set to **Plan**.

4. Set **Value Range** to `10`, and then select **Create**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-simulation-column.png" alt-text="Screenshot of the Simulation pane with Plan selected as the simulation basis and Value Range set to 10." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-simulation-column.png":::

   The **Plan (Simulation)** column appears on the planning sheet. The simulation provides an editable scenario value that is based on the selected measure. You can adjust values by using the slider or by entering a value directly in a cell.

5. In the **Plan (Simulation)** column, apply these adjustments:

   | Account | Adjustment | How to enter |
   | --- | --- | --- |
   | *Hardware Revenue* | +5% | Select the cell and enter the percentage increase, or use the simulation slider. |
   | *Subscription Revenue* | −2% | Select the cell and enter the percentage decrease, or use the simulation slider. |
   | *Advertising & Promotion* | −6% | Select the cell and enter the percentage decrease, or use the simulation slider. |
   | *Digital Marketing* | $120M | Select the cell, enter `120m`, and press Enter. |

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/enter-simulation-adjustments.png" alt-text="Screenshot of Plan Simulation cells showing percentage adjustments and a 120m value entered for Digital Marketing." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/enter-simulation-adjustments.png":::

6. Verify that the **Plan (Simulation)** column reflects the updated scenario. You can adjust additional cells if needed.

7. Select **Save**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/save-planning-sheet.png" alt-text="Screenshot of the planning sheet with Save selected after the simulation adjustments are entered." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/save-planning-sheet.png":::

## Embed the planning sheet in an intelligence sheet

Embed `Financial Plan` in the intelligence sheet so that users can edit the planning data and view related visuals on the same canvas.

1. In the **Explorer** tab, select the intelligence sheet that you created in the previous tutorial.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/switch-to-intelligence-sheet.png" alt-text="Screenshot of the Explorer tab showing the Intelligence sheet and Financial Plan sheet." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/switch-to-intelligence-sheet.png":::

2. On the **Visualization** tab, select **Planning**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/select-planning-visual.png" alt-text="Screenshot of the Visualizations pane with the Planning visual selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/select-planning-visual.png":::

3. In the sheet picker, select `Financial Plan`, and then select **Add**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/select-planning-sheet-to-embed.png" alt-text="Screenshot of the Select an Existing Planning Sheet window with Financial Plan selected and Add highlighted." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/select-planning-sheet-to-embed.png":::

4. Resize and reposition the embedded planning sheet alongside the existing visuals as needed.

## Add a KPI that uses the semantic model and planning sheet

Create a KPI that compares values from the semantic model with the simulated values from the embedded planning sheet.

1. On the **Visualization** tab, select **KPI Cards**, and then drag the visual onto the canvas.

2. In the KPI field well, add these fields from the semantic model:
   - **Comparison 1 (vs Actuals)**: **Measures** > **Financial** > **Base Measures** > **Plan**
   - **Comparison 2 (vs Actuals)**: **Measures** > **Financial** > **Base Measures** > **Actuals**
   - **Trellis Row**: **[Dim] Account** > **Account Level 3**

3. In the field well, expand **From Sheets** and select the embedded `Financial Plan` sheet.

4. Add **Plan (Simulation)** from **Financial Plan** to **Actuals**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-kpi-fields.png" alt-text="Screenshot of the KPI field well with Actuals using Plan Simulation from Financial Plan, Plan and Actuals as comparisons, and Account Level 3 as the trellis row." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-kpi-fields.png":::

5. Verify that the KPI displays **Plan (Simulation)** from the planning sheet alongside **Actuals** and **Plan**.

6. Change a value in the embedded planning sheet and verify that the **Plan (Simulation)** series updates in the KPI.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/test-live-kpi-update.png" alt-text="Screenshot of the intelligence sheet showing the embedded planning sheet and KPI after a simulation value is changed." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/test-live-kpi-update.png":::

   Changes to the simulation values are reflected in the KPI without recreating the visual.

## Create a PowerTable sheet

Create a PowerTable sheet named `Sales Detail` and create an app that stores PowerTable metadata in a Fabric SQL database.

1. In the plan, select **New PowerTable Sheet**. You can also select the **PowerTable** icon on the landing page.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/create-powertable-sheet.png" alt-text="Screenshot of the Home tab with New PowerTable Sheet selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/create-powertable-sheet.png":::

2. Enter `Sales Detail` as the name, and then select **Create**.

3. On the PowerTable welcome page, select **Create a New App**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/create-powertable-app.png" alt-text="Screenshot of the PowerTable welcome page with Create a New App selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/create-powertable-app.png":::

## Connect PowerTable to a Fabric SQL database

Connect the PowerTable app to a Fabric SQL database where app metadata is stored.

1. Under **Select a Connection**, select your Fabric SQL connection. If a suitable connection doesn't exist, create a new connection.

2. Under **Database Name**, select the Fabric SQL database where app metadata is stored, and then select **Add**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/select-fabric-sql-database.png" alt-text="Screenshot of the OneLake catalog with Fabric SQL databases available for selection." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/select-fabric-sql-database.png":::

3. Select **Connect**.

## Create the Sales Detail table

Create a new table and populate it from the Enterprise Dataset semantic model.

1. Select **New Table** > **New Table** (Import data and create a new table).

2. Select a **Schema**, and enter `Sales Detail` in **Table Name**.

3. Under **Import Data**, select **Connect To Semantic Model**.

4. Under **Select a Connection**, select your DMTS connection. Under **Semantic Model**, select **Enterprise Dataset**, and then select **Next**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-semantic-model-connection.png" alt-text="Screenshot of the Select Table window configured to import data from the Enterprise Dataset semantic model." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-semantic-model-connection.png":::

## Map fields and set the primary key

Map product and financial fields from the semantic model and use **Product Name** as the primary key.

1. In the **Configure Semantic Model** pane, use the semantic model tree to select fields.

2. Add these fields to **Fields**:
   - **[Dim] Product** > **Category**
   - **[Dim] Product** > **Product Name**

3. Add these measures to **Values**:
   - **Measures** > **Financial** > **Base Measures** > **Actuals**
   - **Measures** > **Financial** > **Base Measures** > **Plan**

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-powertable-semantic-model-fields.png" alt-text="Screenshot of the Configure Semantic Model panel with Category, Product Name, Actuals, and Plan mapped." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-powertable-semantic-model-fields.png":::

4. In the **Fields** list, select the three-dot menu next to **Product Name**, and then select **Set as Primary Key**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/set-product-name-primary-key.png" alt-text="Screenshot of the Product Name field menu with Set as Primary Key selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/set-product-name-primary-key.png":::

5. If needed, select the **Filter** tab to restrict the values that are imported.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/filter-imported-values.png" alt-text="Screenshot of the Filter tab with Hardware, SaaS, and Services selected for the Category filter." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/filter-imported-values.png":::

6. Select **Next**.

## Configure PowerTable columns

Review the detected column settings before creating the table.

1. Review the automatically detected settings for each column. Confirm or update the **Data Type**, **Input Type**, and **Display Name** as needed.

2. Confirm the primary key selection and enter default values where required.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-powertable-columns.png" alt-text="Screenshot of the Configure Table page showing column data types, input types, primary key, and default value settings." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/configure-powertable-columns.png":::

3. Select **Finish** to create the table.

4. Select **Save** to save the PowerTable sheet.

## Embed the PowerTable in the intelligence sheet

Add the `Sales Detail` PowerTable to the intelligence sheet alongside the embedded planning sheet.

1. In the **Explorer** tab, select the intelligence sheet.

2. On the **Visualization** tab, select **PowerTable**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/select-powertable-visual.png" alt-text="Screenshot of the Visualizations pane with PowerTable selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/select-powertable-visual.png":::

3. In the PowerTable picker, select `Sales Detail`, and then select **Add**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/select-powertable-to-embed.png" alt-text="Screenshot of the Select an Existing PowerTable window with Sales Detail selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/select-powertable-to-embed.png":::

4. Resize and reposition the PowerTable alongside the embedded planning sheet so that users can view the simulation and product-level detail on the same canvas.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/view-embedded-planning-and-powertable.png" alt-text="Screenshot of the intelligence sheet canvas showing the embedded planning sheet, KPI visuals, and Sales Detail PowerTable together." lightbox="../../media/planning-tutorial/intelligence/tutorial-11-planning-sheet-powertable-canvas/view-embedded-planning-and-powertable.png":::

## Outcome

You now have an intelligence sheet that:

- Includes a `Financial Plan` planning sheet with **Actuals**, **Plan**, and **Forecast** mapped to the **Account Hierarchy**.
- Includes a **Plan (Simulation)** column with a value range of `10` and four scenario adjustments.
- Displays simulation results in a KPI that combines semantic model data with data from the embedded planning sheet.
- Includes a `Sales Detail` PowerTable connected to the Enterprise Dataset semantic model.
- Uses **Product Name** as the primary key and includes configured PowerTable columns.
- Displays the planning sheet and PowerTable together on the intelligence sheet canvas.
