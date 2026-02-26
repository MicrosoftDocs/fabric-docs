---
title: Run, schedule, or use events to trigger a pipeline
description: Explanation of what a pipeline run is, including on-demand and scheduled runs.
ms.reviewer: noelleli
ms.topic: how-to
ms.custom: pipelines, sfi-image-nochange
ms.date: 08/27/2025
ai-usage: ai-assisted
---

# Run, schedule, or use events to trigger a pipeline

A pipeline run occurs when a pipeline is started and the activities are executed.

You can start a pipeline run in three ways:

- [**On-demand runs**](#on-demand-pipeline-run): Select **Run** in the pipeline editor to trigger an immediate run. You'll need to save any changes before the pipeline starts.

    :::image type="content" source="media/pipeline-runs/trigger-pipeline-run.png" alt-text="Screenshot showing where to select Run on the Home tab.":::

- [**Scheduled runs**](#scheduled-pipeline-runs): Set up automatic runs based on time and frequency. When you create a schedule, you specify start and end dates, frequency, and time zone.

    :::image type="content" source="media/pipeline-runs/schedule-pipeline-run.png" alt-text="Screenshot showing where to select Schedule on the Home tab." lightbox="media/pipeline-runs/schedule-pipeline-run.png":::

- [**Event-based runs**](#event-based-pipeline-runs): Use event triggers to start your pipeline when specific events occur, such as new files arriving in a data lake or changes in a database.

    :::image type="content" source="media/pipeline-runs/event-based-run.png" alt-text="Screenshot showing where to select Trigger to add event-based run triggers on the home tab.":::

## On-demand pipeline run

To manually trigger a pipeline run, select **Run** found in the top banner of the **Home** tab.

:::image type="content" source="media/pipeline-runs/trigger-pipeline-run.png" alt-text="Screenshot showing where to select Run on the Home tab.":::

You can also select **Schedule** in the top banner of the **Home** tab and select **Run now** to trigger an immediate run.

:::image type="content" source="media/pipeline-runs/schedule-run-now.png" alt-text="Screenshot showing where to select Schedule on the Home tab and then the Run Now button in the scheduler." lightbox="media/pipeline-runs/schedule-run-now.png":::

You are prompted to save your changes before triggering the pipeline run. Select **Save and run** to continue.

:::image type="content" source="media/pipeline-runs/save-run-pipeline.png" alt-text="Screenshot showing the Save and run prompt." lightbox="media/pipeline-runs/save-run-pipeline.png":::

After your changes are saved, your pipeline will run. You can view the progress of the run in the **Output** tab found at the bottom of the canvas.

:::image type="content" source="media/pipeline-runs/view-run-progress.png" alt-text="Screenshot showing where the run status displays on the Output tab." lightbox="media/pipeline-runs/view-run-progress.png":::

Once an activity completes in a run, a green check mark appears in the corner of the activity.

:::image type="content" source="media/pipeline-runs/copy-activity-complete.png" alt-text="Screenshot showing where the green check mark is displayed.":::

Once the entire pipeline executes and the output status updates to **Succeeded**, you have a successful pipeline run!

:::image type="content" source="media/pipeline-runs/output-status.png" alt-text="Screenshot showing where Succeeded status shows in Output tab." lightbox="media/pipeline-runs/output-status.png":::

## Scheduled pipeline runs

When you schedule a pipeline run, you can set multiple, specific schedules for each pipeline, so your data is prepared and available when you need it.

> [!VIDEO https://learn.microsoft.com/_themes/docs.theme/master/en-us/_themes/global/video-embed-one-stream.html?id=57ecfaaf-cd4c-4b57-b8c2-723f98839496]

Select **Schedule**, found in the top banner of the **Home** tab, and then select **Add Schedule** to view your options. By default, your pipeline isn't set on a schedule.

:::image type="content" source="media/pipeline-runs/schedule-pipeline-run.png" alt-text="Screenshot showing where to select Schedule on the Home tab." lightbox="media/pipeline-runs/schedule-pipeline-run.png":::

On the Schedule configuration page, you can specify a schedule frequency, start and end dates and times, and time zone.

> [!TIP]
> When scheduling a pipeline, you must set both a start and end date. There's no option for an open-ended schedule. To keep a pipeline running long-term, set the end date far in the future (for example, **01/01/2099 12:00 AM**). You can update or stop the schedule at any time.

:::image type="content" source="media/pipeline-runs/configure-schedule.png" alt-text="Screenshot of the Schedule configuration screen." lightbox="media/pipeline-runs/configure-schedule.png":::

Once configured, select **Save** to set your schedule.

You can add up to 20 schedules for a single pipeline by selecting **Add Schedule** again after saving your first schedule. Each schedule can have different frequencies and start and end times.

### Manage scheduled runs

You can manage your scheduled runs by selecting **Schedule** in the top banner of the **Home** tab. From there, you can edit existing schedules, or enable or disable schedules using the toggle switch.

:::image type="content" source="media/pipeline-runs/toggle-or-edit.png" alt-text="Screenshot showing where in the schedule menu you can toggle or edit a scheduled run." lightbox="media/pipeline-runs/toggle-or-edit.png":::

To delete a schedule, select the **Edit** icon (pencil) next to the schedule you want to delete. In the Edit Schedule pane, select **Delete schedule** at the bottom of the pane.

:::image type="content" source="media/pipeline-runs/delete-schedule.png" alt-text="Screenshot showing the delete button can be found in the edit window.":::

## Event-based pipeline runs

Event triggers let you start pipelines when specific events happen, like when files arrive or get deleted in storage. You can trigger pipelines from file events, job events, and workspace events. If you're moving from Azure Data Factory, you'll find storage events familiar.

Triggers use Fabric platform features including eventstreams and Data Activator alerts. You can create triggers from the pipeline canvas or directly in the Data Activator experience.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=9f36af9d-f362-4452-a221-ca27d39da11c]

### Set up storage event triggers

1. Select the **Trigger** button on the **Home** ribbon at the top of the pipeline canvas.

   :::image type="content" source="media/pipeline-storage-event-triggers/set-trigger-button.png" alt-text="Screenshot showing the Trigger button on the Home ribbon of the pipeline canvas editor window.":::

1. The **Set alert** panel opens. Here you can define source events for your trigger using the Data Activator alert service. You can add values to parameters, if needed.

   :::image type="content" source="media/pipeline-storage-event-triggers/set-alert-panel-with-parameters.png" alt-text="Screenshot showing the Set Alert panel.":::

1. Select the type of events you want to listen for. Choose `OneLake` events for OneLake file events, Azure Blob events, etc.

   :::image type="content" source="media/pipeline-storage-event-triggers/trigger-events-001.png" alt-text="Screenshot showing the Select a data source dialog.":::

1. Select **Source** and then **Select events** to pick the storage events you want to monitor.

   :::image type="content" source="media/pipeline-storage-event-triggers/connect-azure-blob-storage-events.png" lightbox="media/pipeline-storage-event-triggers/connect-azure-blob-storage-events.png" alt-text="Screenshot showing where to connect to Azure Blob Storage events for a Blob Storage account.":::

1. Choose your Azure subscription and Blob Storage account.

1. A new eventstream object gets created in your Fabric workspace. Select the correct workspace under **Stream details**.

1. Select **Next**.

1. Choose event types. You'll see many event options beyond file created and file deleted.

   :::image type="content" source="media/pipeline-storage-event-triggers/configure-event-types.png" alt-text="Screenshot showing the Configure events type and source page of the trigger configuration dialog.":::

1. Filter events to match specific files and folders by specifying folder name, file name, file type, and container using the **Subject** field.

   :::image type="content" source="media/pipeline-storage-event-triggers/set-event-filters.png" alt-text="Screenshot showing the filter configuration page.":::

   > [!NOTE]
   > File name and folder name are part of the **Subject** field.

    An event has this top-level data:

   | Property | Type   | Description                                                                                                 | Example                                                                                                                             |
   |----------|--------|-------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
   | source   | string | Full resource path to the event source. This field isn't writeable. Event Grid provides this value.        | /subscriptions/{subscription-id}/resourceGroups/Storage/providers/Microsoft.Storage/storageAccounts/my-storage-account             |
   | subject  | string | Publisher-defined path to the event subject.                                                               | /blobServices/default/containers/my-file-system/blobs/new-file.txt                                                                 |
   | type     | string | One of the registered event types for this event source.                                                  | Microsoft.Storage.BlobCreated                                                                                                      |
   | time     | string | The time the event is generated based on the provider's UTC time.                                         | 2017-06-26T18:41:00.9584103Z                                                                                                       |
   | id       | string | Unique identifier for the event.                                                                            | 00000000-0000-0000-0000-000000000000                                                                                                |
   | data     | object | Blob storage event data.                                                                                   | {{Data object}}                                                                                                                     |
   | specversion | string | CloudEvents schema specification version.                                                                  | 1.0                                                                                                                                 |

1. On the trigger configuration panel, choose the workspace to store the trigger items, pipeline name, pipeline action, and name your trigger as a Reflex item.

1. Select **Create** to create the trigger. The trigger becomes active on your pipeline and responds to the storage events you defined.

   :::image type="content" source="media/pipeline-storage-event-triggers/alert-created.png" alt-text="Screenshot showing the Alert created notification.":::

### View and manage triggers

1. To view the trigger, go to your workspace list and find the Reflex object by name in your Fabric browser.

1. The object type is **Reflex**. Select the trigger to open the Reflex object for viewing and editing.

   :::image type="content" source="media/pipeline-storage-event-triggers/view-reflex-object.png" alt-text="Screenshot showing the details of the Reflex object.":::

1. To view triggers that are part of your pipeline, use **Triggers > View triggers** from the pipeline menu.

   :::image type="content" source="media/pipeline-storage-event-triggers/manage-triggers.png" alt-text="Screenshot showing the manage trigger rules pane.":::

### Use trigger file and folder names in expressions

You can use the file name and folder path from storage events in your pipeline using built-in trigger parameters. Data Factory sets these parameters when it receives the storage event.

Select the trigger parameters tab on the expression builder in your pipeline, and Data Factory automatically parses the file name and folder names, letting you add them dynamically to your pipeline expressions.

:::image type="content" source="media/pipeline-storage-event-triggers/add-dynamic-content.png" alt-text="Screenshot showing the Add dynamic content dialog.":::

These built-in parameters come from the **Subject** and **Topic** fields of the file event and are created automatically for your pipeline logic.

```@pipeline()?.TriggerEvent?.FileName```

Notice the `?` after the `pipeline()` object reference. This handles NULL values in the pipeline expression language. You need this syntax when testing a pipeline that uses trigger parameters because during manual testing, file and folder name parameters aren't set, returning a NULL value. When you trigger the pipeline from a file event, you'll see the file name and folder name filled out in those fields.

## Related content

- [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
- [Quickstart: Create your first pipeline to copy data](create-first-pipeline-with-sample-data.md)
- [REST API capabilities for pipelines in Fabric Data Factory](pipeline-rest-api-capabilities.md)
