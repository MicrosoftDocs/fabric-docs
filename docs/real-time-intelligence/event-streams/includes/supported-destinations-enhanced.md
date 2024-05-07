---
title: Destinations supported by Fabric event streams (enhanced)
description: This include file has the list of destinations supported by Fabric event streams with enhanced capabilities.
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 04/24/2024
---

| Destination          | Description |
| --------------- | ---------- |
| [Custom app](../add-destination-custom-app.md) | With this destination, you can easily route your real-time events to a custom endpoint. You can connect your own applications to the eventstream and consume the event data in real time. This destination is useful when you want to egress real-time data to an external system outside Microsoft Fabric.|
| [KQL Database](../add-destination-kql-database.md) | This destination lets you ingest your real-time event data into a KQL database, where you can use the powerful Kusto Query Language (KQL) to query and analyze the data. With the data in the Kusto database, you can gain deeper insights into your event data and create rich reports and dashboards. You can choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.|
| [Lakehouse](../add-destination-lakehouse.md) | This destination gives you the ability to transform your real-time events before ingesting them into your lakehouse. Real-time events convert into Delta Lake format and then store in the designated lakehouse tables. This destination supports data warehousing scenarios. |
| [Reflex](../add-destination-reflex.md) |This destination lets you directly connect your real-time event data to a Reflex. Reflex is a type of intelligent agent that contains all the information necessary to connect to data, monitor for conditions, and act. When the data reaches certain thresholds or matches other patterns, Reflex automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.|
| [Derived stream](../add-destination-derived-stream.md) | Derived stream is a specialized type of destination that you can create after adding stream operations, such as Filter or Manage Fields, to an eventstream. The derived stream represents the transformed default stream following stream processing. You can route the derived stream to multiple destinations in Fabric, and view the derived stream in the Real-Time hub. |
