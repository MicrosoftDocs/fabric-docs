---
title: "Quickstart: Get data in OneLake"
description: Learn how to bring data into OneLake by uploading a sample CSV file to a lakehouse and by creating a OneLake shortcut to reuse that data from a second lakehouse.
ms.topic: quickstart
ms.date: 05/19/2026
ai-usage: ai-assisted
#customer intent: As a Fabric user, I want to add data to OneLake quickly so that I can explore it from any Fabric engine.
---

# Quickstart: Get data in OneLake

In this quickstart, you bring data into OneLake two ways: you upload a CSV file to a lakehouse, and you create a OneLake shortcut from a second lakehouse that points back to the same data without copying it. When you finish, you have a queryable Delta table and a shortcut, both available to every Fabric engine through OneLake.

OneLake is the single, unified data lake for Microsoft Fabric. Every Fabric workload, including Data Engineering, Data Warehouse, Data Science, Real-Time Intelligence, and Power BI, reads and writes data through OneLake, so you only need to load data once to use it everywhere. You can bring data into OneLake in several ways:

- Upload files directly to a lakehouse or warehouse.
- Ingest data by using pipelines, dataflows, or streaming experiences.
- Connect to external data by using shortcuts.
- Bring supported operational data into Fabric by using mirroring.

This quickstart covers two of these options: uploading a file directly to a lakehouse and creating a OneLake shortcut from another lakehouse to that data. These are the fastest ways to get started.

## Prerequisites

- A [Fabric subscription](../enterprise/licenses.md). Or, sign up for a free [Fabric trial](../fundamentals/fabric-trial.md).
- A [Fabric workspace](../fundamentals/create-workspaces.md) with a capacity assigned.
- Permission to create a lakehouse in the workspace.

## Download the sample data

Before you can put data into OneLake, you need something to put there. In this quickstart, you use `Dim_Products.csv` from a publicly available Fabric sample dataset. It's a small product dimension table from a coffee retail scenario. The file is just big enough to behave like a real table once you load it into a lakehouse, but small enough to upload from a browser. You download it to your computer first so that the upload step exercises the same path your readers and analysts use when they bring local data into Fabric.

1. Open a browser and go to <https://fabrictutorialdata.blob.core.windows.net/sampledata/Coffee/Dim_Products.csv>.
1. When prompted, save the file as `Dim_Products.csv` to a folder on your computer.

## Create a lakehouse

You don't write to OneLake directly. Instead, you create a Fabric item, such as a lakehouse, warehouse, or eventhouse, and that item provisions storage in OneLake on your behalf. A lakehouse is the most common starting point because it gives you both a file area (**Files**) for unstructured or semi-structured data and a Delta table area (**Tables**) for structured, queryable data. Everything you put in either area is stored in OneLake and immediately accessible to other Fabric workloads.

1. Sign in to the [Fabric portal](https://app.fabric.microsoft.com) and select your workspace.
1. Select **+ New item**.
1. In the **New item** pane, search for **Lakehouse**, then select the **Lakehouse** tile.
1. Enter a name, such as `onelake_quickstart`, then select **Create**.

   The lakehouse opens to the **Explorer** view, which shows empty **Tables** and **Files** sections. Both sections are already backed by OneLake and are ready for content.

## Upload the sample file

The **Files** area of a lakehouse is a general-purpose storage zone in OneLake. Think of it as the landing zone for raw data in whatever format it arrives. You can drop in CSV, JSON, Parquet, images, logs, or anything else without having to define a schema first. In this section, you upload `Dim_Products.csv` to **Files** so that you have raw source data sitting in OneLake. This is the same pattern you'd follow for any one-off file ingest from a workstation.

1. In the lakehouse Explorer, hover over **Files**, select the **More options** (**...**) menu, and then select **Upload** > **Upload files**.
1. In the **Upload files** pane, select the folder icon and browse to `Dim_Products.csv` on your computer.
1. Select **Upload**, then close the upload pane.
1. Expand **Files** and confirm that `Dim_Products.csv` appears. The file now lives in OneLake, but as a raw CSV it isn't yet something SQL or Spark can query as a table.

## Load the file into a Delta table

Fabric standardizes on Delta Lake as the table format in OneLake. When you load a file into the **Tables** area, Fabric reads the source file, infers a schema, and writes the data out as a Delta table. From that point on, every Fabric engine can query the same table without you copying or converting the data again. That includes the SQL analytics endpoint, Spark notebooks, Power BI Direct Lake, and KQL queries against OneLake. This is the "load once, use everywhere" promise of OneLake in action.

1. In the lakehouse Explorer, expand **Files** and select `Dim_Products.csv`.
1. Select the **More options** (**...**) menu next to the file, then select **Load to Tables** > **New table**.
1. In the **Load to table** dialog, enter `dim_products` for the table name, keep the defaults, and select **Load**.
1. After the load finishes, expand **Tables** and select `dim_products` to preview the rows. The raw CSV in **Files** is unchanged, and `dim_products` is a new Delta table built from it.

## Reuse the data with a shortcut from a second lakehouse

Uploading and loading is one way to get data into OneLake. The other key pattern is to reference data that already exists somewhere else, without duplicating it. That's what a shortcut is: a pointer in OneLake that references data stored in another lakehouse, in another Fabric workspace, in Azure Data Lake Storage Gen2, in Amazon S3, or in other supported sources. The data isn't copied; it stays in the source location, but you can read it through OneLake as if it were local. Any updates to the source are immediately visible through the shortcut, so you avoid the cost, latency, and drift of maintaining copies.

In this section, you create a second lakehouse and add a shortcut from it back to the `dim_products` table in your first lakehouse. This simulates a common real-world setup, where one team owns the curated data and other teams or projects consume it through shortcuts in their own workspaces.

1. In your workspace, select **+ New item**.
1. In the **New item** pane, search for **Lakehouse**, then select the **Lakehouse** tile.
1. Enter a name, such as `onelake_quickstart_reuse`, then select **Create**.
1. In the new lakehouse's Explorer, hover over **Tables**, select the **More options** (**...**) menu, and then select **New shortcut**.
1. On the **New shortcut** page, under **Internal sources**, select **Microsoft OneLake**.
1. In the data source browser, expand your workspace, select the `onelake_quickstart` lakehouse, and then select **Next**.
1. Expand **Tables**, select the `dim_products` table, and then select **Next**.
1. Review the selection and select **Create**.
1. Expand **Tables** in `onelake_quickstart_reuse` and confirm that `dim_products` appears with a shortcut icon. Select it to preview the rows. The data is the same as in the original lakehouse, but no data was copied.

## Clean up resources

If you don't plan to use the lakehouses you created in other OneLake quickstarts, delete them to avoid OneLake storage charges against your Fabric capacity.

1. In your workspace, find the `onelake_quickstart_reuse` lakehouse.
1. Select the **More options** (**...**) menu next to the lakehouse, select **Delete**, and confirm the deletion.
1. Repeat the previous steps for the `onelake_quickstart` lakehouse.

Deleting the lakehouses also removes the uploaded file, the `dim_products` Delta table, and the shortcut.

## Related content

- [OneLake shortcuts](onelake-shortcuts.md)
- [Create an Azure Data Lake Storage Gen2 shortcut](create-adls-shortcut.md)
- [Tutorial: Move data into a lakehouse with a pipeline](../data-factory/tutorial-move-data-lakehouse-pipeline.md)
