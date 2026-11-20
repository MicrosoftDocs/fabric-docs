---
title: "Troubleshoot federated queries in Microsoft Fabric HorizonDB"
description: Resolve pg_fabric_fdw authentication, import, query translation, performance, and timeout errors with SQLSTATE codes and safe recovery steps.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: troubleshooting
ai-usage: ai-generated
---
# Troubleshoot federated queries in Microsoft Fabric HorizonDB

Federated queries in Fabric HorizonDB can fail independently of local PostgreSQL queries, mirroring, or the remote SQL analytics endpoint. Start with the failing operation and the full `pg_fabric_fdw` error rather than treating every federation failure as a database outage.

An error has two identifiers: a five-character PostgreSQL **SQLSTATE** and a wrapper identifier such as `[Execution/AuthenticationError]`. Use SQLSTATE for client error handling, and retain both identifiers for diagnosis.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Don't repair federation by dropping or recreating a service-managed extension, foreign server, or user mapping. Remove tokens, connection strings, sensitive values, and real endpoint names from shared diagnostics.

## Authentication errors

Successful PostgreSQL sign-in doesn't guarantee that the session can query Fabric data. Check the message accompanying SQLSTATE `28000` and `[Execution/AuthenticationError]`.

If you see `[Execution/AuthenticationError]` when using the Microsoft PostgreSQL extension for Visual Studio Code, check the extension version. Version 1.34.0 or later is required. If you're using an earlier version, upgrade the extension, restart the Visual Studio Code window, and reconnect with **Entra Auth** as the database creator. For connection steps, see [Connect with Visual Studio Code](connect.md#connect-with-visual-studio-code). If the error continues, use the following table to check other causes.

| Message or condition | Recovery |
|---|---|
| The sign-in token can't be used to query Fabric data | Acquire a new token for one of the audiences listed in the error, and reconnect. Retrying on the same connection doesn't change its token audience. |
| The sign-in token for this connection has expired | Acquire a fresh token for the database creator and reconnect. Retrying the same session doesn't refresh that sign-in token. |
| Access is denied despite a valid token | Verify the identity's source permissions and catalog visibility. A new token doesn't grant missing permissions. |
| `[Execution/PrerequisiteState]` asks you to sign in with Microsoft Entra ID | Reconnect using a supported Microsoft Entra identity. If the error continues, contact support. |
| `[Internal/SessionSetupFailure]` says Fabric query authentication couldn't be set up | Reconnect once. If it continues, preserve the message and timestamp and contact support. |

Only the database creator can connect to PostgreSQL in the current preview. If another user, service principal, or managed identity is selected, reconnect as the creator. Confirm that the creator can read the Fabric source.

If `pg_fabric_fdw` or the default `fabric_dw` server is missing, verify provisioning and preview enablement. Don't recreate the reserved server. For a separate warehouse, verify the host and SQL database name copied from its connection details; the database name can differ from its Fabric display name.

Don't put a token in server options or SQL, change a managed mapping, or switch to another user's identity to bypass the failure.

## Import and metadata errors

`IMPORT FOREIGN SCHEMA` reads remote metadata. Confirm the remote database, schema, exact table names, source permissions, and any `LIMIT TO` or `EXCEPT` filter.

