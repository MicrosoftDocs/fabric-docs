---
title: What is the Fabric Real-Time Intelligence Model Context Protocol (MCP) Server?
description: Model Context Protocol (MCP) for RTI is a fully open-source implementation for Microsoft Fabric Real-Time Intelligence (RTI). It enables AI agents to interact with RTI components like Eventhouse.
ms.reviewer: sharmaanshul
author: spelluru
ms.author: spelluru
ms.topic: overview 
ms.date: 09/14/2025
ms.search.form: MCP, RTI, AI
ms.collection: ce-skilling-ai-copilot

#CustomerIntent: As a Fabric RTI AI developer, I want to use the RTI MCP server to create AI agents and AI applications.
---

# What is the Fabric RTI MCP Server (preview)?

Integrating Model Context Protocol (MCP) with Real-Time Intelligence (RTI) lets you get AI-driven insights and actions in real time. The MCP server lets AI agents or AI applications interact with Fabric RTI or Azure Data Explorer (ADX) by providing tools through the MCP interface, so you can query and analyze data easily.

MCP support for RTI and ADX is a full open-source [MCP server](https://github.com/microsoft/fabric-rti-mcp/) implementation for Microsoft Fabric Real-Time Intelligence (RTI).

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Introduction to the Model Context Protocol (MCP)

[Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is a protocol that lets AI models, like Azure OpenAI models, interact with external tools and resources. MCP makes it easier for agents to find, connect to, and use enterprise data.

## Scenarios

The most common scenario for using the RTI MCP Server is to connect to it from an existing AI client, such as Cline, Claude, and GitHub copilot. The client can then use all the available tools to access and interact with RTI or ADX resources using natural language. For example, you could use GitHub Copilot agent mode with the RTI MCP Server to list KQL databases or ADX clusters or run natural language queries on RTI Eventhouses.

## Architecture

The RTI MCP Server is at the core of the system and acts as a bridge between AI agents and data sources. Agents send requests to the MCP server, which translates them into Eventhouse queries.

:::image type="content" source="media/mcp/model-context-protocol-server-architecture.png" alt-text="Diagram that shows the MCP architecture.":::

This architecture lets you build modular, scalable, and secure intelligent applications that respond to real-time signals. MCP uses a client-server architecture, so AI applications can interact with external tools efficiently. The architecture includes the following components:

* **MCP Host**: The environment where the AI model (like GPT-4, Claude, or Gemini) runs.
* **MCP Client**: An intermediary service forwards the AI model's requests to MCP servers, like GitHub Copilot, Cline, or Claude Desktop.
* **MCP Server**: Lightweight applications exposing specific capabilities by natural language APIs, databases. For example, Fabric RTI MCP server can execute KQL queries for real-time data retrieval from KQL databases.

## Key features


**Real-Time Data Access**: Retrieve data from KQL databases in seconds.

**Natural Language Interfaces**: Ask questions in plain English or other languages, and the system turns them into optimized queries (NL2KQL).

**Schema Discovery**: Discover schema and metadata, so you can learn data structures dynamically.

**Plug-and-Play Integration**: Connect MCP clients like GitHub Copilot, Claude, and Cline to RTI with minimal setup because of standardized APIs and discovery mechanisms.

**Local Language Inference**: Work with your data in your preferred language.

## Supported RTI components

**Eventhouse** - Run KQL queries against the KQL databases in your [Eventhouse](eventhouse.md) backend. This unified interface lets AI agents query, reason, and act on real-time data.

> [!NOTE]
>
> You can also use the Fabric RTI MCP Server to run KQL queries against the clusters in your [Azure Data Explorer](/azure/data-explorer/) backend.

<!-- Support for more RTI components for comprehensive analytics is **coming soon**, including:

* Expanded support for [Eventstream](event-streams/overview.md)
* Richer, real-time visualization tools
* [Activator](data-activator/activator-introduction.md) integration for proactive insights
-->

## Related content

* [Use MCP with Fabric RTI Eventhouse (preview)](mcp-eventhouse.md)
* [Use MCP Servers with Azure Data Explorer (preview)](/azure/data-explorer/integrate-mcp-servers)
* [RTI MCP server](https://github.com/microsoft/fabric-rti-mcp/)
* [Model Context Protocol (MCP) overview](https://modelcontextprotocol.io/introduction)
