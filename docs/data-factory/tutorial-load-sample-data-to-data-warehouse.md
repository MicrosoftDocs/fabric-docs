---
title: Load Sample data to Data Warehouse
description: Learn how to build and schedule a new pipeline to copy sample data to a Data Warehouse.
ms.reviewer: xupzhou
ms.topic: tutorial
ms.custom: pipelines, sfi-image-nochange
ms.date: 02/25/2025
ms.search.form: Pipeline Tutorials
---

# Load Sample data to Data Warehouse

In this tutorial, you build a pipeline to move a Sample dataset to the Data Warehouse. This experience shows you a quick demo about how to use pipeline copy activity and how to load data into Data Warehouse.

## Prerequisites

To get started, you must complete the following prerequisites:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. Create an account for free.
- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../fundamentals/create-workspaces.md).
- Make sure you have already created a Data Warehouse. To create it, refer to [Create a Data Warehouse](../data-warehouse/create-warehouse.md)

## Create a pipeline

1. Navigate to [Power BI](https://app.powerbi.com/).
1. Select the Power BI icon in the bottom left of the screen, then select **Fabric** to open homepage of Data Factory.

1. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace. If you created a new workspace in the prior Prerequisites section, use this one.

   :::image type="content" source="media/create-first-dataflow-gen2/navigate-to-workspace.png" alt-text="Screenshot of the workspaces window where you navigate to your workspace.":::

1. Select  **+ New item**.
1. Search for and select **Pipeline** and then input a pipeline name to create a new pipeline. to create a new pipeline.

   :::image type="content" source="media/create-first-pipeline/select-pipeline.png" alt-text="Screenshot showing the new pipeline button in the newly created workspace.":::

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/new-pipeline.png" alt-text="Screenshot showing the name of creating a new pipeline.":::

## Copy data using pipeline

In this session, you start to build your pipeline by following below steps about copying from a sample dataset provided by pipeline into Data Warehouse.

### Step 1: Start with the Copy assistant

1. Select **Copy data assistant** on the canvas to open the **copy assistant** tool to get started. Or Select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/copy-data.png" alt-text="Screenshot showing the Copy data button on a new pipeline.":::

### Step 2: Configure your source

1. Choose the **NYC Taxi - Green** from the **Sample data** options for your data source.

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/nyc-taxi-green.png" alt-text="Screenshot showing the NYC Taxi - Green sample data selection in the Copy data assistant.":::

1. In the **Connect to data source** section of the **Copy data** assistant, a preview of the sample data **NYC Taxi - Green** is displayed. Select **Next** to move on to the data destination.

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/preview-data.png" alt-text="Screenshot showing a preview of the Bing COVID-19 sample data.":::

### Step 3: Configure your destination

1. Select the **OneLake** tab and choose an existing **Warehouse**.

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/data-warehouse-destination.png" alt-text="Screenshot showing the selection of the Warehouse destination.":::
 
1. Configure and map your source data to the destination Warehouse table by entering **Table**, then select **Next** one more time.

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/specify-table-name.png" alt-text="Screenshot showing the table name to create in the Warehouse destination.":::

1. Configure other settings on **Settings** page. In this tutorial, select **Next** directly since you don't need to use staging and copy command.

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/destination-settings.png" alt-text="Screenshot showing the destination settings.":::

### Step 4: Review and run your copy activity

1. Review your copy activity settings in the previous steps and select **Save + Run** to start the activity. Or you can revisit the previous steps in the tool to edit your settings, if needed.

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/review-create-activity.png" alt-text="Screenshot of the Review + create page of the Copy data assistant highlighting source and destination.":::

1. The Copy activity is added to your new pipeline canvas. All settings including advanced settings for the activity are available in the tabs below the pipeline canvas when the created **Copy data** activity is selected.

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/complete-copy-activity.png" alt-text="Screenshot showing the completed Copy activity in the pipeline canvas.":::

## Schedule your pipeline

1. You can monitor the running process and check the results on the **Output** tab below the pipeline canvas.  Select the run details button (with the glasses icon highlighted) to view the run details.

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/run-details-button.png" alt-text="Screenshot showing the Output tab of the pipeline run in-progress with the Details button highlighted in the run status.":::

1. The run details show how much data was read and written and various other details about the run.

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/run-details.png" alt-text="Screenshot showing the run details window.":::

1. You can also schedule the pipeline to run with a specific frequency as required. Below is an example scheduling the pipeline to run every 15 minutes. You can also specify the **Start** time and **End** time for your schedule. If you don't specify a start time, the start time is the time your schedule applies. If you don't specify an end time, your pipeline run will keep recurring every 15 minutes.

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/schedule-run.png" lightbox="media/create-first-pipeline-with-sample-data/schedule-run.png" alt-text="Screenshot showing the schedule dialog for the pipeline with a 15-minute recurring schedule.":::

## Related content

This sample shows you how to load sample data into a Data Warehouse using Data Factory in Microsoft Fabric.  You learned how to:

> [!div class="checklist"]
> - Create a pipeline.
> - Copy data using your pipeline.
> - Run and schedule your pipeline.

Next, advance to learn more about monitoring your pipeline runs.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
