---
title: Move data from Azure SQL DB to Lakehouse via data pipeline
description: Learn steps to move data as files or tables into Lakehouse via data pipeline.
ms.reviewer: jonburchel
ms.author: jianleishen
author: jianleishen
ms.topic: tutorial
ms.custom: build-2023
ms.date: 10/10/2023
ms.search.form: Pipeline Copy Assistant
---

# Move data from Azure SQL DB to Lakehouse via data pipeline

In this tutorial, you build a data pipeline to move data in Azure SQL Database to Lakehouse. This experience shows you a quick demo about how to use data pipeline copy activity and how to load data into Lakehouse.

## Prerequisites

To get started, you must complete the following prerequisites:

- A Microsoft Fabric tenant account with an active subscription. Create an account for free.
- Make sure you have a Microsoft Fabric enabled Workspace: [Create a workspace](../get-started/create-workspaces.md).

## Create a data pipeline

1. Navigate to [Power BI](https://app.powerbi.com/).
1. Select the Power BI icon in the bottom left of the screen, then select **Data factory** to open homepage of Data Factory.

   :::image type="content" source="media/copy-data-activity/select-data-factory.png" alt-text="Screenshot with the data factory experience emphasized.":::

1. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace. If you created a new workspace in the prior Prerequisites section, use this one.

   :::image type="content" source="media/copy-data-activity/navigate-to-workspace.png" alt-text="Screenshot of the workspaces window where you navigate to your workspace.":::

1. Select **Data pipeline** and then input a pipeline name to create a new pipeline.

   :::image type="content" source="media/copy-data-activity/select-pipeline.png" alt-text="Screenshot showing the new data pipeline button in the newly created workspace.":::

   :::image type="content" source="media/copy-data-activity/new-pipeline.png" alt-text="Screenshot showing the name of creating a new pipeline.":::

## Copy data using data pipeline

In this session, you start to build your data pipeline by following below steps about copying data from Azure SQL Database to Lakehouse.

### Add a copy activity

1. Open an existing data pipeline or create a new data pipeline.
1. Add a copy activity either by selecting **Add pipeline activity** > **Copy activity** or by selecting **Copy data** > **Add to canvas** under the **Activities** tab.

   :::image type="content" source="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png" alt-text="Screenshot showing two ways to add a copy activity." lightbox="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png":::

### Configure your source under the source tab

1. Select **+ New** beside the **Connection** to create a connection to your data source.

   :::image type="content" source="media/copy-data-activity/configure-source-connection-in-pipeline.png" alt-text="Screenshot showing where to select New." lightbox="media/copy-data-activity/configure-source-connection-in-pipeline.png":::

   1. Choose the data source type from the pop-up window. You'll use Azure SQL Database as an example. Select **Azure SQL Database**, and then select **Continue**.
   
      :::image type="content" source="media/copy-data-activity/choose-azure-sql-database-connection-in-pipeline.png" alt-text="Screenshot showing how to select the data source." lightbox="media/copy-data-activity/choose-azure-sql-database-connection-in-pipeline.png":::

   1. It navigates to the connection creation page. Fill in the required connection information on the panel, and then select **Create**. For the details of connection creation for each type of data source, you can refer to each [connector article](connector-overview.md#supported-data-stores-in-data-pipeline).
   
      :::image type="content" source="media/copy-data-activity/configure-connection-details.png" alt-text="Screenshot showing New connection page." lightbox="media/copy-data-activity/configure-connection-details.png":::

   1. Once your connection is created successfully, it takes you back to the data pipeline page. Then select **Refresh** to fetch the connection that you created from the drop-down list. You could also choose an existing Azure SQL Database connection from the drop-down directly if you already created it before. The capabilities of **Test connection** and **Edit** are available to each selected connection. Then select **Azure SQL Database** in **Connection** type.
   
      :::image type="content" source="media/copy-data-activity/refresh-source-connection-in-pipeline.png" alt-text="Screenshot showing where to refresh your connection." lightbox="media/copy-data-activity/refresh-source-connection-in-pipeline.png":::

1. Specify a table to be copied. Select **Preview data** to preview your source table. You can also use **Query** and **Stored procedure** to read data from your source.

   :::image type="content" source="media/copy-data-activity/specify-source-data.png" alt-text="Screenshot showing source table settings options." lightbox="media/copy-data-activity/specify-source-data.png":::

1. Expand **Advanced** for more advanced settings.

   :::image type="content" source="media/copy-data-activity/advanced-details-in-pipeline.png" alt-text="Screenshot of advanced settings." lightbox="media/copy-data-activity/advanced-details-in-pipeline.png":::

### Configure your destination under the destination tab

1. Choose your destination type. It could be either your internal first class data store from your workspace, such as Lakehouse, or your external data stores. You'll use Lakehouse as an example.

   :::image type="content" source="media/copy-data-activity/configure-destination-connection-in-pipeline.png" alt-text="Screenshot showing where to select destination type." lightbox="media/copy-data-activity/configure-destination-connection-in-pipeline.png":::

1. Choose to use **Lakehouse** in **Workspace data store type**. Select **+ New**, and it navigates you to the Lakehouse creation page. Specify your Lakehouse name and then select **Create**.

   :::image type="content" source="media/copy-data-activity/create-lakehouse.png" alt-text="Screenshot showing Lakehouse creation." lightbox="media/copy-data-activity/create-lakehouse.png":::

1. Once your connection is created successfully, it takes you back to the data pipeline page. Then select **Refresh** to fetch the connection that you created from the drop-down list. You could also choose an existing Lakehouse connection from the drop-down directly if you already created it before.

   :::image type="content" source="media/copy-data-activity/destination-connection-in-pipeline.png" alt-text="Screenshot showing selecting connection." lightbox="media/copy-data-activity/destination-connection-in-pipeline.png":::

1. Specify a table or set up the file path to define the file or folder as the destination. Here select **Tables** and specify a table to write data.

   :::image type="content" source="media/copy-data-activity/configure-destination-file-settings-in-pipeline.png" alt-text="Screenshot showing where to find Table settings." lightbox="media/copy-data-activity/configure-destination-file-settings-in-pipeline.png":::

1. Expand **Advanced** for more advanced settings.

   :::image type="content" source="media/copy-data-activity/configure-destination-file-details-in-pipeline.png" alt-text="Screenshot of Advanced options." lightbox="media/copy-data-activity/configure-destination-file-details-in-pipeline.png":::

Now you can either save your data pipeline with this single copy activity or continue to design your data pipeline.

## Run and schedule your data pipeline

After completing the configuration of your data pipeline, run the data pipeline to trigger the copy activity. You can also schedule your data pipeline run if needed.

1. Switch to the **Home** tab and select **Run**. A confirmation dialog is displayed. Then select **Save and run** to start the activity.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/save-and-run.png" alt-text="Screenshot of saving and running activity.":::

1. You can monitor the running process and check the results on the **Output** tab below the data pipeline canvas. Select the run details button (with the glasses icon highlighted) to view the run details.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/output.png" alt-text="Screenshot of the output of the data pipeline.":::

1. The run details show how much data was read and written and various other details about the run.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/copy-details.png" alt-text="Screenshot of the details of the copy activity.":::

1. You can also schedule the data pipeline to run with a specific frequency as required. Below is an example scheduling the data pipeline to run every 15 minutes. You can also specify the **Start** time and **End** time for your schedule. If you don't specify a start time, the start time is the time your schedule applies. If you don't specify an end time, your data pipeline run will keep recurring every 15 minutes.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/schedule.png" alt-text="Screenshot of scheduling the data pipeline.":::

## Next steps

- [Connector overview](connector-overview.md)
- [How to monitor data pipeline runs](monitor-pipeline-runs.md)