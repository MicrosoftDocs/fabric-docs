---
title: "Validate PostgreSQL access to Microsoft Fabric HorizonDB"
description: Validate the database creator's Microsoft Entra connection and inspect effective PostgreSQL access during preview.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ms.search.form: Fabric HorizonDB PostgreSQL access control, Microsoft Entra access
ai-usage: ai-assisted
---
# Validate PostgreSQL access to Microsoft Fabric HorizonDB

Use the database creator's Microsoft Entra identity to connect to Fabric HorizonDB. This article helps you verify the identity and inspect its effective access without configuring additional users.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Only the Microsoft Entra identity that created the database can connect. Other users and principals can't connect, even after the Fabric item is shared. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- A HorizonDB database.
- Sign-in as the Microsoft Entra user who created the database.
- The PostgreSQL connection values shown by the HorizonDB database.

## Understand the public preview access model

The access path includes two enforcement points:

| Enforcement point | Purpose |
|---|---|
| Fabric | Controls whether the principal can discover and use the item through supported Fabric experiences. |
| Fabric HorizonDB PostgreSQL endpoint | Authenticates the Microsoft Entra token and enforces the database privileges materialized for the principal. |

Fabric workspace and item permissions don't override the preview's creator-only PostgreSQL connection restriction. Don't attempt to add users through SQL roles, group membership, service principals, or managed identities.

## Open a creator connection

1. Open the HorizonDB database as its creator.
1. Select **New Query**, or select **Visual Studio Code** to open a desktop connection.
1. For a desktop connection, select **Entra Auth** and sign in as the creator.
1. Keep the PostgreSQL endpoint and database name supplied by the item.

## Validate access

Open a new connection as the creator and run:

```sql
SELECT
    current_database() AS database_name,
    current_user AS current_role,
    session_user AS session_role,
    clock_timestamp() AS checked_at;
```

Confirm that the returned role represents the creator or its mapped database identity. Then test the intended operation against a practice table.

You can inspect an effective privilege without changing data:

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

These functions report the privileges visible to the current session.

## SQL role management isn't supported

Database users can't manage users or roles through SQL during public preview. Don't use:

- `CREATE ROLE`, `ALTER ROLE`, or `DROP ROLE`.
- `GRANT role TO principal` or `REVOKE role FROM principal`.
- Password-based login roles.
- Custom role hierarchies for table-level or view-level user permissioning.

These commands aren't a workaround for the creator-only restriction.

## Change or revoke access

Manage item and analytical access through Fabric. Those permissions don't enable another PostgreSQL identity. For changes to the creator's access or existing sessions, confirm the supported procedure with your preview contact.

## Public preview limitations

- Microsoft Entra authentication is required. PostgreSQL password authentication isn't the supported customer identity model.
- Only the database creator can connect.
- Table-level and view-level user permission management isn't available.
- Other Microsoft Entra users, groups, service principals, and managed identities can't connect.
- Customers don't receive PostgreSQL superuser, host, or filesystem access.

## Troubleshoot

| Symptom | Resolution |
|---|---|
| The user can't open the item | Verify the workspace and item permission in Fabric. |
| The PostgreSQL token is rejected | Sign in as the creator, acquire a fresh token using your preview's authentication guidance, and verify tenant, endpoint, TLS settings, and client clock. |
| `current_user` isn't the expected identity | Reconnect with the intended Microsoft Entra account. Don't try to select another identity by changing only the PostgreSQL username. |
| The creator connects but a query is denied | Check object ownership, the effective privilege, and whether the operation is supported. |
| Another user can't connect after sharing | Expected in the current preview. Sharing doesn't enable another PostgreSQL identity. |
| `CREATE ROLE` or `GRANT role` fails | Don't use SQL roles to bypass the preview connection restriction. |

## Related content

- [Authorization](authorization.md).
- [Item permissions and database access](share-manage-permissions.md).
- [Authentication](authentication.md).
