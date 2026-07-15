---
title: Refresh Materialized Lake View Activity in Fabric Data Factory Pipelines
description: Learn how to use the Refresh Materialized Lake View activity in Microsoft Fabric Data Factory to keep materialized lake views up to date as part of pipeline workflows.
ms.reviewer: noelleli
ms.topic: how-to
ms.custom: pipelines
ms.date: 05/05/2026
ai-usage: ai-assisted
---

# Refresh Materialized Lake View activity in Fabric Data Factory pipelines

The Refresh Materialized Lake View activity refreshes a [materialized lake view](/fabric/data-engineering/materialized-lake-views/overview-materialized-lake-view) as part of a Fabric pipeline. Materialized lake views are precomputed, cached result sets stored in a Lakehouse that speed up downstream queries. Use this activity to keep cached results in sync with your source data after ingestion, transformation, or maintenance operations.

Use the Refresh Materialized Lake View activity when you want to:

- Refresh a materialized lake view on demand or on a schedule.
- Refresh views after upstream activities like Copy, Notebook, or Lakehouse Maintenance.
- Include lake view refreshes in end-to-end pipeline orchestration.

## Prerequisites

Before you start, make sure you have:

- A [Microsoft Fabric workspace](/fabric/fundamentals/create-workspaces)
- A [Lakehouse](/fabric/data-engineering/create-lakehouse) in the target workspace
- A [materialized lake view](/fabric/data-engineering/materialized-lake-views/create-materialized-lake-view) in the Lakehouse
- [Permission to access the workspace and the Lakehouse](/fabric/data-engineering/lakehouse-sharing)
- A [pipeline](pipeline-overview.md) with access to the Lakehouse through the selected connection

## Add the refresh materialized lake view activity to a pipeline

1. Create a new pipeline or open an existing one.
1. Search for **Refresh Materialized Lake View** in the **Activities** pane and select it to add it to the canvas.

   :::image type="content" source="media/refresh-materialized-lake-view-activity/refresh-materialized-lake-view-activities.png" alt-text="Screenshot of the pipeline Activities pane with the Refresh Materialized Lake View activity highlighted." lightbox="media/refresh-materialized-lake-view-activity/refresh-materialized-lake-view-activities.png":::

1. Select the activity on the canvas.

   :::image type="content" source="media/refresh-materialized-lake-view-activity/refresh-materialized-lake-view-on-canvas.png" alt-text="Screenshot of the Refresh Materialized Lake View activity on the pipeline canvas." lightbox="media/refresh-materialized-lake-view-activity/refresh-materialized-lake-view-on-canvas.png":::

1. On the **General** tab, configure the activity name and other general settings. For guidance, see [General settings](activity-overview.md#general-settings).

## Configure refresh materialized lake view settings

On the **Settings** tab:

1. Select an existing **Connection** from the dropdown, or create a new one.
1. Select the **Workspace** that contains the Lakehouse.
1. Select the **Lakehouse** that contains the materialized lake view you want to refresh.

:::image type="content" source="media/refresh-materialized-lake-view-activity/refresh-materialized-lake-view-settings.png" alt-text="Screenshot of the Refresh Materialized Lake View activity settings." lightbox="media/refresh-materialized-lake-view-activity/refresh-materialized-lake-view-settings.png":::

## Common scenarios

### Refresh after ingestion

Add the Refresh Materialized Lake View activity after a Copy activity so that your analytics reflect the latest data.

:::image type="content" source="media/refresh-materialized-lake-view-activity/refresh-materialized-lake-view-copy-job.png" alt-text="Screenshot of a pipeline with a Copy activity followed by a Refresh Materialized Lake View activity.":::

### Scheduled refresh

Run the activity on a schedule to keep lake views current without manual steps.

:::image type="content" source="media/refresh-materialized-lake-view-activity/refresh-materialized-lake-view-schedule.png" alt-text="Screenshot of a scheduled pipeline that includes a Refresh Materialized Lake View activity." lightbox="media/refresh-materialized-lake-view-activity/refresh-materialized-lake-view-schedule.png":::

### End-to-end orchestration

Include the activity in a broader pipeline that ingests, transforms, and publishes data. Place the refresh step after upstream data operations so materialized lake views always reflect the most recent data.

## Known limitations

- The Refresh Materialized Lake View activity doesn't currently support service principal name (SPN) or workspace identity authentication. If you use SPN or workspace identity for automated or service-based access, you might encounter limitations when configuring or running this activity.
- The Refresh Materialized Lake View activity currently refreshes all MLVs in a selected lakehouse. Selective refresh of an individual MLV isn't yet supported.

## Related content

- [Activity overview](activity-overview.md)
- [Lakehouse Maintenance activity](lakehouse-maintenance-activity.md)
- [Refresh SQL Endpoint activity](refresh-sql-endpoint-activity.md)
- [Materialized lake views overview](/fabric/data-engineering/materialized-lake-views/overview-materialized-lake-view)
- [Refresh materialized lake views in a Lakehouse](/fabric/data-engineering/materialized-lake-views/refresh-materialized-lake-view)
