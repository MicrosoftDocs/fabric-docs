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

With OneLake as the single data lake for your entire organization, it's critical to implement a scalable and robust security model to keep sensitive data compartmentalized. Microsoft OneLake and Microsoft Fabric provide several out of the box capabilities to restrict data access to only those users that need it. This article provides an overview of how to best secure your data estate with the current capabilities in OneLake.

## OneLake structure

OneLake is a hierarchical data lake, like Azure Data Lake Storage (ADLS) Gen2 or the Windows file system. This structure allows you to set security at different levels in the hierarchy to govern access. OneLake offers more features and controls at certain levels in the folder hierarchy. These levels are:

- **Workspace**: a collaborative environment for creating and managing items.

- **Item**: a set of capabilities bundled together into a single component. A data item is a subtype of item that allows data to be stored within it using OneLake.

Items always live within workspaces and workspaces always live directly under the OneLake namespace. You can visualize this structure as follows:

:::image type="content" source="media\get-started-security\structure.png" alt-text="Diagram showing the hierarchical nature of OneLake as a folder structure. OneLake/Workspace/Item as an example." lightbox="media\get-started-security\structure.png":::

## Workspace permissions

Workspace roles in Microsoft Fabric allow you to grant permissions across all items in a workspace. Use workspace roles when the user needs frequent access to most of the items in that workspace.

To view the workspace, a user needs to be a member of a Fabric [workspace role](../get-started/roles-workspaces.md). This membership grants them the same permissions across all of the items in that workspace. Fabric has two types of roles: read-only and read-write. Viewer is the read-only role, which allows users to query data from SQL or Power BI reports but not create items or write data. Admin, Member, and Contributor are the read-write roles that can view data directly in OneLake, write data to OneLake, and create and manage items.

> [!NOTE]
> You can view the Warehouse item with read-write roles, but you can only write to warehouses using SQL queries.

You can simplify the management of Fabric workspace roles by assigning them to security groups. This method lets you control access by adding or removing members from the security group.

## Item permissions

Microsoft Fabric also supports managing permissions directly for items within a workspace. This method allows an item to be accessed directly without adding the user to a workspace role and granting them permissions to all items in that workspace. In addition, users in the Viewer role can have their permissions modified for a single item, granting them additional privileges.

With the [sharing](../get-started/share-items.md) feature, you can give a user direct access to an item. The user can only see that item in the workspace and isn't a member of any workspace roles. You can configure the share to grant the user connect-only permissions, full SQL access, or access to OneLake and Apache Spark. You can't use sharing to assign write access to users. You can manage sharing through a security group, which allows you to easily provide multiple users access to a specific item in a single action.

Another way to configure permissions is via an item's **Manage permissions** page. This page allows you to add or remove permissions for *ReadAll* access for a user or group. This approach is ideal if you have workspace viewers that need OneLake access. Alternatively, you can use this page to adjust permissions after sharing the item.

## Compute permissions

In addition to workspace permissions, data access can be given through the SQL compute engine in Microsoft Fabric. The access granted through SQL only applies to users accessing data through SQL, but you can use this security to give more selective access to certain users. In its current state, SQL supports restricting access to specific tables and schemas. Row-level security is planned for a future release.

In the following example, sharing provides a user with Viewer-only access to a lakehouse. We grant the user SELECT through the SQL analytics endpoint. When that user tries to read data through the OneLake APIs, they're denied access because they don't have sufficient permissions. The user can successfully read through SQL SELECT statements.

:::image type="content" source="media\get-started-security\sql.png" alt-text="Diagram showing a user accessing data through SQL but denied access when querying OneLake directly.":::

## Securing OneLake

Now that we understand the permissions available in Microsoft Fabric, let us look at an example of how to best structure data in OneLake. To start, we build a standard medallion architecture. In this approach, we typically want to have a limited set of users that have access to the Bronze and Silver layers, with broader access to the Gold layer. One way to structure that is as follows:

:::image type="content" source="media\get-started-security\medallion-architecture.png" alt-text="Diagram showing bronze and silver layers as one workspace each. The gold layer is composed of several different workspaces for each data domain." lightbox="media\get-started-security\medallion-architecture.png":::

Add the people responsible for managing Bronze and Silver to Member or Contributor roles so that they can update and manage all the data in those environments. Since those users need write access, this method is currently the only way you can accomplish this. Users that need access to specific data items within the Bronze and Silver layer can have the Viewer role and access data through SQL analytics endpoints. Data science teams that need OneLake access to the data in Bronze and Silver can either have those items shared directly or you can give them the Viewer role + ReadAll permission.

For the Gold layer, you can divide access across a number of smaller workspaces. You can scope each workspace to a business domain or set of users that would need to access that data. Within each workspace, give end users the Viewer role. Data engineers that build and manage the Gold layer can use the Contributor or Member role, which gives them Write access. If a specific environment needs more stringent access controls, specific warehouses or lakehouses can define object level security through their SQL analytics endpoints. This method allows for only some tables to be shared with users while others are hidden. Lastly, sharing and the Manage permissions options provide more granular controls over access to data in Spark and OneLake for more advanced users.

The previous example is only one of many ways that data can be structured in OneLake, however it provides recommendations for how to use the capabilities of Microsoft Fabric to secure data. In the next section, you can find some general guidance for applying security.

## General guidance

Use the following general rules as a guide when structuring data in OneLake to keep it secure.

- Write access: Users that need write access must be part of a workspace role that grants write access. This rule applies to all data items, so scope workspaces to a single team of data engineers.

- Lake access: To give users direct read access to data in OneLake, make them part of the Admin, Member, or Contributor workspace roles, or share the item with ReadAll access.

- General data access: Any user with Viewer permissions can access data through the warehouses, semantic models, or the SQL analytics endpoint for the Lakehouse.

- Object level security: To protect sensitive data, give users access to a warehouse or lakehouse SQL analytics endpoint through the Viewer role and use SQL DENY statements to restrict access to certain tables.

  > [!NOTE]
  > Viewers with ReadAll access can bypass any object-level security settings by accessing the data in OneLake directly. Ensure that you only grant ReadAll permissions to users who should see the data without any restrictions.

## Related content

- [Workspace roles](../get-started/roles-workspaces.md)
- [OneLake security](onelake-security.md)
- [OneLake file explorer](onelake-file-explorer.md)
- [Share items](../get-started/share-items.md)
