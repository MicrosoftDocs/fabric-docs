---
title: Use the local Fabric MCP server with OneLake
description: Install and use the local Fabric MCP server to explore OneLake with AI agents, or choose the hosted OneLake MCP server for setup without a local installation.
ms.reviewer: tompeplow # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ms.date: 10/21/2026
ai-usage: ai-assisted
---

# Use the local Fabric MCP server with OneLake

By using the local [Fabric MCP server](https://github.com/microsoft/mcp/blob/main/servers/Fabric.Mcp.Server/README.md), AI agents can browse workspaces, read files, inspect table schemas, and manage directories in OneLake through natural-language conversation. The server runs on your machine and connects your agent to OneLake through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/).

> [!TIP]
> For an easier setup, start with the [hosted OneLake MCP server](onelake-hosted-mcp.md) when it's available for your item and supports the tools you need. You connect over HTTPS without installing a local MCP server. The hosted and local servers expose different tools; this article describes the local server.

Fabric items use open formats to store their data in OneLake. These items include lakehouses, mirrored databases, and KQL databases and semantic models with OneLake availability enabled. The local server's OneLake tools let AI agents explore these items through a single set of commands.

## Prerequisites

- A [Fabric workspace](../fundamentals/workspaces.md) with at least one item that stores data in OneLake.
- [Azure CLI](/cli/azure/install-azure-cli) installed and signed in (`az login`).
- [Visual Studio Code](https://code.visualstudio.com/) with an MCP-compatible AI extension (such as [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)).

## Install the local Fabric MCP server

To install the local server in Visual Studio Code, use the [Fabric MCP server VS Code extension](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-mcp-server). Install the extension and the OneLake tools are available automatically.

For manual configuration or use outside VS Code, see the setup instructions in the [Fabric MCP Server README](https://github.com/microsoft/mcp/blob/main/servers/Fabric.Mcp.Server/README.md).

## Authentication and permissions

The local server's OneLake tools use your existing Azure identity and Fabric permissions. Your AI agent can only access workspaces and items you already have permission to view. You don't need any additional roles or permissions beyond your normal workspace access.

Sign in with the Azure CLI before using the tools:

```bash
az login
```

## Local OneLake MCP tool capabilities

The tools cover three areas of OneLake:

| Category | What you can do | OneLake APIs used |
|----------|----------------|-------------------|
| **Workspace and item discovery** | List workspaces, list items within a workspace, create new items (lakehouses, notebooks, SQL databases, and more). | [OneLake data plane API](./onelake-access-api.md) and [Fabric REST API](/rest/api/fabric/articles/) |
| **File and directory operations** | Browse, read, write, upload, download, and delete files and directories. Both DFS and Blob Storage endpoints are available. | [OneLake file system APIs](./onelake-access-api.md) |
| **Table operations** | Get table API configuration, list namespaces (schemas), list tables, and retrieve full table definitions with column names, types, and metadata. | [OneLake table APIs](./table-apis/table-apis-overview.md) |

The tools include 19 commands. Most commands accept friendly names as well as GUIDs — for example, you can reference an item as `SalesLakehouse.lakehouse` instead of a GUID.

For the full command reference with parameters and example output, see the [OneLake tools README](https://github.com/microsoft/mcp/tree/main/tools/Fabric.Mcp.Tools.OneLake) on GitHub.

## Example: explore a lakehouse

After you install the local Fabric MCP server, ask your AI agent to explore your data. For example:

> *"List the tables in my Sales lakehouse and tell me about the schema of each one."*

The agent uses the OneLake MCP tools to locate the workspace, find the lakehouse, discover the table namespaces, and retrieve the full table definitions — without writing any code or opening the Fabric portal.

Other tasks you can ask your AI agent to complete:

- **Inventory a workspace** — "Scan my workspace and tell me what items are there, how big they are, and what tables they contain."
- **Read and write files** — "Upload this CSV to the Files folder in my lakehouse" or "Read the config file in the Monitoring folder."
- **Document a mirrored database** — "Describe the tables and storage structure of my mirrored database."
- **Create items** — "Create a new lakehouse called StagingData in my Analytics workspace."

## Limitations

- The `item create` command currently requires a GUID-based workspace ID. Your AI agent handles this automatically by calling `onelake workspace list` to resolve the workspace name to an ID.
- The OneLake MCP tools don't include shortcut management commands. To list or create shortcuts, use the [OneLake shortcuts REST API](/rest/api/fabric/core/onelake-shortcuts).

## Related content

- [Connect AI agents to the hosted OneLake MCP server](onelake-hosted-mcp.md)
- [Fabric MCP Server — GitHub README](https://github.com/microsoft/mcp/blob/main/servers/Fabric.Mcp.Server/README.md)
- [OneLake tools — full command reference](https://github.com/microsoft/mcp/tree/main/tools/Fabric.Mcp.Tools.OneLake)
- [Connect to OneLake](onelake-access-api.md)
- [OneLake table APIs overview](table-apis/table-apis-overview.md)
- [Use PowerShell to manage OneLake](onelake-powershell.md)
