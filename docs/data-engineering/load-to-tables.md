---
title: Lakehouse Load to Delta Lake tables
description: Learn all about the Lakehouse Load to Tables feature.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: lakehouse load to delta lake tables
---

# Load to Delta Lake tables

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] [Lakehouse](lakehouse-overview.md) provides an feature to efficiently load common file types to an optimized Delta table ready for analytics. This guide describes the __Load to Tables__ feature and its capabilities.

Summary of __Load to Tables__ capabilities:

* Load single file into new or existing table
* Tables are loaded into Delta Lake table format with V-Order optimization.

## Supported file types

__Load to Tables__ supports PARQUET and CSV file types. File extension case does not matter.

## Table and column name validation and rules

The following standard applies to the Load to Delta experience:

* Table names are validated in the user interface experience, automatically formatting based on the allowed character list. Name can only contain alphanumeric characters and underscores. Any english letter, upper or lower case, and underbar (_), with length up to 256 characters. No dashes (__```-```__) or space characters.
* Text files with no headers will be loaded with standard ```col#``` notation.
* Column names are validated during the load action. The Load to Delta algorithm will replace forbidden values with ```_``` (underline). If no proper column name is achieved, the load action will fail. Column names allow any english letter, upper or lower case, underbar (_), and characters in other language such as Chinese in UTF, length up to 32 characters.

## File load to Delta table

In this mode, a file selected in the Lakehouse ```Files```section will be loaded to a new Delta table in the ```Tables``` section. If the table already exists, it will be dropped and then created.

   :::image type="content" source="media\load-to-tables\load-from-file.png" alt-text="Load to tables dialog box with filled table name" lightbox="media\load-to-tables\load-from-file.png":::

## Next steps

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [CSV file upload to Delta for Power BI reporting](get-started-csv-upload.md)
