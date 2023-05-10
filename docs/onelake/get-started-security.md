---
title: Get started with securing data in OneLake
description: Get started with securing data in OneLake with an overview of the concepts and capabilities.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.date: 05/03/2023
---

# Get started with securing data in OneLake

As a single data lake for your entire organization, it’s critical to implement a scalable and robust security model in OneLake to keep sensitive data compartmentalized. Microsoft OneLake and Microsoft Fabric provide several out of the box capabilities to keep data access restricted to only those users that need it. This article takes a look at how to best secure your data estate with the current capabilities in OneLake.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## OneLake structure

OneLake is a hierarchical data lake, similar to ADLS gen 2 or the Windows file system. This structure allows for security to be set at different levels in the hierarchy to govern access. OneLake offers more features and controls at certain levels in the folder hierarchy. These levels are:  
  
**Workspace**: a collaborative environment that is used to create and manage items.  
  
**Item**: a set of capabilities bundled together into single component. A data item is a subtype of item that allows for data to be stored within it using OneLake.
Items always live within workspaces and workspaces always live directly under the OneLake namespace. This structure can be visualized as follows:

:::image type="content" source="media\get-started-security\structure.png" alt-text="Diagram showing the hierarchical nature of OneLake as a folder structure. OneLake/Workspace/Item as an example." lightbox="media\get-started-security\structure.png":::

## Workspace permissions

In the public preview release of Microsoft Fabric, permissions can only be configured at the workspace level.

To grant a user access to an item, users need permissions from one of the Fabric [workspace roles.](/docs/get-started/roles-workspaces.md). At a minimum, users need Read access on an item to see and connect to that item, which is provided by the Viewer role. Users in the Viewer role can also connect to and read data using SQL endpoints for the Warehouse and Lakehouse items or read data through Power BI datasets.

Access directly to OneLake or to write data is provided through the other roles. Admin, member, and contributor all provide access to read data directly in OneLake through Spark or APIs, and write data to those sources. The Warehouse item is read-only through the lake interface, so even Admins are not able to write data to a Warehouse through APIs, but they can write data through SQL. 

## Compute permissions
In addition to the workspace permissions, data access can be given through the SQL compute engine in Microsoft Fabric. The access granted through SQL only applies to users accessing data through SQL, but this security can be used to give more selective access to certain users. In its current state, SQL supports restricting access to specific tables and schemas with row level security planned in a future release.

In the below example, a user is shared a Lakehouse but with only Viewer access. They are then granted SELECT through the SQL endpoint. When that user tries to write data through the OneLake APIs the access gets denied since they don’t have sufficient permissions, but reads made through SQL SELECT statements would succeed.

:::image type="content" source="media\get-started-security\sql.png" alt-text="Diagram showing a user accessing data through SQL but get denied access when querying OneLake directly." lightbox="media\get-started-security\sql.png":::

## Securing OneLake
Now that we understand the permissions available in Microsoft Fabric, let us look at an example of how to best structure data in OneLake. To start, we build a standard medallion architecture. In this approach, we typically want to have a limited set of users that have access to the Bronze and Silver layers, with broader access to the Gold layer. One way to structure that is as follows:

:::image type="content" source="media\get-started-security\medallion-architecture.png" alt-text="Diagram showing bronze and silver layers as one workspace each. The gold layer is broken into several different workspaces for each data domain." lightbox="media\get-started-security\medallion-architecture.png":::

The people responsible for managing Bronze and Silver can be added to Member or Contributor roles so that they can update and manage all the data in those environments. Since those users need write access this is currently the only method to accomplish this. Users that need access to specific data items within the Bronze and Silver layer can be given the Viewer role and access data through SQL endpoints.

For the Gold layer, access can be divided up across a number of smaller workspaces. Each workspace can be scoped to a business domain or set of users that would need to access that data. Within each workspace, end users can be given the Viewer role. Data engineers that build and manage the Gold layer can utilize the Contributor or Member role which gives them Write access. If a specific environment needs more stringent access controls, specific Warehouses or Lakehouses can define object level security through their SQL endpoints. This allows for only some tables to be shared with users while others are hidden.

The example above is only one of many ways that data can be structured in OneLake, however it provides recommendations for how to leverage the capabilities of Microsoft Fabric to secure data. In the next section we will look at some general guidance for applying security.

## General guidance

The following general rules can be used to guide structuring data in OneLake to keep it secure. 

Write access: Users that need write access must be part of a workspace role that grants write access. This applies to all data items, so scope workspaces to a single team of data engineers.

Lake access: To give users direct read access to data in OneLake they need to be part of the Admin, Member, or Contributor workspace roles. 

General data access: Any user with Viewer permissions can access data through the SQL endpoint for warehouses, lakehouses, and datasets.

Object level security: To protect sensitive data, give users access to a Warehouse or Lakehouse SQL endpoint through the Viewer role and use SQL DENY statements to restrict access to certain tables.

## Next steps

- [Workspace roles](/docs/get-started/roles-workspaces.md)  
- [OneLake security](onelake-security.md)
- [OneLake file explorer](onelake-file-explorer.md)
