---
title: Data agent as Model Context Protocol server (preview)
description: Learn how to consume a data agent as MCP server.
author: jonburchel
ms.author: jburchel
ms.reviewer: amjafari
reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 10/11/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
#customer intent: As an Analyst, I want to consume a Fabric data agent as MCP server in VS Code.
---

# Consume Fabric Data Agent as a Model Context Protocol Server in Virtual Studio Code

The Model Context Protocol (MCP) server is an emerging standard in the AI landscape that allows AI systems to discover and interact with external tools in a structured way. It plays a critical role in enabling AI models to access and use external knowledge and capabilities, making it possible for AI systems to extend beyond their own data and reasoning. MCP servers provide a way to expose tools and services to AI systems in a consistent, discoverable manner, helping organizations integrate their knowledge into AI workflows.

> [!IMPORTANT]  
> This feature is in [preview](../fundamentals/preview.md).

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

## How it works

Fabric data agents can also function as MCP servers. When used as an MCP server, a Fabric data agent exposes a single tool. This tool represents the data agent itself, allowing external AI systems to interact with it through the MCP protocol. Because of this, it’s important to provide a detailed and accurate description when publishing a Fabric data agent. The description becomes the tool description for the MCP server. External AI systems use this description to determine when and how to invoke the data agent. A clear and comprehensive description ensures that the agent is correctly understood and can be effectively used in AI workflows.

The Fabric data agent as an MCP server is valuable for people who build or test their own AI systems. It allows them to connect directly to the data agent and access organizational data that lives in Fabric OneLake without having to switch between different tools or platforms. This makes it easier to integrate organizational knowledge into AI experiments and development workflows, all within a single environment.

   > [!NOTE]
   > Currently, Fabric data agent MCP server can only be used in **VS Code**. 

:::image type="content" source="./media/data-agent-mcp-server/data-agent-mcp-server-not-published.png" alt-text="Screenshot showing the data agent mcp server before publishing." lightbox="./media/data-agent-mcp-server/data-agent-mcp-server-not-published.png":::

To get started, after publishing the data agent, navigate to the **Settings** of the agent and open the **Model Context Protocol** tab. Here you see the following information:

- **Data agent MCP server name**  
- **MCP server URL**  
- **Data agent MCP tool name**  
- **MCP server tool description**  

You can also download the **mcp.json** file from this tab. This file can be used to configure the MCP server in VS Code.

:::image type="content" source="./media/data-agent-mcp-server/data-agent-mcp-server-published.png" alt-text="Screenshot showing the data agent mcp server settings tab." lightbox="./media/data-agent-mcp-server/data-agent-mcp-server-published.png":::

## Setting up the MCP Server in VS Code

1. Open **VS Code** and select a folder to work in.  
2. Inside this folder, create a folder named **.vscode**.  
3. Inside the inner folder, create a file called `mcp.json`.
4. VS Code automatically displays a blue **Add Server** button at the bottom right of the window. 

:::image type="content" source="./media/data-agent-mcp-server/data-agent-mcp-json-vscode.png" alt-text="Screenshot showing the data agent mcp server json file." lightbox="./media/data-agent-mcp-server/data-agent-mcp-json-vscode.png":::

5. Select **Add Server** and select **HTTP**. You are prompted to enter a URL. You can copy the **MCP server URL** from the Setting tab of the data agent as was shown above. 

:::image type="content" source="./media/data-agent-mcp-server/data-agent-mcp-server-select-http.png" alt-text="Screenshot showing the selection of HTTP." lightbox="./media/data-agent-mcp-server/data-agent-mcp-server-select-http.png":::

:::image type="content" source="./media/data-agent-mcp-server/data-agent-mcp-server-url.png" alt-text="Screenshot showing to enter the URL for MCP server." lightbox="./media/data-agent-mcp-server/data-agent-mcp-server-url.png":::

6. Press **Enter** and provide a name for your MCP server. This will be used to display data agent MCP server in your VS Code environment.  
7. VS Code attempts to authenticate with the server. Select **Allow** and sign in with your credentials.  

:::image type="content" source="./media/data-agent-mcp-server/data-agent-mcp-json.png" alt-text="Screenshot showing to mcp file of the data agent." lightbox="./media/data-agent-mcp-server/data-agent-mcp-json.png":::

## Enabling Agent Mode

Once the MCP server is added, you need to enable **Agent Mode** in VS Code. Agent Mode allows VS Code to act as an orchestrator interface, connecting your editor with MCP servers to interact with external tools like the Fabric data agent. To enable it:

1. In VS Code, go to the **Command Palette** (Ctrl+Shift+P / Cmd+Shift+P).  
2. Search for **Enable Agent Mode** and select it.  
3. Confirm any prompts to activate the mode.  

:::image type="content" source="./media/data-agent-mcp-server/data-agent-vs-code-agent-mode.png" alt-text="Screenshot showing data agent in virtual studio code in agent mode." lightbox="./media/data-agent-mcp-server/data-agent-vs-code-agent-mode.png":::

When Agent Mode is active, you can select an **orchestrator** to handle your queries. Available orchestrators in public preview include **GPT-5, GPT-4.1, Claude Sonnet 4.5, Gemini 2.5 pro**, and many more. The orchestrator manages the flow of information between your queries in VS Code and the Fabric data agent MCP server.

## Using the Fabric Data Agent MCP Server

With Agent Mode enabled and the orchestrator selected:

- You can start asking questions directly from VS Code.  
- The orchestrator routes your queries to the Fabric data agent MCP server.  
- The agent returns answers based on the knowledge it has access to, including organizational data stored in Fabric OneLake.  

By functioning as an MCP server, the Fabric data agent allows users to integrate organizational knowledge into AI workflows, perform experiments, and develop AI solutions without leaving VS Code. This integration streamlines access to OneLake data and enhances productivity for developers and business users alike.

## Related content

- [Data agent concept](concept-data-agent.md)
- [Data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)