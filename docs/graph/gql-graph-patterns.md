---
title: GQL Graph Patterns
description: Complete reference for graph pattern syntax in GQL for graph in Microsoft Fabric.
ms.topic: reference
ms.date: 09/15/2025
author: spmsft
ms.author: splantikow
ms.reviewer: eur
---

# GQL graph patterns

Graph patterns are fundamental components of GQL queries that provide the visual syntax to describe the structures you're looking for in your graph. While the `MATCH` statement uses these patterns to find data, understanding graph patterns themselves is essential for writing effective queries.

## MATCH statement

**Syntax:**

```gql
MATCH <graph pattern>, <graph pattern>, ... [ WHERE <predicate> ]
```

**Description:**

Use the `MATCH` statement to find matches for your graph pattern in the graph. The `MATCH` statement usually starts most queries because it identifies the data you want to use.

Each match creates a row with columns for each path, node, or edge variable bound by the graph pattern. `MATCH` lets you describe complex graph structures using intuitive visual patterns.

**How matching works:**

- If columns from a previous statement overlap with columns from matched nodes and edges, they're joined automatically using equality.
- Input rows without matching graph patterns are discarded (like an inner join in SQL).
- If you use a predicate, only rows where the predicate evaluates to `TRUE` are kept.

> [!IMPORTANT]
> The following restrictions currently apply to `MATCH` statement graph patterns:
>
> - If this `MATCH` statement isn't the first linear query statement, at least one input variable must join with at least one graph pattern variable.
> - If you specify multiple graph patterns, all graph patterns must have one variable in common.

## Work with graph patterns

Graph patterns are the core building blocks of your GQL queries. They describe the structure you're looking for in the graph using nodes and edges in an intuitive, visual way. Think of graph patterns as templates that the query engine tries to match against the actual data in your graph.

### Simple element patterns

Simple element patterns help you match individual nodes and edges from your graph that fulfill specific requirements. These form the foundation for more complex pattern matching.

#### Simple node patterns

A node pattern specifies the labels and properties that a node must have to match:

```gql
(:Place&City { name: "New York, USA" })
```

This matches all nodes that have **both** the `Place` and `City` labels (indicated by the `&` operator) and whose `name` property equals `"New York, USA"`. This specification of required labels and properties is called the *filler* of the node pattern.

**Key concepts:**

- **Label matching**: Use `&` to require multiple labels.
- **Property filtering**: Specify exact values that properties must match.
- **Flexible ("covariant") matching**: Matched nodes can have more labels and properties beyond those specified.

#### Simple edge patterns

Graph edge patterns are more complex than node patterns because they not only specify a filler but also connect a source node pattern to a destination node pattern. This describes requirements on both the edge and its endpoints:

```gql
(:Person)-[:likes { creationDate: ZONED_DATETIME("2000-01-01T18:00:00Z") }]->(:Comment)
```

The arrow direction `-[...]->` is important—it determines `(:Person)` as the source node pattern and `(:Comment)` as the destination node pattern. Understanding edge direction is crucial for querying your graph correctly.

**Equivalent mirrored pattern:**

You can flip the arrow and swap the node patterns to create the equivalent, mirrored edge pattern:

```gql
(:Comment)<-[:likes { creationDate: ZONED_DATETIME("2000-01-01T18:00:00Z") }]-(:Person)
```

This pattern finds the same relationships but from the opposite perspective.

#### Any-directed edge patterns

When the direction of a graph edge doesn't matter for your query, you can leave it unspecified by creating an any-directed edge pattern:

```gql
(:Song)-[:inspired]-(:Movie)
```

