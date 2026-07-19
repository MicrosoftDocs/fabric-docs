---
title: Get Started with the Operations Agent Remote MCP Server (Preview)
description: Learn how to set up a remote MCP server so that AI agents can interact with an operations agent by using natural language to configure goals, generate playbooks, and manage monitoring.
ms.topic: get-started
ms.date: 07/01/2026
ms.search.form: MCP, RTI, AI, Operations Agent
ms.reviewer: willthom
ms.collection: ce-skilling-ai-copilot
ms.update-cycle: 90-days
ai-usage: ai-assisted

#CustomerIntent: As an AI developer for Fabric Real-Time Intelligence, I want to use the Real-Time Intelligence MCP server to create AI agents and AI applications that configure and operate an operations agent by using natural language so that I can efficiently automate monitoring of real-time data.
---

# Get started with the remote MCP server for operations agents (preview)

By using the remote Model Context Protocol (MCP) server for [operations agents](operations-agent.md), you can enable AI assistants to interact with an operations agent to configure goals and instructions, manage knowledge sources and actions, generate playbooks, and activate monitoring, all through natural language.

An operations agent exposes two MCP endpoints:

- A **configure** endpoint for reading and updating the agent's setup and generating its playbook.
- A **query** endpoint for inspecting the agent's state and its monitoring operations.

To get started with using the remote MCP server for an operations agent, follow these steps:

1. Connect to the remote MCP server for operations agents from Visual Studio Code or the GitHub Copilot CLI.
1. Configure the MCP client with the server URLs and authentication.
1. Use GitHub Copilot to configure the agent, generate a playbook, and manage monitoring by using natural language.
1. Validate the connection by using test prompts.

## Prerequisites

Before you set up and use the MCP server, make sure you have:

- [Visual Studio Code](https://code.visualstudio.com/Download).

- [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) in Visual Studio Code.

- A [data source connection](#data-source-connection).

- An operations agent created in the Fabric workspace, and Contributor or Admin access to the workspace.

  Note the Workspace and operations agent artifact ID from the Fabric item URL for configuration. The URL format is `https://app.fabric.microsoft.com/groups/<Workspace ID>/operationsagents/<Artifact ID>`.

## Authentication

The server uses OAuth. You must configure your MCP client to acquire and pass a valid Microsoft Entra ID token. GitHub Copilot automatically supports this token handling.  

You need Contributor or Admin access to the workspace that contains the operations agent.

## Connection to the operations agent MCP server

The remote MCP server for operations agents acts as an *HTTP-based MCP endpoint*. Each operations agent exposes two endpoints: one for configuration and one for querying.

### Server URLs

```
https://api.fabric.microsoft.com/v1/mcp/workspaces/<Workspace ID>/operationsAgents/<Artifact ID>/configure
https://api.fabric.microsoft.com/v1/mcp/workspaces/<Workspace ID>/operationsAgents/<Artifact ID>/query
```

| Parameter      | Description                                        |
| -------------- | -------------------------------------------------- |
| `Workspace ID` | The Fabric workspace ID (UUID)                     |
| `Artifact ID`  | The operations agent artifact ID (UUID)            |

### MCP client configuration

Add the definitions for the remote MCP servers for the operations agent to the configuration file for the MCP client (for example, `mcp.json` and Visual Studio Code Copilot settings). 

> [!IMPORTANT]
> Currently, only manual configuration is supported.

```json
{
  "servers": {
    "operations-agent-configure": {
      "type": "http",
      "url": "https://api.fabric.microsoft.com/v1/mcp/workspaces/<Workspace ID>/operationsAgents/<Artifact ID>/configure"
    },
    "operations-agent-query": {
      "type": "http",
      "url": "https://api.fabric.microsoft.com/v1/mcp/workspaces/<Workspace ID>/operationsAgents/<Artifact ID>/query"
    }
  }
}
```

> [!TIP]
> To add the MCP server by using the GitHub Copilot CLI instead of VS Code, see [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers). Use the `/mcp add` command with the `HTTP` server type and provide each operations agent URL.

## Available tools

The operations agent MCP server exposes a set of tools that AI agents can use to configure and operate an operations agent. The tools are split across the *configure* endpoint and the *query* endpoint.

### Configure server

Use the configure endpoint to read and update the agent's setup, manage knowledge sources and actions, generate its playbook, and start or stop monitoring.

| Tool | Type | Description |
| ---- | ---- | ----------- |
| `get_agent_instructions` | Read | Get the agent's detailed behavioral guidance. |
| `get_agent_knowledge_sources` | Read | Get the connected data sources. |
| `get_agent_actions` | Read | Get the permitted actions. |
| `get_playbook_summary` | Read | Get the business entities and glossary. |
| `get_playbook_rules` | Read | Get all monitoring rules. |
| `get_rule_details` | Read | Get the full condition and binding for a rule. |
| `get_generate_playbook_status` | Read | Get playbook generation progress. |
| `set_agent_instructions` | Write | Update the agent's instructions. |
| `add_or_update_eventhouse_knowledge_source` | Write | Add or update a KQL data source. |
| `add_or_update_fabric_ontology_knowledge_source` | Write | Add or update a Fabric ontology source. |
| `remove_knowledge_source` | Write | Remove a data source. |
| `add_or_update_agent_action` | Write | Add or update an action. |
| `remove_agent_action` | Write | Remove an action. |
| `generate_playbook` | Write | Trigger playbook generation. |
| `start_agent` | Write | Activate monitoring. |
| `stop_agent` | Write | Deactivate monitoring. |

### Query server

Use the query endpoint to inspect the agent's state and its monitoring operations.

| Tool | Description |
| ---- | ----------- |
| `get_agent_summary` | Get a high-level summary of what the agent does. |
| `get_agent_state` | Get the current state: `Active`, `Inactive`, or `Unconfigured`. |
| `get_monitored_rules` | Get a lightweight list of the agent's rules. |
| `get_operation_details` | Get the full operation record by ID. |
| `query_operations` | Search operations by time range and filters. |

### Data source connection

An operations agent needs a connected data source before it can generate a playbook. You can connect a data source in two ways:

- **Fabric UI**: Connect the data source from the agent editor under **Knowledge Source**.

:::image type="content" source="media/operations-agent/knowledge-source.png" alt-text="Screenshot of the knowledge source." lightbox="media/operations-agent/activity-log.png":::

- **MCP tool**: Use the `add_or_update_eventhouse_knowledge_source` tool to add a KQL database or eventhouse, or `add_or_update_fabric_ontology_knowledge_source` to add a Fabric ontology.

## Examples: Configure an agent

**Example prompt:**

"Set the agent instructions to: Monitor bike availability at all our stations for low bike availability. Alert when less than 3 bikes are available at any station."

**Response:**

Calls `set_agent_instructions` and confirms the instructions were updated.

**Example prompt:**

"Add an Eventhouse knowledge source called `MyDB` so the agent can monitor my bikes data."

**Response:**

Calls `add_or_update_eventhouse_knowledge_source` and confirms the data source was connected.

**Example prompt:**

"Add an action to let the agent use \<URL or description of a Fabric item\>, with a Location parameter"

**Response:**

Calls `add_or_update_agent_action` and confirms the action was added with the parameter preserved.

## Examples: Generate and review a playbook

**Example prompt:**

"Generate a playbook for this agent."

**Response:**

Calls `generate_playbook` and returns a playbook ID with status `InProgress`. Generation typically takes one to three minutes.

**Example prompt:**

"What is the playbook generation status?"

**Response:**

Calls `get_generate_playbook_status` and reports progress. Repeat until the status is `Completed`.

**Example prompt:**

"Show me the playbook summary and rules."

**Response:**

Calls `get_playbook_summary` and `get_playbook_rules` and returns the business entities, glossary, and monitoring rules.

**Example prompt:**

"Show me the details of the first playbook rule."

**Response:**

Calls `get_rule_details` with the rule ID and returns the full condition and binding.

## Examples: Manage monitoring

Here are a few example prompts:

- "What is the current state of this operations agent?"

- "Start the agent."

- "Stop the agent."

- "Show me recent operations."

- "Get details on the latest operation."

- "Give me a complete picture: instructions, knowledge sources, actions, playbook, and state."

The last prompt chains multiple tools across both endpoints and synthesizes the results into a single summary.

## Limitations

- **Per-item configuration**: Each pair of MCP server URLs applies to a single operations agent. To work with multiple agents, you must configure a separate MCP server entry for each one.

- **Data source required for playbooks**: The agent can't generate a playbook until at least one knowledge source is connected. Attempting to generate a playbook without a data source returns an error.

- **Supported knowledge sources**: You can connect eventhouse/KQL database sources and Fabric ontology sources. Other data source types aren't currently supported.

- **Manual configuration only**: You must add the MCP server URLs to the client configuration file manually. Automatic discovery isn't available.

## Tips

- **Connect the eventhouse MCP server too**: If your data source is a Fabric eventhouse, connecting the [eventhouse MCP server](mcp-remote-eventhouse.md) alongside the operations agent significantly improves results. Your agent can then inspect your database schema, sample data, and validate KQL queries.

- **Be specific with agent instructions**: The playbook quality depends on how clearly you describe what to monitor. State the data values, thresholds, and conditions explicitly. For more guidance, see [operations agent best practices](operations-agent-limitations.md#best-practices).

- **Configure before you generate**: Set instructions, actions, and knowledge sources before you call `start_generate_playbook`. Reconfiguring after generation requires regenerating the playbook.

- **Check state before acting**: Use `get_agent_state` to confirm the agent is `Active` or `Inactive` before you start or stop monitoring.

## Related content

- [What is MCP in Real-Time Intelligence (preview)?](mcp-overview.md)
- [Create and configure operations agents](operations-agent.md)
- [Get started with the remote MCP server for eventhouses](mcp-remote-eventhouse.md)
- [Get started with the remote MCP server for Activator](mcp-remote-activator.md)
- [Add and manage MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
