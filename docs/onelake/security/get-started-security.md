---
title: Data security overview
description: Get started with securing your data in OneLake with this overview of the core concepts and capabilities.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: concept-article
ms.custom:
ms.date: 09/05/2025
#customer intent: As a OneLake user, I want to understand the core concepts and capabilities of data security in OneLake so that I can use them to protect my data stored and accessed in OneLake.
---

# Data security overview

OneLake is a hierarchical data lake, like Azure Data Lake Storage (ADLS) Gen2 or the Windows file system. Security in OneLake is enforced on both the control plane and the data plane:

* **Control plane permissions**: Govern what actions users can perform within the environment, such as creating, managing, or sharing items. Control plane permissions often provide data plane permissions by default.
* **Data plane permissions**: Govern what data users can access or view, regardless of their ability to manage resources.

You can set security at each level within the data lake. However, some levels in the hierarchy receive special treatment because they correlate with Fabric concepts. [OneLake security](#onelake-security-preview) controls all access to OneLake data with permissions inherited from the parent item or workspace. You can set permissions at the following levels:

* **Workspace**: A collaborative environment for creating and managing items. You manage security through workspace roles at this level.

* **Item**: A set of capabilities bundled together into a single component. A data item is a subtype of item that allows data to be stored within it by using OneLake, such as a lakehouse, warehouse, or SQL database. Items inherit permissions from the workspace roles but can have additional permissions as well.

* **Folders**: You use folders within an item for storing and managing data, such as Tables/ or Files/.

Items always live within workspaces, and workspaces always live directly under the OneLake namespace. You can visualize this structure as follows:

:::image type="content" source=".\media\get-started-security\structure.png" alt-text="Diagram showing the hierarchical nature of OneLake as a folder structure. OneLake/Workspace/Item as an example." lightbox=".\media\get-started-security\structure.png":::

## Permissions in OneLake

This section describes how permissions in OneLake manage access at the workspace and item levels.

### Workspace permissions

Workspace permissions define what actions users can take within a workspace and its items. Manage these permissions at the workspace level. These permissions are primarily control plane permissions. They determine administrative and item management capabilities, not direct data access. However, items and folders generally inherit workspace permissions to grant data access by default. Workspace permissions define access to all items within that workspace.

The four different workspace roles grant different types of access. The following table lists the default behaviors of each workspace role:

| Role | Can add admins? | Can add members? | Can edit OneLake security? | Can write data and create items? | Can read data in OneLake? | Can update and delete the workspace? |
|--|--|--|--|--|--|--|--|
| Admin | Yes | Yes | Yes | Yes | Yes | Yes |
| Member | No | Yes | Yes | Yes | Yes | No |
| Contributor | No | No | No | Yes | Yes | No |
| Viewer | No | No | No | No | No* | No |

\* You can give Viewers access to data by using OneLake security roles.

Learn more about [Roles in workspaces in Microsoft Fabric](../../fundamentals/roles-workspaces.md).

Simplify the management of Fabric workspace roles by assigning them to security groups. This method lets you control access by adding or removing members from the security group.

### Item permissions

By using the [sharing](../../fundamentals/share-items.md) feature, you can give a user direct access to an item. The user can only see that item in the workspace and isn't a member of any workspace roles. Item permissions grant access to connect to that item and any of its endpoints that the user can access.

| Permission | See the item metadata? | See data in SQL? | See data in OneLake? |
|--|--|--|--|
| Read | Yes | No | No |
| ReadData | No | Yes | No |
| ReadAll | No | No | Yes* |

\* Not applicable to items with [OneLake security](#onelake-security-preview) enabled. If OneLake security is enabled, ReadAll only grants access if the DefaultReader role is in use. If the DefaultReader role is edited or deleted, access is instead granted based on what data access roles the user is part of.

Another way to configure permissions is via an item's **Manage permissions** page. Using this page, you can add or remove individual item permission for users or groups. The item type determines which permissions are available.

## OneLake security (preview)

OneLake security enables you to define granular role-based security for data stored in OneLake and enforce that security consistently across all compute engines in Fabric. OneLake security is the **data plane** security model for data in OneLake.

Fabric users in the Admin or Member roles can create OneLake security roles to grant users access to data within an item. Each role has four components:

* **Data**: The tables or folders that users can access.
* **Permission**: The permissions that users have on the data.
* **Members**: The users that are members of the role.
* **Constraints**: The components of the data, if any, that are excluded from role access, such as specific rows or columns.

OneLake security roles grant access to data for users in the **Viewer** workspace role or with **Read** permission on the item. Admins, Members, and Contributors aren't affected by OneLake security roles and can read and write all data in an item regardless of their role membership. A DefaultReader role exists in all lakehouses and gives any user with the ReadAll permission access to data in the lakehouse. You can delete or edit the DefaultReader role to remove that access.

Learn more about creating OneLake security roles for [Tables and folders](./table-folder-security.md), [Columns](./column-level-security.md), and [Rows](./row-level-security.md).

Learn more about the [access control model for OneLake security](./data-access-control-model.md).

### Compute permissions

Compute permissions are a type of data plane permission that applies to a specific query engine in Microsoft Fabric. The access granted applies only to queries run against that specific engine, such as the SQL endpoint or a Power BI semantic model. Depending on the compute permissions, users might see different results when they access data through a compute engine compared to when they access data directly in OneLake.

Use OneLake security to secure data in OneLake rather than compute permissions. OneLake security ensures consistent results across all engines that a user might interact with.

Compute engines might have more advanced security features that aren't available in OneLake security. In that case, some scenarios might require using the compute permissions. When you use compute permissions to secure access to data, make sure that you give end users access only to the compute engine where the security is set. This best practice prevents data from being accessed through a different engine without the necessary security features.

## Shortcut security

Shortcuts in Microsoft Fabric simplify data management. OneLake folder security applies to OneLake shortcuts based on roles defined in the lakehouse where the data is stored.

For more information on shortcut security considerations, see [OneLake security access control model > Shortcuts](./data-access-control-model.md#shortcuts).

For information on access and authentication details for specific shortcuts, see [types of OneLake shortcuts](../onelake-shortcuts.md#types-of-shortcuts).

## Authentication

OneLake uses Microsoft Entra ID for authentication. Use it to give permissions to user identities and service principals. OneLake automatically extracts the user identity from tools that use Microsoft Entra authentication and maps it to the permissions you set in the Fabric portal.

> [!NOTE]
> To use service principals in a Fabric tenant, a tenant administrator must enable Service Principal Names (SPNs) for the entire tenant or specific security groups. Learn more about enabling Service Principals in [Developer settings of the tenant admin portal](../../admin/tenant-settings-index.md#developer-settings).

## Audit logs

To view your OneLake audit logs, follow the instructions in [Track user activities in Microsoft Fabric](/fabric/admin/track-user-activities). OneLake operation names correspond to [ADLS APIs](/rest/api/storageservices/data-lake-storage-gen2) such as CreateFile or DeleteFile. OneLake audit logs don't include read requests or requests made to OneLake via Fabric workloads.

## Encryption and networking

### Data at rest

Data stored in OneLake is encrypted at rest by default by using Microsoft-managed keys. Microsoft-managed keys are rotated appropriately. OneLake encrypts and decrypts data transparently and is FIPS 140-2 compliant.

You can use encryption at rest by using customer-managed keys to add another layer of protection by using keys you own and control. For more information, see [Customer-managed keys for Fabric workspaces](../../security/workspace-customer-managed-keys.md).

### Data in transit

Data in transit across the public internet between Microsoft services is always encrypted by using at least TLS 1.2. Fabric negotiates to TLS 1.3 whenever possible. Traffic between Microsoft services always routes over the Microsoft global network.

Inbound OneLake communication also enforces TLS 1.2 and negotiates to TLS 1.3 whenever possible. Outbound Fabric communication to customer-owned infrastructure prefers secure protocols but might fall back to older, insecure protocols (including TLS 1.0) when newer protocols aren't supported.

### Private links

To configure private links in Fabric, see [Set up and use private links](/fabric/security/security-private-links-use).

## Allow apps running outside of Fabric to access data via OneLake

You can allow or restrict access to OneLake data from applications that are outside of the Fabric environment. Admins can find this setting in the [OneLake section of the admin portal tenant settings](../../admin/tenant-settings-index.md#onelake-settings).

When you turn on this setting, users can access data from all sources. For example, turn this setting on if you have custom applications that use Azure Data Lake Storage (ADLS) APIs or OneLake file explorer. When you turn off this setting, users can still access data from internal apps like Spark, Data Engineering, and Data Warehouse, but can't access data from applications running outside of Fabric environments.

## Related content

* [OneLake security overview](./get-started-onelake-security.md)
* [OneLake security access control model](./data-access-control-model.md)
* [Workspace roles](../../fundamentals/roles-workspaces.md)
* [OneLake file explorer](../onelake-file-explorer.md)
* [Share items](../../fundamentals/share-items.md)
