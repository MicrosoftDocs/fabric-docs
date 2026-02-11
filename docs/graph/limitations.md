---
title: Current Limitations of Graph in Microsoft Fabric
description: Understand the current limitations of Graph in Microsoft Fabric, including data types, graph size, query constraints, and GQL (Graph Query Language) conformance.
ms.topic: reference
ms.date: 01/26/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
---

# Current limitations of Graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

While Graph in Microsoft Fabric is in preview, the service has certain functional and performance limitations. This article highlights some key limitations but isn't an exhaustive list. Check back regularly for updates.

For help with common problems, see [Troubleshooting Graph in Microsoft Fabric](troubleshooting-and-faq.md).

## Creating graph models

### Data sources

- OneLake parquet and CSV files are the only data sources currently supported.
- Support for Power BI semantic models as data sources is under development.
- Support for column- and row-level [OneLake security](../onelake/security/get-started-security.md#onelake-security-preview) is under development.
- Support for [Lakehouse with schema](../data-engineering/lakehouse-schemas.md) is under development.

### Data types

Graph in Microsoft Fabric currently supports the following data types:

- Boolean (values are `true` and `false`)
- Double (values are 64-bit floating point numbers)
- Integer (values are 64-bit signed integers)
- String (values are Unicode character strings)
- Zoned DateTime (values are timestamps together with a timeshift for the time zone)

The following OneLake types are supported:

- IntegerType
- LongType
- StringType
- DoubleType
- BooleanType
- FloatType
- ByteType
- ArrayType
- DateType
- TimestampNtzType
- TimestampType

### Edge creation

During graph modeling, give different graph edge types different names.

For example, a social media data set might represent "user likes comment" and "user likes post." If your graph model uses separate node types for *comment* and *post*, then the *user* node type has two types of "likes" edges to *comment* and *post*. You might name these edges *userLikesComment* and *userLikesPost*.

### Graph creation time

Up to once a week, a graph model might encounter a timeout if the graph creation or update takes longer than 20 minutes. The operation is marked as failed.

However, users can reinitiate graph creation or update.

### Total number of graph instances

Each Fabric Workspace can have up to 10 graph instances.

### Size of graph

Creating graphs with more than 500 million nodes and edges might result in unstable performance.

### Multitasking UI

The graph model might disappear or become empty when you switch between tabs or windows in the Fabric multitask UI. The team is actively working to resolve this known problem.

### Node property selection

When you add a node to your graph model, all columns from the source table are added as properties by default. You can remove properties by clicking the trashcan icon. Choosing a custom display label (for example, displaying a name instead of an ID) isn't yet supported.

## Querying

### Number of hops in multihop queries

Graph in Microsoft Fabric currently supports up to eight hops on variable length patterns.

### Size of results

Aggregation performance can be unstable when results exceed 128 MB in size.

The system currently truncates responses that are larger than 64 MB.

### Timeout

Queries time out if they take more than 20 minutes.

## GQL conformance

We support the following query features from the GQL standard:

- FILTER statement
- LET statement
- Basic linear statement chaining
- MATCH statement
- Simple RETURN statement
- Conjunction and disjunction
- Negation
- Local pattern predicates
- Pattern property specifications
- Simple anonymous patterns
- Simple named edge patterns
- Path patterns
- Case mapping
- STRING_JOIN function
- COALESCE function
- Property reference
- Variable reference
- Approximate numbers
- Booleans
- Character strings with escaping
- Exact numbers
- Arithmetic operators
- Boolean conjunction
- Boolean disjunction
- Boolean negation
- STARTS WITH predicate
- Value comparison
- Value equality
- BOOL value type
- EDGE reference value type
- INT value type
- INT64 value type
- FLOAT value type
- FLOAT64 value type
- NODE reference value type
- STRING value type
- UINT value type
- UINT64 value type
- Character string concatenation
- COUNT aggregate function
- MAX aggregate function
- MIN aggregate function
- OFFSET and LIMIT statements
- CREATE GRAPH statement
- Closed graph type support
- ORDER BY statement
- RETURN statement with GROUP BY
- RETURN statement with GROUP BY and slicing
- List indexing
- List value TRIM function
- Character string length function
- SIZE
- Collection membership
- Simple LIST value type
- Null type and empty type
- AVG aggregate function
- COLLECT_LIST aggregate function
- SUM aggregate function
- CURRENT_DATETIME function
- ZONED DATETIME value type
- UNION ALL statement
- Bounded graph pattern quantifiers
- Group variables
- Horizontal aggregation
- LABELS function
- Basic GQL status codes
- Formatting and parsing of GQL values
- Statements with DISTINCT
- Grouping
- TRAIL path mode
- Abbreviated edge patterns
- Path binding
- Simple TRIM function
- EDGES function
- NODES function
- Null
- Path length function
- CONTAINS predicate
- ENDS WITH predicate
- Null test predicate
- PATH value type

Conformance to GQL standards is still in progress for:

- Orderedness
- Return type
- Correct GQL status codes
- Unicode validation
- CALL inline procedure statement
- FOR statement with index
- OPTIONAL MATCH statement
- Regular FOR statement
- NEXT
- UNION DISTINCT statement
- Disconnected path patterns
- Joined path patterns
- Unbounded graph pattern quantifiers
- ACYCLIC path mode
- SIMPLE path mode
- ALL SHORTEST path search
- ANY path search
- ANY SHORTEST path search
- Substring functions
- Unicode normalization functions
- Data conversion
- Scalar subqueries
- PROPERTIES function
- RANGE function
- Path value constructor
- Record constructor
- Enhanced numeric functions
- Logarithmic functions
- Trigonometric functions
- Path value concatenation
- Boolean strict disjunction
- Label test predicate
- Normalized predicate
- Source/destination predicate
- Value type predicate
- INT32 value type
- FLOAT32 value type
- RECORD value type
- UINT32 value type
- DURATION
- ZONED TIME value type
- DATE value type
- Parameter passing
- Undirected edges
- GQL-preamble
- Non-local pattern predicates
- Undirected edge patterns
- IS DIRECTED predicate
- REGEXP_CONTAINS predicate
- Dynamic parameter specification
- Session user
- ANY value type
- BYTES value type
- DECIMAL value type
- LOCAL DATETIME value type
- LOCAL TIME value type
- CALL named procedure statement
- ORDER BY with explicit NULL ordering
- Tabular FOR statement
- EXCEPT ALL statement
- EXCEPT DISTINCT statement
- INTERSECT ALL statement
- INTERSECT DISTINCT statement
- OTHERWISE statement
- Wildcards
- Relaxed topological consistency
- PERCENTILE_CONT aggregate function
- PERCENTILE_DISC aggregate function
- PRODUCT aggregate function
- STDDEV_POP aggregate function
- STDDEV_SAMP aggregate function
- Byte string concatenation
- Byte string TRIM function
- Simple TRIM function with TRIM specification
- Multi-character TRIM function
- Byte string length function
- CARDINALITY
- ALL_DIFFERENT predicate
- IS DISTINCT predicate
- SAME predicate

## Related content

- [Graph in Microsoft Fabric overview](./overview.md)
- [What is a graph database?](./graph-database.md)
