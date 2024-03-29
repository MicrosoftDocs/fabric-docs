---
title: Data Access Control Model in OneLake (Public Preview)
description: Learn the details of how OneLake secures data.
ms.reviewer: aamerril
ms.author: yuturchi
author: yuturchi
ms.topic: conceptual
ms.custom:
  - onelake-data-access-public-preview-april-2024
ms.date: 4/1/2024
---

# Role-based access control (RBAC)

OneLake RBAC uses role assignments to apply permissions to its members. You can either assign roles to individuals or to security groups, Microsoft 365 groups, and distribution lists. Every member in the user group gets the assigned role.

If someone is in two or more security groups or Microsoft 365 group, they get the highest level of permission that is provided by the roles. If you nest user groups and assign a role to a group, all the contained users have permissions.

OneLake RBAC enables users to define data access roles for **Lakehouse Items** only.

OneLake RBAC restricts data access for users with Workspace **Viewer** or read access to a lakehouse. It doesn't apply to Workspace Admins, Members, or Contributors. As a result, OneLake RBAC supports only Read level of permissions.

## How to create RBAC roles

You can define and manage OneLake RBAC roles using Lakehouse experience.

Learn more in [Get Started with Data Access Roles](../security/get-started-data-access-roles.md).

## Default RBAC Role in lakehouse

When user creates a new lakehouse, OneLake generates a default RBAC Role named `Default Readers`. The role allows all users with ReadAll permission to read all folders in the Item.

Here's the default Role definition:

| Fabric Item | Role Name | Permission | Folders included | Assigned members |
| ---- | --- | --- | ---- | ---- |
| Lakehouse | `DefaultReader` | ReadAll | All folders under `Tables/` and `Files/` | All users with ReadAll permission |

> [!NOTE]
> In order to restrict the access to specific users or specific folders, you must either modify the default role or remove it and create a new custom role.

## Inheritance in OneLake RBAC

For any given folder, OneLake RBAC permissions always inherit to the entire hierarchy of the folder's files and subfolders.

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

For the given hierarchy, OneLake RBAC permissions for `Role1` and `Role2` inherit in a following way:

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

## Traversal and listing in OneLake RBAC

OneLake RBAC provides automatic traversal of parent items to ensure that data is easy to discover. Granting a user Read to subfolder11 grants the user the ability to list and traverse the parent directory folder1. This functionality is similar to Windows folder permissions where giving access to a subfolder provides discovery and traversal for the parent directories. The list and traversal granted to the parent does not extend to other items outside of the direct parents, ensuring other folders are kept secure.

For example, given the following hierarchy of a lakehouse in OneLake.

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

For the given hierarchy, OneLake RBAC permissions for 'Role1' provides the following access. Note that access to file11.txt is not visible as it is not a parent of subfolder11. Likewise for Role2, file111.txt is not visible either.

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
    <td> <b>subfolder11 </b></td>
    <td>

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

  </td>
<tr>
   <td> <b> Role2 </b> </td>
   <td> <b> Read </b> </td>
   <td> <b> subfolder111 </b> </td>
   <td>

```bash
Files/
────folder1
│   │
│   └───subfolder11
|       │
│       └───subfolder111
|            │   file1111.txt
```

</td>
</tr>

</table>

For shortcuts, the listing behavior is slightly different. Shortcuts to external data sources behave the same as folders do, however shortcuts to other OneLake locations have specialized behavior. Access to a OneLake shortcut is determined by the target permissions of the shortcut. When listing shortcuts, no call is made to check the target access. As a result, when listing a directory all internal shortcuts will be returned regardless of a user's access to the target. When a user tries to open the shortcut the access check will evaluate and a user will only see data they have the required permissions to see. For more information on shortcuts, see the [shortcuts security section.](#shortcuts)

The examples below use the following folder hierarchy.

```bash
Files/
────folder1
│   
└───shortcut2
|
└───shortcut3
```

<table>
  <tr>
    <td> <b> Role </b> </td>
    <td> <b> Permission </b></td>
    <td> <b> Folder defined in the Permission </b></td>
    <td> <b> Result of listing Files </b></td>
  </tr>
  <tr>
    <td> <b> Role1</b> </td>
    <td> <b> Read </b> </td>
    <td> <b>folder1 </b></td>
    <td>

```bash
Files/
────folder1
│   
└───shortcut2
|
└───shortcut3
```

  </td>
<tr>
   <td> <b> Role2 </b> </td>
   <td> <b> N/A </b> </td>
   <td> <b> N/A </b> </td>
   <td>

