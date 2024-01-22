---
title: Copy from Azure Blob Storage to Lakehouse
description: Learn how to use a data pipeline to copy data from an Azure Blob Storage source to a Lakehouse destination.
ms.reviewer: jonburchel
ms.author: jburchel
author: jonburchel
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Copy from Azure Blob Storage to Lakehouse

In this tutorial, you'll build a data pipeline to move a CSV file from an input folder of an Azure Blob Storage source to a Lakehouse destination. 

## Prerequisites

To get started, you must complete the following prerequisites:

- Make sure you have a Project [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../get-started/create-workspaces.md).
- Select the **Try it now!** button to prepare the Azure Blob Storage data source of the Copy. Create a new resource group for this Azure Blob Storage and select **Review + Create** > **Create**.

  [![Try your first data factory demo](./media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/try-it-now.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-quickstart-templates%2Fmaster%2Fquickstarts%2Fmicrosoft.datafactory%2Fdata-factory-copy-data-tool%2Fazuredeploy.json)

  :::image type="content" source="media/create-first-pipeline/create-resource-group.png" alt-text="Screenshot of Project details screen.":::

  Then an Azure Blob Storage will be created and [moviesDB2.csv](https://github.com/kromerm/adfdataflowdocs/blob/master/sampledata/moviesDB2.csv) will be uploaded to the input folder of the created Azure Blob Storage.

  :::image type="content" source="media/create-first-pipeline/azure-blob-storage.png" alt-text="Screenshot showing where new storage appears in folder.":::

## Create a data pipeline

1. Switch to **Data factory** on the app.powerbi.com page.  

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/switch-data-factory.png" alt-text="Screenshot of menu in which Data factory option appears.":::

2. Create a new workspace for this demo.  

   :::image type="content" source="media/create-first-pipeline/create-new-workspace.png" alt-text="Screenshot of Workspace screen." lightbox="media/create-first-pipeline/create-new-workspace.png":::

3. Select **New**, and then select **Data Pipeline**.  

   :::image type="content" source="media/create-first-pipeline/select-data-pipeline.png" alt-text="Screenshot of the New menu.":::

## Copy data using the Copy Assistant

In this session, you'll start to build a data pipeline by using the following steps. These steps copy a CSV file from an input folder of an Azure Blob Storage to a Lakehouse destination using the copy assistant.

### Step 1: Start with copy assistant

1. Select **Copy data** on the canvas to open the **copy assistant** tool to get started. Or Select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/select-copy-data-assistant.png" alt-text="Screenshot of two options to select copy assistant." lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/select-copy-data-assistant.png":::

### Step 2: Configure your source

1. Select **Azure Blob Storage**, and then select **Next**.

   :::image type="content" source="media/create-first-pipeline/select-azure-blob-storage.png" alt-text="Screenshot showing where to choose Azure Blob Storage as data source." lightbox="media/create-first-pipeline/select-azure-blob-storage.png":::

1. Create a connection to your data source by selecting **New connection**.

   :::image type="content" source="media/create-first-pipeline/create-connection-to-data.png" alt-text="Screenshot showing where to select New connection." lightbox="media/create-first-pipeline/create-connection-to-data.png":::

   1. After selecting **Create new connection**, you only need to fill in **Account name or URL**, and **Authentication kind**. If you input **Account name or URL** using your Azure Blob Storage account name, the connection will be auto filled.  In this demo, we will choose **Account key** but you can choose other Authentication kind regarding your preference. After selecting **Sign in**, you only need to log in to one account that having this blob storage permission.

      :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/copy-data-connect-to-data-source.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/copy-data-connect-to-data-source.png" alt-text="Screenshot showing the Connect to data source screen of the copy data assistant.":::

   1. Once your connection is created successfully, you only need to select Next to Connect to data source.

1. Choose the file moviesDB2.csv in the source configuration to preview, and then select **Next**.

   :::image type="content" source="media/create-first-pipeline/choose-your-file.png" alt-text="Screenshot showing how to choose data source." lightbox="media/create-first-pipeline/choose-your-file.png":::

### Step 3: Configure your destination

1. Select **Lakehouse** and then **Next**.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/choose-destination-lakehouse.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/choose-destination-lakehouse.png" alt-text="Screenshot showing the Choose data destination dialog with Lakehouse selected.":::

1. Create a new Lakehouse and input the Lakehouse name. Then select **Next**.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/select-lakehouse.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/select-lakehouse.png" alt-text="Screenshot showing the Choose data destination dialog with the new lakehouse option selected.":::

1. Configure and map your source data to your destination; then select **Next** to finish your destination configurations.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/connect-to-data-destination.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/connect-to-data-destination.png" alt-text="Screenshot showing the Connect to data destination dialog in the copy data assistant with the table name MoviesDB filled in.":::

### Step 4: Review and create your copy activity

1. Review your copy activity settings in the previous steps and select OK to finish. Or you can go back to the previous steps to edit your settings if needed in the tool.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/review-and-create-copy-activity.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/review-and-create-copy-activity.png" alt-text="Screenshot showing the Review + create screen in the Copy data assistant dialog.":::

1. Once finished, the copy activity will then be added to your data pipeline canvas. All settings including advanced settings to this copy activity are available under the tabs below when it's selected.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/copy-activity.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/copy-activity.png" alt-text="Screenshot showing the finished Copy activity.":::

## Run and schedule your data pipeline

1. Switch to **Home** tab and select **Run**. Then select **Save and Run**.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/run-copy-activity.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/run-copy-activity.png" alt-text="Screenshot showing the Copy activity's Run button on the Home tab.":::

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/save-and-run-dialog.png" alt-text="Screenshot showing the Save and run dialog for the Copy activity.":::

1. Select the **Details** button to monitor progress and check the results of the run.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/run-details-button.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/run-details-button.png" alt-text="Screenshot showing the run Details button.":::

1. The **Copy data details** dialog displays results of the run including status, volume of data read and written, start and stop times, and duration.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/run-details.png" alt-text="Screenshot showing the Copy data details dialog.":::

1. You can also schedule the pipeline to run with a specific frequency as required. Below is the sample to schedule the pipeline to run every 15 minutes.

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/schedule-configuration.png" lightbox="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/schedule-configuration.png" alt-text="Screenshot showing the schedule configuration dialog.":::

   :::image type="content" source="media/tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse/scheduled-run.png" alt-text="Screenshot showing a pipeline with a configured schedule to run every 15 minutes.":::

## Related content

The pipeline in this sample shows you how to copy data from Azure Blob Storage to Lakehouse.  You learned how to:

> [!div class="checklist"]
> - Create a data pipeline.
> - Copy data with the Copy Assistant.
> - Run and schedule your data pipeline.

Next, advance to learn more about monitoring your pipeline runs.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
