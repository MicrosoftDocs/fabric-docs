---
title: Spark workspace administration settings in Microsoft Fabric
description: Learn about the workspace administration settings for Data Engineering and Science experiences such as Apache Spark Pools, high concurrency Mode, runtime version, Spark properties, and autologging.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Spark workspace administration settings in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

When you create a workspace in Microsoft Fabric, a [starter pool](spark-compute.md#starter-pools) that is associated with that workspace is automatically created. With the simplified setup in Microsoft Fabric, there's no need to choose the node or machine sizes, as these options are handled for you behind the scenes. This configuration provides a faster (5-10 seconds) Spark session start experience for users to get started and run your Spark jobs in many common scenarios without having to worry about setting up the compute. For advanced scenarios with specific compute requirements, users can create a custom Spark pool and size the nodes based on their performance needs.

To make changes to the Spark settings in a workspace, you should have the admin role for that workspace. To learn more, see [Roles in workspaces](../get-started/roles-workspaces.md).

To manage the Spark settings for the pool associated with your workspace:

1. Go to the **Workspace settings** in your workspace and choose the **Data Engineering/Science** option to expand the menu:

   :::image type="content" source="media/workspace-admin-settings/data-engineering-menu-inline.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu." lightbox="media/workspace-admin-settings/data-engineering-menu.png" :::

2. You see the **Spark Compute** option in your left-hand menu:

   :::image type="content" source="media/workspace-admin-settings/workspace-settings.gif" alt-text="Gif showing different sections of the spark compute in workspace settings.":::

   > [!NOTE]
   > If you change the default pool from Starter Pool to a Custom Spark pool you may see longer session start (~3 minutes).

## Pool

### Default pool for the workspace 
You can use the automatically created starter pool or create custom pools for the workspace.

* **Starter Pool**: Prehydrated live pools automatically created for your faster experience. These clusters are medium size. The starter pool is set to a default configuration based on the Fabric capacity SKU purchased. Admins can customize the max nodes and executors based on their Spark workload scale requirements.  To learn more, see [Configure Starter Pools](configure-starter-pools.md)

* **Custom Spark Pool**: You can size the nodes, autoscale, and dynamically allocate executors based on your Spark job requirements. To create a custom Spark pool, the capacity admin should enable the **Customized workspace pools** option in the **Spark Compute** section of **Capacity Admin** settings.
> [!NOTE]
> The capacity level control for Customized workspace pools is enabled by default.
To learn more, see [Spark Compute Settings for Fabric Capacities](capacity-settings-management.md).

Admins can create custom Spark pools based on their compute requirements by selecting the **New Pool** option.

:::image type="content" source="media/workspace-admin-settings/custom-pool-creation-inline.png" alt-text="Screenshot showing custom pool creation options." lightbox="media/workspace-admin-settings/custom-pool-creation.png":::

Microsoft Fabric Spark supports single node clusters, which allows users to select a minimum node configuration of 1 in which case the driver and executor run in a single node. These single node clusters offer restorable high-availability in case of node failures and better job reliability for workloads with smaller compute requirements. You can also enable or disable autoscaling option for your custom Spark pools. When enabled with autoscale, the pool would acquire new nodes within the max node limit specified by the user and retire them after the job execution for better performance.

You can also select the option to dynamically allocate executors to pool automatically optimal number of executors within the max bound specified based on the data volume for better performance.

:::image type="content" source="media/workspace-admin-settings/custom-pool-auto-scale-inline.png" alt-text="Screenshot showing custom pool creation options for autoscaling and dynamic allocation." lightbox="media/workspace-admin-settings/custom-pool-auto-scale.png":::

Learn more about [Spark Compute for Fabric](spark-compute.md).

* **Customize compute configuration for items**: As a workspace admin, you can allow users to adjust compute configurations (session level properties which include Driver/Executor Core, Driver/Executor Memory) for individual items such as notebooks, spark job definitions using Environment.

:::image type="content" source="media/workspace-admin-settings/customize-compute-items.png" alt-text="Screenshot showing switch to customize compute for items.":::

If the setting is turned off by the workspace admin, the Default pool and its compute configurations will be used for all environments in the workspace.

## Environment

Environment provides flexible configurations for running your Spark jobs (notebooks, spark job definitions). In an Environment you can configure compute properties, select different runtime, setup library package dependencies based on your workload requirements. 

In the environment tab, you have the option to set the default environment. You may choose which version of Spark you'd like to use for the workspace.

As a Fabric workspace admin, you can select an Environment as workspace default Environment.

You can also create a new one through the **Environment** dropdown.

:::image type="content" source="media/workspace-admin-settings/env-dropdown-ws-inline.png" alt-text="Environment creation through attachment dropdown in WS setting" lightbox="media/workspace-admin-settings/env-dropdown-ws.png":::

If you disable the option to have a default environment, you have the option to select the Fabric runtime version from the available runtime versions listed in the dropdown selection. 

:::image type="content" source="media/workspace-admin-settings/select-runtime-from-list-inline.png" alt-text="Screenshot showing where to select runtime version." lightbox="media/workspace-admin-settings/select-runtime-from-list.png":::

Learn more about [Spark runtimes](runtime.md)

## High concurrency

High concurrency mode allows users to share the same Spark sessions in Fabric Spark for data engineering and data science workloads. An item like a notebook uses a Spark session for its execution and when enabled allows users to share a single spark session across multiple notebooks. 

:::image type="content" source="media/workspace-admin-settings/high-concurrency-workspace-setting-new-inline.png" alt-text="Screenshot showing high concurrency settings page." lightbox="media/workspace-admin-settings/high-concurrency-workspace-setting-new.png":::

Learn more about [High Concurrency in Fabric Spark](high-concurrency-overview.md)

## Automatic logging for Machine Learning models and experiments

Admins can now enable autologging for their machine learning models and experiments. This option automatically captures the values of input parameters, output metrics, and output items of a machine learning model as it is being trained.
[Learn more about autologging](https://mlflow.org/docs/latest/tracking.html).

:::image type="content" source="media/workspace-admin-settings/automatic-log-settings-inline.png" alt-text="Screenshot showing autolog settings page." lightbox="media/workspace-admin-settings/automatic-log-settings.png":::

## Related content

* Read about [Apache Spark Runtimes in Fabric - Overview, Versioning, Multiple Runtimes Support and Upgrading Delta Lake Protocol](./runtime.md)
* Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).
* Find answers to frequently asked questions: [Apache Spark workspace administration settings FAQ](spark-admin-settings-faq.yml).
