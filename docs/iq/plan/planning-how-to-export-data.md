---
title: Export Data from Planning Sheets to Excel and PDF
description: Learn how to export planning sheets to Excel or PDF in Fabric Plan.Explore Excel export modes, PDF settings, headers, formatting, and advanced configuration options..
ms.date: 05/04/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to export planning sheets to Excel or PDF in Fabric Plan.
---
# Exports in the Planning sheet

Planning sheet allows you to export reports to **PDF** and **Excel** while preserving formatting, layout, and data context. You can export complete sheets or selected data.

Exported Planning sheets retain key elements such as:

* Planning sheet layout and structure
* Cell values and number formatting
* Notes and annotations
* Filters and layouts
* Calculated rows and columns.

## Prerequisite

* You have access to the Planning sheets to be exported.

## Export a Planning sheet to PDF

Use PDF export to generate formatted, paginated sheets.

1. In the Planning sheet, select **Export** from **Planning**.
1. Select **Export to PDF**.

     :::image type="content" source="media/planning-how-to-export-data/export-pdf.png" alt-text="Screenshot of exporting to pdf." lightbox="media/planning-how-to-export-data/export-pdf.png":::

1. Select the **Properties**
   * **Entire Matrix -** The Entire Matrix is exported.
   * **Selected Columns -** Only the selected columns are exported.
1. Configure [**Advanced Settings**](#configure-advanced-pdf-export-options)
1. Select **Export** and download the file.

     :::image type="content" source="media/planning-how-to-export-data/pdf-download.png" alt-text="Screenshot of downloading the exported  pdf." lightbox="media/planning-how-to-export-data/pdf-download.png":::

## Configure Advanced  PDF export options

### **Page Setup**

You can customise the output using page setup settings:

* Select **Content Order**
  * **Row-first**: Data fills across rows first, then continues to the next page.
  * **Column-first**: Data fills down columns first, then continues to the next page.
* Select **page size** (A4, A3, custom sizes)
* Select portrait or landscape **orientation**
* Select **scaling** to fit content.
* Select the **Margin** type.

    :::image type="content" source="media/planning-how-to-export-data/pdf-settings.png" alt-text="Screenshot of configuring pdf page settings." lightbox="media/planning-how-to-export-data/pdf-settings.png":::

### **Advanced Settings**

* Enable **Image/Logo** to include images.
* Use an image as a background
* Set margins to align content horizontally and vertically.

   :::image type="content" source="media/planning-how-to-export-data/advanced-settings.png" alt-text="Screenshot of configuring advanced pdf page settings." lightbox="media/planning-how-to-export-data/advanced-settings.png":::


* Include comments on the last page.
* Include Filter information.
* Enable compression to reduce the PDF file size.
  
    :::image type="content" source="media/planning-how-to-export-data/advanced-settings-alignment.png" alt-text="Screenshot of configuring advanced alignment page settings." lightbox="media/planning-how-to-export-data/advanced-settings-alignment.png":::
  
### Formatting

You can customize formatting using the following options:

* Apply **font styles** as needed.
* Select the display type for the **Header** and **Footer**.
* Set the **decimal precision**.
* Configure **Auto wrap** options.

    :::image type="content" source="media/planning-how-to-export-data/format-settings.png" alt-text="Screenshot of configuring page format settings." lightbox="media/planning-how-to-export-data/format-settings.png":::
  
Select **Apply** to save your changes, or select **Reset** to clear all changes.

## Export a Planning sheet to Excel

Use Excel export for further analysis and data manipulation.

1. In the Planning sheet, select **Export** from **Planning**.
1. Select **Export to Excel**.
1. Under **Export mode**, select one of the following:
   * **Fully expanded** - Exports all hierarchy levels in an expanded view.
   * **With expand/collapse** - Exports data with hierarchy controls to expand or collapse levels in Excel.
   * **Current state** - Exports the report exactly as it appears, including applied filters and expanded levels.
1. Under **Properties**, select one of the following:
   * **Entire Matrix -** The Entire Matrix is exported.
   * **Selected Columns -** Only the selected columns are exported.
1. Configure [**Advanced Settings**](#advanced-settings-in-excel-export-options) as required.
1. Select **Export to** export the Excel file.

     :::image type="content" source="media/planning-how-to-export-data/export-excel.png" alt-text="Screenshot of exporting to excel." lightbox="media/planning-how-to-export-data/export-excel.png":::

1. Select the link to save your file to your local system.

    ::image type="content" source="media/planning-how-to-export-data/excel-download.png" alt-text="Screenshot of downloading the exported excel." lightbox="media/planning-how-to-export-data/excel-download.png":::

### Advanced Settings in Excel export options

**Header Settings**

Planning sheets support exporting header elements such as dates and symbols to Excel. Use header settings to control and preview which header lines are included in the export.

::image type="content" source="media/planning-how-to-export-data/header-settings.png" alt-text="Screenshot of configuring header settings in the exported excel." lightbox="media/planning-how-to-export-data/header-settings.png":::

**Footer Settings**

Planning sheets support exporting footer elements such as dates to Excel. Use footer settings to control and preview which footer lines are included in the export.

::image type="content" source="media/planning-how-to-export-data/footer-settings.png" alt-text="Screenshot of configuring footer settings in the exported excel." lightbox="media/planning-how-to-export-data/footer-settings.png":::

**General Settings**

Configure additional options as required:

* Freeze headers and label columns.
* Smart fit to automatically fit content to columns.
* Add a formula appendix sheet.

   ::image type="content" source="media/planning-how-to-export-data/general-settings.png" alt-text="Screenshot of configuring general settings in the exported excel." lightbox="media/planning-how-to-export-data/general-settings.png":::

Select **Apply** to apply the changes and configure your PDF Export settings, or select **Reset** to reset all the applied changes.
