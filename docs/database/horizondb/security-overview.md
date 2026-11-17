---
title: "Security in Microsoft Fabric HorizonDB"
description: Learn the identity, authorization, encryption, network, monitoring, and governance boundaries for Fabric HorizonDB.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ms.search.form: Fabric HorizonDB security, PostgreSQL security
ai-usage: ai-assisted
---
# Security in Microsoft Fabric HorizonDB

Security for Fabric HorizonDB combines Fabric control-plane authorization with PostgreSQL data-plane authentication and privileges. Treat these layers separately when you design access, applications, and incident response.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Shared responsibility

Fabric manages the service infrastructure, compute placement, durable storage, service extensions, supported maintenance, and service-managed encryption. You remain responsible for:

- Workspace and item sharing.
- The database creator's Microsoft Entra account and its use in preview client exercises.
- Customer schema design, object ownership, and application behavior within the supported service boundary.
- Application token handling and connection-pool behavior.
- Classification and safe use of query text and result data.
- Security of customer exports and downstream Fabric items.
- Reviewing dependencies before destructive operations.

## Authentication

Fabric HorizonDB supports Microsoft Entra authentication. **Only the Microsoft Entra identity that created the database can connect in the current preview.** Other users, service principals, and managed identities can't connect, even if they can open the item.

- Use short-lived tokens and acquire a fresh token for new physical connections.
- Validate the tenant, audience or scope, user format, token lifetime, and system clock.
- Don't place tokens in URLs, source code, notebooks, screenshots, shell history, or logs.
- Don't fall back to a shared or more privileged identity when authentication fails.
- Refresh connection pools before token expiry.

Customers don't receive PostgreSQL superuser, host, or filesystem access.

For more information, see [Authentication](authentication.md).

## Authorization

An identity can pass one layer and fail another:

| Layer | Controls |
|---|---|
| Fabric tenant, capacity, workspace, and item | Discover, create, share, configure, monitor, and delete the item. |
| PostgreSQL database, schema, and object privileges | Enforce the database access materialized for the calling Microsoft Entra principal. |
| Integration source and destination | Mirroring, federation, Copy jobs, reports, and other Fabric items each require their own authorization. |

Sharing a HorizonDB database doesn't grant PostgreSQL connection access to another identity. It also doesn't grant superuser, host access, or database ownership.

For more information, see [Authorization](authorization.md) and [Validate PostgreSQL access](configure-postgresql-access-controls.md).

## Encryption

Service-managed encryption protects applicable durable data. Use the TLS mode and certificate guidance published in the Fabric HorizonDB connection experience for data in transit.

Confirm the encryption and key-management options available for your preview. Don't assume that another Fabric or PostgreSQL service's encryption procedures apply.

For more information, see [Encryption](encryption.md).

## Network access

Use only the public preview ingress, DNS, port, routing, and TLS guidance published specifically for Fabric HorizonDB. A stable endpoint name doesn't prove that every network path is supported.

- Don't infer firewall, private endpoint, or virtual network behavior from another managed PostgreSQL offering.
- Preserve the released network policy in applications and integrations.
- Distinguish a policy denial from a platform connectivity failure.
- Validate authorization on both sides of a cross-workspace integration.

## Managed service boundary

Fabric HorizonDB uses a curated PostgreSQL surface:

- Service-managed extensions can't be dropped, replaced, or modified by customers.
- Visibility in `pg_available_extensions` doesn't guarantee installation permission.
- Arbitrary native libraries and unrestricted server parameters aren't supported.
- Customer code must remain in customer-owned schemas.
- Service schemas, identities, and integration resources must not be modified unless the product documentation explicitly instructs you to do so.
- Database users can't create or manage PostgreSQL users or roles.
- Per-table and per-view user permissioning isn't available.

## Data sharing

When sharing:

1. Keep operational PostgreSQL exercises under the creator's identity.
1. Don't share the creator's credentials.
1. Use supported analytical items to share mirrored results.
1. Configure analytical permissions independently.
1. Validate analytical access with the recipient's own identity.

For more information, see [Item permissions and database access](share-manage-permissions.md).

## Monitoring and privacy

PostgreSQL activity and query text can contain user data, secrets embedded by unsafe applications, or sensitive predicates. Limit diagnostic visibility and sanitize evidence before sharing it.

Security monitoring should include:

- Failed and unexpected authentication.
- Schema and object DDL changes.
- Long-lived or unexpected sessions.
- Item sharing and management changes.
- Integration identity failures.
- Operation and correlation IDs for privileged lifecycle actions.

Public preview doesn't include customer audit configuration as a supported feature. Basic query telemetry isn't a substitute for a security audit trail.

## Deletion

Review dependent Fabric items before deletion, preserve required customer-controlled exports, and treat deletion as irreversible.

## Security checklist

- Use Microsoft Entra authentication.
- Treat Fabric permission management and PostgreSQL enforcement as distinct layers.
- Use only the database creator for PostgreSQL connections.
- Don't attempt SQL user or role management.
- Don't create password logins to work around a missing Microsoft Entra mapping.
- Keep tokens and connection settings out of source control.
- Use parameterized SQL.
- Bound connection pools and refresh credentials.
- Use only documented TLS and network settings.
- Protect exports and notebook outputs.
- Validate both sides of every Fabric integration.
- Use a dedicated test workspace and synthetic, nonsensitive data.
- Confirm backup, restore, and recovery limitations before evaluating the preview.

## Related content

- [Authentication](authentication.md).
- [Authorization](authorization.md).
- [Validate PostgreSQL access](configure-postgresql-access-controls.md).
- [Encryption](encryption.md).
- [Fabric HorizonDB limitations](limitations.md).
