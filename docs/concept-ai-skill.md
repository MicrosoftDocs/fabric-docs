---
title: AI skill creation (preview)
titleSuffix: Learn how to create an AI skill
description: Learn how to create an AI skill that can answer questions about data.
author: IAmGrootel
ms.author: avangrootel
ms.reviewer: franksolomon
reviewer: avangrootel
ms.service: fabric
ms.subservice: data-science
ms.topic: concept-article #Don't change; maybe should change to "conceptual".
ms.date: 08/05/2024
ms.collection: ce-skilling-ai-copilot
ms.search.form: AI skill Concepts

#customer intent: As a Data Analyst, I want to create an AI skill so that I can make it easier for me and my colleagues to get answers from data.

---

# AI skill concepts (preview)

With the Fabric AI skill, you can make data more accessible to your colleagues. You can configure a Generative AI system to generate queries that answer questions about your data. After you configure the AI skill, you can share it with your colleagues, who can then ask their questions in plain English. Based on their questions, the AI generates queries over your data that answer those questions.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## How the AI skill works

The AI skill relies on Generative AI - specifically, Large Language Models (LLMs). These LLMs can generate queries, for example, T-SQL queries, based on a given schema and a question. The system sends a question in the AI skill, information about the selected data (including the table and column names, and the data types found in the tables) to the LLM. Next, it requests generation of a T-SQL query that answers the question. Parse the generated query to first ensure that it doesn't change the data in any way, and then execute that query. Finally, show the query execution results. An AI skill is intended to access specific database resources, and then generate and execute relevant T-SQL queries.

## AI skill configuration

Think of the AI skill as you'd think about Power BI reports. You first build the Report, and then you share the report with your colleagues who can consume it to get their data insights. The AI skill works in a similar way. You need to first create and configure the AI skill. Then, you can share it with your colleagues.

You should expect to handle some necessary configuration steps before the AI skill works properly. An AI skill can often provide out-of-the-box answers to reasonable questions, but could provide incorrect answers for your specific situation. The incorrect answers typically occur because the AI is missing context about your company, setup, or definition of key terms. To solve the problem, provide the AI with instructions and example question-query pairs. You can use these powerful techniques to guide the AI to the right answers.

## Difference between an AI skill and a Copilot

The technology behind the AI skill and the Fabric Copilots is similar. They both use Generative AI to reason over data. However, they have some key differences:

- **Configuration:** With an AI skill, you can configure the AI to behave the way you need. You can provide it with instructions and examples that tune it to your specific use case. A Fabric Copilot doesn't offer this configuration flexibility.

- **Use Case**: A Copilot can help you do your work on Fabric. It can help you generate Notebook code or Data Warehouse queries. In contrast, the AI skill operates independently, and you can eventually connect it to Microsoft Teams and other areas outside of Fabric.

## Evaluation of the AI skill

- The product team tested the AI skill on different public and private T-SQL task benchmarks, to ascertain the quality of SQL queries.

- The product team also invested in extra harm mitigations. These include technological approaches to focus Copilot output on the context of the chosen data sources.

## Limitations

The AI skill is currently in public preview and has limitations described below. We will provide updates to improve the AI skill over time.

- Generative AI doesn't interpret the results of an executed T-SQL query. It only generates that query.
- The AI skill might return incorrect answers. You should test the AI skill with your colleagues to verify that it answers questions as expected. If it makes mistakes, provide it with more examples and instructions.
- Only T-SQL queries on Warehouses and Lakehouses are supported.
- The AI skill only generates T-SQL "read" queries. It doesn't generate T-SQL queries that create, update, or delete data.
- The AI skill can only access data that you provide, and it only uses the data resource configurations that you provide.
- The AI skill has data access permissions that match the permissions granted to the AI skill questioner. This is true when the AI skill is published to other locations - for example, Copilot for Microsoft 365 or Microsoft Copilot Studio.
- You can't use the AI skill to access unstructured data resources. These resources include .pdf, .docx or .txt files, for example.
- At this time, you can only select a single Warehouse or a single Lakehouse.
- The AI skill doesn't support a conversational interface. Every question must be fully self-contained. It doesn't remember earlier questions.
- It blocks non-English language questions or instructions.
- You can't connect the AI skill to Fabric Copilots, Microsoft Teams, or other experiences outside of Fabric.
- You can't change the LLM that the AI skill uses.
- The AI skill loses accuracy if you use nondescriptive column names.
- The AI skill loses accuracy if you use large schemas with dozens of tables.
- The AI skill is in a preview status. This means that it has a limited scope and it might have bugs. Because of these considerations, we recommend that you avoid its use in production systems, and that you avoid its use for critical decisions.
- Nondescriptive data resource column and table names have a significant, negative impact on generated T-SQL query quality. Use of descriptive names is recommended.
- Use of too many columns and tables might lower AI skill performance.
- The AI skill is currently designed to handle simple queries. Complex queries that require many joins or sophisticated logic tend to have lower reliability.

## Related content

- [AI skill scenario](ai-skill-scenario.md)
- [How to create an AI skill](how-to-create-ai-skill.md)