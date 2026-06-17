---
title: Configure Slowly Changing Dimensions
description: Learn how to create slowly changing dimensions in PowerTable sheets.
ms.date: 06/15/2026
ms.topic: how-to
---

# Create slowly changing dimensions

Use Type 2 and Type 3 slowly changing dimensions (SCDs) to track changes to dimension data. In this article, you learn how to configure each SCD type and understand how they preserve historical and current attribute values. For more information about SCDs, see [Slowly Changing Dimensions](powertable-concept-slowly-changing-dimensions.md).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

The source data used to populate a Type 2 slowly changing dimension must have the following columns:

* A natural key such as region ID, customer ID, or product ID.
* A unique sequence number that is used as the surrogate key.
* Two date columns that capture the start and end dates.
* A boolean column that indicates whether a record is active.

The source data used to populate a Type 3 SCD must include a corresponding history column for each column that maintains historical values.

> [!NOTE]
> SCD configuration is available only during table creation. Tables can't be converted to slowly changing dimensions after they're created.

## Configure Type 2 SCD

Slowly changing dimensions are configured during table creation. In this example, you create an SCD table using data imported from an Excel file.

:::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/import-table-data.png" alt-text="Screenshot of creating a table by importing data from an Excel file." lightbox="media/powertable-how-to-create-slowly-changing-dimension/import-table-data.png":::

1. In the table configuration, turn on **Enable support for Slowly Changing Dimensions (SCD)** and select **Type-2.**

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/type-two-option.png" alt-text="Screenshot of option to create a Type 2 SCD." lightbox="media/powertable-how-to-create-slowly-changing-dimension/type-two-option.png":::
 
1. Map the source columns to the surrogate key, natural key, active flag, and date range fields. Use **End Date Default Value** to define the default end date for active records. Choose either a null value or an infinite date.

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/configure-dimension-columns.png" alt-text="Screenshot of configuring Type 3 SCD by mapping the primary and history columns." lightbox="media/powertable-how-to-create-slowly-changing-dimension/configure-dimension-columns.png":::

1. In **SCD Columns**, select the columns whose changes you want to track in the slowly changing dimension and select **Finish**.

    The table is created.

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/table-created.png" alt-text="Screenshot of table created." lightbox="media/powertable-how-to-create-slowly-changing-dimension/table-created.png":::

### View change history

Slowly changing dimensions capture the changes made to each record.

1. Edit a cell value and select **Save to Database** to commit the change.

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/edit-value.png" alt-text="Screenshot of editing values.":::

1. The original record is marked as inactive and excluded from the grid. A new record containing the updated values is inserted at the end of the grid. To view the change history for a record, select the record and then select **History**.

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/history-option.png" alt-text="Screenshot of history option.":::

1. In the **History** pane, records with the **Active** flag enabled are the current active records. Their **End Date** is displayed as either null or an infinite date, based on the SCD configuration. After reviewing the change history, select the back icon to return to the grid.

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/view-older-records.png" alt-text="Screenshot of viewing older records.":::

## Configure Type 3 SCD

You can configure Type 3 SCDs when creating a table from a file, a semantic model, or by manually entering data.

1. In the table configuration, turn on **Enable support for Slowly Changing Dimensions (SCD)** and select **Type-3.**

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/type-three-option.png" alt-text="Screenshot of SCD Type 3 option." lightbox="media/powertable-how-to-create-slowly-changing-dimension/type-three-option.png":::

1. Select the current value column and its corresponding history column to track both the latest and previous values. Select **+ Add More** to maintain historical data for more than one column.

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/configure-type-three-dimension-columns.png" alt-text="Screenshot of configuring type three SCDs." lightbox="media/powertable-how-to-create-slowly-changing-dimension/configure-type-three-dimension-columns.png":::

1. Select **Finish** to create the table.

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/create-table.png" alt-text="Screenshot of table creation." lightbox="media/powertable-how-to-create-slowly-changing-dimension/create-table.png":::

1. When you edit a value, the older value is moved to the configured history column. Select **Preview Changes**.

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/preview-changes.png" alt-text="Screenshot of change preview." lightbox="media/powertable-how-to-create-slowly-changing-dimension/preview-changes.png":::

1. Verify the changes that were made.

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/preview-window.png" alt-text="Screenshot of preview window." lightbox="media/powertable-how-to-create-slowly-changing-dimension/preview-window.png":::

1. Select **Added**, **Updated**, or **Deleted** to preview records with specific changes. Select **Save to Database** to commit the changes.

    :::image type="content" source="media/powertable-how-to-create-slowly-changing-dimension/preview-specific-changes.png" alt-text="Screenshot of previewing specific changes." lightbox="media/powertable-how-to-create-slowly-changing-dimension/preview-specific-changes.png":::
