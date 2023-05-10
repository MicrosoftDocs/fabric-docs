---
title: Open Access quickstart, Use pipelines to ingest data into OneLake and analyze with Azure Databricks
description: Learn how to use pipelines to ingest data into OneLake and analyze with Azure Databricks
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.date: 05/23/2023
---

# Open Access: Use pipelines to ingest data into OneLake and analyze with Azure Databricks

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this guide, you will:

- Create a pipeline in workspace and ingest data into OneLake in delta format
- Analyze delta table in OneLake using Azure Databricks

## Prerequisites

- A workspace with a lakehouse item.
- A premium Azure Databricks workspace. Only premium Azure Databricks workspaces support Microsoft Azure Active Directory credential passthrough. When creating your cluster, enable Azure Data Lake Storage credential passthrough in the Advanced Options.
- A sample dataset.

## Steps

1. Navigate to your lakehouse in the Power BI service and select **Get Data** and then select **New data pipeline**.

    :::image type="content" source="media\onelake-open-access-quickstart\onelake-new-pipeline.png" alt-text="Screenshot showing how to navigate to new data pipeline option from within the UI." lightbox="media\onelake-open-access-quickstart\onelake-new-pipeline.png":::

1. In the New Pipeline prompt, enter a name for the new pipeline and then select **Create**.

1. For this exercise, choose NYC Taxi - Green sample data as the data source. Select **Next** after the sample dataset has been selected.

    :::image type="content" source="media\onelake-open-access-quickstart\onelake-nyc-taxi.png" alt-text="Screenshot showing how to select NYC sample dataset." lightbox="media\onelake-open-access-quickstart\onelake-nyc-taxi.png":::

1. Select **Next** again at the preview screen.

1. For data destination, select the name of the lakehouse where you want to store the data on OneLake as a delta table. You can choose an existing lakehouse or create a new lakehouse.

    :::image type="content" source="media\onelake-open-access-quickstart\onelake-dest-lake.png" alt-text="Screenshot showing how to select destination lakehouse." lightbox="media\onelake-open-access-quickstart\onelake-dest-lake.png":::

1. Select where you want to store the output. Choose Tables as the Root folder and enter 'nycsample' as the table name.

1. At the Review + Save screen, select **Start data transfer immediately** and then select **Save + Run**.

    :::image type="content" source="media\onelake-open-access-quickstart\onelake-final-pipeline-review.png" alt-text="Screenshot showing how to enter table name." lightbox="media\onelake-open-access-quickstart\onelake-final-pipeline-review.png":::

1. Once the job has completed, navigate to your lakehouse and view the delta table listed under /Tables.

1. Copy the abfs path to your delta table to by right-clicking the table name in the Explorer view and selecting **Properties**.

1. Open your Azure Databricks notebook. Read the delta table on OneLake.

    ```python
    olsPath = "abfss://<replace with workspace name>@onelake.dfs.fabric.microsoft.com/<replace with item name>.Lakehouse/Tables/nycsample" 
    df=spark.read.format('delta').option("inferSchema","true").load(olsPath)
    df.show(5)
    ```

1. Update data in the delta table on OneLake by updating a value of a field in the delta table.

    ```python
    %sql
    update delta.`abfss://<replace with workspace name>@onelake.dfs.fabric.microsoft.com/<replace with item name>.Lakehouse/Tables/nycsample` set vendorID = 99999 where vendorID = 1;
    ```

## Summary

In this guide, you ingested data into OneLake using the pipeline experience and created a delta table. The delta table on OneLake is then read and modified via Azure Databricks.
