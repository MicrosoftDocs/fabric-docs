---
title: Create your first pipeline ​to copy data
description: Steps to build and schedule a new data pipeline.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: quickstart
ms.date: 01/27/2023
---

# Quickstart: Create your first pipeline to copy data (Preview)

In this tutorial, you'll build a data pipeline to move a CSV file from input folder of source Azure Blob Storage to the output folder of target Azure Blob storage. This experience is like copying data from raw storage to enterprise-scoped Storage.

## Prerequisites

To get started, you must complete the following prerequisites:

- Make sure you have a Project [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a Project Trident enabled Workspace.pdf (sharepoint.com)](https://microsofteur.sharepoint.com/teams/TridentPrivatePreview/Shared%20Documents/Documentation/Private%20Preview%20Documentation/Enabling%20Trident/Create%20a%20Project%20Trident%20enabled%20Workspace.pdf) and isn’t the default My Workspace.
- Click the Click to Prepare Data button to prepare the data source of Copy with one-click button. Create a new resource group to put this Azure Blob storage and click Review+Create -> Create.

  :::image type="content" source="media/create-first-pipeline/select-prepare-data-34.png" alt-text="Screenshot of Click to Prepare Data button.":::

:::image type="content" source="media/create-first-pipeline/create-resource-group-35.png" alt-text="Screenshot of Project details screen.":::

Then Azure Blob storage will be created and [moviesDB2.csv](https://github.com/kromerm/adfdataflowdocs/blob/master/sampledata/moviesDB2.csv) will be uploaded into the input folder of the created Azure Blob storage.

:::image type="content" source="media/create-first-pipeline/azure-blob-storage-36.png" alt-text="Screenshot showing where new storage appears in folder.":::

## Create a data pipeline

1. Switch to **Data factory** in app.powerbi.com page.  

   :::image type="content" source="media/create-first-pipeline/switch-data-factory-37.png" alt-text="Screenshot of menu in which Data factory option appears.":::

2. Create a new workspace for this demo.  

   :::image type="content" source="media/create-first-pipeline/create-new-workspace-38.png" alt-text="Screenshot of Workspace screen.":::

3. Click **New** and select **Data Pipeline**.  

   :::image type="content" source="media/create-first-pipeline/select-data-pipeline-39.png" alt-text="Screenshot of the New menu.":::

## Copy data via copy assistant

In this session, you'll start to build your first pipeline by following below steps about copying CSV file from input to output of the same Azure Blob storage via copy assistant. If you have two different Azure Blob storage, you're encouraged to use a different one as a target.

### Step 1: Start with copy assistant

1. Click on **Copy data** on the canvas to open the **copy assistant** tool to get started. Or click on **Use copy assistant** from the **Copy data** drop down list under **Activities** tab on the ribbon.

   :::image type="content" source="media/create-first-pipeline/open-copy-assistant-40.png" alt-text="Screenshot of two options to select copy assistant.":::

### Step 2: Configure your source

1. Click on **Azure Blob Storage** and then click on **Next**.

   :::image type="content" source="media/create-first-pipeline/select-azure-blob-storage-41.png" alt-text="Screenshot showing where to choose Azure Blob Storage as data source.":::

2. Create a connection to your data source by clicking on **New connection**.

   :::image type="content" source="media/create-first-pipeline/create-connection-to-data-42.png" alt-text="Screenshot showing where to select New connection.":::

After you click on **New connection**, it will navigate to the connection creation page in a new browser. The domain of Azure Blob is **blob.core.windows.net**, and you can choose Key authentication to connect. Then click on **Create**.

:::image type="content" source="media/create-first-pipeline/connection-creation-page-43.png" alt-text="Screenshot of the connection creation page.":::

Once your connection is created successfully, it will take you back to the previous page. Then click on **Refresh** to fetch your connection that was just created and go to the next step.

:::image type="content" source="media/create-first-pipeline/fetch-your-connection-44.png" alt-text="Screenshot showing where to select Refresh.":::

3. Choose the file moviesDB2.csv in the source configuration to preview and then click on **Next**.

   :::image type="content" source="media/create-first-pipeline/choose-your-file-45.png" alt-text="Screenshot showing how to choose data source.":::

### Step 3: Configure your destination

1. Click on **Azure Blob Storage** and then click on **Next**.

   :::image type="content" source="media/create-first-pipeline/select-azure-blob-storage-2-46.png" alt-text="Screenshot showing where to select data destination.":::

2. Use an existing Azure Blob connection from the connection drop-down list. The capabilities of **Test connection** and **Edit** are available to each selected connection.

   :::image type="content" source="media/create-first-pipeline/existing-blob-connetion-47.png" alt-text="Screenshot showing how to select existing connection.":::

3. Configure and map your source data to your destination; then click on **Next** to finish your destination configurations.

   :::image type="content" source="media/create-first-pipeline/configure-map-source-48.png" alt-text="Screenshot of last screen of mapping destination.":::

### Step 4: Review and create your copy activity

1. Review your copy activity settings in the previous steps and click on **OK** to finish. Or you can go back to the previous steps to edit your settings if needed in the tool.

   :::image type="content" source="media/create-first-pipeline/review-copy-settings-49.png" alt-text="Screenshot showing where to review copy activity settings.":::

2. Once finished, the copy activity will then be added to your data pipeline canvas. All settings including advanced settings to this copy activity are available under the tabs below when it's selected.

   :::image type="content" source="media/create-first-pipeline/add-copy-activity-50.png" alt-text="Screenshot of data pipeline canvas.":::

## Run and schedule your data pipeline

1. Switch to **Home** tab and click **Run**. Click **Save and Run** Then you can monitor the running process and check the results  

   :::image type="content" source="media/create-first-pipeline/run-data-pipeline-51.png" alt-text="Screenshot showing steps to save and run a pipeline.":::

   :::image type="content" source="media/create-first-pipeline/pipeline-running-52.png" alt-text="Screenshot showing how to see run status.":::

   :::image type="content" source="media/create-first-pipeline/run-pipeline-results-53.png" alt-text="Screenshot of copy activity details.":::

2. You can also schedule the pipeline to run under a specific frequency as required. The following image is the sample to schedule the pipeline to run every 15 minutes.  

   :::image type="content" source="media/create-first-pipeline/data-pipeline-schedule-54.png" alt-text="Screenshot of pipeline schedule configuration.":::

   :::image type="content" source="media/create-first-pipeline/data-pipeline-scheduled-55.png" alt-text="Screenshot showing scheduled run.":::

## Next steps

- How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)] (Preview)
