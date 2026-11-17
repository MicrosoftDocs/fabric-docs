---
title: "Use Microsoft Fabric HorizonDB for translytical applications"
description: Combine Fabric HorizonDB operational transactions with Microsoft Fabric analytics by using mirroring, federation, and Copy jobs.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: solution-overview
ai-usage: ai-assisted
---
# Use Microsoft Fabric HorizonDB for translytical applications

Fabric HorizonDB supports applications that combine PostgreSQL transactions with Microsoft Fabric analytics. Keep operational writes and current state on the PostgreSQL endpoint, and choose among the three Federated Analytics capabilities for analytical data.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Federated Analytics capabilities

| Need | Path | Tradeoff |
|---|---|---|
| Analyze Fabric HorizonDB data in Fabric | Database mirroring to OneLake and a SQL analytics endpoint | Asynchronous freshness |
| Read current supported Fabric data in a PostgreSQL query | Federated queries through read-only `pg_fabric_fdw` foreign tables | Runtime dependency on the remote source |
| Reuse analytical results with local PostgreSQL latency and transactions | Data delivery through a Copy job into staging, followed by an idempotent publish | Batch freshness and stored duplicate state |

The paths are complementary, not interchangeable.

## Reference scenario

A retail application can:

1. Write customers and orders to Fabric HorizonDB through the PostgreSQL endpoint.
1. Mirror eligible order tables to Fabric for reporting and model calculations.
1. Query a small current Fabric signal through `pg_fabric_fdw` when a request can tolerate a remote dependency.
1. Load frequently used recommendations into Fabric HorizonDB with a Copy job.
1. Query federated or locally loaded signals through a parameterized PostgreSQL application.

## Keep operational writes in PostgreSQL

Use PostgreSQL transactions and constraints for application state. Only the Microsoft Entra identity that created the database can connect in the current preview. Evaluate with synthetic data; don't assume support for additional users, service principals, or managed identities. Don't write through the SQL analytics endpoint or federated foreign tables.

Applications should reconnect with bounded retry after pause or a disruptive compute transition. Don't automatically replay a transaction when commit outcome is uncertain.

## Move analytics off the operational path

Use mirroring for Power BI, semantic models, notebooks, and broad analytical scans. The SQL analytics endpoint is read-only and can be behind the PostgreSQL source.

Include a source timestamp in reports and define how the user experience handles stale or reseeding data.

## Choose live federation selectively

Use `pg_fabric_fdw` for bounded reads that benefit from current remote data and don't justify another stored copy. Select only required columns, add selective filters, and limit the result set.

Avoid making every application request depend on a broad remote scan. Validate representative results and latency before you place a federated query on an application request path.

## Materialize reusable results

Use a Copy job when an analytical result is:

- Read frequently by applications.
- Small enough to maintain as operational state.
- Governed by a clear batch, timestamp, and deletion contract.
- Better served with local indexes, constraints, and transactions.

Stage, validate, and publish with stable keys and `ON CONFLICT`.

## Design for independent health

Track these components separately:

- Fabric HorizonDB readiness and PostgreSQL query health.
- Mirroring initial copy, lag, suspended state, and reseed.
- SQL analytics endpoint availability and freshness.
- Federation authorization, remote capacity, schema, and query behavior.
- Copy job runs, staging validation, and publish transactions.
- Application connection state and the freshness of loaded signals.

An integration failure shouldn't mark the operational database unhealthy when PostgreSQL checks continue to pass.

## Security

- Use Microsoft Entra authentication.
- Separate the creator's PostgreSQL connection from permissions on analytical and integration surfaces.
- Grant each integration the minimum required data scope.
- Don't assume PostgreSQL security is automatically reproduced on mirrored data.
- Validate the creator's local and federated queries against the expected source results.
- Keep credentials out of SQL definitions and operational tables.

## Related content

- [Federated Analytics overview](federated-analytics-overview.md).
- [Mirroring overview](mirroring-overview.md).
- [Query Fabric data from Fabric HorizonDB](query-fabric-data.md).
- [Load Fabric data into Fabric HorizonDB with a Copy job](load-fabric-data-copy-job.md).
- [Use Fabric HorizonDB in AI applications](use-case-ai-application.md).
