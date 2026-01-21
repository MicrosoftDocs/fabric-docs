---
title: GQL Graph Patterns
description: Complete reference for graph pattern syntax in GQL for graph in Microsoft Fabric.
ms.topic: reference
ms.date: 11/18/2025
author: lorihollasch
ms.author: loriwhip
ms.reviewer: splantikow
---

# GQL graph patterns

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Graph patterns are core building blocks of your GQL queries. They describe the structures you're looking for in the graph using nodes and edges in an intuitive, visual way. Think of graph patterns as templates that the query engine tries to match against the actual data in your graph.

> [!IMPORTANT]
> This article exclusively uses the [social network example graph dataset](sample-datasets.md).

## Simple element patterns

Simple element patterns help you match individual nodes and edges from your graph that fulfill specific requirements. These patterns form the foundation for more complex pattern matching.

### Simple node patterns

A node pattern specifies the labels and properties that a node must have to match:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(:City { name: "New York" })
```

This pattern matches all nodes that have **both** the `Place` and `City` labels (indicated by the `&` operator) and whose `name` property equals `"New York"`. This specification of required labels and properties is called the *filler* of the node pattern.

**Key concepts:**

- **Label matching**: Use `&` to require multiple labels.
- **Property filtering**: Specify exact values that properties must match.
- **Flexible ("covariant") matching**: Matched nodes can have more labels and properties beyond the ones specified.

> [!NOTE]
> Graph models with multiple element labels are not yet supported (known issue).

### Simple edge patterns

Edge patterns are more complex than node patterns. They not only specify a filler but also connect a source node pattern to a destination node pattern. Edge patterns describe requirements on both the edge and its endpoints:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
(:Person)-[:likes|knows { creationDate: ZONED_DATETIME("2010-08-31T13:16:54Z") }]->(:Comment)
```

The arrow direction `-[...]->` is important—it determines `(:Person)` as the source node pattern and `(:Comment)` as the destination node pattern. Understanding edge direction is crucial for querying your graph correctly.

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

This pattern matches the same edges as `(:Song)-[:inspired]->(:Movie)` and `(:Movie)-[:inspired]->(:Song)` combined, regardless of which node is the source and which is the destination (this example isn't from the social network graph type).

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
| <code>A&B</code>      | Labels need to include both A and B.           |
| <code>A&#124;B</code> | Labels need to include at least one of A or B. |
| <code>!A</code>       | Labels need to exclude A.                      |

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
MATCH (p:Person WHERE p.age > 30 AND p.department = 'Engineering')
      -[:workAt]->
      (c:Company WHERE c.revenue > 1000000 AND c.location = 'Seattle')

-- Complex edge predicates with calculations
MATCH (p1:Person)-[w:workAt WHERE w.start_date < ZONED_DATETIME('2020-01-01T00:00:00Z') 
                              AND w.salary > 75000]-(c:Company)

-- MATCH WHERE: evaluated after pattern matching
MATCH (p:Person)-[:workAt]->(c:Company)
WHERE p.active = TRUE AND c.public = TRUE

-- Filter during matching and after
MATCH (p:Person WHERE p.department = 'Sales')-[:workAt]->(c:Company)
WHERE p.quota_achievement > 1.2 AND c.revenue > c.revenue_target
```

> [!TIP]
> Using pattern predicates when the conditions are highly selective can reduce the size of intermediary results.

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

### Match trails

In complex patterns, it's often undesirable to traverse the same edge multiple times. Edge reuse becomes important when the actual graph contains cycles that could lead to infinite or overly long paths. To handle edge reuse, graph in Microsoft Fabric supports the `TRAIL` match mode. 

Prefixing a path pattern with the keyword `TRAIL` discards all matches that bind the same edge multiple times:

<!-- GQL Pattern: Checked 2025-11-13 -->
```gql
TRAIL (a)-[e1:knows]->(b)-[e2:knows]->(c)-[e3:knows]->(d)
```

By using `TRAIL`, the pattern only produces matches in which all edges are different. Therefore, even if `c = a` such that the path forms a cycle in a given match, `e3` never binds to the same edge as `e1`.

The `TRAIL` mode is essential for preventing infinite loops and ensuring that your queries return meaningful, nonredundant paths.

## Use variable-length patterns

Variable-length patterns are powerful constructs that let you find paths of varying lengths without writing repetitive pattern specifications. They're essential for traversing hierarchies, social networks, and other structures where the optimal path length isn't known in advance.

### Bounded variable-length patterns

> [!IMPORTANT]
>
> Bounded variable-length patterns currently only support a maximum upper bound of 8.
> See the article on current [limitations](limitations.md).

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
> The lower bound can also be `0`. In this case, no edges are matched and the whole pattern only matches
> if and only if the two endpoint node patterns match the same node.
>
> Example:
>
> ```gql
> (p1:Person)-[r:knows WHERE NOT p1=p2]->{0,1}(p2:Person)
> ```
>
> This pattern matches pairs of different persons that know each other *but also*
> matches the same person as both `p1` and `p2` - even if that person doesn't "know" themselves.

When no lower bound is specified, it generally defaults to 0 (zero).
<!-- but with the exception that
when unbounded variable-length patterns with `+`-repetition are used, it defaults to 1 (one) instead -->

**Complex variable-length compositions:**
Variable-length patterns can be part of larger, more complex patterns as in the following query:

<!-- GQL Query: Checked 2025-11-13 -->
```gql
MATCH (c1:Comment)<-[:likes]-(p1:Person)-[:knows]-(p2:Person)-[:likes]->(c2:Comment),
      (c1:Comment)<-[:replyOf]-{1,3}(m)-[:replyOf]->{1,3}(c2:Comment)
RETURN *
LIMIT 100
```

The pattern finds pairs of comments where people who know each other liked different comments, and those comments are connected through reply chains of 1-5 levels each.

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

See the section on [horizontal aggregation](gql-language-guide.md#horizontal-aggregation-with-group-list-variables) for further details.

<!-- Commented out intentionally

### Unbounded variable-length patterns

You can also match arbitrarily long chains of edge patterns by specifying no upper bound. Unbounded patterns create an unbounded variable-length pattern, useful for traversing hierarchies or networks of unknown depth:

```gql
// 2 or more
TRAIL (:Person)-[:knows]->{2,}(:Person)
```

**Alternative syntax:**

You can also specify one of the following two shortcuts:

```gql
// 0, 1, or more (default lower bound is 0)
TRAIL (:Person)-[:knows]->*(:Person)

// 1 or more (default lower bound is 1)
TRAIL (:Person)-[:knows]->+(:Person)
```

Both forms are equivalent and match chains of at least 2 `knows` relationships.

> [!IMPORTANT]
> The set of matches for unbounded variable-length patterns can be infinite due to the presence of cycles in
> the graph. Therefore, unbounded variable-length patterns must always be used with the `TRAIL` match mode 
> to ensure termination and avoid infinite results.

-->

## Related content

- [GQL language guide](gql-language-guide.md)
- [Social network schema example](gql-schema-example.md)
- [GQL graph types](gql-graph-types.md)
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
