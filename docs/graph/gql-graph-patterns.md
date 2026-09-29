---
title: GQL Graph Patterns for graph in Microsoft Fabric
description: Learn about GQL graph pattern syntax for matching nodes, edges, and paths in graph queries. Includes examples and pattern composition rules.
ms.topic: reference
ms.date: 09/18/2026
ms.reviewer: splantikow
ai-usage: ai-assisted
---

# GQL graph patterns

Graph patterns are core building blocks of your GQL queries in graph in Microsoft Fabric. They describe the structures you're looking for in the graph using nodes and edges in an intuitive, visual way. Think of graph patterns as templates that the query engine tries to match against the actual data in your graph.

This article explains the syntax and composition rules for graph patterns in GQL.

> [!IMPORTANT]
> This article exclusively uses the [social network example graph dataset](sample-datasets.md).

## Simple element patterns

Simple element patterns help you match individual nodes and edges from your graph that fulfill specific requirements. These patterns form the foundation for more complex pattern matching.

### Simple node patterns

A node pattern specifies the labels and properties that a node must have to match:

```gql
(:Place&City { name: "New York" })
```

This pattern matches all nodes that have **both** the `Place` and `City` labels (indicated by the `&` operator) and whose `name` property equals `"New York"`. This combination of required labels and properties is called the *filler* of the node pattern.

**Key concepts:**

- **Label matching**: Use `&` to require multiple labels.
- **Property filtering**: Specify exact values that properties must match.
- **Flexible ("covariant") matching**: Matched nodes can have more labels and properties beyond the ones specified.

> [!NOTE]
> Nodes can have multiple labels, but edge types with multiple labels aren't yet supported.

### Simple edge patterns

Edge patterns are more complex than node patterns. They not only specify a filler but also connect an origin node pattern to a target node pattern. Edge patterns describe requirements on both the edge and its endpoints:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(:Person)-[:likes|knows { creationDate: ZONED_DATETIME("2010-08-31T13:16:54Z") }]->(:Comment)
```

The arrow direction `-[...]->` is important—it determines `(:Person)` as the origin node pattern and `(:Comment)` as the target node pattern. Understanding edge direction is crucial for querying your graph correctly.

**Equivalent mirrored pattern:**

You can flip the arrow and swap the node patterns to create the equivalent, mirrored edge pattern:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(:Comment)<-[:likes { creationDate: ZONED_DATETIME("2010-08-31T13:16:54Z") }]-(:Person)
```

This pattern finds the same relationships but from the opposite perspective.

### Any-directed edge patterns

When the direction of a graph edge doesn't matter for your query, you can leave it unspecified by creating an any-directed edge pattern:

<!-- GQL Pattern: Hypothetical -->
```gql
(:Song)-[:inspired]-(:Movie)
```

