---
title: CSV file upload to Delta table for Power BI reporting
description: Learn how to upload a CSV file to a lakehouse, convert it to a Delta table, and generate a semantic model and Power BI report.
ms.reviewer: dacoelho
ms.topic: get-started
ms.custom: sfi-image-nochange
ms.date: 02/28/2026
ms.search.form: csv load to delta to pbi report
---

# CSV file upload to Delta table for Power BI reporting

This quickstart shows a simple end-to-end flow in Fabric: upload a local CSV file, load it as a Delta table in a lakehouse, and build a report from it.

By the end, you can:

* Upload a CSV file to a lakehouse
* Convert the file to a Delta table
* Generate a semantic model and create a Power BI report

## Prerequisites

Before you begin, make sure you have the following:

- A Fabric workspace where you can create lakehouse items. If you don't already have one, see [Create workspaces](../fundamentals/create-workspaces.md).
- The "Taxi Zone Lookup Table" [CSV file](https://d37ci6vzurychx.cloudfront.net/misc/taxi+_zone_lookup.csv) downloaded from the [TLC Trip Record Data website](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page).

## Create a lakehouse

Start by creating the lakehouse where you store the CSV file and table.

1. In Fabric, select **Workspaces** from the navigation bar.
1. To open your workspace, enter its name in the search box located at the top and select it from the search results.
1. From the workspace, select **New item**, enter **Lakehouse** in the search box, then select **Lakehouse**.
1. In the **New lakehouse** dialog box, enter **wwilakehouse** in the **Name** field.
1. Select **Create**.

After the lakehouse is created, the next step is to upload the CSV file.

## Upload a CSV file to the lakehouse

Now place your source CSV file in the lakehouse files area so it can be loaded into a Delta table.

1. Create the `TaxiData` folder under the `Files` section of your lakehouse.

   :::image type="content" source="media\get-started-csv-upload\new-subfolder.png" alt-text="Screenshot showing how to create a new folder in the Files section of Lakehouse Explorer." lightbox="media\get-started-csv-upload\new-subfolder.png":::

1. Select the ellipsis (**...**) next to the `TaxiData` folder, and then select **Upload** > **Upload files**.

   :::image type="content" source="media\get-started-csv-upload\files-upload.png" alt-text="Screenshot showing the Upload file option in the folder contextual menu." lightbox="media\get-started-csv-upload\files-upload.png":::

1. Once uploaded, select the folder to see its content.
1. If the file name includes unsupported special characters, rename the file before loading. For current naming requirements, see [Load to Delta Lake tables](load-to-tables.md). In this example, rename the file to `taxi_zone_lookup.csv`.

   :::image type="content" source="media\get-started-csv-upload\rename-file.png" alt-text="Screenshot showing how to rename a file in the Files section of Lakehouse Explorer." lightbox="media\get-started-csv-upload\rename-file.png":::

## Load the file to a Delta table

In this stage, you convert the uploaded CSV file into a Delta table that can be queried and used for reporting.

1. Right-click or use the ellipsis on the CSV file to open the contextual menu. Select **Load to tables**, and then choose **New table**.
1. In the load to tables dialog, review the suggested table name. Real-time validation applies while you type.
1. Select **Load** to execute the load.
1. The table now shows up in the lakehouse explorer, expand the table to see the columns and its types. Select the table to see a preview.

> [!NOTE]
> If the table already exists, different **load mode** options appear. **Overwrite** drops and recreates the table. **Append** inserts all CSV content as new data. For more details, see [Load to Delta Lake tables](load-to-tables.md).

## Generate a semantic model and create a Power BI report

With the Delta table ready, create a semantic model and then build a report from that model.

1. On the Lakehouse ribbon, create a new semantic model.
1. Select the table to add to the semantic model, and then confirm your selection.
1. In semantic model editing, you can define relationships between tables and apply data type normalization and DAX transformations as needed.
1. Select **New report** on the ribbon.
1. Use the report builder to design a Power BI report.

## Related content

- [Load to Delta Lake tables](load-to-tables.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
