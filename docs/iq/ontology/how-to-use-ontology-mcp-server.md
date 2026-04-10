---
title: Use ontology MCP server
description: Learn how to consume ontology (preview) as a Model Context Protocol (MCP) server.
ms.date: 04/10/2026
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

[!INCLUDE [mcp-server-vs-code](../../data-science/includes/mcp-server-vs-code.md)]

:::image type="content" source="media/how-to-use-ontology-mcp-server/mcp-json.png" alt-text="Screenshot showing the MCP file of the ontology." lightbox="media/how-to-use-ontology-mcp-server/mcp-json.png":::

## Enabling Agent Mode

After adding the MCP server, enable **Agent Mode** in VS Code. Agent Mode lets VS Code act as an orchestrator interface, connecting your editor with MCP servers to interact with external tools like ontology. To enable it:

1. In VS Code, go to the **Command Palette** (Ctrl+Shift+P or Cmd+Shift+P).
1. Search for **Enable Agent Mode** and select it.
1. Start the MCP server.

    :::image type="content" source="media/how-to-use-ontology-mcp-server/agent-mode-1.png" alt-text="Screenshot of starting the server in agent mode." lightbox="media/how-to-use-ontology-mcp-server/agent-mode-1.png":::

1. Confirm that the server is running. Then, enter any prompts to activate the mode.  

    :::image type="content" source="media/how-to-use-ontology-mcp-server/agent-mode-2.png" alt-text="Screenshot showing the running server and place for prompts in agent mode." lightbox="media/how-to-use-ontology-mcp-server/agent-mode-2.png":::

1. When Agent Mode is active, select an **orchestrator** to handle your queries. Available orchestrators in public preview include **GPT-5, GPT-4.1, Claude Sonnet 4.5, Gemini 2.5 pro**, and many more. The orchestrator manages the flow of information between your queries in VS Code and the ontology MCP server.
