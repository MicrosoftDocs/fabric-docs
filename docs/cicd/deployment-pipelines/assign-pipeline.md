---
title: Assign a workspace to a Microsoft Fabric Application lifecycle management (ALM) deployment pipeline
description: Learn how to assign and unassign a workspace to a deployment pipeline, the Microsoft Fabric Application lifecycle management (ALM) tool.
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/25/2023
ms.search.form: Deployment pipelines operations
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

2. In the stage you want to assign a workspace to, expand the dropdown titled **Choose a workspace to assign to this pipeline**.

3. From the dropdown menu, select the workspace you want to assign to this stage.

    :::image type="content" source="media/assign-pipeline/assign-workspace.png" alt-text="A screenshot showing the assign workspace dropdown in a deployment pipelines empty stage.":::

4. Select **Assign a workspace**.

    :::image type="content" source="media/assign-pipeline/assign-button.png" alt-text="A screenshot showing the assign workspace button in a deployment pipelines empty stage.":::

## Unassign a workspace from a pipeline stage

You can unassign a workspace from any pipeline stage. If you want to assign a different workspace to a pipeline stage, you first have to unassign the current workspace from that stage.

To unassign a workspace from a pipeline stage, follow these steps:

1. Open the pipeline.

2. In the stage you want to unassign the workspace from, select **settings**.

3. From the *settings* menu, select **Unassign workspace**.

    :::image type="content" source="media/assign-pipeline/unassign-workspace.png" alt-text="A screenshot showing the unassign workspace option in deployment pipelines, available from the settings menu of the pipeline stage." lightbox="media/assign-pipeline/unassign-workspace.png":::

4. In the *Unassign workspace* dialogue box, select **Unassign**.

    :::image type="content" source="media/assign-pipeline/unassign-note.png" alt-text="A screenshot showing the unassign workspace pop-up window in deployment pipelines. The unassign button is highlighted.":::

## Item connections

After assigning a workspace to a deployment pipeline stage, if there are any adjacent stages already assigned, deployment pipelines attempts to create the connections between the items (such as reports, dashboards, and semantic models) in the adjacent stages. During this process, deployment pipelines checks the names of the items in the source stage and the stages next to it. Connections to items in adjacent stages, are established according to the item's type and name. If there are multiple items of the same type with the same name in the adjacent stages, assigning the workspace fails. To understand why this happens and resolve such cases, see [I can't assign the workspace to a stage?](../troubleshoot-cicd.md#i-cant-assign-a-workspace-to-a-stage)

Connections between items are only established when you assign a workspace to a pipeline stage. Adding a new item to a workspace that's part of a pipeline, doesn't trigger the creation of connections between that item and identical items in adjacent stages. To trigger forming a connection between a newly added item in a workspace stage and its equivalent item in an adjacent stage, unassign and reassign the workspace that contains the newly added item.

## Considerations and limitations

* You must be an admin of the workspace.

* The workspace isn't assigned to any other pipeline.

* The workspace must reside on a [Fabric capacity](../../enterprise/licenses.md).

* To assign a workspace, you need at least [workspace member](understand-the-deployment-process.md#permissions-table) permissions for the workspaces in its adjacent stages. For more information, see [Why am I getting the *workspace member permissions needed* error message when I try to assign a workspace?](../troubleshoot-cicd.md#error-message-workspace-member-permissions-needed)

* You can't assign a workspace with [Power BI samples](/power-bi/create-reports/sample-datasets) to a pipeline stage.

* You can't assign a [template app](/power-bi/connect-data/service-template-apps-create#create-the-template-workspace) workspace.

## Related content

[Compare content in different stages](compare-pipeline-content.md)
