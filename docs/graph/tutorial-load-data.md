---
title: "Tutorial: Load Sample Data for graph in Microsoft Fabric"
description: Learn how to load the Adventure Works sample data into a lakehouse for use with graph in Microsoft Fabric, including uploading CSV files and verifying data.
ms.topic: tutorial
ms.date: 03/24/2026
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Load sample data
ai-usage: ai-assisted
---

# Tutorial: Load data

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you download the Adventure Works sample data from GitHub and load it into a lakehouse. If you already have a lakehouse with data (for example, from your own organization), you can skip this step.

The dataset contains tables in Parquet format. The tables represent various entities in the fictional bicycle manufacturing company, such as customers, products, orders, and vendors. In later tutorial steps, you use this data to build and query a graph that reveals how these entities connect. For example, you can discover which customers purchased which products, or which vendors supply specific product categories.

## Download the sample data

1. Go to the [graph in Microsoft Fabric GQL example datasets](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/graph) on GitHub.
1. Select the *adventureworks_docs_sample.zip* file and download it to your local machine.

    > [!TIP]
    > To download a file from GitHub, select the file, and then select the **Download raw file** icon.

1. Extract the downloaded *adventureworks_docs_sample.zip* file to a folder on your local machine.

   > [!TIP]
   > In File Explorer, right-click the zip file and select **Extract All**. Then choose a destination folder such as `c:\Downloads\AdventureWorks_Data`.

## Create a lakehouse

If you don't already have a lakehouse, create one to store the sample data:

1. In [Microsoft Fabric](https://fabric.microsoft.com/), select the workspace where you want to create the lakehouse.
1. Select **+ New item**.
1. Select **Store data** > **Lakehouse**.
1. Enter a name for your lakehouse (for example, "AdventureWorksLakehouse"), clear the **Lakehouse schemas** option, and then select **Create**.

    > [!IMPORTANT]
    > Make sure you clear the lakehouse schema option. Graph doesn't currently support lakehouses with [lakehouse schemas enabled](../data-engineering/lakehouse-schemas.md).

For more detailed instructions, see [Create a lakehouse with OneLake](../onelake/create-lakehouse-onelake.md).

## Upload the sample data to the lakehouse

1. In your lakehouse Explorer, hover over **Files**. Select the triple ellipsis (...) that appears, and then select **Upload** > **Upload folder**.

   > [!NOTE]
   > You can't upload a folder by using **Upload files**.

1. In the **Upload folder** dialog, browse to where you extracted the folder and select it. Then select **Upload**. A pop-up window might appear asking you to confirm the upload: select **Upload** again, and then select **Upload** in the **Upload folder** dialog.

   Your lakehouse should now contain the uploaded *AdventureWorks_Data* folder with the data files.

   :::image type="content" source="./media/tutorial/lakehouse-with-files.png" alt-text="Screenshot showing the uploaded AdventureWorks_Data folder in Microsoft Fabric." lightbox="./media/tutorial/lakehouse-with-files.png":::

## Load the data into tables

After you upload the files, load them into tables. Tables are the source data from a lakehouse that you use to create nodes and edges in your graph model.

For each subfolder in the uploaded *AdventureWorks_Data* folder, follow these steps to load the data into tables:

1. Drag and drop the subfolder (for example, *adventureworks_customers*) from the **Files** section to the **Tables** section in the lakehouse Explorer.

1. In the **Load folder to new table** dialog, enter a table name (the default is the folder name), set the file type to Parquet, and then select **Load**.

After you load all the tables, your Lakehouse Explorer shows eight tables. The lakehouse in your workspace is now ready with the Adventure Works sample data. In the next step, you create a graph model that uses this data.

:::image type="content" source="./media/tutorial/lakehouse-with-tables.png" alt-text="Screenshot showing the loaded tables in the lakehouse Explorer." lightbox="./media/tutorial/lakehouse-with-tables.png":::

## Next step

> [!div class="nextstepaction"]
> [Create a graph](tutorial-create-graph.md)
