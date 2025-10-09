---
title: GQL Language Guide
description: Complete guide to GQL language support for graph in Microsoft Fabric
ms.topic: reference
ms.date: 10/09/2025
author: eric-urban
ms.author: eur
ms.reviewer: splantikow
ms.service: fabric
ms.subservice: graph
---

# GQL language guide

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

The GQL Graph Query Language is the ISO-standardized query language for graph databases. It helps you query and work with graph data efficiently. 

The same international working group that oversees SQL develops GQL. If you already know SQL, you'll see familiar syntax in GQL.

This guide serves both newcomers learning GQL fundamentals and experienced users seeking advanced techniques and comprehensive reference information.

> [!NOTE]
> The official International Standard for GQL is [ISO/IEC 39075 Information Technology - Database Languages - GQL](https://www.iso.org/standard/76120.html).

## Prerequisites

Before diving into GQL, you should be familiar with these concepts:

- **Basic understanding of databases** - Experience with any database system (SQL, NoSQL, or graph) is helpful
- **Graph concepts** - Understanding of nodes, edges, and relationships in connected data
- **Query fundamentals** - Knowledge of basic query concepts like filtering, sorting, and aggregation

**Recommended background:**
- Experience with SQL or openCypher makes learning GQL syntax easier (they share similar roots)
- Familiarity with data modeling helps with graph schema design
- Understanding of your specific use case for graph data

**What you'll need:**
- Access to Microsoft Fabric with graph capabilities
- Sample data or willingness to work with our social network examples
- Basic text editor for writing queries

> [!TIP]
> If you're new to graph databases, start with the [graph data models overview](graph-data-models.md) before continuing with this guide.

## What makes GQL special

GQL is designed specifically for graph data. This makes it natural and intuitive to work with connected information. 

Unlike SQL, which works with tables and joins, GQL lets you describe relationships using visual patterns. These patterns mirror how you think about connected data.

Here's a simple query that shows GQL's visual approach:

```gql
MATCH (person:Person)-[:knows]-(friend:Person)
WHERE person.birthday < 19990101 
  AND friend.birthday < 19990101
RETURN person.firstName || ' ' || person.lastName AS person_name, 
       friend.firstName || ' ' || friend.lastName AS friend_name
```

This query finds friends (people who know each other) who were both born before 1999. The pattern `(person:Person)-[:knows]-(friend:Person)` visually shows the relationship structure you're looking for—much like drawing a diagram of your data.

## GQL fundamentals

Before diving into queries, understand these core concepts that form the foundation of GQL:

- **Graphs** store your data as nodes (entities) and edges (relationships) with labels and properties
- **Graph types** act like schemas, defining what nodes and edges can exist in your graph
- **Constraints** are extra restrictions imposed by graph types on graphs
- **Queries** use statements like `MATCH`, `FILTER`, and `RETURN` to process data and show results
- **Patterns** describe the graph structures you want to find using intuitive visual syntax
- **Expressions** perform calculations and comparisons on your data, similar to SQL expressions
- **Predicates** are boolean value expressions that are used to filter data 
- **Value types** define what kinds of values you can process and store

## Understanding graph data

To work effectively with GQL, you need to understand how graph data is structured. This foundation helps you write better queries and model your data effectively.

### Nodes and edges: the building blocks

In GQL, you work with labeled property graphs. A graph consists of two types of elements:

**Nodes** typically represent the entities (the "nouns") in your system—things like people, organizations, posts, or products. They're independent objects that exist in your domain. Nodes are sometimes also called vertices.

**Edges** represent relationships between entities (the "verbs")—how your entities connect and interact. For example, which people know each other, which organization operates where, or who purchased which product. Edges are sometimes also called relationships.

Every graph element has these characteristics:

- An **internal ID** that uniquely identifies it
- **One or more labels**—descriptive names like `Person` or `knows`. Edges always have exactly one label in a graph in Microsoft Fabric.
- **Properties**—name-value pairs that store data about the element

### How graphs are structured

Each edge connects exactly two nodes: a source and a destination. This connection creates the graph's structure and shows how entities relate to each other. The direction of edges matters—a `Person` who `follows` another `Person` creates a directed relationship.

GQL graphs are always well-formed, meaning every edge connects two valid nodes. If you see an edge in a graph, both its endpoints exist in the same graph.

### Graph models and graph types

The structure of a graph in Microsoft Fabric is described by its **graph model**, which acts like a database schema for your application domain. Graph models define:

- Which nodes and edges can exist
- What labels and properties they can have
- How nodes and edges can connect

Graph models also ensure data integrity through constraints, especially **node key constraints** that specify which properties uniquely identify each node.

> [!NOTE] 
> Graph models can be specified using GQL standard syntax, in which case they're called [graph types](gql-graph-types.md).

## A practical example: social network

Throughout this documentation, we use a social network example to illustrate GQL concepts. Understanding this domain helps you follow the examples and apply similar patterns to your own data.

:::image type="content" source="./media/gql/schema-example.png" alt-text="Diagram showing the social network schema." lightbox="./media/gql/schema-example.png":::

### The social network entities

Our social network includes these main kinds of nodes, representing entities of the domain:

**People** have personal information like names, birthdays, and genders. They live in cities and form social connections.

**Places** form a geographic hierarchy:
- **Cities** like "New York" or "London"  
- **Countries/regions** like "United States" or "United Kingdom"
- **Continents** like "North America" or "Europe"

**Organizations** where people spend time:
- **Universities** where people study
- **Companies** where people work

**Content and discussions:**
- **Forums** with titles that contain posts
- **Posts** with content, language, and optional images
- **Comments** that reply to posts or other comments
- **Tags** that categorize content and represent interests

### How everything connects

The connections between entities make the network interesting:
- People know each other (friendships)
- People work at companies or study at universities
- People create posts and comments
- People like posts and comments
- People have interests in specific tags
- Forums contain posts and have members and moderators

Graph edges represent domain relationships. This rich network creates many opportunities for interesting queries and analysis.

> [!div class="nextstepaction"]
> [View complete schema specification](gql-schema-example.md)

## Your first GQL queries

Now that you understand graph basics, let's see how to query graph data using GQL. These examples build from simple to complex, showing you how GQL's approach makes graph queries intuitive and powerful.

### Start simple: find all people

Let's begin with the most basic query possible:

```gql
MATCH (p:Person)
RETURN p.firstName, p.lastName
```

This query:
1. **`MATCH`** finds all nodes labeled `Person`
2. **`RETURN`** shows their first and last names

### Add filtering: find specific people

Now let's find people with specific characteristics:

```gql
MATCH (p:Person)
FILTER p.firstName = 'Alice'
RETURN p.firstName, p.lastName, p.birthday
```

This query finds everyone named Alice and shows their names and birthdays.

### Basic query structure

Basic GQL queries all follow a consistent pattern: a sequence of statements that work together to find, filter, and return data. Most queries start with `MATCH` to find patterns in the graph and end with `RETURN` to specify what data you want back.

Here's a simple query:

```gql
MATCH (n:Person)-[:knows]-(m:Person)
FILTER n.birthday = m.birthday
RETURN count(*) AS same_age_friends
```

This query works step by step:

1. **`MATCH`** finds all pairs of `Person` nodes that know each other
2. **`FILTER`** keeps only the pairs where both people have the same birthday
3. **`RETURN`** counts how many such friend pairs exist

> [!TIP]
> Filtering can also be performed directly as part of a pattern (for example, in `MATCH`) by appending a `WHERE` clause

> [!NOTE]
> GQL supports C-style `//` line comments, SQL-style `--` line comments, and C-style `/* */` block comments.

### How statements work together

Statements in GQL work like a pipeline—each statement transforms the data from the previous statement. This approach makes queries easy to read because the execution order matches the reading order.

**Linear statement composition:**

In GQL, statements execute sequentially. Each statement processes the output from the previous statement. This composition creates a clear data flow that's easy to understand and debug.

The pipeline works like this: each statement transforms data and passes it to the next statement. This approach makes queries readable because execution order matches reading order.

```gql
-- Data flows: Match → Let → Filter → Order → Limit → Return
MATCH (p:Person)-[:workAt]->(c:Company)     -- Input: unit table, Output: table with (p, c) columns
LET companyName = c.name                    -- Input: (p, c), Output: (p, c, companyName) columns
FILTER c.name CONTAINS 'Tech'               -- Input: (p, c, companyName), Output: filtered rows  
ORDER BY p.firstName DESC                   -- Input: filtered table, Output: sorted table
LIMIT 5                                     -- Input: sorted table, Output: table with top 5 rows
RETURN                                      -- Input: top 5 rows, Output: result table
  p.firstName || ' ' || p.lastName AS name, 
  companyName
```

This linear composition ensures predictable execution and makes complex queries easier to understand step-by-step.

**Example with multiple statements:**

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
LET fullName = p.firstName || ' ' || p.lastName  
FILTER c.name = 'Contoso'
ORDER BY fullName
LIMIT 10
RETURN fullName, c.name AS company_name
```

This pipeline:
1. Finds people who work at companies
2. Creates full names by combining first and family names
3. Keeps only Contoso employees  
4. Sorts by full name
5. Takes the first 10 results
6. Returns names and company locations

### Variables connect your data

Variables (like `p`, `c`, and `fullName` in the previous examples) carry data between statements. When you reuse a variable name, GQL automatically ensures it refers to the same data, creating powerful join conditions. Variables are sometimes also called binding variables.

Variables can be categorized in different ways:

**By binding source:**
- **Pattern variables** - bound by matching [graph patterns](gql-graph-patterns.md)  
- **Regular variables** - bound by other language constructs

**Pattern variable types:**
- **Element variables** - bind to graph element reference values
  - **Node variables** - bind to individual nodes
  - **Edge variables** - bind to individual edges
- **Path variables** - bind to path values representing matched paths

**By reference degree:**
- **Singleton variables** - bind to individual element reference values from patterns
- **Group variables** - bind to lists of element reference values from variable-length patterns (see [Advanced Aggregation Techniques](#advanced-aggregation-techniques)) 

### Understanding query results

When you run a query, you get back:

- **A result table** with the data from your `RETURN` statement
- **Status information** showing whether the query succeeded

**Success status codes:**

| GQLSTATUS | Message                                      | When                                     |
|-----------|----------------------------------------------|------------------------------------------|
| 00000     | note: successful completion                  | Success with at least one row            |
| 00001     | note: successful completion - omitted result | Success with no table (currently unused) |
| 02000     | note: no data                                | Success with an empty table              |

Other status codes indicate errors or warnings that prevented the query from completing successfully.

> [!div class="nextstepaction"]
> [View complete GQLSTATUS codes reference](gql-reference-status-codes.md)

## Essential concepts and statements

This section covers the core building blocks you need to write effective GQL queries. Each concept builds toward practical query writing skills.

### Graph patterns: finding structure

Graph patterns are the heart of GQL queries. They let you describe the data structure you're looking for using intuitive, visual syntax that looks like the relationships you want to find.

**Simple patterns:**

Start with basic relationship patterns:

```gql
-- Find direct friendships
(p:Person)-[:knows]->(f:Person)

-- Find people working at any company
(:Person)-[:workAt]->(:Company)

-- Find cities in any country
(:City)-[:isPartOf]->(:Country)  
```

**Patterns with specific data:**

```gql
-- Find who works at Microsoft specifically
(p:Person)-[:workAt]->(c:Company)
WHERE c.name = 'Microsoft'

-- Find friends who are both young
(p:Person)-[:knows]-(f:Person)  
WHERE p.birthday > 19950101 AND f.birthday > 19950101
```

**Label expressions for flexible entity selection:**

```gql
(:Person|Company)-[:isLocatedIn]->(p:City|Country)  -- OR with |
(:Place&City)                                       -- AND with &  
(:Person&!Company)                                  -- NOT with !
```

Label expressions let you match different kinds of nodes in a single pattern, making your queries more flexible.

**Variable reuse creates powerful joins:**

```gql
-- Find coworkers: people who work at the same company
(c:Company)<-[:workAt]-(x:Person)-[:knows]-(y:Person)-[:workAt]->(c)
```

The reuse of variable `c` ensures both people work at the **same** company, creating an automatic join constraint. This pattern is a key pattern for expressing "same entity" relationships.

> [!IMPORTANT]
> **Critical insight**: Variable reuse in patterns creates structural constraints. This technique is how you express complex graph relationships like "friends who work at the same company" or "people in the same city."

**Pattern-level filtering with WHERE:**

```gql
-- Filter during pattern matching (more efficient)
MATCH (p:Person WHERE p.birthday < 19940101)-[:workAt]->(c:Company WHERE c.id > 1000)

-- Filter edges during matching  
MATCH (p:Person)-[w:workAt WHERE w.workFrom >= 20200101]->(c:Company)
```

**Bounded variable-length patterns:**

```gql
(:Person)-[:knows]->{1,3}(:Person)  -- Friends up to 3 degrees away
```

**TRAIL patterns for cycle-free traversal:**

Use `TRAIL` patterns to prevent cycles during graph traversal, ensuring each edge is visited at most once:

```gql
-- Find paths without visiting the same person twice
MATCH TRAIL (start:Person)-[:knows]->{1,4}(end:Person)
WHERE start.firstName = 'Alice' AND end.firstName = 'Bob'

-- Find acyclic paths in social networks
MATCH TRAIL (p:Person)-[e:knows]->{,5}(celebrity:Person WHERE celebrity.id > 9000)
RETURN 
  p.firstName || ' ' || p.lastName AS person_name, 
  celebrity.firstName || ' ' || celebrity.lastName AS celebrity_name, 
  count(e) AS distance
```

**Variable-length edge binding:**

In variable-length patterns, edge variables capture different information based on context:

```gql
-- Edge variable 'e' binds to a single edge for each result row
MATCH (p:Person)-[e:knows]->(friend:Person)
RETURN p.firstName, e.creationDate, friend.firstName  -- e refers to one specific relationship

-- Edge variable 'edges' binds to a group list of all edges in the path
MATCH (p:Person)-[edges:knows]->{2,4}(friend:Person)  
RETURN 
  p.firstName || ' ' || p.lastName AS person_name, 
  friend.firstName || ' ' || friend.lastName AS friend_name, 
  -- edges is a list
  size(edges) AS path_length  
```

This distinction is crucial for using edge variables correctly.

**Complex patterns with multiple relationships:**

```gql
MATCH (p:Person), (p)-[:workAt]->(c:Company), (p)-[:isLocatedIn]->(city:City)
```

This pattern finds people along with both their workplace and residence, showing how one person connects to multiple other entities.

> [!div class="nextstepaction"]
> [Learn comprehensive pattern syntax and advanced techniques](gql-graph-patterns.md)

### Core statements

GQL provides specific statement types that work together to process your graph data step by step. Understanding these statements is essential for building effective queries.

#### `MATCH` statement

**Syntax:**

```gql
MATCH <graph pattern>, <graph pattern>, ... [ WHERE <predicate> ]
```

The `MATCH` statement takes input data and finds graph patterns, joining input variables with pattern variables and outputting all matched combinations.

**Input and output variables:**

```gql
-- Input: unit table (no columns, one row)
-- Pattern variables: p, c  
-- Output: table with (p, c) columns for each person-company match
MATCH (p:Person)-[:workAt]->(c:Company)
```

**Statement-level filtering with WHERE:**

```gql
-- Filter pattern matches
MATCH p=(p:Person)-[:workAt]->(c:Company) WHERE p.lastName = c.name
```

All matches can be post-filtered using `WHERE`, avoiding a separate `FILTER` statement.

**Joining with input variables:**

When `MATCH` isn't the first statement, it joins input data with pattern matches:

```gql
-- Input: table with 'targetCompany' column
-- Implicit Join: targetCompany (equality join)
-- Output: table with (targetCompany, p, r) columns
MATCH (p:Person)-[r:workAt]->(targetCompany)
```

**Key joining behaviors:**

How `MATCH` handles data joining:

- **Variable equality**: Input variables join with pattern variables using equality matching
- **Inner join**: Input rows without pattern matches are discarded (no left/right joins)
- **Filtering order**: Statement-level `WHERE` filters after pattern matching completes
- **Pattern connectivity**: Multiple patterns must share at least one variable for proper joining
- **Performance**: Shared variables create efficient join constraints

> [!IMPORTANT]
> **Restriction**: If this `MATCH` isn't the first statement, at least one input variable must join with a pattern variable. Multiple patterns must have one variable in common.

**Multiple patterns require shared variables:**

```gql
-- Shared variable 'p' joins the two patterns
-- Output: people with both workplace and residence data
MATCH (p:Person)-[:workAt]->(c:Company), 
      (p)-[:isLocatedIn]->(city:City)
```

#### `LET` statement

**Syntax:**

```gql
LET <variable> = <expression>, <variable> = <expression>, ...
```

The `LET` statement creates computed variables and enables data transformation within your query pipeline.

**Basic variable creation:**

```gql
MATCH (p:Person)
LET fullName = p.firstName || ' ' || p.lastName
RETURN *
```

**Complex calculations:**

```gql
MATCH (p:Person)
LET adjustedAge = 2000 - (p.birthday / 10000),
    fullProfile = p.firstName || ' ' || p.lastName || ' (' || p.gender || ')'
RETURN *
```

**Key behaviors:**

- Expressions are evaluated for every input row
- Results become new columns in the output table
- Variables can only reference existing variables from previous statements
- Multiple assignments in one `LET` are evaluated in parallel (no cross-references)

#### `FILTER` statement  

**Syntax:**

```gql
FILTER [ WHERE ] <predicate>
```

The `FILTER` statement provides precise control over which data proceeds through your query pipeline.

**Basic filtering:**

```gql
MATCH (p:Person)
FILTER p.birthday < 19980101 AND p.gender = 'female'
RETURN *
```

**Complex logical conditions:**

```gql
MATCH (p:Person)
FILTER (p.gender = 'male' AND p.birthday < 19940101) 
  OR (p.gender = 'female' AND p.birthday < 19990101)
  OR p.browserUsed = 'Edge'
RETURN *
```

**Null-aware filtering patterns:**

Use these patterns to handle null values safely:

- **Check for values**: `p.firstName IS NOT NULL` - has a first name
- **Validate data**: `p.id > 0` - valid ID  
- **Handle missing data**: `NOT coalesce(p.locationIP, '127.0.0.1') STARTS WITH '127.0.0'` - didn't connect from local network
- **Combine conditions**: Use `AND`/`OR` with explicit null checks for complex logic

> [!CAUTION]
> Remember that conditions involving null values return `UNKNOWN`, which filters out those rows. Use explicit `IS NULL` checks when you need null-inclusive logic.

#### `ORDER BY` statement

**Syntax:**

```gql
ORDER BY <expression> [ ASC | DESC ], <expression> [ ASC | DESC ], ...
```

**Multi-level sorting with computed expressions:**

```gql
MATCH (p:Person)
RETURN *
ORDER BY p.firstName DESC,               -- Primary: by first name (Z-A)
         p.birthday ASC,                 -- Secondary: by age (oldest first)
         p.id DESC,                      -- Tertiary: by ID (highest first)
```

**Null handling in sorting:**

```gql
ORDER BY coalesce(p.gender, 'not specified') DESC -- Treat NULL as 'not specified'
```

**Sorting behavior details:**

Understanding how `ORDER BY` works:

- **Expression evaluation**: Expressions are evaluated for each row, then results determine row order
- **Multiple sort keys**: Create hierarchical ordering (primary, secondary, tertiary, etc.)
- **Null handling**: `NULL` is always treated as the smallest value in comparisons
- **Default order**: `ASC` (ascending) is default, `DESC` (descending) must be specified explicitly
- **Computed sorting**: You can sort by calculated values, not just stored properties

> [!CAUTION]
> The sort order established by `ORDER BY` is only visible to the *immediately* following statement.
> Hence, `ORDER BY` followed by `RETURN *` does NOT produce a sorted result. 

#### `OFFSET` and `LIMIT` statements

**Syntax:**

```gql
  OFFSET <offset> [ LIMIT <limit> ]
| LIMIT <limit>
```

**Common patterns:**

```gql
-- Basic top-N query
MATCH (p:Person)
RETURN *
ORDER BY p.id DESC
LIMIT 10                                 -- Top 10 by ID
```

> [!IMPORTANT]
> For predictable pagination results, always use `ORDER BY` before `OFFSET` and `LIMIT` to ensure consistent row ordering across queries.

#### `RETURN`: basic result projection

**Syntax:**

```gql
RETURN [ DISTINCT ] <expression> [ AS <alias> ], <expression> [ AS <alias> ], ...
[ ORDER BY <expression> [ ASC | DESC ], <expression> [ ASC | DESC ], ... ]
[ OFFSET <offset> ]
[ LIMIT <limit> ]
```

The `RETURN` statement produces your query's final output by specifying which data appears in the result table.

**Basic output:**

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN p.firstName || ' ' || p.lastName AS name, 
       p.birthday, 
       c.name
```

**Using aliases for clarity:**

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN p.firstName AS first_name, 
       p.lastName AS last_name,
       c.name AS company_name
```

**Combine with sorting and top-k:**

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN p.firstName || ' ' || p.lastName AS name, 
       p.birthday AS birth_year, 
       c.name AS company
ORDER BY birth_year ASC
LIMIT 10
```

**Duplicate handling with DISTINCT:**

```gql
-- Remove duplicate combinations
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN DISTINCT p.gender, p.browserUsed, p.birthday AS birth_year
ORDER BY p.gender, p.browserUsed, birth_year
```

**Combine with aggregation:**

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN count(DISTINCT p) AS employee_count
```

#### `RETURN` with `GROUP BY`: grouped result projection

**Syntax:**

```gql
RETURN [ DISTINCT ] <expression> [ AS <alias> ], <expression> [ AS <alias> ], ...
GROUP BY <variable>, <variable>, ...
[ ORDER BY <expression> [ ASC | DESC ], <expression> [ ASC | DESC ], ... ]
[ OFFSET <offset> ]
[ LIMIT <limit> ]
```

Use `GROUP BY` to group rows by shared values and compute aggregate functions within each group.

**Basic grouping with aggregation:**

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
LET companyName = c.name
RETURN c.name, 
       count(*) AS employeeCount,
       avg(p.birthday) AS avg_birth_year
GROUP BY companyName
ORDER BY employeeCount DESC
```

**Multi-column grouping:**

```gql
LET gender = p.gender
LET browser = p.browserUsed
RETURN gender,
       browser,
       count(*) AS person_count,
       avg(p.birthday) AS avg_birth_year,
       min(p.creationDate) AS first_joined,
       max(p.id) AS highest_id
GROUP BY gender, browser
ORDER BY avg_birth_year DESC
LIMIT 10
```

> [!NOTE]
> For advanced aggregation techniques including horizontal aggregation over variable-length patterns, see [Advanced Aggregation Techniques](#advanced-aggregation-techniques).

### Data types: working with values

GQL supports rich data types for storing and manipulating different kinds of information in your graph.

**Basic value types:**

- **Numbers**: `INT64`, `UINT64`, `DOUBLE` for calculations and measurements
- **Text**: `STRING` for names, descriptions, and textual data
- **Logic**: `BOOL` with three values: TRUE, FALSE, and UNKNOWN (for null handling)
- **Time**: `ZONED DATETIME` for timestamps with timezone information
- **Collections**: `LIST<T>` for multiple values, `PATH` for graph traversal results
- **Graph elements**: `NODE` and `EDGE` for referencing graph data

**Example literals:**

```gql
42                                     -- Integer
"Hello, graph!"                        -- String  
TRUE                                   -- Boolean
ZONED_DATETIME('2024-01-15T10:30:00Z') -- DateTime with timezone
[1, 2, 3]                              -- List of integers
```

**Critical null handling patterns:**

```gql
-- Equality with NULL always returns UNKNOWN
5 = NULL                              -- Returns UNKNOWN (not FALSE!)
NULL = NULL                           -- Returns UNKNOWN (not TRUE!)

-- Use IS NULL for explicit null testing
p.nickname IS NULL                    -- Returns TRUE if nickname is null
p.nickname IS NOT NULL                -- Returns TRUE if nickname has a value

-- COALESCE for null-safe value selection
coalesce(p.nickname, p.firstName, '???')  -- First non-null value
```

**Three-valued logic implications:**

```gql
-- In FILTER statements, only TRUE values pass through
FILTER p.birthday > 0        -- Removes rows where birthday is null
FILTER NOT (p.birthday > 0)  -- Also removes rows (NOT UNKNOWN = UNKNOWN)

-- Use explicit null handling for inclusive filtering
FILTER p.birthday < 19980101 OR p.birthday IS NULL -- Includes null birthdays
```

> [!CAUTION]
> Three-valued logic means `NULL = NULL` returns `UNKNOWN`, not `TRUE`. This behavior affects filtering and joins. Always use `IS NULL` for null tests.

> [!div class="nextstepaction"]
> [Learn comprehensive type system details](gql-values-and-value-types.md)

### Expressions: transforming and analyzing data

Expressions let you calculate, compare, and transform data within your queries. They're similar to expressions in SQL but have extra features for the handling of graph data.

**Common expression types:**

```gql
p.birthday < 19980101   -- Birth year comparison  
p.firstName || ' ' || p.lastName               -- String concatenation
count(*)                                       -- Aggregation
p.firstName IN ['Alice', 'Bob']                -- List membership
coalesce(p.firstName, p.lastName)              -- Null handling
```

**Complex predicate composition:**

```gql
-- Combine conditions with proper precedence
FILTER (p.birthday > 19560101 AND p.birthday < 20061231) 
  AND (p.gender IN ['male', 'female'] OR p.browserUsed IS NOT NULL)

-- Use parentheses for clarity and correctness
FILTER p.gender = 'female' AND (p.firstName STARTS WITH 'A' OR p.id > 1000)
```

**String pattern matching:**

```gql
-- Pattern matching with different operators
p.locationIP CONTAINS '192.168'      -- Substring search
p.firstName STARTS WITH 'John'       -- Prefix matching  
p.lastName ENDS WITH 'son'           -- Suffix matching

-- Case-insensitive operations
upper(p.firstName) = 'ALICE'         -- Convert to uppercase for comparison
```

**Built-in functions by category:**

GQL provides these function categories for different data processing needs:

- **Aggregate functions**: `count()`, `sum()`, `avg()`, `min()`, `max()` for summarizing data
- **String functions**: `char_length()`, `upper()`, `lower()`, `trim()` for text processing  
- **Graph functions**: `nodes()`, `edges()`, `labels()` for analyzing graph structures
- **General functions**: `coalesce()` for handling null values gracefully

**Operator precedence for complex expressions:**

1. Property access (`.`)
2. Multiplication/Division (`*`, `/`)  
3. Addition/Subtraction (`+`, `-`)
4. Comparison (`=`, `<>`, `<`, `>`, `<=`, `>=`)
5. Logical negation (`NOT`)
6. Logical conjunction (`AND`)
7. Logical disjunction (`OR`)

> [!TIP]
> **Performance tip**: Use parentheses to make precedence explicit. Complex expressions are easier to read and debug when grouping is clear.

> [!div class="nextstepaction"]
> [Learn comprehensive expression syntax and all built-in functions](gql-expressions.md)

## Advanced query techniques

This section covers sophisticated patterns and techniques for building complex, efficient graph queries. These patterns go beyond basic statement usage to help you compose powerful analytical queries.

### Complex multi-statement composition

Understanding how to compose complex queries efficiently is crucial for advanced graph querying.

**Multi-step pattern progression:**

```gql
-- Build complex analysis step by step
MATCH (company:Company)<-[:workAt]-(employee:Person)
LET companyName = company.name
MATCH (employee)-[:isLocatedIn]->(city:City)
FILTER employee.birthday < 19850101
LET cityName = city.name
RETURN companyName, cityName, avg(employee.birthday) AS avgBirthYear, count(employee) AS employeeCount
GROUP BY companyName, cityName
ORDER BY avgBirthYear DESC
```

This query progressively builds complexity: find companies, their employees, employee locations, calculate average birth years, filter companies with employees born before 1985, and summarize results.

**Use of horizontal aggregation:**

```gql
-- Find people and their minimum distance to people working at Microsoft
MATCH TRAIL (p:Person)-[e:knows]->{,5}(:Person)-[:workAt]->(:Company { name: 'Microsoft'})
LET p_name = p.lastName || ', ' || p.firstName
RETURN p_name, min(count(e)) AS minDistance 
GROUP BY p_name
ORDER BY minDistance DESC
```

### Variable scope and advanced flow control

Variables connect data across query statements and enable complex graph traversals. Understanding advanced scope rules helps you write sophisticated multi-statement queries.

**Variable binding and scoping patterns:**

```gql
-- Variables flow forward through subsequent statements
MATCH (p:Person)                     -- Bind p
LET fullName = p.firstName || ' ' || p.lastName  -- p available, bind fullName
FILTER fullName CONTAINS 'Smith'     -- Both p and fullName available
RETURN p.id, fullName                -- Both still available initially but `RETURN` will discard `p`
```

**Variable reuse for joins across statements:**

```gql
-- Multi-statement joins using variable reuse
MATCH (p:Person)-[:workAt]->(:Company)          -- Find people with jobs
MATCH (p)-[:isLocatedIn]->(:City)               -- Same p: people with both job and residence
MATCH (p)-[:knows]->(friend:Person)             -- Same p: their social connections
```

**Critical scoping rules and limitations:**

```gql
-- ✅ Forward references work
MATCH (p:Person)
LET adult = p.birthday < 20061231  -- Can reference p from previous statement

-- ❌ Backward references don't work  
LET adult = p.birthday < 20061231  -- Error: p not yet defined
MATCH (p:Person)

-- ❌ Variables in same statement can't reference each other
LET name = p.firstName || ' ' || p.lastName,
    greeting = 'Hello, ' || name     -- Error: name not visible yet

-- ✅ Use separate statements for dependent variables
LET name = p.firstName || ' ' || p.lastName
LET greeting = 'Hello, ' || name     -- Works: name now available
```

**Variable visibility in complex queries:**

```gql
-- Variables remain visible until overridden or query ends
MATCH (p:Person)                     -- p available from here
LET gender = p.gender                -- gender available from here  
MATCH (p)-[:knows]->(e:Person)       -- p still refers to original person
                                     -- e is new variable for managed employee
RETURN p.firstName AS manager, e.firstName AS friend, gender
```

> [!CAUTION]
> Variables in the same statement can't reference each other (except in graph patterns). Use separate statements for dependent variable creation.

### Advanced Aggregation Techniques

GQL supports two distinct types of aggregation for analyzing data across groups and collections: vertical aggregation with `GROUP BY` and horizontal aggregation over variable-length patterns.

#### Vertical aggregation with GROUP BY

Vertical aggregation (covered in [`RETURN` with `GROUP BY`](#return-with-group-by-grouped-result-projection)) groups rows by shared values and computes aggregates within each group:

```gql
MATCH (p:Person)-[:workAt]->(c:Company)
RETURN c.name, 
       count(*) AS employee_count, 
       avg(p.birthday) AS avg_birth_year
GROUP BY c.name
```

This approach creates one result row per company, aggregating all employees within each group.

#### Horizontal aggregation with group list variables

Horizontal aggregation computes aggregates over collections bound by variable-length patterns. When you use variable-length edges, the edge variable becomes a **group list variable** that holds all edges in each matched path:

```gql
-- Group list variable 'edges' enables horizontal aggregation
MATCH (p:Person)-[edges:knows]->{2,4}(friend:Person)
RETURN p.firstName || ' ' || p.lastName AS person_name, 
       friend.firstName || ' ' || friend.lastName AS friend_name,
       size(edges) AS degrees_of_separation,
       avg(edges.creationDate) AS avg_connection_age,
       min(edges.creationDate) AS oldest_connection
```

**Key differences:**
- **Vertical aggregation** summarizes across rows - or - groups rows and summarizes across rows in each group
- **Horizontal aggregation** summarizes elements within individual edge collections
- Group list variables only come from variable-length edge patterns

#### Variable-length edge binding contexts

Understanding how edge variables bind in variable-length patterns is crucial:

**During pattern matching (singleton context):**
```gql
-- Edge variable 'e' refers to each individual edge during filtering
MATCH (p:Person)-[e:knows WHERE e.creationDate > zoned_datetime('2020-01-01T00:00:00Z')]->{2,4}(friend:Person)
-- 'e' is evaluated for each edge in the path during matching
```

**In result expressions (group context):**
```gql
-- Edge variable 'edges' becomes a list of all qualifying edges
MATCH (p:Person)-[edges:knows]->{2,4}(friend:Person)
RETURN size(edges) AS path_length,           -- Number of edges in path
       edges[0].creationDate AS first_edge,         -- First edge in path
       avg(edges.creationDate) AS avg_age           -- Horizontal aggregation
```

#### Combining vertical and horizontal aggregation

You can combine both aggregation types in sophisticated analysis patterns:

```gql
-- Find average connection age by city pairs
MATCH (p1:Person)-[:isLocatedIn]->(c1:City)
MATCH (p2:Person)-[:isLocatedIn]->(c2:City)
MATCH (p1)-[edges:knows]->{1,3}(p2)
RETURN c1.name AS city1,
       c2.name AS city2,
       count(*) AS connection_paths,              -- Vertical: count paths per city pair
       avg(size(edges)) AS avg_degrees,           -- Horizontal then vertical: path lengths
       avg(avg(edges.creationDate)) AS avg_connection_age -- Horizontal then vertical: connection ages
GROUP BY c1.name, c2.name
```

> [!TIP]
> Horizontal aggregation always takes precedence over vertical aggregation. To convert a group list into a regular list, use `collect_list(edges)`.

> [!NOTE]  
> For detailed aggregate function reference, see [GQL expressions and functions](gql-expressions.md#aggregate-functions).

### Error handling strategies

Understanding common error patterns helps you write robust queries.

**Handle missing data gracefully:**

```gql
MATCH (p:Person)
-- Use COALESCE for missing properties
LET displayName = coalesce(p.firstName, p.lastName, 'Unknown')
LET contact = coalesce(p.locationIP, p.browserUsed, 'No info')
RETURN *
```

**Use explicit null checks:**

```gql
MATCH (p:Person)
-- Be explicit about null handling
FILTER p.id IS NOT NULL AND p.id > 0
-- Instead of just: FILTER p.id > 0
RETURN *
```

## Additional information

### GQLSTATUS codes

As explained in the section on [query results](gql-language-guide.md#understanding-query-results),
GQL reports rich status information related to the success or potential failure of execution.
See the [GQL status codes reference](gql-reference-status-codes.md) for the complete list.

### Reserved words

GQL reserves certain keywords that you can't use as identifiers like variables, property names, or label names. 
See the [GQL reserved words reference](gql-reference-reserved-terms.md) for the complete list.

If you need to use reserved words as identifiers, escape them with backticks: `` `match` ``, `` `return` ``.

To avoid escaping reserved words, use this naming convention:
- For single-word identifiers, append an underscore: `:Product_`
- For multi-word identifiers, use camelCase or PascalCase: `:MyEntity`, `:hasAttribute`, `textColor`

## Next steps

Now that you understand GQL fundamentals, here's your recommended learning path:

### Continue building your GQL skills

**For beginners:**
- **Try the quickstart** - Follow our [hands-on tutorial](quickstart.md) for practical experience
- **Practice basic queries** - Try the examples from this guide with your own data
- **Learn graph patterns** - Master the [comprehensive pattern syntax](gql-graph-patterns.md)
- **Explore data types** - Understand [GQL values and value types](gql-values-and-value-types.md)

**For experienced users:**
- **Advanced expressions** - Master [GQL expressions and functions](gql-expressions.md)
- **Schema design** - Learn [GQL graph types](gql-graph-types.md) and constraints
- **Explore data types** - Understand [GQL values and value types](gql-values-and-value-types.md)

### Reference materials

Keep these references handy for quick lookups:
- **[GQL quick reference](gql-reference-abridged.md)** - Syntax quick reference
- **[GQL status codes](gql-reference-status-codes.md)** - Complete error code reference  
- **[GQL reserved words](gql-reference-reserved-terms.md)** - Complete list of reserved keywords

### Explore Microsoft Fabric

**Learn the platform:**
- **[Graph data models](graph-data-models.md)** - Understanding graph concepts and modeling
- **[Graph vs relational databases](graph-relational-databases.md)** - Choose the right approach
- **[Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)** - Get hands-on experience
- **[End-to-end tutorials](/fabric/fundamentals/end-to-end-tutorials)** - Complete learning scenarios

### Get involved

- **Share feedback** - Help improve our documentation and tools
- **Join the community** - Connect with other graph database practitioners
- **Stay updated** - Follow Microsoft Fabric announcements for new features

> [!TIP]
> Start with the [quickstart tutorial](quickstart.md) if you prefer learning by doing, or dive into [graph patterns](gql-graph-patterns.md) if you want to master the query language first.

## Related content

**Further details on key topics:**
- [Social network schema example](gql-schema-example.md) - Complete working example of graph schema
- [GQL graph patterns](gql-graph-patterns.md) - Comprehensive pattern syntax and advanced matching techniques
- [GQL expressions and functions](gql-expressions.md) - All expression types and built-in functions
- [GQL graph types](gql-graph-types.md) - Graph types and constraints
- [GQL values and value types](gql-values-and-value-types.md) - Complete type system reference and value handling

**Quick references:**
- [GQL abridged reference](gql-reference-abridged.md) - Syntax quick reference
- [GQL status codes](gql-reference-status-codes.md) - Complete error code reference  
- [GQL reserved words](gql-reference-reserved-terms.md) - Complete list of reserved keywords

**Graph in Microsoft Fabric:**
- [Graph data models](graph-data-models.md) - Understanding graph concepts and modeling
- [Graph and relational databases](graph-relational-databases.md) - Differences and when to use each
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
