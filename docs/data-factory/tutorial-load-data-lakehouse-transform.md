---
title: Copy sample data into Lakehouse and transform with dataflow
description: This tutorial shows you how to first load data into a Lakehouse with a pipeline and then transform it using a dataflow with Data Factory in Microsoft Fabric.
ms.reviewer: jburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: conceptual 
ms.date: 05/23/2023
---

# Copy sample data into Lakehouse and transform with a dataflow with Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

In this tutorial, we provide end-to-end steps to a common scenario that uses the pipeline to load source data into Lakehouse at high performance copy and then transform the data by dataflow to make users can easily load and transform data.

## Create a data pipeline

1. Sign in to [Power BI](https://app.powerbi.com) using your admin account credentials.
1. Choose your existing workspace with premium capacity enabled or create a new workspace enabling Premium capacity.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/create-premium-capacity-workspace.png" alt-text="Screenshot showing the Create a workspace dialog with a premium capacity selection highlighted.":::

1. Switch to the **Data Factory** workload.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/switch-to-data-factory-workload.png" alt-text="Screenshot showing the selection of the Data Factory workload.":::

1. Select **New** and select **Data pipeline**, then input a name for your pipeline.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/new-data-pipeline.png" alt-text="Screenshot showing the new Data pipeline button.":::

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/pipeline-name.png" alt-text="Screenshot showing the pipeline name dialog.":::

## Use a pipeline to load sample data into Lakehouse

Use the following steps to load sample data into Lakehouse.

### Step 1: Start with the Copy assistant

Select **Copy Data** on the canvas, to open the **Copy assistant** tool to get started.

:::image type="content" source="media/tutorial-load-data-lakehouse-transform/copy-data.png" alt-text="Screenshot showing the Copy data button on a new pipeline.":::

### Step 2: Configure your source

1. Choose the **Public Holidays** from the **Sample data** options for your data source, and then select **Next**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/public-holidays-data.png" alt-text="Screenshot showing the Public Holidays sample data selection in the Copy data assistant.":::

1. In the **Connect to data source** section of the **Copy data** assistant, a preview of the sample data is displayed. Select **Next** to move on to the data destination.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/preview-data.png" alt-text="Screenshot showing a preview of the Public Holiday sample data.":::

### Step 3: Configure your destination

1. Select the **Workspace** tab and choose **Lakehouse**.  Then select **Next**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/lakehouse-destination.png" alt-text="Screenshot showing the selection of the Lakehouse destination.":::

1. Select **Create new Lakehouse** and enter **LHDemo** for the name, then select **Next**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/create-new-lakehouse.png" alt-text="Screenshot showing the Create new lakehouse option with the name LHDemo specified for the new Lakehouse.":::

1. Configure and map your source data to the destination Lakehouse table by entering **Table name**, then select **Next** one more time.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/specify-table-name.png" alt-text="Screenshot showing the table name to create in the Lakehouse destination.":::

### Step 4: Review and create your copy activity

1. Review your copy activity settings in the previous steps and select **Start data transfer immediately**.  Then select **Save + Run** to run the new pipeline.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/review-settings.png" alt-text="Screenshot showing the Review + save window of the copy data assistant with the Start data transfer immediately checkbox checked.":::

1. Once finished, the copy activity is added to your new data pipeline canvas, and the pipeline automatically runs to load data into Lakehouse.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/pipeline-runs-after-creation.png" alt-text="Screenshot showing the created pipeline with Copy activity and the current run in progress.":::

1. You can monitor the running process and check the results on the **Output** tab below the pipeline canvas. Hover over the name in the output row to see the **Run details** button (an icon of a pair of glasses, highlighted) to view the run details.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/run-details-button.png" alt-text="Screenshot showing the run details button on the pipeline Output tab.":::

1. The run details show 69,557 rows were read and written, and various other details about the run, including a breakdown of the duration.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/run-details.png" alt-text="Screenshot showing the run details for the successful pipeline run.":::

## Next steps

[Monitor pipeline runs](monitor-pipeline-runs.md)