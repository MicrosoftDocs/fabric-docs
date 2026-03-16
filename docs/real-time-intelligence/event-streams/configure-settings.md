---
title: Configure settings for a Fabric eventstream
description: This article describes how to configure sensitivity label, endorsement, retention, and throughput settings for an eventstream. 
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 03/18/2024
ms.search.form: Eventstreams Overview
---

# Configure settings for a Fabric eventstream
This article describes how to configure sensitivity label, endorsement, retention, and throughput settings for an eventstream. 

When you open an existing eventstream, you see the **Settings** button on the toolbar.

:::image type="content" source="./media/configure-settings/settings-button-existing-event-stream.png" alt-text="Screenshot that shows the Settings button on an Eventstream page." lightbox="./media/configure-settings/settings-button-existing-event-stream.png":::

You can also launch the **Settings** page from a workspace by selecting **...(ellipsis)** next to the eventstream in the list of artifacts, and then selecting **Settings**.

:::image type="content" source="./media/configure-settings/workspace-settings-button.png" alt-text="Screenshot that shows the Settings button on the workspace page." lightbox="./media/configure-settings/workspace-settings-button.png":::

## Retention setting
For the **retention** setting, you can specify the duration for which the incoming data needs to be retained. The default retention period is one day. Events are automatically removed when the retention period expires. If you set the retention period to one day (24 hours), the event becomes unavailable exactly 24 hours after it's accepted. You can't explicitly delete events. The maximum value for this setting is 90 days. To learn more about usage billing and reporting, see [Monitor capacity consumption for eventstreams](monitor-capacity-consumption.md).

:::image type="content" source="./media/create-manage-an-eventstream/retention-setting.png" alt-text="Screenshot that shows the retention setting for an eventstream.":::

## Event throughput setting

For the **event throughput** setting, you can select the throughput level for incoming and outgoing events in your eventstream. This feature allows you to scale your eventstream by optimizing performance for its sources and destinations based on the selected level. Throughput levels include:
- **Low**: < 10 MB/s  
- **Medium**: 10–100 MB/s  
- **High**: > 100 MB/s  

:::image type="content" source="./media/create-manage-an-eventstream/throughput-setting.png" alt-text="Screenshot that shows the throughput setting for an eventstream.":::

> [!NOTE]
> To update the throughput setting, if your eventstream contains no node (source or destination) that support pause and resume, you can update throughput setting directly. Otherwise, deactivate all nodes that support pause and resume, then reactivate them after the update. The update won't be blocked if only nodes that don't support deactivation remain active, but you may need to update the data client if custom endpoints are used, as the partition count will increase. See the [detailed table of  nodes that support pause and resume functionality](pause-resume-data-streams.md#activating-or-deactivating-a-node-using-the-switch-toggle).

Here’s how different sources and destinations perform at each throughput level.

> [!NOTE]
> The throughput upper limits listed here are based on the results from lab testing under specific configuration. Results may vary with different configurations.

### Azure Event Hubs source

For Azure Event Hubs sources, throughput depends on both the selected throughput level and the number of Azure Event Hubs source partitions. When the Azure Event Hubs source partition count is less than 4, throughput is limited by the partition count, regardless of the selected throughput level. The throughput upper limits are as follows:

| Partition Count | Approximate Throughput (up-to) |
|-----------------|-----------------|
| 1               | 9 MB/s            |
| 3               | 10 MB/s           |

When the partition count is 4, 16, or 32, throughput depends on the selected level (low, medium, high). For other partition counts within this range, throughput falls between these limits.

### Streaming connector sources

The throughput for streaming connector sources is up to **30 MB/s**. If higher throughput is needed (except the database CDC sources), please contact product group team via [this form](https://aka.ms/EventStreamsConnThroughputRequest).

**Streaming connector sources include**:
- Azure SQL Database Change Data Capture (CDC)
- Azure Service Bus
- PostgreSQL Database CDC
- MySQL Database CDC
- Azure Cosmos DB CDC
- SQL Server on VM DB CDC
- Azure SQL Managed Instance CDC
- Google Cloud Pub/Sub
- Amazon Kinesis Data Streams
- Confluent Cloud Kafka
- Apache Kafka
- Amazon MSK Kafka

### Other eventstream sources and destinations
The following table shows the approximate throughput upper limit for custom endpoint source and different destinations, based on internal lab testing.

| Node                       |  Type        | Throughput level | Approximate throughput (up-to)   |
|----------------------------|--------------|------------------|-----------------------|
| **Custom Endpoint**        | Source / Destination      | Low              | 100 MB/s             |
|                            |              | Medium           | 150 MB/s             |
|                            |              | High             | 200 MB/s             |
| **Lakehouse**              | Destination  | Low              | 40 MB/s              |
|                            |              | Medium           | 120 MB/s             |
|                            |              | High             | 200 MB/s             |
| **Eventhouse (Direct Ingestion)** | Destination | Low       | 10 MB/s              |
|                            |              | Medium           | 50 MB/s              |
|                            |              | High             | 100 MB/s             |
| **Eventhouse (Event processing before ingestion)** | Destination | Low       | 20 MB/s              |
|                            |              | Medium           | 100 MB/s             |
|                            |              | High             | 200 MB/s             |

>[!Note]
> The throughput data above was tested under specific conditions below. Results may vary with different configurations.
>- The source event sender, consumer, and Eventstream are in the same data center to ensure that network throughput is not a bottleneck.
>- Events are in JSON format, each 1KB in size. Events are batched in groups of 100 before being sent or received.
>- The source event data was sent using thousands of threads to continuously send data via EventHubProducerClient which should utilize the full bandwidth of the network throughput.
>- The test setup followed a 'One Source → One Eventstream → One Destination' structure. No processing operators were applied before data routed the Lakehouse or Eventhouse (using 'Event processing before ingestion' option) destinations. Eventhouse received data in batch mode.



## Endorsement setting
On the **Endorsement** tab of the **Settings** page, you can promote or endorse or recommended the eventstream for others to use. For more information on endorsement, see [Endorsement](/fabric/governance/endorsement-overview).

:::image type="content" source="./media/create-manage-an-eventstream/endorsement-setting.png" alt-text="Screenshot that shows the endorsement setting for an eventstream.":::

## Sensitivity label setting
On the **Sensitivity label** tab of the **Settings** page, you can specify the sensitivity level of the eventstream. 

## Related content

- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)


