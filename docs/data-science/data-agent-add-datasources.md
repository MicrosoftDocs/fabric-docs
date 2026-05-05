---
title: Add a datasource to Data Agent
description: Get started with Data Agent by adding your Fabric datasources, and learn about how data agents allow you to curate an expert over your data. 
ms.author: jburchel
author: jonburchel
ms.reviewer: shradha
reviewer: shradha
ms.topic: how-to
ms.date: 2/6/2026
ms.search.form: Data Agent
ai-usage: ai-assisted
---

# Add and configure datasources in Fabric data agent

Data Agent in Microsoft Fabric enables organizations to build conversational experiences over their enterprise data. By connecting Fabric artifacts to a Data Agent, users can translate natural language questions into precise queries, empowering stakeholders, from analysts to executives, to unlock insights without writing a single line of code. This article walks through every data source that Data Agent supports today and the configuration capabilities available for each data source.

## Overview

Data Agent supports the following data source categories:

| Category | Artifacts | Query Language | Key Scenario |
|---|---|---|---|
| **SQL** | Lakehouse, Data Warehouse, SQL Database, Mirrored Databases | T-SQL | Structured analytics over relational and Delta Lake data |
| **Eventhouse** | Eventhouse KQL Database | KQL | Real-time intelligence and time-series analytics |
| **Semantic Model** | Power BI Semantic Models | DAX | Business logic, calculated measures, and curated metrics |
| **Graph** | Graph Model | GQL | Relationship-rich data exploration and graph analytics |
| **Ontology** | Fabric Ontology | Ontology-native | Domain knowledge and semantic context for data integration |
| **Azure AI Search** | Azure AI Search Index | Natural language + search | Unstructured data retrieval (PDFs, text, enriched content) |

> [!TIP]
> A single Data Agent can combine up to five data sources in any combination, letting you blend structured, real-time, semantic, and unstructured data in one conversational experience.

# [SQL](#tab/sql)
### Supported Artifacts

- **Lakehouse**—Delta Lake tables surfaced through the SQL Analytics Endpoint.
- **Data Warehouse**—Full Fabric warehouse with T-SQL surface area.
- **SQL Database**—Fabric-native SQL databases.
- **Mirrored Databases**—External databases mirrored into Fabric (for example, Azure SQL, Cosmos DB, Snowflake).

Every SQL source in Fabric comes with a **SQL Analytics Endpoint**, a high-performance, read-only T-SQL query surface over OneLake Delta data. Data Agent leverages a built-in **NL2SQL** service that:

1. Translates the user's natural language question into a T-SQL query using user provided selected schema, instructions, and example queries.
2. Validates the generated query against the schema selection to ensure it only references approved tables and views.
3. Executes the query through the SQL Analytics Endpoint and returns human-readable results.


# [Eventhouse](#tab/kql)
### Supported Artifacts

- **Eventhouse KQL Database**—Fabric's Real-Time Intelligence store for streaming, event-driven, and time-series data.

Data Agent connects to the **Eventhouse KQL Database Endpoint**  and leverages Kusto's built-in **NL2KQL** enabling the following capabilities:

1. The user's question is translated into a KQL query using the selected schema and any provided instructions or examples.
2. The query is validated to confirm it only touches the approved schema entities.
3. On approval, the query executes against the Kusto engine—optimized for low-latency, high-throughput analytical workloads.

# [Semantic Model](#tab/dax)

### Supported Artifacts

- **Power BI Semantic Models**—Published datasets containing tables, relationships, measures, calculated columns, and hierarchies.

Every semantic model in Fabric exposes an **XMLA Endpoint**, which Data Agent uses to execute DAX queries. The built-in **NL2DAX** service:

1. Translates natural language into a DAX query, leveraging the model's metadata (table descriptions, column synonyms, measure definitions, relationships).
2. Validates the query against the selected schema.
3. Executes via the XMLA Endpoint and returns formatted results.

# [GQL](#tab/gql)

### Supported Artifacts

- **Graph Model**—Fabric graph artifacts that define node and edge schemas.

Graph Data Agent can run **GQL queries** and surface insights from your graph data sources in Fabric. To configure such an agent, add a graph model or graph queryset as your data source.

