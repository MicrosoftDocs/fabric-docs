---
title: "Tutorial part 4: Create data agent"
description: Create a data agent that queries the ontology (preview) in natural language. Part 4 of the ontology (preview) tutorial.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 02/04/2026
ms.topic: tutorial
---

# Ontology (preview) tutorial part 4: Create data agent

Ontology (preview) integrates with [Fabric data agent (preview)](../../data-science/concept-data-agent.md) to let you ask questions in natural language, and get answers grounded in the ontology's definitions and bindings.   

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Create data agent with ontology (preview) source

Follow these steps to create a new data agent that connects to your ontology (preview) item.

1. Go to your Fabric workspace. Use the **+ New item** button to create a new **Data agent (preview)** item named *RetailOntologyAgent*.

    :::image type="content" source="media/tutorial-4-create-data-agent/data-agent-new.png" alt-text="Screenshot of creating a new data agent item." lightbox="media/tutorial-4-create-data-agent/data-agent-new.png":::

    >[!TIP]
    > If you don't see the data agent item type, make sure that it's enabled in your tenant as described in the [tutorial prerequisites](tutorial-0-introduction.md#prerequisites).

1. The agent opens when it's ready. Select **Add a data source**. 

    :::image type="content" source="media/tutorial-4-create-data-agent/add-source.png" alt-text="Screenshot of adding a source to the data agent.":::

    Search for the *RetailSalesOntology* item and select **Add**. Now your ontology is added as a source for the data agent.

When the agent is ready, the ontology and its entity types are visible in the Explorer. 

:::image type="content" source="media/tutorial-4-create-data-agent/data-agent.png" alt-text="Screenshot of the Retail Ontology Agent." lightbox="media/tutorial-4-create-data-agent/data-agent.png":::

## Provide agent instructions

>[!NOTE]
>This step addresses a known issue affecting aggregation in queries.

Next, add a custom instruction to the agent.

1. Select **Agent instructions** from the menu ribbon.
1. At the bottom of the input box, add `Support group by in GQL`. This instruction enables better aggregation across ontology data.

    :::image type="content" source="media/tutorial-4-create-data-agent/agent-instructions.png" alt-text="Screenshot of the agent instructions." lightbox="media/tutorial-4-create-data-agent/agent-instructions.png":::
1. The instruction is applied automatically. Optionally, close the **Agent instructions** tab.

## Query agent with natural language

Next, explore your ontology with natural language questions. 

Start by entering these example prompts:
* *For each store, show any freezers operated by that store that ever had a humidity lower than 46 percent.*
* *What is the top product by revenue across all stores?*

Notice that the responses reference entity types (*Store*, *Products*, *Freezer*) and their relationships, not just raw tables.

:::image type="content" source="media/tutorial-4-create-data-agent/query-result.png" alt-text="Screenshot of the result of a query." lightbox="media/tutorial-4-create-data-agent/query-result.png":::

>[!TIP]
> If you see errors that say there's no data while running the example queries, wait a few minutes to give the agent more time to initialize. Then, run the queries again.

Continue exploring the data agent by trying out some prompts of your own.

## Next steps

In this step, you explored your ontology by using natural language queries and answered business-level questions.

Next, continue to the [tutorial conclusion](tutorial-5-conclusion.md).