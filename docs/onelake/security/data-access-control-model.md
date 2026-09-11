---
title: OneLake security roles, permissions, and scopes
description: Learn the details of how OneLake secures data with role-based access control and the interaction with Fabric permissions.
ms.reviewer: aamerril # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: concept-article
ai-usage: ai-assisted
ms.custom:
- sfi-image-nochange
ms.date: 08/28/2026
#customer intent: As a OneLake user, I want to understand how OneLake secures data with role-based access control and the interaction with Fabric permissions so that I can protect data stored and accessed in OneLake.
---

# How OneLake security controls data access

OneLake security is a role-based system that determines who can access data in OneLake and what actions they can take on that data. Understanding the data access control model helps you grant users only the access they need, so you can protect sensitive data while still letting the right people work with it.

This article explains how OneLake security roles are structured, how they integrate with workspace and item permissions, how OneLake applies and resolves access to your data, and the limits to keep in mind.

## OneLake security roles

OneLake security uses a role-based access control (RBAC) model to manage access to data in OneLake. In the OneLake security experience, each role has the following components:

- **Permissions:** The permissions the role grants on the data, such as Read or ReadWrite.
- **Type:** The role type. OneLake security supports only Grant roles, which give members access to the data in the role. It doesn't support Deny roles that remove access.
- **Data in role:** The tables, folders, or schemas that the role grants access to. You can also define data access with row-level and column-level security on tables.
- **Members in role:** The Microsoft Entra identities assigned to the role, such as users, groups, or nonuser identities. If you assign a Microsoft Entra group, OneLake security grants the role to all the group's members.

OneLake security uses a deny-by-default model, so users start with no access to data unless a OneLake security role explicitly grants access. Some Fabric items start with default roles that give users basic access based on their workspace permissions.

## Permissions and supported items

OneLake security roles support the following permissions:

