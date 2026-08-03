---
title: Get Started with the Activator Remote MCP Server (Preview)
description: Learn how to set up a remote MCP server so that AI agents can interact with Activator by using natural language to create monitoring rules, manage alerts, and trigger actions.
ms.topic: get-started
ms.date: 07/08/2026
ms.search.form: MCP, RTI, AI, product-reflex
ms.reviewer: sharmaanshul; miquelmartin
ms.subservice: rti-eventhouse
ms.collection: ce-skilling-ai-copilot
ms.update-cycle: 90-days

#CustomerIntent: As an AI developer for Fabric Real-Time Intelligence, I want to use the Real-Time Intelligence MCP server to create AI agents and AI applications that use Activator and natural language to create monitoring rules, mange alerts, and trigger actions so that I can efficiently query and analyze real-time data.
---

# Get started with the remote MCP server for Activator (preview)

By using the remote Model Context Protocol (MCP) server for [Microsoft Fabric Activator](data-activator/activator-introduction.md), you can enable AI assistants to interact with Activator and create monitoring rules, manage alerts, and trigger actions—all through natural language.

To get started with using the remote MCP server for Activator, follow these steps:

1. Connect to the remote MCP server for Activator from Visual Studio Code or the GitHub Copilot CLI.  
1. Configure the MCP client with the server URL and authentication.
1. Use GitHub Copilot to create monitoring rules, manage alerts, and trigger actions by using natural language.
1. Validate the connection by using test prompts.

## Prerequisites

Before you set up and query the MCP server, make sure you have:

