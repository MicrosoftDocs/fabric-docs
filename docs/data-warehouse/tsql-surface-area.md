---
title: T-SQL surface area
description: T-SQL surface area of the SQL Endpoint and Synapse Data Warehouse in Microsoft Fabric.
author: cynotebo
ms.author: cynotebo
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: conceptual
ms.search.form: SQL Endpoint Overview, Warehouse overview # This article's title should not change. If so, contact engineering.
---
# T-SQL surface area in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

## T-SQL surface area

- Creating, altering, and dropping tables, and insert, update, and delete are only supported in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], not in the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse.
- You can create your own T-SQL views, functions, and procedures on top of the tables that reference your Delta Lake data in the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse.
- For more about CREATE/DROP TABLE support, see [Tables](tables.md).
- For more about data types, see [Data types](data-types.md).

### T-SQL command support

At this time, the following list of commands is NOT currently supported. Don't try to use these commands because even though they may appear to succeed, they could cause corruption to your warehouse.

- ALTER TABLE ADD/ALTER/DROP COLUMN
- BULK LOAD
- CREATE ROLE
- CREATE SECURITY POLICY - Row Level Security (RLS)
- CREATE USER
- GRANT/DENY/REVOKE
- Hints
- Identity Columns
- Manually created multi-column stats
- MASK and UNMASK (Dynamic Data Masking)
- MATERIALIZED VIEWS
- MERGE
- OPENROWSET
- PREDICT
- Queries targeting system and user tables
- Recursive queries
- Result Set Caching
- Schema and Table names can't contain / or \
- SELECT - FOR (except JSON)
- SET ROWCOUNT
- SET TRANSACTION ISOLATION LEVEL
- `sp_showmemo_xml`
- `sp_showspaceused`
- `sp_rename`
- Temp Tables
- Triggers
- TRUNCATE

## Next steps

- [Data types in Microsoft Fabric](data-types.md)
- [Limitations and known issues in Microsoft Fabric](limitations.md)