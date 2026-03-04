---
title: "Tutorial: Create Node and Edge Types from One Mapping Table"
description: Learn how to create multiple node and edge types from a single mapping table in your Fabric Graph model in Microsoft Fabric.
ms.topic: tutorial
ms.date: 03/03/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Add nodes and edges from one mapping table
---

# Tutorial: Add multiple node and edge types from one mapping table

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This tutorial explains the more advanced situation where you need to use one mapping table to create multiple node types.

## Adventure Works Employee table

In the Adventure Works data model, the **Employees** data source table has the following columns:

- `EmployeeID_K`
- `ManagerID`
- `EmployeeFullName`
- `JobTitle`
- `OrganizationLevel`
- `MaritalStatus`
- `Gender`
- `Territory`
- `Country`
- `Group`

You can use the **Employees** table to create an `Employee` node type and a `Country` node type, which are connected by a `lives_in` edge type.

## Create a `Country` node type

Create a node type named `Country` using the **Employees** table by following the steps in [Add node types to your graph](tutorial-model-nodes.md). Retain only the **`Country`** property and remove all other properties.

## Modify the `Employee` node type as needed

If the `Employee` node type doesn't need the `Territory`, `Country`, and `Group` properties for your queries or analyses, remove these properties. 

> [!TIP]
> Excessive properties make your graph harder to maintain and use. Generally, for all node types, remove properties that are:
>
> - Not required for the uniqueness of the nodes
> - Not necessary for your queries or analyses
>
> For the `Country` node type, since it's created from the **Employees** table, remove properties like `EmployeeID_K`, `ManagerID`, `EmployeeFullName`, `JobTitle`, `OrganizationLevel`, `MaritalStatus`, and `Gender`, at a minimum.

## Create a `lives_in` edge

Create an edge type named `lives_in` using the **Employees** table by following the steps in [Add edge types to your graph](tutorial-model-edges.md). Configure the edge schema like so:

- **Label**: `lives_in`
- **Mapping table**: `adventureworks_employees`
- **Source node**: `Employee`
- **Mapping table column to be linked to source node key**: `EmployeeID_K`
- **Target node**: `Country`
- **Mapping table column to be linked to target node key**: `Country`

## Load the graph

After configuring all node types and edge types, load the graph:

- Select **Save** to verify the graph model, load data from OneLake, construct the graph, and make it ready for querying. Be patient, as this process might take some time depending on the size of your data.

## Next step

> [!div class="nextstepaction"]
> [Query the graph with the query builder](tutorial-query-builder.md)
