---
title: Data Factory tutorial: Create a data pipeline 
description: This module covers creating a data pipeline, as part of an end-to-end data integration tutorial to complete a full data integration scenario with Data Factory in Microsoft Fabric within an hour.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: tutorial
ms.date: 05/23/2023
---

# Module 1: Create a pipeline in Data Factory

This module takes 10 minutes, ingesting raw data from the source store into the Bronze table of a data Lakehouse using the Copy activity in a pipeline.

The high-level steps in module 1 are as follows:

1. Create a data pipeline.
1. Use a Copy Activity in the pipeline to load sample data into a data Lakehouse.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Create a data pipeline

1. Sign into [Power BI](https://app.powerbi.com) using your administrator account credentials.
1. Choose your existing workspace with premium capacity enabled, or [create a new workspace](../get-started/create-workspaces.md) enabling premium capacity, leaving other options as their defaults.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/create-workspace.png" alt-text="Screenshot showing the Create a workspace dialog with Premium capacity selected.":::

1. Select the default Power BI icon at the bottom left of the screen, and switch to the **Data Factory** workload.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/switch-data-factory.png" alt-text="Screenshot showing the selection of the Data Factory workload.":::

1. Select **Data pipeline** and provide a pipeline name. Then select **Create**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-data-pipeline.png" alt-text="Screenshot of the Data Factory start page with the button to create a new data pipeline selected.":::

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-pipeline-name.png" alt-text="Screenshot showing the dialog to give the new pipeline a name.":::

## Use a Copy activity in the pipeline to load sample data to a data Lakehouse

### Step 1: Create a Copy activity in your new pipeline. 

Select **Add pipeline activity**, and then choose **Copy data** from the displayed list of activities.

:::image type="content" source="media/tutorial-end-to-end-pipeline/add-copy-activity.png" alt-text="Screenshot showing the selection of the Copy data activity from the new pipeline start page.":::

### Step 2: Configure your source settings in your new Copy activity.

1. Select the **Source** tab in the properties area below the pipeline canvas, and then select **+ New** to create a new data source. (If you don't see the **Source** tab, you might need to first select the **Copy data** activity on the pipeline canvas area.)

   :::image type="content" source="media/tutorial-end-to-end-pipeline/create-new-data-source.png" alt-text="Screenshot showing the Source settings of the Copy data activity with the + New button higlighted.":::

1. Select **Azure Blob Storage**, and then **Continue**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/data-source-type-azure-blob-storage.png" alt-text="Screenshot showing the selection of the Azure Blob Storage data type for the new connection.":::

1. In the **New connection** dialog, provide the relevant details for the connection. For the tutorial, we use the following settings for the **NYC Taxi** sample data:

   - **Account name or URL** - https://nyctaxisample.blob.core.windows.net/sample
   - **Connection** - unchanged, leaving **Create new connection** selected.
   - **Connection name** - NYC-Taxi-Anonymous
   - **Authentication kind** - Anonymous
   
   Then select **Create**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-data-source-settings.png" alt-text="Screenshot showing the New connection dialog with the connection settings to be configured for the tutorial.":::

1. On the **Source** tab for the new data source you just created, select the **File path** option for **File path type**, entering **sample** for the top level path, and then selecting the **Browse** dropdown to select **From specified path**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/data-source-configuration-source-tab.png" alt-text="Screenshot showing the data-source configuration on the Source tab with the specified path setting applied and the Browse dropdown selected.":::

1. On the **Browse** dialog presented, choose **NYC-Taxi-Green-2015-01.parquet** and select **OK**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/choose-nyc-taxi-data.png" alt-text="Screenshot showing the Browse dialog with the NYC-Taxi-Green-20151-01.parquet file selected from the sample folder.":::

1. Select **Parquet** for the **File format** dropdown, and then select **Preview data**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/choose-parquet-file-format.png" alt-text="Screenshot showing the selection of Parquet for File format, with the Preview data button higlighted.":::

   :::image type="content" source="media/tutorial-end-to-end-pipeline/preview-sample-data.png" alt-text="Screenshot showing the Preview data for the selected NYC-Taxi-Anonymous data source connection.":::

### Step 3: Configure the destination settings for your Copy activity.

1. Select the **Destination** tab for your Copy activity, then select **+ New** to create a new Lakehouse destination, and give it a name. For this tutorial we name our destination Bronze. After providing the name, select **Create**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/data-source-configure-destination-tab.png" alt-text="Screenshot showing the configuration of the Destination tab for the Copy activity.":::

   :::image type="content" source="media/tutorial-end-to-end-pipeline/new-lakehouse-name.png" alt-text="Screenshot showing the New lakehouse dialog with the name Bronze provided and the Create button highlighted.":::

1. For the **Table name** property, select the **Edit** checkbox to create a new Lakehouse table where the data is loaded, and provide the name **nyc_taxi**.

   :::image type="content" source="media/tutorial-end-to-end-pipeline/data-source-configure-destination-tab-table-name.png" alt-text="Screenshot showing the selection of the Edit checkbox in the Destination settings, with the Table name of nyc_taxi entered.":::

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

In this first module to our end-to-end tutorial for your first data integration using Data Factory in Microsoft Fabric, you learned:

> [!div class="checklist"]
> - How to create a data pipeline.
> - How to add a Copy activity to your pipeline.
> - How to use sample data and create a data Lakehouse to store the data to a new table.
> - How to run the pipeline and view its details and duration breakdown.

Continue to the next section now to create your dataflow.

> [!div class="nextstepaction"]
> [Module 2: Create your first dataflow]](tutorial-end-to-end-dataflow.md)