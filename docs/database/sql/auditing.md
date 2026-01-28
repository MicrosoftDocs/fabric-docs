---
title: Auditing for Fabric SQL Database
description: Learn how to configure and manage auditing for Fabric SQL database using Fabric portal.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: srsaluru
ms.date: 11/17/2025
ms.topic: concept-article
ms.search.form: SQL database security
---

# Auditing (preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Auditing for SQL databases in Fabric is a critical security and compliance feature that enables organizations to track and log database activities. Auditing supports compliance, threat detection, and forensic investigations by helping to answer questions like who accessed what data, when, and how.

[!INCLUDE [preview-note](../../includes/feature-preview-note.md)]

## What is SQL auditing?

SQL auditing refers to the process of capturing and storing events related to database activity. These events include data access, schema changes, permission modifications, and authentication attempts. 

In Fabric, auditing is implemented at the database level and supports:

- Compliance monitoring (for example: HIPAA, SOX)
- Security investigations
- Operational insights

## Audit target

Audit logs are written to a read-only folder in OneLake and can be queried using the `sys.fn_get_audit_file_v2` T-SQL function or the OneLake Explorer.

For SQL database in Fabric, audit logs are stored in OneLake: `https://onelake.blob.fabric.microsoft.com/{workspace_id}/{artifact_id}/Audit/sqldbauditlogs/`

These logs are immutable and accessible to users with appropriate permissions. Logs can also be downloaded using OneLake Explorer or Azure Storage Explorer.

## Configuration options

By default, the **Audit everything** option auditing captures all events including: batch completions and successful and failed authentication. 

To be more selective, choose from preconfigured audit scenarios, for example: **Permission Changes & Login Attempts**, **Data Reads and Writes**, and/or **Schema Changes**.

Each preconfigured scenario maps to specific audit action groups (for example, `SCHEMA_OBJECT_ACCESS_GROUP`, `DATABASE_PRINCIPAL_CHANGE_GROUP`). You can also choose which events to audit under **Custom Events**. Advanced users can select individual action groups to tailor auditing to their needs. This is ideal for customers with strict internal security policies.

To filter out common or known access queries, you can provide **predicate expressions** in Transact-SQL (T-SQL) to filter out audit events based on conditions (for example, to exclude SELECT statements): `WHERE statement NOT LIKE '%select%'`.

## Permissions

To manage auditing using Fabric workspace roles (recommended), users must have membership in the Fabric workspace **Contributor** role or higher permissions. 

To manage auditing with SQL permissions:
 - To configure the database audit, users must have ALTER ANY DATABASE AUDIT permission.
 - To view audit logs using T-SQL, users must have the VIEW DATABASE SECURITY AUDIT permission.

## Retention

By default, audit data is kept indefinitely. You can configure a custom retention period in the section **Automatically delete logs after this duration**.

## Configure auditing for SQL database from the Fabric portal

To begin auditing for a Fabric SQL database:

1. Navigate to and open your SQL database in Fabric portal.
1. From the main menu, select the **Security** tab, then select **Manage SQL auditing**.
   :::image type="content" source="media/auditing/manage-sql-auditing.png" alt-text="Screenshot from the Fabric portal, showing the Security tab, and the Manage SQL auditing button.":::
1. The **Manage SQL Auditing** pane opens.
1. Select the **Save Events to SQL Audit Logs** button to enable auditing.
1. Configure which events to record in the **Database Events** section. Choose **Audit everything (default)** to capture all events.
1. Optionally, configure a retention policy under **Retention**.
1. Optionally, configure a predicate expression of T-SQL commands to ignore in the **Predicate Expression** field. 
1. Select **Save**.

## Query audit logs

Audit logs can be queried using the T-SQL functions [sys.fn_get_audit_file](/sql/relational-databases/system-functions/sys-fn-get-audit-file-transact-sql?view=fabric-sqldb&preserve-view=true) and [sys.fn_get_audit_file_v2](/sql/relational-databases/system-functions/sys-fn-get-audit-file-v2-transact-sql?view=fabric-sqldb&preserve-view=true). 

In the following script, you need to provide the workspace ID and database ID. Both can be found in the URL from the Fabric portal. For example: `https://fabric.microsoft.com/groups/<fabric workspace id>/sqldatabases/<fabric sql database id>`. The first unique identifier string in the URL is the Fabric workspace ID, and the second unique identifier string is the SQL database ID.

- Replace `<fabric_workspace_id>` with your Fabric workspace ID. You can [find the ID of a workspace](../../admin/portal-workspace.md#identify-your-workspace-id) easily in the URL, it's the unique string inside two `/` characters after `/groups/` in your browser window.
- Replace `<fabric sql database id>` with your SQL database in Fabric database ID. You can find the ID of the database item easily in the URL, it's the unique string inside two `/` characters after `/sqldatabases/` in your browser window.

For example:

```sql  
SELECT * FROM sys.fn_get_audit_file_v2(
  'https://onelake.blob.fabric.microsoft.com/<fabric workspace id>/<fabric sql database id>/Audit/sqldbauditlogs/',
  DEFAULT, DEFAULT, DEFAULT, DEFAULT );
```

This example retrieves audit logs between `2025-11-17T08:40:40Z` and `2025-11-17T09:10:40Z`.

```sql
SELECT *
FROM sys.fn_get_audit_file_v2(
    'https://onelake.blob.fabric.microsoft.com/<fabric workspace id>/<fabric sql database id>/Audit/sqldbauditlogs/',
    DEFAULT,
    DEFAULT,
    '2025-11-17T08:40:40Z',
    '2025-11-17T09:10:40Z')
```

For more information, see [sys.fn_get_audit_file](/sql/relational-databases/system-functions/sys-fn-get-audit-file-transact-sql?view=fabric-sqldb&preserve-view=true) and [sys.fn_get_audit_file_v2](/sql/relational-databases/system-functions/sys-fn-get-audit-file-v2-transact-sql?view=fabric-sqldb&preserve-view=true).

## Related content

- [Security in SQL database in Microsoft Fabric](security-overview.md)
- [Audit schema for domains in Fabric](../../governance/domains-audit-schema.md)
