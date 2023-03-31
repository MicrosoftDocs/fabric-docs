---
title: Transactions for inserting and modifying data in Synapse Data Warehouse tables.
description: Learn how to use transactions and how to insert and modify data in Synapse Data Warehouse tables.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 03/31/2023
---

# Transactions in Synapse Data Warehouse tables

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

You can modify data that is stored in tables in a Synapse Data Warehouse. We'll also show how you can use transactions to group those changes together. Transactions allow you to commit all tables or none of the tables that you're changing data in. For example, if you're changing details about a purchase order that affects three tables, you can group those changes into a transaction so that when those tables are queried, they either all have that change or none of them do. This is a common practice for when you need to ensure your data is consistent across multiple tables. See T-SQL Surface Area for a listing of unsupported T-SQL commands.

> [!NOTE]
> If you use T-SQL to change your isolation level, it the change is ignored at Query Execution time and SNAPSHOT ISOLATION is applied.

## Cross-database query transaction support

Synapse Data Warehouse in Microsoft Fabric supports transactions that span across databases that are within the same workspace including reading from the SQL Endpoint for Lakehouses. Every Lakehouse has one SQL Endpoint and each workspace can have more than one Lakehouse.

## DDL support within Transactions

Synapse Data Warehouse in Microsoft Fabric supports DDL such as CREATE TABLE inside user-defined transactions.

## Locks for different types of statements

This table provides a list of what locks are used for different types of [transactions](/sql/t-sql/language-elements/transactions-sql-data-warehouse?view=fabric&preserve-view=true):

| **Statement type** | **Lock taken** |
|:-----|:-----|:------|
| [SELECT](/sql/t-sql/queries/select-transact-sql?view=fabric&preserve-view=true) | Schema-Stability (Sch-S) |
| [INSERT](/sql/t-sql/statements/insert-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (IX) |
| [DELETE](/sql/t-sql/statements/delete-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (IX) |
| [UPDATE](/sql/t-sql/queries/update-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (IX) |
| DDL | Schema-Modification (Sch-M) |

Conflicts between statements are evaluated at the end of the transaction.  The first transaction to commit will win and the other transactions will be rolled back with an error returned.

INSERT statements create new parquet files, so they will not conflict with other transactions with the exception of DDL because the table's schema could be changing.

## Transaction Logging

Transaction logging in Synapse Data Warehouse in Microsoft Fabric is much simpler as it is at the parquet file level instead of row level.  This is because parquet files are immutable (cannot be changed), so a rollback will simply mean pointing back to the previous parquet files.  The benefits of this change is that transaction logging and rollbacks are much faster.

## Limitations

- No distributed transactions
- No save points
- no named transactions
- no marked transactions
- At this time, there's limited T-SQL functionality in the warehouse. See [T-SQL surface area](data-warehousing.md#t-sql-surface-area) for a list of T-SQL commands that are currently not available.
- If a SELECT is within a transaction, and was preceded by data insertions, the automatically generated statistics may be inaccurate after a rollback. Inaccurate statistics can lead to unoptimized query plans and execution times. If you roll back a transaction with SELECTs after a large INSERT, you may want to [update statistics](/sql/t-sql/statements/update-statistics-transact-sql?view=sql-server-ver16&preserve-view=true) for the columns mentioned in your SELECT.
- To avoid query concurrency issue during preview, refrain from doing trickle INSERTs into a warehouse table.

## Next steps

- [Query a warehouse using SSMS](query-warehouse-sql-server-management-studio.md)
- [Tables in [!INCLUDE[fabricdw](includes/fabric-dw.md)]](tables.md)
