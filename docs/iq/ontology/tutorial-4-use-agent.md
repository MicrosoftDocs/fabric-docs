---
title: "Tutorial Part 4: Use the Ontology Agent (Preview)"
description: Use the ontology agent to query the ontology (preview) in natural language. Part 4 of the ontology (preview) tutorial.
ms.date: 09/14/2026
ms.topic: tutorial
---

# Ontology (preview) tutorial part 4: Use the ontology agent

In this tutorial step, use the ontology agent to ask questions in natural language and get answers grounded in the ontology's definitions and bindings.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Get started with ontology agent

The [ontology agent (preview)](how-to-use-ontology-agent.md) is an AI-powered Copilot that helps you build and operate ontologies over the data in your Microsoft Fabric workspace by using a chat interface and natural language.

To access the ontology agent, select **Ontology agent** from the top ribbon in the home canvas. The agent opens in a pane on the right side of the screen.

:::image type="content" source="media/tutorial-4-use-agent/open-agent.png" alt-text="Screenshot of opening the ontology agent from the ribbon." lightbox="media/tutorial-4-use-agent/open-agent.png":::

The agent opens in **Plan** mode by default. In Plan mode, the agent can query and explore the ontology, but it doesn't make any changes.

## Ask questions in natural language

Interact with the ontology agent to ask questions about the scenario in natural language.

Enter the following question in the ontology agent text box and send it: *Which frozen products are stocked at Tier 1 stores in the West?*

The agent reasons for a short time and then provides an answer from your ontology:

:::image type="content" source="media/tutorial-4-use-agent/answer.png" alt-text="Screenshot of the agent listing three items in answer to the question." lightbox="media/tutorial-4-use-agent/answer.png":::

Explore the ontology further with the following queries, or create some of your own:
- Which of those inventory positions are below safety stock?
- Which affected stores had a qualifying refrigeration-temperature exception?
- What inbound shipments are expected for the affected products and stores?
- What is the on-shelf availability of frozen products for each store?
- Which of these stores have low on-shelf availability?
- Which of these stores have declining gross margin this month?
- Which of these stores have declining gross margin?

### Answer scenario question

Use the agent to answer the major question of the Lakeshore Retail scenario: *Which high-priority stores in the West have frozen products below safety stock, a recent refrigeration-temperature exception, and on-shelf availability below target? For each store, show the next inbound shipment and its expected arrival.*

The agent considers your ontology and queries your data sources, then provides an answer to the question.

:::image type="content" source="media/tutorial-4-use-agent/answer-main-scenario.png" alt-text="Screenshot of the agent listing two stores with columns containing the requested information." lightbox="media/tutorial-4-use-agent/answer-main-scenario.png":::

## Next steps

In this step, you explored your ontology by using natural language queries to answer business questions with the ontology agent.

Next, continue to the [tutorial conclusion](tutorial-5-conclusion.md).
