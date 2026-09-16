---
title: Introduction to intelligence sheets
description: Learn how to create an intelligence sheet in planning in Fabric, connect a semantic model, explore the interface, and build an interactive enterprise dashboard.
ms.topic: tutorial
ms.date: 09/08/2026
---

# Fabric planning tutorial part 9: Introduction to intelligence sheets

In this tutorial, you get a live SaaS Enterprise semantic model to build an interactive enterprise dashboard in a planning in Fabric environment.

An intelligence sheet is a canvas-based analysis layer that sits on top of a semantic model, a planning sheet, or PowerTable. It provides access to a visualization library that includes charts, matrices, KPI cards, Gantt charts, and filters without leaving the planning environment.

## Prerequisites

Before you begin, ensure you have:

- Access to a Microsoft Fabric workspace where you can create a plan and upload a semantic model.
- Permission to create and edit an intelligence sheet.
- The Enterprise Dataset sample PBIX file. Download it from the [Fabric samples GitHub repository](https://github.com/jagan0506/fabric-samples/blob/add-plan-enterprise-dataset/docs-samples/iq/plan/Enterprise%20Dataset.pbix).

## Business context

In this tutorial, you use the Enterprise Dataset semantic model to build an interactive enterprise dashboard.

Follow the tutorial in order:

1. **Set up and plan:** Connect the Enterprise Dataset semantic model and create a plan app.
2. **Overview of intelligence sheet:** Before building the dashboard, take a quick tour of the tabs and features to understand what is available and its purpose.
3. **Build a variance chart:** Use the Integrated Variance Bar Chart to compare Actuals versus Plan.
4. **Build a grouped line chart:** Use Actuals and Forecast with `Dim Date > Month Name`.
5. **Build a KPI card:** Use ProductName as the trellis to compare Actuals versus Plan.
6. **Interactivity and governance:** Build a date filter that is connected to all visuals, add a text header, and add a comment to complete the dashboard.

## Sample dataset

The SaaS Enterprise dataset models a mid-to-large software business
across multiple products, regions, and customer segments. It contains
1.8 million rows of transactional data structured as a star schema, with
fact tables linked to dimension tables through a shared semantic model.

All figures are synthetic but calibrated to produce meaningful variance analysis, realistic trend lines, and visible Actual vs Plan vs Forecast differences.

The dataset includes the following tables:

- Eight dimensions: *[Dim] Account, [Dim] Business Unit, [Dim]
    Customer Segment, [Dim] Date, [Dim] Department, [Dim]
    Geography, [Dim] Product, [Dim] Scenario*
- Three facts: *[Fact] Financial, [Fact] Invoice Line, [Fact]
    Operational*
- A *Measure* table, from which most measures are used.

## Import the sample semantic model

Import the Enterprise Dataset PBIX file into your Fabric workspace.

1. In your workspace folder, select **Import** > **Report, Paginated
    Report, or Workbook** > **From this computer**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/import-report-menu.jpg" alt-text="Screenshot of the Import menu with Report, Paginated Report, or Workbook and From this computer selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/import-report-menu.jpg":::

2. Select the Enterprise Dataset PBIX file, and then select **Open**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/select-enterprise-dataset-file.jpg" alt-text="Screenshot of the file picker with the Enterprise Dataset PBIX file selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/select-enterprise-dataset-file.jpg":::

3. Verify that the Enterprise Dataset report and semantic model appear
    in the workspace.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/enterprise-dataset-imported.jpg" alt-text="Screenshot of the workspace showing the imported Enterprise Dataset report and semantic model." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/enterprise-dataset-imported.jpg":::

> [!NOTE]
> Ensure that the Enterprise Dataset resource file is available before you continue.

## Create a plan

Create a plan to host the intelligence sheet.

1. In your workspace, select **New item**.

2. In the item list, search for `plan`, and then select **Plan
    (preview)**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/search-plan-item.jpg" alt-text="Screenshot of the New item pane with Plan (preview) selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/search-plan-item.jpg":::

3. In **New Plan**, enter `Financial-Plan` in **Name**, and then select
    **Create**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/create-plan.jpg" alt-text="Screenshot of New Plan with Financial-Plan entered as the name and Create selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/create-plan.jpg":::

The plan opens to a launch screen where you can connect a semantic model
or create a sheet.

The launch screen also provides options under **Create new sheet** for
Planning, PowerTable, and Intelligence sheets.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/plan-launch-screen.jpg" alt-text="Screenshot of the plan launch screen showing options to get started with a semantic model or create a sheet." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/plan-launch-screen.jpg":::

## Connect the semantic model

Connect the Enterprise Dataset semantic model to the plan.

1. On the launch screen, under **Get data**, select **Semantic Model**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/create-intelligence-sheet-option.jpg" alt-text="Screenshot of the launch screen showing Intelligence as an option under Create new sheet." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/create-intelligence-sheet-option.jpg":::

2. In **OneLake catalog**, select **Enterprise Dataset**, and then
    select **Add**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/select-enterprise-dataset.jpg" alt-text="Screenshot of OneLake catalog with Enterprise Dataset selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/select-enterprise-dataset.jpg":::

3. In **Select Semantic Model Connection**, select the shared cloud
    connection you want to use.

4. Under **Semantic Model**, verify that **Enterprise Dataset** is
    selected, and then select **Connect**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/semantic-model-connection.jpg" alt-text="Screenshot of Select Semantic Model Connection with a shared connection and Enterprise Dataset selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/semantic-model-connection.jpg":::

After the connection is established, the semantic model is added and its
tables are available in the **Data** pane.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/semantic-model-added.jpg" alt-text="Screenshot of the plan after the semantic model is added, showing the Enterprise Dataset tables in the Data pane." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/semantic-model-added.jpg":::

## Create an intelligence sheet

Create an intelligence sheet for the dashboard.

1. On the **Home** tab, select **New Intelligence Sheet**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/new-intelligence-sheet.jpg" alt-text="Screenshot of the Home tab with New Intelligence Sheet selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/new-intelligence-sheet.jpg":::

2. Enter a name for the intelligence sheet, and then create the sheet.

The new intelligence sheet opens with the canvas and visualization
controls.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/intelligence-canvas-overview.jpg" alt-text="Screenshot of a new intelligence sheet showing the canvas, Intelligence tab, Visualizations pane, and Data pane." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/intelligence-canvas-overview.jpg":::

## Explore the intelligence sheet interface

Before you build visuals, review the controls available in the
intelligence sheet.

### Review the canvas controls

On the **Intelligence** tab, review the controls that apply to the
entire canvas:

- **Canvas**: Adjust grid snapping, canvas size, and zoom level.
- **Layout**: Manage the canvas layout.
- **Elements**: Add text, shapes, buttons, and other elements.
- **Edit Interactions**: Define how filtering one visual affects other
    visuals on the canvas.
- **Notes**: Add notes to the canvas.
- **Settings**: Access sheet settings.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/canvas-layout-settings.jpg" alt-text="Screenshot of the Intelligence tab with canvas layout and page settings controls." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/canvas-layout-settings.jpg":::

### Review the filter pane

On the right side of the canvas toolbar, select the **Filter** icon.

The filter pane supports page-level filters that apply to visuals on the
sheet and global filters that apply across the workbook.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/filter-pane.jpg" alt-text="Screenshot of the filter pane showing page-level and global filter options." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/filter-pane.jpg":::

For example, you can add **Year** to the global filter and select `2025`
and `2026` to apply the filter across the dashboard.

### Review bookmarks

Select the **Bookmarks** icon located after the filter icon.

Bookmarks capture the current analytical view, including the filter state
and scroll position. In reading mode, users can save private bookmarks
and share specific views with colleagues.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/bookmarks-panel.jpg" alt-text="Screenshot of the Bookmarks panel showing page and global bookmark options." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/bookmarks-panel.jpg":::

### Review parameters

Select the **Parameters** option to review available parameter controls.

Parameters can store reusable values, such as a target margin
percentage, or support conditional display logic based on a user
selection.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/parameters-panel.jpg" alt-text="Screenshot of the Parameters panel showing that no parameters are currently configured." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/parameters-panel.jpg":::

### Review visualization types

The **Visualizations** pane provides the following visualization types:

- **Charts 100+**: Access a library of charts organized by chart family.
- **Planning**: Embed a planning sheet on the canvas.
- **PowerTable**: Embed a PowerTable sheet on the canvas.
- **Matrix**: Display hierarchical row and column data.
- **Table**: Display tabular data without a hierarchy.
- **Gantt**: Display Gantt and resource Gantt charts.
- **Super Filter**: Add interactive filters.
- **KPI**: Display key measures with KPI and trellis capabilities.

## Build a variance chart

Add a variance chart to compare actuals, plan, and forecast by
geography.

1. In the **Visualizations** pane, select **Charts 100+**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/search-variance-chart.jpg" alt-text="Screenshot of the Visualizations pane showing the Charts 100+ option and chart search controls." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/search-variance-chart.jpg":::

2. Search for `variance`, and then select **Integrated Variance Bar
    Chart**.

3. In the field well, map the following fields:

    - **Values (Actuals)**:
        `Measures > Financial > Base Measures > Actuals`
    - **Comparison 1 (vs Actuals)**:
        `Measures > Financial > Base Measures > Forecast`
    - **Comparison 2 (vs Actuals)**:
        `Measures > Financial > Base Measures > Plan`
    - **Category**: `Dim Geography > RegionName`
    - **Category**: `Dim Geography > CountryName`

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/map-variance-chart-fields.jpg" alt-text="Screenshot of the Integrated Variance Bar Chart with actuals, forecast, plan, RegionName, and CountryName mapped to the field wells." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/map-variance-chart-fields.jpg":::

The chart displays Actuals, Forecast, and Plan by region.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/variance-chart-by-region.jpg" alt-text="Screenshot of the variance chart showing Actuals, Forecast, and Plan by region." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/variance-chart-by-region.jpg":::

4. With the chart selected, use the visual header to drill down from
    **RegionName** to **CountryName**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/drill-down-variance-chart.jpg" alt-text="Screenshot of the variance chart with the drill-down control selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/drill-down-variance-chart.jpg":::

5. Use **Expand all** to display all hierarchy levels simultaneously.

6. Select a data label and use the on-object options to set **Scaling**
    to `Thousands`.

7. Select a bar and set **Series colours** to `#3f7aab`.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/format-variance-chart.jpg" alt-text="Screenshot of the variance chart after scaling and series color formatting are applied." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/format-variance-chart.jpg":::

## Build a grouped line chart

Add a grouped line chart to compare actuals and forecast over time.

1. In the **Visualizations** pane, select **Charts 100+**, expand
    **Line**, and select **Grouped line**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/select-line-chart.jpg" alt-text="Screenshot of the Visualizations pane with the Line chart family and Grouped/Clustered line option selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/select-line-chart.jpg":::

2. In the field well, map:

    - **Actuals**: `Measures > Financial > Base Measures > Actuals`
    - **Forecast**: `Measures > Financial > Base Measures > Forecast`
    - **Category**: `Dim Date > Month-Name`

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/map-line-chart-fields.jpg" alt-text="Screenshot of the grouped line chart field wells with Actuals, Forecast, and Month-Name mapped." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/map-line-chart-fields.jpg":::

The chart shows how Actuals and Forecast change over the selected time
range.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/grouped-line-chart.jpg" alt-text="Screenshot of the grouped line chart showing Actuals and Forecast by Month Name." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/grouped-line-chart.jpg":::

## Add a KPI card

Add a KPI card to compare Actuals and Plan for each product.

1. In the **Visualizations** pane, select **KPI**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/select-kpi-card.jpg" alt-text="Screenshot of the Visualizations pane with KPI selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/select-kpi-card.jpg":::

2. In the field well, map:

    - **Values (Actuals)**:
        `Measures > Financial > Base Measures > Actuals`
    - **Comparison 2 (vs Actuals)**:
        `Measures > Financial > Base Measures > Plan`
    - **Trellis Row**: `Dim Product > ProductName`

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/kpi-card-by-product.jpg" alt-text="Screenshot of the KPI card showing Actuals and Plan for each product." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/kpi-card-by-product.jpg":::

The KPI card tiles into one panel per product, providing an at-a-glance
comparison across the product portfolio.

## Add a matrix

Add a matrix to compare Actuals and Plan by product category and
subcategory over time.

1. In the **Visualizations** pane, select **Matrix**.

2. In the field well, map:

    - **Rows**: `ProductCategory`, `ProductSubCategory`
    - **Columns**: `Date > Year`, `Month`
    - **Values (Actuals)**: `Actuals`
    - **Compare to Prior Period (PY)**: `Plan`

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/map-matrix-fields.jpg" alt-text="Screenshot of the Matrix field wells with product category, product subcategory, year, month, Actuals, and Plan mapped." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/map-matrix-fields.jpg":::

3. On the **Matrix** tab, select **Show Columns**, and then enable
    **Variance** and **Variance %**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/matrix-with-variance.jpg" alt-text="Screenshot of the Matrix visual showing Actuals, Plan, Variance, and Variance percentage columns." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/matrix-with-variance.jpg":::

The variance and variance percentage columns are added automatically.

## Add a date filter

Add a Super Filter visual that users can use to select a date range for the
dashboard.

1. In the **Visualizations** pane, select **Super Filter**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/select-super-filter.jpg" alt-text="Screenshot of the Visualizations pane with Super Filter selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/select-super-filter.jpg":::

2. Map the `Date` dimension to the field well.

3. Select the pencil icon to open the properties for the Super Filter.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/map-super-filter.jpg" alt-text="Screenshot of the Super Filter visual with the Date field mapped." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/map-super-filter.jpg":::

4. In **Properties**, set the filter **Type** to **Date**.

5. Set the date mode to **Calendar**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/super-filter-properties.jpg" alt-text="Screenshot of Super Filter properties with Date and Calendar selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/super-filter-properties.jpg":::

6. Select a date range in the Super Filter.

The variance chart, grouped line chart, KPI card, and matrix update to
reflect the selected period.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/dashboard-with-date-filter.jpg" alt-text="Screenshot of the dashboard with the Super Filter date range applied to the visuals." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/dashboard-with-date-filter.jpg":::

## Add a dashboard header

Add a title to identify the dashboard.

1. On the **Intelligence** tab, select **Elements** > **Text**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/intelligence-elements-menu.jpg" alt-text="Screenshot of the Intelligence tab with Elements expanded and Text selected." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/intelligence-elements-menu.jpg":::

2. Enter `SaaS Enterprise - Financial Performance Dashboard`.

3. Use the formatting options to increase the font size and apply bold formatting.

4. Position the text box at the top of the canvas.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/add-dashboard-header.jpg" alt-text="Screenshot of the dashboard with the financial performance title added at the top of the canvas." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/add-dashboard-header.jpg":::

## Add a comment

Add a comment to a data point and tag a colleague.

1. Select a cell or data point in the matrix.

2. On the top ribbon, select **Comments**, and then select **Add new
    comment**.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/comments-menu.jpg" alt-text="Screenshot of the Comments menu showing Add new comment and View all comments." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/comments-menu.jpg":::

3. Enter a comment and use `@` followed by a colleague's name to tag
    them.

4. Press Enter to post the comment.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/add-comment.jpg" alt-text="Screenshot of the matrix showing a comment added to a data point." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/add-comment.jpg":::

Commentary in intelligence sheets is context-aware and respects the
current filter state. You can add comments at the cell, row, column, or
report level.

## Outcome

You now have an interactive enterprise dashboard that:

- Connects an intelligence sheet to the SaaS Enterprise semantic
    model.
- Uses the **Intelligence** tab and visual-level controls to configure
    the canvas and visuals.
- Includes a variance chart with drill-down and formatting.
- Includes a grouped line chart, KPI card, and matrix.
- Uses a date filter to update the dashboard visuals.
- Includes a dashboard header.
- Uses comments to collaborate with colleagues.

:::image type="content" source="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/final-dashboard-preview.jpg" alt-text="Screenshot of the completed SaaS Enterprise financial performance dashboard with variance, trend, KPI, matrix, date filter, and header." lightbox="../../media/planning-tutorial/intelligence/tutorial-9-introduction-to-intelligence-sheets/final-dashboard-preview.jpg":::
