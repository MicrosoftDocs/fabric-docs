---
title: Monitor Pipeline Runs in the New Monitoring Hub (Preview)
description: Learn how to monitor, inspect, and rerun pipelines in the new Monitoring hub experience in Microsoft Fabric Data Factory.
ms.reviewer: noelleli
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/02/2026
ai-usage: ai-assisted
---

# Monitor pipeline runs in the new Monitoring hub (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The new Monitoring hub provides a centralized place to monitor pipeline runs across your Fabric workspaces. The preview experience includes updated navigation, pipeline health insights, detailed run information, and integrated alert management.

To access the new Monitoring hub, select **Try it now** in the Monitoring hub.

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/try-new-monitoring-hub.png" alt-text="Screenshot of the Monitoring hub with the Try it now option highlighted." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/try-new-monitoring-hub.png":::

> [!NOTE]  
> To return to the [previous experience](monitoring-hub-pipeline-runs.md) at any time, select **Back to legacy Monitor hub** at the top of the page.
>
> :::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/back-to-legacy-monitoring-hub.png" alt-text="Screenshot of the new Monitoring hub with the Back to legacy Monitor hub option highlighted." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/back-to-legacy-monitoring-hub.png":::

## Access the new Monitoring hub

1. In the **Data Factory** experience, select **Monitoring hub** in the left navigation.

   :::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/monitoring-hub-navigation.png" alt-text="Screenshot of the Data Factory navigation menu with Monitoring hub highlighted." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/monitoring-hub-navigation.png":::

1. At the top of the Monitoring hub page, select **Try it now**.

1. The new Monitoring hub opens.

   :::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/new-monitoring-hub.png" alt-text="Screenshot of the new Monitoring hub showing pipeline monitoring information." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/new-monitoring-hub.png":::

## Browse pipeline runs in the new Monitoring hub

The new Monitoring hub provides a table view of your pipeline items and their recent execution health. You can [search for pipelines](#search-for-pipelines), [sort pipeline information](#sort-pipeline-information), [filter pipeline information](#filter-pipelines), and open execution details.

### Search for pipelines

Enter a pipeline name or keyword in the search box.

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/search-pipelines.png" alt-text="Screenshot of the pipeline search box in the new Monitoring hub." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/search-pipelines.png":::

### Sort pipeline information

You can sort pipeline information by the following columns:

- **Item name**
- **Item type**
- **Last run status**
- **Success rate**
- **Average duration**
- **Run history**
- **Workspace**

Use these columns to identify unhealthy pipelines, evaluate reliability trends, and locate pipelines that you need to investigate.

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/sort-pipelines.png" alt-text="Screenshot of sortable pipeline columns in the new Monitoring hub." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/sort-pipelines.png":::

### Filter pipelines

Use the filter options to narrow the pipelines shown in the table.

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/filter-pipelines.png" alt-text="Screenshot of the pipeline filter options in the new Monitoring hub." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/filter-pipelines.png":::

To inspect execution information, select a pipeline and open its run details.

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/pipeline-execution-details.png" alt-text="Screenshot of pipeline execution details in the new Monitoring hub." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/pipeline-execution-details.png":::

## Open a pipeline for editing in the new Monitoring hub

1. Hover over a pipeline row.
1. Select the **Open** icon next to the pipeline name.

   :::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/open-pipeline.png" alt-text="Screenshot of the Open icon for a pipeline in the new Monitoring hub." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/open-pipeline.png":::

1. The pipeline opens in the pipeline editor.

   :::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/pipeline-editor.png" alt-text="Screenshot of a pipeline opened in the pipeline editor." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/pipeline-editor.png":::

## View pipeline details in the new Monitoring hub

1. Select the pipeline name in the Monitoring hub table.

   :::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/select-pipeline-name.png" alt-text="Screenshot of a pipeline name link in the new Monitoring hub." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/select-pipeline-name.png":::

1. The pipeline details page opens.

   :::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/pipeline-details.png" alt-text="Screenshot of the pipeline details page in the new Monitoring hub." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/pipeline-details.png":::

The details page includes **Overview**, **Last run details**, and **Run history** sections.

### Review the pipeline overview

The **Overview** section summarizes the selected pipeline, including its latest execution information and operational status.

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/pipeline-overview.png" alt-text="Screenshot of the Overview section for a pipeline in the new Monitoring hub." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/pipeline-overview.png":::

### Review the last run

The **Last run details** section shows the following information about the most recent pipeline execution:

- Run ID
- Job type
- Status
- Start time
- End time
- Duration
- Activities
- Advanced details

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/last-run-details.png" alt-text="Screenshot of the Last run details section for a pipeline." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/last-run-details.png":::

From this view, you can refresh the run information, retry a run, or cancel an active run. You can also view pipeline activities as a table or a Gantt chart.

## View pipeline run history in the new Monitoring hub

Select **Run history** to view previous executions for a pipeline.

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/run-history.png" alt-text="Screenshot of the Run history section for a pipeline." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/run-history.png":::

Use run history to review execution outcomes over time, investigate failed runs, and open detailed information for a specific execution.

To inspect a run:

1. Open the **Run history** tab.
1. Hover over the run ID that you want to inspect.
1. Select the run ID link.

   :::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/select-run-id.png" alt-text="Screenshot of a run ID link in pipeline run history." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/select-run-id.png":::

The run details page shows execution and troubleshooting information for the selected run.

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/pipeline-run-details.png" alt-text="Screenshot of the details page for a pipeline run." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/pipeline-run-details.png":::

## Rerun a pipeline in the new Monitoring hub

From the run details page, you can rerun the entire pipeline, only failed activities, or selected activities.

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/rerun-pipeline.png" alt-text="Screenshot of rerun options on the pipeline run details page." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/rerun-pipeline.png":::

## View pipeline execution relationships in the new Monitoring hub

You can view upstream and downstream execution information from the pipeline run details instead of the main Monitoring hub table.

:::image type="content" source="media/monitor-pipeline-runs-new-monitoring-hub/upstream-downstream-runs.png" alt-text="Screenshot of upstream and downstream runs for a pipeline execution." lightbox="media/monitor-pipeline-runs-new-monitoring-hub/upstream-downstream-runs.png":::

From a pipeline run, you can view:

- **Upstream runs** that initiated the workload.
- **Downstream runs** that the workload triggered.

Use these relationships to understand execution flow across dependent workloads and troubleshoot issues that span multiple executions.

## Related content

- [Create alerts for pipeline runs](create-alerts-for-pipeline-runs.md)
- [Choose how to monitor pipeline runs in Fabric Data Factory](monitor-pipeline-runs.md)
- [Operations agent for pipelines (preview)](operations-agent-for-pipelines.md)
- [Monitor pipeline runs in the legacy Monitoring hub](monitoring-hub-pipeline-runs.md)
