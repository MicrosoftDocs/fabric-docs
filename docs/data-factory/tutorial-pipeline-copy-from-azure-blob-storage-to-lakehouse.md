---
title: Copy from Azure Blob Storage to Lakehouse
description: Learn how to use a pipeline to copy data from an Azure Blob Storage source to a Lakehouse destination.
ms.reviewer: makromer
ms.topic: tutorial
ms.custom: pipelines
ms.date: 12/18/2024
---

# Copy from Azure Blob Storage to Lakehouse

In this tutorial, you build a pipeline to move a CSV file from an input folder of an Azure Blob Storage source to a Lakehouse destination. 

## Prerequisites

To get started, you must complete the following prerequisites:

- Make sure you have a Project [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../fundamentals/create-workspaces.md).
- Select the **Try it now!** button to prepare the Azure Blob Storage data source of the Copy. Create a new resource group for this Azure Blob Storage and select **Review + Create** > **Create**.

  [:::image type="icon" source="./media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/try-it-now.png":::](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-quickstart-templates%2Fmaster%2Fquickstarts%2Fmicrosoft.datafactory%2Fdata-factory-copy-data-tool%2Fazuredeploy.json)

  :::image type="content" source="media/create-first-pipeline/create-resource-group.png" alt-text="Screenshot of Project details screen.":::

  Then an Azure Blob Storage is created and [moviesDB2.csv](https://github.com/kromerm/adfdataflowdocs/blob/master/sampledata/moviesDB2.csv) uploaded to the input folder of the created Azure Blob Storage.

  :::image type="content" source="media/create-first-pipeline/azure-blob-storage.png" alt-text="Screenshot showing where new storage appears in folder.":::

## Create a pipeline

1. Switch to **Data factory** on the app.powerbi.com page.  

2. Create a new workspace for this demo.  

   :::image type="content" source="media/create-first-pipeline/create-new-workspace.png" alt-text="Screenshot of Workspace screen." lightbox="media/create-first-pipeline/create-new-workspace.png":::

3. Select **New**, and then select **Pipeline**.  

   :::image type="content" source="media/create-first-pipeline/select-data-pipeline.png" alt-text="Screenshot of the New menu.":::

## Copy data using the Copy Assistant

In this session, you start to build a pipeline by using the following steps. These steps copy a CSV file from an input folder of an Azure Blob Storage to a Lakehouse destination using the copy assistant.

### Step 1: Start with copy assistant

1. Select **Copy data assistant** on the canvas to open the **copy assistant** tool to get started. Or Select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/select-copy-data-assistant.png" alt-text="Screenshot of two options to select copy assistant." lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/select-copy-data-assistant.png":::

### Step 2: Configure your source

1. Type _blob_ in the selection filter, then select **Azure Blobs**, and select **Next**.

   :::image type="content" source="media/create-first-pipeline/select-azure-blob-storage.png" alt-text="Screenshot showing where to choose Azure Blob Storage as data source." lightbox="media/create-first-pipeline/select-azure-blob-storage.png":::

1. Provide your account name or URL and create a connection to your data source by selecting **Create new connection** under the **Connection** drop down.

   :::image type="content" source="media/create-first-pipeline/create-connection-to-data.png" alt-text="Screenshot showing where to select New connection." lightbox="media/create-first-pipeline/create-connection-to-data.png":::

   1. After selecting **Create new connection** with your storage account specified, you only need to fill in **Authentication kind**. In this demo, we choose **Account key** but you can choose other **Authentication kind** depending on your preference.

      :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/copy-data-connect-to-data-source.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/copy-data-connect-to-data-source.png" alt-text="Screenshot showing the Connect to data source screen of the copy data assistant.":::

   1. Once your connection is created successfully, you only need to select Next to Connect to data source.

1. Choose the file moviesDB2.csv in the source configuration to preview, and then select **Next**.

   :::image type="content" source="media/create-first-pipeline/choose-your-file.png" alt-text="Screenshot showing how to choose data source." lightbox="media/create-first-pipeline/choose-your-file.png":::

### Step 3: Configure your destination

1. Select **Lakehouse**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/lakehouse-destination.png" lightbox="media/create-first-pipeline-with-sample-data/lakehouse-destination.png" alt-text="Screenshot showing the Choose data destination dialog with Lakehouse selected.":::

1. Provide a name for the new Lakehouse. Then select **Create and connect**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/create-new-lakehouse.png" lightbox="media/create-first-pipeline-with-sample-data/create-new-lakehouse.png" alt-text="Screenshot showing the Choose data destination dialog with the new lakehouse option selected.":::

1. Configure and map your source data to your destination; then select **Next** to finish your destination configurations.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/connect-to-data-destination.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/connect-to-data-destination.png" alt-text="Screenshot showing the Connect to data destination dialog in the copy data assistant with the table name MoviesDB filled in.":::

### Step 4: Review and create your copy activity

1. Review your copy activity settings in the previous steps and select **Save + run** to finish. Or you can go back to the previous steps to edit your settings if needed in the tool.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/review-and-create-copy-activity.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/review-and-create-copy-activity.png" alt-text="Screenshot showing the Review + create screen in the Copy data assistant dialog.":::

1. Once finished, the copy activity is added to your pipeline canvas and run directly if you left the **Start data transfer immediately** checkbox selected.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/copy-activity.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/copy-activity.png" alt-text="Screenshot showing the finished Copy activity.":::

## Run and schedule your pipeline

1. If you didn't leave the **Start data transfer immediately** checkbox on the **Review + create** page, switch to the **Home** tab and select **Run**. Then select **Save and Run**.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/run-copy-activity.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/run-copy-activity.png" alt-text="Screenshot showing the Copy activity's Run button on the Home tab.":::

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/save-and-run-dialog.png" alt-text="Screenshot showing the Save and run dialog for the Copy activity.":::

1. On the **Output** tab, select the link with the name of your Copy activity to monitor progress and check the results of the run.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/run-details-button.png" lightbox="media/create-first-pipeline-with-sample-data/run-details-button.png" alt-text="Screenshot showing the run Details button.":::

1. The **Copy data details** dialog displays results of the run including status, volume of data read and written, start and stop times, and duration.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/run-details.png" alt-text="Screenshot showing the Copy data details dialog.":::

1. You can also schedule the pipeline to run with a specific frequency as required. The following example shows how to schedule the pipeline to run every 15 minutes.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/schedule-configuration.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/schedule-configuration.png" alt-text="Screenshot showing the schedule configuration dialog.":::

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/scheduled-run.png" alt-text="Screenshot showing a pipeline with a configured schedule to run every 15 minutes.":::

## Related content

The pipeline in this sample shows you how to copy data from Azure Blob Storage to Lakehouse.  You learned how to:

> [!div class="checklist"]
> - Create a pipeline.
> - Copy data with the Copy Assistant.
> - Run and schedule your pipeline.

Next, advance to learn more about monitoring your pipeline runs.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
