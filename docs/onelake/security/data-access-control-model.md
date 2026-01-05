---
title: OneLake security access control model (preview)
description: Learn the details of how OneLake secures data with role-based access control and the interaction with Fabric permissions.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: concept-article
ms.custom:
- onelake-data-access-public-preview-april-2024
- sfi-image-nochange
ms.date: 09/05/2025
#customer intent: As a OneLake user, I want to understand how OneLake secures data with role-based access control and the interaction with Fabric permissions so that I can protect data stored and accessed in OneLake.
---

# OneLake security access control model (preview)

This document provides a detailed guide to how the OneLake security access control model works. It contains details on how the roles are structured, how they apply to data, and what the integration is with other structures within Microsoft Fabric.

## OneLake security roles
OneLake security uses a role based access control (RBAC) model for managing access to data in OneLake. Each role is made up of several key components.

- **Type:** Whether the role gives access (GRANT) or removes access (DENY). Only GRANT type roles are supported.
- **Permission:** The specific action or actions that are being granted or denied.
- **Scope:** The OneLake objects that have the permission. Objects are tables, folders, or schemas.
- **Members:** Any Microsoft Entra identity that is assigned to the role, such as users, groups, or nonuser identities. The role is granted to all members of a Microsoft Entra group.

By assigning a member to a role, that user is then subject to the associated permissions on the scope of that role. Because OneLake security uses a deny-by-default model, all users start with no access to data unless explicitly granted by a OneLake security role.

## Permissions and supported items

OneLake security roles support the following permission:

