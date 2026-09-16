---

title: Build a P&L intelligence sheet

description: Learn how to build a P&L intelligence sheet to analyze financial performance using a Matrix visual, calculated rows, data input rows, and report formatting.

ms.topic: tutorial

ms.date: 09/01/2026

---

# Fabric planning tutorial part 10: Build a P&L intelligence sheet

In this tutorial, you build a P&L intelligence sheet by using the Enterprise Dataset semantic model. You create a financial matrix, add calculated and input rows, organize and format the report, add approval and stakeholder fields, and export the completed P&L.

## Prerequisites

Before you begin, ensure you have:

- Access to a Microsoft Fabric workspace with Fabric plan and permission to work with intelligence sheets.
- Access to the semantic model used in this tutorial.
- Completed [Introduction to intelligence sheets](tutorial-9-introduction-to-intelligence-sheets.md).

## Business context

You are a BI analyst at a SaaS company. Your team needs a P&L statement to analyze financial performance across products and business dimensions.

In this tutorial, you build the P&L statement in an intelligence sheet, add calculated and input rows, organize confidential information, add approval and stakeholder fields, and prepare the report for sharing and export.

In this tutorial, you:

1. Create a P&L intelligence sheet and configure a Matrix visual.
2. Add calculated and data input rows to the P&L.
3. Group, hide, reorder, and format rows and columns.
4. Add Approval Status and Stakeholder columns.
5. Add a report header and logo.
6. Export the completed P&L to Excel and PDF.

## Sample dataset

This tutorial uses the Enterprise Dataset semantic model to build the P&L statement.

If you didn't already import the dataset, follow the steps in [Introduction to intelligence sheets](tutorial-9-introduction-to-intelligence-sheets.md).

## Create the intelligence sheet and map data

Create an intelligence sheet, connect the Enterprise Dataset semantic model, add a Matrix visual, map the financial measures and account hierarchy, and apply the Financial template.

1. On the **Home** tab, select **New Intelligence Sheet**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-semantic-model.png" alt-text="Screenshot of the Home tab with New Intelligence Sheet selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-semantic-model.png":::

2. In **OneLake catalog**, select **Enterprise Dataset**, and then select **Add**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-enterprise-dataset.png" alt-text="Screenshot of Enterprise Dataset selected in the OneLake catalog semantic model list." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-enterprise-dataset.png":::

3. In **Select Semantic Model Connection**, select the shared cloud connection you want to use. If you need a new connection, select **Create Connection** and complete the connection setup.

4. Verify that **Semantic Model** is selected and that **Enterprise Dataset** is selected, and then select **Connect**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/connect-semantic-model.png" alt-text="Screenshot of the Select Semantic Model Connection window with Enterprise Dataset and Connect." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/connect-semantic-model.png":::

5. After the semantic model is connected, select **New Intelligence Sheet**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-intelligence-sheet.png" alt-text="Screenshot of the Home tab with New Intelligence Sheet selected after the semantic model is connected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-intelligence-sheet.png":::

6. In **New Intelligence Sheet**, enter `P&L Statement` as the name, and then select **Create**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/name-intelligence-sheet.png" alt-text="Screenshot of the New Intelligence Sheet window with P&L Statement as the name." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/name-intelligence-sheet.png":::

7. In the **Visualizations** pane, select **Matrix**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-matrix-visual.png" alt-text="Screenshot of the Visualizations pane with Matrix selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-matrix-visual.png":::

8. Map the data to the Matrix visual:

   - In the **Data** pane, expand **Semantic Model** > **Measure** > **Financial** > **Base Measures**. Add **Actuals** to **Values (AC)** and **Plan** to **Compare to Plan (PL)**.

   - Under **[Dim] Account**, expand **Account Hierarchy** and add the hierarchy to **Rows**. The hierarchy includes the account levels used by the matrix.

   - Under the date dimension, add **Time** to **Columns**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/map-matrix-fields.png" alt-text="Screenshot of the Data pane showing Actuals, Plan, and Account Hierarchy mapped to the Matrix visual." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/map-matrix-fields.png":::

9. On the **Matrix** tab, select **Templates**, and then select **Financial**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/apply-financial-template.png" alt-text="Screenshot of the Matrix tab with the Financial template selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/apply-financial-template.png":::

   The Financial template applies indentation, subtotals, and bold formatting to parent rows.

## Add calculated and input rows

Add rows that aren't part of the semantic model: Gross Margin %, Shares Outstanding, and Earnings Per Share.

### Insert a calculated row: Gross Margin %

Create a calculated row to show gross margin as a percentage of revenue.

1. On the **Data** tab, select **Insert Row** > **Formula**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-gross-margin-formula.png" alt-text="Screenshot of the Data tab with Formula selected and the Calculated Row pane open." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-gross-margin-formula.png":::

2. In the **Calculated Row** pane, enter `Gross Margin %` in **Title**.

