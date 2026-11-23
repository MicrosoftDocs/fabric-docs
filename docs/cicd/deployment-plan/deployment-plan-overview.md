---
title: What is a deployment plan in Microsoft Fabric?
description: Learn what a Microsoft Fabric deployment plan is, what it controls during a deployment operation, and where you can attach one.
ms.reviewer: NimrodShalit
ms.topic: overview
ms.date: 09/24/2026
ms.custom:
  - deployment_plan
ms.search.form: Deployment plan
ai-usage: ai-assisted
#customer intent: As a Fabric developer, I want to understand what a deployment plan is and where it applies, so that I can decide whether to use one in my CI/CD process.
---

# What is a deployment plan in Microsoft Fabric? (preview)

A **Microsoft Fabric deployment plan** is a workspace item that adds explicit item order and automated actions to a deployment operation. Use a plan to deploy items in a specific sequence. You can also use it to run a notebook, data pipeline, or another supported item before or after an item deploys.

A deployment plan works with these deployment tools:

- Git integration
- Deployment pipelines
- Supported REST APIs

In this article, *deployment tool* refers to any of these supported tools. You don't run a plan by itself. You attach it when you start an operation with a deployment tool.

[!INCLUDE [feature-preview-note](~/includes/feature-preview-note.md)]

## When to use a deployment plan

Use a deployment plan when:

| Scenario | How a plan helps |
|---|---|
| Items must deploy in an order that Fabric lineage doesn't represent. | The plan defines explicit dependencies between deployment groups. |
| Work must run before or after an item deploys. | The plan runs supported items as pre-deploy or post-deploy actions. |
| The operation needs both explicit order and Fabric item dependencies. | Fabric combines the plan with lineage when it determines the item order. |

You don't need a deployment plan when the deployment tool's standard order is sufficient and no actions are required.

## Deployment plan components

A deployment plan contains the following components:

| Component | Purpose |
|---|---|
| Deployment group | One item to deploy and its pre-deploy or post-deploy actions. |
| Step | Deploys the item in a deployment group. |
| Action | A run of a supported item before or after the group's item deploys. |

For supported action types and action behavior, see [Deployment plan actions](deployment-plan-actions.md).

## How a deployment plan works

Each deployment operation combines three inputs:

- **Selected items**: The items selected for the operation.
- **Deployment plan**: The explicit order and actions associated with those items.
- **Fabric lineage**: The dependencies Fabric detects between items.

<!-- Diagram: How selected items, a deployment plan, and Fabric lineage determine item order and actions. -->
:::image type="content" source="media/deployment-plan-overview/deployment-plan-inputs.png" alt-text="Diagram showing selected items, a deployment plan, and Fabric lineage combining to determine item order and actions for a target workspace." lightbox="media/deployment-plan-overview/deployment-plan-inputs.png":::

### Determine the deployment scope

The deployment tool determines the source, target, and items in the operation. Attaching a plan doesn't replace that selection. Selected items that aren't in a deployment group still deploy by using the tool's standard behavior.

Attaching a plan doesn't automatically select the items that it references. On a selective deployment surface, select the items that you want to deploy, and make sure that the items required by the plan's actions are available in the target workspace when those actions run.

A deployment plan controls item deployment and actions. It doesn't deploy workspace-level configuration such as workspace identities, connections, gateway bindings, or Spark settings. Configure the target workspace before an action depends on those settings.

### Resolve the deployment order

Fabric combines explicit dependencies between deployment groups with dependencies detected from lineage. A plan can add an order that lineage doesn't represent, but it doesn't remove dependencies that Fabric detects.

For a detailed scenario that shows how the selected items, plan dependencies, lineage, and runtime actions work together, see [Deployment plan examples](deployment-plan-sample-plans.md).

### Execute deployment groups and actions

For each deployment group, Fabric runs its pre-deploy actions, deploys the group's item, and then runs its post-deploy actions. Dependencies between groups and actions determine their order. An item's position in the plan file doesn't define its order.

Attaching a plan is optional. Without a plan, the selected deployment tool uses its standard behavior.

## Attach a deployment plan

You can attach a plan when you use a supported Git integration operation, deploy content through a deployment pipeline, or call a supported REST API. The attachment applies only to that operation. For the supported surfaces and plan-selection behavior, see [Attach a deployment plan](deployment-plan-attach.md).

## Create and version a deployment plan

Create a plan on the deployment plan canvas, where you add deployment groups, define their order, and configure actions. For instructions, see [Create a deployment plan](how-to-create-deployment-plan.md).

A deployment plan is a workspace item. When the workspace is connected to Git, commit the plan with the items that it references so the plan can move through your CI/CD process.

## If an operation fails

The operation stops when an item or action fails and doesn't roll back completed work. For failure behavior and resolution steps, see [Troubleshoot deployment plans](deployment-plan-troubleshoot.md).

## Considerations and limitations

[!INCLUDE [deployment plan limitations](../includes/deployment-plan-limitations.md)]

## Related content

* [Create a deployment plan](./how-to-create-deployment-plan.md)
* [Deployment plan examples](./deployment-plan-sample-plans.md)
* [Introduction to CI/CD in Microsoft Fabric](../cicd-overview.md)
* [Introduction to Git integration](../git-integration/intro-to-git-integration.md)
* [Introduction to deployment pipelines](../deployment-pipelines/intro-to-deployment-pipelines.md)
* [Choose a Fabric CI/CD workflow](../manage-deployment.md)
* [Understand dependency binding in cross-workspace deployment](../cross-workspace-dependency-binding.md)
