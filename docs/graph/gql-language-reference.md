---
title: GQL Language Reference
description: Complete reference for GQL language support in graph in Microsoft Fabric, including syntax, data types, query patterns, and graph modeling concepts.
ms.topic: reference
ms.date: 09/15/2025
author: spmsft
ms.author: splantikow
ms.reviewer: eur
---

# GQL language reference

GQL (Graph Query Language) is the ISO-standardized query language for graph databases. It helps you query and work with graph data efficiently. The same international working group that oversees SQL develops GQL, so you see familiar syntax if you already know SQL. This article explains how GQL works in graph in Microsoft Fabric, including syntax, data types, query patterns, and practical examples.

> [!NOTE]
> The official international standard for GQL is [ISO/IEC 39075 Information Technology - Database Languages - GQL](https://www.iso.org/standard/76120.html).

## GQL fundamentals

If you're new to GQL, learn these essential concepts:

- **Graphs** have nodes and edges with labels and properties that represent your data.
- **Graph types** set what nodes and edges can exist in your graph, like a schema.
- **Constraints** limit the set of valid graphs of a graph type to keep data accurate.
- **Queries** use statements like `MATCH`, `FILTER`, and `RETURN` to show results in a table.
- **Patterns** describe the graph structures you want to find using visual syntax.
- **Expressions** describe value computations performed by queries, like SQL expressions.
- **Predicates** are expressions that return a true or false value for filters and conditions.
- **Value types** set the values stored in properties and computed by expressions.

Here's a basic query that demonstrates GQL's pattern-matching approach:

```gql
MATCH (person:Person)-[:knows]-(friend:Person)
WHERE person.age > 25 AND friend.age > 25
RETURN person.name, friend.name
```

This query matches friends (`Person` nodes that `know` each other) who are both older than 25, and returns the names of each pair found in the graph. The pattern `(person:Person)-[:knows]-(friend:Person)` visually shows the relationship structure you're looking for.

## Graph fundamentals

In GQL, you use labeled property graphs. A graph has nodes and edges, which are called graph elements. Learning these building blocks helps you model and query graphs effectively.

### Nodes and edges represent your domain

Nodes usually model the entities (the "nouns") in your system, like people, organizations, posts, or comments on a social media site. They are things that exist independently in your domain.

Graph edges model relationships between entities (the "verbs"), like which people know each other, which organization is in which country or region, or who commented on which post. They show how your entities connect and interact.

Every graph element has these characteristics:

- An **internal ID** (a unique identifier) that distinguishes it from other graph elements.
- **One or more labels**—character strings like `Person` or `knows`. Graph edges need one label, and nodes need one but can have more labels.
- **Multiple properties**—name-value pairs like `service: "Fabric Graph"` that store the data attributes of your nodes and edges. Property names are sometimes called property keys.

Each node in a graph in Microsoft Fabric has a node key constraint. This constraint sets a unique key value that identifies the node by its properties.

### Understanding graph structure

Each edge connects two endpoints: a source node and a destination node, both identified by their internal ID. This creates your graph's structure. The direction of an edge matters—a `Person` who `follows` another `Person` makes a directed relationship.

GQL graphs are always well formed, so they don't have dangling edges. If you see an edge in a graph, you also find both its source and destination nodes.

The structure of a graph is set by its [graph type](#graph-types--schema), which works like a schema definition.

## Example: Social network domain

This documentation uses a social network graph to illustrate GQL concepts.

The social network domain demonstrates many common features of complex graphs:

- **Node hierarchies** with shared properties (like different types of organizations and places).
- **Relationship diversity** from simple friendships to complex content interactions.
- **Real-world complexity** that you encounter in actual graph database use-cases.

The example social network domain includes:

- **People** with properties like names, ages, birthdates, and locations.
- **Organizations** including universities and companies with their own properties. 
- **Places** organized hierarchically: cities, countries/regions, and continents.
- **Content** such as posts, comments, and forums for discussions.
- **Tags** for categorizing content and interests.
- **Relationships** like friendships, employment, education, content creation, and user interactions.

Here's a visual overview of the example social network structure. The dotted edges show inheritance via label implication, the plain edges show edge types, and the bold edges show edge type families.

:::image type="content" source="./media/schema.png" alt-text="Diagram of the example social network structure." lightbox="./media/schema.png":::

Notable features of this graph are:

- **Inheritance hierarchies** for places (City → Country → Continent) and organizations (University, Company → Organization)
- **Abstract types** for Message and Organization to define shared properties
- **Graph edge families** for relationships like `isPartOf` and `likes` that connect different types of nodes
- **Comprehensive constraints** to ensure data integrity

Here is the complete technical specification of this graph type:

```gql
(:TagClass => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

CONSTRAINT tag_class_pk
FOR (n:TagClass) REQUIRE (n.id) IS PRIMARY KEY,

(:TagClass)-[:isSubclassOf]->(:TagClass),

(:Tag => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

(:Tag)-[:hasType]->(:TagClass),

CONSTRAINT tag_pk
FOR (n:Tag) REQUIRE (n.id) IS PRIMARY KEY,

ABSTRACT
(:Place => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

(:City => :Place),
(:Country => :Place),
(:Continent => :Place),

CONSTRAINT place_pk
FOR (n:Place) REQUIRE (n.id) IS PRIMARY KEY,

(:City)-[:isPartOf]->(:Country),
(:Country)-[:isPartOf]->(:Continent),

ABSTRACT
(:Organisation => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

(:University => :Organisation),
(:Company => :Organisation),

CONSTRAINT organisation_pk
FOR (n:Organisation) REQUIRE (n.id) IS KEY,

(:University)-[:isLocatedIn]->(:City),
(:Company)-[:isLocatedIn]->(:Country),

(:Person => {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    firstName :: STRING,
    lastName :: STRING,
    gender :: STRING,
    birthday :: UINT64,
    browserUsed :: STRING,
    locationIP :: STRING
}),

CONSTRAINT person_pk
FOR (n:Person) REQUIRE (n.id) IS PRIMARY KEY,

(:Person)-[:hasInterest]->(:Tag),
(:Person)-[:isLocatedIn]->(:City),
(:Person)-[:studyAt { classYear :: UINT64 }]->(:University),
(:Person)-[:workAt { workFrom :: UINT64 }]->(:Company),
(:Person)-[:knows { creationDate :: ZONED DATETIME }]->(:Person),

(:Forum => {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    title :: STRING
}),

CONSTRAINT forum_pk
FOR (n:Forum) REQUIRE (n.id) IS PRIMARY KEY,

(:Forum)-[:hasTag]->(:Tag),
(:Forum)-[:hasMember { creationDate :: ZONED DATETIME, joinDate :: UINT64 }]->(:Person),
(:Forum)-[:hasModerator]->(:Person),

ABSTRACT (:Message => {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    browserUsed :: STRING,
    locationIP :: STRING,
    content :: STRING,
    length :: UINT64
}),

CONSTRAINT message_pk
FOR (n:Message) REQUIRE (n.id) IS PRIMARY KEY,

(:Post => :Message += {
    language :: STRING,
    imageFile :: STRING
}),

(:Person)-[:likes { creationDate :: ZONED DATETIME }]->(:Post),
(:Post)-[:hasCreator]->(:Person),
(:Post)-[:isLocatedIn]->(:Country),
(:Forum)-[:containerOf]->(:Post),

(:Comment => :Message),

(:Person)-[:likes { creationDate :: ZONED DATETIME }]->(:Comment),
(:Comment)-[:hasCreator]->(:Person),
(:Comment)-[:isLocatedIn]->(:Country),

(:Comment)-[:replyOf]->(<:Message),
(:Person)-[:likes { creationDate :: ZONED DATETIME }]->(<:Message),
(<:Message)-[:hasCreator]->(:Person),
(<:Message)-[:isLocatedIn]->(:Country),
(<:Message)-[:hasTag]->(:Tag)
```

## Write queries with GQL

GQL gives you powerful, intuitive tools for querying graph data. Write queries to find patterns, traverse relationships, and transform results. The language is expressive and readable, so complex graph operations are accessible.

### Basic query structure

A GQL query in Fabric Graph is a linear query—a sequence of statements like `MATCH`, `LET`, `FILTER`, `ORDER BY`, `OFFSET`, `LIMIT`, and `RETURN`. Most queries start with the `MATCH` statement to find patterns in the graph. The `RETURN` statement must be last and determines what data you get back.

> [!TIP]
> GQL supports C-style `//` line comments, SQL-style `--` line comments, and C-style `/* */` block comments.

**Example:**

```gql
MATCH (n:Person)-[:knows]-(m:Person)
WHERE n.age = m.age
RETURN count(*) AS num_same_age_friends
```

Here's how this query works step by step:

1. **`MATCH`** finds all pairs of `Person` nodes that know each other and have the same age. Each match creates one row with `n` and `m` columns containing the matching nodes.
1. **`RETURN`** counts the rows from step 1 and outputs a single row with the count in the `num_same_age_friends` column.

Write more complex queries using multiple statements, advanced graph patterns, expressions, and predicates to handle sophisticated analytical needs.

#### Linear statement composition

Statements in linear queries are composed and executed in the order you write them. Each statement transforms the input table from the previous statement into an output table for the next statement or returns it. The first statement conceptually starts with a unit table—a table with one row and no columns.

Linear statement composition follows a core design principle in GQL: reading order matches data flow order. This principle makes queries easier to understand and debug, and helps you build new queries by reusing parts from other working queries. If you know SQL, you might need a moment to adjust to this reading order, but its simplicity helps you compose complex graph traversals.

> [!NOTE]
> Linear statement composition works like UNIX pipes, lateral joins in SQL, and monadic list operations in functional programming languages.

#### Variables

In any statement, columns from rows produced by previous statements and columns produced by the current statement are called input and output *variables*. Understanding variable scope is crucial for writing correct queries, especially when combining multiple `MATCH` statements or using complex expressions.

### What happens when you run a query

When you run a query, the system provides feedback about the operation:

**Success results:**

- A result table with the rows produced by the query's last statement (if execution succeeds).
- Status information showing whether the query succeeded or failed.

**Status information details:**

Each query run returns one primary status and possibly multiple secondary statuses to give you complete visibility into what happened. Each status includes a GQLSTATUS code, a descriptive message, and more metadata about the status, including a possible cause (if available).

The following GQLSTATUS codes indicate successful query execution:

| GQLSTATUS | Message                                      | When                                     |
|-----------|----------------------------------------------|------------------------------------------|
| 00000     | note: successful completion                  | Success with at least one row            |
| 00001     | note: successful completion - omitted result | Success with no table (currently unused) |
| 02000     | note: no data                                | Success with an empty table              |

Other GQLSTATUS codes indicate exception conditions when a query fails.

For the complete table of status codes, see [GQLSTATUS codes](#gqlstatus-codes).

## Use query statements

Query statements build GQL queries. Each statement type has a specific role in the data processing pipeline.

### `MATCH` statement

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
- If you use a predicate, only rows where the predicate is `TRUE` are kept.

For complete details about graph pattern syntax, see the [Work with graph patterns](#work-with-graph-patterns) section.

> [!IMPORTANT]
> The following restrictions apply to `MATCH` statement graph patterns:
>
> - If this `MATCH` statement isn't the first linear query statement, at least one input variable must join with at least one graph pattern variable.
> - If you specify multiple graph patterns, all graph patterns must have one variable in common.

### `LET` statement

**Syntax:**

```gql
LET <variable> = <expression>, <variable> = <expression>, ...
```

**Description:**

Use the `LET` statement to create new variables by evaluating expressions and binding the results to variable names. Use it to compute derived values, transform data, and prepare values for later use in your query.

**How it works:**

- Each expression is evaluated for every input row.
- The results are added as new columns to the output table.
- Variables you create with `LET` can reference existing variables from previous statements only (no forward references).
- Multiple variable assignments in a single `LET` statement are evaluated in parallel (they don't see the variables bound by another variable assignment in the same `LET` statement).


### `FILTER` statement

**Syntax:**

```gql
FILTER [ WHERE ] <predicate>
```

**Description:**

Use the `FILTER` statement to keep only rows where the predicate is `TRUE`. The `FILTER` statement works like the `WHERE` clause in SQL and helps you narrow your results based on specific conditions.

**Key behaviors:**

- Rows where the predicate is `FALSE` or `UNKNOWN` (null) are removed.
- The `WHERE` keyword is optional—`FILTER predicate` and `FILTER WHERE predicate` mean the same thing.
- Build complex predicates using logical operators (`AND`, `OR`, `NOT`).

> [!CAUTION]
> Remember that in three-valued logic, conditions involving null values return `UNKNOWN`, which means those rows are filtered out. Also, `NOT UNKNOWN = UNKNOWN`, so special care needs to be taken when using negation.

### `ORDER BY` statement

**Syntax:**

```gql
ORDER BY <expression> [ ASC | DESC ], <expression> [ ASC | DESC ], ...
```

**Description:**

Use the `ORDER BY` statement to sort input rows by the specified expressions. Sorting helps you get consistent, repeatable results and lets you slice rows with `OFFSET` and `LIMIT`.

**Sorting behavior:**

- Each expression is evaluated for every row, and rows are ordered by the resulting values.
- You can specify multiple sort expressions separated by commas.
- Rows are sorted first by the first expression, then by the second expression for rows with equal first values, and so on.
- Use `ASC` for ascending order (the default) or `DESC` for descending order.
- The null value is always considered the "smallest" value in sorting operations.


### `OFFSET` and `LIMIT` statements

**Syntax:**

```gql
  OFFSET <offset> [ LIMIT <limit> ]
| LIMIT <limit>
```

**Description:**

Use the `OFFSET` and `LIMIT` statements to control which part of the input rows to include in your output. These statements help you slice rows and manage large result sets efficiently.

**How they work:**

- **`OFFSET`** skips the first `<offset>` rows from the input.
- **`LIMIT`** restricts the output to at most `<limit>` rows.

**Usage patterns:**

- When you use both together, `OFFSET` is applied first, then `LIMIT` is applied to the remaining rows.
- You can use `LIMIT` alone to get the first N rows (like "TOP N" in SQL).
- Combine both to extract a specific slice of rows from the result. This is useful for pagination.

> [!IMPORTANT]
> For predictable pagination results, always use `ORDER BY` before `OFFSET` and `LIMIT` to ensure consistent row ordering across queries.

### `RETURN` statement

**Syntax:**

```gql
RETURN [ DISTINCT ] <expression> [ AS <alias> ], <expression> [ AS <alias> ], <expression> [ AS <alias> ], ...
[ GROUP BY <variable>, <variable>, ...]
[ ORDER BY <expression> [ ASC | DESC ], <expression> [ ASC | DESC ], ... ]
```

**Description:**

Use the `RETURN` statement to produce your query's final output by evaluating expressions for each input row. The `RETURN` statement always comes last and determines what data your query returns.

**Key features:**

**Column naming and aliases:**

- Use `AS <alias>` to give columns custom names for better readability.
- You can omit `AS` when you're returning variables or expressions involving simple property and list element lookups.
- Choose meaningful aliases that help others understand your query results.

**Duplicate handling:**

- `DISTINCT` removes duplicate rows from the output based on row-wise distinctness.
- Rows are considered duplicate if they aren't distinct according to GQL's distinctness rules.
- See [equality and comparison](#how-equality-and-comparison-work) for the definition of distinctness.

**Grouping and aggregation:**

- `GROUP BY` groups rows with the same, non-distinct values for the specified variables.
- Use `GROUP BY` with aggregate functions to compute summaries for each group.
- Common aggregate functions include `count(*)`, `sum()`, `avg()`, `min()`, and `max()`.

**Final sorting:**

- `ORDER BY` can be included to sort your final results.
- This is often more efficient than using a separate `ORDER BY` statement before `RETURN`.

For detailed information about aggregation, see [Aggregate functions](#aggregate-functions).

> [!TIP]
> `ORDER BY` after `RETURN` has special variable visibility rules: expressions can still refer to input variables to `RETURN` that aren't overridden by output variables, making it easy to sort by variables without including them in the final result.


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

The arrow direction `-[...]->` is important—it determines `(:Person)` as the source node pattern and `(:Comment)` as the destination node pattern. Understanding edge direction is crucial for modeling your domain correctly.

**Equivalent mirrored pattern:**

You can flip the arrow and swap the node patterns to create the equivalent, mirrored edge pattern:

```gql
(:Comment)<-[:likes { creationDate: ZONED_DATETIME("2000-01-01T18:00:00Z") }]-(:Person)
```

This pattern finds the same relationships but from the opposite perspective.

#### Any-directed edge patterns

When the direction of a relationship doesn't matter for your query, you can leave it unspecified by creating an any-directed edge pattern:

```gql
(:Song)-[:inspired]-(:Movie)
```

This pattern matches the same relationships as `(:Song)-[:inspired]->(:Movie)` and `(:Movie)-[:inspired]->(:Song)` combined, regardless of which node is the source and which is the destination (this example isn't from the social network graph type).

#### Graph edge pattern shortcuts

GQL provides convenient shortcuts for common edge patterns to make your queries more concise:

- `()->()` stands for `()-[]->()`  (directed edge with any label)
- `()<-()` stands for `()<-[]-()`  (directed edge in reverse with any label)  
- `()-()` stands for `()-[]-()`    (any-directed edge with any label)

These shortcuts can be useful when you care about connectivity but not about the specific relationship type.

### Label expressions

Patterns can express complex requirements on the labels of matched nodes and edges.

**Example:**

```gql
MATCH (:Person|!Company)-[:isLocatedIn]->(p:City|Country)
RETURN count(*)
```

This counts the number of `isLocatedIn` edges connecting `Person` nodes or not-`Company` nodes (`University` nodes in the social network schema) to `City` or `Country` nodes.

**Syntax:**

| Syntax | Meaning                                       |
|--------|-----------------------------------------------|
| `A&B`  | Labels need to include both A and B.           |
| `A\|B` | Labels need to include at least one of A or B. |
| `!A`   | Labels need to exclude A.                      |

Additionally, use parenthesis to control the order of label expression evaluation. By default, `!` has the highest precedence and `&` has higher precedence than `\|`. Therefore `!A&B|C|!D` is the same as `(!A)&(B|C|(!D))`.

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
(p:Person)-[e:knows WHERE e.creationDate > ZONED_DATETIME("2000-01-01T18:00:00Z")]-(o:Person)
```

This finds people who have known each other since after January 1, 2000, using a flexible condition rather than an exact match.

#### Binding path variables

You can also bind a matched path to a path variable for further processing or to return the complete path structure to the user:

```gql
p=(c:Company)<-[:workAt]-(x:Person)-[:knows]-(y:Person)-[:workAt]->(c:Company)
```

Here, `p` is bound to a path value representing the complete matched path structure, including all nodes and edges in sequence.


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

In complex patterns, it's often undesirable to traverse the same edge multiple times. This becomes important when the actual graph contains cycles that could lead to infinite or overly long paths. To handle this, Fabric Graph supports the `TRAIL` match mode. 

Prefixing a path pattern with the keyword `TRAIL` discards all matches that bind the same edge multiple times:

```gql
MATCH TRAIL (a)-[e1:knows]->(b)-[e2:knows]->(c)-[e3:knows]->(d)
```

By using `TRAIL`, this only produces matches in which all edges are different. Therefore, even if `c = a` (the path forms a cycle through nodes), `e3` will never bind to the same edge as `e1`.

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

1. **Inside a variable-length edge pattern**: Graph edge variables bind to each individual edge along the matched path (singleton degree of reference)
2. **Outside a variable-length pattern**: Graph edge variables bind to the sequence of all edges along the matched path (group degree of reference)

**Example demonstrating both contexts:**
  
```gql
MATCH (:Person)-[e:knows WHERE e.creationDate >= ZONED_DATETIME("2000-01-01T00:00:00Z")]->{3}()
RETURN e[0]
```

The evaluation of the edge variable `e` occurs in two contexts:

1. **In the `MATCH` statement**: The query finds chains of friends-of-friends-of-friends where each friendship was established since the year 2000. During pattern matching, the edge pattern predicate `e.creationDate >= ZONED_DATETIME("2000-01-01T00:00:00Z")` is evaluated once for each candidate edge. In this context, `e` is bound to a single edge reference value.

2. **In the `RETURN` statement**: Here `e` is bound to a (group) list of edge reference values in the order they occur in the matched chain. The result of `e[0]` is the first edge reference value in each matched chain.

#### Unbounded variable-length patterns

You can also match arbitrarily long chains of edge patterns by specifying no upper bound. This creates an unbounded variable-length pattern, useful for traversing hierarchies or networks of unknown depth:

```gql
TRAIL (:Person)-[:knows]->{2,}(:Person)
```

**Alternative syntax:**

As a shorthand, you can also specify:

```gql
TRAIL (:Person)-[:knows]->{2,*}(:Person)
```

Both forms are equivalent and match chains of at least 2 `knows` relationships.

> [!IMPORTANT]
> The set of matches for unbounded variable-length patterns can be infinite due to the presence of cycles in the graph. Therefore, unbounded variable-length patterns must always be used with the `TRAIL` match mode to ensure termination and avoid infinite results.

## Graph types & schema

A graph type describes your graph's structure by defining which nodes and edges can exist. Think of it like a blueprint or schema—it specifies the shape of nodes and edges in the graph in terms of their labels and properties. For edges, it also specifies which kinds of edges can connect which kinds of nodes. If you're familiar with relational databases, graph types work similarly to how ER diagrams describe tables and foreign key relationships.

Graph types provide several key benefits:

- **Data validation**: Ensure your graph contains only valid node and edge combinations.
- **Query optimization**: Help the query engine understand your data structure for better performance.
- **Documentation**: Serve as a clear specification of your graph's structure for developers and analysts.

### Define node types

A node type specifies what labels and property types your nodes can have. Here's how to create a basic node type:

```gql
(:Organisation => { 
  id :: UINT64 NOT NULL, 
  name :: STRING, 
  url :: STRING 
})
```

This example creates a node type that defines nodes with:

- The label `Organisation`.
- An `id` property that holds unsigned integer values and can't be null.
- A `name` property that holds string values (can be null).
- A `url` property that holds string values (can be null).

The `::` operator specifies the data type for each property, while `NOT NULL` indicates that the property must always have a value

> [!NOTE]
> `NOT NULL` is considered part of the type in GQL, which differs from SQL.

Node types can also be more complex, with more properties and data types:

```gql
(:Person => {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    firstName :: STRING,
    lastName :: STRING,
    gender :: STRING,
    birthday :: UINT64,
    browserUsed :: STRING,
    locationIP :: STRING
})
```

#### Multiple labels

Nodes can have multiple labels to support inheritance and categorization. You can specify multiple labels for a node type, but one label (the "key label") must uniquely identify the node type:

```gql
(:University => :Organisation),
(:Company => :Organisation)
```

Here, `University` and `Company` are the key labels of the two node types defined, while `Organisation` is a secondary label shared by both types. Notice how the key label and secondary labels are separated by `=>` in each node type. This creates a type hierarchy where both universities and companies are types of organizations.

> [!NOTE]
> Key labels are essential when you're defining node type hierarchies. They help the system understand which node type you're referring to when multiple types share the same labels.

### Define edge types and families

An edge type defines the key label, property types, and endpoint node types for edges. This tells the system what relationships are allowed in your graph:

```gql
(:Person)-[:knows { creationDate :: ZONED DATETIME }]->(:Person)
```

This edge type defines all edges with:

- The (key) label `knows`.
- A `creationDate` property that holds `ZONED DATETIME` values (timestamps together with a timezone offset).
- Source and destination endpoints that must both be `Person` nodes.

The arrow `->` indicates the direction of the edge, from source to destination. This directional information is crucial for understanding your graph's semantics.

Here are more examples of relationship types:

```gql
(:Person)-[:studyAt { classYear :: UINT64 }]->(:University)
(:Person)-[:workAt { workFrom :: UINT64 }]->(:Company)
```

You only need to specify the key labels (`Person`, `University`, or `Company`) for endpoint node types—you don't need to repeat the complete node type definition. The system resolves these references to the full node type definitions.

#### Graph edge type families

Graph edge key labels work differently from node key labels. You can have multiple edge types with the same key label in a graph type, as long as they have the same labels and property types. However, two edge types with the same key label must differ in at least one endpoint node type. We call a set of edge types with the same key label an *edge type family*.

This concept allows you to model the same type of relationship between different types of entities.

**Example:**

```gql
(:City)-[:isPartOf]->(:Country),
(:Country)-[:isPartOf]->(:Continent)
```

Both edge types use the `isPartOf` label, but they connect different types of nodes, forming an edge type family that represents hierarchical containment relationships.

### Build node type hierarchies

Node type hierarchies allow you to model complex domain relationships and support inheritance-like behavior. You can use key labels to create node type hierarchies with this simple rule: If a node type has a label that's a key label of another node type, it must also have all the labels and property types of that other node type.

This approach lets you model complex node type hierarchies and taxonomies, even with multiple inheritance patterns. It's useful for creating abstract categories that group related entity types.

**Example:**

Here's how to create a hierarchy for different types of messages:

```gql
(:Message => {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    browserUsed :: STRING,
    locationIP :: STRING,
    content :: STRING,
    length :: UINT64
}),

(:Post => :Message {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    browserUsed :: STRING,
    locationIP :: STRING,
    content :: STRING,
    length :: UINT64,
    language :: STRING,
    imageFile :: STRING
}),

(:Comment => :Message {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    browserUsed :: STRING,
    locationIP :: STRING,
    content :: STRING,
    length :: UINT64
})
```

Both `Post` and `Comment` node types have the extra `Message` label, so they must include the same labels and property types as the `Message` node type (such as `creationDate` or `browserUsed`). If they didn't include all required properties, Fabric Graph would reject the graph type as invalid during deployment.

This inheritance ensures that all messages, whether posts or comments, share common properties while still allowing each type to have its own specific properties.

#### Save time with inheritance shortcuts

Repeating labels and properties from parent node types gets tedious and error-prone. Fabric Graph provides the `+=` operator so you can specify only the extra (non-inherited) labels and property types:

```gql
(:Post => :Message += {
    language :: STRING,
    imageFile :: STRING
})
```

When no extra properties are specified, the graph inherits all required properties from the parent type:

```gql
(:Comment => :Message)  -- Same as: (:Comment => :Message += {})
```

#### Use abstract node types

You can define node types purely for building hierarchies, even when your graph doesn't contain concrete nodes of that type. This is useful for creating conceptual groupings and shared property sets. For this purpose, you can define a node type as `ABSTRACT` in Fabric Graph:

```gql
ABSTRACT (:Message => {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    browserUsed :: STRING,
    locationIP :: STRING,
    content :: STRING,
    length :: UINT64
})
```

Abstract node types aren't available for direct graph loading—they exist only to structure your hierarchy and define shared properties. Concrete node types that inherit from abstract types can be loaded with data.

### Supported property types

When you're defining a property type, the property value type must be one that Fabric Graph supports. Choosing the right data types is important for storage efficiency and query performance.
   
Here are the data types you can use for property values:

- `INT` (also: `INT64`)
- `UINT` (also: `UINT64`) 
- `STRING`
- `BOOL`
- `DOUBLE` (also: `FLOAT64`, `FLOAT`)
- `T NOT NULL`, where `T` is any of the preceding data types.
- `LIST<T>` and `LIST<T NOT NULL>`, where `T` is any of the preceding data types.

For complete details, see the [Values and value types](#understand-values-and-value-types) section.

> [!IMPORTANT]
> All property types with the same name in a node type or edge type must specify the same property value type. The only exception: they can differ in whether they include the null value.

### Set up node key constraints

Node key constraints define how each node in your graph gets uniquely identified by one or more of its property values. This works like primary key constraints in relational databases and ensures data integrity. A node key constraint can target nodes across multiple node types, which let you define node keys for entire conceptual hierarchies.

Understanding key constraints is crucial because they:

- **Ensure uniqueness**: Prevent duplicate nodes based on your business logic.
- **Enable efficient lookups**: Allow the system to optimize queries that search for specific nodes.
- **Support data integration**: Provide a stable way to reference nodes across different data sources.

> [!IMPORTANT]
> In Fabric Graph, every node must be constrained by exactly one key constraint.

#### How node key constraints work

You can specify node key constraints in your graph type. Each node key constraint has specific characteristics that make it work effectively:

**Components of a node key constraint:**

- Has a unique name within the graph type for easy reference.
- Defines targeted nodes using a simple *constraint pattern* that specifies which nodes the constraint applies to.
- Defines the properties that form the unique key value.

**Example:**

```gql
CONSTRAINT person_pk
  FOR (n:Person) REQUIRE n.id IS KEY
```

This syntax creates a node key constraint called `person_pk` for all nodes with *at least* the `Person` label. The constraint ensures that each node in the graph gets uniquely identified by its `id` property. No two nodes with the `Person` label can have the same `id` value.

You can also define compound keys that use multiple properties together to ensure uniqueness by using the `CONSTRAINT ... FOR ... REQUIRE (n.prop1, n.prop2) IS KEY` syntax.

> [!IMPORTANT]
> Properties used in key constraints:
>
> - Can't be null
> - Must be declared as `NOT NULL` in the node types and edge types that the key constraint targets


## Understand values and value types

GQL supports various kinds of values like numbers, strings, and graph elements. These values are organized into sets called value types, which define what operations you can perform and how values behave in different contexts. Understanding the type system is essential for writing correct queries and avoiding runtime errors.

**Key concepts:**

- **Value types** can be nullable or non-nullable (material), depending on whether they include or exclude the null value.
- **Non-nullable value types** are specified syntactically as `NOT NULL`.
- **The same value** can belong to multiple value types (polymorphism).
- **The null value** is a member of every nullable value type.

### How value types are organized

All value types fall into two major categories that serve different purposes in your queries:

- **Predefined value types** - Built into the language (numbers, strings, booleans, etc.).
- **Constructed value types** - Composed from other types (lists, paths).

Predefined value types are further organized into specialized categories:

- **Boolean value types** - True, false, and unknown values for logical operations.
- **Character string value types** - Text data with Unicode support.
- **Numeric value types** - Integers and floating-point numbers.
- **Temporal value types** - Date and time values with timezone support.
- **Reference value types** - References to nodes and edges in your graph.
- **Immaterial value types** - Special values like null and nothing.

### How equality and comparison work

Understanding how GQL compares values is crucial for writing effective queries, especially when dealing with filtering, sorting, and joins.

### Basic comparison rules

- You can generally compare values of the same kind.
- All numbers can be compared with each other (integers with floats, etc.).
- Only reference values referencing the same kind of object can be compared (node references with node references, edge references with edge references).

### Null handling in comparisons

When you compare any value with null, the result is always `UNKNOWN`. This follows three-valued logic principles. However, the `ORDER BY` statement treats `NULL` as the smallest value when sorting, providing predictable ordering behavior.

#### Test if values are distinct

Certain statements don't test for equality but rather for distinctness. Understanding the difference is important for operations like `DISTINCT` and `GROUP BY`.

### Distinctness vs. equality

Distinctness testing follows the same rules as equality with one crucial exception: `NULL` isn't distinct from `NULL`. This differs from equality tests involving `NULL`, which always result in `UNKNOWN`.

Distinctness testing is used by:

- **`RETURN DISTINCT`**: Determines whether two rows are duplicates of each other.
- **`GROUP BY`**: Determines whether two rows belong to the same grouping key during aggregation.

Two rows from a table are considered distinct if there's at least one column in which the values from both rows are distinct.

### Boolean value types

Boolean values are the three-valued logic values `TRUE`, `FALSE`, and `UNKNOWN`.

> [!NOTE]
> `UNKNOWN` and the null value are identical. `UNKNOWN` is just a null value of type `BOOL`.

**How equality works:**

| Left value | Right value | Result |
|------------|-------------|---------|
| TRUE       | FALSE       | FALSE   |
| TRUE       | TRUE        | TRUE    |
| TRUE       | UNKNOWN     | UNKNOWN |
| FALSE      | FALSE       | TRUE    |
| FALSE      | TRUE        | FALSE   |
| FALSE      | UNKNOWN     | UNKNOWN |
| UNKNOWN    | FALSE       | UNKNOWN |
| UNKNOWN    | TRUE        | UNKNOWN |
| UNKNOWN    | UNKNOWN     | UNKNOWN |

**How comparison works:**

`FALSE` is less than `TRUE`. Any comparison involving `UNKNOWN` results in `UNKNOWN`.

**How to write boolean literals:**

- `TRUE`
- `FALSE`  
- `UNKNOWN` or `NULL`

**Type syntax:**

```gql
BOOL [ NOT NULL ]
```

### Character string value types

Character strings are sequences of Unicode codepoints (they can be zero-length). The empty character string isn't identical with the null value.

**How comparison works:**

Character strings are compared by comparing the Unicode scalar values of their codepoints (this is sometimes called the `UCS_BASIC` collation).

**How to write string literals:**

Enclose your characters in either double quotes (`"`) or single quotes (`'`):

```gql
"Hello, World!"
'Guten Tag!'
```

You can't directly specify certain Unicode control characters in string literals. 
Specifically, all characters from the Unicode General Category classes "Cc" and "Cn" are 
disallowed. Instead, use C-style `\`-escapes:

| Input        | Unescaped character |
|--------------|---------------------|
| `\\`         | `\`                 |
| `\"`         | `"`                 |
| `\'`         | `'`                 |
| `` \` ``     | `` ` ``             |
| `\t`         | U+0009              |
| `\b`         | U+0008              |
| `\n`         | U+000A              |
| `\r`         | U+000D              |
| `\f`         | U+000C              |
| `\uabcd`     | U+ABCD              |
| `\UABCDEF`   | U+ABCDEF            |

GQL also supports SQL-style escaping by doubling the surrounding `"` and `'` characters:

| Actual string | C-style             | SQL-style           |
|---------------|---------------------|---------------------|
| How "Ironic!" | `"How \"ironic!\""` | `"How ""ironic!"""` |
| How 'Ironic!' | `'How \'ironic!\''` | `'How ''ironic!'''` |

> [!TIP]
> Disable C-style `\`-escapes by prefixing your string literal with `@`.

**Type syntax:**

```gql
STRING [ NOT NULL ]
```

### Numeric types

#### Exact numeric types

Fabric Graph supports exact numbers that are negative or positive integers.

**How comparison works:**

All numbers are compared by their numeric value.

**How to write integer literals:**

| Description          | Example   | Value  |
|----------------------|-----------|--------|
| Integer              | 123456    | 123456 |
| Integer w. grouping  | 123_456   | 123456 |

**Type syntax:**

```gql
INT [ NOT NULL ]
INT64 [ NOT NULL ]
UINT [ NOT NULL ]
UINT64 [ NOT NULL ]
```

#### Approximate numeric types

Fabric Graph supports approximate numbers that are IEEE 754-compatible floating point numbers.

**How comparison works:**

All numbers are compared by their numeric value.

**How to write floating-point literals:**

| Description                     | Example       | Value      |
|---------------------------------|---------------|------------|
| Common notation                 | 123.456d      | 123.456    |
| Common notation w. grouping     | 123_456.789d  | 123456.789 |
| Scientific notation             | 1.23456e2     | 123.456    |
| Scientific notation (uppercase) | 1.23456E2     | 123.456    |

**Type syntax:**

```gql
FLOAT [ NOT NULL ]
DOUBLE [ NOT NULL ]
FLOAT64 [ NOT NULL ]
```

(`DOUBLE`, `FLOAT`, and `FLOAT64` all specify the same type)

### Temporal value types

#### Zoned datetime values

A zoned datetime value represents an ISO 8601-compatible datetime with a timezone offset.

**How comparison works:**

Zoned datetime values are compared chronologically by their absolute time points.

**How to write datetime literals:**

Use ISO 8601 format with timezone information:

```gql
ZONED_DATETIME('2024-08-15T14:30:00+02:00')
ZONED_DATETIME('2024-08-15T12:30:00Z')
ZONED_DATETIME('2024-12-31T23:59:59.999-08:00')
```

**Type syntax:**

```gql
ZONED DATETIME [ NOT NULL ]
```

### Reference value types

Reference values contain references to matched nodes or edges.

#### Node reference values

Node reference values represent references to specific nodes in your graph. You typically get these values when nodes are matched in graph patterns, and you can use them to access node properties and perform comparisons.

**How comparison works:**

You should only compare node reference values for equality. Two node reference values are equal if and only if they reference the same node. 

graph in Microsoft Fabric defines a deterministic order over reference values. However, this order can change from query to query and shouldn't be relied upon in production queries.

**How to access properties:**

Use dot notation to access node properties:

```gql
node_var.property_name
```

**Type syntax:**

```gql
NODE [ NOT NULL ]
```

#### Graph edge reference values

Graph edge reference values represent references to specific edges in your graph. You typically get these values when edges are matched in graph patterns, and you can use them to access edge properties and perform comparisons.

**How comparison works:**

You can only compare edge reference values for equality. Two edge reference values are equal if and only if they reference the same edge.

**How to access properties:**

Use dot notation to access edge properties:

```gql
edge_var.property_name
```

**Type syntax:**

```gql
EDGE [ NOT NULL ]
```

### Immaterial value types

Immaterial value types don't contain "ordinary" material values.

#### Null values

The null value represents the absence of a known material value. It's a member of every nullable value type and is distinct from any material value. It's the only value of the null type.

**How comparison works:**

When you compare any value with null, the result is `UNKNOWN`.

**How to write null literals:**

```gql
NULL        -- type NULL
UNKNOWN     -- type BOOL
```

**Type syntax:**

```gql
NULL
```

#### Nothing type

The nothing type is a value type that contains no values. 

This might seem like a technicality, but the nothing type lets you assign a precise type to values like empty list values. This allows you to pass empty lists wherever a list value type is expected (regardless of the required list element type).

**Type syntax:**

```gql
NOTHING
NULL NOT NULL
```

(`NOTHING` and `NULL NOT NULL` specify the same type)

### Constructed value types

#### List values

List values are sequences of elements. Lists can contain elements of the same type or mixed types, and can include null values.

**How comparison works:**

Lists are compared first by size, then element by element in order. Two lists are equal if they have the same size and all corresponding elements are equal.

> [!TIP]
> Comparisons involving null element values always result in `UNKNOWN`. This can lead to surprising results when comparing list values!

**Group lists:**

Group lists are lists bound by matching variable-length edge patterns. Their status as group lists is tracked by Fabric Graph.

Group lists can be used in horizontal aggregation. For more information, see [Aggregate functions](#aggregate-functions).

**How to write list literals:**

Use square bracket notation to create lists:

```gql
[1, 2, 3, 4]
['hello', 'world']
[1, 'mixed', TRUE, NULL]
[]  -- empty list
```

**How to access elements:**

Use square brackets with 0-based indexing to access list elements:

```gql
list_var[0]  -- first element
list_var[1]  -- second element
```

**Type syntax:**

```gql
LIST<element_type> [ NOT NULL ]
LIST<element_type NOT NULL> [ NOT NULL ]
```

Where `element_type` can be any supported type, such as STRING, INT64, DOUBLE, BOOL, etc.

#### Path values

Path values represent paths matched in your graph. A path value contains a non-empty sequence of alternating node and edge reference values that always starts and ends with a node reference value. These reference values identify the nodes and edges of the originally matched path in your graph.

**How paths are structured:**

A path consists of:

- A sequence of nodes and edges: `node₁ - edge₁ - node₂ - edge₂ - ... - nodeₙ`
- Always starts and ends with a node.
- Contains at least one node (minimum path length is zero edges).

**How comparison works:**

Paths are compared by comparing their constituent nodes and edges in sequence.

**Type syntax:**

```gql
PATH [ NOT NULL ]
```

## Expressions and predicates

GQL expressions let you perform calculations, comparisons, and transformations on data within your queries.

### Literals

Literals are simple expressions that directly evaluate to the stated value. Literals of each kind of value are explained in detail in the sections on individual value types.

**Example:**

```gql
1
1.0
TRUE
"Hello, graph!"
[ 1, 2, 3 ]
NULL
```

See sections on individual data types for further information about literal syntax.

### Predicates

Predicates are boolean expressions, which are commonly used to filter results in GQL queries. They evaluate to `TRUE`, `FALSE`, or `UNKNOWN` (null). 

> [!CAUTION]
> When used as a filter, predicates retain only those items, which the predicate evaluates to `TRUE`.

### Comparison predicates

Compare values using these operators:

- `=` (equal)
- `<>` or `!=` (not equal)
- `<` (less than)
- `>` (greater than)
- `<=` (less than or equal)
- `>=` (greater than or equal)

GQL uses three-valued logic where comparisons with null return `UNKNOWN`:

| Expression    | Result    |
|---------------|-----------|
| `5 = 5`       | `TRUE`    |
| `5 = 3`       | `FALSE`   |
| `5 = NULL`    | `UNKNOWN` |
| `NULL = NULL` | `UNKNOWN` |

For specific comparison behavior, see the documentation for each value type.

**Example:**

```gql
MATCH (p:Person)
FILTER WHERE p.age >= 18
RETURN p.name
```

**Coercion rules:**

In order of precedence:

1. Comparison expressions involving arguments of approximate numeric types coerce all arguments to be of an approximate numeric type.
2. Comparison expressions involving arguments of both signed and unsigned integer types coerce all arguments to be of a signed integer type.

### Logical expressions

Combine conditions with logical operators:

- `AND` (both conditions true)
- `OR` (either condition true)
- `NOT` (negates condition)

**Example:**

```gql
MATCH (p:Person)
FILTER WHERE p.age >= 18 AND p.country = 'USA'
RETURN p.name
```

### Property existence predicates

Check if properties exist:

```gql
p.phone IS NOT NULL
p.middle_name IS NULL
```

#### List membership predicates

Test if values are in lists:

```gql
p.name IN ['Alice', 'Bob', 'Charlie']
p.age NOT IN [25, 30, 35]
```

### String pattern predicates

Match strings using pattern matching:

```gql
p.name CONTAINS 'John'
p.email STARTS WITH 'admin'
p.phone ENDS WITH '1234'
```

### Arithmetic expressions

Use standard arithmetic operators with numeric values:

- `+` (addition)
- `-` (subtraction)
- `*` (multiplication)
- `/` (division)

Arithmetic operators follow general mathematical conventions. 

**Precedence:**

Generally operators follow established operator precedence rules, such as `*` before `+`. Use parentheses to control evaluation order as needed.

**Example:**

```gql
(p.age < 25 OR p.age > 65) AND p.active = TRUE
```

**Coercion rules:**

In order of precedence:

1. Arithmetic expressions involving arguments of approximate number types return a result of an approximate numeric type.
2. Arithmetic expressions involving arguments of both signed and unsigned integer types return a result of a signed integer type.

**Example:**

```gql
LET age_in_months = p.age * 12
RETURN age_in_months
```

### Property access

Access properties using dot notation:

```gql
p.name
edge.weight
```

### List access

Access list elements using 1-based indexing:

```gql
friends[1]    -- first element
friends[2]    -- second element
```

### Built-in functions

GQL supports various built-in functions:

#### Aggregate functions

Aggregate functions are used to evaluate an expression over a set of rows and obtain a final result value by combining the values computed for each row. The following aggregate functions are supported in Fabric Graph:

- `count(*)` - counts rows
- `sum(expression)` - sums numeric values
- `avg(expression)` - averages numeric values  
- `min(expression)` - finds minimum value
- `max(expression)` - finds maximum value
- `collect_list(expression)` - collects values into a list

In general, aggregate functions ignore null values and always return a null value when no material input values are provided. You can use `coalesce` to obtain a different default value: `colaesce(sum(expr), 0)`. The only exception is the `count` aggregate function, which always counts the non-null values provided, returning 0 if there are none. Use `count(*)` to also include null values in the count.  

Aggregate functions are used in three different ways:

- For computing (vertical) aggregates over whole tables
- For computing (vertical) aggregates over subtables determined by a grouping key
- For computing (horizontal) aggregates over the elements of a group list.

**Vertical aggregates:**

```gql
-- Vertical aggregate over whole table
MATCH (p:Person)
RETURN count(*) AS total_people, avg(person.creationDate) AS average_creationDate
```

```gql
-- Vertical aggregate over whole table
MATCH (p:Person)
LET first = p.firstName
RETURN name, avg(person.creationDate) AS average_creationDate
GROUP BY first
```

**Horizontal aggregates:**

Horizontal aggregation computes an aggregate over the elements of a group list or their properties. A group list is a list of edges bound by a variable-length pattern. The variable holding such a list is referred to as a group variable.

```gql
-- Horizontal aggregate over a group list
MATCH (p:Person)-[e:knows]->{1,3}(:Person)
-- e is a group variable now
LET average_friend_creationDate = avg(e.creationDate)
RETURN p.firstName || ' ' || p.lastName AS name, average_friend_creationDate
```

Horizontal aggregation always takes precedence over vertical aggregation. To convert a group list into a regular list, use `collect_list(e)`.

#### String functions

- `char_length(string)` - returns string length
- `upper(string)`- returns uppercase variant of provided string (US ASCII only)
- `lower(string)`- returns lowercase variant of provided string (US ASCII only)
- `trim(string)` - removes leading and trailing whitespace
- `string_join(list, separator)` - joins list elements with separator

**Example:**

```gql
MATCH (p:Person)
WHERE char_length(p.name) > 5
RETURN p.name
```

#### Graph functions

- `nodes(path)` - returns nodes from a path value
- `edges(path)` - returns edges from a path value
- `labels(node_or_edge)` - returns the labels of a node or edge as a list of strings

**Example:**

```gql
MATCH p=(:Company)<-[:workAt]-(:Person)-[:knows]-{1,3}(:Person)-[:workAt]->(:Company)
RETURN nodes(p) AS chain_of_friends
```

#### List functions

- `size(list)` - returns size of a list value
- `trim(list,n)` - trim a list to be at most of size `n`

#### Temporal functions

- `zoned_datetime()` - returns current zoned datetime

**Example:**

```gql
RETURN zoned_datetime() AS now
```

#### Generic functions

- `coalesce(value1, value2, ...)` - returns first non-null value

## Additional information

### GQLSTATUS codes

The following GQLSTATUS codes are used by graph in Microsoft Fabric:

| GQLSTATUS | Message                                                       |
|-----------|---------------------------------------------------------------|
| 00000     | note: successful completion                                   |
| 00001     | note: successful completion - omitted result                  |
| 02000     | note: no data                                                 |
| 22000     | error: data exception                                         |
| 42000     | error: syntax error or access rule violation                  |
| G2000     | error: graph type violation                                   |

### Reserved words

GQL reserves certain keywords that you can't use as identifiers like variables, property names, or label names. See [GQL reserved words](gql-reserved-words.md) for the complete list.

If you need to use reserved words as identifiers, escape them with backticks: `` `match` ``, `` `return` ``.

Alternatively, to avoid escaping reserved words, use these naming conventions:
1. When you use single-word identifiers, append an underscore as in `:Product_`. Microsoft Fabric intends to never add single reserved words that end in an underscore.
1. When you use multi-word identifiers, either do the same or, alternatively, don't join them with underscores. Use camelCase or PascalCase conventions instead, like `:MyEntity`, `:hasAttribute`, or `textColor`. Graph in Microsoft Fabric intends to never add compound reserved words in which the compounds aren't separated by underscores.

## Related content

- [Fabric Graph overview](fabric-graph-overview.md) - Learn about graph capabilities in Microsoft Fabric.
- [Graph data models](graph-data-models.md) - Learn how to design effective graph schemas.
- [Graph vs relational databases](graph-relational-databases.md) - Compare graph and relational database approaches.
