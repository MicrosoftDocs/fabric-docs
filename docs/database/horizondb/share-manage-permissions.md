---
title: "Item permissions and database access in Fabric HorizonDB"
description: Understand why sharing a Fabric HorizonDB item doesn't enable additional PostgreSQL connections in the current preview.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ms.search.form: Fabric HorizonDB sharing, PostgreSQL permissions
ai-usage: ai-assisted
---
# Item permissions and database access in Fabric HorizonDB

Fabric workspace and item permissions control access to Fabric experiences. They don't override the PostgreSQL connection restrictions in the current Fabric HorizonDB preview.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Only the Microsoft Entra identity that created the database can connect to PostgreSQL. Other users and principals can't connect, even after you share the item. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Access to your preview-enabled Fabric workspace.
- The database creator's Microsoft Entra identity for PostgreSQL exercises.
- A clear distinction between operational database access and analytical access.

## Understand item sharing

Review item and workspace permissions in Fabric for the tasks those experiences support. Don't instruct recipients to connect to PostgreSQL after an item share: additional database users aren't supported in the current preview.

Use the creator's identity for the SQL editor, Visual Studio Code, local application exercises, and the Copy job destination connection. Don't share the creator's credentials with another person.

## Validate the creator connection

Connect as the database creator and run:

```sql
SELECT
    current_database() AS database_name,
    current_user AS current_role,
    session_user AS session_role,
    clock_timestamp() AS checked_at;
```

Then test the intended operation. For example, inspect effective read and write privileges without changing data:

```sql
SELECT
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

The result shows only the current session's effective PostgreSQL privileges. It isn't evidence that another identity can connect.

## Share analytical results separately

Use the mirrored SQL analytics endpoint, a semantic model, or a report for analytical consumers when those experiences are available in your workspace. Configure and test their permissions separately from the PostgreSQL database.

Review [Secure mirrored data](mirroring-secure.md) before sharing. Remove analytical access through the corresponding Fabric item, and validate the result with the recipient's own identity.

## Limitations

- Sharing doesn't grant PostgreSQL superuser, host access, or database ownership.
- Only the creator can connect to PostgreSQL.
- Table-level and view-level user permission management isn't available.
- Database users can't create or manage PostgreSQL users or roles.
- Other Microsoft Entra users, groups, service principals, and managed identities can't connect to PostgreSQL.
- Sharing one item doesn't grant access to a federation source, Copy job source, mirrored item, report, or SQL analytics endpoint unless that resource is authorized separately.

## Related content

- [Share analytical data](share-data.md).
- [Authorization](authorization.md).
- [Validate PostgreSQL access](configure-postgresql-access-controls.md).
- [Security overview](security-overview.md).
