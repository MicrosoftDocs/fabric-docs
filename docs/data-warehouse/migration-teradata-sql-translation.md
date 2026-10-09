---
title: Translate Teradata SQL for Fabric Data Warehouse
description: Review Teradata data type, object, and BTEQ mappings for Microsoft Fabric Data Warehouse.
ms.reviewer: prlangad, arturv
ms.date: 09/21/2026
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: reference
ai-usage: ai-assisted
---

# Translate Teradata SQL for Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

Migration Assistant translates supported Teradata metadata to Fabric-compatible T-SQL. Use this reference to review automatic adjustments and fix objects that require attention because Teradata and Fabric Data Warehouse differ in data types, database objects, procedural commands, physical design, and operational utilities.

For the end-to-end lifecycle, see [Plan a migration from Teradata](migration-teradata-planning.md). For tool and data movement options, see [Migration methods for Teradata](migration-teradata-methods.md).

> [!IMPORTANT]
> Translation output requires technical and functional validation. Confirm current [Fabric Data Warehouse data types](data-types.md), [T-SQL surface area](tsql-surface-area.md), and [limitations](limitations.md) before deployment.

## Use this reference with Migration Assistant

1. Upload complete Teradata DDL and dependencies as a zip archive of `.sql` and/or `.bteq` files.
1. Run metadata migration and review **Show migrated objects** for automatic adjustments.
1. Open **Objects to fix** for scripts that couldn't be translated or deployed.
1. Use the mappings in this article to correct unsupported or ambiguous constructs.
1. Run the corrected script from Migration Assistant to create the object.
1. Compare results with Teradata behavior and optimize literal translations for Fabric.

## Object mappings

| Teradata object / construct | Fabric DW equivalent | Notes |
|---|---|---|
| Database | Schema | Teradata database namespaces map to Fabric DW schemas; sizing and parent options are removed. |
| External function | Not supported | External-language routines require a manual rewrite. |
| Foreign table | OneLake shortcut or `COPY INTO` | Foreign tables aren't supported directly. |
| Function | Function | SQL scalar and table-valued functions map to Fabric DW functions; unsupported routine attributes are removed. |
| Global temporary table | Local temporary table (`#name`) | Global definition persistence isn't retained. |
| Identity column | `BIGINT IDENTITY NOT NULL` | Seed, increment, bounds, and cycle options aren't preserved. |
| Index | No direct equivalent | Primary, secondary, unique, and hash indexes aren't emitted; Fabric manages distribution and clustering. |
| Integrity constraint - Check | No direct equivalent | `CHECK` constraints must be enforced upstream or in the loading process. |
| Integrity constraint - Foreign key | `FOREIGN KEY ... NOT ENFORCED` | Referential actions are removed, and the constraint isn't enforced. |
| Integrity constraint - Primary key / Unique | `NONCLUSTERED ... NOT ENFORCED` | The constraint is retained as metadata, and key columns are forced `NOT NULL`. |
| Join index | Materialized view or pre-aggregated table | Join indexes require redesign as a supported persisted structure. |
| Macro | Stored procedure | Teradata macros migrate as stored procedures. |
| Multiset table | Table | Duplicate-row behavior already aligns with the default Fabric DW table behavior. |
| Procedure | Stored procedure | Teradata procedures map to Fabric DW stored procedures; unsupported procedural attributes require review. |
| Recursive view | Not supported | Recursive common table expressions aren't supported in Fabric DW. |
| Role | Role | Role membership maps to `ALTER ROLE ADD MEMBER` or `DROP MEMBER`; `ADMIN OPTION` isn't retained. |
| Set table | Table | `SET` duplicate-row enforcement isn't preserved; add metadata or upstream enforcement if needed. |
| Statistics | `CREATE STATISTICS` / `UPDATE STATISTICS` | Multicolumn collections are split into single-column statistics; unsupported targets require review. |
| Storage schema | Not supported | Teradata storage schemas don't map to a Fabric DW namespace object. |
| Table | Table | Permanent Teradata tables map to Fabric DW tables; unsupported physical storage options are removed. |
| Trigger | Not supported | Move trigger logic into a stored procedure or the loading pipeline. |
| View | View | Standard views map directly; replace operations become `CREATE OR ALTER`. |
| Volatile table | Local temporary table (`#name`) | Session-scoped volatile tables map to local temporary tables; the schema qualifier is removed. |

## Data type mappings

