---
title: "Limitations for Microsoft Fabric HorizonDB"
description: Review the current public preview boundaries for Fabric HorizonDB, including PostgreSQL, lifecycle, integration, storage, and security limitations.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: reference
ms.update-cycle: 180-days
ms.search.form: Fabric HorizonDB limitations, PostgreSQL database limitations
ai-usage: ai-assisted
---
# Limitations for Microsoft Fabric HorizonDB

This article describes the current public preview boundaries for Fabric HorizonDB. It distinguishes the supported managed PostgreSQL surface from upstream PostgreSQL features that require privileges or infrastructure access the service doesn't expose.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Availability and creation

- Fabric HorizonDB must be available in the Fabric region and capacity used by your workspace.
- Creation requires a preview-enabled workspace, active supported Fabric capacity, Contributor or Admin access, and permission to create the required items.
- Provisioning is asynchronous. An accepted create request isn't proof that the PostgreSQL endpoint is ready.
- No numeric provisioning-time guarantee is published.
- Name, item, region, quota, and concurrent-operation limits are enforced by the released service. Don't infer values from another Fabric item type.
- The onboarding procedure uses **+ New item** > **HorizonDB database (preview)** in the Fabric portal. Don't assume REST creation support without an applicable HorizonDB API contract.
- Use a dedicated test workspace and synthetic, nonsensitive data.

## PostgreSQL compatibility

Fabric HorizonDB provides service-managed PostgreSQL. Inspect the engine version in your database rather than assuming a specific major version. The following boundaries apply:

- Customers don't select or pin a PostgreSQL major or minor version.
- The service manages supported minor maintenance.
- A customer major-version upgrade workflow isn't available in public preview.
- Customer PostgreSQL superuser, host, operating-system, and filesystem access aren't available.
- Arbitrary native libraries and unrestricted server configuration aren't supported.
- Upstream PostgreSQL support for a command, extension, parameter, type, or feature doesn't establish Fabric HorizonDB support.
- Use only the data types, collations, locales, encodings, parameters, and extensions documented in the released compatibility and extension catalog.
- Connection, transaction, lock, memory, temporary-space, write-ahead-log, and object limits can depend on service-managed resources and service policy. Numeric values aren't published here unless the released limits surface approves them.

The service creates and owns extensions used for durability, diagnostics, mirroring, federation, vector search, and text search. Don't run `CREATE EXTENSION`, `ALTER EXTENSION`, or `DROP EXTENSION` against a service-managed extension. Visibility in `pg_available_extensions` doesn't prove that your profile, region, or role can activate a packaged component.

## Authentication and authorization

- Microsoft Entra authentication is the supported identity model.
- Only the Microsoft Entra identity that created the database can connect in the current preview.
- Other Microsoft Entra users, groups, service principals, and managed identities can't connect to the PostgreSQL database.
- Sharing a Fabric item doesn't grant PostgreSQL superuser, host access, database ownership, or unrestricted data access.
- Sharing the Fabric item or adding a workspace role doesn't enable another PostgreSQL identity.
- Table-level and view-level user permission management isn't available.
- Don't create PostgreSQL login roles or role memberships to bypass the preview restriction.
- Revoking a Fabric permission doesn't guarantee immediate termination of an already established or pooled session.
- Applications must acquire fresh credentials according to the released authentication guidance and refresh connection pools before token expiry.
- Don't reuse token audiences, scopes, username formats, ports, or TLS settings from another PostgreSQL service.

For more information, see [Authentication](authentication.md) and [Authorization](authorization.md).

## Connections and lifecycle

- Use the stable PostgreSQL endpoint shown by Fabric HorizonDB. Don't connect an operational PostgreSQL client to the SQL analytics endpoint.
- Where scale to zero is enabled, an idle database can pause automatically. The onboarding guidance doesn't specify a fixed idle interval.
- An eligible connection triggers resume through the same logical endpoint. No numeric resume guarantee is published.
- Unauthorized connections don't resume compute.
- Active connections, prepared statements, temporary tables, session settings, volatile caches, and in-flight transactions aren't guaranteed to survive pause, scaling, maintenance, or a disruptive transition.
- The service doesn't replay SQL statements or transactions automatically.
- Clients should reconnect and use bounded exponential backoff with jitter for retryable connection failures.
- Retry a transaction only when the application knows it didn't commit or uses an idempotency key. Reconcile an indeterminate commit instead of blindly replaying it.

## Compute

- Fabric HorizonDB uses service-managed compute. Available controls are shown in your database item.
- Scale-to-zero is the paused state.
- Don't assume a maximum-compute guardrail, fixed resource range, or writable compute API field is available in your preview.
- A database compute setting isn't a budget limit for storage, mirroring, federation, or Copy jobs.
- Autoscaling isn't guaranteed to preserve every session or transaction.

