---
title: Data Access Control Model in OneLake (Public Preview)
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

OneLake RBAC restricts data access for users with Workspace **Viewer** or read access to a lakehouse. It doesn't apply to Workspace Admins, Members or Contributors. As a result, only Read level of permissions is supported by OneLake RBAC.

### How to create RBAC roles

You can define and manage OneLake RBAC roles using Lakehouse UX or REST APIs.

Learn more in [Get Started with Data Access Roles](../security/get-started-data-access-roles.md)


### Default RBAC Role in lakehouse

When user creates a new lakehouse, OneLake generates a default RBAC Role named `Default Readers`. The role allows all users with lakehouse Read permission to read all folders in the Item.

Here is the default Role definition:

| Fabric Item | Role Name | Permission | Folders included | Assigned members |
| ---- | --- | --- | ---- | ---- |
| Lakehouse | `DefaultReaders` | Read | All folders under `Tables/` and `Files/` | All users with lakehouse Read permission |

> [!NOTE]
> In order to restrict the access to specific users or specific folders, you must either modify the default role or remove it and create a new custom role.

### Inheritance in OneLake RBAC

For any given folder, OneLake RBAC permissions always inherit to the entire hierarchy of the folder's files and sub-folders.

For example, given the following hierarchy of a lakehouse in OneLake.

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
│   │
│   └───subfolder11
│       │   file1111.txt
|       │
│       └───subfolder111
|            │   file1111.txt
```

  </td>
<tr>
   <td> <b> Role2 </b> </td>
   <td> <b> Read </b> </td>
   <td> <b> folder2 </b> </td>
   <td>

```bash
    │   file21.txt
```

</td>
</tr>

</table>

## How OneLake RBAC permissions are evaluated with Fabric permissions

Workspace and Item permissions let you grant "coarse-grain" access to data in OneLake for the given Item. OneLake RBAC permissions enable you to restrict the data access in OneLake only to specific folders.

<!--
The Mermaid diagram generated from the following file code:
.\media\mermaids\rbac-evaluation-with-fabric.mmd
-->
:::image type="content" source=".\media\mermaids\rbac-evaluation-with-fabric.svg" alt-text="Diagram showing the structure of a data lake connecting to separately secured containers.":::

## OneLake RBAC and Workspace permissions

The workspace permissions are the first security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. You manage security in the workspace through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](../get-started/roles-workspaces.md)

Workspace roles in Fabric grant the following permissions in OneLake.

| **Permission** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Yes | Yes | Yes | No by default. Use OneLake RBAC to grant the access. |
| Write files in OneLake | Yes | Yes | Yes | No |

## OneLake RBAC and Lakehouse permissions

Within a workspace, Fabric items can have permissions configured separately from the workspace roles. You can configure permissions either through sharing an item or by managing the permissions of an item. The following permissions determine a user's ability to perform actions on data in OneLake.

### Lakehouse permissions

| **Lakehouse Permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** |
|----------|----------|----------|--------------|
| Read  | No by default, use OneLake RBAC to grant access. | No | No |
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

## Shortcuts

### OneLake RBAC in Internal Shortcuts

For any folder in a lakehouse, RBAC permissions always inherit to all [Internal shortcuts](../onelake-shortcuts.md) where this folder is defined as target.

When a user accesses data through a shortcut to another OneLake location, the identity of the calling user is used to authorize access to the data in the target path of the shortcut*. As a result, this user must have OneLake RBAC permissions in the target location to read the data.

> [!IMPORTANT]
> When accessing shortcuts through **Power BI semantic models** or **T-SQL**, the calling user’s identity is not passed through to the shortcut target. The calling item owner’s identity is passed instead, delegating access to the calling user.

Defining RBAC permissions for the internal shortcut is not allowed and must be defined on the target folder located in the target item. Since defining RBAC permissions is limited to lakehouse items only, OneLake enables RBAC permissions only for shortcuts targeting folders in lakehouse items.

The table below specifies whether the corresponding shortcut scenario is supported for defining OneLake RBAC permissions.

| Internal Shortcut scenario | OneLake RBAC permissions supported? | Comments |
| ---- | ---- | --- |
| 1. Shortcut in a lakehouse1 pointing to folder2 located in the **same lakehouse**. | Supported. | To restrict the access to data in shortcut, define OneLake RBAC for folder2. |
| 2. Shortcut in a lakehouse1 pointing to folder2 located in **another lakehouse2** | Supported. | To restrict the access to data in shortcut, define OneLake RBAC for folder2 in lakehouse2. |
| 3. Shortcut in a lakehouse pointing to a Table located in a **datawarehouse** | Not supported. | OneLake doesn't support defining RBAC permissions in datawarehouses. |
| 4. Shortcut in a lakehouse pointing to a Table located in a **KQL database** | Not supported. | OneLake doesn't support defining RBAC permissions in KQL databases. |

### OneLake RBAC in External Shortcuts (ADLS, S3, Dataverse)

OneLake supports defining RBAC permissions for [ADLS, S3 and Dataverse shortcuts](../onelake-shortcuts.md). In this case, RBAC model is applied **on top** of the delegated authorization model enabled for this type of shortcut.

Suppose, user1 creates an S3 shortcut in a lakehouse pointing to a folder in an AWS S3 bucket. Then user2 is attempting to access data in this shortcut.

| 1. Does S3 Connection authorize access for the delegated user1? | 2. Does OneLake RBAC authorize access for the requesting user2? | 1+2 Result: Can user2 access data in S3 Shortcut?  |
| ---- | --- | --- |
| No | No OneLake RBAC permissions defined for shortcut1. | No |
| No | No | No |
| No | Yes | No |
| Yes | No OneLake RBAC permissions defined for shortcut1. | Yes |
| Yes | No | No |
| Yes | Yes | Yes |

The RBAC permissions must be defined for the entire scope of the shortcut (entire target folder), but inherit recursively to all its sub-folders and files.

Learn more about S3, ADLS and Dataverse shortcuts in [OneLake Shortcuts](../onelake-shortcuts.md).


### Limits on OneLake RBAC

|  |  |
| ---- | ---- |
| Maximum number of OneLake RBAC roles per Fabric Item | At most 250 roles for each lakehouse item. |
| Maximum number of members per OneLake RBAC role | At most 500 users and user groups per role. |
| Maximum number of permissions per OneLake RBAC role | At most 500 permissions per role |
