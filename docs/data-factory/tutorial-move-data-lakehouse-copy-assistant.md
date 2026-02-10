---
title: Move data from Azure SQL DB into Lakehouse via copy assistant
description: Learn steps to move data as files or tables into Lakehouse.
ms.reviewer: jianleishen
ms.topic: tutorial
ms.custom: pipelines, sfi-image-nochange
ms.date: 12/18/2024
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

1. Open an existing pipeline or create a new pipeline.

1. Select **Copy data assistant** on the canvas to open the wizard and get started. Or select **Use copy assistant** from the **Copy data** drop down list under **Activities** tab on the ribbon.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/copy-data-button.png" alt-text="Screenshot showing the two places you can access the copy assistant.":::

### Step 2: Configure your source

1. Choose your data source by choosing a data source type. In this tutorial, we'll use Azure SQL Database as an example. Search  on the **Choose data source** screen to find and select **Azure SQL Database**.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/copy-azure-sql-database.png" alt-text="Screenshot showing where to choose your data source in the Copy data screen.":::

1. Create a connection to your data source by filling in the required connection information on the panel.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/new-connection.png" alt-text="Screenshot showing where to select New connection.":::

   After you fill in the required connection information on the panel, select **Next**.

   If you didn't already select a database initially, a list of databases is presented for you to select from.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/azure-sql-sample-database-connection.png" alt-text="Screenshot showing where to refresh your connection information.":::

1. Select the table(s) that is to be moved. Then, select **Next**.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/product-customer-tables.png" lightbox="media/tutorial-move-data-lakehouse-copy-assistant/product-customer-tables.png" alt-text="Screenshot showing where to select the tables.":::

### Step 3: Configure your destination

1. Choose **Lakehouse** as your destination and then select **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/lakehouse-destination.png" alt-text="Screenshot showing where to select your copy destination.":::

   Enter a Lakehouse name, then select **Create and connect**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/create-new-lakehouse.png" alt-text="Screenshot showing where to select the data store.":::

2. Configure and map your source data to the destination Lakehouse table. Select **Tables** for the **Root folder** and **Load to a new table** for **Load settings**. Provide a **Table** name and select **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/configure-lakehouse-tables.png" lightbox="media/create-first-pipeline-with-sample-data/configure-lakehouse-tables.png" alt-text="Screenshot of where to select your table destination.":::

3. Review your configuration, and uncheck the **Start data transfer immediately** checkbox. Then select **Next** to finish the assistant experience.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/review-create.png" alt-text="Screenshot showing where to select ok on the Review and create screen.":::

### Step 4: Save your pipeline and run it to load data

1. Select **Run** from the **Home** toolbar and then select **Save and run** when prompted.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/save-pipeline-and-run.png" alt-text="Screenshot showing where to select Run from the Home tab of the pipeline editor window.":::

2. For each activity that was run, you can select the activity's corresponding link in the Output tab after the pipeline runs to view the details the activity. In this case we have 2 individual copy activities that ran - one for each table copied from SQL Azure to the Lakehouse. When you select the activity's details link, you can see how mmuch data was read and written and how much space the data consumed in the source and destination, as well as throughput speed and other details.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/view-run-details.png" alt-text="Screenshot showing where to select the glasses icon and the resulting detail screen.":::

### Step 5: View your tables from Lakehouse

1. Go to your Lakehouse and refresh your **Lake view** to see the latest data ingested.

2. Switch to **Table view** to view the data in table.

   :::image type="content" source="media/tutorial-move-data-lakehouse-copy-assistant/view-table-output.png" alt-text="Screenshot showing where to switch to Table view.":::

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
