---
title: Data Access Control Model in OneLake
description: TBD
ms.reviewer: eloldag
ms.author: aamerril
author: yuturchi
ms.topic: conceptual
ms.custom:
  - onelake-data-access-public-preview-april-2024
ms.date: 04/01/2024
---

## Role-based access control (RBAC)

OneLake RBAC uses role assignments to apply permissions to its members. You can either assign roles to individuals or to security groups, Microsoft 365 groups, and distribution lists. Every member in the user group gets the role that you've assigned. If someone is in several user groups (e.g. in 2 or more security groups or Microsoft 365 group), they get the highest level of permission that's provided by the roles that they're assigned. If you nest user groups and assign a role to a group, all the contained users have permissions.

OneLake RBAC enables users to define data access roles for **Lakehouse Items** only.

OneLake RBAC restricts data access for users with Workspace **Viewer** permissions. It doesn't apply to Admins, Members or Contributors. As a result, only Read level of permissions is supported by OneLake RBAC.

### Default RBAC Role in all lakehouses

When user creates a new lakehouse, OneLake generates a default RBAC Role named `Default Readers`. The role allows all users with lakehouse Read permission to read all folders in the Item.

> [!NOTE]
> In order to restrict the access to specific users or specific folders, you must either modify the default Role or remove it and create a new custom role.

Here is the default Role definition:

| Fabric Item | Role Name | Permission | Folders included | Assigned members |
| ---- | --- | --- | ---- | ---- |
| Lakehouse | `DefaultReaders` | Read | All folders under `Tables/` and `Files/` | All users with lakehouse Read permission |

### Inheritance in OneLake RBAC

For any given folder, OneLake RBAC permissions always inherit to the entire hierarchy of the folder's files and sub-folders.

For example, given the following hierarchy of a lakehouse in OneLake.

```bash
Tables/
──── (empty folder)
Files/
────folder1
│   │   file11.txt
│   │   file12.txt
│   │
│   └───subfolder11
│       │   file1111.txt
│       │   file1112.txt
|       │
│       └───subfolder111
|            │   file1111.txt
│            │   file1112.txt
│   
└───folder2
    │   file21.txt
    │   file22.txt
```

For the given hierarchy, OneLake RBAC permissions for Role1 and Role2  will inherit as following:

<table>
  <tr>
    <td> <b> Role </b> </td>
    <td> <b> Permission </b></td>
    <td> <b> Folder defined in the Permission </b></td>
    <td> <b> Folders and files inheriting the Permission </b></td>
  </tr>
  <tr>
    <td> <b> Role1</b> </td>
    <td> <b> Read </b> </td>
    <td> <b>folder1 </b></td>
    <td>

```bash
│   │   file11.txt
│   │   file12.txt
│   │
│   └───subfolder11
│       │   file1111.txt
│       │   file1112.txt
|       │
│       └───subfolder111
|            │   file1111.txt
│            │   file1112.txt
```

  </td>
<tr>
   <td> <b> Role3 </b> </td>
   <td> <b> Read </b> </td>
   <td> <b> folder2 </b> </td>
   <td>

```bash
    │   file21.txt
    │   file22.txt
```

</td>
</tr>

</table>

### OneLake RBAC in Internal Shortcuts

For any folder in a lakehouse, RBAC permissions always inherit to all [Internal shortcuts](../onelake-shortcuts.md) where this folder is defined as target.

When a user accesses data through a shortcut to another OneLake location, the identity of the calling user is used to authorize access to the data in the target path of the shortcut*. As a result, this user must have OneLake RBAC permissions in the target location to read the data.

> [!IMPORTANT]
> When accessing shortcuts through **Power BI semantic models** or **T-SQL**, the calling user’s identity is not passed through to the shortcut target. The calling item owner’s identity is passed instead, delegating access to the calling user.

### Limits on OneLake RBAC

#### Limits on Roles per Item

You can define at most 1000 Roles for each lakehouse item.

#### Limits on Assignments per Role

There is a limit of XXX assignment for per Role.

