---
# Required metadata
# For more information, see https://review.learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata?branch=main
# For valid values of ms.service, ms.prod, and ms.topic, see https://review.learn.microsoft.com/en-us/help/platform/metadata-taxonomies?branch=main

title: Surge Protection
description: Surge Protection help you limit overuse of your capacity by setting a limit on the total background compute consumption.
author:      LukaszPawlowski-MS # GitHub alias
ms.author:   lukaszp # Microsoft alias
ms.service: fabric
ms.topic: conceptual
ms.date:     11/18/2024
---

# Surge Protection (preview)

Surge Protection helps limit overuse of your capacity by limiting the total amount of compute background jobs consume. This helps protect interactive jobs and helps the capacity recover faster if there is a period of throttling or rejections. You configure Surge Protection for each capacity. Surge Protection helps prevent throttling and rejections but is not a substitute for capacity optimization, scaling up, and scaling out. 

### Prerequisites

1. You need to be a Fabric Capacity Administrator

### Enabling surge protection

1. Open the Fabric Admin Portal

1. Navigate to Capacity settings

1. Select a capacity 

1. Expand Surge Protection

1. Check the box to enable Surge Protection

1. Set a Background Rejection threshold

1. Set a Background Recovery threshold

1. Press Apply

### How monitor surge protection

1. Open the Capacity Metrics app

1. On the Compute page, select System events 

1. The System events table shows row when surge protection became active and when the capacity returned to a not overloaded state

### System events for Surge Protection

When Surge Protection is active capacity state events are generated. These are displayed in the System events table in the Fabric Capacity metrics app. 

|Capacity State|Capacity state change reason|When shown|
| -------- | -------- | -------- |
|Active|NotOverloaded|The capacity is in an active state. The capacity has not exceeded any built-in limits for interactive delay, interactive rejection, and background rejection. The surge protection background rejection threshold has not been exceeded.|
|Overloaded|SurgeProtectionActive|The capacity is overloaded. The surge protection background rejection threshold has been exceeded. The capacity is rejecting background requests.|
|Overloaded|InteractiveDelayAndSurgeProtectionActive|The capacity is overloaded. The capacity exceeded the built-in interactive delay limit. Interactive requests are being throttled. The capacity also exceeded the surge protection background rejection threshold. The capacity is rejecting background requests.|
|Overloaded|InteractiveRejectedAndSurgeProtectionActive|The capacity is overloaded. The capacity exceeded the built-in interactive rejection limit. Interactive requests are being rejected. The capacity also exceeded the surge protection background rejection threshold. The capacity is rejecting background requests.|
|Overloaded|AllRejected|The capacity is overloaded. The capacity exceeded the built-in background rejection limit. The capacity is rejecting interactive and background requests.|

A complete list of capacity state events is available in Understanding the Microsoft Fabric Capacity Metrics app compute page. [https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-compute-page#system-events](/fabric/enterprise/metrics-app-compute-page)

### Per operation status messages for Surge protection

When surge protection is active, background requests are rejected. In Fabric capacity metrics app, these requests will appear with status Rejected or RejectedSurgeProtection. These status messages appear in the Fabric capacity metrics app timepoint page.  See Understand the metrics app timepoint page [https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-timepoint-page](/fabric/enterprise/metrics-app-timepoint-page).

### Considerations and Limitations

When Surge Protection is active, background jobs are rejected. This means there will still be broad impact across your capacity even when Surge Protection is enabled. By using Surge Protection, you're tuning your capacity to stay within a range of usage that you feel best balances compute needs within the capacity.  While Surge Protection is helpful, note that to fully protect critical solutions, it is recommended to isolate those in a correctly sized capacity. 

### Related content

[Understanding the Microsoft Fabric Capacity Metrics app compute page. https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-compute-page#system-events](Understanding the Microsoft Fabric Capacity Metrics app compute page. https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-compute-page#system-events)

[Understand the metrics app timepoint page https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-timepoint-page.](Understand the metrics app timepoint page https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-timepoint-page.)