- **Read:** Grants the user the ability to read data from a table and view the associated table and column metadata. In SQL terms, this permission is equivalent to both `VIEW_DEFINITION` and `SELECT`. For more information, see [Metadata security](#metadata-security).
- **ReadWrite:** Grants the user the ability to read and write data in a table or folder and view the associated table and column metadata. In SQL terms, this permission is equivalent to `ALTER`, `DROP`, `UPDATE`, and `INSERT`. For more information, see [ReadWrite permission](#readwrite-permission).

You can create OneLake security roles for the following Fabric items:

[!INCLUDE [onelake-security-supported-items](../../includes/onelake-security-supported-items.md)]

### ReadWrite permission

Use the ReadWrite permission to give read-only users write access to specific data in an item.

ReadWrite only applies to users with the Read permission on an item, such as users with the Viewer workspace role. Assigning ReadWrite to a workspace Admin, Member, or Contributor has no effect because these workspace roles already have write access.

ReadWrite includes all privileges granted by the Read permission, plus it grants write access to the selected object and its contents. For example, ReadWrite permission on a folder grants write access to both the folder and the data within it.

Users with ReadWrite permission can perform the following actions:

- Create, delete, or rename a folder or table.
- Upload or edit a file.
- Create, delete, or rename a shortcut.

Users can perform write operations through Spark notebooks, the OneLake file explorer, or OneLake APIs. Because Fabric supports only single-engine writes to data, users with ReadWrite permission can write to that data only through OneLake. All querying engines continue to enforce read operations consistently.

OneLake security roles that grant ReadWrite permission can't contain row-level security (RLS) or column-level security (CLS) constraints.

## OneLake security and workspace permissions

Workspace roles are the first security boundary for data in OneLake. They manage the control plane - creating and managing Fabric items and permissions - and apply to all items in the workspace. For the specific OneLake permissions that each workspace role grants, see [Grant access with workspace roles](./get-started-security.md#grant-access-with-workspace-roles). To learn more about workspace roles, see [Roles in workspaces in Fabric](../../fundamentals/roles-workspaces.md).

Beyond control plane access, workspace roles can also provide access to data items through OneLake security default roles. (Default roles apply only to Viewers, because Admin, Member, and Contributor roles have elevated access through the Write permission.) A default role is a normal OneLake security role that Fabric automatically creates with every new item. It gives users with certain workspace or item permissions a default level of access to data in that item. For example, lakehouse items have a DefaultReader role that lets users with the ReadAll permission see data in the lakehouse. This default access ensures that users working with a newly created item have a basic level of access. All default roles use a member virtualization feature, so that the members of the role are any users in that workspace with the required permission. For example, all users with ReadAll permission on the lakehouse.

The following table shows the standard default roles. Items might have specialized default roles that apply only to that item type.

| Fabric item | Role name | Permission granted | Assigned members |
| ---- | --- | --- | ---- | ---- |
| Lakehouse | `DefaultReader` | Read | All users with ReadAll permission |
| Azure Databricks mirrored catalog | `DefaultReader` | Read | All users with Read permission |
| Mirrored catalog | `DefaultReader` | Read | All users with Read permission |
| Mirrored database | `DefaultReader` | Read | All users with ReadAll permission |

You can modify or remove the default role from a Fabric item to change access for the users in that member group.

## Engine and user access to data

OneLake security defaults to least privileged access. Some storage-level operations can't enforce RLS or CLS, so when a query can't be safely filtered, OneLake blocks it entirely rather than risk exposing data the user isn't permitted to see. Whether a query is filtered or blocked depends on the access path - a supported query engine or direct user access.

For the engines that support RLS and CLS filtering and the requirements for each, see [Read data secured with OneLake security](./read-secured-data.md).

## Scopes and enforcement

This section provides details on how OneLake security roles grant access to specific scopes, how that access operates, and how access is resolved across multiple roles and access types.

### Table-level security

OneLake represents all tables as folders, but from the perspective of OneLake security and query engines in Fabric, not all folders are tables. To be a valid table, a folder must meet the following conditions:

- The folder exists in the `Tables/` directory of an item. For schema-enabled items, the folder must also be in a valid schema folder.
- The folder contains a `_delta_log` folder with corresponding JSON files for the table metadata.
- The folder doesn't contain any child shortcuts.

If you configure RLS or CLS on a table, OneLake denies access when the table's folder doesn't meet these criteria. Without RLS or CLS, OneLake treats a folder that doesn't meet these criteria as a folder and applies folder-level security.

### Row-level and column-level security

Within a role, you can restrict access to specific rows and columns of a table by using row-level security and column-level security. For more information about what each control does and how OneLake enforces it, see [Table, column, and row-level security in OneLake](./table-column-row-security.md). For information about how RLS and CLS resolve when a user belongs to multiple roles, see [Evaluate multiple OneLake security roles](#evaluate-multiple-onelake-security-roles).

### Metadata security

OneLake security's Read permission grants full access to the data and metadata in a table. For users with no access to a table, the data is never exposed. This rule also applies to column-level security and a user's ability to see or not see a column in that table. However, OneLake security doesn't guarantee that the metadata for a table isn't accessible. Certain error messages and experiences might show column names.

### Folder permission inheritance and traversal

Folder permissions affect a hierarchy in two directions:

- **Inheritance:** Permissions granted on a folder apply downward to its files and subfolders.
- **Traversal and listing:** When users have permission on a child item, OneLake security lets them list and traverse its parent folders so they can discover and navigate to the data they can access. Traversal doesn't grant access to sibling files or folders.

Consider the following hierarchy of a lakehouse in OneLake:

```bash
Tables/
──── (empty folder)
Files/
────folder1
│   │   file11.txt
│   │
│   └───subfolder11
│       │   file111.txt
│       │
│       └───subfolder111
│            │   file1111.txt
│   
└───folder2
    │   file21.txt
```

You create a role, `Role1`, that grants **Read** permission on `subfolder11`. Through inheritance, members of that role can read `file111.txt` and everything in `subfolder111`. Members can view and traverse `folder1` to reach `subfolder11`, but they can't see `file11.txt` because it's a sibling of `subfolder11` and they can't see `Tables` because it's a sibling of `Files`.

```bash
Files/
│
└───folder1
│   │
│   └───subfolder11 <-- READ
│       │   file111.txt
│       │
│       └───subfolder111
│            │   file1111.txt
```

You create another role, `Role2`, that grants **Read** permission on `folder2`. Through inheritance, members can read `file21.txt`. Members can traverse `folder2` and `Files` to reach it, but they can't see `folder1` or any of its children.

```bash
Files/
│
└───folder2 <-- READ
    │   file21.txt
```

For shortcuts, the behavior is slightly different. Shortcuts to external data sources behave the same as folders do. However, shortcuts to other OneLake locations have specialized behavior. The target permissions of the shortcut determine access to a OneLake shortcut. When listing shortcuts, OneLake makes no call to check the target access. As a result, when you list a directory, OneLake returns all internal shortcuts regardless of your access to the target. The access check evaluates once you try to open the shortcut, and then you see only the data that you have the required permissions to see.

## Shortcuts

OneLake security integrates with shortcuts to secure data inside and outside of OneLake. Shortcuts use one of two authentication modes:

- **Passthrough:** The shortcut uses the querying user's identity to access the target. Passthrough is the default for OneLake-to-OneLake shortcuts.
- **Delegated:** The shortcut uses a configured connection identity or credential to access the target. OneLake-to-OneLake shortcuts can use delegated authentication, and shortcuts to external systems always use delegated authentication.

Creating a shortcut requires permissions on both the path where the shortcut is created and the target path. For the requirements to create and access each shortcut type, see [OneLake shortcut security](../onelake-shortcut-security.md).

### OneLake security in passthrough shortcuts

When a user accesses data through a passthrough [OneLake-to-OneLake shortcut](../onelake-shortcuts.md), OneLake uses the calling user's identity to authorize access to the target path. The user's effective access is constrained by their permissions on both the shortcut path and the target path.

> [!NOTE]
> Query-engine identity and shortcut authentication are separate settings. A passthrough shortcut normally uses the calling user's identity to access the target. However, Power BI semantic models using Direct Lake over SQL and SQL analytics endpoints in delegated identity mode use the owner identity of the consumer item or data source. This behavior doesn't change the shortcut's configured authentication mode. For end-to-end user identity passthrough, use Direct Lake over OneLake or configure the SQL analytics endpoint to use user's identity access mode.

You can't define OneLake security permissions directly on a OneLake-to-OneLake shortcut. Permissions on the folder that contains the shortcut combine with permissions on the target path. If the target item supports OneLake security, the user needs access through a OneLake security role. If the target item doesn't support OneLake security, the user needs the Fabric ReadAll permission on the target item. The user doesn't need Fabric Read permission on the target item solely to access its data through the shortcut.

### OneLake security in delegated shortcuts

Delegated shortcuts use a configured connection identity or credential instead of the calling user's identity to access the target. OneLake security limits what the calling user can access through that connection.

#### Delegated OneLake shortcuts

For a delegated OneLake-to-OneLake shortcut, the calling user sees the intersection of their access on the shortcut path and the configured connection identity's access on the target path. Column-level security (CLS) is supported on both paths. Row-level security (RLS) is supported on the target path, but you can't define RLS on the shortcut path.

#### Delegated external shortcuts

Shortcuts to external systems, such as [ADLS, Amazon S3, and Dataverse](../onelake-shortcuts.md), use a configured connection credential to access the external source. OneLake security is applied on top of the access granted by that credential.

For example, suppose user1 creates a lakehouse shortcut to a folder in an Amazon S3 bucket, and user2 accesses the shortcut from the lakehouse. User2 can access the S3 data only if the configured S3 connection credential can access the source and OneLake security authorizes user2 to access the shortcut path.

You can grant OneLake security access to the entire external shortcut or to selected subpaths. Permissions on a folder inherit recursively to all its subfolders, including folders within the shortcut. A user who reaches an external shortcut through another OneLake shortcut must still be authorized by the OneLake security applied to the original external shortcut.

Accessing an external shortcut through Spark or a direct OneLake API call also requires Fabric Read permission on the item that contains the external shortcut. This permission is required to securely resolve the connection to the external system.

## Evaluate multiple OneLake security roles

A user can belong to multiple OneLake security roles. OneLake combines the access granted by those roles into an **effective role**, which determines the data the user can access. OneLake evaluates the effective role in stages.

### Resolve access within each role

OneLake first resolves each role independently. Within a role, a user can access only the data allowed by all three security components:

- Object-level security (OLS) determines which tables or folders the role can access.
- Row-level security (RLS) limits which rows of a given table the role can access.
- Column-level security (CLS) limits which columns of a given table the role can access.

Because all three components apply, OneLake takes their intersection. For example, if Role1 grants access to Table1 and restricts its rows and columns, the resolved access for Role1 is:

`Role1 = R1_OLS ∩ R1_RLS ∩ R1_CLS`

The intersection symbol (`∩`) means that the user receives only the access allowed by OLS, RLS, and CLS in that role.

### Combine access across roles

After resolving each role, OneLake combines the roles by using a union, or least-restrictive, model. The union symbol (`∪`) means that access granted by any role becomes part of the effective role. If Role1 grants access to TableA and Role2 grants access to TableB, a user who belongs to both roles can access both tables.

For two roles, the effective role is:

`Effective role = Role1 ∪ Role2`

When multiple roles grant access to the same table, row-level security rules combine with an `OR` operator. For example, predicates that allow `city = 'Redmond'` and `city = 'New York'` combine as `city = 'Redmond' OR city = 'New York'`.

Column-level security rules also combine as a union, except in the SQL analytics endpoint. In the SQL analytics endpoint, CLS uses a stricter deny semantic. If any role hides a column, the endpoint blocks access to that column. As a result, the endpoint intersects CLS allow lists across all the user's roles instead of combining them as a union.

> [!IMPORTANT]
> Keep RLS and CLS rules that must apply together in the same role. OneLake doesn't support a role combination in which two roles allow a different set of columns for a table and either role also applies RLS to that table. For example, a user can't belong to Role1, which allows columns c1 and c2 and a subset of rows, and Role2, which allows columns c2 and c3.

### Combine shortcut and target access

For a shortcut, OneLake evaluates roles at the shortcut location and at the shortcut target separately. The target roles become **inferred roles** at the shortcut location. OneLake then intersects the combined access from the shortcut roles with the combined access from the inferred target roles. This step prevents access inherited at the shortcut location from overriding restrictions on the target.

For two shortcut roles and two inferred target roles, the effective access is:

`Effective shortcut access = (ShortcutRole1 ∪ ShortcutRole2) ∩ (InferredRole1 ∪ InferredRole2)`

In this expression, `ShortcutRole1` and `ShortcutRole2` are roles at the shortcut location. `InferredRole1` and `InferredRole2` are the corresponding inferred roles from the shortcut target. Each role is resolved from its OLS, RLS, and CLS components before OneLake combines the roles.

## OneLake security limitations

- If you assign a OneLake security role to a B2B guest user, you must [configure your external collaboration settings for B2B in Microsoft Entra External ID](/entra/external-id/external-collaboration-settings-configure). Set the **Guest user access** setting to **Guest users have the same access as members (most inclusive)**.

- If you add a distribution list to a role in OneLake security, the SQL analytics endpoint can't resolve the members of the list to enforce access. As a result, users appear not to be members of the role when they access the SQL analytics endpoint. Direct Lake on SQL semantic models is subject to this limitation too.

- Spark notebooks require the environment to be 3.5 or higher and to use Fabric runtime 1.3.

- Non-schema lakehouses don't support data preview for RLS and CLS secured tables. Use schema-enabled lakehouses with OneLake security.

- OneLake security doesn't work with Azure Data Share or Purview Data Share. For more information, see [Azure Data Share](/azure/data-share/overview).

- The following table lists the limitations of OneLake security roles.

  | Scenario | Limit |
  | ---- | ---- |
  | Maximum number of OneLake security roles per Fabric Item | 250 roles per item (see note) |
  | Maximum number of members per OneLake security role | 500 users or user groups per role |
  | Maximum number of permissions per OneLake security role | 500 permissions per role |

  > [!NOTE]
  > You can request an increase in roles per item to 1,000. To request an increase, contact [Azure Support](https://azure.microsoft.com/support/faq/).

### Latencies

Changes to role definitions take about 5 minutes to apply.

Changes to a user group in a OneLake security role take about an hour for OneLake to apply the role's permissions on the updated user group. Some Fabric engines have their own caching layer, so might require an extra hour to update access in all systems.

## Related content

- [Get started with OneLake security](get-started-security.md)
- [Roles in workspaces in Microsoft Fabric](../../fundamentals/roles-workspaces.md)
- [Secure data with row-level and column-level security](table-column-row-security.md)
- [OneLake security integrations overview](onelake-security-integrations-overview.md)
- [SQL analytics endpoint and OneLake security](./sql-analytics-endpoint-onelake-security.md)
- [OneLake shortcuts security](../onelake-shortcut-security.md)
