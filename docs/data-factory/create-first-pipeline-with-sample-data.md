---
title: Create your first data pipeline to copy data
description: Learn how to build and schedule a new data pipeline to copy sample data to a Lakehouse.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: quickstart
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Pipeline Tutorials
---

# Quickstart: Create your first pipeline to copy data

In this quickstart, you build a data pipeline to move a Sample dataset to the Lakehouse. This experience shows you a quick demo about how to use pipeline copy activity and how to load data into Lakehouse.

## Prerequisites

To get started, you must complete the following prerequisites:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create a free account](https://azure.microsoft.com/free/).
- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../get-started/create-workspaces.md).

## Create a data pipeline

1. Navigate to [Power BI](https://app.powerbi.com/).
1. Select the Power BI icon in the bottom left of the screen, then select **Data factory** to open homepage of Data Factory.

   :::image type="content" source="media/create-first-dataflow-gen2/select-data-factory.png" alt-text="Screenshot with the data factory experience emphasized.":::

1. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace. If you created a new workspace in the prior Prerequisites section, use this one.

   :::image type="content" source="media/create-first-dataflow-gen2/navigate-to-workspace.png" alt-text="Screenshot of the workspaces window where you navigate to your workspace.":::

1. Select **Data pipeline** and then input a pipeline name to create a new pipeline.

   :::image type="content" source="media/create-first-pipeline/select-pipeline.png" alt-text="Screenshot showing the new data pipeline button in the newly created workspace.":::
  :::image type="content" source="media/create-first-pipeline/new-pipeline.png" alt-text="Screenshot showing the name of creating a new pipeline.":::

## Copy data using pipeline

In this session, you start to build your first pipeline by following below steps about copying from a sample dataset provided by pipeline into Lakehouse.

### Step 1: Start with the Copy assistant

1. After selecting **Copy data** on the canvas,  the **Copy assistant** tool will be opened to get started.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/copy-data-button.png" alt-text="Screenshot showing the Copy data button.":::

### Step 2: Configure your source

1. Choose the **Public Holidays** sample data, and then select **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/sample-data.png" alt-text="Screenshot showing the Choose data source page of the Copy data assistant with the Public Holidays sample data selected.":::

1. On the **Connect to data source** page of the assistant, the preview for the **Public Holidays** sample data is displayed, and then click **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/sample-data-preview.png" alt-text="Screenshot showing the sample data for the Public Holidays sample data.":::

### Step 3: Configure your destination

1. Select **Lakehouse** and then **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/lakehouse-destination.png" alt-text="Screenshot showing the selection of the Lakehouse destination in the Copy data assistant.":::

1. Select **Create new Lakehouse**, and enter a **Lakehouse name**, then select **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/create-new-lakehouse.png" alt-text="Screenshot showing the Create new Lakehouse button selected on the Choose data destination page of the Copy data assistant.":::

1. Configure and map your source data to the destination Lakehouse table. Select **tables** and provide a **Table name** under **Root folder**, then choose the **Overwrite** option for **Table action**, and select **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/configure-lakehouse-tables.png" alt-text="Screenshot showing the Connect to data destination page of the Copy data assistant with Tables selected and a table name for the sample data provided.":::

### Step 4: Review and create your copy activity

1. Review your copy activity settings in the previous steps and select OK to finish. Or you can revisit the previous steps in the tool to edit your settings, if needed.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/review-create-activity.png" alt-text="Screenshot of the Review + create page of the Copy data assistant highlighting source and destination.":::

1. The Copy activity is added to your new data pipeline canvas. All settings including advanced settings for the activity are available in the tabs below the pipeline canvas when the created **Copy data** activity is selected.

   :::image type="content" source="media/create-first-pipeline/complete-copy-activity.png" alt-text="Screenshot showing the completed Copy activity with the Copy activity settings tabs highlighted.":::

## Run and schedule your data pipeline

1. Switch to the **Home** tab and select **Run**. A confirmation dialog is displayed. Then select **Save and run** to start the activity.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/save-and-run.png" alt-text="Screenshot showing the Run button on the Home tab, and the Save and run prompt displayed.":::

1. You can monitor the running process and check the results on the **Output** tab below the pipeline canvas.  Select the run details button (with the glasses icon highlighted) to view the run details.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/run-details-button.png" alt-text="Screenshot showing the Output tab of the pipeline run in-progress with the Details button highlighted in the run status.":::

1. The run details show how much data was read and written and various other details about the run.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/run-details.png" alt-text="Screenshot showing the run details window.":::

1. You can also schedule the pipeline to run with a specific frequency as required. Below is an example scheduling the pipeline to run every 15 minutes.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/schedule-run.png" lightbox="media/create-first-pipeline-with-sample-data/schedule-run.png" alt-text="Screenshot showing the schedule dialog for the pipeline with a 15-minute recurring schedule.":::

## Related content
The pipeline in this sample shows you how to copy sample data to Lakehouse.  You learned how to:

> [!div class="checklist"]
> - Create a data pipeline.
> - Copy data with the Copy Assistant.
> - Run and schedule your data pipeline.

Next, advance to learn more about monitoring your pipeline runs.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
