---
title: Move and transform data with dataflow and data pipelines
description: Steps for moving and transforming data with dataflows and data pipelines.
ms.reviewer: jonburchel
ms.author: noelleli
author: n0elleli
ms.topic: quickstart
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Quickstart: Move and transform data with dataflows and data pipelines

In this tutorial, you discover how the dataflow and data pipeline experience can create a powerful and comprehensive Data Factory solution.  

## Prerequisites

To get started, you must have the following prerequisites:

- A tenant account with an active subscription. Create a [free account](https://azure.microsoft.com/free/).
- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../get-started/create-workspaces.md) that isn’t the default My Workspace.
- [An Azure SQL database with table data](/azure/azure-sql/database/single-database-create-quickstart).
- [A Blob Storage account](/azure/storage/common/storage-account-create).

## Dataflows compared to pipelines

Dataflows Gen2 enable you to leverage a low-code interface and 300+ data and AI-based transformations to you easily clean, prep, and transform data with more flexibility than any other tool. Data Pipelines enable rich out-of-the-box data orchestration capabilities to compose flexible data workflows that meet your enterprise needs.  In a pipeline, you can create logical groupings of activities that perform a task, which might include calling a Dataflow to clean and prep your data. While there is some functionality overlap between the two, the choice of which to use for a specific scenario depends on whether you require the full richness of pipelines or can use the simpler but more limited capabilities of dataflows. For more details, refer to the [Fabric decision guide](../get-started/decision-guide-pipeline-dataflow-spark.md#copy-activity-dataflow-and-spark-properties)

## Transform data with dataflows

Follow these steps to set up your dataflow.

### Step 1: Create a dataflow

1. Choose your Fabric enabled workspace, and then select **New**. Then select **Dataflow Gen2**.

   :::image type="content" source="media/transform-data/select-dataflow.png" alt-text="Screenshot showing where to start creating a dataflow gen2." :::

1. The dataflow editor window appears.  Select the **Import from SQL Server** card.

   :::image type="content" source="media/transform-data/start-creating-dataflow-inline.png" alt-text="Screenshot showing the dataflow editor window." lightbox="media/transform-data/start-creating-dataflow.png":::

### Step 2: Get data

1. On the **Connect to data source** dialog presented next, enter the details to connect to your Azure SQL database, then select **Next**. For this example, you use the **AdventureWorksLT** sample database configured when you set up the Azure SQL database in the prerequisites.

   :::image type="content" source="media/transform-data/select-azure-sql-inline.png" alt-text="Screenshot showing how to connect to an Azure SQL database." lightbox="media/transform-data/select-azure-sql.png":::

1. Select the data you’d like to transform and then select **Create**. For this quickstart, select **SalesLT.Customer** from the **AdventureWorksLT** sample data provided for Azure SQL DB, and then the **Select related tables** button to automatically include two other related tables.

   :::image type="content" source="media/transform-data/data-to-transform-inline.png" alt-text="Screenshot showing where to choose from the available data." lightbox="media/transform-data/data-to-transform.png":::

### Step 3: Transform your data

1. If it isn't selected, select the **Diagram view** button along the status bar at the bottom of the page, or select **Diagram view** under the **View** menu at the top of the Power Query editor. Either of these options can toggle the diagram view.

   :::image type="content" source="media/transform-data/select-diagram-view-inline.png" alt-text="Screenshot showing where to select diagram view." lightbox="media/transform-data/select-diagram-view.png":::

1. Right-click your **SalesLT Customer** query, or select the vertical ellipsis on the right of the query, then select **Merge queries**.  

   :::image type="content" source="media/transform-data/select-merge-query.png" alt-text="Screenshot showing where to find the Merge queries option.":::

1. Configure the merge by selecting the **SalesLTOrderHeader** table as the right table for the merge, the **CustomerID** column from each table as the join column, and **Left outer** as the join kind. Then select **OK** to add the merge query.  

   :::image type="content" source="media/transform-data/select-join-keys-kind.png" alt-text="Screenshot of the Merge configuration screen.":::

1. Select the **Add data destination** button, which looks like a database symbol with an arrow above it, from the new merge query you just created. Then select **Azure SQL database** as the destination type.

   :::image type="content" source="media/transform-data/select-data-destination-inline.png" alt-text="Screenshot highlighting the Add data destination button on the newly created merge query." lightbox="media/transform-data/select-data-destination.png":::

1. Provide the details for your Azure SQL database connection where the merge query is to be published. In this example, you can use the **AdventureWorksLT** database we used as the data source for the destination too.

   :::image type="content" source="media/transform-data/configure-data-destination.png" alt-text="Screenshot showing the Connect to data destination dialog with sample values populated.":::

1. Choose a database to store the data, and provide a table name, then select **Next**.

   :::image type="content" source="media/transform-data/choose-table-for-merge-query.png" alt-text="Screenshot showing the Choose destination target window.":::

1. You can leave the default settings on the **Choose destination settings** dialog, and just select **Save settings** without making any changes here.

   :::image type="content" source="media/transform-data/choose-destination-settings.png" alt-text="Screenshot showing the Choose destination settings dialog.":::

1. Select **Publish** back on the dataflow editor page, to publish the dataflow.

   :::image type="content" source="media/transform-data/publish-dataflow-gen2-inline.png" alt-text="Screenshot highlighting the Publish button on the dataflow gen2 editor." lightbox="media/transform-data/publish-dataflow-gen2.png":::

## Move data with data pipelines

Now that you created a Dataflow Gen2, you can operate on it in a pipeline. In this example, you copy the data generated from the dataflow into text format in an Azure Blob Storage account.

### Step 1: Create a new data pipeline

1. From your workspace, select **New**, and then select **Data pipeline**.  

   :::image type="content" source="media/transform-data/create-new-pipeline.png" alt-text="Screenshot showing where to start a new data pipeline.":::

1. Name your pipeline then select **Create**.

   :::image type="content" source="media/transform-data/name-pipeline.png" alt-text="Screenshot showing the new pipeline creation prompt with a sample pipeline name.":::

### Step 2: Configure your dataflow

1. Add a new dataflow activity to your data pipeline by selecting **Dataflow** in the **Activities** tab.  

   :::image type="content" source="media/transform-data/add-dataflow-activity.png" alt-text="Screenshot showing where to select the Dataflow option.":::

1. Select the dataflow on the pipeline canvas, and then the **Settings** tab. Choose the dataflow you created previously from the drop-down list.

   :::image type="content" source="media/transform-data/choose-dataflow.png" alt-text="Screenshot showing how to choose the dataflow you created.":::

1. Select **Save**, and then **Run** to run the dataflow to initially populate its merged query table you designed in the prior step.

   :::image type="content" source="media/transform-data/save-run-pipeline-dataflow-only.png" alt-text="Screenshot showing where to select Run.":::

### Step 3: Use the copy assistant to add a copy activity

1. Select **Copy data** on the canvas to open the **Copy Assistant** tool to get started. Or select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/transform-data/open-copy-assistant.png" alt-text="Screenshot showing the two ways to access the copy assistant.":::
1. Choose your data source by selecting a data source type. In this tutorial, you use the Azure SQL Database used previously when you created the dataflow to generate a new merge query. Scroll down below the sample data offerings and select the **Azure** tab, then **Azure SQL Database**. Then select **Next** to continue.

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

1. Select **Next** again to accept the default file format, column delimiter, row delimiter and compression type, optionally including a header. 

   :::image type="content" source="media/transform-data/choose-file-configuration-options.png" alt-text="Screenshot showing the configuration options for the file in Azure Blob Storage.":::

1. Finalize your settings. Then, review and select **Save + Run** to finish the process.  

   :::image type="content" source="media/transform-data/finalize-and-review.png" alt-text="Screenshot showing how to review copy data settings.":::

### Step 5: Design your data pipeline and save to run and load data

1. To run the **Copy** activity after the **Dataflow** activity, drag from **Succeeded** on the **Dataflow** activity to the **Copy** activity. The **Copy** activity only runs after the **Dataflow** activity has succeeded.  

   :::image type="content" source="media/transform-data/copy-dataflow-activity.png" alt-text="Screenshot showing how to make the dataflow run take place after the copy activity.":::

1. Select **Save** to save your data pipeline. Then select **Run** to run your data pipeline and load your data.  

   :::image type="content" source="media/transform-data/save-run-pipeline.png" alt-text="Screenshot showing where to select Save and Run.":::

## Schedule pipeline execution

Once you finish developing and testing your pipeline, you can schedule it to execute automatically.

1. On the **Home** tab of the pipeline editor window, select **Schedule**.

   :::image type="content" source="media/transform-data/schedule-button.png" alt-text="A screenshot of the Schedule button on the menu of the Home tab in the pipeline editor.":::

1. Configure the schedule as required. The example here schedules the pipeline to execute daily at 8:00 PM until the end of the year.

   :::image type="content" source="media/transform-data/schedule-configuration.png" alt-text="Screenshot showing the schedule configuration for a pipeline to run daily at 8:00 PM until the end of the year.":::

## Related content

This sample shows you how to create and configure a Dataflow Gen2 to create a merge query and store it in an Azure SQL database, then copy data from the database into a text file in Azure Blob Storage.  You learned how to:

> [!div class="checklist"]
> - Create a dataflow.
> - Transform data with the dataflow.
> - Create a data pipeline using the dataflow.
> - Order the execution of steps in the pipeline.
> - Copy data with the Copy Assistant.
> - Run and schedule your data pipeline.

Next, advance to learn more about monitoring your pipeline runs.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
