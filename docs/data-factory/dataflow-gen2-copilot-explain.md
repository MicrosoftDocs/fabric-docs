---
title: Copilot explainer skill in Dataflow Gen2
description: Overview of the Copilot explainer skill in Dataflow Gen2 and its different entry points and use cases
ms.reviewer: miescobar
ms.topic: concept-article
ms.date: 10/19/2026
ms.custom: dataflows
ms.collection: ce-skilling-ai-copilot
ms.update-cycle: 180-days
ai-usage: ai-assisted
---
# Copilot explainer skill in Dataflow Gen2

>[!NOTE]
>This capability is part of the Fabric Data Factory Copilot experience. Find more information about this capability and how to enable it from the article [What is Copilot in Fabric in the Data Factory workload](copilot-fabric-data-factory.md).

The Copilot explainer skill in Dataflow Gen2 is an AI-powered assistant within Microsoft Fabric's Data Factory workload that helps you interpret Mashup (Power Query M) code in natural language.

In the new Copilot experience in Dataflow Gen2 (preview), select a query or an applied step and ask Copilot to explain it. Copilot can use your current selection as context. You can ask follow-up questions in the same conversation, such as how a filter affects the result or which sources a query uses.

> [!NOTE]
> The new experience is in preview and is specific to Dataflow Gen2, not pipeline Copilot. To switch back to the legacy Copilot experience, use the toggle in the top-right corner of the Copilot pane when no response is active. For all available actions, see [Supported tools and capabilities in Dataflow Gen2 (preview)](copilot-fabric-data-factory.md#supported-tools-and-capabilities-in-dataflow-gen2-preview).

For example, ask "Explain my current query" or "Explain this step and the columns it changes." Include the query or step name if your request could be ambiguous. Review the explanation against the M code and data preview; an explanation doesn't guarantee that the query is correct.

The following screenshots show the context-menu and pane entry points. Their appearance can differ depending on the Copilot experience available to you.

The experience allows you to explain the full query or a particular step of a query:

- **Explain this query**: Trigger this experience through the Copilot pane or by right-clicking your queries in the Queries pane and selecting *Explain* or *Describe*.

:::image type="content" source="media/dataflow-gen2-copilot-explain/explain-query.png" alt-text="Screenshot showcasing entry points in the Dataflow Gen2 user interface for Queries and Copilot pane to trigger the copilot explain experience." lightbox="media/dataflow-gen2-copilot-explain/explain-query.png":::

- **Explain this step**: When you select only a step inside a query through the applied steps section, right-click the step and select *explain* from the list.

:::image type="content" source="media/dataflow-gen2-copilot-explain/explain-step.png" alt-text="Screenshot of the right-click context menu for a step showing the entry for the Copilot explain this query experience." lightbox="media/dataflow-gen2-copilot-explain/explain-step.png":::

## Related content

- [What is Copilot in Fabric in the Data Factory workload?](copilot-fabric-data-factory.md)
- [Get started with Copilot in Fabric in the Data Factory workload](copilot-fabric-data-factory-get-started.md)
- [What is Dataflow Gen2?](dataflows-gen2-overview.md)
