---
title: Consume a data agent from Copilot in Power BI (preview)
description: Learn how to consume a data agent from Copilot in Power BI.
author: jonburchel
ms.author: jburchel
ms.reviewer: amjafari
reviewer: midesa
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 01/09/2026
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
#customer intent: As an Analyst, I want to consume a Fabric data agent from Copilot in Power BI.
---

# Consume a Fabric data agent from Copilot in Power BI (preview)

Copilot in Power BI lets you ask natural language questions while viewing reports and get answers from items you can access across Fabric. Use Copilot from the Copilot pane; this feature does not add a visual to the report canvas. Copilot helps you stay focused on insight extraction without switching between Fabric items.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- [General Copilot requirements](/power-bi/create-reports/copilot-introduction#copilot-requirements)
- Open a report in the Power BI service or Power BI Desktop and open the Copilot pane

You can consume a Fabric data agent directly within Copilot in Power BI in two ways:

## Use Copilot search to find and invoke a Fabric data agent

When you ask a question in Copilot in Power BI, it

- scans all available items you have permissions to access
  - Power BI semantic models
  - Power BI reports
  - Fabric data agents
- ranks and suggests the most relevant items based on your query
- offers suggested items to help you choose the most appropriate answer source

The following screenshot shows answers a Copilot in Power BI query might return:

:::image type="content" source="./media/data-agent-copilot-powerbi/search-items.png" alt-text="Screenshot showing answers that a Copilot in Power BI query might return." lightbox="./media/data-agent-copilot-powerbi/search-items.png":::

The following screenshot shows data that a Copilot in Power BI query might return:

:::image type="content" source="./media/data-agent-copilot-powerbi/user-item-selection.png" alt-text="Screenshot showing data that a Copilot in Power BI query might return." lightbox="./media/data-agent-copilot-powerbi/user-item-selection.png":::

## Directly add a Fabric data agent

If you already know which data agent to use, manually add that data agent to the Copilot session. Select **Add items for better results**, and then select **Data agents**. The OneLake catalog opens and lists all data agents you have permissions to access. Copilot uses the selected data agent for relevant follow-up questions, as shown in the following screenshot:

:::image type="content" source="./media/data-agent-copilot-powerbi/attach-item.png" alt-text="Screenshot that shows attachment of an item to Copilot in Power BI." lightbox="./media/data-agent-copilot-powerbi/attach-item.png":::

After you select an item, that selected item is attached to your question. Then, Copilot in Power BI uses the added item to retrieve the answer to the question, as shown in the following screenshot:

:::image type="content" source="./media/data-agent-copilot-powerbi/attached-data-agent.png" alt-text="Screenshot showing data agent is attached to the copilot in power bi." lightbox="./media/data-agent-copilot-powerbi/attached-data-agent.png":::

Copilot might not return a useful answer to a question outside the scope of the data agent you added. When you change topics, tell Copilot so it can perform a new search across these resources: Power BI semantic models, Power BI reports, and Fabric data agents.


## Interaction flow with a Fabric data agent

When you select a Fabric data agent, Copilot in Power BI proceeds with these steps to retrieve an answer:

1. Rephrase the question: Copilot in Power BI might rephrase a question to fit the context or improve clarity, based on the conversation.
1. Send the query: Copilot in Power BI sends the question to the selected Fabric data agent.
1. Fabric data agent answer retrieval: The data agent identifies the most relevant data source (lakehouse, warehouse, semantic model, KQL database, or ontology) and queries that data source. Data security protocols, such as row-level security (RLS) and column-level security (CLS), are enforced based on user permissions.
1. Response delivery: The Fabric data agent sends the answer back to Copilot in Power BI.
1. Final user presentation: Copilot in Power BI presents the answer directly to the user in the conversation interface.

## Related content

- [Data agent concept](concept-data-agent.md)
- [Data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)
- [Fabric data agent sharing](data-agent-sharing.md)