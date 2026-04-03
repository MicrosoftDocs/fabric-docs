---
title: PostgreSQL Database CDC Source in Fabric Real-Time Hub
description: This article describes how to add PostgreSQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.custom:
- references_regions
- sfi-image-nochange
ms.date: 04/02/2026
---

# Add PostgreSQL Database CDC as source in Real-Time hub

This article describes how to add PostgreSQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.

[!INCLUDE [postgresql-database-cdc-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/postgresql-database-cdc-source-connector-prerequisites.md)]

## Navigate to Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Select PostgreSQL Database CDC as source type

On the **Data sources** page, select **Microsoft sources** category at the top, and then select **Connect** on the **Azure DB for PostgreSQL (CDC)** tile. 

:::image type="content" source="./media/add-source-postgresql-database-cdc/select-postgresql-cdc.png" alt-text="Screenshot that shows the selection of Azure Database (DB) for PostgreSQL (CDC) as the source type in the Data sources page." lightbox="./media/add-source-postgresql-database-cdc/select-postgresql-cdc.png":::

## Configure Azure Database for PostgreSQL CDC source

[!INCLUDE [postgresql-database-cdc-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/postgresql-database-cdc-source-connector-prerequisites.md)]


## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected PostgreSQL Database CDC as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-postgresql-database-cdc/review-create-success.png" alt-text="Screenshot that shows the Review + connect success page." lightbox="./media/add-source-postgresql-database-cdc/review-create-success.png":::
1. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

