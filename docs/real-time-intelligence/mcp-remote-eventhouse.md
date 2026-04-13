---
title: Get Started With the Remote MCP Server for Eventhouse (Preview)
description: Learn how to set up and use the remote Eventhouse MCP server to enable AI agents to query real-time data with natural language and KQL integration.
ms.topic: how-to
ms.date: 04/13/2026
ms.search.form: MCP, RTI, AI, Eventhouse
ms.reviewer: sharmaanshul
ms.subservice: rti-eventhouse
ms.collection: not-ai

#CustomerIntent: As a Fabric RTI AI developer, I want to get started and use the RTI MCP server to create AI agents and AI applications that use Eventhouse and KQL databases to query and analyze real-time data.
---

# Get started with the remote MCP server for Eventhouse (preview)

Learn how to use a remote Model Context Protocol (MCP) for eventhouse to execute KQL queries. The eventhouse remote MCP server allows AI agents to query, reason, and act on real-time data in the RTI eventhouse. This is a hosted MCP where you configure a URL to point to the Eventhouse. There's no need to install or deploy anything.

The Eventhouse remote MCP enables AI agents to query Eventhouse using natural language. Through the **Model Context Protocol (MCP)**, AI assistants can:

- Discover KQL database schemas and metadata dynamically.
- Generate KQL queries to query and analyze the data in KQL databases.
- Use natural language queries that get translated to KQL queries.
- Return insights over real-time and historical data.
- Sample data.

This capability lets Copilot and custom AI agents securely interact with your eventhouse. Cloud agent platforms can consume these agents.

## Get started

To get started with the remote Eventhouse MCP integration, follow these steps:

1. [Connect to the Eventhouse MCP Server](#connect-to-the-eventhouse-mcp-server) from Visual Studio Code or GitHub Copilot CLI.  

1. [Start the Eventhouse MCP server](#start-the-eventhouse-mcp-server).

1. [Use GitHub Copilot to run queries](#use-github-copilot-to-run-queries)

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/Download).

- [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) in VS Code.

- A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).

- [Enable Copilot in Fabric](../fundamentals/copilot-enable-fabric.md) to enable the MCP server to fetch the database schema. Otherwise it can only execute KQL queries.

- An [Eventhouse](create-eventhouse.md) with KQL database tables.
  - Read or query permissions to the KQL database.
  - The MCP Server URI for configuration. See [Find the MCP server URI](#find-the-mcp-server-uri).

## Connect to the Eventhouse MCP Server

The Eventhouse MCP server acts as an **HTTP-based MCP endpoint**. Add the remote MCP server definition to the MCP client's configuration file. Currently, only manual configuration is supported.

1. Open the MCP client configuration file.

   In VS Code, the configuration file is typically located at `.vscode/mcp.json`, or in your [user profile](https://code.visualstudio.com/docs/configure/profiles). For more information, see [VS Code MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration).

1. Add the Eventhouse MCP server URL to the MCP client configuration file. [Find the MCP server URI](#find-the-mcp-server-uri) and refer to the [Example MCP configuration](#example-mcp-configuration).

> [!TIP]
> To add the MCP server using **GitHub Copilot CLI** instead of VS Code, see [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers). Use the `/mcp add` command with the **HTTP** server type and provide the Eventhouse URL.

### Find the MCP server URL

1. Sign in to the [Fabric portal](https://app.fabric.microsoft.com/).

1. Navigate to the workspace containing your Eventhouse.

1. Select the KQL database.

1. From the **Database details** > **Overview** section, select **Copy URI** next to the **MCP Server URI**.

   :::image type="content" source="media/mcp/mcp-copy-server-url.png" alt-text="Diagram that shows how to find KQL database MCP URL." lightbox="media/mcp/mcp-copy-server-url.png":::

### Example MCP client configuration

```json
{
  "servers": {
    "eventhouse-remote": {
      "type": "http",
      "url": "https://api.fabric.microsoft.com/v1/mcp/dataPlane/workspaces/11112222-bbbb-3333-cccc-4444dddd5555/items/b1b1b1b1-cccc-dddd-eeee-f2f2f2f2f2f2/kqlEndpoint"
    }
  }
}
```

## Test the connection

Once configured, verify that the setup is working.

### Start the Eventhouse MCP server

1. Start the **Eventhouse MCP server** in Visual Studio Code.

1. Authenticate to the MCP server using a credential that has access to the Eventhouse.

1. Ensure the Eventhouse MCP server status shows as **Running**.

### Use GitHub Copilot to run queries

1. Open **GitHub Copilot Chat** window in VS Code.

1. Enable **agent mode**.

1. Ask a question, for example:
   - *What tables are in #eventhouse-remote?* (use the remote name you provided in the mcp.json file).
   - *Analyze the data in the StormEvents table and show the most damaging storm events*

1. Review the response returned by Copilot.

## Available tools

The Eventhouse MCP server exposes a set of tools that AI agents can use to interact with the Eventhouse and its KQL databases. These tools allow agents to discover schema, generate KQL queries from natural language, execute queries, and sample data.

For the full list of available tools and capabilities, see the 

## Troubleshoot

If you encounter issues:

- Verify that the MCP server is connected in Visual Studio Code or GitHub Copilot CLI.
- Ensure your MCP host supports remote HTTP MCP servers.
- Confirm you have sufficient permissions on the Eventhouse database. See [Prerequisites](#prerequisites).
- Reauthenticate if prompted.

## Example: Analyze your data

Example prompt:

'I have data about user executed commands in the ProcessEvents table. Sample a few rows and classify the executed commands with a threat tolerance of low/med/high, and provide a tabular view of the overall summary.`

Response:

:::image type="content" source="media/mcp/mcp-eventhouse-example-small.png" alt-text="Screenshot of the VS Code Copilot agent displaying a summary of the user executed commands." lightbox="media/mcp/mcp-eventhouse-example.png":::

## Related content

* [What is the Fabric RTI MCP Server (preview)?](mcp-overview.md)
* [Get started with the remote MCP server for Activator (preview)](mcp-remote-activator.md)
* Learn more about using [Using MCP servers in Visual Studio Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).
* [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers).
