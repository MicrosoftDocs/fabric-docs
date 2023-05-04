---
title: Move and transform data with dataflow and data pipelines
description: Steps for moving and transforming data with dataflows and data pipelines.
ms.reviewer: jonburchel
ms.author: noelleli
author: n0elleli
ms.topic: quickstart
ms.date: 2/10/2023
---

# Quickstart: Move and transform data with dataflows and data pipelines

In this tutorial, you'll see how the dataflow and data pipeline experience can create a powerful and comprehensive Data factory solution.  

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. Create a [free account](https://azure.microsoft.com/free/).
- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../get-started/create-workspaces.md) that isn’t the default My Workspace.
- [An Azure SQL database with table data](/azure/azure-sql/database/single-database-create-quickstart).
- [A Blob Storage account](/azure/storage/common/storage-account-create).

## Transform data with dataflows

Follow these steps to set up your dataflow.

### Step 1: Create a dataflow
1. If it is not already selected, choose the **Power BI** workload from the button on the bottom left of the screen.

   :::image type="content" source="media/transform-data/switch-to-power-bi.png" alt-text="Screenshot showing the selection of the Power BI workload from the button at the bottom left of the screen.":::

1. Choose your Fabric enabled workspace, and then select **New**. Then select **Dataflow**.

   :::image type="content" source="media/transform-data/select-dataflow.png" alt-text="Screenshot showing where to start creating a dataflow." :::

1. You may be asked whether you want to build a datamart, instead. Choose **No, create a dataflow**.

   :::image type="content" source="media/transform-data/build-datamart-prompt.png" alt-text="Screenshot showing a prompt for whether the user wants to build a datamart instead of a dataflow.":::

1. The **Start creating your dataflow** window appears.  Select **Add new tables** on the **Define new tables** card.

   :::image type="content" source="media/transform-data/start-creating-dataflow.png" alt-text="Screenshot showing the Start creating your dataflow window.":::

### Step 2: Get data

1. On the **Choose data source** dialog presented next, select the **Azure** category, and then **Azure SQL database**.

   :::image type="content" source="media/transform-data/select-azure-sql.png" alt-text="Screenshot showing how to select Azure SQL database.":::

1. Connect to your Azure SQL database. You'll need the **Server** name, **Database** name, and **Connection credentials.** Once you’ve entered the details, select **Next** to create your connection.

   :::image type="content" source="media/transform-data/connect-to-database.png" alt-text="Screenshot of the Connect to data source screen.":::

4. Select the data you’d like to transform and then select **Transform data**. For this quickstart we select SalesLT.Customer from the _AdventureWorks LT_ sample data provided for Azure SQL DB, and then **Select related tables** to select two other tables.

   :::image type="content" source="media/transform-data/data-to-transform.png" alt-text="Screenshot showing where to choose from the available data." :::

### Step 3: Transform your data

1. Under the **View** menu at the top of the Power Query page, select **Diagram view**, or select the **Diagram view** button along the status bar at the bottom of the page. Either of these options can toggle the diagram view.

   :::image type="content" source="media/transform-data/select-diagram-view.png" alt-text="Screenshot showing where to select diagram view.":::

1. Right-click your **SalesLT Customer** query and select **Merge queries**.  

   :::image type="content" source="media/transform-data/select-merge-query.png" alt-text="Screenshot showing where to find the Merge queries option.":::

1. Configure the merge by selecting the **SalesOrderHeader** table as the right table for the merge, the **CustomerID** column from each table as the join column, and **Left outer** as the join kind. Then select **Ok** when to add the merge query.  

   :::image type="content" source="media/transform-data/select-join-keys-kind.png" alt-text="Screenshot of the Merge configuration screen." lightbox="media/transform-data/select-join-keys-kind.png":::

1. Select **Save and close** at the bottom right of the window to save your dataflow into your workspace, and name it when prompted.

## Move data with data pipelines

Now that you created a dataflow, you can operate on it in a pipeline. 

1. Switch to Data Factory using the button on the bottom left.
:::image type="content" source="media/transform-data/switch-to-data-factory.png" alt-text="Screenshot showing the workload switching button with Data Factory highlighted from its options.":::

1. Follow these steps to create your data pipeline.

### Step 1: Create a new data pipeline

1. From your workspace, select **New**, and then select **Data pipeline**.  

   :::image type="content" source="media/transform-data/create-new-pipeline.png" alt-text="Screenshot showing where to start a new data pipeline.":::

