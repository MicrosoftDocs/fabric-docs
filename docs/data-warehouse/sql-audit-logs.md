---
title: "SQL Audit Logs in Fabric Data Warehouse (Preview)"
description: Learn more about SQL Audit Logs on Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: fresantos
ms.date: 07/15/2025
ms.topic: concept-article
ms.search.form: Warehouse SQL Audit Logs # This article's title should not change. If so, contact engineering.
---
# SQL audit logs in Fabric Data Warehouse (Preview)

**Applies to:** [!INCLUDE [fabric-dw.md](includes/applies-to-version/fabric-se-and-dw.md)]

Auditing in Fabric Data Warehouse provides enhanced security and compliance capabilities by tracking and recording database events.  

This feature enables organizations to monitor database activities, detect potential security threats, and meet compliance requirements by maintaining an audit trail of key actions:

- Authentication attempts and access control changes
- Data access and modification operations
- Schema changes and administrative activities
- Permission changes and security configurations

> [!IMPORTANT]
> By default, SQL audit logs are **OFF**. Users with **Audit queries** permissions must enable it to capture the logs.

The SQL audit logs feature is currently in preview.

To get started, review the steps in [How to configure SQL audit logs in Fabric Data Warehouse (Preview)](configure-sql-audit-logs.md).

## Storage

All logs are encrypted at rest, stored in the OneLake, and not directly visible to users.

Audit log files cannot be accessed directly from OneLake but they can be queried with T-SQL via [sys.fn_get_audit_file_v2](/sql/relational-databases/system-functions/sys-fn-get-audit-file-v2-transact-sql?view=fabric&preserve-view=true). For instructions, see [How to configure SQL audit logs in Fabric Data Warehouse](configure-sql-audit-logs.md#query-audit-logs).

> [!TIP]
> Configuring audit logs in Microsoft Fabric Data Warehouse can increase storage costs depending on the action groups and events recorded. Enable only the required events to avoid unnecessary storage costs.
 
## Permissions

Users must have the **Audit permission** to configure and query audit logs.

- By default, **Workspace Admins** have the **Audit queries** permission to all items in the workspace.
- Admins can grant **Audit queries**  permissions on items to other users via the share dialog box.

Workspace Admins can grant **Audit queries** permissions to an item using the shared menu option in the Fabric portal. To verify if a user has **Audit queries** permissions, check the **Manage Permissions** settings.

:::image type="content" source="media/sql-audit-logs/grant-access-audit-queries.png" alt-text="Screenshot showing where to select Audit Permission PREVIEW on the item Share menu.":::

## Database-level audit action groups and actions

Audit action groups define categories of events to be logged. The following are the predefined groups available in Fabric Data Warehouse:

| Action Group Name | Description |
|------------------|-------------|
| `DATABASE_OBJECT_ACCESS_GROUP` | Logs access to database objects like message types, assemblies, or contracts. |
| `DATABASE_OBJECT_CHANGE_GROUP` | Logs `CREATE`, `ALTER`, or `DROP` operations on database objects. |
| `DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP` | Logs ownership changes of database objects. |
| `DATABASE_OBJECT_PERMISSION_CHANGE_GROUP` | Logs `GRANT`, `REVOKE`, or `DENY` actions on database objects. |
| `DATABASE_OPERATION_GROUP` | Logs database operations such as checkpoints. |
| `DATABASE_PERMISSION_CHANGE_GROUP` | Logs permission changes at the database level. |
| `DATABASE_PRINCIPAL_CHANGE_GROUP` | Logs creation, alteration, or deletion of database principals (users, roles). |
| `DATABASE_PRINCIPAL_IMPERSONATION_GROUP` | Logs impersonation operations (such as `EXECUTE AS`). |
| `DATABASE_ROLE_MEMBER_CHANGE_GROUP` | Logs addition or removal of logins from a database role. |
| `FAILED_DATABASE_AUTHENTICATION_GROUP` | Logs failed authentication attempts within the database. |
| `SCHEMA_OBJECT_ACCESS_GROUP` | Logs access to schema objects. |
| `SCHEMA_OBJECT_CHANGE_GROUP` | Logs `CREATE`, `ALTER`, or `DROP` operations on schemas. |
| `SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP` | Logs changes to schema object ownership. |
| `SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP` | Logs `GRANT`, `REVOKE`, or `DENY` actions on schema objects. |

## Database-level audit actions

In addition to action groups, individual audit actions can be configured to log specific database events:

| Audit Action | Description |
|-------------|-------------|
| `SELECT` | Logs `SELECT` statements on a specified object. |
| `INSERT` | Logs `INSERT` operations on a specified object. |
| `UPDATE` | Logs `UPDATE` operations on a specified object. |
| `DELETE` | Logs `DELETE` operations on a specified object. |
| `EXECUTE` | Logs execution of stored procedures or functions. |
| `RECEIVE` | Logs `RECEIVE` operations on Service Broker queues. |
| `REFERENCES` | Logs permission checks involving foreign key constraints. |

## Limitations

- If audit logs are disabled, all action groups must be reconfigured upon re-enabling.
- Currently SQL Audit for Fabric Data Warehouse is not supported in the default workspace.
- SQL Audit Logs is not supported for [Warehouse Snapshots](warehouse-snapshot.md). 

## Next step

> [!div class="nextstepaction"]
> [Configure SQL audit logs in Fabric Data Warehouse](configure-sql-audit-logs.md)

## Related content

- [Security for data warehousing in Microsoft Fabric](security.md)
- [Security in Microsoft Fabric](../security/security-overview.md)
