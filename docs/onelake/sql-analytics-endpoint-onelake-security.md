---
title: "OneLake Security for SQL analytics endpoints (Preview)"
description: Learn how Microsoft Fabric's OneLake Security enhances data access control with centralized governance or granular SQL-based permissions.
author: SnehaGunda
ms.author: sngun
ms.reviewer: sngun
ms.date: 09/03/2025
ms.topic: concept-article
---

# OneLake Security for SQL analytics endpoints (Preview)

With OneLake security, Microsoft Fabric is expanding how organizations can manage and enforce data access across workloads. This new security framework provides greater flexibility in how administrators configure permissions. Administrators can now choose between **centralized governance through OneLake** or **granular, SQL-based control** within SQL analytics endpoint.

## Access Modes in SQL analytics endpoint

When working with **SQL analytics endpoint**, the selected **access mode** plays a crucial role in determining how data security is enforced. Fabric now supports two distinct access models, each offering different benefits depending on your operational and compliance needs:

1. **User Identity Mode**: Enforces security using OneLake roles and policies. In this mode, the SQL analytics endpoint passes the signed-in user’s identity to OneLake, and **read access is governed entirely by the security rules defined within OneLake**. SQL-level permissions on tables are supported, ensuring consistent governance across tools like Power BI, Notebooks, and the Lakehouse Portal.

2. **Delegated Identity Mode**: Provides full control through SQL. In this mode, the SQL analytics endpoint connects to OneLake using the identity of the **workspace or item** **owner**, and **security is governed exclusively by SQL permissions** defined inside the database. This model supports traditional security approaches including GRANT, REVOKE, custom roles, Row-Level Security, and Dynamic Data Masking.

Each mode supports different governance models, and understanding their implications is essential for choosing the right approach in your Fabric environment.

Here’s a clear and concise comparison table focused specifically on how and where you set security in User Identity vs Delegated Identity mode — broken down by object type and data access policies:

### Access Mode Comparison: Where Security Is Defined

| **Security Target** | **User Identity Mode** | **Delegated Identity Mode** |
|----|----|----|
| **Tables** | Access is controlled by OneLake security roles. SQL GRANT/REVOKE is not allowed. | Full control using SQL GRANT/REVOKE. |
| **Views** | Use SQL GRANT/REVOKE to assign permissions. | Use SQL GRANT/REVOKE to assign permissions. |
| **Stored Procedures** | Use SQL GRANT EXECUTE to assign permissions. | Use SQL GRANT EXECUTE to assign permissions. |
| **Functions** | Use SQL GRANT EXECUTE to assign permissions. | Use SQL GRANT EXECUTE to assign permissions. |
| **Row-Level Security (RLS)** | Defined in OneLake UI as part of OneLake security roles. | Defined using SQL CREATE SECURITY POLICY. |
| **Column-Level Security (CLS)** | Defined in OneLake UI as part of OneLake security roles. | Defined using SQL GRANT SELECT with column list. |
| **Dynamic Data Masking (DDM)** | Not supported in OneLake security. | Defined using SQL ALTER TABLE with MASKED option. |

# User Identity Mode in OneLake Security

#### How It Works

In **User Identity Mode**, the SQL analytics endpoint uses a**passthrough authentication mechanism** to enforce data access. When a user connects to the SQL analytics endpoint, their **Entra ID identity
is passed through to OneLake**, which performs the permission check. All read operations against tables are evaluated using the security rules defined within the OneLake Lakehouse, not by any SQL-level GRANT or
REVOKE statements.

This mode enables **centralized security management**, ensuring consistent enforcement across all Fabric experiences, including Power BI, Notebooks, Lakehouse Portal, and SQL analytics endpoint. It is designed for governance models where access should be defined once in OneLake and automatically respected everywhere.

In User Identity Mode:

* **Table access** is governed entirely by OneLake security. SQL GRANT/REVOKE statements on tables are ignored.

* **RLS (Row-Level Security), CLS (Column-Level Security), and Object-Level Security** are all defined in the OneLake experience.

* **SQL permissions are allowed** for non-data objects like **views, stored procedures, and functions**, enabling flexibility for defining custom logic or user-facing entry points to data.

* **Write operations** are not supported at the SQL analytics endpoint. All writes must occur through the Lakehouse UI and are governed by **workspace roles** (Admin, Member, Contributor).

#### Workspace Role Behavior

Users assigned as **Admin**, **Member**, or **Contributor** at the workspace level are not subject to OneLake security enforcement. These roles have elevated privileges and will bypass RLS, CLS, and OLS
policies entirely.

To ensure that OneLake security is respected:

* Assign users the **Viewer** role in the workspace, or

* Share the Lakehouse or SQL analytics endpoint with users using **read-only permissions**. Only users with read-only access will have their queries filtered according to OneLake security roles.

