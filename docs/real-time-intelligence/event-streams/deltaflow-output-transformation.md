---
title: DeltaFlow output transformation (Preview)
description: Learn how DeltaFlow transforms raw Debezium CDC events into analytics-ready tabular output with flattened columns and metadata fields.
ms.reviewer: zhenxilin
ms.topic: concept-article
ms.custom: sfi-image-nochange
ms.date: 03/09/2026
ms.search.form: Eventstream Overview
ai-usage: ai-assisted
---

# DeltaFlow output transformation (Preview)

DeltaFlow is a capability within Fabric Eventstreams that transforms raw Change Data Capture (CDC) events into a flattened, analytics-ready format. Instead of working with deeply nested Debezium JSON payloads, you get tabular rows that closely mirror the structure of your source database tables — enriched with metadata columns that describe each change.

This article describes the transformation process, the metadata columns DeltaFlow adds, and how different operation types (inserts, updates, and deletes) are represented in the output.

## Raw Debezium CDC event structure

CDC connectors powered by Debezium emit change events as JSON envelopes. A typical raw event contains nested structures including the row data before and after the change, source metadata, and the operation type:

```json
{
  "before": null,
  "after": {
    "OrderID": 1001,
    "CustomerName": "Contoso Ltd",
    "OrderTotal": 249.99,
    "OrderDate": "2026-03-01"
  },
  "source": {
    "version": "2.x",
    "connector": "sqlserver",
    "name": "fabsql",
    "ts_ms": 1741305600000,
    "db": "SalesDB",
    "schema": "dbo",
    "table": "Orders"
  },
  "op": "c",
  "ts_ms": 1741305600123
}
```

This nested format requires parsing and extraction before you can run analytics queries — for example, to access `OrderTotal`, you need to navigate into the `after` object and extract it. Querying this format directly with KQL or SQL is complex and error-prone.

## DeltaFlow transformed output

DeltaFlow flattens the nested Debezium envelope into a single tabular row. Source table columns appear as top-level columns, and DeltaFlow appends metadata columns that describe the change:

| OrderID | CustomerName | OrderTotal | OrderDate | __dbz_operation | __dbz_timestamp | __dbz_server | __dbz_schema | __dbz_table |
|---------|-------------|------------|-----------|-----------------|-----------------|--------------|-------------|-------------|
| 1001 | Contoso Ltd | 249.99 | 2026-03-01 | Insert | 2026-03-07T00:00:00Z | fabsql | dbo | Orders |

You can query this output directly with KQL or other analytics tools — no parsing required.

## Metadata columns

DeltaFlow adds the following metadata columns to every output row:

| Column | Description |
|--------|-------------|
| `__dbz_operation` | The type of change operation. Valid values: `Insert`, `Delete`, `Pre_Update`, `Post_Update`. |
| `__dbz_timestamp` | The timestamp of when the change event was captured. |
| `__dbz_server` | The logical name of the source database server as configured in the CDC connector. |
| `__dbz_schema` | The schema name of the source table (for example, `dbo`, `public`). |
| `__dbz_table` | The name of the source table where the change originated. |

## Operation types

DeltaFlow represents each type of database change as a distinct operation. The following table describes when each operation occurs:

| Operation | `__dbz_operation` value | When it occurs |
|-----------|------------------------|----------------|
| **Insert** | `Insert` | When a new row is inserted into the source table, or during the initial snapshot phase when the connector captures existing rows. |
| **Update** | `Pre_Update` and `Post_Update` | During the streaming phase, when an existing row is modified. DeltaFlow emits **two rows** for each update — one representing the row state before the change and one after. |
| **Delete** | `Delete` | During the streaming phase, when a row is deleted from the source table. |

### Initial snapshot

When a CDC connector first starts, it performs an initial snapshot of the source table to capture all existing rows. Each row in the snapshot appears as an `Insert` operation in the DeltaFlow output:

| OrderID | CustomerName | OrderTotal | OrderDate | __dbz_operation | __dbz_timestamp |
|---------|-------------|------------|-----------|-----------------|-----------------|
| 1001 | Contoso Ltd | 249.99 | 2026-03-01 | Insert | 2026-03-07T00:00:00Z |
| 1002 | Fabrikam Inc | 150.00 | 2026-03-02 | Insert | 2026-03-07T00:00:00Z |

After the snapshot completes, the connector switches to streaming mode and captures ongoing changes.

### Insert

When a new row is added to the source table, DeltaFlow emits a single row with the operation `Insert`:

| OrderID | CustomerName | OrderTotal | OrderDate | __dbz_operation | __dbz_timestamp |
|---------|-------------|------------|-----------|-----------------|-----------------|
| 1003 | Adventure Works | 75.50 | 2026-03-08 | Insert | 2026-03-08T14:30:00Z |

### Update

When an existing row is modified, DeltaFlow emits **two rows** with the same timestamp — one for the state before the change (`Pre_Update`) and one for the state after (`Post_Update`). This pattern is similar to [Delta change data feeds](/azure/databricks/delta/delta-change-data-feed):

| OrderID | CustomerName | OrderTotal | OrderDate | __dbz_operation | __dbz_timestamp |
|---------|-------------|------------|-----------|-----------------|-----------------|
| 1001 | Contoso Ltd | 249.99 | 2026-03-01 | Pre_Update | 2026-03-09T09:15:00Z |
| 1001 | Contoso Ltd | **299.99** | 2026-03-01 | Post_Update | 2026-03-09T09:15:00Z |

In this example, the `OrderTotal` changed from 249.99 to 299.99. Both the before and after states are preserved, which makes it possible to compute diffs, track field-level changes, or build audit trails.

### Delete

When a row is deleted from the source table, DeltaFlow emits a single row with the operation `Delete`, containing the last known values of the row:

| OrderID | CustomerName | OrderTotal | OrderDate | __dbz_operation | __dbz_timestamp |
|---------|-------------|------------|-----------|-----------------|-----------------|
| 1002 | Fabrikam Inc | 150.00 | 2026-03-02 | Delete | 2026-03-09T10:00:00Z |

## Schema and destination table mapping

When you route a DeltaFlow-enabled stream to a supported destination such as an Eventhouse, DeltaFlow automatically:

1. **Creates destination tables** that match the source table structure, with columns for each source column plus the five metadata columns.
1. **Manages schema evolution** — when source tables change (for example, columns are added or new tables are created), DeltaFlow detects the changes, updates the registered schemas, and adjusts the destination tables accordingly.

For more information on destination table management, see the DeltaFlow capabilities section in each CDC connector page.

## Related content

- [Eventstreams overview — DeltaFlow section](./overview.md#deltaflow-analytics-ready-cdc-streams-preview)
- [Add Azure SQL Database CDC source](./add-source-azure-sql-database-change-data-capture.md)
- [Add Azure SQL Managed Instance CDC source](./add-source-azure-sql-managed-instance-change-data-capture.md)
- [Add SQL Server on VM CDC source](./add-source-sql-server-change-data-capture.md)
- [Add PostgreSQL Database CDC source](./add-source-postgresql-database-change-data-capture.md)
