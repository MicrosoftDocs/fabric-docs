---
title: What is MCP in Real-Time Intelligence?
description: Learn about Model Context Protocol (MCP) in Real-Time Intelligence. MCP enables AI agents to interact with RTI components like Eventhouse and Activator using natural language.
ms.reviewer: sharmaanshul
ms.topic: overview 
ms.date: 04/20/2026
ms.search.form: MCP, RTI, AI
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted

#CustomerIntent: As a Fabric RTI AI developer, I want to understand MCP options in RTI so I can choose the right approach for my AI agents and applications.
---

# What is MCP in Real-Time Intelligence? (preview)

Model Context Protocol (MCP) in Real-Time Intelligence (RTI) enables AI models, AI agents, and applications to interact with Fabric RTI components using natural language.

The [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) provides a standardized way for AI models, like Azure OpenAI models, to discover and use external tools and data sources. MCP makes it easier to build intelligent applications that can query, reason, and act on real-time data. MCP also makes it easier for AI agents to find, connect to, and use enterprise data.

Fabric's Real-Time Intelligence provides two types of MCP servers: local and remote. Each option has different deployment models, capabilities, and use cases.

## Local MCP server for RTI

The local MCP server for Fabric Real-Time Intelligence is an open-source server that you install, host, and manage yourself. It runs on your local machine and provides read-only access to Fabric RTI and Azure Data Explorer (ADX) resources.

Key characteristics:

- **Deployment**: Self-hosted on your local machine
- **Source**: [Open-source on GitHub](https://github.com/microsoft/fabric-rti-mcp/)
- **Access**: Read-only queries to Eventhouse, Eventstream, Map, and Azure Data Explorer (ADX) clusters.
- **Management**: You manage installation, updates, and maintenance

For detailed information, see [Get started with the local MCP server](mcp-local-server.md).

## Remote MCP servers

Remote MCP servers are hosted by Microsoft and are available as HTTP endpoints. You configure your MCP client to connect to these servers without installing or managing any software.

| Server | Description | Capabilities |
|--------|-------------|--------------|
| **Eventhouse MCP server** | Enables AI agents to query Eventhouse using natural language | Schema discovery, KQL query generation, data sampling, natural language to KQL translation |
| **Activator MCP server** | Enables AI agents to interact with Fabric Activator | Create monitoring rules, manage alerts, trigger actions |

* **MCP Host**: The environment where the AI model (like GPT-4, Claude, or Gemini) runs.
* **MCP Client**: An intermediary service forwards the AI model's requests to MCP servers, like GitHub Copilot, Cline, or Claude Desktop.
* **MCP Server**: Small applications that make specific features accessible to AI models, such as running database queries. For example, Fabric RTI MCP server can execute KQL queries for real-time data retrieval from KQL databases.

- [Get started with the remote MCP server for Eventhouse](mcp-remote-eventhouse.md)
- [Get started with the remote MCP server for Activator](mcp-remote-activator.md)

## When to use local vs. remote servers

**Natural Language Interfaces**: Ask questions in plain English or other languages, and the system turns them into optimized queries (NL2KQL- Natural Language to Kusto Query Language).

| Scenario | Recommended option |
|----------|-------------------|
| Query Eventhouse or ADX data with full control over the server | Local MCP server |
| Query Eventhouse without managing server infrastructure | Remote Eventhouse MCP |
| Create monitoring rules and alerts in Activator | Remote Activator MCP |
| Use in cloud agent platforms like Copilot Studio or Azure AI Foundry | Remote MCP servers |
| Need offline or air-gapped access | Local MCP server |
| Want automatic updates and maintenance | Remote MCP servers |

## Supported AI clients

Both local and remote MCP servers work with popular AI clients:

## Supported RTI components

**Eventhouse** - Run KQL queries against the KQL databases in your [Eventhouse](eventhouse.md) backend. This unified interface lets AI agents search your real-time data, analyze patterns, and take actions based on what they find.

> [!NOTE]
>
> You can also use the Fabric RTI MCP Server to run KQL queries against the clusters in your [Azure Data Explorer](/azure/data-explorer/) backend.

## Related content

* [Get started with the local MCP server](mcp-local-server.md)
* [Get started with the Eventhouse remote MCP](mcp-remote-eventhouse.md)
* [Get started with the Activator remote MCP](mcp-remote-activator.md)
* [Model Context Protocol (MCP) overview](https://modelcontextprotocol.io/introduction)