#### Role Precedence: Most Permissive Access Wins

When a user belongs to **multiple OneLake roles**, the effective access is determined by the most permissive role. For example:

* If one role grants full access to a table and another applies RLS to restrict rows, the **RLS will not be enforced**.

* The broader access role takes precedence. This behavior ensures that users are not unintentionally blocked but requires careful role design to prevent conflicts. It is recommended to keep restrictive and permissive roles **mutually exclusive** when enforcing row- or column-level access controls.

For more details, see the [data access control model](https://learn.microsoft.com/en-us/fabric/onelake/security/data-access-control-model) for OneLake security.

## Security Sync

A critical component of User Identity Mode is the **Security Sync service**. This background service monitors changes made to security roles in OneLake and ensures those changes are reflected in the SQL
analytics endpoint.

Security Sync is responsible for:

* Detecting changes to OneLake roles (new roles, updates, user assignments, changes to included tables).

* Translating OneLake-defined policies (RLS, CLS, OLS) into equivalent **SQL-compatible database role structures**.

* Ensuring **shortcut objects** (tables sourced from other Lakehouses) are properly validated so that **the original OneLake security settings are honored**, even when accessed remotely.

This synchronization ensures that all OneLake security definitions remain authoritative, and no manual intervention is needed at the SQL level to replicate security behavior.

Because security is centrally enforced:

* **You cannot define RLS, CLS, or OLS directly using T- SQL** in this mode.

* You **can** still apply SQL permissions to views, functions, and stored procedures using GRANT or EXECUTE statements.

## Table for security sync errors\*

| **Scenario** | **Behavior in User Identity Mode** | **Behavior in Delegated Mode** | **Corrective Action** |
|----|----|----|----|
| **RLS policy references a deleted or renamed column** | Error: *Row-level security policy references a column that no longer exists.*Database enters error state until policy is fixed. | Error: *Invalid column name \<column name\>* | Update or remove the affected role(s), or restore the missing column. |
| **CLS policy references a deleted or renamed column** | Error: *Column-level security policy references a column that no longer exists.*Database enters error state until policy is fixed. | Error: *Invalid column name \<column name\>* | Update or remove the affected role(s), or restore the missing column. |
| **RLS/CLS policy references a deleted or renamed table** | Error: *Security policy references a table that no longer exists.* | No error surfaced; query fails silently if table is missing. | Update or remove the affected role(s), or restore the missing table. |
| **DDM (Dynamic Data Masking) policy references a deleted or renamed column** | DDM not supported from OneLake Security, must be implmented through SQL. | Error: *Invalid column name \<column name\>* | Update or remove the affected DDM rule(s), or restore the missing column. |
| **System error (unexpected failure)** | Error: *An unexpected system error occurred. Please try again or contact support.* | Error: *An internal error has occurred while applying table changes to SQL.* | Retry operation; if issue persists, contact Microsoft Support. |

#### Important: Behavior with Shortcuts

Because OneLake security is enforced at the **source of truth**, **Security Sync disables ownership chaining** for both tables and views when shortcuts are involved. This is required to ensure that
**permissions defined on the source system** are always evaluated and honored—even when queries originate from another database.

As a result:

* Users must have valid access on **both** the shortcut **source** (current Lakehouse or SQL analytics endpoint) **and** the **destination** where the data physically resides.

* If the user lacks permission on either side, **queries will fail** with an access error.

* When designing your applications or views that reference shortcuts, ensure that role assignments are properly configured on **both ends** of the shortcut relationship.

This design preserves security integrity across Lakehouse boundaries, but it introduces scenarios where access failures may occur if cross-Lakehouse roles are not aligned.

# Delegated Mode in OneLake Security

#### How It Works

In **Delegated Identity Mode**, the SQL analytics endpoint operates using the same **security model that exists today** in Microsoft Fabric. Security and permissions are managed entirely at the **SQL layer**, and **OneLake roles or access policies are not enforced** for table-level access.

When a user connects to the SQL analytics endpoint and issues a query:

* SQL validates access based on **SQL permissions** (GRANT, REVOKE, RLS, CLS, DDM, roles, etc.).

* If the query is authorized, the system proceeds to access data stored in **OneLake**.

* This data access is performed using the **identity of the Lakehouse or SQL analytics endpoint owner**—also known as the **item account**.

In this model:

* The signed-in user is not passed through to OneLake.

* All enforcement of access is assumed to be handled at the SQL layer.

* The **item owner** is responsible for having sufficient permissions in OneLake to read the underlying files on behalf of the workload.

Because this is a delegated pattern, any misalignment between SQL permissions and OneLake access for the owner will result in query failures.

This mode provides full compatibility with:

* SQL GRANT/REVOKE at all object levels

* SQL-defined **Row-Level Security**, **Column-Level Security**, and **Dynamic Data Masking**

* Existing T-SQL tooling and practices used by DBAs or applications

# How to Change the OneLake Access Mode

The access mode determines how data access is authenticated and enforced when querying OneLake through SQL analytics endpoint. You can switch between **User Identity Mode** and **Delegated Identity Mode** using the steps below.

### Step-by-Step: Change Access Mode

1. **Open the SQL Analytics Endpoint** Navigate to your Fabric workspace. Open the Lakehouse associated with the SQL analytics endpoint and click the **"** **SQL analytics endpoint "** tab.

2. **Access SQL analytics endpoint settings** On the SQL analytics endpoint page, select the **Settings**.

3. **Select Desired Access Mode**  In the access mode settings panel, choose one of the following options:

    * **User Identity** – Uses the signed-in user's identity; enforces
      OneLake roles.

    * **Delegated Identity** – Uses the item owner's identity; enforces
      only SQL permissions.

4.  **Save the Configuration**  
    Click **Save** or **Apply** to confirm the change.

### Important Considerations When Switching

* **Switching to User Identity Mode**

  * SQL RLS, CLS, and table-level permissions will be ignored.

  * OneLake roles must be configured for users to maintain access.

  * Only users with Viewer permissions or shared read-only access will
    be governed by OneLake security.

  * Existing SQL Roles will be deleted and cannot be recovered.

* **Switching to Delegated Identity Mode**

  * OneLake roles and security policies are no longer applied.

  * SQL roles and security policies become active.

  * The item owner must have valid OneLake access, or all queries may
    fail.

# Limitations

* **Applies only to readers**  
  OneLake Security governs users accessing data as *Viewers*. Users in other workspace roles (Admin Member, or Contributor) bypass OneLake Security and retain full access.

* **SQL objects do not inherit ownership**  
  Shortcuts are surfaced in SQL analytics endpoint as tables. When accessing these tables, directly or through views, stored procedures, and other derived SQL objects do not carry object-level ownership; all
  permissions are checked at runtime to prevent the security bypass.

* **Shortcut changes trigger validation downtime**  
  When a shortcut target changes (e.g., rename, URL update), the database enters *single-user mode* briefly while the system validates the new target. During this period queries are blocked, these operations a fairly quick, but sometimes depending on different internal process can take up to 5 minutes to synchronize.

  * Creating Schema Shortcuts, there is a known error that affect the above, that might affect the validation and can make Metadata Sync to delay synchronization.

* **Delayed permission propagation**  
  Permission changes are not instantaneous. Switching between security modes (User Identity vs. Delegated) may require time to propagate before taking effect, but should take less than 1 minute.

* **Control-plane dependency**  
  Permissions cannot be applied to users or groups that do not already exist in the workspace control plane. You either need to share the source item, or the user must be member of Viewer workspace role.

* **Most-permissive access prevails**  
  When users belong to multiple groups or roles, the most permissive effective permission is honored *Example*: If a user has both DENY through one role and GRANT through another, the GRANT will take precedence.

* **Delegated mode limitations**  
  In Delegated mode, metadata sync on shortcut tables can fail if the source item has OneLake Security policies that do not grant full table access to the item owner.

* **DENY behavior**  
  When multiple roles apply to a single shortcut table, the intersection of permissions follows SQL Server semantics: DENY overrides GRANT. This can produce unexpected access results.

* **Expected error conditions**  
  Users may encounter errors in scenarios such as:

  * Shortcut target renamed or invalid

    * *Example*: If the source of table was deleted.

  * RLS (Row-Level Security) misconfiguration

    * Some expressions for RLS filtering are not supported in OneLake and it might allow unauthorized data access.

    * Dropping the column used on the filter expression will invalidate the RLS and Metadata Sync will be stale until the RLS is fixed on OneLake Security Panel.

    * For Public Preview, we only support single expression tables. Dynamic RLS and Multi-Table RLS are not supported at the moment.

  * Column-Level Security (CLS) limitations

    * CLS works by maintaining an allow-list of columns. If an allowed column is removed or renamed, the CLS policy becomes invalid.

    * When CLS is invalid, metadata sync will be blocked until the CLS rule is fixed in the OneLake Security panel.

  * Metadata or permission sync failure

    * If there is changes on the Table like Column Renamed security is not replicated on the new object, and you will receive UI errors showing that column does not exist.

* **Table renames do not preserve security policies**  
  
If OneLake Security (OLS) roles are defined on Schema level, those roles remain in effect only as long as the table name is unchanged. Renaming the table breaks the association, and security policies will not be migrated automatically. This can result in unintended data exposure until policies are reapplied.
