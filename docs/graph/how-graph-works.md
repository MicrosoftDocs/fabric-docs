---
title: How graph in Microsoft Fabric works
description: Learn how data flows through graph in Microsoft Fabric, from data ingestion and storage in OneLake to graph modeling, querying, and returning results.
#customer intent: As a data analyst or engineer, I want to understand how graph in Microsoft Fabric processes and queries data so that I can evaluate whether it fits my analytical needs.
ms.topic: concept-article
ms.date: 03/31/2026
ms.reviewer: wangwilliam
ai-usage: ai-assisted
---

# How graph in Microsoft Fabric works

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Graph in Microsoft Fabric transforms structured data stored in OneLake into a modeled, queryable graph. Query the graph by using visual or GQL-based tools that run through a common engine to produce visual, tabular, or programmatic results.

This article describes the graph architecture and explains the end-to-end data flow from source to insights.

The following diagram illustrates the end-to-end data flow from source to insights:

:::image type="complex" source="./media/tutorial/graph-data-flow.png" alt-text="Diagram that shows the graph data flow from data sources through storage, graph modeling, query authoring, execution, and results." lightbox="./media/tutorial/graph-data-flow.png":::

Data flows from external sources into OneLake storage as tabular source tables. In the graph modeling step, you define node types, edge types, and table mappings to create a labeled property graph. Saving the model produces a queryable graph optimized for traversal. You author queries by using the Query Builder or Code Editor, then execute them through GQL, NL2GQL, or REST. Results return as visual graph diagrams, tabular result sets, or programmatic JSON responses.

:::image-end:::

## Data sources

Data originates from external systems such as Azure services, other cloud platforms, or on-premises sources. Graph in Microsoft Fabric works with data from these sources after you ingest it into OneLake, where graph can read it.

## Storage in OneLake

You store ingested data in [OneLake](../onelake/onelake-overview.md) as tabular source tables in a lakehouse. Graph reads directly from your lakehouse tables, so you don't need to duplicate or move data into a separate database.

## Graph modeling

In the graph modeling step, you define the graph schema by specifying:

- **Node types:** Entities in your data, such as customers, products, or orders.
- **Edge types:** Relationships between entities, such as "purchases," "contains," or "produces."
- **Table mappings:** How node and edge definitions map to the underlying source tables.

This step creates the [labeled property graph](graph-data-models.md) structure. Complete graph modeling before you query the graph.

> [!NOTE]
> Graph currently doesn't support schema evolution. If you need to make structural changes—such as adding new properties, modifying labels, or changing relationship types—reingest the updated source data into a new model.

## Queryable graph

When you save the model, graph ingests data from the underlying lakehouse tables and constructs a read-optimized, queryable graph. This graph structure is optimized for traversal and pattern matching, which enables fast and efficient graph queries at scale.

## Query authoring

You author queries against the queryable graph by using one of two experiences:

- **Query Builder:** A visual, interactive interface for exploring nodes and relationships without writing code. For more information, see [Query the graph with the query builder](tutorial-query-builder.md).
- **Code Editor:** A text-based editor for writing [GQL (Graph Query Language)](gql-language-guide.md) queries. For more information, see [Query the graph with GQL](tutorial-query-code-editor.md).

Both options target the same underlying graph. Choose the authoring experience that fits your workflow.

## Query execution

You run queries through a common execution layer that supports:

- **GQL:** Queries the graph by using the [international standard for graph query language (ISO/IEC 39075)](gql-language-guide.md).
- **Natural Language to GQL (NL2GQL):** Converts natural language questions into GQL queries. [Sign up for the NL2GQL preview](https://forms.office.com/r/97QkVDBeuM).
- **REST-based execution:** Runs queries programmatically by using the [GQL query API](gql-query-api.md).

This layer runs the query logic against the queryable graph and returns results.

## Query results

Depending on how you query the graph, you receive results in one or more of the following formats:

- **Visual graph diagrams:** Interactive visualizations of nodes and relationships.
- **Tabular result sets:** Structured data in rows and columns.
- **Programmatic responses:** JSON output for REST or downstream consumption.

Explore results interactively, share them as read-only querysets, or use them in other tools and applications.

## Related content

- [Graph overview](overview.md)
- [Quickstart guide for graph](quickstart.md)
- [Tutorial: Introduction to graph](tutorial-introduction.md)
