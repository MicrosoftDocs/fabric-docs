---
title: 'Tutorial: Orchestrate Fabric jobs with Job events'
description: Learn how to chain a Fabric data pipeline and a Dataflow Gen2 with a job succeeded event, so the dataflow runs automatically when the pipeline completes.
ms.reviewer: robece
ms.topic: tutorial
ms.date: 08/06/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to trigger a dataflow automatically when a pipeline succeeds, so that I can orchestrate Fabric jobs without a schedule or a parent pipeline.
---

# Tutorial: Orchestrate Fabric jobs with Job events

Modern data platforms rarely run a single job in isolation. A pipeline ingests raw data, a notebook enriches it, and a dataflow builds the tables that power a report, where each step depends on the one before it. The challenge is coordinating these jobs so that each one starts at the right moment, and keeping that coordination manageable as the number of jobs grows.

With Job events, Microsoft Fabric emits an event when a job succeeds. Activator reacts to that event and triggers the next job automatically, so the next job runs the instant the previous one succeeds. You get modularity and separation of concerns without a central orchestrator, a giant pipeline, or a fixed schedule to maintain.

In this tutorial, you orchestrate two Fabric items of different types: a data pipeline that ingests data, and a Dataflow Gen2 that transforms it. Instead of merging them into one item, you keep them separate and connect them with a job succeeded event, so the dataflow runs automatically the moment the pipeline finishes.

In this tutorial, you:

> [!div class="checklist"]
> * Set up an ingestion data pipeline that loads sample data into a lakehouse table.
> * Build a Dataflow Gen2 that transforms that table.
> * Connect them with a job succeeded trigger, then test the orchestration.

:::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/job-events-orchestration.png" alt-text="Diagram showing a data pipeline that emits a job succeeded event to Activator, which then starts a Dataflow Gen2 automatically." lightbox="media/tutorial-orchestrate-jobs-with-job-events/job-events-orchestration.png":::

## Prerequisites

- A [Microsoft Fabric workspace](../fundamentals/create-workspaces.md) with a Fabric capacity.
- Permissions to create items in the workspace and to set alerts on Fabric events.

## Set up the ingestion pipeline

For the upstream job, build a data pipeline that copies a sample dataset into a lakehouse table. This step also creates the lakehouse for you.

1. Follow the quickstart [Create your first pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md), and use the following configurations:

    - **Pipeline name**: *IngestHolidaysPipeline*.
    - **Source**: *Public Holidays* sample data.
    - **Destination**: a new lakehouse named *HolidaysLakehouse*.
    - **Table name**: *RawHolidays*.

       :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/table-name.png" alt-text="Screenshot that shows the Copy job wizard with the table name specified." lightbox="media/tutorial-orchestrate-jobs-with-job-events/table-name.png":::

    The **Review + save** page should look like this. Select **Save** to create the pipeline.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/review-save.png" alt-text="Screenshot that shows the Copy job wizard with the Review + save page." lightbox="media/tutorial-orchestrate-jobs-with-job-events/review-save.png":::
1. Configure the connection:
    1. Select the **Copy job**, and switch to the **Settings** tab in the bottom pane.

        :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/copy-job-settings.png" alt-text="Screenshot that shows the Copy job settings tab." lightbox="media/tutorial-orchestrate-jobs-with-job-events/copy-job-settings.png":::
    1. Select **Connection**, and choose your connection name. If you don't have one, follow these instructions:
        1. For **Connection**, select **Browse all** from the drop-down list.
        1. Select the **Copy job** under **New sources**.
        1. Create a new connection named "**CopyJobConnection**".
        1. For **Authentication kind**, ensure **Organizational account** is selected, and then select **Sign in**.
        1. Select **Connect**.
1. Select the **Save** button on the toolbar at the top.
1. Select **Run**, and wait for the pipeline to finish successfully. This step creates the **RawHolidays** table so it's available in the next step.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/pipeline-run-success.png" alt-text="Screenshot that shows the pipeline run succeeded." lightbox="media/tutorial-orchestrate-jobs-with-job-events/pipeline-run-success.png":::

## Build the transformation dataflow

Now build a Dataflow Gen2 that runs after ingestion and does one meaningful transformation: keep only the United States holidays and write them to a curated table.

