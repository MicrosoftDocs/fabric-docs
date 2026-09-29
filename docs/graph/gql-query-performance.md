---
title: Optimize GQL Query Performance for graph in Microsoft Fabric
description: Learn how to write efficient GQL queries for graph in Microsoft Fabric. Apply filtering, traversal, and key constraint strategies to improve query performance.
ms.topic: how-to
ms.date: 09/17/2026
ms.reviewer: splantikow
ai-usage: ai-assisted
---

# Optimize GQL query performance for graph in Microsoft Fabric

This article provides guidance for writing GQL (Graph Query Language) queries that perform predictably and efficiently when working with graph in Microsoft Fabric. The recommendations are based on current platform behavior and documented constraints.

For hard limits on graph size, result size, and query timeout, see [Current limitations](limitations.md). Several recommendations in this article also relate to how you design your graph schema. For more information, see [Design a graph schema](design-graph-schema.md).

## Place filters according to their semantics

Place a predicate inside a graph pattern when it defines which node or edge can
participate in the match. Use a statement-level `MATCH ... WHERE` condition to
postfilter the completed match, or a separate `FILTER` statement when the
predicate applies to the row produced by an earlier statement.

For example, use pattern-level `WHERE` clauses for conditions on the matched nodes:

```gql
MATCH (p:Person WHERE p.birthday < 19940101)-[:workAt]->(c:Company WHERE c.id > 1000)
RETURN p.firstName, p.lastName, c.name
```

A separate `FILTER` can express the same condition after an ordinary mandatory
match that uses the default `ALL` path search:

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
FILTER p.birthday < 19940101 AND c.id > 1000
RETURN p.firstName, p.lastName, c.name
```

The query optimizer can apply equivalent predicates during scanning when doing
so preserves query semantics, so inline syntax isn't inherently faster. Choose
the form that expresses when the condition applies.

Predicate placement can change results with `ANY SHORTEST`. Inline predicates
constrain the paths eligible for shortest-path selection. A statement-level
`WHERE` or subsequent `FILTER` applies after path selection, so it can remove a
selected shortest path without choosing a longer path instead. For the current
`MATCH ... WHERE` limitation and a reliable placement pattern, see [Place
predicates before or after path
selection](gql-graph-patterns.md#place-predicates-before-or-after-path-selection).

Placement also matters with `OPTIONAL MATCH`, where an inline `WHERE` constrains
the optional match but a subsequent `FILTER` can remove the null-extended row.

> [!TIP]
> Think of pattern-level `WHERE` as analogous to a SQL `JOIN ... ON` condition. It describes which matches qualify rather than filtering the resulting row afterward.

## Return only the properties you need

Return only the node and edge properties your scenario requires. Avoid returning full nodes or using `RETURN *` when you need only a subset of properties.

Selecting unnecessary properties increases data read, serialization cost, and response size. During graph modeling, select only the source columns that you need as node type properties.

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
> Only add node type properties during graph modeling when they are needed for queries or analysis. Fewer properties per node reduce both storage and query overhead.

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
> Graph truncates query responses whose internal binary representation exceeds 64 MB. A truncated response includes an additional status with public code `01000` and canonical GQLSTATUS `01M11`. Use filters, narrow projections, and `LIMIT` to reduce the result size. For more information, see [Current limitations](limitations.md).

## Keep traversals shallow and targeted

Avoid deeply nested or highly complex graph patterns. Use simple, targeted traversals that directly answer a specific question. Each extra hop in a variable-length pattern can exponentially increase the number of paths the engine evaluates, especially in densely connected graphs.

**Recommended:** Tight bounds.

```gql
-- Use the narrowest hop range that answers your question
MATCH (p:Person)-[:knows]->{1,3}(friend:Person)
RETURN p.firstName, friend.firstName
LIMIT 1000
```

**Avoid:** A wide traversal range without clear need.

```gql
-- A wider range on a dense graph is more expensive
MATCH (p:Person)-[:knows]->{1,8}(friend:Person)
RETURN *
```

> [!IMPORTANT]
> The visual query builder limits variable-length paths to eight hops, but this user-interface limit doesn't apply to GQL in the code editor. Use the tightest bound your scenario allows because a wider range can match more paths.

## Use TRAIL when paths must not repeat edges

Use `TRAIL` path mode when a valid path must not repeat an edge. In graphs with cycles, this restriction can also reduce the number of matching paths compared with the default `WALK` mode.

```gql
-- TRAIL prevents revisiting the same :knows edge
MATCH TRAIL (src:Person)-[:knows]->{1,4}(dst:Person)
WHERE src.firstName = 'Alice' AND dst.firstName = 'Bob'
RETURN count(*) AS numPaths
```

Without `TRAIL`, the same query on a cyclic graph can return paths that repeat an edge. Use the mode that matches the required path semantics rather than treating `TRAIL` as a general performance optimization.

An unbounded `ALL WALK` pattern isn't supported because cycles can produce infinitely many paths. Although unbounded `TRAIL`, `SIMPLE`, and `ACYCLIC` patterns terminate, they can still enumerate many paths. Use a finite upper bound unless the query requires unbounded traversal.

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

## Filter on key properties when identifying nodes

Define [node key constraints](gql-graph-types.md#set-up-node-key-constraints) to identify nodes uniquely and enforce data integrity. When you need one specific node, include its key property in the pattern predicate to avoid matching unrelated nodes.

For example, if your graph type defines `id` as the key for `Person` nodes:

```gql
CONSTRAINT person_pk
  FOR (n:Person) REQUIRE n.id IS KEY
```

Then filter on `id` when you need that person:

```gql
MATCH (p:Person WHERE p.id = 12345)-[:workAt]->(c:Company)
RETURN p.firstName, c.name
```

Without the filter, the query matches every `Person` node before traversing `workAt` edges:

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN p.firstName, c.name
```

> [!TIP]
> A key constraint establishes identity and uniqueness. It doesn't by itself guarantee a particular physical lookup or query plan.

## Choose appropriate data types

Select the data type that represents each property's values and intended operations. For example, use a numeric type for values that you calculate or compare numerically instead of storing formatted numbers as strings.

For supported data types, see [Current limitations — Data types](limitations.md#data-types) and [Supported property types](gql-graph-types.md#supported-property-types).

## Combine related traversals in a single query

Where possible, retrieve related entities in a single graph pattern rather than issuing separate queries that traverse the same edges independently. Combining traversals avoids redundant pattern matching and prevents the N+1 query problem, where one initial query triggers a separate query for each result row.

**Recommended:** Single combined pattern.

```gql
MATCH (c:Customer)-[:purchases]->(o:`Order`)-[:`contains`]->(product:`Product`)
RETURN c.fullName, o, product.productName
LIMIT 1000
```

**Avoid:** Two separate queries that traverse the same `Customer → Order` edge.

```gql
-- Query 1: fetch 100 orders
MATCH (c:Customer)-[:purchases]->(o:`Order`)
RETURN c.fullName, o
LIMIT 100

-- Query 2: repeat for each returned order, substituting its key value
MATCH (o:`Order` WHERE o.SalesOrderDetailID_K = 12345)-[:`contains`]->(product:`Product`)
RETURN o, product.productName
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
