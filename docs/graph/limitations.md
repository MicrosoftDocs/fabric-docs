---
title: Limitations
description: Functional and performance limitations while the service is in preview.
ms.topic: reference
ms.date: 10/01/2025
author: wmwxwa
ms.author: wangwilliam
ms.reviewer: eur
ms.service: fabric
ms.subservice: graph
---
# Select limitations

While Graph in Microsoft Fabric is in preview, the service has certain limitations that users may not have expected. The following highlights some key limitations but does not constitute an exhaustive list. Please check back regularly for updates.

## Creating graph models

#### Data types

Graph in Microsoft Fabric currently only exposes support for the following date types:

- Boolean
- Double (which will be casted to float)
- Integer
- String
- ZonedDateTime

#### Data sources

- OneLake parquet files are the only data sources currently supported.
- Power BI semantic model support is under development.
- LakeHouse with schema enabled is not supported.

#### Edge creation

During graph modeling, different edge types should be given different names.

For example, a social media data set might represent "user likes comment" and "user likes post." If your graph model uses separate node types for *comment* and *post*, then the *user* node type should have two types of "likes" edges to *comment* and *post*; you might name these edges *userLikesComment* and *userLikesPost*.

#### Graph creation time

Up to once a week, a graph model may encounter a timeout if the graph creation or update takes longer than 20 minutes. Such an operation would be marked as failed. However, users may re-initiate graph creation or update.

#### Graph instance total number

Up to 10 graph instances are allowed per Fabric Workspace.

#### Size of graph

Creating graphs with more than 500 million nodes and edges may result in unstable performance.

## Querying

#### Number of hops in multi-hop queries

Graph in Microsoft Fabric currently supports up to 8 hops on variable length patterns.

#### Size of results

Aggregation performance may be unstable when results exceed 128 MB in size.
Responses that are larger than 64 MB are currently truncated.

#### Timeout

Queries taking more than 20 minutes will timeout.

## GQL conformance

As of Oct 1, 2025, we support GQL standards on the following:

-	Orderedness
-	Return type
-	Correct GQL status codes
-	Unicode validation
-	CALL inline procedure statement
-	FOR statement with index
-	OPTIONAL MATCH statement
-	Regular FOR statement
-	NEXT
-	UNION DISTINCT statement
-	Disconnected path patterns
-	Joined path patterns
-	Unbounded graph pattern quantifiers
-	ACYCLIC path mode
-	SIMPLE path mode
-	ALL SHORTEST path search
-	ANY path search
-	ANY SHORTEST path search
-	Substring functions
-	Unicode normalization functions
-	Data conversion
-	Scalar subqueries
-	PROPERTIES function
-	RANGE function
-	Path value constructor
-	Record constructor
-	Enhanced numeric functions
-	Logarithmic functions
-	Trigonometric functions
-	Path value concatenation
-	Boolean strict disjunction
-	Label test predicate
-	Normalized predicate
-	Source/destination predicate
-	Value type predicate
-	INT32 value type
-	FLOAT32 value type
-	RECORD value type
-	UINT32 value type
-	DURATION
-	ZONED TIME value type
-	DATE value type
-	Parameter passing
-	Undirected edges
-	GQL-preamble
-	Non-local pattern predicates
-	Undirected edge patterns
-	IS DIRECTED predicate
-	REGEXP_CONTAINS predicate
-	Dynamic parameter specification
-	Session user
-	ANY value type
-	BYTES value type
-	DECIMAL value type
-	LOCAL DATETIME value type
-	LOCAL TIME value type
-	CALL named procedure statement
-	ORDER BY with explict NULL ordering
-	Tabular FOR statement
-	EXCEPT ALL statement
-	EXCEPT DISTINCT statement
-	INTERSECT ALL statement
-	INTERSECT DISTINCT statement
-	OTHERWISE statement
-	Wildcards
-	Relaxed topological consistency
-	PERCENTILE_CONT agg. function
-	PERCENTILE_DISC agg. function.
-	PRODUCT agg. function
-	STDDEV_POP agg. function
-	STDDEV_SAMP agg. function
-	Byte string concatenation
-	Byte string TRIM function
-	Simple TRIM function with TRIM specification
-	Multi-character TRIM function
-	Byte string length function
-	CARDINALITY
-	ALL_DIFFERENT predicate
-	IS DISTINCT predicate
-	SAME predicate


We are still working on conformance to GQL standards for the following:

-	Orderedness
-	Return type
-	Correct GQL status codes
-	Unicode validation
-	CALL inline procedure statement
-	FOR statement with index
-	OPTIONAL MATCH statement
-	Regular FOR statement
-	NEXT
-	UNION DISTINCT statement
-	Disconnected path patterns
-	Joined path patterns
-	Unbounded graph pattern quantifiers
-	ACYCLIC path mode
-	SIMPLE path mode
-	ALL SHORTEST path search
-	ANY path search
-	ANY SHORTEST path search
-	Substring functions
-	Unicode normalization functions
-	Data conversion
-	Scalar subqueries
-	PROPERTIES function
-	RANGE function
-	Path value constructor
-	Record constructor
-	Enhanced numeric functions
-	Logarithmic functions
-	Trigonometric functions
-	Path value concatenation
-	Boolean strict disjunction
-	Label test predicate
-	Normalized predicate
-	Source/destination predicate
-	Value type predicate
-	INT32 value type
-	FLOAT32 value type
-	RECORD value type
-	UINT32 value type
-	DURATION
-	ZONED TIME value type
-	DATE value type
-	Parameter passing
-	Undirected edges
-	GQL-preamble
-	Non-local pattern predicates
-	Undirected edge patterns
-	IS DIRECTED predicate
-	REGEXP_CONTAINS predicate
-	Dynamic parameter specification
-	Session user
-	ANY value type
-	BYTES value type
-	DECIMAL value type
-	LOCAL DATETIME value type
-	LOCAL TIME value type
-	CALL named procedure statement
-	ORDER BY with explict NULL ordering
-	Tabular FOR statement
-	EXCEPT ALL statement
-	EXCEPT DISTINCT statement
-	INTERSECT ALL statement
-	INTERSECT DISTINCT statement
-	OTHERWISE statement
-	Wildcards
-	Relaxed topological consistency
-	PERCENTILE_CONT agg. function
-	PERCENTILE_DISC agg. function.
-	PRODUCT agg. function
-	STDDEV_POP agg. function
-	STDDEV_SAMP agg. function
-	Byte string concatenation
-	Byte string TRIM function
-	Simple TRIM function with TRIM specification
-	Multi-character TRIM function
-	Byte string length function
-	CARDINALITY
-	ALL_DIFFERENT predicate
-	IS DISTINCT predicate
-	SAME predicate



