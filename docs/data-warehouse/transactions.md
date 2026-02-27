---
title: Transactions in Fabric Data Warehouse
description: Learn how to use transactions and how to insert and modify data in Warehouse tables in Microsoft Fabric.
ms.reviewer: twcyril
ms.date: 10/17/2025
ms.topic: how-to
ms.search.form: Warehouse design and development
---
# Transactions in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Similar to their behavior in SQL Server, transactions allow you to control the commit or rollback of read and write queries. 

Fabric Data Warehouse supports ACID-compliant transactions. Each transaction is atomic, consistent, isolated, and durable (ACID). All operations within a single transaction are treated atomically, all succeeding or all failing. If any statement in the transaction fails, the entire transaction is rolled back.  

## Explicit transactions

You can modify data that is stored in tables in a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using explicit transactions to group changes together. 

For example, you could commit inserts to multiples tables, or, none of the tables if an error arises. If you're changing details about a purchase order that affects three tables, you can group those changes into a single transaction. That means when those tables are queried, they either all have the changes or none of them do. Transactions are a common practice for when you need to ensure your data is consistent across multiple tables.

You can use standard T-SQL (`BEGIN TRAN`, `COMMIT TRAN`, and `ROLLBACK TRAN`) syntax control mechanisms for explicit transactions. For more information, see:
    - [BEGIN TRANSACTION](/sql/t-sql/language-elements/begin-transaction-transact-sql?view=fabric&preserve-view=true)
    - [COMMIT TRANSACTION](/sql/t-sql/language-elements/commit-transaction-transact-sql?view=fabric&preserve-view=true)
    - [ROLLBACK TRANSACTION](/sql/t-sql/language-elements/rollback-transaction-transact-sql?view=fabric&preserve-view=true)

