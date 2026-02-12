---
title: Add HTTP source to an eventstream
description: Learn how to add HTTP source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author:  alexlzx
ms.topic: how-to
ms.custom:
ms.date: 12/03/2025
ms.search.form: Source and Destination
---

# Add HTTP source to an eventstream (preview)

This article shows you how to add an HTTP source to an eventstream.

The HTTP connector provides a no-code, configurable way to stream data from any REST API directly into Eventstream for real-time processing. It allows you to continuously pull data from SaaS platforms and public data feeds and automatically parse JSON responses into structured events. It also offers example public feeds to help you get started quickly—simply select an example API, enter your API key, and let Eventstream prefill the required headers and parameters.

## Prerequisites

- A workspace with **Fabric** capacity or **Fabric Trial** workspace type.
- Access to the workspace with **Contributor** or higher workspace roles.
- If you don't have an eventstream, follow the guide to [create an eventstream](create-manage-an-eventstream.md).

## Add HTTP as a source
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

Search for **http**, and select **Connect** to add the HTTP connector to your eventstream.

:::image type="content" source="media/add-source-http/select-http.png" alt-text="Screenshot that shows the selection of HTTP as the source type in the Select a data source wizard." lightbox="media/add-source-http/select-http.png":::

## Configure and connect to HTTP

[!INCLUDE [http-source-connector](./includes/http-source-connector.md)]

You can see the HTTP source added to your eventstream in **Edit mode**.

   :::image type="content" border="true" source="media/add-source-http/edit-mode.png" alt-text="A screenshot of the added HTTP source in Edit mode with the Publish button highlighted.":::

Select **Publish** to publish the changes and begin streaming data from HTTP source to the eventstream.

   :::image type="content" border="true" source="media/add-source-http/live-view.png" alt-text="A screenshot of the added HTTP source in Live view with the Publish button highlighted.":::

## Limitation

- The HTTP connector currently supports only **JSON** API responses.
- **OAuth authentication** is not supported.
- The HTTP source does not support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Exporting or importing an Eventstream item that includes this source through Git may result in errors.

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
