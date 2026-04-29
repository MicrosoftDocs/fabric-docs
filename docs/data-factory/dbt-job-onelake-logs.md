---
title: Access complete dbt job logs with OneLake
description: Access full dbt logs in Microsoft Fabric with OneLake. Eliminate log truncation and simplify debugging for large dbt projects. Start troubleshooting today.
ms.reviewer: akurnala
ms.date: 04/20/2026
ai-usage: ai-assisted
ms.subservice: data-factory
ms.topic: how-to
---

# Access complete dbt job logs with OneLake

Your dbt logs are now stored directly in OneLake, so the full, untruncated logs for every run are available. Logging with OneLake removes the 1-MB download limit and ensures you can review complete execution details—including errors, warnings, and debug information—whenever needed.

## Prerequisites

- A [Microsoft Fabric workspace](/fabric/fundamentals/create-workspaces)
- A [dbt job item](dbt-job-how-to.md) in that workspace

## Access full dbt logs

To retrieve untruncated logs for a dbt job run, follow these steps:

1. [Run a dbt command](#run-a-dbt-command)
1. [Download the output.json file](#download-the-outputjson-file)
1. [Find the logs in OneLake Explorer](#find-the-logs-in-onelake-explorer)

### Run a dbt command

Run any dbt command from the dbt job UI, for example:

- `dbt run`
- `dbt test`
- `dbt build`

Fabric generates execution logs after the command completes.

### Download the output.json file

1. After the dbt job completes, download the `output.json` file from the run.

   :::image type="content" source="media/dbt-job-onelake-logs/download-selector.png" alt-text="Screenshot of the download option for the output.json file in Microsoft Fabric.":::

1. Open the file. It contains metadata about the run, including the paths where full logs are stored in OneLake.

### Find the logs in OneLake Explorer

1. Open **OneLake Explorer**.
1. Navigate to the log paths listed in `output.json` under the 'detailed_monitoring_output_path'.
1. Open the log files to view the complete, untruncated output for the dbt job run.

   :::image type="content" source="media/dbt-job-onelake-logs/file-location.png" alt-text="Screenshot of OneLake Explorer showing the location of full dbt log files.":::

   :::image type="content" source="media/dbt-job-onelake-logs/output-file.png" alt-text="Screenshot of a log file in OneLake Explorer.":::

## How OneLake logs dbt logs

When a dbt job runs:

1. Fabric executes the dbt command.
1. Logs are streamed and written to OneLake.
1. A reference to those log paths is added to `output.json`.

This process preserves the full log output regardless of size.

## Known limitations

- Currently, full logs aren't displayed directly in the dbt job UI. You need to use `output.json` to locate and access them in OneLake.

## Related content

- [Run dbt jobs from GitHub](dbt-run-github.md)
- [dbt jobs in Fabric](dbt-job-overview.md)
