---
title: Get started securing your data in OneLake
description: Get started with securing your data in OneLake with this overview of the concepts and capabilities.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Get started securing your data in OneLake

OneLake is a hierarchical data lake, like Azure Data Lake Storage (ADLS) Gen2 or the Windows file system. This structure allows you to set security at different levels in the hierarchy to govern access. Some levels in the hierarchy are given special treatment as they correlate with Fabric concepts.

- **Workspace**: a collaborative environment for creating and managing items.

- **Item**: a set of capabilities bundled together into a single component. A data item is a subtype of item that allows data to be stored within it using OneLake.

- **Folders**: folders within an item that are used for storing and managing data.

Items always live within workspaces and workspaces always live directly under the OneLake namespace. You can visualize this structure as follows:

:::image type="content" source="media\get-started-security\structure.png" alt-text="Diagram showing the hierarchical nature of OneLake as a folder structure. OneLake/Workspace/Item as an example." lightbox="media\get-started-security\structure.png":::

## Workspace permissions

Workspace permissions allow for defining access to all items within that workspace. There are 4 different workspace roles, each of which grants different types of access.

|     Role           |     Can add admins?    |     Can add members?    |     Can write data and create items?    |     Can read data?    |
|--------------------|------------------------|-------------------------|-----------------------------------------|-----------------------|
|     Admin          |     Yes                |     Yes                 |     Yes                                 |     Yes               |
|     Member         |     No                 |     Yes                 |     Yes                                 |     Yes               |
|     Contributor    |     No                 |     No                  |     Yes                                 |     Yes               |
|     Viewer         |     No                 |     No                  |     No                                  |     Yes               |

> [!NOTE]
> You can view the Warehouse item with read-write roles, but you can only write to warehouses using SQL queries.

You can simplify the management of Fabric workspace roles by assigning them to security groups. This method lets you control access by adding or removing members from the security group.

## Item permissions

With the [sharing](../get-started/share-items.md) feature, you can give a user direct access to an item. The user can only see that item in the workspace and isn't a member of any workspace roles. Item permissions grant access to connect to that item and which item endpoints the user is able to access.

|     Permission |   See the item metadata? |     See data in SQL? |     See data in OneLake? |
|----------------|--------------------------|----------------------|--------------------------|
|     Read       |     Yes                  |     No               |     No                   |
|     ReadData   |     No                   |     Yes              |     No                   |
|     ReadAll    |     No                   |     No               |     Yes*                 |

*Not applicable to items with OneLake data access roles (preview) enabled. If the preview is enabled, ReadAll will only grant access if the DefaultReader role is in use. If that role is edited or deleted, access is instead granted based on what data access roles the user is part of.

Another way to configure permissions is via an item's **Manage permissions** page. Using this page, you can add or remove individual item permission for users or groups. The exact permissions available are determined by the item type.

## Compute permissions

Data access can also be given through the SQL compute engine in Microsoft Fabric. The access granted through SQL only applies to users accessing data through SQL, but you can use this security to give more selective access to certain users. In its current state, SQL supports restricting access to specific tables and schemas, as well as row and column level security.

Users accessing data through SQL may see different results than accessing data directly in OneLake depending on the compute permissions applied. To prevent this, ensure that a user's item permissions are configured to only grant them access to either the SQL Endpoint (using ReadData) or OneLake (using ReadAll or data access roles preview).

In the following example, a user is given read-only access to a lakehouse through item sharing. The user is granted SELECT permission on a table through the SQL analytics endpoint. When that user tries to read data through the OneLake APIs, they're denied access because they don't have sufficient permissions. The user can successfully read through SQL SELECT statements.

:::image type="content" source="media\get-started-security\sql.png" alt-text="Diagram showing a user accessing data through SQL but denied access when querying OneLake directly.":::

## OneLake Data access roles (preview)

OneLake data access roles is a new feature that enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant read access to specific folders within a Fabric item, and assign them to users or groups. The access permissions determine what folders users see when accessing the lake view of the data through the lakehouse UX, notebooks, or OneLake APIs.  

Fabric users in the Admin, Member, or Contributor roles can get started by creating OneLake data access roles to grant access to only specific folders in a lakehouse. To grant access to data in a lakehouse, add users to a data access role. Users that are not part of a data access role will see no data in that lakehouse. You can get started with creating data access roles [here.](/security/get-started-data-access-roles.md)

Learn more about the security model for access roles [here.](/security/data-access-control-model.md)

## Shortcut security

Shortcuts in Microsoft Fabric allow for simplified data management, but have some security considerations to note. For information on managing shortcut security see this [document](onelake-shortcuts.md#types-of-shortcuts).

For OneLake data access roles (preview), shortcuts receive special treatment depending on the shortcut type. The access to a OneLake shortcut is always controlled by the access roles on the target of the shortcut. This means that for a shortcut from LakehouseA to LakehouseB, the security of LakehouseB takes effect. Data access roles in LakehouseA cannot grant or edit the security of the shortcut to LakehouseB.

For external shortcuts to Amazon S3 or ADLS Gen2, the security is configured through data access roles in the lakehouse itself. A shortcut from LakehouseA to an S3 bucket can have data access roles configured in LakehouseA. It is important to note that only the root level of the shortcut can have security applied. Assigning access to sub-folders of the shortcut will result in role creation errors.

## Related content

- [OneLake data access roles (preview)](/security/get-started-data-access-roles.md)
- [Workspace roles](../get-started/roles-workspaces.md)
- [OneLake security](onelake-security.md)
- [OneLake file explorer](onelake-file-explorer.md)
- [Share items](../get-started/share-items.md)
