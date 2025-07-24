---
title: Pause and resume data streams
description: Learn how to pause and resume data streams.
ms.reviewer: spelluru
ms.author: xujiang1
author: wenyang
ms.topic: how-to
ms.custom:
ms.date: 11/21/2024
ms.search.form: Pause and Resume
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Pause and resume data streams (preview)

[!INCLUDE [select-view](./includes/select-view.md)]

The **Pause** and **Resume** (that is, **Deactivate** and **Activate**) features in Eventstream give you a full control over your data streams, enabling you to pause data streaming from various sources and destinations within Eventstream. You can then resume data streaming seamlessly from the paused time or a customized time, ensuring no data loss.

* **Activate/Deactivate All**: Quickly pause and resume all data traffic flowing in and out of Eventstream using the Activate All and Deactivate All options on the menu bar.
* **Activate/Deactivate Toggle Switch Button**: Each node has a toggle switch button, allowing you to activate (that is, resume) or deactivate (that is, pause) the data streaming from or to selected sources and destinations.

The following table outlines the description of different node statuses:

| Node Status | Description |
| --- | --- |
| Active | Data source is currently active and data is flowing in or out of Eventstream. |
| Inactive | Data source is currently inactive, and no data is flowing in or out of Eventstream. |
| Loading | Data source is in the process of being turned on or off. |
| Error | Data source is currently paused due to errors.  |
| Warning | Data source is operational but experiencing some issues, although data traffic is still occurring. |

## Activating or deactivating a node using the switch toggle

For nodes that support pause and resume features, you can easily manage their data flow using the toggle switch. Find the desired node and toggle the switch on or off to activate (that is, resume) or deactivate (that is, pause) the data traffic. Nodes that don't currently support pause and resume functionality won't have a toggle switch.

The table below describes the available resume options:

| Resume Option                 | Description                                      |
|-------------------------------|----------------------------------------------|
| When streaming was last stopped | Resumes from the point where streaming was last stopped |
| Now                           | Resumes from the current time                |
| Custom time                   | Resumes from a customized time |

:::image type="content" source="./media/pause-resume-data-streams/pause-resume-switch-toggle.png" alt-text="Screenshot showing switch toggle on the node and details." lightbox="./media/pause-resume-data-streams/pause-resume-switch-toggle.png" :::

> [!NOTE]  
> When configuring an Eventstream, the source, transformation logic, and destination are typically added together. By default, when publishing the Eventstream, the backend services for both data ingestion and data routing start with **Now** respectively. However, data ingestion may begin faster than data routing, causing some data to be ingested into Eventstream before routing is fully initialized. As a result, this data may not be routed to the destination.  
>  
> A common example is a database CDC source, where some initial snapshot data could remain in Eventstream without being routed to the destination.  
>  
> To mitigate this, follow these steps:  
> 1. When configuring an **Eventhouse (Event processing before ingestion)** or **Lakehouse** destination, uncheck **Activate ingestion** after adding the data source. 
>
>    :::image type="content" source="media/add-destination-kql-database/untick-activate.png" alt-text="A screenshot of the KQL Database without selecting Activate ingesting after adding the data source." lightbox="media/add-destination-kql-database/untick-activate.png":::
> 1. Manually activate ingestion after the Eventstream is published.  
> 1. Use the **Custom time** option to select an earlier timestamp, ensuring initial data is properly processed and routed.  
> 
>    :::image type="content" source="media/add-destination-kql-database/resume-kusto.png" alt-text="A screenshot of resuming the KQL Database." lightbox="media/add-destination-kql-database/resume-kusto.png":::

Here's a detailed table of the nodes that support pause and resume functionality along with the available resume options:

::: zone pivot="enhanced-capabilities"  




