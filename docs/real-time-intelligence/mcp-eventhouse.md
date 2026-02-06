---
title: Use the Fabric RTI Model Context Protocol (MCP) Server With Eventhouse
description: Learn how to use Model Context Protocol (MCP) with Eventhouse to create AI agents and applications that analyze real-time data. Get started now!
author: spelluru
ms.author: spelluru
ms.topic: how-to 
ms.date: 07/28/2025
ms.search.form: MCP, RTI, AI, Eventhouse
ms.reviewer: sharmaanshul
ms.subservice: rti-eventhouse
ms.collection: ce-skilling-ai-copilot

#CustomerIntent: As a Fabric RTI AI developer, I want to use the RTI MCP server to create AI agents and AI applications that use Eventhouse and KQL databases to query and analyze real-time data.
---

# Use the Fabric RTI MCP Server with Eventhouse (preview)

Learn how to use the Model Context Protocol (MCP) with Fabric Real-Time Intelligence (RTI) Eventhouse to execute KQL queries against the KQL Databases in your Eventhouse backend. The RTI MCP integration provides a unified interface for AI agents to query, reason, and act on real-time data.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

The Fabric RTI MCP Server enables AI agents or AI applications to interact with an Eventhouse by providing tools through the MCP interface. Using the RTI MCP Server with Eventhouse, you can:

* Query and analyze the data in KQL databases.
* Use natural language queries that get translated to KQL queries.
* Discover KQL database schemas and metadata dynamically.
* Sample data.

For the full list of available tools and natural language query examples, see [overview](https://github.com/microsoft/fabric-rti-mcp/?tab=readme-ov-file#-overview) in the Fabric RTI MCP Server repository.

## Get started

Get started using the instructions documented in the [MCP for RTI server](https://github.com/microsoft/fabric-rti-mcp/) repository. The main steps are:

1. Prerequisites: An Eventhouse with a KQL database and tables or an Azure Data Explore (ADX) cluster.
1. Install the MCP server.
1. Test the MCP server.
1. Start analyzing data with AI agents and natural language prompts.

## Example: Analyze your data

Example prompt:

'I have data about user executed commands in the ProcessEvents table. Sample a few rows and classify the executed commands with a threat tolerance of low/med/high, and provide a tabular view of the overall summary.`

Response:

:::image type="content" source="media/mcp/mcp-eventhouse-example-small.png" alt-text="Screenshot of the VS Code Copilot agent displaying a summary of the user executed commands." lightbox="media/mcp/mcp-eventhouse-example.png":::

## Related content

* [What is the Fabric RTI MCP Server (preview)?](mcp-overview.md)
* [Fabric RTI MCP Server overview](https://github.com/microsoft/fabric-rti-mcp/?tab=readme-ov-file#-overview)
* [Eventhouse overview](eventhouse.md)
