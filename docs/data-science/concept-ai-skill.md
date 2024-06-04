---
title: AI Skill Creation (preview)
titleSuffix: AI Skill Creation
description: Learn how to create an AI Skill that can answer questions about data.
author: IAmGrootel
ms.author: avangrootel
ms.reviewer: franksolomon
reviewer: avangrootel
ms.service: AISkill
ms.topic: concept-article #Don't change; maybe should change to "conceptual".
ms.date: 06/05/2024

#customer intent: As a Data Analyst, I want to create an AI Skill so that I can make it easier for me and my colleagues to get answers from data.

---

# AI Skill concepts (preview)

With the Fabric AI Skill, you can make data more accessible to your colleagues. You can configure a Generative AI system to generate queries that answer questions about your data. After you configure the AI Skill, you can share it with your colleagues, who can then ask their questions in plain English. Based on their questions, the AI generates queries over your data that answer those questions.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

**A concept article typically does not have a prerequisites block**

- An F64 Fabric capacity or higher.
- [Copilot tenant switch](../admin/service-admin-portal-copilot) is enabled.
- [Cross-Geo sharing for AI](../admin/service-admin-portal-copilot) is enabled, if relevant.
- A Warehouse or Lakehouse in Fabric with tables of data you want to access.

## How the AI Skill works

The AI Skill relies on Generative AI - specifically, Large Language Models (LLMs). These LLMs can generate queries, for example, SQL queries, based on a given schema and a question. The system sends a question in the AI Skill, information about the selected data (including the table and column names, and the data types found in the tables) to the LLM. Next, it requests generation of a SQL query that answers the question. We parse the generated query to first ensure that it doesn't change the data in any way, and then execute that query. Finally, we show the query execution results.

## Configuring the AI Skill

The AI Skill is a creator experience. You should expect to handle some necessary configuration steps before the AI Skill works properly. An AI Skill can often provide out-of-the-box answers to reasonable questions, but could provide incorrect answers for your specific situation. The incorrect answers typically happen because the AI is missing context about your specific company, setup, or definition of key terms. To solve the problem, provide it with instructions and example question-query pairs. You can use these powerful techniques to guide the AI to the right answers. Over time, we expect that it will become easier to provide information to the AI.

## Difference between an AI Skill and a Copilot

The technology behind the AI Skill and the Fabric Copilots is similar. They both use Generative AI to reason over data. However, they have some key differences:

1. **Configuration:** The AI Skill empowers you to configure the AI to behave the way you need. You can provide it with instructions and examples that tune it to your specific use case. A Fabric Copilot doesn't offer this configuration flexibility.

1. **Use Case**: A Copilot can help you do your work on Fabric. It can help you generate Notebook code or Data Warehouse queries. In contrast, the AI Skill operates independently, and you can eventually connect it to Microsoft Teams and other areas outside of Fabric.

## Limitations

The AI Skill is currently in public preview and has defined limitations. Future releases will address most of these limitations. Provide us with feedback about the features that matter most to you.

- The AI Skill might return incorrect answers. You should test the AI Skill with your colleagues to verify that it answers questions as expected. If it makes mistakes, provide it with more examples and instructions.
- We currently only support t-SQL on Warehouses and Lakehouses. Future releases will support other data sources, for example Semantic Models, Kusto databases and other query languages.
- You can't use the AI Skill to access unstructured data, for example .pdf, .docx or .txt files.
- At this time, you can only select a single Warehouse or a single Lakehouse.
- The AI Skill isn't conversational. Every question must be fully self-contained. It doesn't remember earlier questions.
- It blocks non-English language questions or instructions.
- You can't connect the AI Skill to Fabric Copilots, Microsoft Teams, or other experiences outside of Fabric.
- You can't change the LLM that the AI Skill uses.
- The AI Skill loses accuracy if you use nondescriptive column names.
- The AI Skill loses accuracy if you use large schemas with dozens of tables.

## Related content

- [AI Skill Scenario](ai-skill-scenario.md)
- [How to Create an AI Skill](how-to-create-ai-skill.md)