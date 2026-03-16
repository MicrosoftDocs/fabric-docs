---
title: Move and transform data with dataflow and pipelines
description: Steps for moving and transforming data with dataflows and pipelines.
ms.reviewer: noelleli
ms.topic: quickstart
ms.custom:
- dataflows
- pipelines
- sfi-image-nochange
ms.date: 09/08/2025
ai-usage: ai-assisted
---

# Quickstart: Create a solution to move and transform data

In this quickstart, you learn how dataflows and pipelines work together to create a powerful Data Factory solution. You'll clean data with dataflows and move it with pipelines.

## Prerequisites

Before you start, you need:

- A tenant account with an active subscription. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A [!INCLUDE [product-name](../includes/product-name.md)] enabled workspace: [Set up a workspace](../fundamentals/create-workspaces.md) that isn’t the default My Workspace.
- [An Azure SQL database with table data](/azure/azure-sql/database/single-database-create-quickstart).
- [A Blob Storage account](/azure/storage/common/storage-account-create).

## Compare dataflows and pipelines

Dataflow Gen2 provide a low-code interface with 300+ data and AI-based transformations. You can easily clean, prep, and transform data with flexibility. Pipelines offer rich data orchestration capabilities to compose flexible data workflows that meet your enterprise needs.

In a pipeline, you can create logical groupings of activities that perform a task. This might include calling a dataflow to clean and prep your data. While there's some functionality overlap between the two, your choice depends on whether you need the full capabilities of pipelines or can use the simpler capabilities of dataflows. For more information, see the [Fabric decision guide](../fundamentals/decision-guide-pipeline-dataflow-spark.md).

## Transform data with dataflows

Follow these steps to set up your dataflow.

### Create a dataflow

1. Select your Fabric-enabled workspace, then **New**, and choose **Dataflow Gen2**.

   :::image type="content" source="media/transform-data/select-dataflow.png" alt-text="Screenshot of starting a Dataflow Gen2." lightbox="media/transform-data/select-dataflow.png":::

1. In the dataflow editor, select **Import from SQL Server**.

   :::image type="content" source="media/transform-data/start-creating-dataflow-inline.png" alt-text="Screenshot of the dataflow editor." lightbox="media/transform-data/start-creating-dataflow.png":::

### Get data

1. In the **Connect to data source** dialog, enter your Azure SQL database details and select **Next**. Use the **AdventureWorksLT** sample database from the prerequisites.

   :::image type="content" source="media/transform-data/select-azure-sql-inline.png" alt-text="Screenshot of connecting to an Azure SQL database." lightbox="media/transform-data/select-azure-sql.png":::

1. Select the data to transform, such as **SalesLT.Customer**, and use **Select related tables** to include related tables. Then select **Create**.

   :::image type="content" source="media/transform-data/data-to-transform-inline.png" alt-text="Screenshot of selecting data to transform." lightbox="media/transform-data/data-to-transform.png":::

### Transform your data

1. Select **Diagram view** from the status bar or the **View** menu in the Power Query editor.

   :::image type="content" source="media/transform-data/select-diagram-view-inline.png" alt-text="Screenshot of selecting diagram view." lightbox="media/transform-data/select-diagram-view.png":::

1. Right-select your **SalesLT Customer** query, or select the vertical ellipsis on the right of the query, then select **Merge queries**.

   :::image type="content" source="media/transform-data/select-merge-query.png" alt-text="Screenshot of the Merge queries option.":::

1. Configure the merge with **SalesLTOrderHeader** as the right table, **CustomerID** as the join column, and **Left outer** as the join type. Select **OK**.

   :::image type="content" source="media/transform-data/select-join-keys-kind.png" alt-text="Screenshot of the Merge configuration screen.":::

1. Add a data destination by selecting the database symbol with an arrow. Choose **Azure SQL database** as the destination type.

   :::image type="content" source="media/transform-data/select-data-destination-inline.png" alt-text="Screenshot of the Add data destination button." lightbox="media/transform-data/select-data-destination.png":::

1. Provide the details for your Azure SQL database connection where the merge query is to be published. In this example, we use the **AdventureWorksLT** database we used as the data source for the destination too.

   :::image type="content" source="media/transform-data/configure-data-destination.png" alt-text="Screenshot of the Connect to data destination dialog.":::

1. Choose a database to store the data, and provide a table name, then select **Next**.

   :::image type="content" source="media/transform-data/choose-table-for-merge-query.png" alt-text="Screenshot of the Choose destination target window.":::

1. Accept the default settings in the **Choose destination settings** dialog and select **Save settings**.

   :::image type="content" source="media/transform-data/choose-destination-settings.png" alt-text="Screenshot of the Choose destination settings dialog.":::

1. Select **Publish** in the dataflow editor to publish the dataflow.

   :::image type="content" source="media/transform-data/publish-dataflow-gen2-inline.png" alt-text="Screenshot highlighting the Publish button on the dataflow gen2 editor." lightbox="media/transform-data/publish-dataflow-gen2.png":::

## Move data with pipelines

