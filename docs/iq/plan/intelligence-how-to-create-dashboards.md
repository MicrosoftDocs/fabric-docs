---
title: Design Dashboards with Charts, KPIs, and Matrices
description: Build interactive dashboards on your semantic models using 100+ chart types, KPI cards, matrices, and filters. Learn how to create a custom dashboard in intelligence sheets, step by step.
ms.date: 07/10/2026
ms.topic: how-to
---

# Build a dashboard in intelligence sheets

Build interactive dashboards directly on your semantic models using more than 100 chart types, tables, matrices, KPI cards, and filters. The intelligence sheet offers a wide range of customization options to suit your reporting needs. In this article, you learn how to build a sample dashboard using the different components in an intelligence sheet.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you start designing a dashboard, make sure that you create an intelligence sheet and import the data you need.

## Create a dashboard

Combine charts, KPI cards, tables, matrices, and filters to create dashboards tailored to your business requirements.

1. Add a line chart to project the revenue, profit, and cost over five years. Select **Charts 100+** and select **Line**. Assign the axis dimensions and measures. Select the focus icon to customize the chart.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/add-line-chart.png" alt-text="Screenshot of assigning measures and dimensions to plot a line chart." lightbox="media/intelligence-how-to-create-dashboards//add-line-chart.png":::

1. In the **Line** ribbon, go to **Settings** > **Canvas**. Set the **Line type** to **Spline**. Customize the line and marker in the **Category format** section. Select **Back to Sheet** to return to the dashboard.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/customize-line-chart.png" alt-text="Screenshot of customizing the color and type of the line chart." lightbox="media/intelligence-how-to-create-dashboards/customize-line-chart.png":::

1. In the **Visualizations** tab, search for *Marimekko* and select **Vertical stacked marimekko** to compare revenue and margin proportions across product categories.
1. Assign the height and width measures, axis, and stacked dimensions to plot the marimekko.
1. Select a stack to use the on-object interaction menu. Apply basic customizations to the series color, font, data labels, and borders directly in the canvas without switching to focus mode.


    :::image type="content" source="media/intelligence-how-to-create-dashboards/add-marimekko-chart.png" alt-text="Screenshot of adding a marimekko chart and assigning the height and width measures." lightbox="media/intelligence-how-to-create-dashboards/add-marimekko-chart.png":::

1. Plot an integrated variance chart to compare the revenue and prior year revenue over five years. Select **Integrated variance column** in the **Visualizations** pane and configure the measures and dimensions. The chart automatically shows the variance between the current and prior year revenue.
1. Select the x-axis title and choose the **Hide** option from the menu.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/add-integrated-variance-chart.png" alt-text="Screenshot of adding an integrated variance chart." lightbox="media/intelligence-how-to-create-dashboards/add-integrated-variance-chart.png":::

1. Select the **Filter** icon. Select the **Year** section to expand it and select the past five years in the **Basic** tab.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/filter-years.png" alt-text="Screenshot of filtering data for five years." lightbox="media/intelligence-how-to-create-dashboards/filter-years.png":::

1. Add matrices to show detailed data in rows and columns and to compare and analyze individual records. In the **Visualizations** pane, select **Matrix** and assign dimensions and measures.

    > [!NOTE]
    > Assign actuals to the **Values (AC)** data well and prior year (PY), plan (PL), and forecast (FC) measures to the respective data wells to automatically calculate the variances.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/add-table.png" alt-text="Screenshot of adding a matrix visual." lightbox="media/intelligence-how-to-create-dashboards/add-table.png":::

1. Select the **Focus** icon to customize the table.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/customize-table.png" alt-text="Screenshot of focus mode for tables." lightbox="media/intelligence-how-to-create-dashboards/customize-table.png":::

1. Intelligence sheets automatically calculate variances based on the assigned measures. To show the variance columns, go to the **Matrix** tab, select **Show Columns**, and choose the required variance columns.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/show-columns.png" alt-text="Screenshot of showing variance columns." lightbox="media/intelligence-how-to-create-dashboards/show-columns.png":::

1. In the **Data** ribbon, go to **Insert Column** > **Formula**. Create a formula column to calculate the *implied price*.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/insert-formula.png" alt-text="Screenshot of inserting a formula measure." lightbox="media/intelligence-how-to-create-dashboards/insert-formula.png":::

1. Select a header, row dimension, or cell and go to the **Format** ribbon to customize the matrix.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/edit-header.png" alt-text="Screenshot of customizing matrix visuals and applying a header color." lightbox="media/intelligence-how-to-create-dashboards/edit-header.png":::

1. Select **KPIs** in the **Visualization** pane. To show a key metric in a KPI card, assign the measure to the **Actual(s)** field. Assign plan, previous year actuals, and forecast measures to the comparison data wells. The intelligence sheet automatically calculates and shows the corresponding variances in red and green.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/add-kpi.jpg" alt-text="Screenshot of adding a KPI card to the dashboard." lightbox="media/intelligence-how-to-create-dashboards/add-kpi.jpg":::

1. Select a card, hover over it, and then select the **Edit** icon to customize the KPI. Change the font style, add formulas, and insert charts.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/edit-kpi.png" alt-text="Screenshot of customizing KPI cards." lightbox="media/intelligence-how-to-create-dashboards/edit-kpi.png":::

1. Select the card, select **More options(...)**, and select **Duplicate** to create a copy of the card. Change the actuals and comparison assignments to a different metric. Repeat this process to create cards with uniform formatting for each metric.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/duplicate-card.png" alt-text="Screenshot of duplicating dashboard elements." lightbox="media/intelligence-how-to-create-dashboards/duplicate-card.png":::

1. Add text summaries to explain trends, results, and business outcomes shown in the dashboard. In the **Intelligence** ribbon, go to **Elements** > **Text** to insert a text box. Select the edit icon to format your text. Alternatively, select the text and use the floating toolbar.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/add-text-box.jpg" alt-text="Screenshot of adding a textbox and using the rich text editor." lightbox="media/intelligence-how-to-create-dashboards/add-text-box.jpg":::

1. Select an element and use the drag handle to reposition it on the dashboard.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/move-components.jpg" alt-text="Screenshot of repositioning components in the dashboard." lightbox="media/intelligence-how-to-create-dashboards/move-components.jpg":::

1. Select an element and go to the **Visual** tab in the corresponding ribbon to apply formatting such as borders and shadows.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/add-border-shadow.jpg" alt-text="Screenshot of applying borders and shadows for each element in the dashboard." lightbox="media/intelligence-how-to-create-dashboards/add-border-shadow.jpg":::

1. In the **Intelligence** ribbon, select **Elements**, and then insert shapes and text boxes to create a custom dashboard header.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/create-header.png" alt-text="Screenshot of adding a custom dashboard header." lightbox="media/intelligence-how-to-create-dashboards/create-header.png":::

1. Add comments to dashboards to provide context directly within the data. Select a cell, row, or column in a table or matrix, or select a data point in a chart. Select **Comment**, and then use the rich text editor to format the content. Assign comments to other users to collaborate on the dashboard.

    :::image type="content" source="media/intelligence-how-to-create-dashboards/add-data-point-comments.png" alt-text="Screenshot of adding data point annotations to charts." lightbox="media/intelligence-how-to-create-dashboards/add-data-point-comments.png":::

    The following image shows the final dashboard:
    
   :::image type="content" source="media/intelligence-how-to-create-dashboards/final-dashboard.png" alt-text="Screenshot of the dashboard with charts, KPI cards, matrices, and text elements." lightbox="media/intelligence-how-to-create-dashboards/final-dashboard.png":::
 
