---
title: Move data from Azure SQL DB to Lakehouse via pipeline
description: Learn steps to move data as files or tables into Lakehouse via pipeline.
ms.reviewer: jianleishen
ms.topic: tutorial
ms.custom: pipelines, sfi-image-nochange
ms.date: 12/18/2024
ms.search.form: Pipeline Copy Assistant
---

# Move data from Azure SQL DB to Lakehouse via pipeline

In this tutorial, you build a pipeline to move data in Azure SQL Database to Lakehouse. This experience shows you a quick demo about how to use pipeline copy activity and how to load data into Lakehouse.

## Prerequisites

To get started, you must complete the following prerequisites:

- A Microsoft Fabric tenant account with an active subscription. Create an account for free.
- Make sure you have a Microsoft Fabric enabled Workspace: [Create a workspace](../fundamentals/create-workspaces.md).

## Create a pipeline

1. Navigate to [Power BI](https://app.powerbi.com/).
1. Select the Power BI icon in the bottom left of the screen, then select **Fabric** to open homepage of Data Factory.
1. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace. If you created a new workspace in the prior Prerequisites section, use this one.

   :::image type="content" source="media/copy-data-activity/navigate-to-workspace.png" alt-text="Screenshot of the workspaces window where you navigate to your workspace.":::

1. Select  **+ New item**.
1. Search for and select **Pipeline** and then input a pipeline name to create a new pipeline. to create a new pipeline.

   :::image type="content" source="media/copy-data-activity/select-pipeline.png" alt-text="Screenshot showing the new pipeline button in the newly created workspace.":::

   :::image type="content" source="media/copy-data-activity/new-pipeline.png" alt-text="Screenshot showing the name of creating a new pipeline.":::

## Copy data using a pipeline

In this session, you start to build your pipeline by following below steps about copying data from Azure SQL Database to Lakehouse.

### Add a copy activity

1. Open an existing pipeline or create a new pipeline.
1. Add a copy activity either by selecting **Add pipeline activity** > **Copy activity** or by selecting **Copy data** > **Add to canvas** under the **Activities** tab.

   :::image type="content" source="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png" alt-text="Screenshot showing two ways to add a copy activity." lightbox="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png":::

### Configure your source under the source tab

1. In **Connection**, select an existing connection, or select **More** to create a new connection.

   1. Choose the data source type from the pop-up window. You'll use Azure SQL Database as an example. Select **Azure SQL Database**, and then select **Continue**.

      :::image type="content" source="media/copy-data-activity/choose-azure-sql-database-connection-in-pipeline.png" alt-text="Screenshot showing how to select the data source." lightbox="media/copy-data-activity/choose-azure-sql-database-connection-in-pipeline.png":::

   1. It navigates to the connection creation page. Fill in the required connection information on the panel, and then select **Create**. For the details of connection creation for each type of data source, you can refer to each [connector article](connector-overview.md#supported-connectors-in-fabric).

   1. Once your connection is created successfully, it takes you back to the pipeline page. Then select **Refresh** to fetch the connection that you created from the drop-down list. You could also choose an existing Azure SQL Database connection from the drop-down directly if you already created it before. The capabilities of **Test connection** and **Edit** are available to each selected connection. Then select **Azure SQL Database** in **Connection** type.

1. Specify a table to be copied. Select **Preview data** to preview your source table. You can also use **Query** and **Stored procedure** to read data from your source.

1. Expand **Advanced** for more advanced settings.

   :::image type="content" source="media/copy-data-activity/advanced-details-in-pipeline.png" alt-text="Screenshot of advanced settings." lightbox="media/copy-data-activity/advanced-details-in-pipeline.png":::

### Configure your destination under the destination tab

1. In **Connection** select an existing connection, or select **More** and then search for your lakehouse.

1. Once your connection is created successfully, it takes you back to the pipeline page. Then select **Refresh** to fetch the connection that you created from the drop-down list. You could also choose an existing Lakehouse connection from the drop-down directly if you already created it before.

1. Specify a table or set up the file path to define the file or folder as the destination. Here select **Tables** and specify a table to write data.

1. Expand **Advanced** for more advanced settings.

Now you can either save your pipeline with this single copy activity or continue to design your pipeline.

## Run and schedule your pipeline

After completing the configuration of your pipeline, run the pipeline to trigger the copy activity. You can also schedule your pipeline run if needed.

1. Switch to the **Home** tab and select **Run**. A confirmation dialog is displayed. Then select **Save and run** to start the activity.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/save-and-run.png" alt-text="Screenshot of saving and running activity.":::

1. You can monitor the running process and check the results on the **Output** tab below the pipeline canvas. Select the run details button (with the glasses icon highlighted) to view the run details.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/output.png" alt-text="Screenshot of the output of the pipeline.":::

1. The run details show how much data was read and written and various other details about the run.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/copy-details.png" alt-text="Screenshot of the details of the copy activity.":::

1. You can also schedule the pipeline to run with a specific frequency as required. Below is an example scheduling the pipeline to run every 15 minutes. You can also specify the **Start** time and **End** time for your schedule. If you don't specify a start time, the start time is the time your schedule applies. If you don't specify an end time, your pipeline run will keep recurring every 15 minutes.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/schedule.png" alt-text="Screenshot of scheduling the pipeline.":::

## Related content

- [Connector overview](connector-overview.md)
- [How to monitor pipeline runs](monitor-pipeline-runs.md)
