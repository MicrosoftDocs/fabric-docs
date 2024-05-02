---
title: Adding a Microsoft Fabric workload
description: Learn how to add, remove, and use a workload from the workload hub.
author: teberco
ms.author: kesharab
ms.reviewer: teddyberco
ms.topic: concept
ms.custom:
ms.date: 05/02/2024
---

# Workload hub

The workload hub is a central location where you can view all the workloads available in Fabric. Each workload in Fabric has its own item types associated with it, which can be created in Fabric workspaces. To access the workload hub, navigate to the workload from the left navigation menu.

:::image type="content" source="./media/more-workloads-add/workload-hub.png" alt-text="Workload Hub":::

All the workloads available under the "My Workloads" tab can be used and applied in your analytical projects. You can start generating items and performing various operations on them.

More workload allows adding more functionality to Fabric. Users applicable permissions can add workloads and make them available either to the entire tenant or to a specific capacity. 

In the "more workloads" section, workloads published by Microsoft & Partners can be added, not all users can add workloads. Admins can control who can add workloads in the organization. 

:::image type="content" source="./media/more-workloads-add/workload-hub-more.png" alt-text="More workloads":::

Each workload includes additional information describing workload capabilities and collatarle:
1. "Item Type": A list of items this workload can create.
2. "Compatible with": which items are integrated with by the workload.
3. "Publisher support": Documentation, Certification page & Help links by the workload publisher.
4. Videos and screenshots material by the publisher.

# Adding and removing workloads
Users, which were granted permission to add a workload by Fabric admin and are also capacity admins or allowed to assign capacities to workspaces can add workloads.

1. Select add workload.
:::image type="content" source="./media/more-workloads-add/assign-select.png" alt-text="Assign workload to capacity":::
2. Choose a capacity to assign the workload and add workload.

> [!NOTE]
Now the workload is available on all workspaces the chosen capacity is assigned to. Only workspaces that are assigned with this capacity will be able to create this workload items.

Added workloads can be added to more capacities or removed completely. Once the workload is added to any of the capacities, a "Manage Capacities" option appears.
To remove a workload first press "Manage capacities," deselect all capacities and press update.
:::image type="content" source="./media/more-workloads-add/remove.png" alt-text="Remove workload":::

# Using added workloads

Added workloads are now available under "My workloads" section and all workspace members with the relevant capacities assigned to them can now see the workload under "my workloads."
To see only workloads added by the organization choose the "added by my organization" filter.

:::image type="content" source="./media/more-workloads-add/my-workloads2.png" alt-text="My workloads":::

To see all workspaces where the workload can be used, select the workload and then select "See workspaces." Now use the dialog to navigate to the workspace and create the new item type "Sentiment Analysis" listed here as an example.

:::image type="content" source="./media/more-workloads-add/workspaces.png" alt-text="Select workspaces":::

The first time using a workload each user needs to consent to the Microsoft Entra ID application. Tenant admins can also consent on behalf of the organization by accessing or creating the workload's item type.

To consent to Microsoft Entra ID application, follow these steps:
1. Navigate to the workload's item type.
2. Select on the "Consent" button.
3. Review the permissions requested by the application.
4. Grant consent to the application.

Once consent is granted, users are able to use the workload without needing to consent again.

