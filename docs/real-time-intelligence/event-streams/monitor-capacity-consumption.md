---
title: Monitor Microsoft Fabric event streams capacity consumption
description: Learn how to monitor capacity consumption for Microsoft Fabric event streams.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to 
ms.date: 11/10/2023
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

## Important considerations
Here are a few important points to consider:

- We recommend that you use the Microsoft Fabric event streams feature with at least 4 capacity units (SKU: F4).
- You're charged only when your eventstream is ingesting or processing data. Any eventstream that doesn't have data for more than 2 hours isn't be charged.  
- Data retention is available for 24 hours. After 24 hours, your data isn't retained. 

## Changes to Microsoft Fabric workload consumption rate 
Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft’s Release Notes or Microsoft Fabric Blog. If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, you can use the cancellation options available for the chosen payment method. 

## Related content 

- [Install the Premium metrics app](/power-bi/enterprise/service-premium-install-app)
- [Use the Premium metrics app](/power-bi/enterprise/service-premium-metrics-app)
