---
title: How to monitor a Copy job (preview) in Data Factory
description: This article guides you through how to monitor a Copy job (preview) from either the Copy job panel or the Monitoring hub.
author: dearandyxu
ms.author: yexu
ms.topic: how-to
ms.date: 08/31/2024
ms.search.form: copy-job-tutorials 
---

# Learn how to monitor a Copy job (preview) in Data Factory for Microsoft Fabric

After you execute a Copy job in Data Factory for Microsoft Fabric, you can monitor its progress and metrics through either the Copy job panel or the Monitoring hub. The Monitoring hub acts as a centralized portal for reviewing Copy job runs across various items.

## Monitor in the Copy job panel

After you initiate a Copy job, you can immediately track its progress and metrics. The display consistently shows data from the most recent runs, reporting on the following metrics.

- Status
- Row read
- Row written
- Throughput

You can also see a list of the items being copied in the job, with the following individual table metrics reported:

- Source table name
- Destination table name
- Status
- Rows read
- Rows written
- Duration
- Run start
- Run stop
- Throughput

:::image type="content" source="media/copy-job/monitor-copy-job-panel.png" lightbox="media/copy-job/monitor-copy-job-panel.png" alt-text="Screenshot showing the monitoring area of the Copy job panel.":::

Select **More** to see more details about the job, including the run ID, which is useful if you need to create a support ticket:

:::image type="content" source="media/copy-job/job-panel-more-button.png" lightbox="media/copy-job/job-panel-more-button.png" alt-text="Screenshot showing the job panel with the More button highlighted on the monitoring area.":::

:::image type="content" source="media/copy-job/copy-job-details-run-id.png" lightbox="media/copy-job/copy-job-details-run-id.png" alt-text="Screenshot showing where the Copy job run ID appears in the Copy job run details pane.":::

You can also select **View run history** to see a list of prior runs:

:::image type="content" source="media/copy-job/view-run-history-button.png" alt-text="Screenshot showing the View run history button on the Copy job panel.":::

:::image type="content" source="media/copy-job/recent-runs.png" alt-text="Screenshot showing the Recent runs pane that appears when the View run history button is selected on the Copy job panel.":::

## Monitor in the Monitoring hub

The Monitoring hub serves as a central portal for overseeing Copy job runs across different items. There are two ways to access the Monitoring hub.

- When you select the **View run history** button on the Copy job panel Results area to view the recent runs for your job, you can select **Go to Monitor**:

   :::image type="content" source="media/copy-job/recent-runs-monitor-hub-button.png" lightbox="media/copy-job/recent-runs-monitor-hub-button.png" alt-text="Screenshot showing where to select the Go to Monitor button on the recent runs pane for a Copy job.":::

- On the main Fabric navigation pane on the left of the Fabric site, select **Monitor**.

   :::image type="content" source="media/copy-job/monitor-button.png" alt-text="Screenshot showing where to select the Monitor button on the Fabric navigation pane.":::

Either of these bring you to the Monitoring hub, where you can see a list of all Copy jobs and their runs:

:::image type="content" source="media/copy-job/monitor-pane.png" alt-text="Screenshot showing the monitor pane with several Copy jobs displayed.":::

## Related content

- [What is the Copy job in Data Factory](what-is-copy-job.md)
- [How to create a Copy job](create-copy-job.md)
