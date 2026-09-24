---
title: Configure custom live pools in Microsoft Fabric
description: Learn how to create, configure, and manage custom live pools in Microsoft Fabric for fast notebook session startup.
ms.reviewer: saravi
ms.topic: how-to
ms.date: 08/24/2026
ai-usage: ai-assisted
---

# Configure custom live pools in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Custom live pools are prehydrated Spark clusters that provide near-instant session startup for notebooks in Fabric. This article shows how to create, configure, and manage custom live pools for optimal performance.

## Prerequisites

Before setting up custom live pools, ensure you have:

- Access to a Fabric workspace with a **paid Fabric SKU** (Fabric trial capacities aren't supported).
- **Admin** or **Member** role in the workspace.
- An active **Fabric capacity** assigned to your workspace.
- A published [Fabric environment](create-and-use-environment.md) to use for library configuration.
- An existing custom Spark pool. Only workspace admins can create custom Spark pools.

If you have the **Member** role, a workspace admin must turn on the existing **Customize compute configuration for items** workspace setting.

> [!IMPORTANT]
> Starter pools aren't supported for custom live pools. If your workspace uses a starter pool, you must create a custom Spark pool before configuring a custom live pool.

## Use the existing compute customization setting

Custom live pools use the existing **Customize compute configuration for items** workspace setting. They don't have a separate delegation setting. Before a workspace Member can create or update a custom live pool configuration, a workspace admin must turn on the existing setting:

1. Go to your Fabric workspace.
1. Select **Workspace settings** from the workspace home ribbon.
1. Expand **Data Engineering/Science** and select **Spark settings**.
1. Select the **Pool** tab.
1. Turn on **Customize compute configuration for items**.

   :::image type="content" source="media/workspace-admin-settings/customize-compute-items.png" alt-text="Screenshot showing the switch to customize compute configuration for items." lightbox="media/workspace-admin-settings/customize-compute-items.png":::

1. Select **Save**.

When this setting is on, Members can use a Fabric environment to select an existing custom Spark pool, adjust session-level driver cores, driver memory, executor cores, and executor memory, and create or update the live pool configuration. Members can then save and publish the environment.

This setting doesn't let Members create or manage custom Spark pools in workspace settings. A workspace admin must create the underlying custom Spark pool.

When **Customize compute configuration for items** is off, environments use the workspace default pool and its compute configuration. Members can't create or update a custom live pool configuration until a workspace admin turns on the setting.

For more information about this workspace control, see [Data Engineering workspace administration settings](workspace-admin-settings.md#pool).

## Create a custom pool for the live pool (Admin only)

This task requires the **Admin** workspace role. If a custom Spark pool already exists, workspace Members can skip this task and configure live pool compute on the existing pool.

1. Navigate to your Fabric workspace.
1. Select **Workspace settings** from the workspace home ribbon.
1. Expand **Data Engineering/Science** and select **Spark settings**.
1. Select the **Pool** tab.
1. From the **Default pool for workspace** dropdown, select **New Pool**.
1. Enter a name for the pool. This name is a unique identifier for the pool, such as `dev-team-pool` or `prod-daily-analytics`.
1. Select a **Node family** and **Node size** for your workload.
1. Select the **Autoscale** checkbox to enable autoscaling for the pool.


## Configure a live pool

Workspace Admins and Members can create or update a live pool configuration through the [environment](/fabric/data-engineering/create-and-use-environment) settings. For Members, a workspace admin must first enable **Customize compute configuration for items**. Members must select an existing custom Spark pool created by a workspace admin.

1. In your Fabric workspace, open the environment that you want to attach to a custom live pool.
1. In the left pane, select **Compute**.
1. Select the pool you created in the previous step from the dropdown.
1. Under **Live pool**, select the radio button to activate live pool compute for this environment.

   :::image type="content" source="media/custom-live-pools/live-pool-activate.png" alt-text="Screenshot showing the Live pool radio button enabled in the environment Compute settings." lightbox="media/custom-live-pools/live-pool-activate.png":::

1. Under **Live pool schedule**, select the radio button to turn it on. All custom live pools must have a schedule. Clusters are only kept hydrated during the scheduled window.
1. Specify the schedule settings:
   - Whether the schedule is recurring
   - Start and end day and time
   - Time zone
   - When to deactivate and reactivate the pool
   - Other settings as applicable
   
    > [!IMPORTANT]
    > Fabric uses standard Spark provisioning for activity outside the scheduled window, which has slower startup times. Clusters aren't kept warm outside the scheduled window.
    
    For scheduling tips, see [Schedule best practices](#schedule-best-practices).

1. Save the compute settings.
1. Select the **Publish** button in the top ribbon.

After you publish, the pool is active and Fabric begins hydrating clusters ahead of the next schedule period.

> [!NOTE]
> Publishing can take several minutes.
> 
> Any changes to the environment require re-publishing the environment and refreshing hydrated clusters.

### Understand the schedule window

The schedule defines the window when Fabric keeps clusters hydrated and can rehydrate clusters that it deactivated. It doesn't keep the live pool warm outside the configured window.

For example, consider a recurring schedule that runs every day from 8:00 AM through 5:00 PM:

- At 8:00 AM, the daily schedule window begins and Fabric starts or continues hydration.
- During the schedule window, an idle cluster can be deactivated after the configured idle timeout. Fabric can rehydrate a replacement according to the configured reactivation interval.
- At 5:00 PM, the schedule window ends. Fabric doesn't continue rehydrating clusters between 5:00 PM and 8:00 AM the next day.
- A notebook submitted outside the schedule window uses standard Spark provisioning and doesn't receive the live pool warm-start benefit.
- The same daily behavior repeats until the configured schedule end date.

The schedule start time doesn't guarantee that a cluster is already available at that exact time. Hydration takes time, especially after an environment update or when Fabric must provision a new cluster. If a scheduled notebook must start at 8:00 AM, start the live pool schedule 60-90 minutes earlier. Before the notebook run, use the **Monitoring hub** to confirm that **Available clusters** is greater than zero. An incoming notebook receives a warm session only when a compatible hydrated cluster is available.

## Monitor pool status

To check the status of your custom live pool:

1. In the Fabric portal, open the **Monitoring hub**.
1. Find the environment that you published and select the ellipsis (**...**) to open the context menu.
1. Select **View details**.

   :::image type="content" source="media/custom-live-pools/live-pool-monitor.png" alt-text="Screenshot showing the Live pool status in the Monitoring hub." lightbox="media/custom-live-pools/live-pool-monitor.png":::

1. In the right pane, expand **Live pool status** to view the current state of the pool.

The live pool status includes details such as:

- **Pool status**: For example, Active, Hydrating, Idle, or Stopped
- **Available clusters**: Number of clusters ready for notebook sessions
- **Busy clusters**: Number of clusters currently running sessions
- **Next schedule**: Upcoming activity window

## Best practices

To get the most out of custom live pools, consider the following best practices for configuration and management:

### Optimize for cost and performance

- **Align count with demand**: Set the max cluster count based on expected concurrent sessions. Over-provisioning increases costs.
- **Monitor utilization**: Regularly review pool metrics and adjust cluster count if necessary.
- **Scale schedules efficiently**: Avoid overlapping schedules across multiple pools unless necessary.
- **Leverage idle timeout**: Set appropriate idle timeouts to maintain a balance between resource availability and avoiding frequent cluster restarts.

### Cluster sizing

When configuring your pool, consider the following settings and recommendations:

- **Cluster size**: The number of executor instances for notebook sessions (range: 1-16).
- **Max cluster count**: The maximum number of clusters to keep hydrated. Set based on expected concurrent sessions.
- **Idle timeout**: How long an unused cluster stays allocated before Fabric terminates it.

| Workload type | Recommended size | Description |
|--|--|--|
| Exploratory analysis | 2-4 cores | Light workloads, quick data exploration |
| Medium compute | 8-12 cores | Daily reporting, medium-size datasets |
| Heavy compute | 14-16 cores | Large datasets, complex transformations |

### Manage library dependencies

- **Use environment grouping**: Pre-install common libraries in the environment rather than on-the-fly installation.
- **Environment versioning**: Updating an attached environment requires re-publishing and refreshing hydrated clusters.
- **Refresh hydrated clusters**: After environment changes, refresh the pool or wait for the next scheduled cycle to apply changes.

### Adapt to workload patterns

- **Monitor outside behavior**: Adjust idle timeouts based on actual usage patterns.
- **Share across sessions**: Consider sharing the same environment across multiple pools if you have consistent workload patterns to improve resource utilization.

### Schedule best practices

- **Align with workload patterns**: Schedule active times when your team runs interactive or scheduled notebooks.
- **Buffer time**: Start the schedule 60-90 minutes before the first expected notebook run to allow hydration to complete.
- **Verify availability**: Before a latency-sensitive scheduled run, confirm that the live pool has at least one available cluster in the **Monitoring hub**.
- **Consider time zones**: If your team spans multiple time zones, extend the schedule to cover required time ranges.

## Troubleshooting

Troubleshooting custom live pools involves checking pool status, environment health, and schedule configuration as outlined in the following scenarios:

### Pool remains not available

If the pool fails to activate or shows "Not Available" status:

- Check that Fabric capacity is active and currently assigned to the workspace
- Verify the attached environment is in a "Ready" state.
- Ensure the attached environment is published and doesn't have any errors.

### Hydration takes longer than expected

If hydration is slower than expected:

- Check environment dependencies and build status.
- Verify the environment is in a "Ready" state.
- Monitor pool details for more information.

### Sessions or notebooks fail to start

If notebook sessions fail to start even with an active pool:

- Check that the session is using the correct environment.
- Verify the pool is in "Available" status and fully hydrated.

### Live pool settings aren't available

If you can't create or update the live pool configuration:

- Verify that you have the **Admin** or **Member** workspace role.
- If you have the **Member** role, ask a workspace admin to enable **Customize compute configuration for items**.
- Verify that a workspace admin created a custom Spark pool that you can select in the environment.

## Related content

- [Custom live pools overview](custom-live-pools-overview.md)
- [Configure starter pools](configure-starter-pools.md)
- [Create custom Spark pools](create-custom-spark-pools.md)
- [Create and use an environment](create-and-use-environment.md)
