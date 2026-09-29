---
title: Resolve dependency errors with Git integration
description: Learn how to resolve dependency errors when using Fabric's git integration tools, including identifying unsupported items, and removing dependencies.
ms.reviewer: Dan Weinstein
ms.topic: how-to
ms.date: 09/01/2026
#customer intent: As a developer, I want to know how to resolve dependency errors when using Fabric's git integration tools.
---

# Resolve dependency errors

This article explains what dependency errors are and how to resolve them.

## What is a dependency?

If you connect a workspace containing unsupported items to an empty git branch, the unsupported items aren't copied to the git branch and can't be accessed by it. You can perform any actions you want on the supported items, but the unsupported items are unseen by git.

For example, here's a sample workspace connected to a Git repository. The workspace contains a *.pbix* file, report, and semantic model. The report is dependent on the semantic model because the report refers to data from the semantic model to render. The *.pbix* file refers to both the report and the semantic model and is therefore dependent on both of them. Reports and semantic models are both supported items, while *.pbix* files aren't supported.

:::image type="content" source="./media/dependency-errors/workspace-with-dependencies.png" alt-text="Screenshot of workspace that has unsupported dependencies.":::

If you try to delete an item from a workspace, and a different, unsupported item in that workspace is dependent on it, you can't delete it.

For example, if you delete the semantic model in the previous example, it would break the dependency on the *.pbix* file and the report. If you then try to switch branches or update, you get a message that the action can't be completed.

:::image type="content" source="./media/dependency-errors/unable-to-complete-action.png" alt-text="Screenshot of dependency error. The UI says unable to complete action.":::

You can delete the report from git, but you can't delete the *.pbix* file because unsupported items aren't in the git branch.

Try to switch to branch with unsupported item

**Solution**:

1. Use the [lineage view](../../governance/lineage.md) to help you figure out which unsupported item has the dependency (in the previous example, it's the .pbix file).
1. Manually remove the dependency. The easiest way to do this is to delete the item.
1. Switch branches or update again.

## Resolve deployment plan errors when switching branches

When you attach a deployment plan while switching branches, Fabric validates the plan and its referenced items before the sync starts. The switch is blocked when:

- The selected plan no longer exists or you no longer have permission to read it.
- You don't have Git sync permission for a referenced item.
- The plan changes after you select it but before the sync starts.
- The selected plan version doesn't exist in the target branch.

The sync also fails if the plan or a referenced item becomes inaccessible while the operation is running.

To resolve the error:

1. Confirm that the selected plan exists and that you have permission to read it.
1. Confirm that the selected plan version exists in the target branch.
1. Confirm that you have Git sync permission for each referenced item.
1. Reopen the switch-branch dialog, select the current saved plan, and try again.

## Related content

[Maintain your git branches](./manage-branches.md)

[Attach a deployment plan](../deployment-plan/deployment-plan-attach.md)
