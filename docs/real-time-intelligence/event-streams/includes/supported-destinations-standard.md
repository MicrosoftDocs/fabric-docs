---
title: Destinations supported by Fabric event streams
description: This include file has the list of destinations supported by Fabric event streams. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 04/24/2024
---

| Destination          | Description |
| --------------- | ---------- |
| [Custom app](add-destination-custom-app.md) | With this destination, you can easily route your real-time events to a custom application. It allows you to connect your own applications to the eventstream and consume the event data in real time. It's useful when you want to egress real-time data to an external system living outside Microsoft Fabric.  |
| [KQL database](add-destination-kql-database.md) | This destination enables you to ingest your real-time event data into a KQL database, where you can use the powerful Kusto Query Language (KQL) to query and analyze the data. With the data in the Kusto database, you can gain deeper insights into your event data and create rich reports and dashboards. You can choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.|
| [Lakehouse](add-destination-lakehouse.md) | This destination provides you with the ability to transform your real-time events before ingesting events into your lakehouse. Real-time events convert into Delta Lake format and then stored in the designated lakehouse tables. It helps with your data warehousing scenario. To learn more about how to use the event processor for real-time data processing, see [Process event data with event processor editor](./process-events-using-event-processor-editor.md).|
| [Reflex](add-destination-reflex.md) |This destination allows you to directly connect your real-time event data to a Reflex. Reflex is a type of intelligent agent that contains all the information necessary to connect to data, monitor for conditions, and act. When the data reaches certain thresholds or matches other patterns, Reflex automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.|