When the data agent runs GQL against a graph data source, the underlying Fabric Graph artifact will perform the query execution, incurring [graph operation](../graph/overview.md#pricing-and-capacity-units) consumption.

# [Ontology](#tab/Ontology)
### Supported Artifacts

- **Fabric Ontology**—A semantic layer that captures domain knowledge, entity definitions, and relationships.

After an ontology is configured in Fabric, it can be added as a data source to Data Agent. The agent uses the ontology to understand domain context and answer questions grounded in your organization's knowledge model.


# [Unstructured Data](#tab/unstructured-data)
### Supported Artifacts

- **Azure AI Search Index**—Indexes built in Azure AI Foundry over unstructured content such as PDFs, text files, and other enriched documents.

Data Agent connects directly to your Azure AI Search index using a resource URL. When a user asks a question, the agent sends the query (with the user's identity for access control) to the search index, retrieves the most relevant document chunks, and composes a final answer. Citations are included automatically when the index contains URL or file path fields.


---

## Configure Your Datasource

# [SQL](#tab/sql)
### SQL Sources Supported Configurations
| Configuration | Supported | Details |
|---|---|---|
| Schema Selection | ✅ Yes | Select specific **Tables**, **Views**, and **Functions** to scope the agent. |
| Agent Instructions | ✅ Yes | Guide the agent on when and how to route questions to this source. |
| Datasource Instructions | ✅ Yes | Provide table descriptions, join logic, key column details, and business terminology to NL2SQL. |
| Datasource Description | ✅ Yes | Description that helps the agent determine whether this data source is relevant to the user's question. |
| Example Queries | ✅ Yes | Supply natural-language/SQL pairs so the agent can learn complex query patterns. Top examples are automatically retrieved via vector similarity. |

# [Eventhouse](#tab/kql)
### Eventhouse KQL Sources Supported Configurations
| Configuration | Supported | Details |
|---|---|---|
| Schema Selection | ✅ Yes | Select specific **Tables**, **Materialized Views**, **Functions**, and **Shortcuts** to scope the agent. |
| Agent Instructions | ✅ Yes | Guide the agent on when and how to route questions to this source. |
| Datasource Instructions | ✅ Yes | Provide context about tables, MVs, Functions, and Shortcuts to NL2KQL. |
| Datasource Description | ✅ Yes | Description that helps the agent determine whether this data source is relevant to the user's question. |
| Example Queries | ✅ Yes | Supply natural-language/KQL pairs to teach the agent complex aggregation and join patterns. |


# [Semantic Model](#tab/dax)
### Semantic Model Supported Configurations
| Configuration | Supported | Details |
|---|---|---|
| Schema Selection | ✅ Yes* | Select tables to expose. Column-level control is available when **Prep for AI** is configured in Power BI. |
| Agent Instructions | ✅ Yes | Guide the agent on when to choose the semantic model to answer questions. |
| Datasource Instructions | ❌ No* | Instructions are managed through **Prep for AI** (AI Instructions and Verified Answers) on the semantic model side. Data Agent honors them when present. |
| Datasource Description | ❌ No | Semantic Models do not support data source descriptions. |
| Example Queries | ❌ No* | Not currently supported for semantic models. Use Verified Answers in Prep for AI to include example DAX queries. |

*\*Semantic models are primarily configured through [Prep for AI in Power BI](/power-bi/create-reports/copilot-prepare-data-ai), which offers AI Data Schemas, AI Instructions, and Verified Answers.*

# [GQL](#tab/gql)
### Graph Model Supported Configurations

| Configuration | Supported | Details |
|---|---|---|
| Schema Selection | ❌ No | Graph doesn't allow a user to scope their Agent on specific nodes and edges. |
| Agent Instructions | ✅ Yes | Guide the agent on when and how to route questions to this source. |
| Datasource Instructions | ✅ Yes | Passed to the NL2GQL engine to guide query generation. |
| Datasource Description | ✅ Yes | Description that helps the agent determine whether this data source is relevant to the user's question. |
| Example Queries | ✅ Yes | Passed to NL2GQL to teach complex graph traversal patterns. |

# [Ontology](#tab/Ontology)
### Ontology Supported Configurations

| Configuration | Supported | Details |
|---|---|---|
| Schema Selection | ❌ No | Not supported for ontology data sources. |
| Agent Instructions | ✅ Yes | Guide the agent on when to choose the semantic model to answer questions. |
| Datasource Instructions | ❌ No | Not supported for ontology data sources. |
| Datasource Description | ✅ Yes | Description that helps the agent determine whether this data source is relevant to the user's question. |
| Example Queries | ❌ No | Not supported for ontology data sources. |

# [Unstructured Data](#tab/unstructured-data)
### Unstructured Data Configurations
| Setting | Details |
|---|---|
| Display Name | Custom name shown for the index in the agent experience. |
| Search Type | Choose from full-text, hybrid, or semantic search depending on your index configuration. |
| Number of Documents | Control how many documents are retrieved per query (recommended: 3–20). |
| Context / Description | Describe the index contents, key fields, and usage guidance to help routing. |
| Agent Instructions | Guide how the agent interprets search results and composes the final answer. |

---

## Learn more

- [Data Agent concepts](/fabric/data-science/concept-data-agent)
- [Data Agent configurations](/fabric/data-science/data-agent-configurations)
- [Configuration best practices](/fabric/data-science/data-agent-configuration-best-practices)
- [End-to-end tutorial](/fabric/data-science/data-agent-end-to-end-tutorial)
- [Connect Azure AI Search Index](/fabric/data-science/data-agent-ai-search-index)
- [Add a Power BI semantic model](/fabric/data-science/data-agent-semantic-model)

