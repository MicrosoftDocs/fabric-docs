---
title: Current Limitations of graph in Microsoft Fabric
description: Understand the current limitations of graph in Microsoft Fabric, including data types, graph size, query constraints, and GQL language support.
ms.topic: reference
ms.date: 05/04/2026
ms.reviewer: wangwilliam
---

# Current limitations of graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

While graph in Microsoft Fabric is in preview, the service has certain functional and performance limitations. This article highlights some key limitations but isn't an exhaustive list. Check back regularly for updates.

For help with common problems, see [Troubleshooting graph](troubleshooting-and-faq.md).

## Creating graph models

### Data sources

- OneLake parquet and CSV files are the only data sources currently supported.
- Support for Power BI semantic models as data sources is under development.
- Support for column- and row-level [OneLake security](../onelake/security/get-started-security.md#onelake-security-preview) is under development.
- Support for [Lakehouse with schema](../data-engineering/lakehouse-schemas.md) is under development.

### Data types

Graph currently supports the following data types:

- Boolean (values are `true` and `false`)
- Double (values are 64-bit floating point numbers)
- Integer (values are 64-bit signed integers)
- String (values are Unicode character strings)
- Zoned DateTime (values are timestamps together with a timeshift for the time zone)
- Duration (values are ISO 8601 duration intervals)

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

The graph model might disappear or become empty when you switch between tabs or windows in the Fabric multitask UI. The product team is actively working to resolve this known problem.

### Node property selection

When you add a node type to your graph model, all columns from the source table are added as properties by default. You can remove properties by selecting the trashcan icon. Edge types work differently - they start with no properties, and you add only the ones you need. Choosing a custom display label (for example, displaying a name instead of an ID) isn't yet supported.

## Querying

### Number of hops in multihop queries

Graph currently supports up to eight hops on variable length patterns.

### Size of results

Aggregation performance can be unstable when results exceed 128 MB in size.

The system currently truncates responses that are larger than 64 MB.

### Timeout

Queries time out if they take more than 20 minutes.

## Data export and visualization

- Exporting graph query results or graph structures isn't currently supported.
- Connecting Power BI directly to a graph for visualization scenarios isn't currently supported.

## GQL conformance

For a detailed mapping of supported GQL features against the ISO/IEC 39075:2024 standard, including minimum conformance, optional features by group, and features not yet supported, see [GQL standard conformance](gql-conformance.md).

Conformance to GQL standards is still in progress for:

- Correct GQL status codes
- FOR statement with index
- NEXT
- UNION DISTINCT statement
- Unbounded graph pattern quantifiers
- ALL SHORTEST path search
- ANY path search
- ANY SHORTEST path search
- Data conversion
- Scalar subqueries
- PROPERTIES function
- RANGE function
- Enhanced numeric functions
- Logarithmic functions
- Trigonometric functions
- Path value concatenation
- Label test predicate
- Normalized predicate
- Source/destination predicate
- INT32 value type
- FLOAT32 value type
- Closed RECORD value type
- UINT32 value type
- ZONED TIME value type
- DATE value type
- Parameter passing
- Undirected edges
- GQL-preamble
- Nonlocal pattern predicates
- IS DIRECTED predicate
- REGEXP_CONTAINS predicate
- Dynamic parameter specification
- Session user
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
- Multicharacter TRIM function
- Byte string length function
- CARDINALITY
- ALL_DIFFERENT predicate
- IS DISTINCT predicate
- SAME predicate

## Related content

- [graph overview](./overview.md)
- [What is a graph database?](./graph-database.md)
- [Troubleshooting and FAQ for graph](troubleshooting-and-faq.md)
- [Optimize GQL query performance in graph](gql-query-performance.md)
