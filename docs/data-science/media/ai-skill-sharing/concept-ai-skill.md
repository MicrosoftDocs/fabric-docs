---
title: AI skill creation (preview)
titleSuffix: Learn how to create an AI skill
description: Learn how to create an AI skill that can answer questions about data.
author: fbsolo-ms1
ms.author: amjafari
ms.reviewer: franksolomon
reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: concept-article #Don't change; maybe should change to "conceptual".
ms.date: 01/24/2025
ms.collection: ce-skilling-ai-copilot
ms.search.form: AI skill Concepts

#customer intent: As a Data Analyst, I want to create an AI skill so that I can make it easier for me and my colleagues to get answers from data.

---

# AI skill concepts (preview)

AI skill is a new Microsoft Fabric feature that allows you to build your own conversational Q&A systems using generative AI. The goal is to make data insights more accessible and actionable for everyone in your organization. By investing time to create and configure an AI skill, you enable your team to have conversations with data—asking plain English questions about your organization's data stored in Fabric OneLake and receiving relevant answers. This makes it possible for everyone, even those without technical expertise in AI or a deep understanding of the data structure, to receive precise and context-rich answers.

You can also add organization-specific instructions, examples, and guidance to fine-tune the AI skill. This ensures that responses align with your organization's needs and goals, allowing everyone to engage with data more effectively. By lowering barriers to insight access, facilitating collaboration, and helping your organization extract more value from its data, AI skill fosters a culture of data-driven decision-making.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## How the AI skill works

The AI skill uses large language models (LLMs) to help users interact with their data naturally. By leveraging Azure OpenAI Assistant APIs, the AI skill behaves like an agent, processing user questions, determining the most relevant data source (Lakehouse, Warehouse, Power BI dataset, KQL databases), and invoking the appropriate tool to generate, validate, and execute queries. This allows users to ask questions in plain language and receive structured, human-readable answers—eliminating the need to write complex queries while ensuring accurate and secure access to data.

Here’s how it works in detail:

**Question Parsing & Validation**: The AI Skill leverages Azure OpenAI Assistant APIs as the underlying agent to process user questions. It ensures the question complies with security protocols, responsible AI (RAI) policies, and user permissions. The AI Skill strictly enforces read-only access, maintaining read-only data connections to all data sources.

**Data Source Identification**: The AI skill uses the user's credentials to access the schema of the data source. This ensures that the system fetches data structure information that the user has permission to view. It then evaluates the user's question against all available data sources, including relational databases (Lakehouse and Warehouse), Power BI datasets (Semantic Models), and KQL databases. It may also reference user-provided AI instructions to determine the most relevant data source.

**Tool Invocation & Query Generation**: Once the correct data source(s) is identified, the AI skill rephrases the question for clarity and structure and then invokes the corresponding tool to generate a structured query:
- natural language to SQL (NL2SQL) for relational databases (Lakehouse/Warehouse).
- natural language to DAX (NL2DAX) for Power BI datasets (Semantic Models).
- natural language to KQL (NL2KQL) for KQL databases.

The selected tool generates a query based on the provided schema, metadata, and context that are passed by the agent underlying the AI skill.

**Query Validation**: The tool performs validation to ensure the query is correctly formed and adheres to its own security protocols, and RAI policies.

**Query Execution & Response:**: Once validated, the AI Skill executes the query against the chosen data source. The results are formatted into a human-readable response, which may include structured data such as tables, summaries, or key insights.

This approach ensures that users can interact with their data using natural language while the AI skill handles the complexities of query generation, validation, and execution—all without requiring users to write SQL, DAX, or KQL themselves.

## AI skill configuration

Configuring an AI skill is similar to building a Power BI report—you start by designing and refining it to ensure it meets your needs, then publish and share it with colleagues so they can interact with the data. Setting up an AI skill involves:

**Selecting Data Sources**: AI skill supports up to five data sources in any combination, including lakehouses, warehouses, KQL databases, and Power BI semantic models. For example, a configured AI skill could include five Power BI semantic models. It could include a mix of two Power BI semantic models, one lakehouse, and one Kusto database. You have many available options.

**Choosing Relevant Tables**: After selecting data sources, you need to add them one at a time and define the specific tables from each source that the AI skill will use. This step ensures that the AI skill retrieves accurate results by focusing only on relevant data.