### Cross-database query transaction support

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] supports transactions that span across warehouses that are within the same workspace, including reading from the [SQL analytics endpoint of the Lakehouse](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse). For an example, see [Write a cross-database SQL Query](query-warehouse.md#write-a-cross-database-query).

## Understand locking and blocking in Fabric Data Warehouse

Fabric Data Warehouse uses table-level locking, regardless of whether a query touches one row or many. The following table provides a list of what locks are used for different T-SQL operations.

| **Statement type** | **Lock taken** |
|:-----|:-----|
| **DML** | |
| [SELECT](/sql/t-sql/queries/select-transact-sql?view=fabric&preserve-view=true) | Schema-Stability (`Sch-S`) |
| [INSERT](/sql/t-sql/statements/insert-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (`IX`) |
| [DELETE](/sql/t-sql/statements/delete-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (`IX`) |
| [UPDATE](/sql/t-sql/queries/update-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (`IX`) |
| [MERGE](/sql/t-sql/statements/merge-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (`IX`) |
| [COPY INTO](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true) | Intent Exclusive (`IX`) |
| **DDL** | |
| [CREATE TABLE](/sql/t-sql/statements/create-table-transact-sql?view=fabric&preserve-view=true) | Schema-Modification (`Sch-M`) |
| [ALTER TABLE](/sql/t-sql/statements/alter-table-transact-sql?view=fabric&preserve-view=true) | Schema-Modification (`Sch-M`) |
| [DROP TABLE](/sql/t-sql/statements/drop-table-transact-sql?view=fabric&preserve-view=true) | Schema-Modification (`Sch-M`) |
| [TRUNCATE TABLE](/sql/t-sql/statements/truncate-table-transact-sql?view=fabric&preserve-view=true) | Schema-Modification (`Sch-M`) |
| [CREATE TABLE AS SELECT](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) | Schema-Modification (`Sch-M`) |
| [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true) | Schema-Modification (`Sch-M`) |

You can query locks currently held with the dynamic management view (DMV) [sys.dm_tran_locks](/sql/relational-databases/system-dynamic-management-views/sys-dm-tran-locks-transact-sql).

For more information about locks, lock escalation, and lock compatibility, see [Transaction locking and row versioning guide](/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide?view=fabric&preserve-view=true).

### Snapshot isolation

Fabric Data Warehouse enforces snapshot isolation on all transactions. Snapshot isolation is a row-based isolation level that provides transaction-level consistency for data, and uses row versions stored in `tempdb` to select rows to update. The transaction uses the data row versions that exist when the transaction begins. This ensures that each transaction operates on a consistent snapshot of the data as it existed at the start of the transaction. 

In snapshot isolation, queries in the transaction see the same version, or snapshot, based on the state of the database when the transaction begins. In snapshot isolation, transactions that modify data do not block transactions that read data, and transactions that read data do not block transactions that write data. This optimistic, non-blocking behavior also significantly reduces the likelihood of deadlocks for complex transactions. 

If you use T-SQL to change your isolation level, the change is ignored at query execution time and snapshot isolation is applied.

In snapshot isolation, write-write or update conflicts are possible, for more information, see [Understand write-write conflicts in Fabric Data Warehouse](#understand-write-write-conflicts-in-fabric-data-warehouse).

### Schema locks

Schema locks prevent conflicts on DDL statements, such as a table's schema being changed while rows are being updated in a transaction. Be aware that DDL operations, such as schema changes and migrations, can block or be blocked by active read workloads.

- During data definition language (DDL) operations, the Database Engine uses schema modification (`Sch-M`) locks. During the time that it is held, the `Sch-M` lock prevents all concurrent access to the table until the lock is released.
- During data manipulation language (DML) operations, the Database Engine uses schema stability (`Sch-S`) locks. Operations that acquire `Sch-M` locks are blocked by the `Sch-S` locks. Other transactions continue to run while a query is being compiled, but DDL operations are blocked until they can get exclusive access to the schema.
- DDL operations also acquire an exclusive (`X`) lock on rows in system views like `sys.tables` and `sys.objects` associated with the target table, for the duration of the transaction. This blocks concurrent `SELECT` statements on `sys.tables` and `sys.objects`.

## Best practices to avoid blocking

- Avoid long-running transactions, or schedule during periods of low or no concurrent activity.
- Schedule DDL operations only during maintenance windows to minimize blocking.
- Avoid placing DDL statements inside explicit user transactions (`BEGIN TRAN`). Long-running transactions that modify tables can cause blocking issues for other DML operations and `SELECT` queries, both on user tables and system catalog views like `sys.tables`. To monitor and troubleshoot potential lock conflicts, use `sys.dm_tran_locks`.
- Monitor locks and conflicts in the warehouse.
    - Use [sys.dm_tran_locks](/sql/relational-databases/system-dynamic-management-views/sys-dm-tran-locks-transact-sql?view=fabric&preserve-view=true) to inspect current locks.
- Fabric Data Warehouse supports some DDL statements inside user-defined transactions, but are not recommended in long-running transactions. Inside transactions, DDL statements can block concurrent transactions or cause write-write conflicts.

<a id="ddl-support-within-transactions"></a>

## Understand write-write conflicts in Fabric Data Warehouse

Write-write conflicts can occur when two transactions attempt to `UPDATE`, `DELETE`, `MERGE`, or `TRUNCATE` the same table. 

Write-write conflicts or update conflicts are possible at the table level, since Fabric Data Warehouse uses table-level locking. If two transactions attempt to modify different rows in the same table, they can still conflict.

Write-write conflicts mostly arise from two scenarios:

- User-induced workload conflicts
    - Multiple users or processes concurrently modify the same table.
    - Can occur in ETL pipelines, batch updates, or overlapping transactions.
- System-induced conflicts
    - Background system tasks like automatic data compaction rewrite files with poor quality. 
    - These can conflict with user transactions, though [Data compaction preemption](guidelines-warehouse-performance.md#data-compaction-preemption) actively prevents write-write conflicts of this type.

If a write-write conflict occurs, you might see error messages such as:

- **Error 24556**: Snapshot isolation transaction aborted due to update conflict. Using snapshot isolation to access table '%.*ls' directly or indirectly in database '%.*ls' can cause update conflicts if rows in that table have been deleted or updated by another concurrent transaction. Retry the transaction.
- **Error 24706**: Snapshot isolation transaction aborted due to update conflict. You cannot use snapshot isolation to access table '%.*ls' directly or indirectly in database '%.*ls' to update, delete, or insert the row that has been modified or deleted by another transaction. Please retry the transaction.

If you encounter these error messages, one or more transactions succeeded, and one or more conflicting transactions failed. Retry the transactions that failed.

> [!NOTE]
> Even when `MERGE` transactions only result in append-only changes, they are still create a write-write conflict. When `MERGE` transaction affects different rows than other concurrent DML transactions, it may encounter this error if `MERGE` is not the first transaction to commit: 'Snapshot isolation transaction aborted due to update conflict.'

### Best practices to avoid write-write conflicts

To avoid write-write conflicts:

- Avoid concurrent `UPDATE`, `DELETE`, `MERGE` operations on the same table.
    - Pay careful attention to `UPDATE`, `DELETE`, `MERGE` operations within multi-step transactions.
- Use Retry Logic in all applications and queries.
    - Implement retry logic in stored procedures and ETL pipelines.
    - Add retry logic with delay in pipelines or apps to handle transient conflicts.
        - Use exponential backoff to avoid retry storms that worsen transient network interruptions. For more information, see [Retry pattern](/azure/architecture/patterns/retry).
- Write-write conflicts with the Fabric Data Warehouse background data compaction service are possible but typically are prevented by the [Data compaction preemption](guidelines-warehouse-performance.md#data-compaction-preemption) feature.

## Table and parquet file blocking

Conflicts from two or more concurrent transactions that update one or more rows in a table are evaluated at the end of the transaction. The first transaction to commit completes successfully and the other transactions are rolled back with an error returned. These conflicts are evaluated at the table level and not the individual parquet file level. 

INSERT statements always create new parquet files, which means fewer conflicts with other transactions except for DDL because the table's schema could be changing.

## Limitations

- Distributed transactions are not supported, for example, `BEGIN DISTRIBUTED TRANSACTION`.
- `ALTER TABLE` is not supported within an explicit transaction.
- Save points are not supported.
- Named transactions are not supported.
- Marked transactions are not supported.
- At this time, there's limited T-SQL functionality in the warehouse. See [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md) for a list of T-SQL commands that are currently not available.
- If a transaction has data insertion into an empty table and issues a SELECT before rolling back, the automatically generated statistics can still reflect the uncommitted data, causing inaccurate [statistics](statistics.md). Inaccurate statistics can lead to unoptimized query plans and execution times. If you roll back a transaction with SELECTs after a large INSERT, [update statistics](/sql/t-sql/statements/update-statistics-transact-sql?view=fabric&preserve-view=true) for the columns mentioned in your SELECT.

## Related content

- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
- [Tables](tables.md)
