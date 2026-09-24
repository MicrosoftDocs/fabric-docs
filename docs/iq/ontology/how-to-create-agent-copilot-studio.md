---
title: Create an Ontology Agent with Copilot Studio
description: Learn how to create a Copilot Studio agent that is grounded in an ontology (preview). The agent can answer natural-language questions using the ontology as a single source of truth.
ms.date: 05/13/2026
ms.topic: how-to
---

# Build a Copilot Studio agent grounded in an ontology

[Copilot Studio](/microsoft-copilot-studio/fundamentals-what-is-copilot-studio) empowers business analysts, developers, and domain experts to create intelligent, enterprise-grade AI agents without extensive coding expertise. By combining natural language processing with your ontology, you can build custom copilots that understand your organization's unique data structure and business context. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

In this article, you:

1. Create a new agent in Copilot Studio.
1. Configure your agent to use ontology (preview) as a data source by connecting to an existing ontology.
1. Validate your agent's functionality using the built-in **Test** pane.

After completing the steps in this article, you have a fully functional agent capable of answering business questions by leveraging your ontology as a trusted, single source of truth.

## Prerequisites

Before you begin, make sure you have:

* An active **Copilot Studio Production environment** with ontology MCP tools allowed.
* A Microsoft Fabric workspace that contains at least one (preview) item, accessible through the OneLake catalog. For more information, see [Create ontology (preview) item](tutorial-1-create-ontology.md#create-ontology-preview-item). 
* An Edge or Chrome browser, signed in with the same identity that has access to both the Copilot Studio environment and the Fabric workspace.

## Step 1: Login into your Copilot Studio production environment

1. Open **Copilot Studio**: https://copilotstudio.microsoft.com/.

:::image type="content" source="media/how-to-create-agent-copilot-studio/copilot-studio.png" alt-text="Screenshot of Copilot Studio." lightbox="media/how-to-create-agent-copilot-studio/copilot-studio.png":::

## Step 2: Create a new agent

1. Select **Agents** from the left navigation bar and select **+ Create blank agent**.

1. Provide a unique name for your agent. The agent opens when it's ready.

:::image type="content" source="media/how-to-create-agent-copilot-studio/new-agent.png" alt-text="Screenshot of Sales-Insight-Agent in Copilot Studio." lightbox="media/how-to-create-agent-copilot-studio/new-agent.png":::

## Step 3: Add Fabric IQ MCP tool

1. Select **Tools** from the tabs next to the agent name, and select **+ Add tool**.

1. Search for *Fabric IQ* and select **Fabric IQ MCP (Preview)**.

	:::image type="content" source="media/how-to-create-agent-copilot-studio/add-mcp-tool.png" alt-text="Screenshot of Copilot Studio agent tools." lightbox="media/how-to-create-agent-copilot-studio/add-mcp-tool.png":::

1. Expand the dropdown menu next to **Connection** and select **Create new connection**.

	:::image type="content" source="media/how-to-create-agent-copilot-studio/new-connection-1.png" alt-text="Screenshot of Copilot Studio agent tools connection, creating a new connection." lightbox="media/how-to-create-agent-copilot-studio/new-connection-1.png":::

1. Keep the default **Authentication type** of *Login with Microsoft Entra ID*. 

   Enter the **Workspace ID** and **Ontology ID** of your existing ontology (preview) item. For more information on how to find these values, see [Use ontology MCP server](how-to-use-ontology-mcp-server.md#how-it-works). Select **Create**.

	:::image type="content" source="media/how-to-create-agent-copilot-studio/new-connection-2.png" alt-text="Screenshot of Copilot Studio agent tools connection, adding the details." lightbox="media/how-to-create-agent-copilot-studio/new-connection-2.png":::

1. Select **Add** to finalize the connection.

	:::image type="content" source="media/how-to-create-agent-copilot-studio/new-connection-3.png" alt-text="Screenshot of Copilot Studio agent tools connection, the connection is ready." lightbox="media/how-to-create-agent-copilot-studio/new-connection-3.png":::

1. Select the name **Fabric IQ MCP (Preview)** from the list of tools to open its details. 

   Scroll down to verify that both **list_ontology_entity_types** and **search_ontology** are visible in the **Tools** section.

	:::image type="content" source="media/how-to-create-agent-copilot-studio/tools.png" alt-text="Screenshot of Copilot Studio agent tools connection MCP tools." lightbox="media/how-to-create-agent-copilot-studio/tools.png":::

## Step 3: Query and test the agent

1. Open the **Test** pane using the **Test** button in the top right corner of the screen. Enter a natural language question.

1. **Allow** the MCP tool when prompted. 

	:::image type="content" source="media/how-to-create-agent-copilot-studio/allow.png" alt-text="Screenshot of Copilot Studio agent chat." lightbox="media/how-to-create-agent-copilot-studio/allow.png":::

1. Select **Open connection manager** and **Connect**.

	:::image type="content" source="media/how-to-create-agent-copilot-studio/connection-manager.png" alt-text="Screenshot of Copilot Studio agent chat connection." lightbox="media/how-to-create-agent-copilot-studio/connection-manager.png":::

1. Back in the **Chat** pane, select **Retry** and verify the response.

	:::image type="content" source="media/how-to-create-agent-copilot-studio/response.png" alt-text="Screenshot of Copilot Studio agent chat connection response." lightbox="media/how-to-create-agent-copilot-studio/response.png":::
