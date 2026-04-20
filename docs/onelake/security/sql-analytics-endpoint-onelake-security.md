# OneLake security for SQL analytics endpoints (Preview)

With OneLake security, Microsoft Fabric is expanding how organizations can manage and enforce data access across workloads. This security framework gives administrators greater flexibility to configure permissions. Administrators can choose between **centralized governance through OneLake** or **granular SQL-based control** within the SQL analytics endpoint.

## Access modes in SQL analytics endpoint

When using the **SQL analytics endpoint**, the selected access mode determines how data security is enforced. Fabric supports two distinct access models, each offering different benefits depending on your operational and compliance needs:

* **User identity mode**: Enforces security using OneLake roles and policies. In this mode, the SQL analytics endpoint passes the signed-in user's identity to OneLake, and **read access is governed entirely by the security rules defined within OneLake**. SQL-level permissions on nondata objects (views, stored procedures, functions) are supported, ensuring consistent governance across tools like Power BI, notebooks, and lakehouse.

* **Delegated identity mode**: Provides full control through SQL. In this mode, the SQL analytics endpoint connects to OneLake using the identity of the **workspace or item** owner, and **security is governed exclusively by SQL permissions** defined inside the database. This model supports traditional security approaches including GRANT, REVOKE, custom roles, Row-Level Security, and Dynamic Data Masking.

Each mode supports different governance models. Understanding their implications is essential for choosing the right approach in your Fabric environment.

> [!IMPORTANT]
> **Artifact access required to use the SQL analytics endpoint.** To connect to and query data through a SQL analytics endpoint, users must have Read permission on the artifact associated with the endpoint. If a user does not have control-plane access to the artifact (for example, workspace role access or explicit item permission), the connection to the SQL analytics endpoint is rejected, regardless of any SQL permissions that may exist for that user.

## Comparison between access modes

The following table compares how and where you set security in user identity mode versus delegated identity mode, broken down by object type and data access policies:

| **Security target** | **User identity mode** | **Delegated identity mode** |
|----|----|----|
| **Tables** | Access is controlled by OneLake security roles. SQL `GRANT`/`REVOKE` isn't allowed. | Full control using SQL `GRANT`/`REVOKE`. |
| **Views** | Use SQL `GRANT`/`REVOKE` to assign permissions. | Use SQL `GRANT`/`REVOKE` to assign permissions. |
| **Stored procedures** | Use SQL `GRANT EXECUTE` to assign permissions. | Use SQL `GRANT EXECUTE` to assign permissions. |
| **Functions** | Use SQL `GRANT EXECUTE` to assign permissions. | Use SQL `GRANT EXECUTE` to assign permissions. |
| **Row-Level Security (RLS)** | Defined in OneLake UI as part of OneLake security roles. | Defined using SQL `CREATE SECURITY POLICY`. |
| **Column-Level Security (CLS)** | Defined in OneLake UI as part of OneLake security roles. | Defined using SQL `GRANT SELECT` with column list. |
| **Dynamic Data Masking (DDM)** | Not supported in OneLake security. | Defined using SQL `ALTER TABLE` with `MASKED` option. |

## User identity mode in OneLake security

In user identity mode, the SQL analytics endpoint uses a **passthrough authentication mechanism** to enforce data access. When a user connects to the SQL analytics endpoint, their Entra ID identity is passed through to OneLake, which performs the permission check. All read operations against tables are evaluated using the security rules defined within the OneLake Lakehouse, not by any SQL-level `GRANT` or `REVOKE` statements.

This mode lets you manage security centrally, ensuring consistent enforcement across all Fabric experiences, including Power BI, notebooks, lakehouse, and SQL analytics endpoint. It's designed for governance models where access should be defined once in OneLake and automatically respected everywhere.

In user identity mode:

* Table access is governed entirely by OneLake security. SQL `GRANT`/`REVOKE` statements on tables are ignored.

* RLS (Row-Level Security), CLS (Column-Level Security), and Object-Level Security are all defined in the OneLake experience.

* SQL permissions are allowed for nondata objects like views, stored procedures, and functions, enabling flexibility for defining custom logic or user-facing entry points to data.

* Write operations aren't supported at the SQL analytics endpoint. All writes must occur through the Lakehouse page in the Fabric portal and are governed by workspace roles (Admin, Member, Contributor).

