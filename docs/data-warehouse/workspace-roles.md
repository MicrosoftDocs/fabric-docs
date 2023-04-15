---
title: Workspace roles
description: Learn about the roles you can use to manage user access within a workspace.
author: kedodd
ms.author: kedodd
ms.reviewer: wiassaf
ms.date: 04/12/2023
ms.topic: conceptual
ms.search.form: Warehouse roles and permissions, Workspace roles and permissions
---

# Workspace roles in Fabric data warehousing

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

Assigning users to the various workspace roles, provides the following SQL capababilities for [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

| Workspace role   |  Description |
|---|---|
|Admin|Grants the user CONTROL access for each Warehouse within the workspace, providing them with full read/write permissions and the ability to manage granular user SQL permissions.<br/><br/>Allows the user to see workspace-scoped session, connection and request DMV information and KILL sessions.|
|Member|Grants the user CONTROL access for each Warehouse within the workspace, providing them with full read/write permissions and the ability to manage granular user SQL permissions.|
|Contributor|Grants the user CONTROL access for each Warehouse within the workspace, providing them with full read/write permissions and the ability to manage granular user SQL permissions.|
|Viewer|Grants the user SELECT permission for each Warehouse within the workspace, allowing them to read data from any table/view.|


## Viewer restrictions
The Viewer role is a more limited role in comparison with the other workspace roles.  In addition to less SQL permissions given to viewers, detailed above, there are additional actions they are restricted from performing.

| Feature | Limitation |
|---|---|
|Settings|Viewers have read-only access, so they cannot rename warehouse, add description, or change sensitivity label|
|Model view|iewers will only have read-only mode on the Model View|
|Run queries|Viewers do not have full DML/DDL capabilities unless granted specifically. Viewers can read data using SELECT statement in SQL query editor and use all tools in the toolbar in the Visual query editor. Viewers can also read data from Power BI Desktop and other SQL client tools|
|Analyze in Excel|Viewers do not have permission to Analyze in Excel|
|Manually update dataset|Viewers cannot manually update the default dataset to which the Warehouse is connected|
|New measure|Viewers do not have permission to create measures|
|Lineage view|Viewers do not have access to reading the lineage view chart|
|Share/Manage permissions|Viewers do not have permission to share warehouses with others|
|Create a report|Viewers do not have access to create content within the workspace and hence cannot build reports on top of the warehouse|
