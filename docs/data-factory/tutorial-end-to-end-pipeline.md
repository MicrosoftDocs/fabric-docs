---
title: Module 1 - Ingest Data with a Copy Job in Data Factory
description: In this tutorial, you create a standalone Copy job to ingest raw data as part of an end-to-end guide to complete a full data integration scenario within an hour using Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.date: 04/13/2026
ms.topic: tutorial
ms.custom:
  - pipelines, sfi-image-nochange
---

# Module 1: Ingest data with a Copy job

This module takes about 10 minutes to complete. You'll create a standalone Copy job to ingest raw data from the source store into a table in the [bronze](/azure/databricks/lakehouse/medallion#bronze) data layer of a data Lakehouse.

The high-level steps in module 1 are:

1. [Create a Copy job.](#create-a-copy-job)
1. [Configure the Copy job to load sample data into a data Lakehouse.](#configure-the-copy-job-to-load-sample-data-to-a-data-lakehouse)
1. [Run and view the results of the Copy job.](#run-and-view-the-results-of-your-copy-job)

## Prerequisites

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. If you don't have one, you can [try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial).
- A [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace. [Learn how to create a workspace.](../fundamentals/create-workspaces.md)
- Access to [Power BI](https://msit.powerbi.com/home).

## Create a Copy job

1. Sign into [Power BI](https://msit.powerbi.com/home).

1. Select the default Power BI icon at the bottom left of the screen, and select **Fabric**.

1. Select a workspace from the **Workspaces** tab or select **My workspace**, then select **+ New item**, then search for and choose **Copy job**.

   <!-- TODO: Replace screenshot with standalone Copy job creation flow -->
   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-data-pipeline.png" alt-text="Screenshot of the Data Factory start page with the button to create a new Copy job selected." lightbox="media/tutorial-end-to-end-pipeline/new-data-pipeline.png":::

1. Provide a name for your Copy job. Then select **Create**.

## Configure the Copy job to load sample data to a data Lakehouse

<!-- TODO: Update these steps for the standalone Copy job UI flow. The steps below are from the pipeline-based copy data assistant and need to be verified/updated for the standalone experience. Screenshots will also need to be replaced. -->

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

<!-- TODO: Remove or update the following pipeline-specific steps. In the standalone Copy job flow, there's no pipeline canvas or Settings tab to configure. Verify correct steps for standalone Copy job and replace this section. -->

## Run and view the results of your Copy job

1. Select **Run** to run the Copy job and copy the data.

   > [!NOTE]  
   > This copy can take over 30 minutes to complete.

   <!-- TODO: Replace screenshot with standalone Copy job run experience -->
   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-pipeline.png" alt-text="Screenshot of the Copy job editor with the Run button highlighted." lightbox="media/tutorial-end-to-end-pipeline/run-pipeline.png":::

1. You can monitor the run and check the results on the **Output** tab below the canvas. Select the name of the Copy job to view the run details.

   <!-- TODO: Replace screenshot with standalone Copy job output view -->
   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-details-button.png" alt-text="Screenshot showing the run details button in the Copy job Output tab." lightbox="media/tutorial-end-to-end-pipeline/run-details-button.png":::

## Next step

> [!div class="nextstepaction"]
> [Module 2: Transform data with a dataflow in Data Factory](tutorial-end-to-end-dataflow.md)
