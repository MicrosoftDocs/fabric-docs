---
title: "OneLake Security for SQL analytics endpoints (Preview)"
description: Learn how Microsoft Fabric's OneLake Security enhances data access control with centralized governance or granular SQL-based permissions.
author: SnehaGunda
ms.author: sngun
ms.reviewer: sngun
ms.date: 09/05/2025
ms.topic: concept-article
---

# OneLake security for SQL analytics endpoints (Preview)

With OneLake security, Microsoft Fabric is expanding how organizations can manage and enforce data access across workloads. This new security framework gives administrators greater flexibility to configure permissions. Administrators can choose between **centralized governance through OneLake** or **granular SQL-based control** within the SQL analytics endpoint.

## Access modes in SQL analytics endpoint

When using the **SQL analytics endpoint**, the selected access mode determines how data security is enforced. Fabric supports two distinct access models, each offering different benefits depending on your operational and compliance needs:

* **User identity mode**: Enforces security using OneLake roles and policies. In this mode, the SQL analytics endpoint passes the signed-in user’s identity to OneLake, and **read access is governed entirely by the security rules defined within OneLake**. SQL-level permissions on tables are supported, ensuring consistent governance across tools like Power BI, notebooks, and lakehouse.

* **Delegated identity mode**: Provides full control through SQL. In this mode, the SQL analytics endpoint connects to OneLake using the identity of the **workspace or item** owner, and **security is governed exclusively by SQL permissions** defined inside the database. This model supports traditional security approaches including GRANT, REVOKE, custom roles, Row-Level Security, and Dynamic Data Masking.

Each mode supports different governance models. Understanding their implications is essential for choosing the right approach in your Fabric environment.

## Comparison between access modes

Here’s a clear and concise comparison table focused on how and where you set security in user identity mode versus delegated identity mode—broken down by object type and data access policies:

| **Security target** | **User identity mode** | **Delegated identity mode** |
|----|----|----|
| **Tables** | Access is controlled by OneLake security roles. SQL `GRANT`/`REVOKE` isn't allowed. | Full control using SQL `GRANT`/`REVOKE`. |
| **Views** | Use SQL GRANT/REVOKE to assign permissions. | Use SQL GRANT/REVOKE to assign permissions. |
| **Stored procedures** | Use SQL GRANT EXECUTE to assign permissions. | Use SQL GRANT EXECUTE to assign permissions. |
| **Functions** | Use SQL GRANT EXECUTE to assign permissions. | Use SQL GRANT EXECUTE to assign permissions. |
| **Row-Level Security (RLS)** | Defined in OneLake UI as part of OneLake security roles. | Defined using SQL CREATE SECURITY POLICY. |
| **Column-Level Security (CLS)** | Defined in OneLake UI as part of OneLake security roles. | Defined using SQL GRANT SELECT with column list. |
| **Dynamic Data Masking (DDM)** | Not supported in OneLake security. | Defined using SQL `ALTER TABLE` with `MASKED` option. |

## User identity mode in OneLake security

In user identity mode, the SQL analytics endpoint uses a **passthrough authentication mechanism** to enforce data access. When a user connects to the SQL analytics endpoint, their Entra ID identity is passed through to OneLake, which performs the permission check. All read operations against tables are evaluated using the security rules defined within the OneLake Lakehouse, not by any SQL-level GRANT or
REVOKE statements.

This mode lets you manage security centrally, ensuring consistent enforcement across all Fabric experiences, including Power BI, notebooks, lakehouse, and SQL analytics endpoint. It's designed for governance models where access should be defined once in OneLake and automatically respected everywhere.

In user identity mode:

* Table access is governed entirely by OneLake security. SQL GRANT/REVOKE statements on tables are ignored.

* RLS (Row-Level Security), CLS (Column-Level Security), and Object-Level Security are all defined in the OneLake experience.

* SQL permissions are allowed for nondata objects like views, stored procedures, and functions, enabling flexibility for defining custom logic or user-facing entry points to data.

