---
title: Create a deployment plan in Microsoft Fabric
description: Create a deployment plan in Microsoft Fabric, order deployment groups, add pre-deploy and post-deploy actions, and commit the plan to Git.
ms.topic: how-to
ms.custom: doc-kit-assisted
ms.date: 09/24/2026
ms.search.form: Create deployment plan, Deployment plan
ai-usage: ai-assisted
#customer intent: As a developer, I want to create a deployment plan in Microsoft Fabric so that I can control item deployment order and run required notebooks or data pipelines between deployments.
---

# Create a deployment plan in Microsoft Fabric (preview)

In this article, you create and version a deployment plan in Microsoft Fabric to control the order in which workspace items deploy and to run actions between deployments. Use a deployment plan when the deployment must follow an order that you define, rather than the order Fabric derives from lineage, or when the deployment must run actions.

A deployment plan is a Fabric workspace item that groups each item into a deployment group and orders the groups. Each group can run actions before and after its item deploys. To create the plan, add and order deployment groups in a source workspace, configure any pre-deploy or post-deploy actions, and save it. To use the plan, attach it to a deployment in Git integration, in a deployment pipeline, or through the REST API. Deployment plans are in preview.

## What are the prerequisites for creating a Microsoft Fabric deployment plan?

To create a Microsoft Fabric deployment plan, you need:

* A [Fabric subscription](../../enterprise/licenses.md)
* A source [Fabric workspace](../../fundamentals/create-workspaces.md) assigned to a capacity in a [Fabric-supported region](../../admin/region-availability.md)
* At least the **Contributor** [workspace role](../../fundamentals/roles-workspaces.md) in the source workspace
* Workspace items that support deployment plans
* The **Users can create deployment plan (preview) items** tenant setting enabled for your organization or security group by your Fabric administrator

