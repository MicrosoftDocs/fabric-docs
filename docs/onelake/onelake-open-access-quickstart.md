---
title: Ingest data into OneLake and analyze with Azure Databricks
description: Learn how to create a pipeline to ingest data into OneLake and analyze that data with Azure Databricks.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
ms.date: 02/25/2025
#customer intent: As a data engineer, I want to learn how to load data into OneLake and analyze it with Azure Databricks so that I can use my Azure Databricks notebook to read from and write to Delta tables.
---

# Ingest data into OneLake and analyze with Azure Databricks

In this guide, you will:

- Create a pipeline in a workspace and ingest data into your OneLake in Delta format.

- Read and modify a Delta table in OneLake with Azure Databricks.

## Prerequisites

Before you start, you must have:

- A workspace with a Lakehouse item.

- A premium Azure Databricks workspace. Only premium Azure Databricks workspaces support Microsoft Entra credential passthrough. When creating your cluster, enable Azure Data Lake Storage credential passthrough in the **Advanced Options**.

- A sample dataset.

## Ingest data and modify the Delta table

1. Navigate to your lakehouse in the Power BI service and select **Get data** and then select **New pipeline**.

   :::image type="content" source="media\onelake-open-access-quickstart\onelake-new-pipeline.png" alt-text="Screenshot showing how to navigate to new pipeline option from within the UI.":::

1. In the **New Pipeline** prompt, enter a name for the new pipeline and then select **Create**.

1. For this exercise, select the **NYC Taxi - Green** sample data as the data source.

   :::image type="content" source="media\onelake-open-access-quickstart\onelake-nyc-taxi.png" alt-text="Screenshot showing how to select NYC sample semantic model.":::

1. On the preview screen, select **Next**.

1. For data destination, select the name of the lakehouse you want to use to store the OneLake Delta table data. You can choose an existing lakehouse or create a new one.

   :::image type="content" source="media\onelake-open-access-quickstart\onelake-dest-lake.png" alt-text="Screenshot showing how to select destination lakehouse.":::

1. Select where you want to store the output. Choose **Tables** as the Root folder. Enter "nycsample" as the table name and select **Next**.

1. On the **Review + Save** screen, select **Start data transfer immediately** and then select **Save + Run**.

   :::image type="content" source="media\onelake-open-access-quickstart\onelake-final-pipeline-review.png" alt-text="Screenshot showing how to enter table name.":::

1. When the job is complete, navigate to your lakehouse and view the delta table listed under /Tables folder.

1. Right-click on the created table name, select **Properties**, and copy the Azure Blob Filesystem (ABFS) path.

1. Open your Azure Databricks notebook. Read the Delta table on OneLake.

    ```python
    olsPath = "abfss://<replace with workspace name>@onelake.dfs.fabric.microsoft.com/<replace with item name>.Lakehouse/Tables/nycsample" 
    df=spark.read.format('delta').option("inferSchema","true").load(olsPath)
    df.show(5)
    ```

1. Update the Delta table data by changing a field value.

    ```python
    %sql
    update delta.`abfss://<replace with workspace name>@onelake.dfs.fabric.microsoft.com/<replace with item name>.Lakehouse/Tables/nycsample` set vendorID = 99999 where vendorID = 1;
    ```

## Related content

- [Transform data with Apache Spark and query with SQL](onelake-onecopy-quickstart.md)
