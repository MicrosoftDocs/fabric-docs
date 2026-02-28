---
title: Fabric AI Prompt in Dataflow Gen2
description: Learn how to use Fabric AI Functions Prompt in Dataflow Gen2.
ms.reviewer: miescobar
ms.topic: concept-article
ms.date: 03/15/2026
ms.custom: dataflows
ai-usage: ai-assisted
ms.collection: ce-skilling-ai-copilot
---

# Fabric AI Prompt in Dataflow Gen2

[Fabric AI Functions](/fabric/data-science/ai-functions/overview) are prebuilt capabilities in Microsoft Fabric that help you apply generative AI without building models or managing infrastructure. You can call these functions in experiences such as Dataflow Gen2, notebooks, and low-code tools.

In Dataflow Gen2 (CI/CD), you can use **Prompt** to send an instruction and optional context from selected columns.

## Add an AI Prompt column

1. In the Power Query editor, select a table.
1. On the **Add column** tab, select **Add AI Prompt column**.

:::image type="content" source="media/dataflow-gen2-ai-functions/add-ai-prompt-column.png" alt-text="Screenshot of AI Prompt entry in the Add column tab of the Power Query editor ribbon." lightbox="media/dataflow-gen2-ai-functions/add-ai-prompt-column.png":::

In the dialog, enter your prompt and choose which columns to include as context.

:::image type="content" source="media/dataflow-gen2-ai-functions/dialog.png" alt-text="Screenshot of AI Prompt dialog in Dataflow Gen2 (CI/CD)." lightbox="media/dataflow-gen2-ai-functions/dialog.png":::

>[!TIP]
>Learn how to craft more effective prompts to get higher-quality responses by following [OpenAI's prompting tips for gpt-4.1](https://cookbook.openai.com/examples/gpt4-1_prompting_guide#2-long-context).

## Considerations and limitations

- This feature incurs Fabric AI Functions charges. Costs are reported under the operation name [**AI Functions**](/enterprise/fabric-operations) when queries run in the data preview and during run operations.
- VNet Gateway support isn't currently available.
- Dataflow Gen2 creates a cloud connection for Fabric AI Functions the first time you use this feature. To update connection settings, go to [Manage connections](/power-query/manage-connections).
- If your query uses other data sources, set privacy levels before Dataflow Gen2 can send data to AI Functions. If needed, the preview shows *Information is required about data privacy.* so you can configure missing privacy settings.
