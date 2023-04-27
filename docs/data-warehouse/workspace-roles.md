---
title: Workspace roles
description: Learn about the roles you can use to manage user access within a workspace.
author: kedodd
ms.author: kedodd
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: conceptual
ms.search.form: Warehouse roles and permissions, Workspace roles and permissions
---

# Workspace roles in Fabric data warehousing

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article details the permissions that workspace roles provide in [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. For instructions on assigning workspace roles, see [Give Workspace Access](../get-started/give-access-workspaces.md).

Assigning users to the various workspace roles provides the following capabilities:

| Workspace role   |  Description |
|---|---|
|**Admin**|Grants the user CONTROL access for each Warehouse within the workspace, providing them with full read/write permissions and the ability to manage granular user SQL permissions.<br/><br/>Allows the user to see workspace-scoped session, connection and request [DMV information](monitor-using-dmv.md) and [KILL](/sql/t-sql/language-elements/kill-transact-sql?view=fabric&preserve-view=true) sessions.|
|**Member**|Grants the user CONTROL access for each Warehouse within the workspace, providing them with full read/write permissions and the ability to manage granular user SQL permissions.|
|**Contributor**|Grants the user CONTROL access for each Warehouse within the workspace, providing them with full read/write permissions and the ability to manage granular user SQL permissions.|
|**Viewer**|Grants the user SELECT permission for each Warehouse within the workspace, allowing them to read data from any table/view. For more information, see [Viewer restrictions](#viewer-restrictions).|

## Viewer restrictions
The Viewer role is a more limited role in comparison with the other workspace roles.  In addition to fewer SQL permissions given to viewers, there are more actions they are restricted from performing.

| Feature | Limitation |
|---|---|
|**Settings**|Viewers have read-only access, so they cannot rename warehouse, add description, or change sensitivity label.|
|**Model view**|Viewers have read-only mode on the Model view.|
|**Run queries**|Viewers do not have full DML/DDL capabilities unless granted specifically. Viewers can read data using SELECT statement in SQL query editor and use all tools in the toolbar in the Visual query editor. Viewers can also read data from Power BI Desktop and other SQL client tools.|
|**Analyze in Excel**|Viewers do not have permission to Analyze in Excel.|
|**Manually update dataset**|Viewers cannot manually update the default dataset to which the Warehouse is connected.|
|**New measure**|Viewers do not have permission to create measures.|
|**Lineage view**|Viewers do not have access to reading the lineage view chart.|
|**Share/Manage permissions**|Viewers do not have permission to share warehouses with others.|
|**Create a report**|Viewers do not have access to create content within the workspace and hence cannot build reports on top of the warehouse.|

## Next steps

- [Security for data warehousing in Microsoft Fabric](security.md)
- [SQL granular permissions](sql-granular-permissions.md)
- [Manage item permissions in Microsoft Fabric](item-permissions.md)
- [Connectivity](connectivity.md)
- [Monitoring connections, sessions, and requests using DMVs](monitor-using-dmv.md)
