---
title: Destinations Supported by Fabric Eventstreams
description: This file has the list of destinations that Fabric event streams support. 
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom:
ms.date: 05/21/2024
---

| Destination          | Description |
| --------------- | ---------- |
| [Custom app](../add-destination-custom-app.md) | Use this destination to route your real-time events to a custom application. You can connect your own applications to the eventstream and consume the event data in real time. This ability is useful when you want to send real-time data to a system outside Microsoft Fabric.  |
| [KQL database](../add-destination-kql-database.md) | This destination enables you to ingest your real-time event data into a Kusto Query Language (KQL) database, where you can use the power of KQL to query and analyze the data. With the data in the Kusto database, you can gain deeper insights into your event data and create rich reports and dashboards. You can choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.|
| [Lakehouse](../add-destination-lakehouse.md) | This destination gives you the ability to transform your real-time events before ingesting events into your lakehouse. Real-time events are converted into Delta Lake format and then stored in the designated lakehouse tables. This ability helps with your data warehousing scenarios. To learn more about how to use the event processor for real-time data processing, see [Process event data with the event processor editor](../process-events-using-event-processor-editor.md).|
| [Fabric [!INCLUDE [fabric-activator](../../includes/fabric-activator.md)]](../add-destination-activator.md) |You can use this destination to directly connect your real-time event data to Fabric Activator. [!INCLUDE [fabric-activator](../../includes/fabric-activator.md)] is a type of intelligent agent that contains all the information necessary to connect to data, monitor for conditions, and act. When the data reaches certain thresholds or matches other patterns, [!INCLUDE [fabric-activator](../../includes/fabric-activator.md)] automatically takes appropriate action, such as alerting users or starting Power Automate workflows.|
