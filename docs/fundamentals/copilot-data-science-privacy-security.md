---
title: "Privacy, security, and responsible use of Copilot for Data Science"
description: Learn about privacy, security, and responsible use of Copilot for Data Science in Microsoft Fabric.
author: snehagunda
ms.author: sngun
ms.reviewer: 'guptamaya'
ms.topic: conceptual
ms.date: 05/11/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---

# Privacy, security, and responsible use of Copilot in notebooks and Fabric data agents

In this article, learn how [Microsoft Copilot in Notebooks](../data-engineering/copilot-notebooks-overview.md) and and Fabric [data agents](../data-science/concept-data-agent.md) (formerly known as Data agent) works, how it keeps your business data secure and compliant with privacy requirements, and how to responsibly use generative AI. For an overview of these topics for Copilot in Fabric, see [Privacy, security, and responsible use for Copilot (preview)](../fundamentals/copilot-privacy-security.md).


## Data use

### Data use in Copilot for notebooks in Fabric

- In notebooks, Copilot can only access data that is accessible to the user's current notebook, either in an attached lakehouse or directly loaded or imported into that notebook by the user. In notebooks, Copilot can't access any data that's not accessible to the notebook.

- By default, Copilot has access to the following data types:

  - Conversation history: Previous messages sent to and replies from Copilot for that user. (see below for more details about storing conversation history)
  - Contents of cells that the user executed.
  - Outputs of cells that the user executed.
  - Schemas of data sources in the notebook.
  - Sample data from data sources in the notebook.
  - Schemas from external data sources in an attached lakehouse.

### Data use in Fabric data agents

- Fabric data agents rely on the user's conversation history to better respond to the user questions. (see below for more details about storing conversation history)
- Schema information of the data sources added. This includes table and Column names. (The creator of a data agent selects which tables that should be included.)

### How we handle conversation history

For [Copilot in Notebooks](../data-engineering/copilot-notebooks-overview.md) and Fabric [data agents](../data-science/concept-data-agent.md), we store conversation history across user sessions.

#### Why do we store conversations history and where is it stored?

In order to use fully conversational agentic AI experiences, the agent needs to store conversation history across user sessions to maintain context. This ensures that the AI agent keeps context about what a user asked in previous sessions and is typically a desired behavior in many agentic AI experiences. Experiences such as Copilot in Notebooks and Fabric data agents are AI experiences that store conversation history across  user's sessions.

**This history is stored inside the Azure security boundary, in the same region and in the same Azure OpenAI resources that process all your Fabric AI requests.** The difference in this case is that the conversation history is stored for as long as the user allows. For experiences that don't store conversation history across sessions, no data is stored. Prompts are only processed by Azure OpenAI resources that Fabric uses.

**Your users can delete their conversation history at any time, simply by clearing the chat. This option exists both for Copilot in Notebooks and data agents.** If the conversation history isn't manually removed, it is stored for 28 days.

## Copilot in Notebooks: Responsible AI FAQ

With Copilot in notebooks for Data Science and Data engineering in Microsoft Fabric, we offer an AI assistant to help transform, explore, and build solutions in the context of the notebook.

