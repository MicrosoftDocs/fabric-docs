---
title: Destinations Supported by Fabric Eventstreams (Enhanced)
description: This file has the list of destinations supported by Fabric eventstreams with enhanced capabilities.
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom:
ms.date: 05/21/2024
---

| Destination          | Description |
| --------------- | ---------- |
| [Custom endpoint (custom app in standard capability)](../add-destination-custom-app.md) | Use this destination to route your real-time events to a custom endpoint. You can connect your own applications to the eventstream and consume the event data in real time. This destination is useful when you want to send real-time data to a system outside Microsoft Fabric.|
| [Eventhouse](../add-destination-kql-database.md) | This destination lets you ingest your real-time event data into an eventhouse, where you can use the powerful Kusto Query Language (KQL) to query and analyze the data. With the data in the eventhouse, you can gain deeper insights into your event data and create rich reports and dashboards. You can choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.|
| [Lakehouse](../add-destination-lakehouse.md) | This destination gives you the ability to transform your real-time events before ingesting them into your lakehouse. Real-time events are converted into Delta Lake format and then stored in the designated lakehouse tables. This destination supports data warehousing scenarios. |
| [Spark Notebook (Preview)](../add-destination-spark-notebook.md) | Add a **Spark Notebook** destination to load a pre-existing Notebook in your workspace to process the events in the default or derived streams using a Spark Structured Streaming job. This feature is currently in **Preview**. |
| [Derived stream](../add-destination-derived-stream.md) | You can create this specialized type of destination after you add stream operations, such as **Filter** or **Manage Fields**, to an eventstream. The derived stream represents the transformed default stream after stream processing. You can route the derived stream to multiple destinations in Fabric and view the derived stream in the real-time hub. |
| [Fabric [!INCLUDE [fabric-activator](../../includes/fabric-activator.md)] (preview)](../add-destination-activator.md) |You can use this destination to directly connect your real-time event data to Fabric Activator. [!INCLUDE [fabric-activator](../../includes/fabric-activator.md)] is a type of intelligent agent that contains all the information necessary to connect to data, monitor for conditions, and act. When the data reaches certain thresholds or matches other patterns, [!INCLUDE [fabric-activator](../../includes/fabric-activator.md)] automatically takes appropriate action, such as alerting users or starting Power Automate workflows.|
