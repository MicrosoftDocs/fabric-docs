---
title: Resolve dependency errors with Git integration
description: Learn how to resolve dependency errors when using Fabric's git integration tools.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Dan Weinstein
ms.topic: how-to
ms.date: 07/14/2023
---

# Resolve dependency errors

This article explains what dependency errors are and how to resolve them.

## What is a dependency?

If you connect a workspace that contains unsupported items to an empty git branch, the unsupported items aren't copied to the git branch and can't be accessed by it. You can perform any actions you want on the supported items, but the unsupported items are essentially unseen by git.

Here's a sample workspace connected to a git repository. The workspace contains a *.pbix* file and a report and dataset. The report is dependent on the dataset because the report refers to data from the dataset to render. The *.pbix* file refers to both the report and teh dataset and is therefore dependent on both of them. Reports and datasets are both supported ites, while *.pbix* files are not.

:::image type="content" source="./media/dependency-errors/workspace-with-dependencies.png" alt-text="Screenshot of workspace that has unsupported dependencies.":::

If you try to delete an item from a workspace, and a different, unsupported item in that workspace is dependent on it, you can't delete it.

For example, if you try to delete the dataset in the previous example,it would break the dependency on the *.pbix* file. At the same time, you can't just delete the *.pbix* file because unsupported items aren't in the git branch.

If you delete an item from a workspace and that items has commit or update a workspace that has an item with a dependency on another item that no longer exists in the workspace, you get a message that the action can't be completed.

:::image type="content" source="./media/dependency-errors/unable-to-complete-action.png" alt-text="Screenshot of dependency error.":::

Fort example, if you have a report in a workspace and that report depends on a dataset in the same workspace, you can't delete the dataset because then the report .

Try to switch to branch with unsupported artifact


**Solution**: 

1. Figure out which unsupported item has the dependency (in the above example, it would be the .pbix file).
1. Manually remove the dependency. The easiest way to do this is to delete the item. You don't need.

Trying to delete an item theats being used by an unsupported artifact 