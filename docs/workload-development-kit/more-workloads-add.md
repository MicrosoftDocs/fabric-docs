---
title: Adding a Microsoft Fabric workload (preview)
description: Learn how to add, remove, and use a workload from the workload hub.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: teddyberco
ms.topic: conceptual
ms.custom:
ms.date: 05/21/2024
---

# Workload hub (preview)

The workload hub is a central location where you can view all the workloads available in Fabric. Each workload in Fabric has its own item type associated with it. The item types can be created in Fabric workspaces. To access the workload hub, navigate to the workload from the left navigation menu.

:::image type="content" source="./media/more-workloads-add/workload-hub.png" alt-text="Screenshot of the Workload Hub." lightbox="./media/more-workloads-add/workload-hub.png":::

All the workloads available under the **My Workloads** tab can be used and applied in your analytical projects. You can start generating items and performing various operations on them.

More workloads allow for more functionality in Fabric. Users with the right permissions can add workloads and make them available either to the entire tenant or to a specific capacity.

In the **More workloads** section, workloads published by Microsoft & Partners can be added, not all users can add workloads. Admins can control who can add workloads in the organization.

:::image type="content" source="./media/more-workloads-add/workload-hub-more.png" alt-text="Screenshot of the More workloads page." lightbox="./media/more-workloads-add/workload-hub-more.png":::

Each workload includes additional information describing workload capabilities and other information including the following:

* **Item Type**: A list of items this workload can create.
* **Compatible with**: which items are integrated with by the workload.
* **Publisher support**: Documentation, Certification page & Help links by the workload publisher.
* Videos and screenshots material by the publisher.

## Adding and removing workloads

Users can add workloads if they meet the following criteria:

* They have permission to add a workload by Fabric admin
* They're a capacity admin or have permission to assign capacities to workspaces

To add a workload, follow these steps:

1. Select add workload.

   :::image type="content" source="./media/more-workloads-add/assign-select.png" alt-text="Screenshot of Assign workload to capacity." lightbox="./media/more-workloads-add/assign-select.png":::

1. Choose a capacity to assign the workload and add workload.

> [!NOTE]
>Now the workload is available on all workspaces the chosen capacity is assigned to. Only workspaces that are assigned with this capacity can create this workload items.

Added workloads can be added to more capacities or removed completely. When a workload is added to any of the capacities, a **Manage capacities** option appears.
To remove a workload first press "Manage capacities," deselect all capacities and press update.

:::image type="content" source="./media/more-workloads-add/remove.png" alt-text="Screenshot of the Remove workload interface." lightbox="./media/more-workloads-add/remove.png":::

## Using added workloads

Added available workloads are now visible in the **My workloads** section, and all workspace members with the relevant capacities assigned to them can now see the workload under **My workloads**.
To see only workloads added by the organization, choose the **Added by my organization** filter.

:::image type="content" source="./media/more-workloads-add/my-workloads-organization.png" alt-text="Screenshot of the My workloads interface." lightbox="./media/more-workloads-add/my-workloads-organization.png":::

To see all workspaces where the workload can be used, select the workload and then select **See workspaces**. Then use the dialog to navigate to the workspace and create the new item. **Cognitive Services** listed here as an example.

:::image type="content" source="./media/more-workloads-add/workspaces.png" alt-text="Screenshot of the Select workspaces interface." lightbox="./media/more-workloads-add/workspaces.png":::

The first time using a workload each user needs to consent to the Microsoft Entra ID application. Tenant admins can consent on behalf of the organization by accessing or creating the workload's item type.

To consent to Microsoft Entra ID application, follow these steps:

1. Navigate to the workload's item type.
1. Select **Consent**.
1. Review the permissions requested by the application.
1. Grant consent to the application.

Once consent is granted, users can use the workload without needing to consent again.
