---
title: How to Create an AI Skill (preview)
description: Learn how to create an AI Skill
author: IAmGrootel
ms.author: avangrootel
ms.reviewer: franksolomon
reviewer: avangrootel
ms.service: AI Skill
ms.topic: how-to #Don't change
ms.date: 06/05/2024

#customer intent: As an Analyst, I want to create an AI Skill that relies on generative AI, that my colleagues and I can use to have conversations about our data.

---

# Create an AI Skill (previews)

Are you ready to have conversations about your data? You can create AI experiences with the AI Skill on Fabric, to answer questions over your Lakehouse and Warehouse tables. This technique lowers the barriers for others to answer their data questions, because your colleagues can ask their questions in English and receive data-driven answers.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- An F64 Fabric capacity or higher.
- [Copilot tenant switch](../admin/service-admin-portal-copilot.md) is enabled.
- [Cross-Geo sharing for AI](../admin/service-admin-portal-copilot.md) is enabled, if relevant.
- A Warehouse or Lakehouse with data.

## Creating and configuring an AI Skill

Creation and configuration of an AI Skill on Fabric involves these steps:

1. Create a new AI Skill
1. Select your data
1. Ask the questions
1. Provide examples
1. Provide instructions

It's a straightforward process, and you can begin testing the AI Skill resources in minutes.

## Create a new AI Skill

Like other standard Fabric items creation processes, you can create a new AI Skill from the Fabric Data Science homepage, the workspace New option, or the Create Hub. You must provide a name, as show in this screenshot:

:::image type="content" source="./media/how-to-create-ai-skill/create-ai-skill.png" alt-text="Screenshot showing creation of an AI Skill." lightbox="./media/how-to-create-ai-skill/create-ai-skill.png":::

You just created your first AI Skill!

## Selecting your data

After you create an AI Skill, you select a data source - either a Data Warehouse or a Lakehouse - on the next screen. Select the Warehouse or Lakehouse, and then select "Connect."

The left nav populates with the available tables in the selected data source. Use the checkboxes to make a table available or unavailable to the AI. You must select at least one table before you can ask the AI Skill your questions.

## Asking questions

Once you select the data, you can start asking questions. The system handles questions that a single query can answer. This means that questions like

- "What were our total sales in California in 2023?" or
- "What are the most expensive items that have never been sold?"

should work, as shown in this screenshot:

:::image type="content" source="./media/how-to-create-ai-skill/ask.png" alt-text="Screenshot showing a question for an AI Skill." lightbox="./media/how-to-create-ai-skill/ask.png":::

Questions like

- "Why is our factory productivity lower in Q2 2024?"

are out of scope.

When you ask a question, the system uses your credentials to fetch the schema. Based on that question, the additional information you provided (see "Providing Examples" and "Providing Instructions" later on), and the schema, the system then constructs a prompt. This prompt is the text that is sent to an AI, which generates multiple SQL queries. After generation of the SQL queries, we parse them to ensure that they only query the data. Additionally, we verify that they don't create, update, delete, or otherwise change your data in any way. We then extract the best query candidate from the list of generated queries, and make some basic repairs on the best AI-generated query. Finally, with your credentials, we once again execute the query, and return the result set to you.

## Changing the data source

To switch to another Lakehouse or Warehouse, select the arrows near the top of the Explorer pane, as shown in this screenshot:

:::image type="content" source="./media/how-to-create-ai-skill/change-datasource.png" alt-text="Screenshot showing selection of another datasource." lightbox="./media/how-to-create-ai-skill/change-datasource.png":::

## Providing examples

Ideally, you can steer the AI with the AI Skill, so that the AI answers your questions in the way you expect. One technique is to provide examples to the AI. In generative AI, we refer to this as Few Shot Learning. Here, you give the AI access to query/question pairs. The next time you ask a question, you'll find the most relevant questions in the set of questions that you provided. These questions, together with the corresponding SQL query you provided, give background to the AI as it generates the SQL.

If you find that the AI doesn't generate the right queries, you can provide more examples.

<todo - provide an image>

## Providing instructions

To steer the AI, you can provide instructions in the "Notes for the Model" textbox as another option. Here, you can write instructions in English, and the AI will try its best to use those instructions to generate SQL.

You can fit much information in this option. If you find that the AI consistently misinterprets certain words or acronyms, you can provide definitions of terms in this section.

<todo - add an image>

## Next step -or- Related content

> [!div class="nextstepaction"]
> [Next sequential article title](./how-to-create-ai-skill.md)

-or-

- [AI Skill Scenario](ai-skill-scenario.md)
- [AI Skill Concept](concept-ai-skill.md)

<!-- Optional: Next step or Related content - H2

Consider adding one of these H2 sections (not both):

A "Next step" section that uses 1 link in a blue box 
to point to a next, consecutive article in a sequence.

-or- 

A "Related content" section that lists links to 
1 to 3 articles the user might find helpful.

-->

<!--

Remove all comments except the customer intent
before you sign off or merge to the main branch.

-->