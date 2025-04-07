---
title: Azure and Fabric events capacity consumption
description: Learn how to monitor capacity consumption for Azure and Fabric events.
author: george-guirguis
ms.author: geguirgu
ms.topic: how-to
ms.custom:
ms.date: 11/18/2024
ms.search.form: Monitor Fabric events capacity consumption
---

# Azure and Fabric events capacity consumption

Azure and Fabric events support event-driven scenarios like real-time alerting and triggering downstream actions. Publishers like Azure Storage or Fabric Workspaces emit events that are received by consumers like Activator or Eventstreams to enable you to monitor and react to events by triggering actions or workflows.

> [!NOTE]
> In this article, Fabric events refer to both events generated within Fabric and also Azure events. 

When you use a Fabric capacity, your usage charges appear in the Azure portal under your subscription in [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview). To understand your Fabric billing, visit [Understand your Azure bill on a Fabric capacity](../enterprise/azure-billing.md).


## Operation types
Azure and Fabric events usage is defined by two operation types, which are described in the following table. The table provides information about Azure and Fabric events operations shown in the Fabric Capacity Metrics app and their Fabric consumption rates. For more information about the app, see [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md).
 

| Operation in Capacity Metrics App | Description | Operation unit of measure | Fabric consumption rate |
| --------------------------------- | ----------- | ------------------------- | ----------------------- |
| Event operations | Publish, delivery, and filtering operations | Per event operation<sup>**[Note 1](#Note-1)**</sup> | 0.000011111 CU Hour |
| Event listener | Uptime of the event listener | Per hour | 0.0222 CU Hour |

* <a id="Note-1"></a>**Note 1**. Events are counted in 64-KB chunks. For example, if the size of the event is 100 KB, this event is counted as two event operations.

### Event operations

Event operations represent operations for publish, filtering, and delivery of events. For Azure and Fabric events generated in Fabric, the publish operation charge doesn’t kick in until a consumer is established for these events. The publish operations are charged to the publisher’s capacity, while the filtering and delivery operations are charged to the consumer’s capacity.
 
For example, when a Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] trigger is created to take an action on a workspace item event, the source workspace’s capacity is charged for the publish operations, and the [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)]’s capacity is charged for the filtering and delivery operations. 

The following operations are the different types of Event Operations:
-	Publish operations: are charged for every event that is published by the source. The publish operation for the same event is charged once even if there are multiple consumers to the same event.
-	Filtering operations: are charged for every filtering computation that is applied on the data field in the event. Filtering operations on the header of the event are free.
    - If there's a filtering configuration on the header and the data field, a single event can match both the filter on the header and the filter on the data field. In that case, the filtering operation is also free.
-	Delivery operations: are charged for every delivery attempt of an event. If the destination is temporarily unavailable or if there's a transient failure, the event is retried with an exponential back-off mechanism. Each attempt to deliver the event is counted for the bill.

### Event listener 
This meter kicks in when a consumer is created for Azure and Fabric events and is charged to the consumer’s capacity. For example when an [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] trigger is created to act on an event, this meter is charged per hour during the existence of this trigger.

### Azure and Fabric events operations in the Microsoft Fabric Capacity Metrics app

The Microsoft Fabric Capacity Metrics app is designed to provide monitoring capabilities for Microsoft Fabric capacities. Use the app to monitor your capacity consumption and make informed decisions on how to use your capacity resources. For example, the app can help identify when to scale up your capacity or when to turn on autoscale.

In the app, the event operations show the metadata of the publisher for the publish operations and the metadata of the consumer for the delivery and filtering operations. For example, when an Eventstream source is created to consume an event, the Event Operations for delivery and filtering as well as the Event Listener operation shows the metadata of the Eventstream artifact.

> [!NOTE]
> When an Activator trigger is created to take an action on an event, the Event Operations for delivery and filtering as well as the Event Listener operation show the metadata of the Activator artifact, under the ReflexProject Item Kind.

#### Representation of nonartifacts
In some cases, the publisher or the consumer can be nonartifacts. For example, for workspace events, the publisher is the workspace. In these cases, the publish operations shows:
-  **Item kind** in the format of `FabricEvents-"<event category>`, and for workspace item events, the **Item kind** is `FabricEvents-WorkspaceItemEvents`.
-  The values for the **Workspace**, **Item name**, and the **Consumer Identity** is "Fabric Events Publisher".


## Changes to Microsoft Fabric workload consumption rate 
Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft’s Release Notes or Microsoft Fabric Blog. If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, you can use the cancellation options available for the chosen payment method. 

## Related content 

- [Install the Premium metrics app](/power-bi/enterprise/service-premium-install-app)
- [Use the Premium metrics app](/power-bi/enterprise/service-premium-metrics-app)
