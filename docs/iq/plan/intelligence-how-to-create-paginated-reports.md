---
title: Create Paginated Reports in Fabric Plan Intelligence Sheets
description: Learn how to work with intelligence sheet pagination options for reports. Customize headers, footers, layout, and formatting to create structured, readable, and consistent reports.
ms.date: 07/21/2026
ms.topic: how-to
#customer intent: As a user, I want to design and format paginated reports in intelligence sheets
---

# Pagination and formatting for reports

Legacy enterprise reporting often requires precise control over pagination. Page breaks and page controls ensure content stays organized logically, headers and footers appear consistently, and reports retain their intended layout across print and export formats. Paginated reports are ideal for generating invoices, financial statements, operational reports, and other documents that require consistent formatting across pages and export formats.

Use pagination to divide large reports into smaller pages for analysis and navigation. Control how report content appears by configuring the number of rows per page or enabling a single scrollable page. Choose the layout that best fits the report for navigation and presentation.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

The following sections describe how to use pagination options, such as number of rows per page, page breaks, choosing header and footer presets, customizing the header and footer, formatting cells, and entering annotations.

## Prerequisites

1. Create an intelligence sheet and select the **Matrix** visual. Assign dimensions and measures.
1. Add a **Super Filter** visual from the **Visualizations** pane. Assign the dimensions to use for filtering, such as **Region**, **Year**, and **Business Unit**, to the **Category** data well.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/create-sheet-add-super-filter.jpg" alt-text="Screenshot of an intelligence sheet with filters for year, business unit, and region dimensions." lightbox="media/intelligence-how-to-create-paginated-reports/create-sheet-add-super-filter.jpg":::

## Define the rows shown on each page

By default, reports split content across multiple pages based on the total number of rows. You can go to the next page or the previous page, skip to the first or last page, or enter the page number to open a specific page in your report. Pagination controls appear in the bottom-right corner of the report in the status bar. Select the **Settings** icon to customize pagination.

:::image type="content" source="media/intelligence-how-to-create-paginated-reports/pagination-controls-settings.png" alt-text="Screenshot of pagination controls to navigate between pages in a report." lightbox="media/intelligence-how-to-create-paginated-reports/pagination-controls-settings.png":::

Set a fixed number of rows to show per page or dynamically add page breaks based on a dimension category.

* To show a fixed number of rows on each page, select the **Settings** icon and then specify the number of rows to show per page.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/set-fixed-rows-per-page.jpg" alt-text="Screenshot of setting to show a fixed number of rows per page." lightbox="media/intelligence-how-to-create-paginated-reports/set-fixed-rows-per-page.jpg":::

* To show the entire report on a single scrollable page, select **All**.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/single-page-scrollable-report.jpg" alt-text="Screenshot of a report with a single scrollable page." lightbox="media/intelligence-how-to-create-paginated-reports/single-page-scrollable-report.jpg":::

* Use row breaks to combine rows from a specific level of the row hierarchy, such as region or product, on a dedicated page. This option groups related records together on a single page, making paginated reports easier to read. In the **Format** ribbon, select the **Page Break** icon, and then select the dimension to use for row breaks.

    > [!NOTE]
    > When you define page breaks based on row or column dimensions, the **Rows per Page** setting is unavailable because the selected dimension values determine page boundaries.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/page-break-dimension-based.png" alt-text="Screenshot of inserting page breaks based on the region row dimension categories." lightbox="media/intelligence-how-to-create-paginated-reports/page-break-dimension-based.png":::

* Insert break rows to create custom page breaks at specific locations in the report. Use this option to separate key sections or logical groups, regardless of the underlying hierarchy or dimension structure.

  To insert a row break at a specific location in the report:

  1. Select the row gripper for the row where you want to insert a new page.

  1. Select **Insert** > **Add Break Row**.

  1. In the **Format** ribbon, select the **Page Break** icon, and then select **Break rows**.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/insert-break-row.png" alt-text="Screenshot of using the row gripper to insert row breaks between data." lightbox="media/intelligence-how-to-create-paginated-reports/insert-break-row.png":::

    This example inserts break rows to place APAC and EMEA on separate pages, and groups North America and Latin America on a single page. The following animation shows the resulting report structure after applying page breaks based on the break rows. The report now spans three pages, with APAC on page 1, EMEA on page 2, and North America and Latin America on page 3.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/page-breaks-break-rows.gif" alt-text="Animation showing custom page breaks created by inserting row breaks." lightbox="media/intelligence-how-to-create-paginated-reports/page-breaks-break-rows.gif":::

## Add a report header and footer

Headers and footers are particularly valuable in paginated reports, where content spans multiple pages and you frequently print or export reports to formats such as PDF, Word, or Excel. They ensure that important information repeats consistently on every page, even when you view pages independently.

