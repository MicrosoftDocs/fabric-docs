# Activator MCP Server Documentation

The Activator MCP (Model Context Protocol) server lets AI assistants interact with [Fabric Activator](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/data-activator/activator-introduction) — creating monitoring rules, managing alerts, and triggering actions — all through natural language.

> **Note:** This feature is currently in **Public Preview** and may be subject to changes.

---

## Connecting to the Activator MCP Server

### Server URL

```
https://api.fabric.microsoft.com/v1/mcp/workspaces/{workspaceId}/reflexes/{artifactId}
```

| Parameter     | Description                                      |
|---------------|--------------------------------------------------|
| `workspaceId` | The Fabric workspace ID (UUID)                   |
| `artifactId`  | The Activator artifact (reflex) ID (UUID)        |

### MCP Client Configuration

Add the following to your MCP client settings (for example, `mcp.json`, VisualStudio Code Copilot settings, etc.):

```json
{
  "servers": {
    "activator": {
      "type": "http",
      "url": "https://api.fabric.microsoft.com/v1/mcp/workspaces/<your-workspace-id>/reflexes/<your-artifact-id>"
    }
  }
}
```

**Authentication:** The server uses OAuth. Your MCP client must be configured to acquire and pass a valid Microsoft Entra ID token. This token handling is automatically supported in GitHub Copilot.

---

## Available Tools

### Rule Management

| Tool | Description |
|------|-------------|
| **create_rule** | Create a monitoring rule that watches a data stream and triggers actions (email, Teams message) when conditions are met. Supports numeric, text, boolean, and heartbeat detection functions with configurable occurrence modifiers. The rule is started automatically. |
| **list_rules** | List all rules defined in an Activator artifact. |
| **start_rule** | Start (enable) a rule so it begins monitoring. |
| **stop_rule** | Stop (disable) a running rule. |

---

## Key Concepts

### Rule Structure

Every monitoring rule has three core parts:

1. **Stream** — Defines *what* data to monitor.
   - `splitColumn`: Group by a column for per-entity monitoring, or leave empty for global monitoring.
   - `filters`: Narrow data before detection (for example, only rows where `Region == "EU"`).

2. **Detection** — Defines *when* to trigger.
   - `condition`: The monitoring condition (for example, *temperature increases above 100*).
   - `occurrence`: How often the condition must be met (for example, *every time*, *stays for 5 minutes*, *three times in 10 minutes*).

3. **Action** — Defines *what* to do when the condition fires (email or Teams message).

### Workspace and Artifact IDs

When creating rules, you need to provide the **workspace ID** and **artifact ID** of the Activator item in your prompt. These IDs are the same ones that are used in the MCP server URL. The assistant needs them to target the correct Activator artifact.

### Data Source Connection

Rules need a data source. You can specify the connection in two ways:

- **ADX / Kusto cluster URL** — provide the cluster hostname and database name (for example, `https://mycluster.kusto.windows.net`, database `TelemetryDB`).
- **Fabric Eventhouse** — provide the Eventhouse KQL Database item ID and workspace ID instead of a URL.

---

## Sample Prompts

### Creating Rules

> **"Create a rule that monitors the `Metrics` table in my Eventhouse database `TelemetryDB` (cluster: `https://mycluster.kusto.windows.net`). Email me at alice@contoso.com when CPU usage rises above 90%."**
>
> Connects via ADX cluster URL and creates an `increasesAbove` condition on the CPU column with an email action.

> **"Connect to the Eventhouse KQL database (item ID: `aabbccdd-1234-5678-abcd-ef0123456789`, workspace: `7855032f-a096-4a01-b6de-806aa26ecb00`). Monitor the `SensorReadings` table — for each machine, if disk space drops below 10 GB and stays that way for 15 minutes, send a Teams message to bob@contoso.com."**
>
> Connects via Fabric Eventhouse IDs, uses `splitColumn` for per-machine tracking with a `decreasesBelow` / `andStays` detection.

> **"Using the `Heartbeat` table in my Eventhouse database `MonitoringDB` (cluster: `https://monitoring.kusto.windows.net`), alert me if there's no data for 10 minutes."**
>
> Connects via ADX cluster URL and creates a heartbeat rule using `noPresenceOfData(600)`.

> **"Monitor the `AppLogs` table in my Fabric Eventhouse (item ID: `11223344-aabb-ccdd-eeff-556677889900`, workspace: `7855032f-a096-4a01-b6de-806aa26ecb00`). If the status column changes to 'Error' more than three times in 5 minutes, email oncall@contoso.com."**
>
> Connects via Fabric Eventhouse IDs and uses `changesTo` with an `everyNthTime(3, 300)` occurrence modifier.

### Managing Rules

> **"List all the rules in this artifact."**

> **"Stop the rule called 'High CPU Alert'."**

> **"Start all rules that are currently stopped."**


---

## Known Limitations

- **KQL data sources only.** Rules can only be created against Kusto (ADX) or Fabric Eventhouse KQL databases. Other data source types aren't currently supported.
- **Per-item configuration.** The MCP server URL is scoped to a single Activator artifact. To work with multiple artifacts, you must configure a separate MCP server entry for each one.
- **Teams and email actions only.** Rules can trigger Microsoft Teams messages or emails. Other action types (for example, webhooks, Power Automate flows) aren't available through the MCP server.
- **No multi-event triggers.** Each rule monitors a single event stream. Triggers that correlate across multiple event streams or tables aren't supported.
- **No aggregation or summarization.** Detection conditions operate on individual events. Aggregate functions (for example, average, sum, count over a window) aren't supported.

---

## Tips

- **Connect the Eventhouse MCP server too.** If your data source is a Fabric Eventhouse, connecting the [Eventhouse MCP server](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/eventhouse-mcp-server) alongside Activator significantly improves results — your agent can then inspect your database schema, sample data, and validate KQL queries before creating rules.
- **Be specific about columns.** The assistant needs to know which data column to monitor. If you're unsure, ask it to list the schema first (which is easier with the Eventhouse MCP server connected). 
- **State vs. Change matters.** Use "rises above" / "drops below" for one-time transition alerts. Use "is above" / "is below" for repeated alerts on every matching event.
- **Dynamic values in actions.** Use `{columnName}` in email/Teams message bodies to insert live data values (for example, `"CPU is at {cpuPercent}%"`).
