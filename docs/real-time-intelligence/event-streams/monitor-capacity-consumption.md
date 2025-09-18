---
title: Microsoft Fabric Eventstreams Capacity Consumption
description: Learn how to monitor capacity consumption for Microsoft Fabric eventstreams.
author: xujxu
ms.author: xujiang1
ms.topic: concept-article 
ms.date: 10/29/2024
ms.search.form: Monitor eventstreams capacity consumption
---

# Capacity consumption for Microsoft Fabric eventstreams

This article contains information on how usage of Microsoft Fabric eventstreams is billed and reported.

## Operation types

Four operation types define eventstream usage. The following table provides information about eventstream operations shown in the [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md) and their Fabric consumption rates.

| Operation in Capacity Metrics app | Description | Operation unit of measure | Fabric consumption rate |
| --------------------------------- | ----------- | ------------------------- | ----------------------- |
| **Eventstream Per Hour** <sup>1</sup> | Flat charge | Per hour | 0.222 capacity unit (CU) hours |
| **Eventstream Data Traffic Per GB** | Data ingress and egress volume in default and derived streams <br/> (includes 24-hour retention) | Per gigabyte | 0.342 CU hours |
| **Eventstream Processor Per Hour** | Computing resources that the processor consumes | Per hour | Starts at 0.778 CU hours and autoscales <sup>2</sup> per throughput |
| **Eventstream Connectors Per vCore Hour** | Computing resources that the connectors consume | Per hour | 0.611 CU hours per vCore <sup>3</sup> |

<sup>1</sup> **Eventstream Per Hour** is charged only when it's active (that is, events are flowing in or out). If no traffic flowed in or out for the past two hours, no charges apply.

<sup>2</sup> For **Eventstream Processor Per Hour**, the CU consumption rate of the eventstream processor is correlated to the throughput of event traffic, the complexity of the event processing logic, and the partition count of input data:

- With **Low** set in **Event throughput setting**, the processor's CU consumption rate starts at 1/3 base rate (0.778 CU hours) and autoscales within 2/3 base rate (1.555 CU hours), 1 base rate (2.333 CU hours), 2 base rates, and 4 base rates.
- With **Medium** set in **Event throughput setting**, the processor's CU consumption rate starts at 1 base rate and autoscales within multiple possible base rates.
- With **High** set in **Event throughput setting**, the processor's CU consumption rate starts at 2 base rates and autoscales within multiple possible base rates.

<sup>3</sup> For **Eventstream Connectors Per vCore Hour**:

- The CU consumption of the eventstream connector is for charging computing resources when pulling real-time data from sources. It excludes Azure Event Hubs, Azure IoT Hub, and custom endpoints. Data from Azure Event Hubs and Azure IoT Hub is pulled via the eventstream processor.
- Connector CU consumption is designed to correlate with throughput. When throughput increases, the number of vCores increases (autoscales). Increased vCores result in higher CU consumption. Currently, connector autoscaling is unavailable, so only one vCore is used per connector source.

## Storage billing

Retention of events in Fabric eventstreams is billed separately from your Fabric or Power BI premium capacity units.  

*OneLake storage* is standard storage that's used to persist and store all data. When you set the retention setting for more than one day (that is, 24 hours), you're charged according to OneLake storage. See details of OneLake storage per month on the [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) page.

## Monitoring OneLake storage

The [Microsoft Fabric Capacity Metric app](../../enterprise/metrics-app.md) allows any capacity administrator to monitor OneLake storage. For more information, see [Understand the metrics app storage page](../../enterprise/metrics-app-storage-page.md).

## Important considerations

- Microsoft Fabric eventstreams can operate with the smallest *F* capacity. However, you might need additional capacity units if you use other Fabric items as destinations.
- Eventstream flat, data traffic, and processor operations are billed only when data is being ingested or processed. If no data flows in or out for more than two hours, these operations don't incur charges.

## Changes to the Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or in-product notifications. 

Changes are effective on the date stated in Microsoft release notes or the Microsoft Fabric blog. If any change to a Microsoft Fabric workload consumption rate materially increases the capacity units required to use a particular workload, you can use the cancellation options available for the chosen payment method.

## Ability to pause and resume capacity

You can pause and resume your capacity in Microsoft Fabric. When your capacity isn't operational, you can pause it to save costs for your organization. Later, when you want to resume work on your capacity, you can reactivate it.

The following table describes what happens to an eventstream when you pause or resume a capacity.

| Eventstream status | Capacity is paused | Capacity is resumed |
| --- | -------------- | -------------- |
| Active | All eventstream sources and destinations are paused. In 1 to 2 minutes, ingested data is paused. <p>If your destination nodes are in a different capacity that isn't paused, those destination nodes are also paused.</p> | All eventstream sources and destinations start data ingestion after you activate them, followed by the data flowing into the rest of the eventstream. |
| Inactive | No effect. | No effect. The eventstream has to be resumed or activated manually. |

For more information, see the following articles:

- [Monitor a paused capacity](../../enterprise/monitor-paused-capacity.md)
- [Pause and resume your capacity](../../enterprise/pause-resume.md)

## Related content

- [Install the Microsoft Fabric Capacity Metrics app](/power-bi/enterprise/service-premium-install-app)
- [What is the Microsoft Fabric Capacity Metrics app?](/power-bi/enterprise/service-premium-metrics-app)
