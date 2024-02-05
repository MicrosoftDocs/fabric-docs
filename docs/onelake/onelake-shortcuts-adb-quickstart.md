---
title: Connect to ADLS and transform the data with Azure Databricks
description: Create a Delta table in your ADLS Gen2 account using Azure Databricks, create a shortcut to that table, and then build a Power BI report.
ms.reviewer: eloldag
ms.author: harmeetgill
author: gillharmeet
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/27/2023
---

# Connect to ADLS and transform the data with Azure Databricks

In this guide, you will:

- Create a Delta table in your Azure Data Lake Storage (ADLS) Gen2 account using Azure Databricks.

- Create a OneLake shortcut to a Delta table in ADLS.

- Use Power BI to analyze data via the ADLS shortcut.

## Prerequisites

Before you start, you must have:

- A workspace with a Lakehouse item

- An Azure Databricks workspace

- An ADLS Gen2 account to store Delta tables

## Create a Delta table, create a shortcut, and analyze the data

1. Using an Azure Databricks notebook, create a Delta table in your ADLS Gen2 account.

   ```python
    # Replace the path below to refer to your sample parquet data with this syntax "abfss://<storage name>@<container name>.dfs.core.windows.net/<filepath>"
    
    # Read Parquet files from an ADLS account
    df = spark.read.format('Parquet').load("abfss://datasetsv1@olsdemo.dfs.core.windows.net/demo/full/dimension_city/")
    
    # Write Delta tables to ADLS account
    df.write.mode("overwrite").format("delta").save("abfss://datasetsv1@olsdemo.dfs.core.windows.net/demo/adb_dim_city_delta/")
   ```

1. In your lakehouse, select the ellipses (…) next to **Tables** and then select **New shortcut**.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\new-table-shortcut.png" alt-text="Screenshot showing location of New Shortcut in Tables.":::

1. In the **New shortcut** screen, select the **Azure Data Lake Storage Gen2** tile.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\new-shortcut-tile-options-v2.png" alt-text="Screenshot of the tile options in the New shortcut screen." lightbox="media\onelake-shortcuts-adb-quickstart\new-shortcut-tile-options-v2.png":::

1. Specify the connection details for the shortcut and select **Next**.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\connection-details.png" alt-text="Screenshot showing where to enter the Connection settings for a new shortcut." lightbox="media\onelake-shortcuts-adb-quickstart\connection-details.png":::

1. Specify the shortcut details. Provide a **Shortcut Name** and **Sub path** details and then select **Create**. The sub path should point to the directory where the Delta table resides.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\new-shortcut-details.png" alt-text="Screenshot showing where to enter new shortcut details." lightbox="media\onelake-shortcuts-adb-quickstart\new-shortcut-details.png":::

1. The shortcut appears as a Delta table under **Tables**.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\navigate-adls-shortcut.png" alt-text="Screenshot showing location of newly created ADLS shortcut.":::

1. You can now query this data directly from a notebook.

   ```python
   df = spark.sql("SELECT * FROM lakehouse1.adls_shortcut_adb_dim_city_delta LIMIT 1000")
   display(df)
   ```

1. To access and analyze this Delta table via Power BI, select **New Power BI semantic model**.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\new-pbi-dataset.png" alt-text="Screenshot showing how to create new Power BI semantic model.":::

1. Select the shortcut and then select **Confirm**.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\new-dataset.png" alt-text="Screenshot showing new semantic model setup.":::

1. When the data is published, select **Start from scratch**.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\start-from-scratch.png" alt-text="Screenshot showing process to set up a dataset.":::

1. In the report authoring experience, the shortcut data appears as a table along with all its attributes.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\authoring-experience.png" alt-text="Screenshot showing authoring experience and table attributes.":::

1. To build a Power BI report, drag the attributes to the pane on the left-hand side.

   :::image type="content" source="media\onelake-shortcuts-adb-quickstart\pbi-report.png" alt-text="Screenshot showing data being queried through Power BI report.":::

## Related content

- [Ingest data into OneLake and analyze with Azure Databricks](onelake-open-access-quickstart.md)
