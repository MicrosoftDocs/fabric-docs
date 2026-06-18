---
title: Current Limitations of graph in Microsoft Fabric
description: Understand the current limitations of graph in Microsoft Fabric, including data types, graph size, query constraints, GQL language support, and catalog and runtime reference.
ms.topic: reference
ms.date: 06/9/2026
ms.reviewer: wangwilliam
---

# Current limitations of graph in Microsoft Fabric

Graph in Microsoft Fabric has certain functional and performance limitations. This article highlights some key limitations but isn't an exhaustive list. Check back regularly for updates.

For help with common problems, see [Troubleshooting graph](troubleshooting-and-faq.md).

## Creating graph models

### Data sources

- OneLake parquet and CSV files are the only data sources currently supported.
- Support for Power BI semantic models as data sources is under development.
- Support for column- and row-level [OneLake security](../onelake/security/get-started-security.md#onelake-security) is under development.

### Data types

Graph currently supports the following data types:

- Boolean (values are `true` and `false`)
- Double (values are 64-bit floating point numbers)
- Integer (values are 64-bit signed integers)
- String (values are Unicode character strings)
- Zoned DateTime (values are timestamps together with a time shift for the time zone)
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

Creating graphs with more than 1 billion nodes and edges might result in unstable performance.

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


## Catalog 

>[!NOTE]
> Graph names and constraint names are automatically generated in `GraphBackend` and can't be specified in the UI or in the JSON schema.

| Catalog area | Current limit / behavior | Enforcement status | Recommendation |
|----|----|----|----|
| Catalog ID basis | Catalog element IDs are signed int32 wrappers where 0 is invalid, so each ID family has at most `std::numeric_limits<int32_t>::max() - 1` positive nonzero IDs (2 billion). | Implementation ceiling, not a recommended GA quota |  |
| Graph schemas | One graph type per catalog; catalog ID comments assume the catalog contains only one graph type. | Design assumption; not exposed as a multi-schema quota |  |
| Graph definition serialized size | No explicit byte-size cap on `GraphProto`; it contains repeated node types, edge types, labels, property names, and constraints. | Not enforced below protobuf/gRPC/memory; catalog object-count checks apply after graph construction |  |
| Graph name | Must be nonempty; no explicit max byte length or character allowed list. | Only nonempty is enforced | 128 characters |
| Node types | Max 2 billion node types. | Enforced by `CatalogGraphType::Validate` via positive nonzero int32 ID space | 64k |
| Edge types | Max 2 billion edge types. | Enforced by `CatalogGraphType::Validate` via positive nonzero int32 ID space | 64k |
| Unique node labels across all node types | Max 2 billion unique node labels. | Enforced by `CatalogGraphType::Validate`; duplicate labels within one type are rejected | Derived |
| Unique edge labels across all edge types | Max 2 billion unique edge labels. | Enforced by `CatalogGraphType::Validate`; duplicate labels within one type are rejected | Derived |
| Unique property names across all node and edge types | Max 2 billion unique property names. | Enforced by `CatalogGraphType::Validate`; property names can't be empty and duplicates within one type are rejected | 64k \* 10 |
| Node constraint definitions | Max 2 billion node key constraint definitions. | Enforced by `CatalogGraphType::Validate` via positive nonzero int32 ID space | \<= node types |
| Edge constraint definitions | Max 2 billion edge key constraint definitions, but edge key constraints are disabled by default unless `allow_edge_key_constraints` is true. | Count enforced if present; feature gate rejects edge constraints by default | \<= edge types |
| Property name characters / length | Not explicitly enforced beyond nonempty property names and parser grammar; no catalog max byte length or character allowed list. |  | 128 chars |
| Label characters / length | Not explicitly enforced beyond parser grammar and nonempty labels in constraints; no catalog max byte length or character allowed list. |  | 128 chars |
| Constraint name characters / length | Constraint names must be nonempty; no explicit max byte length or character allowed list. | Duplicate/matching constraint validation is separate | 128 chars |
| Properties per node type | No explicit maximum number of properties on a node type; duplicate property names are rejected. | Correctness validation only | 256 |
| Properties per edge type | No explicit maximum number of properties on an edge type; duplicate property names are rejected. | Correctness validation only | 256 |
| Labels per node type | No explicit maximum number of labels on a node type; duplicate labels are rejected. | Correctness validation only | 64 |
| Labels per edge type | No explicit maximum number of labels on an edge type; duplicate labels are rejected; edge added labels are rejected. | Correctness validation only | 64 |
| Key properties per constraint | No explicit maximum number of key properties in node or edge key constraints; individual property names can't be empty. | Correctness validation only | 16 |

## Runtime values 

| Runtime value type | Backing representation / range | Explicit Value-level cap? | Recommended |
|----|----|----|----|
| BOOL | bool; values true/false | Yes, fixed domain |  |
| INT64 | signed 64-bit integer | Yes, fixed-width |  |
| UINT64 | unsigned 64-bit integer | Yes, fixed-width |  |
| DOUBLE | C++/protobuf double / Arrow `DoubleScalar` (IEEE-754 `binary64`); non-finite values aren't rejected by `Value::FromProto` | No finite-only check |  |
| DECIMAL128 | Arrow `Decimal128Scalar`; runtime validation allows precision 1..38 and scale 0..precision; up to 38 decimal digits | Yes for checked construction/from proto |  |
| STRING | `std::string`; `ValueProto.string_value` | No Value cap | 4 MB |
| BYTES | `std::string` used as byte container; `ValueProto.bytes_value` | No Value cap | String limit |
| VERTEX_ID | uint64 wrapped by `VertexId`; generated IDs use 48-bit shard-local ID and reserve 0 as invalid | Raw proto accepts any uint64; generated IDs are constrained |  |
| EDGE_ID | uint64 wrapped by `EdgeId`; generated IDs use 48-bit shard-local ID and reserve 0 as invalid | Raw proto accepts any uint64; generated IDs are constrained |  |
| ZONED_DATE_TIME |`absl::Time` plus timezone; serialized as int64 milliseconds since Unix epoch plus int32 UTC offset seconds. Millisecond range is [-9,223,372,036,854,775,808, 9,223,372,036,854,775,807], documented as UTC instants from -292275055-05-16T16:47:04.192+00:00 to 292278994-08-17T07:12:55.807+00:00. | Time range documented; offset is an int32 and isn't range-checked in `Value::FromProto` |  |
| DURATION | `absl::Duration`; serialized as int64 milliseconds. Serialized min/max are -9,223,372,036,854,775,808 ms to 9,223,372,036,854,775,807 ms (about +/-292,277,024.6 years). ISO parser is stricter: +/-9,223,372,035 seconds (about +/-292.277 years). | Proto path accepts the full int64 millisecond field; parser has a narrower explicit cap |  |
| NULL / typed null | `std::monostate` or typed-null wrapper | |  |
| Typed lists | `std::vector<std::optional<T>>`; `LIST_NULL` stores a `size_t`; `LIST_ANY` stores `std::vector<Value>` | No default Value cap | |
| Nested lists | General nested lists aren't supported in the proto contract; runtime has special nested `LIST_INT64` handling | No default depth/length quota | |
| PATH | Alternating vertex/edge/vertex uint64 IDs in a vector; valid path shape has odd element count | No path-length quota |  |
| RECORD | `absl::flat_hash_map<std::string, Value>` / protobuf map | No field-count, key-length, or nesting-depth quota |  |
| ANY | `Value::DataType()` isn't expected to return `TYPE_ANY`; dynamic values are carried as concrete Values, especially inside `LIST_ANY` or Arrow Any extension storage | No size/depth quota |  |

## Other limits

- Identifiers can't start with underscore.
- Integers literals are treated as signed integers by default.
- Returning ANY and Record types aren't supported. Temporary solution is to jsonize them via `TO_JSON_STRING`.
- Max String property length is 65535. Data past 64 KiB is unreachable to the deserializer; the full buffer is still written to RocksDB.
- Max number of elements in `List<T>` property is 65535. A 70,000-element INT64 LIST deserializes as 4,464 elements.
- Max query response size in bytes is 64 MB.

## Related content

- [Graph in Microsoft Fabric overview](./overview.md)
- [What is a graph database?](./graph-database.md)
- [Troubleshooting and FAQ for graph](troubleshooting-and-faq.md)
- [Optimize GQL query performance in graph](gql-query-performance.md)
