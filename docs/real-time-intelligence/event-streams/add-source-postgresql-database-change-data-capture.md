---
title: Add PostgreSQL Database CDC source to an eventstream
description: Learn how to add a PostgreSQL Database Change Data Capture (CDC) source to an eventstream in Microsoft Fabric to stream database changes in real time.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 06/10/2026
ms.search.form: Source and Destination

#customer intent: As a data engineer, I want to add a PostgreSQL Database CDC source to an eventstream so that I can stream database changes in real time for analytics and downstream processing.

---

# Add PostgreSQL Database CDC source to an eventstream

This article shows you how to add a PostgreSQL Database Change Data Capture (CDC) source to an eventstream.

With Change Data Capture (CDC), you can stream database changes—inserts, updates, and deletes—in real time without polling. By connecting PostgreSQL as a CDC source, you can build real-time analytics pipelines and keep downstream systems synchronized with your source data.

[!INCLUDE [postgresql-database-cdc-connector-prerequisites](./includes/connectors/postgresql-database-cdc-source-connector-prerequisites.md)]

## Launch the Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **PostgreSQL DB (CDC)** tile.

:::image type="content" source="./media/add-source-postgresql-database-cdc-connector/select-postgresql-cdc.png" alt-text="Screenshot that shows the selection of Azure Database (DB) for PostgreSQL (CDC) as the source type in the Get events wizard." lightbox="./media/add-source-postgresql-database-cdc-connector/select-postgresql-cdc.png":::

## Configure and connect to PostgreSQL Database CDC

[!INCLUDE [postgresql-database-cdc-connector-configuration](./includes/connectors/postgresql-database-cdc-source-connector-configuration.md)]

## View updated eventstream

1. The PostgreSQL Database CDC source appears in your eventstream in **Edit mode**.

    :::image type="content" source="media/add-source-postgresql-database-cdc-connector/edit-view.png" alt-text="Screenshot of the PostgreSQL DB CDC source in Edit view with extended features." lightbox="media/add-source-postgresql-database-cdc-connector/edit-view.png":::
1. To implement this newly added PostgreSQL DB CDC source, select **Publish**. After you complete these steps, your PostgreSQL DB CDC source is available for visualization in the **Live view**.

    :::image type="content" source="media/add-source-postgresql-database-cdc-connector/live-view.png" alt-text="Screenshot of the PostgreSQL DB CDC source in Live view with extended features." lightbox="media/add-source-postgresql-database-cdc-connector/live-view.png":::

[!INCLUDE [configure-destinations-schema-enabled-sources](./includes/configure-destinations-schema-enabled-sources.md)]

### View DeltaFlow analytics-ready output (Preview)

If you enabled **Analytics-ready events & auto-updated schema** (DeltaFlow), the destination tables are automatically created in a shape that mirrors your source database tables. Each table includes the original columns along with metadata columns for the change type and timestamp.

> [!NOTE]
> The following screenshot shows Azure SQL Database CDC. The DeltaFlow destination table output is the same for all supported CDC source connectors.

:::image type="content" source="includes/media/configure-destinations-schema-enabled-sources/delta-flow-destination-tables.gif" alt-text="Screenshot showing the Eventhouse destination tables created by DeltaFlow in analytics-ready shape." lightbox="includes/media/configure-destinations-schema-enabled-sources/delta-flow-destination-tables.gif":::

You can query these tables by using Kusto Query Language (KQL) or other analytics tools without needing to parse raw Debezium CDC payloads.

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure Service Bus](add-source-azure-service-bus.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md)
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)
