---
# Required metadata
# For more information, see https://review.learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata?branch=main
# For valid values of ms.service, ms.prod, and ms.topic, see https://review.learn.microsoft.com/en-us/help/platform/metadata-taxonomies?branch=main

title: Surge Protection
description: Surge Protection helps limit overuse of your capacity by setting a limit on the total background compute consumption.
author:      LukaszPawlowski-MS # GitHub alias
ms.author:   lukaszp # Microsoft alias
ms.service: fabric
ms.topic: conceptual
ms.date:     11/18/2024
---

# Surge Protection (preview)

Surge Protection helps limit overuse of your capacity by limiting the amount of compute consumed by background jobs. This helps protect interactive jobs and helps the capacity recover faster if there's a period of throttling or rejections. You configure surge protection for each capacity. Surge protection helps prevent throttling and rejections but isn't a substitute for capacity optimization, scaling up, and scaling out. When the capacity reaches its compute limit, it'll experience interactive delays, interactive rejections, or all rejections even when surge protection is enabled.

### Prerequisites

You need to be a Fabric Capacity Administrator.

### Enabling surge protection

1. Open the Fabric Admin Portal.

1. Navigate to Capacity settings.

1. Select a capacity.

1. Expand Surge Protection.

1. Select Enable Surge Protection.

1. Set a Background Rejection threshold.

1. Set a Background Recovery threshold.

1. Select **Apply**.

### How monitor surge protection

1. Open the Microsoft Fabric Capacity Metrics app.

1. On the **Compute** page, select **System events**.

1. The System events table shows when surge protection became active and when the capacity returned to a not overloaded state.

### Surge Protection thresholds

Capacity admins set a _background rejection threshold_ and a _background recovery threshold_ when they enable surge protection. 


- The **Background Rejection threshold** determines when surge protection becomes active. The threshold applies to the 24-hour background percent for the capacity. When the threshold is reached or exceeded, surge protection becomes active. When surge protection is active, the capacity rejects new background jobs. When surge protection is not enabled, the 24-hour background percent is allowed to reach 100% before the capacity rejects new background jobs.



- The **Background Recovery threshold** determines when surge protection stops being active. This happens when the 24-hour background percent drops below the background recovery threshold. The capacity starts to accept new background requests. 


> [!NOTE]
> Capacity admins can see the 24-hour background percent in the _Capacity metrics app_ compute page under _Throttling_ on the _Background Throttling_ chart.  

### System events for Surge Protection

When surge protection is active, capacity state events are generated. These are displayed in the _System events_ table in the _Fabric Capacity metrics app_. Below are the state events relevant to surge protection. A complete list of capacity state events is available in [Understanding the Microsoft Fabric Capacity Metrics app compute page](/fabric/enterprise/metrics-app-compute-page)

|Capacity State|Capacity state change reason|When shown|
| -------- | -------- | -------- |
|Active|NotOverloaded||
|Overloaded|SurgeProtectionActive||
|Overloaded|InteractiveDelayAndSurgeProtectionActive||
|Overloaded|InteractiveRejectedAndSurgeProtectionActive||
|Overloaded|AllRejected||

> [!NOTE]
> When the capacity reaches its compute limit, it'll experience interactive delays, interactive rejections, or all rejections even when surge protection is enabled.

### Per operation status messages for surge protection

When surge protection is active, background requests are rejected. In Fabric capacity metrics app, these requests will appear with status Rejected or RejectedSurgeProtection. These status messages appear in the Fabric capacity metrics app timepoint page.  See [Understand the metrics app timepoint page](/fabric/enterprise/metrics-app-timepoint-page).

### Considerations and limitations

When Surge Protection is active, background jobs are rejected. This means there will still be broad impact across your capacity even when Surge Protection is enabled. By using Surge Protection, you're tuning your capacity to stay within a range of usage that you feel best balances compute needs within the capacity.  While Surge Protection is helpful, note that to fully protect critical solutions, it is recommended to isolate those in a correctly sized capacity. 

Surge protection does not guarantee that interactive requests will not be delayed or rejected. As a capacity admin, you'll need to use the capacity metrics app to review data in the throttling charts and then adjust the surge protection background rejection threshold as needed.

Some requests initiated from Fabric UI are billed as background request or depend on background requests to complete. These requests will still be rejected when surge protection is active.  

Surge Protection rejecSurge Protection does not stop in progress jobs. 

Background Rejection threshold is not an upper limit on 24-hours Background percentage. This is because in progress jobs may report usage 

### Related content

- [Understanding the Microsoft Fabric Capacity Metrics app compute page. ](/fabric/enterprise/metrics-app-compute-page)

- [Understand the metrics app timepoint page ](/fabric/enterprise/metrics-app-timepoint-page.)

