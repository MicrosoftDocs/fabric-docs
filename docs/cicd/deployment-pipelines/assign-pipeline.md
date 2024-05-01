---
title: Assign a workspace to a deployment pipeline
description: Learn how to assign and unassign a workspace to a deployment pipeline, the Microsoft Fabric Application lifecycle management (ALM) tool.
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to
ms.custom:
    - build-2023
    - ignite-2023
ms.date: 04/11/2024
ms.search.form: Deployment pipelines operations
#customer intent: As a developer, I want to learn how to assign a workspace to a deployment pipeline so that I can manage my development process efficiently.
---

# Assign a workspace to a Microsoft Fabric deployment pipeline

Deployment pipelines enable you to assign and unassign workspaces to any stage in a pipeline. This capability is important for organizations that already have workspaces that are used as different environments of a managed release. In such cases, you can assign each workspace to its corresponding pipeline stage, and continue working in your usual flow.

<!---
>[!NOTE]
>This article describes how to assign and unassign a workspace to a deployment pipeline stage in the Fabric service. You can also perform these functions programmatically, using the [Assign Workspace](/rest/api/fabric/pipelines/assign-workspace) and [Unassign Workspace](/rest/api/fabric/pipelines/unassign-workspace) Fabric REST APIs.
-->

## Assign a workspace to any vacant pipeline stage

To assign a workspace to a pipeline, the pipeline stage you want to assign the workspace to has to be vacant. If you want to assign a workspace to a pipeline stage that already has another workspace assigned to it, [unassign](#unassign-a-workspace-from-a-pipeline-stage) the current workspace from that stage and then assign the new workspace.

Before you assign a workspace to a pipeline stage, review the [limitations](#considerations-and-limitations) section and make sure that the workspace meets the required conditions.

>[!NOTE]
>Before you assign or unassign a workspace to a pipeline, consider that every time you deploy to a vacant stage, a new workspace is created.

To assign a workspace to a pipeline stage, follow these steps:

1. Open the pipeline.

    :::image type="content" source="media/assign-pipeline/new-workspace.png" alt-text="A screenshot showing a deployment pipelines new workspace with all the pipeline stages unassigned." lightbox="media/assign-pipeline/new-workspace.png":::

1. In the stage you want to assign a workspace to, expand the dropdown titled **Choose a workspace to assign to this pipeline**.

1. From the dropdown menu, select the workspace you want to assign to this stage. If you don't see the workspace you want, review the [limitations](#considerations-and-limitations) section and make sure that your workspace meets the required conditions.

    :::image type="content" source="media/assign-pipeline/assign-workspace.png" alt-text="A screenshot showing the assign workspace dropdown in a deployment pipelines empty stage.":::

1. Select **Assign a workspace**.

    :::image type="content" source="media/assign-pipeline/assign-button.png" alt-text="A screenshot showing the assign workspace button in a deployment pipelines empty stage.":::

## Unassign a workspace from a pipeline stage

You can unassign a workspace from any pipeline stage. If you want to assign a different workspace to a pipeline stage, you first have to unassign the current workspace from that stage.

To unassign a workspace from a pipeline stage, follow these steps:

1. Open the pipeline.

1. In the stage you want to unassign the workspace from, select **settings**.

1. From the *settings* menu, select **Unassign workspace**.

    :::image type="content" source="media/assign-pipeline/unassign-workspace.png" alt-text="A screenshot showing the unassign workspace option in deployment pipelines, available from the settings menu of the pipeline stage." lightbox="media/assign-pipeline/unassign-workspace.png":::

1. In the *Unassign workspace* dialogue box, select **Unassign**.

    :::image type="content" source="media/assign-pipeline/unassign-note.png" alt-text="A screenshot showing the unassign workspace pop-up window in deployment pipelines. The unassign button is highlighted.":::

## Item pairing

Pairing is the process by which an item in one stage of the deployment pipeline is associated with the same item in the adjacent stage. Pairing is vital for correct deployments. If items aren't paired, even if they appear to be the same, they don't overwrite on a subsequent deployment.

<a name="pairingrules">
Pairing can happen in one of two ways:
</a>

* Deployment: when items are copied from one stage to another using the **Deploy** button they're automatically paired.
* Assigning a workspace to a deployment stage: when a workspace is assigned to a deployment stage the deployment pipeline attempts to pair items. The pairing criteria are:

  * Item Name
  * Item Type
  * Folder Location

If a single item can be identified that matches all three of these criteria then pairing occurs. If more than one item in a single stage matches an item in an adjacent stage, then pairing fails.

Once items are paired, renaming them *doesn't* unpair the items. Thus, there can be paired items with different names.

### See which items are paired

Paired items appear on the same line in the pipeline content list. Items that aren't paired, appear on a line by themselves:

:::image type="content" source="./media/assign-pipeline/paired-items.png" alt-text="Screenshot showing adjacent stages with paired items listed on the same line and one item in the second stage that's not in the first stage.":::

### Create nonpaired items with the same name

There's no way to manually pair items except by following the pairing rules described in the [previous section](#pairingrules). Adding a new item to a workspace that's part of a pipeline, doesn't automatically pair it to an identical item in an adjacent stage. Thus, you can have identical items with the same name in adjacent workspaces that aren't paired.

Here's an example of items that were added to the *Test* pipeline after it was assigned and therefore not paired with the identical item in the *Dev* pipeline:

:::image type="content" source="./media/assign-pipeline/non-paired-items.png" alt-text="Screenshot showing adjacent stages with non-paired items with identical names and types listed on the different lines.":::

### Multiple items with the same name and type in a workspace

If two or more items in the workspace to be paired have the same name, type and folder, pairing fails. Move one item to a different folder or change its name so that there are no longer two items that match an existing item in the other stage.

:::image type="content" source="./media/assign-pipeline/pairing-failure.png" alt-text="Screenshot of a workspace assignment failing because there's more than one item with the same name and type.":::

## Considerations and limitations

* You must be an admin of the workspace.

* The workspace isn't assigned to any other pipeline.

* The workspace must reside on a [Fabric capacity](../../enterprise/licenses.md).

* To assign a workspace, you need at least [workspace member](understand-the-deployment-process.md#permissions-table) permissions for the workspaces in its adjacent stages. For more information, see [Why am I getting the *workspace member permissions needed* error message when I try to assign a workspace?](../troubleshoot-cicd.md#error-message-workspace-member-permissions-needed)

* You can't assign a workspace with [Power BI samples](/power-bi/create-reports/sample-datasets) to a pipeline stage.

* You can't assign a [template app](/power-bi/connect-data/service-template-apps-create#create-the-template-workspace) workspace.

## Related content

[Compare content in different stages](compare-pipeline-content.md).
