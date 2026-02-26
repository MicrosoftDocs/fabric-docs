---
title: How to create a new dbt job in Microsoft Fabric (preview)
description: This article guides you through how to create a dbt job, execute it, and view the results.
ms.reviewer: akurnala
ms.topic: how-to
ms.date: 11/20/2025
ms.search.form: dbt-job-tutorials
---

# Learn how to create a new dbt job in Microsoft Fabric (preview)

Fabric now lets you transform data in your Data Warehouses by using dbt—all within the Fabric web experience. No external adapters, no CLI, no Airflow. Just SQL, a warehouse, and a streamlined UI.

This walkthrough demonstrates how to use dbt directly within Fabric to transform data in a warehouse—without external tools. This approach minimizes setup complexity and enables users to use existing compute resources. As a result, dbt jobs make enterprise-scale data modeling more accessible to the SQL community.

This tool is designed to help data engineers and analysts:

- Import a Sample Data Warehouse in Fabric
- Transform your data with dbt items
- Run and validate your models—all natively in Fabric.

## Prerequisites

Before you create a dbt job in Fabric, make sure your environment is set up correctly:

- [Enable dbt jobs](dbt-job-overview.md#how-to-enable-dbt-jobs-preview)
- [Create a workspace](/fabric/fundamentals/create-workspaces) if you don't have one.
- [Set up a Fabric Data Warehouse](/fabric/data-warehouse/create-warehouse) if you don't have one.
- [Set permissions and access](dbt-job-overview.md#required-permissions-and-access)

## Supported commands

Fabric supports the following core dbt commands directly from the dbt job interface.

[!INCLUDE [Supported commands for dbt jobs](includes/dbt-job-supported-commands.md)]

You can also selectively run or exclude specific models by using [selectors](dbt-job-configure.md#advanced-selector-configuration).

## Create a dbt job

Start building transformations by creating a dbt job item in your Fabric workspace.

1. Go to your Fabric workspace.
1. Select **+New item**, then search for and select **dbt job** from the item creation menu.
1. Enter a name and select a location.

   :::image type="content" source="media/dbt-job/create-job.png" alt-text="Screenshot of the Fabric UI with the create job dialog." lightbox="media/dbt-job/create-job.png":::

1. Choose the target Fabric Data Warehouse connection.
1. Configure job parameters and save the new dbt job item.
1. Open the dbt job to view its file structure, configure settings, and run dbt commands directly from the Fabric UI.

   :::image type="content" source="media/dbt-job/landing-page.png" alt-text="Screenshot of the Fabric UI with landing page of dbt job." lightbox="media/dbt-job/landing-page.png":::

## Schedule dbt jobs

Automate dbt job runs by using the built-in schedule feature to refresh models, run tests, or keep data pipelines up to date.

1. Open your dbt job in Fabric.
1. Select the **Schedule** tab in the top panel.
1. Select **Add schedule** to configure a new scheduled run.
    - **Repeat**: Choose how often to run the job (for example, by the minute, hourly, daily, weekly).
    - **Interval**: Set the frequency (for example, every 15 minutes).
    - **Start date and time**: When the schedule should begin.
    - **End date and time**: (Optional) When the schedule should stop.
    - **Time zone**: Select your preferred time zone for scheduling.
1. Select **Save** to activate the schedule.

    :::image type="content" source="media/dbt-job/schedule-dbt.png" alt-text="Screenshot of the Fabric UI with the dbt job schedule settings." lightbox="media/dbt-job/schedule-dbt.png":::

## Monitor dbt jobs

Fabric provides several tools to help you monitor and validate your dbt jobs:

### Visual aids

- **Lineage View**: Generates a dependency graph of your models, showing how data flows between sources and transformations.

    :::image type="content" source="media/dbt-job/lineage-view.png" alt-text="Screenshot showing the lineage view in the bottom panel.":::

- **Compiled SQL View**: Displays the rendered SQL code that dbt runs, so you can debug or optimize queries.

    :::image type="content" source="media/dbt-job/compiled-sql.png" alt-text="Screenshot showing the compiled SQL in the bottom panel.":::

- **Run Results Panel**: Shows model-level success, failure, and execution time for each dbt command.

    :::image type="content" source="media/dbt-job/run-success.png" alt-text="Screenshot showing a successful build command execution.":::

### Monitoring and troubleshooting

- **Run Summary**: Shows the total models run, runtime, and success status.
- **Error Logs**: Provide stack traces and query payloads for troubleshooting.

    :::image type="content" source="media/dbt-job/error-logs.png" alt-text="Screenshot of the error logs available for troubleshooting.":::

- **Download Logs**: Export detailed logs or payloads for offline analysis.

    :::image type="content" source="media/dbt-job/download-logs.png" alt-text="Screenshot of the drop-down button to download logs for offline analysis.":::

## Best practices

- Keep your models modular and test-driven for easier debugging and faster runs.
- To optimize performance, avoid long dependency chains and use well-partitioned transformations.

## Related content

* [dbt job in Microsoft Fabric overview](dbt-job-overview.md)
* [Step-by-step dbt job tutorial](dbt-job-how-to.md)
* [How to configure a dbt job](dbt-job-configure.md)