## Storage and deletion

- Durable storage is service-managed and separated from compute.
- No customer storage tier, growth increment, IOPS, throughput, latency, database-size cap, or object-count value is published in this article.
- Deletion might be irreversible. Review dependencies and preserve independent exports before deleting important data.
- Confirm encryption, backup, restore, and recovery options for your preview. The onboarding procedure doesn't establish customer-managed key configuration or production recovery guarantees.

For more information, see [Encryption](encryption.md).

## Mirroring and the SQL analytics endpoint

- Mirroring supports eligible PostgreSQL tables, keys, data types, and DDL operations only.
- Mirroring performs an initial copy and then asynchronously applies committed changes.
- Mirrored data can lag behind the operational database. No numeric freshness guarantee is published.
- PostgreSQL health, mirroring health, OneLake availability, and SQL analytics endpoint health are independent.
- The SQL analytics endpoint is read-only and isn't the PostgreSQL endpoint.
- A primary key is useful in validation examples but doesn't guarantee that every table is eligible.
- Functions, service schemas, temporary tables, unsupported types, large objects, extension-owned objects, and unsupported DDL aren't guaranteed to mirror.
- A change that makes a table ineligible can suspend mirroring or require service-assisted repair or reseed.

## Federated queries

- Federation uses the service-managed `pg_fabric_fdw` extension and documented PostgreSQL DDL.
- Supported Fabric SQL-compatible endpoints, workspaces, types, and identity flows are limited to the released catalog.
- The default `fabric_dw` server targets the database's mirrored SQL analytics endpoint. Register separate warehouse endpoints with customer-owned foreign servers; don't recreate `fabric_dw`.
- `database_name` selects another queryable database reachable through the selected connection. It doesn't discover arbitrary workspaces or grant source permissions.
- Foreign tables are read-only. `INSERT`, `UPDATE`, `DELETE`, `MERGE`, `COPY` into a foreign table, `FOR UPDATE`, and `FOR SHARE` aren't supported.
- `IMPORT FOREIGN SCHEMA` imports metadata; it doesn't copy remote rows.
- The wrapper pushes eligible operations to Fabric and completes other operations locally. Some constructs, including regular-expression predicates and recursive common table expressions, are rejected rather than evaluated locally.
- Distributed transactions, transparent cross-engine semantics, and universal Fabric item support aren't available.
- Text collation, UUID ordering, integer averages, trailing spaces, and some numeric or date expressions can produce different results when evaluated in Fabric.
- Unsupported remote types fail import. Remote time values with seven fractional-second digits can't be imported.
- `fabric_fdw.max_retrieved_rows` uses estimated rows to reject an oversized plan. It isn't an exact runtime row limit.
- Query performance depends on remote-system health, permissions, network policy, selected columns, filters, and result size.
- The complete guided item browser and lifecycle experience isn't available in public preview.

For type mappings, query behavior, and session settings, see [Federated query reference](federated-query-reference.md).

## Load Fabric data into Fabric HorizonDB

- The preview path uses the **Azure Database for PostgreSQL** destination connector, **Organizational account** authentication as the creator, database `postgres`, and the **Full copy** read method.
- The destination is insert-oriented. Load into staging and run a separate PostgreSQL publish step for upserts.
- Use a separate warehouse for a writable source table, not the read-only mirrored SQL analytics endpoint.
- Public preview doesn't promise incremental change capture, source-delete propagation, conflict resolution, schema evolution, rich scheduling, checkpoints, or automatic replay.
- Use staging tables, validate row counts and keys, and publish through an idempotent PostgreSQL transaction.
- Copy job health is independent of PostgreSQL and mirroring health.

## Monitoring

- Public preview includes lifecycle state, basic query telemetry, PostgreSQL diagnostic views, capacity information, and separate integration health where exposed.
- A complete workspace monitoring experience, alert-history parity, automatic index management, and exact per-query CPU or memory attribution aren't supported.
- PostgreSQL statistics can reset, be evicted, arrive late, or be unavailable while paused.
- Query text and plans can contain sensitive data. Access and share them only with authorized personnel.
- Missing telemetry isn't zero activity and isn't proof of service health.

## Security and networking

- Use only the network access modes, DNS guidance, port, TLS mode, and certificate requirements published for Fabric HorizonDB.
- Don't apply private endpoint, firewall, or virtual network instructions from another database service.
- Confirm key-management and audit capabilities for your preview rather than applying another service's configuration.
- Service identities and integration identities must have explicit permissions on every source and destination. The service doesn't silently fall back to a more privileged identity.

## Related content

- [Fabric HorizonDB overview](overview.md).
- [Connect to Fabric HorizonDB](connect.md).
- [Control compute usage](control-compute-usage.md).
- [Security overview](security-overview.md).
- [Troubleshoot Fabric HorizonDB](troubleshoot.md).
