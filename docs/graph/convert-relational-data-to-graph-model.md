---
title: Convert relational data to a graph model in Microsoft Fabric
description: Learn how to convert relational tables into a graph model in Microsoft Fabric with step-by-step schema mapping for node types, edge types, and common patterns.
ms.topic: how-to
ms.date: 04/27/2026
ms.reviewer: wangwilliam
ai-usage: ai-assisted
---

# Convert relational data to a graph model in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Converting relational data to a graph model in Microsoft Fabric helps you query connections directly instead of writing repeated joins. This article provides a practical conversion workflow for mapping relational tables to node types and edge types, then validating the model before you scale it.

If you're still deciding whether graph is the right fit for your workload, first review [Compare graph and relational databases](graph-relational-databases.md).

Use this article as your conversion checklist. For detailed modeling rules, see [Design a graph schema](design-graph-schema.md).

## Prerequisites

- A [Fabric workspace](../fundamentals/create-workspaces.md) with permission to create items.
- A [lakehouse](../onelake/create-lakehouse-onelake.md) that contains source relational tables.
- [Graph enabled for your tenant](../admin/admin-center.md) and available in your [region](overview.md#region-availability).
- Familiarity with the graph model editor. If you're new to graph, start with [Tutorial: Introduction to graph](tutorial-introduction.md).

## Conversion workflow

Use this sequence when you convert relational data:

1. Look at your source tables and identify the entities in your data (customers, products, orders), how each row is uniquely identified, and how tables connect to each other.
1. Decide which entities become node types in your graph, and which column uniquely identifies each one.
1. Decide which table connections become edge types, and what direction they go (for example, `Customer` *purchases* `Order`).
1. Apply the right mapping pattern based on your table structure - one-to-many, many-to-many, embedded values, or chains of related tables.
1. Build the model in the graph model editor and confirm that node types and edge types appear as expected.

## Step 1: Profile source relational tables

Confirm the following items in your source tables:

- Primary entities that represent distinct things, such as customers, products, or orders.
- Key columns that uniquely identify each entity row, such as `CustomerID`, `OrderID`, or `ProductSKU`.
- Foreign-key columns that define relationships between tables, such as `CustomerID` in the `Orders` table referencing the `Customers` table.
- Columns that might be embedded entities, such as `Country` or `Department`.

For detailed decision criteria about entities, keys, properties, and mapping constraints, see [Design a graph schema](design-graph-schema.md).

## Step 2: Map entities to node types

Map each entity to a node type.

| Relational element | Graph mapping | Example |
| ------------------ | ------------- | ------- |
| Entity table | Node type | `Customers` table -> `Customer` node type |
| Primary key | Node key (ID) | `CustomerID_K` |
| Descriptive columns | Node properties | `FirstName`, `LastName`, `EmailAddress` |

Use a key column with stable, unique values. If one column isn't unique, configure a compound key.

For design guidance, see [Design a graph schema](design-graph-schema.md).

## Step 3: Map relationships to edge types

Map each relationship path to a directed edge type.

| Relational element | Graph mapping | Example |
| ------------------ | ------------- | ------- |
| Foreign-key relationship | Edge type | `purchases` |
| Referencing table | Edge mapping table | `adventureworks_orders` |
| Parent/child join columns | Source and target mappings | `CustomerID_FK` -> `CustomerID_K` |

Choose edge labels as verb phrases that read clearly in queries, such as `purchases`, `contains`, and `belongsTo`.

For edge-mapping requirements, see [Choose edge types](design-graph-schema.md#choose-edge-types). For UI steps, see [Tutorial: Add edge types to your graph](tutorial-model-edges.md).

## Step 4: Apply common relational-to-graph patterns

Use these patterns during conversion, then follow the linked guides for detailed implementation. For full pattern descriptions, see [Common tabular-to-graph patterns](design-graph-schema.md#common-tabular-to-graph-patterns).

- **One-to-many**: A child table references a parent key (for example, Orders referencing Customers). See [Tutorial: Add edge types to your graph](tutorial-model-edges.md).
- **Many-to-many**: A junction table links two entities (for example, a SalesOrderDetail table linking Products and Orders). See [Tutorial: Add edge types to your graph](tutorial-model-edges.md).
- **Embedded entity**: A column value should become a traversable node type (for example, promoting `Country` to a `Country` node type). See [Tutorial: Add multiple node and edge types from one mapping table](tutorial-model-node-edge-from-same-table.md).
- **Hierarchy**: Parent-child chains span multiple levels (for example, an employee reporting structure). See [Tutorial: Add edge types to your graph](tutorial-model-edges.md).

## Step 5: Build and validate the graph model

After you finish the mappings, build and validate the graph model in the editor:

1. Add node types and configure IDs from key columns.
1. Add edge types and map source and target columns.
1. Select **Save** to verify the model and load data.
1. Confirm that expected node type and edge type labels appear in the canvas.
1. Run validation queries to confirm relationships and cardinality. For example:

   ```gql
   MATCH (c:Customer)-[:purchases]->(o:Order)
   RETURN c.CustomerID_K, COUNT(o) AS orderCount
   ORDER BY orderCount DESC
   ```

   Update the labels to match your schema. Confirm that each edge type returns results and that counts look right.

If expected edges are missing, verify join-column values and data types in your mapping tables.

## Troubleshoot common conversion issues

- No edges created: Confirm source and target mapping columns match node key values and data types.
- Duplicate nodes: Confirm node key columns are unique or switch to a compound key.
- Over-modeled graph: Keep descriptive fields as properties unless you need to traverse them as entities.
- Under-modeled graph: Extract shared columns to node types when you need relationship-based analysis.

## Related content

- [Design a graph schema](design-graph-schema.md)
- [Tutorial: Introduction to graph](tutorial-introduction.md)
- [Tutorial: Add node types to your graph](tutorial-model-nodes.md)
- [Tutorial: Add edge types to your graph](tutorial-model-edges.md)
- [Tutorial: Add multiple node and edge types from one mapping table](tutorial-model-node-edge-from-same-table.md)
- [Current limitations](limitations.md)
