---
title: CSV upload to Delta for PBI reporting
description: Go from your CSV file to a Lakehouse table to a PBI report.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: get-started
ms.date: 05/23/2023
ms.search.form: csv load to delta to pbi report
---

# CSV file upload to Delta for Power BI reporting

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] [Lakehouse](lakehouse-overview.md) is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location.

In this tutorial you'll learn to:

* Upload a CSV file to a Lakehouse
* Convert the file to a Delta table
* Generate a Dataset and create a PowerBI report

## Create a Lakehouse and get a CSV file ready

1. In Microsoft Fabric, select **Synapse Data Engineering** workload
1. Make sure you are in desired workspace or select/create one
1. Select **Lakehouse** icon under New section in the main mage

   :::image type="content" source="media\get-started-streaming\new-lakehouse.png" alt-text="Screenshot showing new lakehouse dialog" lightbox="media\get-started-streaming\new-lakehouse.png":::

1. Enter name of your Lakehouse
1. Select **Create**
1. Download the "Taxi Zone Lookup Table" [CSV file](https://d37ci6vzurychx.cloudfront.net/misc/taxi+_zone_lookup.csv) from the [TLC Trip Record Data website](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page), and save to a location in your computer.

## Upload a CSV file to the Lakehouse

1. Create the ```MyData```  folder under the ```Files``` section of your Lakehouse.
1. Upload the file to the folder, by using the "Upload file" item in the folder contextual menu.
1. Once uploaded, click the folder to see its content.
1. Rename the file to remove special characters, in this example, remove the '+' character. To see the full list of special characters, read the [Load to Delta Lake tables](load-to-delta.md) article.

## Load the file to a Delta table

1. Right-click or use the ellipsis on the CSV file to access the contextual menu, and select "Load to Delta".
1. The load to tables user interface shows up with the suggested table name. Real time validation on special characters will apply during typing.
1. Click __Confirm__ to execute the load.
1. The table now shows up in the lakehouse explorer, expand the table to see the columns and its types. Click on the table to see a preview.

> [!NOTE]
> If the table already exists, then select the __load mode__ you wish. Overwrite will drop and recreate the table. Append will insert all CSV content as new data. If the table schemas are different, it will auto-merge the schemas. For an in-depth guide on the __Load to Tables__ feature, read the [Load to Delta Lake tables](load-to-delta.md) article.

## Generate a Dataset

After the table is loaded, clicking on the table name will display a data preview.

Click generate Dataset on the Lakehouse Ribbon.

Select the table into the Dataset model, rename and save the Dataset. On this screen you will be able to define relationships between multiple tables and also apply DAX transformations to the data.

## Create a PowerBI report

From the Dataset, click generate Report to go into report design mode.

Design your report using Power BI.

## Next steps

- [Load to Delta Lake tables](load-to-delta.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