3. In **Formula**, enter `([Revenue] - [Cost of Revenue / COGS]) / [Revenue]` using row references.

4. Set **Scaling Factor** to **None**, and then select **Create**.

5. Select the **Gross Margin %** row. On the **Matrix** tab, select the **%** button to format the row as a percentage.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/format-gross-margin-percentage.png" alt-text="Screenshot of the Gross Margin % row selected with the percentage formatting button highlighted." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/format-gross-margin-percentage.png":::

### Insert a static row: Shares Outstanding

Add a data input row for the number of shares used in the report.

1. Select the row gripper for **Revenue**, select **Insert**, and then select **Data Input**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/insert-data-input-row.png" alt-text="Screenshot of the row context menu with Insert and Data Input selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/insert-data-input-row.png":::

2. In the **Data Input** pane, enter `Shares Outstanding` in **Title**, and then select **Create**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-shares-outstanding-row.png" alt-text="Screenshot of the Data Input pane with Shares Outstanding entered as the title." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-shares-outstanding-row.png":::

3. Enter `100m` for **Actuals** and `150m` for **Plan**, pressing Enter after each value.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/enter-shares-outstanding-values.png" alt-text="Screenshot of Shares Outstanding values entered for Actuals and Plan." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/enter-shares-outstanding-values.png":::

### Insert a calculated row: Earnings Per Share

Create a calculated row that divides revenue by the number of shares outstanding.

1. On the **Data** tab, select **Insert Row** > **Formula**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/insert-calculated-row.png" alt-text="Screenshot of the Data tab with Formula selected for a new calculated row." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/insert-calculated-row.png":::

2. In the **Calculated Row** pane, enter `Earnings Per Share` in **Title**.

3. In **Formula**, enter `[Revenue] / [Shares Outstanding]`, and then select **Create**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/enter-eps-formula.png" alt-text="Screenshot of the Earnings Per Share formula using Revenue divided by Shares Outstanding." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/enter-eps-formula.png":::

4. Select the **Earnings Per Share** row. On the **Matrix** tab, select the **$€** button.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/apply-currency-format.png" alt-text="Screenshot of the Prefix / Suffix window with a dollar value prefix." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/apply-currency-format.png":::

5. In **Value prefix**, enter `$`, and then select **Apply**.

## Format and organize the report

Group related rows and columns, hide confidential rows, reorder the new rows, apply highlighting, and add gridlines.

### Group and hide confidential rows

Group sensitive rows together and hide them from the report view.

1. Select **Engineering Salaries** and **Product Management**. Use Ctrl-click to select both rows.

2. On the **Matrix** tab, select **Layout** > **Group** > **Create Group**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-confidential-group.png" alt-text="Screenshot of the Matrix Layout menu with Group and Create Group selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-confidential-group.png":::

3. In the group window, enter `Confidential` as the group name, and then create the group.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/name-confidential-group.png" alt-text="Screenshot of the Create Group window for the Confidential group." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/name-confidential-group.png":::

4. Select the gripper for the **Confidential** group, select **Actions**, and then select **Hide icon & children**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/hide-confidential-group-rows.png" alt-text="Screenshot of the row context menu with Actions and Hide icon & children selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/hide-confidential-group-rows.png":::

5. Select the **Confidential** row. On the **Format** tab, select **Font Color**, enter `#9467BD`, and then select **Save**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/view-hidden-rows.png" alt-text="Screenshot of the matrix after the confidential rows are hidden." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/view-hidden-rows.png":::

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/apply-font-color.png" alt-text="Screenshot of the Format tab with Font Color selected for the Confidential row." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/apply-font-color.png":::

### Group the metrics columns

Group the **Actuals** and **Plan** columns to organize the report metrics.

1. Ctrl+click the **Actuals** and **Plan** column headers.

2. On the **Matrix** tab, select **Layout** > **Group** > **Create Group**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-metrics-group.png" alt-text="Screenshot of the Matrix Layout menu with Group and Create Group selected for the metric columns." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-metrics-group.png":::

3. Enter `Metrics` as the group name, and then create the group.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/name-metrics-group.png" alt-text="Screenshot of the Create Group window for the Metrics group." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/name-metrics-group.png":::

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/view-metrics-group.png" alt-text="Screenshot of the matrix after the Metrics group is created." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/view-metrics-group.png":::

### Reorder and highlight rows

Reorder the added rows and highlight Earnings Per Share for easier identification.

1. Select **Shares Outstanding**, **Earnings Per Share**, and **Gross Margin %**, and drag them above **Revenue**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-rows-to-reorder.png" alt-text="Screenshot of the rows selected for reordering above Revenue." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-rows-to-reorder.png":::

2. Verify that the new rows appear above **Revenue**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/view-reordered-rows.png" alt-text="Screenshot of the reordered P&L rows above Revenue." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/view-reordered-rows.png":::

