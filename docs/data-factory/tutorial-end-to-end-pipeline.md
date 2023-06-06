---
title: Module 1 - Create a pipeline with Data Factory
description: This module covers creating a data pipeline, as part of an end-to-end data integration tutorial to complete a full data integration scenario with Data Factory in Microsoft Fabric within an hour.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: tutorial
ms.custom: build-2023
ms.date: 06/06/2023
---

# Module 1: Create a pipeline with Data Factory

This module takes 10 minutes, ingesting raw data from the source store into the Bronze table of a data Lakehouse using the Copy activity in a pipeline.

The high-level steps in module 1 are as follows:

1. Create a data pipeline.
1. Use a Copy Activity in the pipeline to load sample data into a data Lakehouse.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Create a data pipeline

1. Sign into [Power BI](https://app.powerbi.com) and open a workspace with Fabric Capacity enabled.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/choose-premium-capacity-workspace.png" alt-text="Screenshot showing the selection of a Premium capacity workspace to create a new data pipeline.":::


1. Select the default Power BI icon at the bottom left of the screen, and switch to the **Data Factory** experience.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/switch-data-factory.png" alt-text="Screenshot showing the selection of the Data Factory experience.":::

1. Select **Data pipeline** and provide a pipeline name. Then select **Create**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-data-pipeline.png" alt-text="Screenshot of the Data Factory start page with the button to create a new data pipeline selected.":::

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-pipeline-name.png" alt-text="Screenshot showing the dialog to give the new pipeline a name.":::

## Use a Copy activity in the pipeline to load sample data to a data Lakehouse

### Step 1: Use the copy assistant to configure a copy activity.

Select **Copy data** to open the copy assistant tool.

:::image type="content" source="media/tutorial-end-to-end-pipeline/open-copy-assistant.png" alt-text="Screenshot showing the selection of the Copy data activity from the new pipeline start page.":::

### Step 2: Configure your settings in the copy assistant.

1. The **Copy data** dialog is displayed with the first step, **Choose data source**, highlighted.  Select the **NYC Taxi - Green** data from the **Sample data** selections displayed, and then select **Next**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/choose-nyc-taxi-data.png" alt-text="Screenshot showing the selection of the NYC Taxi - Green sample data in the copy assistant on the Choose data source tab.":::

1. The next step, **Connect to data source (Select, preview, and choose the data.)** appears. Review the sample data and select **Next**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/preview-data.png" alt-text="Screenshot showing the Connect to data source step of the copy assistant with the selected sample data displayed in the preview area.":::

1. For the **Choose data destination** step of the copy assistant, select **Lakehouse** and then **Next**.

  :::image type="content" source="media/tutorial-end-to-end-pipeline/choose-lakehouse-destination.png" alt-text="Screenshot showing the selection of the Lakehouse destination on the Choose data destination tab of the Copy data assistant.":::

1. Select **Create new Lakehouse** on the data destination configuration page that appears, and enter a name for the new Lakehouse. Then select **Next** again.

  :::image type="content" source="media/tutorial-end-to-end-pipeline/new-lakehouse-name.png" alt-text="Screenshot showing the data destination configuration page of the Copy assistant, choosing the Create new Lakehouse option and providing a Lakehouse name.":::

1. Now configure the details of your Lakehouse destination on the **Select and map to folder path or table.** page. Select **Tables** for the **Root folder**, provide a table name, and choose the **Overwrite** action. Don't check the **Enable partition** checkbox that appears after you select the **Overwrite** table action.

  :::image type="content" source="media/tutorial-end-to-end-pipeline/choose-destination-table-details.png" alt-text="Screenshot showing the Connect to data destination tab of the Copy data assistant, on the Select and map to folder path or table step.":::

1. Finally, on the **Review + save** page of the copy data assistant, review the configuration. For this tutorial, uncheck the **Start data transfer immediately** checkbox, since we run the activity manually in the next step. Then select **OK**.

  :::image type="content" source="media/tutorial-end-to-end-pipeline/review-save-copy-configuration.png" alt-text="Screenshot showing the Copy data assistant on the Review + save page.":::

### Step 4: Run and view the results of your Copy activity.

1. Select the **Run** tab in the pipeline editor. Then select the **Run** button, and then **Save and run** at the prompt, to run the Copy activity.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-button.png" alt-text="Screenshot showing the pipeline Run tab with the Run button highlighted.":::

   :::image type="content" source="media/tutorial-end-to-end-pipeline/save-and-run.png" alt-text="Screenshot showing the Save and run dialog with the Save and run button highlighted.":::

1. You can monitor the run and check the results on the **Output** tab below the pipeline canvas. Select the run details button (the "glasses" icon that appears when you hover over the running pipeline run) to view the run details.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-details-button.png" alt-text="Screenshot showing the run details button in the pipeline Output tab.":::

1. The run details show 1,508,501 rows read and written.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/run-details.png" alt-text="Screenshot of the Copy data details for the pipeline run.":::

1. Expand the **Duration breakdown** section to see the duration of each stage of the Copy activity. After reviewing the copy details, select **Close**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/copy-duration-breakdown.png" alt-text="Screenshot showing the duration breakdown of the Copy activity run.":::

## Next steps

In this first module to our end-to-end tutorial for your first data integration using Data Factory in Microsoft Fabric, you learned how to:

> [!div class="checklist"]
> - Create a data pipeline.
> - Add a Copy activity to your pipeline.
> - Use sample data and create a data Lakehouse to store the data to a new table.
> - Run the pipeline and view its details and duration breakdown.

Continue to the next section now to create your dataflow.

> [!div class="nextstepaction"]
> [Module 2: Transform data with a dataflow in Data Factory](tutorial-end-to-end-dataflow.md)
