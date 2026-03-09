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

> [!NOTE]
> This feature is currently in preview.

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

It's recommended to:

- Have well-described schemas and table metadata to improve AI query quality.  
- [Enable Copilot in Fabric](../fundamentals/copilot-enable-fabric.md) and have a paid Fabric capacity (F2 or higher, or any P edition).

## Set up the remote Eventhouse MCP server

The remote Eventhouse MCP server acts as an **HTTP-based MCP endpoint**.

### Installation

Add the remote MCP server definition to the MCP configuration file. Currently, only manual configuration is supported. 

1. Open the MCP configuration file in Visual Studio Code.

    The configuration file is typically located at `~/.mcp/config.json`, or in your [user profile](https://code.visualstudio.com/docs/configure/profiles).
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

### Find your KQL database ID

1. Sign in to the [Fabric portal](https://app.powerbi.com/)
2. Navigate to the workspace containing your Eventhouse.
3. Select the KQL database to open its details page.
4. Copy the KQL database ID from the URL.

  The KQL Database URL is in this format:

  `https://app.powerbi.com/groups/[Workspace ID]/databases/[**KQL Database ID**]`

## Test the connection

Once configured, verify that the setup is working.

1. Start the **Eventhouse MPC server** in Visual Studio Code.
2. Ensure the Eventhouse MCP server shows as **Running**.
3. Open **GitHub Copilot Chat** window in VS Code.
5. Enable **agent mode**.
6. Ask a question, for example:
   - *What tables are in this Eventhouse?*
   - *Analyze the data in the StormEvents table and show the most damaging storm events*
7. When prompted, authorize Copilot to use the MCP server tool.
8. Authenticate with your Microsoft credentials if requested.
9. Review the response returned by Copilot.

## Troubleshooting

If you encounter issues:

- Verify that the MCP server is connected in Visual Studio Code or GitHub Copilot CLI.
- Ensure your MCP host supports remote HTTP MCP servers.
- Confirm you have sufficient permissions on the Eventhouse database.
- Reauthenticate if prompted.

## Next steps

Explore advanced scenarios such as:

- Natural language–to–KQL translation.
- Root cause analysis over time-series data.
- Real-time anomaly detection using Eventhouse MCP tools.

## Example: Analyze your data

Example prompt:

'I have data about user executed commands in the ProcessEvents table. Sample a few rows and classify the executed commands with a threat tolerance of low/med/high, and provide a tabular view of the overall summary.`

Response:

:::image type="content" source="media/mcp/mcp-eventhouse-example-small.png" alt-text="Screenshot of the VS Code Copilot agent displaying a summary of the user executed commands." lightbox="media/mcp/mcp-eventhouse-example.png":::

## Related content

* Learn more about using [Using MCP servers in Visual Studio Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).
* [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers).
* [What is the Fabric RTI MCP Server (preview)?](mcp-overview.md)
