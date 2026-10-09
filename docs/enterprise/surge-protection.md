---
title: Manage surge protection
description: Surge protection helps you cap background compute consumption to limit Fabric capacity overuse. Learn how to enable, tune, and monitor it.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: pankar
ms.topic: how-to
ai-usage: ai-assisted
ms.date: 09/23/2026
---

# Manage surge protection for Fabric capacities

Surge protection helps capacity admins keep resources available for interactive workloads by proactively limiting the compute that background operations consume. You can apply surge protection at two levels:

- **Capacity-level surge protection** rejects new background operations as a capacity approaches its configured usage threshold, before the capacity enters deep throttling.
- **Workspace-level surge protection (preview)** caps how much compute a single workspace can consume, so no one workspace monopolizes the capacity. Admins can also manage workspace availability, automatically or manually block excessive consumers, and unblock and forgive workspaces to restore operations and reset recorded consumption.

This article explains how to enable both levels, set thresholds, monitor surge events, and recover blocked workspaces.

## Prerequisites

- Admin access to the Fabric capacity you want to manage.

## Capacity-level surge protection

At the capacity level, you set thresholds that reject background operations before the capacity enters deep throttling. The following sections explain how the thresholds work and how to enable, monitor, and tune them.

### How capacity-level thresholds work

Capacity-level surge protection lets admins trigger background rejection earlier, preventing capacities from entering deep throttling states that require longer recovery times. Capacity admins set a _background operations rejection threshold_ and a _background operations recovery threshold_ when they enable surge protection.

- The **Background operations rejection threshold** determines when surge protection becomes active. Surge protection compares the threshold to the capacity's 24-hour background percentage, which represents the smoothed average committed utilization projected over the next 24 hours. When the 24-hour background percentage reaches or exceeds the threshold, surge protection becomes active and the capacity rejects new background operations. When you don't enable surge protection, the capacity allows the _24-hour background percentage_ to reach 100% before it rejects new background operations.
- The **Background operations recovery threshold** determines when surge protection stops being active. Surge protection stops being active when the _24-hour background percentage_ drops below the _background recovery threshold_ you set. At this point, the capacity starts to accept new background operations.

> [!NOTE]
> Capacity admins can see the 24-hour background percentage on the Microsoft Fabric Capacity Metrics app **Compute** page under _Throttling_ on the **Background rejection** chart. It's also available in [Real-Time hub capacity events](../real-time-hub/explore-fabric-capacity-overview-events.md).

### Enable capacity-level surge protection

Evaluate the capacity's usage patterns when you set the rejection and recovery thresholds. Use the Microsoft Fabric Capacity Metrics app to evaluate the usage. On the **Compute** page, review the data in the **Background rejection**, **Interactive rejection**, and **Utilization** charts.

Consider these example scenarios:

- The **Background rejection** chart shows an average background percentage of 50%. The chart has several peaks at 60% and 75%. The lowest point on the chart is 40%. The **Interactive rejection** chart shows it exceeded 100% at the same time as the **Background rejection** chart peaked at 75%. To protect interactive users, set a rejection threshold above 60% and below 75% as a starting point. Set a recovery threshold above 40% and below 60% as a starting point.
- The **Background rejection** chart shows an average background percentage of 35%, and it usually varies by no more than 5%. The **Interactive rejection** chart shows a peak value of 80%, which means that interactive rejections aren't occurring. Set a rejection threshold slightly above 40% and below 60% as a starting point. A lower value reduces the risk to interactive users from a surge in background operations. Setting the recovery threshold to 35% or even 40% is acceptable, because this value reflects the typical background usage, and the capacity operates well with this level of usage.
- The **Utilization** chart shows 80% or 90% of usage is from background operations; enabling surge protection background operation limits might not be helpful.

To enable surge protection, follow these steps:

1. Open the Fabric admin portal.
1. Go to **Capacity settings**.
1. Select the capacity.
1. Expand **Surge protection**.
1. Set **Background Operations** to **On**.
1. Set a **Rejection threshold**.
1. Set a **Recovery threshold**.
1. Select **Apply**.

### Monitor capacity-level surge protection

To monitor surge protection, follow these steps:

1. Open the **Microsoft Fabric Capacity Metrics** app.
1. On the **Compute** page, select **System events**.

