---
title: Export PowerTable Sheet to Excel
description: Learn how to export PowerTable sheet to Excel.
ms.date: 07/06/2026
ms.topic: how-to
#customer intent: As a user, I want to export my PowerTable data to Excel for offline backup, snapshots, and external sharing with stakeholders who do not have access to PowerTable.
---

# Export PowerTable sheet to Excel

Export PowerTable sheets to Excel so you can work with, share, and analyze your data outside of PowerTable.

This article explains common use cases for exporting PowerTable data to Excel and the steps to do it.

Exported Excel sheets preserve the data, sheet structure, and lookup labels, making it easy to perform offline analysis, share information, and create custom reports.

All layouts support export to Excel.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Common use cases

* Share PowerTable data with stakeholders who don't have access to it.
* Make offline backups or snapshots of table data.
* Perform advanced data analysis by using Excel features such as PivotTables and advanced charts.

> [!NOTE]
>
> The export includes the table data, inserted rows, and lookup labels. The exported file doesn't include visual columns, formula columns, added comments, or the Comments column.

## Export to Excel

1. To export the sheet in Excel format, select **PowerTable** > **Export**.

    :::image type="content" source="media/powertable-how-to-export-to-excel/export-option.png" alt-text="Screenshot of PowerTable ribbon with Export button highlighted." lightbox="media/powertable-how-to-export-to-excel/export-option.png":::

1. Choose one of the two formats to export:

    * Select **Label** to include lookup labels in the exported data.
    * Select **Raw Data** to export the raw data in the same format you imported it into the PowerTable.

1. Select **Export**.

    :::image type="content" source="media/powertable-how-to-export-to-excel/select-export.png" alt-text="Screenshot of Export dialog with Label and Raw Data options and Export button highlighted.":::

1. After the export completes, select **Download**. Then, right-click the generated file link and save the file to your local system.

    :::image type="content" source="media/powertable-how-to-export-to-excel/download-file.png" alt-text="Screenshot of PowerTable Export Completed dialog with Download link highlighted." lightbox="media/powertable-how-to-export-to-excel/download-file.png":::

1. The exported file looks like the following image. The *ProductSubcategoryKey* field retains the lookup labels because you chose the **Label** option. The export also maintains the sheet layout structure.

    :::image type="content" source="media/powertable-how-to-export-to-excel/exported-file.png" alt-text="Screenshot of Excel showing exported Products sheet with lookup labels and all other columns." lightbox="media/powertable-how-to-export-to-excel/exported-file.png":::

1. The **Raw Data** option generates the raw data in Excel as shown in the following image, without any lookup labels or structure.

    :::image type="content" source="media/powertable-how-to-export-to-excel/exported-raw-data.png" alt-text="Screenshot of exported raw data in Excel with numeric ProductSubcategoryKey values." lightbox="media/powertable-how-to-export-to-excel/exported-raw-data.png":::
