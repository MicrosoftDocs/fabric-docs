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

# Surge Protection

Surge Protection helps limit overuse of your capacity by limiting the total amount of compute background jobs consume. This helps protect interactive jobs and helps the capacity recover faster if there is a period of throttling or rejections. You configure Surge Protection for each capacity. Surge Protection helps prevent throttling and rejections but is not a substitute for capacity optimization, scaling up, and scaling out.   
  
How to configure surge Protection

1. Open the Fabric Admin Portal

1. Navigate to Capacities

1. Select a capacity 

1. Expand Surge Protection

1. Enable Surge Protection

1. Set a Background 

How to know if Surge Protection is active

1. Open the Capacity Metrics app

1. Go to the System Events table

1. Find Throttling Events

Considerations and Limitations

When Surge Protection is active, background jobs are rejected. This means there will still be broad impact across your capacity even when Surge Protection is enabled. By using Surge Protection, you're tuning your capacity to stay within a range of usage that you feel best balances compute needs within the capacity.  While Surge Protection is helpful, note that to fully protect critical solutions, it is recommended to isolate those in a correctly sized capacity. 
