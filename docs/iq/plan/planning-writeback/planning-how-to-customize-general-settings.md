---
title: Customize general settings for writeback
description: Learn how to customize writeback behavior, including writeback types, filters, decimal precision, and text field lengths.
ms.date: 04/30/2026
ms.topic: how-to
#customer intent: As a user, I want to customize how data is structured, filtered, and written to the destination database.
---

# Customize general settings for writeback

Writeback's **General** settings let you configure writeback behavior for a Planning sheet. These settings control how data is structured, filtered, and written to the destination.

## Writeback Type

Use **Writeback Type** to define the table structure.

:::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-type.jpg" alt-text="Screenshot of writeback type" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-type.jpg":::

There are four supported types:

* **Long** is the default writeback type. This setting stores each cell in a measure as a key-value pair. Only **Long** supports writing back comments and notes.

    :::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-type-long.jpg" alt-text="Screenshot of writeback type long" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-type-long.jpg":::

* **Wide** stores measures as columns. As additional measures are added, the writeback table automatically adds corresponding columns. Totals and subtotals aren't written back in **Wide** format.

    :::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-type-wide.jpg" alt-text="Screenshot of writeback type wide" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-type-wide.jpg":::

* **Long with changes** uses delta writeback. Only modified values are written back. The original values are stored in **PreviousValue**, and new values are stored in **Value**. The system also sets `IsLatest = 1` to identify the latest row. Delta writeback works for both numeric and text data type adjustments.

    :::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-type-long-with-changes.jpg" alt-text="Screenshot of writeback type long with changes" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-type-long-with-changes.jpg":::

* **Wide with changes** uses delta writeback, but each measure is stored in a separate column. It maintains change history and uses `IsLatest` to identify the active record.

    :::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-type-wide-with-changes.jpg" alt-text="Screenshot of writeback type wide with changes" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-type-wide-with-changes.jpg":::

After the first writeback, changing the **Writeback Type** displays a warning before existing tables are deselected in **Settings > Destinations**. The table can be reselected for writeback; however, the system checks for conflicts between the existing table type and the selected **Writeback type**. If a conflict is detected, the system prompts to drop and write back the table. When in doubt, create a new table and run writeback instead of dropping an existing table.

Changing row or column dimensions displays a warning before it drops and writes back the table.

## Filter Type

Use filters to control which data gets written back to the destination. Select from predefined options or apply custom filters.

:::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-filter-type.png" alt-text="Screenshot of writeback filter type" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-filter-type.png":::

The options are:
* **None**: Writes back the entire report or scenario without applying any filter.

* **Data with Comments only**: Writes back the cells that contain comments. This option only works with the **Long** writeback type.

* **Calculated rows only**: Writes back only calculated rows, including any notes added to those rows.

## Date Key Configuration

Select **Add Date Key** to add a date key column to the writeback table. For high-level planning scenarios such as revenue by year or month, plan appends a representative date to the date dimension. The system uses the first day of the year, month or quarter. For example, when the column dimensions are year–month, plan writes *01-01-2025* for January 2025.

> [!NOTE]
> **Add Date Key** only works when a date hierarchy is used in column dimensions.

:::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-additional-column-configuration.png" alt-text="Screenshot of writeback with additional coloumn configuration" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-additional-column-configuration.png":::

In this example, the planning is done at month level. The record date column in the writeback table captures the date key for each month.

:::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-additional-column-in-destination-database.jpg" alt-text="Screenshot of writeback with additional coloumn in destination page" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-additional-column-in-destination-database.jpg":::

## Decimal Precision

Use **Decimal Precision** to define the number of digits after the decimal point. This is a one-time setting that applies to all destinations configured for a Planning sheet. Set the precision when you configure the first writeback destination.

:::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-decimal-precision.jpg" alt-text="Screenshot of writeback with decimal precision" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-decimal-precision.jpg":::

The configured precision is displayed in the **Decimal Precision** section under writeback settings.

:::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-configured-decimal-precision.jpg" alt-text="Screenshot of writeback settings configured with decimal precision" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-configured-decimal-precision.jpg":::

## Text Length

Use **Text Length** to control the number of characters written back for text fields. The default limit is 512 characters. When you add the first destination, you can either keep the default limit or allow writeback up to the maximum supported by the backend. This is also a one-time setting for all database destinations on that report page.

:::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-text-field-length.png" alt-text="Screenshot of writeback settings with text length' text length" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-text-field-length.png":::

The **Text Length** section in writeback settings shows the set text length as follows.

:::image type="content" source="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-configured-text-length.png" alt-text="Screenshot of writeback settings configured with text length' text length" lightbox="../media/planning-writeback/planning-how-to-customize-general-settings/writeback-configured-text-length.png":::

After setting this option, writeback fails if the actual text length exceeds the configured limit.
