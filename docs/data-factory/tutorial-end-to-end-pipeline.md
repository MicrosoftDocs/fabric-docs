---
title: Module 1 - Create a pipeline with Data Factory
description: In this tutorial, you create a pipeline to copy data as part of an end-to-end guide to complete a full data integration scenario within an hour using Data Factory in Microsoft Fabric.
ms.author: whhender
ms.reviewer: xupzhou
author: whhender
ms.topic: tutorial
ms.date: 11/18/2025
ms.custom: pipelines, sfi-image-nochange
---

# Module 1: Create a pipeline with Data Factory

This module takes about 10 minutes to complete. You'll ingest raw data from the source store into a table in the [bronze](/azure/databricks/lakehouse/medallion#bronze) data layer of a data Lakehouse using the Copy activity in a pipeline.

The high-level steps in module 1 are:

1. [Create a pipeline.](#create-a-pipeline)
1. [Create Copy Activity in the pipeline to load sample data into a data Lakehouse.](#create-a-copy-activity-in-the-pipeline-to-load-sample-data-to-a-data-lakehouse)
1. [Run and view the results of the the copy activity](#run-and-view-the-results-of-your-copy-activity)

## Prerequisites

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. If you don't have one, you can [try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial).
- A [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace. [Learn how to create a workspace.](../fundamentals/create-workspaces.md)
- Access to [Power BI](https://msit.powerbi.com/home).

## Create a pipeline

1. Sign into [Power BI](https://msit.powerbi.com/home).

1. Select the default Power BI icon at the bottom left of the screen, and select **Fabric**.

1. Select a workspace from the **Workspaces** tab or select **My workspace**, then select **+ New item**, then search for and choose **Pipeline**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-data-pipeline.png" alt-text="Screenshot of the Data Factory start page with the button to create a new pipeline selected." lightbox="media/tutorial-end-to-end-pipeline/new-data-pipeline.png":::

1. Provide a pipeline name. Then select **Create**.

## Create a Copy activity in the pipeline to load sample data to a data Lakehouse

1. Select **Copy data assistant** to open the copy assistant tool.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/open-copy-assistant.png" alt-text="Screenshot showing the selection of the Copy data activity from the new pipeline start page." lightbox="media/tutorial-end-to-end-pipeline/open-copy-assistant.png":::

1. On the **Choose data source** page, select **Sample data** from the options at the top of the dialog, and then select **NYC Taxi - Green**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/select-sample-data-source.png" alt-text="Screenshot showing the selection of the NYC Taxi - Green data in the copy assistant on the Choose data source tab." lightbox="media/tutorial-end-to-end-pipeline/select-sample-data-source.png":::

1. The data source preview appears next on the **Connect to data source** page. Review, and then select **Next**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/preview-data.png" alt-text="Screenshot showing the preview data for the NYC Taxi - Green sample dataset." lightbox="media/tutorial-end-to-end-pipeline/preview-data.png":::

1. For the **Choose data destination** step of the copy assistant, select **Lakehouse**.

1. Enter a Lakehouse name, then select **Create and connect**.

1. Select **Connect**.

1. Select **Full copy** for the copy job mode.

1. When mapping to destination, select **Tables**, select **Append** as the update method, and edit the table mapping so the destination table is named `Bronze`. Then select **Next**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/choose-destination-table-details.png" alt-text="Screenshot showing the Connect to data destination tab of the Copy data assistant, on the Select and map to folder path or table step." lightbox="media/tutorial-end-to-end-pipeline/choose-destination-table-details.png":::

1. On the **Review + save** page of the copy data assistant, review the configuration and then select **Save**.

1. Select the copy job activity on the pipeline canvas, then select the **Settings** tab below the canvas.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/select-settings.png" alt-text="Screenshot of the pipeline canvas with the copy job activity highlighted and the settings tab highlighted." lightbox="media/tutorial-end-to-end-pipeline/select-settings.png":::

1. Select the **Connection** drop-down and select **Browse all**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/browse-all.png" alt-text="Screenshot of the copy job activity settings list, with browse all highlighted." lightbox="media/tutorial-end-to-end-pipeline/browse-all.png":::

1. Select **Copy job** under **New sources**.

1. On the **Connect data source** page, select **Sign in** to authenticate the connection.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/select-sign-in.png" alt-text="Screenshot of the get data connection credentials page, with the Sign in Option highlighted." lightbox="media/tutorial-end-to-end-pipeline/select-sign-in.png":::

1. Follow the prompts to sign in to your organizational account.

1. Select **Connect** to complete the connection setup.

1. At the top of the pipeline editor, select **Save** to save the pipeline.

## Run and view the results of your Copy activity

1. At the top of the pipeline editor, select **Run** to run the pipeline and copy the data.

   >[!NOTE]
   >This copy can take over 30 minutes to complete.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-pipeline.png" alt-text="Screenshot of the pipeline editor with the Run button highlighted." lightbox="media/tutorial-end-to-end-pipeline/run-pipeline.png":::

1. You can monitor the run and check the results on the **Output** tab below the pipeline canvas. Select name of the pipeline to view the run details.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-details-button.png" alt-text="Screenshot showing the run details button in the pipeline Output tab." lightbox="media/tutorial-end-to-end-pipeline/run-details-button.png":::

## Next step

Once the copy has completed, it can take around half an hour, continue to the next section to create your dataflow.

> [!div class="nextstepaction"]
> [Module 2: Transform data with a dataflow in Data Factory](tutorial-end-to-end-dataflow.md)
