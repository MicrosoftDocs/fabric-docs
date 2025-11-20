---
title: Surge protection
description: Surge protection helps limit overuse of your capacity by setting a limit on the total background compute consumption.
author: JulCsc
ms.author: juliacawthra
ms.reviewer: pankar
ms.service: fabric
ms.topic: conceptual
ms.date: 11/18/2025
---

# Surge protection

Surge protection helps limit overuse of your capacity by limiting the amount of compute consumed by background jobs. You configure surge protection for each capacity, and also at workspace level. Surge protection helps prevent throttling and rejections but isn't a substitute for capacity optimization, scaling up, and scaling out. When the capacity reaches its compute limit, it experiences interactive delays, interactive rejections, or all rejections even when surge protection is enabled.  

## Prerequisites

You need to be an admin on the capacity.

## Surge protection thresholds (Capacity-level)

Capacity admins set a _background operations rejection threshold_ and a _background operations recovery threshold_ when they enable surge protection.

- The **Background operations rejection threshold** determines when surge protection becomes active. The threshold applies to the _24-hour background percentage_ for the capacity. When the threshold is reached or exceeded, surge protection becomes active. When surge protection is active, the capacity rejects new background operations. When surge protection isn't enabled, the _24-hour background percentage_ is allowed to reach 100% before the capacity rejects new background operations.
- The **Background operations recovery threshold** determines when surge protection stops being active. Surge protection stops being active when the _24-hour background percentage_ drops below the _background recovery threshold_. The capacity starts to accept new background operations.

> [!NOTE]
> Capacity admins can see the 24-hour background percent on the Microsoft Fabric Capacity Metrics app **Compute** page under _Throttling_ on the **Background rejection** chart.  

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

The **System events** table shows when surge protection became active and when the capacity returned to a _not overloaded_ state.

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
|Overloaded|AllRejected|Indicates the capacity exceeded the background rejection limit. Background and interactive operations are being rejected.|

> [!NOTE]
> When the capacity reaches its compute limit, it experiences interactive delays, interactive rejections, or all rejections even when surge protection is enabled.

## Per-operation status messages for surge protection

When surge protection is active, background requests are rejected. In the Fabric capacity metrics app, these requests appear with status _Rejected_ or _RejectedSurgeProtection_. These status messages appear in the Microsoft Fabric Capacity Metrics **Timepoint** page. For more information, see [Understand the metrics app timepoint page](metrics-app-timepoint-page.md).

## Considerations and limitations

- When surge protection is active, background jobs are rejected. This means there's still broad impact across your capacity even when surge protection is enabled. By using surge protection, you're tuning your capacity to stay within a specific range of usage. However, while surge protection is enabled, background operations might be rejected, and this can impact performance. To fully protect critical solutions, we recommend isolating them in a designated capacity.
- Surge protection doesn't guarantee that interactive requests aren't delayed or rejected. As a capacity admin, you need to use the Microsoft Fabric Capacity Metrics app to review data in the throttling charts and then adjust the surge protection background rejection threshold as needed.
- Some requests initiated from Fabric UI are billed as background operations or depend on background operations to complete. These requests are rejected when surge protection is active.
- Surge protection doesn't stop in progress jobs.
- _Background rejection threshold_ isn't an upper limit on _24-hours background percentage_. This is because in progress jobs continue to run and report additional usage.
- If you pause a capacity when it is in an overloaded state, the **System events** table in the Microsoft Fabric Capacity Metrics app may show an **Active NotOverloaded** event after the **Suspended** event. The capacity is still paused. The NotOverloaded event is generated due to a timing issue during the pause action.
- Surge protection doesn't block operations that are billed with Autoscale billing for Spark.

## Workspace-Level surge protection

Workspace-level surge protection extends capacity-based surge protection by letting you control surge behavior per workspace. You can set limits, exclude workspaces, or block them manually.

### Key capabilities

- **CU consumption limits per workspace:** Define compute unit (CU) consumption limits for individual workspaces within a capacity.
- **Per workspace-level configurations:** Configure surge protection settings for each workspace.
- **Workspace states:**
  - **Available:** Workspace follows the capacity-level surge protection rules.
  - **Mission Critical:** Workspace ignores all capacity-level surge protection rules (immune from blocking).
  - **Blocked:** Workspace is manually or automatically blocked for a specified period; rejecting all operation requests.

### Enable workspace-level surge protection

1. Go to **Admin Portal** → **Capacity settings** → Select **Fabric Capacity**.
1. Under **Surge protection**, enable automatic detection to monitor all workspaces and block those that exceed CU limits.
1. **Workspace consumption:** Toggle **ON/OFF**. When set to ON two new properties appear:
   - **Rejection Threshold**: CU limit for a single workspace.
   - **Block**: When CU consumption by a single workspace reaches the rejection threshold, that workspace is placed in a **Blocked** state and rejects new operation requests. You can block the workspace indefinitely or for a specified period (in hours).

### Manual workspace controls

- In the **Admin Portal**, under **Capacity settings**, select **Fabric Capacity**.
- In the **workspaces** table at the bottom, click the gear icon in the **Actions** column to access workspace settings.
- Workspaces can be in one of the following:

  - **Available:** Default state, subject to surge protection rules. It operates normally and is subject to background surge protection and consumption rules. And can be blocked if it exceeds limits. You can return it to available state to unblock it immediately.
  
  - **Mission Critical:** It's exempt from workspace consumption limits. This lets you ensure high-priority workspaces keep running while still blocking lower-priority ones when they exceed capacity.
  
  - **Blocked:** All interactive and background operations are rejected. Workspaces can be blocked manually by capacity admins or automatically by detection rules.

## Related content

- [Understanding the Microsoft Fabric Capacity Metrics app compute page](metrics-app-compute-page.md)
- [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
- [Fabric operations](fabric-operations.md)
