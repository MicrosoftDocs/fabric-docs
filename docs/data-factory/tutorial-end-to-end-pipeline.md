---
title: Module 1 - Create a pipeline with Data Factory
description: This module covers creating a data pipeline, as part of an end-to-end data integration tutorial to complete a full data integration scenario with Data Factory in Microsoft Fabric within an hour.
ms.author: whhender
ms.reviewer: xupzhou
author: whhender
ms.topic: tutorial
ms.date: 02/25/2025
---

# Module 1: Create a pipeline with Data Factory

This module takes 10 minutes, ingesting raw data from the source store into a [bronze](/azure/databricks/lakehouse/medallion#bronze) data table in a data Lakehouse using the Copy activity in a pipeline.

The high-level steps in module 1 are as follows:

1. [Create a data pipeline.](#create-a-data-pipeline)
1. [Use a Copy Activity in the pipeline to load sample data into a data Lakehouse.](#use-a-copy-activity-in-the-pipeline-to-load-sample-data-to-a-data-lakehouse)

## Create a data pipeline

1. A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription is required. [Create a free account](https://azure.microsoft.com/free/).
1. Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../fundamentals/create-workspaces.md).
1. Sign into [Power BI](https://app.powerbi.com/).

1. Select the default Power BI icon at the bottom left of the screen, and select **Fabric**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/switch-data-factory.png" alt-text="Screenshot showing the selection of the Data Factory experience.":::

1. Select a workspace from the **Workspaces** tab, then select **+ New item**, and choose **Data pipeline**. Provide a pipeline name. Then select **Create**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-data-pipeline.png" alt-text="Screenshot of the Data Factory start page with the button to create a new data pipeline selected.":::

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-pipeline-name.png" alt-text="Screenshot showing the dialog to give the new pipeline a name.":::

## Use a Copy activity in the pipeline to load sample data to a data Lakehouse

### Step 1: Use the copy assistant to configure a copy activity.

Select **Copy data assistant** to open the copy assistant tool.

:::image type="content" source="media/tutorial-end-to-end-pipeline/open-copy-assistant.png" alt-text="Screenshot showing the selection of the Copy data activity from the new pipeline start page.":::

### Step 2: Configure your settings in the copy assistant.

1. The **Copy data** dialog is displayed with the first step, **Choose data source**, highlighted. Select **Sample data** from the options at the top of the dialog, and then select **NYC Taxi - Green**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/select-sample-data-source.png" alt-text="Screenshot showing the selection of the NYC Taxi - Green data in the copy assistant on the Choose data source tab.":::

1. The data source preview appears next on the **Connect to data source** page. Review, and then select **Next**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/preview-data.png" alt-text="Screenshot showing the preview data for the NYC Taxi - Green sample dataset.":::

1. For the **Choose data destination** step of the copy assistant, select **Lakehouse**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/choose-lakehouse-destination.png" alt-text="Screenshot showing the selection of the Lakehouse destination on the Choose data destination tab of the Copy data assistant.":::

1. Enter a Lakehouse name, then select **Create and connect**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-lakehouse-name.png" alt-text="Screenshot showing the data destination configuration page of the Copy assistant, choosing the Create new Lakehouse option and providing a Lakehouse name.":::

1. Now configure the details of your Lakehouse destination on the **Select and map to folder path or table.** page. Select **Tables** for the **Root folder** and **Load to new table** for **Load settings**. Provide a **Table** name and select **Next**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/choose-destination-table-details.png" alt-text="Screenshot showing the Connect to data destination tab of the Copy data assistant, on the Select and map to folder path or table step.":::

1. Finally, on the **Review + save** page of the copy data assistant, review the configuration. For this tutorial, uncheck the **Start data transfer immediately** checkbox, since we run the activity manually in the next step. Then select **OK**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/review-save-copy-configuration.png" alt-text="Screenshot showing the Copy data assistant on the Review + save page.":::

### Step 3: Run and view the results of your Copy activity.

1. Select the **Run** tab in the pipeline editor. Then select the **Run** button, and then **Save and run** at the prompt, to run the Copy activity.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-button.png" alt-text="Screenshot showing the pipeline Run tab with the Run button highlighted.":::

   :::image type="content" source="media/tutorial-end-to-end-pipeline/save-and-run.png" alt-text="Screenshot showing the Save and run dialog with the Save and run button highlighted.":::

1. You can monitor the run and check the results on the **Output** tab below the pipeline canvas. Select name of the pipeline to view the run details.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-details-button.png" alt-text="Screenshot showing the run details button in the pipeline Output tab.":::

1. The run details show 1,508,501 rows read and written.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-details.png" alt-text="Screenshot of the Copy data details for the pipeline run.":::

1. Expand the **Duration breakdown** section to see the duration of each stage of the Copy activity. After reviewing the copy details, select **Close**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/copy-duration-breakdown.png" alt-text="Screenshot showing the duration breakdown of the Copy activity run.":::

## Related content

In this first module to our end-to-end tutorial for your first data integration using Data Factory in Microsoft Fabric, you learned how to:

> [!div class="checklist"]
> - Create a data pipeline.
> - Add a Copy activity to your pipeline.
> - Use sample data and create a data Lakehouse to store the data to a new table.
> - Run the pipeline and view its details and duration breakdown.

Continue to the next section now to create your dataflow.

> [!div class="nextstepaction"]
> [Module 2: Transform data with a dataflow in Data Factory](tutorial-end-to-end-dataflow.md)
