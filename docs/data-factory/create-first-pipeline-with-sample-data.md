---
title: Create your first pipeline to copy data
description: Learn how to build and schedule a new pipeline to copy sample data to a Lakehouse.
ms.reviewer: xupzhou
ms.topic: quickstart
ms.custom: pipelines, sfi-image-nochange
ms.date: 06/23/2025
ms.search.form: Pipeline Tutorials
ai-usage: ai-assisted
---

# Quickstart: Create your first pipeline to copy data

In this quickstart, you'll build a pipeline that moves a sample dataset into a Lakehouse. It's a simple way to see how pipeline copy activities work and how to load data into a Lakehouse.

>[!TIP]
>You can also use a [Copy job](quickstart-copy-job.md) to move data from one place to another. Check out [this decision guide](../fundamentals/decision-guide-pipeline-dataflow-spark.md) to help you pick the right tool.

## Prerequisites

Before you begin, make sure you have the following setup:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../fundamentals/create-workspaces.md).

## Create a pipeline

1. Go to [Power BI](https://app.powerbi.com/).
1. Select the Power BI icon in the lower left, then choose **Fabric** to open the Microsoft Fabric homepage.

1. Go to your [!INCLUDE [product-name](../includes/product-name.md)] workspace. If you made a new workspace as a prerequisite, use that one.

1. Select **New item**, search for, and pick **Pipeline**, and enter a name for your pipeline.

   :::image type="content" source="media/create-first-pipeline/select-pipeline.png" alt-text="Screenshot showing the new pipeline button in the newly created workspace.":::
   :::image type="content" source="media/create-first-pipeline/new-pipeline.png" alt-text="Screenshot showing the name of creating a new pipeline.":::

## Copy data with your pipeline

1. In your pipeline, select **Copy data assistant**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/copy-data-button.png" alt-text="Screenshot showing the Copy data button.":::


1. Choose the **Sample data** tab at the top of the data source browser page, then select the **Public Holidays** sample data, and then **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/sample-data.png" alt-text="Screenshot showing the Choose data source page of the Copy data assistant with the Public Holidays sample data selected.":::

1. On the **Connect to data source** page of the assistant, the preview for the **Public Holidays** sample data is displayed, and then select **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/sample-data-preview.png" alt-text="Screenshot showing the sample data for the Public Holidays sample data.":::

1. To configure your destination, select **Lakehouse**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/lakehouse-destination.png" alt-text="Screenshot showing the selection of the Lakehouse destination in the Copy data assistant.":::

1. Enter a Lakehouse name, then select **Create and connect**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/create-new-lakehouse.png" alt-text="Screenshot showing the specified name for the new Lakehouse.":::

1. Configure and map your source data to the destination Lakehouse table. Select **Tables** for the **Root folder** and **Load to new table** for **Load settings**. Provide a **Table** name and select **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/configure-lakehouse-tables.png" lightbox="media/create-first-pipeline-with-sample-data/configure-lakehouse-tables.png" alt-text="Screenshot showing the Connect to data destination page of the Copy data assistant with Tables selected and a table name for the sample data provided.":::

1. Review your copy activity settings, then select **Save + run** to finish. You can go back and change any settings if you need to. If you just want to save your pipeline without running it right away, clear the **Start data transfer immediately** checkbox.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/review-create-activity.png" alt-text="Screenshot of the Review + create page of the Copy data assistant highlighting source and destination.":::

1. The Copy activity now appears in your pipeline. When you select the **Copy data** activity, you'll see all its settings—including advanced options—in the tabs below the canvas.

   :::image type="content" source="media/create-first-pipeline/complete-copy-activity.png" alt-text="Screenshot showing the completed Copy activity with the Copy activity settings tabs highlighted.":::

## Run and schedule your pipeline

1. If you didn't choose to **Save + run** on the **Review + save** page of the **Copy data assistant**, switch to the **Home** tab and select **Run**. A confirmation dialog is displayed. Then select **Save and run** to start the activity.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/save-and-run.png" lightbox="media/create-first-pipeline-with-sample-data/save-and-run.png" alt-text="Screenshot showing the Run button on the Home tab, and the Save and run prompt displayed.":::

1. You can watch your pipeline run and see the results on the **Output** tab below the canvas. To check the details, select the activity name in the output list.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/run-details-button.png" lightbox="media/create-first-pipeline-with-sample-data/run-details-button.png" alt-text="Screenshot showing the Output tab of the pipeline run in-progress with the Details button highlighted in the run status.":::

1. The run details page shows how much data your pipeline read and wrote, along with other helpful info about the run.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/run-details.png" alt-text="Screenshot showing the run details window.":::

1. You can set your pipeline to run on a schedule. For example, select **Schedule** to open the scheduling options, then pick how often you want it to run—for example, every 15 minutes.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/schedule-run.png" lightbox="media/create-first-pipeline-with-sample-data/schedule-run.png" alt-text="Screenshot showing the schedule dialog for the pipeline with a 15-minute recurring schedule.":::

## Related content

This quickstart walked you through copying sample data into a Lakehouse using a pipeline as a simple way to get hands-on with pipelines and see how easy it is to move data.

Next, learn how to monitor your pipeline runs and keep an eye on your data.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