1. In your workspace, select **New item** > **Dataflow Gen2**, and name it **TransformHolidaysDataflow**.
1. In the **Choose data source** step, select the **Get data from another source** link.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/get-data-from-another-source.png" alt-text="Screenshot showing the selection of Get data from another source in the Dataflow Gen2." lightbox="media/tutorial-orchestrate-jobs-with-job-events/get-data-from-another-source.png":::
1. Search for **HolidaysLakehouse**, and select it. Confirm the connection and select **Connect**.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/select-lake-house.png" alt-text="Screenshot showing the selection of the lakehouse in the Dataflow Gen2." lightbox="media/tutorial-orchestrate-jobs-with-job-events/select-lake-house.png":::
1. In the **Choose data** step, select the **RawHolidays** table, then select **Create**.
1. In the dataflow editor, select the arrow next to the **countryOrRegion** column, and select only **United States** from the dropdown.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/select-raw-table.png" alt-text="Screenshot showing the selection of the RawHolidays table in the Dataflow Gen2." lightbox="media/tutorial-orchestrate-jobs-with-job-events/select-raw-table.png":::
1. In the right pane, at the bottom under **Data destination**, select **+**, and select **Lakehouse** from the dropdown.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/select-lakehouse-destination.png" alt-text="Screenshot showing the selection of the Lakehouse destination in the Dataflow Gen2." lightbox="media/tutorial-orchestrate-jobs-with-job-events/select-lakehouse-destination.png":::
1. In the **Connect to data destination** step, confirm the connection and select **Next**.
1. In the **Choose destination target** step, ensure **New table** is selected. In the search bar, look for your workspace name. Expand the workspace and its child items, select **HolidaysLakehouse** and the **dbo** folder under it, and enter **USHolidays** as the table name. Select **Next**.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/choose-destination-target.png" alt-text="Screenshot showing the Choose destination target step in the Dataflow Gen2." lightbox="media/tutorial-orchestrate-jobs-with-job-events/choose-destination-target.png":::
1. In the **Choose destination settings** step, select **Save settings**.
1. From the toolbar, select the dropdown arrow next to the **Save** button and select **Save**. Don't use the default **Save and run** option, because you don't want the dataflow to run yet.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/save-dataflow.png" alt-text="Screenshot showing the Save option for the Dataflow Gen2." lightbox="media/tutorial-orchestrate-jobs-with-job-events/save-dataflow.png":::

    The dataflow is a separate item that a different team can own, yet it stays tightly related to the pipeline through the event that connects them.

## Set up the job succeeded trigger

Connect the pipeline and the dataflow with a job event so the dataflow runs automatically whenever the pipeline succeeds.

1. Go to the Real-Time hub. On the left navigation bar, select **Real-Time**.
1. Select **Fabric events**.
1. Hover over **Job events**, and select **Set alert**.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/set-alert-button.png" alt-text="Screenshot showing the Set alert option for Job events in the Real-Time hub." lightbox="media/tutorial-orchestrate-jobs-with-job-events/set-alert-button.png":::
1. Enter a name for the alert, such as **IngestHolidaysPipeline succeeded**.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/rule-name.png" alt-text="Screenshot showing the rule name for the alert." lightbox="media/tutorial-orchestrate-jobs-with-job-events/rule-name.png":::
1. In the **Monitor** section, for **Source**, choose **Select source events**, and follow these steps:
    1. For **Event types**, select **Microsoft.Fabric.ItemJobSucceeded**.
    1. For **Event source**, confirm **By item** is selected.
    1. For **Workspace**, select your workspace with the pipeline.
    1. For **Item**, select **IngestHolidaysPipeline**.

        :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/monitor-source.png" alt-text="Screenshot showing the Monitor section for the alert." lightbox="media/tutorial-orchestrate-jobs-with-job-events/monitor-source.png":::

    1. Select **Next**.
    1. On the **Review + connect** page, select **Finish**.
