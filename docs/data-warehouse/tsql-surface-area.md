---
title: T-SQL surface area
description: T-SQL surface area of the SQL analytics endpoint and Warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: cynotebo
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: T-SQL Surface area # This article's title should not change. If so, contact engineering.
---
# T-SQL surface area in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article covers the T-SQL language syntax capabilities of [!INCLUDE [product-name](../includes/product-name.md)], when querying the [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

## T-SQL surface area

- Creating, altering, and dropping tables, and insert, update, and delete are only supported in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], not in the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse.
- You can create your own T-SQL views, functions, and procedures on top of the tables that reference your Delta Lake data in the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse.
- For more about CREATE/DROP TABLE support, see [Tables](tables.md).
- For more about data types, see [Data types](data-types.md).

### Limitations

At this time, the following list of commands is NOT currently supported. Don't try to use these commands. Even though they might appear to succeed, they could cause issues to your warehouse.

- ALTER TABLE ADD/ALTER/DROP COLUMN
- BULK LOAD
- CREATE ROLE
- CREATE USER
- Hints
- Identity Columns
- Manually created multi-column stats
- MATERIALIZED VIEWS
- MERGE
- OPENROWSET
- PREDICT
- Queries targeting system and user tables
- Recursive queries
- Result Set Caching
- Schema and Table names can't contain / or \
- SELECT - FOR
- SET ROWCOUNT
- SET TRANSACTION ISOLATION LEVEL
- `sp_showspaceused`
- Temp Tables
- Triggers
- TRUNCATE

## Related content

- [Query insights in Fabric data warehousing](query-insights.md)
- [What is data warehousing in Microsoft Fabric?](data-warehousing.md)
- [Data types in Microsoft Fabric](data-types.md)
- [Limitations in Microsoft Fabric](limitations.md)
