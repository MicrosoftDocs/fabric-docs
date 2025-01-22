---
title: Manage settings for data engineering and science capacity
description: Learn how to configure and manage the capacity administration settings for data engineering and science experiences.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Configure and manage data engineering and data science settings for Fabric capacities

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

When you create Microsoft Fabric from the Azure portal, it's automatically added to the Fabric tenant that's associated with the subscription used to create the capacity. With the simplified setup in Microsoft Fabric, there's no need to link the capacity to the Fabric tenant. Because the newly created capacity will be listed in the admin settings pane. This configuration provides a faster experience for admins to start setting up the capacity for their enterprise analytics teams.

To make changes to the Data Engineering/Science settings in a capacity, you must have admin role for that capacity. To learn more about the roles that you can assign to users in a capacity, see [Roles in capacities](../admin/roles.md).

Use the following steps to manage the Data Engineering/Science settings for Microsoft Fabric capacity:

1. Select the **Settings** option to open the setting pane for your Fabric account. Select **Admin portal** under Governance and insights section

   :::image type="content" source="media\capacity-settings-management\admin-portal.png" alt-text="Screenshot showing where to select Admin Portal settings.":::

2. Choose the **Capacity settings** option to expand the menu and select **Fabric capacity** tab. Here you should see the capacities that you have created in your tenant. Choose the capacity that you want to configure.

   :::image type="content" source="media\capacity-settings-management\capacity-settings.png" alt-text="Screenshot showing where to select Capacity settings.":::

3. You're navigated to the capacities detail pane, where you can view the usage and other admin controls for your capacity. Navigate to the **Data Engineering/Science Settings** section and select **Open Spark Compute**. Configure the following parameters:

> [!Note]
> At least one workspace should be attached to the Fabric Capacity to explore the Data Engineering/Science Settings from the Fabric Capacity Admin Portal.

   * **Customized workspace pools:** You can restrict or democratize compute customization to workspace admins by enabling or disabling this option. Enabling this option allows workspace admins to create, update, or delete workspace level custom spark pools. Additionally, it allows you to resize them based on the compute requirements within the maximum cores limit of a capacity.

## Capacity Pools for Data Engineering and Data Science in Microsoft Fabric (**Public Preview**) 

1. In the **Pool List** section of Spark Settings, by clicking on the **Add** option, you can create a Custom pool for your Fabric Capacity.

   :::image type="content" source="media\capacity-settings-management\capacity-settings-pool-list.png" alt-text="Screenshot showing the pool list section in Admin Portal settings."lightbox="media\capacity-settings-management\capacity-settings-pool-list.png":::

   You're navigated to the Pool creation section, where you specify the Pool name, Node family, select the Node size and set the Min and Max nodes for your custom pool, enable/disable autoscale, and dynamic allocation of executors.

   :::image type="content" source="media\capacity-settings-management\capacity-pools-creation.png" alt-text="Screenshot showing the pool creation section in Admin Portal settings.":::

2. Select Create and save the settings.

   :::image type="content" source="media\capacity-settings-management\capacity-settings-pool-creation.png" alt-text="Screenshot showing the capacity pools saved in Admin Portal settings.":::

> [!NOTE]
> The custom pools created in the capacity settings have a 2-minute to 3-minute session start latency as these are on-demand sessions unlike the sessions served through Starter Pools.

3. Now the newly created Capacity pool is available as a Compute option in the Pool Selection menu in all the workspaces attached to this Fabric capacity.
  
   :::image type="content" source="media\capacity-settings-management\capacity-pools-workspace-pool-options.png" alt-text="Screenshot showing the capacity pools listed  in Pool list within Workspace settings.":::

4. You can also view the created capacity pool as a compute option in the environment item within the workspaces.

   :::image type="content" source="media\capacity-settings-management\capacity-pools-environment-compute-options.png" alt-text="Screenshot showing the capacity pools listed  in Pool list within Environment compute settings.":::

5. This provides other administrative controls to manage compute governance for your Spark compute in Microsoft Fabric. As a capacity admin, you can create Pools for workspaces and disable workspace-level customization, which would prevent workspace admins from creating custom pools.

## Related content

* [Get Started with Data Engineering/Science Admin Settings for your Fabric Workspace](workspace-admin-settings.md)
* [Learn about the Spark Compute for Fabric Data Engineering/Science experiences](spark-compute.md)
