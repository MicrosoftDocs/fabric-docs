---
title: Configure and customize Layouts
description: Learn how to configure and customize layouts in Planning sheets to control structure, formatting, and data presentation. Optimize planning views for better analysis and usability.
ms.date: 04/10/2026
ms.topic: how-to
ai-usage: ai-assisted
#customer intent: As a user, I want to customize layouts in Planning sheet. 
---

# Customize Planning sheet layouts

Layout options control how data is structured and displayed in the report. You can configure both **table layouts** and **measure layouts** to customize how categories and values appear.

## Prerequisites

Before you configure layout options, ensure that you have the following:

* Access to a planning sheet with data loaded.
* Permissions to edit the Planning sheet.

## Configure table layouts

1. Open the Planning Sheet.
1. Go to **Layout options**.
1. Select the required **Layout**. Various types of [table](#types-of-table-layouts) and [measure layouts](#types-of-measure-layouts) are listed in the following screenshot.

   :::image type="content" source="media/planning-how-to-change-layouts/layout-option.png" alt-text="Screenshot showing the steps to open layouts." lightbox="media/planning-how-to-change-layouts/layout-option.png":::

## Types of table layouts

Table layouts determine how row categories are presented in the report.

### Hierarchy

Hierarchy view displays data in a hierarchical format with expand and collapse functionality. This is the default layout.

:::image type="content" source="media/planning-how-to-change-layouts/hierarchy-layout.png" alt-text="Screenshot showing the hierarchy layouts." lightbox="media/planning-how-to-change-layouts/hierarchy-layout.png":::

### Table

Table view displays data in a tabular format without hierarchical expansion for rows. Column hierarchies can still support expand and collapse.

:::image type="content" source="media/planning-how-to-change-layouts/table-layout.png" alt-text="Screenshot showing the table layouts." lightbox="media/planning-how-to-change-layouts/table-layout.png":::

### Tree layout

Use the tree layout to customize the structure and display of your data. The tree layout also helps you visualize absolute and relative variances between measures.

1. Go to **Home > Layout > Tree**.
2. In the **Configure Tree View** dialog, select the **Baseline** and **Comparison** measures and **Save**.

  :::image type="content" source="media/planning-how-to-change-layouts/tree-layout-configuration.png" alt-text="Screenshot showing the tree layouts configuration." lightbox="media/planning-how-to-change-layouts/tree-layout-configuration.png":::

After saving, the **Tree View** option is added to the toolbar. You can use these options to further customize the tree layout.

:::image type="content" source="media/planning-how-to-change-layouts/tree-layout.png" alt-text="Screenshot showing the tree layouts with tree view options." lightbox="media/planning-how-to-change-layouts/tree-layout.png":::

#### Tree view options

The **Tree View** provides the following options:

* **Quick format**: Choose the number scaling format.
* **Baseline**: Select the baseline measure.
* **Comparison**: Select the measure to compare against the baseline.
* **KPI**: Select key performance indicator measures.
* **Create scenario**: Create and simulate scenarios.
* **Compare scenario**: Compare multiple scenarios.
* **Display settings**: Customize the tree layout display.
  * **Node customization**: Preview and customize node scope, style, and components.
  * **Level configuration:** Customize node style settings at the dimension level.
  * **Appearance:** Configure font color, primary color, background color, and conditional formatting.

    :::image type="content" source="media/planning-how-to-change-layouts/display-settings.png" alt-text="Screenshot showing the display settings of tree layout." lightbox="media/planning-how-to-change-layouts/display-settings.png":::

#### Node actions

You can use the node menu to perform actions such as editing, viewing details, and adding comments.

1. Select a node in the view to open the node menu.
1. Select **More options** (**…**) on the node.

The node action menu appears. The following actions are available:

* **Pin node**: Pin the selected node for quick access.
* **Edit node**: Modify node properties such as name, aggregation, and formatting.
* **Simulate per period**: Run simulations for the node across periods when you create scenarios.
* **View details**: View additional information about the node.
* **Add comment**: Add comments to the node for collaboration.
* **Simulation lock**: Lock the node to prevent changes during simulation when you create a scenario.

:::image type="content" source="media/planning-how-to-change-layouts/node-settings.png" alt-text="Screenshot showing the node settings of tree layout." lightbox="media/planning-how-to-change-layouts/node-settings.png":::

##### Edit a node

You can edit a node to update its name, aggregation behavior, and formatting. See [Tree view options](#tree-view-options) for a list of display settings.

###### Update general settings

Under **General**, you can modify the following:

* **Row name**: Update the name of the node.
* **Include in total**: Include the node in the total calculation.

###### Update formatting

Under **Formatting**, you can configure how values are displayed:

* **Scale**: Select how values are scaled (for example, Auto).
* **Decimal points**: Specify the number of decimal places.
* **Prefix**: Add a prefix to values.
* **Suffix**: Add a suffix to values.

###### Apply changes

* Select **Apply** to save changes.
* Select **Cancel** to discard changes.

:::image type="content" source="media/planning-how-to-change-layouts/node-formatting.png" alt-text="Screenshot showing the node formatting of tree layout." lightbox="media/planning-how-to-change-layouts/node-formatting.png":::

Select a node to view additional information, such as **Trends**, **Details**, **Variance**, and **Dependents**, and to analyze performance over time and compare values against a baseline.

* **Trends**: Displays time-based performance.
* **Details**: Shows detailed data for the selected node.
* **Variance**: Highlights differences between actuals and comparison values.
* **Dependents**: Shows dependent elements related to the selected node.

You can also select between these view options:

* Select **Graph** to display a visual chart of trends.
* Select **Table** to view the same data in tabular format.

:::image type="content" source="media/planning-how-to-change-layouts/additional-information.png" alt-text="Screenshot showing the additional information of tree layout." lightbox="media/planning-how-to-change-layouts/additional-information.png":::

## Types of measure layouts

Measure layouts determine how values (measures) are displayed in the report.

### Measures in rows

This option displays measures as rows instead of columns. You can reorder measures by dragging rows or using the **Manage rows** option.

:::image type="content" source="media/planning-how-to-change-layouts/measure-rows.png" alt-text="Screenshot showing measures in rows." lightbox="media/planning-how-to-change-layouts/measure-rows.png":::

### Measures in columns

This option displays measures across columns above the column hierarchy categories.

:::image type="content" source="media/planning-how-to-change-layouts/measure-columns.png" alt-text="Screenshot showing measures in columns." lightbox="media/planning-how-to-change-layouts/measure-columns.png":::

### Ragged hierarchy

A ragged hierarchy is a hierarchy in which branches have an uneven number of levels.

Ragged hierarchies are also known as unbalanced hierarchies, as they contain uneven or unbalanced levels. The number of levels depends on the underlying data, as some members don't have values at all levels. Use this setting to improve readability in hierarchical views by hiding blank or placeholder rows.

#### Turn on ragged hierarchy

When ragged hierarchy is turned on, only available levels are displayed, and empty rows are removed.

1. Go to **Layout**.
1. Select **Ragged Hierarchy**.
1. Turn on **Ragged Hierarchy**.

  :::image type="content" source="media/planning-how-to-change-layouts/ragged-on.png" alt-text="Screenshot showing the ragged hierarchy enabled." lightbox="media/planning-how-to-change-layouts/ragged-on.png":::

When ragged hierarchy is turned on:

* **Hide blanks:** Hides missing levels based on value, category, or both.
* **Suppress zeros:** Hides rows with zero values.
* **Hide blank columns:** Hides columns with no data.

When ragged hierarchy is turned off:

* All levels are displayed, even if values or categories are missing.

  :::image type="content" source="media/planning-how-to-change-layouts/ragged-off.png" alt-text="Screenshot showing the ragged hierarchy disabled." lightbox="media/planning-how-to-change-layouts/ragged-off.png":::
