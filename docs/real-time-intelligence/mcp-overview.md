---
title: What is Model Context Protocol (MCP)?
description: Model Context Protocol (MCP) for RTI is a fully open-source implementation for Microsoft Fabric Real-Time Intelligence (RTI). It enables AI agents to interact with RTI components like Eventhouse.
ms.reviewer: sharmaanshul
ms.author: spelluru
ms.service: rti-core
ms.topic: overview 
ms.date: 07/14/2025
ms.search.form: MCP, RTI, AI

#CustomerIntent: As a Fabric RTI AI developer, I want to use the RTI MCP server to create AI agents and AI applications.
---

# What is Model Context Protocol (MCP)?

[Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is a protocol designed to enable AI models, such as Azure OpenAI models, to interact seamlessly with external tools and resources. Originally developed by Anthropic, MCP simplifies how agents discover, connect to, and reason over enterprise data. With this integration, RTI becomes even more powerful, enabling AI-driven insights and actions in real time.

## Build Agents using MCP for Real-Time Intelligence (RTI) (preview)

Model Context Protocol (MCP) support for Real-Time Intelligence (RTI) is a full open-source [MCP server](https://aka.ms/rti.mcp.repo) implementation for Microsoft Fabric Real-Time Intelligence (RTI). The MCP server enables AI agents or AI Applications to interact with Fabric RTI by providing tools through the MCP interface, allowing for seamless data querying and analysis capabilities.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

<!-- ## MCP Support for Azure Data Explorer (ADX) (move to ADX)

Model Context Protocol (MCP) support for Azure Data Explorer (ADX) is a fully open-source [MCP server](https://aka.ms/rti.mcp.repo) implementation for Azure Data Explorer (ADX). The MCP server enables AI agents or AI Applications to interact with ADX by providing tools through the MCP interface, allowing for seamless data querying and analysis capabilities.

Execute KQL queries against Azure Data Explorer (ADX) backends, offering a unified interface for AI agents to query, reason, and act on real-time data.
-->

## Supported components

[Use MCP with Eventhouse](mcp-eventhouse.md) - Execute KQL queries against the KQL Databases in your [Eventhouse](eventhouse.md) backend, offering a unified interface for AI agents to query, reason, and act on real-time data.

Support for more RTI components is **coming soon**, including:

* Support for [Digital Twin builder](digital-twin-builder/overview.md)
* Expanded support for Eventstream
* Richer, real-time visualization tools
* Activator integration for proactive insights
* More RTI components for comprehensive analytics

## Key features

**Real-Time Data Access**: Agents use up-to-the-second data from Eventhouse to make timely decisions.

**Natural Language Interfaces**: Users or agents ask questions in plain English or other languages, and the system translates them into optimized queries (NL2KQL).

**Schema Discovery**: MCP servers expose schema and metadata, so agents can dynamically learn data structures.

**Plug-and-Play Integration**: MCP clients like GitHub Copilot, Claude, and Cline can connect to RTI with minimal setup because of standardized APIs and discovery mechanisms.

**Extensibility**: Support for custom actions, anomaly detection, and vector search is built in.

**Local Language Inference**: Use your preferred language to interact with your data. The MCP server automatically translates queries, depending on the LLM you select.

## How it works

MCP uses a client-server architecture that lets AI models interact with external tools efficiently.

* **MCP Host**: The AI model (like GPT-4, Claude, or Gemini) requests data or actions.
* **MCP Client**: An intermediary service forwards the AI model's requests to MCP servers, like GitHub Copilot, Cline, or Claude Desktop.
* **MCP Server**: Lightweight applications expose specific capabilities, like APIs, databases, or files. For example, an MCP server translates requests into KQL queries for real-time data retrieval.

## Architecture

At the core of the system is the RTI MCP Server, which acts as a bridge between AI agents and data sources. Agents send requests to the MCP server, which translates them into Eventhouse queries.

:::image type="content" source="media/mcp/mcp-architecture.png" alt-text="Image: MCP architecture diagram":::

This architecture enables a modular, scalable, and secure way to build intelligent applications that respond to real-time signals.

## Related content

- [RTI MCP server](https://aka.ms/rti.mcp.repo)
