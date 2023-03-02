---
title: Create your first data pipeline to copy data
description: Learn how to build and schedule a new data pipeline to copy sample data to a Lakehouse.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.subservice: data-factory
ms.topic: quickstart
ms.date: 03/02/2023
---

# Quickstart: Create your first pipeline to copy data (Preview)

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this tutorial, you'll build a data pipeline to move a Sample dataset to the Lakehouse. This experience will show you a quick demo about how to use pipeline copy activity and how to load data into Lakehouse.

## Prerequisites

Make sure you have a Project [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace](placeholder.md) that isn’t the default My Workspace.

## Create a data pipeline

1. Switch to **Data factory** on the [app.powerbi.com](https://app.powerbi.com) page.

   :::image type="content" source="media/pipeline-copy-from-azure-blob-storage-to-lakehouse/switch-data-factory.png" alt-text="Screenshot of menu in which Data factory option appears.":::

1. Create a new workspace or choose another workspace besides **My workspace** for this demo.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/create-workspace.png" alt-text="Screenshot showing the Create workspace button on the data factory page in Fabric.":::

   :::image type="content" source="media/create-first-pipeline-with-sample-data/create-workspace-page.png" alt-text="Screenshot showing the create workspace dialog.":::

1. Select **New** and then **Data pipeline**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/new-data-pipeline.png" alt-text="Screenshot showing the new data pipeline button in the newly created workspace.":::

## Copy data using pipeline

In this session, you will start to build your first pipeline by following below steps about copying form a sample dataset provided by pipeline into Lakehouse.

### Step 1: Start with the Copy assistant

1. Select **Copy data** on the canvas to open the **Copy assistant** tool to get started. Or select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/copy-data-button.png" alt-text="Screenshot showing the Copy data button.":::

   :::image type="content" source="media/create-first-pipeline-with-sample-data/copy-data-assistant-button.png" alt-text="Screenshot showing the Copy data assistant button.":::

### Step 2: Configure your source

1. Choose the **Sample data NYC Taxi - Green**, and then select **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/sample-data.png" alt-text="Screenshot showing the Choose data source page of the Copy data assistant with the NYC Taxi - Green sample data selected.":::

1. On the **Connect to data source** page of the assistant, the preview data for the **NYC Taxi - Green** is displayed.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/sample-data-preview.png" alt-text="Screenshot showing the sample data for the NYC Taxi - Green sample data.":::

### Step 3: Configure your destination

1. Select **Lakehouse** and then **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/lakehouse-destination.png" alt-text="Screenshot showing the selection of the Lakehouse destination in the Copy data assistant.":::

1. Select **Create new Lakehouse**, and enter a **Lakehouse name**, then select **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/create-new-lakehouse.png" alt-text="Screenshot showing the Create new Lakehouse button selected on the Choose data destination page of the Copy data assistant.":::

1. Configure and map your source data to the destination Lakehouse tables.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/configure-lakehouse-tables.png" alt-text="Screenshot showing the Connect to data destination page of the Copy data assistant with Tables selected and a table name for the sample data provided.":::

### Step 4: Review and create your copy activity

1. Review your copy activity settings in the previous steps and select OK to finish. Or you can revisit the previous steps in the tool to edit your settings, if needed.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/review-create-activity.png" alt-text="Screenshot of the Review + create page of the Copy data assistant highlighting source and destination.":::

1. The Copy activity will then be added to your new data pipeline canvas. All settings including advanced settings for the activity are available in the tabs below the pipeline canvas when the activity is selected.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/completed-activity.png" alt-text="Screenshot showing the completed Copy activity with the Copy activity settings tabs highlighted.":::

## Run and schedule your data pipeline

1. Switch to the **Home** tab and select **Run**. Then select **Save and run** to start the activity.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/save-and-run.png" alt-text="Screenshot showing the Run button on the Home tab, and the Save and run prompt displayed.":::

1. You can monitor the running process and check the results on the **Output** tab below the pipeline canvas.  Select the run details button (with the glasses icon highlighted below) to view the run details.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/run-details-button.png" alt-text="":::

1. The run details show how much data was read and written and various other details about the run.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/run-details.png" alt-text="Screenshot showing the run details window.":::

1. You can also schedule the pipeline to run with a specific frequency as required. Below is an example scheduling the pipeline to run every 15 minutes.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/schedule-run.png" lightbox="media/create-first-pipeline-with-sample-data/schedule-run.png" alt-text="Screenshot showing the schedule dialog for the pipeline with a 15m recurring schedule.":::

## Next steps

[How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
