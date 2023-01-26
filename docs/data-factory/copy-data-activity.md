---
title: How to copy data using copy activity
description: Learn how to add a copy activity directly or via the copy assistant.
ms.reviewer: DougKlopfenstein
ms.author: jianleishen
author: jianleishen
ms.topic: how-to
ms.date: 01/27/2023
---
# How to copy data using copy activity (Preview)

Learn how to add a copy activity directly or via the copy assistant.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](https://review.docs.microsoft.com/trident-docs-private-preview/synapse-data-integration/url).
- A workspace is created.

## Add a copy activity via copy assistant

Follow these steps to set up your copy activity via copy assistant.

### Step 1: Start with copy assistant

1. Open an existing data pipeline or create a new data pipeline.
1. Click on **Copy data** on the canvas to open the **Copy Assistant** tool to get started. Or click on **Use copy assistant** from the **Copy data** drop down list under **Activities** tab on the ribbon.

   :::image type="content" source="media/copy-data-activity/use-copy-assistant-1.png" alt-text="Screenshot showing options for opening the copy assistant.":::

### Step 2: Configure your source

1. Choose your data source by choosing a data source type. In this tutorial, we'll use Azure Blob Storage as an example. Click on **Azure Blob Storage** and then click on **Next**.

   :::image type="content" source="media/copy-data-activity/choose-data-source-2.png" alt-text="Screenshot of Choose data source screen.":::

   :::image type="content" source="media/copy-data-activity/choose-azure-blob-storage-source-3.png" alt-text="Screenshot showing where to select the correct data source.":::

2. Create a connection to your data source by clicking on **New connection**.

   :::image type="content" source="media/copy-data-activity/create-new-azure-blob-storage-connection-4.png" alt-text="Screenshot showing where to select New connection.":::

After you click on **New connection**, it will navigate to the connection creation page in a new browser. You can fill in the required connection information on the panel and then click on **Create**. For the details of connection creation for each type of data source, you can refer to each connector doc.

:::image type="content" source="media/copy-data-activity/configure-source-details-5.png" alt-text="Screenshot showing the New connection page.":::

Once your connection is created successfully, it will take you back to the previous page. Then click on **Refresh** to fetch your connection that you just created and go to the next step. You could choose an existing Blob connection from the drop-down directly if you already created it before.

:::image type="content" source="media/copy-data-activity/refresh-source-connection-6.png" alt-text="Screenshot showing where to click Refresh.":::

3. Choose the file or folder to be copied in this source configuration step and then click on **Next**.

   :::image type="content" source="media/copy-data-activity/choose-copy-file-or-folder-7.png" alt-text="Screenshot showing where to select the data to be copied.":::

### Step 3: Configure your destination

1. Choose your destination by choosing a data source type. In this tutorial, we'll use Azure Blob Storage as an example. Click on **Azure Blob Storage** and then click on **Next**.

   :::image type="content" source="media/copy-data-activity/choose-destination-8.png" alt-text="Screenshot showing how to select Azure Blob Storage.":::

2. You can either create a new connection that links to a new Blob Storage account by following the earlier steps or use an existing connection from the connection drop-down list. The capabilities of **Test connection** and **Edit** are available to each selected connection.

   :::image type="content" source="media/copy-data-activity/destination-connection-configuration-9.png" alt-text="Screenshot showing data connection options.":::

3. Configure and map your source data to your destination; then click on **Next** to finish your destination configurations.

   :::image type="content" source="media/copy-data-activity/map-to-destination-10.png" alt-text="Screenshot of Map to destination screen.":::

   :::image type="content" source="media/copy-data-activity/map-to-destination-details-11.png" alt-text="Screenshot of Map to destination details.":::

### Step 4: Review and create your copy activity

1. Review your copy activity settings in the previous steps and click on **OK** to finish. Or you can go back to the previous steps to edit your settings if needed in the tool.

   :::image type="content" source="media/copy-data-activity/review-and-create-copy-activity-12.png" alt-text="Screenshot showing the Review and create screen.":::

Once finished, the copy activity will then be added to your data pipeline canvas. All settings including advanced settings to this copy activity are available under the tabs when it’s selected.

:::image type="content" source="media/copy-data-activity/pipeline-with-copy-activity-13.png" alt-text="Screenshot showing a copy activity on the pipeline canvas.":::

Now you can either save your data pipeline with this single copy activity or continue to design your data pipeline.

## Add a copy activity directly

Follow these steps to add a copy activity directly.

### Step 1: Add a copy activity

1. Open an existing data pipeline or create a new data pipeline.
1. Add a copy activity by clicking on **Add pipeline activity** -> **Copy activity** or clicking on **Copy data** -> **Add to canvas** under **Activities** tab.

   :::image type="content" source="media/copy-data-activity/add-copy-activity-to-pipeline-canvas-14.png" alt-text="Screenshot showing two ways to add a copy activity.":::

### Step 2: Configure your source under the source tab

1. Create a connection to your data source by clicking on **+ New** besides **Connection**.

   :::image type="content" source="media/copy-data-activity/configure-source-connection-in-pipeline-15.png" alt-text="Graphical user interface, text, application, email  Description automatically generated":::

Choose the data source type from the pop-up window after clicking on **+ New**. In this tutorial, we'll use Azure Blob Storage as an example. Click on **Azure Blob Storage** and then click **Continue**.

:::image type="content" source="media/copy-data-activity/choose-azure-blob-storage-connection-in-pipeline-16.png" alt-text="Screenshot showing how to select the data source.":::

It will navigate to the connection creation page in a new browser. You can fill in the required connection information on the panel and then click on **Create**. For the details of connection creation for each type of data source, you can refer to each connector doc.

:::image type="content" source="media/copy-data-activity/configure-connection-details-17.png" alt-text="Screenshot showing New connection page.":::

Once your connection is created successfully, it will take you back to the previous page. Then click on **Refresh** to fetch your connection that you just created from the drop-down list. You could choose an existing Blob connection from the drop-down directly if you already created it before.

:::image type="content" source="media/copy-data-activity/refresh-source-connection-in-pipeline-18.png" alt-text="Screenshot showing where to refresh your connection.":::

2. Set up the file path to define the file or folder to be copied. You can click on **File settings** for more settings such as file format, compression type.

   :::image type="content" source="media/copy-data-activity/configure-source-file-settings-in-pipeline-19.png" alt-text="Graphical user interface, text, application, email  Description automatically generated":::

3. Expand **Advanced** for more advanced settings.

   :::image type="content" source="media/copy-data-activity/file-settings-details-in-pipeline-20.png" alt-text="Screenshot of advanced settings.":::

### Step 3: Configure your destination under the destination tab

1. Choose your destination type. It could be either your internal first class data store from your workspace, such as Lakehouse, or your external data stores. In this tutorial, we'll use Azure Blob Storage as an example.

   :::image type="content" source="media/copy-data-activity/configure-destination-connection-in-pipeline-21.png" alt-text="Screenshot showing where to select destination type.":::

Choose to use **Connection**. You can either create a new connection that links to a new Blob Storage account by following the earlier steps or use an existing connection from the connection drop-down list. The capabilities of **Test connection** and **Edit** are available to each selected connection.

:::image type="content" source="media/copy-data-activity/test-destination-connection-in-pipeline-22.png" alt-text="Screenshot showing where to Test connection and Edit options.":::

2. Set up the file path to define the file or folder as the destination. You can click on **File settings** for more settings such as file format, compression type.

   :::image type="content" source="media/copy-data-activity/configure-destination-file-settings-in-pipeline-23.png" alt-text="Screenshot showing where to find File settings.":::

3. Expand **Advanced** for more advanced settings.

   :::image type="content" source="media/copy-data-activity/configure-destination-file-details-in-pipeline-24.png" alt-text="Screenshot of Advanced options.":::

Now you can either save your data pipeline with this single copy activity or continue to design your data pipeline.
