---
title: Move data from Azure SQL DB into Lakehouse via copy assistant
description: Learn steps to move data as files or tables into Lakehouse.
ms.reviewer: jonburchel
ms.author: jianleishen
author: jianleishen
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Pipeline Copy Assistant
---

# Move data from Azure SQL DB into Lakehouse via copy assistant

This tutorial describes the steps to move data into Lakehouse.

Two approaches are provided using the copy assistant:

1. The first approach moves source data into destination tables with delta format.
2. The second approach moves source data into destination files.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. Create an account for free.
- A workspace is created.
- A Lakehouse is created in your workspace.

## Move files into Lakehouse as tables in delta format via copy assistant

Follow these steps to set up your copy activity.

### Step 1: Start with copy assistant

1. Open an existing data pipeline or create a new data pipeline.

2. Select **Copy data** on the canvas to open the **Copy Assistant** tool to get started. Or select **Use copy assistant** from the **Copy data** drop down list under **Activities** tab on the ribbon.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/use-copy-assistant-1.png" alt-text="Screenshot showing the two places you can access the copy assistant.":::

### Step 2: Configure your source

1. Choose your data source by choosing a data source type. In this tutorial, we'll use Azure SQL Database as an example. Scroll down on the **Choose data source** screen to find and select **Azure SQL Database** and then select **Next**.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/copy-azure-sql-database-2.png" alt-text="Screenshot showing where to choose your data source in the Copy data screen.":::

2. Create a connection to your data source by selecting **New Connection**, and filling in the required connection information on the panel.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/new-connection-3.png" alt-text="Screenshot showing where to select New connection.":::

   After you fill in the required connection information on the panel, select **Next**.

   Once your connection is created successfully, you will see a list of tables you can select.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/azure-sql-sample-database-connection-5.png" alt-text="Screenshot showing where to refresh your connection information.":::

3. Select the table(s) that is to be moved. Then, select **Next**.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/product-customer-tables-6.png" alt-text="Screenshot showing where to select the tables.":::

### Step 3: Configure your destination

1. Choose **Lakehouse** as your destination and then go to next.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/lakehouse-destination-7.png" alt-text="Screenshot showing where to select your copy destination.":::

   Select your existing Lakehouse from your current workspace directly and then go to next.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/select-lakehouse-8.png" alt-text="Screenshot showing where to select the data store.":::

2. Configure your table settings in Lakehouse.Select **Tables** under **Root folder** and specify the **table name**. Select **Next** to continue.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/map-to-table-destination-9.png" alt-text="Screenshot of where to select your table destination.":::

3. Select **OK** to finish the assistant experience.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/review-create-10.png" alt-text="Screenshot showing where to select ok on the Review and create screen.":::

### Step 4: Save your data pipeline and run it to load data

1. Select **Save**. Then, select **Run**

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/save-pipeline-and-run-11.png" alt-text="Screenshot showing where to select Run.":::

2. Select the **glasses** icon to view the details for each copy activity run:

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/view-run-details-12.png" alt-text="Screenshot showing where to select the glasses icon and the resulting detail screen.":::

### Step 5: View your tables from Lakehouse

1. Go to your Lakehouse and refresh your **Lake view** to see the latest data ingested.

2. Switch to **Table view** to view the data in table.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/view-table-output-13.png" alt-text="Screenshot showing where to switch to Table view.":::

   > [!Note]
   > Currently data lands into Lakehouse Tables folders (a managed area) in Delta format only. Those files will be automatically registered as a table and be visible under Table view from Lakehouse portal.
   > Only the first layer folders under Tables will be registered as delta table.
   > Browsing or Previewing from Lakehouse Table isn't supported yet.
   > Data that gets loaded into the same table will be appended. Delete or Update to tables isn't supported yet.

## Related content

This sample shows you how to move data from Azure SQL DB into Lakehouse with the Copy Assistant in Data Factory for Microsoft Fabric.  You learned how to:

> [!div class="checklist"]
> - Move files into Lakehouse as tables in delta format with the Copy Assistant.

Next, advance to learn more about monitoring your pipeline runs.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
