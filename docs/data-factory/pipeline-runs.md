---
title: Data pipeline runs
description: Explanation of what a pipeline run is, including on-demand and scheduled runs.
ms.reviewer: jonburchel
ms.author: noelleli
author: n0elleli
ms.topic: conceptual
ms.date: 05/23/2023
---

# Concept: Data pipeline Runs

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

A data pipeline run occurs when a data pipeline is executed. This means that the activities in your data pipeline will run and be executed to completion. For example, running a data pipeline with a **Copy data** activity will perform that action and copy your data. Each data pipeline run will have its own unique pipeline run ID.

:::image type="content" source="media/pipeline-runs/copy-data-activity.png" alt-text="Screenshot showing a copy data activity pipeline run.":::

A data pipeline run can be triggered one of two ways, either on-demand or by setting up a schedule. A scheduled pipeline will be able to run based on the time and frequency that you set.

## On-demand data pipeline run

To manually trigger a data pipeline run, select **Run** found in the top banner of the **Home** tab.

:::image type="content" source="media/pipeline-runs/trigger-pipeline-run.png" alt-text="Screenshot showing where to select Run on the Home tab.":::

You'll be prompted to save your changes before triggering the pipeline run. Select **Save and run** to continue.

:::image type="content" source="media/pipeline-runs/save-run-pipeline.png" alt-text="Screenshot showing the Save and run prompt." lightbox="media/pipeline-runs/save-run-pipeline.png":::

After your changes are saved, your pipeline will run. You can view the progress of the run in the **Output** tab found at the bottom of the canvas.

:::image type="content" source="media/pipeline-runs/view-run-progress.png" alt-text="Screenshot showing where the run status displays on the Output tab." lightbox="media/pipeline-runs/view-run-progress.png":::

Once an activity has completed in a run, a green check mark appears in the corner of the activity.

:::image type="content" source="media/pipeline-runs/copy-activity-complete.png" alt-text="Screenshot showing where the green check mark is displayed.":::

Once the entire pipeline has been executed and the output status updates to **Succeeded**, you've had a successful pipeline run!

:::image type="content" source="media/pipeline-runs/output-status.png" alt-text="Screenshot showing where Succeeded status shows in Output tab." lightbox="media/pipeline-runs/output-status.png":::

## Scheduled data pipeline runs

When you schedule a data pipeline run, you can choose the frequency that your pipeline runs. Select **Schedule**, found in the top banner of the **Home** tab, to view your options. By default, your data pipeline won't be set on a schedule.

:::image type="content" source="media/pipeline-runs/schedule-pipeline-run.png" alt-text="Screenshot showing where to select Schedule on the Home tab.":::

:::image type="content" source="media/pipeline-runs/run-schedule-configuration.png" alt-text="Screenshot of the Schedule configuration screen." lightbox="media/pipeline-runs/run-schedule-configuration.png":::

To set a schedule, choose the **Frequency-based run** option. This selection will bring up your scheduling options.

:::image type="content" source="media/pipeline-runs/frequency-based-run.png" alt-text="Screenshot showing where to select Frequency-based run." lightbox="media/pipeline-runs/frequency-based-run.png":::

Set your interval and select the granularity. You can choose between Minute(s), Hour(s), Day(s), Week(s), and Month(s).

:::image type="content" source="media/pipeline-runs/set-interval.png" alt-text="Screenshot showing where to select run intervals.":::

Then, choose your start date either by typing the date in manually or using the date picker.

:::image type="content" source="media/pipeline-runs/run-start-date.png" alt-text="Screenshot showing where to enter run start date.":::

You can also set a start time. For example, if you wanted your pipeline to run at 9:00 AM every morning, you can update the time to 09:00:00.

:::image type="content" source="media/pipeline-runs/run-start-time.png" alt-text="Screenshot showing where to enter run start time.":::

You can also update the time zone. Use the drop-down list and filter to find the time zone you’d like to use.

:::image type="content" source="media/pipeline-runs/run-time-zone.png" alt-text="Screenshot showing where to select your preferred time zone.":::

Once configured, select **Ok** to set your schedule.

:::image type="content" source="media/pipeline-runs/set-schedule-configuration.png" alt-text="Screenshot showing where to select OK.":::

A schedule is now set on your pipeline editing canvas, detailing how often your pipeline is set to run.

:::image type="content" source="media/pipeline-runs/pipeline-schedule.png" alt-text="Screenshot showing where your schedule runs appear on the pipeline editing canvas.":::

## Next steps

- [How to monitor data pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
- [Quickstart: Create your first data pipeline to copy data](create-first-pipeline-with-sample-data.md)
