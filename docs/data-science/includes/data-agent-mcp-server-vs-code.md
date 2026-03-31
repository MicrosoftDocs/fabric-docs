---
title: MCP server in VS Code
description: Steps to set up an MCP server in VS Code (used by data agent, ontology).
ms.topic: include
ms.date: 03/31/2026
---

## Setting up the MCP server in VS Code

1. Open **VS Code** and select a folder to work in.  
1. Inside this folder, create a folder named **.vscode**.  
1. Inside the inner folder, create a file called `mcp.json`.
1. VS Code automatically displays a blue **Add Server** button at the bottom right of the window. 

    :::image type="content" source="../media/data-agent-mcp-server/data-agent-mcp-json-vscode.png" alt-text="Screenshot showing the data agent MCP server json file." lightbox="../media/data-agent-mcp-server/data-agent-mcp-json-vscode.png":::

1. Select **Add Server** and select **HTTP**. You're prompted to enter a URL. Use the **MCP server URL** that you copied in the previous section. 

    :::image type="content" source="../media/data-agent-mcp-server/data-agent-mcp-server-select-http.png" alt-text="Screenshot showing the selection of HTTP." lightbox="../media/data-agent-mcp-server/data-agent-mcp-server-select-http.png":::

    :::image type="content" source="../media/data-agent-mcp-server/data-agent-mcp-server-url.png" alt-text="Screenshot showing to enter the URL for MCP server." lightbox="../media/data-agent-mcp-server/data-agent-mcp-server-url.png":::

1. Press **Enter** and provide a name for your MCP server. Use this name to display the MCP server in your VS Code environment.  
1. VS Code attempts to authenticate with the server. Select **Allow** and sign in with your credentials.  

    :::image type="content" source="../media/data-agent-mcp-server/data-agent-mcp-json.png" alt-text="Screenshot showing to MCP file of the data agent." lightbox="../media/data-agent-mcp-server/data-agent-mcp-json.png":::

## Enabling Agent Mode

After adding the MCP server, enable **Agent Mode** in VS Code. Agent Mode lets VS Code act as an orchestrator interface, connecting your editor with MCP servers to interact with external tools like the Fabric data agent or ontology. To enable it:

1. In VS Code, go to the **Command Palette** (Ctrl+Shift+P or Cmd+Shift+P).  
1. Search for **Enable Agent Mode** and select it.  
1. Confirm any prompts to activate the mode.  

    :::image type="content" source="../media/data-agent-mcp-server/data-agent-vs-code-agent-mode.png" alt-text="Screenshot showing data agent in F studio code in agent mode." lightbox="../media/data-agent-mcp-server/data-agent-vs-code-agent-mode.png":::

When Agent Mode is active, select an **orchestrator** to handle your queries. Available orchestrators in public preview include **GPT-5, GPT-4.1, Claude Sonnet 4.5, Gemini 2.5 pro**, and many more. The orchestrator manages the flow of information between your queries in VS Code and the MCP server.
