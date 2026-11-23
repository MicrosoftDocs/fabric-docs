---
title: "Database mirroring in Microsoft Fabric HorizonDB"
description: Learn how database mirroring in Federated Analytics publishes an asynchronous analytical copy to OneLake and a SQL analytics endpoint.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ai-usage: ai-assisted
---
# Database mirroring in Microsoft Fabric HorizonDB

Database mirroring is a [Federated Analytics](federated-analytics-overview.md) capability in Fabric HorizonDB. It makes eligible operational PostgreSQL data available for analytics in Microsoft Fabric. Mirroring performs an initial copy and then asynchronously applies committed changes to an analytical representation in OneLake.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

The mirrored data is available through a read-only [SQL analytics endpoint](sql-analytics-endpoint.md). Reporting and analytical workloads can use that endpoint without sending those queries to the PostgreSQL endpoint.

## How mirroring works

Mirroring has these stages:

1. The service evaluates tables, keys, columns, and data types for eligibility.
1. An initial copy creates the analytical representation for each eligible table.
1. The service captures and applies committed changes asynchronously.
1. The SQL analytics endpoint exposes the mirrored data to authorized analytical consumers.

For a Federated Analytics-enabled preview database, mirroring is automatic for eligible tables. Return to the workspace, locate the mirroring-related item associated with the PostgreSQL database, and open its status experience. Wait for the initial copy before querying the generated SQL analytics endpoint.

New or changed tables can initialize independently. A table might be healthy, initializing, suspended, unsupported, or reseeding while the HorizonDB database remains available.

## Operational and analytical separation

Fabric HorizonDB and its mirrored copy have different purposes:

| Surface | Purpose | Data behavior |
|---|---|---|
| PostgreSQL endpoint | Application reads, writes, transactions, and PostgreSQL administration | Current operational state |
| SQL analytics endpoint | Reporting, semantic models, and analytical queries | Read-only asynchronous copy |

Mirroring isn't a synchronous transaction participant. A committed PostgreSQL transaction can be visible at the PostgreSQL endpoint before it appears in the analytical copy.

## Eligibility

Eligibility depends on the released mirroring contract, including:

- A supported table identity, normally a stable primary key.
- Supported PostgreSQL data types and values.
- Supported schema and DDL operations.
- Table, column, row-size, and large-value limits.
- A consistent change position that the service can continue from.

Use primary keys on tables intended for analytics, but don't assume that every keyed table is eligible. Unsupported objects must be shown as an integration condition rather than silently omitted from a healthy status.

For details, see [Mirroring limitations](mirroring-limitations.md).

## Freshness

Mirroring freshness varies with initial-copy progress, transaction volume, table changes, dependency health, capacity state, and reseeding. Public preview doesn't define a numeric freshness guarantee.

For freshness-sensitive consumers:

- Store a source event or update timestamp.
- Display the latest available source timestamp in reports.
- Monitor last-applied or lag information when the experience exposes it.
- Decide how consumers behave when data is stale.

Don't describe mirrored data as transactionally current or guaranteed real time.

## Pause, resume, and reseed

Mirroring uses its last valid durable position when possible. If the position can't be continued because of retention, incompatible DDL, or another integration condition, an affected table or relationship can require reseeding.

During a reseed:

- PostgreSQL can remain healthy and writable.
- The analytical copy can be stale or temporarily incomplete.
- Validate the new copy before treating it as current analytical data.

Monitor reseed progress separately from database readiness.

## Permissions

Microsoft Entra authentication and Fabric authorization protect the integration. Authorization to the HorizonDB database and authorization to mirrored data are separate:

- Only the database creator's Microsoft Entra identity can connect through the PostgreSQL endpoint in the current preview.
- Fabric item and analytical permissions control access to the mirrored copy.
- A downstream semantic model or report has its own sharing boundary.

Review [Secure mirrored Fabric HorizonDB data](mirroring-secure.md) before sharing the SQL analytics endpoint.

## When to use another path

Use [federation](query-fabric-data.md) when a PostgreSQL query needs to read current supported Fabric data without storing it locally.

Use a [Copy job](load-fabric-data-copy-job.md) when a bounded analytical result must become indexed, transactional operational state in Fabric HorizonDB.

## Related content

- [Monitor Fabric HorizonDB mirroring](mirroring-monitor.md).
- [Troubleshoot Fabric HorizonDB mirroring](mirroring-troubleshooting.md).
- [Mirroring frequently asked questions](mirroring-faq.yml).
- [Federated Analytics overview](federated-analytics-overview.md).
