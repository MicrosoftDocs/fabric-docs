---
title: Fabric data agent creation (preview)
titleSuffix: Learn how to create a Fabric data agent
description: Learn how to create a Fabric data agent that can answer questions about data.
author: s-polly
ms.author: scottpolly
ms.reviewer: amjafari
reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: concept-article #Don't change; maybe should change to "conceptual".
ms.date: 03/25/2025
ms.collection: ce-skilling-ai-copilot
ms.search.form: Fabric data agent Concepts

#customer intent: As a Data Analyst, I want to create a Fabric data agent so that I can make it easier for me and my colleagues to get answers from data.

---

# Fabric data agent concepts (preview)

Data agent in Microsoft Fabric is a new Microsoft Fabric feature that allows you to build your own conversational Q&A systems using generative AI. A Fabric data agent makes data insights more accessible and actionable for everyone in your organization. With a Fabric data agent, your team can have conversations, with plain English-language questions, about the data that your organization stored in Fabric OneLake and then receive relevant answers. This way, even people without technical expertise in AI or a deep understanding of the data structure can receive precise and context-rich answers.

You can also add organization-specific instructions, examples, and guidance to fine-tune the Fabric data agent. This ensures that responses align with your organization's needs and goals, allowing everyone to engage with data more effectively. Fabric data agent fosters a culture of data-driven decision-making because it lowers barriers to insight accessibility, it facilitates collaboration, and it helps your organization extract more value from its data.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- [A paid F2 or higher Fabric capacity resource](../fundamentals/copilot-fabric-overview.md#available-regions-for-azure-openai-service)
- [Fabric data agent tenant settings](./data-agent-tenant-settings.md) is enabled.
- [Copilot tenant switch](./data-agent-tenant-settings.md) is enabled.
- [Cross-geo processing for AI](./data-agent-tenant-settings.md) is enabled.
- [Cross-geo storing for AI](./data-agent-tenant-settings.md) is enabled.
- At least one of these: A warehouse, a lakehouse, one or more Power BI semantic models, or a KQL database with data.
- [Power BI semantic models via XMLA endpoints tenant switch](./data-agent-tenant-settings.md) is enabled for Power BI semantic model data sources.

## How the Fabric data agent works

Fabric data agent uses large language models (LLMs) to help users interact with their data naturally. Fabric data agent applies Azure OpenAI Assistant APIs, and it behaves like an agent. It processes user questions, determines the most relevant data source (Lakehouse, Warehouse, Power BI dataset, KQL databases), and it invokes the appropriate tool to generate, validate, and execute queries. Users can then ask questions in plain language and receive structured, human-readable answers—eliminating the need to write complex queries and ensuring accurate and secure data access.

Here's how it works in detail:

**Question Parsing & Validation**: The Fabric data agent applies Azure OpenAI Assistant APIs as the underlying agent to process user questions. This approach ensures that the question complies with security protocols, responsible AI (RAI) policies, and user permissions. The Fabric data agent strictly enforces read-only access, maintaining read-only data connections to all data sources.

**Data Source Identification**: The Fabric data agent uses the user's credentials to access the schema of the data source. This ensures that the system fetches data structure information that the user has permission to view. It then evaluates the user's question against all available data sources, including relational databases (Lakehouse and Warehouse), Power BI datasets (Semantic Models), and KQL databases. It might also reference user-provided data agent instructions to determine the most relevant data source.

**Tool Invocation & Query Generation**: Once the correct data source or sources are identified, the Fabric data agent rephrases the question for clarity and structure, and then invokes the corresponding tool to generate a structured query:

- Natural language to SQL (NL2SQL) for relational databases (Lakehouse/Warehouse).
- Natural language to DAX (NL2DAX) for Power BI datasets (Semantic Models).
- Natural language to KQL (NL2KQL) for KQL databases.

The selected tool generates a query based on the provided schema, metadata, and context that the agent underlying the Fabric data agent then passes.

**Query Validation**: The tool performs validation to ensure the query is correctly formed and adheres to its own security protocols, and RAI policies.

**Query Execution & Response**: Once validated, the Fabric data agent executes the query against the chosen data source. The results are formatted into a human-readable response, which might include structured data such as tables, summaries, or key insights.

This approach ensures that users can interact with their data using natural language, while the Fabric data agent handles the complexities of query generation, validation, and execution—all without requiring users to write SQL, DAX, or KQL themselves.

## Fabric data agent configuration

Configuring a Fabric data agent is similar to building a Power BI report—you start by designing and refining it to ensure it meets your needs, then publish and share it with colleagues so they can interact with the data. Setting up a Fabric data agent involves:

**Selecting Data Sources**: A Fabric data agent supports up to five data sources in any combination, including lakehouses, warehouses, KQL databases, and Power BI semantic models. For example, a configured Fabric data agent could include five Power BI semantic models. It could include a mix of two Power BI semantic models, one lakehouse, and one KQL database. You have many available options.

**Choosing Relevant Tables**: After you select the data sources, you need to add them one at a time, and define the specific tables from each source that the Fabric data agent will use. This step ensures that the Fabric data agent retrieves accurate results by focusing only on relevant data.

