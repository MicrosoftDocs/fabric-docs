---
title: Data Engineering/Science workspace administration settings
description: Learn about the workspace administration settings for Data Engineering/Science workloads such as Apache Spark Pools, High Concurrency Mode, Runtime Version, Spark Properties and Autologging.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.date: 05/23/2023
---

# Data Engineering/Science workspace administration settings

[!INCLUDE [preview-note](../includes/preview-note.md)]

When you create a workspace in [!INCLUDE [product-name](../includes/product-name.md)], an [Starter Pool](spark-compute.md) that is associated with that workspace is automatically created. With the simplified setup in [!INCLUDE [product-name](../includes/product-name.md)], there's no need to choose the node or machine sizes, as this is handled for you behind the scenes. This configuration provides a faster (5-10 seconds) spark session start experience for users to get started and run your Spark jobs in many common scenarios without having to worry about setting up the compute. For advanced scenarios with specific compute requirements, users can create a custom spark pool and size the nodes based on their performance needs.

To make changes to the Spark settings in a workspace, you should have the admin role for that workspace. To learn more about the roles you can assign users in a workspace, see [Roles in workspaces](../get-started/roles-workspaces.md).

To manage the Spark settings for the pool associated with your workspace:

1. Go to the **Workspace settings** in your workspace:

   :::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\workspace-settings.png" alt-text="Screenshot showing where to select Workspace settings." lightbox="media\data-engineering-and-science-workspace-admin-settings\workspace-settings.png":::

1. Then, choose the **Data Engineering/Science** option to expand the menu:

   :::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu." lightbox="media\data-engineering-and-science-workspace-admin-settings\data-engineering-menu.png":::

1. You see the **Spark Compute** option in your left-hand menu:

   :::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\spark-compute-detail-view.png" alt-text="Screenshot showing Spark Settings detail view." lightbox="media\data-engineering-and-science-workspace-admin-settings\spark-compute-detail-view":::

1. You have five options you can change on this page: **Pool**, **Runtime version**, **High Concurrency mode for Fabric Spark**, **Auto-Logging for Machine Learning Experiments and Models** and **Spark properties**.

> [!NOTE]
> If you change the default pool to a custom spark pool you may see longer session start (~3 minutes) in this case.

## Default Pool for Workspace

There are two options, you could use the **Starter Pool** (which are prehydrated live clusters automatlically created for your faster experience, but are of Medium size) or create a **Custom Spark Pool** and size the nodes, autoscaling and dynamic allocation of executors based on your spark job requirements.

> [!NOTE]
> A starter pool with 10 nodes is provided for evaluation purposes. In the coming months, the starter pool will automatically be resized based on your purchased capacity size.

Admins can create custom spark pools based on their compute requirements by selecting the **New Pool** option.

:::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\custom-pool-creation.png" alt-text="Screenshot showing custom pool creation options." lightbox="media\data-engineering-and-science-workspace-admin-settings\custom-pool-creation.png":::

> [!NOTE]
> For creating a custom spark pool,  the capacity admin should have enabled the **Customized workspace pools** option in the Spark Compute section of Capacity Admin settings. 
> Learn more about [Spark Compute Settings for Fabric Capacities](data-engineering-and-data-science-capacity-settings-management.md)

[!INCLUDE [product-name](../includes/product-name.md)] spark supports Single node clusters, which allows users to select a min node configuration of 1 and with a max node of 2 thereby offering high-availability and better job reliability for smaller compute requirements. 

Users can also enable or disable autoscaling option for their custom spark pools. When enabled with autoscale, the pool would acquire new nodes within the max node limit specified by the user and retire them after the job execution for better performance. 

Users can also select the option to dynamically allocate executors to pool to automatically optimal number of executors within the max bound specificed by the user based on the data volume for better performance. 

:::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\custom-pool-auto-scale-and-da.png" alt-text="Screenshot showing custom pool creation options for autoscaling and dynamic allocation." lightbox="media\data-engineering-and-science-workspace-admin-settings\custom-pool-auto-scale-and-da.png":::


Learn more about [Spark Compute for Fabric](spark-compute.md).

## Runtime version

You may choose which version of Spark you’d like to use for the workspace. The only version of Spark that is currently available for use is Spark 3.2. You'll have additional options in the future.

:::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\runtime-version.png" alt-text="Screenshot showing where to select runtime version." lightbox="media\data-engineering-and-science-workspace-admin-settings\runtime-version.png":::

## High Concurrency

[!INCLUDE [product-name](../includes/product-name.md)] Spark supports session sharing through the High Concurrency mode, where multiple items could execute in parallel inside a single spark application within a user boundary. This shared mode can be enabled for notebooks to save session start time, achieve a better utilization rate and save on compute spend. 

## Autologging for Machine Learning Models and Experiments

Admins can now enable autologging for their machine learning models and experiments, which would automatically capture the values of input parameters, output metrics, and output artifacts of a machine learning model as it is being trained. 

[Learn more about autologging](https://mlflow.org/docs/latest/tracking.html)

## Spark Properties

Apache Spark has many settings you can provide to optimize the experience for your scenarios. You may set those properties through the UI by selecting the **Add** option. Select an item from the dropdown menu, and enter the value.

:::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\spark-properties-add.png" alt-text="Screenshot showing where to select Add." lightbox="media\data-engineering-and-science-workspace-admin-settings\spark-properties-add.png":::

You can delete items by selecting the item(s) and then select the **Delete** button, or simply select the delete icon after each item you wish you to delete.

:::image type="content" source="media\data-engineering-and-science-workspace-admin-settings\spark-properties-delete.png" alt-text="Screenshot showing where to select Delete." lightbox="media\data-engineering-and-science-workspace-admin-settings\spark-properties-delete.png":::


## Next steps

>[!div class="nextstepaction"]
>Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).