* Write operations aren't supported at the SQL analytics endpoint. All writes must occur through the Lakehouse UI and are governed by workspace roles (Admin, Member, Contributor).

>[!IMPORTANT]
>The SQL Analytics Endpoint requires a one-to-one mapping between item permissions and members in a OneLake security role to sync correctly. If you grant an identity access to a OneLake security role, that same identity needs to have Fabric Read permission to the lakehouse as well. For example, if a user assigns "user123@microsoft.com" to a OneLake security role then "user123@microsoft.com" must also be assigned to that lakehouse.

### Workspace role behavior

Users with the **Admin**, **Member**, or **Contributor** role at the workspace level aren't subject to OneLake security enforcement. These roles have elevated privileges and will bypass RLS, CLS, and OLS policies entirely. Follow these requirements to ensure OneLake security is respected:

* Assign users the **Viewer** role in the workspace, or

* Share the Lakehouse or SQL analytics endpoint with users using **read-only** permissions. Only users with read-only access have their queries filtered according to OneLake security roles.

## Role precedence: Most permissive access wins

If a user belongs to **multiple OneLake roles**, the most permissive role defines their effective access. For example:

* If one role grants full access to a table and another applies RLS to restrict rows, the **RLS will not be enforced**.

* The broader access role takes precedence. This behavior ensures users aren't unintentionally blocked, but it requires careful role design to avoid conflicts. It's recommended to keep restrictive and permissive roles **mutually exclusive** when enforcing row- or column-level access controls.

For more information, see the [data access control model](security/data-access-control-model.md) for OneLake security.

## Security sync between OneLake and SQL analytics endpoint

A critical component of user identity mode is the **security sync service**. This background service monitors changes made to security roles in OneLake and ensures those changes are reflected in the SQL analytics endpoint.

The security sync service is responsible for the following:

* Detecting changes to OneLake roles, including new roles, updates, user assignments, and changes to tables.

* Translating OneLake-defined policies (RLS, CLS, OLS) into equivalent SQL-compatible database role structures.

* Ensuring **shortcut objects** (tables sourced from other lakehouses) are properly validated so that the original OneLake security settings are honored, even when accessed remotely.

This synchronization ensures that OneLake security definitions stay authoritative, eliminating the need for manual SQL-level intervention to replicate security behavior. Because security is centrally enforced:

* You can't define RLS, CLS, or OLS directly using T-SQL in this mode.

* You can still apply SQL permissions to views, functions, and stored procedures using GRANT or EXECUTE statements.

### Security sync errors & resolution

| Scenario | Behavior in user identity mode | Behavior in delegated mode | Corrective action | Notes |
|----|----|----|----|
| **RLS policy references a deleted or renamed column** | Error: *Row-level security policy references a column that no longer exists.*Database enters error state until policy is fixed. | Error: *Invalid column name \<column name\>* | Update or remove one or more affected roles, or restore the missing column. | The update will need to be made in the lakehouse where the role was created. |
| **CLS policy references a deleted or renamed column** | Error: *Column-level security policy references a column that no longer exists.*Database enters error state until policy is fixed. | Error: *Invalid column name \<column name\>* | Update or remove one or more affected roles, or restore the missing column. | The update will need to be made in the lakehouse where the role was created. |
| **RLS/CLS policy references a deleted or renamed table** | Error: *Security policy references a table that no longer exists.* | No error surfaced; query fails silently if table is missing. | Update or remove one or more affected roles, or restore the missing table. | The update will need to be made in the lakehouse where the role was created. |
| **DDM (Dynamic Data Masking) policy references a deleted or renamed column** | DDM not supported from OneLake Security, must be implemented through SQL. | Error: *Invalid column name \<column name\>* | Update or remove one or more affected DDM rules, or restore the missing column. | Update the DDM policy in the SQL Analytics Endpoint. |
| **System error (unexpected failure)** | Error: *An unexpected system error occurred. Try again or contact support.* | Error: *An internal error has occurred while applying table changes to SQL.* | Retry operation; if issue persists, contact Microsoft Support. | N/A |
| **User doesn't have permission on the artifact** | Error: *User doesn't have permission on the artifact* | Error: *User doesn't have permission on the artifact* | Provide user with objectID {objectID} permission to the artifact. | The object ID must be an exact match between the OneLake security role member and the Fabric item permissions. If a group is added to the role membership, then that same group must be given the Fabric Read permission. Adding a member from that group to the item does not count as a direct match. |
| **User principal is not supported.** | Error: *User principal is not supported.* | Error: *User principal is not supported.* | Please remove user {username} from role DefaultReader | This error occurs if the user is no longer a valid Entra ID, such as if the user has left your organization or been deleted. Remove them from the role to resolve this error. |