> [!IMPORTANT]
> **One-to-one identity mapping across producer and consumer (hub-and-spoke).** When OneLake security policies are carried from a producer (the source item where the role is defined) to a consumer (a destination item accessing the data through a shortcut), the identities assigned to OneLake security roles at the producer must be mapped **exactly 1:1** at the consumer. The same principal—whether a user or a group—must be granted Fabric Read permission on the consumer artifact as the one referenced in the producer's security role. Nested or effective group membership is **not** resolved across this boundary.
>
> For example, if the OneLake security role at the producer references `user123@microsoft.com`, then `user123@microsoft.com` (that exact Object ID) must also have Fabric Read permission on the consumer lakehouse. Likewise, if the producer role references `Group A`, then `Group A` itself must be granted Fabric Read permission on the consumer—granting that permission only to a member of Group A does not satisfy the match.

### Workspace role behavior

Users with the **Admin**, **Member**, or **Contributor** role at the workspace level are generally not subject to OneLake security enforcement. These roles have elevated privileges and typically bypass RLS, CLS, and OLS policies. For exceptions where enforcement still applies to these roles (such as shortcut-backed tables and RLS in user identity mode), see [Limitations](#limitations).

To ensure OneLake security is consistently respected:

* Assign users the **Viewer** role in the workspace, or

* Share the Lakehouse or SQL analytics endpoint with users using **read-only** permissions. Only users with read-only access have their queries filtered according to OneLake security roles.

## Role precedence: Most permissive access wins

When a user is a member of **multiple OneLake security roles on the same source**, their effective access is the union of those roles—the most permissive role defines what they can see. For example:

* If one role grants full access to a table and another applies RLS to restrict rows, the **RLS is not enforced**.

* The broader access role takes precedence. This behavior ensures users aren't unintentionally blocked, but it requires careful role design to avoid conflicts. Keep restrictive and permissive roles **mutually exclusive** when enforcing row- or column-level access controls.

This union semantics applies to role membership within a single source. It is distinct from the fail-closed, restrictive behavior that shortcut enforcement applies when access cannot be validated (see [Permission evaluation behavior](#remarks)).

For more information, see the [data access control model](./data-access-control-model.md) for OneLake security.

## Security sync between OneLake and SQL analytics endpoint

A critical component of user identity mode is the **security sync service**. This background service monitors changes made to security roles in OneLake and ensures those changes are reflected in the SQL analytics endpoint.

The security sync service is responsible for the following:

* Detecting changes to OneLake roles, including new roles, updates, user assignments, and changes to tables.

* Translating OneLake-defined policies (RLS, CLS, OLS) into equivalent SQL-compatible database role structures.

* Ensuring **shortcut objects** (tables sourced from other lakehouses) are properly validated so that the original OneLake security settings are honored, even when accessed remotely.

This synchronization ensures that OneLake security definitions stay authoritative, eliminating the need for manual SQL-level intervention to replicate security behavior. Because security is centrally enforced:

* You can't define RLS, CLS, or OLS directly using T-SQL in this mode.

* You can still apply SQL permissions to views, functions, and stored procedures using `GRANT` or `EXECUTE` statements.

### Security sync retry backoff

Security sync includes a retry backoff mechanism to protect system stability and avoid unnecessary compute consumption:

* If repeated errors occur while applying OneLake security roles to the SQL analytics endpoint, the system may temporarily pause automatic synchronization attempts.

* Synchronization resumes automatically when an existing OneLake security role is modified or a new one is created.

### Security sync errors and resolution

| Scenario | Behavior in user identity mode | Behavior in delegated mode | Corrective action | Notes |
|----|----|----|----|----|
| **RLS policy references a deleted or renamed column** | Error: *Row-level security policy references a column that no longer exists.* Database enters error state until policy is fixed. | Error: *Invalid column name \<column name\>* | Update or remove one or more affected roles, or restore the missing column. | The update must be made in the lakehouse where the role was created. |
| **CLS policy references a deleted or renamed column** | Error: *Column-level security policy references a column that no longer exists.* Database enters error state until policy is fixed. | Error: *Invalid column name \<column name\>* | Update or remove one or more affected roles, or restore the missing column. | The update must be made in the lakehouse where the role was created. |
| **RLS/CLS policy references a deleted or renamed table** | Error: *Security policy references a table that no longer exists.* | No error surfaced; query fails silently if table is missing. | Update or remove one or more affected roles, or restore the missing table. | The update must be made in the lakehouse where the role was created. |
| **DDM (Dynamic Data Masking) policy references a deleted or renamed column** | DDM not supported from OneLake security; must be implemented through SQL. | Error: *Invalid column name \<column name\>* | Update or remove one or more affected DDM rules, or restore the missing column. | Update the DDM policy in the SQL analytics endpoint. |
| **System error (unexpected failure)** | Error: *An unexpected system error occurred. Try again or contact support.* | Error: *An internal error has occurred while applying table changes to SQL.* | Retry the operation; if the issue persists, contact Microsoft Support. | N/A |
| **User doesn't have permission on the artifact** | Error: *User doesn't have permission on the artifact* | Error: *User doesn't have permission on the artifact* | Provide the user with `objectID {objectID}` permission to the artifact. | The object ID must be an exact match between the OneLake security role member and the Fabric item permissions. If a group is added to the role membership, that same group must be given the Fabric Read permission. Adding a member from that group to the item does not count as a direct match. |
| **User principal is not supported** | Error: *User principal is not supported.* | Error: *User principal is not supported.* | Remove user `{username}` from role `DefaultReader`. | This error occurs if the user is no longer a valid Entra ID (for example, the user left the organization or was deleted). Remove them from the role to resolve the error. |

### Shortcuts behavior with security sync

OneLake security is enforced at the source of truth, so security sync disables ownership chaining for tables and views involving shortcuts. This ensures that source system permissions are always evaluated and honored, even for queries from another database.

As a result:

* Users must have valid access on **both** the shortcut **source** (current Lakehouse or SQL analytics endpoint) **and** the **destination** where the data physically resides.

* If the user lacks permission on either side, **queries fail** with an access error.

* When designing applications or views that reference shortcuts, ensure that role assignments are properly configured on **both ends** of the shortcut relationship.

This design preserves security integrity across Lakehouse boundaries, but it introduces scenarios where access failures might occur if cross-Lakehouse roles aren't aligned.

## Delegated mode in OneLake security

In **delegated identity mode**, the SQL analytics endpoint preserves **backward compatibility** with the traditional SQL security model. Security is defined and enforced at the **SQL engine layer**, and **OneLake security roles and access policies are not carried over** to table-level access. All filtering and access control—including access to schemas and tables, Row-Level Security (RLS), Column-Level Security (CLS), and Dynamic Data Masking (DDM)—must be defined using SQL constructs (`GRANT`/`REVOKE`, security policies, and so on).

Because OneLake security roles are not honored in this mode, any security rules defined in OneLake (for example, rules enforced by Spark or other engines that read through OneLake) will **not** apply when the same data is queried through the SQL analytics endpoint. Choose this mode when the workload depends on SQL-native security semantics or when existing T-SQL tooling requires full compatibility.

When a user connects to the SQL analytics endpoint and issues a query:

* SQL validates the query against the permissions defined at the SQL layer.

* If the query is authorized, the system proceeds to access data stored in **OneLake**.

* This data access is performed using the **identity of the Lakehouse or SQL analytics endpoint owner**, also known as the **item account**—not the signed-in user.

The **item owner** is therefore responsible for having sufficient permissions in OneLake to read the underlying files on behalf of the workload. Any misalignment between SQL permissions granted to end users and the item owner's OneLake access results in query failures.

This mode supports existing T-SQL tooling and practices used by DBAs or applications, with full compatibility for SQL `GRANT`/`REVOKE` at all object levels and SQL-defined RLS, CLS, and DDM.

### Shortcuts behavior in delegated mode

Because delegated mode connects to OneLake using the **item owner's identity**, shortcuts only work when the owner has **unrestricted access to the entire source table**. If the source table has any OneLake-level security rule applied—such as Row-Level Security (RLS), Column-Level Security (CLS)—the SQL analytics endpoint **blocks access to that shortcut**.

This behavior is enforced by design to preserve security integrity. In delegated mode, the endpoint cannot pass the end user's identity through to OneLake, so it cannot evaluate per-user filtering at the source. If the shortcut were allowed, the item owner would read the filtered source on behalf of all end users and could inadvertently surface rows or columns that the end user is not authorized to see. Blocking the shortcut prevents this privilege escalation.

As a result:

* Shortcuts pointing to source tables with **no data-level security rules** work normally in delegated mode.

* Shortcuts pointing to source tables with RLS or CLS in OneLake security on the producer are **not accessible** through the SQL analytics endpoint in delegated mode, even if the end user has SQL permissions on the shortcut object.

* To consume shortcuts whose source has OneLake security policies, use **user identity mode** at the consumer endpoint so that the end user's identity is evaluated against the source's OneLake security rules.

## How to change the OneLake access mode

The access mode determines how data access is authenticated and enforced when querying OneLake through the SQL analytics endpoint. You can switch between user identity mode and delegated identity mode using the following steps:

1. Navigate to your Fabric workspace and open your lakehouse. From the top-right corner, switch from lakehouse to **SQL analytics endpoint**.

1. From the top navigation, go to the **Security** tab and select one of the following OneLake access modes:

   * **User identity** – Uses the signed-in user's identity. Enforces OneLake roles.

   * **Delegated identity** – Uses the item owner's identity. Enforces only SQL permissions.

1. A pop-up launches to confirm your selection. Select **Yes** to confirm the change.

> [!IMPORTANT]
> To maintain security consistency and prevent potential data exposure, changing the security mode temporarily makes SQL analytics endpoints unavailable across the entire workspace. This action cancels all running and queued queries at all SQL analytics endpoints in that workspace.

## Considerations when switching between modes

> [!IMPORTANT]
> Switching between user identity and delegated modes (in either direction) currently removes inline metadata objects, including table-valued functions (TVFs) and scalar-valued functions. This behavior affects metadata definitions only; underlying data in OneLake is not impacted.

**Switching to user identity mode**

* SQL RLS, CLS, and table-level permissions are ignored.

* OneLake roles must be configured for users to maintain access.

* Only users with Viewer permissions or shared read-only access are governed by OneLake security.

* Existing SQL roles are deleted and can't be recovered.

**Switching to delegated identity mode**

* OneLake roles and security policies are no longer applied.

* SQL roles and security policies become active.

* The item owner must have valid OneLake access, or all queries may fail.

## Remarks

* **SQL objects do not inherit ownership**: Shortcuts function as tables in the SQL analytics endpoint but intentionally deviate from standard SQL ownership chaining to maintain a unified security posture.

  * **No-inheritance rule**: Derived SQL objects (views, stored procedures, or functions) do not inherit permissions from the object owner.

  * **Runtime validation**: Permissions are verified against the caller's identity at execution time, ensuring SQL abstractions cannot circumvent OneLake-level policies.

  * **Security by design**: Security policies remain consistent whether data is accessed through SQL, Spark, or Power BI.

* **Control-plane dependency (strict identity matching)**: OneLake security requires the identity granted access at the producer to be the same identity recognized during access evaluation at the consumer data plane. The system validates the specific principal that was granted access at the source and does not expand nested group membership or infer effective access through indirect membership.

  * **Literal principal match**: Access is evaluated against the exact Object ID granted at the producer.

  * **No nested/effective resolution**: Nested group membership or indirect inheritance is not treated as sufficient for enforcement. See the callout in [User identity mode in OneLake security](#user-identity-mode-in-onelake-security) for a worked example.

* **Permission evaluation behavior**: Permission evaluation varies by table type based on the current enforcement model.

  * **Shortcut tables**: Access may be denied when required authorization conditions are not satisfied. This is a restrictive enforcement outcome, not a role-based DENY capability in OneLake security.

  * **General rule**: When enforcement cannot clearly validate access, the system applies the most restrictive outcome.

* **Column-Level Security (CLS) design**: CLS maintains a strict allowlist of columns.

  * Renaming or removing an allowed column invalidates the security rule. While the rule persists in the system, it remains inactive—denying all access to the resource—until the original column naming is restored.

  * **Sync protection**: When a policy is invalid, metadata sync is blocked by design until the rule is corrected in the OneLake security panel.

  * **Schema validation**: Renaming columns without updating security policies triggers UI errors stating that the column "does not exist" until the configuration is synchronized.

* **Role propagation and synchronization (SLA)**:

  * **OneLake security sync**: When a OneLake security role changes in user identity mode, the update is not immediate. While usually fast, it can take up to **5 minutes** to synchronize with the SQL analytics endpoint.

  * **Automatic prefixing**: OneLake security roles are propagated to the SQL analytics endpoint with the `OLS_` prefix.

  * **Sync priority**: The security sync process periodically refreshes the state of `OLS_` roles. Manual changes to these roles are not supported and are overwritten during the next sync cycle. If there are no changes to sync, security sync does not override manual changes.

* **Warehouse SQL security and shortcuts**: Security policies defined using SQL constructs in a Warehouse—such as Row-Level Security (RLS), Column-Level Security (CLS), or Object-Level Security (OLS)—are enforced only within the SQL execution context of the warehouse (TDS endpoint).

> [!IMPORTANT]
> When data from a Warehouse is accessed through OneLake shortcuts, these SQL security semantics are not translated into OneLake security policies. As a result, users accessing the data through a shortcut may see the full dataset, regardless of SQL security policies configured in the source warehouse.

## Limitations

* **Applies only to readers**: OneLake security is primarily enforced for users accessing data through **Viewer**-level workspace or item access. Users with broader workspace roles such as **Admin**, **Member**, or **Contributor** retain elevated access and are not the primary target of OneLake security enforcement.

  * **Exceptions**:

    * **Shortcut deny behavior**: For shortcut-backed tables, enforcement can still deny access to Admins, Members, or Contributors in specific cases.

    * **Security sync failure cases**: If security sync fails to apply security correctly for certain tables or roles, users in Admin, Member, or Contributor roles who are members of those affected roles may also experience restricted access.

    * **RLS in user identity mode**: When Row-Level Security (RLS) is configured in user identity mode, the defined security rules are enforced for all users, including those in Admin, Member, and Contributor roles.

* **Security synchronization dependency**: In user identity mode, OneLake security roles are synchronized to the SQL analytics endpoint through the security sync process. Until synchronization completes, SQL may temporarily evaluate access using the existing SQL permission state. Once synchronization finishes, the SQL endpoint reflects the OneLake security configuration.

* **Shortcut boundary awareness**: The SQL analytics endpoint may initially evaluate shortcut-backed tables using standard SQL object semantics. After security synchronization occurs, OneLake security policies are applied to ensure that access enforcement aligns with artifact and workspace boundaries.

* **Cross-artifact access enforcement timing**: Access to tables backed by OneLake shortcuts that reference data from other artifacts is enforced through synchronized OneLake security roles. Until synchronization occurs, SQL authorization may temporarily reflect the previous permission state.

* **Ownership changes on shortcut-backed tables**: Shortcut-backed tables are represented as SQL objects in the SQL analytics endpoint and therefore support standard SQL ownership operations. Administrative commands such as `ALTER AUTHORIZATION` can change the owner of a shortcut-backed table. In certain scenarios, this may allow ownership chaining behavior that bypasses OneLake security policies and grants unintended access to the underlying data. Until additional enforcement mechanisms are introduced, administrators should avoid modifying ownership on shortcut-backed tables.

* **Target validation downtime**: When a shortcut target changes (for example, rename or URL update), the database briefly enters *single-user mode* while the system validates the new target. During this period, queries are blocked. These operations are typically fast but, depending on internal processes, can take up to 5 minutes to synchronize.

  * Creating schema shortcuts might cause a known error that affects validation and delays metadata sync.

* **Delegated mode token caching**: In delegated mode, the SQL analytics endpoint caches the storage access token used to retrieve data from OneLake on behalf of the owner identity. If the **owner's permissions change**, a previously issued token may remain valid until it expires. As a result, access changes tied to the owner identity may not take effect immediately and can persist until token expiration, typically up to **30–60 minutes**.

  * Changes to **OneLake security GRANT/DENY policies** are enforced immediately and are **not delayed by storage token caching**.

* **Backend data caching and security mode transitions**: The SQL analytics endpoint may cache previously retrieved data in backend compute nodes to improve query performance. The security impact of this cache is primarily relevant during security mode transitions, where cached data may temporarily reflect the prior enforcement state until invalidated or evicted. Standard SQL permission changes on tables are not generally expected to be delayed by this cache.

  * **Security mode caching**: When switching from **user identity** to **delegated** mode, cached queries may temporarily continue to return results based on the previous security state for up to **1 hour**.

* **Active query cancellation**: To maintain data integrity and security, active queries may be automatically cancelled if a shortcut configuration changes during execution.

* **Row-Level Security (RLS) constraints**:

  * For Public Preview, only single-expression tables are supported. Dynamic RLS and Multi-Table RLS are not available.

  * Dropping a column used in a filter expression stalls metadata synchronization until the RLS is fixed in the OneLake security panel.

* **Role complexity and metadata sync**: High complexity in security roles—specifically those involving numerous intersections and union semantics using RLS—can cause the security sync to fail. A failed security sync prevents security policies from being applied and blocks the ability to synchronize metadata.

* **Schema and role constraints**:

  * **Renames**: OneLake security roles are tied to the table name. Renaming a table breaks the association, and policies do not migrate automatically. This can result in unintended data exposure until policies are reapplied.

  * **Character limits**: OneLake security role names cannot exceed 124 characters; otherwise, role creation or synchronization fails on the SQL analytics endpoint.

  * **`OLS_` role modifications**: User changes on `OLS_` roles are not supported and can cause unexpected behaviors.

* **Unsupported identities**: Mail-enabled security groups and distribution lists are not currently supported.

* **Lakehouse owner requirements**:

  * The owner of the lakehouse must be a member of the Admin, Member, or Contributor workspace roles; otherwise, security is not applied to the SQL analytics endpoint.

  * The owner of the lakehouse cannot be a service principal for security sync to work.

## Related content

* [Best practices to secure data in OneLake](./best-practices-secure-data-in-onelake.md)
* [OneLake security access control model](./data-access-control-model.md)