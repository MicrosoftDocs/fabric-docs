---
title: Add and manage eventstream destinations
description: Learn how to add and manage an event destination in an Eventstream item with the Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Source and Destination
---

# Add and manage a destination in an eventstream

Once you have created an eventstream in Microsoft Fabric, you can route data to different destinations. The types of destinations that you can add to your eventstream are KQL Database, Lakehouse, Custom App and Reflex. See the [Supported destinations](#supported-destinations) section for details.

## Prerequisites

To add a destination to an eventstream, you need the following prerequisites:

- Access to the Fabric **premium workspace** where the eventstream is located with **Contributor** or higher permissions.
- For a KQL Database, lakehouse, or Reflex destination, access to the **premium workspace** where the destination is located with **Contributor** or higher permissions.

## Supported destinations

Fabric event streams supports the following destinations. Use links in the table to navigate to articles about how to add specific destinations.

If you want to use enhanced capabilities that are in preview, see the content in the **Enhanced capabilities** tab. Otherwise, use the content in the **Standard capabilities** tab. For information about the enhanced capabilities that are in preview, see [Enhanced capabilities](new-capabilities.md).

# [Enhanced capabilities (Preview)](#tab/enhancedcapabilities)

| Destination          | Description |
| --------------- | ---------- |
| [Custom app](add-destination-custom-app.md) | With this destination, you can easily route your real-time events to a custom endpoint.You can connect your own applications to the eventstream and consume the event data in real time. This destination is useful when you want to egress real-time data to an external system outside Microsoft Fabric.|
| [KQL Database](add-destination-kql-database.md) | This destination lets you ingest your real-time event data into a KQL database, where you can use the powerful Kusto Query Language (KQL) to query and analyze the data. With the data in the Kusto database, you can gain deeper insights into your event data and create rich reports and dashboards. You can choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.|
| [Lakehouse](add-destination-lakehouse.md) | This destination gives you the ability to transform your real-time events before ingesting them into your lakehouse. Real-time events convert into Delta Lake format and then store in the designated lakehouse tables. This destination supports data warehousing scenarios. To learn more about how to use the event processor for real-time data processing, see [Process event data with event processor editor](./process-events-using-event-processor-editor.md).|
| [Reflex](add-destination-reflex.md) |This destination lets you directly connect your real-time event data to a Reflex. Reflex is a type of intelligent agent that contains all the information necessary to connect to data, monitor for conditions, and act. When the data reaches certain thresholds or matches other patterns, Reflex automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.|
| [Derived stream](add-destination-derived-stream.md) | Derived stream is a specialized type of destination that you can create after adding stream operations, such as Filter or Manage Fields, to an eventstream. The derived stream represents the transformed default stream following stream processing. You can route the derived stream to multiple destinations in Fabric, and view the derived stream in the Real-Time hub. |

# [Standard capabilities](#tab/standardcapabilities)

| Destination          | Description |
| --------------- | ---------- |
| [Custom app](add-destination-custom-app.md) | With this destination, you can easily route your real-time events to a custom application. It allows you to connect your own applications to the eventstream and consume the event data in real time. It's useful when you want to egress real-time data to an external system living outside Microsoft Fabric.  |
| [KQL database](add-destination-kql-database.md) | This destination enables you to ingest your real-time event data into a KQL database, where you can use the powerful Kusto Query Language (KQL) to query and analyze the data. With the data in the Kusto database, you can gain deeper insights into your event data and create rich reports and dashboards. You can choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.|
| [Lakehouse](add-destination-lakehouse.md) | This destination provides you with the ability to transform your real-time events prior to ingestion into your lakehouse. Real-time events convert into Delta Lake format and then stored in the designated lakehouse tables. It helps with your data warehousing scenario. To learn more about how to use the event processor for real-time data processing, see [Process event data with event processor editor](./process-events-using-event-processor-editor.md).|
| [Reflex](add-destination-reflex.md) |This destination allows you to directly connect your real-time event data to a Reflex. Reflex is a type of intelligent agent that contains all the information necessary to connect to data, monitor for conditions, and act. When the data reaches certain thresholds or matches other patterns, Reflex automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.|

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

---

## Manage a destination

You can edit or remove an eventstream destination through either the navigation pane or the canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic, through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::

## Related content

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a source in an eventstream](./add-manage-eventstream-sources.md)
- [Process event data with event processor editor](./process-events-using-event-processor-editor.md)
