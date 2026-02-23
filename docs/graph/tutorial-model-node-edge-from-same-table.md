---
title: "Tutorial: Create multiple node and edge types from one mapping table"
description: Learn how to add nodes and edges from one mapping table.
ms.topic: tutorial
ms.date: 02/13/2026
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

If it's not necessary for the `Employee` node type to have the `Territory`, `Country`, and `Group` properties during your queries or analyses, you may remove these properties. 

> [!TIP]
> Excessive properties make your graph harder to maintain and use. Generally, for all node types you should remove properties that are
> - Not required for the uniqueness of the nodes
> - Not necessary during your queries or analyses
>
> In the case of the `Country` node type, since it's created from the **Employees** table, you should remove properties like `EmployeeID_K`, `ManagerID`, `EmployeeFullName`, `JobTitle`, `OrganizationLevel`, `MaritalStatus`, and `Gender`, at a minimum.

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
