---
title: How to create an AI skill (preview)
description: Learn how to create an AI skill
author: fbsolo-ms1
ms.author: avangrootel
ms.reviewer: franksolomon
reviewer: midesa
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 08/05/2024
ms.collection: ce-skilling-ai-copilot

#customer intent: As an Analyst, I want to create an AI skill that relies on generative AI, that my colleagues and I can use to have conversations about our data.

---

# Create an AI skill (preview)

Are you ready for conversations about your data? You can create AI experiences with the AI skill on Fabric, to answer questions over your Lakehouse and Warehouse tables. This technique lowers the barriers for others to answer their data questions, because your colleagues can ask their questions in English and receive data-driven answers.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- An F64 Fabric capacity or higher.
- [Copilot tenant switch](../admin/service-admin-portal-copilot.md) is enabled.
- [Cross-Geo sharing for AI](../admin/service-admin-portal-copilot.md) is enabled, if relevant.
- A Warehouse or Lakehouse with data.

## Creating and configuring an AI skill

Creation and configuration of an AI skill on Fabric involves these steps:

1. Create a new AI skill
1. Select your data
1. Ask the questions
1. Provide examples
1. Provide instructions

It's a straightforward process, and you can begin testing the AI skill resources in minutes.

## Create a new AI skill

Like other standard Fabric items creation processes, you can create a new AI skill from the Fabric Data Science homepage, the workspace New option, or the Create Hub. You must provide a name, as shown in this screenshot:

:::image type="content" source="./media/how-to-create-ai-skill/create-ai-skill.png" alt-text="Screenshot showing creation of an AI skill." lightbox="./media/how-to-create-ai-skill/create-ai-skill.png":::

## Selecting your data

After you create an AI skill, select a data source - either a Data Warehouse or a Lakehouse - on the next screen. Select the Warehouse or Lakehouse, and then select "Connect."

The left nav populates with the available tables in the selected data source. Use the checkboxes to make a table available or unavailable to the AI. You must select at least one table before you can ask the AI skill your questions.

> [!NOTE]
> Make sure to use descriptive column names. Instead of using column names like “C1” or “ActCu,” use “ActiveCustomer” or “IsCustomerActive.” This is the most effective way to get more reliable queries out of the AI.
> Use the Notes for the model in the UI configuration panel. If the AI skill generates incorrect T-SQL queries, you can provide instructions to the model in plain English to improve future queries. The system will use these instructions with every query. Short and direct instructions work best.

## Asking questions

Once you select the data, you can start asking questions. The system handles questions that a single query can answer. This means that questions like

- "What were our total sales in California in 2023?" or
- "What are the most expensive items that have never been sold?"

should work, as shown in this screenshot:

:::image type="content" source="./media/how-to-create-ai-skill/ask.png" alt-text="Screenshot showing a question for an AI skill." lightbox="./media/how-to-create-ai-skill/ask.png":::

These questions are out of scope:

- "Why is our factory productivity lower in Q2 2024?"
- "What is the root cause of our sales spike?"

When you ask a question, the system uses your credentials to fetch the schema. Based on that question, the additional information you provided (see the sections on "Providing Examples" and "Providing Instructions" below), and the schema, the system then constructs a prompt. This prompt is the text that is sent to an AI, which generates multiple SQL queries. After generation of the SQL queries, study them to ensure that they only query the data. Additionally, verify that they don't create, update, delete, or otherwise change your data in any way. Then, extract the best query candidate from the list of generated queries, and make any needed basic repairs on the best AI-generated query. Finally, with your credentials, re-execute the query, and return the result set to you.

## Changing the data source

To switch to another Lakehouse or Warehouse, select the arrows near the top of the Explorer pane, as shown in this screenshot:

:::image type="content" source="./media/how-to-create-ai-skill/change-datasource.png" alt-text="Screenshot showing selection of another datasource." lightbox="./media/how-to-create-ai-skill/change-datasource.png":::

## Configuring the AI skill

The AI skill offers several configuration options that allow creators to customize its behavior to better suit their needs. These configurations provide flexibility in how the AI skill processes and presents data, enabling more control over the outcomes.

### Provide example queries

You can enhance the accuracy of the AI skill's responses by providing it with example SQL queries. This technique, known as **Few Shot Learning** in generative AI, allows you to guide the AI skill in generating answers that align with your expectations.

When you provide the AI with sample query/question pairs, it uses these examples as a reference when answering future questions. The AI will browse through the provided examples to find the most relevant queries that match the new question. This helps the AI incorporate business-specific logic and respond to common queries that end users frequently ask.

If you notice that the AI is not generating the desired SQL queries, you can improve its performance by supplying additional examples.

> [!TIP]
> Providing a diverse set of example queries will enhance the AI skill's ability to generate accurate and relevant SQL queries.

To add examples, click the edit button under "Example SQL Queries" on the right-hand side, as illustrated in the screenshot below:

:::image type="content" source="./media/how-to-create-ai-skill/ai-skill-adding-examples.png" alt-text="Screenshot showing where you can edit the examples you provide to the AI." lightbox="./media/how-to-create-ai-skill/ai-skill-adding-examples.png":::

> [!NOTE]
> The AI skill will only refer to queries that contain valid SQL and match the schema of the selected tables. Queries that have not completed validation will not be used by the AI skill. Make sure that all example queries are valid and correctly aligned with the schema to ensure they are utilized effectively.

### Provide instructions

You can also steer the AI with instructions. You can provide these instructions in the "Notes for the Model" textbox. Here, you can write instructions in English, and the AI uses those instructions when it generates SQL.

If you find that the AI consistently misinterprets certain words or acronyms, you can provide definitions of terms in this section, as shown in this screenshot:

:::image type="content" source="./media/how-to-create-ai-skill/ai-skill-adding-instructions.png" alt-text="Screenshot showing where you can edit the instructions you provide to the AI." lightbox="./media/how-to-create-ai-skill/ai-skill-adding-instructions.png":::

### Customize SQL query variations

The **SQL Query Variations** setting controls the variability in the number of SQL queries the AI skill generates before determining the final query. By adjusting this setting, creators can influence how many different SQL queries the AI skill will evaluate before arriving at the final query.

If you want the AI skill to explore more possible query paths before choosing the most appropriate one, increase the SQL Query Variations setting. This can be particularly useful in complex scenarios where multiple potential query structures might yield the desired result.

### Show executed SQL query

The **Show executed SQL query** setting allows creators to debug the results produced by the AI skill. When enabled, this setting provides visibility into the final SQL query generated by the AI skill that was used to produce the final output.

You can enable this setting if you need to verify or troubleshoot the SQL queries generated by the AI skill. This is particularly valuable for understanding how the AI skill constructs queries and ensuring they align with the expected logic and structure.

## Related content

- [AI skill concept](concept-ai-skill.md)
- [AI skill scenario](ai-skill-scenario.md)