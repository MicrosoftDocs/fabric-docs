---
title: Limitations
description: Functional and performance limitations while the service is in preview.
ms.topic: reference
ms.date: 10/01/2025
author: wmwxwa
ms.author: wangwilliam
ms.reviewer: eur
ms.service: fabric
#ms.subservice: graph
---
# Limitations

## Exposed data types

Graph in Microsoft Fabric currently only exposes support for the following date types:

- Boolean
- Integer
- Float
- String
- ZonedDateTime

## Limit on number of graph instances

Up to 10 graph instances are allowed per Fabric Workspace.

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



