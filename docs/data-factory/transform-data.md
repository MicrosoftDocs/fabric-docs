---
title: Move and transform data with dataflow and data pipelines
description: Steps for moving and transforming data with dataflows and data pipelines.
ms.reviewer: jonburchel
ms.author: noelleli
author: n0elleli
ms.topic: quickstart
ms.date: 2/10/2023
---

# QuickStart: Move and transform data with dataflows and data pipelines

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this tutorial, you'll see how the dataflow and data pipeline experience can create a powerful and comprehensive Data factory solution.  

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. Create a [free account](https://azure.microsoft.com/free/).
- Make sure you have a Project [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a Project Trident enabled Workspace.pdf (sharepoint.com)](https://microsofteur.sharepoint.com/teams/TridentPrivatePreview/Shared%20Documents/Documentation/Private%20Preview%20Documentation/Enabling%20Trident/Create%20a%20Project%20Trident%20enabled%20Workspace.pdf) that isn’t the default My Workspace.
- [An Azure SQL database with table data](/azure/azure-sql/database/single-database-create-quickstart).
- [A Blob Storage account](/azure/storage/common/storage-account-create).

## Transform data with dataflows

Follow these steps to set up your dataflow.

### Step 1: Create a dataflow

1. From your workspace, select **New**. Then select **Dataflow Gen2**.

   :::image type="content" source="media/transform-data/select-dataflow.png" alt-text="Screenshot showing where to start creating a dataflow." lightbox="media/transform-data/select-dataflow.png":::

### Step 2: Get data

1. Select **Get Data** in the top left corner of the home banner. Then select **More** to see a list of all possible data sources. For this tutorial, you'll select data from an Azure SQL database.

   :::image type="content" source="media/transform-data/dataflow-get-data.png" alt-text="Screenshot showing where to select from available data sources." lightbox="media/transform-data/dataflow-get-data.png":::

2. Select **Azure SQL database.** You can use the **Category Filter** or the **Search** bar to find it.  

   :::image type="content" source="media/transform-data/select-azure-sql.png" alt-text="Screenshot showing how to select Azure SQL database." lightbox="media/transform-data/select-azure-sql.png":::

3. Connect to your Azure SQL database. You'll need the **Server** name, **Database** name, and **Connection credentials.** Once you’ve entered the details, select **Next** to create your connection.

   :::image type="content" source="media/transform-data/connect-to-database.png" alt-text="Screenshot of the Connect to data source screen." lightbox="media/transform-data/connect-to-database.png":::

4. Select the data you’d like to transform and then select **Create**.

   :::image type="content" source="media/transform-data/data-to-transform.png" alt-text="Screenshot showing where to choose from the available data." lightbox="media/transform-data/data-to-transform.png":::

### Step 3: Transform your data

1. Select **Diagram view**.  

   :::image type="content" source="media/transform-data/select-diagram-view.png" alt-text="Screenshot showing where to select diagram view." lightbox="media/transform-data/select-diagram-view.png":::

2. Right-click your **CustomerID** query and select **Merge queries.**  

   :::image type="content" source="media/transform-data/select-merge-query.png" alt-text="Screenshot showing where to find the Merge queries option." lightbox="media/transform-data/select-merge-query.png":::

3. Configure the merge by selecting the join keys and join kind. Select **Ok** when done.  

   :::image type="content" source="media/transform-data/select-join-keys-kind.png" alt-text="Screenshot of the Merge configuration screen." lightbox="media/transform-data/select-join-keys-kind.png":::

### Step 4: Set your output destination and publish

1. Select **Choose data destination** in your merged query, and then select **Azure SQL database.**

   :::image type="content" source="media/transform-data/choose-data-destination.png" alt-text="Screenshot showing where to select the data destination." lightbox="media/transform-data/choose-data-destination.png":::

2. Enter your **Server** and **Database** name in **Connection Settings.** Then select **Next.**  

   :::image type="content" source="media/transform-data/server-database-names.png" alt-text="Screenshot of the Connect to data destination screen." lightbox="media/transform-data/server-database-names.png":::

3. Create a new table and choose a name. Select **Save settings.**

   :::image type="content" source="media/transform-data/create-table-name.png" alt-text="Screenshot showing where to create and name a new table." lightbox="media/transform-data/create-table-name.png":::

4. Review the queries, and then select **Publish**.  

   :::image type="content" source="media/transform-data/review-and-publish.png" alt-text="Screenshot showing where to review queries." lightbox="media/transform-data/review-and-publish.png":::

## Move data with data pipelines

Follow these steps to create your data pipeline.

### Step 1: Create a new data pipeline

1. From your workspace, select **New**, and then select **Data pipeline**.  

   :::image type="content" source="media/transform-data/create-new-pipeline.png" alt-text="Screenshot showing where to start a new data pipeline." lightbox="media/transform-data/create-new-pipeline.png":::

### Step 2: Start with copy assistant

1. Select **Copy data** on the canvas to open the **Copy Assistant** tool to get started. Or select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/transform-data/open-copy-assistant.png" alt-text="Screenshot showing the two ways to access the copy assistant." lightbox="media/transform-data/open-copy-assistant.png":::

### Step 3: Configure your source

1. Choose your data source by selecting a data source type. In this tutorial, you'll use Azure SQL Database as an example. Select **Azure SQL Database**, and then select **Next**.

   :::image type="content" source="media/transform-data/choose-data-source.png" alt-text="Screenshot showing where to choose a data source." lightbox="media/transform-data/choose-data-source.png":::

2. Create a connection to your data source by selecting **New Connection**.

   :::image type="content" source="media/transform-data/create-connection.png" alt-text="Screenshot showing where to create a new connection.":::

3. After you select **New Connection**, a new browser will open with the connection creation page. Fill in the required connection information on the panel. Then select **Create**.

   :::image type="content" source="media/transform-data/connection-creation-page.png" alt-text="Screenshot of the connection creation screen.":::

4. Once your connection is created successfully, you'll be brought back to the copy assistant page. Select **Refresh** to fetch your newly created connection. You can also choose an existing connection from the drop-down directly if you've already created one.

   :::image type="content" source="media/transform-data/copy-assistant-refresh.png" alt-text="Screenshot showing how to select Refresh." lightbox="media/transform-data/copy-assistant-refresh.png":::

5. Select the table(s) you want to move, and then select **Next**.

   :::image type="content" source="media/transform-data/select-move-table.png" alt-text="Screenshot showing how to select from available tables." lightbox="media/transform-data/select-move-table.png":::

### Step 4: Configure your destination

1. Choose **Azure Blob Storage** as your destination, and then select **Next**.

   :::image type="content" source="media/transform-data/choose-storage-destination.png" alt-text="Screenshot showing where to select data destination." lightbox="media/transform-data/choose-storage-destination.png":::

2. Create a connection to your destination by selecting **New Connection.**

   :::image type="content" source="media/transform-data/create-new-connection.png" alt-text="Screenshot showing how to create a connection." lightbox="media/transform-data/create-new-connection.png":::

3. After you select **New Connection**, a new browser will open with the connection creation page. Fill in the required connection information on the panel. Then select **Create**.

   :::image type="content" source="media/transform-data/new-connection-page.png" alt-text="Screenshot of the New connection screen.":::

4. Once your connection is successfully created, you'll be brought back to the copy assistant page. Select **Refresh** to fetch your newly created connection. You can also choose an existing connection from the drop-down directly if you already created one.

   :::image type="content" source="media/transform-data/fetch-new-connection.png" alt-text="Screenshot showing where to select Refresh." lightbox="media/transform-data/fetch-new-connection.png":::

5. Select your **Folder Path** and choose a **File name.** Select **Next** when complete.  

   :::image type="content" source="media/transform-data/select-folder-filename.png" alt-text="Screenshot showing how to select folder path and file name." lightbox="media/transform-data/select-folder-filename.png":::

6. Finalize your settings. Then, review and select **OK** to finish the process.  

   :::image type="content" source="media/transform-data/finalize-and-review.png" alt-text="Screenshot showing how to review copy data settings." lightbox="media/transform-data/finalize-and-review.png":::

### Step 5: Design your data pipeline and save to run and load data

1. Add a **Dataflow** activity to your data pipeline by selecting **Dataflow** in the **Activities** tab.  

   :::image type="content" source="media/transform-data/add-dataflow-activity.png" alt-text="Screenshot showing where to select the Dataflow option." lightbox="media/transform-data/add-dataflow-activity.png":::

2. Choose the dataflow you created in the **Dataflow** activity **Settings** from the drop-down list.

   :::image type="content" source="media/transform-data/choose-dataflow.png" alt-text="Screenshot showing how to choose the dataflow you created." lightbox="media/transform-data/choose-dataflow.png":::

3. To run the **Dataflow** activity after the copy activity, drag from **Succeeded** on the **Copy** activity to the **Dataflow** activity. The **Dataflow** activity will only run after the **Copy** activity has succeeded.  

   :::image type="content" source="media/transform-data/copy-dataflow-activity.png" alt-text="Screenshot showing how to make the dataflow run take place after the copy activity." lightbox="media/transform-data/copy-dataflow-activity.png":::

4. Select **Save** to save your data pipeline. Then select **Run** to run your data pipeline and load your data.  

   :::image type="content" source="media/transform-data/save-run-pipeline.png" alt-text="Screenshot showing where to select Run." lightbox="media/transform-data/save-run-pipeline.png":::
