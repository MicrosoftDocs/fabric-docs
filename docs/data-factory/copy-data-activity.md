---
title: How to copy data using copy activity
description: Learn how to add a copy activity directly or through the copy assistant.
ms.reviewer: DougKlopfenstein
ms.author: jianleishen
author: jianleishen
ms.topic: how-to
ms.date: 01/27/2023
---
# How to copy data using copy activity

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Learn how to add a copy activity directly or through the copy assistant.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](/trident-docs-private-preview/synapse-data-integration/url).
- A workspace is created.

## Add a copy activity using copy assistant

Follow these steps to set up your copy activity using copy assistant.

### Step 1: Start with copy assistant

1. Open an existing data pipeline or create a new data pipeline.
1. Select **Copy data** on the canvas to open the **Copy Assistant** tool to get started. Or select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/copy-data-activity/use-copy-assistant.png" alt-text="Screenshot showing options for opening the copy assistant." lightbox="media/copy-data-activity/use-copy-assistant.png":::

### Step 2: Configure your source

1. Choose your data source by choosing a data source type. In this tutorial, you'll use Azure Blob Storage as an example. Select **Azure Blob Storage** and then select **Next**.

   :::image type="content" source="media/copy-data-activity/choose-data-source.png" alt-text="Screenshot of Choose data source screen." lightbox="media/copy-data-activity/choose-data-source.png":::

   :::image type="content" source="media/copy-data-activity/choose-azure-blob-storage-source.png" alt-text="Screenshot showing where to select the correct data source." lightbox="media/copy-data-activity/choose-azure-blob-storage-source.png":::

2. Create a connection to your data source by selecting **New connection**.

   :::image type="content" source="media/copy-data-activity/create-new-azure-blob-storage-connection.png" alt-text="Screenshot showing where to select New connection." lightbox="media/copy-data-activity/create-new-azure-blob-storage-connection.png":::

   1. After you select **New connection**, it will navigate to the connection creation page in a new browser. Fill in the required connection information on the panel and then select **Create**. For the details of connection creation for each type of data source, you can refer to each [Power Query connector article](/power-query/connectors/).

      :::image type="content" source="media/copy-data-activity/configure-source-details.png" alt-text="Screenshot showing the New connection page." lightbox="media/copy-data-activity/configure-source-details.png":::

   1. Once your connection is created successfully, it will take you back to the previous page. Then select **Refresh** to fetch the connection that you created and go to the next step. You could also choose an existing blob connection from the drop-down directly if you already created it before.

      :::image type="content" source="media/copy-data-activity/refresh-source-connection.png" alt-text="Screenshot showing where to select Refresh." lightbox="media/copy-data-activity/refresh-source-connection.png":::

3. Choose the file or folder to be copied in this source configuration step, and then select **Next**.

   :::image type="content" source="media/copy-data-activity/choose-copy-file-or-folder.png" alt-text="Screenshot showing where to select the data to be copied." lightbox="media/copy-data-activity/choose-copy-file-or-folder.png":::

### Step 3: Configure your destination

1. Choose your destination by choosing a data source type. In this tutorial, you'll use Azure Blob Storage as an example. Select**Azure Blob Storage**, and then select **Next**.

   :::image type="content" source="media/copy-data-activity/choose-destination.png" alt-text="Screenshot showing how to select Azure Blob Storage." lightbox="media/copy-data-activity/choose-destination.png":::

2. You can either create a new connection that links to a new Azure Blob Storage account by following the steps in the previous section or use an existing connection from the connection drop-down list. The capabilities of **Test connection** and **Edit** are available to each selected connection.

   :::image type="content" source="media/copy-data-activity/destination-connection-configuration.png" alt-text="Screenshot showing data connection options." lightbox="media/copy-data-activity/destination-connection-configuration.png":::

3. Configure and map your source data to your destination; then select **Next** to finish your destination configurations.

   :::image type="content" source="media/copy-data-activity/map-to-destination.png" alt-text="Screenshot of Map to destination screen." lightbox="media/copy-data-activity/map-to-destination.png":::

   :::image type="content" source="media/copy-data-activity/map-to-destination-details.png" alt-text="Screenshot of Map to destination details." lightbox="media/copy-data-activity/map-to-destination-details.png":::

### Step 4: Review and create your copy activity

1. Review your copy activity settings in the previous steps and select **OK** to finish. Or you can go back to the previous steps to edit your settings if needed in the tool.

   :::image type="content" source="media/copy-data-activity/review-and-create-copy-activity.png" alt-text="Screenshot showing the Review and create screen." lightbox="media/copy-data-activity/review-and-create-copy-activity.png":::

Once finished, the copy activity will then be added to your data pipeline canvas. All settings, including advanced settings to this copy activity, are available under the tabs when it’s selected.

