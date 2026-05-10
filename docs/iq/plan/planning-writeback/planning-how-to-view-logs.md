---
title: View and analyze writeback logs
description: Learn how to filter, view, and analyze writeback execution logs to monitor status and troubleshoot errors.
ms.date: 05/04/2026
ms.topic: how-to
#customer intent: As a user, I want to view, filter, and analyze execution logs to track writeback operations and troubleshoot issues.
---

# View Logs

Plan provides writeback logging as soon as you start a writeback operation. You can review logs from **Logs** under the **Writeback** tab.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

:::image type="content" source="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-menu.png" alt-text="The Logs button highlighted within the Writeback ribbon tab" lightbox="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-menu.png":::

## Filter writeback logs

### Search logs

Use the search bar to find logs by **ID**.

:::image type="content" source="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-filter by-status.jpg" alt-text="The writeback logs table showing the search bar used for finding logs by ID" lightbox="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-filter-by-status.jpg":::

### Filter by status

Select **Status** to filter logs by the execution state of the writeback operation. You can filter by **Success**, **Failed**, **Running**, and **Cancelled**. Multiple statuses can be selected simultaneously.

* **Success** - If you select this option, the logs are filtered to show only writeback processes that completed without errors.
* **Failed** - Selecting this option filters the logs to display writeback processes that encountered an error and didn't complete successfully.
* **Running** - This option filters the logs to show writeback processes that are currently executing.
* **Cancelled** - If you select this option, the log display writeback processes that were explicitly stopped or aborted before completion.

:::image type="content" source="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-status.jpg" alt-text="Interface showing the writeback log status filter menu with multiple execution states selected" lightbox="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-status.jpg":::

### Filter by time

Select **Created At** to filter logs by when writeback started. You can filter by **Within the last**, **Last 7 days**, **Last 30 days**, and **Between**.

:::image type="content" source="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-filter-by-time.jpg" alt-text="The 'Created At' filter dropdown menu in the writeback logs interface, showing options to filter by specific time ranges" lightbox="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-filter-by-time.jpg":::

* **Within the last** - If you select this option, you can specify the number of hours, minutes, or seconds. The logs are fetched if the writeback start time falls within this period.
* **Last 7 days** - Selecting this option filters the logs within the last 7 days
* **Last 30 days** - This option filters the logs that were created in the last 30 days.
* **Between** - If you select this option, then you can specify the starting and ending date within which you can filter your writeback logs.

:::image type="content" source="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-filter-by-time-between.jpg" alt-text="The 'Between' time filter interface showing a calendar date picker used to specify a custom start and end date range for logs" lightbox="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-filter-by-time-between.jpg":::

### Reset filter

Select **Reset Filter** to clear all applied filters.

:::image type="content" source="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-reset-filter.png" alt-text="The Reset Filter button highlighted in the writeback logs toolbar, used to clear all active filters" lightbox="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-reset-filter.png":::

## Analyze writeback logs

The writeback logs console displays a list of log columns that help you identify and analyze each writeback.

:::image type="content" source="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-analyze.jpg" alt-text="A comprehensive view of the writeback logs table, showing columns for ID, Duration, Status, Created At, and Started By" lightbox="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-analyze.jpg":::

### ID

Displays the unique identifier for each writeback. You can sort this column in ascending or descending order. Selecting the **ID** opens a detailed summary of the writeback. The **General** tab includes the summary, and status.

:::image type="content" source="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-general.jpg" alt-text="The General tab of the writeback logs detail pane, showing specific execution data like the ID, status, and event source" lightbox="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-general.jpg":::

The details pane provides the following information:

* **Writeback Execution ID** - The unique system generated identifier for this specific writeback operation.
* **Event source** - The specific action or trigger that initiated the operation (for example, Writeback).
* **Work Sheet Name** - The name of the report or worksheet from which the data originated.
* **Scenario Name** - The specific planning scenario associated with the data being written (for example, Base).
* **Series/Measure** - The specific data points, calculations, or measures included in the writeback payload (for example, Sum of Actuals, Sum of Plan).
* **Incoming Cell Count** - The total number of individual data cells passed from the source to the writeback engine.
* **Created At** - The exact date and timestamp when the writeback request was registered by the system.
* **Started At** - The exact date and timestamp when the processing engine began executing the request.
* **Status** - The overall outcome of the execution process (for example, Success, Failed).
* **Duration** - The total time elapsed from the start to the completion of the writeback operation.
* **Writeback Filter** - The specific data filtering criteria applied to the payload before committing it to the destination (for example, Calculated rows only).
* **Writeback Type** - The structural format used to write the data to the destination (for example, Long).
* **Started By** - The user account that initiated the writeback process.
* **Updated By** - The user account responsible for the most recent update to the process state.

Select Fabric SQL to view the configuration, connection details, and execution outcome of the writeback operation specific to your Microsoft Fabric SQL database destination.

:::image type="content" source="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-fabric-sql.png" alt-text="The Fabric SQL destination details view within the writeback logs, showing connection properties and execution outcomes" lightbox="../media/planning-writeback/planning-how-to-view-logs/writeback-logs-fabric-sql.png":::

Select the specific destination table entry (for example, Sales\_Plan\_Writeback\_12) to view detailed connection properties and execution metrics for that specific Microsoft Fabric SQL database target.

The details pane provides the following information:

* **Type** - Identifies the destination platform (Fabric SQL).
* **Host** - The server endpoint URL used to establish the connection to your Fabric environment.
* **Database Name** - The target database for the writeback execution.
* **Schema** - The database schema containing the target table.
* **Table Name** - The exact table designated to receive the writeback data.
* **No. of rows** - The total number of rows successfully written to the destination table during this operation.
* **Status** - Indicates whether the writeback operation to this specific destination succeeded or failed.

### Duration

Displays the total time taken to complete the writeback.

### Status

Indicates whether the writeback succeeded or failed. This column can be sorted alphabetically.

### Created at

Displays the date and time when the writeback was initiated. You can sort this column chronologically.

### Started by

Displays the user who started the writeback. You can sort this column alphabetically.

### Scenarios

Displays the scenarios included in the writeback. If no scenario was written back, the console shows **Base**.

### Incoming Cell Count

Displays the number of cells written back from the report.

### Event

Displays the type of log entry, such as Writeback or Reset.

### Writeback Type

Displays the format used for the writeback, such as Long.
