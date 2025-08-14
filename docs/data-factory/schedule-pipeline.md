---
title: Schedule pipeline
description: Explanation of how to automate your pipeline by using a schedule
ms.reviewer: whhender
ms.author: makromer
author: kromerm
ms.topic: conceptual
ms.custom: pipelines
ms.date: 08/14/2025
---

# Concept: Schedule pipeline

With Data Factory pipelines, once you've completed designing your logic and testing your pipelines with manual runs, you'll next want to automate the execution of your pipeline logic. We provide several options to do this including scheduling and triggering based on events. In this article, will introduce you to the concept of scheduling your pipelines via a wall-clock scheduler. Scheduling pipelines in Data Factory ensures that your workflows run automatically, reliably, and at the right time without manual intervention. By setting up schedules, you can align data movement, data processing, and data transformation with business requirements—such as refreshing reports before the start of the workday, syncing systems during off-peak hours, or meeting compliance deadlines. Automated scheduling reduces operational overhead, minimizes the risk of missed or delayed runs, and enables consistent, predictable data delivery.

## Create or manage your schedules

In Fabric Data Factory, each pipeline contains the schedules inside the pipeline definition. Open your pipeline designer and you'll see Schedule button on the Home ribbon.

:::image type="content" source="media/schedule-pipeline/toolbar.png" alt-text="Screenshot showing where to select Schedule on the Home ribbon.":::



:::image type="content" source="media/pipeline-runs/save-run-pipeline.png" alt-text="Screenshot showing the Save and run prompt." lightbox="media/pipeline-runs/save-run-pipeline.png":::

After your changes are saved, your pipeline will run. You can view the progress of the run in the **Output** tab found at the bottom of the canvas.

:::image type="content" source="media/pipeline-runs/view-run-progress.png" alt-text="Screenshot showing where the run status displays on the Output tab." lightbox="media/pipeline-runs/view-run-progress.png":::

Once an activity completes in a run, a green check mark appears in the corner of the activity.

:::image type="content" source="media/pipeline-runs/copy-activity-complete.png" alt-text="Screenshot showing where the green check mark is displayed.":::

Once the entire pipeline executes and the output status updates to **Succeeded**, you have a successful pipeline run!

:::image type="content" source="media/pipeline-runs/output-status.png" alt-text="Screenshot showing where Succeeded status shows in Output tab." lightbox="media/pipeline-runs/output-status.png":::

## Scheduled data pipeline runs

When you schedule a data pipeline run, you can choose the frequency that your pipeline runs. Select **Schedule**, found in the top banner of the **Home** tab, to view your options. By default, your data pipeline isn't set on a schedule.

:::image type="content" source="media/pipeline-runs/schedule-pipeline-run.png" alt-text="Screenshot showing where to select Schedule on the Home tab.":::

> [!TIP]
> when scheduling a data pipeline, the interface requires specifying both a start and an end date. This design ensures that all scheduled pipelines have a defined execution period.  Currently, there's no built-in option to set a schedule without an end date.
> To maintain an ongoing schedule, you can set the end date far into the future, such as several years ahead. for example **2099-01-01** This approach effectively keeps the pipeline running indefinitely, allowing you to manage or adjust the schedule as needed over time.



On the Schedule configuration page, you can specify a schedule frequency, start and end dates and times, and time zone.

:::image type="content" source="media/pipeline-runs/configure-schedule.png" alt-text="Screenshot of the Schedule configuration screen." lightbox="media/pipeline-runs/configure-schedule.png":::

Once configured, select **Apply** to set your schedule. You can view or edit the schedule again anytime by selecting the **Schedule** button again.

## Related content

- [How to monitor data pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
- [Quickstart: Create your first data pipeline to copy data](create-first-pipeline-with-sample-data.md)