```bash
Files/
│   
└───shortcut2
|
└───shortcut3
```

</td>
</tr>

</table>

## How OneLake RBAC permissions are evaluated with Fabric permissions

Workspace and Item permissions let you grant "coarse-grain" access to data in OneLake for the given Item. OneLake RBAC permissions enable you to restrict the data access in OneLake only to specific folders.

:::image type="content" source=".\media\security-flow.png" alt-text="Diagram showing the order of permissions evaluations with workspace, item, and RBAC.":::

## OneLake RBAC and Workspace permissions

The workspace permissions are the first security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. You manage security in the workspace through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](../../get-started/roles-workspaces.md)

Workspace roles in Fabric grant the following permissions in OneLake.

| **Permission** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Always* Yes | Always* Yes | Always* Yes | No by default. Use OneLake RBAC to grant the access. |
| Write files in OneLake | Always* Yes | Always* Yes | Always* Yes | No |

> [!NOTE]
> *Since Workspace Admin, Member and Contributor Roles automatically grant Write permissions to OneLake, it overrides any OneLake RBAC Read permissions.
>
> | **Workspace Role** | **Does OneLake apply RBAC Read permissions?**|
> |---|---|
> | Admin, Contributor, Member | No, OneLake Security will ignore any OneLake RBC Read permissions |
> | Viewer | Yes, if defined, OneLake RBAC Read permissions will be applied |

## OneLake RBAC and Lakehouse permissions

Within a workspace, Fabric items can have permissions configured separately from the workspace roles. You can configure permissions either through sharing an item or by managing the permissions of an item. The following permissions determine a user's ability to perform actions on data in OneLake.

### Lakehouse permissions

| **Lakehouse Permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** |
|----------|----------|----------|--------------|
| Read  | No by default, use OneLake RBAC to grant access. | No | No |
| ReadAll | Yes by default. Use OneLake RBAC to restrict the access. | No | No |
| Write | Yes | Yes | Yes |
| Reshare, ViewOutput, ViewLogs | N/A - can't be granted on its own |  N/A - can't be granted on its own |  N/A - can't be granted on its own |

### OneLake RBAC and Lakehouse SQL Analytics Endpoint permissions

SQL analytics endpoint is a warehouse that is automatically generated from a Lakehouse in Microsoft Fabric. A customer can transition from the "Lake" view of the Lakehouse (which supports data engineering and Apache Spark) to the "SQL" view of the same Lakehouse. Learn more about SQL analytics endpoint in [Data Warehouse documentation: SQL analytics endpoint](../../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse).

| **SQL Analytics Endpoint Permission** | **Users can view files via OneLake Endpoint?** | **Users can write files via OneLake Endpoint?** | **Users can read data via SQL analytics endpoint?** |
|----------|----------|----------|--------------|
| Read  | No by default, use OneLake RBAC to grant access. | No | No by default, but can be configured with [SQL granular permissions](../../data-warehouse/sql-granular-permissions.md) |
| ReadData | No by default. Use OneLake RBAC to grant access. | No | Yes |
| Write | Yes | Yes | Yes |

### OneLake RBAC and Default Lakehouse Semantic Model permissions

In Microsoft Fabric, when the user creates a lakehouse, the system also provisions the associated default semantic model. The default semantic model has metrics on top of lakehouse data. The semantic model allows Power BI to load data for reporting.

| **Default Semantic Model Permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can see schema in Semantic Model?** | **Can read data in Semantic Model?** |
|----------|----------|----------|--------------|-------------|
| Read  | No by default, use OneLake RBAC to grant access. | No | No | Yes by default. Can be restricted with [Power BI Object-level Security](/power-bi/enterprise/service-admin-ols?tabs=table) and [Power BI Row-Level security](/power-bi/enterprise/service-admin-rls)  |
| Build | Yes by default. Use OneLake RBAC to restrict the access. | Yes | Yes | Yes |
| Write | Yes | Yes | Yes | Yes |
| Reshare |  N/A - can't be granted on its own | N/A - can't be granted on its own | N/A - can't be granted on its own | N/A - can't be granted on its own |

#### Lakehouse Sharing and OneLake RBAC Permissions

When user shares a lakehouse, they grant other users or a group of users access to a lakehouse without giving access to the workspace and the rest of its items. Shared lakehouse can be found through Data Hub or the Shared with Me section in Microsoft Fabrics.

When someone shares a lakehouse, they can also grant access to the SQL endpoint and associated default semantic model.

