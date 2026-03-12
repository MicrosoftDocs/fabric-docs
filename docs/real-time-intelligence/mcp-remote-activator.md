---
title: Get Started With the Activator Remote MCP Server (Preview)
description: Learn how to set up and use the Activator remote MCP server to enable AI agents to interact with Fabric Activator using natural language to create monitoring rules, mange alrets, and trigger actions.
ms.topic: how-to
ms.date: 02/22/2026
ms.search.form: MCP, RTI, AI, product-reflex
ms.reviewer: sharmaanshul; miquelmartin
ms.subservice: rti-eventhouse
ms.collection: not-ai

#CustomerIntent: As a Fabric RTI AI developer, I want to get started and use the RTI MCP server to create AI agents and AI applications that use Activator using natural language to create monitoring rules, mange alrets, and trigger actions.
---

# Get started with the Activator remote MCP server (preview)

By using the Activator MCP (Model Context Protocol) server, AI assistants can interact with [Fabric Activator](data-activator/activator-introduction.md) to create monitoring rules, manage alerts, and trigger actions — all through natural language.

[!INCLUDE [Fabric feature-preview-note](../includes/feature-preview-note.md)]

## Get started

To get started with the Activator remote MCP integration, follow these steps:

1. Connect to the remote Activator MCP server from Visual Studio Code or GitHub Copilot CLI.  
1. Configure the MCP client with the server URL and authentication.
1. Use GitHub Copilot to create monitoring rules, manage alerts, and trigger actions by using natural language.
1. Validate the connection by using test prompts.

## Prerequisites

Before you set up and query the MCP server, make sure you have:

