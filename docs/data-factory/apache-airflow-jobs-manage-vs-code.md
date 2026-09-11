---
title: Manage Apache Airflow Jobs in Microsoft Fabric from Visual Studio Code
description: Create, configure, and monitor Apache Airflow jobs in Microsoft Fabric from VS Code using the Data Factory MCP server with GitHub Copilot.
author: makromer
ms.author: makromer
ms.topic: how-to
ms.date: 06/01/2026
ms.service: fabric
ms.subservice: data-factory
ms.custom: build-2026
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
---

# Manage Apache Airflow jobs in Microsoft Fabric from Visual Studio Code

You can create, configure, and monitor Apache Airflow jobs in Microsoft Fabric directly from Visual Studio Code (VS Code) using the Microsoft Data Factory Model Context Protocol (MCP) server with GitHub Copilot. This approach lets you manage the full Airflow job lifecycle from a single environment without switching to the Fabric portal.

In this article, you learn how to:

- Set up the Data Factory MCP server in VS Code
- Authenticate to Fabric
- Create an Apache Airflow job item in a Fabric workspace
- Push a DAG definition to the job
- Inspect and monitor job runs
- List, update, and delete Airflow jobs
- Reference available MCP tools for Airflow job management

## Prerequisites

- Visual Studio Code with the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) installed.
- The `Microsoft.DataFactory.MCP` NuGet package requires .NET 10.0 or later.
- A Fabric workspace with an assigned capacity. Free and Premium Per User (PPU) workspaces don't support Apache Airflow jobs.
- Permissions to create items in your Fabric workspace.

## Install the Data Factory MCP server

The Data Factory MCP server exposes Fabric Data Factory operations, including Airflow job management, as tools that GitHub Copilot can call.

1. Install the `Microsoft.DataFactory.MCP` NuGet package as a .NET tool:

   ```bash
   dotnet tool install --global Microsoft.DataFactory.MCP
   ```

1. Add the server to your VS Code MCP configuration. Open your `settings.json` or `.vscode/mcp.json` and add:

   ```json
   {
     "mcp": {
       "servers": {
         "datafactory": {
           "command": "datafactorymcp"
         }
       }
     }
   }
   ```

1. Reload VS Code for the server to appear in the GitHub Copilot tools list.

## Authenticate to Microsoft Fabric

Before you can call any Fabric API through the MCP server, you must authenticate.

1. Open GitHub Copilot chat in VS Code (Ctrl+Shift+I).
1. In the chat, ask Copilot to authenticate:

   > Authenticate to my Fabric account.

   Copilot invokes `mcp_datafactorymc_authenticate_interactive` and opens a browser tab for Microsoft Entra ID sign-in. Sign in with the account that has access to your Fabric workspace.

1. After sign-in succeeds, Copilot confirms the authentication. Every subsequent operation in the session uses your identity without re-prompting.

## Create an Apache Airflow job

1. In GitHub Copilot chat, describe the Airflow job you want to create:

   > Create an Airflow job called 'Daily ETL Pipeline' in my workspace for processing daily sales data.

   Copilot calls `mcp_datafactorymc_list_workspaces` to resolve your workspace ID, then calls `mcp_datafactorymc_create_airflow_job`. The response returns a job ID that you use for subsequent operations.

   > [!TIP]  
   > If you have multiple workspaces, specify the workspace name in your prompt, or ask Copilot to list your workspaces first: *"List my Fabric workspaces."*

1. Note the job ID returned in the response. Copilot uses it automatically in follow-up prompts within the same conversation.

## Push a DAG definition to the job

After you create the Airflow job in Fabric, push a DAG configuration to it using the Data Factory MCP server.

1. In GitHub Copilot chat, describe your configuration:

   > Update the definition of my Airflow job with a scheduler config that sets a 1-hour DAG timeout.

   Copilot calls `mcp_datafactorymc_update_airflow_job_definition` with the appropriate JSON payload. The MCP tool handles base64 encoding before the payload reaches the Fabric API.

1. To push a full DAG file, provide the DAG content directly in your prompt:

   > Update the definition of my 'Daily ETL Pipeline' job with this DAG: [paste DAG Python code]

1. To confirm the update, ask Copilot to retrieve the definition:

   > Get the definition for my 'Daily ETL Pipeline' Airflow job and explain the scheduler configuration.

   Copilot calls `mcp_datafactorymc_get_airflow_job_definition`, which fetches and auto-decodes the base64 payload into readable JSON.

## Monitor Airflow job runs

After you trigger a Fabric Airflow job run, use GitHub Copilot and the Data Factory MCP server to inspect the results without leaving VS Code.

1. To check the status of the most recent run:

   > What's the status of my 'Daily ETL Pipeline' Airflow job?

   Copilot calls `mcp_datafactorymc_get_airflow_job` and returns metadata including run status, last run time, and any errors.

1. To view the full job configuration:

   > Get the definition for my Airflow job and explain the scheduler configuration.

   Copilot summarizes the scheduler settings and flags any unusual configurations.

## List all Airflow jobs in a workspace

To audit what Airflow jobs are active in a workspace:

> List all Airflow jobs in my workspace and tell me which ones have a description.

Copilot calls `mcp_datafactorymc_list_airflow_jobs`, which returns paginated results. When more results are available, the response includes a continuation token, and Copilot handles the follow-up call to retrieve the complete list.

## Manage individual Airflow jobs

Update or remove an Airflow job using natural language prompts.

**Rename or update description:**

> Update my 'Daily ETL Pipeline' Airflow job to use the description 'Processes daily sales data from S3'.

Copilot calls `mcp_datafactorymc_update_airflow_job` with the new display name or description.

**Delete an Airflow job:**

> Delete my 'Daily ETL Pipeline' Airflow job and move it to the recycle bin.

Copilot calls `mcp_datafactorymc_delete_airflow_job`. Deleted items go to the Fabric workspace recycle bin and can be recovered within the retention period.

> [!IMPORTANT]  
> Permanent deletion bypasses the recycle bin and can't be undone. Use recycle bin deletion unless you're certain you no longer need the item.

## Available MCP tools reference

All Airflow job tools share the `mcp_datafactorymc_` prefix and call the Fabric REST API at `https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheAirflowJobs`.

| Tool | What it does |
| --- | --- |
| `mcp_datafactorymc_list_airflow_jobs` | List all Airflow jobs in a workspace (paginated) |
| `mcp_datafactorymc_create_airflow_job` | Create a new Airflow job item |
| `mcp_datafactorymc_get_airflow_job` | Retrieve metadata and status for a job |
| `mcp_datafactorymc_update_airflow_job` | Update the display name or description |
| `mcp_datafactorymc_delete_airflow_job` | Move to recycle bin or permanently delete |
| `mcp_datafactorymc_get_airflow_job_definition` | Read the current DAG and scheduler configuration |
| `mcp_datafactorymc_update_airflow_job_definition` | Push a new DAG or updated configuration |

## Related content

- [Create an Apache Airflow job](create-apache-airflow-jobs.md)
- [Tutorial: Run a Fabric item using Apache Airflow DAGs](apache-airflow-jobs-run-fabric-item-job.md)
- [Apache Airflow jobs concepts](apache-airflow-jobs-concepts.md)
- [Apache Airflow job workspace settings](apache-airflow-jobs-workspace-settings.md)
