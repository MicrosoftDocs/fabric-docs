---
title: Data access control model in OneLake (public preview)
description: Learn the details of how OneLake secures data with role-based access control and the impact on Fabric permissions.
ms.reviewer: aamerril
ms.author: yuturchi
author: yuturchi
ms.topic: concept-article
ms.custom:
- onelake-data-access-public-preview-april-2024
- sfi-image-nochange
ms.date: 03/25/2025
#customer intent: As a OneLake user, I want to understand how OneLake secures data with role-based access control and the impact on Fabric permissions so that I can protect data stored and accessed in OneLake.
---

# OneLake data access control model (preview)

OneLake security uses role assignments to apply permissions to its members. You can either assign roles to individuals or to security groups, Microsoft 365 groups, and distribution lists. Every member in the user group gets the assigned role. If someone is in two or more security groups or Microsoft 365 groups, they get the highest level of permission that is provided by the roles. If you nest user groups and assign a role to a group, all of the contained users have permissions.

OneLake security enables users to define data access roles for the following Fabric items only.

| Fabric item | Supported |
| ---- | --- |
| Lakehouse | Yes |
| Azure Databricks Mirrored Catalog | Yes |

OneLake security restricts data access for users with workspace **Viewer** or read access to a lakehouse. It doesn't apply to workspace Admins, Members, or Contributors. As a result, OneLake security supports only Read level of permissions.

## Create roles

You can define and manage OneLake security roles through your lakehouse data access settings.

Learn more in [Get started with data access roles](../security/get-started-data-access-roles.md).

## Default roles in lakehouse

When a user creates a new lakehouse, OneLake generates default roles. These roles provide users with Fabric workspace permissions access to the data in the lakehouse. You can delete or edit the default roles like any other role.

Default role definitions:

| Fabric item | Role name | Permission | Folders included | Assigned members |
| ---- | --- | --- | ---- | ---- |
| Lakehouse | `DefaultReader` | Read | All folders under `Tables/` and `Files/` | All users with ReadAll permission |
| Lakehouse | `DefaultReadWriter` | Read | All folders | All users with Write permission |

> [!NOTE]
> To restrict the access to specific users or specific folders, either modify the default role or remove it and create a new custom role.

## Inheritance in OneLake security

For any given folder, OneLake security permissions always inherit to the entire hierarchy of the folder's files and subfolders.

For example, consider the following hierarchy of a lakehouse in OneLake:

```bash
Tables/
──── (empty folder)
Files/
────folder1
│   │   file11.txt
│   │
│   └───subfolder11
│       │   file1111.txt
|       │
│       └───subfolder111
|            │   file1111.txt
│   
└───folder2
    │   file21.txt
```

You create two roles for this lakehouse. `Role1` grants read permission to folder1, and `Role2` grants read permission to folder2. 

For the given hierarchy, OneLake security permissions for `Role1` and `Role2` inherit in a following way:

* Role1: Read folder1

  ```bash
  │   │   file11.txt
  │   │
  │   └───subfolder11
  │       │   file1111.txt
  |       │
  │       └───subfolder111
  |            │   file1111.txt
  ```

* Role2: Read folder2

  ```bash
      │   file21.txt
  ```

## Traversal and listing in OneLake security

OneLake security provides automatic traversal of parent items to ensure that data is easy to discover. Granting a user Read permissions to subfolder11 grants the user the ability to list and traverse the parent directory folder1. This functionality is similar to Windows folder permissions where giving access to a subfolder provides discovery and traversal for the parent directories. The list and traversal granted to the parent doesn't extend to other items outside of the direct parents, ensuring other folders are kept secure.

For example, consider the following hierarchy of a lakehouse in OneLake.

```bash
Tables/
──── (empty folder)
Files/
────folder1
│   │   file11.txt
│   │
│   └───subfolder11
│       │   file111.txt
|       │
│       └───subfolder111
|            │   file1111.txt
│   
└───folder2
    │   file21.txt
```

For the given hierarchy, OneLake security permissions for 'Role1' provides the following access. Access to file11.txt isn't visible as it isn't a parent of subfolder11. Likewise for Role2, file111.txt isn't visible either.