This pattern matches the same edges as `(:Song)-[:inspired]->(:Movie)` and `(:Movie)-[:inspired]->(:Song)` combined, regardless of which node is the origin and which is the target (this example isn't from the social network graph type).

### Graph edge pattern shortcuts

GQL provides convenient shortcuts for common edge patterns to make your queries more concise:

- `()->()` stands for `()-[]->()`  (directed edge with any label)
- `()<-()` stands for `()<-[]-()`  (directed edge in reverse with any label)  
- `()-()` stands for `()-[]-()`    (any-directed edge with any label)

These shortcuts can be useful when you care about connectivity but not about the specific graph edge type.

### Label expressions

Patterns can express complex requirements on the labels of matched nodes and edges.

**Example:**

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
MATCH (:Person|(Organization&!Company))-[:isLocatedIn]->(p:City|Country)
RETURN count(*) AS num_matches
```

This counts the number of `isLocatedIn` edges connecting `Person` nodes or `Organization`-but-not-`Company` nodes (which are always `University` nodes in the social network schema) to `City` or `Country` nodes.

**Syntax:**

| Syntax                | Meaning                                        |
|-----------------------|------------------------------------------------|
| `A&B`                 | Labels need to include both A and B.           |
| `A\|B`                | Labels need to include at least one of A or B. |
| `!A`                  | Labels need to exclude A.                      |

Additionally, use parenthesis to control the order of label expression evaluation. By default, `!` has the highest precedence and `&` has higher precedence than `|`. Therefore `!A&B|C|!D` is the same as `((!A)&B)|C|(!D)`.

## Binding variables

Variables allow you to refer to matched graph elements in other parts of your query. Understanding how to bind and use variables is essential for building powerful queries.

### Binding element variables

Both node and edge patterns can bind matched nodes and edges to variables for later reference.

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(p:Person)-[w:workAt]->(c:Company)
```

In this pattern, `p` is bound to matching `Person` nodes, `w` to matching `workAt` edges, and `c` to matching `Company` nodes.

**Variable reuse for structural constraints:**

Reusing the same variable in a pattern multiple times expresses a restriction on the structure of matches. Every occurrence of the same variable must always bind to the same graph element in a valid match. Variable reuse is powerful for expressing complex structural requirements.

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(c:Company)<-[:workAt]-(x:Person)-[:knows]-(y:Person)-[:workAt]->(c:Company)
```

The pattern finds `Person` nodes `x` and `y` that know each other and work at the same `Company`, which is bound to the variable `c`. The reuse of `c` ensures that both people work at the same company.

**Pattern predicates with element variables:**

Binding element variables enables you to specify node and edge pattern predicates. Instead of just providing a filler with exact property values like `{ name: "New York, USA" }`, a filler can specify a predicate that gets evaluated for each candidate element. The pattern only matches if the predicate evaluates to `TRUE`:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(p:Person)-[e:knows WHERE e.creationDate >= ZONED_DATETIME("2000-01-01T18:00:00Z")]-(o:Person)
```

The edge pattern finds people who knew each other since January 1, 2000, using a flexible condition rather than an exact match.

> [!NOTE]
> Edge pattern variables always bind to the individual edge in the edge pattern predicate, even when using variable-length patterns.
> This can help with not having to unnest edge group list variables to perform a post-filter.
> See [Bind variable-length pattern edge variables](gql-graph-patterns.md#bind-variable-length-pattern-edge-variables).

**Advanced pattern predicate techniques:**

Pattern predicates provide powerful inline filtering capabilities that can improve query readability:

```gql
-- Multiple conditions in node predicates
MATCH (p:Person WHERE p.birthday < 19900101 AND p.gender = 'female')
      -[:workAt]->
      (c:Company WHERE c.name STARTS WITH 'A')

-- Filter on an edge property
MATCH (p1:Person)-[w:workAt WHERE w.workFrom >= 2010]->(c:Company)

-- MATCH WHERE: evaluated after pattern matching
MATCH (p:Person)-[:workAt]->(c:Company)
WHERE p.browserUsed = 'Firefox' AND c.name IS NOT NULL

-- Filter during matching and after
MATCH (p:Person WHERE p.gender = 'male')-[:workAt]->(c:Company)
WHERE p.birthday < 19900101 AND c.url IS NOT NULL
```

> [!TIP]
> Keep a predicate inside the pattern when it describes which node or edge can participate in the match.

### Binding path variables

You can also bind a matched path to a path variable for further processing or to return the complete path structure to the user:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
p=(c:Company)<-[:workAt]-(x:Person)-[:knows]-(y:Person)-[:workAt]->(c:Company)
```

Here, `p` is bound to a path value representing the complete matched path structure, including reference values for all nodes and edges in the order given.

Bound paths can either be returned to the user or further processed using functions like `NODES` or `EDGES`:

<!-- GQL Query: Checked 2025-11-13 -->
```gql
MATCH p=(c:Company)<-[:workAt]-(x:Person)-[:knows]-(y:Person)-[:workAt]->(c:Company)
LET path_edges = edges(p)
RETURN path_edges, size(path_edges) AS num_edges
GROUP BY path_edges
```

## Compose patterns

Real-world queries often require more complex patterns than simple node-edge-node structures. GQL provides several ways to compose patterns for sophisticated graph traversals.

### Compose path patterns

Path patterns can be composed by concatenating simple node and edge patterns to create longer traversals.

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(:Person)-[:knows]->(:Person)-[:workAt]->(:Company)-[:isLocatedIn]->(:Country)-[:isPartOf]->(:Continent)
```

The pattern traverses from a person through their social and professional connections to find where their colleague's company is located.

**Piecewise pattern construction:**
You can also build path patterns more incrementally, which can make complex patterns easier to read and understand:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(:Person)-[:knows]->(p:Person),
(p:Person)-[:workAt]->(c:Company),
(c:Company)-[:isLocatedIn]->(:Country)-[:isPartOf]->(:Continent)
```

This approach breaks down the same traversal into logical steps, making it easier to understand and debug.

### Compose nonlinear patterns

The resulting shape of a pattern doesn't have to be a linear path. You can match more complex structures like "star-shaped" patterns that radiate from a central node:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(p:Person),
(p)-[:studyAt]->(u:University),
(p)-[:workAt]->(c:Company),
(p)-[:likes]-(m)
```

The pattern finds a person along with their education, employment, and content preferences all at once—a comprehensive profile query.

Patterns in the same `MATCH` don't have to share a variable. Disconnected
patterns form a Cartesian product of their matches. Reuse a variable when the
patterns should bind the same graph element and only joined combinations should
remain.

### Control element reuse

GQL controls repeated nodes and edges at two levels:

- A match mode applies to the complete graph pattern, including comma-separated paths.
- A path mode applies to one path.

The default match mode is `REPEATABLE ELEMENTS`. It allows the same element binding to occur in different parts of the graph pattern, subject to the path mode of each path. You can write it explicitly:

<!-- GQL Pattern: Added 2026-09-17 -->
```gql
REPEATABLE ELEMENTS (a)-[e1:knows]->(b), (a)-[e2:knows]->(c)
```

Use `DIFFERENT EDGES` or its synonym `DIFFERENT RELATIONSHIPS` to require edge uniqueness across the complete graph pattern. This match mode also changes any `WALK` path in the pattern to `TRAIL` behavior.

<!-- GQL Pattern: Added 2026-09-17 -->
```gql
DIFFERENT EDGES (a)-[e1:knows]->(b), (a)-[e2:knows]->(c)
```

The following path modes control repeated elements within each path:

| Path mode | Element reuse |
| --------- | ------------- |
| `WALK` | Nodes and edges can repeat. |
| `TRAIL` | Edges can't repeat, but nodes can repeat. |
| `SIMPLE` | Nodes can't repeat, except that the first and last node can be the same. Edges can't repeat. |
| `ACYCLIC` | Nodes can't repeat, including the first and last node. Edges can't repeat. |

`WALK` is the default path mode. Prefix a path with another mode when you need stricter element uniqueness:

For `SIMPLE` and `ACYCLIC`, edge uniqueness follows from node uniqueness. A `SIMPLE` path can close by returning to its first node, but it still can't reuse an edge.

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
TRAIL (a)-[e1:knows]->(b)-[e2:knows]->(c)-[e3:knows]->(d)
```

The `TRAIL` pattern produces only matches in which `e1`, `e2`, and `e3` are different. Nodes can still repeat, so the path can form a cycle without reusing an edge.

### Control which paths are returned

A path search prefix controls which paths a path pattern returns. The default
`ALL` prefix returns every path that matches the path mode and pattern. You can
write `ALL` explicitly:

<!-- GQL Pattern: Added 2026-09-17 -->
```gql
ALL TRAIL (a:Person)-[:knows]->{1,4}(b:Person)
```

Use `ANY SHORTEST` to return one shortest matching path for each source-destination pair from each input row:

<!-- GQL Query: Added 2026-09-17 -->
```gql
MATCH p = ANY SHORTEST
  (src:Person)-[:knows]->{1,4}(dst:Person)
RETURN src.id AS sourceId, dst.id AS targetId, path_length(p) AS hopCount
ORDER BY sourceId, targetId
LIMIT 100
```

If multiple paths tie for the shortest length, the query returns one of them, but which tied path is returned isn't deterministic. A lower bound of zero can return a zero-hop path from a source node to itself.

`ALL SHORTEST` and `ANY` path searches aren't supported.

#### Place predicates before or after path selection

Predicate placement determines whether a condition defines eligible paths or
filters paths after the path search prefix has selected them:

- An inline `WHERE` in a node or edge pattern is part of the pattern. It
  constrains which paths are eligible before `ALL` or `ANY SHORTEST` is applied.
- A statement-level `WHERE` after the complete `MATCH` pattern is a postfilter.
  It filters rows after the path search prefix has selected paths.
- A subsequent `FILTER` statement also filters rows after path selection.

This distinction is especially important with `ANY SHORTEST`. In the following
pattern, only `knows` edges created on or after the specified date are eligible
when the query selects a shortest path:

<!-- GQL Query: Added 2026-09-17 -->
```gql
MATCH p = ANY SHORTEST
  (src:Person WHERE src.firstName = 'Alice')
  -[connection:knows
    WHERE connection.creationDate >= ZONED_DATETIME('2020-01-01T00:00:00Z')]->{1,4}
  (dst:Person WHERE dst.firstName = 'Bob')
RETURN p
```

Moving the edge condition to a postfilter changes the meaning. The query first
selects a shortest path without that condition. It then removes the selected
path if any edge fails the condition; it doesn't select a longer path instead:

<!-- GQL Query: Added 2026-09-17 -->
```gql
MATCH p = ANY SHORTEST
  (src:Person WHERE src.firstName = 'Alice')
  -[connections:knows]->{1,4}
  (dst:Person WHERE dst.firstName = 'Bob')
FILTER ALL(connection IN connections
           WHERE connection.creationDate >= ZONED_DATETIME('2020-01-01T00:00:00Z'))
RETURN p
```

> [!IMPORTANT]
> For some `ANY SHORTEST` query shapes, Graph can currently apply a
> statement-level `MATCH ... WHERE` condition before path selection. Until this
> limitation is resolved, use inline predicates for path eligibility and a
> separate `FILTER` statement for post-selection filtering. For more
> information, see [Current limitations](limitations.md#path-predicate-placement).

## Use variable-length patterns

Variable-length patterns are powerful constructs that let you find paths of varying lengths without writing repetitive pattern specifications. They're essential for traversing hierarchies, social networks, and other structures where the optimal path length isn't known in advance.

### Bounded variable-length patterns

Many common graph queries require repeating the same edge pattern multiple times. Instead of writing verbose patterns like:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(:Person)-[:knows]->(:Person)-[:knows]->(:Person)-[:knows]->(:Person)
```

You can use the more concise variable-length syntax:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(:Person)-[:knows]->{3}(:Person)
```

The `{3}` specifies that the `-[:knows]->` edge pattern should be repeated exactly three times.

**Flexible repetition ranges:**
For more flexibility, you can specify both a lower bound and an upper bound for the repetition:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(:Person)-[:knows]->{1, 3}(:Person)
```

This pattern finds direct friends, friends-of-friends, and friends-of-friends-of-friends all in a single query.

> [!NOTE]
> The lower bound can also be zero. A zero-hop match contains no edges and requires both endpoint node patterns to match the same node.
>
> Example:
>
> ```gql
> (p1:Person)-[:knows]->{0,1}(p2:Person)
> ```
>
> This pattern matches each person as both `p1` and `p2` at zero hops, and matches connected pairs at one hop.

When no lower bound is specified in `{,n}`, it defaults to zero.

**Complex variable-length compositions:**
Variable-length patterns can be part of larger, more complex patterns as in the following query:

<!-- GQL Query: Checked 2025-11-13 -->
```gql
MATCH (c1:Comment)<-[:likes]-(p1:Person)-[:knows]-(p2:Person)-[:likes]->(c2:Comment),
      (c1:Comment)<-[:replyOf]-{1,3}(m)-[:replyOf]->{1,3}(c2:Comment)
RETURN *
LIMIT 100
```

The pattern finds pairs of comments where people who know each other liked different comments and a message `m` is connected to each comment by a chain of one to three `replyOf` edges.

### Bind variable-length pattern edge variables

When you bind a variable-length edge pattern, the value and type of the edge variable change depending on the reference context.
Understanding this behavior is crucial for correctly processing variable-length matches:

**Two degrees of reference:**

- **Inside a variable-length pattern**: Graph edge variables bind to each individual edge along the matched path (also called "singleton degree of reference")
- **Outside a variable-length pattern**: Graph edge variables bind to the sequence of all edges along the matched path (also called "group degree of reference")

**Example demonstrating both contexts:**
  
<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
MATCH (:Person)-[e:knows WHERE e.creationDate >= ZONED_DATETIME("2000-01-01T00:00:00Z")]->{1,3}()
RETURN e[0]
LIMIT 100
```

The evaluation of the edge variable `e` occurs in two contexts:

- **In the `MATCH` statement**: The query finds chains of friends-of-friends-of-friends where each friendship was established since the year 2000. During pattern matching, the edge pattern predicate `e.creationDate >= ZONED_DATETIME("2000-01-01T00:00:00Z")` is evaluated once for each candidate edge. In this context, `e` is bound to a single edge reference value.

- **In the `RETURN` statement**: Here, `e` is bound to a (group) list of edge reference values in the order they occur in the matched chain. The result of `e[0]` is the first edge reference value in each matched chain.

**Variable-length pattern edge variables in horizontal aggregation:**

Edge variables bound by variable length pattern matching are group lists outside the variable-length pattern and thus can be used in horizontal aggregation.

<!-- GQL Query: Checked 2025-11-13 -->
```gql
MATCH (a:Person)-[e:knows WHERE e.creationDate >= ZONED_DATETIME("2000-01-01T00:00:00Z")]->{1,3}(b)
RETURN a, b, size(e) AS num_edges
LIMIT 100
```

For more information, see [Aggregate
functions](gql-expressions.md#aggregate-functions).

### Unbounded variable-length patterns

Use an unbounded quantifier when the maximum path length isn't known:

<!-- GQL Pattern: Added 2026-09-17 -->
```gql
-- Two or more edges
TRAIL (:Person)-[:knows]->{2,}(:Person)
```

The `*` and `+` shortcuts specify zero-or-more and one-or-more repetitions:

<!-- GQL Pattern: Added 2026-09-17 -->
```gql
-- Zero or more edges
ACYCLIC (:Person)-[:knows]->*(:Person)

-- One or more edges
SIMPLE (:Person)-[:knows]->+(:Person)
```

An unbounded pattern with the default `ALL WALK` combination is rejected because cycles can produce infinitely many matching paths. Use `TRAIL`, `SIMPLE`, or `ACYCLIC` to bound the path through edge or node uniqueness. These modes guarantee termination, but a large graph can still produce a large number of paths.

> [!IMPORTANT]
> For a path bound by an unbounded `ANY SHORTEST WALK`, the only supported uses are `PATH_LENGTH(path)` and, alongside it, `path IS NULL`. Graph doesn't materialize the complete path in this form. Use a finite upper bound or specify `TRAIL`, `SIMPLE`, or `ACYCLIC` to return or otherwise use the path.

## Related content

- [GQL language guide](gql-language-guide.md)
- [Write graph pattern queries](write-graph-pattern-queries.md)
- [GQL expressions, predicates, and functions](gql-expressions.md)
- [Current limitations](limitations.md)