- [Visual Studio Code](https://code.visualstudio.com/Download).
- [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) in VS Code.
[data source connection](#data-source-connection)
- An Activator instance created in the Fabric workspace.
    - Note the artifact ID for configuration.

## Connect to the Activator MCP Server

The remote Activator MCP server acts as an **HTTP-based MCP endpoint**.

### Server URL

```
https://api.fabric.microsoft.com/v1/mcp/workspaces/<Workspace ID>/reflexes/<Artifact ID>
```

| Parameter     | Description                                      |
|---------------|--------------------------------------------------|
| `Workspace ID` | The Fabric workspace ID (UUID)                   |
| `Artifact ID`  | The Activator artifact (reflex) ID (UUID)        |

### MCP Client Configuration

Add the remote Activator MCP server definition to the MCP client configuration file (for example, `mcp.json`, Visual Studio Code Copilot settings, etc.). Currently, only manual configuration is supported.

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

**Authentication:** The server uses OAuth. Your MCP client must be configured to acquire and pass a valid Microsoft Entra ID token. GitHub Copilot automatically supports this token handling.

## Available tools

The Activator MCP server exposes a set of tools that AI agents can use to interact with Activator. These tools agents to create monitoring rules, manage alerts, and trigger actions based on real-time data.

### Rule management

| Tool | Description |
|------|-------------|
| **create_rule** | Create a monitoring rule that watches a data stream and triggers actions (email, Teams message) when conditions are met. Supports numeric, text, boolean, and heartbeat detection functions with configurable occurrence modifiers. The rule starts automatically. |
| **list_rules** | List all rules defined in an Activator artifact. |
| **start_rule** | Start (enable) a rule so it begins monitoring. |
| **stop_rule** | Stop (disable) a running rule. |

### Rule structure

Every monitoring rule has three core parts:

1. **Stream** — Defines *what* data to monitor.
   - `splitColumn`: Group by a column for per-entity monitoring, or leave empty for global monitoring.
   - `filters`: Narrow data before detection (for example, only rows where `Region == "EU"`).

2. **Detection** — Defines *when* to trigger.
   - `condition`: The monitoring condition (for example, *temperature increases above 100*).
   - `occurrence`: How often the condition must be met (for example, *every time*, *stays for 5 minutes*, *three times in 10 minutes*).

3. **Action** — Defines *what* to do when the condition fires (email or Teams message).

### Workspace and artifact IDs

When you create rules, provide the **workspace ID** and **artifact ID** of the Activator item in your prompt. These IDs are the same ones used in the MCP server URL. The assistant needs them to target the correct Activator artifact.

### Data source connection

Rules need a data source. You can specify the connection in two ways:

- **ADX / Kusto cluster URL** — provide the cluster hostname and database name (for example, `https://mycluster.kusto.windows.net`, database `TelemetryDB`).
- **Fabric Eventhouse** — provide the Eventhouse KQL Database item ID and workspace ID instead of a URL.

## Examples: Create rules

Example prompt:

**"Create a rule that monitors the `Metrics` table in my Eventhouse database `TelemetryDB` (cluster: `https://mycluster.kusto.windows.net`). Email me at alice@contoso.com when CPU usage rises above 90%."**

Response:

Connects through ADX cluster URL and creates an `increasesAbove` condition on the CPU column with an email action.

Example prompt:

**"Connect to the Eventhouse KQL database (item ID: `aabbccdd-1234-5678-abcd-ef0123456789`, workspace: `7855032f-a096-4a01-b6de-806aa26ecb00`). Monitor the `SensorReadings` table — for each machine, if disk space drops below 10 GB and stays that way for 15 minutes, send a Teams message to bob@contoso.com."**

Response:

Connects through Fabric Eventhouse IDs, uses `splitColumn` for per-machine tracking with a `decreasesBelow` / `andStays` detection.

Example prompt:

**"Using the `Heartbeat` table in my Eventhouse database `MonitoringDB` (cluster: `https://monitoring.kusto.windows.net`), alert me if there's no data for 10 minutes."**

Response:

Connects through ADX cluster URL and creates a heartbeat rule using `noPresenceOfData(600)`.

Example prompt:

**"Monitor the `AppLogs` table in my Fabric Eventhouse (item ID: `11223344-aabb-ccdd-eeff-556677889900`, workspace: `7855032f-a096-4a01-b6de-806aa26ecb00`). If the status column changes to 'Error' more than three times in 5 minutes, email oncall@contoso.com."**

Response:

Connects through Fabric Eventhouse IDs and uses `changesTo` with an `everyNthTime(3, 300)` occurrence modifier.

### ## Examples: Managing rules

Example prompts:

-**"List all the rules in this artifact."**

- **"Stop the rule called 'High CPU Alert'."**

- **"Start all rules that are currently stopped."**

## Limitations

- **KQL data sources only**: You can only create rules against Kusto (ADX) or Fabric Eventhouse KQL databases. Other data source types aren't currently supported.

- **Per-item configuration**: The MCP server URL applies to a single Activator artifact. To work with multiple artifacts, you must configure a separate MCP server entry for each one.

- **Teams and email actions only**: Rules can trigger Microsoft Teams messages or emails. Other action types, such as webhooks or Power Automate flows, aren't available through the MCP server.
- **No multievent triggers**: Each rule monitors a single event stream. Triggers that correlate across multiple event streams or tables aren't supported.
- **No aggregation or summarization**: Detection conditions operate on individual events. Aggregate functions, such as average, sum, or count over a window, aren't supported.

## Tips

- **Connect the Eventhouse MCP server too.** If your data source is a Fabric Eventhouse, connecting the [Eventhouse MCP server ](mcp-remote-eventhouse.md) alongside Activator significantly improves results. Your agent can then inspect your database schema, sample data, and validate KQL queries before creating rules.
- **Be specific about columns.** The assistant needs to know which data column to monitor. If you're unsure, ask it to list the schema first (which is easier with the Eventhouse MCP server connected).
- **State vs. change matters.** Use "rises above" or "drops below" for one-time transition alerts. Use "is above" or "is below" for repeated alerts on every matching event.
- **Dynamic values in actions.** Use `{columnName}` in email or Teams message bodies to insert live data values. For example, `"CPU is at {cpuPercent}%"`.

## Related content

* [Eventhouse MCP server ](mcp-remote-eventhouse.md)
* [What is Fabric Activator? Transform data streams into automated actions](data-activator/activator-introduction.md)
* Learn more about using [Using MCP servers in Visual Studio Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).
* [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers).