## How OneLake RBAC permissions are evaluated with Fabric permissions

Workspace and Item permissions lets you grant "coarse-grain" access to data in OneLake for the given Item. OneLake RBAC permissions enable you to restrict the data access in OneLake only to specific folders.

TBD - add diagram of Workspace -> Item -> RBAC permissions decisions flow.

## OneLake RBAC and Workspace permissions

The workspace permissions are the first security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. You manage security in the workspace through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](../get-started/roles-workspaces.md)

Workspace roles in Fabric grant the following permissions in OneLake.

| **Permission** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Yes | Yes | Yes | Yes by default. Use OneLake RBAC to restrict the access. |
| Write files in OneLake | Yes | Yes | Yes | No |

## OneLake RBAC and Item permissions

Within a workspace, Fabric items can have permissions configured separately from the workspace roles. You can configure permissions either through sharing an item or by managing the permissions of an item. The following permissions determine a user's ability to perform actions on data in OneLake.

### Lakehouse permissions

| **Lakehouse Permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** |
|----------|----------|----------|--------------|
| Read  | Yes by default. Use OneLake RBAC to restrict the access. | No | No |
| ReadAll | Yes by default. Use OneLake RBAC to restrict the access. | No | No |
| Write | Yes | Yes | Yes |
| Reshare, ViewOutput, ViewLogs | N/A - cannot be granted on its own |  N/A - cannot be granted on its own |  N/A - cannot be granted on its own |

### OneLake RBAC and Lakehouse SQL Analytics Endpoint permissions

| **SQL Analytics Endpoint Permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** |
|----------|----------|----------|--------------|
| Read  | Yes by default. Use OneLake RBAC to restrict the access. | No | No by default, but can be configured with [SQL granular permissions](../../data-warehouse/sql-granular-permissions.md) |
| ReadData | Yes by default. Use OneLake RBAC to restrict the access. | No | Yes |
| Write | Yes | Yes | Yes |

### OneLake RBAC and Default Lakehouse Semantic Model permissions

In Microsoft Fabric, when the user creates a lakehouse, the system also provisions the associated default semantic model. The default semantic model has metrics on top of lakehouse data. The semantic model allows Power BI to load data for reporting.

| **Default Semantic Model Permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can see schema in Semantic Model?** | **Can read data in Semantic Model?** |
|----------|----------|----------|--------------|-------------|
| Read  | Yes by default. Use OneLake RBAC to restrict the access. | No | No | Yes by default. Can be restricted with [PowerBI Object-level Security](https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-ols?tabs=table) and [PowerBI Row-Level security](https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls)  |
| Build | Yes by default. Use OneLake RBAC to restrict the access. | Yes | Yes | Yes |
| Write | Yes | Yes | Yes | Yes |
| Reshare |  N/A - cannot be granted on its own | N/A - cannot be granted on its own | N/A - cannot be granted on its own | N/A - cannot be granted on its own |

#### Lakehouse Sharing and OneLake RBAC Permissions

By sharing, users grant other users or a group of users access to a lakehouse without giving access to the workspace and the rest of its items. Shared lakehouse can be found through Data Hub or the Shared with Me section in Microsoft Fabrics.

When someone shares a lakehouse, they can also grant access to the SQL endpoint and associated default semantic model.

:::image type="content" source=".\media\lakehouse-sharing.png" alt-text="Diagram showing the structure of a data lake connecting to separately secured containers.":::

| **Sharing Option** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** | **Can view and build Semantic Models?** |
|----------|----------|----------|----------|-----|
| *No additional permissions selected* | Yes by default. Use OneLake RBAC to restrict the access. |  No | No | No |
| Read all A]ache Spark | Yes by default. Use OneLake RBAC to restrict the access. |  No | No | No |
| Read all SQL endpoint data | Yes by default. Use OneLake RBAC to restrict the access. |  No | Yes | No |
| Build  reports on the default dataset | Yes by default. Use OneLake RBAC to restrict the access. | No | No | Yes |
