---
title: Enhanced capabilities in Microsoft Fabric event streams
description: Learn about the new public preview capabilities available in Fabric event streams.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: conceptual
ms.date: 04/22/2024
ms.search.form: Source and Destination
---

# Enhanced capabilities in Microsoft Fabric event streams

We're excited to announce a range of new enhancements in Microsoft Fabric event streams that are tailored to improve your development experience in building streaming applications. With [Real-Time hub](../../real-time-hub/real-time-hub-overview.md) seamlessly integrated into Fabric event streams, you gain greater flexibility and control over your data in motion. Here's a brief overview of the latest features:

- **Edit Mode and Live View**. Explore two distinct modes for visualizing and designing stream processing.

- [Default and derived streams](create-default-derived-streams.md). Create a continuous flow of streams with the format you design, with an event processor that can be consumed later in Real-Time hub.

- [Data stream routing based on content](route-events-based-on-content.md). Transform and route your data streams anywhere within Fabric based on the data stream content you designed with the event processor.

## Preview issues and limitations

Fabric event streams is currently in preview, and may encounter some known issues and limitations, including:

- **Loss of eventstream changes**. Refreshing the page or switching Fabric items while in **Edit mode** might result in the loss of all changes made to your eventstream.

- **Eventstreams might keep loading**. When you switch back to an eventstream from tabs in the Fabric left navigation pane, eventstreams might keep loading. Refreshing the current page solves this problem.

- **Missing validation for Azure Event Hubs source**. If no data is being sent from your Event Hubs source to Fabric event streams, make sure the correct details, such as shared access key permission and consumer group, are entered for your Event Hubs configuration.

- **No metric view for KQL Database destination**. Data Insight isn't available for KQL Database destinations at this time.

- **Failure to route data from derived streams to destinations**. This issue might arise when you attempt to add a Lakehouse or KQL Database destination to a derived stream, resulting in no data being sent to the destination.
- **Invalid Lakehouse destination name**. Only uppercase or lowercase letters and numerals are allowed for a Lakehouse destination name. Symbols like "_" or "-" aren't allowed in the destination name.

- **You can't move Custom App and Reflex between derived streams and default streams**.

- **Duplicate KQL Database destination nodes**: When you add a KQL Database destination with Direct Ingestion mode, an error might display two destination nodes in the editor.

- **Error in reconnecting Custom App and Reflex destinations**. If you disconnect a Custom App or Reflex destination and subsequently reconnect it to another stream, errors might occur when you try to publish the eventstream.
- **Data Preview is unavailable for new connector sources and destinations**. Currently, the Data Preview feature is unavailable for the following connector sources:

  - Amazon Kinesis Data Streams
  - Confluent Cloud Kafka
  - Google Cloud Pub/Sub
  - Azure SQL Database change data capture (CDC)
  - PostgreSQL database CDC
  - Custom app sources
  - KQL Database, Lakehouse, Reflex, Custom App, and derived stream destinations

It's recommended to publish your eventstream after adding a new source and starting data streaming into the eventstream. Then you can switch to Edit mode to design stream processing logic and configure destinations for your eventstream.

## Related content

- [Edit and publish an eventstream](edit-publish.md)
- [Create default and derived eventstreams](create-default-derived-streams.md)
- [Route data streams based on content](route-events-based-on-content.md)
