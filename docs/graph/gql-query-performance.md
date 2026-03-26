---
title: Optimize GQL Query Performance for graph in Microsoft Fabric
description: Learn how to write efficient GQL queries for graph in Microsoft Fabric. Apply filtering, traversal, and key constraint strategies to improve query performance.
ms.topic: how-to
ms.date: 03/12/2026
ms.reviewer: splantikow
---

# Optimize GQL query performance for graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This article provides guidance for writing GQL (Graph Query Language) queries that perform predictably and efficiently when working with graph in Microsoft Fabric. The recommendations are based on current platform behavior and documented constraints.

For hard limits on graph size, result size, and query timeout, see [Current limitations](limitations.md).

## Filter early in patterns

Place filters inside graph patterns rather than in later statements. Pattern-level `WHERE` clauses reduce the number of intermediate results before joins and subsequent statements run, which lowers overall execution cost.

**Recommended:** Filter during pattern matching.

```gql
-- Pattern-level WHERE reduces intermediate results
MATCH (p:Person WHERE p.birthday < 19940101)-[:workAt]->(c:Company WHERE c.id > 1000)
RETURN p.firstName, p.lastName, c.name
```

**Avoid:** Filtering late with a separate FILTER statement.

```gql
-- Statement-level filter runs after all pattern matches are produced
MATCH (p:Person)-[:workAt]->(c:Company)
FILTER p.birthday < 19940101 AND c.id > 1000
RETURN p.firstName, p.lastName, c.name
```

Both queries return the same results, but the first version lets the query engine prune rows earlier in the evaluation process.

> [!TIP]
> Think of pattern-level `WHERE` as analogous to a SQL `JOIN ... ON` condition. It constrains matches at the point of evaluation instead of post-filtering the full result set.

## Return only the properties you need

Return only the node and edge properties your scenario requires. Avoid returning full nodes or using `RETURN *` when you need only a subset of properties.

In graph, OneLake tables back node properties. Selecting unnecessary properties increases data read, serialization cost, and response size. During graph modeling, all columns from the source table are added as properties by default unless you remove them.

**Recommended:** Narrow projection.

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN p.firstName, p.lastName, c.name
```

**Avoid:** Returning full nodes.

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN *
```

> [!NOTE]
> Remove unused properties during graph modeling by selecting the trashcan icon next to each property. Fewer properties per node reduce both storage and query overhead.

## Limit result set size

Apply `LIMIT` or other bounding conditions when querying nodes or relationships that might have high cardinality. Unbounded graph matches can produce very large result sets that approach platform limits.

**Recommended:** Bounded results.

```gql
MATCH (p:Person)-[:knows]->(friend:Person)
RETURN p.firstName, friend.firstName
LIMIT 1000
```

**Avoid:** Unbounded high-cardinality match.

```gql
MATCH (p:Person)-[:knows]->(friend:Person)
RETURN p.firstName, friend.firstName
```

> [!IMPORTANT]
> graph truncates responses larger than 64 MB and aggregation performance can be unstable when results exceed 128 MB. Use `FILTER`, `LIMIT`, and `GROUP BY` to keep results within these bounds. For more information, see [Current limitations](limitations.md).

## Keep traversals shallow and targeted

Avoid deeply nested or highly complex graph patterns. Prefer simple, targeted traversals that directly answer a specific question. Each extra hop in a variable-length pattern can exponentially increase the number of paths the engine evaluates, especially in densely connected graphs.

**Recommended:** Tight bounds.

```gql
-- Use the narrowest hop range that answers your question
MATCH (p:Person)-[:knows]->{1,3}(friend:Person)
RETURN p.firstName, friend.firstName
LIMIT 1000
```

**Avoid:** Maximum-depth traversal without clear need.

```gql
-- Exploring the full 8-hop limit on a dense graph is expensive
MATCH (p:Person)-[:knows]->{1,8}(friend:Person)
RETURN *
```

> [!IMPORTANT]
> graph supports up to **eight hops** in variable-length patterns. Even so, use the tightest bounds your scenario allows. In the example, the `{1,3}` pattern is significantly cheaper than `{1,8}` on the same graph.

## Use TRAIL to prevent redundant traversals

Use `TRAIL` path mode to prevent the query engine from revisiting the same edge. In dense graphs, cycles can cause exponential path explosion. `TRAIL` ensures each edge is visited at most once per path, which improves both correctness and performance.