* Role1: Read subfolder11

  ```bash
  Files/
  ────folder1
  │   │
  │   └───subfolder11
  │       │   file111.txt
  |       │
  │       └───subfolder111
  |            │   file1111.txt
  ```

* Role2: Read subfolder111

  ```bash
  Files/
  ────folder1
  │   │
  │   └───subfolder11
  |       │
  │       └───subfolder111
  |            │   file1111.txt
  ```

For shortcuts, the listing behavior is slightly different. Shortcuts to external data sources behave the same as folders do, however shortcuts to other OneLake locations have specialized behavior. The target permissions of the shortcut determine access to a OneLake shortcut. When listing shortcuts, no call is made to check the target access. As a result, when listing a directory all internal shortcuts are returned regardless of a user's access to the target. When a user tries to open the shortcut, the access check evaluates and a user only sees data that they have the required permissions to see. For more information on shortcuts, see the [shortcuts security section](#shortcuts).

Consider the following folder hierarchy that contains shortcuts.

```bash
Files/
────folder1
│   
└───shortcut2
|
└───shortcut3
```

* Role1: Read folder1

  ```bash
  Files/
  ────folder1
  │   
  └───shortcut2
  |
  └───shortcut3
  ```

* Role2: No permissions defined

  ```bash
  Files/
  │   
  └───shortcut2
  |
  └───shortcut3
  ```

## How OneLake security permissions are evaluated with Fabric permissions

Workspace and item permissions let you grant "coarse-grain" access to data in OneLake for the given item. OneLake security permissions enable you to restrict the data access in OneLake only to specific folders.

:::image type="content" source=".\media\security-flow.png" alt-text="Diagram showing the order of permissions evaluations with workspace, item, and RBAC.":::

When a user tries to access a folder in a lakehouse, OneLake security first checks permissions for the workspace, then the lakehouse item, then the folder.

## OneLake security and Workspace permissions

Workspace permissions are the first security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. You manage security in the workspace through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](../../fundamentals/roles-workspaces.md)

Workspace roles in Fabric grant the following permissions in OneLake.

| **Permission** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Always* Yes | Always* Yes | Always* Yes | No by default. Use OneLake security to grant the access. |
| Write files in OneLake | Always* Yes | Always* Yes | Always* Yes | No |

*Since Workspace Admin, Member and Contributor roles automatically grant Write permissions to OneLake, they override any OneLake security Read permissions.

| **Workspace role** | **Does OneLake apply RBAC Read permissions?**|
|---|---|
| Admin, Contributor, Member | No, OneLake Security ignores any OneLake RBC Read permissions |
| Viewer | Yes, if defined, OneLake security Read permissions are applied |

## OneLake security and Lakehouse permissions

Within a workspace, Fabric items can have permissions configured separately from the workspace roles. You can configure permissions either through sharing an item or by managing the permissions of an item. The following permissions determine a user's ability to perform actions on data in OneLake.

### Lakehouse permissions

| **Lakehouse permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** |
|----------|----------|----------|--------------|
| Read  | No by default. Use OneLake security to grant access. | No | No |
| ReadAll | Yes by default. Use OneLake security to restrict access. | No | No |
| Write | Yes | Yes | Yes |
| Execute, Reshare, ViewOutput, ViewLogs | N/A - can't be granted on its own |  N/A - can't be granted on its own |  N/A - can't be granted on its own |

### Lakehouse SQL analytics endpoint permissions

SQL analytics endpoint is a warehouse that is automatically generated from a lakehouse in Microsoft Fabric. A customer can transition from the "Lake" view of the lakehouse (which supports data engineering and Apache Spark) to the "SQL" view of the same lakehouse. Learn more about SQL analytics endpoint in [Data Warehouse documentation: SQL analytics endpoint](../../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse).

| **SQL analytics endpoint permission** | **Users can view files via OneLake endpoint?** | **Users can write files via OneLake endpoint?** | **Users can read data via SQL analytics endpoint?** |
|----------|----------|----------|--------------|
| Read  | No by default. Use OneLake security to grant access. | No | No by default, but can be configured with [SQL granular permissions](../../data-warehouse/sql-granular-permissions.md). |
| ReadData | No by default. Use OneLake security to grant access. | No | Yes |
| Write | Yes | Yes | Yes |

### Default Lakehouse semantic model permissions