Now that you've created a Dataflow Gen2, you can operate on it in a pipeline. In this example, you copy the data generated from the dataflow into text format in an Azure Blob Storage account.

### Create a new pipeline

1. In your workspace, select **New**, then **Pipeline**.

   :::image type="content" source="media/transform-data/create-new-pipeline.png" alt-text="Screenshot of creating a new pipeline.":::

1. Name your pipeline and select **Create**.

   :::image type="content" source="media/transform-data/name-pipeline.png" alt-text="Screenshot showing the new pipeline creation prompt with a sample pipeline name.":::

### Configure your dataflow

1. Add a dataflow activity to your pipeline by selecting **Dataflow** in the **Activities** tab.

   :::image type="content" source="media/transform-data/add-dataflow-activity.png" alt-text="Screenshot of adding a dataflow activity.":::

1. Select the dataflow on the pipeline canvas, go to the **Settings** tab, and choose the dataflow you created earlier.

   :::image type="content" source="media/transform-data/choose-dataflow.png" alt-text="Screenshot of selecting a dataflow.":::

1. Select **Save**, then **Run** to populate the merged query table.

   :::image type="content" source="media/transform-data/save-run-pipeline-dataflow-only.png" alt-text="Screenshot showing where to select Run.":::

### Add a copy activity

1. Select **Copy data** on the canvas or use the **Copy Assistant** from the **Activities** tab.

   :::image type="content" source="media/transform-data/open-copy-assistant.png" alt-text="Screenshot showing the two ways to access the copy assistant.":::

1. Choose **Azure SQL Database** as the data source and select **Next**.

   :::image type="content" source="media/transform-data/choose-data-source.png" alt-text="Screenshot showing where to choose a data source.":::

1. Create a connection to your data source by selecting **Create new connection**. Fill in the required connection information on the panel, and enter the AdventureWorksLT for the database, where we generated the merge query in the dataflow. Then select **Next**.

   :::image type="content" source="media/transform-data/create-connection.png" alt-text="Screenshot showing where to create a new connection.":::

1. Select the table you generated in the dataflow step earlier, and then select **Next**.

   :::image type="content" source="media/transform-data/select-move-table.png" alt-text="Screenshot showing how to select from available tables.":::

1. For your destination, choose **Azure Blob Storage** and then select **Next**.

   :::image type="content" source="media/transform-data/choose-data-destination.png" alt-text="Screenshot showing the Azure Blob Storage data destination.":::

1. Create a connection to your destination by selecting **Create new connection**. Provide the details for your connection, then select **Next**.

   :::image type="content" source="media/transform-data/create-new-connection-blob-storage.png" alt-text="Screenshot showing how to create a connection.":::

1. Select your **Folder path** and provide a **File name**, then select **Next**.

   :::image type="content" source="media/transform-data/select-folder-filename.png" alt-text="Screenshot showing how to select folder path and file name.":::

1. Select **Next** again to accept the default file format, column delimiter, row delimiter, and compression type, optionally including a header.

   :::image type="content" source="media/transform-data/choose-file-configuration-options.png" alt-text="Screenshot showing the configuration options for the file in Azure Blob Storage.":::

1. Finalize your settings. Then, review and select **Save + Run** to finish the process.

   :::image type="content" source="media/transform-data/finalize-and-review.png" alt-text="Screenshot showing how to review copy data settings.":::

### Design your pipeline and save to run and load data

1. To run the **Copy** activity after the **Dataflow** activity, drag from **Succeeded** on the **Dataflow** activity to the **Copy** activity. The **Copy** activity only runs after the **Dataflow** activity succeeds.

   :::image type="content" source="media/transform-data/copy-dataflow-activity.png" alt-text="Screenshot showing how to make the dataflow run take place after the copy activity.":::

1. Select **Save** to save your pipeline. Then select **Run** to run your pipeline and load your data.

   :::image type="content" source="media/transform-data/save-run-pipeline.png" alt-text="Screenshot showing where to select Save and Run.":::

## Schedule pipeline execution

Once you finish developing and testing your pipeline, you can schedule it to run automatically.

1. On the **Home** tab of the pipeline editor window, select **Schedule**.

   :::image type="content" source="media/transform-data/schedule-button.png" alt-text="Screenshot of the Schedule button on the menu of the Home tab in the pipeline editor.":::

1. Configure the schedule as required. The example here schedules the pipeline to run daily at 8:00 PM until the end of the year.

   :::image type="content" source="media/transform-data/schedule-configuration.png" alt-text="Screenshot showing the schedule configuration for a pipeline to run daily at 8:00 PM until the end of the year.":::

## Related content

This sample shows you how to create and configure a Dataflow Gen2 to create a merge query and store it in an Azure SQL database, then copy data from the database into a text file in Azure Blob Storage. You learned how to:

> [!div class="checklist"]
> - Create a dataflow.
> - Transform data with the dataflow.
> - Create a pipeline using the dataflow.
> - Order the execution of steps in the pipeline.
> - Copy data with the Copy Assistant.
> - Run and schedule your pipeline.

Next, advance to learn more about monitoring your pipeline runs.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