3. Select **Earnings Per Share**. On the **Format** tab, select **Fill Color**, enter `#9467BD`, and then select **Save**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-fill-color.png" alt-text="Screenshot of the Format tab with the Fill Color control set to #9467BD." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-fill-color.png":::

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/apply-fill-color.png" alt-text="Screenshot of the Earnings Per Share row highlighted with the fill color." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/apply-fill-color.png":::

### Add gridlines and apply report colors

Apply gridlines and report theme colors to improve the matrix layout.

1. On the **Format** tab, select **Major Gridlines**, and then select **Single**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/set-major-gridlines.png" alt-text="Screenshot of the Major Gridlines menu with Single selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/set-major-gridlines.png":::

2. Use the **Theme Colors** options on the **Format** tab to apply the organization’s report colors to the matrix.

## Add custom columns, report header, and export

Add **Approval Status** and **Stakeholder** columns, add a report header and logo, and export the completed P&L.

### Add Approval Status

Add a column to track the approval state of the report.

1. On the **Data** tab, select **List**, and then select **Single Select**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/insert-approval-status-column.png" alt-text="Screenshot of the Data tab with List and Single Select selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/insert-approval-status-column.png":::

2. In the **Data Input** pane, enter `Approval Status` in **Title**.

3. Select **Presets**, select **Approval Status**, and then select **Apply**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/configure-approval-status-column.png" alt-text="Screenshot of the Approval Status data input pane with the Approval Status preset selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/configure-approval-status-column.png":::

4. Select **Create**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-approval-status-column.png" alt-text="Screenshot of the Data Input pane with Create selected for Approval Status." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/create-approval-status-column.png":::

### Add stakeholder

Add a column to assign report ownership to a stakeholder.

1. On the **Data** tab, select **Person**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/insert-stakeholder-column.png" alt-text="Screenshot of the Data tab while adding the Stakeholder column." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/insert-stakeholder-column.png":::

2. In the **Data Input** pane, enter `Stakeholder` in **Title** and select **Person** for **Input type**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/configure-stakeholder-person-column.png" alt-text="Screenshot of the Data Input pane with Stakeholder as the title and Person selected as the input type." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/configure-stakeholder-person-column.png":::

3. Select **Create**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/view-custom-columns.png" alt-text="Screenshot of the matrix with Approval Status and Stakeholder columns added." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/view-custom-columns.png":::

4. In a stakeholder cell, enter `@` followed by a user's name to search the organization directory and assign ownership.

### Add a report header

Add a report header with a title and logo to identify the finished report.

1. On the **Format** tab, select **Header & Footer**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/open-header-footer-formatting.png" alt-text="Screenshot of the Format tab with Header & Footer selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/open-header-footer-formatting.png":::

2. The **Header & Footer** tab opens. Select **Presets**, and then select **Header**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-header-preset.png" alt-text="Screenshot of the Header & Footer tab with the Header preset selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-header-preset.png":::

3. Select the report title container and change the title to `Profit and Loss Statement`.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/set-report-title.png" alt-text="Screenshot of the report header with Profit and Loss Statement entered as the title." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/set-report-title.png":::

4. Select the **Your Logo** container and select **Replace Image**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/replace-report-logo.png" alt-text="Screenshot of the report header with the Your Logo container selected for replacement." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/replace-report-logo.png":::

5. Upload the `Contoso` logo image and select **Save**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/upload-contoso-logo.png" alt-text="Screenshot of the report header with the Contoso logo applied." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/upload-contoso-logo.png":::

### Export the report

Export the completed report to Excel and PDF for sharing and offline use.

1. On the **Matrix** tab, select **Export**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-excel-export.png" alt-text="Screenshot of the Matrix tab with Export selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/select-excel-export.png":::

2. In the **Export** window, select **Excel**.

3. To preserve the matrix hierarchy for interactive expansion and collapse, select **With Expand/Collapse**. Select **Entire Matrix**, and then select **Export**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/configure-excel-export.png" alt-text="Screenshot of the Export window with Excel and With Expand/Collapse selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/configure-excel-export.png":::

4. When the download is ready, open or save the Excel file from your browser's Downloads notification.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/download-excel-export.png" alt-text="Screenshot of the browser Downloads notification for the exported Excel file." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/download-excel-export.png":::

5. Repeat the export and select **PDF** in the **Export** window. Select **Entire Matrix**, and then select **Export**.

   :::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/download-pdf-export.png" alt-text="Screenshot of the Export window with PDF selected and the browser Downloads notification." lightbox="../../media/planning-tutorial/intelligence/tutorial-10-build-profit-and-loss-intelligence/download-pdf-export.png":::

## Outcome

You now have a P&L intelligence sheet that:

- Uses the Enterprise Dataset semantic model with a Matrix visual and Financial template.
- Includes calculated and input rows for Gross Margin %, Shares Outstanding, and Earnings Per Share.
- Groups, hides, reorders, and formats P&L rows and columns.
- Includes Approval Status and Stakeholder fields.
- Includes a report header and logo.
- Can be exported to Excel and PDF.
