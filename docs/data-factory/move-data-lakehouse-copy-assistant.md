---
title: Move data into Lakehouse via copy assistant
description: Learn steps to move data as files or tables into Lakehouse.
ms.reviewer: jonburchel
ms.author: jianleishen
author: jianleishen
ms.topic: tutorial
ms.date: 01/27/2023
---

# Tutorial: Move data into Lakehouse via copy assistant

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. Create an account for free.
- A workspace is created.
- A Lakehouse is created in your workspace.

## Move files into Lakehouse as tables in delta format via copy assistant

Follow these steps to set up your copy activity.

### Step 1: Start with copy assistant

1. Open an existing data pipeline or create a new data pipeline.
1. Click on **Copy data** on the canvas to open the **Copy Assistant** tool to get started. Or click on **Use copy assistant** from the **Copy data** drop down list under **Activities** tab on the ribbon.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/use-copy-assistant-1.png" alt-text="Screenshot showing the two places you can access the copy assistant.":::

### Step 2: Configure your source

1. Choose your data source by choosing a data source type. In this tutorial, we'll use Azure SQL Database as an example. Click on **Azure SQL Database** and then click on **Next**.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/copy-azure-sql-database-2.png" alt-text="Screenshot showing where to choose your data source in the Copy data screen.":::

2. Create a connection to your data source by clicking on **New Connection**.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/new-connection-3.png" alt-text="Screenshot showing where to select New connection.":::

After you click on **New Connection**, it will navigate to the connection creation page in a new browser. You can fill in the required connection information on the panel and then click on **Create**.

:::image type="content" source="media/move-data-lakehouse-copy-assistant/new-connection-details-4.png" alt-text="Screenshot of the New connection page.":::

Once your connection is created successfully, it will take you back to the previous page. Then click on **Refresh** to fetch your connection that you just created and go to the next step. You could choose an existing connection from the drop-down directly if you already created it before.

:::image type="content" source="media/move-data-lakehouse-copy-assistant/azure-sql-sample-database-connection-5.png" alt-text="Screenshot showing where to refresh your connection information.":::

3. Select the table(s) that is to be moved and then click on **Next**.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/product-customer-tables-6.png" alt-text="Screenshot showing where to select the tables.":::

### Step 3: Configure your destination

1. Choose **Lakehouse** as your destination and then go to next.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/lakehouse-destination-7.png" alt-text="Screenshot showing where to select your copy destination.":::

Select your existing Lakehouse from your current workspace directly and then go to next.

:::image type="content" source="media/move-data-lakehouse-copy-assistant/select-lakehouse-8.png" alt-text="Screenshot showing where to select the data store.":::

2. Configure your table settings in Lakehouse.Select **Tables** under **Root folder** and specify the **table name**. Then click **Next** to continue.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/map-to-table-destination-9.png" alt-text="Screenshot of where to select your table destination.":::

3. Click **OK** to finish the assistant experience.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/review-create-10.png" alt-text="Screenshot showing where to click ok on the Review and create screen.":::

### Step F4: Save your pipeline and run it to load data

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/save-pipeline-and-run-11.png" alt-text="Screenshot showing where to select Run.":::

Click on the **glasses** icon to view the details for each copy activity run:

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/view-run-details-12.png" alt-text="Screenshot showing where to select the glasses icon and the resulting detail screen.":::

### Step 5: View your tables from Lakehouse

1. Go to your Lakehouse and refresh your **Lake view** to see the latest data ingested.
1. Switch to **Table view** to view the data in table.

:::image type="content" source="media/move-data-lakehouse-copy-assistant/view-table-output-13.png" alt-text="Screenshot showing where to switch to Table view.":::

> [!Note]
> Currently data can be landed into Lakehouse Tables folder (managed area) in Delta format only. Those files will be automatically registered as a table and be visible under Table view from Lakehouse portal.<br>Only first layer folders under Tables will be registered as delta table.<br>Browsing or Preview from Lakehouse Table isn't supported yet.<br>Data that gets loaded into the same table will be appended. Delete or Update to tables is not supported yet.

## Move files into Lakehouse as files via Copy assistant

Follow these steps to move files into Lakehouse.

### Step 1: Start with Copy assistant

1. Open an existing data pipeline or create a new data pipeline.
1. Click on **Copy Data** on the canvas to open the **Copy Assistant** tool to get started. Or click on **Use copy assistant** from the **Copy data** drop down list under **Activities** tab on the ribbon.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/use-copy-assistant-1.png" alt-text="Screenshot showing the two places you can access the copy assistant.":::

### Step 2: Configure your source

1. Choose your data source by choosing a data source type. In this tutorial, we'll use Azure SQL Database as an example. Click on **Azure SQL Database** and then click on **Next**.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/copy-azure-sql-database-2.png" alt-text="Screenshot of the Choose data source screen.":::

2. Either create a new connection or choose an existing connection from the drop-down directly.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/new-connection-3.png" alt-text="Screenshot showing where to select New connection.":::

3. Select the table(s) that is to be moved and then click on **Next**.

   :::image type="content" source="media/move-data-lakehouse-copy-assistant/product-customer-tables-6.png" alt-text="Screenshot showing where to select the tables.":::

### Step 3: Configure your destination

1. Choose **Lakehouse** as your destination and then go to next.

:::image type="content" source="media/move-data-lakehouse-copy-assistant/lakehouse-destination-7.png" alt-text="Screenshot showing where to select Lakehouse as the destination.":::

Select your existing Lakehouse from your current workspace directly and then go to next.

:::image type="content" source="media/move-data-lakehouse-copy-assistant/select-lakehouse-8.png" alt-text="Screenshot showing where to select your existing Lakehouse.":::

2. Configure your settings in Lakehouse.

Select **Files** under **Root folder** and specify your **file directory** and **file names**. Then click **Next** to continue.

:::image type="content" source="media/move-data-lakehouse-copy-assistant/configure-azure-sql-database-source-14.png" alt-text="Screenshot of the destination configuration screen.":::

3. Click **Next** to configure the file settings if needed.
1. Click **OK** to finish the assistant experience.

### Step 4: Save your pipeline and run it to load data

:::image type="content" source="media/move-data-lakehouse-copy-assistant/save-pipeline-and-run-11.png" alt-text="Screenshot of home tab showing where to select Save and Run.":::

Click on the **glasses** icon to view the details for each copy activity run:

:::image type="content" source="media/move-data-lakehouse-copy-assistant/view-run-details-12.png" alt-text="Screenshot showing were to select the glasses icon.":::

### Step 5: View your files from Lakehouse

1. Go to your Lakehouse and refresh your Lake view to see the latest data ingested.

:::image type="content" source="media/move-data-lakehouse-copy-assistant/view-file-output-16.png" alt-text="Screenshot showing where to refresh your Lake view.":::
