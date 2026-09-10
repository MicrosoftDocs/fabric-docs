---
title: "Tutorial Part 4: Consume Ontology from Agents"
description: Create a data agent that queries the ontology (preview) in natural language. Part 4 of the ontology (preview) tutorial.
ms.date: 06/16/2026
ms.topic: tutorial
---

# Ontology (preview) tutorial part 4: Consume ontology from agents

In this tutorial step, learn about consuming ontology (preview) from agents to ask questions in natural language and get answers grounded in the ontology's definitions and bindings. Try it out with a data agent.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Using AI agents with ontology

AI agents can help users move from static analysis to interactive, goal-oriented workflows by understanding natural language, planning steps, calling tools, and taking action on behalf of the user. When agents use an ontology as context, they gain a governed understanding of the business: key entities, relationships, definitions, rules, metrics, and source mappings. This helps agents produce responses that are more grounded, explainable, and consistent across systems instead of relying only on raw data or prompts.

There are multiple ways to build agents that consume ontology context:
* [Foundry IQ](/azure/foundry/what-is-foundry): Azure AI Foundry agents help developers build more advanced, customizable agents that can reason over ontology context, call tools, and integrate with enterprise systems. For more information about building an ontology agent with Foundry IQ, see [Create an ontology agent with Foundry IQ](how-to-create-agent-foundry-iq.md).
* [Copilot Studio](/microsoft-copilot-studio/fundamentals-what-is-copilot-studio): Copilot Studio helps business and low-code makers quickly create conversational agents that use ontology context to answer business questions and automate workflows. For more information about building an ontology agent with Copilot Studio, see [Create an ontology agent with Copilot Studio](how-to-create-agent-copilot-studio.md).
* [Fabric data agent](../../data-science/concept-data-agent.md): Fabric data agents help users create data-grounded agents directly in Fabric that can answer business questions using governed enterprise data, with ontology context adding richer business meaning, relationships, and consistency.
* [Fabric operations agent](../../real-time-intelligence/operations-agent.md): Fabric operations agents continuously monitor your ontology, surface insights against your business goals, and recommend actions—all grounded within the ontology's entity types and relationships. For more information about building an operations agent with ontology, see [Create an operations agent grounded in an ontology](how-to-create-operations-agent.md).

This article uses Fabric data agent.

## Create data agent with ontology (preview) source

Follow these steps to create a new data agent that connects to your ontology (preview) item.

1. Go to your Fabric workspace. Use the **+ New item** button to create a new **Data agent** item named *RetailOntologyAgent*.

    :::image type="content" source="media/tutorial-4-create-data-agent/data-agent-new.png" alt-text="Screenshot of creating a new data agent item." lightbox="media/tutorial-4-create-data-agent/data-agent-new.png":::

    >[!TIP]
    > If you don't see the data agent item type, make sure that it's enabled in your tenant as described in the [tutorial prerequisites](tutorial-0-introduction.md#prerequisites).

1. The agent opens when it's ready. Select **Add a data source**. 

    :::image type="content" source="media/tutorial-4-create-data-agent/add-source.png" alt-text="Screenshot of adding a source to the data agent." lightbox="media/tutorial-4-create-data-agent/add-source.png":::

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

In this step, you explored your ontology by using natural language queries to answer business questions with a data agent.

Next, continue to the [tutorial conclusion](tutorial-5-conclusion.md).

Alternatively, explore other agents that can be used with ontology:
* [Create an ontology agent with Foundry IQ](how-to-create-agent-foundry-iq.md)
* [Create an ontology agent with Copilot Studio](how-to-create-agent-copilot-studio.md)
