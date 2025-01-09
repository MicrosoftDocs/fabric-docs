---
# Required metadata
# For more information, see https://review.learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata?branch=main
# For valid values of ms.service, ms.prod, and ms.topic, see https://review.learn.microsoft.com/en-us/help/platform/metadata-taxonomies?branch=main

title: Surge Protection
description: Surge protection helps limit overuse of your capacity by setting a limit on the total background compute consumption.
author:      LukaszPawlowski-MS # GitHub alias
ms.author:   lukaszp # Microsoft alias
ms.service: fabric
ms.topic: conceptual
ms.date:     11/18/2024
---

# Surge protection (preview)

Surge protection helps limit overuse of your capacity by limiting the amount of compute consumed by background jobs. You configure surge protection for each capacity. Surge protection helps prevent throttling and rejections but isn't a substitute for capacity optimization, scaling up, and scaling out. When the capacity reaches its compute limit, it experiences interactive delays, interactive rejections, or all rejections even when surge protection is enabled.

## Prerequisites

You need to be an admin on the capacity.

## Surge protection thresholds

Capacity admins set a _background rejection threshold_ and a _background recovery threshold_ when they enable surge protection. 

- The **Background Rejection threshold** determines when surge protection becomes active. The threshold applies to the _24-hour background percentage_ for the capacity. When the threshold is reached or exceeded, surge protection becomes active. When surge protection is active, the capacity rejects new background operations. When surge protection isn't enabled, the _24-hour background percentage_ is allowed to reach 100% before the capacity rejects new background operations.
- The **Background Recovery threshold** determines when surge protection stops being active. Surge protection stops being active when the _24-hour background percentage_ drops below the _background recovery threshold_. The capacity starts to accept new background operations. 

> [!NOTE]
> Capacity admins can see the 24-hour background percent in the _Capacity metrics app_ compute page under _Throttling_ on the _Background Throttling_ chart.  

## Enabling surge protection
To enable surge protection, follow these steps:

1. Open the Fabric Admin Portal.

1. Navigate to **Capacity settings**.

1. Select a capacity.

1. Expand **Surge Protection**.

1. Select **Enable Surge Protection**.

1. Set a **Background Rejection threshold**.

1. Set a **Background Recovery threshold**.

1. Select **Apply**.

## How to monitor surge protection

1. Open the Microsoft Fabric Capacity Metrics app.

1. On the **Compute** page, select **System events**.

1. The _system events_ table shows when surge protection became active and when the capacity returned to a not overloaded state.

## System events for Surge Protection

When surge protection is active, capacity state events are generated. The _System events_ table in the _Fabric Capacity metrics app_ shows the events. Below are the state events relevant to surge protection. A complete list of capacity state events is available in [Understanding the Microsoft Fabric Capacity Metrics app compute page](/fabric/enterprise/metrics-app-compute-page).

|Capacity State|Capacity state change reason|When shown|
| -------- | -------- | -------- |
|Active|NotOverloaded|Indicates the capacity is below all throttling and surge protection thresholds.|
|Overloaded|SurgeProtectionActive|Indicates the capacity exceeded the configured surge protection threshold. The capacity is above the configured recovery threshold. Background operations are being rejected.|
|Overloaded|InteractiveDelayAndSurgeProtectionActive|Indicates the capacity exceeded the interactive delay throttling limit and the configured surge protection threshold. The capacity is above the configured recovery threshold. Background operations are being rejected. Interactive operations are experiencing delays.|
|Overloaded|InteractiveRejectedAndSurgeProtectionActive|Indicates the capacity exceeded the interactive rejection throttling limit and the configured surge protection threshold. The capacity is above the configured recovery threshold. Background and interactive operations are being rejected.|
|Overloaded|AllRejected|Indicates the capacity exceeded the background rejection limit. Background and interactive operations are being rejected.|

> [!NOTE]
> When the capacity reaches its compute limit, it experiences interactive delays, interactive rejections, or all rejections even when surge protection is enabled.

## Per operation status messages for surge protection

When surge protection is active, background requests are rejected. In the Fabric capacity metrics app, these requests appear with status _Rejected_ or _RejectedSurgeProtection_. These status messages appear in the Fabric capacity metrics app timepoint page. See [Understand the metrics app timepoint page](metrics-app-timepoint-page.md).

## Considerations and limitations

- When surge protection is active, background jobs are rejected. This means there's still broad impact across your capacity even when surge protection is enabled. By using surge protection, you're tuning your capacity to stay within a specific range of usage. However, while surge protection is enabled, background operations might be rejected, and this can impact performance. To fully protect critical solutions, we recommend isolating them in a designated capacity.

- Surge protection doesn't guarantee that interactive requests aren't delayed or rejected. As a capacity admin, you need to use the capacity metrics app to review data in the throttling charts and then adjust the surge protection background rejection threshold as needed.

- Some requests initiated from Fabric UI are billed as background operations or depend on background operations to complete. These requests are rejected when surge protection is active.  

- Surge protection doesn't stop in progress jobs. 

- _Background rejection threshold_ isn't an upper limit on _24-hours background percentage_. This is because in progress jobs continue to run and report additional usage. 

- If you pause a capacity when it is in an overloaded state, the system events table in the capacity metrics app may show an **Active NotOverloaded** event after the **Suspended** event. The capacity is still paused. The NotOverloaded event is generated due to a timing issue during the pause action.  

## Related content

- [Understanding the Microsoft Fabric Capacity Metrics app compute page](metrics-app-compute-page.md)

- [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)

- [Fabric operations](fabric-operations.md)
