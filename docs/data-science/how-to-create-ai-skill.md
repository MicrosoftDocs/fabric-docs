---
title: Create an AI skill (preview)
description: Learn how to create an AI skill.
author: fbsolo-ms1
ms.author: avangrootel
ms.reviewer: franksolomon
reviewer: avangrootel
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 08/05/2024
ms.collection: ce-skilling-ai-copilot

#customer intent: As an Analyst, I want to create an AI skill that relies on generative AI, that my colleagues and I can use to have conversations about our data.

---

# Create an AI skill (preview)

Are you ready for conversations about your data? You can create AI experiences with the AI skill on Microsoft Fabric to answer questions over your lakehouse and warehouse tables. This technique lowers the barriers for others to answer their data questions, because your colleagues can ask their questions in English and receive data-driven answers.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- An F64 Fabric capacity or higher.
- [Copilot tenant switch](../admin/service-admin-portal-copilot.md) is enabled.
- [Cross-geo sharing for AI](../admin/service-admin-portal-copilot.md) is enabled, if relevant.
- A warehouse or lakehouse with data.

## Create and configure an AI skill

Creation and configuration of an AI skill on Fabric involves these steps:

1. Create a new AI skill.
1. Select your data.
1. Ask the questions.
1. Provide examples.
1. Provide instructions.

The process is straightforward and you can begin testing the AI skill resources in minutes.

## Create a new AI skill

Like other standard Fabric items creation processes, you can create a new AI skill from the Fabric **Data Science** home page, by selecting the workspace **New** option, or by using the Create Hub. You must provide a name.

:::image type="content" source="./media/how-to-create-ai-skill/create-ai-skill.png" alt-text="Screenshot showing creation of an AI skill." lightbox="./media/how-to-create-ai-skill/create-ai-skill.png":::

## Select your data

After you create an AI skill, you select a data source. It can be either a data warehouse or a lakehouse. On the next screen, select the warehouse or lakehouse, and then select **Connect**.

The left pane populates with the available tables in the selected data source. Use the checkboxes to make a table available or unavailable to the AI. You must select at least one table before you can ask the AI skill your questions.

> [!NOTE]
> Make sure to use descriptive column names. Instead of using column names like `C1` or `ActCu`, use `ActiveCustomer` or `IsCustomerActive`. Using descriptive names is the most effective way to get more reliable queries out of the AI.
> Use the notes for the model in the UI configuration panel. If the AI skill generates incorrect T-SQL queries, you can provide instructions to the model in plain English to improve future queries. The system will use these instructions with every query. Short and direct instructions work best.

## Ask questions

After you select the data, you can start asking questions. The system handles questions that a single query can answer. Questions like the following examples should work:

- "What were our total sales in California in 2023?"
- "What are the most expensive items that have never been sold?"

:::image type="content" source="./media/how-to-create-ai-skill/ask.png" alt-text="Screenshot showing a question for an AI skill." lightbox="./media/how-to-create-ai-skill/ask.png":::

These questions are out of scope:

- "Why is our factory productivity lower in Q2 2024?"
- "What is the root cause of our sales spike?"

When you ask a question, the system uses your credentials to fetch the schema. Based on the question, the system uses the information you provided (see the sections "Provide examples" and "Provide instructions") and the schema to construct a prompt. This prompt is the text that's sent to an AI, which generates multiple SQL queries.

After generation of the SQL queries, study them to ensure that they only query the data. Also, verify that they don't create, update, delete, or otherwise change your data in any way. Then, extract the best query candidate from the list of generated queries. Make any needed basic repairs on the best AI-generated query. Finally, with your credentials, reexecute the query and return the result set to you.

## Change the data source

To switch to another lakehouse or warehouse, select the arrows near the top of the **Explorer** pane.

:::image type="content" source="./media/how-to-create-ai-skill/change-datasource.png" alt-text="Screenshot showing selection of another data source." lightbox="./media/how-to-create-ai-skill/change-datasource.png":::

## Provide examples

In Fabric, you can configure the AI skill so that the AI answers your questions as you would expect. One technique is to provide examples to the AI. In generative AI, this technique is referred to as *few shot learning*. Here, you give the AI access to query or question pairs. The next time you ask a question, the AI finds the most relevant questions in the set of questions that you provided. These questions, together with the corresponding SQL query you provided, give background to the AI as it generates the SQL.

If you find that the AI doesn't generate the right queries, you can provide more examples.

To provide examples, you can select the edit button under **Example SQL Queries** on the right side.

:::image type="content" source="./media/how-to-create-ai-skill/ai-skill-adding-examples.png" alt-text="Screenshot showing where you can edit the examples you provide to the AI." lightbox="./media/how-to-create-ai-skill/ai-skill-adding-examples.png":::

## Provide instructions

You can also steer the AI with instructions. You can provide these instructions in the **Notes for model** text box. Here, you can write instructions in English. The AI uses those instructions when it generates SQL.

If you find that the AI consistently misinterprets certain words or acronyms, you can provide definitions of terms in this section.

:::image type="content" source="./media/how-to-create-ai-skill/ai-skill-adding-instructions.png" alt-text="Screenshot showing where you can edit the instructions you provide to the AI." lightbox="./media/how-to-create-ai-skill/ai-skill-adding-instructions.png":::

## Related content

- [AI skill concept](concept-ai-skill.md)
- [AI skill scenario](ai-skill-scenario.md)