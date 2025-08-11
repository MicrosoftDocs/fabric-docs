---
title: OneLake security overview
description: Get started with securing your data in OneLake with this overview of the core concepts and capabilities.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: concept-article
ms.custom:
ms.date: 03/24/2025
#customer intent: As a OneLake user, I want to understand the core concepts and capabilities of data security in OneLake so that I can use them to protect my data stored and accessed in OneLake.
---

# OneLake security overview

OneLake is a hierarchical data lake, like Azure Data Lake Storage (ADLS) Gen2 or the Windows file system. Security in OneLake is enforced at multiple levels, each corresponding to different aspects of access and control. Understanding the distinction between control plane and data plane permissions is key to effectively securing your data:
- **Control plane permissions**: Govern what actions users can perform within the environment (e.g., creating, managing, or sharing items). Control plane permissions often provide data plane permissions by default.
- **Data plane permissions**: Govern what data users can access or view, regardless of their ability to manage resources.

You can set security at each of the levels within the data lake. However, some levels in the hierarchy are given special treatment because they correlate with Fabric concepts. OneLake security controls all access to OneLake data with different permissions inherited from the parent item or workspace permissions.

- **Workspace**: a collaborative environment for creating and managing items. Workspace roles can be managed at this level.

- **Item**: a set of capabilities bundled together into a single component. A data item is a subtype of item that allows data to be stored within it using OneLake. Items inherit permissions from the workspace roles, but can have additional permissions as well.

- **Folders**: folders within an item that are used for storing and managing data, such as Tables/ or Files/.

Items always live within workspaces and workspaces always live directly under the OneLake namespace. You can visualize this structure as follows:

:::image type="content" source=".\media\get-started-security\structure.png" alt-text="Diagram showing the hierarchical nature of OneLake as a folder structure. OneLake/Workspace/Item as an example." lightbox=".\media\get-started-security\structure.png":::

## Security in OneLake

This section describes the security model based on generally available OneLake features.

### Workspace permissions

Workspace permissions define what actions users can take within a workspace and its items. These permissions are managed at the workspace level and are primarily control plane permissions; they determine administrative and item management capabilities, not direct data access. However, workspace permissions will generally inherit down to the item and folder level to grant data access by default. Workspace permissions allow for defining access to all items within that workspace. There are four different workspace roles, each of which grants different types of access. Below are the default behaviors of each workspace role.

| Role | Can add admins? | Can add members? | Can edit OneLake security? | Can write data and create items? | Can read data in OneLake? |
|--|--|--|--|--|
| Admin | Yes | Yes | Yes | Yes | Yes |
| Member | No | Yes | Yes | Yes | Yes |
| Contributor | No | No | No | Yes | Yes |
| Viewer | No | No | No | No | No* |

> [!NOTE]
> *Viewers can be given access to data through OneLake security roles.

You can simplify the management of Fabric workspace roles by assigning them to security groups. This method lets you control access by adding or removing members from the security group.

### Item permissions

With the [sharing](../../fundamentals/share-items.md) feature, you can give a user direct access to an item. The user can only see that item in the workspace and isn't a member of any workspace roles. Item permissions grant access to connect to that item and which item endpoints the user is able to access.

| Permission | See the item metadata? | See data in SQL? | See data in OneLake? |
|--|--|--|--|
| Read | Yes | No | No |
| ReadData | No | Yes | No |
| ReadAll | No | No | Yes* |

*Not applicable to items with OneLake security or data access roles enabled. If the preview is enabled, ReadAll only grants access if the DefaultReader role is in use. If the DefaultReader role is edited or deleted, access is instead granted based on what data access roles the user is part of.

Another way to configure permissions is via an item's **Manage permissions** page. Using this page, you can add or remove individual item permission for users or groups. The item type determines which permissions are available.

### Compute permissions

Compute permissions are a type of data plane permission that applies to a specific query engine in Microsoft Fabric. The access granted applies only to queries run against that specific engine, such as the SQL Endpoint or a Power BI Semantic Model. However, users might see different results when they access data through a compute engine compared to when they access data directly in OneLake, depending on the compute permissions applied. To prevent this mismatch, ensure that a user's item permissions are configured to only grant them access to either the SQL analytics endpoint (using ReadData) or OneLake (using ReadAll). Using OneLake security (preview) will ensure a consistent view of data across all engines in Fabric, and is recommended to avoid this complexity. 

In the following example, a user is given read-only access to a lakehouse through item sharing. The user is granted SELECT permission on a table through the SQL analytics endpoint. When that user tries to read data through the OneLake APIs, they're denied access because they don't have sufficient permissions. The user can successfully read through SQL SELECT statements.

:::image type="content" source=".\media\get-started-security\sql.png" alt-text="Diagram showing a user accessing data through SQL but denied access when querying OneLake directly.":::

## OneLake security (preview)

OneLake security allows users to define granular role-based security to data stored in OneLake, and enforce that security consistently across all compute engines in Fabric.

[!INCLUDE [onelake-security-preview](../../includes/onelake-security-preview.md)]