- [Visual Studio Code](https://code.visualstudio.com/Download).

- [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) in Visual Studio Code.

- A [data source connection](#data-source-connection).

- An Activator item created in the Fabric workspace.
  
  Note the Workspace and Activator artifact ID from the Fabric item URL for configuration. The URL format is `https://msit.powerbi.com/groups/<Workspace ID>/reflexes/<Artifact ID>/data/welcome?experience=power-bi&extensionScenario=openArtifact`.

## Authentication

The server uses OAuth. Your MCP client must be configured to acquire and pass a valid Microsoft Entra ID token. GitHub Copilot automatically supports this token handling.

## Connection to the Activator MCP server

The remote MCP server for Activator acts as an *HTTP-based MCP endpoint*.

### Server URL

```
https://api.fabric.microsoft.com/v1/mcp/workspaces/<Workspace ID>/reflexes/<Artifact ID>
```

| Parameter      | Description                                      |
| -------------- | ------------------------------------------------ |
| `Workspace ID` | The Fabric workspace ID (UUID)                   |
| `Artifact ID`  | The Activator artifact (reflex) ID (UUID)        |

### MCP client configuration

Add the definition for the remote MCP server for Activator to the configuration file for the MCP client (for example, `mcp.json` and Visual Studio Code Copilot settings). Currently, only manual configuration is supported.

```json
{
  "servers": {
    "activator": {
      "type": "http",
      "url": "https://api.fabric.microsoft.com/v1/mcp/workspaces/<Workspace ID>/reflexes/<Artifact ID>"
    }
  }
}
```

## Available tools

The Activator MCP server exposes a set of tools that AI agents can use to interact with Activator. These tools use agents to create monitoring rules, manage alerts, and trigger actions based on real-time data.

### Rule management

| Tool | Description |
| ---- | ----------- |
| `create_rule` | Create a monitoring rule that watches a data stream and triggers actions (email, Microsoft Teams message) when conditions are met. The rule supports numeric, text, Boolean, and heartbeat detection functions with configurable occurrence modifiers. It starts automatically. |
| `list_rules` | List all rules defined in an Activator artifact. |
| `start_rule` | Start (enable) a rule so that it begins monitoring. |
| `stop_rule` | Stop (disable) a running rule. |

### Rule structure

Every monitoring rule has three core parts:

- **Stream**: Defines *what* data to monitor.
  - `splitColumn`: Group by a column for per-entity monitoring, or leave empty for global monitoring.
  - `filters`: Narrow data before detection (for example, only rows where `Region == "EU"`).

- **Detection**: Defines *when* to trigger.
  - `condition`: The monitoring condition (for example, "temperature increases above 100").
  - `occurrence`: How often the condition must be met (for example, "every time," "stays for 5 minutes," "three times in 10 minutes").

- **Action**: Defines *what* to do when the condition fires (email or Teams message).

### Workspace and artifact IDs

When you create rules, provide the *workspace ID* and *artifact ID* of the Activator item in your prompt. These IDs are the same ones used in the MCP server URL. The assistant needs them to target the correct Activator artifact.

### Data source connection

Rules need a data source. You can specify the connection in two ways:

- **Cluster URL for Azure Data Explorer and Kusto**: Provide the cluster's host name and database name (for example, host name `https://mycluster.kusto.windows.net` and database `TelemetryDB`).

- **Fabric eventhouse**: Provide the KQL database item ID and workspace ID instead of a URL.

## Examples: Create rules

**Example prompt:**

"Create a rule that monitors the `Metrics` table in my eventhouse database `TelemetryDB` (cluster: `https://mycluster.kusto.windows.net`). Email me at `alice@contoso.com` when CPU usage rises above 90%."

**Response:**

Connects through the Azure Data Explorer cluster URL and creates an `increasesAbove` condition on the CPU column with an email action.

**Example prompt:**

"Connect to the eventhouse KQL database (item ID: `aabbccdd-1234-5678-abcd-ef0123456789`, workspace: `7855032f-a096-4a01-b6de-806aa26ecb00`). Monitor the `SensorReadings` table. For each machine, if disk space drops below 10 GB and stays that way for 15 minutes, send a Teams message to `bob@contoso.com`."

**Response:**

Connects through Fabric eventhouse IDs and uses `splitColumn` for per-machine tracking with a `decreasesBelow`/`andStays` detection.

**Example prompt:**

"By using the `Heartbeat` table in my eventhouse database `MonitoringDB` (cluster: `https://monitoring.kusto.windows.net`), alert me if there's no data for 10 minutes."

**Response:**

Connects through the Azure Data Explorer cluster URL and creates a heartbeat rule by using `noPresenceOfData(600)`.

**Example prompt:**

"Monitor the `AppLogs` table in my Fabric eventhouse (item ID: `11223344-aabb-ccdd-eeff-556677889900`, workspace: `7855032f-a096-4a01-b6de-806aa26ecb00`). If the status column changes to `Error` more than three times in 5 minutes, email `oncall@contoso.com`."

**Response:**

Connects through Fabric eventhouse IDs and uses `changesTo` with an `everyNthTime(3, 300)` occurrence modifier.

## Examples: Manage rules

Here are a few example prompts:

- "List all the rules in this artifact."

- "Stop the rule called High CPU Alert."

- "Start all rules that are currently stopped."

## Limitations

- **KQL data sources only**: You can create rules against only KQL databases for Kusto (Azure Data Explorer) or Fabric eventhouses. Other types of data sources aren't currently supported.

- **Per-item configuration**: The MCP server URL applies to a single Activator artifact. To work with multiple artifacts, you must configure a separate MCP server entry for each one.

- **Teams and email actions only**: Rules can trigger Teams messages or emails. Other action types, such as webhooks or Power Automate flows, aren't available through the MCP server.

- **No multievent triggers**: Each rule monitors a single eventstream. Triggers that correlate across multiple event streams or tables aren't supported.

- **No aggregation or summarization**: Detection conditions operate on individual events. Aggregate functions, such as average, sum, or count over a window, aren't supported.

## Tips

- **Connect the eventhouse MCP server too**: If your data source is a Fabric eventhouse, connecting the [eventhouse MCP server](mcp-remote-eventhouse.md) alongside Activator significantly improves results. Your agent can then inspect your database schema, sample data, and validate KQL queries before creating rules.

- **Be specific about columns**: The assistant needs to know which data column to monitor. If you're unsure, ask it to list the schema first (which is easier with the eventhouse MCP server connected).

- **State versus change matters**: Use "rises above" or "drops below" for one-time transition alerts. Use "is above" or "is below" for repeated alerts on every matching event.

- **Use dynamic values in actions**: Use `{columnName}` in email or Teams message bodies to insert live data values. For example, use "CPU is at `{cpuPercent}%`."

## Related content

- [Get started with the remote MCP server for eventhouses](mcp-remote-eventhouse.md)
- [What is Fabric Activator?](data-activator/activator-introduction.md)
- [Add and manage MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
