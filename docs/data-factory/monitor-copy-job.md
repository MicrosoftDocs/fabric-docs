---
title: How to monitor a Copy job in Data Factory
description: This article guides you through how to monitor a Copy job from either the Copy job panel or the Monitoring hub in Data Factory in Microsoft Fabric.
author: dearandyxu
ms.author: yexu
ms.topic: how-to
ms.date: 05/19/2025
ms.search.form: copy-job-tutorials
ms.custom: copy-job, sfi-image-nochange
---

# Monitor a Copy job in Data Factory for Microsoft Fabric

After you run a Copy job in Data Factory for Microsoft Fabric, you can monitor its progress and metrics through either the [Copy job panel](#monitor-in-the-copy-job-panel) or the [Monitoring hub](#monitor-in-the-monitoring-hub) in Data Factory. The Monitoring hub gives you one place to check on all your Copy job runs.

## Monitor in the Copy job panel

After you initiate a Copy job, you can immediately track its progress and metrics in its job panel. The display shows data from the most recent runs, reporting on the following metrics:

- Status
- Rows read
- Rows written
- Throughput

:::image type="content" source="media/copy-job/monitor-copy-job-panel-overview.png" lightbox="media/copy-job/monitor-copy-job-panel-overview.png" alt-text="Screenshot overview showing the monitoring area of the Copy job panel.":::

>[!TIP]
>Select **More** to view the Copy Job Run ID, which can be used to create a support ticket, if needed.

You can also see a list of the items being copied in the job, with the following individual table metrics reported for each item:

- Source and destination names
- Status
- Rows read
- Rows written
- Files read
- Files written
- Data read
- Data written
- Duration
- Run start
- Run stop
- Throughput

:::image type="content" source="media/copy-job/monitor-copy-job-panel.png" lightbox="media/copy-job/monitor-copy-job-panel.png" alt-text="Screenshot showing the monitoring area of the Copy job panel.":::

Select any name to view its **real-time progress**.

:::image type="content" source="media/copy-job/monitor-copy-job-in-progress.png" lightbox="media/copy-job/monitor-copy-job-in-progress.png" alt-text="Screenshot showing the monitoring in-progress items in Copy job panel.":::

You can also select **View run history** to see a list of prior runs:

:::image type="content" source="media/copy-job/view-run-history-button.png" alt-text="Screenshot showing the View run history button on the Copy job panel.":::

:::image type="content" source="media/copy-job/recent-runs.png" alt-text="Screenshot showing the Recent runs pane that appears when the View run history button is selected on the Copy job panel.":::

## Monitor in the Monitoring hub

The Monitoring hub is your go-to place for checking on all your Copy job runs. You can get there in two ways:

- On the main Fabric navigation pane on the left of the Fabric site, select **Monitor**.

- Select the **View run history** button in the Copy job panel and select **Go to Monitor**:

   :::image type="content" source="media/copy-job/recent-runs-monitor-hub-button.png" lightbox="media/copy-job/recent-runs-monitor-hub-button.png" alt-text="Screenshot showing where to select the Go to Monitor button on the recent runs pane for a Copy job.":::

Either of these links bring you to the Monitoring hub, where you can see a list of all Copy jobs and their runs:

:::image type="content" source="media/copy-job/monitor-pane.png" alt-text="Screenshot showing the monitor pane with several Copy jobs displayed.":::

Select any job to view its details, including source, destination, duration, and data read and written.

:::image type="content" source="media/copy-job/monitor-pane-details.png" alt-text="Screenshot showing the monitor pane with one Copy job in details.":::

## Related content

- [What is a Copy job in Data Factory?](what-is-copy-job.md)
- [How to create a Copy job](create-copy-job.md)