- **Read:** Grants the user the ability to read data from a table and view the associated table and column metadata. In SQL terms, this permission is equivalent to both VIEW_DEFINITION and SELECT. For more information, see the [Metadata security](#metadata-security).
- **ReadWrite:** Grants the user the ability to read and write data from a table or folder and view the associated table and column metadata. In SQL terms, this permission is equivalent to ALTER, DROP, UPDATE, and INSERT. For more information see [ReadWrite permission.](#readwrite-permission)

OneLake security enables users to define data access roles for the following Fabric items only.

| Fabric item | Status | Supported permissions |
| ---- | --- | --- |
| Lakehouse | Public Preview | Read, ReadWrite |
| Azure Databricks Mirrored Catalog | Public Preview | Read |

## OneLake security and workspace permissions

Workspace permissions are the first security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. You manage security in the workspace through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](../../fundamentals/roles-workspaces.md)

Fabric workspace roles give permissions that apply to all items in the workspace. The following table outlines the basic permissions allowed by workspace roles.

| **Permission** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Always* Yes | Always* Yes | Always* Yes | No by default. Use OneLake security to grant the access. |
| Write files in OneLake | Always* Yes | Always* Yes | Always* Yes | No |
| Can edit OneLake security roles | Always* Yes | Always* Yes | No | No |

*Since Workspace Admin, Member and Contributor roles automatically grant Write permissions to OneLake, they override any OneLake security Read permissions.

Workspace roles manage the control plane data access, meaning interactions with creating and managing Fabric artifacts and permissions. In addition, workspace roles also provide default access levels to data items by using OneLake security default roles. (Note that default roles only apply to Viewers, since Admin, Member, and Contributor have elevated access through the Write permission) A default role is a normal OneLake security role that is created automatically with every new item. It gives users with certain workspace or item permissions a default level of access to data in that item. For example, Lakehouse items have a DefaultReader role that lets users with the ReadAll permission see data in the Lakehouse. This ensures that users accessing a newly created item have a basic level of access. All default roles use a member virtualization feature, so that the members of the role are any user in that workspace with the required permission. For example, all users with ReadAll permission on the Lakehouse. The following table shows what the standard default roles are. Items may have specialized default roles that apply only to that item type.

| Fabric item | Role name | Permission | Folders included | Assigned members |
| ---- | --- | --- | ---- | ---- |
| Lakehouse | `DefaultReader` | Read | All folders under `Tables/` and `Files/` | All users with ReadAll permission |
| Lakehouse | `DefaultReadWriter` | Read | All folders | All users with Write permission |

> [!NOTE]
> To restrict the access to specific users or specific folders, either modify the default role or remove it and create a new custom role.

## OneLake security and item permissions

Within a workspace, Fabric items can have permissions configured separately from the workspace roles. You can configure permissions either through sharing an item or by managing the permissions of an item. The following permissions determine a user's ability to perform actions on data in OneLake. For more information on item sharing, see [How Lakehouse sharing works](../../data-engineering/lakehouse-sharing.md)

| **Permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** |
|----------|----------|----------|--------------|
| Read  | No by default. Use OneLake security to grant access. | No | No |
| ReadAll | Yes through the DefaultReader role. Use OneLake security to restrict access. | No | No* |
| Write | Yes | Yes | Yes |
| Execute, Reshare, ViewOutput, ViewLogs | N/A - can't be granted on its own |  N/A - can't be granted on its own |  N/A - can't be granted on its own |

*Depends on the [SQL analytics endpoint mode](../sql-analytics-endpoint-onelake-security.md).

## Create roles

You can define and manage OneLake security roles through your lakehouse data access settings.

Learn more in [Get started with data access roles](../security/get-started-onelake-security.md).

## Engine and user access to data

Data access to OneLake occurs in one of two ways: 

* Through a Fabric query engine or
* Through user access (Queries from non-Fabric engines are considered user access)

OneLake security ensures that data is always kept secure. Because certain OneLake security features like row and column level security aren't supported by storage level operations, not all types of access to row or column level secured data can be permitted. This guarantees that users can't see rows or columns they aren't permitted to. Microsoft Fabric engines are enabled to apply row and column level security filtering to data queries. This means when a user queries data in a lakehouse or other item with OneLake security RLS or CLS on it, the results the user sees have the hidden rows and columns removed. For user access to data in OneLake with RLS or CLS on it, the query is blocked if the user requesting access isn't permitted to see all the rows or columns in that table.

The table below outlines which Microsoft Fabric engines support RLS and CLS filtering.

| **Engine** | **RLS/CLS filtering** | **Status** |
|---|---|---|---|---|
| Lakehouse | Yes | Public preview |
| Spark notebooks | Yes | Public preview |
| SQL Analytics Endpoint in "user's identity mode" | Yes | Public preview |
| Semantic models using DirectLake on OneLake mode | Yes | Public preview |
| Eventhouse | No | Planned |
| Data warehouse external tables | No | Planned |

## OneLake security access control model details

This section provides details on how OneLake security roles grant access to specific scopes, how that access operates, and how access is resolved across multiple roles and access types.

### Table level security

All OneLake tables are represented by folders in the lake, but not all folders in the lake are tables from the perspective of OneLake security and query engines in Fabric. To be considered a valid table, the following conditions must be met:

- The folder exists in the Tables/ directory of an item.
- The folder contains a _delta_log folder with corresponding JSON files for the table metadata.
- The folder does not contain any child shortcuts.

Any tables that do not meet those criteria will have access denied if table level security is configured on them.

### Metadata security

OneLake security's Read access to data grants full access to the data and metadata in a table. For users with no access to a table, the data is never exposed and generally the metadata isn't visible. This also applies to column level security and a user's ability to see or not see a column in that table. However, OneLake security doesn't guarantee that the **metadata** for a table won't be accessible, specifically in the following cases:

- SQL Endpoint queries: SQL Analytics Endpoint uses the same metadata security behavior as SQL Server. This means that if a user doesn't have access to a table or column, the error message for that query will explicitly state the table or column names the user doesn't have access to.
- Semantic models: Giving a user Build permission on a semantic model allows them access to see the table names included in the model, regardless of whether the user has access to them or not. In addition, report visuals that contain hidden columns show the column name in the error message.

### Permission inheritance

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

For the given hierarchy, OneLake security permissions for `Role1` and `Role2` inherit in the following way:

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

### Traversal and listing in OneLake security

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

### Row level security

OneLake security allows users to specify row level security by writing SQL predicates to limit what data is shown to a user. RLS operates by showing rows where the predicate evaluates to true. For more information, see the [row level security](./row-level-security.md).

Row level security evaluates string data as case insensitive, using the following collation for sorting and comparisons: *Latin1_General_100_CI_AS_KS_WS_SC_UTF8*

When using row level security, ensure that the RLS statements are clean and easy to understand. Use integer columns for sorting and greater than or less than operations. Avoid string equivalencies if you don't know the format of the input data, especially in relation to unicode characters or accent sensitivity.

### Column level security

OneLake security supports limiting access to columns by removing (hiding) a user's access to a column. A hidden column is treated as having no permissions assigned to it, resulting in the default policy of no access. Hidden columns won't be visible to users, and queries on data containing hidden columns return no data for that column. As noted in [metadata security](#metadata-security) there are certain case where the metadata of a column might still be visible in some error messages.

Column level security also follows a more strict behavior in SQL Endpoint by operating through a deny semantic. Deny on a column in SQL Endpoint ensures that all access to the column is blocked, even if multiple roles would combine to give access to it. As a result, CLS in SQL Endpoint operates using an intersection between all roles a user is part of instead of the union behavior in place for all other permission types. See the Evaluating multiple OneLake security roles section for more information on how roles combine.

## ReadWrite permission

The ReadWrite permission gives read-only users the ability to perform write operations to specific items. ReadWrite permission is only applicable for Viewers or users with the Read permission on an item. Assigning ReadWrite access to an Admin, Member, or Contributor has no effect as those roles already have that permission implicitly.

ReadWrite access enables users to perform write operations through Spark notebooks, the OneLake file explorer, or OneLake APIs. Write operations through the Lakehouse UX for viewers is not supported.

The ReadWrite permission operates in the following ways:

- The ReadWrite permission includes all privileges granted by the Read permission.
- Users with ReadWrite permissions on an object can perform write operations on that object, inclusive. That is, any operations can also be performed on the object itself.
- ReadWrite allows the following actions:
  - Create a new folder or table
  - Delete a folder or table
  - Rename a folder or table
  - Upload or edit a file
  - Create a shortcut
  - Delete a shortcut
  - Rename a shortcut
- OneLake security roles with ReadWrite access cannot contain RLS or CLS constraints.
- Because Fabric only supports single engine writes to data, users with ReadWrite permission on an object can only Write to that data through OneLake. However, the Read operations will be enforced consistently through all querying engines.

## Shortcuts

### Shortcuts overview

OneLake security integrates with shortcuts in OneLake to ensure data inside and outside of OneLake can be easily secured. There are two main authentication modes for shortcuts:

- Passthrough shortcuts (SSO): The credential of the querying user is evaluated against the shortcut target to determine what data is allowed to be seen.
- Delegated shortcuts: The shortcut uses a fixed credential to access the target and the querying user is evaluated against OneLake security prior to checking the delegated credential's access to the source.

In addition, OneLake security permissions are evaluated when creating any shortcuts in OneLake. Read about shortcut permissions in the [shortcut security document.](../onelake-shortcut-security.md)

### OneLake security in passthrough shortcuts

Security set on a OneLake folder always flows across any [internal shortcuts](../onelake-shortcuts.md) to restrict access to the shortcut source path. When a user accesses data through a shortcut to another OneLake location, the identity of the calling user is used to authorize access to the data in the target path of the shortcut. As a result, this user must have OneLake security permissions in the target location to read the data.

> [!IMPORTANT]
> When accessing shortcuts through **Power BI semantic models using DirectLake over SQL** or **T-SQL engines in Delegated identity mode**, the calling user's identity isn't passed through to the shortcut target. The calling item owner's identity is passed instead, delegating access to the calling user. To resolve this, use **Power BI semantic models in DirectLake over OneLake mode** or **T-SQL in User's identity mode**.

Defining OneLake security permissions for the internal shortcut isn't allowed and must be defined on the target folder located in the target item. The target item must be an item type that supports OneLake security roles. If the target item doesn't support OneLake security, the user's access is evaluated based on whether they have the Fabric ReadAll permission on the target item. Users don't need Fabric Read permission on an item in order to access it through a shortcut.

### OneLake security in delegated shortcuts

OneLake supports defining permissions for shortcuts such as [ADLS, S3, and Dataverse shortcuts](../onelake-shortcuts.md). In this case, the permissions are applied on top of the delegated authorization model enabled for this type of shortcut.

Suppose user1 creates an S3 shortcut in a lakehouse pointing to a folder in an AWS S3 bucket. Then user2 is attempting to access data in this shortcut.

| Does S3 connection authorize access for the delegated user1? | Does OneLake security authorize access for the requesting user2? | Result: Can user2 access data in S3 Shortcut?  |
| ---- | --- | --- |
| Yes | Yes | Yes |
| No | No | No |
| No | Yes | No |
| Yes | No | No |

The OneLake security permissions can be defined either for the entire scope of the shortcut or for selected subfolders. Permissions set on a folder inherit recursively to all subfolders, even if the subfolder is within the shortcut. Security set on an external shortcut can be scoped to grant access either to the entire shortcut, or any subpath inside the shortcut. Another internal shortcut pointing to an external shortcut still requires the user to have access to the original external shortcut.

Unlike other types of access in OneLake security, a user accessing an external shortcut requires Fabric Read permission on the data item where the external shortcut resides. This is necessary for securely resolving the connection to the external system.

Learn more about S3, ADLS, and Dataverse shortcuts in [OneLake shortcuts](../onelake-shortcuts.md).

## Evaluating multiple OneLake security roles

Users can be members of multiple different OneLake security roles, each one providing its own access to data. The combination of these roles together is called the "effective role" and is what a user will see when accessing data in OneLake. Roles combine in OneLake security using a UNION or least-restrictive model. This means if Role1 gives access to TableA, and Role2 gives access to TableB, then the user will be able to see both TableA and TableB.

OneLake security roles also contain row and column level security, which limits access to the rows and columns of a table. Each RLS and CLS policy exists within a role and limits access to data for all users within that single role. For example, if Role1 gives access to Table1, but has RLS on Table1 and only shows some columns of Table1 then the effective role for Role1 is going to be the RLS and CLS subsets of Table1. This can be expressed as (R1ols n R1cls n R1rls) where n is the INTERSECTION of each component in the role.

When dealing with multiple roles, RLS and CLS combine with a UNION semantic on the respective tables. CLS is a direct set UNION of the tables visible in each role. RLS is combined across predicates using an OR operator. For example, WHERE city = 'Redmond' OR city = 'New York'.

To evaluate multiple roles each with RLS or CLS, each role is first resolved based on the access given by the role itself. This means evaluating the INTERSECTION of all object, row, and column level security. Each evaluated role is then combined with all other roles a user is a member of via the UNION operation. The output is the effective role for that user. This can be expressed as:

`( (R1ols n R1cls n R1rls) u (R2ols n R2cls n R2rls) )`

Lastly, each shortcut in a lakehouse generates a set of inferred roles that are used to propagate the shortcut target's permissions to the item being queried. Inferred roles operate in a similar way to noninferred roles except they're resolved first in place on the shortcut target before being combined with roles in the shortcut lakehouse. This ensures that any inheritance of permissions on the shortcut lakehouse is broken and the inferred roles are evaluated correctly. The full combination logic can then be expressed as:

`( (R1ols n R1cls n R1rls) u (R2ols n R2cls n R2rls) ) n ( (R1'ols n R1'cls n R1'rls) u (R2'ols n R2'cls n R2'rls)) )`

Where R1' and R2' are the inferred roles and R1 and R2 are the shortcut lakehouse roles.

> [!IMPORTANT]
> If two roles combine such that the columns and rows aren't aligned across the queries, access is blocked to ensure that no data is leaked to the end user. 

## OneLake security limitations

* If you assign a OneLake security role to a B2B guest user, you must [configure your external collaboration settings for B2B in Microsoft Entra External ID](/entra/external-id/external-collaboration-settings-configure). The **Guest user access** setting must be set to **Guest users have the same access as members (most inclusive)**.

* OneLake security doesn't support cross-region shortcuts. Any attempts to access shortcut to data across different capacity regions result in 404 errors.

* If you add a distribution list to a role in OneLake security, the SQL endpoint can't resolve the members of the list to enforce access. The result is that users appear not to be members of the role when they access the SQL endpoint. DirectLake on SQL semantic models are subject to this limitation too.

* To query data from a Spark notebook using Spark SQL, the user must have at least Viewer access in the workspace they're querying.

* Mixed-mode queries are not supported. Single queries that access both OneLake security enabled and non-OneLake security enabled data will fail with query errors.

* Spark notebooks require that the environment be 3.5 or higher and using Fabric runtime 1.3.

* OneLake security doesn't work with [private link protection](../../security/security-private-links-overview.md).

* The [external data sharing preview](../../governance/external-data-sharing-overview.md) feature isn't compatible with the data access roles preview. When you enable the data access roles preview on a lakehouse, any existing external data shares might stop working.

* OneLake security does not work with Azure Data Share or Purview Data Share. For more information, see [Azure Data Share](/azure/data-share/overview).

* The following table provides the limitations of OneLake data access roles.

  | Scenario | Limit |
  | ---- | ---- |
  | Maximum number of OneLake security roles per Fabric Item | 250 roles per lakehouse |
  | Maximum number of members per OneLake security role | 500 users or user groups per role |
  | Maximum number of permissions per OneLake security role | 500 permissions per role |

## Latencies in OneLake security

* Changes to role definitions take about 5 minutes to apply.
* Changes to a user group in a OneLake security role take about an hour for OneLake to apply the role's permissions on the updated user group.
  * Some Fabric engines have their own caching layer, so might require an extra hour to update access in all systems.