**Contributor** is the least-privileged role that can create workspace items. For more information about enabling the tenant setting, see [Enable deployment-plan creation for your tenant](#enable-deployment-plan-creation-for-your-tenant).

To commit the plan to Git or use it in a Git-integration deployment flow, you also need:

* The source workspace connected to a Git repository
* A target workspace that you connect to the same Git repository and assign to a capacity in a Fabric-supported region
* Permission to deploy content to the target workspace

## Enable deployment-plan creation for your tenant

In Microsoft Fabric, the **Users can create deployment plan (preview) items** tenant setting controls who can create deployment plans. If your Fabric administrator hasn't enabled the setting, ask them to complete the following steps.

1. In the Fabric admin portal, select **Tenant settings**.
1. Locate the **Users can create deployment plan (preview) items** setting.
1. Turn on **Users can create deployment plan (preview) items**.
1. Under **Apply to**, keep **The entire organization**, or select **Specific security groups** and choose the groups that need to create deployment plans.
1. Select **Apply**.

   :::image type="content" source="media/how-to-create-deployment-plan/tenant-setting-enable-plan-2.png" alt-text="Screenshot of the Users can create deployment plan (preview) items tenant setting in the Fabric admin portal." lightbox="media/how-to-create-deployment-plan/tenant-setting-enable-plan-2.png":::

After the Fabric administrator applies the setting, you can create deployment plans if the setting applies to your organization or to a security group that you belong to. For more information, see [About tenant settings](../../admin/about-tenant-settings.md).

## Create a deployment plan in the source workspace

After a Fabric administrator enables deployment-plan creation for your organization or security group, create the deployment plan in the source workspace that contains the items you want to deploy.

1. Open the source workspace.
1. Select **New item**.
1. Select **Deployment plan**.
1. Enter a name for the deployment plan.
1. Select **Create**.
1. Open the deployment plan.

The deployment plan opens on the authoring canvas. The left pane lists the workspace items that support deployment plans. You don't have to commit an item to Git before you add it to a plan. When you save the plan, Fabric assigns a logical ID to every referenced item that doesn't already have one, so the plan can be promoted to another environment.

:::image type="content" source="media/deployment-plan-overview/overview-4.png" alt-text="Screenshot of the deployment plan authoring canvas with supported workspace items in the left pane and an empty canvas." lightbox="media/deployment-plan-overview/overview-4.png":::

## Add workspace items as deployment groups

A deployment plan can deploy any workspace item that supports deployment plans. Add each supported item as its own deployment group. If a supported action item performs a preparation task and you don't need to deploy it, add it as a pre-action or post-action on another deployment group.

* On the deployment-plan authoring canvas, add a workspace item from the left pane to the canvas.
* Add each remaining workspace item that you want the plan to deploy.

:::image type="content" source="media/how-to-create-deployment-plan/create-plan-1.png" alt-text="Screenshot of the deployment plan authoring canvas with supported workspace items listed in the left pane." lightbox="media/how-to-create-deployment-plan/create-plan-1.png":::

The deployment-plan canvas displays one deployment group for each workspace item that you added.

:::image type="content" source="media/how-to-create-deployment-plan/create-plan-2.png" alt-text="Screenshot of the deployment plan canvas showing deployment groups for Sales_Lakehouse and Sales_Warehouse." lightbox="media/how-to-create-deployment-plan/create-plan-2.png":::

## Order deployment groups by dependency

Define dependencies between deployment groups so that each prerequisite workspace item deploys before its dependent workspace items.

* On the deployment-plan authoring canvas, connect each prerequisite deployment group to the groups that depend on it.
* Confirm that the resolved deployment order places each prerequisite workspace item before its dependent items.
* You can change the group layout from left to right or top to bottom at the top of the canvas with the **Group layout** button.

The deployment-plan canvas displays the order in which Microsoft Fabric deploys the groups.

:::image type="content" source="media/how-to-create-deployment-plan/create-plan-3.png" alt-text="Screenshot of the deployment plan canvas with the Sales_Lakehouse group connected before the Sales_Warehouse group." lightbox="media/how-to-create-deployment-plan/create-plan-3.png":::

## Add a pre-deploy or post-deploy action

Add a [supported deployment action](deployment-plan-actions.md#item-types-you-can-run-as-an-action) when work must run as part of the plan. A pre-action runs immediately before its associated workspace item deploys, and a post-action runs immediately afterward.

1. On the deployment-plan authoring canvas, select the deployment group where the action must run.
1. Add the action item to the appropriate pre-action or post-action slot.
1. Verify that the action's environment-specific references point to the target environment. For example, verify that a notebook's default lakehouse points to the target lakehouse. Some references rebind automatically when the item deploys, and some don't. For more information, see [Understand dependency binding in cross-workspace deployment](../cross-workspace-dependency-binding.md) and [Notebook source control and deployment](../../data-engineering/notebook-source-control-deployment.md).

The deployment-plan canvas displays the action item in the pre-action or post-action slot that you selected.

:::image type="content" source="media/how-to-create-deployment-plan/create-3.png" alt-text="Screenshot showing Hydrate_TopCustomers dragged from the item list into the post-deploy slot of the Sales_Lakehouse group." lightbox="media/how-to-create-deployment-plan/create-3.png":::

## Review and save the deployment plan

Before you commit the deployment plan to Git, confirm that its deployment groups, dependency order, pre-actions, and post-actions match the required deployment order.

1. Review the deployment groups, their order, and all pre-actions and post-actions.
2. Select **Save**.

The source workspace stores the deployment plan that you saved with your other workspace items.

## Commit the deployment plan to Git

Use the source workspace's Git integration to version the deployment plan that you saved with the workspace items that it deploys.

* In the source workspace, use Git integration to commit the deployment plan that you saved to the connected branch.
* Verify the Git status of the deployment plan is synced.
* In the Git repository, verify that the deployment-plan item folder contains the serialized deployment groups, deployment order, pre-actions, and post-actions.

:::image type="content" source="media/how-to-create-deployment-plan/create-5.png" alt-text="Screenshot of the Lakehouse_Hydrate_Warehouse deployment plan with a Synced Git status." lightbox="media/how-to-create-deployment-plan/create-5.png":::

You have now versioned the deployment plan with the workspace items, and it is ready to attach to a Git-integration deployment flow.

## Delete the deployment plan

If you no longer need the deployment plan, delete the deployment-plan item from the source workspace and commit the deletion to Git.

Verify that the deployment plan no longer appears in the source workspace and that the Git commit removes the deployment-plan item folder.

## Related Microsoft Fabric deployment content

* [What is lifecycle management in Microsoft Fabric?](../cicd-overview.md)
* [Deployment plan examples](deployment-plan-sample-plans.md)
* [Get started with deployment pipelines](../deployment-pipelines/get-started-with-deployment-pipelines.md)
* [Choose the best Fabric CI/CD workflow option for you](../manage-deployment.md)
