---
title: CSV upload to Delta for PBI reporting
description: Go from your CSV file to a Lakehouse table to a PBI report.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: get-started
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: csv load to delta to pbi report
---

# CSV file upload to Delta table for Power BI reporting

[!INCLUDE [product-name](../includes/product-name.md)] [Lakehouse](lakehouse-overview.md) is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location.

In this tutorial you learn to:

* Upload a CSV file to a Lakehouse
* Convert the file to a Delta table
* Generate a semantic model and create a Power BI report

## Create a Lakehouse and get a CSV file ready

1. In Microsoft Fabric, select **Synapse Data Engineering**.
1. Make sure that you're in your desired workspace, or select or create one.
1. In the **Home** page, select **Lakehouse**.

   :::image type="content" source="media\get-started-csv-upload\new-lakehouse-inline.png" alt-text="Screenshot showing new lakehouse dialog." lightbox="media\get-started-csv-upload\new-lakehouse.png":::

1. Enter name of your Lakehouse.
1. Select **Create**.
1. Download the "Taxi Zone Lookup Table" [CSV file](https://d37ci6vzurychx.cloudfront.net/misc/taxi+_zone_lookup.csv) from the [TLC Trip Record Data website](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page), and save to a location in your computer.

## Upload a CSV file to the Lakehouse

1. Create the ```TaxiData```  folder under the ```Files``` section of your Lakehouse.
1. Upload the file to the folder, by using the **Upload file** item in the folder contextual menu.
1. Once uploaded, select the folder to see its content.
1. Rename the file to remove special characters, in this example, remove the '+' character. To see the full list of special characters, read the [Load to Delta Lake tables](load-to-tables.md) article.

   :::image type="content" source="media\get-started-csv-upload\upload-csv-lakehouse.gif" alt-text="Animated image showing upload CSV and CSV renaming" lightbox="media\get-started-csv-upload\upload-csv-lakehouse.gif":::

## Load the file to a Delta table

1. Right-click or use the ellipsis on the CSV file to access the contextual menu. Select **Load to Tables** and choose the **New table** option.
1. The load to tables user interface shows up with the suggested table name. Real time validations on special characters apply during typing.
1. Select **Load** to execute the load.
1. The table now shows up in the lakehouse explorer, expand the table to see the columns and its types. Select the table to see a preview.

   :::image type="content" source="media\get-started-csv-upload\load-to-table.gif" alt-text="Animated image showing load to table and table preview" lightbox="media\get-started-csv-upload\load-to-table.gif":::

> [!NOTE]
> If the table already exists, different __load mode__ options are shown. __Overwrite__ will drop and recreate the table. __Append__ will insert all CSV content as new data. For an in-depth guide on the __Load to Tables__ feature, read the [Load to Tables](load-to-tables.md) article.

## Generate a semantic model and create a Power BI report

1. Select **New Power BI semantic model** on the Lakehouse ribbon.
1. Select the table to be added to the semantic model, select the **Confirm** button.
1. On the semantic model editing experience, you are able to define relationships between multiple tables, and also apply data types normalization and DAX transformations to the data if desired.
1. Select **New report** on the ribbon.
1. Use the report builder experience to design a Power BI report.

   :::image type="content" source="media\get-started-csv-upload\generate-dataset-and-power-bi-report.gif" alt-text="Animated image showing semantic model and power bi report generation" lightbox="media\get-started-csv-upload\generate-dataset-and-power-bi-report.gif":::

## Related content

- [Load to Delta Lake tables](load-to-tables.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
