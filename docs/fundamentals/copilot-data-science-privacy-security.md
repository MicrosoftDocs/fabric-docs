---
title: "Privacy, security, and responsible use of Copilot for Data Science"
description: Learn about privacy, security, and responsible use of Copilot for Data Science in Microsoft Fabric.
author: snehagunda
ms.author: sngun
ms.reviewer: 'guptamaya'
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.topic: conceptual
ms.date: 07/15/2024
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Privacy, security, and responsible use of Copilot for Data Science

In this article, learn how [Microsoft Copilot for Data Science](../data-engineering/copilot-notebooks-overview.md) works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. For an overview of these topics for Copilot in Fabric, see [Privacy, security, and responsible use for Copilot (preview)](../fundamentals/copilot-privacy-security.md).

With Copilot for Data Science in Microsoft Fabric and other generative AI features in preview, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports in Data Science and the other workloads.

For considerations and limitations, see [Limitations](../data-engineering/copilot-notebooks-overview.md#limitations).

## Data use of Copilot for Data Science

- In notebooks, Copilot can only access data that is accessible to the user's current notebook, either in an attached lakehouse or directly loaded or imported into that notebook by the user. In notebooks, Copilot can't access any data that's not accessible to the notebook.

- By default, Copilot has access to the following data types:

  - Previous messages sent to and replies from Copilot for that user in that session.
  - Contents of cells that the user has executed.
  - Outputs of cells that the user has executed.
  - Schemas of data sources in the notebook.
  - Sample data from data sources in the notebook.
  - Schemas from external data sources in an attached lakehouse.
    
## Evaluation of Copilot for Data Science
 
- The product team has tested Copilot to see how well the system performs within the context of notebooks, and whether AI responses are insightful and useful.
- The team also invested in additional harms mitigations, including technological approaches to focusing Copilot's output on topics related to data science.

## Tips for working with Copilot for Data Science

- Copilot is best equipped to handle data science topics, so limit your questions to this area.
- Be explicit about the data you want Copilot to examine. If you describe the data asset, such as naming files, tables, or columns, Copilot is more likely to retrieve relevant data and generate useful outputs.
- If you want more granular responses, try loading data into the notebook as DataFrames or pinning the data in your lakehouse. This gives Copilot more context with which to perform analysis. If an asset is too large to load, pinning it's a helpful alternative.

## AI Skill: Responsible AI FAQ

### What is AI Skill?

AI Skill is a new tool in Fabric that brings a way to get answers from your tabular data in natural language.

### What can AI Skill do? 

A data analyst or engineer can prepare AI Skill for use by non-technical business users. They need to configure Fabric data source and can optionally provide additional context information that isn't obvious from the schema.

Non-technical users can then type questions and receive the results from the execution of an AI generated SQL query.

### What is/are AI Skill’s intended use(s)?

- Business users who aren't familiar with how the data is structured are able to ask descriptive questions such as “what are the 10 top products by sales volume last month?" on top of tabular data stored in Fabric Lakehouses and Fabric Warehouses.

- AI Skill isn't intended for use in cases where deterministic and 100% accurate results are required, which reflects the current LLM limitations.

- The AI Skill isn't intended for uses cases that require deep analytics or causal analytics. E.g. asking “why did our sales numbers drop last month?” is out of scope. 

### How was AI Skill evaluated? What metrics are used to measure performance?

The product team has tested the AI skill on a variety of public and private benchmarks for SQL tasks to ascertain the quality of SQL queries.

The team also invested in additional harms mitigations, including technological approaches to focusing the AI skill’s output on the context of the chosen data sources.

### What are the limitations of AI Skill? How can users minimize the impact of AI Skill’s limitations when using the system?

- Make sure your column names are descriptive. Instead of using column names like “C1” or “ActCu,” use “ActiveCustomer” or “IsCustomerActive.” This is the most effective way to get more reliable queries out of the AI.

- Make use of the Notes for the model in the configuration panel in the UI. If the SQL queries that the AI Skill generates are incorrect, you can provide instructions to the model in plain English to improve upon future queries. The system will make use of these instructions with every query. Short and direct instructions are best.

- Provide examples in the model configuration panel in the UI. The system will leverage the most relevant examples when providing its answers.

### What operational factors and settings allow for effective and responsible use of AI Skill?

- The AI skill only has access to the data that you provide. It makes use of the schema (table name and column name), as well as the Notes for the model and Examples that you provide in the UI.

- The AI skill only has access to data that the questioner has access to. If you use the AI skill, your credentials are used to access the underlying database. If you don't have access to the underlying data, the AI skill doesn't either. This holds true when you publish the AI skill to other destinations, such as Copilot for Microsoft 365 or Microsoft Copilot Studio, where the AI skill can be used by other questioners.

## Related content

- [Privacy, security, and responsible use of Copilot for Data Factory (preview)](copilot-data-factory-privacy-security.md)
- [Overview of Copilot for Data Science and Data Engineering (preview)](../data-engineering/copilot-notebooks-overview.md)
- [Copilot for Data Factory overview](copilot-fabric-data-factory.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
