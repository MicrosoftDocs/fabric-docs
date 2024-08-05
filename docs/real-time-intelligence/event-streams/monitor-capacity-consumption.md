---
title: Monitor Microsoft Fabric event streams capacity consumption
description: Learn how to monitor capacity consumption for Microsoft Fabric event streams.
author: xujxu
ms.author: xujiang1
ms.topic: how-to 
ms.date: 08/05/2024
ms.search.form: Monitor event streams capacity consumption
---

# Monitor capacity consumption for Microsoft Fabric event streams

This article contains information on how Microsoft Fabric event streams usage is billed and reported. 

## Operation types
The event streams usage is defined by four operation types, which are described in the following table <sup>**[Note 1](#Note-1)**</sup>. The table provides information about event streams operations shown in the Fabric Capacity Metrics app and their Fabric consumption rates. For more information about the app, see [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md).
 

| Operation in Capacity Metrics App | Description | Operation unit of measure | Fabric consumption rate |
| --------------------------------- | ----------- | ------------------------- | ----------------------- |
| Eventstream Per Hour | Flat charge | Per hour | **0.222** CU per hour |
| Eventstream Data Traffic per GB | Data ingress & egress volume in default and derived streams <br/> (Includes 24-hour retention) | Per GB | **0.342** CU per hour per GB |
| Eventstream Processor Per Hour | Computing resources consumed by the processor | Per hour | Base-rate: 2.333 CU per hour. Starts at **0.778** CU per hour (1/3 of the base-rate) and autoscale <sup>**[Note 2](#Note-2)**</sup>  |
| Eventstream Connectors Per vCore Hour | Computing resources consumed by the connectors | Per hour | **0.611** CU per vCore hour <sup>**[Note 3](#Note-3)**</sup> |

* <a id="Note-1"></a>**Note 1**. Eventstream is charged only when it is active (i.e., has events flowing in or out). If there is no traffic flowing in or out for the past two hours (idle state), no charges will apply.
* <a id="Note-2"></a>**Note 2: Eventstream Processor Per Hour**. The CU consumption rate of the Eventstream processor is correlated to the throughput of event traffic, the complexity of the event processing logic, and the partition count of input data:
   * With "Low" set in "Event throughput setting", the processor CU consumption rate starts at 1/3 base-rate (0.778 CUs/hour) and autoscale within 2/3 base-rate (1.555 CUs/hour), 1 base-rate (2.333 CUs/hour), 2 base-rates, and 4 base-rates.
   * With "Medium" set in "Event throughput setting", the processor CU consumption rate starts at 1 base-rate and autoscale within multiple possible base-rates.
   * With "High" set in "Event throughput setting", the processor CU consumption rate starts at 2 base-rates and autoscale within multiple possible base-rates.
* <a id="Note-3"></a>**Note 3: Eventstream Connectors Per vCore Hour** 
   * The CU consumption of the Eventstream connector is for charging computing resources when pulling real-time data from sources, excluding Azure Event Hub, Azure IoT Hub, and Custom endpoints. Data from Azure Event Hub and Azure IoT Hub is pulled using the Eventstream Processor. 
   * Connector consumption is designed to correlate with throughput. When throughput increases, the number of vCores will increase (autoscale), resulting in higher CU consumption. Currently, connector autoscaling is unavailable, so only one vCore is used per connector source.

## Storage billing
Events retention in Fabric event streams is billed separately from your Fabric or Power BI premium capacity units.  

* **OneLake Standard Storage** is standard storage that's used to persist and store all data. When you set the **retention setting** for more than 1 day (that is, 24 hours), you're charged as per OneLake Standard storage. See details of OneLake storage/month price on the [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) page. 

## Monitor OneLake storage 

The [Microsoft Fabric Capacity Metric app](../../enterprise/metrics-app.md) allows any capacity administrator to monitor OneLake Storage. Learn how to understand the Metrics app storage page in [Understand the metrics app storage](../../enterprise/metrics-app-storage-page.md) page.

## Important considerations
Here are a few important points to consider:

- We recommend that you use the Microsoft Fabric event streams feature with at least four capacity units (SKU: F4).
- You're charged only when your eventstream is ingesting or processing data. Any eventstream that doesn't have data for more than 2 hours isn't charged.  

## Changes to Microsoft Fabric workload consumption rate 
Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft’s Release Notes or Microsoft Fabric Blog. If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, you can use the cancellation options available for the chosen payment method. 

## Capacity pause/resume 

Microsoft Fabric allows you to pause and resume your capacity. When your capacity isn't operational, you can pause it to enable cost savings for your organization. Later, when you want to resume work on your capacity, you can reactivate it. 

What happened to Eventstream when a capacity is paused/resumed?
 
| Eventstream status | Capacity gets paused | Capacity gets resumed |
| --- | -------------- | -------------- | 
| Active | All Eventstream sources and destinations are paused. In 1-2 mins, data that’s being ingested is paused. <p>Note that if your destination nodes are in a different capacity that has not been paused, those destination nodes will also be paused.</p> | All Eventstream sources and destinations start data ingestion, followed by the data flowing into the rest of the Eventstream. |
| Inactive | No effect | No effect. The eventstream has to be resumed/activated manually. |

To understand more about Fabric capacity pause and resume, see the following articles: 

- [Monitor a paused capacity in Microsoft Fabric](../../enterprise/monitor-paused-capacity.md)
- [Pause and resume your capacity in Microsoft Fabric](../../enterprise/pause-resume.md)

## Related content 

- [Install the Premium metrics app](/power-bi/enterprise/service-premium-install-app)
- [Use the Premium metrics app](/power-bi/enterprise/service-premium-metrics-app)
