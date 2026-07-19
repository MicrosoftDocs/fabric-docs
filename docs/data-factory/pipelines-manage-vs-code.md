---
title: Manage Pipelines in Microsoft Fabric from Visual Studio Code
description: Create, run, and monitor Fabric pipelines from Visual Studio Code using the DataFactory MCP server with GitHub Copilot.
author: makromer
ms.author: makromer
ms.topic: tutorial
ms.date: 06/08/2026
ms.subservice: data-factory
ms.custom: build-2026
ai-usage: ai-assisted
---

# Manage pipelines in Microsoft Fabric from Visual Studio Code

You can create, configure, run, and monitor pipelines in Microsoft Fabric directly from Visual Studio Code (VS Code). The Microsoft DataFactory Model Context Protocol (MCP) server and GitHub Copilot let you build and orchestrate data pipelines from a single development environment without switching to the Fabric portal.

In this article, you learn how to:

- Set up the DataFactory MCP server in VS Code with pipeline tools enabled
- Create a pipeline item in a Fabric workspace
- Define pipeline activities using natural language
- Run a Fabric pipeline on demand
- Monitor Fabric pipeline run status
- Schedule a Fabric pipeline to run on a recurring basis
- List and update pipelines in a Fabric workspace

## Prerequisites

- Visual Studio Code with the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension installed.
- .NET 10.0 SDK or later installed on your machine, required to install the DataFactory MCP server as a global .NET tool. Download it from [dot.net](https://dot.net).
- A [Microsoft Fabric workspace](../fundamentals/create-workspaces.md) with an assigned capacity (Free and Premium Per User workspaces aren't supported for pipeline execution).
- Permissions to create and run items in the Fabric workspace.

## Install the DataFactory MCP server

The DataFactory MCP server exposes Fabric Data Factory operations as tools that GitHub Copilot can call. Pipeline management is a preview feature that requires the `--pipeline` flag in your server configuration.

1. Install the `Microsoft.DataFactory.MCP` package as a global .NET tool:

   ```bash
   dotnet tool install --global Microsoft.DataFactory.MCP
   ```

1. Open or create `.vscode/mcp.json` at the root of your VS Code workspace and add the following configuration. The `--pipeline` argument enables the pipeline management tools.

   ```json
   {
     "servers": {
       "datafactory": {
         "type": "stdio",
         "command": "datafactorymcp",
         "args": ["--pipeline"]
       }
     }
   }
   ```

   > [!IMPORTANT]  
   > Without the `--pipeline` flag, the pipeline management tools don't appear in Copilot's tool list. Authentication, Fabric workspace, connection, and dataflow tools are always available and don't require a flag.

1. Reload VS Code (`Ctrl+Shift+P` > **Developer: Reload Window**) so Copilot recognizes the new server.

## Authenticate to Microsoft Fabric

Before calling any Fabric API through the MCP server, authenticate with your Microsoft Entra ID account.

1. Open GitHub Copilot Chat (`Ctrl+Shift+I`) and make sure Agent Mode is active (the toggle at the top of the Copilot Chat panel that enables tool use).

1. Ask Copilot to authenticate:

   > Authenticate to my Fabric account.

   Copilot calls `mcp_datafactorymc_authenticate_interactive`, which opens a browser tab for Microsoft Entra ID sign-in. Sign in with the account that has permissions in your Fabric workspace.

1. After sign-in succeeds, Copilot confirms the authentication. Copilot reuses your cached token for every subsequent tool call in the session.

## Create a pipeline

1. In Copilot Chat, describe the pipeline you want to create. For example:

   > Create a pipeline called 'Daily Sales Ingest' in my Fabric workspace for loading daily sales data into a Lakehouse.

   Copilot calls `mcp_datafactorymc_list_workspaces` to resolve your Fabric workspace ID, then calls `mcp_datafactorymc_create_pipeline` and returns the new pipeline's ID and metadata.

   > [!TIP]  
   > If you have multiple Fabric workspaces, include the workspace name in your prompt, or ask Copilot to list them first: *"List my Fabric workspaces."*

1. Follow-up prompts in the same conversation automatically use the returned pipeline ID.

## Define pipeline activities

Once you have a pipeline item in your Fabric workspace, you can add activity definitions to it. Pipeline definitions are JSON objects that describe activities, data flow, and control logic. You can describe the intent in natural language and let Copilot construct the payload. The following operations can be performed in any order.

1. Ask Copilot to define the pipeline's activities:

   > Update the definition of my 'Daily Sales Ingest' pipeline to include a Copy Activity that reads from an Azure Blob Storage source named 'SalesBlob' and writes to a Lakehouse destination named 'SalesLakehouse'.

   Copilot calls `mcp_datafactorymc_update_pipeline_definition` with a JSON definition for the activity. The MCP server validates and submits the definition to the Fabric API.

1. To add control flow between activities:

   > Update my 'Daily Sales Ingest' pipeline to run a Stored Procedure activity first to truncate the staging table, then run the Copy Activity only if the stored procedure succeeds.

1. To review the current definition at any time:

   > Get the definition for my 'Daily Sales Ingest' pipeline and summarize the activities.

   Copilot calls `mcp_datafactorymc_get_pipeline_definition` and returns the activity graph in a readable summary.

## Run a Fabric pipeline on demand from VS Code

Trigger an on-demand pipeline run directly from Copilot Chat.

1. Ask Copilot to run the pipeline:

   > Run my 'Daily Sales Ingest' pipeline now.

   Copilot calls `mcp_datafactorymc_run_pipeline` and returns a run ID that you can reference when checking status.

### Pass runtime parameters

To pass parameter values when triggering a run:

> Run my 'Daily Sales Ingest' pipeline with the parameter sourceDate set to 2026-06-07.

Copilot includes the parameter values in the run request payload.

## Monitor Fabric pipeline run status from VS Code

You can check the progress of any pipeline runs in your Fabric workspace directly from VS Code.

1. Ask Copilot for the run status:

   > What's the status of my last 'Daily Sales Ingest' pipeline run?

   Copilot calls `mcp_datafactorymc_get_pipeline_run_status` and returns the current state (queued, running, succeeded, or failed), elapsed duration, and any error messages.

1. To diagnose a failure:

   > My 'Daily Sales Ingest' pipeline run failed. What went wrong?

   Copilot retrieves the run status with activity-level error details and summarizes the root cause.

## Schedule a Fabric pipeline

Create a recurring schedule so the pipeline runs automatically.

1. Describe the schedule to Copilot:

   > Schedule my 'Daily Sales Ingest' pipeline to run every day at 2:00 AM UTC.

   Copilot calls `mcp_datafactorymc_create_pipeline_schedule` with a recurrence definition. Fabric saves the schedule in your Fabric workspace.

1. To review existing schedules:

   > List all schedules for my 'Daily Sales Ingest' pipeline.

   Copilot calls `mcp_datafactorymc_list_pipeline_schedules` and returns each schedule's recurrence pattern, next run time, and enabled status.

## List all pipelines in a Fabric workspace

To audit the pipelines in a Fabric workspace:

> List all pipelines in my Fabric workspace.

Copilot calls `mcp_datafactorymc_list_pipelines`, which returns paginated results including each pipeline's ID, display name, description, and last-modified time. When more results are available, Copilot handles the continuation token and retrieves the full list automatically.

## Update pipeline metadata

Update pipeline metadata in your Fabric workspace using natural language prompts.

### Update display name or description

> Rename my 'Daily Sales Ingest' pipeline to 'Daily Sales Load' and update its description to 'Loads daily sales data from Azure Blob Storage into the Sales Lakehouse'.

Copilot calls `mcp_datafactorymc_update_pipeline` with the new display name and description.

### Retrieve metadata for a specific pipeline

> Get the details for my 'Daily Sales Load' pipeline.

Copilot calls `mcp_datafactorymc_get_pipeline` and returns the pipeline's current metadata, including its Fabric workspace location, description, and timestamps.

> [!NOTE]
> Pipeline deletion and schedule modification aren't available through the MCP server. Use the [Fabric portal](https://app.fabric.microsoft.com) to delete pipelines or update existing schedules.

## Available MCP tools reference

All pipeline tools share the `mcp_datafactorymc_` prefix and call the [Fabric REST API](/rest/api/fabric/datapipeline/items) at `https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/pipelines`. Pipeline tools require the `--pipeline` feature flag in your MCP server configuration.

| Tool | Description |
| --- | --- |
| `mcp_datafactorymc_list_pipelines` | List all pipeline items in a Fabric workspace (paginated) |
| `mcp_datafactorymc_create_pipeline` | Create a new pipeline item |
| `mcp_datafactorymc_get_pipeline` | Retrieve metadata for a pipeline |
| `mcp_datafactorymc_update_pipeline` | Update the display name or description |
| `mcp_datafactorymc_get_pipeline_definition` | Read the current pipeline activity definition |
| `mcp_datafactorymc_update_pipeline_definition` | Push a new or updated pipeline activity definition |
| `mcp_datafactorymc_run_pipeline` | Trigger an on-demand run with optional parameters |
| `mcp_datafactorymc_get_pipeline_run_status` | Check the status and results of a pipeline run |
| `mcp_datafactorymc_create_pipeline_schedule` | Create a recurring scheduled trigger for a pipeline |
| `mcp_datafactorymc_list_pipeline_schedules` | List all schedules for a pipeline |

## Related content

- [Introduction to Data Factory in Microsoft Fabric](data-factory-overview.md)
- [Activity overview in Microsoft Fabric](activity-overview.md)
- [Pipeline runs and monitoring in Microsoft Fabric](monitor-pipeline-runs.md)
- [Manage Apache Airflow Jobs from Visual Studio Code](apache-airflow-jobs-manage-vs-code.md)
- [DataFactory MCP server on GitHub](https://github.com/microsoft/DataFactory.MCP)
