---
title: Graph in Microsoft Fabric architecture
description: Learn how data flows through Graph in Microsoft Fabric, from data ingestion and storage to graph modeling, querying, and results.
ms.topic: concept-article
ms.date: 02/20/2026
ms.reviewer: wangwilliam
ai-usage: ai-assisted
---

# Graph in Microsoft Fabric architecture

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Graph in Microsoft Fabric transforms structured data stored in OneLake into a modeled, queryable graph. You can then query the graph by using visual or GQL-based tools that execute through a common engine to produce visual, tabular, or programmatic results.

The following diagram illustrates the end-to-end data flow from source to insights:

:::image type="content" source="./media/tutorial/graph-data-flow.png" alt-text="Diagram showing the graph data flow from data sources through storage, graph modeling, query authoring, execution, and results." lightbox="./media/tutorial/graph-data-flow.png":::

## Data sources

Data originates from external systems such as Azure services, other cloud platforms, or on-premises sources. Microsoft Fabric makes it easy to connect to a wide range of data services and bring data into OneLake.

## Storage in OneLake

Ingested data is stored in [OneLake](../onelake/onelake-overview.md) as tabular source tables in a lakehouse. Graph in Microsoft Fabric reads directly from your lakehouse tables, so you don't need to duplicate or move data into a separate database.

## Graph modeling

In the graph modeling step, define the graph schema by specifying:

- **Node types:** Entities in your data, such as customers, products, or orders.
- **Edge types:** Relationships between entities, such as "purchases," "contains," or "produces."
- **Table mappings:** How node and edge definitions map to the underlying source tables.

This step establishes the [labeled property graph](graph-data-models.md) structure. You must complete graph modeling before you can query the graph.

> [!NOTE]
> Graph in Microsoft Fabric currently doesn't support schema evolution. If you need to make structural changes, such as adding new properties, modifying labels, or changing relationship types, reingest the updated source data into a new model.

## Queryable graph

When you save the graph model, Graph ingests data from the underlying lakehouse tables and constructs a read-optimized, queryable graph. This graph structure is optimized for traversal and pattern matching, which enables fast and efficient graph queries at scale.

## Query authoring

You author queries against the queryable graph by using one of two experiences:

- **Query Builder:** A visual, interactive interface for exploring nodes and relationships without writing code. For more information, see [Query the graph with the query builder](tutorial-query-builder.md).
- **Code Editor:** A text-based editor for writing [GQL (Graph Query Language)](gql-language-guide.md) queries. For more information, see [Query the graph with GQL](tutorial-query-code-editor.md).

Both options target the same underlying graph. Choose the authoring experience that fits your workflow.

## Query execution

Authored queries are executed through a common execution layer that supports:

- **GQL:** Queries the graph by using the [international standard for graph query language (ISO/IEC 39075)](gql-language-guide.md).
- **Natural Language to GQL (NL2GQL):** Converts natural language questions into GQL queries. [Sign up for the NL2GQL preview](https://forms.office.com/r/97QkVDBeuM).
- **REST-based execution:** Runs queries programmatically by using the [GQL query API](gql-query-api.md).

This layer runs the query logic against the queryable graph and returns results.

## Query results

Depending on how you query the graph, you receive results in one or more of the following formats:

- **Visual graph diagrams:** Interactive visualizations of nodes and relationships.
- **Tabular result sets:** Structured data in rows and columns.
- **Programmatic responses:** JSON output for REST or downstream consumption.

You can explore results interactively, share them as read-only querysets, or consume them in other tools and applications.

## Related content

- [Graph in Microsoft Fabric overview](overview.md)
- [Quickstart guide for Graph in Microsoft Fabric](quickstart.md)
- [Tutorial: Introduction to Graph in Microsoft Fabric](tutorial-introduction.md)