The **System events** table shows when surge protection becomes active and when the capacity returns to a _not overloaded_ state. This information also appears in the **States** table within Real-Time hub capacity events.

#### Capacity state system events

When surge protection is active, capacity state events occur. The following table lists the state events relevant to surge protection. For a complete list of capacity state events, see [Understanding the Microsoft Fabric Capacity Metrics app compute page](metrics-app-compute-page.md).

| Capacity state | Capacity state change reason | When shown |
|--|--|--|
| Active | `NotOverloaded` | Indicates the capacity is below all throttling and surge protection thresholds. |
| Overloaded | `SurgeProtectionActive` | Indicates the capacity exceeds the configured surge protection threshold. The capacity is above the configured recovery threshold. The capacity rejects background operations. |
| Overloaded | `InteractiveDelayAndSurgeProtectionActive` | Indicates the capacity exceeds the interactive delay throttling limit and the configured surge protection threshold. The capacity is above the configured recovery threshold. The capacity rejects background operations. Interactive operations experience delays. |
| Overloaded | `InteractiveRejectedAndSurgeProtectionActive` | Indicates the capacity exceeds the interactive rejection throttling limit and the configured surge protection threshold. The capacity is above the configured recovery threshold. The capacity rejects background and interactive operations. |
| Overloaded | `AllRejected` | Indicates the capacity exceeds the standard background rejection limit. The capacity rejects background and interactive operations. |

> [!NOTE]
> When the capacity reaches its maximum compute limit, it experiences interactive delays, interactive rejections, or all rejections even when surge protection is enabled.

#### Per-operation status messages

When capacity-level surge protection is active, background requests are rejected. In the Microsoft Fabric Capacity Metrics app, these requests appear with status _Rejected_ or _RejectedSurgeProtection_. These status messages appear in the Microsoft Fabric Capacity Metrics **Timepoint** page. For more information, see [Understand the metrics app timepoint page](metrics-app-timepoint-page.md).

### Configure capacity surge protection notifications

Capacity notifications can alert recipients when surge protection or throttling state changes occur. When you enable these notifications, the service sends alerts when a capacity:

- Approaches or enters a throttled state.
- Activates surge protection and begins rejecting background operations.
- Recovers from surge protection or throttling.
- Returns to a healthy operating state.

Notifications identify the capacity, workspace, threshold, block reason, block start time, and expected recovery behavior.

To configure capacity surge protection notifications, follow the steps for the tool you use: the OneLake catalog or the Fabric admin portal.

# [OneLake catalog](#tab/onelake-catalog)

1. Open the OneLake catalog's **Govern** page.
1. Go to the **Capacities** page.
1. Select the capacity and expand the settings.
1. Expand **Capacity Notifications**.
1. To show a banner in a capacity while it's throttled or recovering, turn on **Display a banner to all users of the capacity**.
1. To send an email, select **Email capacity administrators contacts (preview)**, and enter one or more addresses under **Notifications Recipients**, separated by semicolons. An email is sent to capacity admins by default.
1. Select **Apply**.

# [Admin portal](#tab/admin-portal)

1. Open the Fabric admin portal.
1. Go to **Capacity settings**.
1. Select the capacity.
1. Expand **Throttling notifications**.
1. To show a banner to all users in a capacity while it's throttled or recovering, turn on **Display a banner to all users of the workspace**.
1. To send an email, select **Email capacity administrators contacts (preview)**, and enter one or more addresses under **Notifications Recipients**, separated by semicolons. By default, the capacity admins receive an email.
1. Select **Apply**.

---

### Considerations and limitations for capacity-level surge protection

