---
title: Use Model Context Protocol with Eventhouse for real-time AI
description: Learn how to use Model Context Protocol (MCP) with Eventhouse to create AI agents and applications that analyze real-time data. Get started now!
author: spelluru
ms.author: spelluru
ms.topic: how-to 
ms.date: 07/14/2025
ms.search.form: MCP, RTI, AI, Eventhouse
ms.reviewer: sharmaanshul

#CustomerIntent: As a Fabric RTI AI developer, I want to use the RTI MCP server to create AI agents and AI applications that use Eventhouse and KQL databases to query and analyze real-time data.
---

# Use MCP with Fabric RTI Eventhouse (preview)

Learn how to use the Model Context Protocol (MCP) with Fabric RTI Eventhouse to execute KQL queries against the KQL Databases in your Eventhouse backend. This integration provides a unified interface for AI agents to query, reason, and act on real-time data.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

The Fabric RTI MCP Server enables AI agents or AI applications to interact with Eventhouse by providing tools through the MCP interface. This allows you to:

* Query and analyze the data in KQL databases in the Eventhouse.
* Use natural language queries that get translated to KQL queries.
* Discover KQL database schemas and metadata dynamically.
* Sample data.

For the full list of available tools and natural language query examples, see [overview](https://github.com/microsoft/fabric-rti-mcp/?tab=readme-ov-file#-overview) in the Fabric RTI MCP Server repository.

## Getting started

Get started using the instructions documented in the [MCP for RTI server](https://github.com/microsoft/fabric-rti-mcp/) implementation repository.

1. Prerequisites
1. Install the MCP server
1. Test the MCP server
1. Authenticate
1. Use the MCP server with Eventhouse

## Related content

- [MCP for RTI server](https://aka.ms/rti.mcp.repo)
- [Eventhouse overview](eventhouse.md)
- [KQL database](create-database.md)
