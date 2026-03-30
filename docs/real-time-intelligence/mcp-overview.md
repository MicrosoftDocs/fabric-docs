---
title: What is MCP in Real-Time Intelligence?
description: Learn about Model Context Protocol (MCP) in Real-Time Intelligence. MCP enables AI agents to interact with RTI components like Eventhouse and Activator using natural language.
ms.reviewer: sharmaanshul
ms.topic: overview 
ms.date: 03/30/2026
ms.search.form: MCP, RTI, AI
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted

#CustomerIntent: As a Fabric RTI AI developer, I want to understand MCP options in RTI so I can choose the right approach for my AI agents and applications.
---

# What is MCP in Real-Time Intelligence? (preview)

Model Context Protocol (MCP) in Real-Time Intelligence (RTI) enables AI agents and applications to interact with Fabric RTI components using natural language. MCP provides a standardized way for AI models to discover and use external tools and data sources, making it easier to build intelligent applications that can query, reason, and act on real-time data.

[!INCLUDE [Fabric feature-preview-note](../includes/feature-preview-note.md)]

## Introduction to Model Context Protocol

[Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is a protocol that lets AI models, like Azure OpenAI models, interact with external tools and resources. MCP makes it easier for agents to find, connect to, and use enterprise data.

MCP uses a client-server architecture with three main components:

* **MCP Host**: The environment where the AI model (like GPT-4, Claude, or Gemini) runs.
* **MCP Client**: An intermediary service that forwards the AI model's requests to MCP servers, like GitHub Copilot, Cline, or Claude Desktop.
* **MCP Server**: A lightweight application that exposes specific capabilities through natural language APIs and databases.

Real-Time Intelligence provides two types of MCP servers: local and remote. Each option has different deployment models, capabilities, and use cases.

## Local RTI MCP server

The local RTI MCP server is an open-source implementation that you install, host, and manage yourself. It runs on your local machine and provides read-only access to Fabric RTI and Azure Data Explorer (ADX) resources.

Key characteristics:

- **Deployment**: Self-hosted on your local machine
- **Source**: [Open-source on GitHub](https://github.com/microsoft/fabric-rti-mcp/)
- **Access**: Read-only queries to Eventhouse and ADX clusters
- **Management**: You manage installation, updates, and maintenance

For detailed information, see [Get started with the local MCP server](mcp-local-server.md).

## Remote MCP servers

Remote MCP servers are hosted by Microsoft and available as HTTP endpoints. You configure your MCP client to connect to these servers without installing or managing any software.

RTI provides two remote MCP servers:

| Server | Description | Capabilities |
|--------|-------------|--------------|
| **Eventhouse remote MCP** | Enables AI agents to query Eventhouse using natural language | Schema discovery, KQL query generation, data sampling, natural language to KQL translation |
| **Activator remote MCP** | Enables AI agents to interact with Fabric Activator | Create monitoring rules, manage alerts, trigger actions |

For setup instructions, see:

- [Get started with the Eventhouse remote MCP](mcp-remote-eventhouse.md)
- [Get started with the Activator remote MCP](mcp-remote-activator.md)

## When to use local vs. remote servers

Choose the MCP server type based on your requirements:

| Scenario | Recommended option |
|----------|-------------------|
| Query Eventhouse or ADX data with full control over the server | Local MCP server |
| Query Eventhouse without managing server infrastructure | Eventhouse remote MCP |
| Create monitoring rules and alerts in Activator | Activator remote MCP |
| Use in cloud agent platforms like Copilot Studio or Azure AI Foundry | Remote MCP servers |
| Need offline or air-gapped access | Local MCP server |
| Want automatic updates and maintenance | Remote MCP servers |

## Supported AI clients

Both local and remote MCP servers work with popular AI clients:

- GitHub Copilot (VS Code and CLI)
- Cline
- Claude Desktop
- Other MCP-compatible clients

## Related content

* [Get started with the local MCP server](mcp-local-server.md)
* [Get started with the Eventhouse remote MCP](mcp-remote-eventhouse.md)
* [Get started with the Activator remote MCP](mcp-remote-activator.md)
* [Model Context Protocol (MCP) overview](https://modelcontextprotocol.io/introduction)
