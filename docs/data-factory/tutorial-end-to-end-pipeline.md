---
title: Module 1 - Create a pipeline with Data Factory
description: This tutorial module covers creating a pipeline, as part of an end-to-end data integration tutorial to complete a full data integration scenario with Data Factory in Microsoft Fabric within an hour.
ms.author: whhender
ms.reviewer: xupzhou
author: whhender
ms.topic: tutorial
ms.date: 09/25/2025
ms.custom: pipelines, sfi-image-nochange
---

# Module 1: Create a pipeline with Data Factory

This module takes about 10 minutes to complete. You'll ingest raw data from the source store into a table in the [bronze](/azure/databricks/lakehouse/medallion#bronze) data layer of a data Lakehouse using the Copy activity in a pipeline.

The high-level steps in module 1 are:

1. [Create a pipeline.](#create-a-pipeline)
1. [Create Copy Activity in the pipeline to load sample data into a data Lakehouse.](#create-a-copy-activity-in-the-pipeline-to-load-sample-data-to-a-data-lakehouse)
1. [Run and view the results of the the copy activity](#run-and-view-the-results-of-your-copy-activity)

## Prerequisites

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. If you don't have one, you can [create a free account](https://azure.microsoft.com/free/).
- A [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace. [Learn how to create a workspace.](../fundamentals/create-workspaces.md)
- Access to [Power BI](https://app.powerbi.com/).

## Create a pipeline

1. Sign into Power BI.

1. Select the default Power BI icon at the bottom left of the screen, and select **Fabric**.

1. Select a workspace from the **Workspaces** tab, then select **+ New item**, and choose **Pipeline**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-data-pipeline.png" alt-text="Screenshot of the Data Factory start page with the button to create a new pipeline selected.":::

1. Provide a pipeline name. Then select **Create**.

## Create a Copy activity in the pipeline to load sample data to a data Lakehouse

1. Select **Copy data assistant** to open the copy assistant tool.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/open-copy-assistant.png" alt-text="Screenshot showing the selection of the Copy data activity from the new pipeline start page.":::

1. On the **Choose data source** page, select **Sample data** from the options at the top of the dialog, and then select **NYC Taxi - Green**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/select-sample-data-source.png" alt-text="Screenshot showing the selection of the NYC Taxi - Green data in the copy assistant on the Choose data source tab.":::

1. The data source preview appears next on the **Connect to data source** page. Review, and then select **Next**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/preview-data.png" alt-text="Screenshot showing the preview data for the NYC Taxi - Green sample dataset.":::

1. For the **Choose data destination** step of the copy assistant, select **Lakehouse**.

1. Enter a Lakehouse name, then select **Create and connect**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-lakehouse-name.png" alt-text="Screenshot showing the data destination configuration page of the Copy assistant, choosing the Create new Lakehouse option and providing a Lakehouse name.":::

1. Select **Connect**.

1. Select **Tables** for the **Root folder** and **Load to new table** for **Load settings**. Provide a **Table** name (in our example we've named it Bronze) and select **Next**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/choose-destination-table-details.png" alt-text="Screenshot showing the Connect to data destination tab of the Copy data assistant, on the Select and map to folder path or table step.":::

1. Finally, on the **Review + save** page of the copy data assistant, review the configuration. For this tutorial, uncheck the **Start data transfer immediately** checkbox, since we run the activity manually in the next step. Then select **OK**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/review-save-copy-configuration.png" alt-text="Screenshot showing the Copy data assistant on the Review + save page.":::

## Run and view the results of your Copy activity

1. Select the **Run** tab in the pipeline editor. Then select the **Run** button, and then **Save and run**, to run the Copy activity.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-button.png" alt-text="Screenshot showing the pipeline Run tab with the Run button highlighted.":::

   :::image type="content" source="media/tutorial-end-to-end-pipeline/save-and-run.png" alt-text="Screenshot showing the Save and run dialog with the Save and run button highlighted.":::

1. You can monitor the run and check the results on the **Output** tab below the pipeline canvas. Select name of the pipeline to view the run details.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-details-button.png" alt-text="Screenshot showing the run details button in the pipeline Output tab.":::

1. Expand the **Duration breakdown** section to see the duration of each stage of the Copy activity. After reviewing the copy details, select **Close**.

## Next step

Continue to the next section to create your dataflow.

> [!div class="nextstepaction"]
> [Module 2: Transform data with a dataflow in Data Factory](tutorial-end-to-end-dataflow.md)
