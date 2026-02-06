---
title: GQL Graph Types
description: Complete reference for defining graph types in GQL for graph in Microsoft Fabric, including node types, edge types, constraints, and inheritance.
ms.topic: reference
ms.date: 11/18/2025
author: lorihollasch
ms.author: loriwhip
ms.reviewer: splantikow
---

# GQL graph types

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

A graph type describes your graph's structure by defining which nodes and edges can exist. Think of it like a blueprint or schema—it specifies the shape of nodes and edges in the graph in terms of their labels and properties. For edges (the connections between nodes), it also specifies which kinds of edges can connect which kinds of nodes. If you're familiar with relational databases, graph types work similarly to how ER diagrams describe tables and foreign key relationships. 

> [!IMPORTANT]
> This article exclusively uses the [social network example graph dataset](sample-datasets.md).

Graph types provide several key benefits:

- **Data validation**: Ensure your graph contains only valid node and edge combinations.
- **Query optimization**: Help the query engine understand your data structure for better performance.
- **Documentation**: Serve as a clear specification of your graph's structure for developers and analysts.

> [!NOTE] 
> This article introduces graph types conceptually and illustrates their definition using the syntax defined in the GQL standard. However, this syntax is currently not directly
> supported for graph in Microsoft Fabric.

Structurally, a graph type defines allowed node types and edge types of graphs of the graph type, as well as additional constraints that further restrict those graphs.

> [!NOTE]
> Graph types are defined by giving a set of node type, edge type, and constraint definitions. 
> Changing the order of these definitions does not change the graph type that is being defined.

## Define node types

A node type specifies what labels and property types your nodes can have. Here's how to specify a basic node type:

```gql
(:Organization => { 
  id :: UINT64 NOT NULL, 
  name :: STRING, 
  url :: STRING 
})
```

This example creates a node type that defines nodes with:

- The label `Organization`.
- An `id` property that holds unsigned integer values and can't be null.
- A `name` property that holds string values (can be null).
- A `url` property that holds string values (can be null).

The `::` operator specifies the data type for each property, while `NOT NULL` indicates that the property must always have a value.

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

### Node types with multiple labels

Nodes can have multiple labels to support inheritance and categorization. You can specify multiple labels for a node type, but one label (the "key label") *must* uniquely identify the node type
(If only one label is specified, this is taken to be the key label of the node type).

As an example, consider:

```gql
(:University => :Organization),

(:Company => :Organization)
```

Here, `University` and `Company` are the key labels of the two node types defined, while `Organization` is a secondary label shared by both types. Notice how the key label and secondary labels are separated by `=>` in each node type. This approach creates a type hierarchy where both universities and companies are types of organizations.

Since key labels identify node types, the properties of node types identified by secondary labels are automatically inherited when using this syntax.
Therefore the previous syntax can be understood to effectively define the following node types:

```gql
(:University => :Organization {
  id :: UINT64 NOT NULL, 
  name :: STRING, 
  url :: STRING 
}),

(:Company => :Organization {
  id :: UINT64 NOT NULL, 
  name :: STRING, 
  url :: STRING 
})
```

> [!NOTE]
> Key labels are essential when you're defining node type hierarchies. They help the system understand which node type you're referring to when multiple types share the same labels.

### Save time with inheritance shortcuts

Repeating labels and properties from parent node types gets tedious and error-prone. Graph in Microsoft Fabric provides the `+=` operator so you can specify only the extra (noninherited) labels and property types:

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

### Use abstract node types

You can define node types purely for building hierarchies, even when your graph doesn't contain concrete nodes of that type. Abstract node types are useful for creating conceptual groupings and shared property sets. For this purpose, you can define a node type as `ABSTRACT` in graph in Microsoft Fabric:

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

## Define edge types and families

An edge type defines the key label, property types, and endpoint node types for edges. In graph databases, edges represent connections between nodes. The edge definition tells the system what relationships are allowed in your graph:

```gql
(:Person)-[:knows { creationDate :: ZONED DATETIME }]->(:Person)
```

