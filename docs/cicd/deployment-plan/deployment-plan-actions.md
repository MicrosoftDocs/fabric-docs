---
title: Deployment plan actions in Microsoft Fabric
description: Learn which item types a deployment plan can run as an action, how actions are ordered around an item's deployment, and how to pass parameters to them.
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 09/24/2026
ms.custom:
  - deployment_plan
ms.search.form: Deployment plan
ai-usage: ai-assisted
#customer intent: As a Fabric developer, I want to understand what a deployment plan action can run and how it's ordered, so that the right work happens around each item's deployment.
---

# Deployment plan actions (preview)

An *action* is a run of a workspace item that a deployment performs around the deployment of another item. Actions are how a deployment plan does work that deploying item metadata alone can't do, such as populating a lakehouse table before a warehouse view that reads it deploys.

An action belongs to a [deployment group](deployment-plan-overview.md#deployment-plan-components), and a group deploys exactly one item. The group's actions run around that item's deployment.

[!INCLUDE [feature-preview-note](~/includes/feature-preview-note.md)]

## Pre-deploy and post-deploy actions

Each deployment group carries two sets of actions:

* *Pre-deploy actions* run before the group's item deploys.
* *Post-deploy actions* run after the group's item deploys.

A pre-deploy action can't run the same item that its own group deploys, because that item hasn't deployed yet when the action runs.

:::image type="content" source="./media/deployment-plan-actions/pre-and-post-action-slots-1.png" alt-text="Screenshot of a deployment group on the canvas, with the pre-deploy slot marked above the deployed item and the post-deploy slot marked below it." lightbox="./media/deployment-plan-actions/pre-and-post-action-slots-1.png":::

## Item types you can run as an action

[!INCLUDE [Supported deployment plan actions](../includes/deployment-plan-supported-actions.md)]

For the definition structure and job properties, see [Deployment plan definition](/rest/api/fabric/articles/item-management/definitions/deployment-plan-definition).

Each action runs the item. The item defines what the action does and which parameters it accepts, not the plan.

No other item type can run as an action. For item types that are under consideration but aren't supported, see [Considerations and limitations](#considerations-and-limitations).

## Order actions within a deployment group

Chain actions to control the order they run in. When you chain one action to another, the deployment runs them in that sequence, so you can order an action that loads data before the action that validates it.

:::image type="content" source="./media/deployment-plan-actions/action-order-2.png" alt-text="Screenshot of a lakehouse deployment group with Refresh Sales chained before Validate Sales, followed by a warehouse group with a Notify pre-deploy action." lightbox="./media/deployment-plan-actions/action-order-2.png":::

In the preceding image, the chain in the lakehouse group runs `Refresh_Sales` before `Validate_Sales`. The following warehouse group runs `Notify` before it deploys the warehouse.

The following rules apply:

* You can chain an action to other actions in the same deployment group. In the plan file, a chain is a dependency on another action's name.
* Action names must be unique within their deployment group, because a chain refers to an action by name.
* A chain can't loop back on itself. The system rejects a dependency cycle when you save the plan.
* Actions run one at a time. Actions that you don't chain to each other still don't run in parallel.

A deployment operation stops on the first failure, and the system doesn't roll back any changes. For more information, see [If an operation fails](deployment-plan-overview.md#if-an-operation-fails).

## Pass parameters to an action

An action can carry parameters, which the plan passes to the item that the action runs. Each parameter has a name and a value, and parameter names must be unique within an action.

:::image type="content" source="./media/deployment-plan-actions/action-parameters-1.png" alt-text="Screenshot of the parameter pane for an action, showing a name and value pair with a literal value and a second pair that references a Variable library variable." lightbox="./media/deployment-plan-actions/action-parameters-1.png":::

A parameter value is either a literal value or a reference to a variable in a [Variable library](../variable-library/variable-library-overview.md). A variable reference lets a single plan supply different values per environment, instead of hard-coding a value that's correct in only one workspace.

A variable reference that doesn't resolve to a known variable type is rejected when the plan is saved.

Because the plan passes the values through to the item, supply the parameters that the item expects. For which parameters an item accepts, see that item type's documentation.

## Considerations and limitations

[!INCLUDE [deployment plan limitations](../includes/deployment-plan-limitations.md)]

## Related content

* [What is a deployment plan?](deployment-plan-overview.md)
* [Create a deployment plan](how-to-create-deployment-plan.md)
* [Deployment plan examples](deployment-plan-sample-plans.md)
* [Troubleshoot deployment plans](deployment-plan-troubleshoot.md)
* [Understand dependency binding in cross-workspace deployment](../cross-workspace-dependency-binding.md)
* [Variable reference resolution failures](../variable-library/variable-reference-resolution-failure.md)
