---
title: Surge protection
description: Surge protection helps limit overuse of your capacity by setting a limit on the total background compute consumption.
author: JulCsc
ms.author: juliacawthra
ms.reviewer: pankar
ms.service: fabric
ms.topic: how-to
ms.date: 02/02/2026
---

# Surge protection

Surge protection allows capacity administrators to proactively throttle certain activities, ensuring sufficient resources remain available for other workloads to run efficiently.
 
Capacity level surge protection allows admins to engage background rejection sooner than the standard system limits, helping prevent capacities from entering deep throttling states. Workspace-level surge protection extends these capabilities by enabling the following:

* Set a maximum capacity unit (CU) spend per workspace, expressed as a percentage, within a rolling 24-hour window. This limit applies to all workspaces unless excluded by tagging them as *Mission Critical*.
* Exclude specific workspaces from workspace-level surge protection.
* Manually block a workspace.

## Prerequisites

You need to be an admin on the capacity.

## Capacity-level surge protection thresholds

Capacity-level surge protection enables admins to trigger background rejection earlier, preventing capacities from entering deep throttling states that require longer recovery times.  Capacity admins set a _background operations rejection threshold_ and a _background operations recovery threshold_ when they enable surge protection.

- The **Background operations rejection threshold** determines when surge protection becomes active. The threshold is compared to the capacity’s 24‑hour background percentage, representing the smoothed average committed utilization projected over the next 24 hours. When the threshold is reached or exceeded, surge protection becomes active. When surge protection is active, the capacity rejects new background operations. When surge protection isn't enabled, the _24-hour background percentage_ is allowed to reach 100% before the capacity rejects new background operations.
- The **Background operations recovery threshold** determines when surge protection stops being active. Surge protection stops being active when the _24-hour background percentage_ drops below the _background recovery threshold_ you set. At this point, the capacity starts to accept new background operations.

> [!NOTE]
> Capacity admins can see the 24-hour background percent on the Microsoft Fabric Capacity Metrics app **Compute** page under _Throttling_ on the **Background rejection** chart. It's also available in [Real-time Hub capacity events](../real-time-hub/explore-fabric-capacity-overview-events.md).  

## Enable surge protection for a capacity

To enable surge protection, follow these steps:

1. Open the Fabric Admin Portal.
1. Navigate to **Capacity settings**.
1. Select a capacity.
1. Expand **Surge protection**.
1. Set **Background Operations** to **On**.
1. Set a **Rejection threshold**.
1. Set a **Recovery threshold**.
1. Select **Apply**.

## Monitor surge protection

To monitor surge protection, follow these steps:

1. Open the **Microsoft Fabric Capacity Metrics** app.
1. On the **Compute** page, select **System events**.

The **System events** table shows when surge protection became active and when the capacity returned to a _not overloaded_ state. You can also find this information from the **States** table within Real Time Hub capacity events.
 
## Set the background operation rejection and recovery thresholds

Capacity admins need to evaluate the capacity's usage patterns when setting the rejection and recovery thresholds. Use the Microsoft Fabric Capacity Metrics app to evaluate the usage. On the **Compute** page, review the data in the **Background rejection**, **Interactive rejection**, and **Utilization** charts.

Example scenarios:

- The **Background rejection** chart shows an average background percentage of 50%. The chart has several peaks at 60% and 75%. The lowest point on the chart is 40%. The **Interactive rejection** chart shows it exceeded 100% at the same time as the **Background rejection** chart peaked at 75%. To protect interactive users, setting a rejection threshold above 60% and below 75% would be an initial starting point. A recovery threshold above 40% and below 60% would be an initial starting point.
- The **Background throttling** chart shows an average background percentage of 35%, and it usually varies by no more than 5%. The **Interactive rejection** chart shows a peak value of 80%, which means that interactive rejections aren't occurring. Setting a rejection threshold slightly above 40% and below 60% would be an initial starting point. Using a lower value would reduce the risk of impact to interactive users due to a surge in background operations. Setting the recovery threshold to 35% or even 40% is acceptable, because this value reflects the typical background utilization, and the capacity operates well with this level of usage.
- The **Utilization** chart shows 80% or 90% of usage is from background operations; enabling surge protection background operation limits may not be helpful.

## System events for surge protection

