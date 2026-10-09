---
title: Attach a deployment plan in Microsoft Fabric
description: Learn where you can attach a deployment plan, which plan applies to an operation, and how to attach one with the REST APIs.
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 09/24/2026
ms.custom:
  - deployment_plan
ms.search.form: Deployment plan
ai-usage: ai-assisted
#customer intent: As a Fabric developer, I want to attach a deployment plan to an operation, so that my items deploy in the order the plan defines.
---

# Attach a deployment plan (preview)

Attach a deployment plan when you start a supported deployment operation. Attachment is optional and applies only to that operation. Without a plan, the operation uses its standard behavior.

[!INCLUDE [feature-preview-note](~/includes/feature-preview-note.md)]

## Where you can attach a plan

You can attach a plan on the following surfaces:

| Operation | Guidance |
|---|---|
| Branch out to a new workspace | [Select a plan during branch-out](../git-integration/branched-workspace.md#branch-out-with-a-deployment-plan). |
| Initial synchronization of a Git connection | Select a plan when you start the operation. |
| Update from Git or switch branches | Select a plan when you start the operation. |
| Deploy between deployment pipeline stages | [Select a plan when you deploy content](../deployment-pipelines/deploy-content.md#deploy-with-a-deployment-plan-preview). |
| API automation | [Add a plan to an existing automated deployment](deployment-plan-automation.md). |


:::image type="content" source="./media/deployment-plan-attach/attach-plan-git-1.png" alt-text="Screenshot of the Git connection menu with Connect and sync with deployment plan highlighted." lightbox="./media/deployment-plan-attach/attach-plan-git-1.png":::

## Which plan an operation uses

A deployment plan is a workspace item, so the source and target can contain different plans. The operation determines which plan is available.

| Operation | Available plan | Result |
|---|---|---|
| Git integration | A plan in the workspace or the incoming Git content | The selected plan applies to the operation. |
| Deployment pipeline | The existing target-stage plan or the incoming source-stage plan | You choose which plan to use. If you choose the incoming plan, it's selected in the item list and deploys to the target stage with the other selected items. |
| API automation | The plan referenced by the `deploymentPlan` object in the request | Git integration, deployment pipelines, and the Bulk Import API accept different reference types. See [Automate deployments with a deployment plan](deployment-plan-automation.md). |

For more information about how incoming Git content replaces the workspace state, see [Switch branches](../git-integration/branched-workspace.md).

:::image type="content" source="./media/deployment-plan-attach/attach-plan-pipeline-1.png" alt-text="Screenshot of the deployment pipeline plan picker with DeploymentPlan_1 available from the source stage and its related items listed for deployment." lightbox="./media/deployment-plan-attach/attach-plan-pipeline-1.png":::

## Attach a plan with the REST APIs

Attaching a plan through automation doesn't need a separate call. Add the optional `deploymentPlan` object to the existing request. For supported APIs, reference types, permissions, and request examples, see [Automate deployments with a deployment plan](deployment-plan-automation.md).

## Considerations and limitations

For attachment constraints, see [Deployment plan considerations and limitations](deployment-plan-overview.md#considerations-and-limitations).

## Related content

* [What is a deployment plan?](deployment-plan-overview.md)
* [Create a deployment plan](how-to-create-deployment-plan.md)
* [Deployment plan actions](deployment-plan-actions.md)
* [Automate deployments with a deployment plan](deployment-plan-automation.md)
* [Troubleshoot deployment plans](deployment-plan-troubleshoot.md)
* [Understand dependency binding in cross-workspace deployment](../cross-workspace-dependency-binding.md)
