---
title: Create a Data Agent to Use with Ontology (Preview)
description: Create a data agent that interacts with an ontology (preview) item and answers questions in natural language.
ms.date: 09/13/2026
ms.topic: how-to
---

# Create a data agent grounded in an ontology (preview)

Ontology (preview) integrates with [Fabric data agent](../../data-science/concept-data-agent.md) to provide a data agent interface that you can use to ask questions in natural language and get answers grounded in the ontology's definitions and bindings.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you begin, make sure you have:

* A Microsoft Fabric workspace that contains at least one ontology (preview) item, accessible through the OneLake catalog. For more information, see [Create ontology (preview) item](tutorial-1-create-ontology.md#create-ontology-preview-item).
* Configured the [data agent tenant settings](../../data-science/data-agent-tenant-settings.md), including Copilot and Azure OpenAI.

>[!NOTE]
>Due to a current known issue, data agent doesn't work with an ontology that uses semantic models for binding.

## Create data agent with ontology source

Follow these steps to create a new data agent that connects to your ontology (preview) item.

1. Go to your Fabric workspace. Use the **+ New item** button to create a new **Data agent** item.

    :::image type="content" source="media/how-to-create-data-agent/data-agent-new.png" alt-text="Screenshot of creating a new data agent item." lightbox="media/how-to-create-data-agent/data-agent-new.png":::

    >[!TIP]
    > If you don't see the data agent item type, make sure that it's enabled in your tenant as described in the [tutorial prerequisites](tutorial-0-introduction.md#prerequisites).

1. The agent opens when it's ready. Select **Add a data source**.

    :::image type="content" source="media/how-to-create-data-agent/add-source.png" alt-text="Screenshot of adding a source to the data agent." lightbox="media/how-to-create-data-agent/add-source.png":::

    Search for your ontology item and select **Add**. Now your ontology is a source for the data agent.

When the agent is ready, the ontology and its entity types are visible in the Explorer.

:::image type="content" source="media/how-to-create-data-agent/data-agent.png" alt-text="Screenshot of the Retail Ontology Agent." lightbox="media/how-to-create-data-agent/data-agent.png":::

## Provide agent instructions

>[!NOTE]
>This step addresses a known issue affecting aggregation in queries.

Next, add a custom instruction to the agent.

1. Select **Agent instructions** from the menu ribbon.
1. At the bottom of the input box, add `Support group by in GQL`. This instruction enables better aggregation across ontology data.

    :::image type="content" source="media/how-to-create-data-agent/agent-instructions.png" alt-text="Screenshot of the agent instructions." lightbox="media/how-to-create-data-agent/agent-instructions.png":::
1. The agent applies the instruction automatically. Optionally, close the **Agent instructions** tab.

## Query agent with natural language

Next, explore your ontology with natural language questions.

Example prompts:
* *For each store, show any freezers operated by that store that ever had a humidity lower than 46 percent.*
* *What is the top product by revenue across all stores?*

Notice that the responses reference entity types and their relationships, not just raw tables.

:::image type="content" source="media/how-to-create-data-agent/query-result.png" alt-text="Screenshot of the result of a query." lightbox="media/how-to-create-data-agent/query-result.png":::

>[!TIP]
> If you see errors that say there's no data while running the example queries, wait a few minutes to give the agent more time to initialize. Then, run the queries again.

## Related content

* [Data agent overview](../../data-science/concept-data-agent.md)
* [Agent integration options for ontology (preview)](concepts-agent-integration.md)