In Microsoft Fabric, when the user creates a lakehouse, the system also provisions the associated default semantic model. The default semantic model has metrics on top of lakehouse data. The semantic model allows Power BI to load data for reporting.

| **Default semantic model permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can see schema in semantic model?** | **Can read data in semantic model?** |
|----------|----------|----------|--------------|-------------|
| Read  | No by default. Use OneLake security to grant access. | No | No | Yes by default. Can be restricted with [Power BI object-level security](../../security/service-admin-object-level-security.md?tabs=table) and [Power BI row-level security](../../security/service-admin-row-level-security.md)  |
| Build | Yes by default. Use OneLake security to restrict access. | Yes | Yes | Yes |
| Write | Yes | Yes | Yes | Yes |
| Reshare |  N/A - can't be granted on its own | N/A - can't be granted on its own | N/A - can't be granted on its own | N/A - can't be granted on its own |

### Lakehouse sharing

When user shares a lakehouse, they grant other users or a group of users access to a lakehouse without giving access to the workspace and the rest of its items.

When someone shares a lakehouse, they can also grant the following additional permissions:

* ReadData permission on the SQL analytics endpoint
* ReadAll permission on the lakehouse
* Build permission on the default semantic model

For more information, see [How Lakehouse sharing works](../../data-engineering/lakehouse-sharing.md)

The SQL analytics endpoint is a warehouse. For more information about its permission model, see [Share Warehouse data and manage permissions](../../data-warehouse/share-warehouse-manage-permissions.md)

| **Sharing option** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** | **Can view and build semantic models?** |
|----------|----------|----------|----------|-----|
| *No additional permissions selected* | No by default. Use OneLake RBAC to grant access. |  No | No | No |
| Read all SQL endpoint data | No by default. Use OneLake RBAC to grant access. |  No | Yes | No |
| Read all Apache Spark and subscribe to events | Yes by default. Use OneLake RBAC to restrict the access. |  No | No | No |
| Build reports on the default dataset | Yes by default. Use OneLake RBAC to restrict the access. | No | No | Yes |

## Shortcuts

### OneLake security in internal shortcuts

Security set on a OneLake folder always flows across any [internal shortcuts](../onelake-shortcuts.md) to restrict access to the shortcut source path. When a user accesses data through a shortcut to another OneLake location, the identity of the calling user is used to authorize access to the data in the target path of the shortcut. As a result, this user must have OneLake security permissions in the target location to read the data.

> [!IMPORTANT]
> When accessing shortcuts through **Power BI semantic models using DirectLake over SQL** or **T-SQL engines in Delegated identity mode**, the calling user's identity isn't passed through to the shortcut target. The calling item owner's identity is passed instead, delegating access to the calling user. To resolve this, use **Power BI semantic models in DirectLake over OneLake mode** or **T-SQL in User's identity mode**.

Defining OneLake security permissions for the internal shortcut isn't allowed and must be defined on the target folder located in the target item. The target item must be an item type that supports OneLake security roles. If the target item does not support OneLake security, the user's access is evaluated based on whether they have the Fabric ReadAll permission on the target item. Users do not need Fabric Read permission on an item in order to access it through a shortcut.

The next table specifies whether the corresponding shortcut scenario supports OneLake security permissions.

| Internal shortcut scenario | OneLake security permissions supported? | Comments |
| ---- | ---- | --- |
| Shortcut in a lakehouse pointing to folder2 located in the **same lakehouse**. | Supported. | To restrict the access to data in shortcut, define OneLake security for folder2. |
| Shortcut in a lakehouse pointing to folder2 located in **another lakehouse** | Supported. | To restrict the access to data in shortcut, define OneLake security for folder2 in the other lakehouse. |
| Shortcut in a lakehouse pointing to a table located in a **data warehouse** | Not supported. | OneLake doesn't support defining security permissions in data warehouses. Access is determined based on the ReadAll permission instead.|
| Shortcut in a lakehouse pointing to a table located in a **KQL database** | Not supported. | OneLake doesn't support defining security permissions in KQL databases. Access is determined based on the ReadAll permission instead.|

### OneLake security in external (multicloud) shortcuts

