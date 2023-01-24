---
title: Move and transform data with dataflow and pipelines
description: Steps for moving and transforming data with dataflows and pipelines.
ms.reviewer: jonburchel
ms.author: noelleli
author: n0elleli
ms.topic: quickstart
ms.date: 01/27/2023
---

# QuickStart: Move and transform data with dataflows and pipelines

In this tutorial, you'll learn how to show how the dataflow and pipeline experience can create a powerful and comprehensive Data factory solution.  

## Prerequisites

To get started, you must complete the following prerequisites:  

- A tenant account with an active subscription. Create an account for free.
- A workspace is created.
- [An Azure SQL database with table data](/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal).
- [A Blob Storage account](/azure/storage/common/storage-account-create?tabs=azure-portal).

## Transform data with dataflows

Follow these steps to set up your dataflow.

### Step 1: Create a dataflow

1. From your workspace, click **New** and select **Dataflow Gen2 (Preview)**.

   :::image type="content" source="media/transform-data/select-dataflow-56.png" alt-text="User interface showing where to start creating a dataflow.":::

### Step 2: Get data

1. Select **Get Data** in the top left corner of the home banner and click **More…** to see a list of all possible data sources. For this tutorial, we'll select data from an Azure SQL database.

   :::image type="content" source="media/transform-data/dataflow-get-data-57.png" alt-text="User interface for selecting from available data sources.":::

2. Select **Azure SQL database.** You can use the **Category Filter** or the **Search** bar to find it.  

   :::image type="content" source="media/transform-data/select-azure-sql-58.png" alt-text="User interface showing how to select Azure SQL database.":::

3. Connect to your Azure SQL Database. You'll need the **Server** name, **Database** name, and **Connection credentials.** Once you’ve entered the details, click **Next** to create your connection.

   :::image type="content" source="media/transform-data/connect-to-database-59.png" alt-text="User interface for the Connect to data source screen.":::

4. Select the data you’d like to transform and click **Create**.

   :::image type="content" source="media/transform-data/data-to-transform-60.png" alt-text="User interface for choosing from the available data.":::

### Step 3: Transform your data

1. Select **Diagram view**.  

   :::image type="content" source="media/transform-data/select-diagram-view-61.png" alt-text="User interface showing where to select diagram view.":::

2. Right click, on your **CustomerID** query and select **Merge queries.**  

   :::image type="content" source="media/transform-data/select-merge-query-62.png" alt-text="User interface showing where to find the Merge queries option.":::

3. Configure the merge by selecting the join keys and join kind. Click **Ok** when done.  

   :::image type="content" source="media/transform-data/select-join-keys-kind-63.png" alt-text="User interface for the Merge configuration screen.":::

### Step 4: Set your output destination and publish

1. Click **Choose data destination** in your merged query and select **Azure SQL database.**

   :::image type="content" source="media/transform-data/choose-data-destination-64.png" alt-text="User interface for selecting the data destination.":::

2. Enter your **Server** and **Database** name in **Connection Settings.** Click **Next.**  

   :::image type="content" source="media/transform-data/server-database-names-65.png" alt-text="User interface for the Connect to data destination screen.":::

3. Create a new table and choose a name. Select **Save settings.**

   :::image type="content" source="media/transform-data/create-table-name-66.png" alt-text="User interface for creating and naming a new table.":::

4. Review queries and click **Publish**.  

   :::image type="content" source="media/transform-data/review-and-publish-67.png" alt-text="User interface for reviewing queries.":::

## Move data with pipelines

Follow these steps to create your pipeline.

### Step 1: Create a new pipeline

1. From your workspace, click **New** and select **Data pipeline**.  

   :::image type="content" source="media/transform-data/create-new-pipeline-68.png" alt-text="User interface show how to start a new data pipeline.":::

### Step 2: Start with copy assistant

