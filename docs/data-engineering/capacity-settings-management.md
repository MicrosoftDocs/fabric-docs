---
title: Configure data engineering and science capacity admin settings
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

When you create Microsoft Fabric from the Azure portal, it is automatically added to the Fabric tenant that's associated with the subscription used to create the capacity. With the simplified setup in Microsoft Fabric, there's no need to link the capacity to the Fabric tenant. Because the newly created capacity will be listed in the admin settings pane. This configuration provides a faster experience for admins to start setting up the capacity for their enterprise analytics teams.

To make changes to the Data Engineering/Science settings in a capacity, you must have admin role for that capacity. To learn more about the roles that you can assign to users in a capacity, see [Roles in capacities](../admin/roles.md).

Use the following steps to manage the Data Engineering/Science settings for Microsoft Fabric capacity:

1. Select the **Settings** option to open the setting pane for your Fabric account. Select **Admin portal** under Governance and insights section

   :::image type="content" source="media\capacity-settings-management\admin-portal.png" alt-text="Screenshot showing where to select Admin Portal settings.":::

1. Choose the **Capacity settings** option to expand the menu and select **Fabric capacity** tab. Here you should see the capacities that you have created in your tenant. Choose the capacity that you want to configure.

   :::image type="content" source="media\capacity-settings-management\capacity-settings.png" alt-text="Screenshot showing where to select Capacity settings." lightbox="media\capacity-settings-management\capacity-settings.png":::

1. You are navigated to the capacities detail pane, where you can view the usage and other admin controls for your capacity. Navigate to the **Data Engineering/Science Settings** section and select **Open Spark Compute**. Configure the following parameters:

   * **Customized workspace pools:** You can restrict or democratize compute customization to workspace admins by enabling or disabling this option. Enabling this option allows workspace admins to create, update, or delete workspace level custom spark pools. Additionally, it allows you to resize them based on the compute requirements within the maximum cores limit of a capacity.

   :::image type="content" source="media\capacity-settings-management\capacity-settings-sections.png" alt-text="Screenshot showing different sections in spark compute settings.":::

1. After configuring, select **Apply**

## Related content

* [Get Started with Data Engineering/Science Admin Settings for your Fabric Workspace](workspace-admin-settings.md)
* [Learn about the Spark Compute for Fabric Data Engineering/Science experiences](spark-compute.md)
