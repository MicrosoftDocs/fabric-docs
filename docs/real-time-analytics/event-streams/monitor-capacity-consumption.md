---
title: Monitor Microsoft Fabric event streams capacity consumption
description: Learn how to monitor capacity consumption for Microsoft Fabric event streams.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to 
ms.date: 04/24/2024
ms.search.form: Monitor event streams capacity consumption
---

# Monitor capacity consumption for Microsoft Fabric event streams

This article contains information on how Microsoft Fabric event streams usage is billed and reported. 

## Operation types
The event streams usage is defined by three operation types, which are described in the following table. The table provides information about event streams operations shown in the Fabric Capacity Metrics app and their Fabric consumption rates. For more information about the app, see [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md).
 

| Operation in Capacity Metrics App | Description | Operation unit of measure | Fabric consumption rate |
| --------------------------------- | ----------- | ------------------------- | ----------------------- |
| Eventstream Per Hour | Flat charge* | Per hour | 0.222 CU per hour |
| Eventstream Data Traffic per GB | Data ingress & egress volume <br/> (Includes 24-hour retention) | Per GB | 0.342 CU per hour per GB |
| Eventstream Processor Per Hour | Computing resources consumed by the processor | Per hour | 2.333 CU per hour |

*Eventstream per hour is charged if the eventstream isn't idle, that is, data is ingested for at least 2 hours. 

## Storage billing
Events retention in Fabric event streams is billed separately from your Fabric or Power BI premium capacity units.  

OneLake standard storage is standard storage that's used to persist and store all data. When you set the retention setting for more than 1 day (that is, 24 hours), you're charged as per OneLake standard storage. See details of OneLake storage/month price on the [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) page. 

## Monitor OneLake storage 

The [Microsoft Fabric Capacity Metric app](../enterprise/metrics-app.md) allows any capacity administrator to monitor OneLake Storage. Learn how to understand the Metrics app storage page in [Understand the metrics app storage](../enterprise/metrics-app-storage-page.md) page.

## Important considerations
Here are a few important points to consider:

- We recommend that you use the Microsoft Fabric event streams feature with at least four capacity units (SKU: F4).
- You're charged only when your eventstream is ingesting or processing data. Any eventstream that doesn't have data for more than 2 hours isn't charged.  

## Changes to Microsoft Fabric workload consumption rate 
Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft’s Release Notes or Microsoft Fabric Blog. If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, you can use the cancellation options available for the chosen payment method. 

## Capacity pause/resume 

Microsoft Fabric lets you pause and resume your capacity. When your capacity isn't operational, you can pause it to enable cost savings for your organization. Later, when you want to resume work on your capacity, you can reactivate it. What does it mean for an eventstream when a capacity is paused/resumed? 


 
| | Capacity gets paused | Capacity gets resumed |
| --- | -------------- | -------------- | 
| Active eventstream<br/>The eventstream is actively running | All nodes of the eventstream are paused. In 1-2 mins, data that’s being ingested is paused. <p>If your destination nodes are in a different capacity that wasn’t paused, then those destination nodes are also paused. | Input nodes start the data ingestion and data starts flowing in to the rest of the eventstream. |
| Inactive eventstream<br/>The eventstream is paused | No effect | No effect. The eventstream has to be resumed/activated manually. |



## Related content 

- [Install the Premium metrics app](/power-bi/enterprise/service-premium-install-app)
- [Use the Premium metrics app](/power-bi/enterprise/service-premium-metrics-app)
