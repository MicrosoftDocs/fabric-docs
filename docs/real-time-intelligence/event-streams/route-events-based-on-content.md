---
title: Route Events Based on Content in Fabric Eventstreams
description: Learn how events can be routed based on content in the data received from a source in an eventstream.
ms.reviewer: xujiang1
ms.topic: concept-article
ms.date: 03/22/2026
ms.search.form: Source and Destination
---

# Route data streams based on content in Microsoft Fabric eventstreams

This article shows you how to route events based on content in Microsoft Fabric eventstreams.

You can use the no-code editor in the Microsoft Fabric eventstreams main canvas to create complex stream processing logic without writing any code. This feature makes it easier to tailor, transform, and manage your data streams. After setting your stream processing operations, you can send your data streams to different destinations according to the specific schema and stream data.



## Supported operations

Here's the list of operations supported for real-time data processing:

- **Aggregate**: Use the SUM, AVG, MIN, and MAX functions to perform calculations on a column of values and return a single result.

- **Expand**: Expand an array value and create a new row for each value within an array.

- **Filter**: Select or filter specific rows from the data stream based on a condition.

- **Group by**: Aggregate all event data within a certain time window, with the option to group one or more columns.

- **Manage Fields**: Add, remove, or change the data type of a field or column in your data streams.

- **Union**: Connect two or more data streams with shared fields of the same name and data type into one data stream. Fields that don't match are dropped.

- **Join**: Combine data from two streams based on a matching condition between them.

## Supported destinations

The supported destinations are:

- **Lakehouse**: This destination transforms your real-time events before ingestion into your lakehouse. It converts real-time events into Delta Lake format and stores them in the designated lakehouse tables. This destination helps with data warehousing scenarios.

- **Eventhouse**: This destination ingests your real-time event data into Eventhouse, where you can use the powerful Kusto Query Language (KQL) to query and analyze the data. By storing data in Eventhouse, you can gain deeper insights into your event data and create rich reports and dashboards.

- **Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]**: This destination connects your real-time event data directly to a Fabric Activator. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is a type of intelligent agent that contains all the information necessary to connect to data, monitor conditions, and act. When the data reaches certain thresholds or matches other patterns, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.

- **Custom endpoint (former custom app):** By using this destination, you can easily route your real-time events to a custom application. This destination lets you connect your own applications to the eventstream and consume the event data in real time. It's useful when you want to egress real-time data to an external system outside Microsoft Fabric.

- **Stream**: This destination represents the default raw eventstream transformed by a series of operations, also called a derived stream. After you create it, you can view the stream from the Real-Time hub.

The following example shows how three distinct Microsoft Fabric eventstream destinations can serve separate functions for a single data stream source. You designate one Eventhouse for storing raw data, a second Eventhouse for retaining filtered data streams, and the Lakehouse for storing aggregated values.

:::image type="content" border="true" source="media/route-events-based-on-content/route-events.png" alt-text="A screenshot of routing events based on content.":::

To transform and route your data stream based on content, follow the steps in [Edit and publish an eventstream](edit-publish.md) and start designing stream processing logics for your data stream.

## Related content

- [New capabilities in Microsoft Fabric eventstreams](overview.md)
- [Edit and publish an eventstream](edit-publish.md)
- [Create default and derived eventstreams](create-default-derived-streams.md)