### Shortcuts behavior with security sync

OneLake security is enforced at the source of truth, so security sync disables ownership chaining for tables and views involving shortcuts. This ensures that source system permissions are always evaluated and honored, even for queries from another database.

As a result:

* Users must have valid access on **both** the shortcut **source** (current Lakehouse or SQL analytics endpoint) **and** the **destination** where the data physically resides.

* If the user lacks permission on either side, **queries will fail** with an access error.

* When designing your applications or views that reference shortcuts, ensure that role assignments are properly configured on **both ends** of the shortcut relationship.

This design preserves security integrity across Lakehouse boundaries, but it introduces scenarios where access failures might occur if cross-Lakehouse roles aren't aligned.

## Delegated mode in OneLake security

In **Delegated Identity Mode**, the SQL analytics endpoint uses the same **security model that exists today** in Microsoft Fabric. Security and permissions are managed entirely at the **SQL layer**, and **OneLake roles or access policies aren't enforced** for table-level access. When a user connects to the SQL analytics endpoint and issues a query:

* SQL validates access based on **SQL permissions** (GRANT, REVOKE, RLS, CLS, DDM, roles, etc.).

* If the query is authorized, the system proceeds to access data stored in **OneLake**.

* This data access is performed using the **identity of the Lakehouse or SQL analytics endpoint owner**—also known as the **item account**.

In this model:

* The signed-in user isn't passed through to OneLake.

* All enforcement of access is assumed to be handled at the SQL layer.

* The **item owner** is responsible for having sufficient permissions in OneLake to read the underlying files on behalf of the workload.

Because this is a delegated pattern, any misalignment between SQL permissions and OneLake access for the owner results in query failures. This mode provides full compatibility with:

* SQL GRANT/REVOKE at all object levels

* SQL-defined **Row-Level Security**, **Column-Level Security**, and **Dynamic Data Masking**

* Existing T-SQL tooling and practices used by DBAs or applications

## How to change the OneLake access mode

The access mode determines how data access is authenticated and enforced when querying OneLake through SQL analytics endpoint. You can switch between user identity mode and delegated identity mode using the following steps:

1. Navigate to your Fabric workspace and open your lakehouse. From top right hand corner, switch from lakehouse to **SQL analytics endpoint**.

1. From the top navigation, go to **Security** tab and select the one of the following OneLake access modes:  

   * **User identity** – Uses the signed-in user's identity. It enforces OneLake roles.

   * **Delegated identity** – Uses the item owner's identity; enforces only SQL permissions.

1. A pop-up launches to confirm your selection. Select **Yes** to confirm the change.

## Considerations when switching between modes

>[!IMPORTANT]
>Switching between User Identity and Delegated modes (in either direction) currently removes inline metadata objects, including TVFs and Scalar-Valued Functions. This behavior affects metadata definitions only; underlying data in OneLake is not impacted.

**Switching to user identity mode**

* SQL RLS, CLS, and table-level permissions are ignored.

* OneLake roles must be configured for users to maintain access.

* Only users with Viewer permissions or shared read-only access will be governed by OneLake security.

* Existing SQL Roles are deleted and can't be recovered.

