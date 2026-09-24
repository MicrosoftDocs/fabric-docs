---
title: Azure SQL Managed Instance Change Data Capture Source in Fabric Eventstream
description: Azure SQL Managed Instance CDC can stream real-time data changes to your eventstream. Learn how to configure and connect this source step by step.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 04/03/2026
author: spelluru
ms.author: spelluru
ms.search.form: Source and Destination
---

# Add Azure SQL Managed Instance CDC source to an eventstream

This article shows you how to add an Azure SQL Managed Instance Change Data Capture (CDC) source to an eventstream. 

[!INCLUDE [azure-sql-managed-instance-cdc-source-connector-prerequisites](./includes/connectors/azure-sql-managed-instance-cdc-source-connector-prerequisites.md)]

## Add Azure SQL Managed Instance CDC as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure SQL MI Database (DB) Change Data Capture (CDC)** tile.

## Configure and connect to Azure SQL Managed Instance CDC

[!INCLUDE [azure-sql-managed-instance-cdc-source-connector-configuration](./includes/connectors/azure-sql-managed-instance-cdc-source-connector-configuration.md)]

## View updated eventstream

You can see the Azure SQL MI DB (CDC) source added to your eventstream in **Edit** mode.

:::image type="content" source="media/add-source-azure-sql-managed-instance-change-data-capture/edit-mode.png" alt-text="A screenshot of the added Azure SQL MI DB CDC source in Edit mode with extended features." lightbox="media/add-source-azure-sql-managed-instance-change-data-capture/edit-mode.png":::

To implement this newly added Azure SQL Managed Instance source, select **Publish**. After you complete these steps, your Azure SQL Managed Instance source is available for visualization in the **Live view**.

:::image type="content" source="media/add-source-azure-sql-managed-instance-change-data-capture/live-view.png" alt-text="A screenshot of the added Azure SQL MI DB CDC source in Live view mode with extended features." lightbox="media/add-source-azure-sql-managed-instance-change-data-capture/live-view.png":::

[!INCLUDE [configure-destintions-schema-enabled-sources](./includes/configure-destinations-schema-enabled-sources.md)]

### View DeltaFlow analytics-ready output (Preview)

If you enabled **Analytics-ready events & auto-updated schema** (DeltaFlow), the destination tables are automatically created in a shape that mirrors your source database tables. Each table includes the original columns along with metadata columns for the change type and timestamp.

> [!NOTE]
> The following screenshot shows Azure SQL Database CDC. The DeltaFlow destination table output is the same for all supported CDC source connectors.

:::image type="content" source="includes/media/configure-destinations-schema-enabled-sources/delta-flow-destination-tables.gif" alt-text="Screenshot showing the Eventhouse destination tables created by DeltaFlow in analytics-ready shape." lightbox="includes/media/configure-destinations-schema-enabled-sources/delta-flow-destination-tables.gif":::

You can query these tables using Kusto Query Language (KQL) or other analytics tools without needing to parse raw Debezium CDC payloads.


## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)


