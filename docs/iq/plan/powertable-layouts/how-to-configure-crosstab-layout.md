---
title: Configure and Use Crosstab Layout in PowerTable
description: Crosstab layout in PowerTable arranges data in rows and columns to summarize multiple value fields. Learn how to configure fields, hierarchies, and totals.
#customer intent: As a PowerTable user, I want to enable crosstab layout to view the aggregated data across rows and columns and navigate the crosstab timeline and drill-down levels so that I can find the data I need quickly.
ms.date: 08/14/2026
ms.topic: how-to
---

# Configure and use crosstab layout

Use the crosstab layout to arrange data in rows and columns and summarize multiple value fields for easier comparison and analysis. If your dataset contains a category field along with multiple value fields, use the crosstab layout to organize the categories and measures in a matrix format.

The crosstab layout is useful for large datasets where a summarized view makes it easier to identify trends, relationships, and outliers without reviewing individual records.

## Use cases

Use the crosstab layout to:

* **Compare categories:** Compare values across different categories, such as products, regions, or departments.
* **Analyze trends:** Summarize values by date fields to identify changes over time.
* **Compare multiple measures:** View several value fields together to compare metrics across categories.
* **Identify outliers:** Quickly spot unusually high or low values in a summarized dataset.
* **Analyze relationships:** Examine how different categories and measures relate to each other in a matrix view.
* **Summarize large datasets:** Reduce a large number of records into a structured view for faster analysis.

## Prerequisites

To enable the crosstab layout, ensure the table meets the following requirements:

* Include an **identity primary key**.
* Include a **date** or **single-select** column to assign to the **Columns** field.
* Include at least one **Required** column, other than the primary identity key, to assign to the **Rows** field. Configure the column as **Required** when you create the table.

> [!IMPORTANT]
> * You can configure the primary key as an **Identity Column** only when you configure the table, as shown in the following image.
> * Similarly, configure the column as **Required** when you create and configure the table.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/configure-table-required-column.png" alt-text="Screenshot of Configure Table step showing column settings with Identity Column and Required checkboxes highlighted." lightbox="../media/powertable-layouts/how-to-configure-crosstab-layout/configure-table-required-column.png":::

> [!TIP]
> Configure columns that you want to assign to the **Values** field as **nullable** (clear **Required**) so they can accept blank values.

> [!NOTE]
> * Crosstab layout doesn't work in tables with composite primary keys.
> * Crosstab layout isn't supported for tables with type 2 and type 3 SCDs.

## Create crosstab layout

This section explains how to create the crosstab layout to organize and summarize data in a matrix format. In this example, you create a crosstab view for a *Sales Performance* table and organize sales data by category and date.

The sample table contains the following fields: *Sales Entry ID*, *Category*, *Sales Date*, *Revenue*, *Cost*, *Profit*, and *Units Sold*. You can organize **Sales Date** into a `Year → Quarter → Month` hierarchy and aggregate the value fields for comparison.

### Select crosstab

In the **PowerTable** tab, select **Layout** > **Crosstab**. The **Create Crosstab View** window opens.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/select-crosstab.png" alt-text="Screenshot of the PowerTable tab with the Layout menu open and Crosstab highlighted." lightbox="../media/powertable-layouts/how-to-configure-crosstab-layout/select-crosstab.png":::

### Assign fields

In the **Create Crosstab View** window, assign the required rows, columns, and values fields to configure the crosstab layout.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/configure-crosstab-fields-rows.png" alt-text="Screenshot of the Pivot Assignment tab showing Category as Row, Sales_Date as Column, and Profit and Units_Sold as Values." lightbox="../media/powertable-layouts/how-to-configure-crosstab-layout/configure-crosstab-fields-rows.png":::

Each field in the crosstab configuration determines how PowerTable groups, displays, or aggregates the data.

| **Field** | **Purpose** |
| --- | --- |
| **Row** | Groups data by categories, such as **Product** or **Region**. |
| **Column** | Groups data by categories or time periods. |
| **Values** | Displays and aggregates the measures you want to summarize, such as **Revenue** or **Cost**. |

To create the *Sales Performance* table by categories across the time period, assign the following columns to these fields:

**Row**: *Category*

**Column**: *Sales_Date*

**Values**: *Profit*, *Units Sold*

### Configure column

After selecting the columns in the **Columns** field, select the **Settings** icon next to it to configure the column hierarchy. Use the available options to define how you want to create, group, and display the hierarchy, as shown in the following image.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/configure-column-hierarchy.png" alt-text="Screenshot of column hierarchy settings with Interval Type set to Week, Start of Financial Year January, and Show Aggregated Values on.":::

#### Interval Type

Use this option to select how you want to group the data in columns. Choose **Date**, **Week**, **Month**, **Quarter**, or **Year** to group the data by day, week, month, quarter, or year, respectively.

#### Start of the week

Select the day on which you want the week to start.

#### Select Range

Use the date picker to select the date range that you want to include and display in the crosstab layout. Both the dates and data outside this range aren't displayed.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/select-range.png" alt-text="Screenshot of Pivot Assignment tab with Interval Type set to Month and Select Range date picker open showing 2025 months Jan to Dec selected.":::

#### Start of Financial Year

Select the month on which you want the financial year to begin in the layout.

#### Show Aggregated Values

Enable **Show Aggregated Values** to display the summarized value for the selected interval.

For example, consider the **Interval Type** set to **Quarter**:

* When **Show Aggregated Values** is enabled, PowerTable displays the aggregated value for all three months in each quarter, such as **Q1**, **Q2**, **Q3**, and **Q4**.
* When disabled, PowerTable displays only the value from the first month of each quarter.

While editing data:

* When **Show Aggregated Values** is enabled, PowerTable calculates aggregated values from the values at the lowest granularity level. So, if you want to edit a value, drill down to the lowest level and enter the value.
* When **Show Aggregated Values** is disabled, you can't drill down to the lowest level. Instead, enter the value directly in the cell for the selected interval, such as **Q1**.

To learn more, see [edit cells and enter values](#edit-cells-and-enter-values).

#### Enable drill-down levels

Under **Enable drill-down levels**, select the levels that you want to display and navigate within the column hierarchy, such as **Year**, **Quarter**, **Month**, **Week**, and **Date**.&#x20;

Based on the selected **Interval Type**, configure the level at which the hierarchy starts and the lower levels that users can navigate through. For example, if you select **Month** as the **Interval Type**, you can display `Month` directly or create a hierarchy such as `Year → Month`, `Year → Quarter → Month`, or `Quarter → Month`.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/enable-drill-down-levels.png" alt-text="Screenshot of the Create Crosstab View dialog with Enable drill-down levels showing Year, Quarter, and Month checkboxes selected.":::

#### Drill-down format settings

Select the **Settings** icon next to a drill-down level to specify its display format. For example, select **YYYY** or **YY** for years and **MMM** or **MM** for months.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/format-drill-down-hierarchy-label.png" alt-text="Screenshot of the Format pop-up for the Year drill-down level, listing YYYY, YY, and FY YYYY options.":::

### Configure values

Values aggregate to **Sum** by default. To modify, select the vertical ellipsis (⋮) next to the **Values** field and choose an aggregation type, such as **Min**, **Max**, **Average**, and **Count**. This action aggregates or summarizes the columns on each hierarchy.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/configure-values.png" alt-text="Screenshot of the Create Crosstab View dialog with the Values ellipsis menu open, showing Sum, Min, Max, Avg, Count, Count Distinct, and None.":::

### Display subtotal and grand total

Select the **Settings** icon next to the **Values** field, and then select or clear the options to show or hide **Subtotals** and the **Grand Total**.

Select **Save**. The crosstab layout is created as shown in the following image.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/crosstab-layout-created-year-quarter-month-columns.png" alt-text="Screenshot of the PowerTable crosstab layout showing categories by year, quarter, and month with Profit and Units_Sold columns and totals." lightbox="../media/powertable-layouts/how-to-configure-crosstab-layout/crosstab-layout-created-year-quarter-month-columns.png":::

> [!NOTE]
> If the table is empty, go to a time range that contains data.

## Navigate the crosstab layout

* Use the **Previous** and **Next** arrows at the top to navigate through the timeline.
* Select **Today** to go to the data in the current date.
* Use the **View as** dropdown to choose the number of hierarchy levels to display at a time, such as **Quarter** or **Year**. The selected view applies only to the [configured date range](#configure-column). Levels outside this range aren't displayed.
* Use the arrows on column headers to expand or collapse hierarchies.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/navigate-crosstab.png" alt-text="Screenshot of PowerTable crosstab with Previous, Next, Today arrows and View as Quarter dropdown highlighted." lightbox="../media/powertable-layouts/how-to-configure-crosstab-layout/navigate-crosstab.png":::

## Insert row

1. Use **Insert Row** to add a new row category and [enter values](#edit-cells-and-enter-values).
1. After entering the values, select **Save to Database**. The table is updated.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/insert-row.png" alt-text="Screenshot of PowerTable crosstab with Insert Row highlighted and a new Water row with 3000 entered in the Jan Profit cell." lightbox="../media/powertable-layouts/how-to-configure-crosstab-layout/insert-row.png":::

## Edit cells and enter values

Select a cell to edit its value.

### When Show Aggregated Values is enabled

1. You see an **Expand** icon on the cell. Select it and start entering values in the cells at the lowest granularity level in the hierarchy.
1. Select **Save** and then **Save to Database**. The crosstab automatically aggregates and writes back the values at the higher hierarchy levels.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/enter-values-lowest-level.png" alt-text="Screenshot of PowerTable showing the Expand icon on the Juices Profit cell and a January day-level entry dialog with Save highlighted." lightbox="../media/powertable-layouts/how-to-configure-crosstab-layout/enter-values-lowest-level.png":::

### When Show Aggregated Values is disabled

1. You can't drill down to the lowest level. Instead, enter the value directly in the cell for the selected interval. In the following image, you enter a value at the month level.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/enter-aggregated-level.png" alt-text="Screenshot of a crosstab layout grouped by 2025, Q1, Jan, Feb, Mar with a month-level value entered in the Snacks Units_Sold cell." lightbox="../media/powertable-layouts/how-to-configure-crosstab-layout/enter-aggregated-level.png":::

1. Select **Save to Database** after entering necessary values.

> [!NOTE]
> The **Crosstab** layout doesn't distribute a value entered at an aggregated level across the lower levels. When you enter a value at an aggregated level, Crosstab stores it at the **first period within the interval**, which is the first date of the month in this example.

## Search and sort data

Use the toolbar to find and organize specific data.

* Use [**Filter by keyword**](../powertable-how-to-explore-organize-data.md#search-records) to search for text or numerical values in the table.
* Select [**Sort By**](../powertable-how-to-explore-organize-data.md#sort-records) to sort rows by one or more columns.

## Modify layout

To modify the existing crosstab layout and configure a new one, go to **Layout** > **Manage Layout**. Select the layout, and then reset or reconfigure the properties.

:::image type="content" source="../media/powertable-layouts/how-to-configure-crosstab-layout/modify-layout.png" alt-text="Screenshot of PowerTable Layout menu with Manage Layout highlighted and the Layout Configuration dialog showing Crosstab pivot assignment options." lightbox="../media/powertable-layouts/how-to-configure-crosstab-layout/modify-layout.png":::