1. Name your pipeline then select **Create**.

   :::image type="content" source="media/transform-data/name-pipeline.png" alt-text="Screenshot showing the new pipeline creation prompt with a sample pipeline name.":::

### Step 2: Start with copy assistant

1. Select **Copy data** on the canvas to open the **Copy Assistant** tool to get started. Or select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/transform-data/open-copy-assistant.png" alt-text="Screenshot showing the two ways to access the copy assistant.":::

### Step 3: Configure your source

1. Choose your data source by selecting a data source type. In this tutorial, you'll use Azure SQL Database as an example. Scroll down below the sample data offerings and select the **Azure** tab under **Data sources**, then **Azure SQL Database**. Then select **Next** to continue.

   :::image type="content" source="media/transform-data/choose-data-source.png" alt-text="Screenshot showing where to choose a data source.":::

1. Create a connection to your data source by selecting **Create new connection**. Fill in the required connection information on the panel. Then select **Next**.

   :::image type="content" source="media/transform-data/create-connection.png" alt-text="Screenshot showing where to create a new connection.":::

1. Once your connection is created successfully, you'll be brought back to the copy assistant page. Select **Refresh** to fetch your newly created connection. You can also choose an existing connection from the drop-down directly if you've already created one. Once you choose your connection, select **Next**.

   :::image type="content" source="media/transform-data/copy-assistant-refresh.png" alt-text="Screenshot showing how to select Refresh." lightbox="media/transform-data/copy-assistant-refresh.png":::

5. Select the table(s) you want to move, and then select **Next**.

   :::image type="content" source="media/transform-data/select-move-table.png" alt-text="Screenshot showing how to select from available tables.":::

### Step 4: Configure your destination

1. Choose **Azure Blob Storage** as your destination, and then select **Next**.

   :::image type="content" source="media/transform-data/choose-data-destination.png" alt-text="Screenshot showing the Azure Blob Storage data destination.":::

1. Create a connection to your destination by selecting **Create new connection**. Provide the details for your connection, then select **Next**.

   :::image type="content" source="media/transform-data/create-new-connection-blob-storage.png" alt-text="Screenshot showing how to create a connection.":::

1. Select your **Folder path**, then select **Next**.

   :::image type="content" source="media/transform-data/select-folder-filename.png" alt-text="Screenshot showing how to select folder path and file name.":::

1. Select **Next** again to accept the default file format, column delimiter, row delimiter and compression type, optionally including a header. 

   :::image type="content" source="media/transform-data/choose-file-configuration-options.png" alt-text="Screenshot showing the configuration options for the file in Azure Blob Storage.":::

1. Finalize your settings. Then, review and select **OK** to finish the process.  

   :::image type="content" source="media/transform-data/finalize-and-review.png" alt-text="Screenshot showing how to review copy data settings." lightbox="media/transform-data/finalize-and-review.png":::

### Step 5: Design your data pipeline and save to run and load data

1. Add a **Dataflow** activity to your data pipeline by selecting **Dataflow** in the **Activities** tab.  

   :::image type="content" source="media/transform-data/add-dataflow-activity.png" alt-text="Screenshot showing where to select the Dataflow option." lightbox="media/transform-data/add-dataflow-activity.png":::

1. Choose the dataflow you created in the **Dataflow** activity **Settings** from the drop-down list.

   :::image type="content" source="media/transform-data/choose-dataflow.png" alt-text="Screenshot showing how to choose the dataflow you created." lightbox="media/transform-data/choose-dataflow.png":::

1. To run the **Dataflow** activity after the copy activity, drag from **Succeeded** on the **Copy** activity to the **Dataflow** activity. The **Dataflow** activity will only run after the **Copy** activity has succeeded.  

   :::image type="content" source="media/transform-data/copy-dataflow-activity.png" alt-text="Screenshot showing how to make the dataflow run take place after the copy activity." lightbox="media/transform-data/copy-dataflow-activity.png":::

1. Select **Save** to save your data pipeline. Then select **Run** to run your data pipeline and load your data.  

   :::image type="content" source="media/transform-data/save-run-pipeline.png" alt-text="Screenshot showing where to select Run." lightbox="media/transform-data/save-run-pipeline.png":::

## Next steps

[Monitor pipeline runs](monitor-pipeline-runs.md)