| Teradata data type family | Fabric DW equivalent | Notes |
|---|---|---|
| Approximate numeric | `FLOAT` | `FLOAT`, `REAL`, and `DOUBLE PRECISION` consolidate to `FLOAT`. |
| Binary | `VARBINARY(n)` / `VARBINARY(MAX)` | `BYTE` and `VARBYTE` families map to variable-length binary types; sizes above 8000 use `MAX`. |
| Boolean | Not supported | Teradata `BOOLEAN` has no supported Fabric DW equivalent. |
| `BYTEINT` | `SMALLINT` | Teradata `BYTEINT` widens to `SMALLINT`. |
| Character | `CHAR(n)` / `VARCHAR(n)` / `VARCHAR(MAX)` | Unicode uses the warehouse UTF-8 collation; Unicode `VARCHAR` lengths are expanded and capped at `MAX`. |
| Collection / Array | Mapped base data type or JSON array | `ARRAY` and `VARRAY` wrappers are removed; array constructors are serialized where required. |
| Date and time | `DATE` / `TIME(6)` / `DATETIME2(6)` | Fractional precision is capped at 6, and time-zone offsets aren't retained. |
| Exact numeric | `DECIMAL(p,s)` / `NUMERIC` | `DECIMAL` and `NUMERIC` precision and scale are retained where supplied; omitted scale defaults to 0. |
| Integer | `SMALLINT` / `INT` / `BIGINT` | Integer families other than `BYTEINT` map directly. |
| Large objects | `VARCHAR(MAX)` / `VARBINARY(MAX)` | `CLOB` maps to `VARCHAR(MAX)`, and `BLOB` maps to `VARBINARY(MAX)`. |
| `MAP` | Not supported | Teradata `MAP` has no supported Fabric DW equivalent. |
| `MULTISET` | Table | Teradata `MULTISET` converts to a table. |
| JSON and XML | `VARCHAR(MAX)` | JSON and XML documents are stored as text; JSON can be queried with `JSON_VALUE` and `OPENJSON`. |
| Temporal interval | `VARCHAR(50)` plus `DATEADD` logic | Fabric DW has no scalar interval type; storage and arithmetic require redesign. |
| Temporal period | `VARCHAR(100)` or explicit start/end columns | Period values or bounds must be modeled explicitly; period relationship metadata is dropped. |
| Spatial | Not supported | Store well-known text or binary, or process spatial data outside Fabric DW. |
| `SET` | Table | Teradata `SET` converts to a table. |
| User-defined type | Underlying base type | Fabric DW has no user-defined type object; substitute and validate the base type manually. |

## BTEQ command mappings

BTEQ combines SQL, flow control, session management, import, and export behavior. Depending on the command, translate it to a stored procedure, pipeline, load operation, or explicit unsupported result.

Migration Assistant translates BTEQ scripts into stored procedures and preserves supported script elements. Review the generated stored procedures and integrate them into the appropriate workflows.

| BTEQ construct family | Fabric equivalent | Notes |
|---|---|---|
| Control flow and branching | Stored procedure `IF` / `GOTO` / `WHILE` or pipeline conditions | Move labels, conditions, and repeat directives into T-SQL control flow or pipeline orchestration. |
| Data ingestion and export | `COPY INTO` and Fabric pipeline copy activities | Imports can become `COPY INTO`; move exports and external file handling to pipelines or CETAS. |
| Error handling and termination | Procedure return codes and pipeline failure paths | Capture `ERRORCODE` and `ACTIVITYCOUNT`; add orchestrator logic for `ERRORLEVEL` and maximum-error policies. |
| Runtime metadata and variables | Procedure parameters / `@@ERROR` / `@@ROWCOUNT` / pipeline variables | Map environment variables and BTEQ status values to parameters, variables, and captured execution status. |
| Script wrapper and SQL execution | Stored procedure wrapper with translated T-SQL | A BTEQ script can become a procedure; extract schema-level objects, and keep failed statements for review. |
| Timing and process execution | `WAITFOR`, schedules, wait activities, notebooks, or pipeline activities | Map `HANG` to `WAITFOR`; move operating-system commands outside the warehouse. |

### Unsupported BTEQ statements

Migration Assistant removes the following BTEQ statements from the translated code:

| BTEQ statement | Translation result |
|---|---|
| `.DEFAULTS` | Removed from code |
| `.ERROROUT`, `.ERRORLEVEL`, and standalone `.MAXERROR` | Removed from code |
| `.EXPORT DATA`, `.EXPORT REPORT`, `.EXPORT DIF`, and `.EXPORT INDICDATA FILE = path` | Removed from code |
| `.EXPORT RESET` | Removed from code |
| `.FORMAT`, `.WIDTH`, `.FOLDLINE`, `.TITLEDASHES`, and `.SIDETITLES` | Removed from code |
| `.LOGOFF` | Removed from code |
| `.LOGON tdpid/user,pwd` | Removed from code |
| `.OS command`, `.TSO command`, and `.CMS command` | Removed from code |
| `.PAGELENGTH`, `.PAGEBREAK`, `.HEADING`, and `.FOOTING` | Removed from code |
| `.ECHOREQ` | Removed from code |
| `.RECORDMODE`, `.INDICDATA`, and `.LARGEDATAMODE` | Removed from code |
| `.RETLIMIT n,m` and standalone `.RETCANCEL` | Removed from code |
| `.RUN FILE = script.bteq` | Removed from code |
| `.SEPARATOR` and standalone `.NULL AS` | Removed from code |
| `.SESSION CHARSET`, `.SESSION SQLFLAG`, `.SESSION TRANSACTION`, and `.SESSION DATEFORM` | Removed from code |
| `.SHOW CONTROLS` and `.SHOW VERSIONS` | Removed from code |

## Validate translated code

Use automated tests where possible, then complete functional review with workload owners.

- Compare object counts and unresolved dependencies.
- Compare row-level results for representative and boundary inputs.
- Validate decimal precision, timestamps, null semantics, string padding, collation, and non-ASCII text.
- Test error paths, transaction behavior, retries, and partial failures.
- Run downstream reports and semantic models against the target.
- Test representative data volumes and concurrency.
- Review generated SQL for unnecessary nesting, row-by-row processing, and source-specific physical tuning.
- Retain source SQL, translated SQL, reviewer decisions, and test evidence together.

## Related content

- [Plan a migration from Teradata](migration-teradata-planning.md)
- [Migration methods for Teradata](migration-teradata-methods.md)
- [Migrate by uploading a file](migrate-using-upload-file.md)
- [Data types in Microsoft Fabric](data-types.md)
- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md)
- [Performance guidelines in Fabric Data Warehouse](guidelines-warehouse-performance.md)
