---
title: Deployment plan examples in Microsoft Fabric
description: Common Microsoft Fabric deployment plan patterns, including deploying an item that depends on data another item produces, and refreshing content after a deployment.
ms.reviewer: NimrodShalit
ms.topic: sample
ms.date: 09/24/2026
ms.custom:
  - deployment_plan
ms.search.form: Deployment plan
ai-usage: ai-assisted
#customer intent: As a Fabric developer, I want to see how other teams structure a deployment plan, so that I can model my own on a pattern that works.
---

# Deployment plan examples (preview)

This article shows patterns that deployment plans are commonly used for. Each one describes the deployment groups and the actions attached to them, so that you can build the equivalent on the canvas.

For how to build a plan, see [Create a deployment plan](how-to-create-deployment-plan.md).

## Deploy an item that depends on data another item produces

This is the most common reason to use a plan.

### The workspace

A sales team keeps its analytics solution in a single git-connected workspace that holds four items:

| Item | Type | What it does |
|---|---|---|
| `Sales_Lakehouse` | Lakehouse | Stores the sales tables. It's empty when it deploys, because a deployment copies item definitions, not data. |
| `Hydrate_TopCustomers` | Notebook | Writes the raw source rows into the lakehouse. |
| `Publish_TopCustomers` | Notebook | Turns those rows into the published `dbo.top_customers` table. |
| `Sales_Warehouse` | Warehouse | Holds the view `dbo.vw_top_customers`, which reads `dbo.top_customers`. |

### Why deployment order alone isn't enough

Fabric uses item lineage to detect that the warehouse view references a lakehouse table, so it deploys the lakehouse before the warehouse.

Lineage doesn't show that the table must be *populated* before the view is valid. The table doesn't arrive with the item definition. The two notebooks produce it at run time:

:::image type="content" source="./media/deployment-plan-sample-plans/sales-workspace-dependency.png" alt-text="Diagram showing the Hydrate notebook writing a source table into the lakehouse, the Publish notebook turning it into dbo.top_customers, and the warehouse view reading that table." lightbox="./media/deployment-plan-sample-plans/sales-workspace-dependency.png":::

Deploy this workspace without a plan and the deployment fails. Every item is copied correctly, but the warehouse view is created against a table that no one has produced yet, and the deployment reports that the object name is invalid. The target is left partially deployed.

Nothing is wrong with the items. What's missing is the instruction to run the notebooks between deploying the lakehouse and deploying the warehouse. That instruction is the plan.

### The plan

The plan has two deployment groups, one for the lakehouse and one for the warehouse. The lakehouse group runs both notebooks as post-deploy actions:

| Deployment group | Item deployed | Post-deploy actions | Depends on |
|---|---|---|---|
| Sales_Lakehouse | Sales_Lakehouse (lakehouse) | 1. Run Hydrate_TopCustomers<br>2. Run Publish_TopCustomers | Nothing |
| Sales_Warehouse | Sales_Warehouse (warehouse) | None | Sales_Lakehouse |

After the lakehouse deploys, `Hydrate_TopCustomers` writes the source rows. Then `Publish_TopCustomers` creates `dbo.top_customers` and waits until the SQL analytics endpoint exposes the table. The lakehouse group finishes only after both actions finish. Fabric can then deploy the warehouse and create its view.

The notebooks are actions in the lakehouse group, not separate deployment groups. `Publish_TopCustomers` depends on `Hydrate_TopCustomers`, and the warehouse group depends on the completed lakehouse group.

Here's the same plan on the canvas:

:::image type="content" source="./media/deployment-plan-sample-plans/canvas-sales-release-plan.png" alt-text="Screenshot of the SalesRelease deployment plan showing the Sales_Lakehouse group with Hydrate_TopCustomers and Publish_TopCustomers as ordered post-deploy actions, followed by the dependent Sales_Warehouse group." lightbox="./media/deployment-plan-sample-plans/canvas-sales-release-plan.png":::

## Understand the plan.yml structure

You build a plan on the canvas. When the workspace is connected to Git, the plan is stored as a `plan.yml` file in the deployment-plan item's folder, so it's reviewed and versioned like any other item:

