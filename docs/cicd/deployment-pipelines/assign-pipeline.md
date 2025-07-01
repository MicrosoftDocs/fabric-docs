---
title: Assign a workspace to a deployment pipeline
description: Learn how to assign and unassign a workspace to a deployment pipeline, the Microsoft Fabric Application lifecycle management (ALM) tool.
author: billmath
ms.author: billmath
ms.reviewer: leebenjamin
ms.service: fabric
ms.subservice: cicd
ms.topic: how-to
ms.custom:
ms.date: 01/12/2025
ms.search.form: Deployment pipelines operations
#customer intent: As a developer, I want to learn how to assign a workspace to a deployment pipeline so that I can manage my development process efficiently.
---

# Assign a workspace to a Microsoft Fabric deployment pipeline

Deployment pipelines enable you to assign and unassign workspaces to any stage in a pipeline. This capability is important for organizations that already have workspaces that are used as different environments of a managed release. In such cases, you can assign each workspace to its corresponding pipeline stage, and continue working in your usual flow.

> [!NOTE]
> The new Deployment pipeline user interface is currently in **preview**. To turn on or use the new UI, see [Begin using the new UI](./deployment-pipelines-new-ui.md#begin-using-the-new-ui).

For more information about assigning workspaces and the implications regarding capacities and permissions, see [The deployment pipelines process](./understand-the-deployment-process.md#assign-a-workspace-to-an-empty-stage).

<!---
>[!NOTE]
>This article describes how to assign and unassign a workspace to a deployment pipeline stage in the Fabric service. You can also perform these functions programmatically, using the [Assign Workspace](/rest/api/fabric/pipelines/assign-workspace) and [Unassign Workspace](/rest/api/fabric/pipelines/unassign-workspace) Fabric REST APIs.
-->

## Assign a workspace to any vacant pipeline stage

To assign a workspace to a deployment pipeline, the pipeline stage you want to assign the workspace to has to be vacant. To assign a workspace to a pipeline stage that already has another workspace assigned to it, [unassign](#unassign-a-workspace-from-a-deployment-pipeline-stage) the current workspace from that stage and then assign the new workspace.

Before you assign a workspace to a deployment pipeline stage, review the [limitations](#considerations-and-limitations) section and make sure that the workspace meets the required conditions.

>[!NOTE]
>Before you assign or unassign a workspace to a deployment pipeline, consider that every time you deploy to a vacant stage, a new workspace is created, and whenever you unassign a workspace, you lose all the stage deployment's history and configured rules.

To assign a workspace to a deployment pipeline stage, follow these steps:

### [Assign a workspace: New UI](#tab/new-ui)

1. Open the deployment pipeline.
1. In the stage you want to assign a workspace to, expand the dropdown titled **Add content to this stage**.
1. Select the workspace you want to assign to this stage.

    :::image type="content" source="media/assign-pipeline/assign-workspace-new.png" alt-text="A screenshot showing the assign workspace dropdown in a deployment pipelines empty stage in the new UI.":::

1. Select **Assign**.

### [Assign a workspace: Original UI](#tab/old-ui)

1. Open the deployment pipeline.

    :::image type="content" source="media/assign-pipeline/new-workspace.png" alt-text="A screenshot showing a deployment pipelines new workspace with all the pipeline stages unassigned." lightbox="media/assign-pipeline/new-workspace.png":::

1. In the stage you want to assign a workspace to, expand the dropdown titled **Add content to this stage**.

1. Select the workspace you want to assign to this stage. If you don't see the workspace you want, review the [limitations](#considerations-and-limitations) section and make sure that your workspace meets the required conditions.

    :::image type="content" source="media/assign-pipeline/assign-workspace.png" alt-text="A screenshot showing the *assign workspace* dropdown in a deployment pipelines empty stage.":::

1. Select **Assign**.

    :::image type="content" source="media/assign-pipeline/assign-button.png" alt-text="A screenshot showing the assign workspace button in a deployment pipelines empty stage.":::

---

## Unassign a workspace from a deployment pipeline stage

You can unassign a workspace from any deployment pipeline stage. If you want to assign a different workspace to a deployment pipeline stage, you first have to unassign the current workspace from that stage.

To unassign a workspace from a deployment pipeline stage, follow these steps:

### [Unassign a workspace: New UI](#tab/new-ui)

1. Open the deployment pipeline.

1. In the stage you want to unassign the workspace from, select the three dots in the lower left corner.

1. Select **Unassign workspace**.

    :::image type="content" source="media/assign-pipeline/unassign-workspace-new.png" alt-text="A screenshot showing the unassign workspace option in the new UI of deployment pipelines." lightbox="media/assign-pipeline/unassign-workspace.png":::

1. In the *Unassign workspace* dialogue box, select **Unassign**.

    :::image type="content" source="media/assign-pipeline/unassign-note.png" alt-text="A screenshot showing the unassign workspace pop-up window in deployment pipelines. The unassign button is highlighted.":::

### [Unassign a workspace: Original UI](#tab/old-ui)

1. Open the deployment pipeline.

1. In the stage you want to unassign the workspace from, select **settings**.

1. From the *settings* menu, select **Unassign workspace**.

    :::image type="content" source="media/assign-pipeline/unassign-workspace.png" alt-text="A screenshot showing the *unassign workspace* option in deployment pipelines, available from the settings menu of the pipeline stage." lightbox="media/assign-pipeline/unassign-workspace.png":::

1. In the *Unassign workspace* dialogue box, select **Unassign**.

    :::image type="content" source="media/assign-pipeline/unassign-note.png" alt-text="A screenshot showing the unassign workspace pop-up window in deployment pipelines. The unassign button is highlighted.":::

---

## Item pairing

Pairing is the process by which an item in one stage of the deployment pipeline is associated with the same item in the adjacent stage. If items aren't paired, even if they have the same name and type, the item in the target stage isn't overwritten during a deploy. A deploy of an unpaired item is known as a clean deploy and creates a copy of that item in the adjacent stage.

<a name="pairing-rules"></a>

Pairing can happen in one of two ways:

* **Deployment**: when an unpaired item is copied from one stage to another using the *Deploy* button, a copy of the item is created in the next stage and paired with the item being deployed.

  The following table shows when items are paired when the deploying button is used in different circumstances:

    | Scenario | Stage A (for example, Dev)                                       | Stage B (for example, Test)                                       | Comment                                                        |
    |----------|----------------------------------------------------------|-----------------------------------------------------------|----------------------------------------------------------------|
    | 1        | Name: *PBI Report*<br>Type: *Report*                   | None                    | Clean deploy - pairing occurs                                                 |
    | 2        | Name: *PBI Report*<br>Type: *Report*                   | Name: *PBI Report*<br>Type: *Report*                    | [If items are paired](#see-which-items-are-paired), then pressing deploy overwrites stage B.                                                 |
    | 3        | Name: *PBI Report*<br>Type: *Report*                   | Name: *PBI Report*<br>Type: *Report*                    | If items aren't paired, the report in stage A is copied to stage B. There are then two files in stage B with the same name- one paired and one unpaired. Deployments continues to succeed between the paired items.                                                 |

* **Assigning a workspace to a deployment stage**: when a workspace is assigned to a deployment stage the deployment pipeline attempts to pair items. The pairing criteria are:

  * Item Name
  * Item Type
  * Folder Location (used as a tie breaker when a stage contains duplicate items (two or more items with the same name and type)

  If a single item in each stage has the same name and type, then pairing occurs. If there's more than one item in a stage that has the same name and type, then items are paired if they're in the same folder. If the folders aren't the same, pairing fails.

  The following table shows when items are paired when a workspace is assigned in different circumstances:

  | Scenario | Stage A (for example, Dev)                                       | Stage B (for example, Test)                                       | Comment                                                        |
  |----------|----------------------------------------------------------|-----------------------------------------------------------|----------------------------------------------------------------|
  | 1        | Name: *PBI Report*<br>Type: *Report*                   | Name: *PBI Report*<br>Type: *Report*                    | ✅ Pairing occurs                                                 |
  | 2        | Name: *PBI Report*<br>Type: *Report*                   | Name: *PBI Report*<br>Type: *Report*                    | ❌ Pairing doesn't occur (duplicates). <br>❌ Deployment fails.          |
  |          |                                                          | Name: *PBI Report*<br>Type: *Report*                    | ❌ Pairing doesn't occur (duplicates). <br>❌ Deployment fails.          |
  | 3        | Name: *PBI Report*<br>Type: *Report*<br>*Folder A* | Name: *PBI Report*<br>Type: *Report*<br>*Folder B*  | ✅ Deployment succeeds but <br>❌ this report isn't paired with dev     |
  |          |                                                          | Name: *PBI Report*<br>Type: *Report*<br>*Folder A*  | ✅ Pairing occurs using folder as a tie breaker for duplicates |
  |          |                                                          | Name: *PBI Report*<br>Type: *Report*<br>*No folder* | ✅ Deployment succeeds but <br>❌ this report isn't paired with dev     |

> [!NOTE]
> Once items are paired, renaming them *doesn't* unpair the items. Thus, there can be paired items with different names.

### See which items are paired

Paired items appear on the same line in the pipeline content list. Items that aren't paired, appear on a line by themselves:

#### [Paired items: New UI](#tab/new-ui)

:::image type="content" source="./media/assign-pipeline/paired-items-new.png" alt-text="Screenshot of new UI showing adjacent stages. Paired items are listed on the same line, and one item in the second stage isn't in the first stage.":::

#### [Paired items: Original UI](#tab/old-ui)

:::image type="content" source="./media/assign-pipeline/paired-items.png" alt-text="Screenshot showing adjacent stages with paired items listed on the same line and one item in the second stage that's not in the first stage.":::

---

### Create nonpaired items with the same name

There's no way to manually pair items except by following the pairing rules described in the [previous section](#pairing-rules). Adding a new item to a workspace that's part of a pipeline, doesn't automatically pair it to an identical item in an adjacent stage. Thus, you can have identical items with the same name in adjacent workspaces that aren't paired.

Here's an example of items that were added to the directly to the *Test* workspace after it was assigned and therefore not paired with the identical item in the *Dev* pipeline:

:::image type="content" source="./media/assign-pipeline/non-paired-items.png" alt-text="Screenshot showing adjacent stages with nonpaired items with identical names and types listed on the different lines.":::

### Multiple items with the same name and type in a workspace

If two or more items in the workspace to be paired have the same name, type and folder, pairing fails. Move one item to a different folder or change its name so that there are no longer two items that match an existing item in the other stage.

:::image type="content" source="./media/assign-pipeline/pairing-failure.png" alt-text="Screenshot of a workspace assignment failing because there's more than one item with the same name and type.":::

## Considerations and limitations

* Only workspaces that can be assigned to a deployment pipeline appear in the dropdown list. A workspace can be assigned to a deployment pipeline stage if the following conditions apply:

  * You're an admin of the workspace.

  * The workspace isn't assigned to any other deployment pipeline.

  * The workspace resides on a [Fabric capacity](../../enterprise/licenses.md#capacity).

  * You have at least [workspace contributor](understand-the-deployment-process.md#permissions-table) permissions for the workspaces in its adjacent stages. For more information, see [Why am I getting the *workspace contributor permissions needed* error message when I try to assign a workspace?](../troubleshoot-cicd.md#error-message-workspace-member-permissions-needed)

  * The workspace doesn't contain [Power BI samples](/power-bi/create-reports/sample-datasets).

  * The workspace isn't a [template app](/power-bi/connect-data/service-template-apps-create#create-the-template-workspace) workspace.

  * The workspace doesn't have a template app installed.

* When a Direct Lake semantic model is deployed, it doesn't automatically bind to items in the target stage. For example, if a LakeHouse is a source for a DirectLake semantic model and they're both deployed to the next stage, the DirectLake semantic model in the target stage will be bound to the LakeHouse in the source stage. Use datasource rules to bind it to an item in the target stage. Other types of semantic models are automatically bound to the paired item in the target stage.

## Related content

[Compare content in different stages](compare-pipeline-content.md).
