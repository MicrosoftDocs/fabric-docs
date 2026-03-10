---
title: Configure Custom Live Pools in Fabric Data Engineering
description: Learn how to create and configure Custom Live Pools in Microsoft Fabric to enable fast, pre-warmed Spark session startup for your notebook workloads.
ms.reviewer: saravi
ms.topic: how-to
ms.date: 03/09/2026
ai-usage: ai-assisted
---

# Configure Custom Live Pools in Microsoft Fabric

Custom Live Pools provide near-instant Spark session startup (~5 seconds) for notebook workloads in Microsoft Fabric by keeping pre-warmed clusters ready during a user-defined schedule window.

This article explains how to create, configure, and manage a Custom Live Pool in your Fabric workspace.

For a conceptual overview of how Custom Live Pools work and when to use them, see [Custom Live Pools in Microsoft Fabric overview](custom-live-pools-overview.md).

## Prerequisites

Before you can create or configure a Custom Live Pool:

- You need the **Admin** role in the workspace.
- Your workspace must be assigned to a paid Fabric capacity SKU. Fabric Trial capacities are not supported.
- A capacity admin must enable **Customized workspace pools** in **Spark Compute** settings for the capacity.

For more information, see [Configure and manage data engineering and data science settings for Fabric capacities](capacity-settings-management.md).

## Create a Custom Live Pool

To create a Custom Live Pool for your workspace:

1. Go to your workspace and select **Workspace settings**.

   :::image type="content" source="media\configure-starter-pools\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu." lightbox="media\configure-starter-pools\data-engineering-menu.png":::

1. Expand **Data Engineering/Science** in the left pane and then select **Spark settings**.

1. Select **New Pool** from the **Default pool for workspace** dropdown.

1. On the **Create new pool** page, enter a name for the pool.

1. Select **Custom Live Pool** as the pool type.

1. Configure the **Maximum number of clusters** to define the pool capacity. This value determines how many pre-warmed clusters Fabric maintains during the scheduled window.

   > [!NOTE]
   > Fabric does not automatically grow or shrink the pool beyond the configured maximum. All scheduling and job admittance is governed by this value.

1. Select the **Environment** to attach to the pool. The Environment determines which libraries are pre-installed on hydrated clusters.

   If you don't have an Environment, see [Create and use an environment in Microsoft Fabric](create-and-use-environment.md).

1. Select **Create**.

After the pool is created, configure a schedule before publishing.

## Configure a schedule

Every Custom Live Pool must have a schedule. The pool is active and keeps clusters hydrated **only during the configured schedule window**.

To configure a schedule:

1. In **Workspace settings**, under **Spark settings**, select the Custom Live Pool you created.

1. Select the **Schedule** tab.

1. Set the **Start time** and **End time** for the active window during which clusters should be kept warm.

1. Select the days of the week the schedule applies to.

1. Select **Save** to apply the schedule.

> [!IMPORTANT]
> Without an active schedule, the pool will not hydrate clusters, and sessions will not benefit from fast startup times.

## Publish the pool

After configuring the pool and schedule, you must publish the pool for changes to take effect:

1. In **Workspace settings**, select the Custom Live Pool.

1. Review your configuration, then select **Publish**.

Fabric begins hydrating clusters according to the schedule. After hydration completes, notebook sessions that use this pool start in approximately 5 seconds.

> [!NOTE]
> The initial hydration process takes time after first publishing or after any configuration change. Sessions during this period may experience standard cluster provisioning times.

## Set the pool as the default for your workspace

To route all workspace notebook sessions through the Custom Live Pool:

1. In **Workspace settings**, select **Spark settings**.

1. In the **Default pool for workspace** dropdown, select the Custom Live Pool you created.

1. Select **Save**.

After saving, all new notebook sessions in the workspace use the Custom Live Pool when it is within the active schedule window.

## Update library configuration

Libraries on a Custom Live Pool are managed through the attached **Environment** artifact. To update libraries:

1. Open the attached Environment artifact.

1. Add, remove, or update the libraries as needed.

1. Select **Publish** in the Environment to apply changes.

1. Return to **Workspace settings** and select the Custom Live Pool.

1. Trigger a pool refresh to hydrate clusters with the updated Environment.

> [!NOTE]
> Existing hydrated clusters are not automatically refreshed when you publish a new version of the attached Environment. A pool refresh or the next scheduled hydration window is required for clusters to pick up library changes.

## Manage access for guest users

B2B guest users require explicit workspace role assignment to interact with Custom Live Pools:

| Role | Permissions |
|--|--|
| Viewer | Read-only access to pool status and configuration |
| Admin | Full configuration, save, and publish permissions |

To assign workspace roles, see [Roles in workspaces in Microsoft Fabric](/fabric/get-started/roles-workspaces).

## Limitations

Keep the following constraints in mind when working with Custom Live Pools:

- **Spark Job Definitions** are not supported. Only notebook-based sessions (interactive, scheduled, and pipeline-triggered) can use Custom Live Pools.
- **Fabric Trial capacities** are not supported.
- **CI/CD and public APIs** cannot be used to create, update, or manage Custom Live Pool configurations. Use the Fabric UI for all configuration tasks.
- **Library updates** require re-publishing the Environment and a pool refresh. Existing hydrated clusters are not updated automatically.

## Related content

- [Custom Live Pools in Microsoft Fabric overview](custom-live-pools-overview.md)
- [Create and use an environment in Microsoft Fabric](create-and-use-environment.md)
- [Configure starter pools in Microsoft Fabric](configure-starter-pools.md)
- [Create custom Spark pools in Microsoft Fabric](create-custom-spark-pools.md)
- [Configure and manage data engineering and data science settings for Fabric capacities](capacity-settings-management.md)
