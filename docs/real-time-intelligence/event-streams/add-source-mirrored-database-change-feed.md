---
title: Add Mirrored Database Change Feed source to an eventstream
description: Learn how to add a Mirrored Database (Change Feed) source to an eventstream to stream real-time change events from Fabric Mirrored Databases.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/23/2026
ms.search.form: Source and Destination
---

# Add Mirrored Database (Change Feed) source to an eventstream

This article shows you how to add a Mirrored Database (Change Feed) source to an eventstream.

The Mirrored Database (Change Feed) source connector for Microsoft Fabric event streams allows you to ingest real-time change events from a [Fabric Mirrored Database](/fabric/database/mirrored-database/overview). Mirrored databases in Fabric provide a near real-time, read-only replica of your external database data. With this connector, you can capture inserts, updates, and deletes as they happen in the mirrored database and stream them into an eventstream for real-time processing, analytics, and routing to various Fabric destinations.

This connector supports all mirrored database types available in Fabric Mirroring, including:

- Azure SQL Database
- Azure Cosmos DB
- Snowflake
- Open Mirroring

> [!NOTE]
> This connector is currently in **Preview**. The connector ingests raw change feed events from the mirrored database. DeltaFlow (analytics-ready event transformation) isn't currently supported with this connector.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the Trial license mode with Contributor or higher permissions.
- An existing [Mirrored Database](/fabric/database/mirrored-database/overview) in your Fabric workspace that is actively syncing data from the source database.
- The mirrored database must have [change feed enabled](/fabric/mirroring/extended-capabilities).
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md).

## Launch the Connect data sources wizard

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for **Mirrored database** and select **Connect** on the **Mirrored database (Change Feed)** tile.

<!-- Add screenshot of the Mirrored database (Change Feed) tile in the data source wizard -->
:::image type="content" source="./media/add-source-mirrored-database-change-feed/select-mirrored-database-change-feed.png" alt-text="Screenshot that shows the selection of Mirrored database (Change Feed) as the source type in the Get events wizard." lightbox="./media/add-source-mirrored-database-change-feed/select-mirrored-database-change-feed.png":::

## Configure and connect to Mirrored Database Change Feed

[!INCLUDE [mirrored-database-change-feed-connector](./includes/mirrored-database-change-feed-source-connector.md)]

## View updated eventstream

1. To implement this newly added Mirrored Database (Change Feed) source, select **Publish**. After you complete these steps, your Mirrored Database (Change Feed) source is available for visualization in the **Live view**.

    <!-- Add screenshot of Live view -->
    :::image type="content" source="media/add-source-mirrored-database-change-feed/live-view-mirrored-db-source.png" alt-text="Screenshot of streaming Mirrored Database Change Feed source in Live view." lightbox="media/add-source-mirrored-database-change-feed/live-view-mirrored-db-source.png":::

[!INCLUDE [configure-destintions-schema-enabled-sources](./includes/configure-destinations-schema-enabled-sources.md)]

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB CDC](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure Service Bus](add-source-azure-service-bus.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database CDC](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md)
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)
