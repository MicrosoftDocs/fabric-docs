---
title: "Quickstart: Get data into OneLake"
description: Learn how to bring data into OneLake by uploading a sample CSV file to a lakehouse and by creating a OneLake shortcut to reuse that data from a second lakehouse.
ms.topic: quickstart
ms.date: 05/27/2026
ai-usage: ai-assisted
#customer intent: As a Fabric user, I want to add data to OneLake quickly so that I can explore it from any Fabric engine.
---

# Quickstart: Get data into OneLake

OneLake is the single, unified data lake for Fabric. Every Fabric workload reads and writes data through OneLake, so you only need to load data once to use it everywhere. You can bring data into OneLake in several ways:

- Upload files directly to a lakehouse or warehouse.
- Ingest data by using pipelines, dataflows, or streaming experiences.
- Connect to external data by using shortcuts or mirroring.

In this quickstart, you bring data into OneLake two ways: you upload a CSV file to a lakehouse, and you create a shortcut in OneLake from a second lakehouse that points back to the same data without copying it. When you finish, you have a queryable Delta table and a shortcut, both available to every Fabric engine through OneLake.

## Prerequisites

- A [Fabric license](../enterprise/licenses.md). Or, sign up for a free [Fabric trial](../fundamentals/fabric-trial.md).
- A [Fabric workspace](../fundamentals/create-workspaces.md).

## Create a lakehouse

When you create a Fabric item, such as a lakehouse, warehouse, or eventhouse, that item provisions storage in OneLake on your behalf. In this quickstart, you make a lakehouse, which gives you both a file area (**Files**) for unstructured or semi-structured data and a Delta table area (**Tables**) for structured, queryable data. Everything you put in either area is stored in OneLake and immediately accessible to other Fabric workloads.

1. Sign in to the [Fabric portal](https://app.fabric.microsoft.com) and select your workspace.
1. Select **New item**.
1. In the **New item** pane, search for and select **Lakehouse**.
1. Enter a name, such as `DataLakehouse`, then select **Create**.

   The lakehouse opens to the **Explorer** view, which shows empty **Tables** and **Files** sections. Both sections are already backed by OneLake and are ready for content.

## Upload sample data

In this quickstart, you use `Dim_Products.csv` from a publicly available Fabric sample semantic model. It's a small table of product information from a sample coffee retailer.

1. Open a browser and go to <https://fabrictutorialdata.blob.core.windows.net/sampledata/Coffee/Dim_Products.csv>.
1. When prompted, save the file as `Dim_Products.csv` to a folder on your computer.

In this section, you upload `Dim_Products.csv` to **Files** so that you have raw source data sitting in OneLake. The **Files** area of a lakehouse is a general-purpose storage zone in OneLake. Think of it as the landing zone for raw data in whatever format it arrives. You can drop in CSV, JSON, Parquet, images, logs, or anything else without having to define a schema first.

1. In the Lakehouse explorer, hover over **Files**, select the more options (**...**) menu, and then select **Upload** > **Upload files**.
1. In the **Upload files** pane, select the folder icon and browse to `Dim_Products.csv` on your computer.
1. Select **Upload**, then close the upload pane.
1. Select the **Files** folder to see its contents and confirm that `Dim_Products.csv` appears.
1. Select `Dim_Products.csv` to see its data.

   :::image type="content" source="./media/quickstart-get-data/view-sample-file.png" alt-text="A screenshot of the Fabric portal that shows unstructured csv data in the Files section of a lakehouse.":::

The file now lives in OneLake, but as a raw CSV it isn't yet something SQL or Spark can query as a table.

## Load the file into a Delta table

Fabric standardizes on Delta Lake as the table format in OneLake. When you load a file into the **Tables** area, Fabric reads the source file, infers a schema, and writes the data out as a Delta table. From that point on, every Fabric engine can query the same table without you copying or converting the data again.

1. In the Lakehouse explorer, open the **Files** folder.
1. Hover over the `Dim_Products.csv` file and select the more options (**...**) menu, then select **Load to Tables** > **New table**.
1. In the **Load to table** dialog, enter `dim_products` for the table name, keep the defaults, and select **Load**.
1. After the load finishes, expand **Tables** and select `dim_products` to preview the rows. The raw CSV in **Files** is unchanged, and `dim_products` is a new Delta table built from it.

   :::image type="content" source="./media/quickstart-get-data/view-sample-table.png" alt-text="A screenshot that shows structured Delta table data in the Tables section of a lakehouse.":::

1. Hover over `dim_products` and select the more options (**...**) menu, then select **Properties**.

   The **Properties** screen shows the various details for the table, including the URL and Azure Blob File System (ABFS) path that you can use to reference this table in other engines.

## Reuse the data with a shortcut from a second lakehouse

Uploading and loading is one way to get data into OneLake. The other key pattern is to reference data that already exists somewhere else, without duplicating it. That's what a shortcut is: a pointer in OneLake that references data stored in another lakehouse, in another Fabric workspace, or in supported sources outside of Fabric like Azure Data Lake Storage or Amazon S3. The data isn't copied; it stays in the source location, but you can read it through OneLake as if it were local. Any updates to the source are immediately visible through the shortcut, so you don't have to maintain copies of the data.

In this section, you create a second lakehouse and add a shortcut from it back to the `dim_products` table in your first lakehouse. This reflects how teams typically work, where one team owns the curated data and other teams or projects consume it through shortcuts in their own workspaces.

1. In your workspace, select **New item**.
1. In the **New item** pane, search for and select **Lakehouse**.
1. Enter a name, such as `ShortcutLakehouse`, then select **Create**.
1. In the new lakehouse's Explorer, hover over **Tables**, select the more options (**...**) menu, and then select **New shortcut**.
1. On the **New shortcut** page, under **Internal sources**, select **Microsoft OneLake**.
1. In the data source browser, select the first lakehouse that you made for this quickstart, and then select **Next**.
1. Expand **Tables**, select the `dim_products` table, and then select **Next**.
1. Review the selection and select **Create**.
1. Expand **Tables** in `ShortcutLakehouse` and confirm that `dim_products` appears with a shortcut icon (a small link image over the table icon). Select it to preview the rows. The table is the same as in the original lakehouse, but no data was copied.
1. Hover over the `dim_products` table, select more options (**...**), then select **Manage Shortcut**. On the **Manage shortcut** pane, you can view the shortcut details, including the shortcut target where the original data is stored.

## Clean up resources

If you don't plan to continue to the other OneLake quickstarts, delete the lakehouses to avoid OneLake storage charges against your Fabric capacity.

1. In your workspace, hover over the lakehouse that you want to delete.
1. Select the more options (**...**) menu next to the lakehouse, select **Delete**, and confirm the deletion.

Deleting the lakehouses also removes the contents within them: the uploaded file, the `dim_products` Delta table, and the shortcut.

## Related content

- [OneLake shortcuts](onelake-shortcuts.md)
- [Create an Azure Data Lake Storage Gen2 shortcut](create-adls-shortcut.md)
- [Tutorial: Move data into a lakehouse with a pipeline](../data-factory/tutorial-move-data-lakehouse-pipeline.md)
