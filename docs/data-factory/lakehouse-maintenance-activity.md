---
title: Optimize Lakehouse Tables With Lakehouse Maintenance Activity
description: Learn how to use the Lakehouse Maintenance activity in Microsoft Fabric pipelines to optimize Delta tables, remove obsolete files, and improve query performance.
ms.date: 02/17/2026
ms.topic: how-to
---

# Lakehouse maintenance activity

The Lakehouse Maintenance activity allows you to run maintenance operations on tables stored in a Fabric Lakehouse to prepare, clean up, or optimize data after ingestion or transformation steps. You can:

- Compact small files to improve query performance
- Remove obsolete files that are no longer needed
- Schedule regular maintenance as part of a pipeline

This helps keep Delta tables performant and cost‑efficient by automating maintenance operations such as Optimize and Vacuum as part of your orchestration workflows. Use this activity alongside other pipeline activities, such as Copy, Notebook, or Dataflow activities. 

## Prerequisites

To use the Lakehouse Maintenance activity, you must have:

- A tenant account with an active subscription. [Create an account for free](/fabric/fundamentals/fabric-trial).
- A [workspace](/fabric/fundamentals/create-workspaces) with a [Lakehouse](/fabric/data-engineering/create-lakehouse)
- [Permission to access and modify the Lakehouse](/fabric/data-engineering/lakehouse-sharing#managing-permissions)

## Add a Lakehouse Maintenance activity to your pipeline by using the UI

To use a Lakehouse Maintenance activity in a pipeline, complete the following steps:

1. [Create the lakehouse maintenance activity](#create-the-activity)
1. [Configure the activity settings](#lakehouse-maintenance-activity-settings)
1. [Save and run or schedule the pipeline](#save-and-run-or-schedule-the-pipeline)

### Create the activity

1. [Create a new pipeline](create-first-pipeline-with-sample-data.md#create-a-pipeline) in your workspace.  

1. Search for **Lakehouse Maintenance** in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

    :::image type="content" source="media/lakehouse-maintenance-activity/lakehouse-maintenance-activities.png" alt-text="Screenshot of the Lakehouse Maintenance activity in the pipeline Activities pane." lightbox="media/lakehouse-maintenance-activity/lakehouse-maintenance-activities.png":::

1. Select the new **Lakehouse Maintenance** activity on the canvas if it isn't already selected.

    :::image type="content" source="media/lakehouse-maintenance-activity/lakehouse-maintenance-canvas.png" alt-text="Screenshot of the Lakehouse Maintenance activity selected on the pipeline canvas." lightbox="media/lakehouse-maintenance-activity/lakehouse-maintenance-canvas.png":::

1. Refer to the [**General** settings](/fabric/data-factory/activity-overview#general-settings) guidance to configure the **General** settings tab.

### Lakehouse Maintenance activity settings

1. Select the **Settings** tab to configure the activity.

1. Configure connection by selecting an existing connection from the **Connection** dropdown, or creating a new connection, and specifying its configuration details.

1. Specify the **Lakehouse** that contains the tables you want to maintain.

1. Define which tables to include in the maintenance operation.

    Optionally, you can add a **Schema name** if it exists in your Lakehouse. The schema that contains the target tables.

    The **Table name** is the table you wish to maintain. You can specify multiple tables if desired.

    :::image type="content" source="media/lakehouse-maintenance-activity/lakehouse-maintenance-settings.png" alt-text="Screenshot of the Lakehouse Maintenance activity settings tab." lightbox="media/lakehouse-maintenance-activity/lakehouse-maintenance-settings.png":::

1. Choose the maintenance operation to perform on the selected tables.

    **Optimize:** Compacts small files within the table to improve query performance and reduce file fragmentation.

    Use Optimize after large ingestion or transformation workloads.

   **Vacuum:** Removes obsolete data files that the table no longer references.

    Vacuum helps reclaim storage space and keep the Lakehouse clean.

    > [!NOTE]
    > When using Vacuum, ensure your retention policy aligns with data recovery, time travel, and downstream processing requirements.

### Save and run or schedule the pipeline

[!INCLUDE[save-run-schedule-pipeline](includes/save-run-schedule-pipeline.md)]

## Lakehouse Maintenance activity behavior

- The Lakehouse Maintenance activity runs synchronously within the pipeline.
- The activity completes only after the maintenance operation finishes.
- If maintenance fails for a table, the activity returns a failure status.
- You can use pipeline success or failure conditions to control downstream activities.

## Common scenarios

**Post‑ingestion optimization:** Run Optimize after Copy or Notebook activities to improve query performance.

**Scheduled cleanup:** Schedule periodic Vacuum operations to remove obsolete files.

**Governed maintenance workflows:** Combine Lakehouse Maintenance with Approval or conditional activities to enforce operational checks before running maintenance.

## Known issues

- The Lakehouse Maintenance activity doesn't support maintenance on Lakehouses with schemas enabled yet.

## Related content

- [Delta table maintenance in Microsoft Fabric](/fabric/data-engineering/lakehouse-table-maintenance)
