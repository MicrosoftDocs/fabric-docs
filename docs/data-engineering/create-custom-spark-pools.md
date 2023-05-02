---
title: Creating custom spark pools in Fabric
description: Learn about the custom spark pools, and how to configure them from them from Fabric workspace settings
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: how-to
ms.date: 02/24/2023
---
# How to create Custom Spark Pools in Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this document, we will provide a comprehensive guide on leveraging Apache Spark pools in [!INCLUDE [product-name](../includes/product-name.md)] Spark for customizing your data engineering and data science workloads. Apache Spark pools enable users to create tailored compute environments based on their specific requirements, ensuring optimal performance and resource utilization.

By specifying minimum and maximum nodes for autoscaling, users can dynamically acquire and retire nodes as the job's compute needs change, resulting in efficient scaling and improved performance. Furthermore, the dynamic allocation of executors in Spark pools alleviates the need for manual executor configuration. Instead, the system automatically adjusts the number of executors depending on the data volume and job-level compute requirement thereby enabling you to focus on your workloads while the system takes care of performance optimization and resource management.

> [!NOTE]
> For creating a custom spark pool the user must have the admin access for the workspace,  the capacity admin should have enabled the **Customized workspace pools** option in the Spark Compute section of Capacity Admin settings. 
> Learn more about [Spark Compute Settings for Fabric Capacities](data-engineering-and-data-science-capacity-settings-management.md)

## Create Custom Spark Pools

To create or manage the Spark Pool associated with your workspace:

1. Go to the **Workspace settings** in your workspace:

   :::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\workspace-settings.png" alt-text="Screenshot showing where to select Workspace settings." lightbox="media\data-engineering-and-science-workspace-admin-settings\workspace-settings.png":::

2. Then, choose the **Data Engineering/Science** option to expand the menu:

   :::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu." lightbox="media\data-engineering-and-science-workspace-admin-settings\data-engineering-menu.png":::

3. Navigate to the **Spark Compute** option in your left-hand menu:

   :::image type="content" source="media/data-engineering-and-science-workspace-admin-settings/spark-compute-detail-view.png" alt-text="Screenshot showing Spark Settings detail view." lightbox="media\data-engineering-and-science-workspace-admin-settings\spark-compute-detail-view.png":::

4. Select the **New Pool** option in the pool selection drop-down menu and select the node family, and node size from the available sizes Small, Medium, Large, X-Large and XX-Large based on compute requirements for data engineering/science workloads. 

:::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\custom-pool-creation.png" alt-text="Screenshot showing custom pool creation options." lightbox="media\data-engineering-and-science-workspace-admin-settings\custom-pool-creation.png":::

5. You can even set the minimum node configuration for your custom pools to 1 as [!INCLUDE [product-name](../includes/product-name.md)] Spark provides restorable HA for clusters with single node, so users dont have to worry about job failures, loss of session during failures or about paying for larger compute for smaller spark jobs. 

6. You also have the option to enable or disable autoscaling for your custom Spark pools. When autoscaling is enabled, the pool will dynamically acquire new nodes up to the maximum node limit specified by the user, and then retire them after job execution. This feature ensures better performance by automatically adjusting resources based on the job requirements.You will only be able to size the number of nodes based on the number of Spark VCores purchased as part of the Fabric capacity SKU. 

:::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\custom-pool-auto-scale-and-da.png" alt-text="Screenshot showing custom pool creation options for autoscaling and dynamic allocation." lightbox="media\data-engineering-and-science-workspace-admin-settings\custom-pool-auto-scale-and-da.png":::

7. You can also choose to enable dynamic executor allocation for your Spark pool, which automatically determines the optimal number of executors within the user-specified maximum bound. This feature adjusts the number of executors based on data volume, resulting in improved performance and resource utilization.

8. These custom pools have a default auto-pause duration of 2 minutes after the session has been expired and the clusters are de-allocated once the auto-pause duration has been reached. 

9. You will be based on the number of nodes and for the duration for the spark session created using the custom spark pools.

## Next steps

>[!div class="nextstepaction"]
>Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).
>[Get Started with Data Engineering/Science Admin Settings for your Fabric Workspace](data-engineering-and-science-workspace-admin-settings.md)