This pattern matches the same edges as `(:Song)-[:inspired]->(:Movie)` and `(:Movie)-[:inspired]->(:Song)` combined, regardless of which node is the source and which is the destination (this example isn't from the social network graph type).

#### Graph edge pattern shortcuts

GQL provides convenient shortcuts for common edge patterns to make your queries more concise:

- `()->()` stands for `()-[]->()`  (directed edge with any label)
- `()<-()` stands for `()<-[]-()`  (directed edge in reverse with any label)  
- `()-()` stands for `()-[]-()`    (any-directed edge with any label)

These shortcuts can be useful when you care about connectivity but not about the specific graph edge type.

### Label expressions

Patterns can express complex requirements on the labels of matched nodes and edges.

**Example:**

```gql
MATCH (:Person|!Company)-[:isLocatedIn]->(p:City|Country)
RETURN count(*)
```

This counts the number of `isLocatedIn` edges connecting `Person` nodes or not-`Company` nodes (`University` nodes in the social network schema) to `City` or `Country` nodes.

**Syntax:**

| Syntax    | Meaning                                        |
|-----------|------------------------------------------------|
| `A&B`     | Labels need to include both A and B.           |
| `A\|B`    | Labels need to include at least one of A or B. |
| `!A`      | Labels need to exclude A.                      |

Additionally, use parenthesis to control the order of label expression evaluation. By default, `!` has the highest precedence and `&` has higher precedence than `|`. Therefore `!A&B|C|!D` is the same as `((!A)&B)|C|(!D)`.

### Binding variables

Variables allow you to refer to matched graph elements in other parts of your query. Understanding how to bind and use variables is essential for building powerful queries.

#### Binding element variables

Both node and edge patterns can bind matched nodes and edges to variables for later reference.

```gql
(p:Person)-[w:workAt]->(c:Company)
```

In this pattern, `p` is bound to matching `Person` nodes, `w` to matching `workAt` edges, and `c` to matching `Company` nodes.

**Variable reuse for structural constraints:**

Re-using the same variable in a pattern multiple times expresses a restriction on the structure of matches. Every occurrence of the same variable must always bind to the same graph element in a valid match. This is powerful for expressing complex structural requirements.

```gql
(c:Company)<-[:workAt]-(x:Person)-[:knows]-(y:Person)-[:workAt]->(c:Company)
```

This pattern finds `Person` nodes `x` and `y` that know each other and work at the same `Company`, which is bound to the variable `c`. The reuse of `c` ensures that both people work at the same company.

**Pattern predicates with element variables:**

Binding element variables enables you to specify node and edge pattern predicates. Instead of just providing a filler with exact property values like `{ name: "New York, USA" }`, a filler can specify a predicate that gets evaluated for each candidate element. The pattern only matches if the predicate evaluates to `TRUE`:

```gql
(p:Person)-[e:knows WHERE e.creationDate >= ZONED_DATETIME("2000-01-01T18:00:00Z")]-(o:Person)
```

This finds people who have known each other since January 1, 2000, using a flexible condition rather than an exact match.

**Advanced pattern predicate techniques:**

Pattern predicates provide powerful inline filtering capabilities that can improve query performance and readability:

```gql
-- Multiple conditions in node predicates
MATCH (p:Person WHERE p.age > 30 AND p.department = 'Engineering')
      -[:workAt]->
      (c:Company WHERE c.revenue > 1000000 AND c.location = 'Seattle')

-- Complex edge predicates with calculations
MATCH (p1:Person)-[w:workAt WHERE w.start_date < ZONED_DATETIME('2020-01-01T00:00:00Z') 
                                AND w.salary > 75000]-(c:Company)

-- Predicate with subqueries (if supported)
MATCH (p:Person WHERE p.followers > (SELECT avg(followers) FROM Person))
      -[:posts]->
      (m:Message WHERE m.likes > 100)

-- Combining exact values and predicates
MATCH (p:Person { role: 'Manager' } WHERE p.team_size > 5)
      -[:manages]->
      (e:Person WHERE e.performance_rating > 3.5)
```

**Pattern predicates vs statement WHERE clauses:**

Understanding when to use pattern predicates versus statement-level WHERE clauses affects both performance and readability:

```gql
-- Pattern predicates: evaluated during pattern matching (potentially more efficient)
MATCH (p:Person WHERE p.active = TRUE)-[:workAt]->(c:Company WHERE c.public = TRUE)

-- Statement WHERE: evaluated after pattern matching
MATCH (p:Person)-[:workAt]->(c:Company)
WHERE p.active = TRUE AND c.public = TRUE

-- Hybrid approach: filter during matching and after
MATCH (p:Person WHERE p.department = 'Sales')-[:workAt]->(c:Company)
WHERE p.quota_achievement > 1.2 AND c.revenue > c.revenue_target
```

Choose pattern predicates when the conditions are highly selective and can reduce the intermediate result set size.

#### Binding path variables

You can also bind a matched path to a path variable for further processing or to return the complete path structure to the user:

```gql
p=(c:Company)<-[:workAt]-(x:Person)-[:knows]-(y:Person)-[:workAt]->(c:Company)
```

Here, `p` is bound to a path value representing the complete matched path structure, including reference values for all nodes and edges in the order given.

### Compose patterns

Real-world queries often require more complex patterns than simple node-edge-node structures. GQL provides several ways to compose patterns for sophisticated graph traversals.

#### Compose path patterns

Path patterns can be composed by concatenating simple node and edge patterns to create longer traversals.

```gql
(:Person)-[:knows]->(:Person)-[:workAt]->(:Company)-[:locatedIn]->(:City)-[:isPartOf]->(:Country)
```

This pattern traverses from a person through their social and professional connections to find the country/region where their colleague's company is located.

**Piecewise pattern construction:**
You can also build path patterns more incrementally, which can make complex patterns easier to read and understand:

```gql
(:Person)-[:knows]->(p:Person),
(p:Person)-[:workAt]->(c:Company),
(c:Company)-[:locatedIn]->(:City)-[:isPartOf]->(:Country)
```

This approach breaks down the same traversal into logical steps, making it easier to understand and debug.

#### Compose non-linear patterns

The resulting shape of a pattern doesn't have to be a linear path. You can match more complex structures like "star-shaped" patterns that radiate from a central node:

```gql
(p:Person),
(p)-[:studyAt]->(u:University),
(p)-[:workAt]->(c:Company),
(p)-[:likes]-(m:Message)
```

This pattern finds a person along with their education, employment, and content preferences all at once—a comprehensive profile query.

#### Match trails

In complex patterns, it's often undesirable to traverse the same edge multiple times. This becomes important when the actual graph contains cycles that could lead to infinite or overly long paths. To handle this, graph in Microsoft Fabric supports the `TRAIL` match mode. 

Prefixing a path pattern with the keyword `TRAIL` discards all matches that bind the same edge multiple times:

```gql
MATCH TRAIL (a)-[e1:knows]->(b)-[e2:knows]->(c)-[e3:knows]->(d)
```

By using `TRAIL`, this only produces matches in which all edges are different. Therefore, even if `c = a` such that the path forms a cycle in a given match , `e3` will never bind to the same edge as `e1`.

This is essential for preventing infinite loops and ensuring that your queries return meaningful, non-redundant paths.

### Use variable-length patterns

Variable-length patterns are powerful constructs that let you find paths of varying lengths without writing repetitive pattern specifications. They're essential for traversing hierarchies, social networks, and other structures where the optimal path length isn't known in advance.

#### Bounded variable-length patterns

Many common graph queries require repeating the same edge pattern multiple times. Instead of writing verbose patterns like:

```gql
(:Person)-[:knows]->(:Person)-[:knows]->(:Person)-[:knows]->(:Person)
```

You can use the more concise variable-length syntax:

```gql
(:Person)-[:knows]->{3}(:Person)
```

The `{3}` specifies that the `-[:knows]->` edge pattern should be repeated exactly three times.

**Flexible repetition ranges:**
For more flexibility, you can specify both a lower bound and an upper bound for the repetition:

```gql
(:Person)-[:knows]->{1, 3}(:Person)
```

This pattern finds direct friends, friends-of-friends, and friends-of-friends-of-friends all in a single query.

**Complex variable-length compositions:**
Variable-length patterns can be part of larger, more complex patterns:

```gql
(c1:Comment)<-[:likes]-(p1:Person)-[:knows]-(p2:Person)-[:likes]->(c2:Comment),
(c1:Comment)-[:replyOf]-{1,5}(m:Message)<-[:replyOf]->{1,5}(c2:Comment)
```

This finds pairs of comments where people who know each other liked different comments, and those comments are connected through reply chains of 1-5 levels each.

#### Bind variable-length pattern edge variables

When you bind a variable-length edge pattern, the value and type of the edge variable change depending on the reference context. Understanding this behavior is crucial for correctly processing variable-length matches:

**Two degrees of reference:**

- **Inside a variable-length edge pattern**: Graph edge variables bind to each individual edge along the matched path (singleton degree of reference)
- **Outside a variable-length pattern**: Graph edge variables bind to the sequence of all edges along the matched path (group degree of reference)

**Example demonstrating both contexts:**
  
```gql
MATCH (:Person)-[e:knows WHERE e.creationDate >= ZONED_DATETIME("2000-01-01T00:00:00Z")]->{3}()
RETURN e[0]
```

The evaluation of the edge variable `e` occurs in two contexts:

- **In the `MATCH` statement**: The query finds chains of friends-of-friends-of-friends where each friendship was established since the year 2000. During pattern matching, the edge pattern predicate `e.creationDate >= ZONED_DATETIME("2000-01-01T00:00:00Z")` is evaluated once for each candidate edge. In this context, `e` is bound to a single edge reference value.

- **In the `RETURN` statement**: Here `e` is bound to a (group) list of edge reference values in the order they occur in the matched chain. The result of `e[0]` is the first edge reference value in each matched chain.

#### Unbounded variable-length patterns

You can also match arbitrarily long chains of edge patterns by specifying no upper bound. This creates an unbounded variable-length pattern, useful for traversing hierarchies or networks of unknown depth:

```gql
// 2 or more
TRAIL (:Person)-[:knows]->{2,}(:Person)
```

**Alternative syntax:**

You can also specify one of the following two shorthands:

```gql
// 0, 1, or more
TRAIL (:Person)-[:knows]->*(:Person)

// 1 or more
TRAIL (:Person)-[:knows]->+(:Person)
```

Both forms are equivalent and match chains of at least 2 `knows` relationships.

> [!IMPORTANT]
> The set of matches for unbounded variable-length patterns can be infinite due to the presence of cycles in the graph. Therefore, unbounded variable-length patterns must always be used with the `TRAIL` match mode to ensure termination and avoid infinite results.

## Related content

- [GQL language guide](gql-language-guide.md)
- [Social network schema example](gql-schema-example.md)
- [GQL graph types](gql-graph-types.md)
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)