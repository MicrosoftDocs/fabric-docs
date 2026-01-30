---
title: Data agent configurations
description: Overview of the various configurations for the data agent.
ms.author: jburchel
author: jonburchel
ms.reviewer: midesa
reviewer: midesa
ms.topic: concept-article
ms.date: 12/2/2025
---

# Configure your data agent

The Data Agent is a powerful tool designed to enhance the accuracy of data results and provide creators with a means to incorporate business context into their data queries. By using the data agent, users can interact with data through natural language, making complex data operations more accessible and actionable.

Additionally, the data agent facilitates the creation, curation, and configuration of data experts, enabling organizations to build customized solutions that reflect their unique processes, scenarios, and business logic. This customization ensures that the insights generated aren't only accurate but also contextually relevant.

This article describes the various configurations you can use to enhance your data agent.

## Data agent instructions

Data agent instructions guide the agent in generating accurate and relevant responses to user questions. These instructions can specify which data sources to prioritize, outline how to handle certain types of queries, and provide helpful terminology or context for interpreting user intent.

Here is a recommended starting format for writing effective agent-level instructions:

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
// Example: ""

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
// Example: “When asked about shoe sales, always use the SalesProduct table.”

```

:::image type="content" source="media/how-to-create-data-agent/configuration-data-source-instructions.png" alt-text="Screenshot of adding data source level instructions to the data agent" lightbox="media/how-to-create-data-agent/configuration-data-source-instructions.png":::

## Data source description

Data Source descriptions allow creators to provide high-level context about each data source so the Data Agent can intelligently route questions. A description should summarize what the data source contains, the types of questions it can answer, and any business-specific nuances that help distinguish it from other sources. The agent uses this information during its reasoning process to determine which source is the most relevant to a user’s query.

:::image type="content" source="media/how-to-create-data-agent/configuration-data-source-description.png" alt-text="Screenshot of adding data source descriptions to the data agent." lightbox="media/how-to-create-data-agent/configuration-data-source-description.png":::

> [!NOTE]
> The Data Agent also considers metadata such as the description, schema, and example queries to determine which data source to use when answering a particular question.

## Data source example queries

Example queries, also known as few shot examples, are used by data agent tools to improve the quality of generated queries. They allow creators to pass example query logic that the agent can reference when forming a response. When a data source is used, the corresponding tool automatically looks up the most relevant example queries for the user’s question and passes the top three to the data agent tool. These examples are incorporated into the generation process, helping the agent produce more accurate and contextually appropriate query results.

:::image type="content" source="media/how-to-create-data-agent/data-agent-adding-examples-sql.png" alt-text="Screenshot of adding example queries to the data agent" lightbox="media/how-to-create-data-agent/data-agent-adding-examples-sql.png":::

## Next steps

- [Data agent concept](concept-data-agent.md)
- [Data agent scenario](data-agent-scenario.md)