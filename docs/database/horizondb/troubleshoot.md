---
title: "Troubleshoot Microsoft Fabric HorizonDB"
description: Diagnose creation, connection, authentication, query, compute, monitoring, and Fabric integration issues in Fabric HorizonDB.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: troubleshooting
ms.search.form: Fabric HorizonDB troubleshooting, PostgreSQL database errors
ai-usage: ai-assisted
---
# Troubleshoot Microsoft Fabric HorizonDB

Use this guide to isolate issues in Fabric HorizonDB. Start by identifying the failing layer: Fabric management, PostgreSQL connectivity, authentication, authorization, database workload, monitoring, or a Fabric integration.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. Preserve operation and correlation IDs for support, but remove tokens, complete connection strings, real endpoints, and customer data from shared evidence. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Collect a minimum diagnostic record

Before retrying or changing configuration, record:

- The failing step and client.
- Expected and actual behavior.
- UTC timestamp and time range.
- Workspace and item IDs.
- Database lifecycle state.
- Operation, request, and correlation IDs.
- Sanitized request, SQL, and error category.
- Client, driver, and extension versions.
- Whether one deliberate retry produced the same result.
- Relevant mirroring, federation, or Copy job state.

Don't include access tokens, authorization headers, passwords, complete connection strings, or unreviewed query results.

## Creation and management

| Symptom | Checks and actions |
|---|---|
| HorizonDB database type isn't available | Search for **HorizonDB database (preview)**. Verify tenant and workspace preview enablement, region, active capacity, and Contributor or Admin access. |
| Creation is rejected | Correct the item name, workspace eligibility, region, quota, permission, or unsupported configuration named by the error. |
| Creation remains in progress | Follow the status guidance in the released management surface. Don't assume that a client timeout means creation failed. |
| Portal shows failed or degraded | Open the released operation details, save the correlation ID, and follow the displayed remediation guidance. |
| A compute-setting change doesn't take effect | Review the controls and effective state shown in your preview, and preserve the operation details. |
| REST client times out | Follow the released operation's status and retry guidance. A timeout doesn't prove failure. |

## Connection and DNS

Verify that you use the PostgreSQL endpoint, not the SQL analytics endpoint. Copy the host, port, database, user format, token scope, and TLS mode from the Fabric HorizonDB connection experience.

| Symptom | Checks and actions |
|---|---|
| Host can't be resolved | Check the exact host, DNS path, network policy, and whether the client is on a supported network. |
| TLS validation fails | Check endpoint spelling, system clock, trust store, certificate guidance, and the released `sslmode`. Don't disable validation. |
| Connection times out after idle time | The database might be resuming. Use a finite timeout and bounded exponential backoff with jitter. |
| Connection drops during scaling or maintenance | Open a new connection and safely retry only an idempotent operation or a transaction known not to have committed. |
| SQL analytics endpoint rejects writes | Switch to the PostgreSQL endpoint. |

Validate a successful connection:

```sql
SELECT
    current_database() AS database_name,
    current_user AS signed_in_user,
    current_setting('server_version') AS server_version,
    pg_backend_pid() AS session_id,
    clock_timestamp() AS checked_at;
```

## Authentication

| Symptom | Checks and actions |
|---|---|
| Token acquisition fails | Check the credential source, tenant, conditional access, local sign-in as the database creator, and requested preview scope. |
| Another user or application principal can't connect | Expected in the current preview. Only the Microsoft Entra identity that created the database can connect; item sharing doesn't enable another identity. |
| PostgreSQL rejects the token | Check expiry, tenant, scope or audience, user format, endpoint, and client clock. Acquire a fresh token. |
| Portal editor works but application authentication fails | Compare the identity, token flow, database, user format, TLS mode, and endpoint. |
| Authentication starts failing in a pool | Refresh the pool before token expiry and acquire a token for each new physical connection. |

Don't retry an invalid credential in a tight loop.

## Authorization

If authentication succeeds but SQL fails, inspect:

```sql
SELECT
    current_user,
    session_user,
    current_database();
```

Check schema and table privileges:

```sql
SELECT
    has_schema_privilege(
        current_user,
        'horizon_sample',
        'USAGE'
    ) AS can_use_schema,
    has_table_privilege(
        current_user,
        'horizon_sample.orders',
        'SELECT'
    ) AS can_read_orders;
```

Common causes:

- The client isn't using the database creator's Microsoft Entra identity.
- The current session doesn't have the effective schema or object privilege.
- The client uses the Fabric display name instead of the PostgreSQL database name `postgres`.

Don't create a password login, role, or role membership to work around the creator-only restriction. Reconnect as the creator, and verify object ownership and supported operations.

## Query and transaction issues

