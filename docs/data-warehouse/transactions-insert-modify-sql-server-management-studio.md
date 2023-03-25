---
title: Transactions, inserting and modifying data in warehouse tables using SSMS
description: Learn how to use transactions and how to modify data in warehouse tables with SSMS.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 03/15/2023
---

# Transactions, inserting and modifying data in warehouse tables using SQL Server Management Studio (SSMS)

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** Warehouse

You can modify data that is stored in tables in a warehouse. We'll also show how you can use transactions to group those changes together. Transactions allow you to commit all tables or none of the tables that you're changing data in. For example, if you're changing details about a purchase order that affects three tables, you can group those changes into a transaction so that when those tables are queried, they either all have that change or none of them do. This is a common practice for when you need to ensure your data is consistent across multiple tables. See T-SQL Surface Area for a listing of unsupported T-SQL commands.

> [!NOTE]
> Only Snapshot Isolation is supported. If you set your transaction isolation level to read uncommitted, it will be ignored and snapshot will still be used.

See our current documentation for INSERT, UPDATE, DELETE and Transactions:

- Insert - [INSERT (Transact-SQL)](/sql/t-sql/statements/insert-transact-sql?view=fabric&preserve-view=true)
- Update - [UPDATE (Transact-SQL)](/sql/t-sql/queries/update-transact-sql?view=fabric&preserve-view=true)
- Delete - [DELETE (Transact-SQL)](/sql/t-sql/statements/delete-transact-sql?view=fabric&preserve-view=true)
- Transactions - [Transactions (Azure Synapse Analytics)](/sql/t-sql/language-elements/transactions-sql-data-warehouse?view=fabric&preserve-view=true)

## Known limitations

- At this time, there's limited T-SQL functionality in the warehouse. See [T-SQL surface area](data-warehousing.md#t-sql-surface-area) for a list of T-SQL commands that are currently not available.
- If a SELECT is within a transaction, and was preceded by data insertions, the automatically generated statistics may be inaccurate after a rollback. Inaccurate statistics can lead to unoptimized query plans and execution times. If you roll back a transaction with SELECTs after a large INSERT, you may want to [update statistics](/sql/t-sql/statements/update-statistics-transact-sql?view=sql-server-ver16&preserve-view=true) for the columns mentioned in your SELECT.
- To avoid query concurrency issue during preview, refrain from doing trickle INSERTs into a warehouse table.

## Querying: including cross-database querying

In [!INCLUDE [product-name](../includes/product-name.md)], you can write cross-database queries within the same [!INCLUDE [product-name](../includes/product-name.md)] workspace. This means that if you have the correct permissions, you can write queries that join data between warehouses that are within the same workspace.

## Next steps

- [Query a warehouse using SSMS](query-warehouse-sql-server-management-studio.md)