**Adding Context**: To improve the AI skill accuracy, you can provide more context through AI instructions and example queries. The context helps the Azure OpenAI Assistant API as its underlying agent for AI skill to make more informed decisions about how to process user questions, and determine which data source is best suited to answer them.

- **AI instructions**: You can provide custom rules or definitions that clarify organizational terminology or specific requirements. You can also add instructions to guide the agent underlying AI skill in determining which data source is better suited to answer specific types of questions. These instructions can provide more context or preferences that influence how the agent selects and queries data sources.

    - Direct questions about **financial metrics** to a Power BI semantic model.
    - Assign queries involving **raw data exploration** to the lakehouse.
    - Route questions requiring **log analysis** to the KQL database.

- **Example queries**: You can add sample question-query pairs to illustrate how the AI skill should respond to common queries. These examples serve as a guide for the agent, helping it understand how to interpret similar questions and generate accurate responses. Note that adding sample query/question pairs is not currently supported for Power BI semantic model data sources. 

By combining clear AI instructions and relevant example queries, you can better align the AI skill with your organization’s data needs, ensuring more accurate and context-aware responses.

## Difference between an AI skill and a copilot

While both AI skills and Fabric copilots use generative AI to process and reason over data, there are key differences in their functionality and use cases:

**Configuration Flexibility**: AI skills are highly configurable. You can tailor their behavior to specific scenarios by providing custom instructions and examples. Fabric copilots, on the other hand, are pre-configured, and they don't offer this level of customization.

**Scope and Use Case**: Fabric copilots are designed to assist with tasks within Microsoft Fabric, such as generating notebook code or warehouse queries. AI skills, in contrast, are standalone artifacts. To make AI skill more versatile for broader use cases, they can integrate with external systems like Microsoft Copilot Studio, Azure AI Foundry, Microsoft Teams, or other tools outside Fabric.

## Evaluation of the AI skill

The quality and safety of AI skill responses went through rigorous evaluation:

**Benchmark Testing**: The product team tested AI skills across a range of public and private datasets to ensure high-quality and accurate responses.

**Enhanced Harm Mitigations**: More safeguards are in place to ensure AI skill outputs remain focused on the context of selected data sources, reducing the risk of irrelevant or misleading answers.

## Limitations

The AI skill is currently in public preview and has limitations. Updates will improve the AI skill over time.

- Generative AI doesn't interpret the results of an executed T-SQL/DAX/KQL query. It only generates that query.
- You can't add more than five data sources to the AI skill.
- The AI skill only generates T-SQL/DAX/KQL "read" queries. It doesn't generate T-SQL/DAX/KQL queries that create, update, or delete data.
- The AI skill can only access data that you provide. It only uses the data resource configurations that you provide.
- The AI skill has data access permissions that match the permissions granted to the user interacting with the AI skill. This is true when the AI skill is published to other locations, for example, Microsoft Copilot Studio, Azure AI Foundry, and Microsoft Teams.
- You can't use the AI skill to access unstructured data resources. These resources include .pdf, .docx, or .txt files, for example.
- The AI skill blocks non-English language questions or instructions.
- You can't change the LLM that the AI skill uses.
- You can't add a KQL database as a data source if it has more than 1,000 tables or any table with over 100 columns.
- You can't add a Power BI semantic model as a data source if it contains more than a total of 100 columns and measures.
- The AI skill works best with 25 or fewer tables selected across all data sources.
- Nondescriptive data resource column and table names have a significant, negative impact on generated T-SQL/DAX/KQL query quality. We recommend the use of descriptive names.
- Use of too many columns and tables might lower AI skill performance.
- The AI skill is currently designed to handle simple queries. Complex queries that require many joins or sophisticated logic tend to have lower reliability.
- If you add a Power BI semantic model as a data source, the AI skill won't use any hidden tables, columns, or measures.
- To add a Power BI semantic model as a data source for AI skill, you need read/write permissions for that Power BI semantic model. Querying an AI skill that uses a Power BI semantic model also requires you to have read/write permissions for the underlying Power BI semantic model.
- The AI skill might return incorrect answers. You should test the AI skill with your colleagues to verify that it answers questions as expected. If it makes mistakes, provide it with more examples and instructions.


## Related content

- [AI skill scenario](ai-skill-scenario.md)
- [Create an AI skill](how-to-create-ai-skill.md)