:::image type="content" source=".\media\lakehouse-sharing.png" alt-text="A snapshot showing the Lakehouse user experience of sharing data.":::

| **Sharing Option** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** | **Can view and build Semantic Models?** |
|----------|----------|----------|----------|-----|
| *No additional permissions selected* | No by default, use OneLake RBAC to grant access. |  No | No | No |
| Read all Apache Spark | Yes by default. Use OneLake RBAC to restrict the access. |  No | No | No |
| Read all SQL endpoint data | No by default, use OneLake RBAC to grant access. |  No | Yes | No |
| Build  reports on the default dataset | Yes by default. Use OneLake RBAC to restrict the access. | No | No | Yes |

Learn more about data sharing permissions model:
- [How lakehouse sharing works](../../data-engineering/lakehouse-sharing.md)
- [Share your warehouse and manage permissions](../../data-warehouse/share-warehouse-manage-permissions.md)

## Shortcuts

### OneLake RBAC in Internal Shortcuts

For any folder in a lakehouse, RBAC permissions always inherit to all [Internal shortcuts](../onelake-shortcuts.md) where this folder is defined as target.

When a user accesses data through a shortcut to another OneLake location, the identity of the calling user is used to authorize access to the data in the target path of the shortcut*. As a result, this user must have OneLake RBAC permissions in the target location to read the data.

> [!IMPORTANT]
> When accessing shortcuts through **Power BI semantic models** or **T-SQL**, the calling user’s identity is not passed through to the shortcut target. The calling item owner’s identity is passed instead, delegating access to the calling user.

Defining RBAC permissions for the internal shortcut is not allowed and must be defined on the target folder located in the target item. Since defining RBAC permissions is limited to lakehouse items only, OneLake enables RBAC permissions only for shortcuts targeting folders in lakehouse items.

The next table specifies whether the corresponding shortcut scenario is supported for defining OneLake RBAC permissions.

| Internal Shortcut scenario | OneLake RBAC permissions supported? | Comments |
| ---- | ---- | --- |
| Shortcut in a lakehouse1 pointing to folder2 located in the **same lakehouse**. | Supported. | To restrict the access to data in shortcut, define OneLake RBAC for folder2. |
| Shortcut in a lakehouse1 pointing to folder2 located in **another lakehouse2** | Supported. | To restrict the access to data in shortcut, define OneLake RBAC for folder2 in lakehouse2. |
| Shortcut in a lakehouse pointing to a Table located in a **datawarehouse** | Not supported. | OneLake doesn't support defining RBAC permissions in datawarehouses. Access is determined based on the ReadAll permission instead.|
| Shortcut in a lakehouse pointing to a Table located in a **KQL database** | Not supported. | OneLake doesn't support defining RBAC permissions in KQL databases. Access is determined based on the ReadAll permission instead.|

### OneLake RBAC in External Shortcuts (ADLS, S3, Dataverse)

OneLake supports defining RBAC permissions for shortcuts such as [ADLS, S3 and Dataverse shortcuts](../onelake-shortcuts.md). In this case, RBAC model is applied **on top** of the delegated authorization model enabled for this type of shortcut.

Suppose, user1 creates an S3 shortcut in a lakehouse pointing to a folder in an AWS S3 bucket. Then user2 is attempting to access data in this shortcut.

| Does S3 Connection authorize access for the delegated user1? | Does OneLake RBAC authorize access for the requesting user2? | Result: Can user2 access data in S3 Shortcut?  |
| ---- | --- | --- |
| Yes | Yes | Yes |
| No | No | No |
| No | Yes | No |
| Yes | No | No |

The RBAC permissions must be defined for the entire scope of the shortcut (entire target folder), but inherit recursively to all its subfolders and files.

Learn more about S3, ADLS, and Dataverse shortcuts in [OneLake Shortcuts](../onelake-shortcuts.md).

### Limits on OneLake RBAC

The following table provides the limitations of OneLake data access roles. 

| Scenario | Limit |
| ---- | ---- |
| Maximum number of OneLake RBAC roles per Fabric Item | At most 250 roles for each lakehouse item. |
| Maximum number of members per OneLake RBAC role | At most 500 users and user groups per role. |
| Maximum number of permissions per OneLake RBAC role | At most 500 permissions per role |

### Latencies in OneLake RBAC

- If you change a OneLake RBAC Role definition, it takes about 5 minutes for OneLake to apply the updated definitions.
- If you change a user group in OneLake RBAC role, it takes about an hour for OneLake to apply the role's permissions on the updated user group.
