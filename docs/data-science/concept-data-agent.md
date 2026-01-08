---
title: Fabric data agent creation (preview)
titleSuffix: Learn how to create a Fabric data agent
description: Learn how to create a Fabric data agent that can answer questions about data.
author: jonburchel
ms.author: jburchel
ms.reviewer: amjafari
reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: concept-article #Don't change; maybe should change to "conceptual".
ms.date: 01/06/2026
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
ms.search.form: Fabric data agent Concepts
#customer intent: As a Data Analyst, I want to create a Fabric data agent so that I can make it easier for me and my colleagues to get answers from data.
---

# Fabric data agent concepts (preview)

Data agent in Microsoft Fabric is a new Microsoft Fabric feature that enables you to build your own conversational Q&A systems by using generative AI. A Fabric data agent makes data insights more accessible and actionable for everyone in your organization. By using a Fabric data agent, your team can have conversations, with plain English-language questions, about the data that your organization stored in Fabric OneLake and then receive relevant answers. This way, even people without technical expertise in AI or a deep understanding of the data structure can receive precise and context-rich answers.

You can also add organization-specific instructions, examples, and guidance to fine-tune the Fabric data agent. This approach ensures that responses align with your organization's needs and goals, allowing everyone to engage with data more effectively. Fabric data agent fosters a culture of data-driven decision-making because it lowers barriers to insight accessibility, facilitates collaboration, and helps your organization extract more value from its data.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

## How the Fabric data agent works

The Fabric data agent uses large language models (LLMs) to help users interact with their data naturally. The Fabric data agent applies Azure OpenAI Assistant APIs and behaves like an agent. It processes user questions, determines the most relevant data source (Lakehouse, Warehouse, Power BI dataset, KQL databases, ontology), and invokes the appropriate tool to generate, validate, and execute queries. Users can then ask questions in plain language and receive structured, human-readable answers. This approach eliminates the need to write complex queries and ensures accurate and secure data access.

Here's how it works in detail:

**Question parsing and validation**: The Fabric data agent applies Azure OpenAI Assistant APIs as the underlying agent to process user questions. This approach ensures that the question complies with security protocols, responsible AI (RAI) policies, and user permissions. The Fabric data agent strictly enforces read-only access, maintaining read-only data connections to all data sources.

**Data source identification**: The Fabric data agent uses the user's credentials to access the schema of the data source. This approach ensures that the system fetches data structure information that the user has permission to view. The agent then evaluates the user's question against all available data sources, including relational databases (Lakehouse and Warehouse), Power BI datasets (Semantic Models), KQL databases, and ontologies. It might also reference user-provided data agent instructions to determine the most relevant data source.

**Tool invocation and query generation**: Once the correct data source or sources are identified, the Fabric data agent rephrases the question for clarity and structure, and then invokes the corresponding tool to generate a structured query:

- Natural language to SQL (NL2SQL) for relational databases (Lakehouse/Warehouse).
- Natural language to DAX (NL2DAX) for Power BI datasets (Semantic Models).
- Natural language to KQL (NL2KQL) for KQL databases.

The selected tool generates a query based on the provided schema, metadata, and context that the agent underlying the Fabric data agent then passes.

**Query validation**: The tool performs validation to ensure the query is correctly formed and adheres to its own security protocols and RAI policies.

**Query execution and response**: Once validated, the Fabric data agent executes the query against the chosen data source. The results are formatted into a human-readable response, which might include structured data such as tables, summaries, or key insights.

By using this approach, users can interact with their data by using natural language. The Fabric data agent handles the complexities of query generation, validation, and execution. Users don't need to write SQL, DAX, or KQL themselves.

## Fabric data agent configuration

Configuring a Fabric data agent is similar to building a Power BI report—you start by designing and refining it to ensure it meets your needs, then publish and share it with colleagues so they can interact with the data. Setting up a Fabric data agent involves:

**Selecting Data Sources**: A Fabric data agent supports up to five data sources in any combination, including lakehouses, warehouses, KQL databases, Power BI semantic models, and ontologies. For example, a configured Fabric data agent could include five Power BI semantic models. It could include a mix of two Power BI semantic models, one lakehouse, and one KQL database. You have many available options.