- Fabric supports surge protection only for Fabric SKUs, not for other SKU types.
- When capacity-level surge protection is active, it rejects background jobs. This rejection means broad impact remains across your capacity even when surge protection is enabled. By using surge protection, you tune your capacity to stay within a specific range of usage. However, while surge protection is enabled, background operations might be rejected, which can impact performance. To fully protect critical solutions, isolate them in a designated capacity.
- Capacity-level surge protection doesn't guarantee that interactive requests aren't delayed or rejected. As a capacity admin, you need to use the Microsoft Fabric Capacity Metrics app to review data in the throttling charts and then adjust the surge protection background rejection threshold as needed.
- Some requests initiated from the Fabric UI are billed as background operations or depend on background operations to complete. Surge protection rejects these requests when it's active.
- Capacity-level surge protection doesn't stop in-progress jobs.
- _Background rejection threshold_ isn't an upper limit on _24-hour background percentage_, because in-progress jobs continue to run and report additional usage.
- If you pause a capacity when it's overloaded, the **System events** table in the Microsoft Fabric Capacity Metrics app might show an **Active NotOverloaded** event after the **Suspended** event. The capacity is still paused. A timing issue during the pause action generates the NotOverloaded event.
- Capacity-level surge protection doesn't block operations billed with autoscale.
- Certain operations, including OneLake activities, remain unaffected by capacity-level surge protection.

## Workspace-level surge protection (preview)

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

At the workspace level, you cap the compute that individual workspaces consume so that no single workspace exhausts the capacity. The following sections explain how it works and how to enable it, manage workspaces, configure notifications, and recover blocked workspaces.

### How workspace-level surge protection works

Workspace-level surge protection lets you set compute consumption limits for individual workspaces within your capacity. This protection ensures no single workspace monopolizes resources and leaves room for higher-priority workloads.

You can set automatic detection rules to limit capacity unit (CU) usage per workspace. You can also manually block problematic workspaces or exempt mission-critical workspaces from workspace-level surge protection.

Here are the key capabilities of workspace-level surge protection:

- **CU consumption limits per workspace:** Define maximum CU consumption limits per workspace within a capacity for a rolling 24-hour window. Set the workspace CU limit as a percentage threshold that applies to all workspaces in the capacity unless you mark a workspace as **Mission critical** or **Blocked**.
- **Per workspace configuration:** Set each workspace to one of three states: **Available**, **Mission critical**, or **Blocked**.

The following table summarizes each workspace state:

| Workspace state | Description | Subject to capacity-level surge protection? | Can be auto-blocked? | Typical use case |
|-----------------|-------------|---------------------------------------------|-----------------------|-------------------|
| **Available** | Default state; workspace follows capacity-level surge protection rules. | Yes | Yes | Standard workspaces that follow normal load-management rules. |
| **Mission critical** | High-priority workspace exempt from capacity-level surge protection rules. *Note: Overall capacity-level throttling still applies once the capacity reaches its CU limits.* | No | No | Important workloads that must continue running even during spikes. |
| **Blocked** | An admin or detection rule blocks the workspace manually or automatically; the workspace rejects all interactive and background operations. | N/A | N/A | Workspaces that exceeded CU limits or that an admin manually paused. |

### Enable workspace-level surge protection

Use the following steps to enable workspace-level surge protection:

1. Go to **OneLake catalog** > **Govern** > **Capacities**, and select the **Fabric Capacity**.
1. Under **Surge protection**, set automatic detection to monitor all workspaces in a capacity and block those that exceed CU limits.
1. **Workspace consumption:** Toggle it **On** or **Off**. When set to **On**, the following two properties appear:
   - **Rejection Threshold**: CU limit that a single workspace can consume. It represents a percentage of the total CU available to the capacity. For example, an F2 SKU provides 2 CU seconds per second, meaning 48 CU hours per day. A 5% rejection limit equals 2.4 CU hours per day.
   - **Block**: When CU consumption by a single workspace reaches the rejection threshold, that workspace enters a **Blocked** state and rejects new operation requests. You can block the workspace indefinitely or for a specified period (in hours).

   :::image type="content" source="media/surge-protection/surge-protection-settings.png" alt-text="Screenshot of the Surge protection settings panel with the Workspace consumption toggle, Rejection threshold, and Block duration options." lightbox="media/surge-protection/surge-protection-settings.png":::

### Manage workspace availability manually

To manually control a workspace, follow these steps:

