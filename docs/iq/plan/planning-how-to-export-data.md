---
title: Export Data from Planning Sheets
description: Learn how to export Planning sheets to Excel or PDF in Fabric plan (preview). Explore Excel export modes, PDF settings, headers, formatting, and advanced configuration options.
ms.date: 05/04/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to export planning sheets to Excel or PDF in Fabric Plan.
---

# Export data from Planning sheets to Excel and PDF

Planning sheets allow you to export reports to PDF and Excel formats while preserving formatting, layout, and data context. You can export complete sheets or select specific data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Exported Planning sheets retain key elements like:

* Planning sheet layout and structure
* Cell values and number formatting
* Notes and annotations
* Filters and layouts
* Calculated rows and columns

## Prerequisite

You have access to the Planning sheets to be exported.

## Export a Planning sheet to PDF

Use the PDF export capability to generate formatted, paginated sheets.

1. In the Planning sheet, select **Planning** and **Export** from the toolbar.
1. Select **PDF** as the format.

     :::image type="content" source="media/planning-how-to-export-data/export-pdf.jpg" alt-text="Screenshot of exporting to pdf." lightbox="media/planning-how-to-export-data/export-pdf.jpg":::

1. Under **Properties**, select one of the following:
   * **Entire Matrix**: The entire matrix is exported.
   * **Selected Columns**: Only the selected columns are exported.
1. Configure [Advanced Settings](#advanced-settings-for-pdf-export) if needed.
1. Select **Export** and download the file.

     :::image type="content" source="media/planning-how-to-export-data/pdf-download.png" alt-text="Screenshot of downloading the exported  pdf." lightbox="media/planning-how-to-export-data/pdf-download.png":::

### Advanced settings for PDF export

The advanced **PDF Settings** are presented in three tabs, described in the sections below.

#### Page setup

The **Page Setup** tab contains these options to customize the output:

1. For **Content order**, select one of the following:
    * **Row-first**: Data fills across rows first, then continues to the next page.
    * **Column-first**: Data fills down columns first, then continues to the next page.
1. Select **Page size** (A4, A3, custom sizes)
1. Select portrait or landscape **Orientation**
1. Select **Scaling** to fit content
1. Select the **Margin** type

    :::image type="content" source="media/planning-how-to-export-data/pdf-settings.png" alt-text="Screenshot of configuring pdf page settings." lightbox="media/planning-how-to-export-data/pdf-settings.png":::

#### Advanced settings

The **Advanced Settings** tab contains these options:

* Enable **Image/Logo** to include images
* Use an image as a background
* Set **Margins** to align content horizontally and vertically

   :::image type="content" source="media/planning-how-to-export-data/advanced-settings.png" alt-text="Screenshot of configuring advanced pdf page settings." lightbox="media/planning-how-to-export-data/advanced-settings.png":::

* **Include comments on the last page**
* Include Filter information
* Enable compression to reduce the PDF file size
  
    :::image type="content" source="media/planning-how-to-export-data/advanced-settings-alignment.png" alt-text="Screenshot of configuring advanced alignment page settings." lightbox="media/planning-how-to-export-data/advanced-settings-alignment.png":::
  
#### Formatting

The **Formatting** tab contains these options to customize formatting:

* Apply **Font** styles
* Select the display type for the **Header** and **Footer**
* Set the **Decimal Precision**
* Configure **Word Wrap** options

    :::image type="content" source="media/planning-how-to-export-data/format-settings.png" alt-text="Screenshot of configuring page format settings." lightbox="media/planning-how-to-export-data/format-settings.png":::
  
Select **Apply** to save your changes, or select **Reset** to clear all changes.

## Export a Planning sheet to Excel

Use the Excel export capability for further analysis and data manipulation.

1. In the Planning sheet, select **Planning** and **Export** from the toolbar.
1. Select **Excel** as the format.
1. Under **Export mode**, select one of the following:
    * **Fully expanded**: Exports all hierarchy levels in an expanded view.
    * **With expand/collapse**: Exports data with hierarchy controls to expand or collapse levels in Excel.
    * **Current state**: Exports the report exactly as it appears, including applied filters and expanded levels.
1. Under **Properties**, select one of the following:
    * **Entire Matrix**: The entire matrix is exported.
    * **Selected Columns**: Only the selected columns are exported.
1. Configure [Advanced Settings](#advanced-settings-for-excel-export) if needed.
1. Select **Export to** export the Excel file.

     :::image type="content" source="media/planning-how-to-export-data/export-excel.png" alt-text="Screenshot of exporting to Excel." lightbox="media/planning-how-to-export-data/export-excel.png":::

1. Select the link to save your file to your local system.

    :::image type="content" source="media/planning-how-to-export-data/excel-download.png" alt-text="Screenshot of downloading the exported Excel." lightbox="media/planning-how-to-export-data/excel-download.png":::

### Advanced settings for Excel export

The advanced **Excel Settings** are presented in three tabs, described in the sections below.

#### Header Settings

Planning sheets support exporting header elements such as dates and symbols to Excel. Use header settings to control and preview which header lines are included in the export.

:::image type="content" source="media/planning-how-to-export-data/header-settings.png" alt-text="Screenshot of configuring header settings in the exported excel." lightbox="media/planning-how-to-export-data/header-settings.png":::

#### Footer Settings

Planning sheets support exporting footer elements such as dates to Excel. Use footer settings to control and preview which footer lines are included in the export.

:::image type="content" source="media/planning-how-to-export-data/footer-settings.png" alt-text="Screenshot of configuring footer settings in the exported excel." lightbox="media/planning-how-to-export-data/footer-settings.png":::

#### General Settings

Configure additional options as required:

* Smart fit to automatically fit content to columns
* Freeze headers and label columns
* Add a formula appendix sheet

   :::image type="content" source="media/planning-how-to-export-data/general-settings.png" alt-text="Screenshot of configuring general settings in the exported excel." lightbox="media/planning-how-to-export-data/general-settings.png":::

Select **Apply** to apply the changes and configure your Excel Export settings, or select **Reset** to reset all the applied changes.
