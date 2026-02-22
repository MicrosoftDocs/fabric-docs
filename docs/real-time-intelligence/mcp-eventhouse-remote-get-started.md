---
title: Get Started with the Eventhouse Remote MCP Server (preview)
description: 
ms.topic: how-to 
ms.date: 02/22/2026
ms.search.form: MCP, RTI, AI, Eventhouse
ms.reviewer: sharmaanshul
ms.subservice: rti-eventhouse
ms.collection:

#CustomerIntent: As a Fabric RTI AI developer, I want to get started and use the RTI MCP server to create AI agents and AI applications that use Eventhouse and KQL databases to query and analyze real-time data.
---

# Get started with the Eventhouse remote MCP server (preview)

The remote Eventhouse MCP server enables AI agents to query Eventhouse using natural language. Through the **Model Context Protocol (MCP)**, AI assistants can:

- Discover Eventhouse schemas  
- Generate KQL queries  
- Execute queries  
- Return insights over real-time and historical data  

This capability allows Copilots and custom AI agents to securely interact with Eventhouse and be consumed by cloud agent platforms such as **Copilot Studio** and **Azure AI Foundry**.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## How to get started

- Connect to the remote Eventhouse MCP server from Visual Studio Code  
- Use GitHub Copilot to query Eventhouse using natural language  
- Validate the connection using test queries  

## Prerequisites

Before you set up and query the MCP server, you need:

- [Visual Studio Code](https://code.visualstudio.com/Download).

- [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) in VS Code.

- An [Eventhouse](create-eventhouse.md) with a KQL database and tables or an Azure Data Explore (ADX) cluster.
  - You need read or query permissions on the Eventhouse database.
  - Note your Workspace ID and KQL Database ID for configuration.

It's recommended to:

- Have well-described schemas and table metadata to improve AI query quality  

- Enable [Enable Copilot in Fabric](../fundamentals/copilot-enable-fabric.md).

## Set up the remote Eventhouse MCP server

The remote Eventhouse MCP server acts as an **HTTP-based MCP endpoint**.

### Installation

- Quick installation through a one-click installer (coming soon).
- Manual configuration by adding the server definition to the MCP configuration file.

### Example MCP configuration

```json
{
  "servers": {
    "eventhouse-remote": {
      "type": "http",
      "url": "https://api.fabric.microsoft.com/v1/mcp/workspaces/<workspace ID>/kqlDatabases/<KQL Database ID>"
    }
  }
}
```

### Find your KQL database ID

1. Sign in to the [Fabric portal](https://app.powerbi.com/)
2. Navigate to the workspace containing your Eventhouse.
3. Select the KQL database to open its details page.
4. Copy the KQL database ID from the URL.

KQL Database URLs are in this format:

* https://app.powerbi.com/groups/{workspaceId}/databases/{kqlDBId}

## Test your connection

Once configured, verify that the setup is working.

1. Start the MCP server in Visual Studio Code.
2. Ensure the Eventhouse MCP server shows as **connected**.
3. Open **GitHub Copilot**.
4. Launch the chat window in VS Code.
5. Enable **agent mode**.
6. Ask a question, for example:
   - *What tables are in this Eventhouse?*
   - *Analyze the data in the StormEvents table and show the most damaging storm events*
7. When prompted, authorize Copilot to use the MCP server tool.
8. Authenticate with your Microsoft credentials if requested.
9. Review the response returned by Copilot.

## Troubleshooting

If you encounter issues:

- Verify that the MCP server is connected in Visual Studio Code.
- Ensure your MCP host supports remote HTTP MCP servers.
- Confirm you have sufficient permissions on the Eventhouse database.
- Reauthenticate if prompted.

## Next steps

Explore advanced scenarios such as:

- Natural language–to–KQL translation.
- Root cause analysis over time-series data.
- Real-time anomaly detection using Eventhouse MCP tools.

## Related content

* Learn more about using [Using MCP servers in Visual Studio Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).
* [What is the Fabric RTI MCP Server (preview)?](mcp-overview.md)
