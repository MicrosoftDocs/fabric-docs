---
title: "What is Microsoft Fabric HorizonDB (preview)?"
description: Learn how Fabric HorizonDB combines managed PostgreSQL with mirroring, federated queries, and Copy jobs in Microsoft Fabric.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: overview
ms.search.form: product-databases, Fabric HorizonDB overview, PostgreSQL databases
ai-usage: ai-assisted
---
# What is Microsoft Fabric HorizonDB (preview)?

Fabric HorizonDB is a managed PostgreSQL service in Microsoft Fabric. Each HorizonDB database is a native Fabric item. Applications connect through the PostgreSQL protocol, while Fabric manages compute, durable storage, maintenance, and integration with analytical workloads.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

Fabric HorizonDB provides service-managed PostgreSQL. Inspect the engine version in the SQL editor instead of assuming a particular version. You use familiar PostgreSQL SQL, drivers, and tools within the service's managed compatibility boundary.

Use a dedicated development or test workspace and synthetic, nonsensitive data. Confirm preview enablement for your tenant, workspace, capacity, and region before you start. In **+ New item**, the portal lists the service as **HorizonDB database (preview)**.

## Operational PostgreSQL in Fabric

Each HorizonDB database has a stable PostgreSQL endpoint. The service separates durable data from customer-usable compute, so it can adapt compute without changing the database identity or endpoint.

Fabric HorizonDB uses service-managed resources and platform-managed autoscaling rather than customer-selected compute sizes:

- The platform adjusts resources according to workload demand.
- Available compute controls are shown in your database item.
- Where scale to zero is enabled, an idle database can pause. A connection through the same endpoint starts resume; allow for startup latency.

The paused state provides scale-to-zero behavior. Durable data, catalog state, supported configuration, identity bindings, and the endpoint identity remain while compute is paused. Sessions, temporary state, and volatile caches aren't guaranteed to survive pause, scaling, maintenance, or another disruptive transition. Applications should reconnect and use bounded retry for safe operations.

For more information, see [Control Fabric HorizonDB compute usage](control-compute-usage.md).

## PostgreSQL access

Fabric HorizonDB supports Microsoft Entra authentication. In the current preview, **only the Microsoft Entra identity that created the database can connect**. Other users, service principals, and managed identities can't connect to the PostgreSQL database. Sharing the Fabric item doesn't remove this restriction.

Database users can't create or manage PostgreSQL users or roles, and per-table or per-view user permissioning isn't available during public preview. Customers don't receive PostgreSQL superuser, host access, filesystem access, arbitrary native-library installation, or unrestricted server configuration.

You can work in the Fabric SQL editor, open a connection in the Microsoft PostgreSQL extension for Visual Studio Code when that action is available, or use a PostgreSQL-compatible client. Always use the PostgreSQL endpoint for operational connections. The SQL analytics endpoint is a different, read-only analytical surface over mirrored data.

For connection choices, see [Connect to Fabric HorizonDB](connect.md).

## Federated Analytics

Federated Analytics connects operational and analytical data through three complementary capabilities:

| Capability | Direction | Use it when |
|---|---|---|
| [Database mirroring](mirroring-overview.md) | HorizonDB database to Fabric | Analytical consumers need an asynchronous copy of eligible operational tables in OneLake and through a SQL analytics endpoint. |
| [Federated queries](query-fabric-data.md) | PostgreSQL to Fabric query | An operational query needs to read supported Fabric data through `pg_fabric_fdw` without copying those rows into local tables. |
| [Data delivery](load-fabric-data-copy-job.md) | Fabric to HorizonDB database storage | An application needs selected analytical results materialized in PostgreSQL through a bounded Copy job for reverse ETL. |

These paths have independent health and freshness. A healthy PostgreSQL endpoint doesn't guarantee that mirroring, federation, or a Copy job is healthy. Mirrored data is asynchronous and can be behind the operational database.

For guidance on choosing a capability, see [Federated Analytics overview](federated-analytics-overview.md).

## Built-in integration and extensions

The service creates and manages extensions that support the Fabric HorizonDB experience, including:

- `vector`, `pg_diskann`, and `pg_textsearch` for approved vector and text-search scenarios.
- `pg_fabric_fdw` for querying supported Fabric data.
- `azure_ai` as an integration point for approved AI operations.

The available set can vary by preview environment. Inspect `pg_extension` to verify what's installed. The presence of an extension doesn't by itself provide a model provider, endpoint, quota, or permission. Don't drop, replace, or alter service-managed extensions or the default `fabric_dw` foreign server.

## Encryption

Durable storage is service-managed and separated from compute. Fabric HorizonDB uses service-managed encryption for applicable persisted database state.

Confirm the encryption, backup, restore, and recovery options available for your preview before using the database. Don't assume production recovery capabilities. Preserve any required data outside the item before deleting it.

For more information, see [Encryption](encryption.md).

## Monitoring and capacity

Fabric HorizonDB exposes lifecycle state, current and target compute where available, basic query telemetry, PostgreSQL diagnostic views, storage information, and integration health. PostgreSQL statistics can reset, arrive late, or be unavailable while the database is paused. Missing telemetry isn't the same as zero activity.

Review the consumption information available for your preview capacity. Don't infer pricing, included allowances, or paused-state charges from PostgreSQL activity counters.

For more information, see [Monitor Fabric HorizonDB](monitor.md) and [Usage reporting](usage-reporting.md).

## Common scenarios

Fabric HorizonDB is suited to scenarios that benefit from PostgreSQL application semantics and direct Fabric integration:

- Operational applications that need managed PostgreSQL with workload-driven autoscaling.
- Transactional systems that mirror selected data to OneLake for reporting and analytics.
- Applications that join local operational data with supported Fabric data through read-only federation.
- Reverse ETL patterns that validate analytical results in staging tables before an idempotent PostgreSQL publish step.
- Search and AI applications that use approved vector and text-search capabilities.

## Get started

1. [Create a HorizonDB database](create.md).
1. [Create tables](create-table.md).
1. [Load sample data](load-sample-data.md).
1. [Query your database](query.md).
1. [Validate PostgreSQL access](configure-postgresql-access-controls.md).

## Related content

- [Fabric HorizonDB limitations](limitations.md).
- [Fabric HorizonDB frequently asked questions](faq.yml).
- [Security overview](security-overview.md).
- [Troubleshoot Fabric HorizonDB](troubleshoot.md).
