---
title: Get Started With the Eventhouse Remote MCP Server (Preview)
description: Learn how to set up and use the Eventhouse remote MCP server to enable AI agents to query real-time data with natural language and KQL integration.
ms.topic: how-to
ms.date: 02/22/2026
ms.search.form: MCP, RTI, AI, Eventhouse
ms.reviewer: sharmaanshul
ms.subservice: rti-eventhouse
ms.collection: not-ai

#CustomerIntent: As a Fabric RTI AI developer, I want to get started and use the RTI MCP server to create AI agents and AI applications that use Eventhouse and KQL databases to query and analyze real-time data.
---

# Get started with the Eventhouse remote MCP server (preview)

Learn how to use a remote Model Context Protocol (MCP) for eventhouse to execute KQL queries. The eventhouse remote MCP server allows AI agents to query, reason, and act on real-time data in the RTI eventhouse. This is a hosted MCP where you configure a URL to point to the Eventhouse. There is no need to install or deploy anything.

The Eventhouse remote MCP enables AI agents to query Eventhouse using natural language. Through the **Model Context Protocol (MCP)**, AI assistants can:

- Discover KQL database schemas and metadata dynamically.
- Generate KQL queries to query and analyze the data in KQL databases.
- Use natural language queries that get translated to KQL queries.
- Return insights over real-time and historical data.
- Sample data.

This capability allows Copilot and custom AI agents to securely interact with your eventhouse and be consumed by cloud agent platforms, such as **Copilot Studio** and **Azure AI Foundry**.

[!INCLUDE [Fabric feature-preview-note](../includes/feature-preview-note.md)]

## Get started

There are three main steps to get started with the Eventhouse remote MCP integration:

1. Connect to the remote Eventhouse MCP server from Visual Studio Code or GitHub Copilot CLI.  
1. Use GitHub Copilot to query Eventhouse using natural language.
1. Validate the connection using test queries.

## Prerequisites

Before you set up and query the MCP server, you need:

- [Visual Studio Code](https://code.visualstudio.com/Download).
- [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) in VS Code.
- An [Eventhouse](create-eventhouse.md) with a KQL database and tables.
  - You need read or query permissions on the Eventhouse database.
  - Note your Workspace ID and KQL Database ID for configuration.

We recommend that you:

- Have well-described schemas and table metadata to improve AI query quality.  
- [Enable Copilot in Fabric](../fundamentals/copilot-enable-fabric.md) and have a paid Fabric capacity (F2 or higher, or any P edition). If you don't enable the Copilot in Fabric, the MCP server can only execute KQL queries. It can't fetch the schema. 

## Set up the remote Eventhouse MCP server

The remote Eventhouse MCP server acts as an **HTTP-based MCP endpoint**.

### Installation

Add the remote MCP server definition to the MCP configuration file. Currently, only manual configuration is supported.

1. Open the MCP configuration file in Visual Studio Code.

    The configuration file is typically located at `.vscode/mcp.json`, or in your [user profile](https://code.visualstudio.com/docs/configure/profiles).
    Also see [MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration).

1. Modify the configuration file to include the Eventhouse definition, using the URL format below in the [Example MCP configuration](#example-mcp-configuration). Replace `<Workspace ID>` and `<KQL database ID>` with your actual values.

[Test your connection](#test-the-connection)

> [!TIP]
> To add this MCP server using **GitHub Copilot CLI** instead of VS Code, see [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers). Use the `/mcp add` command with the **HTTP** server type and provide the Eventhouse URL from the [Example MCP configuration](#example-mcp-configuration).

### Example MCP configuration

```json
{
  "servers": {
    "eventhouse-remote": {
      "type": "http",
      "url": "https://api.fabric.microsoft.com/v1/mcp/workspaces/<Workspace ID>/kqlDatabases/<KQL database ID>"
    }
  }
}
```

### Find your KQL database MCP URL

1. Sign in to the [Fabric portal](https://app.fabric.microsoft.com/).
1. Navigate to the workspace containing your Eventhouse.
1. Select the KQL database to open its details page.
1. In the **Database details** panel under the **Overview** section, select **Copy URI** next to the **MCP Server URI**.

## Test the connection

Once configured, verify that the setup is working.

### Start the Eventhouse MCP server
1. Start the **Eventhouse MCP server** in Visual Studio Code.
1. Authenticate to the MCP server using credential that has access to the eventhouse. 
1. Ensure the Eventhouse MCP server status shows as **Running**.

### Use GitHub Copilot run queries
1. Open **GitHub Copilot Chat** window in VS Code.
1. Enable **agent mode**.
1. Ask a question, for example:
   - *What tables are in #eventhouse-remote?* (use the remote name you provided in the mcp.json). 
   - *Analyze the data in the StormEvents table and show the most damaging storm events*
1. Review the response returned by Copilot.

## Troubleshooting

If you encounter issues:

- Verify that the MCP server is connected in Visual Studio Code or GitHub Copilot CLI.
- Ensure your MCP host supports remote HTTP MCP servers.
- Confirm you have sufficient permissions on the Eventhouse database.
- Reauthenticate if prompted.

## Example: Analyze your data

Example prompt:

'I have data about user executed commands in the ProcessEvents table. Sample a few rows and classify the executed commands with a threat tolerance of low/med/high, and provide a tabular view of the overall summary.`

Response:

:::image type="content" source="media/mcp/mcp-eventhouse-example-small.png" alt-text="Screenshot of the VS Code Copilot agent displaying a summary of the user executed commands." lightbox="media/mcp/mcp-eventhouse-example.png":::

## Related content

* Learn more about using [Using MCP servers in Visual Studio Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).
* [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers).
* [What is the Fabric RTI MCP Server (preview)?](mcp-overview.md)
