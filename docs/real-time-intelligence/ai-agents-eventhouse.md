---
title: Develop AI agents for Real-Time Intelligence (preview)
description: Learn about the tools and resources available for building AI agents that interact with Eventhouse and other Real-Time Intelligence components, including MCP servers and skills.
ms.reviewer: sharmaanshul
ms.topic: overview
ms.date: 04/29/2026
ms.search.form: MCP, RTI, AI, skills, agents
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted

#CustomerIntent: As a developer, I want to understand the AI agent tools available for Real-Time Intelligence so I can build intelligent applications that query and act on real-time data.
---

# Build AI agents for Real-Time Intelligence (preview)

Fabric Real-Time Intelligence provides tools and open-source resources for building AI agents that interact with your real-time data. You can use Model Context Protocol (MCP) servers for live connectivity and skills for reusable, prebuilt query capabilities against Eventhouse, KQL databases, and Azure Data Explorer (ADX) clusters.

## MCP servers

The [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) provides a standardized way for AI models to discover and use external tools and data sources. Real-Time Intelligence offers both local and remote MCP servers that enable AI agents to query, reason, and act on real-time data using natural language.

| Server | Deployment | Key capabilities |
|--------|------------|-----------------|
| **Local MCP server** | Self-hosted, open-source | Read-only queries to Eventhouse, Eventstream, Map, and ADX clusters |
| **Remote Eventhouse MCP** | Microsoft-hosted HTTP endpoint | Schema discovery, KQL query generation, data sampling, natural language to KQL |
| **Remote Activator MCP** | Microsoft-hosted HTTP endpoint | Create monitoring rules, manage alerts, trigger actions |

For more information, see [What is MCP in Real-Time Intelligence?](mcp-overview.md).

## Skills for Fabric

Skills for Fabric (also referred to as Agent Skills) provide a standardized, secure, and extensible way for AI coding agents to author, query, operate, and govern Microsoft Fabric workloads. These skills allow AI tools to act as Fabric‑aware agents that are capable of understanding Workspaces, Eventhouses, and other items, while respecting Microsoft security, governance, and responsible AI requirements.

### Available skills for Eventhouse and KQL databases

The [Skills for Fabric](https://github.com/microsoft/skills-for-fabric) open-source repository provides reusable skills for Microsoft Fabric workloads. The following skills are available for Eventhouse and KQL databases:

| Skill | Type | Description |
|-------|------|-------------|
| [eventhouse-authoring-cli](https://github.com/microsoft/skills-for-fabric/tree/main/skills/eventhouse-authoring-cli) | Authoring | Execute KQL management commands (table management, ingestion, policies, functions, materialized views) against Fabric Eventhouse and KQL databases via CLI. |
| [eventhouse-consumption-cli](https://github.com/microsoft/skills-for-fabric/tree/main/skills/eventhouse-consumption-cli) | Consumption | Run KQL queries against Fabric Eventhouse for real-time intelligence and time-series analytics. Covers KQL operators (`where`, `summarize`, `join`, `render`), schema discovery (`.show tables`), time-series patterns with `bin()`, and ingestion monitoring. |

For the full catalog of available skills across all Fabric workloads, see the [skill catalog](https://github.com/microsoft/skills-for-fabric/blob/main/docs/skill-catalog.md).

### Eventhouse skill capabilities

Skills for Eventhouse typically provide the following capabilities:

- **KQL query execution**: Run Kusto Query Language queries against KQL databases in an eventhouse or ADX cluster.
- **Schema discovery**: Explore database schemas, tables, columns, and data types.
- **Data sampling**: Retrieve sample data from tables to understand data structure and content.
- **Natural language to KQL**: Translate natural language questions into optimized KQL queries.
- **Time-series analysis**: Analyze time-series data patterns, trends, and anomalies.

## Related content

- [What is MCP in Real-Time Intelligence?](mcp-overview.md)
- [Skills for Fabric](https://github.com/microsoft/skills-for-fabric)
