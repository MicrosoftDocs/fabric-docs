---
title: Data science roles and permissions
description: Understand the permissions required for machine learning models and experiments in [!INCLUDE [product-name](../includes/product-name.md)] and how to assign these permissions to users.
ms.author: scottpolly
author: s-polly
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: concept-article
ms.custom: 
ms.date: 02/26/2026
---

# Data science roles and permissions

This article describes machine learning model and experiment permissions in [!INCLUDE [product-name](../includes/product-name.md)] and how users acquire these permissions.



> [!NOTE]
> After you create a workspace in [!INCLUDE [product-name](../includes/product-name.md)], or if you have an admin role in a workspace, you can give others access to it by assigning them a different role.
> To learn more about workspaces and how to grant users access to your workspace, see [Workspaces](../fundamentals/workspaces.md) and [Giving users access to workspaces](../fundamentals/give-access-workspaces.md).

## Permissions for machine learning experiments

The following table describes the levels of permission that control access to machine learning experiments in [!INCLUDE [product-name](../includes/product-name.md)].

|Permission  |Description  |
|------------|-------------|
|Read        | Allows user to read machine learning experiments.<br> Allows user to view runs within machine learning experiments.<br> Allows user to view run metrics and parameters.<br> Allows user to view and download run files.|
|Write       | Allows user to create machine learning experiments.<br> Allows user to modify or delete machine learning experiments.<br> Allows user to add runs to machine learning experiments.<br> Allows user to save an experiment run as a model.|

## Permissions for machine learning models

The following table describes the levels of permission that control access to machine learning models in [!INCLUDE [product-name](../includes/product-name.md)].

|Permission  |Description  |
|------------|-------------|
|Read        | Allows user to read machine learning models.<br> Allows user to view versions within machine learning models.<br> Allows user to view model version metrics and parameters.<br> Allows user to view and download model version files.|
|Write       | Allows user to create machine learning models.<br> Allows user to modify or delete machine learning models.<br> Allows user to add model versions to machine learning models.|

## Permissions acquired by workspace role

A user's role in a workspace implicitly grants them permissions on the datasets in the workspace, as described in the following table.

|                                       |Admin  |Member  |Contributor  |Viewer |
|---------------------------------------|-------|--------|-------------|-------|
|**Read**                               |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::    |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::      |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::            |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::     |
|**Write**                              |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::      |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::      |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::            |:::image type="icon" source="./media/data-science-overview/no.png" border="false":::   |
|**Execute**                            |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::      |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::      |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::            |:::image type="icon" source="./media/data-science-overview/no.png" border="false":::   |
|**View execution output**              |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::      |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::      |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::            |:::image type="icon" source="./media/data-science-overview/yes.png" border="false":::   |

> [!NOTE]
> You can assign roles to individuals or to security groups, Microsoft 365 groups, and distribution lists. For more information about workspace roles in [!INCLUDE [product-name](../includes/product-name.md)], see [Roles in workspaces](../fundamentals/roles-workspaces.md).

## Item-level sharing

In addition to workspace roles, you can share individual machine learning models and experiments with specific users or groups. Sharing grants the recipient Read permission by default, with the option to grant additional permissions such as Edit, Share, or Execute. Use item-level sharing when you want to grant access to a specific item without assigning a workspace role.

For more information, see [Share items in [!INCLUDE [product-name](../includes/product-name.md)]](../fundamentals/share-items.md).

## Related content

- Learn about roles in workspaces: [Roles in [!INCLUDE [product-name](../includes/product-name.md)] workspaces](../fundamentals/roles-workspaces.md)
- Give users access to workspaces: [Granting access to users](../fundamentals/give-access-workspaces.md)
