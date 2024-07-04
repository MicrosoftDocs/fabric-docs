---
title: "Privacy, security, and responsible use of Copilot for Data Science (preview)"
description: Learn about privacy, security, and responsible use of Copilot for Data Science in Microsoft Fabric.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: 'guptamaya'
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.topic: conceptual
ms.date: 06/02/2024
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Privacy, security, and responsible use of Copilot for Data Science and AI skills (preview)

With Copilot for Data Science in Microsoft Fabric and other generative AI features such as the AI skill in preview, Fabric brings a new way to transform and analyze data, generate insights, and get answers from your data in natural language in Data Science and the other workloads. 

In this article, learn how [Copilot for Data Science](copilot-notebooks-overview.md) and AI skills keep your business data secure and adhere to privacy requirements, and how you and your organization can use these generative AI features responsibly. This article expands on the foundational information in [Privacy, security, and responsible use for Copilot (preview)](copilot-privacy-security.md). The AI skill uses the same general process and underlying Azure OpenAI service models as Copilot in Fabric.

For details, intended uses, and limitations of these features, read about [Copilot for Data Science](/fabric/get-started/copilot-notebooks-overview) and the AI skill. 

## Data use in Copilot for Data Science

- In notebooks, Copilot can only access data that is accessible to the user's current notebook, either in an attached lakehouse or directly loaded or imported into that notebook by the user. In notebooks, Copilot can't access any data that's not accessible to the notebook.

- By default, Copilot has access to the following data types:

  - Previous messages sent to and replies from Copilot for that user in that session.
  - Contents of cells that the user has executed.
  - Outputs of cells that the user has executed.
  - Schemas of data sources in the notebook.
  - Sample data from data sources in the notebook.
  - Schemas from external data sources in an attached lakehouse.
    
## Data use in AI skills

The AI skill will only have access to the data that you provide. It will make use of the schema (table name and column name), as well as the Notes for the model that you provide in the UI.  

- The AI skill will only have access to data that the questioner has access to. If you use the AI skill, your credentials will be used to access the underlying database. If you don't have access to the underlying data, the AI skill won't either. This holds true when you publish the AI skill to other destinations, such as Copilot for Microsoft 365 or Microsoft Copilot Studio, where the AI skill can be used by other questioners.

## Evaluation of Copilot for Data Science
 
- The product team has tested Copilot to see how well the system performs within the context of notebooks, and whether AI responses are insightful and useful.
- The team also invested in additional harms mitigations, including technological approaches to focusing Copilot's output on topics related to data science.

## Evaluation of the AI skill 

- The product team has tested the AI skill on a variety of public and private benchmarks for SQL tasks to ascertain the quality of SQL queries. 

- The team also invested in additional harms mitigations, including technological approaches to focusing the AI skill’s output on the context of the chosen data sources. 

## Tips for working with Copilot for Data Science

- Copilot is best equipped to handle data science topics, so limit your questions to this area.
- Be explicit about the data you want Copilot to examine. If you describe the data asset, such as naming files, tables, or columns, Copilot is more likely to retrieve relevant data and generate useful outputs.
- If you want more granular responses, try loading data into the notebook as DataFrames or pinning the data in your lakehouse. This gives Copilot more context with which to perform analysis. If an asset is too large to load, pinning it's a helpful alternative.

## Tips for improving AI skill performance 

- Make sure your column names are descriptive. Instead of using column names like “C1” or “ActCu,” use “ActiveCustomer” or “IsCustomerActive.” This is the most effective way to get more reliable queries out of the AI. 

- Make use of the Notes for the model in the configuration panel in the UI. If the SQL queries that the AI skill generates are incorrect, you can provide instructions to the model in plain English to improve upon future queries. The system will make use of these instructions with every query. Short and direct instructions are best.

## Related content

- [Privacy, security, and responsible use of Copilot for Data Factory (preview)](copilot-data-factory-privacy-security.md)
- [Overview of Copilot for Data Science and Data Engineering (preview)](copilot-notebooks-overview.md)
- [Copilot for Data Factory overview](copilot-fabric-data-factory.md)

