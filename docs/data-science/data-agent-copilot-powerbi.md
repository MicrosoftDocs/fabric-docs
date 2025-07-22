---
title: Consume a data agent from Copilot in Power BI (preview)
description: Learn how to consume a data agent from Copilot in Power BI.
author: jonburchel
ms.author: amjafari
ms.reviewer: jburchel
reviewer: midesa
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 05/09/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot

#customer intent: As an Analyst, I want to consume a Fabric data agent from Copilot in Power BI.

---

# Consume a Fabric Data Agent from Copilot in Power BI (preview)

Copilot in Power BI offers an immersive experience for users to ask natural language questions and receive accurate, relevant answers across their available items in Fabric. With Copilot in Power BI, you can directly interact with the Copilot and avoid the need to switch between different Fabric items. In a typical experience, you might have access to many different items, but they might have quite a challenge to find the correct resource to answer a specific question. With Copilot in Power BI, you can maintain their focus on insight extraction instead of distractions focused on different items.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- [General Copilot requirements](/power-bi/create-reports/copilot-introduction#copilot-requirements)

Through integration of Fabric data agent and Copilot in Power BI, you can consume data agent directly within Copilot in Power BI in two ways:

## Use Copilot search to find and invoke a Fabric Data Agent

When you ask a question in Copilot in Power BI, it

- scans all available items you have permissions to access
  - Power BI semantic models
  - Power BI reports, and
  - Fabric Data agents
- ranks and suggests the most relevant items, based on your query
- offers you suggested items from which to choose, to then make the most appropriate choice

The following screenshot shows answers a Copilot in Power BI query might return:

:::image type="content" source="./media/data-agent-copilot-powerbi/search-items.png" alt-text="Screenshot showing answers that a Copilot in Power BI query might return." lightbox="./media/data-agent-copilot-powerbi/search-items.png":::

The following screenshot shows data that a Copilot in Power BI query might return:

:::image type="content" source="./media/data-agent-copilot-powerbi/user-item-selection.png" alt-text="Screenshot showing data that a Copilot in Power BI query might return." lightbox="./media/data-agent-copilot-powerbi/user-item-selection.png":::

## Directly add a Fabric Data Agent

If you already know which data agent to use, you can manually add that data agent to the Copilot session. Select **Add items for better results**, and then select **Data agents**. The OneLake catalog opens, which lists all data agents you have permissions to access. Copilot uses the selected data agent for relevant follow-up questions, as shown in the following screenshot:

:::image type="content" source="./media/data-agent-copilot-powerbi/attach-item.png" alt-text="Screenshot that shows attachment of an item to Copilot in Power BI." lightbox="./media/data-agent-copilot-powerbi/attach-item.png":::

After you select an item, that selected item is attached to your question. Then, Copilot in Power BI uses the added item to retrieve the answer to the question, as shown in the following screenshot:

:::image type="content" source="./media/data-agent-copilot-powerbi/attached-data-agent.png" alt-text="Screenshot showing data agent is attached to the copilot in power bi." lightbox="./media/data-agent-copilot-powerbi/attached-data-agent.png":::

Copilot might not return a useful answer to a question outside the scope of the data agent you added. In these cases, you must explicitly indicate that the topic changed, so that Copilot can perform a new search across these resources: Power BI semantic model, Power BI Report, and Fabric data agent.


## Interaction flow with a Fabric Data Agent

When you select a Fabric Data Agent, Copilot in Power BI proceeds with these steps to retrieve an answer:

1. Rephrase the question: Copilot in Power BI might rephrase a question to fit the context or to improve clarity, based on the conversation.
1. Send the query: Copilot in Power BI sends the question to the selected Fabric Data Agent.
1. Fabric Data Agent answer retrieval: The data agent identifies the most relevant data source (lakehouse, warehouse, semantic model, or KQL database) and queries that data source. Data security protocols - for example, Row-Level Security (RLS) and Column-Level Security (CLS) are enforced based on user permissions.
1. Response delivery: The Fabric Data Agent sends the answer back to Copilot in Power BI.
1. Final user presentation: Copilot in Power BI then presents the answer directly to the user in the conversation interface.

## Related content

- [Data agent concept](concept-data-agent.md)
- [Data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)
- [Fabric data agent sharing](data-agent-sharing.md)