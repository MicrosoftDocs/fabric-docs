---
title: Fabric AI Prompt in Dataflow Gen2 (Preview)
description: Feature documentation for the Fabric AI Functions integration inside of Dataflow Gen2
ms.reviewer: whhender
ms.author: miescobar
author: ptyx507x
ms.topic: conceptual
ms.date: 11/17/2025
ms.custom: dataflows
ai-usage: ai-assisted
ms.collection: ce-skilling-ai-copilot
---

# Fabric AI Prompt in Dataflow Gen2 (Preview)

>[!NOTE]
>Fabric AI Prompt in Dataflow Gen2 is currently in preview and only available for Dataflow Gen2 (CI/CD).

[Fabric AI Functions](/fabric/data-science/ai-functions/overview) are prebuilt, generative AI-powered capabilities integrated into Microsoft Fabric, designed to make advanced AI tasks accessible without requiring deep machine learning expertise. Instead of building models or managing infrastructure, you can invoke these functions with a single line of code inside Fabric experiences like Dataflow Gen2, notebooks, and low-code environments.
They use large language models (LLMs) (such as GPT-based models) through Fabric’s built-in AI endpoint.

The integration with Dataflow Gen2 (CI/CD) allows you to use the **Prompt** capability to pass a prompt of your choice and, optionally, the context associated with the prompt.

You can start using this experience from within the *Add column* tab in the ribbon using the entry with the name **Add AI Prompt column** when selecting a table. 

:::image type="content" source="media/dataflow-gen2-ai-functions/add-ai-prompt-column.png" alt-text="Screenshot of AI Prompt entry in the Add column tab of the Power Query editor ribbon." lightbox="media/dataflow-gen2-ai-functions/add-ai-prompt-column.png":::

This experience displays a dialog where you can pass your prompt and you can choose which columns from your table to pass as added context for your prompt.

:::image type="content" source="media/dataflow-gen2-ai-functions/dialog.png" alt-text="Screenshot of AI Prompt dialog in Dataflow Gen2 (CI/CD)." lightbox="media/dataflow-gen2-ai-functions/dialog.png":::

## Considerations and limitations

* Using this feature incurs costs for Dataflow Gen2 (CI/CD), reported under the operation name **Dataflow Gen2 Run Queries** when evaluating queries in the data preview and during run operations.
* Gateway support isn't available at this time.
* Enable "Allow combining data from multiple sources" in the *Privacy* section of the *Options* dialog to use this feature with other data sources.
:::image type="content" source="media/dataflow-gen2-ai-functions/allow-combining-data.png" alt-text="Screenshot of the Options dialog showing the setting for Allow combining data from multiple sources." lightbox="media/dataflow-gen2-ai-functions/allow-combining-data.png":::
