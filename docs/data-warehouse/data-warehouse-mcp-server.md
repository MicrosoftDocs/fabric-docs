---
title: Connect to Fabric Data Warehouse MCP Server
description: Connect AI agents to Microsoft Fabric Data Warehouse using natural language with the remote MCP server. Learn how to configure endpoints in Visual Studio Code and run T-SQL with GitHub Copilot.
author: markingmyname
ms.author: maghan
ms.reviewer: salilkanade, wiassaf
ms.date: 06/16/2026
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
---

# Fabric Data Warehouse MCP server (Preview)

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

The remote Fabric Data Warehouse MCP server is a hosted MCP endpoint that enables AI agents to work with a warehouse using natural language. Built on the Model Context Protocol (MCP), it gives agents a governed way to run T-SQL statements through the `executeSQL` tool, inspect results, and iterate against real warehouse context while respecting Fabric permissions and security boundaries.

This article shows you how to:

- Connect to the remote Fabric Data Warehouse MCP server in Visual Studio Code

- Configure either the global endpoint or an item-scoped endpoint

- Use GitHub Copilot to generate and run T-SQL against Fabric Data Warehouse

- Validate the connection with test queries

## Prerequisites

Before you begin, ensure you have:

- **Visual Studio Code**: Install the latest version of Visual Studio Code. 
    - [Download Visual Studio Code](https://code.visualstudio.com/download)

- **GitHub Copilot**: Install and sign in to GitHub Copilot and GitHub Copilot Chat in Visual Studio Code.
    - [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
    - [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)

- **Fabric Data Warehouse access**: You need access to at least one Fabric Data Warehouse or SQL analytics endpoint.

- **Warehouse permissions**: You need the required Fabric workspace and SQL permissions to run the T-SQL statements you ask the agent to execute.

- **Warehouse context**: Have the workspace ID and warehouse item ID available if you plan to use the item-scoped endpoint.

## Choose an endpoint

The Fabric Data Warehouse MCP server offers two endpoint options depending on your use case. Choose the global endpoint for flexible warehouse selection through prompts, or the item-scoped endpoint to bind the connection to a specific warehouse.

### Global endpoint

When you want to connect to the Fabric Data Warehouse MCP server, provide warehouse context through prompts or tool arguments by using the global endpoint: 

`https://api.fabric.microsoft.com/v1/mcp/dataPlane/sqlEndpoint`

### Item-scoped endpoint

Use the item-scoped endpoint when you want the MCP server connection to be bound to a specific Fabric Data Warehouse item.

`https://api.fabric.microsoft.com/v1/mcp/dataPlane/workspaces/<workspace-id>/items/<item-id>/sqlEndpoint`

Replace:

- `<workspace-id>` with the Fabric workspace ID.

- `<item-id>` with the Fabric Data Warehouse item ID.

The item-scoped endpoint is useful when you want the agent experience to be anchored to a specific warehouse and avoid repeatedly providing warehouse context in chat.

## Set up in Visual Studio Code

Configure the Fabric Data Warehouse MCP server in Visual Studio Code by adding the server configuration to your MCP settings file. Choose between the global endpoint for flexible warehouse selection or the item-scoped endpoint to bind the connection to a specific warehouse.

### Option 1: Configure the global endpoint

Add the following server configuration to your Visual Studio Code MCP configuration file:

```json
{
   "servers": {
      "fabric-dw-global": {
         "type": "http",
         "url": "https://api.fabric.microsoft.com/v1/mcp/dataPlane/sqlEndpoint"
      }
   }
}
```

After saving the configuration, restart or refresh MCP servers in Visual Studio Code.

### Option 2: Configure the item-scoped endpoint

Add the following server configuration to your Visual Studio Code MCP configuration file:

```json
{
   "servers": {
      "fabric-dw-item": {
         "type": "http",
         "url": "https://api.fabric.microsoft.com/v1/mcp/dataPlane/workspaces/<workspace-id>/items/<item-id>/sqlEndpoint"
      }
   }
}
```

Replace the `<workspace-id>` and the `<item-id>` with the values for your warehouse.

After saving the configuration, restart or refresh MCP servers in Visual Studio Code.

## Test your connection

After you configure the connection, verify that the setup works.

1. Start the MCP server in Visual Studio Code.

   - Open the MCP servers panel.

   - Confirm that the Fabric Data Warehouse MCP server shows as connected.

1. Open GitHub Copilot Chat.

   - Launch Copilot Chat in Visual Studio Code.

   - Enable agent mode.

1. Provide warehouse context if you're using the global endpoint.

   - If you configured the global endpoint, tell Copilot which warehouse to use with a prompt like:

      ```copilot-prompt
      Use the Fabric Data Warehouse named SalesDW in the Sales Analytics workspace.
      ```

   - If you configured the item-scoped endpoint, the server is already scoped to the warehouse item in the endpoint URL.

1. Ask a question.

   - Example: 

    ```copilot-prompt
    What tables and views are in this warehouse?
    ```

   - Example:

    ```copilot-prompt
    Show me the top 10 products by sales revenue.
    ```

1. Authorize tool usage.

   - When prompted, review and approve the `executeSQL` tool call.

   - Authenticate with your Microsoft credentials if requested.

1. Review the response.

   - Copilot uses the Fabric Data Warehouse MCP server to execute the approved T-SQL statement and returns the result in chat.

## Available tools

The Fabric Data Warehouse MCP server exposes one tool.

| Tool | Description |
| --- | --- |
| `executeSQL` | Executes an approved T-SQL statement against Fabric Data Warehouse and returns the result. |

The server doesn't expose separate tools for listing schemas, describing tables, retrieving query history, or inspecting warehouse metadata. You can still complete those workflows by asking the agent to generate and run T-SQL through `executeSQL`.

For example, instead of calling a separate table discovery tool, the agent can use `executeSQL` with a query against `INFORMATION_SCHEMA.TABLES` or other supported system views.

## Validate with sample prompts

Use these prompts to confirm that the server can generate T-SQL, execute T-SQL, and explain results.

### Explore warehouse objects

- List all schemas in this warehouse.

- List all tables and views grouped by schema.

- Show the columns, data types, and nullability for the `dbo.Customers` table.

### Generate and run T-SQL

- Write and run a T-SQL query that returns the top 10 products by revenue.

- Run a query that counts rows by order status in the `Orders` table.

- Create a query that joins `Orders`, `Customers`, `Products`, and `Regions` to show revenue by region.

### Understand and improve queries

- Explain what this T-SQL query does before running it.

- Rewrite this query to make it easier to read without changing the result.

- Suggest improvements to this query pattern, then show the revised T-SQL.

### Monitor warehouse activity

- Show recent query activity for this warehouse.

- Find long-running queries or sessions that might need attention.

- Summarize recent query failures and group them by likely root cause.

> [!NOTE]  
> The exact monitoring queries depend on the system views available in the warehouse environment.

## Security and permissions

The Fabric Data Warehouse MCP server uses the signed-in user's identity and respects Fabric permissions. Users can only run SQL statements that their identity is allowed to execute in Fabric Data Warehouse.

Tool calls that `executeSQL` should require explicit user approval in the MCP client. Review generated T-SQL before allowing `executeSQL` to run, especially for write operations such as `CREATE`, `ALTER`, `DROP`, `INSERT`, `UPDATE`, or `DELETE`.

Use least-privilege access for production warehouses. 

Start with read-only queries and metadata exploration before enabling workflows that modify warehouse objects.

## Troubleshoot

If you have issues setting up or using the Fabric Data Warehouse MCP server, use the following scenarios to troubleshoot common problems.

### The MCP server doesn't show as connected

Confirm that the MCP configuration is saved correctly, the endpoint URL is correct, and that you restarted or refreshed MCP servers in Visual Studio Code after making changes.

### Copilot can't find the warehouse

If you're using the global endpoint, provide the warehouse context in chat. If you're using the item-scoped endpoint, confirm that the workspace ID and item ID are correct.

### Authentication fails

Sign in again with your Microsoft account. Make sure you're using the correct tenant and directory.

### Tool calls fail with permission errors

Confirm that you have the required Fabric workspace role, item permissions, and SQL permissions. The server doesn't bypass Fabric security.

### The agent can't list schemas or tables

The server only exposes `executeSQL`. Ask the agent to use SQL metadata queries instead of expecting separate schema discovery tools.

Example:

```copilot-prompt
Use executeSQL with INFORMATION_SCHEMA views to list the tables in this warehouse.
```

### Query results are unexpected

Ask Copilot to show the generated T-SQL before execution. Review table names, joins, filters, date logic, and aggregation logic before approving the tool call.

## Related content

- [MCP servers in Visual Studio Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers)
