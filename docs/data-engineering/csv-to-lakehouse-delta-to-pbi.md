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

## Step 1 - Create a Lakehouse and get a CSV file ready

Use the following quick start to create a Lakehouse. Download the following CSV file to a location in your computer.

## Step 2 - Upload a CSV file to the Lakehouse

Create the ```MyData```  folder under the ```Files``` section of your Lakehouse.

## Step 3 - Load the file to a Delta table

Select the folder where you uploaded the file from the Lakehouse explorer navigation.

Right-click the CSV file from the content pane and choose the Load to Delta from the contextual menu.

If the table already exists, then select the load mode you wish. Overwrite will drop and recreate the table. Append will insert all CSV content as new data. If the table schemas are different, it will auto-merge the schemas.

## Step 4 -  Generate a Dataset

After the table is loaded, clicking on the table name will display a data preview.

Click generate Dataset on the Lakehouse Ribbon.

Select the table into the Dataset model, rename and save the Dataset. On this screen you will be able to define relationships between multiple tables and also apply DAX transformations to the data.

## Step 5 -  Create a PowerBI report

From the Dataset, click generate Report to go into report design mode.

Design your report using Power BI.

## Next steps

- [Load to Delta Lake tables](load-to-delta.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