OneLake supports defining permissions for shortcuts such as [ADLS, S3, and Dataverse shortcuts](../onelake-shortcuts.md). In this case, the permissions are applied on top of the delegated authorization model enabled for this type of shortcut.

Suppose user1 creates an S3 shortcut in a lakehouse pointing to a folder in an AWS S3 bucket. Then user2 is attempting to access data in this shortcut.

| Does S3 connection authorize access for the delegated user1? | Does OneLake security authorize access for the requesting user2? | Result: Can user2 access data in S3 Shortcut?  |
| ---- | --- | --- |
| Yes | Yes | Yes |
| No | No | No |
| No | Yes | No |
| Yes | No | No |

The OneLake security permissions can be defined either for the entire scope of the shortcut or for selected subfolders. Permissions set on a folder inherit recursively to all subfolders, even if the subfolder is within the shortcut. Security set on an external shortcut applies only to access on that shortcut path directly. Additional internal shortcuts pointing to an external shortcut still require the user to have access to the original external shortcut.

Unlike other types of access in OneLake security, a user accessing an external shortcut will require Fabric Read permission on the data item where the external shortcut resides. This is necessary for securely resolving the connection to the external system. 

Learn more about S3, ADLS, and Dataverse shortcuts in [OneLake shortcuts](../onelake-shortcuts.md).

## Row and column security

OneLake security roles allow for row-level security (RLS) and column-level security (CLS) on tables within a lakehouse. The RLS and CLS follow specific composition rules for single and multiple roles. In general, RLS and CLS are an intersection within a role and compose with a union across multiple roles. 

[!INCLUDE [onelake-security-preview](../../includes/onelake-security-preview.md)]

### Single role

When defining a role with RLS and CLS, a user first chooses tables to grant access to. From this selection, constraints such as RLS and CLS can be defined on one or more tables. The RLS and CLS compose as filters on the full schema and data granted to a table.  

For example:  

UserA is a member of Role1. Role1 has the following definition: 

* Read access to Table1
* CLS: Table1 has Column1 removed. 
* RLS: Table1 where Column2 = “US”. 

When UserA runs a query on Table1, they see all columns except Column1, and only rows where Column2 has a value of “US”. 

### Multiple roles

For RLS and CLS across multiple roles, the security combines through a union of each category. Each role produces a view of a table with RLS and CLS rules applied, and the user sees a union of these views.

CLS combines as a simple union across roles. Any restriction unioned with no restriction results in no restrictions to that table. 

RLS combines with an OR between SQL statements. Like CLS, any RLS rules unioned with full access to the table results in all rows being visible. 

>[!IMPORTANT]
>If two roles combine such that the columns and rows aren't aligned across the queries, access is blocked to ensure that no data is leaked to the end user. 

## OneLake security limitations

* If you assign a OneLake security role to a B2B guest user, you must [configure your external collaboration settings for B2B in Microsoft Entra External ID](/entra/external-id/external-collaboration-settings-configure). The **Guest user access** setting must be set to **Guest users have the same access as members (most inclusive)**.

* OneLake security doesn't support cross-region shortcuts. Any attempts to access shortcut to data across different capacity regions result in 404 errors.

* If you add a distribution list to a role in OneLake security, the SQL endpoint can't resolve the members of the list to enforce access. The result is that users appear not to be members of the role when they access the SQL endpoint.

* Semantic models don't support shortcuts pointing to other lakehouses that don't have OneLake security enabled.

* To query data from a Spark notebook using Spark SQL, the user must have at least Viewer access in the workspace they are querying.

* Spark notebooks require that the environment be 3.5 or higher and using Fabric runtime 1.3.

* OneLake security does not work with [private link protection](../../security/security-private-links-overview.md). 

* The following table provides the limitations of OneLake data access roles.

  | Scenario | Limit |
  | ---- | ---- |
  | Maximum number of OneLake security roles per Fabric Item | 250 roles per lakehouse |
  | Maximum number of members per OneLake security role | 500 users or user groups per role |
  | Maximum number of permissions per OneLake security role | 500 permissions per role |

## Latencies in OneLake security

* Changes to role definitions take about 5 minutes to apply.
* Changes to a user group in a OneLake security role take about an hour for OneLake to apply the role's permissions on the updated user group.
  * Some Fabric engines have their own caching layer, so might require an additional hour to update access in all systems.
