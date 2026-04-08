---
title: Use ontology MCP server
description: Learn how to consume ontology (preview) as a Model Context Protocol (MCP) server.
ms.date: 03/31/2026
ms.topic: how-to
---

# Consume ontology (preview) as an MCP server

The Model Context Protocol (MCP) server allows AI systems to discover and interact with external tools in a structured way, extending beyond their own data and reasoning. Ontology can function as an MCP server, exposing an API so that external AI systems can interact with it through the MCP protocol. This helps integrate ontology into AI workflows.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before using ontology as an MCP server, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** [enabled on your Fabric tenant](overview-tenant-settings.md#ontology-item-preview).
* An ontology (preview) item

## How it works

To create the MCP server endpoint, you need the URL of your ontology (preview) item.

To find the URL, follow these steps:

1. Open your ontology item in Fabric.
1. View the URL in the browser, in the format `https://app.fabric.microsoft.com/groups/<workspace-ID>/ontologies/<ontology-item-ID>`.

    Copy the values of `<workspace-ID>` and `<ontology-item-ID>` from the URL.

    :::image type="content" source="media/how-to-use-ontology-mcp-server/url.png" alt-text="Screenshot of the values in the URL." lightbox="media/how-to-use-ontology-mcp-server/url.png":::

1. Form the **MCP server URL** by entering the copied values into this string: `https://api.fabric.microsoft.com/v1/mcp/dataPlane/workspaces/<workspace-ID>/items/<ontology-item-ID>/ontologyEndpoint`.

You use this **MCP server URL** in the next section.

[!INCLUDE [data-agent-mcp-server-vs-code](../../data-science/includes/data-agent-mcp-server-vs-code.md)]

