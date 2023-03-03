---
title: Create your first data pipeline ​to copy data
description: Steps to build and schedule a new data pipeline.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.subservice: data-factory
ms.topic: quickstart
ms.date: 01/27/2023
---

# Quickstart: Create your first data pipeline to copy data (Preview)

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this tutorial, you'll build a data pipeline to move a CSV file from an input folder of source Azure Blob Storage to the output folder of the target Azure Blob storage. This experience is like copying data from raw storage to enterprise-scoped Storage.

## Prerequisites

To get started, you must complete the following prerequisites:

- Make sure you have a Project [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a Project Trident enabled Workspace.pdf (sharepoint.com)](https://microsofteur.sharepoint.com/teams/TridentPrivatePreview/Shared%20Documents/Documentation/Private%20Preview%20Documentation/Enabling%20Trident/Create%20a%20Project%20Trident%20enabled%20Workspace.pdf) that isn’t the default My Workspace.
- Select the **Click to Prepare Data** button to prepare the data source of the Copy with one-click button. Create a new resource group for this Azure Blob storage and select **Review + Create** > **Create**.

  :::image type="content" source="media/create-first-pipeline/select-prepare-data.png" alt-text="Screenshot of Click to Prepare Data button.":::

:::image type="content" source="media/create-first-pipeline/create-resource-group.png" alt-text="Screenshot of Project details screen.":::

Then Azure Blob Storage will be created and [moviesDB2.csv](https://github.com/kromerm/adfdataflowdocs/blob/master/sampledata/moviesDB2.csv) will be uploaded to the input folder of the created Azure Blob Storage.

:::image type="content" source="media/create-first-pipeline/azure-blob-storage.png" alt-text="Screenshot showing where new storage appears in folder.":::

## Create a data pipeline

1. Switch to **Data factory** in the app.powerbi.com page.  

   :::image type="content" source="media/create-first-pipeline/switch-data-factory.png" alt-text="Screenshot of menu in which Data factory option appears.":::

2. Create a new workspace for this demo.  

   :::image type="content" source="media/create-first-pipeline/create-new-workspace.png" alt-text="Screenshot of Workspace screen." lightbox="media/create-first-pipeline/create-new-workspace.png":::

3. Select **New**, and then select **Data Pipeline**.  

   :::image type="content" source="media/create-first-pipeline/select-data-pipeline.png" alt-text="Screenshot of the New menu.":::

## Copy data using copy assistant

In this session, you'll start to build your first data pipeline by using the following steps. These steps copy a CSV file from the input to the output of the same Azure Blob Storage using copy assistant. If you have two different Azure Blob Storage areas, you're encouraged to use a different one as a target.

### Step 1: Start with copy assistant

1. Select **Copy data** on the canvas to open the **copy assistant** tool to get started. Or Select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/create-first-pipeline/open-copy-assistant.png" alt-text="Screenshot of two options to select copy assistant." lightbox="media/create-first-pipeline/open-copy-assistant.png":::

### Step 2: Configure your source

1. Select **Azure Blob Storage**, and then select **Next**.

   :::image type="content" source="media/create-first-pipeline/select-azure-blob-storage.png" alt-text="Screenshot showing where to choose Azure Blob Storage as data source." lightbox="media/create-first-pipeline/select-azure-blob-storage.png":::

2. Create a connection to your data source by selecting **New connection**.

   :::image type="content" source="media/create-first-pipeline/create-connection-to-data.png" alt-text="Screenshot showing where to select New connection." lightbox="media/create-first-pipeline/create-connection-to-data.png":::

   1. After you select **New connection**, it will navigate to the connection creation page in a new browser. The domain of the Azure Blob is **blob.core.windows.net**, and you can choose **Key** authentication to connect. Then select **Create**.

      :::image type="content" source="media/create-first-pipeline/connection-creation-page.png" alt-text="Screenshot of the connection creation page.":::

   1. Once your connection is created successfully, it will take you back to the previous page. Then select **Refresh** to fetch your connection that was just created and go to the next step.

      :::image type="content" source="media/create-first-pipeline/fetch-your-connection.png" alt-text="Screenshot showing where to select Refresh." lightbox="media/create-first-pipeline/fetch-your-connection.png":::

3. Choose the file moviesDB2.csv in the source configuration to preview, and then select **Next**.

   :::image type="content" source="media/create-first-pipeline/choose-your-file.png" alt-text="Screenshot showing how to choose data source." lightbox="media/create-first-pipeline/choose-your-file.png":::

### Step 3: Configure your destination

1. Select **Azure Blob Storage**, and then select **Next**.

   :::image type="content" source="media/create-first-pipeline/select-azure-blob-storage.png" alt-text="Screenshot showing where to select data destination." lightbox="media/create-first-pipeline/select-azure-blob-storage.png":::

2. Use an existing Azure Blob connection from the connection drop-down list. The capabilities of **Test connection** and **Edit** are available to each selected connection.

   :::image type="content" source="media/create-first-pipeline/existing-blob-connection.png" alt-text="Screenshot showing how to select existing connection." lightbox="media/create-first-pipeline/existing-blob-connection.png":::

3. Configure and map your source data to your destination. Then select **Next** to finish your destination configurations.

   :::image type="content" source="media/create-first-pipeline/configure-map-source.png" alt-text="Screenshot of last screen of mapping destination." lightbox="media/create-first-pipeline/configure-map-source.png":::

### Step 4: Review and create your copy activity

1. Review your copy activity settings in the previous steps and select **OK** to finish. Or you can go back to the previous steps to edit your settings if needed in the tool.

   :::image type="content" source="media/create-first-pipeline/review-copy-settings.png" alt-text="Screenshot showing where to review copy activity settings." lightbox="media/create-first-pipeline/review-copy-settings.png":::

2. Once finished, the copy activity will then be added to your data pipeline canvas. All settings including advanced settings to this copy activity are available under the source and destination tabs when it's selected.

   :::image type="content" source="media/create-first-pipeline/add-copy-activity.png" alt-text="Screenshot of data pipeline canvas." lightbox="media/create-first-pipeline/add-copy-activity.png":::

## Run and schedule your data pipeline

1. Switch to the **Home** tab and select **Run**. Then select **Save and Run**. You can now monitor the running process and check the results.

   :::image type="content" source="media/create-first-pipeline/run-data-pipeline.png" alt-text="Screenshot showing steps to save and run a data pipeline." lightbox="media/create-first-pipeline/run-data-pipeline.png":::

   :::image type="content" source="media/create-first-pipeline/pipeline-running.png" alt-text="Screenshot showing how to see run status." lightbox="media/create-first-pipeline/pipeline-running.png":::

   :::image type="content" source="media/create-first-pipeline/run-pipeline-results.png" alt-text="Screenshot of copy activity details." lightbox="media/create-first-pipeline/run-pipeline-results.png":::

2. You can also schedule the pipeline to run under a specific frequency as required. For example, the following image shows how to schedule the pipeline to run every 15 minutes.  

   :::image type="content" source="media/create-first-pipeline/data-pipeline-schedule.png" alt-text="Screenshot of the data pipeline schedule configuration." lightbox="media/create-first-pipeline/data-pipeline-schedule.png":::

   :::image type="content" source="media/create-first-pipeline/data-pipeline-scheduled.png" alt-text="Screenshot showing the scheduled run.":::

## Next steps

- [How to monitor data pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)] (Preview)](monitor-pipeline-runs.md)