1. In the **Condition** section, for **Check**, select **On each event**.
1. In the **Action** section, for **Select action**, select **Run a Dataflow**.
1. On the **Select Fabric item to run** page, select **TransformHolidaysDataflow**, and then select **Add**.
1. Confirm that the action is listed in the **Action** section.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/action-section.png" alt-text="Screenshot showing the Action section for the alert." lightbox="media/tutorial-orchestrate-jobs-with-job-events/action-section.png":::
1. For **Save location**, choose your workspace and select **Create a new item** named **My Orchestrator**.
1. Select **Create**.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/save-location.png" alt-text="Screenshot showing the Save location for the orchestrator." lightbox="media/tutorial-orchestrate-jobs-with-job-events/save-location.png":::

## Test the scenario

Now test the orchestration by running the pipeline and verifying that the dataflow runs automatically after it succeeds.

### Run the pipeline

Open the pipeline **IngestHolidaysPipeline**, and select **Run**. Wait for it to finish successfully. This run sends a **Microsoft.Fabric.ItemJobSucceeded** event that **My Orchestrator** receives. This event triggers the dataflow **TransformHolidaysDataflow** to run automatically.

:::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/pipeline-run-success.png" alt-text="Screenshot that shows the pipeline run succeeded." lightbox="media/tutorial-orchestrate-jobs-with-job-events/pipeline-run-success.png":::


### Verify the dataflow run

1. In the dataflow **TransformHolidaysDataflow**, select **Run history** on the toolbar.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/recent-runs-link.png" alt-text="Screenshot that shows the dataflow run history." lightbox="media/tutorial-orchestrate-jobs-with-job-events/recent-runs-link.png":::

1. You see a run that started on its own, right after the pipeline succeeded. Select the run to see its details.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/recent-run.png" alt-text="Screenshot that shows the recent dataflow run." lightbox="media/tutorial-orchestrate-jobs-with-job-events/recent-run.png":::
1. In the **Run details** page, you see the details such as start time, end time, and the activity the dataflow ran. Select the activity to see its details.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/run-details.png" alt-text="Screenshot that shows the dataflow run details." lightbox="media/tutorial-orchestrate-jobs-with-job-events/run-details.png":::

1. You see the endpoint for the activity, which is your lakehouse, number of rows the activity read from the source, number of rows written to the destination, and other details. Select **Close** to return to the **Run details** page.

    :::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/run-activity-details.png" alt-text="Screenshot that shows the dataflow run activity details." lightbox="media/tutorial-orchestrate-jobs-with-job-events/run-activity-details.png":::

    Your pipeline and dataflow now run in sequence, in real time, with no manual hand-off and no schedule to guess at.

### Verify output data in the lakehouse

In the lakehouse, you should see the **USHolidays** table created by the dataflow. You can query it to verify that it contains only the United States holidays.

:::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/lakehouse-output.png" alt-text="Screenshot that shows the output data in the lakehouse." lightbox="media/tutorial-orchestrate-jobs-with-job-events/lakehouse-output.png":::

### Verify the Activator run

You can also verify the Activator run that triggered the dataflow.

:::image type="content" source="media/tutorial-orchestrate-jobs-with-job-events/activator-live-feed.png" alt-text="Screenshot that shows the Activator live feed." lightbox="media/tutorial-orchestrate-jobs-with-job-events/activator-live-feed.png":::


## More use cases for event-driven orchestration

Beyond chaining a pipeline and a dataflow, job events unlock other orchestration scenarios in Fabric:

- **Fan out to run work in parallel**: A single job succeeded event can trigger several downstream pipelines, dataflows, or notebooks at once.
- **Mix and match item types**: Chain a notebook after a pipeline, a dataflow after a notebook, or any combination across the supported Fabric item types.
- **Handle failures automatically**: React to **Microsoft.Fabric.ItemJobFailed** and have Activator run a Fabric function or a Power Automate flow to open a support ticket, so failures become tracked work items.
- **Monitor and audit your jobs**: Route job events to an eventhouse through eventstreams to keep a durable history of every job run. You can then query that history with KQL to audit execution, analyze trends, and build dashboards over your orchestration.

## Related content

- [Explore Job events in Fabric Real-Time hub](explore-fabric-job-events.md)
- [Set alerts on Job events in Real-Time hub](set-alerts-fabric-job-events.md)
- [Build event-driven pipelines with OneLake events and Azure Blob Storage events](tutorial-build-event-driven-data-pipelines.md)
- [Fabric events overview](fabric-events-overview.md)
