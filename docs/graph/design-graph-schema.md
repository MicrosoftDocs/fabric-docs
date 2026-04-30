---
title: Design a Graph Schema for Graph in Microsoft Fabric
description: Learn best practices for designing a graph schema in Microsoft Fabric, including how to choose node types, edge types, key columns, and properties.
ms.date: 04/27/2026
ms.topic: how-to
ms.reviewer: wangwilliam
ai-usage: ai-assisted
---

# Design a graph schema in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

A graph schema is the collection of node types, edge types, and their properties that define the structure of your graph. A well-designed graph schema makes your data easier to query, maintain, and extend. This article provides best practices for turning tabular data in a lakehouse into an effective [labeled property graph](graph-data-models.md) in Microsoft Fabric.

Use these guidelines before you start modeling in the graph model editor. For step-by-step instructions on creating nodes and edges, see the [graph tutorial](tutorial-introduction.md). Examples in this article use the [Adventure Works sample dataset](sample-datasets.md).

> [!IMPORTANT]
> Graph currently doesn't support schema evolution. After you model your data, the structure of nodes, edges, and properties is fixed. Structural changes, such as adding properties, modifying labels, or changing relationship types, require you to create a new graph model and reload all data. This process takes time and consumes capacity, so plan your schema thoroughly before you start modeling.

## Prerequisites

- A [Fabric workspace](../fundamentals/create-workspaces.md) with a lakehouse that contains your source tables.
- Familiarity with the [graph model editor](tutorial-introduction.md).
- Optional: The [Adventure Works sample dataset](sample-datasets.md) to follow the examples in this article.

## Understand node types and edge types

Before you design a schema, understand these core concepts:

A **node type** defines a kind of entity in your graph, such as a customer, product, or order. It consists of:

- A **label**, which is the name that identifies this category of node. For example, `Customer`. You use the label in queries to refer to nodes of this type.
- A **mapping table**, which is the lakehouse table that provides the source data for the node type. For example, the *adventureworks_customers* table.
- A **key column** that uniquely identifies each node (labeled **ID** in the graph model editor). For example, `CustomerID_K`.
- **Properties**, which are columns from the table that become attributes on each node. For example, `FirstName`, `LastName`, and `EmailAddress`.

A **node** is an individual instance of a node type - one row in the mapping table. For example, each row in *adventureworks_customers* becomes a `Customer` node.

An **edge type** defines a kind of relationship between two node types. It consists of:

- A **label**, which is the name that identifies this category of relationship. For example, `purchases`.
- A **mapping table** that contains the relationship data between the source and target nodes. For example, the *adventureworks_orders* table.
- A **source node type** and a **target node type** that the edge connects. For example, `Customer` as the source and `Order` as the target.

An **edge** is an individual instance of an edge type - one row in the mapping table that connects two specific nodes.

> [!NOTE]
> In the graph model editor, the **Add node** and **Add edge** buttons create node types and edge types, not individual nodes or edges.

## Identify entities and relationships

Start by identifying the *entities* (things) and *relationships* (connections) in your data. Entities become node types. Connections between entities become edge types.

Ask these questions about your source tables:

- **What are the primary entities?** Rows that represent distinct real-world things are candidates for node types. For example, customers, products, orders, and employees.
- **How do these entities relate to each other?** Columns that reference rows in another table (foreign keys) suggest edge types. For example, `CustomerID_FK` in an `orders` table points to the `customers` table, which suggests modeling a `purchases` edge.
- **Are there embedded entities?** A column inside a table might represent a distinct entity worth extracting into its own node type. For an example, see [Choose node types](#choose-node-types). For a step-by-step walkthrough, see [Add multiple node and edge types from one mapping table](tutorial-model-node-edge-from-same-table.md).

## Choose node types

Create a node type for each entity that you need to query or traverse independently. Use these guidelines:

| Make the entity a **node type** when... | Keep it as a **property** when... |
| --- | --- |
| You need to traverse to or through it. | It's descriptive metadata you only read, not traverse. |
| Multiple entities share a relationship with it. | It's unique to the entity it belongs to. |
| You need to match or group by it directly in queries. | You only filter by it as a property of another entity. |

**Example:** In the Adventure Works dataset, `Country` starts as a column on the `employees` table. If you need to query "which employees live in the same country?" or "which countries have the most employees?", extract `Country` into its own node type. If you only need to display an employee's country as a label, leave it as a property.

## Choose key columns

Every node type requires a key column (or compound key) that uniquely identifies each node. Choose keys carefully:

- **Use existing unique identifiers** from your source tables. For example, `CustomerID_K` or `ProductID_K`.
- **Avoid surrogate keys that lack business meaning** unless no natural key exists. For example, prefer `CustomerID` over an auto-incrementing row number.
- **Use compound keys** when a single column doesn't guarantee uniqueness. For example, a `ProductVersion` node might need both `ProductID` and `VersionNumber` as its key.
- **Match data types** between key columns and the foreign key columns used in edge mappings. Mismatched types cause edge creation failures.

> [!TIP]
> Define [node key constraints](gql-graph-types.md#set-up-node-key-constraints) to enable the query engine to perform direct lookups on key properties. This optimization speeds up queries that look up specific nodes by key.

## Choose edge types

Edge types define the relationships between node types. Each edge type connects a source node type to a target node type through a mapping table.

Follow these guidelines:

- **Use descriptive labels** that read as verbs or verb phrases. For example, `purchases`, `sells`, `livesIn`, and `belongsTo`. A well-named edge makes queries easier to read.
- **Consider direction carefully.** Edges in graph are directed. Choose the direction that best represents the real-world relationship. For example, `Customer` --*purchases*--> `Order` reads more naturally than `Order` --*purchasedBy*--> `Customer`.
- **Give distinct names to edge types that connect different node type pairs.** If both "employee sells order" and "customer purchases order" connect to `Order`, name them `sells` and `purchases` rather than giving both the same label. For more information, see [edge creation limitations](limitations.md#edge-creation).

### Add properties to edge types

Unlike node types, edge types start with no properties. You can optionally add properties when the data describes the relationship itself rather than either endpoint. Edge properties are most useful when you write GQL queries that need to filter, aggregate, or return data about the relationship itself.

To add a property, double-click an edge type in the graph model editor to open the **Edit edge schema** dialog, select **Add property**, and then choose a column from the mapping table.

**When to add edge properties:** If a column answers "how much?", "when?", or "in what way?" about the connection between two nodes, it belongs on the edge - not on either node.

**Example:** In the Adventure Works dataset, the `contains` edge connects `Order` to `Product` through the *adventureworks_orders* table. Columns like `OrderQty`, `UnitPrice`, and `LineTotal` describe the relationship - how many of a product were in a specific order, at what price. Columns like `OrderDate` or `ShipDate` describe the order itself and belong on the `Order` node type, not on the edge.

> [!IMPORTANT]
> The mapping table for an edge must contain columns that match the key columns of both the source and target node types in values and data type. Tables that you use to create node types can also serve as edge mapping tables if they meet this requirement.

## Remove unnecessary properties

When you create a node type from a mapping table, every column in the table becomes a property by default. Excessive properties increase storage, slow queries, and make the graph harder to maintain. For these reasons, remove properties that you don't need for queries or analysis.

> [!NOTE]
> Edge types work differently - they start with no properties. You manually add only the properties you need by using the **Add property** button in the **Edit edge schema** dialog.

For each node type, keep only properties that are:

- Required for the uniqueness of the node (key columns)
- Used in `WHERE` filters or `RETURN` projections in your queries
- Needed for downstream analysis or visualization

For more information on how property count affects query performance, see [Return only the properties you need](gql-query-performance.md#return-only-the-properties-you-need).

## Choose data types

Select the most specific data type for each property. The right types improve both storage efficiency and query performance:

- Use `INT` or `UINT64` for numeric identifiers and counts. Numeric comparisons are faster than string comparisons.
- Use `ZONED DATETIME` for timestamps instead of string-formatted dates.
- Use `BOOLEAN` for true/false flags instead of string values like `"yes"` or `"no"`.

For the full list of supported types, see [Current limitations — Data types](limitations.md#data-types).

## Common tabular-to-graph patterns

The following table summarizes how some common tabular data structures translate to graph elements:

| Tabular structure | Graph result | Example |
| --- | --- | --- |
| **One-to-many:** Parent table + child table with foreign key | Two node types connected by an edge type. | `Customer` --*purchases*--> `Order` |
| **Many-to-many:** Junction table linking two tables | Edge type between two node types. | `Vendor` --*produces*--> `Product` |
| **Embedded entity:** Column representing a shared entity | Extracted node type with edge. | `Employee` --*livesIn*--> `Country` |
| **Hierarchy:** Chain of parent-child tables | Node types linked by edges at each level. | `Product` --*isOfType*--> `Subcategory` --*belongsTo*--> `Category` |

For a step-by-step walkthrough of the embedded entity pattern, see [Add multiple node and edge types from one mapping table](tutorial-model-node-edge-from-same-table.md).

## Change your graph schema

Graph doesn't support schema evolution. After you save a graph model, the structure of node types, edge types, and their properties is fixed. To make structural changes - such as adding a property to a node type, removing an edge type, or changing a key column - you must create a new graph model and reload your data.

To change your graph schema:

1. In your workspace, create a new graph item that connects to the same lakehouse.
1. In the graph model editor, add the node types and edge types you need, including any new or modified properties.
1. Configure key columns and edge mappings. Make sure data types match between key columns and foreign key columns.
1. Select **Save** to ingest data and build the new graph.
1. Update any querysets to point to the new graph.
1. After you verify the new graph works as expected, delete the original graph item if you don't need it.

## Related content

- [Convert relational data to a graph model](convert-relational-data-to-graph-model.md)
- [Tutorial: Introduction to graph](tutorial-introduction.md)
- [GQL graph types](gql-graph-types.md)
- [Optimize GQL query performance](gql-query-performance.md)
- [Labeled property graphs](graph-data-models.md)
- [Current limitations](limitations.md)
