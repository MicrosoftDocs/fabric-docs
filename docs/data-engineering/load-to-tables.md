---
title: Lakehouse Load to Delta Lake tables
description: Learn all about the Lakehouse Load to Delta tables feature.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: lakehouse delta lake tables
---

# Load to Delta Lake tables

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] [Lakehouse](lakehouse-overview.md) provides an feature to efficiently load common file types to an optimized Delta table ready for analytics. This guide describes in detail the __Load to Delta__ feature, its capabilities and common usage patterns.

Summary of __Load to Delta__ capabilities:

* Load single file into new or existing table
* Load an entire folder as a single new or existing table
* Append or overwrite load modes for existing tables

### Load to Delta usage examples

-> table with good ways to use the feature

## Supported file types

__Load to Delta__ supports PARQUET, CSV, TSV and TXT file types. File extension case does not matter. For textual files (CSV, TSV and TXT), header and separator may be specified before the load.

## Table and column name validation and rules

The following standard applies to the Load to Delta experience:

* All tables are created with lower case naming
* The following list of special characters are not allowed
  * Table name:
  * Column names: 

* Table names are validated in the user interface experience, automatically formatting based on the allowe character list.
* Text files with no headers will be loaded with standard ```col#``` notation.
* Column names are validated during the load action. The Load to Delta algorithm will replace forbidden values with ```_``` (underline). If no proper column name is achieved, the load action will fail.

## Multiple load modes

__Load to Delta__ enables overwrite or append modes on existing tables. __Overwrite__ mode will drop and recreate the target table. 

__Append__ mode will add data to the existing table. This mode can be used creatively, to add data to a table from different file types, for example. The destination table schema is schema evolution enabled, so its possible to load different files types with different schemas to the same table if that makes sense to the analysis scenario at hand.

The user interface will dynamically detect if the target table exists and enable or disable load mode chooser. Default mode for all loads is __append__.

## File load to Delta table

In this mode, a file selected in the Lakehouse ```Files```section will be loaded to a table.

## Folder load to Delta table

In this mode, a folder of similar types, selected in the Lakehouse ```Files```section will be loaded to a table.

## File and subfolder scanning rules

## Next steps

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [CSV file upload to Delta for Power BI reporting](get-started-csv-upload.md)
