---
title: Data agent as Model Context Protocol server (preview)
description: Learn how to consume a data agent as MCP server.
ms.reviewer: amjafari
ms.topic: how-to
ms.date: 12/18/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
#customer intent: As an Analyst, I want to consume a Fabric data agent as MCP server in VS Code.
---

# Consume Fabric data agent as a model context protocol server in Visual Studio Code

The Model Context Protocol (MCP) server is an emerging standard in the AI landscape that allows AI systems to discover and interact with external tools in a structured way. It plays a critical role in enabling AI models to access and use external knowledge and capabilities. By using MCP servers, AI systems can extend beyond their own data and reasoning. MCP servers provide a way to expose tools and services to AI systems in a consistent, discoverable manner. They help organizations integrate their knowledge into AI workflows.

> [!IMPORTANT]  
> This feature is in [preview](../fundamentals/preview.md).

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

## How it works

Fabric data agents can also function as MCP servers. When used as an MCP server, a Fabric data agent exposes a single tool. This tool represents the data agent itself, so external AI systems can interact with it through the MCP protocol. Because of this, it's important to provide a detailed and accurate description when publishing a Fabric data agent. The description becomes the tool description for the MCP server. External AI systems use this description to determine when and how to invoke the data agent. A clear and comprehensive description ensures that the agent is correctly understood and can be effectively used in AI workflows.

The Fabric data agent as an MCP server is valuable for people who build or test their own AI systems. It allows them to connect directly to the data agent and access organizational data that lives in Fabric OneLake without having to switch between different tools or platforms. This capability makes it easier to integrate organizational knowledge into AI experiments and development workflows, all within a single environment.

   > [!NOTE]
   > Currently, you can use the Fabric data agent MCP server only in **VS Code**. 

:::image type="content" source="./media/data-agent-mcp-server/data-agent-mcp-server-not-published.png" alt-text="Screenshot showing the data agent MCP server before publishing." lightbox="./media/data-agent-mcp-server/data-agent-mcp-server-not-published.png":::

To get started, after publishing the data agent, go to the **Settings** of the agent and open the **Model Context Protocol** tab. Here you see the following information:

- **Data agent MCP server name**  
- **MCP server URL** (copy this URL to use in the next step)
- **Data agent MCP tool name**  
- **MCP server tool description**  

You can also download the **mcp.json** file from this tab. Use this file to configure the MCP server in VS Code.

:::image type="content" source="./media/data-agent-mcp-server/data-agent-mcp-server-published.png" alt-text="Screenshot showing the data agent MCP server settings tab." lightbox="./media/data-agent-mcp-server/data-agent-mcp-server-published.png":::

[!INCLUDE [data-agent-mcp-server-vs-code](./includes/data-agent-mcp-server-vs-code.md)]

## Enabling Agent Mode

After adding the MCP server, enable **Agent Mode** in VS Code. Agent Mode lets VS Code act as an orchestrator interface, connecting your editor with MCP servers to interact with external tools like the Fabric data agent. To enable it:

1. In VS Code, go to the **Command Palette** (Ctrl+Shift+P or Cmd+Shift+P).  
1. Search for **Enable Agent Mode** and select it.  
1. Confirm any prompts to activate the mode.  

    :::image type="content" source="./media/data-agent-mcp-server/data-agent-vs-code-agent-mode.png" alt-text="Screenshot showing data agent in F studio code in agent mode." lightbox="./media/data-agent-mcp-server/data-agent-vs-code-agent-mode.png":::

When Agent Mode is active, select an **orchestrator** to handle your queries. Available orchestrators in public preview include **GPT-5, GPT-4.1, Claude Sonnet 4.5, Gemini 2.5 pro**, and many more. The orchestrator manages the flow of information between your queries in VS Code and the Fabric data agent MCP server.

## Using the Fabric Data Agent MCP Server

When you enable Agent Mode and select the orchestrator:

- You can start asking questions directly from VS Code.  
- The orchestrator routes your queries to the Fabric data agent MCP server.  
- The agent returns answers based on the knowledge it has access to, including organizational data stored in Fabric OneLake.  

By functioning as an MCP server, the Fabric data agent allows users to integrate organizational knowledge into AI workflows, perform experiments, and develop AI solutions without leaving VS Code. This integration streamlines access to OneLake data and enhances productivity for developers and business users alike.

## Related content

- [Data agent concept](concept-data-agent.md)
- [Data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)