---
title: "Authorization in Microsoft Fabric HorizonDB"
description: Understand how Fabric permissions and PostgreSQL enforcement work for Fabric HorizonDB during public preview.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ms.search.form: Fabric HorizonDB authorization, PostgreSQL access control
ai-usage: ai-assisted
---
# Authorization in Microsoft Fabric HorizonDB

Fabric HorizonDB roles and PostgreSQL native roles are different. In the current preview, only the Microsoft Entra identity that created the HorizonDB database can connect to the database.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Sharing the database item or assigning a workspace role doesn't allow another Microsoft Entra user or principal to connect to PostgreSQL. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Fabric authorization and PostgreSQL enforcement

| Layer | Responsibility |
|---|---|
| Fabric tenant, capacity, workspace, and item | Controls item discovery, sharing, configuration, monitoring, and lifecycle operations. |
| Fabric HorizonDB PostgreSQL endpoint | Authenticates the calling Microsoft Entra principal and enforces the effective database, schema, and object privileges. |
| Integration source and destination | Separately authorizes mirroring, federation, Copy jobs, reports, and other Fabric resources. |

These layers aren't interchangeable. Permission to manage the Fabric item doesn't imply PostgreSQL superuser, database ownership, or unrestricted access to every customer table. A successful PostgreSQL connection also doesn't grant permission to configure or delete the Fabric item.

## Current public preview model

- Microsoft Entra ID is the supported authentication model.
- The calling principal determines the effective PostgreSQL connection identity.
- Only the database creator can establish a PostgreSQL connection.
- Use the creator's identity for local application exercises and the Copy job destination.
- The creator also needs permission to read each Fabric source used for federation or loading.
- Customers don't receive PostgreSQL superuser, host, or filesystem access.

Don't use Fabric claim-to-role mappings as a way to onboard additional database users. Multiuser PostgreSQL access, service-principal connections, and managed-identity connections aren't available in the current preview.

## Validate effective authorization

Connect with the database creator's Microsoft Entra identity and run:

```sql
SELECT
    current_user,
    session_user,
    current_database();
```

Inspect effective privileges for the intended objects:

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
    ) AS can_read_orders,
    has_table_privilege(
        current_user,
        'horizon_sample.orders',
        'UPDATE'
    ) AS can_update_orders;
```

These checks inspect the current session; they don't grant access to another user. If a supported operation is denied to the creator, record the sanitized error and object details for your preview contact.

## Integration authorization

An integration can require authorization on multiple resources:

- The HorizonDB database.
- The source or target table.
- The other Fabric item or endpoint.
- The identity binding exposed by the integration.

Use **Organizational account** authentication with the database creator for the Copy job destination. Configure permissions on the source warehouse and analytical consumers separately. A PostgreSQL connection doesn't grant read access to an arbitrary Fabric source.

## Revocation behavior

Manage Fabric item and downstream analytical permissions through their respective experiences. Don't treat an item-permission change as an immediate PostgreSQL session-termination mechanism. Ask your preview contact about supported access-removal procedures when required.

## Related content

- [Authentication](authentication.md).
- [Validate PostgreSQL access](configure-postgresql-access-controls.md).
- [Item permissions and database access](share-manage-permissions.md).
- [Security overview](security-overview.md).
