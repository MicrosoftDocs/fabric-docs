---
title: Use transactions in Synapse Data Warehouse in Microsoft Fabric
description: Learn how to use transactions in Synapse Data Warehouse in Microsoft Fabric
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 03/31/2023
---

# Use transactions in Synapse Data Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

## What to expect

As you would expect, Synapse Data Warehouse in Microsoft Fabric supports multi-statement transactions.  There are some differences from other SQL products due to the new architecture of Synapse Data Warehouse to use parquet files to store user table row data.  This article will cover those differences including what locks are required for different types of statements.

## Transaction isolation levels

Syanpse Data Warehouse implements ACID transactions.  The only isolation level supported by Synapse Data Warehouse is SNAPSHOT ISOLATION.

> [!NOTE]
> If you use T-SQL to change your isolation level, it the change is ignored at Query Execution time and SNAPSHOT ISOLATION is applied.

## Cross Database Query Transaction Support

Synapse Data Warehouse in Microsoft Fabric supports transactions that span across databases that are within the same workspace including reading from SQL End Points for Lakehouses.

## DDL support within Transactions

Synapse Data Warehouse in Microsoft Fabric supports DDL such as CREATE TABLE inside user-defined transactions.

## Locks for different types of statements

This table provides a list of what locks are used for different types of transactions:

| Statement Type  | Lock Taken |
|:-----|:-----|:------|
| SELECT | Schema-Stability (Sch-S) |
| INSERT | Intent Exlusive (IX) |
| DELETE | Intent Exlusive (IX) |
| UPDATE | Intent Exlusive (IX) |
| DDL | Schema-Modification (Sch-M) |

Conflicts between statements are evaluated at the end of the transaction.  The first transaction to commit will win and the other transactions will be rolled back with an error returned.

INSERT statements create new parquet files, so they will not conflict with other transactions with the execption of DDL because the table's schema could be changing.

## Tranaction Logging

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
