---
title: Get Started with the Remote MCP Server for Eventhouses (Preview)
description: Learn how to set up and use the remote MCP server for eventhouses to enable AI agents to query real-time data with natural language and KQL integration.
ms.topic: get-started
ms.date: 07/08/2026
ms.search.form: MCP, RTI, AI, Eventhouse
ms.reviewer: sharmaanshul
ms.subservice: rti-eventhouse
ms.collection: ce-skilling-ai-copilot
ms.update-cycle: 90-days

#CustomerIntent: As an AI developer for Fabric Real-Time Intelligence, I want to use the Real-Time Intelligence MCP server to create AI agents and AI applications that use eventhouses and KQL databases so that I can efficiently query and analyze real-time data.
---

# Get started with the remote MCP server for eventhouses (preview)

Learn how to use a remote Model Context Protocol (MCP) server for eventhouses to run KQL queries. The remote MCP server for eventhouses allows AI agents to query, reason, and act on real-time data in a Microsoft Fabric Real-Time Intelligence eventhouse. For this hosted MCP server, you configure a URL to point to the eventhouse. There's no need to install or deploy anything.

The remote MCP server for eventhouses enables AI agents to query an eventhouse by using natural language. Through the Model Context Protocol, AI assistants can:

- Discover KQL database schemas and metadata dynamically.
- Generate KQL queries to query and analyze the data in KQL databases.
- Use natural language queries that are translated to KQL queries.
- Return insights over real-time and historical data.
- Sample data.

This capability lets Copilot and custom AI agents securely interact with your eventhouse. Cloud agent platforms can consume these agents.

This article walks you through these high-level steps:

1. Connect to the eventhouse MCP server from Visual Studio Code or the GitHub Copilot CLI.
1. Start the eventhouse MCP server.
1. Use GitHub Copilot to run queries.

## Prerequisites

- [Visual Studio Code (VS Code)](https://code.visualstudio.com/Download).

- [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) in VS Code.

- A [workspace](../fundamentals/create-workspaces.md) with a Fabric-enabled [capacity](../enterprise/licenses.md#capacity).

- [Copilot in Fabric](../fundamentals/copilot-enable-fabric.md) to enable the MCP server to fetch the database schema. Otherwise, it can only run KQL queries.

- An [eventhouse](create-eventhouse.md) with KQL database tables. For this eventhouse, you need read or query permissions to the KQL database.

## Connect to the eventhouse MCP server

The eventhouse MCP server acts as an *HTTP-based MCP endpoint*. Add the remote MCP server definition to the MCP client's configuration file. Currently, only manual configuration is supported.

1. Open the configuration file for the MCP client.

   In VS Code, the configuration file is typically in `.vscode/mcp.json` or in your [user profile](https://code.visualstudio.com/docs/configure/profiles). For more information, see the [VS Code MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration).

1. Add the URI for the eventhouse MCP server to the configuration file for the MCP client.

> [!TIP]
> To add the MCP server by using the GitHub Copilot CLI instead of VS Code, see [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers). Use the `/mcp add` command with the `HTTP` server type and provide the eventhouse URL.

### Find the MCP server URI

1. Sign in to the [Fabric portal](https://app.fabric.microsoft.com/).

1. Go to the workspace that contains your eventhouse.

1. Select the KQL database.

1. In the **Overview** section of the **Database details** pane, select **Copy URI** next to **MCP Server URI**.

   :::image type="content" source="media/mcp/mcp-copy-server-url.png" alt-text="Screenshot that shows how to find the MCP server URI for a KQL database." lightbox="media/mcp/mcp-copy-server-url.png":::

### Example MCP client configuration

```json
{
  "servers": {
    "eventhouse-remote": {
      "type": "http",
      "url": "https://api.fabric.microsoft.com/v1/mcp/dataPlane/workspaces/11112222-bbbb-3333-cccc-4444dddd5555/items/b1b1b1b1-cccc-dddd-eeee-f2f2f2f2f2f2/kqlEndpoint"
    },
    "kql-global": {
      "type": "http",
      "url": "https://api.fabric.microsoft.com/v1/mcp/dataPlane/kqlEndpoint"
    }
  }
}
```

## Use available tools

The eventhouse MCP server exposes a set of tools that AI agents can use to interact with the eventhouse and its KQL databases. These tools allow agents to discover KQL database schemas, generate KQL queries from natural language, execute queries, and sample data.

When you use the global endpoint (as shown in the earlier `kql-global` example), provide both `workspaceId` and `itemId` in each tool call.

Tools in public MCP servers support optional `clusterUrl` and `databaseName` parameters. When you provide both parameters, the request runs against the specified Azure Data Explorer cluster and database. The Fabric item is used only to meter AI usage against your Fabric capacity.

## Test the connection

After you configure the MCP client, verify that the setup is working.

### Start the eventhouse MCP server

1. Start the eventhouse MCP server in Visual Studio Code.

1. Authenticate to the MCP server by using a credential that has access to the eventhouse.

1. Ensure that the status of the eventhouse MCP server is **Running**.

### Use GitHub Copilot to run queries

1. In VS Code, open a **GitHub Copilot Chat** window.

1. Enable **agent mode**.

1. Ask a question or use a prompt such as:
   - "What tables are in #eventhouse-remote?" (Use the remote name that you provided in the `mcp.json` file.)
   - "Analyze the data in the StormEvents table and show the most damaging storm events."

1. Review the response that Copilot returns.

## Troubleshoot

If you encounter problems:

- Verify that the MCP server is connected in Visual Studio Code or the GitHub Copilot CLI.
- Ensure that your MCP host supports remote HTTP MCP servers.
- Confirm that you have sufficient permissions (read or query) on the eventhouse database.
- Reauthenticate if you're prompted.

## Example: Analyze your data

Here's an example prompt:

"I have data about user-executed commands in the ProcessEvents table. Sample a few rows and classify the executed commands with a threat tolerance of low/med/high, and provide a tabular view of the overall summary."

The following screenshot shows the response.

:::image type="content" source="media/mcp/mcp-eventhouse-example-small.png" alt-text="Screenshot of the VS Code Copilot agent displaying a summary of user-executed commands." lightbox="media/mcp/mcp-eventhouse-example.png":::

## Related content

- [What is MCP in Real-Time Intelligence (preview)?](mcp-overview.md)
- [Get started with the remote MCP server for Activator (preview)](mcp-remote-activator.md)
- [Add and manage MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
