---
title: SemPy semantic modeling
description: Learn about semantic modeling in SemPy.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: conceptual
ms.date: 02/10/2023
---

# SemPy semantic modeling

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this article, you'll learn how SemPy uses data semantics to simplify data science analytics during the data exploration and transformation stages.

## Why is SemPy focused on semantics?

Data scientists and business analysts spend much time trying to understand, clean and transform their data before they can produce valuable and reliable insights. By exploiting data semantics, SemPy can simplify these tedious tasks, such as automatically transforming data while joining heterogeneous datasets, handling underlying schema changes, enforcing context-specific constraints and identifying data that violate them, and enriching the data with new knowledge. SemPy users can register semantics of the data and share them with other users as part of code, allowing faster collaboration across teams operating on the same datasets and increasing productivity. To summarize, SemPy explores data semantics to simplify data science analytics across different stages of the process.

## What is the difference between the key concepts in SemPy - SType, ColumnSType, CompoundSType?

SType (short for "Semantic Type") is a base semantic unit of SemPy. In the most basic case, it's atomic and there's a small collection of built-in atomic types in SemPy:

- Address,
- Barcode,
- Boolean,
- Categorical,
- City,
- Continent,
- Country,
- Event,
- Id,
- Int,
- Latitude,
- Longitude,
- Numeric,
- Place,
- PostalCode,
- StateOrProvince,
- Str,
- Time,
- DefaultIndex.

However, more often [SType](sempy-glossary.md#stype) represents some structure. When it refers to a column, then the derived type called [ColumnSType](sempy-glossary.md#columnstype) (short for "Column Semantic Type") is used. For a table, or an entity, we designed as [CompoundSType](sempy-glossary.md#compoundstype) (short for "Compound Semantic Type"). Example of using these concepts together:

```
CompoundSType: Fact   {
			'Customer Key': ColumnSType(SemPy.Int), 
			'Product Key': ColumnSType(SemPy.Str), 
			'Revenue': ColumnSType(SemPy.Numeric), 
			'Material Costs': ColumnSType(SemPy.Numeric),  
			'Travel Expenses': ColumnSType(SemPy.Numeric), 
		}
```

You may also check out [Column groups notebook](https://enyaprod.azurewebsites.net/notebooks/column_groups.html) for a better understanding of [SType](sempy-glossary.md#stype), [ColumnSType](sempy-glossary.md#columnstype) and [CompoundSType](sempy-glossary.md#compoundstype) concepts and implementation.

## How do I create semantic model for a dataset?

Semantics are captured on two levels: within a table (in semantic data frame) and within a dataset, which may contain one or more tables. For the latter, semantics include relationships between different tables within the dataset and definitions of semantic data types. For the former, semantics include mapping of data types to tables and columns and hierarchical structure of data frames (for example, nested frames created as a result of merging two or more frames). Type definitions and relationships are preserved in a semantic metadata store called [Knowledge Base](sempy-glossary.md#knowledge-base).