| Symptom | Checks and actions |
|---|---|
| Relation doesn't exist | Verify the database, schema qualification, identifier spelling, and quoted-name case. |
| Constraint violation | Review the primary, unique, foreign-key, not-null, or check constraint named in the error. |
| Query returns unexpected order | Add an explicit `ORDER BY`. |
| Query is slow | Check filters, indexes, row estimates, blocking, temporary I/O, and available compute information. |
| Transaction remains idle | Commit or roll back. Long idle transactions can hold locks and prevent maintenance. |
| Connection was lost during commit | Treat the outcome as indeterminate and reconcile with a stable business key before replaying. |

Find blockers:

```sql
SELECT
    activity.pid AS blocked_pid,
    pg_blocking_pids(activity.pid) AS blocking_pids,
    age(clock_timestamp(), activity.query_start) AS blocked_duration,
    left(activity.query, 200) AS blocked_query
FROM pg_catalog.pg_stat_activity AS activity
WHERE activity.datname = current_database()
  AND cardinality(pg_blocking_pids(activity.pid)) > 0
ORDER BY blocked_duration DESC;
```

Query visibility depends on privilege. Don't terminate another user's session without authorization.

## Pause, resume, and compute

| Symptom | Checks and actions |
|---|---|
| Database doesn't auto-pause | Confirm that scale to zero is enabled in your preview and look for persistent client connections. Don't assume a fixed idle interval. |
| Resume takes longer than the client timeout | Increase the finite connection budget if appropriate and use bounded retry. No numeric resume guarantee is published. |
| Workload demand exceeds available compute | Tune queries, indexes, transactions, and pool concurrency, and review controls available in your preview. |
| Sessions reset during a transition | Reconnect. Don't rely on temporary tables, prepared statements, or session settings surviving a disruptive transition. |

## Monitoring and usage

- Check `stats_reset` before comparing cumulative PostgreSQL statistics.
- Treat missing telemetry as unknown, not zero.
- A paused database can't answer live PostgreSQL catalog queries.
- Use the Fabric Capacity Metrics experience for capacity consumption, not sampled CPU charts.
- Check whether active connections prevent pause.
- Review primary storage separately from compute.
- Review mirroring, federation, Copy job, report, and notebook activity separately.

## Fabric integration

| Symptom | Checks and actions |
|---|---|
| Mirroring doesn't start | Check table eligibility, supported keys and types, initial-copy status, and mirroring-specific errors. |
| Mirrored data is behind | Review initial-copy progress, lag, and last-applied position. Mirroring is asynchronous. |
| SQL analytics endpoint is available but data is stale | PostgreSQL and analytical endpoint health are independent. Verify mirroring freshness. |
| Federation authentication fails | Check the SQLSTATE and wrapper identifier. Verify source permissions; for an expired or wrong-audience sign-in token, acquire the appropriate token and reconnect. |
| Foreign table is read-only | Expected public preview behavior. Write to a local Fabric HorizonDB table instead. |
| Federation is slow | Inspect `EXPLAIN (VERBOSE)` and its `Fabric SQL` line, reduce transfers, review the planning guardrail, and verify remote source health. |
| Copy job can't find the target | Verify the PostgreSQL schema and lowercase identifier spelling, and confirm target permissions. |
| Copy job destination connection fails | Select **Azure Database for PostgreSQL**, use the HorizonDB host and database `postgres`, and choose **Organizational account** as the creator. Don't use the mirrored SQL analytics endpoint. |
| Copy job creates duplicates | Load staging, deduplicate by stable business key, and publish with `ON CONFLICT` in one transaction. |
| Source deletions aren't applied | Public preview doesn't promise source-delete propagation. Implement an explicit reconciliation policy. |

For federation-specific authentication, import, translation, and timeout recovery, see [Troubleshoot federated queries](federated-query-troubleshooting.md).

## Contact support

Contact support when:

- A management operation remains stuck after you follow the released status and retry guidance.
- The service reports failed or degraded with no safe customer action.
- Authentication fails after validating token and endpoint configuration.
- Mirroring or another managed integration requires service repair or reseed.

Provide the minimum diagnostic record from the first section and one sanitized reproduction. Avoid repeated retries that can create duplicate work or hide the original evidence.

For preview bugs, onboarding difficulties, or documentation feedback, use the contact or feedback channel supplied with your preview invitation. Include the affected capability, minimal reproduction, timestamp with time zone, sanitized error, and activity or run identifiers. Don't attach raw network captures, tokens, personal data, or customer datasets. Use an approved secure transfer method if additional diagnostics are requested.

## Related content

- [Fabric HorizonDB limitations](limitations.md).
- [Connect to Fabric HorizonDB](connect.md).
- [Monitor Fabric HorizonDB](monitor.md).
- [Security overview](security-overview.md).