This edge type defines all edges with:

- The (key) label `knows`.
- A `creationDate` property that holds `ZONED DATETIME` values (timestamps together with a timezone offset).
- Source and destination endpoints that must both be `Person` nodes.

The arrow `->` indicates the direction of the edge, from source to destination. This directional information is crucial for understanding your graph's semantics.

Here are more examples of edge types:

```gql
(:Person)-[:studyAt { classYear :: UINT64 }]->(:University)
(:Person)-[:workAt { workFrom :: UINT64 }]->(:Company)
```

You only need to specify the key labels (`Person`, `University`, or `Company`) for endpoint node types—you don't need to repeat the complete node type definition. The system resolves these references to the full node type definitions.

### Graph edge type families

Graph edge key labels work differently from node key labels. You can have multiple edge types with the same key label in a graph type, as long as they have the same labels and property types. However, two edge types with the same key label must differ in at least one endpoint node type. We call a set of edge types with the same key label an *edge type family*.

This concept allows you to model the same type of relationship between different types of entities.

**Example:**

```gql
(:City)-[:isPartOf]->(:Country),
(:Country)-[:isPartOf]->(:Continent)
```

Both edge types use the `isPartOf` label, but they connect different types of nodes, forming an edge type family that represents hierarchical containment relationships.

### Use node subtyping in edge type definitions

Having to spell out each possible edge type can be a bit tedious. 
To simplify, it is also possible to define edge type families that align with the hierarchy of node types implied by their endpoints.

Example:

```gql
-- Node types
ABSTRACT (:Message { ... }),
(:Post => :Message { ... }),
(:Comment => :Message { ... }),

-- All edge types (x)-[:hasTag]->(:Tag) where x is at least a (:Message)
(<:Message)-[:hasTag]->(:Tag) 
```

This implicitly defines the following edge types:

```gql
(:Post)-[:hasTag]->(:Tag) 
(:Comment)-[:hasTag]->(:Tag) 
```

## Supported property types

When you're defining a property type, the property value type must be one that graph in Microsoft Fabric supports. Choosing the right data types is important for storage efficiency and query performance.
   
Here are the data types you can use for property values:

- `INT` (also: `INT64`)
- `UINT` (also: `UINT64`) 
- `STRING`
- `BOOL` (also: `BOOLEAN`)
- `DOUBLE` (also: `FLOAT64`, `FLOAT`)
- `T NOT NULL`, where `T` is any of the preceding data types.
- `LIST<T>` and `LIST<T> NOT NULL`, where `T` is any of the preceding data types.

For complete information about value types, see [GQL values and value types](gql-values-and-value-types.md).

> [!IMPORTANT]
> All property types with the same name that occur in a node type or edge type of a given graph type must specify the same property value type. 
> The only exception: they can differ in whether they include the null value.
> For example, according to this rule, a graph type with `(:A { id :: STRING }), (:B { id :: STRING NOT NULL})` would be valid, 
> while a graph type with `(:A { id :: STRING }), (:B { id :: INT})` would be invalid.

## Set up node key constraints

Node key constraints define how each node in your graph gets uniquely identified by one or more of its property values. Key constraints work like primary key constraints in relational databases and ensure data integrity. A node key constraint can target nodes across multiple node types, which let you define node keys for entire conceptual hierarchies.

Understanding key constraints is crucial because they:

- **Ensure uniqueness**: Prevent duplicate nodes based on your business logic.
- **Enable efficient lookups**: Allow the system to optimize queries that search for specific nodes.
- **Support data integration**: Provide a stable way to reference nodes across different data sources.

> [!IMPORTANT]
> For graph in Microsoft Fabric, exactly one key constraint must constrain every node.

### How node key constraints work

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
> - Must be declared as `NOT NULL` in the node types and edge types targeted by the key constraint

## Related content

- [GQL language guide](gql-language-guide.md)
- [Social network schema example](gql-schema-example.md)
- [GQL values and value types](gql-values-and-value-types.md)
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
