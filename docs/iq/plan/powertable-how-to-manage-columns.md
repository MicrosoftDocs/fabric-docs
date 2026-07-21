---
title: Manage Columns in a PowerTable Sheet
description: Learn how to manage columns by adjusting column widths, column visibility, column properties, access permissions, reordering columns, and using search and filter options in PowerTable.
ms.date: 07/05/2026
ms.topic: how-to
#customer intent: As a user, I want to manage columns by controlling their visibility, width, input properties, and access permissions so that I can customize and organize fields in my PowerTable sheet.
---

# Manage columns in PowerTable sheet

Use **Manage Columns** to control column visibility, width, order, input type configuration, and access permissions.

To open the **Manage Columns** panel, select **PowerTable** > **Manage Columns**.

:::image type="content" source="media/powertable-how-to-manage-columns/manage-columns.png" alt-text="Screenshot of the Manage Columns option on the toolbar.":::

The following options are available:

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Show or hide columns

To show or hide columns:

1. In the **Show** column, select the check box for each column to display.
1. Clear the check box for each column to hide.

   :::image type="content" source="media/powertable-how-to-manage-columns/display-hide-columns.png" alt-text="Screenshot of displaying or hiding the columns." lightbox="media/powertable-how-to-manage-columns/display-hide-columns.png":::

To display all available columns, select the **All** check box.

:::image type="content" source="media/powertable-how-to-manage-columns/display-all-columns.png" alt-text="Screenshot of the All checkbox used to display all the columns.":::

> [!NOTE]
> Hiding a column removes it from the table view but doesn't delete the column or its data.

## Edit column configuration

Use **Edit Config** to set column properties such as input types, constraints, default values, display settings, and lookups.

To edit column configuration:

1. Select **Edit Config** in the **Manage Columns** panel.

   :::image type="content" source="media/powertable-how-to-manage-columns/edit-config.png" alt-text="Screenshot of the Edit Config option in the Manage Columns window." lightbox="media/powertable-how-to-manage-columns/edit-config.png":::

1. The **Column Configuration** window opens. Configure the column properties.

   :::image type="content" source="media/powertable-how-to-manage-columns/column-configuration-window.png" alt-text="Screenshot of the column configuration window." lightbox="media/powertable-how-to-manage-columns/column-configuration-window.png":::

To learn about configuring columns, see **Configure columns**. <!-- Add hyperlink when available-->

## Set column access control

Use **Column Access** to control which users can edit specific columns.

1. Select **Column Access** in the **Manage Columns** panel.

   :::image type="content" source="media/powertable-how-to-manage-columns/column-access.png" alt-text="Screenshot of the Column Access option in the Manage Columns window." lightbox="media/powertable-how-to-manage-columns/column-access.png":::

1. The **Manage Access** window opens. Use the **Column Access** section to set write permissions for each column.

   :::image type="content" source="media/powertable-how-to-manage-columns/column-access-window.png" alt-text="Screenshot of the Column Access window." lightbox="media/powertable-how-to-manage-columns/column-access-window.png":::

