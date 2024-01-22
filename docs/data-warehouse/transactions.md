---
title: Transactions in Warehouse tables
description: Learn how to use transactions and how to insert and modify data in Warehouse tables in Microsoft Fabric.
author: KevinConanMSFT
ms.author: kecona
ms.reviewer: wiassaf
ms.date: 12/13/2023
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
---
# Transactions in Warehouse tables in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Similar to their behavior in SQL Server, transactions allow you to control the commit or rollback of read and write queries. 

You can modify data that is stored in tables in a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using transactions to group changes together. 

- For example, you could commit inserts to multiples tables, or, none of the tables if an error arises. If you're changing details about a purchase order that affects three tables, you can group those changes into a single transaction. That means when those tables are queried, they either all have the changes or none of them do. Transactions are a common practice for when you need to ensure your data is consistent across multiple tables. 

## Transactional capabilities

The same transactional capabilities are supported in the [!INCLUDE [fabric-se](includes/fabric-se.md)] in [!INCLUDE [product-name](../includes/product-name.md)], but for read-only queries.

Transactions can also be used for sequential SELECT statements to ensure the tables involved all have data from the same point in time. As an example, if a table has new rows added by another transaction, the new rows don't affect the SELECT queries inside an open transaction.

> [!IMPORTANT]
> Only the snapshot isolation level is supported in [!INCLUDE [product-name](../includes/product-name.md)]. If you use T-SQL to change your isolation level, the change is ignored at Query Execution time and snapshot isolation is applied.

## Cross-database query transaction support

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] supports transactions that span across databases that are within the same workspace including reading from the [SQL analytics endpoint of the Lakehouse](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse). Every [Lakehouse](../data-engineering/lakehouse-overview.md) has one read-only SQL analytics endpoint. Each workspace can have more than one lakehouse.

## DDL support within transactions

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] supports DDL such as CREATE TABLE inside user-defined transactions.

## Locks for different types of statements

This table provides a list of what locks are used for different types of [transactions](/sql/t-sql/language-elements/transactions-sql-data-warehouse?view=fabric&preserve-view=true), all locks are at the table level:

| **Statement type** | **Lock taken** |
|:-----|:-----|:------|
| [SELECT](/sql/t-sql/queries/select-transact-sql?view=fabric&preserve-view=true) | Schema-Stability (Sch-S) |
| [INSERT](/sql/t-sql/statements/insert-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (IX) |
| [DELETE](/sql/t-sql/statements/delete-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (IX) |
| [UPDATE](/sql/t-sql/queries/update-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (IX) |
| [COPY INTO](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (IX) |
| DDL | Schema-Modification (Sch-M) |

These locks prevent conflicts such as a table's schema being changed while rows are being updated in a transaction.

You can query locks currently held with the dynamic management view (DMV) [sys.dm_tran_locks](/sql/relational-databases/system-dynamic-management-views/sys-dm-tran-locks-transact-sql).

Conflicts from two or more concurrent transactions that update one or more rows in a table are evaluated at the end of the transaction.  The first transaction to commit completes successfully and the other transactions are rolled back with an error returned.  These conflicts are evaluated at the table level and not the individual parquet file level.

INSERT statements always create new parquet files, which means fewer conflicts with other transactions except for DDL because the table's schema could be changing.

## Transaction logging

Transaction logging in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] is at the parquet file level because parquet files are immutable (they can't be changed). A rollback results in pointing back to the previous parquet files.  The benefits of this change are that transaction logging and rollbacks are faster.

## Limitations

- Distributed transactions are not supported.
- Save points are not supported.
- Named transactions are not supported.
- Marked transactions are not supported.
- ALTER TABLE is not supported within an explicit transaction.
- At this time, there's limited T-SQL functionality in the warehouse. See [TSQL surface area](tsql-surface-area.md) for a list of T-SQL commands that are currently not available.
- If a transaction has data insertion into an empty table and issues a SELECT before rolling back, the automatically generated statistics can still reflect the uncommitted data, causing inaccurate [statistics](statistics.md). Inaccurate statistics can lead to unoptimized query plans and execution times. If you roll back a transaction with SELECTs after a large INSERT, [update statistics](/sql/t-sql/statements/update-statistics-transact-sql?view=fabric&preserve-view=true) for the columns mentioned in your SELECT.

## Related content

- [Query the Warehouse](query-warehouse.md)
- [Tables in [!INCLUDE[fabricdw](includes/fabric-dw.md)]](tables.md)
