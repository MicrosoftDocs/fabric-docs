---
title: Analyze data streams in Real-Time hub
description: This article describes how to analyze data streams in Real-Time hub. Process using transformations in eventstreams, add KQL destination to send it to a KQL table and analyze it. 
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 05/21/2024
---

# Analyze data streams in Real-Time hub (preview)
There are two types of data streams in Real-Time hub: **Stream** and **Table**. This article shows how to analyze streams and tables in Real-Time hub.

:::image type="content" source="./media/analyze-data-streams-using-kql-table-queries/stream-types.png" alt-text="Screenshot that shows the types of streams available in Real-Time hub.":::

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Analyze streams
To analyze a stream whose parent is an eventstream, do the following steps:

1. Open the eventstream associated with the data stream in Real-Time hub.
1. Add a KQL Database destination to the eventstream to send the data to a KQL table. 
1. Open KQL database and run queries against the KQL table. 

The following sections provide more details about these steps.

### Open eventstream
In Real-Time hub, when you get events from the [supported sources](supported-sources.md), an [eventstream](../real-time-intelligence/event-streams/overview.md) is created for you. You can open the eventstream by using one of the following ways: 

- **Get events** experience:

    At the end of creating this stream, on the **Review and create** page, you see the **Open eventstream** link to open the eventstream associated with the stream in an editor. 
- **Data streams** tab:

    Move the mouse over a stream whose parent is an eventstream, and select the **Open** link, or select **... (ellipsis)**, and then select **Open eventstream**. 
- **Detail page**:

    Select a stream whose parent is an eventstream on the **Data streams** tab to see a stream detail page. On this page, select **Open eventstream** link on the ribbon.  

### Add KQL Database destination to the eventstream
After you open an eventstream in the editor, you can [add a KQL database destination](../real-time-intelligence/event-streams/add-destination-kql-database.md). When data is output to a KQL table, you can run queries against the KQL table to analyze the data.

1. After you open the eventstream, select **Edit** on the ribbon to enter into the edit mode. 

    :::image type="content" source="./media/analyze-data-streams-using-kql-table-queries/edit-button.png" alt-text="Screenshot that shows the selection of the Edit button on the ribbon." lightbox="./media/analyze-data-streams-using-kql-table-queries/edit-button.png":::   
1. Add a KQL Database destination. Select **Transform events or add destination** tile or **Transform events** on the ribbon, and then select **KQL Database**. 

    :::image type="content" source="./media/analyze-data-streams-using-kql-table-queries/add-destination-kql-database-menu.png" alt-text="Screenshot that shows the selection of the KQL Database in the list of destinations." lightbox="./media/analyze-data-streams-using-kql-table-queries/add-destination-kql-database-menu.png":::   
1. Configure the KQL Database destination by following instructions from [Add KQL Database destination to an eventstream](../real-time-intelligence/event-streams/add-destination-kql-database.md). 
1. Wait for the data to be streamed into the KQL destination. Verify the status of streaming into the KQL database on the canvas. 
1. Select the destination tile and switch to the **Details** tab in the bottom pane.
1. Select **Open item** to open the destination KQL database.

    :::image type="content" source="./media/analyze-data-streams-using-kql-table-queries/kql-database-destination.png" alt-text="Screenshot that shows the selection of the KQL Database tile on the canvas and a link to open KQL database in the Details pane at the bottom." lightbox="./media/analyze-data-streams-using-kql-table-queries/kql-database-destination.png":::   
1. Now, Run queries against the destination KQL table to analyze the data streaming into the KQL database. 

## Analyze tables

You can open the KQL database that's associated with a table by using one of the following ways: 

- On the **Data streams** tab, move the mouse over a data stream of table type, and select the **Open** link, or select **... (ellipsis)**, and then select **Open KQL Database**. 

    :::image type="content" source="./media/analyze-data-streams-using-kql-table-queries/open-kql-database-list.png" alt-text="Screenshot that shows the Open KQL Database links for a stream of type Table." :::   
- Select a KQL table on the **Data streams** tab to see a table detail page. On this page, you can select **Open KQL Database** link on the ribbon.  

    :::image type="content" source="./media/analyze-data-streams-using-kql-table-queries/open-kql-database-detail.png" alt-text="Screenshot that shows the Open KQL Database links for a stream of type Table from the detail view." :::   

After you open the table, you can run queries against the tables in the database. 


