---
title: Temp tables in Fabric Data Warehouse
description: Learn how to create and use temporary tables in Fabric Data Warehouse.
ms.reviewer: xiaoyul
ms.date: 06/23/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Temp tables in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

You can create session-scoped temporary (`#temp`) tables in Fabric Data Warehouse.

These tables exist only within the session in which you create them and last for the duration of that session. Other users or sessions can't see these tables. The system automatically drops these tables when the session ends or when you drop the #temp table. All users can access these tables without needing specific item-level permission.

The syntax for data manipulation and definition is the same as user tables in Fabric Data Warehouse, but you add the prefix `#` to the table name. For more information, see [CREATE TABLE Temporary tables](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true#temporary-tables).

## Non-distributed and distributed temp tables

You can create two types of #temp tables based on specific use cases: non-distributed and distributed.

- A non-distributed #temp table (MDF-backed) is the default type. The syntax for creating and using non-distributed #temp tables in Fabric Data Warehouse is similar to user tables, but you need to prefix the temp table name with `#`.

    ```sql
     CREATE TABLE #table_name (
       Col1 data_type1,
       Col2 data_type2
     );
    ```

- You can create distributed temp tables (Parquet-backed) by using the `DISTRIBUTION=ROUND_ROBIN` keyword:

    ```sql
    CREATE TABLE #table_name (
    Col1 data_type1,
    Col2 data_type2
    ) WITH (DISTRIBUTION=ROUND_ROBIN);
    ```

In the previous script, `data_type1` and `data_type2` are placeholders for supported [Data types in Fabric Data Warehouse](data-types.md).

Use distributed temp tables, as they align with normal user tables. They have unlimited storage, data type support, and T-SQL operations.

## Limitations

- [Time travel](time-travel.md) query hints don't affect temp tables and these tables always return the latest data in the table. For example, the `FOR TIMESTAMP AS OF` query hint doesn't affect session-scoped temp tables, like `#temp_table`.
- You can alter distributed temp tables by using `ALTER TABLE`, but you can't alter MDF-backed temp tables. 
- Global temporary tables that begin with `##` aren't supported.

## Related content

- [Tables in Fabric Data Warehouse](tables.md)
- [Data types in Fabric Data Warehouse](data-types.md)