For considerations and limitations, see [Limitations](../data-engineering/copilot-notebooks-overview.md#limitations).

### How did we evaluate Copilot in notebooks for data science and data engineering?

- The product team tested Copilot to see how well the system performs within the context of notebooks, and whether AI responses are insightful and useful.
- The team also invested in other harm mitigations, including technological approaches to focusing Copilot's output on data science-related topics.

### How do you best work with Copilot in notebooks for data science and data engineering?

- Copilot is best equipped to handle data science topics, so limit your questions to this area.
- Explicitly describe the data you want Copilot to examine. If you describe the data asset - for example, by naming files, tables, or columns - Copilot can more likely retrieve relevant data and generate useful outputs.
- For more granular responses, load the data into the notebook as DataFrames, or pin the data in your lakehouse. This gives Copilot more context with which to perform analysis. If an asset is too large to load, pinning it's a helpful alternative.

## Fabric data agent: Responsible AI FAQ

### What is Fabric data agent?

Data agent is a new Microsoft Fabric feature that allows you to build your own conversational Q&A systems with generative AI. A Fabric data agent makes data insights more accessible and actionable for everyone in your organization. With a Fabric data agent, your team can have conversations, with plain English-language questions, about the data stored in Fabric OneLake, and then receive relevant answers. Even people without technical expertise in AI, or without a deep understanding of the data structure, can receive precise and context-rich answers.

### What can data agent do?

Fabric data agent enables natural language interactions with structured data, allowing users to ask questions and receive rich, context-aware answers. It can enable users to connect and get insights from data sources like Lakehouse, Warehouse, Power BI dataset, KQL databases without needing to write complex queries. Data agent is designed to help users access and process data easily, enhancing decision-making through conversational interfaces while maintaining control over data security and privacy.

### What are the intended uses for data agent?

- The Fabric data agent is intended to simplify the data querying process. It allows users to interact with structured data through natural language. It supports user insights, decision-making, and generation of answers to complex questions without the need for specialized query language knowledge. Data agent is especially useful for business analysts, decision-makers, and other nontechnical users who need quick, actionable insights from data stored in sources like KQL database, Lakehouse, Power BI dataset, and Warehouse resources.

- The Fabric data agent isn't intended for use cases where deterministic and 100% accurate results are required, because of current LLM limitations.

- The Fabric data agent isn't intended for uses cases that require deep analytics or causal analytics. For example, "why did the sales numbers drop last month?" is out of current scope.

### How was The Fabric data agent evaluated? What metrics are used to measure performance?

The product team tested the data agent on various public and private benchmarks, to determine the query quality against different data sources. The team also invested in other harm mitigations, including technological approaches to ensure that the data agent's output is constrained to the context of the selected data sources.

### What are the limitations of The Fabric data agent? How can users minimize the impact of The Fabric data agent limitations when using the system?

- Ensure that you use descriptive column names. Instead of "C1" or "ActCu" column names (as examples), use "ActiveCustomer" or "IsCustomerActive." This is the most effective way to get more reliable queries out of the AI.

- To improve the accuracy of the Fabric data agent, you can provide more context with data agent instructions and example queries. These inputs help the Azure OpenAI Assistant API - which powers the Fabric data agent - make better decisions about how to interpret user questions and which data source is most appropriate to use.

- You can use Data agent instructions to guide the underlying agent's behavior, helping it identify the best data source to answer specific types of questions.

- You can also provide sample question-query pairs to demonstrate how the Fabric data agent should respond to common queries. These examples serve as patterns for interpreting similar user inputs and generating accurate results. Sample question-query pairs aren't currently supported for Power BI semantic model data sources.

- Refer to [this resource](../data-science/concept-data-agent.md#limitations) for a full list of current limitations of the data agent.

### What operational factors and settings allow for effective and responsible use of the Fabric data agent?

- The Fabric data agent can only access the data that you provide. It uses the schema (table name and column name), as well as the Fabric data agent instructions and example queries that you provide, in the User Interface (UI) or through the SDK.

- The  Fabric data agent can only access the data that the user can access. If you use the data agent, your credentials are used to access the underlying database. If you don't have access to the underlying data, the data agent can't access that underlying data. This is true when you consume the data agent across different channels - for example, Azure AI Foundry or Microsoft Copilot Studio - where other users can use the data agent.

## Related content

- [Privacy, security, and responsible use of Copilot for Data Factory (preview)](copilot-data-factory-privacy-security.md)
- [Overview of Copilot for Data Science and Data Engineering (preview)](../data-engineering/copilot-notebooks-overview.md)
- [Copilot for Data Factory overview](copilot-fabric-data-factory.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)