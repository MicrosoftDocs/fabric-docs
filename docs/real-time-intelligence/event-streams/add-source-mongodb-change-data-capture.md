---
title: Add MongoDB CDC source to an eventstream
description: Learn how to add MongoDB CDC source to an eventstream.
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 09/22/2025
ms.search.form: Source and Destination
---

# Add MongoDB CDC source to an eventstream (preview)

This article shows you how to add a MongoDB Change Data Capture(CDC) source to an eventstream.

The MongoDB CDC Connector for Eventstream allows you to stream Change Data Capture (CDC) events from MongoDB into Fabric Eventstream. It supports multiple MongoDB deployment types, including on-premises, cloud-hosted, and MongoDB Atlas, enabling a wide range of CDC scenarios. With this connector, you can capture real-time database changes and stream them directly into Eventstream for immediate processing and analytics.

[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites

- A workspace in Fabric capacity or Trial license mode, with **Contributor** or higher permissions.  
- A MongoDB cluster that is accessible from your client IP address.  
- Change Data Capture (CDC) enabled for the collections you want to capture.  
- An eventstream in Fabric. If you don’t have one, [create an eventstream](create-manage-an-eventstream.md).  

## Set up a MongoDB instance

This example uses **MongoDB Atlas**, the managed MongoDB service on MongoDB Cloud. 

To capture changes, you must enable Change Data Capture (CDC) for the target collections.

Run the following command in the MongoDB shell to enable CDC for a collection:

```javascript
db.runCommand({
  collMod: "<collectionName>",
  changeStreamPreAndPostImages: { enabled: true }
});
```
> [!NOTE]
> You need a user with the `atlasAdmin` role, which includes the collMod action, to run this command. If you don’t have these permissions, ask a colleague with the `atlasAdmin` role to enable Change Data Capture (CDC) for the target collections before capturing changes in your eventstream.

You must also create or use an existing MongoDB user with the `read` role (or higher) on the target database. In MongoDB Atlas on MongoDB Cloud, go to **Database Access** to verify the user’s role.

:::image type="content" source="./media/add-source-mongodb-change-data-capture/database-access.png" alt-text="Screenshot that shows how to edit role for MongoDB database." lightbox="./media/add-source-mongodb-change-data-capture/database-access.png":::

In MongoDB Atlas on MongoDB Cloud, go to **Network Access** and add your client IP address to the IP Access List.

:::image type="content" source="./media/add-source-mongodb-change-data-capture/network-configuration.png" alt-text="Screenshot that shows how to add ID list." lightbox="./media/add-source-mongodb-change-data-capture/network-configuration.png":::

## Add MongoDB (CDC) as a source
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **MongoDB (CDC)** tile.

:::image type="content" source  ="./media/add-source-mongodb-change-data-capture/select-mongodb.png" alt-text="Screenshot that shows the selection of MongoDB (CDC) as the source type in the Get events wizard." lightbox="./media/add-source-mongodb-change-data-capture/select-mongodb.png":::

## Configure and connect to MongoDB (CDC) 

[!INCLUDE [mysql-database-cdc-connector](./includes/mongodb-change-data-capture-connector.md)]

## View updated eventstream
You see the MongoDB (CDC) source added to your eventstream in **Edit mode**.

:::image type="content" source="media/add-source-mongodb-change-data-capture/edit-mode.png" alt-text="A screenshot of the added MongoDB CDC source in Edit mode with the Publish button highlighted." lightbox="media/add-source-mongodb-change-data-capture/edit-mode.png":::

You see the eventstream in Live mode. Select **Edit** on the ribbon to get back to the Edit mode to update the eventstream.

:::image type="content" source="media/add-source-mongodb-change-data-capture/live-view.png" alt-text="A screenshot of the added MongoDB CDC source in Live mode." lightbox="media/add-source-mongodb-change-data-capture/live-view.png":::

## Limitation
* The MongoDB CDC source currently does not support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Attempting to export or import an Eventstream item with this source to a Git repository may result in errors.    


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
