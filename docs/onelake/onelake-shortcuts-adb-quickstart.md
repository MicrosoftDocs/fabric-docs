---
title: Shortcut ADLS data transformed with Azure Databricks into OneLake and build Power BI Report
description: Learn how to create delta table in your ADLS Gen2 account using Azure Databricks, create shortcut to access that delta table and then build Power BI Report.
ms.reviewer: eloldag
ms.author: harmeetgill
author: gillharmeet
ms.topic: how-to
ms.date: 05/23/2023
---

# Shortcut ADLS data transformed with Azure Databricks into OneLake and build Power BI Report.

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this guide, you will:

- Create a delta table in your ADLS Gen2 account using Azure Databricks.

- Create a OneLake shortcut to a delta table in ADLS.

- Use Power BI to analyze data in ADLS Shortcut.

## Prerequisites

- A workspace with a Lakehouse item.
- An Azure Databricks workspace.
- An ADLS Gen2 account to store delta tables.

## Steps

1. Using Azure Databricks notebook, create a delta table in ADLS Gen2 account.

   ```python
    # Replace the path below to refer to your sample parquet data with this syntax "abfss://<storage name>@<container name>.dfs.core.windows.net/<filepath>"
    
    # Read Parquet files from an ADLS account
    df = spark.read.format('Parquet').load("abfss://datasetsv1@olsdemo.dfs.core.windows.net/demo/full/dimension_city/")
    
    # Write Delta tables to ADLS account
    df.write.mode("overwrite").format("delta").save("abfss://datasetsv1@olsdemo.dfs.core.windows.net/demo/adb_dim_city_delta/")
   ```

1. In your lakehouse, click on ellipses (…) next to the Tables and select New Shortcut.

    :::image type="content" source="media\onelake-shortcuts-adb-quickstart\new-table-shortcut.png" alt-text="Screenshot showing location of New Shortcut in Tables." lightbox="media\onelake-shortcuts-adb-quickstart\new-table-shortcut.png":::

1. In the **New shortcut** screen, select **Azure Data Lake Storage Gen2** tile

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\new-shortcut-tile-options-v2.png" alt-text="Screenshot of the tile options in the New shortcut screen." lightbox="media\onelake-shortcuts-adb-quickstart\new-shortcut-tile-options-v2.png":::

1. Specify the connection details this shortcut will use and select **Next**

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\connection-details.png" alt-text="Screenshot showing where to enter the Connection settings for a new shortcut." lightbox="media\onelake-shortcuts-adb-quickstart\connection-details.png":::

1. Specify the shortcut details. Provide a **Shortcut Name** and **Sub path** details and then click **Create**. The sub path should point to the directory where the delta table resides.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\new-shortcut-details.png" alt-text="Screenshot showing where to enter new shortcut details." lightbox="media\onelake-shortcuts-adb-quickstart\new-shortcut-details.png":::

1. The shortcut pointing to a delta table created by Azure Databricks on ADLS now appears as a delta table under Tables.

     :::image type="content" source="media\onelake-shortcuts-adb-quickstart\navigate-adls-shortcut.png" alt-text="Screenshot showing location of newly created ADLS shortcut." lightbox="media\onelake-shortcuts-adb-quickstart\navigate-adls-shortcut.png":::

1. This data can now be queried directly from notebook.

   ```python
   df = spark.sql("SELECT * FROM lakehouse1.adls_shortcut_adb_dim_city_delta LIMIT 1000")
   display(df)
   ```

1. To access and analyze this delta table via Power BI, click on **New Power BI dataset**.

    :::image type="content" source="media\onelake-shortcuts-adb-quickstart\new-pbi-dataset.png" alt-text="Screenshot showing how to create new Power BI dataset." lightbox="media\onelake-shortcuts-adb-quickstart\new-pbi-dataset.png":::

1. Select the shortcut and click on **Confirm**.

    :::image type="content" source="media\onelake-shortcuts-adb-quickstart\new-dataset.png" alt-text="Screenshot showing new dataset setup." lightbox="media\onelake-shortcuts-adb-quickstart\new-dataset.png":::

1. Once data has been published, click on **Start from scratch**.

    :::image type="content" source="media\onelake-shortcuts-adb-quickstart\start-from-scratch.png" alt-text="Screenshot showing process to setup a dataset." lightbox="media\onelake-shortcuts-adb-quickstart\start-from-scratch.png":::

1. In the report authoring experience, the shortcut data appears as a table along with all of its attributes.

    :::image type="content" source="media\onelake-shortcuts-adb-quickstart\authoring-experience.png" alt-text="Screenshot showing authoring experience and table attributes." lightbox="media\onelake-shortcuts-adb-quickstart\authoring-experience.png":::

1. Drag the attributes to the pane on the left-hand side to build a Power BI report.

    :::image type="content" source="media\onelake-shortcuts-adb-quickstart\pbi-report.png" alt-text="Screenshot showing data being queried through Power BI report." lightbox="media\onelake-shortcuts-adb-quickstart\pbi-report.png":::

## Summary

In this quickstart guide, you created a OneLake shortcut to read an Azure Databricks delta table on ADLS account. This shortcut is then used to analyze data using a notebook and Power BI report.