OneLake security replaces the existing OneLake data access roles (preview) feature that was released in April 2024. All data access roles users will be automatically upgraded to OneLake security roles when the feature goes public preview. Check the [Fabric roadmap](https://aka.ms/FabricRoadmap) for more details.

Fabric users in the Admin or Member roles can create OneLake security roles to grant users access to data within an item. Each role has four components:

* **Data**: The tables or folders that users can access.
* **Permission**: The permissions that users have on the data.
* **Members**: The users that are members of the role.
* **Constraints**: The components of the data, if any, that are excluded from role access, such as specific rows or columns.

OneLake security roles grant access to data for users in the **Viewer** workspace role. Admins, Members, and Contributors are not affected by OneLake security roles and can read and write all data in an item regardless of their role membership. A DefaultReader role exists in all lakehouses that gives any user with the ReadAll permission access to data in the lakehouse. The DefaultReader role can be deleted or edited to remove that access.

Learn more about creating OneLake security roles for [Tables and folders](./table-folder-security.md), [Columns](./column-level-security.md), and [Rows](./row-level-security.md).

## OneLake data access roles (preview)

OneLake data access roles is a feature that enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant read access to specific folders within a Fabric item, and assign them to users or groups. The access permissions determine what folders users see when accessing the lake view of the data through the lakehouse UX, notebooks, or OneLake APIs.  

> [!IMPORTANT]
> Starting in Q3 2025, OneLake data access roles will be replaced by OneLake security. All users will be automatically upgraded and no action is required. 

Fabric users in the Admin, Member, or Contributor roles can get started by creating OneLake data access roles to grant access to only specific folders in a lakehouse. To grant access to data in a lakehouse, add users to a data access role. Users that aren't part of a data access role can see no data in that lakehouse.

>[!NOTE]
>To access shortcut data, users need the ReadAll permission on the target lakehouse in addition to access through a OneLake data access role.
>
>If you use Power BI semantic models or T-SQL to access shortcuts, keep in mind that the calling user’s identity isn't passed to the shortcut target path. Instead, the calling item owner’s identity is passed, which delegates access to the calling user.

Learn more about creating data access roles in [Get started with data access roles](./get-started-data-access-roles.md).

Learn more about the security model for access roles [Data access control model](./data-access-control-model.md).

## Shortcut security

Shortcuts in Microsoft Fabric allow for simplified data management. OneLake folder security applies to OneLake shortcuts based on roles defined in the lakehouse where the data is stored.

For more information on shortcut security considerations, see [OneLake access control model](./data-access-control-model.md).

For information on access and authentication details for specific shortcuts, see [OneLake shortcuts > Types of shortcuts](../onelake-shortcuts.md#types-of-shortcuts).

## Authentication

OneLake uses Microsoft Entra ID for authentication; you can use it to give permissions to user identities and service principals. OneLake automatically extracts the user identity from tools, which use Microsoft Entra authentication and maps it to the permissions you set in the Fabric portal.

> [!NOTE]
> To use service principals in a Fabric tenant, a tenant administrator must enable Service Principal Names (SPNs) for the entire tenant or specific security groups. Learn more about enabling Service Principals in [Developer settings of the tenant admin portal](../../admin/tenant-settings-index.md#developer-settings).

## Audit Logs

To view your OneLake audit logs, follow the instructions in [Track user activities in Microsoft Fabric](/fabric/admin/track-user-activities). OneLake operation names correspond to [ADLS APIs](/rest/api/storageservices/data-lake-storage-gen2) such as CreateFile or DeleteFile. OneLake audit logs don't include read requests or requests made to OneLake via Fabric workloads.

## Encryption and networking

### Data at Rest

Data stored in OneLake is encrypted at rest by default using Microsoft-managed keys. Microsoft-managed keys are rotated appropriately. Data in OneLake is encrypted and decrypted transparently and is FIPS 140-2 compliant.

Encryption at rest using customer-managed keys currently isn't supported. You can submit a request for this feature on [Microsoft Fabric ideas](https://ideas.fabric.microsoft.com/).

### Data in transit

Data in transit across the public internet between Microsoft services is always encrypted with at least TLS 1.2. Fabric negotiates to TLS 1.3 whenever possible. Traffic between Microsoft services always routes over the Microsoft global network.

Inbound OneLake communication also enforces TLS 1.2 and negotiates to TLS 1.3 whenever possible. Outbound Fabric communication to customer-owned infrastructure prefers secure protocols but might fall back to older, insecure protocols (including TLS 1.0) when newer protocols aren't supported.

### Private links

To configure private links in Fabric, see [Set up and use private links](/fabric/security/security-private-links-use).

## Allow apps running outside of Fabric to access data via OneLake

You can allow or restrict access to OneLake data from applications that are outside of the Fabric environment. Admins can find this setting in the [OneLake section of the admin portal tenant settings](../../admin/tenant-settings-index.md#onelake-settings).

When you turn on this setting, users can access data from all sources. For example, turn this setting on if you have custom applications that use Azure Data Lake Storage (ADLS) APIs or OneLake file explorer. When you turn off this setting, users can still access data from internal apps like Spark, Data Engineering, and Data Warehouse, but can't access data from applications running outside of Fabric environments.

## Related content

- [Fabric and OneLake security overview](./fabric-onelake-security.md)
- [OneLake data access roles (preview)](./get-started-data-access-roles.md)
- [Workspace roles](../../fundamentals/roles-workspaces.md)
- [OneLake file explorer](../onelake-file-explorer.md)
- [Share items](../../fundamentals/share-items.md)