1. Click on **Copy data** on the canvas to open the **Copy Assistant** tool to get started. Or click on **Use copy assistant** from the **Copy data** drop down list under **Activities** tab on the ribbon.  

   :::image type="content" source="media/transform-data/open-copy-assistant-69.png" alt-text="User interface showing two was to access the copy assistant.":::

### Step 3: Configure your source

1. Choose your data source by choosing a data source type. In this tutorial, we'll use Azure SQL Database as an example. Click on **Azure SQL Database** and then click on **Next**.

   :::image type="content" source="media/transform-data/choose-data-source-70.png" alt-text="User interface for choosing data source.":::

2. Create a connection to your data source by clicking on **New Connection**.

   :::image type="content" source="media/transform-data/create-connection-71.png" alt-text="User interface for creating a new connection.":::

3. After you click **New Connection**, a new browser will open with the connection creation page. Fill in the required connection information on the panel and then click **Create**.  

   :::image type="content" source="media/transform-data/connection-creation-page-72.png" alt-text="User interface for the connection creation screen.":::

4. Once your connection is created successfully, you'll be brought back to the copy assistant page. Click **Refresh** to fetch your newly created connection. You can also choose an existing connection from the drop-down directly if you've already created one.

   :::image type="content" source="media/transform-data/copy-assistant-refresh-73.png" alt-text="User interface showing how to select Refresh.":::

5. Select the table(s) you want to move and then click **Next**.

   :::image type="content" source="media/transform-data/select-move-table-74.png" alt-text="User interface showing how to select from available tables.":::

### Step 4: Configure your destination

1. Choose **Azure Blob Storage** as your destination and then click **Next**.

   :::image type="content" source="media/transform-data/choose-storate-destination-75.png" alt-text="User interface showing where to select data destination.":::

2. Create a connection to your destination by clicked **New Connection.**

   :::image type="content" source="media/transform-data/create-new-connection-76.png" alt-text="User interface for creating a connection.":::

3. After you click **New Connection**, a new browser will open with the connection creation page. Fill in the required connection information on the panel and then click **Create**.  

   :::image type="content" source="media/transform-data/new-connection-page-77.png" alt-text="User interface for the connection creation screen.":::

4. Once your connection is successfully created, you'll be brought back to the copy assistant page. Click **Refresh** to fetch your newly created connection. You can also choose an existing connection from the drop-down directly if you already created one.

   :::image type="content" source="media/transform-data/fetch-new-connection-78.png" alt-text="User interface showing where to select Refresh.":::

5. Select your **Folder Path** and choose a **File name.** Click **Next** when complete.  

   :::image type="content" source="media/transform-data/select-folder-filename-79.png" alt-text="User interface for selecting folder path and file name.":::

6. Finalize your settings. Then, review and click **Ok** to finish the process.  

   :::image type="content" source="media/transform-data/finalize-and-review-80.png" alt-text="User interface for reviewing copy data settings.":::

### Step 5: Design your pipeline and save to run and load data

1. Add a **Dataflow** activity to your pipeline by clicking **Dataflow** in the **Activities** tab.  

   :::image type="content" source="media/transform-data/add-dataflow-activity-81.png" alt-text="User interface showing where to select the Dataflow option.":::

2. Choose the dataflow you created in the **Dataflow** activity **Settings** from the drop-down list.

   :::image type="content" source="media/transform-data/choose-dataflow-82.png" alt-text="User interface showing how to choose the dataflow you created.":::

3. To run the **Dataflow** activity after the copy activity, drag from **Succeeded** on the **Copy** activity to the **Dataflow** activity. This means that the **Dataflow** activity will only run after the **Copy** activity has succeeded.  

   :::image type="content" source="media/transform-data/copy-dataflow-activity-83.png" alt-text="User interface showing how to make the dataflow run take place after the copy activity.":::

4. Click **Save** to save your pipeline. Then. Select **Run** to run your pipeline and load your data.  

   :::image type="content" source="media/transform-data/save-run-pipeline-84.png" alt-text="User interface showing where to select Run.":::