```yml
$schema: https://developer.microsoft.com/json-schemas/fabric/item/deploymentPlan/definition/plan/1.0.0/schema.json
version: 1.0.0
groups:
  - name: Sales_Lakehouse
    logicalId: 11111111-1111-1111-1111-111111111111
    postActions:
      - name: Run Hydrate_TopCustomers
        job:
          type: Execute
          logicalId: 22222222-2222-2222-2222-222222222222
      - name: Run Publish_TopCustomers
        dependsOn:
          - actionName: Run Hydrate_TopCustomers
        job:
          type: Execute
          logicalId: 33333333-3333-3333-3333-333333333333
  - name: Sales_Warehouse
    logicalId: 44444444-4444-4444-4444-444444444444
    dependsOn:
      - groupName: Sales_Lakehouse
```

The file has the following structure:

| Element | Purpose |
|---|---|
| `$schema` | Identifies the schema that validates the plan definition. |
| `version` | Identifies the plan definition version. |
| `groups` | Contains the deployment groups in the plan. |
| `name` | Gives a group or action a unique name that dependencies can reference. |
| `logicalId` | Identifies the Fabric item across workspaces. |
| `dependsOn` | Declares dependencies on another group or action by name. |
| `preActions` and `postActions` | Run supported jobs before or after the group's item deploys. |
| `job` | Identifies the job type, item logical ID, and optional parameters for an action. |

A few things to notice in this definition:

- **A group names one item.** `logicalId` is the item's logical ID, the same identifier Git integration uses, so the plan stays valid as the item moves between workspaces.
- **Group order is expressed with `dependsOn`,** not by position in the file. Reordering the groups in the file changes nothing.
- **Action order is also expressed with `dependsOn`.** `Run Publish_TopCustomers` starts only after `Run Hydrate_TopCustomers` finishes.
- **`postActions` run after the group's item deploys.** Use `preActions` for work that has to happen first, such as a validation check.

> [!TIP]
> An action is finished when the item's run ends, not when downstream services catch up. In this example, the last cell of `Publish_TopCustomers` waits until the lakehouse SQL analytics endpoint has cataloged the new table. Put that kind of readiness check inside the action, because the plan doesn't wait on your behalf.

## Refresh content after it deploys

A deployment updates item definitions. It doesn't run anything, so a semantic model or a report reflects the new definition but not new data.

| Deployment group | Item deployed | Runs after the item deploys | Depends on |
|---|---|---|---|
| Sales_Warehouse | Sales_Warehouse (warehouse) | None | Nothing |
| Sales_Model | Sales_Model (semantic model) | Run a data pipeline that refreshes the model | Sales_Warehouse |

Attach this plan to a deployment pipeline deployment so that promoting to a stage leaves the target ready to use rather than needing a manual refresh.

## Validate before anything deploys

A pre-deploy action runs before the item in its group deploys, so you can use one as a gate.

An action can only run an item that's already deployed, so the check itself is deployed by an earlier group:

| Deployment group | Item deployed | Runs before the item deploys | Depends on |
|---|---|---|---|
| Preflight | Preflight_Checks (notebook) | None | Nothing |
| First_Real_Item | The first item of the release | Run Preflight_Checks | Preflight |

If the check fails, the deployment stops and nothing that depends on that group deploys. Use this to confirm that connections resolve, that a required capacity is running, or that a source system is available before a release begins.

> [!NOTE]
> A pre-deploy action can't run the item its own group deploys, because that item doesn't exist in the target yet. Deploy the item that performs the check in an earlier group, as shown here.

## Order work that lineage can't see

Two items can be completely independent as far as lineage is concerned, and still need an order. A plan is how you express that.

| Deployment group | Item deployed | Depends on |
|---|---|---|
| Reference_Data | The item that produces reference data | Nothing |
| Domain_Item | An item that reads reference data through a connection rather than a direct reference | Reference_Data |

Because the dependency runs through a connection rather than an item reference, Fabric can't infer it. The plan supplies the order.

## Related content

- [What is a deployment plan?](deployment-plan-overview.md)
- [Create a deployment plan](how-to-create-deployment-plan.md)
- [Deployment plan actions](deployment-plan-actions.md)
- [Troubleshoot deployment plans](deployment-plan-troubleshoot.md)
