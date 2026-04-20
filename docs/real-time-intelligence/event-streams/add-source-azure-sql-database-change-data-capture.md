---
title: Azure SQL Database CDC Source in Fabric Eventstream
description: Add an Azure SQL Database CDC source to your eventstream with this step-by-step guide. Configure your connection, publish, and visualize live data. Try it today.
#customer intent: As a data engineer, I want to add an Azure SQL Database CDC source to my eventstream so that I can capture and stream real-time data changes from my SQL database.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 04/02/2026
author: spelluru
ms.author: spelluru
ms.search.form: Source and Destination
---

# Add Azure SQL Database CDC source to an eventstream

This article shows you how to add an Azure SQL Database Change Data Capture (CDC) source to an eventstream.

[!INCLUDE [azure-sql-database-cdc-connector-prerequisites](./includes/connectors/azure-sql-database-change-data-capture-connector-prerequisites.md)]
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 


## Launch the Select a data source wizard

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure SQL DB (CDC)** tile.

:::image type="content" source="./media/add-source-azure-sql-database-change-data-capture/select-azure-sql-db-cdc.png" alt-text="Screenshot that shows the selection of Azure SQL Database (DB) CDC as the source type in the Get events wizard." lightbox="./media/add-source-azure-sql-database-change-data-capture/select-azure-sql-db-cdc.png":::

## Configure and connect to Azure SQL Database CDC

[!INCLUDE [azure-sql-database-change-data-capture-connector-configuration](./includes/connectors/azure-sql-database-change-data-capture-connector-configuration.md)]

## View updated eventstream

1. You can see the Azure SQL Database (CDC) source added to your eventstream in **Edit mode**.

    :::image type="content" source="media/add-source-azure-sql-database-change-data-capture/edit-view.png"     alt-text="Screenshot of streaming Azure SQL Database CDC source in Edit view." lightbox="media/add-source-azure-sql-database-change-data-capture/edit-view.png":::
1. To implement this newly added Azure SQL Database CDC source, select **Publish**. After you complete these steps, your Azure SQL Database CDC source is available for visualization in the **Live view**.

    :::image type="content" source="media/add-source-azure-sql-database-change-data-capture/live-view.png"     alt-text="Screenshot of streaming Azure SQL Database CDC source in Live view." lightbox="media/add-source-azure-sql-database-change-data-capture/live-view.png":::


[!INCLUDE [configure-destintions-schema-enabled-sources](./includes/configure-destinations-schema-enabled-sources.md)]

### View DeltaFlow analytics-ready output (Preview)

If you enabled **Analytics-ready events & auto-updated schema** (DeltaFlow), the destination tables are automatically created in a shape that mirrors your source database tables. Each table includes the original columns along with metadata columns for the change type and timestamp.

:::image type="content" source="includes/media/configure-destinations-schema-enabled-sources/delta-flow-destination-tables.gif" alt-text="Screenshot showing the Eventhouse destination tables created by DeltaFlow in analytics-ready shape." lightbox="includes/media/configure-destinations-schema-enabled-sources/delta-flow-destination-tables.gif":::

You can query these tables using Kusto Query Language (KQL) or other analytics tools without needing to parse raw Debezium CDC payloads.

::: zone-end

## Related content

Other connectors include:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure Service Bus](add-source-azure-service-bus.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)
