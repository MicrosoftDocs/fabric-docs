---
title: Microsoft Fabric event streams capacity consumption
description: Learn how to monitor capacity consumption for Microsoft Fabric event streams.
author: xujxu
ms.author: xujiang1
ms.topic: how-to 
ms.date: 10/29/2024
ms.search.form: Monitor eventstreams capacity consumption
---

# Microsoft Fabric event streams capacity consumption

This article contains information on how Microsoft Fabric event streams usage is billed and reported. 

## Operation types
The eventstreams usage is defined by four operation types, which are described in the following table. The table provides information about eventstreams operations shown in the Fabric Capacity Metrics app and their Fabric consumption rates. For more information about the app, see [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md).

| Operation in Capacity Metrics App | Description | Operation unit of measure | Fabric consumption rate |
| --------------------------------- | ----------- | ------------------------- | ----------------------- |
| Eventstream Per Hour <sup>**[Note 1](#Note-1)**</sup> | Flat charge | Per hour | **0.222** CU hour |
| Eventstream Data Traffic per GB | Data ingress & egress volume in default and derived streams <br/> (Includes 24-hour retention) | Per GB | **0.342** CU hour |
| Eventstream Processor Per Hour | Computing resources consumed by the processor | Per hour | Starts at **0.778** CU hour and autoscale <sup>**[Note 2](#Note-2)**</sup> per throughput |
| Eventstream Connectors Per vCore Hour | Computing resources consumed by the connectors | Per hour | **0.611** CU hour per vCore <sup>**[Note 3](#Note-3)**</sup> |

* <a id="Note-1"></a>**Note 1**. **Eventstream Per Hour** is charged only when it's active (that is, has events flowing in or out). If there's no traffic flowing in or out for the past two hours, no charges apply.
* <a id="Note-2"></a>**Note 2: Eventstream Processor Per Hour**. The CU consumption rate of the Eventstream processor is correlated to the throughput of event traffic, the complexity of the event processing logic, and the partition count of input data:
   * With "Low" set in "Event throughput setting", the processor CU consumption rate starts at 1/3 base-rate (0.778 CU hour) and autoscale within 2/3 base-rate (1.555 CU hour), 1 base-rate (2.333 CU hour), 2 base-rates, and 4 base-rates.
   * With "Medium" set in "Event throughput setting", the processor CU consumption rate starts at 1 base-rate and autoscale within multiple possible base-rates.
   * With "High" set in "Event throughput setting", the processor CU consumption rate starts at 2 base-rates and autoscale within multiple possible base-rates.
* <a id="Note-3"></a>**Note 3: Eventstream Connectors Per vCore Hour** 
   * The CU consumption of the Eventstream connector is for charging computing resources when pulling real-time data from sources, excluding Azure Event Hubs, Azure IoT Hub, and Custom endpoints. Data from Azure Event Hubs and Azure IoT Hub is pulled using the Eventstream Processor. 
   * Connector CU consumption is designed to correlate with throughput. When throughput increases, the number of vCores increases (autoscale), resulting in higher CU consumption. Currently, connector autoscaling is unavailable, so only one vCore is used per connector source.

## Storage billing
Events retention in Fabric event streams is billed separately from your Fabric or Power BI premium capacity units.  

* **OneLake Standard Storage** is standard storage that's used to persist and store all data. When you set the **retention setting** for more than 1 day (that is, 24 hours), you're charged as per OneLake Standard storage. See details of OneLake storage/month price on the [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) page. 

## Monitor OneLake storage 

The [Microsoft Fabric Capacity Metric app](../../enterprise/metrics-app.md) allows any capacity administrator to monitor OneLake Storage. Learn how to understand the Metrics app storage page in [Understand the metrics app storage](../../enterprise/metrics-app-storage-page.md) page.

## Important considerations
Here are a few important points to consider:

- Microsoft Fabric Event Streams can operate with the smallest F capacity. However, additional capacity units may be required if other Fabric items are used as destinations.
- Eventstream Flat, Data Traffic, and Processor operations are billed only when data is being ingested or processed. If no data flows in or out for more than two hours, these operations will not incur charges.

## Changes to Microsoft Fabric workload consumption rate 
Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft’s Release Notes or Microsoft Fabric Blog. If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, you can use the cancellation options available for the chosen payment method. 

## Capacity pause/resume 

Microsoft Fabric allows you to pause and resume your capacity. When your capacity isn't operational, you can pause it to enable cost savings for your organization. Later, when you want to resume work on your capacity, you can reactivate it. 

What happened to Eventstream when a capacity is paused/resumed?
 
| Eventstream status | Capacity gets paused | Capacity gets resumed |
| --- | -------------- | -------------- | 
| Active | All Eventstream sources and destinations are paused. In 1-2 mins, data that’s being ingested is paused. <p>Note that if your destination nodes are in a different capacity that hasn't been paused, those destination nodes will also be paused.</p> | All Eventstream sources and destinations start data ingestion once you activate them, followed by the data flowing into the rest of the Eventstream. |
| Inactive | No effect | No effect. The eventstream has to be resumed/activated manually. |

To understand more about Fabric capacity pause and resume, see the following articles: 

- [Monitor a paused capacity in Microsoft Fabric](../../enterprise/monitor-paused-capacity.md)
- [Pause and resume your capacity in Microsoft Fabric](../../enterprise/pause-resume.md)

## Related content 

- [Install the Premium metrics app](/power-bi/enterprise/service-premium-install-app)
- [Use the Premium metrics app](/power-bi/enterprise/service-premium-metrics-app)
