---
title: "Tutorial: Clean up graph tutorial resources"
description: Learn how to clean up the resources created during the Graph in Microsoft Fabric tutorial.
ms.topic: tutorial
ms.date: 02/02/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Clean up graph tutorial resources
---

# Tutorial: Clean up graph tutorial resources

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

As a final step, you can optionally clean up the resources you created during the tutorial. Cleaning up resources can help you avoid unnecessary charges and keeps your workspace organized.

## Delete the graph model

To delete the graph model you created:

1. Go to your [Microsoft Fabric workspace](https://fabric.microsoft.com/).
1. Find the graph model you created (for example, "AdventureWorksGraph").
1. Select the **More options** (...) menu next to the graph model.
1. Select **Delete**.
1. Confirm the deletion.

## Delete the workspace

If you created a new workspace specifically for this tutorial and you no longer need it, you can delete the entire workspace:

1. Go to **Workspaces** from the left navigation pane.
1. Select the workspace you want to delete.
1. Select **Workspace settings** (gear icon).
1. Select **Remove this workspace** under **Delete workspace**.
1. Confirm the deletion.

> [!WARNING]
> Deleting a workspace permanently removes all items in the workspace, including lakehouses, graphs, reports, and other artifacts. You can't undo this action.

## Tutorial complete

Congratulations! You completed the Graph in Microsoft Fabric tutorial. You learned how to:

- Load sample data into a lakehouse
- Create a graph model
- Connect your graph to data in OneLake
- Add nodes to represent entities in your data
- Add edges to define relationships between nodes
- Query the graph using the visual query builder
- Save queries as querysets for reuse and sharing
- Query the graph using GQL in the code editor

## Related content

- [What is Graph in Microsoft Fabric?](overview.md)
- [GQL language guide](gql-language-guide.md)
- [GQL quick reference](gql-reference-abridged.md)
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
