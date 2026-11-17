---
title: "Control Microsoft Fabric HorizonDB compute usage"
description: Review service-managed compute, available preview controls, idle pause, resume, and safe application reconnect behavior.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ms.search.form: Fabric HorizonDB compute usage, PostgreSQL autoscaling
ai-usage: ai-assisted
---
# Control Microsoft Fabric HorizonDB compute usage

Fabric HorizonDB uses service-managed compute. The controls and status shown in your database item describe what's available in your preview environment.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Compute model

The service evaluates workload pressure and adjusts compute resources within the service-managed range. Scale-to-zero is the separate paused state.

Availability and behavior can vary by preview environment. Confirm supported controls with your administrator or preview contact rather than assuming a fixed size, scaling range, or transition time.

## Review available controls

1. Open the HorizonDB database.
1. Review its current state and any compute or settings controls shown for your preview.
1. Use only supported values and actions.
1. After a change, verify the displayed effective state before drawing conclusions about performance.

Don't assume a maximum-compute guardrail or writable API field is available. A database compute setting also isn't a budget limit for storage, mirroring, federation, or Copy jobs.

## Auto-pause and resume

Where scale to zero is enabled, an idle database can pause automatically. The current onboarding guidance doesn't specify a fixed idle interval.

While paused:

- Customer-usable compute is released.
- Durable data, catalog state, supported configuration, identity bindings, and endpoint identity remain.
- Confirm paused-state consumption and retained-storage policies for your preview.

A connection through the same endpoint resumes a paused database. Use the database creator's Microsoft Entra identity; other users and principals can't connect in the current preview.

No numeric resume guarantee is published. Applications must tolerate connection delay and retryable failures while resume completes.

## Design clients for transitions

Pause, resume, scaling, and maintenance can interrupt connections depending on the transition mechanism.

- Use finite connection and command timeouts.
- Retry retryable connection failures with bounded exponential backoff and jitter.
- Recreate broken pooled connections.
- Acquire a fresh Microsoft Entra token for new physical connections.
- Retry a transaction only when you know it didn't commit or it is idempotent.
- Reconcile an indeterminate commit with a stable business operation ID.

Fabric HorizonDB doesn't replay statements or transactions automatically. Temporary tables, prepared statements, session settings, locks, and volatile caches aren't guaranteed to survive a disruptive transition.

## Monitor compute pressure

Review:

- Current and target allocation, and requested and effective maximum settings, where exposed.
- Lifecycle and transition state.
- Active connections and blocked sessions.
- Query latency and execution frequency.
- Temporary-file use and cache behavior.
- Capacity metrics and database operation category.

Use PostgreSQL views to complement service telemetry:

```sql
SELECT
    datname AS database_name,
    numbackends AS active_connections,
    xact_commit,
    xact_rollback,
    blks_read,
    blks_hit,
    temp_files,
    temp_bytes,
    deadlocks,
    stats_reset
FROM pg_catalog.pg_stat_database
WHERE datname = current_database();
```

Statistics can reset or be unavailable while paused. Missing data isn't zero.

## Related content

- [Monitor Fabric HorizonDB](monitor.md).
- [Usage reporting](usage-reporting.md).
- [Connect to Fabric HorizonDB](connect.md).
- [Troubleshoot Fabric HorizonDB](troubleshoot.md).
