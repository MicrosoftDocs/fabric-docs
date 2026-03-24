---
title: Compute Management in Fabric Environments
description: A Microsoft Fabric environment contains configurations that include Spark compute properties. Learn how to configure these properties in an environment.
ms.reviewer: saravi
ms.topic: how-to
ms.date: 03/25/2026
ms.search.form: Manage Spark compute in Environment
ai-usage: ai-assisted
---

# Spark compute configuration settings in Fabric environments

Microsoft Fabric Data Engineering and Data Science experiences operate on a fully managed Spark compute platform. By default, all Spark jobs in a workspace share the same pool and resource settings, but different workloads often have different requirements. A lightweight data transformation doesn't need the same driver memory as a large-scale machine learning job.

Fabric environments let you tailor Spark compute configuration per workload, so each notebook or Spark job definition can run with the right runtime version, pool, and driver/executor sizing without changing workspace-wide defaults.

## Configure workspace-level compute settings

Workspace admins control whether environment items can override the workspace default compute configuration. Keeping item-level customization disabled ensures consistent resource usage across the workspace. Enabling it gives members and contributors the flexibility to tune compute for individual workloads.

1. In your browser, go to your Fabric workspace in the [Fabric portal](https://app.fabric.microsoft.com/).

1. Select **Workspace settings**.

1. Select **Data Engineering/Science**, and then select **Spark settings**.

1. Select the **Pool** tab.

1. Turn the **Customize compute configurations for items** toggle to **On**.

   :::image type="content" source="media\environment-introduction\customize-compute-items.png" alt-text="Screenshot that shows the item-level compute customization option in the workspace settings." lightbox="media\environment-introduction\customize-compute-items.png":::

   When this toggle is on, members and contributors can change session-level compute configurations in a Fabric environment. When it's off, the **Compute** section in environment items is disabled and all Spark jobs use the workspace default pool.

1. Select **Save**.

## Configure compute in an environment

After a workspace admin enables item-level customization, you can configure compute settings inside an environment item. This includes choosing a Spark runtime, selecting a pool, and tuning driver and executor resources.

### Select a Spark runtime

1. Open your environment item.

1. On the **Home** tab, select the **Runtime** dropdown and choose a runtime version.

   :::image type="content" source="media\environment-introduction\select-runtime.png" alt-text="Screenshot showing how to select the runtime version for the environment." lightbox="media\environment-introduction\select-runtime.png":::

Each [Spark runtime](runtime.md) has its own default settings and preinstalled packages.

> [!IMPORTANT]
>
> - Runtime changes don't take effect until you save and publish the environment.
> - If existing libraries or compute settings aren't compatible with the selected runtime, publishing fails. Remove or update the incompatible settings, and then publish again.
> - For step-by-step publish instructions, see [Save and publish changes](create-and-use-environment.md#save-and-publish-changes).

### Select a pool and tune compute properties

1. Open the environment and go to the **Compute** section.

1. Under **Environment pool**, select the starter pool or a custom pool created by your workspace admin.

   :::image type="content" source="media\environment-introduction\environment-pool-selection.png" alt-text="Screenshot that shows where to select pools in the environment Compute section." lightbox="media\environment-introduction\environment-pool-selection.png":::

1. Use the dropdowns on the **Compute** page to configure session-level Spark properties for the selected pool. Available values depend on the node size of the pool. 

   :::image type="content" source="media\environment-introduction\env-cores-selection.png" alt-text="Screenshot that shows the compute property dropdowns in the environment Compute section." lightbox="media\environment-introduction\env-cores-selection.png":::

    Properties include:

   - **Spark driver cores** – Number of cores allocated to the Spark driver.
   - **Spark driver memory** – Amount of memory allocated to the Spark driver.
   - **Spark executor cores** – Number of cores allocated to each executor.
   - **Spark executor memory** – Amount of memory allocated to each executor.


For details about available pool sizes and resource limits, see [Spark compute in Fabric](spark-compute.md).

> [!NOTE]
> Spark properties set through `spark.conf.set` control application-level parameters and aren't related to the environment compute settings described here.

## Related content

- [Create, configure, and use an environment in Fabric](create-and-use-environment.md)
- [Apache Spark runtime in Fabric](runtime.md)
- [Spark compute in Fabric](spark-compute.md)
