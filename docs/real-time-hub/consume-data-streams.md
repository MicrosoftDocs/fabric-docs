---
title: Consume data streams in Real-Time hub
description: This article describes how to consume data streams in Real-Time hub. Process using transformations in eventstreams, add KQL destination to send it to a KQL table and analyze it, and set alerts. 
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 05/21/2024
---

# Consume data streams in Real-Time hub
There are two types of data streams in Real-Time hub: **Stream** and **Table**. 

## Consume streams
Here are a few ways to consume streams in Real-Time hub:

- Process a stream using transformations 
- Send output to a KQL Database destination and analyze data in the KQL tables
- Set alerts based on data in the data streams

In Real-Time hub, when you create data streams to get events from the [supported sources](supported-sources.md), an [eventstream](../real-time-intelligence/event-streams/overview.md) is created for you. You can open the eventstream associated with a data stream by using one of the following ways: 

- At the end of creating this data stream, on the **Review and create** page, you see the **Open eventstream** link to open the eventstream associated with the data stream in an editor. 
- On the **Data streams** tab, move the mouse over a data stream whose parent is an eventstream, and select the **Open** link, on select **... (ellipsis)**, and then select **Open eventstream**. 
- Select a data stream whose parent is an eventstream on the **Data streams** tab to see a stream detail page. On this page, you can select **Open eventstream** link on the ribbon.  

[!INCLUDE [preview-note](./includes/preview-note.md)]

### Process using transformations in Fabric event streams
After you open the eventstream in an editor, you can add transformations such as Aggregate, Expand, Filter, Group by, Manage fields, and Union, on the event data streaming into Fabric, and then send the output data from transformations into supported destinations. For more information about transformations, see [Supported transformation operations](../real-time-intelligence/event-streams/route-events-based-on-content?branch=release-build-fabric.md#supported-operations). 

:::image type="content" source="./media/consume-data-streams/transform-operations.png" alt-text="Screenshot that shows the transformation operations available on a stream.":::

### Send output from data stream to KQL table and analyze it
After you open an eventstream in the editor, you can [add a KQL database destination](../real-time-intelligence/event-streams/add-destination-kql-database.md). When data is output to a KQL table, you can run queries against the KQL table to analyze the data.

### Set alerts on data streams
You can set alerts on a data stream whose parent is an eventstream. An alert has a condition to check, for example `is BikepointID is greater than 50`, and actions to take when the condition is satisfied on the incoming data. These actions can be sending an email, messaging in Teams, or running a Fabric item such as a data pipeline. For more information, see [Set alerts on data streams](set-alerts-data-streams.md).

## Consume tables
You can open the KQL database that's associated with a table by using one of the following ways: 

- On the **Data streams** tab, move the mouse over a data stream of table type, and select the **Open** link, on select **... (ellipsis)**, and then select **Open KQL Database**. 
- Select a KQL table on the **Data streams** tab to see a table detail page. On this page, you can select **Open KQL Database** link on the ribbon.  

After you open the table, you can run queries against the tables in the database. 


