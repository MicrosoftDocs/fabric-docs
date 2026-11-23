---
title: Troubleshoot deployment plans in Microsoft Fabric
description: Find the cause of common Microsoft Fabric deployment plan problems, including validation errors that block saving, warnings that don't, and failures during a deployment.
ms.reviewer: NimrodShalit
ms.topic: troubleshooting
ms.date: 09/24/2026
ms.custom:
  - deployment_plan
ms.search.form: Deployment plan
ai-usage: ai-assisted
#customer intent: As a Fabric developer, I want to resolve errors in my deployment plan, so that my deployments complete in the order I intend.
---

# Troubleshoot deployment plans (preview)

Deployment plan problems fall into two groups: problems in the plan itself, which you see while you author it, and problems that appear during a deployment that has a plan attached.

## Problems while you author a plan

The canvas validates a plan as you edit it. Some problems block you from saving, and others only warn you.

### The plan can't be saved

These problems mean the plan isn't internally consistent. They don't depend on any workspace, so fixing them is always within your control.

The canvas prevents most of them as you edit, by not letting you build an invalid plan in the first place. The rules are enforced when the plan is saved, not by the canvas, so they apply to every path a plan can take into a workspace. You're most likely to meet them when a plan arrives some other way:

- Through the deployment plan REST API.
- Through a pull from Git, where the plan was edited in the repository.
- Through an external tool or a CI/CD pipeline that writes the plan definition directly.

In those cases the save is rejected and the error identifies the element that caused it.

| Problem | Cause | Resolution |
|---|---|---|
| The plan contains a cycle | Two or more deployment groups depend on each other, directly or through a chain. A cycle also counts when the chain runs through the items themselves, not just through explicit dependencies | Remove one of the dependencies so the order flows in one direction |
| Duplicate name | Two groups share a name, or two actions within the same group share a name | Rename one of them. Names are compared case-insensitively |
| Dependency doesn't exist | A dependency names a group or action that isn't in the plan | Correct the name, or add the missing group or action |
| Self-dependency | A group or action depends on itself, or a pre-deploy action targets its own group's item | Remove the dependency |
| A pre-deploy action depends on a post-deploy action | Pre-deploy actions run before the item deploys and post-deploy actions run after, so this order can't be satisfied | Move the action, or remove the dependency |
| Invalid identifier | An item reference isn't a valid, non-empty GUID | Correct the reference |
| An item appears in more than one group | Each item can belong to only one group in a plan | Remove the duplicate |
| A limit is exceeded | The plan is larger than the schema allows | Split the work across more than one plan. See [Considerations and limitations](deployment-plan-overview.md#considerations-and-limitations) for the size limits |

In the canvas, save stays disabled until every one of these is resolved, and the element that causes each error is marked.

### The plan can be saved, but shows warnings

These problems depend on the workspace the plan points at, not on the plan itself. You can save the plan and fix them later, which lets you finish authoring before every item exists in the target workspace.

| Warning | Cause | Resolution |
|---|---|---|
| Item not found | The plan references an item that doesn't exist in the target workspace | Deploy the item, or remove the reference from the plan |
| Item can't be invoked | The referenced item exists but can't run, because it was deleted, disabled, or is a different type than the action expects | Restore the item, or point the action at the correct item |
| Unknown action type | An action references an action type that isn't supported | Change the action to one of the [supported action types](deployment-plan-actions.md#item-types-you-can-run-as-an-action) |
| No permission on a referenced item | You don't have permission on an item the plan references | You only reach this warning for items in another workspace. Request access to the item, or remove the reference |

> [!NOTE]
> A warning doesn't stop you from saving a plan, and it doesn't stop a plan from being attached. It's a signal that the plan isn't ready for the workspace you're pointing at yet.

## Problems during a deployment

Once a plan is attached, the deployment engine uses it to decide the order of the deployment and which actions run. Failures at this stage are reported on the deployment, not on the plan.

### The deployment stopped partway through

When an action fails, the deployment stops. Items that already deployed stay in the target workspace, and the items that come later in the order don't deploy.

A failed deployment doesn't roll back completed item deployments or changes made by actions. Before retrying, identify what completed and fix the cause of the failure. Check whether repeating completed actions could duplicate data or cause other unintended changes. Follow the recovery procedure for the deployment tool you used.

### An action failed

An action is a normal Fabric item run, so its failure details live with the item, not with the plan. The deployment reports an error that identifies the action that failed. To find out why it failed, open that item and review its run history.

### An action failed because the workspace isn't configured

A deployment carries item definitions. It doesn't carry workspace settings, and neither does a plan. When you deploy into a workspace for the first time, such as a new branch-out workspace or a pipeline stage that was just created, the target workspace starts with default settings.

This matters more with a plan than without one, because a plan's actions run against the target workspace immediately after the items deploy. The items themselves deploy correctly, and then the first action fails.

| Symptom | Cause | Resolution |
|---|---|---|
| An action can't read or write data, or authentication fails | The target workspace has no workspace identity, so items that rely on it have no identity to authenticate with | Create the workspace identity in the target workspace, then grant it access to the data sources |
| A Spark session doesn't start, or starts with unexpected configuration | Spark settings, custom pools, and the default environment are workspace settings and aren't deployed | Configure the Spark settings on the target workspace to match the source before you deploy |
| An action fails to reach a data source that works in the source workspace | Connections and gateway bindings are workspace-level and aren't deployed | Recreate the connections in the target workspace |

Configure these settings on the target workspace before the first deployment. Once configured, they persist, so later deployments into the same workspace aren't affected.

References between items are a separate matter. Some rebind automatically when an item deploys and some don't, which changes what an action finds when it runs. For more information, see [Understand dependency binding in cross-workspace deployment](../cross-workspace-dependency-binding.md).

### The next action started too early

An action completes when the item's run ends. It doesn't wait for downstream services to catch up, so data that an action produces might not be queryable when the next action begins.

If a later action depends on that data, make sure it explicitly depends on the action that produces the data. If the dependency already exists, add a readiness check to the producing action or move the dependent work into the same action.

### A Dataflow Gen2 action failed on the second occurrence

The same Dataflow Gen2 item can't appear twice in one plan, because its refresh job can't run more than once at a time. The canvas warns you when you add the second occurrence, and the second occurrence is blocked when the deployment runs.

Remove the duplicate action.

### A user data function's output is incomplete

Output larger than 512 KB is truncated. The action still succeeds, so the deployment continues. If you need the full output, write it to storage from inside the function instead of returning it.

## The plan isn't in the picker

The picker on each attach surface lists the plans you have access to. If a plan is missing:

- Confirm that the deployment plan item type is enabled. See [Create a deployment plan](how-to-create-deployment-plan.md).
- Confirm that you have at least the Contributor role on the workspace that holds the plan. See [Deployment plan permissions](deployment-plan-permissions.md).
- Confirm that the plan is saved.

## Related content

- [What is a deployment plan?](deployment-plan-overview.md)
- [Create a deployment plan](how-to-create-deployment-plan.md)
- [Deployment plan permissions](deployment-plan-permissions.md)
