---
title: The Microsoft Fabric variable library
description: Understand how variable libraries are used in the Fabric Application lifecycle management (ALM) tool.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 08/15/2024
ms.search.form: Introduction to Deployment pipelines, Manage access in Deployment pipelines, Deployment pipelines operations
#customer intent: As a developer, I want to learn how to use the variable library item in the Microsoft Fabric Application lifecycle management (ALM) tool, so that I can manage my content lifecycle.
---

# Variable library concepts

This article describes what you need to know to use the Microsoft Fabric [variable library](./variable-library-overview.md) item in your workspace. The variable library is a container that holds values for different variables that can be consumed by other items in the workspace. It can hold several values for each variable, is fully supported in CI/CD, and can be automated.

## Prerequisites

To use the variable library, you need the following:

* A [workspace](../../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)

## Variable library features

To simplify deployment to have multiple environments with different configurations, variable libraries provide the following features:

* **Unified and centralized experience for all workloads**: Workloads with variable libraries provide a unified way to store and manage parameterization of specific items or functionalities in a scalable way. In addition, it provides a similar way to manage connections between items in the workspace, which helps users gain visibility and control of connections.

* **Scalable development** of workspaces and items across CI/CD stages: User-defined variables can be applied to any workspace configuration and resource.

* **Seamless integration** into familiar CI/CD tools.

  * Manage Variable library as code, for easy scale and automation through git and different release pipelines.  

  * The Variable library item is deployable in a release pipeline.

<!--- * Ability to manage internal connections. --->

## Variable library structure

The variable library is a Fabric item that allows you to define and manage workspace items in different stages of your pipeline. It contains a list of variables that can be used by other items in the workspace.Other items in the workspace can refer to and use variables in the library.

The following table lists the names of different variables stored in the variable library along with their type, default value, and values at different stages of the pipeline:

| Variable name | Type | Default value | Test stage value| Prod stage value |
| --- | --- | --- | --- | --- |
| SMdatasource-server | string | PBIAnalyticsDM-pbiAn… | <default> | PBIAnalyticsP |
|SparkRuntimeVersion | string | 1.1 (Spark 3.3, Delta 2.2) | 1.1.3 (Spark 3.2, Delta 2.1) | 1.2 (Spark 4.1, Delta 3.2) |
| mylakehouse | string | MainLakehouse | TestLakehouse | <default> |
| S3connection | string | connection1 | connection2 | connection3 |



Is deployed to all stages. Only difference between stages is active value set. Fir each stage define which value set to use (ed. in the previous table, define active value set at default, Test stage or Prod stage).

## Supported items

The following items are supported in the variable library:

- Lakehouse
- Data pipeline
- Notebook

## Naming conventions

When you create a variable library, follow these naming conventions:

The name of a variable library is a regular expression that matches the following pattern:

* The item name isn't empty.

* It doesn't have leading or trailing spaces.

* It starts with a letter.

* It can include letters, numbers, underscores, hyphens, and spaces.

* It doesn't exceed 256 characters in length.

The name of a variable in the library is a regular expression that matches the following pattern:

* The variable name is not empty.

* It doesn't have leading or trailing spaces.

* It starts with a letter or an underscore.

* It can include letters, numbers, underscores, and hyphens.

* It doesn't exceed 256 characters in length.

Neither the item or variable name is case sensitive.



## Permissions

Permissions are aligned with the [fabric permission model]((../../get-started/roles-workspaces.md#microsoft-fabric-workspace-roles)):

* Workspace permissions

  * Viewer permissions: Someone with viewer permissions can Add/Edit/Delete, but not save their changes. Viewer can also see available variables for reference on a consumer item with all their details and referred variables values.

  * Contributor/Member/Admin permissions: In general - CRUD permissions. Details as documented [here](../../get-started/roles-workspaces.md#microsoft-fabric-workspace-roles).

* Shared permissions

  * Permissions can be shared with the users, either via a link or granted directly.

### Variable permissions

There is no permission management in an item level or a variable level. The user can inherit permissions in one of the following ways:

* *Workspace permissions*: Any user with a workspace role of contributor and above, can create, edit or delete variables, value-sets and their values. The user can also change the active value-set of a variable library item.
* *Shared permissions*: When the item is shared with a user, it comes with defined permissions. The user can perform actions per the permission they got, regardless of the permission they have or do not have on the consumer items.

## Related content

- [End to end lifecycle management tutorial](./cicd-tutorial.md)
- [Learn to use the variable library](./get-started-with-variable-libraries.md)