When surge protection is active, capacity state events are generated. The **System events** table in the Microsoft Fabric Capacity Metrics app shows the events. Below are the state events relevant to surge protection. A complete list of capacity state events is available in [Understanding the Microsoft Fabric Capacity Metrics app compute page](../enterprise/metrics-app-compute-page.md).

|Capacity state|Capacity state change reason|When shown|
| -------- | -------- | -------- |
|Active|NotOverloaded|Indicates the capacity is below all throttling and surge protection thresholds.|
|Overloaded|SurgeProtectionActive|Indicates the capacity exceeded the configured surge protection threshold. The capacity is above the configured recovery threshold. Background operations are being rejected.|
|Overloaded|InteractiveDelayAndSurgeProtectionActive|Indicates the capacity exceeded the interactive delay throttling limit and the configured surge protection threshold. The capacity is above the configured recovery threshold. Background operations are being rejected. Interactive operations are experiencing delays.|
|Overloaded|InteractiveRejectedAndSurgeProtectionActive|Indicates the capacity exceeded the interactive rejection throttling limit and the configured surge protection threshold. The capacity is above the configured recovery threshold. Background and interactive operations are being rejected.|
|Overloaded|AllRejected|Indicates the capacity exceeded the standard background rejection limit. Background and interactive operations are being rejected.|

> [!NOTE]
> When the capacity reaches its maximum compute limit, it experiences interactive delays, interactive rejections, or all rejections even when surge protection is enabled.

## Per-operation status messages for surge protection

When capacity-level surge protection is active, background requests are rejected. In the Fabric capacity metrics app, these requests appear with status _Rejected_ or _RejectedSurgeProtection_. These status messages appear in the Microsoft Fabric Capacity Metrics **Timepoint** page. For more information, see [Understand the metrics app timepoint page](metrics-app-timepoint-page.md).

## Considerations and limitations for capacity-level surge protection

- When capacity-level surge protection is active, background jobs are rejected. This means there's still broad impact across your capacity even when surge protection is enabled. By using surge protection, you're tuning your capacity to stay within a specific range of usage. However, while surge protection is enabled, background operations might be rejected, and this can impact performance. To fully protect critical solutions, we recommend isolating them in a designated capacity.
- Capacity-level surge protection doesn't guarantee that interactive requests aren't delayed or rejected. As a capacity admin, you need to use the Microsoft Fabric Capacity Metrics app to review data in the throttling charts and then adjust the surge protection background rejection threshold as needed.
- Some requests initiated from Fabric UI are billed as background operations or depend on background operations to complete. These requests are rejected when surge protection is active.
- Capacity-level surge protection doesn't stop in progress jobs.
- _Background rejection threshold_ isn't an upper limit on _24-hours background percentage_. This is because in progress jobs continue to run and report additional usage.
- If you pause a capacity when it is in an overloaded state, the **System events** table in the Microsoft Fabric Capacity Metrics app may show an **Active NotOverloaded** event after the **Suspended** event. The capacity is still paused. The NotOverloaded event is generated due to a timing issue during the pause action.
- Capacity-level surge protection doesn't block operations that are billed with Autoscale.
- Certain operations, including OneLake activities, remain unaffected by capacity-level surge protection.

## Workspace-level surge protection

Workspace-level surge protection lets you set compute consumption limits for individual workspaces within your capacity, ensuring no single workspace monopolizes resources and leaving headroom for higher-priority workloads.

It allows you to set automatic detection rules to limit CU usage per workspace. It also allows you to manually block problematic workspaces or exempt mission-critical ones from workspace-level surge protection.

### Key capabilities

Here are the key capabilities of workspace-level surge protection:

- **CU consumption limits per workspace:** Define maximum CU consumption limits per workspaces within a capacity for a rolling 24 hour window. The workspace CU limit is set as a percentage threshold that applies to all workspaces in the capacity unless a workspace is marked mission critical or blocked.
- **Per workspace-level configurations:** Configure surge protection settings for each workspace with one of the following states:
  - **Available:** Workspace follows the capacity-level surge protection rules.
  - **Mission Critical:** Workspace ignores all capacity-level surge protection rules (immune from blocking).
  - **Blocked:** Workspace is manually or automatically blocked for a specified period; rejecting all operation requests.

### Enable workspace-level surge protection

Use the following steps to enable workspace-level surge protection:

1. Go to **Admin Portal** → **Capacity settings** → Select the **Fabric Capacity**.
1. Under **Surge protection**, set automatic detection to monitor all workspaces in a capacity and block those that exceed CU limits.
1. **Workspace consumption:** Toggle **ON/OFF**. When set to **ON** the following two properties appear:
   - **Rejection Threshold**: CU limit that a single workspace can consume. It is represented as a percentage of the total CU available to the capacity. For example, an F2 SKU provides 2CU seconds per second, meaning 48CU hours per day. A 5% rejection limit would be equal to 2.4CU hours per day.
   - **Block**: When CU consumption by a single workspace reaches the rejection threshold, that workspace is placed in a **Blocked** state and rejects new operation requests. You can block the workspace indefinitely or for a specified period (in hours).

   :::image type="content" source="media\surge-protection\surge-protection-settings.png" alt-text="Screenshot of surge protection setting panel." lightbox="media\surge-protection\surge-protection-settings.png":::

### Manual workspace controls

- In the **Admin Portal**, under **Capacity settings**, select **Fabric Capacity**.
- In the **workspaces** table at the bottom, click the gear icon in the **Actions** column to access workspace settings.
  
  :::image type="content" source="media\surge-protection\workspace-actions.png" alt-text="Screenshot of workspace controls showing actions, status and admins." lightbox="media\surge-protection\workspace-actions.png":::
  
- Workspaces can be in one of the following 3 states:

  - **Available:** Default state, subject to surge protection rules. If a workspace is marked as *Available*, it is in its *default* state. It operates normally and is subject to background surge protection rules.
  
  - **Mission Critical:** Exempt from workspace consumption limits. This does not prevent throttling if capacity resources are exceeded - instead it overrides workspace level surge protection for this specific workspace.
  
  - **Blocked:** All interactive and background operations are rejected. Workspaces can be blocked manually by capacity admins or automatically by detection rules

The following table summarizes the functionality of each workspace state: 

| Workspace state | Description | Subject to capacity‑level surge protection? | Can be auto‑blocked? | Typical use case |
|-----------------|-------------|---------------------------------------------|-----------------------|-------------------|
| **Available** | Default state; workspace follows capacity‑level surge protection rules. | Yes | Yes | Standard workspaces that should follow normal load‑management rules. |
| **Mission critical** | High‑priority workspace exempt from capacity‑level surge protection rules. *Note: Overall capacity‑level throttling still applies once CU limits are reached.* | No | No | Important workloads that must continue running even during spikes. |
| **Blocked** | Workspace is manually or automatically blocked; all operations are rejected. | N/A | N/A | Workspaces that exceeded CU limits or were manually paused by an admin. |

## Notifications

Workspace-level surge protection lets you enable banner notifications that appear at the top of the workspace when it’s blocked. To configure this setting, navigate to your **Admin portal**, open **Capacity settings**. Under the **Notification** section, turn on **Display a banner to all users of the workspace**.

### Considerations and limitations for workspace-level surge protection
- Workspace-level surge protection currently doesn’t apply to the following items:
  - Dataflows Gen1
  - Paginated reports
  - Scorecards
  - Graph model
  - Activator (new Activators can’t be created but existing ones may continue to work)
  - Dataflow Gen 2 editing (refreshes will be blocked)

- Autoscale compute is excluded from workspace limit calculations for Spark jobs.
  
- Checks are made against the limit every 5 minutes, so workspace limits should be considered soft limits.

- If a workspace is blocked by your workspace limit rules and you wish to unblock it, use one of the following options:
  - Mark the workspace as mission critical, or
  - Wait for the block to expire naturally.

- If a workspace is blocked by automatic detection rules, increasing the detection limits or deleting the rule will not unblock a previously blocked workspace. To unblock, navigate to the capacity admin page and manually set the workspace to **Available** once the limit is changed.

- Mission-critical status does not override capacity-level surge protection.
 
- Workspace-level rules always evaluate compute usage over a rolling 24-hour window. The window doesn’t reset after a block ends. Once a block period (for example, 4 hours) completes, the rule continues to be evaluated on the rolling 24-hour basis and can be blocked again immediately.

## Related content

- [Understanding the Microsoft Fabric Capacity Metrics app compute page](metrics-app-compute-page.md)
- [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
- [Fabric operations](fabric-operations.md)
