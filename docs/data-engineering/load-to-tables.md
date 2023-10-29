---
title: Lakehouse Load to Delta Lake tables
description: Learn all about the Lakehouse Load to Tables feature.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: how-to
ms.custom: build-2023
ms.date: 05/23/2023
ms.search.form: lakehouse load to delta lake tables
---

# Load to Delta Lake tables

[!INCLUDE [product-name](../includes/product-name.md)] [Lakehouse](lakehouse-overview.md) provides a feature to efficiently load common file types to an optimized Delta table ready for analytics. This guide describes the __Load to Tables__ feature and its capabilities.

Summary of __Load to Tables__ capabilities:

* Load single file into a new or existing table.
* Tables are loaded using the Delta Lake table format with V-Order optimization.

## Supported file types

__Load to Tables__ supports PARQUET and CSV file types. File extension case doesn't matter.

## Table and column name validation and rules

The following standard applies to the Load to Delta experience:

* Table names can only contain alphanumeric characters and underscores. It may contain any English letter, upper or lower case, and underbar (_), with length up to 256 characters. No dashes (__```-```__) or space characters are allowed.
* Text files without column headers are replaced with standard ```col#``` notation as the table column names.
* Column names are validated during the load action. The Load to Delta algorithm replaces forbidden values with underbar (```_```). If no proper column name is achieved during validation, the load action fails. Column names allow any English letter, upper or lower case, underbar (_), and characters in other language such as Chinese in UTF, length up to 32 characters.

## File load to Delta table

A file selected in the Lakehouse ```Files```section to be loaded into a new Delta table in the ```Tables``` section. If the table already exists, it is dropped and then created.

   :::image type="content" source="media\load-to-tables\load-from-file.png" alt-text="Screenshot showing the load to tables dialog box with filled table name." lightbox="media\load-to-tables\load-from-file.png":::

## Next steps

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [CSV file upload to Delta for Power BI reporting](get-started-csv-upload.md)