**Choosing Relevant Tables**: After you select the data sources, add them one at a time, and define the specific tables from each source that the Fabric data agent uses. This step ensures that the Fabric data agent retrieves accurate results by focusing only on relevant data. For lakehouses, this step means selecting lakehouse tables (not individual lakehouse files). If your data starts as files (for example, CSV or JSON), make it available to the agent by ingesting it into tables or otherwise exposing it through tables.

**Adding Context**: To improve the Fabric data agent accuracy, provide more context through Fabric data agent instructions and example queries. As the underlying agent for the Fabric data agent, the context helps the Azure OpenAI Assistant API make more informed decisions about how to process user questions, and determine which data source is best suited to answer them.

- **Data agent instructions**: Add instructions to guide the agent that underlies the Fabric data agent, in determining the best data source to answer specific types of questions. You can also provide custom rules or definitions that clarify organizational terminology or specific requirements. These instructions can provide more context or preferences that influence how the agent selects and queries data sources. For example, direct questions about **financial metrics** to a Power BI semantic model, assign queries involving **raw data exploration** to the lakehouse, and route questions requiring **log analysis** to the KQL database.

- **Example queries**: Add sample question-query pairs to illustrate how the Fabric data agent should respond to common queries. These examples serve as a guide for the agent, which helps it understand how to interpret similar questions and generate accurate responses.

> [!NOTE]
> Adding sample query/question pairs isn't currently supported for Power BI semantic model data sources.

By combining clear AI instructions and relevant example queries, you can better align the Fabric data agent with your organization's data needs, ensuring more accurate and context-aware responses.

## Difference between a Fabric data agent and a copilot

While both Fabric data agents and Fabric copilots use generative AI to process and reason over data, key differences exist in their functionality and use cases:

**Configuration Flexibility**: You can highly configure Fabric data agents. You can provide custom instructions and examples to tailor their behavior to specific scenarios. Fabric copilots, on the other hand, come preconfigured and don't offer this level of customization.

**Scope and Use Case**: Fabric copilots assist with tasks within Microsoft Fabric, such as generating notebook code or warehouse queries. Fabric data agents, in contrast, are standalone artifacts. To make Fabric data agents more versatile for broader use cases, they can integrate with external systems like Microsoft Copilot Studio, Azure AI Foundry, Microsoft Teams, or other tools outside Fabric.

## Evaluation of the Fabric data agent

The product team rigorously evaluated the quality and safety of Fabric data agent responses:

**Benchmark Testing**: The product team tested Fabric data agents across a range of public and private datasets to ensure high-quality and accurate responses.

**Enhanced Harm Mitigations**: The product team implemented safeguards to ensure that Fabric data agent outputs remain focused on the context of selected data sources, reducing the risk of irrelevant or misleading answers.

## Limitations

The Fabric data agent is currently in public preview and has limitations. Updates will improve the Fabric data agent over time.

- The Fabric data agent only generates SQL, DAX, and KQL "read" queries. It doesn't generate SQL, DAX, or KQL queries that create, update, or delete data.
- The Fabric data agent doesn't support unstructured data, such as .pdf, .docx, or .txt files. You can't use the Fabric data agent to access unstructured data resources.
- For lakehouse data sources, the Fabric data agent answers questions using the lakehouse tables you select. It doesn't directly read standalone lakehouse files (for example, CSV or JSON files) unless they're ingested or exposed as tables.
- The Fabric data agent doesn't currently support non-English languages. For optimal performance, provide questions, instructions, and example queries in English.
- You can't change the LLM that the Fabric data agent uses.
- Conversation history in the Fabric data agent might not always persist. In certain cases, such as backend infrastructure changes, service updates, or model upgrades, past conversation history might be reset or lost.
- The Fabric data agent can't execute queries when the data source's workspace capacity is in a different region than the data agent's workspace capacity. For example, a lakehouse with capacity in North Europe fails if the Data Agent's capacity is in France Central.

## Related content

- [Fabric data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)
- [Create a Fabric data agent](how-to-create-data-agent.md)
