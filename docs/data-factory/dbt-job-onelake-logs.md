---
title: Access Complete dbt Job Logs with OneLake
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
1. [From the Output tab, select Output to download the dbt-output-<run_id>.json file](#download-the-outputjson-file)
1. [Find the logs in OneLake Explorer](#find-the-logs-in-onelake-explorer)

### Run a dbt command

Run any dbt command from the dbt job UI, for example:

- `dbt run`
- `dbt test`
- `dbt build`

Fabric generates execution logs after the command completes.

### Download the output.json file

1. After the dbt job completes, download the `dbt-output-<run_id>.json` file from the run by selecting the **Output** button.

   :::image type="content" source="media/dbt-job-onelake-logs/download-selector.png" alt-text="Screenshot of the download option for the output.json file in Microsoft Fabric.":::

1. Open the file to view run metadata, including the paths to full logs stored in OneLake (under the `detailed_monitoring_output_path` field).
   
    :::image type="content" source="media/dbt-job-onelake-logs/output-file.png" alt-text="Screenshot of a log file in OneLake Explorer.":::

### Find the logs in OneLake Explorer

1. Open **OneLake Explorer**.
1. Navigate to the log paths listed in `dbt-output-<run_id>.json` under `detailed_monitoring_output_path`. For example: `OneLake/WorkspaceName/detailed_monitoring_output_path/Output/cccc2222-dd33-4444-55ee-666666ffffff` contains the complete logs.
1. Open the log files to view the complete, untruncated output for the dbt job run.

   :::image type="content" source="media/dbt-job-onelake-logs/file-location.png" alt-text="Screenshot of OneLake Explorer showing the location of full dbt log files.":::

## Known limitations

- To ensure optimal application performance and prevent browser slowdowns or crashes, the app enforces a 10 MB size limit for rendering lineage views and output tables. For results exceeding this limit, you need to check the full output log results in OneLake. Use `dbt-output-<run_id>.json` to locate and access them in OneLake. Full results remain accessible through the dbt job UX, which doesn't impose a size restriction.

## Related content

- [Run dbt jobs from GitHub](dbt-run-github.md)
- [dbt jobs in Fabric](dbt-job-overview.md)
