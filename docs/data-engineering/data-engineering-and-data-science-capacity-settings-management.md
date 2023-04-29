---
title: Data engineering/science capacity Settings
description: Learn about the capacity administration settings for data engineering/science workloads
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: how-to
ms.date: 05/23/2023
---

# How to Configure and Manage Data Engineering/Science Settings for Fabric Capacities

[!INCLUDE [preview-note](../includes/preview-note.md)]

When you create a [!INCLUDE [product-name](../includes/product-name.md)], on Azure portal, it automatically gets added to the Fabric tenant thats associated with the subscription used to created the capacity. With the simplified setup in [!INCLUDE [product-name](../includes/product-name.md)], there's no need to link the capacity to the Fabric tenant, as this is handled for you behind the scenes. This configuration provides a faster experience for admins to start setting up the capacity for their enterprise analytics teams.

To make changes to the Data Engineering/Science settings in a capacity, you should have the admin role for that capacity. To learn more about the roles you can assign users in a capacity, see [Roles in capacities](../get-started/roles-capacities.md).

To manage the Data Engineering/Science settings for [!INCLUDE [product-name](../includes/product-name.md)] capacity:

1. Click on the **Settings** to open the setting pane for your Fabric and click on **Admin portal** under Governance and insights section

   :::image type="content" source="media\data-engineering-and-data-science-capacity-settings-management\adminportal.png" alt-text="Screenshot showing where to select Admin Portal settings." lightbox="media\data-engineering-and-data-science-capacity-settings-management\adminportal.png":::

2. Then, choose the **Capacity settings** option to expand the menu and select Fabric capacity tab. Here you should see the capacities that you have created in your tenant.Click on the capacity that you would want to configure.

:::image type="content" source="media\data-engineering-and-data-science-capacity-settings-management\capacitysettings.png" alt-text="Screenshot showing where to select Capacity settings." lightbox="media\data-engineering-and-data-science-capacity-settings-management\capacitysettings.png":::

3. You will be navigated to the capacities detail page, where you cal view the usage and other admin controls for your capacity. Navigate to the **Data Engineering/Science Settings** section and click on **Open Spark Compute** 

4. 