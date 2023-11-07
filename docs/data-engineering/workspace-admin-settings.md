---
title: Spark workspace administration settings in Microsoft Fabric
description: Learn about the workspace administration settings for Data Engineering and Science experiences such as Apache Spark Pools, high concurrency Mode, runtime version, Spark properties, and autologging.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.custom: build-2023
ms.date: 05/23/2023
---

# Spark workspace administration settings in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

When you create a workspace in Microsoft Fabric, a [starter pool](spark-compute.md#starter-pools) that is associated with that workspace is automatically created. With the simplified setup in Microsoft Fabric, there's no need to choose the node or machine sizes, as these options are handled for you behind the scenes. This configuration provides a faster (5-10 seconds) Spark session start experience for users to get started and run your Spark jobs in many common scenarios without having to worry about setting up the compute. For advanced scenarios with specific compute requirements, users can create a custom Spark pool and size the nodes based on their performance needs.

To make changes to the Spark settings in a workspace, you should have the admin role for that workspace. To learn more, see [Roles in workspaces](../get-started/roles-workspaces.md).

To manage the Spark settings for the pool associated with your workspace:

1. Go to the **Workspace settings** in your workspace and choose the **Data Engineering/Science** option to expand the menu:

   :::image type="content" source="media\workspace-admin-settings\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu.":::

1. You see the **Spark Compute** option in your left-hand menu:

1. Configure the four setting options you can change on this page: **Default pool for workspace**, **[Runtime version](./runtime.md)**, **Automatically track machine learning experiments and models** and **Spark properties**.

> [!NOTE]
> If you change the default pool to a custom Spark pool you may see longer session start (~3 minutes) in this case.

## Default pool for workspace

There are two options:

* **Starter Pool**: Prehydrated live clusters automatically created for your faster experience. These clusters are medium size. Currently, a starter pool with 10 nodes is provided for evaluation purposes.

* **Custom Spark Pool**: You can size the nodes, autoscale, and dynamically allocate executors based on your Spark job requirements. To create a custom Spark pool, the capacity admin should enable the **Customized workspace pools** option in the **Spark Compute** section of **Capacity Admin** settings. To learn more, see [Spark Compute Settings for Fabric Capacities](capacity-settings-management.md).

Admins can create custom Spark pools based on their compute requirements by selecting the **New Pool** option.

:::image type="content" source="media\workspace-admin-settings\custom-pool-creation.png" alt-text="Screenshot showing custom pool creation options.":::

Microsoft Fabric Spark supports single node clusters, which allows users to select a minimum node configuration of 1 in which case the driver and executor run in a single node. These single node clusters offer restorable high-availability in case of node failures and better job reliability for workloads with smaller compute requirements. You can also enable or disable autoscaling option for your custom Spark pools. When enabled with autoscale, the pool would acquire new nodes within the max node limit specified by the user and retire them after the job execution for better performance.

You can also select the option to dynamically allocate executors to pool automatically optimal number of executors within the max bound specified based on the data volume for better performance.

:::image type="content" source="media\workspace-admin-settings\custom-pool-auto-scale.png" alt-text="Screenshot showing custom pool creation options for autoscaling and dynamic allocation.":::

Learn more about [Spark Compute for Fabric](spark-compute.md).

## Runtime version

You may choose which version of Spark you'd like to use for the workspace. Currently, [Spark 3.3 version](./runtime-1-1.md) and [Spark 3.4](./runtime-1-2.md) versions are available. To [change the runtime version at the workspace level](./runtime.md), go to Workspace Settings > Data Engineering/Science > Spark Compute > Workspace Level Default, and select your desired runtime from the available options.

:::image type="content" source="media\workspace-admin-settings\runtime-version-1-2.png" alt-text="Screenshot showing where to select runtime version." lightbox="media\workspace-admin-settings\runtime-version-1-2.png":::

## Autologging for Machine Learning models and experiments

Admins can now enable autologging for their machine learning models and experiments. This option automatically captures the values of input parameters, output metrics, and output items of a machine learning model as it is being trained.

[Learn more about autologging](https://mlflow.org/docs/latest/tracking.html)

## Spark properties

Apache Spark has many settings you can provide to optimize the experience for your scenarios. You may set those properties through the UI by selecting the **Add** option. Select an item from the dropdown menu, and enter the value.

:::image type="content" source="media\workspace-admin-settings\spark-properties-add.png" alt-text="Screenshot showing where to select Add.":::

You can delete items by selecting the item(s) and then select the **Delete** button. Or select the delete icon next to each item you wish you to delete.

:::image type="content" source="media\workspace-admin-settings\spark-properties-delete.png" alt-text="Screenshot showing where to select Delete.":::

## Next steps
- Read about [Apache Spark Runtimes in Fabric - Overview, Versioning, Multiple Runtimes Support and Upgrading Delta Lake Protocol](./runtime.md)
* Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).
* Find answers to frequently asked questions: [Apache Spark workspace administration settings FAQ](spark-admin-settings-faq.yml).
