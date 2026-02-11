---
title: "Tutorial: Load data"
description: Learn how to load the Adventure Works sample data into a lakehouse for use with Graph in Microsoft Fabric.
ms.topic: tutorial
ms.date: 02/02/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Load sample data
---

# Tutorial: Load data

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you download the Adventure Works sample data from GitHub and load it into a lakehouse. Use this data throughout the tutorial to create and query your graph model. If you already have a lakehouse with data (for example, from your own organization), you can skip this step.

The dataset contains tables in Parquet format. The tables represent various entities in the fictional bicycle manufacturing company, such as customers, products, orders, and vendors.

## Download the sample data

1. Go to the [Fabric Graph GQL example datasets](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/graph) on GitHub.
1. Select the *adventureworks_docs_sample.zip* file and download it to your local machine.

    > [!TIP]
    > To download a file from GitHub, select the file, and then select the **Download raw file** icon.

1. Extract the downloaded *adventureworks_docs_sample.zip* file to a folder on your local machine.

   > [!TIP]
   > In File Explorer, right-click the zip file and select **Extract All**, then choose a destination folder.

## Create a lakehouse

If you don't already have a lakehouse, create one to store the sample data:

1. In [Microsoft Fabric](https://fabric.microsoft.com/), select the workspace where you want to create the lakehouse.
1. Select **+ New item**.
1. Select **Store data** > **Lakehouse**.
1. Enter a name for your lakehouse (for example, "AdventureWorksLakehouse"), clear the **Lakehouse schemas** option, and then select **Create**.

    > [!IMPORTANT]
    > Make sure you clear the lakehouse schema option. Graph in Microsoft Fabric doesn't currently support lakehouses that have [lakehouse schema (preview) enabled](/fabric/data-engineering/lakehouse-schemas).

For more detailed instructions, see [Create a lakehouse with OneLake](../onelake/create-lakehouse-onelake.md).

## Upload the sample data to the lakehouse

1. In your lakehouse Explorer, hover over **Files**. Select the triple ellipsis (...) that appears, and then select **Upload** > **Upload folder**.

   > [!NOTE]
   > You can't upload a folder by using **Upload files**.

1. In the **Upload folder** dialog, browse to where you extracted the folder and select it. Then select **Upload**. A pop-up window might appear asking you to confirm the upload: select **Upload** again, and then select **Upload** in the **Upload folder** dialog.

   > [!TIP]
   > You can select all files in the folder at once by pressing **Ctrl + A** and then selecting **Open**.

## Load the data into tables

Now that you uploaded the files, load them into tables. Tables are the source data from a lakehouse that you use to create nodes and edges in your graph model.

For each subfolder in the uploaded *adventureworks_docs_sample* folder, follow these steps to load the data into tables:

1. Expand the **Files** folder. Hover over a subfolder (for example, *adventureworks_customers*), select the triple ellipsis (...), and choose **Load to Tables** > **New table**.

1. In the **Load folder to new table** dialog, enter a table name (the default uses the folder name), and set the file type to Parquet. Then select **Load**.

After you load all the tables, expand the **Tables** folder. You should see the following tables in your lakehouse if you used the default names:

- *adventureworks_customers*
- *adventureworks_employees*
- *adventureworks_orders*
- *adventureworks_productcategories*
- *adventureworks_products*
- *adventureworks_productsubcategories*
- *adventureworks_vendorproduct*
- *adventureworks_vendors*

The lakehouse in your workspace is now ready with the Adventure Works sample data. In the next step, you create a graph model that uses this data.

## Next step

> [!div class="nextstepaction"]
> [Create a graph](tutorial-create-graph.md)