**Adding Context**: To improve the Fabric data agent accuracy, you can provide more context through Fabric data agent instructions and example queries. As the underlying agent for the Fabric data agent, the context helps the Azure OpenAI Assistant API make more informed decisions about how to process user questions, and determine which data source is best suited to answer them.

- **Data agent instructions**: You can add instructions to guide the agent that underlies the Fabric data agent, in determining the best data source to answer specific types of questions. You can also provide custom rules or definitions that clarify organizational terminology or specific requirements. These instructions can provide more context or preferences that influence how the agent selects and queries data sources.

    - Direct questions about **financial metrics** to a Power BI semantic model.
    - Assign queries involving **raw data exploration** to the lakehouse.
    - Route questions requiring **log analysis** to the KQL database.

- **Example queries**: You can add sample question-query pairs to illustrate how the Fabric data agent should respond to common queries. These examples serve as a guide for the agent, which helps it understand how to interpret similar questions and generate accurate responses.

> [!NOTE]
> Adding sample query/question pairs isn't currently supported for Power BI semantic model data sources.

By combining clear AI instructions and relevant example queries, you can better align the Fabric data agent with your organization's data needs, ensuring more accurate and context-aware responses.

## Difference between a Fabric data agent and a copilot

While both Fabric data agents and Fabric copilots use generative AI to process and reason over data, there are key differences in their functionality and use cases:

**Configuration Flexibility**: Fabric data agents are highly configurable. You can provide custom instructions and examples to tailor their behavior to specific scenarios. Fabric copilots, on the other hand, are preconfigured, and they don't offer this level of customization.

**Scope and Use Case**: Fabric copilots are designed to assist with tasks within Microsoft Fabric, such as generation of notebook code or warehouse queries. Fabric data agents, in contrast, are standalone artifacts. To make Fabric data agents more versatile for broader use cases, they can integrate with external systems like Microsoft Copilot Studio, Azure AI Foundry, Microsoft Teams, or other tools outside Fabric.

## Evaluation of the Fabric data agent

The quality and safety of Fabric data agent responses went through rigorous evaluation:

**Benchmark Testing**: The product team tested Fabric data agents across a range of public and private datasets to ensure high-quality and accurate responses.

**Enhanced Harm Mitigations**: More safeguards are in place to ensure that Fabric data agent outputs remain focused on the context of selected data sources, to reduce the risk of irrelevant or misleading answers.

## Limitations

The Fabric data agent is currently in public preview and it has limitations. Updates will improve the Fabric data agent over time.

- The Fabric data agent can retrieve data by generating structured queries (SQL, DAX, or KQL) for questions that involve facts, totals, rankings, or filters. However, it can't interpret trends, provide explanations, or analyze underlying causes.
- The Fabric data agent only generates SQL/DAX/KQL "read" queries. It doesn't generate SQL/DAX/KQL queries that create, update, or delete data.
- The Fabric data agent can only access data that you provide. It only uses the data resource configurations that you provide.
- The Fabric data agent has data access permissions that match the permissions granted to the user interacting with the Fabric data agent. This is true when the Fabric data agent is published to other locations-for example, Microsoft Copilot Studio, Azure AI Foundry, and Microsoft Teams.
- You can't add more than five data sources to the Fabric data agent.
- You can't use the Fabric data agent to access unstructured data resources. These resources include .pdf, .docx, or .txt files, for example.
- The Fabric data agent blocks non-English language questions or instructions.
- You can't change the LLM that the Fabric data agent uses.
- You can't add a KQL database as a data source if it has more than 1,000 tables or any table with over 100 columns.
- You can't add a Power BI semantic model as a data source if it contains more than a total of 100 columns and measures.
- The Fabric data agent works best with 25 or fewer tables selected across all data sources.
- Nondescriptive data resource column and table names have a significant, negative impact on generated SQL/DAX/KQL query quality. We recommend the use of descriptive names.
- Use of too many columns and tables might lower Fabric data agent performance.
- The Fabric data agent is currently designed to handle simple queries. Complex queries that require many joins or sophisticated logic tend to have lower reliability.
- If you add a Power BI semantic model as a data source, the Fabric data agent doesn't use any hidden tables, columns, or measures.
- If you previously created a Fabric data agent that used a warehouse as a data source, and the warehouse was located in a workspace that doesn't host that Fabric data agent, you might encounter an error. To resolve this issue, delete the existing data source and add it again.
- To add a Power BI semantic model as a data source for Fabric data agent, you need read/write permissions for that Power BI semantic model. Querying a Fabric data agent that uses a Power BI semantic model also requires that you have read/write permissions for the underlying Power BI semantic model.
- The Fabric data agent might return incorrect answers. You should test the Fabric data agent with your colleagues to verify that it answers questions as expected. If it makes mistakes, provide it with more examples and instructions.
- If you previously created and published a Fabric data agent, and you have used its URL programmatically, the URL will no longer work if you open the Fabric data agent in the Fabric data agent new user interface page. To resolve this, you must republish the Fabric data agent, and use the new URL based on the Assistants API.

## Related content

- [Fabric data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)
- [Create a Fabric data agent](how-to-create-data-agent.md)