1. Hover over the header section and select **Edit** from the **More options (...)** menu. Alternatively, double-click the header to edit.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/edit-header-option.png" alt-text="Screenshot of the option to edit the report header." lightbox="media/intelligence-how-to-create-paginated-reports/edit-header-option.png":::

1. Create a custom header or apply a built-in preset to add a report header. In the **Header & Footer** ribbon, select **Presets** > **Header** and select the header template. The preset pre-formats and positions header elements such as company logos, titles, and summaries.
1. Select the container with the *Your Logo* placeholder and upload your organization's logo. Hover over a container and use the drag handles to resize it.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/upload-custom-logo.png" alt-text="Screenshot of uploading a custom logo in the report header." lightbox="media/intelligence-how-to-create-paginated-reports/upload-custom-logo.png":::

1. Select the container that holds the title text. Delete the default title to insert custom text. Select the **Insert element** icon and select **Slicer** to show the slicer selections in the header.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/insert-slicer-selection-header-option.jpg" alt-text="Screenshot of header option to show selected categories in the slicer." lightbox="media/intelligence-how-to-create-paginated-reports/insert-slicer-selection-header-option.jpg":::

    The header captures the dimension categories that you select in the slicer:

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/capture-slicer-selection-header.png" alt-text="Screenshot showing the selected filter categories in the report header." lightbox="media/intelligence-how-to-create-paginated-reports/capture-slicer-selection-header.png":::

1. Select **Close Editor** after you finish your changes.
1. To insert a footer, select **Header & Footer** in the **Format** ribbon to enable the **Header & Footer** ribbon.
1. Select **Presets** > **Footer** and select the preset.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/footer-presets.png" alt-text="Screenshot of footer presets with pre-formatted and positioned elements like dates, logos, and symbols." lightbox="media/intelligence-how-to-create-paginated-reports/footer-presets.png":::

1. To add a timestamp in the footer, select the **Insert element** icon, select **Date**, and then choose the required format.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/show-timestamp-footer.png" alt-text="Screenshot of inserting a date and selecting the format in the report footer." lightbox="media/intelligence-how-to-create-paginated-reports/show-timestamp-footer.png":::

1. Additionally, apply custom colors to the column and measure headers. Choose **Select Header** from the column gripper. Change the font and background color and apply customizations from the **Format** ribbon.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/set-custom-measure-header-color.png" alt-text="Screenshot of setting a custom color for the measure and column headers." lightbox="media/intelligence-how-to-create-paginated-reports/set-custom-measure-header-color.png":::

## Add notes and annotations

Adding notes to reports provides valuable context that helps readers understand the data beyond the numbers. Use notes to explain significant changes, highlight key insights, document assumptions, and communicate important business context without modifying the underlying data.

In financial and operational reporting, notes are particularly useful for documenting budget variances, explaining forecast adjustments, justifying writebacks, recording approvals, and providing commentary on significant business events.

1. Select a row category, column header, or cell. In the **Intelligence** ribbon, select **Notes** > **Add New Note**. Use the rich text editor to enter and format notes. Select **Save**.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/add-new-note.png" alt-text="Screenshot of collaborating on reporting by adding context with notes." lightbox="media/intelligence-how-to-create-paginated-reports/add-new-note.png":::

1. Enable **Footnotes** to view all cell, row, and column-level notes you entered in the report.

    :::image type="content" source="media/intelligence-how-to-create-paginated-reports/enable-footnotes-option.png" alt-text="Screenshot of showing all the notes entered in a report in the footnotes section." lightbox="media/intelligence-how-to-create-paginated-reports/enable-footnotes-option.png":::

## Export reports to Excel and PDF

Select the **Export** icon in the **Matrix** ribbon to create fully formatted Excel and PDF exports for distribution. In PDF format, export all columns in the matrix or limit the export to selected columns. Excel exports preserve hierarchical data. Export them with expand and collapse buttons, fully expanded, or the current report state.

:::image type="content" source="media/intelligence-how-to-create-paginated-reports/export-pdf-excel-csv.png" alt-text="Screenshot of the export option in intelligence and support formats such as Excel, CSV, and PDF." lightbox="media/intelligence-how-to-create-paginated-reports/export-pdf-excel-csv.png":::

Sample screenshot of PDF export:

:::image type="content" source="media/intelligence-how-to-create-paginated-reports/sample-pdf-export.png" alt-text="Screenshot of the PDF export of a paginated report." lightbox="media/intelligence-how-to-create-paginated-reports/sample-pdf-export.png":::

Sample screenshot of Excel export:

:::image type="content" source="media/intelligence-how-to-create-paginated-reports/sample-excel-export.png" alt-text="Screenshot of the Excel export with expand and collapse capability for hierarchical row dimensions." lightbox="media/intelligence-how-to-create-paginated-reports/sample-excel-export.png":::
