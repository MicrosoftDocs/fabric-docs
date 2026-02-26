---
title: How to use the Stored procedure activity
description: Learn how to use Stored procedure activity to execute a SQL stored procedure with Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.custom: pipelines
ms.date: 12/18/2024
---

# How to use Stored procedure activity

In this article, you learn how to add a new Stored procedure activity to a pipeline, add a new connection, and configure the activity to run.

You can use the Stored Procedure Activity to invoke a stored procedure in one of the following data stores:
- [Fabric SQL database](/fabric/data-factory/connector-sql-database-overview)
- [Fabric Data Warehouse](/fabric/data-factory/connector-data-warehouse-overview)
- [Azure SQL Database](/fabric/data-factory/connector-azure-sql-database-overview)
- [Azure SQL Managed Instance](/fabric/data-factory/connector-azure-sql-managed-instance-overview)
- [Azure Synapse Analytics](/fabric/data-factory/connector-azure-synapse-analytics-overview)
- [Amazon RDS](/fabric/data-factory/connector-amazon-rds-for-sql-server-overview)
- [SQL Server Database](/fabric/data-factory/connector-sql-server-database-overview)

## Prerequisites

To get started, you must complete the following prerequisites:  

- A tenant account with an active subscription. Create an account for free.
- A workspace is created.

## Step 1: Add a new Stored procedure activity in the pipeline canvas

1. Open an existing pipeline or create a new pipeline.
1. Select the **Stored procedure** activity.

   :::image type="content" source="media/stored-procedure-activity/add-stored-procedure-activity.png" alt-text="Screenshot showing where to select the Stored procedure activity." lightbox="media/stored-procedure-activity/add-stored-procedure-activity.png":::

## Step 2: Add a new connection for SQL

1. Select the **Settings** tab. Select **New** to create a new connection.

   :::image type="content" source="media/stored-procedure-activity/stored-procedure-activity-settings.png" alt-text="Screenshot showing where to select New in the settings tab." lightbox="media/script-activity/script-activity-settings.png":::

2. In the new popup window, choose the target SQL source type, then select **Continue**. The Stored procedure activity in Fabric currently supports Azure SQL and Azure SQL Managed instances.

   :::image type="content" source="media/stored-procedure-activity/new-connection.png" alt-text="Screenshot showing where to choose the target source type." lightbox="media/stored-procedure-activity/new-connection.png":::

3. Provide the connection details for the new connection and select **Create**.

   :::image type="content" source="media/stored-procedure-activity/new-connection-details.png" lightbox="media/stored-procedure-activity/new-connection-details.png" alt-text="Screenshot showing the details on the New connection screen.":::

## Step 3: Choose a stored procedure and configure parameters

Select a stored procedure, and optionally import its parameters or manually add parameters. Select the **Import** button to import the parameters from the stored procedure as it is stored in the data source, or add them manually by selecting the **+ New** button for each parameter, then providing its name and data type, and nullability setting. Provide a value for each parameter, either by entering text directly, or by using a [custom expression](expression-language.md) to populate the value. 

:::image type="content" source="media/stored-procedure-activity/select-procedure.png" alt-text="Screenshot showing where to select the stored procedure to execute and optionally configure its parameters.":::

## Step 4: Save and run or schedule the pipeline

Switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [Monitor pipeline runs](monitor-pipeline-runs.md)
