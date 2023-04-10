---
title: Transactions for inserting and modifying data in Synapse Data Warehouse tables in Microsoft Fabric
description: Learn how to use transactions and how to insert and modify data in Synapse Data Warehouse tables in Microsoft Fabric.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 04/10/2023
---

# Transactions in Synapse Data Warehouse tables in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

You can modify data that is stored in tables in a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using transactions to group changes together. Transactions allow you to commit all tables or none of the tables that you're changing data in. For example, if you're changing details about a purchase order that affects three tables, you can group those changes into a single transaction. That means when those tables are queried, they either all have the changes or none of them do. Transactions are a common practice for when you need to ensure your data is consistent across multiple tables. 

> [!NOTE]
> If you use T-SQL to change your isolation level, it the change is ignored at Query Execution time and SNAPSHOT ISOLATION is applied.

## Cross-database query transaction support

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] supports transactions that span across databases that are within the same workspace including reading from the SQL Endpoint for Lakehouse. Every [Lakehouse](../data-engineering/lakehouse-overview.md) has one SQL Endpoint and each workspace can have more than one Lakehouse.

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
| [COPY INTO](/sql/t-sql/queries/update-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (IX) |
| DDL | Schema-Modification (Sch-M) |

Conflicts from two or more concurrent transactions that update one or more rows in a table are evaluated at the end of the transaction.  The first transaction to commit completes successfully and the other transactions are rolled back with an error returned.  These conflicts are evaluated at the table level and not the individual parquet file level.

INSERT statements always create new parquet files, which means fewer conflicts with other transactions except for DDL because the table's schema could be changing.

## Transaction logging

Transaction logging in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] is at the parquet file level because parquet files are immutable (they can't be changed). A rollback results in pointing back to the previous parquet files.  The benefits of this change are that transaction logging and rollbacks are faster.

## Limitations

- No distributed transactions
- No save points
- No named transactions
- No marked transactions
- At this time, there's limited T-SQL functionality in the warehouse. See [T-SQL surface area](warehouse.md#t-sql-surface-area) for a list of T-SQL commands that are currently not available.
- If a transaction has data insertion into an empty table and issues a SELECT before rolling back, the automatically generated statistics may still reflect the uncommitted data, causing inaccurate statistics. Inaccurate statistics can lead to unoptimized query plans and execution times. If you roll back a transaction with SELECTs after a large INSERT, you may want to [update statistics](/sql/t-sql/statements/update-statistics-transact-sql?view=sql-server-ver16&preserve-view=true) for the columns mentioned in your SELECT.

## Next steps

- [Query a warehouse using SSMS](query-warehouse.md)
- [Tables in [!INCLUDE[fabricdw](includes/fabric-dw.md)]](tables.md)