---
title: Get started with the local MCP server for Real-Time Intelligence
description: Learn how to set up and use the local Model Context Protocol (MCP) server for Real-Time Intelligence. The server enables AI agents to interact with RTI components like Eventhouse.
ms.reviewer: sharmaanshul
ms.topic: how-to
ms.date: 04/13/2026
ms.search.form: MCP, RTI, AI
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted

#CustomerIntent: As a Fabric RTI AI developer, I want to use the RTI MCP server to create AI agents and AI applications.
---

# Get started with the local MCP server for Real-Time Intelligence (preview)

The local RTI MCP server lets AI agents or AI applications interact with Fabric Real-Time Intelligence (RTI) or Azure Data Explorer (ADX) by providing tools through the MCP interface, so you can query and analyze data easily.

MCP support for RTI and ADX is a full open-source [MCP server](https://github.com/microsoft/fabric-rti-mcp/) implementation for Microsoft Fabric Real-Time Intelligence (RTI). Customers need to install, host, and manage the deployment.

[!INCLUDE [Fabric feature-preview-note](../includes/feature-preview-note.md)]

## Scenarios

The most common scenario for using the local RTI MCP Server is to connect to it from an existing AI client, such as Cline, Claude, and GitHub Copilot. The client can then use all the available tools to access and interact with RTI or ADX resources using natural language. For example, you could use GitHub Copilot agent mode with the RTI MCP Server to list KQL databases or ADX clusters or run natural language queries on RTI Eventhouses.

## Architecture

The local RTI MCP Server is at the core of the system and acts as a bridge between AI agents and data sources. Agents send requests to the MCP server, which translates them into Eventhouse queries. The RTI MCP server runs locally and provides read‑only access to Fabric.

:::image type="content" source="media/mcp/model-context-protocol-server-architecture.png" alt-text="Diagram that shows the local MCP server architecture.":::

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

**Eventstreams** - Query and manage [Eventstreams](event-streams/overview.md) to analyze streaming data and get real-time insights. You can list the eventstreams in your workspace, get details and definitions, create new eventstreams, and more.

**Activator** - Interact with Fabric [Activator](data-activator/activator-introduction.md) to list Activator artifacts in your workspace, create trigger actions, and set up notifications.

**Map** - Query and manage [Map](map/about-fabric-maps.md) resources to visualize data and create geospatial insights. You can list maps in your workspace, visualize data on maps, get details and definitions, create new maps, and more.

> [!NOTE]
>
> You can also use the Fabric RTI MCP Server to run KQL queries against the clusters in your [Azure Data Explorer](/azure/data-explorer/) backend.

## Implement

To implement the local RTI MCP server, follow the open source instructions in the [RTI MCP server](https://github.com/microsoft/fabric-rti-mcp/) repository. The repository includes documentation on installation, configuration, and usage of the MCP server with RTI.

## Related content

* Implement the [RTI MCP server](https://github.com/microsoft/fabric-rti-mcp/)
* [Model Context Protocol (MCP) overview](https://modelcontextprotocol.io/introduction)
* [What is MCP in Real-Time Intelligence?](mcp-overview.md)

