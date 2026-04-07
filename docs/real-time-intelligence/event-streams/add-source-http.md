---
title: HTTP Source in Fabric Eventstream
description: HTTP source for eventstreams lets you stream JSON API data in real time. Learn how to configure, connect, and publish an HTTP source in Microsoft Fabric.
#customer intent: As a data engineer, I want to add an HTTP source to my eventstream so that I can stream data from an HTTP endpoint into Microsoft Fabric for real-time processing.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 04/02/2026
author: spelluru
ms.author: spelluru
ms.search.form: Source and Destination
---

# Add HTTP source to an eventstream (preview)

This article shows you how to add an HTTP source to an eventstream.

[!INCLUDE [http-source-connector-prerequisites](./includes/connectors/http-source-connector-prerequisites.md)]
- If you don't have an eventstream, follow the guide to [create an eventstream](create-manage-an-eventstream.md).

## Add HTTP as a source
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

Search for **http**, and select **Connect** to add the HTTP connector to your eventstream.

:::image type="content" source="media/add-source-http/select-http.png" alt-text="Screenshot that shows the selection of HTTP as the source type in the Select a data source wizard." lightbox="media/add-source-http/select-http.png":::

## Configure and connect to HTTP

[!INCLUDE [http-source-connector-configuration](./includes/connectors/http-source-connector-configuration.md)]

You can see the HTTP source added to your eventstream in **Edit mode**.

   :::image type="content" border="true" source="media/add-source-http/edit-mode.png" alt-text="A screenshot of the added HTTP source in Edit mode with the Publish button highlighted.":::

Select **Publish** to publish the changes and begin streaming data from HTTP source to the eventstream.

   :::image type="content" border="true" source="media/add-source-http/live-view.png" alt-text="A screenshot of the added HTTP source in Live view with the Publish button highlighted.":::

[!INCLUDE [http-source-connector-limitations](./includes/connectors/http-source-connector-limitations.md)]

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)


