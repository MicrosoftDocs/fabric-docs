---
title: What is Model Context Protocol (MCP)?
description: Model Context Protocol (MCP) for RTI is a fully open-source implementation for Microsoft Fabric Real-Time Intelligence (RTI). It enables AI agents to interact with RTI components like Eventhouse.
ms.reviewer: sharmaanshul
author: spelluru
ms.author: spelluru
ms.topic: overview 
ms.date: 07/14/2025
ms.search.form: MCP, RTI, AI

#CustomerIntent: As a Fabric RTI AI developer, I want to use the RTI MCP server to create AI agents and AI applications.

<!---This is a placeholder for the MCP content resources: https://blog.fabric.microsoft.com/en-us/blog/introducing-mcp-support-for-real-time-intelligence-rti/ --->

---

# What is the Fabric RTI MCP Server (preview)?

Integrating Model Context Protocol (MCP) with Real-Time Intelligence (RTI) lets you get AI-driven insights and actions in real time. The MCP server lets AI agents or AI applications interact with Fabric RTI by providing tools through the MCP interface, so you can query and analyze data easily.

MCP support for RTI is a full open-source [MCP server](https://github.com/microsoft/fabric-rti-mcp/) implementation for Microsoft Fabric Real-Time Intelligence (RTI).

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Introduction to the Model Context Protocol (MCP)

[Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is a protocol that lets AI models, like Azure OpenAI models, interact with external tools and resources. Anthropic originally developed MCP. MCP makes it easier for agents to find, connect to, and use enterprise data.

## Scenarios

The most common scenario for using the RTI MCP Server is to connect to it from an existing AI client, such as Cline, Claude, and Visual Studio. The client can then use all the available tools to access and interact with RTI resources using natural language. For example, you could use GitHub Copilot agent mode or VS Code Copilot agent mode with the RTI MCP Server to list KQL databases or run natural language queries on RTI Eventhouses.

## Architecture

The RTI MCP Server is at the core of the system and acts as a bridge between AI agents and data sources. Agents send requests to the MCP server, which translates them into Eventhouse queries.

:::image type="content" source="media/mcp/mcp-architecture.png" alt-text="Diagram that shows the MCP architecture.":::

This architecture lets you build modular, scalable, and secure intelligent applications that respond to real-time signals. MCP uses a client-server architecture, so AI models can interact with external tools efficiently.

* **MCP Host**: The AI model (like GPT-4, Claude, or Gemini) requests data or actions.
* **MCP Client**: An intermediary service forwards the AI model's requests to MCP servers, like GitHub Copilot, Cline, or Claude Desktop.
* **MCP Server**: Lightweight applications show specific capabilities, like APIs, databases, or files. For example, an MCP server translates requests into KQL queries for real-time data retrieval.

## Key features

**Real-Time Data Access**: Agents use up-to-the-second data from Eventhouse to make quick decisions.

**Natural Language Interfaces**: Users or agents ask questions in plain English or other languages, and the system turns them into optimized queries (NL2KQL).

**Schema Discovery**: MCP servers show schema and metadata, so agents can learn data structures dynamically.

**Plug-and-Play Integration**: MCP clients like GitHub Copilot, Claude, and Cline connect to RTI with minimal setup because of standardized APIs and discovery mechanisms.

**Extensibility**: Support for custom actions, anomaly detection, and vector search is built in.

**Local Language Inference**: Use your preferred language to work with your data. The MCP server translates queries automatically, depending on the LLM you select.

## Supported RTI components

[Eventhouse](mcp-eventhouse.md) - Run KQL queries against the KQL databases in your [Eventhouse](eventhouse.md) backend. This unified interface lets AI agents query, reason, and act on real-time data.

Support for more RTI components for comprehensive analytics is **coming soon**, including:

* Support for [Digital Twin builder](digital-twin-builder/overview.md)
* Expanded support for [Eventstream](event-streams/overview.md)
* Richer, real-time visualization tools
* [Activator](data-activator/activator-introduction.md) integration for proactive insights

## Related content

* [Use MCP with Fabric RTI Eventhouse](mcp-eventhouse.md)
* [RTI MCP server](https://github.com/microsoft/fabric-rti-mcp/)
* [Model Context Protocol (MCP) overview](https://modelcontextprotocol.io/introduction)
