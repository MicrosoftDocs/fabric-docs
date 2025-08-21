---
title: OneLake security access control model (preview)
description: Learn the details of how OneLake secures data with role-based access control and the impact on Fabric permissions.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: concept-article
ms.custom:
- onelake-data-access-public-preview-april-2024
- sfi-image-nochange
ms.date: 03/25/2025
#customer intent: As a OneLake user, I want to understand how OneLake secures data with role-based access control and the impact on Fabric permissions so that I can protect data stored and accessed in OneLake.
---

# OneLake security access control model (preview)

This document provides a detailed guide to how the OneLake security access control model works. It contains details on how the roles are structured, how they apply to data, and what the integration is with other structures within Microsoft Fabric. 

## OneLake security roles
OneLake security uses a role based access control (RBAC) model for managing access to data in OneLake. Each role is made up of several key components.

- Type: whether the role gives access (GRANT) or removes access (DENY). Only GRANT type roles are supported.
- Permission: the specific action or actions that is being granted or denied. 
- Scope: the OneLake objects that are given the permission. Objects are tables, folders, or schemas.
- Members: any Microsoft Entra identity that will be assigned to the role, such as users, groups, or non-user identities. The role will be granted to all members of an Entra group.

By assigning a member to a role, that user is then subject to the associated permissions on the scope of that role. Because OneLake security uses a deny-by-default model, all users start with no access to data unless explicitly granted by a OneLake security role. 

## Permissions and supported items

OneLake security roles support the following permissions:

- Read: Grants the user the ability to read data from a table and view the associated table and column metadata. In SQL terms, this permission is equivalent to both VIEW_DEFINITION and SELECT. See the [Metadata security](#metadata security) section for more details
- ReadWrite [(coming soon)](https://aka.ms/fabricroadmap): Gives the user the same read privileges as Read, and the ability to write data to tables and folders in OneLake. This permission allows any user to create, update, delete, or rename files or folders in OneLake. 

OneLake security enables users to define data access roles for the following Fabric items only.

| Fabric item | Status | Supported permissions |
| ---- | --- | --- |
| Lakehouse | Public Preview | Read, ReadWrite |
| Azure Databricks Mirrored Catalog | Public Preview | Read |
| Mirrored Databases | Public Preview | Read |

## OneLake security and Workspace permissions

Workspace permissions are the first security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. You manage security in the workspace through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](../../fundamentals/roles-workspaces.md)

Fabric workspace roles give permissions that apply to all items in the workspace. The table below outlines the basic permissions allowed by workspace roles.

| **Permission** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Always* Yes | Always* Yes | Always* Yes | No by default. Use OneLake security to grant the access. |
| Write files in OneLake | Always* Yes | Always* Yes | Always* Yes | No |
| Can edit OneLake security roles | Always* Yes | Always* Yes | No | No |

*Since Workspace Admin, Member and Contributor roles automatically grant Write permissions to OneLake, they override any OneLake security Read permissions.

Workspace roles manage the control plane data access, meaning interactions with creating and managing Fabric artifacts and permissions. In addition, workspace roles also provide default access levels to data items through the use of OneLake security default roles. (note that default roles only apply to Viewers, since Admin, Member, and Contributor have elevated access through the Write permission) A default role is a normal OneLake security role that is created automatically with every new item. It gives users with certain workspace or item permissions a default level of access to data in that item. For example, Lakehouse items have a DefaultReader role that lets users with the ReadAll permission see data in the Lakehouse. This ensures that users accessing a newly created item have a basic level of access. All default roles use a member virtualization feature, so that the members of the role are any user in that workspace with the required permission. For example, all users with ReadAll permission on the Lakehouse. The table below shows what the standard default roles are. Note that some items may have specialized default roles that apply only to that item type.

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

*Depends on the [SQL analytics endpoint mode.](TODO LINK)

## Create roles

You can define and manage OneLake security roles through your lakehouse data access settings.

Learn more in [Get started with data access roles](../security/get-started-data-access-roles.md).

## OneLake security access control model details

This section will provide details on how OneLake security roles grant access to specific scopes, how that access operates, and how access is resolved across multiple roles and access types. 

### Metadata security

OneLake security's Read access to data grants full access to the data and metadata in a table. For users with no access to a table, the data is never exposed and generally the metadata is not visible. This also applies to column level security and a users ability to see or not see a column in that table. However, OneLake security does not guarantee that the metadata for a table will not be accessible to users that don't have access to it, specifically in the following cases:

- SQL Endpoint queries: SQL Analytics Endpoint uses the same metadata security behavior as SQL Server. This means that if a user does not have access to a table or column, the error message for that query will explicitly state the table or column names the user doesn't have access to.
- Semantic models: Giving a user Build permission on a semantic model will allow them access to see the table names included in the model, regardless of whether the user has access to them or not. In addition, report visuals that contain hidden columns will show the column name in the error message.

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

OneLake security allows users to specify row level security by writing SQL predicates to limit what data is shown to a user. RLS operates by showing rows where the predicate evaluates to true. See the [row level security]() page for more details on the types of allowed RLS statements.

Row level security evaluates string data as case insensitive. To ensure consistent results when using string based RLS evaluation, we recommend formatting the data without case using UPPER or LOWER while creating the tables. 

TODO: best practices for how to configure your data for RLS with case insensitivity



## Evaluating multiple OneLake security roles


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