1. In **OneLake catalog** > **Govern** > **Capacities**, select **Fabric Capacity**.
1. In the **Workspaces** table at the bottom, select the gear icon in the **Actions** column to open the workspace settings.
1. In the **Workspace settings** pane, under **Workspace availability**, select one of the following options as detailed previously in [How workspace-level surge protection works](#how-workspace-level-surge-protection-works):
   - **Available**
   - **Mission critical**
   - **Blocked**

   :::image type="content" source="media/surge-protection/workspace-actions.png" alt-text="Screenshot of the Workspaces table and the Workspace settings pane, showing the Workspace availability options Available, Mission critical, and Blocked." lightbox="media/surge-protection/workspace-actions.png":::

### Configure workspace-level surge protection notifications

Workspace-level surge protection tells you when a workspace is blocked or unblocked. You can show a banner to everyone who uses the workspace, send email to a list of recipients, or both.

When you enable workspace-level surge protection notifications, they send when a workspace is:

- Approaching its threshold.
- Automatically or manually blocked.
- Manually unblocked.
- Automatically recovered to the **Available** state.

Notifications identify the capacity, workspace, threshold, block reason, block start time, and expected recovery behavior.

To configure workspace-level surge protection notifications, follow the steps for the tool you use: the OneLake catalog or the Fabric admin portal.

# [OneLake catalog](#tab/onelake-catalog)

1. Open the OneLake catalog's **Govern** page.
1. Go to the **Capacities** page.
1. Select the capacity and expand the settings.
1. Expand **Capacity Notifications**.
1. To show a banner in a workspace while it's blocked, turn on **Display a banner to all users of the workspace**.
1. To send an email, select **Email workspace contacts (preview)**, and enter one or more addresses under **Notifications Recipients**, separated by semicolons. By default, the capacity admins receive an email.
1. Select **Apply**.

# [Admin portal](#tab/admin-portal)

1. Open the Fabric admin portal.
1. Go to **Capacity settings**.
1. Select the capacity.
1. Expand **Throttling notifications**.
1. To show a banner in a workspace while it's blocked or unblocked, turn on **Display a banner to all users of the workspace**.
1. To send an email, select **Email workspace contacts (preview)**, and enter one or more addresses under **Notifications Recipients**, separated by semicolons. By default, the capacity admins receive an email.
1. Select **Apply**.

---

### Recover or unblock a workspace

When Fabric blocks a workspace automatically, it reevaluates the workspace's rolling 24-hour consumption at a regular interval. The workspace becomes eligible to run supported new operations when the configured block duration expires, or when its consumption falls back within the configured threshold.

A capacity admin can also unblock a workspace manually.

1. Open the Fabric admin portal.
1. Go to **Capacity settings**.
1. Select the capacity.
1. Find the workspace in the **Workspaces** table.
1. Select **Unblock**.
1. Review the workspace consumption, and then confirm the action.

Marking a blocked workspace as **Mission critical** also unblocks it, because mission critical workspaces are exempt from workspace-level surge protection. This exemption doesn't protect the workspace from capacity-level throttling.

When you unblock a workspace manually, Fabric can also forgive consumption that the workspace already recorded. Forgiveness reduces the usage that counts toward the workspace's rolling 24-hour total, which makes it less likely that Fabric blocks the workspace again soon.

Unblocking lets supported new operations start. It doesn't cancel, restart, or change the billing of operations that were already in progress.

### Considerations and limitations for workspace-level surge protection

- Workspace-level surge protection currently doesn't apply to the following items:
  - Dataflow Gen1
  - Paginated reports
  - Scorecards
  - Graph model
  - Activator (you can't create new Activators, but existing ones might continue to work)
  - Dataflow Gen2 editing (refreshes are blocked)

- Workspace limit calculations exclude autoscale compute.
  
- Fabric checks usage against the limit every five minutes, so treat workspace limits as soft limits.

- If your workspace limit rules block a workspace, increasing the detection limits or deleting the rule doesn't unblock it. Change the limit first, and then unblock the workspace. For the available options, see [Recover or unblock a workspace](#recover-or-unblock-a-workspace).

- Mission-critical status doesn't override capacity-level surge protection.

- Workspace-level rules always evaluate compute usage over a rolling 24-hour window. The window doesn't reset after a block ends. After a block period (for example, four hours) ends, Fabric continues to evaluate the rule on the rolling 24-hour basis and can block the workspace again immediately.

## Related content

- [Understanding the Microsoft Fabric Capacity Metrics app compute page](metrics-app-compute-page.md)
- [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
- [Fabric operations](fabric-operations.md)
- [Explore Fabric capacity overview events in Fabric Real-Time hub](../real-time-hub/explore-fabric-capacity-overview-events.md)
