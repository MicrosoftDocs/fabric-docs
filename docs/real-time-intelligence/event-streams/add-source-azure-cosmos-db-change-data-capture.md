---
title: Add Azure Cosmos DB CDC source to an eventstream
description: Learn how to add an Azure Cosmos DB Change Data Capture (CDC) source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 04/29/2024
ms.search.form: Source and Destination
---

# Add Azure Cosmos DB CDC source to an eventstream

This article shows you how to add an Azure Cosmos DB Change Data Capture source to an eventstream. The Azure Cosmos DB Change Data Capture (CDC) source connector for Microsoft Fabric event streams lets you capture a snapshot of the current data in an Azure Cosmos DB database.

The connector then monitors and records any future row-level changes to this data. Once the changes are captured in the eventstream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis.

## Prerequisites

- Access to the Fabric **premium workspace** with **Contributor** or higher permissions.
- Access to an Azure Cosmos DB account and database.

## Get connection details from the Azure portal

The labels for the items you need to collect from the Azure portal vary depending on the API your Azure Cosmos DB account uses. You always need the endpoint URI, in a format like `https://<account>.<api>.azure.com:<port>/`, the Primary Key, and the Database name and item IDs you want to collect data for.

### Azure Cosmos DB for NoSQL

1. On the Azure portal page for your Azure Cosmos DB account, select **Keys** under **Settings** in the left navigation.

1. On the **Keys** page, copy the **URI** and **Primary key** values to use for setting up the eventstream connection.

   ![A screenshot of the URI and Primary key on the Azure Cosmos DB Keys page in the Azure portal.](media/add-source-azure-cosmos-db-change-data-capture/uri.png)

1. On the Azure portal **Overview** page for your Azure Cosmos DB account, note the **Database** and item **ID** you want to collect data for.

   ![A screenshot of the Containers listing for an Azure Cosmos DB NoSQL API account.](media/add-source-azure-cosmos-db-change-data-capture/containers.png)

### Azure Cosmos DB for Table

1. On the Azure portal page for your Azure Cosmos DB account, select **Connection strings** under **Settings** in the left navigation.

1. On the **Connection strings** page, copy the **Endpoint** and **Primary key** values to use for setting up the eventstream connection.

   ![A screenshot of the Endpoint and Primary key on the Azure Cosmos DB Connection strings page in the Azure portal.](media/add-source-azure-cosmos-db-change-data-capture/endpoint.png)

1. On the Azure portal **Overview** page for your Azure Cosmos DB account, note the **Database** and item **ID** you want to collect data for.

   ![A screenshot of the Tables listing for an Azure Cosmos DB NoSQL API account.](media/add-source-azure-cosmos-db-change-data-capture/tables.png)

## Add Azure Cosmos DB (CDC) as a source

1. In Fabric Real-Time Intelligence, select **Eventstream** to create a new eventstream. Make sure the **Enhanced Capabilities (preview)** option is enabled.

   ![A screenshot of creating a new eventstream.](media/external-sources/new-eventstream.png)

1. On the next screen, select **Add external source**.

   ![A screenshot of selecting Add external source.](media/external-sources/add-external-source.png)

## Configure and connect to Azure Cosmos DB (CDC)

[!INCLUDE [azure-cosmos-db-connector](./includes/azure-cosmos-db-cdc-source-connector.md)]

You see the Azure CosmosDB (CDC) source added to your eventstream in **Edit mode**.

   ![A screenshot of the added Azure Cosmos DB CDC source in Edit mode with the Publish button highlighted.](media/add-source-azure-cosmos-db-change-data-capture/edit-mode.png)

Select **Publish** to publish the changes and begin streaming Azure Cosmos DB CDC data to the eventstream.

   ![A screenshot of the published eventstream with Azure Cosmos DB source in Live View.](media/add-source-azure-cosmos-db-change-data-capture/live-view.png)

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)