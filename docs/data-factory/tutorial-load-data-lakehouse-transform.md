---
title: Copy sample data into Lakehouse and transform with dataflow
description: This tutorial shows you how to first load data into a Lakehouse with a pipeline and then transform it using a dataflow with Data Factory in Microsoft Fabric.
ms.reviewer: whhender
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: tutorial
ms.custom:
ms.date: 02/25/2025
---

# Copy sample data into Lakehouse and transform with a dataflow with Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

In this tutorial, we provide end-to-end steps to a common scenario that uses the pipeline to load source data into Lakehouse at high performance copy and then transform the data by dataflow to make users can easily load and transform data.

## Prerequisites

A Microsoft Fabric enabled workspace. If you don't already have one, refer to the article [Create a workspace](../fundamentals/create-workspaces.md).

## Create a data pipeline 

1. Switch to the **Data Factory** experience.

1. Select **New** and then **Data pipeline**, and then input a name for your pipeline.

   :::image type="content" source="media/create-first-pipeline/select-pipeline.png" alt-text="Screenshot showing the new Data pipeline button.":::

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/pipeline-name.png" alt-text="Screenshot showing the pipeline name dialog.":::

## Use a pipeline to load sample data into Lakehouse

Use the following steps to load sample data into Lakehouse.

### Step 1: Start with the Copy assistant

Select **Copy data assistant** on the canvas to open the **copy assistant** tool to get started. Or Select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

:::image type="content" source="media/tutorial-load-data-lakehouse-transform/copy-data.png" alt-text="Screenshot showing the Copy data button on a new pipeline.":::

### Step 2: Configure your source

1. Choose the **Public Holidays** from the **Sample data** options for your data source, and then select **Next**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/public-holidays-data.png" alt-text="Screenshot showing the Public Holidays sample data selection in the Copy data assistant.":::

1. In the **Connect to data source** section of the **Copy data** assistant, a preview of the sample data is displayed. Select **Next** to move on to the data destination.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/preview-data.png" alt-text="Screenshot showing a preview of the Public Holiday sample data.":::

### Step 3: Configure your destination

1. Select **Lakehouse**.

   :::image type="content" source="media/create-first-pipeline-with-sample-data/lakehouse-destination.png" alt-text="Screenshot showing the selection of the Lakehouse destination.":::

1. Enter **LHDemo** for the Lakehouse name, then select **Create and connect**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/create-new-lakehouse.png" alt-text="Screenshot showing the specified name for the new Lakehouse.":::

1. Configure and map your source data to the destination Lakehouse table. Select **Tables** for the **Root folder** and **Load to new table** for **Load settings**. Provide a **Table** name and select **Next**.

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

## Use a Dataflow Gen2 to transform data in the Lakehouse

You now have a Lakehouse with sample data loaded.  Next, you'll use a dataflow to transform the data. Dataflows are a code-free way to transform data at scale.

1. Select your workspace, then select **New item** > **Dataflow Gen2**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/new-dataflow.png" alt-text="Screenshot showing the new Dataflow button." lightbox="media/tutorial-load-data-lakehouse-transform/new-dataflow.png":::

1. Select the get data dropdown and select **More...**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/get-data.png" alt-text="Screenshot showing the get data dropdown.":::

1. Search for **Lakehouse** and select **Lakehouse**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/lakehouse-connector.png" alt-text="Screenshot showing the Lakehouse in Microsoft Fabric option.":::

1. Sign-in and select **Next** to continue.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/connect-lakehouse.png" alt-text="Screenshot showing the sign-in dialog.":::

1. Select the table you created in the previous step and select **Create**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/select-lakehouse-table.png" alt-text="Screenshot showing the selection of the table created in the previous step.":::

1. Review the data preview in the editor.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/review-data-in-dataflow.png" lightbox="media/tutorial-load-data-lakehouse-transform/review-data-in-dataflow.png" alt-text="Screenshot showing the data preview in the dataflow editor.":::

1. Apply a filter to the dataflow to only include rows where the **Countryorregion** column is equal to **Belgium**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/belgium-filter.png" alt-text="Screenshot showing the filter applied to the dataflow.":::

1. Add a data destination to the query by selecting **Add data destination** and then **Lakehouse in Microsoft Fabric**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/output-destination-lakehouse.png" alt-text="Screenshot showing the add data destination button.":::

1. Sign-in and select **Next** to continue.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/connect-lakehouse.png" alt-text="Screenshot showing the sign-in dialog.":::

1. Create a new table called **BelgiumPublicHolidays** and select **Next**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/lakehouse-belgiumtable.png" alt-text="Screenshot showing the create new table dialog.":::

1. Review the settings and select **Save settings**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/output-destinations-save-settings.png" lightbox="media/tutorial-load-data-lakehouse-transform/output-destinations-save-settings.png" alt-text="Screenshot showing the review settings dialog.":::

1. Publish the dataflow by selecting **Publish**.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/publish-dataflow.png" alt-text="Screenshot showing the publish button.":::

1. After the dataflow is published, select **Refresh now** to run the dataflow.

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/refresh-now.png" alt-text="Screenshot showing the refresh now button.":::

After the refresh is complete, you can view the data in the Lakehouse table. You can also use this data now to create reports, dashboards, and more.

## Related content

This sample shows you how to copy sample data to Lakehouse and transform the data with a dataflow using Data Factory in Microsoft Fabric.  You learned how to:

> [!div class="checklist"]
> - Create a data pipeline.
> - Use the pipeline to load sample data into Lakehouse.
> - Use dataflow to transform data in the Lakehouse.

Next, advance to learn more about monitoring your pipeline runs.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
