---
title: Understand Autoscale compute for Spark detail page
description: Learn how to read the Microsoft Fabric Capacity Metrics app's explore page.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date:
no-loc: [Copilot]
---
 
# Understand Autoscale compute for Spark detail page
 
Autoscale operations in your capacity are ranked according to their compute impact. The compute impact of all your capacity operations is your capacity usage, and it's measured using capacity units (CUs). Use this page to understand which autoscale operations contributed to your capacity's usage.
 
## Top row visuals
 
This section describes the operations of the visuals in the top row of the timepoint page.
 
* **Start/end card** - Displays the start and end date and time (timepoint) used to get to this page.
 
* **Heartbeat line chart** - Shows a 60-minute window of CU activity. Use this visual to establish the duration of peaks and troughs.
 
    * *Vertical light green line* - The timepoint you currently viewed. The visual shows the 30 minutes of CU activity leading to the selected timepoint, and the 30 minutes of CU activity after the selected timepoint.
 
    * *Green* - Spark operations CU consumption.
 
* **CU (s) usage card** - The total number of CU seconds for this capacity, for a given one-minute timepoint window.
 
* **Total operations card** - The total number of operations that contributed to the CU's activity during this timepoint.
 
 
## Operations for timerange
 
A table showing capacity usage in CUs for Spark operations in the viewed timepoint. The table displays the top 100,000 records based on CU consumption.
 
* **Workspace** - The workspace the item belongs to.
 
* **Item kind** - The type of the item.
 
* **Item name** - The name of the item.
 
* **Operation** - The type of operation.
 
* **Start** - The starting time of the operation.
 
* **Status** - An indication showing if the operation succeeded, failed, or is in progress. Canceled operations are reported as failed operations.
 
* **User** - The name of the user that triggered the operation.
 
* **Timepoint CU (s)** - The number of CU seconds assigned to the operation in the current timepoint.
 
* **Maximum CU limit** - Displays workload autoscale limits for the operation.
 
* **Billing type** - Displays information if the item is billable or not.
 
    * **Billable** - Indicates that operations for this item are billable.
 
    * **Non-Billable**  - Indicates that operations for this item are non-billable.
 
* **Operation ID** - A unique identifier assigned to an individual operation.
 
 
## Related content
 
* [Understand the metrics app Autoscale compute for Spark page](metrics-app-autoscale-page.md)
* [Understand the metrics app compute page?](metrics-app-compute-page.md)