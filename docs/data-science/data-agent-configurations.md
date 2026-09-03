---
title: Data agent configurations
description: Overview of the various configurations for the data agent.
ms.author: scottpolly
author: s-polly
ms.reviewer: midesa
ms.topic: concept-article
ms.date: 08/25/2026
ai-usage: ai-assisted
---

# Configure your data agent

A data agent lets users interact with data through natural language. To improve the accuracy of results, add business context that shapes how the agent interprets questions and builds queries. This context helps you create customized solutions that reflect your organization's processes, scenarios, and business logic, so the insights the agent generates are both accurate and contextually relevant.

This article describes the configurations you can use to enhance your data agent.

## Data agent instructions

Data agent instructions guide the agent in generating accurate and relevant responses to user questions. These instructions can specify which data sources to prioritize, outline how to handle certain types of queries, and provide helpful terminology or context for interpreting user intent.

Use this recommended format to write effective agent-level instructions:

```md

## Objective
// Describe the overall goal of the agent. 
// Example: "Help users analyze retail sales performance and customer behavior across regions."

## Data sources
// Specify which data sources the agent should consider, and in what order of priority.
// Example: "Use 'SalesLakehouse' for product and transaction data. Use 'CRMModel' for customer demographics."

## Key terminology
// Define terms or acronyms the agent may encounter in user queries.
// Example: "'GMV' refers to Gross Merchandise Value."

## Response guidelines
// Set expectations for how the agent should format or present answers.
// Example: "Present results as a short summary followed by a table of the supporting data."

## Handling common topics
// Provide special handling rules or context for frequently asked topics.
// Example: "When asked about customers, use the 'ChurnModelScoring' Lakehouse to get customer details. Then, list any open support tickets"

```

:::image type="content" source="media/how-to-create-data-agent/configuration-agent-instructions.png" alt-text="Screenshot of adding data agent level instructions to the data agent" lightbox="media/how-to-create-data-agent/configuration-agent-instructions.png":::

## Data source instructions

Data source instructions are applied when the agent routes a question to a specific data source. These instructions provide the context needed to construct precise queries—whether in SQL, DAX, or KQL—so the agent can retrieve accurate information.

This section should include data source–specific guidance, such as relevant tables, columns, relationships, and any query logic required to answer common or complex questions. The more context provided, the more effectively the agent can generate accurate and meaningful queries.

Use the following template as a starting point:

```md
## General knowledge
// Share general background information the agent should consider when querying this data source.

## Table descriptions
// Describe key tables and important columns within those tables.

## When asked about
// Provide query-specific logic or table preferences for certain topics. 
// Example: "When asked about shoe sales, always use the SalesProduct table."

```

:::image type="content" source="media/how-to-create-data-agent/configuration-data-source-instructions.png" alt-text="Screenshot of adding data source level instructions to the data agent" lightbox="media/how-to-create-data-agent/configuration-data-source-instructions.png":::

## Data source description

Data source descriptions help creators provide high-level context about each data source so the data agent can intelligently route questions. A description should summarize what the data source contains, the types of questions it can answer, and any business-specific nuances that help distinguish it from other sources. The agent uses this information during its reasoning process to determine which source is the most relevant to a user's query.

:::image type="content" source="media/how-to-create-data-agent/configuration-data-source-description.png" alt-text="Screenshot of adding data source descriptions to the data agent." lightbox="media/how-to-create-data-agent/configuration-data-source-description.png":::

> [!NOTE]
> The data agent also considers metadata such as the description, schema, and example queries to determine which data source to use when answering a particular question.

## Data source example queries

Example queries, also known as few-shot examples, are used by data agent tools to improve the quality of generated queries. They allow creators to pass example query logic that the agent can reference when forming a response. When a data source is used, the corresponding tool automatically looks up the most relevant example queries for the user's question and passes the top three to the data agent tool. These examples are incorporated into the generation process, helping the agent produce more accurate and contextually appropriate query results.

:::image type="content" source="media/how-to-create-data-agent/data-agent-adding-examples-sql.png" alt-text="Screenshot of adding example queries to the data agent" lightbox="media/how-to-create-data-agent/data-agent-adding-examples-sql.png":::

## Schema object descriptions (Preview)

For SQL data sources, schema object descriptions provide business context for tables, columns, and other elements in a data source schema. The data agent uses these descriptions to interpret large or ambiguous schemas and understand what each element represents, which helps it generate more accurate queries.

> [!NOTE]
> Schema object descriptions are available only when your data agent uses the [preview runtime](data-agent-runtime.md#preview-runtime).

:::image type="content" source="media/how-to-create-data-agent/data-agent-schema-object-descriptions.png" alt-text="Screenshot of editing a table description in the Schema object descriptions pane of a data agent." lightbox="media/how-to-create-data-agent/data-agent-schema-object-descriptions.png":::

To learn how to add and manage descriptions, see [Add schema object descriptions (Preview)](data-agent-schema-object-descriptions.md).

## Next steps

- [Data agent concept](concept-data-agent.md)
- [Data agent scenario](data-agent-scenario.md)