---
title: Run or schedule a pipeline
description: Explanation of what a pipeline run is, including on-demand and scheduled runs.
ms.reviewer: whhender
ms.author: noelleli
author: n0elleli
ms.topic: conceptual
ms.custom: pipelines, sfi-image-nochange
ms.date: 12/18/2024
---

# Run or schedule a pipeline

A data pipeline run occurs when a data pipeline is executed. This means that the activities in your data pipeline ran and were executed to completion. For example, running a data pipeline with a **Copy data** activity performs that action and copy your data. Each data pipeline run has its own unique pipeline run ID.

:::image type="content" source="media/pipeline-runs/copy-data-activity.png" alt-text="Screenshot showing a copy data activity pipeline run.":::

You can start pipeline runs in three ways:

- [**On-demand runs**](#on-demand-data-pipeline-run): Select **Run** in the pipeline editor to trigger an immediate run. You'll need to save any changes before the pipeline starts.

- [**Scheduled runs**](#scheduled-data-pipeline-runs): Set up automatic runs based on time and frequency. When you create a schedule, you specify start and end dates, frequency, and time zone.

- [**Event-based runs**](pipeline-storage-event-triggers.md): Use event triggers to start your pipeline when specific events occur, such as new files arriving in a data lake or changes in a database.

## On-demand data pipeline run

To manually trigger a data pipeline run, select **Run** found in the top banner of the **Home** tab.

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

## Scheduled data pipeline runs

When you schedule a data pipeline run, you can set multiple, specific schedules for each pipeline, so your data is prepared and available when you need it.

Select **Schedule**, found in the top banner of the **Home** tab, and then select **Add Schedule** to view your options. By default, your data pipeline isn't set on a schedule.

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

## Related content

- [How to monitor data pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
- [Quickstart: Create your first data pipeline to copy data](create-first-pipeline-with-sample-data.md)
- [REST API capabilities for pipelines in Fabric Data Factory](pipeline-rest-api-capabilities.md)
