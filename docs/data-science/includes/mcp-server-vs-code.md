---
title: MCP server in VS Code
description: Steps to set up an MCP server in VS Code (used by data agent, ontology).
ms.topic: include
ms.date: 04/10/2026
---

## Setting up the MCP server in VS Code

1. Open **VS Code** and select a folder to work in.  
1. Inside this folder, create a folder named **.vscode**.  
1. Inside the inner folder, create a file called `mcp.json`.
1. VS Code automatically displays a blue **Add Server** button at the bottom right of the window. 

    :::image type="content" source="../media/data-agent-mcp-server/include-mcp-json-vscode.png" alt-text="Screenshot showing the MCP server json file." lightbox="../media/mcp-server/include-mcp-json-vscode.png":::

1. Select **Add Server** and select **HTTP**. You're prompted to enter a URL. Use the **MCP server URL** that you copied in the previous section. 

    :::image type="content" source="../media/data-agent-mcp-server/include-mcp-server-select-http.png" alt-text="Screenshot showing the selection of HTTP." lightbox="../media/data-agent-mcp-server/include-mcp-server-select-http.png":::

    :::image type="content" source="../media/data-agent-mcp-server/include-mcp-server-url.png" alt-text="Screenshot showing to enter the URL for MCP server." lightbox="../media/data-agent-mcp-server/include-mcp-server-url.png":::

1. Press **Enter** and provide a name for your MCP server. Use this name to display the MCP server in your VS Code environment.  
1. VS Code attempts to authenticate with the server. Select **Allow** and sign in with your credentials.

The server is created.