```gql
-- TRAIL prevents revisiting the same :knows edge
MATCH TRAIL (src:Person)-[:knows]->{1,4}(dst:Person)
WHERE src.firstName = 'Alice' AND dst.firstName = 'Bob'
RETURN count(*) AS numPaths
```

Without `TRAIL`, the same query on a cyclic graph can produce a much larger (and often redundant) result set.

## Use shared variables for efficient joins

When a query requires data from multiple relationships, use a shared variable to join patterns on the same entity. Without a shared variable, patterns can produce a cartesian product - every combination of matches from both patterns - leading to a much larger result set.

**Recommended:** Shared variable `p` joins the patterns.

```gql
-- Single shared variable ensures an efficient join
MATCH (p:Person)-[:workAt]->(c:Company),
      (p)-[:isLocatedIn]->(city:City)
RETURN p.firstName, c.name AS company, city.name AS city
LIMIT 1000
```

**Avoid:** Independent patterns with no shared variable.

```gql
-- Without a shared variable, this produces a cartesian product
MATCH (p1:Person)-[:workAt]->(c:Company),
      (p2:Person)-[:isLocatedIn]->(city:City)
RETURN p1.firstName, c.name, p2.firstName, city.name
```

A cartesian product pairs every result from one pattern with every result from the other. If `Person-workAt->Company` matches 1,000 rows and `Person-isLocatedIn->City` matches 500 rows, the query returns 1,000 × 500 = 500,000 rows. Adding a shared variable constrains the join so only matching pairs are returned.

## Define key constraints on nodes

Define [node key constraints](gql-graph-types.md#set-up-node-key-constraints) in your graph type. Key constraints enable the system to optimize queries that look up specific nodes by their key properties, similar to primary key indexes in relational databases.

For example, if your graph type defines `id` as the key for `Person` nodes:

```gql
CONSTRAINT person_pk
  FOR (n:Person) REQUIRE n.id IS KEY
```

Then queries that filter on `id` can use that key for a direct lookup:

```gql
-- Fast: the engine can look up person 12345 directly using the key
MATCH (p:Person WHERE p.id = 12345)-[:workAt]->(c:Company)
RETURN p.firstName, c.name
```

Without the filter on the key property, the engine must scan every `Person` node:

```gql
-- Slower: scans all Person nodes before traversing
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN p.firstName, c.name
```

> [!TIP]
> When you need a specific node, filter on its key property in the `MATCH` pattern to take advantage of the constraint you defined.

## Choose appropriate data types

Select the most specific data type for each property during graph modeling. Choosing the right types is important for both storage efficiency and query performance. For example, numeric comparisons on `INT` properties are faster than string comparisons on equivalent `STRING` values.

For supported data types, see [Current limitations — Data types](limitations.md#data-types) and [Supported property types](gql-graph-types.md#supported-property-types).

## Combine related traversals in a single query

Where possible, retrieve related entities in a single graph pattern rather than issuing separate queries that traverse the same edges independently. Combining traversals avoids redundant pattern matching and prevents the N+1 query problem, where one initial query triggers a separate query for each result row.

**Recommended:** Single combined pattern.

```gql
MATCH (c:Customer)-[:purchased]->(o:Order)-[:contains]->(product:Product)
RETURN c.id, o.id, product.name
LIMIT 1000
```

**Avoid:** Two separate queries that traverse the same `Customer → Order` edge.

```gql
-- Query 1: fetch 100 orders
MATCH (c:Customer)-[:purchased]->(o:Order)
RETURN c.id, o.id

-- Query 2: run once per order to get products (N+1 problem)
MATCH (o:Order)-[:contains]->(product:Product)
RETURN o.id, product.name
```

## Test queries against realistic data volumes

Queries that perform well on small datasets might not scale linearly. Test your queries with data volumes that represent your expected production workload.

- Prefer conservative query shapes that include filters and limits.
- Avoid exploratory "return everything" queries against large graphs.
- Monitor query duration relative to the 20-minute timeout limit.

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL graph types](gql-graph-types.md)
- [GQL graph patterns](gql-graph-patterns.md)
- [Current limitations](limitations.md)
- [Troubleshooting and FAQ](troubleshooting-and-faq.md)
