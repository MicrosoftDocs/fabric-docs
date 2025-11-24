---
title: "Tutorial: Create data agent"
description: Create a data agent that queries the ontology (preview) in natural language.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 10/30/2025
ms.topic: tutorial
---

# Ontology (preview) tutorial part 4: Create data agent

Ontology (preview) integrates with [Fabric data agent (preview)](../../data-science/concept-data-agent.md), allowing you to ask questions in natural language and get answers grounded in the ontology's definitions and bindings. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Create data agent with ontology (preview) source

Follow these steps to create a new data agent that is connected to your ontology (preview) item.

1. Go to your Fabric workspace and create a new data agent (preview) item named *RetailOntologyAgent*. For detailed instructions, see [Create a Fabric data agent (preview)](../../data-science/how-to-create-data-agent.md#create-a-new-fabric-data-agent).

    >[!TIP]
    > If you don't see the data agent item type, make sure that it's enabled in your tenant as described in the [tutorial prerequisites](tutorial-0-introduction.md#prerequisites).

1. Add *RetailSalesOntology* as a data source for the data agent. For detailed instructions, see [Create a Fabric data agent (preview)](../../data-science/how-to-create-data-agent.md#select-your-data).

When the agent is ready, it opens.

:::image type="content" source="media/tutorial-4-create-data-agent/data-agent.png" alt-text="Screenshot of the Retail Ontology Agent." lightbox="media/tutorial-4-create-data-agent/data-agent.png":::

## Query agent with natural language

Next, explore your ontology with natural language questions. 

Start with these example prompts:
* *For each store, show any timestamps where a freezer operated by that store had a temperature higher than -18 degrees C, and the total units sold that day.*
* *List the top three products by revenue in Paris stores.*
* *Do stores with higher freezer temperatures correlate with lower daily sales? Explain the evidence.*

Notice that the responses reference entity types (*Store*, *SaleEvent*, *Product*, *Freezer*) and their relationships, not just raw tables.

:::image type="content" source="media/tutorial-4-create-data-agent/query-result.png" alt-text="Screenshot of the result of a query." lightbox="media/tutorial-4-create-data-agent/query-result.png":::

Continue exploring the data agent by trying out some prompts of your own.

>[!TIP]
>When you're using data agent with ontology, if the agent's answers are too generic, make sure that the agent includes the ontology as a knowledge source. Also, make sure that entity and relationship names are meaningful and documented in the ontology.

## Next steps

In this step, you explored your ontology with natural language queries and answered business level questions.

Next, continue to the [tutorial conclusion](tutorial-5-conclusion.md).