For more information about setting up column access control, see [**Column access control**](./powertable-how-to-set-up-access-control.md#column-access).

## Reorder columns

Reorder columns to customize the table layout.

To reorder columns:

1. Drag a column header to the position you want in the table.
1. Alternatively, in the **Manage Columns** panel, drag the **reorder handle** (six-dot icon) next to a column and drop it in the required position.

   :::image type="content" source="media/powertable-how-to-manage-columns/reorder-columns.png" alt-text="Screenshot of the reorder handle in the Manage Columns window." lightbox="media/powertable-how-to-manage-columns/reorder-columns.png":::

The table layout immediately reflects your changes.

> [!NOTE]
> Reordering a column changes only its display position in the table and doesn't affect the underlying data.

## Search and filter columns

Use the search and filter options to locate specific columns, especially in large tables.

* **Search**: Find columns by their name.

  :::image type="content" source="media/powertable-how-to-manage-columns/search.png" alt-text="Screenshot of searching a column in the Manage Columns window." lightbox="media/powertable-how-to-manage-columns/search.png":::

* **Filter**: Filter columns by **Input Type** or **Column Type**.

  :::image type="content" source="media/powertable-how-to-manage-columns/filter.png" alt-text="Screenshot of filtering columns in the Manage Columns window." lightbox="media/powertable-how-to-manage-columns/filter.png":::

Select **Reset** to clear all filters.

## Set column widths

To set the column widths:

In the **Width** field, enter the width in pixels for each column.

:::image type="content" source="media/powertable-how-to-manage-columns/adjust-column-width.png" alt-text="Screenshot of adjusting the column widths." lightbox="media/powertable-how-to-manage-columns/adjust-column-width.png":::

To restore the original column widths, select the **Reset** icon.

:::image type="content" source="media/powertable-how-to-manage-columns/reset-column-width.png" alt-text="Screenshot of resetting the column widths to its default value.":::

## Other ways to adjust column widths

Other options for adjusting column widths help you optimize the display of data, especially in tables with many columns.

You can resize columns by dragging column borders or automatically fitting them to the header or content.

### Resize columns manually

The quickest way to resize a column is to select and drag its header boundary.

To resize a column:

1. Hover over the edge of the column header.
1. Select and drag the resize handle to the required width.

   :::image type="content" source="media/powertable-how-to-manage-columns/resize-columns-manually.png" alt-text="Screenshot of resizing the column width manually." lightbox="media/powertable-how-to-manage-columns/resize-columns-manually.png":::

### Autofit column widths

Use the **Auto Fit** options to automatically adjust column widths based on the header or content.

To access the autofit options:

1. Go to the **Format** tab.
1. Select the **Auto Fit** dropdown.

   :::image type="content" source="media/powertable-how-to-manage-columns/auto-fit.png" alt-text="Screenshot of the Auto Fit dropdown on the toolbar." :::

#### Fit to header

Select **Fit to Header** to resize each column based on the width of its column header.

:::image type="content" source="media/powertable-how-to-manage-columns/fit-to-header.png" alt-text="Screenshot of the table after applying the Fit to Header option." lightbox="media/powertable-how-to-manage-columns/fit-to-header.png":::

#### Fit to content

Select **Fit to Content** to resize each column based on the width of the data it contains.

:::image type="content" source="media/powertable-how-to-manage-columns/fit-to-content.png" alt-text="Screenshot of the table after applying the Fit to Content option." lightbox="media/powertable-how-to-manage-columns/fit-to-content.png":::

## Lock column widths

After you configure column widths, lock them to prevent users from changing them.

To lock column widths:

1. Go to **PowerTable** > **Manage Columns**. In the **Manage Columns** window, adjust the column widths as needed.
1. Select the **Lock** icon next to the columns you want to lock. To lock all columns, select the **Lock** icon next to **All**.

When you lock column widths, all column and row resizing options become unavailable, including drag-to-resize functionality.

:::image type="content" source="media/powertable-how-to-manage-columns/lock.png" alt-text="Screenshot of the lock icons in the Manage Columns window after locking." lightbox="media/powertable-how-to-manage-columns/lock.png":::

The options in the **Auto Fit** dropdown also become unavailable until you unlock the column widths.

:::image type="content" source="media/powertable-how-to-manage-columns/auto-fit-unavailable.png" alt-text="Screenshot of showing the unavailable Auto Fit options.":::

To enable resizing again, select **PowerTable** > **Manage Columns**, and then select the **Lock** icon to unlock the widths.

:::image type="content" source="media/powertable-how-to-manage-columns/unlock.png" alt-text="Screenshot of showing the unlock option in the Manage Columns window." lightbox="media/powertable-how-to-manage-columns/unlock.png":::