:::image type="content" source="media/copy-data-activity/pipeline-with-copy-activity.png" alt-text="Screenshot showing a copy activity on the data pipeline canvas." lightbox="media/copy-data-activity/pipeline-with-copy-activity.png":::

Now you can either save your data pipeline with this single copy activity or continue to design your data pipeline.

## Add a copy activity directly

Follow these steps to add a copy activity directly.

### Step 1: Add a copy activity

1. Open an existing data pipeline or create a new data pipeline.
1. Add a copy activity either by selecting **Add pipeline activity** > **Copy activity** or by selecting **Copy data** > **Add to canvas** under the **Activities** tab.

   :::image type="content" source="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png" alt-text="Screenshot showing two ways to add a copy activity." lightbox="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png":::

### Step 2: Configure your source under the source tab

1. Select **New** beside the **Connection** to create a connection to your data source.

   :::image type="content" source="media/copy-data-activity/configure-source-connection-in-pipeline.png" alt-text="Screenshot showing where to select New." lightbox="media/copy-data-activity/configure-source-connection-in-pipeline.png":::

   1. Choose the data source type from the pop-up window. In this tutorial, you'll use Azure Blob Storage as an example. Select **Azure Blob Storage**, and then select **Continue**.

      :::image type="content" source="media/copy-data-activity/choose-azure-blob-storage-connection-in-pipeline.png" alt-text="Screenshot showing how to select the data source." lightbox="media/copy-data-activity/choose-azure-blob-storage-connection-in-pipeline.png":::

   1. It will navigate to the connection creation page in a new browser. Fill in the required connection information on the panel, and then select **Create**. For the details of connection creation for each type of data source, you can refer to each [Power Query connector article](/power-query/connectors/).

      :::image type="content" source="media/copy-data-activity/configure-connection-details.png" alt-text="Screenshot showing New connection page." lightbox="media/copy-data-activity/configure-connection-details.png":::

   1. Once your connection is created successfully, it will take you back to the previous page. Then select **Refresh** to fetch the connection that you created from the drop-down list. You could also choose an existing Azure Blob Storage connection from the drop-down directly if you already created it before.

      :::image type="content" source="media/copy-data-activity/refresh-source-connection-in-pipeline.png" alt-text="Screenshot showing where to refresh your connection." lightbox="media/copy-data-activity/refresh-source-connection-in-pipeline.png":::

2. Set up the file path to define the file or folder to be copied. Select **File settings** for more settings, such as file format, compression type, and so on.

   :::image type="content" source="media/copy-data-activity/configure-source-file-settings-in-pipeline.png" alt-text="Screenshot showing source file settings options." lightbox="media/copy-data-activity/configure-source-file-settings-in-pipeline.png":::

3. Expand **Advanced** for more advanced settings.

   :::image type="content" source="media/copy-data-activity/file-settings-details-in-pipeline.png" alt-text="Screenshot of advanced settings." lightbox="media/copy-data-activity/file-settings-details-in-pipeline.png":::

### Step 3: Configure your destination under the destination tab

1. Choose your destination type. It could be either your internal first class data store from your workspace, such as Lakehouse, or your external data stores. In this tutorial, you'll use Azure Blob Storage as an example.

   :::image type="content" source="media/copy-data-activity/configure-destination-connection-in-pipeline.png" alt-text="Screenshot showing where to select destination type." lightbox="media/copy-data-activity/configure-destination-connection-in-pipeline.png":::

2. Choose to use **Connection**. You can either create a new connection that links to a new Azure Blob Storage account by following the steps in the previous sections, or use an existing connection from the connection drop-down list. The capabilities of **Test connection** and **Edit** are available to each selected connection.

   :::image type="content" source="media/copy-data-activity/test-destination-connection-in-pipeline.png" alt-text="Screenshot showing the Test connection and Edit options." lightbox="media/copy-data-activity/test-destination-connection-in-pipeline.png":::

3. Set up the file path to define the file or folder as the destination. Select **File settings** for more settings, such as file format, compression type, and so on.

   :::image type="content" source="media/copy-data-activity/configure-destination-file-settings-in-pipeline.png" alt-text="Screenshot showing where to find File settings." lightbox="media/copy-data-activity/configure-destination-file-settings-in-pipeline.png":::

4. Expand **Advanced** for more advanced settings.

   :::image type="content" source="media/copy-data-activity/configure-destination-file-details-in-pipeline.png" alt-text="Screenshot of Advanced options." lightbox="media/copy-data-activity/configure-destination-file-details-in-pipeline.png":::

Now you can either save your data pipeline with this single copy activity or continue to design your data pipeline.

## Next steps

[How to monitor pipeline runs](monitor-pipeline-runs.md)