| Node                                                      | Type          | Supports Pause and Resume | Resume Options                              |
|-----------------------------------------------------------|---------------|---------------------------|---------------------------------------------|
| Azure Data Explorer Database (preview)                    | Source        | YES                       | - When streaming was last stopped           |
| Azure Event Hubs                                          | Source        | YES                       | - When streaming was last stopped<br>- Now<br>- Custom time |
| Azure Event Grid Namespace (preview)                      | Source        | NO                        |                                             |
| Azure Service Bus (preview)                               | Source        | YES                       | - When streaming was last stopped           |
| Azure IoT Hub                                             | Source        | YES                       | - When streaming was last stopped<br>- Now<br>- Custom time |
| Sample Data                                               | Source        | YES                       | - Now                                       |
| Real-time weather (preview)                               | Source        | YES                       | - When streaming was last stopped           |
| Azure SQL Database CDC                                    | Source        | YES                       | - When streaming was last stopped           |
| PostgreSQL Database CDC                                   | Source        | YES                       | - When streaming was last stopped           |
| MySQL Database CDC                                        | Source        | YES                       | - When streaming was last stopped           |
| Azure Cosmos DB CDC                                       | Source        | YES                       | - When streaming was last stopped           |
| SQL Server on VM DB CDC                                   | Source        | YES                       | - When streaming was last stopped           |
| Azure SQL Managed Instance CDC                            | Source        | YES                       | - When streaming was last stopped           |
| Google Cloud Pub/Sub                                      | Source        | YES                       | - When streaming was last stopped           |
| Amazon Kinesis Data Streams                               | Source        | YES                       | - When streaming was last stopped           |
| Confluent Kafka                                           | Source        | YES                       | - When streaming was last stopped           |
| Apache Kafka                                              | Source        | YES                       | - When streaming was last stopped           |
| Amazon MSK Kafka                                          | Source        | YES                       | - When streaming was last stopped           |
| Custom endpoint (i.e., Custom App in standard capability) | Source        | NO                        |                                             |
| Fabric Workspace events source                            | Source        | NO                        |                                             |
| Fabric OneLake events                                     | Source        | NO                        |                                             |
| Fabric Job events                                         | Source        | NO                        |                                             |
| Azure Blob storage                                        | Source        | NO                        |                                             |
| MQTT (preview)                                            | Source        | YES                       | - When streaming was last stopped           |
| Solace PubSub+ (preview)                                  | Source        | YES                       | - When streaming was last stopped           |
| Lakehouse                                                 | Destination   | YES                       | - When streaming was last stopped<br>- Now<br>- Custom time |
| Eventhouse (Event processing before ingestion)            | Destination   | YES                       | - When streaming was last stopped<br>- Now<br>- Custom time |
| Custom endpoint (i.e., Custom App in standard capability) | Destination   | NO                        |                                             |
| Eventhouse (Direct Ingestion)                             | Destination   | NO                        |                                             |
| Fabric Activator (preview)                                | Destination   | YES                       | - When streaming was last stopped<br>- Now<br>- Custom time                                          |
| Derived stream                                            | Destination   | NO                        |                                             |


::: zone-end

::: zone pivot="standard-capabilities"


| Node                          | Type                  | Supports Pause and Resume |  Resume Options                              |
|-------------------------------|-----------------------|-----------------------|---------------------------------------------|
| Sample Data                   | Source                | YES                   | - Now                                       |
| Azure Event Hubs              | Source                | YES                   | - When streaming was last stopped<br>- Now<br>- Custom time |
| Azure IoT Hub                 | Source                | YES                   | - When streaming was last stopped<br>- Now<br>- Custom time |
| Custom App                    | Source                | NO                    |                              |
| Custom App                    | Destination           | NO                    |                              |
| Lakehouse                     | Destination           | YES                   | - When streaming was last stopped<br>- Now<br>- Custom time |
| KQL Database (Direct Ingestion) | Destination           | NO                    |                               |
| KQL Database (Event processing before ingestion) | Destination           | YES                   | - When streaming was last stopped<br>- Now<br>- Custom time |
| Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]                        | Destination           | YES                     | - When streaming was last stopped<br>- Now<br>- Custom time |

::: zone-end

## Activating or deactivating all nodes

You can easily pause or resume all data traffic within Eventstream by selecting either the **Activate All** or **Deactivate All** option from the menu bar. When selecting **Activate All**, the available resume options may differ based on the sources and destinations configured in your eventstream. Refer to the detailed table in the previous section for specific resume options for each node. This action will either resume or pause all data traffic flowing in or out of Eventstream. It only applies to nodes that support pause and resume functionality. For nodes that don't currently support this feature, data traffic can't be paused.

:::image type="content" source="./media/pause-resume-data-streams/active-deactive-all.png" alt-text="Screenshot showing how to active or deactive all nodes at simultaneously." lightbox="./media/pause-resume-data-streams/active-deactive-all.png" :::

## Related content

* [Add and manage destinations in an eventstream](./add-manage-eventstream-destinations.md).
* [Add and manage an event in an eventstream](./add-manage-eventstream-sources.md).
