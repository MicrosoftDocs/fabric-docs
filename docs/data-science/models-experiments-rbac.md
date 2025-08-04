---
title: Machine learning permissions
description: Understand the permissions required for machine learning models and experiments in [!INCLUDE [product-name](../includes/product-name.md)] and how to assign these permissions to users.
ms.author: jburchel
author: jonburchel
ms.reviewer: midesa
reviewer: midesa
ms.topic: conceptual
ms.custom:
ms.date: 01/10/2025
---

# Data science roles and permissions

This article describes machine learning model and experiment permissions in [!INCLUDE [product-name](../includes/product-name.md)] and how these permissions are acquired by users.



> [!NOTE]
> After you create a workspace in [!INCLUDE [product-name](../includes/product-name.md)], or if you have an admin role in a workspace, you can give others access to it by assigning them a different role.
> To learn more about workspaces and how to grant users access to your workspace, review the articles [Workspaces](../fundamentals/workspaces.md) and [Giving users access to workspaces](../fundamentals/give-access-workspaces.md).

## Permissions for machine learning experiments

The table below describes the levels of permission that control access to machine learning experiments in [!INCLUDE [product-name](../includes/product-name.md)].

|Permission  |Description  |
|------------|-------------|
|Read        | Allows user to read machine learning experiments.<br> Allows user to view runs within machine learning experiments.<br> Allows user to view run metrics and parameters.<br> Allows user to view and download run files.|
|Write       | Allows user to create machine learning experiments.<br> Allows user to modify or delete machine learning experiments.<br> Allows user to add runs to machine learning experiments.<br> Allows user to save an experiment run as a model.|

## Permissions for machine learning models

The table below describes the levels of permission that control access to machine learning models in [!INCLUDE [product-name](../includes/product-name.md)].

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

> [!NOTE]
> You can either assign roles to individuals or to security groups, Microsoft 365 groups, and distribution lists. To learn more about workspace roles in [!INCLUDE [product-name](../includes/product-name.md)], see [Roles in workspaces](../fundamentals/roles-workspaces.md)

## Related content

- Learn about roles in workspaces: [Roles in [!INCLUDE [product-name](../includes/product-name.md)] workspaces](../fundamentals/roles-workspaces.md)
- Give users access to workspaces: [Granting access to users](../fundamentals/give-access-workspaces.md)
