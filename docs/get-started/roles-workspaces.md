---
title: Roles in workspaces in Microsoft Fabric
description: Learn about the different roles you can assign to workspace users to grant access to read, write, edit, and more.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: yicw, mesrivas
ms.topic: conceptual
ms.date: 05/24/2023
ms.custom:
  - build-2023
  - ignite-2023
---

# Roles in workspaces in Microsoft Fabric

Workspace roles let you manage who can do what in a [!INCLUDE [product-name](../includes/product-name.md)] workspace. [!INCLUDE [product-name](../includes/product-name.md)] workspaces sit on top of OneLake and divide the data lake into separate containers that can be secured independently. Workspace roles in [!INCLUDE [product-name](../includes/product-name.md)] extend the Power BI workspace roles by associating new [!INCLUDE [product-name](../includes/product-name.md)] capabilities such as data integration and data exploration with existing workspace roles. For more information on Power BI roles, see [Roles in workspaces in Power BI](/power-bi/collaborate-share/service-new-workspaces).

You can either assign roles to individuals or to security groups, Microsoft 365 groups, and distribution lists. To grant access to a workspace, assign those user groups or individuals to one of the workspace roles: Admin, Member, Contributor, or Viewer. Here's how to [give users access to workspaces](give-access-workspaces.md).

To create a new workspace, see [Create a workspace](create-workspaces.md).

Everyone in a user group gets the role that you've assigned. If someone is in several user groups, they get the highest level of permission that's provided by the roles that they're assigned. If you nest user groups and assign a role to a group, all the contained users have permissions.

Users in workspace roles have the following [!INCLUDE [product-name](../includes/product-name.md)] capabilities, in addition to the existing Power BI capabilities associated with these roles.

## [!INCLUDE [product-name](../includes/product-name.md)] workspace roles

| Capability   | Admin | Member | Contributor | Viewer|
|---|---|---|---|---|
| Update and delete the workspace.  | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |   |   |   | 
| Add or remove people, including other admins.  |  :::image type="icon" source="../media/yes-icon.svg" border="false"::: |   |   |   |
| Add members or others with lower permissions.  |  :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false":::  |   |   |
| Allow others to reshare items.<sup>1</sup> |  :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false":::  |   |   |
|View and read content of data pipelines, notebooks, Spark job definitions, ML models and experiments, and Event streams.  | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
|View and read content of KQL databases, KQL query-sets, and real-time dashboards.  | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
|Connect to SQL analytics endpoint of Lakehouse or the Warehouse | :::image type="icon" source="../media/yes-icon.svg" border="false":::|   :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
|Read Lakehouse and Data warehouse data and shortcuts<sup>2</sup> with T-SQL through TDS endpoint. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | -<sup>3</sup> |
|Read Lakehouse and Data warehouse data and shortcuts<sup>2</sup> through OneLake APIs and Spark. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | -  |
|Read Lakehouse data through Lakehouse explorer.  | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | -  |
|Write or delete data pipelines, notebooks, Spark job definitions, ML models and experiments, and Event streams.  | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | -  |
|Write or delete KQL query-sets, real-time dashboards, and schema and data of KQL databases, Lakehouses, data warehouses, and shortcuts.  | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | -  |
|Execute or cancel execution of notebooks, Spark job definitions, ML models and experiments.  | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | -  |
|Execute or cancel execution of data pipelines.  | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
|View execution output of data pipelines, notebooks, ML models and experiments.  | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Schedule data refreshes via the on-premises gateway.<sup>4</sup> | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |  |
| Modify gateway connection settings.<sup>4</sup> | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |  |

<sup>1</sup> Contributors and Viewers can also share items in a workspace, if they have Reshare permissions.

<sup>2</sup> Additional permissions are needed to read data from shortcut destination. Learn more about [shortcut security model.](../onelake/onelake-shortcuts.md?#types-of-shortcuts)

<sup>3</sup> Admins, Members, and Contributors can grant viewers granular SQL permissions to query the SQL analytics endpoint of the Lakehouse and the Warehouse via TDS endpoints for SQL connections.

<sup>4</sup> Keep in mind that you also need permissions on the gateway. Those permissions are managed elsewhere, independent of workspace roles and permissions.

## Related content

- [Roles in workspaces in Power BI](/power-bi/collaborate-share/service-new-workspaces)
- [Create workspaces](create-workspaces.md)
- [Give users access to workspaces](give-access-workspaces.md)
- [Fabric and OneLake security](../onelake/security/fabric-and-onelake-security.md)
- [OneLake shortcuts](../onelake/onelake-shortcuts.md?#types-of-shortcuts)
- [Data warehouse security](../data-warehouse/workspace-roles.md)
- [Data engineering security](../data-engineering/workspace-roles-lakehouse.md)
- [Data science roles and permissions](../data-science/models-experiments-rbac.md)
