---
title: Add a Microsoft Fabric workload
description: Learn how to add, remove, and use a workload in the Microsoft Fabric workload hub.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
---

# Add a workload in the workload hub

The workload hub is a central location where you can view all the workloads that are available in Microsoft Fabric. Each workload in Fabric has an item type that it's associated with. You can create item types in Fabric workspaces. To access the workload hub, on the workload menu, go to the workload.

:::image type="content" source="./media/more-workloads-add/workload-hub.png" alt-text="Screenshot of the workload hub." lightbox="./media/more-workloads-add/workload-hub.png":::

You can use all the workloads that are listed on the **My Workloads** tab and apply them in your analytical projects. You can generate items by using the workloads, and then perform various operations on them.

Workloads expand functionality in Fabric. Users with the relevant permissions can add workloads and make them available either to the entire tenant or to a specific capacity.

In the **More workloads** section, workloads that are published by Microsoft and by Microsoft Partners appear. Not all users can add workloads. Admins can control who can add workloads in an organization.

:::image type="content" source="./media/more-workloads-add/workload-hub-more.png" alt-text="Screenshot of the More workloads pane." lightbox="./media/more-workloads-add/workload-hub-more.png":::

Each workload has descriptive information about workload capabilities, support, and documentation, including:

* A list of items the workload can create (under **Item types**).
* A list of architectures, platforms, or features that are integrated with the workload (under **Compatible with**).
* The documentation, certification, and help links that are provided by the workload publisher (under **Publisher support**).
* Associated videos and screenshot that the publisher provides.

## Add and remove workloads

A user can add workloads if the user meets the following criteria:

* They have permissions from a Fabric admin to add a workload.
* They're a capacity admin or have permission to assign capacities to workspaces.

To add a workload:

1. Select **Add Workload**.

   :::image type="content" source="./media/more-workloads-add/assign-select.png" alt-text="Screenshot of Assign workload to capacity." lightbox="./media/more-workloads-add/assign-select.png":::

1. In **Add workload to capacities**, select one or more capacities to assign the workload to, and then select **Add Workload**.

> [!NOTE]
> Now the workload is available on all workspaces that the selected capacity is assigned to. Only workspaces that have this capacity assigned can create this workload item.

A workload can be added to more capacities or removed completely. When a workload is added to any of the capacities, a **Manage capacities** option appears.

To remove a workload, first select **Manage capacities**. Clear the checkboxes for all capacities, and then select **Update**.

:::image type="content" source="./media/more-workloads-add/remove.png" alt-text="Screenshot of the Removed workload interface." lightbox="./media/more-workloads-add/remove.png":::

## Use added workloads

Workloads that were added appear in the **My workloads** section. All workspace members that have the relevant capacities assigned to them can see the workloads under **My workloads**.

To see only workloads that the organization adds, select the **Added by my organization** filter.

:::image type="content" source="./media/more-workloads-add/my-workloads-organization.png" alt-text="Screenshot of the My workloads interface." lightbox="./media/more-workloads-add/my-workloads-organization.png":::

To see all workspaces where the workload can be used, select the workload, and then select **See workspaces**. Then use the dialog to go to the workspace and create the new item. **Cognitive Services** is shown in the following screenshot as an example.

:::image type="content" source="./media/more-workloads-add/workspaces.png" alt-text="Screenshot of the Select workspaces interface." lightbox="./media/more-workloads-add/workspaces.png":::

The first time a user works with a workload, they must consent to use the Microsoft Entra ID application. Tenant admins can consent on behalf of the organization by accessing or creating the workload's item type.

To consent to a Microsoft Entra ID application:

1. Go to the workload's item type.
1. Select **Consent**.
1. Review the permissions that the application requests.
1. Grant consent to the application.

After consent is granted, users can use the workload without needing to consent again.

## Add unverified workloads

Workload publishers can publish a workload directly to specific tenants *before* they publish it through the [Microsoft certification process](../workload-development-kit/publish-workload-requirements.md).

Fabric admins can choose to allow unverified workloads to appear in the workload hub to specific users. In this case, unverified workloads show up in the workload hub. Only users who are in a relevant security group can use unverified workload items, regardless of who created or added the workload.

To add an unverified workload, a user must be included in both of the following [tenant settings](../admin/tenant-settings-index.md#additional-workloads):

* "Capacity admins and contributors can add and remove Partner workloads"
* "Users can see and work with unvalidated partner workloads"
