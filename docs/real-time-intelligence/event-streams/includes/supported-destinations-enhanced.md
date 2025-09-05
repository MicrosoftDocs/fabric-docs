---
title: Destinations supported by Fabric eventstreams (enhanced)
description: This include file has the list of destinations supported by Fabric eventstreams with enhanced capabilities.
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom:
ms.date: 05/21/2024
---

| Destination          | Description |
| --------------- | ---------- |
| [Custom endpoint (i.e., Custom App in standard capability)](../add-destination-custom-app.md) | With this destination, you can easily route your real-time events to a custom endpoint. You can connect your own applications to the eventstream and consume the event data in real time. This destination is useful when you want to egress real-time data to an external system outside Microsoft Fabric.|
| [Eventhouse](../add-destination-kql-database.md) | This destination lets you ingest your real-time event data into an Eventhouse, where you can use the powerful Kusto Query Language (KQL) to query and analyze the data. With the data in the Eventhouse, you can gain deeper insights into your event data and create rich reports and dashboards. You can choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.|
| [Lakehouse](../add-destination-lakehouse.md) | This destination gives you the ability to transform your real-time events before ingesting them into your lakehouse. Real-time events convert into Delta Lake format and then store in the designated lakehouse tables. This destination supports data warehousing scenarios. |
| [Derived stream](../add-destination-derived-stream.md) | Derived stream is a specialized type of destination that you can create after adding stream operations, such as Filter or Manage Fields, to an eventstream. The derived stream represents the transformed default stream following stream processing. You can route the derived stream to multiple destinations in Fabric, and view the derived stream in the Real-Time hub. |
| [Fabric [!INCLUDE [fabric-activator](../../includes/fabric-activator.md)] (preview)](../add-destination-activator.md) |This destination lets you directly connect your real-time event data to a Fabric Activator. [!INCLUDE [fabric-activator](../../includes/fabric-activator.md)] is a type of intelligent agent that contains all the information necessary to connect to data, monitor for conditions, and act. When the data reaches certain thresholds or matches other patterns, [!INCLUDE [fabric-activator](../../includes/fabric-activator.md)] automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.|
