---
title: Create paginated reports
description: Learn how to work with in Intelligence sheet pagination options for reports. Customize headers, footers, layout, and formatting to create structured, readable, and consistent reports.
ms.date: 03/10/2026
ms.topic: how-to
#customer intent: As a user, I want to design and format paginated reports in Intelligence sheets
---

# Pagination and formatting for Reports

Pagination options let you configure layout, context, presentation, and formatting. These capabilities help ensure paginated reports are well-structured, easy to read, and consistently formatted.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

The following sections describe how to use pagination options, such as customizing the header and footer, formatting cells, and creating visual hierarchies in your reports.

## Configure pagination

1. Go to **Design** > **Header & Footer**.
1. Select **Pagination Controls** and select the pagination style to apply.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/pagination-controls.png" alt-text="Screenshot of the pagination control options in the report." lightbox="media/intelligence-how-to-create-paginated-reports/pagination-controls.png":::

1. Select the settings icon in the footer to configure the number of rows displayed per page.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/configure-rows.png" alt-text="Screenshot of configuring the number of rows displayed per page." lightbox="media/intelligence-how-to-create-paginated-reports/configure-rows.png":::

1. To show data for a specific dimension category on each page: set **Rows per page** to **Row Break**. Select the dimension category, such as **Region**. This displays data grouped by the selected dimension on separate pages.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/row-break.png" alt-text="Screenshot of configuring row break based on Region." lightbox="media/intelligence-how-to-create-paginated-reports/row-break.png":::

## Customize the report header

1. Select **Header & Footer** in the **Design** ribbon.
1. Choose from built-in header and footer presets.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/presets.png" alt-text="Screenshot of header and footer presets." lightbox="media/intelligence-how-to-create-paginated-reports/presets.png":::

1. Select the edit icon to enter custom header text.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/edit-header.png" alt-text="Screenshot of the edit icon for changing the header text." lightbox="media/intelligence-how-to-create-paginated-reports/edit-header.png":::

1. Use the same icon to upload images to the header.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/edit-header-image-1.png" alt-text="Screenshot of uploading an image to the header." lightbox="media/intelligence-how-to-create-paginated-reports/edit-header-image-1.png":::

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/edit-header-image-2.png" alt-text="Screenshot of the header with an image that was uploaded." lightbox="media/intelligence-how-to-create-paginated-reports/edit-header-image-2.png":::

## Format cells and column headers

1. Set the cell background and font color, apply text formatting (bold, italic, underline), and adjust the font type and size. Use **Format Painter** to copy formatting across multiple cells.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/format-painter.png" alt-text="Screenshot of cells displaying different fill and text colors with a highlight around the format painter button." lightbox="media/intelligence-how-to-create-paginated-reports/format-painter.png":::

1. Use the column gripper to select **Select Header**, then apply the desired formatting.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/select-header.png" alt-text="Screenshot of the Select Header option from within a header cell." lightbox="media/intelligence-how-to-create-paginated-reports/select-header.png":::

1. Apply banded rows to improve readability by highlighting even and odd rows with different colors.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/row-highlight.png" alt-text="Screenshot of the Row Highlight option in the Design tab of the menu ribbon." lightbox="media/intelligence-how-to-create-paginated-reports/row-highlight.png":::

## Add notes and annotations

1. Select a row category, column header, or cell. Select **Notes** > **Add New Note**. Use the rich text editor to enter and format notes. Select Save.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/notes.png" alt-text="Screenshot of the Notes button in the Home tab of the menu ribbon." lightbox="media/intelligence-how-to-create-paginated-reports/notes.png":::

1. Enable **Notes Column** to enter row-level notes.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/notes-column.png" alt-text="Screenshot of the Notes Column option expanded from the Notes button." lightbox="media/intelligence-how-to-create-paginated-reports/notes-column.png":::

1. Enable **Footnotes** to view all cell, row, and column-level notes entered in the report.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/footnote.png" alt-text="Screenshot of the Footnote option expanded from the Notes button." lightbox="media/intelligence-how-to-create-paginated-reports/footnote.png":::

1. Go to **Notes** > **Report Summary** to enter annotations at the report level.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/report-summary.png" alt-text="Screenshot of the Report Summary option expanded from the Notes button." lightbox="media/intelligence-how-to-create-paginated-reports/report-summary.png":::

## Reorder columns

To reorder columns in your report, hover over a column and drag the column gripper to the desired position.

:::image type="content" source="media/intelligence-how-to-create-paginated-reports/reorder-columns.png" alt-text="Screenshot of reordering a column in the report." lightbox="media/intelligence-how-to-create-paginated-reports/reorder-columns.png":::