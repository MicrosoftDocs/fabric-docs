---
title: Spark workspace administration settings in Microsoft Fabric
description: Learn about the workspace administration settings for Data Engineering and Science workloads such as Apache Spark Pools, high concurrency Mode, runtime version, Spark properties, and auto-logging.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.date: 05/23/2023
---

# Spark workspace administration settings in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-and-ds.md)]

When you create a workspace in Microsoft Fabric, a [Starter Pool](spark-compute.md) that is associated with that workspace is automatically created. With the simplified setup in Microsoft Fabric, there's no need to choose the node or machine sizes, as this is handled for you behind the scenes. This configuration provides a faster (5-10 seconds) spark session start experience for users to get started and run your Spark jobs in many common scenarios without having to worry about setting up the compute. For advanced scenarios with specific compute requirements, users can create a custom spark pool and size the nodes based on their performance needs.

[!INCLUDE [preview-note](../includes/preview-note.md)]

To make changes to the Spark settings in a workspace, you should have the admin role for that workspace. To learn more, see [Roles in workspaces](../get-started/roles-workspaces.md).

To manage the Spark settings for the pool associated with your workspace:

1. Go to the **Workspace settings** in your workspace and choose the **Data Engineering/Science** option to expand the menu:

   :::image type="content" source="media\workspace-admin-settings\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu.":::

1. You see the **Spark Compute** option in your left-hand menu:

   :::image type="content" source="media/workspace-admin-settings/spark-compute-detail-view.png" alt-text="Screenshot showing Spark Settings detail view.":::

1. Configure the five options you can change on this page: **Default pool for workspace**, **Runtime version**, **High concurrency**, **Automatically track machine learning experiments and models** and **Spark properties**.

> [!NOTE]
> If you change the default pool to a custom spark pool you may see longer session start (~3 minutes) in this case.

## Default pool for workspace

There are two options:

* **Starter Pool**: Prehydrated live clusters automatically created for your faster experience. These are medium size. Currently, a starter pool with 10 nodes is provided for evaluation purposes.

* **Custom Spark Pool**: You can size the nodes, autoscale, and dynamically allocate executors based on your spark job requirements. To create a custom spark pool, the capacity admin should enable the **Customized workspace pools** option in the **Spark Compute** section of **Capacity Admin** settings. To learn more, see [Spark Compute Settings for Fabric Capacities](capacity-settings-management.md).

Admins can create custom spark pools based on their compute requirements by selecting the **New Pool** option.

:::image type="content" source="media\workspace-admin-settings\custom-pool-creation.png" alt-text="Screenshot showing custom pool creation options.":::

Microsoft Fabric spark supports single node clusters, which allows users to select a minimum node configuration of 1 and a maximum of 2. Thereby offering high-availability and better job reliability for smaller compute requirements. You can also enable or disable autoscaling option for your custom spark pools. When enabled with autoscale, the pool would acquire new nodes within the max node limit specified by the user and retire them after the job execution for better performance.

You can also select the option to dynamically allocate executors to pool automatically optimal number of executors within the max bound specified based on the data volume for better performance.

:::image type="content" source="media\workspace-admin-settings\custom-pool-auto-scale-and-da.png" alt-text="Screenshot showing custom pool creation options for autoscaling and dynamic allocation.":::

Learn more about [Spark Compute for Fabric](spark-compute.md).

## Runtime version

You may choose which version of Spark you'd like to use for the workspace. Currently, Spark 3.2 version is available.

:::image type="content" source="media\workspace-admin-settings\runtime-version.png" alt-text="Screenshot showing where to select runtime version." lightbox="media\workspace-admin-settings\runtime-version.png":::

## High concurrency

Microsoft Fabric Spark supports session sharing through the High Concurrency mode, where multiple items could execute in parallel inside a single spark application within a user boundary. This shared mode can be enabled for notebooks to save session start time, achieve a better utilization rate and save on compute spend.

## Autologging for Machine Learning models and experiments

Admins can now enable autologging for their machine learning models and experiments. This option will automatically capture the values of input parameters, output metrics, and output artifacts of a machine learning model as it is being trained.

[Learn more about autologging](https://mlflow.org/docs/latest/tracking.html)

## Spark properties

Apache Spark has many settings you can provide to optimize the experience for your scenarios. You may set those properties through the UI by selecting the **Add** option. Select an item from the dropdown menu, and enter the value.

:::image type="content" source="media\workspace-admin-settings\spark-properties-add.png" alt-text="Screenshot showing where to select Add.":::

You can delete items by selecting the item(s) and then select the **Delete** button. Or select the delete icon next to each item you wish you to delete.

:::image type="content" source="media\workspace-admin-settings\spark-properties-delete.png" alt-text="Screenshot showing where to select Delete.":::

## Next steps

* Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).