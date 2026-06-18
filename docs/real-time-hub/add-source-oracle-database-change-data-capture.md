---
title: Add Oracle Database CDC as source in Real-Time hub
description: This article describes how to add Oracle Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 06/18/2026
ai-usage: ai-assisted
---

# Add Oracle Database CDC as source in Real-Time hub

This article describes how to add Oracle Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.

[!INCLUDE [oracle-database-cdc-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/oracle-database-change-data-capture-source-connector-prerequisites.md)]

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Data sources** page, select **Database CDC** category at the top, and then select **Connect** on the **Oracle DB (CDC)** tile.

    :::image type="content" source="./media/add-source-oracle-change-data-capture/select-oracle-database-change-data-capture.png" alt-text="Screenshot that shows the selection of Oracle Database CDC on the Data sources page." lightbox="./media/add-source-oracle-change-data-capture/select-oracle-database-change-data-capture.png":::

    Use instructions from the [Add Oracle Database CDC as a source](#add-oracle-database-cdc-as-a-source) section.

## Add Oracle Database CDC as a source

[!INCLUDE [oracle-database-cdc-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/oracle-database-change-data-capture-source-connector-configuration.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Oracle Database CDC as a source. To close the wizard, select **Finish** at the bottom of the page.

1. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
