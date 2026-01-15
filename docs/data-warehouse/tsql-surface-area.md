---
title: T-SQL Surface Area in Fabric Data Warehouse
description: T-SQL surface area of the SQL analytics endpoint and warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: cynotebo, jovanpop, twinklecyril
ms.date: 09/08/2025
ms.topic: concept-article
ms.search.form: T-SQL Surface area # This article's title should not change. If so, contact engineering.
---
# T-SQL surface area in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article covers the T-SQL language syntax capabilities of [!INCLUDE [product-name](../includes/product-name.md)], when querying the [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

For SQL database in Fabric, see [Limitations in SQL database (preview)](../database/sql/limitations.md).

> [!NOTE]
> For more information on upcoming feature development for Fabric Data Warehouse, see the [Fabric Data Warehouse release plan](https://aka.ms/fabricrm).

## T-SQL surface area

- Creating, altering, and dropping tables, and insert, update, and delete are only supported in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], not in the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse.
- You can create your own T-SQL views, functions, and procedures on top of the tables that reference your Delta Lake data in the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse.
- For more about CREATE/DROP TABLE support, see [Tables](tables.md).
- Fabric Warehouse and SQL analytics endpoint both support *standard*, *sequential*, and *nested* CTEs. While CTEs are generally available in Microsoft Fabric, nested CTEs are currently a preview feature. For more information, see [Nested Common Table Expression (CTE) in Fabric data warehousing (Transact-SQL)](/sql/t-sql/queries/nested-common-table-expression?view=fabric&preserve-view=true).
- For more about data types, see [Data types](data-types.md).
- [TRUNCATE TABLE](/sql/t-sql/statements/truncate-table-transact-sql?view=fabric&preserve-view=true) is supported in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].
- To change the name of the column in a user table in [!INCLUDE [fabric-dw](includes/fabric-dw.md)], use the `sp_rename` stored procedure. 
- A subset of query and join hints are supported. For more information, see [Hints (Transact-SQL)](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true).
- Session-scoped distributed #temp tables are supported in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].
- `MERGE` syntax is supported as a preview feature. For more information, see [MERGE T-SQL syntax](/sql/t-sql/statements/merge-transact-sql?view=fabric&preserve-view=true).

### Limitations

At this time, the following list of commands is NOT currently supported. Don't try to use these commands. Even though they might appear to succeed, they could cause issues to your warehouse.

- `ALTER TABLE ADD`/`ALTER`
    - Currently, only the following subset of `ALTER TABLE` operations in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] are supported:
      - ADD nullable columns of supported column data types.
      - `DROP COLUMN`
      - ADD or DROP PRIMARY KEY, UNIQUE, and FOREIGN_KEY column constraints, but only if the NOT ENFORCED option has been specified. All other ALTER TABLE operations are blocked.
      - There are limitations with adding table constraints or columns when using [Source Control with Warehouse](source-control.md#limitations-in-source-control).
- `BULK LOAD`
- `CREATE USER`
- `FOR JSON` must be the last operator in the query, and so is not allowed inside subqueries
- Manually created multi-column stats
- Materialized views
- `PREDICT`
- Queries targeting system and user tables
- Recursive queries
- Schema and table names can't contain `/` or `\`
- `SELECT` - `FOR XML`
- `SET ROWCOUNT`
- `SET TRANSACTION ISOLATION LEVEL`
- `sp_showspaceused`
- Triggers

## Related content

- [Query insights in Fabric data warehousing](query-insights.md)
- [What is data warehousing in Microsoft Fabric?](data-warehousing.md)
- [Data types in Microsoft Fabric](data-types.md)
- [Limitations of Microsoft Fabric Data Warehouse](limitations.md)