| SQLSTATE or identifier | Meaning | Action |
|---|---|---|
| `HV00Q`, `[Execution/RemoteSchemaNotFound]` | The schema is missing or isn't visible. | Check its name and case, the default database, and the import's `database_name` option. Verify catalog access. |
| `HV000`, `[Execution/NoImportableTables]` | No visible tables or views match the request. | Check for an empty schema, an incorrect table filter, or missing catalog permissions. |
| `HV00D`, `[Planning/InvalidOptionName]` | The option name isn't supported for this object. | Use `database` on a server and `database_name` on an import or foreign table. Don't alter managed server options. |
| `HV00J`, `[Planning/MissingRequiredOption]` | A required option is absent. | Correct customer-owned DDL using the [option reference](federated-query-reference.md#connection-and-metadata-options). |
| `HV024`, `[Planning/InvalidOptionValue]` | An option value is invalid. | Correct the value before retrying. |
| `42701`, `duplicate_column` | Remote column names map to the same shortened local identifier. | Exclude the table or create a manual definition with distinct local names and full remote `column_name` mappings. |
| `42P07`, `duplicate_table` | Imported table names collide with local names. | Use a separate local schema or distinct local names with full remote `table_name` mappings. |
| An unsupported remote type | A column can't be mapped safely. | Exclude the table or define only the supported columns. Don't substitute a guessed type. |

Import filters use exact names, even if the warehouse collation ignores case. Quote mixed-case names. For long names, `EXCEPT` can skip all remote tables that map to the excluded local name; use a manual definition to disambiguate them.

A collation warning isn't an import failure, but it isn't a success confirmation either. Check that the command returns `IMPORT FOREIGN SCHEMA` and inspect the foreign tables. Test text comparisons against the source before depending on identical PostgreSQL results.

If SQLSTATE `40001` reports a metadata-related snapshot failure, wait for warehouse schema changes to finish. Roll back an open failed transaction, then retry the affected read-only operation or import. Don't automatically replay a transaction containing application writes whose outcome is uncertain.

## Query translation errors

Use the label after the wrapper identifier to choose the next action.

| Message | Meaning and action |
|---|---|
| `[Pushdown/UnsupportedConstruct] Unsupported:` | The named construct isn't supported. Rewrite it with a supported expression or redesign the query to process a bounded result locally. |
| `[Pushdown/UnsupportedConstruct] Invalid input:` | Translation rejected the input. Check the expression; contact support if it's valid PostgreSQL SQL. |
| `[Pushdown/UnsupportedConstruct] Cannot resolve column` | Check aliases, exact column names, and imported metadata. Contact support if they're correct. |
| `[Pushdown/UnsupportedConstruct] Federation error:` | Translation failed. Preserve a minimal reproduction and contact support. |
| `[Internal/InternalError] failed to translate query for Fabric` | An unexpected internal failure occurred. It doesn't establish that your query is unsupported. Contact support. |

`0A000` identifies unsupported-feature errors; `XX000` identifies unexpected internal failures. Regular-expression predicates, recursive common table expressions, and foreign-table writes are unsupported. Some functions can run locally, but the wrapper doesn't guarantee local fallback for every unsupported expression.

Run `EXPLAIN (VERBOSE)` to inspect the `Fabric SQL` line. If translation fails before a plan is returned, save that error instead. For supported query shapes, see [Query pushdown](federated-query-reference.md#query-pushdown).

## Slow queries or large transfers

Check the plan and the session settings before increasing a limit:

```sql
SHOW fabric_fdw.max_retrieved_rows;
SHOW fabric_fdw.max_batch_memory;
```

A local aggregate or join above a `Foreign Scan` can require more input rows from Fabric than a fully pushed query. Project fewer columns, add selective remote predicates, and aggregate remotely before a local join where appropriate.

The row guardrail defaults to `0`, which means no cap. A positive `fabric_fdw.max_retrieved_rows` rejects scans whose estimated transfer exceeds the limit at planning time. SQLSTATE `54000` and `[Planning/ProgramLimitExceeded]` identify a configured planning limit. Review the estimate and query shape instead of raising the limit automatically.

Result batching is enabled by default with a `256` kB limit. `fabric_fdw.max_batch_memory = 0` fetches one row at a time and can slow large results. Restoring the default can help if batching was disabled. A positive value is also bounded by `work_mem`; changing the parameter requires the applicable `SET` privilege.

For remote history correlation, enable query labels as described in [Federated query reference](federated-query-reference.md#correlate-a-query-with-fabric-history). A label can take up to 15 minutes to appear in warehouse history.

## Cancellation and timeouts

SQLSTATE `57014` means the statement was canceled or timed out. It can result from client cancellation, PostgreSQL `statement_timeout`, or the wrapper's remote read timeout.

The wrapper captures `statement_timeout` when a scan starts, rounded up to whole seconds for remote reads. Changing the setting later doesn't change the captured value. Imports and remote `EXPLAIN` capture it before contacting Fabric.

After cancellation:

1. Roll back any open failed PostgreSQL transaction.
1. Review the query shape and remote endpoint health.
1. Retry only a safe read with a finite timeout and bounded backoff.

The wrapper closes the canceled query's Fabric connection; the next foreign query reconnects automatically. Fabric can still be stopping the remote query after PostgreSQL reports cancellation. Draining or cleaning up a result that stops early can also wait beyond `statement_timeout`, so don't treat the timeout as a guarantee that every remote operation has stopped.

If PostgreSQL `transaction_timeout` expires, the connection closes with SQLSTATE `25P04`. Open a new connection before sending another query.

## Unexpected results or conversion errors

Compare the same bounded input and expressions directly on the source. Check whether the expression ran in Fabric or PostgreSQL.

Common differences include text collation, UUID range and sort order, integer averages, trailing spaces, `LIKE` escaping, and numeric rounding. For rewrites and limitations, see [Cross-engine behavior differences](federated-query-reference.md#cross-engine-behavior-differences).

SQLSTATE `22000`, `22001`, `22003`, or `HV004` can indicate conversion, truncation, range, or type problems. Verify the source definition and imported column mappings. A remote schema change can make previously valid metadata incorrect.

Don't suppress an error by guessing a wider type or dropping a required column. Reconcile the source contract and application requirements first.

## Local statistics errors

If `mirror_of` validation or `ANALYZE` fails, check that the statistics source:

- Uses a schema-qualified name and still exists.
- Is a permanent table or materialized view.
- Matches the foreign table's non-dropped column count, order, types, and declared type modifiers.
- Contains representative rows maintained by your load process.

Column names can differ, but positions and types must match. This statistics source doesn't replace remote query data or implement Fabric mirroring. For details, see [Local planner statistics](federated-query-reference.md#local-planner-statistics).

## Collect support details

Provide:

- The full error message, SQLSTATE, and wrapper identifier.
- A UTC timestamp and a sanitized query or DDL statement.
- The extension version and relevant session settings.
- `EXPLAIN (VERBOSE)` output, or the error that prevented planning.
- A remote query label, if available.
- Equivalent SQL that succeeds directly in Fabric, if available.
- Whether a bounded retry with a fresh connection produced the same result.

Remove credentials, sensitive literals, customer rows, and real endpoint names. Share query text and plans only with authorized recipients.

## Related content

- [Query Fabric data from a HorizonDB database](query-fabric-data.md).
- [Federated query reference](federated-query-reference.md).
- [Troubleshoot Fabric HorizonDB](troubleshoot.md).
- [PostgreSQL error codes](https://www.postgresql.org/docs/current/errcodes-appendix.html).
