---
title: Roles in workspaces
description: Learn about the different roles you can assign to workspace users to grant access to read, write, edit, and more.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: yicw, mesrivas
ms.topic: conceptual
ms.date: 04/24/2023
ms.custom: 
---

# Roles in workspaces

Workspace roles let you manage who can do what in a [!INCLUDE [product-name](../includes/product-name.md)] workspace. Workspace roles in [!INCLUDE [product-name](../includes/product-name.md)] extend the Power BI workspace roles by associating new [!INCLUDE [product-name](../includes/product-name.md)] capabilities such as data integration and data exploration with existing Power BI roles. For more information on Power BI roles, see [Roles in workspaces in Power BI](/power-bi/collaborate-share/service-new-workspaces).

You can either assign roles to individuals or to security groups, Microsoft 365 groups, and distribution lists. To grant access to a workspace, assign those user groups or individuals to one of the workspace roles: Admin, Member, Contributor, or Viewer. Here's how to [give users access to workspaces](give-access-workspaces.md).

To create a new workspace, see [Create a workspace](create-workspaces.md).

Everyone in a user group gets the role that you've assigned. If someone is in several user groups, they get the highest level of permission that's provided by the roles that they're assigned. If you nest user groups and assign a role to a group, all the contained users have permissions.

During private preview, users in workspace roles have the following [!INCLUDE [product-name](../includes/product-name.md)] capabilities, in addition to the existing Power BI capabilities associated with these roles.

## [!INCLUDE [product-name](../includes/product-name.md)] workspace roles

| Capability   | Admin | Member | Contributor | Viewer|
|---|---|---|---|---|
|View and read content of data pipelines, Spark notebooks, Spark job definitions, KQL databases, KQL query sets, and real-time dashboards in a workspace. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false":::|
|Read files and tables in a Lakehouse via TDS endpoint. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false":::|
|Read files and tables in a Lakehouse via Spark experiences. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | -|
|Write or delete data pipelines, Spark notebooks, Spark job definitions, Kusto query sets, real-time dashboards, and schema and data of KQL databases, Lakehouses, and data warehouses. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | -|
|Execute or cancel execution of Spark notebooks, and KQL query sets. <sup>1</sup> | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |   :::image type="icon" source="../media/yes-icon.svg" border="false":::|
|View execution output of data pipelines, Spark notebooks, Spark job definitions, and KQL query sets. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | -|

<sup>1</sup> Viewers can't execute Spark job definitions. 

## Next steps

- [Roles in workspaces in Power BI](/power-bi/collaborate-share/service-new-workspaces.md)
- [Create workspaces](create-workspaces.md)
- [Give users access to workspaces](give-access-workspaces.md)
