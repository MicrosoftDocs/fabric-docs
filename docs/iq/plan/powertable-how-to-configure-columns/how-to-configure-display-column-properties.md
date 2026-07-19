---
title: Configure Display Properties for a Column in PowerTable
description: Learn how to configure display settings, number formatting and other formatting options for columns in PowerTable.
ms.date: 07/02/2026
ms.topic: how-to
#customer intent: As a user, I want to configure display properties and formatting options for columns so that I can control how data is presented in PowerTable.
---

# Configure display properties for a column

Use the **Display** tab in the panel to control how column headers and values appear in the table.

To configure display properties:

1. Select **Setup** > **Columns**.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/setup-columns.png" alt-text="Screenshot of the Columns option under Setup tab.":::

1. The column configuration window opens. Select the pencil icon next to the column name or double-click the column name.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/edit-icon-column-name.png" alt-text="Screenshot of the edit icon beside the column name used to configure display properties." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/edit-icon-column-name.png":::

1. Select the **Display** tab in the side panel.

    :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/display.png" alt-text="Screenshot of the Display tab in the side panel." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/display.png":::

The following display properties are available:

## Format

Use the **Format** property to define how date and date-time values appear in a column.

Choose from various date-time formats, such as `MM/DD/YYYY`, `DD/MM/YYYY`, `DD MMM, YYYY hh:mm:ss`, and more. Select **Default Locale** to use your locale's date and time *format*.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/format.png" alt-text="Screenshot of the date and time formatting options." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/format.png":::

## Display name

Use the **Display Name** property to specify a user-friendly column header that differs from the actual field name in the database.

For example, the database field *ProductSubcategoryKey* can be displayed as *Product Subcategory* in the table.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/display-name.png" alt-text="Screenshot of the Display Name text box." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/display-name.png":::

## Description

Use the **Description** property to provide extra information about a column.

When you configure a description, an information icon appears next to the column header. Users can hover over the icon to view the description.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/description.png" alt-text="Screenshot of the Description text box." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/description.png":::

## Thousand separator

Use the **Thousand Separator** property to improve the readability of large numeric values.

You can set a comma (,), period (.), or space ( ) as the separator for each group of thousands.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/thousand-separator.png" alt-text="Screenshot of the Thousand Separator text box." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/thousand-separator.png":::

## Prefix

Use the **Prefix** property to add up to two characters before numeric or decimal values.

Use this property to add currency symbols.  

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/prefix.png" alt-text="Screenshot of the Prefix text box." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/prefix.png":::

## Suffix

Use the **Suffix** property to add up to two characters after numeric or decimal values.

Use this property to add measurement units such as kilograms (kg), centimeters (cm), or percentages (%).

## Large number abbreviation

Use the **Large Number Abbreviation** property to display large numeric values in a shortened and more readable format.

The following options are available:

* **None** - Displays the full value without abbreviation.
* **Thousand (K)** - Displays values in thousands. For example, 15,000 is displayed as 15K.
* **Million (M)** - Displays values in millions. For example, 2,500,000 is displayed as 2.5M.
* **Billion (B)** - Displays values in billions. For example, 1,500,000,000 is displayed as 1.5B.
* **Trillion (T)** - Displays values in trillions. For example, 2,000,000,000,000 is displayed as 2T.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/large-number-abbreviation.png" alt-text="Screenshot of the options under Large Number Abbreviation dropdown." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/large-number-abbreviation.png":::

Use this option when displaying large numeric values in reports and dashboards where space is limited.

## Negative value

Use the **Negative Value** property to control how negative numbers are displayed.

The following formats are available:

* **-0** - Displays the negative sign before the value. For example, -500.
* **0-** - Displays the negative sign after the value. For example, 500-.
* **(0)** - Displays negative values within parentheses. For example, (500).

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/negative-value.png" alt-text="Screenshot of the options under Negative Value dropdown." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/negative-value.png":::

This option helps align number formatting with organizational or accounting standards.

## Show value as percentage

Select the **Show value as percentage** checkbox to display numeric values as percentages.

When you enable this option, the value automatically formats with a percentage symbol (%). For example, a value of 25 displays as 25%.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/show-value-as-percentage.png" alt-text="Screenshot of the options under Show value as percentage dropdown." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-display-column-properties/show-value-as-percentage.png":::

This option is useful for columns that represent rates, ratios, percentages, or other proportional values.
