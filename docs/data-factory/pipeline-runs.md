---
title: Pipeline runs
description: Explanation of what a pipeline run is, including on-demand and scheduled runs.
ms.reviewer: jonburchel
ms.author: noelleli
author: n0elleli
ms.topic: conceptual
ms.date: 01/27/2023
---

# Concept: Pipeline Runs

A pipeline run occurs when a pipeline is executed. This means that the activities in your pipeline will run and be executed to completion. For example, running a pipeline with a **Copy data** activity will perform that action and copy your data. Each pipeline run will have its own unique pipeline run ID.

:::image type="content" source="media/pipeline-runs/copy-data-activity-85.png" alt-text="Screenshot showing a copy data activity pipeline run.":::

A pipeline run can be triggered one of two ways, either on-demand or by setting up a schedule. A scheduled pipeline will be able to run based on the time and frequency that you set.

## On-demand pipeline run

To manually trigger a pipeline run, simply click **Run** found in the top banner of the **Home** tab.

:::image type="content" source="media/pipeline-runs/trigger-pipeline-run-86.png" alt-text="Screenshot showing where to select Run on the Home tab.":::

You'll be prompted to save your changes before triggering the pipeline run. Click **Save and run** to continue.

:::image type="content" source="media/pipeline-runs/save-run-pipeline-87.png" alt-text="Screenshot showing the Save and run prompt.":::

After your changes are saved, your pipeline will run. You can view the progress of the run in the output tab found at the bottom of the canvas.

:::image type="content" source="media/pipeline-runs/view-run-progress-088.png" alt-text="Screenshot showing where the run status displays on the Output tab.":::

Once an activity has completed in a run, you'll see a green check mark in the corner of the activity.

:::image type="content" source="media/pipeline-runs/copy-activity-complete-89.png" alt-text="Screenshot showing where the green check mark is displayed.":::

Once the entire pipeline has been executed and the output status updates to **Succeeded**, you'll have had a successful pipeline run!

:::image type="content" source="media/pipeline-runs/output-status-90.png" alt-text="Screenshot showing where Succeeded status shows in Output tab.":::

## Scheduled pipeline runs

When you schedule a pipeline run, you can choose the frequency that your pipeline runs. Click **Schedule** found in the top banner of the **Home** tab to see your options. By default, your pipeline won't be set on a schedule.

:::image type="content" source="media/pipeline-runs/schedule-pipeline-run-91.png" alt-text="Screenshot showing where to select Schedule on the Home tab.":::

:::image type="content" source="media/pipeline-runs/run-schedule-configuration-92.png" alt-text="Screenshot of the Schedule configuration screen.":::

To set a schedule, choose the Frequency-based run option. This will bring up your scheduling options.

:::image type="content" source="media/pipeline-runs/frequency-based-run-93.png" alt-text="Screenshot showing where to select Frequency-based run.":::

Set your interval and select the granularity. You can choose between Minute(s), Hour(s), Day(s), Week(s), and Month(s).

:::image type="content" source="media/pipeline-runs/set-interval-94.png" alt-text="Screenshot showing where to select run intervals.":::

Then, choose your start date either by typing the date in manually or using the date picker.

:::image type="content" source="media/pipeline-runs/run-start-date-95.png" alt-text="Screenshot showing where to enter run start date.":::

You can also set a start time. For example, if you wanted your pipeline to run at 9:00 AM every morning, you can update the time to 09:00:00.

:::image type="content" source="media/pipeline-runs/run-start-time-96.png" alt-text="Screenshot showing where to enter run start time.":::

You also have the option to update the time zone. Use the drop-down list and filter to find the time zone you’d like to use.

:::image type="content" source="media/pipeline-runs/run-time-zone-97.png" alt-text="Screenshot showing where to select your preferred time zone.":::

Once configured, click **Ok** to set your schedule.

:::image type="content" source="media/pipeline-runs/set-schedule-configuration-98.png" alt-text="Screenshot showing where to click OK.":::

You'll see a schedule set on your pipeline editing canvas, detailing how often your pipeline is set to run.

:::image type="content" source="media/pipeline-runs/pipeline-schedule-99.png" alt-text="Screenshot showing where your schedule runs appear on the pipeline editing canvas.":::

## Next steps

- [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)] (Preview)](monitor-pipeline-runs.md)
- [Quickstart: Create your first pipeline to copy data (Preview)](create-first-pipeline.md)
