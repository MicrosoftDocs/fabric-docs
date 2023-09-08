# Move data from Azure SQL DB to Lakehouse via pipeline

In this tutorial, you build a data pipeline to move a table in Azure SQL Database to Lakehouse. This experience shows you a quick demo about how to use pipeline copy activity and how to load data into Lakehouse.

## Prerequisites

To get started, you must complete the following prerequisites:

- A Microsoft Fabric tenant account with an active subscription. Create an account for free.
- Make sure you have a Microsoft Fabric enabled Workspace: [Create a workspace](../get-started/create-workspaces.md).
- Create a data pipeline follow steps in [Create a data pipeline](tutorial-load-sample-data-to-data-warehouse.md#create-a-data-pipeline) section.

## Copy data using pipeline

In this session, you start to build your pipeline by following below steps about copying data from Azure SQL Database to Lakehouse. Go to [Add a copy activity directly](copy-data-activity.md#add-a-copy-activity-directly) to learn how to configure your pipeline.

## Run and schedule your data pipeline

After completing the configuration of your pipeline, run the pipeline to trigger the copy activity. You can also schedule your pipeline run if needed.

1. Switch to the **Home** tab and select **Run**. A confirmation dialog is displayed. Then select **Save and run** to start the activity.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/save-and-run.png" alt-text="Screenshot of saving and running activity.":::

1. You can monitor the running process and check the results on the **Output** tab below the pipeline canvas. Select the run details button (with the glasses icon highlighted) to view the run details.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/output.png" alt-text="Screenshot of the output of the pipeline.":::

1. The run details show how much data was read and written and various other details about the run.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/copy-details.png" alt-text="Screenshot of the details of the copy activity.":::

1. You can also schedule the pipeline to run with a specific frequency as required. Below is an example scheduling the pipeline to run every 15 minutes. You can also specify the **Start** time and **End** time for your schedule. If you don't specify a start time, the start time is the time your schedule applies. If you don't specify an end time, your pipeline run will keep recurring every 15 minutes.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/schedule.png" alt-text="Screenshot of scheduling the pipeline.":::

## Next steps

- [Connector overview](connector-overview.md)
- [How to monitor pipeline runs](monitor-pipeline-runs.md)
