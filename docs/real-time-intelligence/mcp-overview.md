---
title: What Is MCP in Real-Time Intelligence?
description: Learn about Model Context Protocol (MCP) in Real-Time Intelligence. MCP enables AI agents to interact with eventhouses and Activator by using natural language.
ms.reviewer: sharmaanshul
ms.topic: overview 
ms.date: 07/08/2026
ms.search.form: MCP, RTI, AI
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
ms.update-cycle: 90-days

#CustomerIntent: As an AI developer for Fabric Real-Time Intelligence, I want to understand MCP options so that I can choose the right approach for my AI agents and applications.
---

# What is MCP in Real-Time Intelligence (preview)?

The [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) provides a standardized way for AI models, like Azure OpenAI models, to discover and use external tools and data sources. MCP makes it easier to build intelligent applications that can query, reason, and act on real-time data. MCP also makes it easier for AI agents to find, connect to, and use enterprise data.

MCP in Microsoft Fabric Real-Time Intelligence enables AI models, AI agents, and applications to interact with Real-Time Intelligence components by using natural language.

Real-Time Intelligence provides two types of MCP servers: local and remote. Each option has its own deployment models, capabilities, and use cases.

## Local MCP server for Real-Time Intelligence

The local MCP server for Fabric Real-Time Intelligence is an open-source server that you install, host, and manage yourself. It runs on your local machine and provides access to Real-Time Intelligence and Azure Data Explorer resources.

Key characteristics include:

- **Deployment**: The server is self-hosted on your local machine.
- **Source**: The server is [open source on GitHub](https://github.com/microsoft/fabric-rti-mcp/).
- **Access**: You query and manage eventhouse, eventstream, Activator, map, and Azure Data Explorer resources.
- **Management**: You manage installation, updates, and maintenance.

For detailed information, see [Get started with the local MCP server](mcp-local-server.md).

## Remote MCP servers

Microsoft hosts remote MCP servers and exposes them as HTTP endpoints. You configure your MCP client to connect to these servers without installing or managing any software.

| Server | Description | Capabilities |
| ------ | ----------- | ------------ |
| **Eventhouse MCP server** | Enables AI agents to query eventhouses by using natural language | Schema discovery, KQL query generation, data sampling, translation of natural language to KQL (the *NL2KQL* framework) |
| **Activator MCP server** | Enables AI agents to interact with Fabric Activator | Creation of monitoring rules, management of alerts, triggered actions |
| **Operations agent MCP server** | Enables AI agents to configure and operate an operations agent by using natural language | Goal configuration, playbook generation, monitoring management |

- **MCP host**: The environment where the AI model (like GPT-4, Claude, or Gemini) runs.
- **MCP client**: An intermediary service that forwards the AI model's requests to MCP servers, like GitHub Copilot, Cline, or Claude Desktop.
- **MCP server**: Small applications that make specific features accessible to AI models, such as running database queries. For example, a Real-Time Intelligence MCP server can run KQL queries for real-time data retrieval from KQL databases.

For more information, see:

- [Get started with the remote MCP server for eventhouses](mcp-remote-eventhouse.md)
- [Get started with the remote MCP server for Activator](mcp-remote-activator.md)
- [Get started with the remote MCP server for operations agents](mcp-remote-operations-agent.md)

## When to use local vs. remote servers

Ask questions in plain English or other languages, and the system turns them into optimized queries.

| Scenario | Recommended option |
| -------- | ------------------ |
| Query eventhouse or Azure Data Explorer data with full control over the server | Local MCP server |
| Query an eventhouse without managing server infrastructure | Remote MCP server for eventhouses |
| Create monitoring rules and alerts in Activator | Remote MCP server for Activator |
| Configure instructions, generate playbooks, and manage monitoring for an operations agent | Remote MCP server for operations agents |
| Use in cloud agent platforms like Microsoft Copilot Studio or Microsoft Foundry | Remote MCP servers |
| Need offline or air-gapped access | Local MCP server |
| Want automatic updates and maintenance | Remote MCP servers |

## Supported AI clients

Both local and remote MCP servers work with popular AI clients.

## Supported Real-Time Intelligence components

**Eventhouse**: Run KQL queries against the KQL databases in your [eventhouse](eventhouse.md) back end. This unified interface lets AI agents search your real-time data, analyze patterns, and take actions based on what they find.

> [!NOTE]
> You can also use the Fabric Real-Time Intelligence MCP server to run KQL queries against the clusters in your [Azure Data Explorer](/azure/data-explorer/) back end.

**Eventstreams**: Query and manage [eventstreams](event-streams/overview.md) to analyze streaming data and get real-time insights. You can list eventstreams in your workspace, get details and definitions, create new eventstreams, and more.

**Activator**: Interact with Fabric [Activator](data-activator/activator-introduction.md) to list Activator artifacts in your workspace, create trigger actions, and set up notifications.

**Operations agents**: Create and manage [operations agents](operations-agent.md) to monitor and act on changing data. You can find and configure agents, start and stop them, and find the history of their operations.

**Map**: Query and manage [map](map/about-fabric-maps.md) resources to visualize geospatial data. You can list maps in your workspace, get details and definitions, create new maps, and more.

## Considerations and limitations

### Security

MCP is a new phenomenon. As with all new technology standards, consider doing a security review to ensure that any systems that integrate with MCP servers follow all regulations and standards that your system must adhere to. This review includes not only the Real-Time Intelligence MCP servers, but also any MCP client or agent that you choose to implement (down to the model provider).

You should follow Microsoft security guidance for MCP servers, including enabling Microsoft Entra ID authentication, secure token management, and network isolation. For details, refer to the [Microsoft security documentation](/azure/api-management/secure-mcp-servers).

### Permissions and risk

MCP clients can invoke operations based on the user's Fabric role-based access control (RBAC) permission. Autonomous or misconfigured clients might perform destructive actions. You should review and apply least-privilege RBAC roles and implement safeguards before deployment.

Certain safeguards, such as flags to prevent destructive operations, aren't standardized in the MCP specification and might not be supported by all clients.

### Compliance responsibility

The MCP server might be installed with, be used with, and share data with clients and services. These clients and services can include non-Microsoft large language models (LLMs), AI agents, or services that operate outside the compliance boundaries of Fabric. You're responsible for ensuring that any integration complies with applicable organizational, regulatory, and contractual requirements.

## Related content

- [Get started with the local MCP server for Real-Time Intelligence](mcp-local-server.md)
- [Get started with the remote MCP server for eventhouses](mcp-remote-eventhouse.md)
- [Get started with the remote MCP server for Activator](mcp-remote-activator.md)
- [Get started with the remote MCP server for operations agents](mcp-remote-operations-agent.md)
- [Model Context Protocol (MCP) overview](https://modelcontextprotocol.io/introduction)
