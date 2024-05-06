---
title: Add and manage eventstream destinations (preview)
description: Learn how to add and manage an event destination in an eventstream with enhanced capabilities. 
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 05/21/2024
ms.search.form: Source and Destination
---

# Add and manage eventstream destinations (preview)
After you create an eventstream with enhanced capabilities in Microsoft Fabric, you can route data to different destinations. For a list of destinations that you can add to your eventstream, see the [Supported destinations](#supported-destinations) section.

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- For a destination of type KQL database, lakehouse, or Reflex, get access to a **premium workspace** with **Contributor** or above permissions where your destination is located.

## Supported destinations

Fabric event streams with enhanced capabilities support the following destinations. Use links in the table to navigate to articles that provide more details about adding specific destinations.

| Destinations          | Description |
| --------------- | ---------- |
| [Custom app](add-destination-custom-app.md) | With this destination, you can easily route your real-time events to a custom application. It allows you to connect your own applications to the eventstream and consume the event data in real time. It's useful when you want to egress real-time data to an external system living outside Microsoft Fabric.  |
| [KQL database](add-destination-kql-database.md) | This destination enables you to ingest your real-time event data into a KQL database, where you can use the powerful Kusto Query Language (KQL) to query and analyze the data. With the data in the Kusto database, you can gain deeper insights into your event data and create rich reports and dashboards. You can choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.|
| [Lakehouse](add-destination-lakehouse.md) | This destination provides you with the ability to transform your real-time events before ingesting into your lakehouse. Real-time events convert into Delta Lake format and then stored in the designated lakehouse tables. It helps with your data warehousing scenario. To learn more about how to use the event processor for real-time data processing, see [Process event data with event processor editor](./process-events-using-event-processor-editor.md).|
| [Reflex](add-destination-reflex.md) |This destination allows you to directly connect your real-time event data to a Reflex. Reflex is a type of intelligent agent that contains all the information necessary to connect to data, monitor for conditions, and act. When the data reaches certain thresholds or matches other patterns, Reflex automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.|
| [Derived stream](add-destination-derived-stream.md) | Derived stream is a specialized type of destination within Fabric event streams that's created following the addition of a series of stream operations, such as Filter or Manage Fields. The derived stream represents the transformed default stream following stream processing. You can also route the derived stream to multiple destinations in Fabric. Once created, you can view the derived stream from the Real-Time hub. |

## Related content

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a source in an eventstream](./add-manage-eventstream-sources.md)