**Switching to delegated identity mode**

* OneLake roles and security policies are no longer applied.

* SQL roles and security policies become active.

* The item owner must have valid OneLake access, or all queries may fail.

## Limitations

* **Applies only to readers**: OneLake Security governs users accessing data as *Viewers*. Users in other workspace roles (Admin Member, or Contributor) bypass OneLake Security and retain full access.

* **SQL objects do not inherit ownership**: Shortcuts are surfaced in SQL analytics endpoint as tables. When accessing these tables, directly or through views, stored procedures, and other derived SQL objects don't carry object-level ownership; all
  permissions are checked at runtime to prevent the security bypass.

* **Shortcut changes trigger validation downtime**: When a shortcut target changes (for example, rename, URL update), the database enters *single-user mode* briefly while the system validates the new target. During this period queries are blocked, these operations a fairly quick, but sometimes depending on different internal process can take up to 5 minutes to synchronize.

  * Creating schema shortcuts might cause a known error that affects validation and delays metadata sync.

* **Delayed permission propagation**: Permission changes aren't instantaneous. Switching between security modes (User Identity vs. Delegated) may require time to propagate before taking effect, but should take less than 1 minute.

* **Control-plane dependency**: Permissions can't be applied to users or groups that don't already exist in the workspace control plane. You either need to share the source item, or the user must be member of Viewer workspace role. Note that the exact same object ID must be in both places. A group and a member of that group do not count as a match.

* **Most-permissive access prevails**: When users belong to multiple groups or roles, the most permissive effective permission is honored *Example*: If a user has both DENY through one role and GRANT through another, the GRANT takes precedence.

* **Delegated mode limitations**: In Delegated mode, metadata sync on shortcut tables can fail if the source item has OneLake Security policies that don't grant full table access to the item owner.

* **DENY behavior**: When multiple roles apply to a single shortcut table, the intersection of permissions follows SQL Server semantics: DENY overrides GRANT. This can produce unexpected access results.

* **Expected error conditions**: Users may encounter errors in scenarios such as:

  * Shortcut target renamed or invalid

    * *Example*: If the source of table was deleted.

  * RLS (Row-Level Security) misconfiguration

    * Some expressions for RLS filtering aren't supported in OneLake and it might allow unauthorized data access.
  
    * Dropping the column used on the filter expression invalidates the RLS and Metadata Sync will be stale until the RLS is fixed on OneLake Security Panel.

    * For Public Preview, we only support single expression tables. Dynamic RLS and Multi-Table RLS aren't supported at the moment.

  * Column-Level Security (CLS) limitations

    * CLS works by maintaining an allowlist of columns. If an allowed column is removed or renamed, the CLS policy becomes invalid.

    * When CLS is invalid, metadata sync is blocked until the CLS rule is fixed in the OneLake Security panel.

  * Metadata or permission sync failure

    * If there are changes to the table, like renaming a column, security isn't replicated on the new object, and you receive UI errors showing that the column doesn't exist.

* **Table renames do not preserve security policies**: If OneLake Security (OLS) roles are defined on Schema level, those roles remain in effect only as long as the table name is unchanged. Renaming the table breaks the association, and security policies won't be migrated automatically. This can result in unintended data exposure until policies are reapplied.

* OneLake security roles can't have names longer than 124 characters; otherwise, security sync can't synchronize the roles.
 
* OneLake security roles are propagated on the SQL analytics endpoint with the OLS_ prefix.

* User changes on the OLS_ roles are not supported, and can cause unexpected behaviors.
 
* Mail enabled security groups and distribution lists are not supported.
  
* The owner of the lakehouse must be a member of the admin, member, or contributor workspace roles; otherwise, security isn't applied to the SQL analytics endpoint.

* The owner of the lakehouse cannot be a service principal for security sync to work. 

## Related content

* [Best practices to secure data in OneLake](security/best-practices-secure-data-in-onelake.md)
* [OneLake security access control model](security/data-access-control-model.md)
