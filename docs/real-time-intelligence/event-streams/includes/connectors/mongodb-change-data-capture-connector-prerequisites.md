---
title: MongoDB CDC connector - prerequisites
description: This file has the prerequisites for configuring a Mongo Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.reviewer: xujiang1
ms.topic: include
ms.date: 04/02/2026
---

The MongoDB CDC Connector for Eventstream allows you to stream Change Data Capture (CDC) events from MongoDB into Fabric Eventstream. It supports multiple MongoDB deployment types, including on-premises, cloud-hosted, and MongoDB Atlas, enabling a wide range of CDC scenarios. With this connector, you can capture real-time database changes and stream them directly into Eventstream for immediate processing and analytics.

## Prerequisites

- A workspace in Fabric capacity or Trial license mode, with **Contributor** or higher permissions.  
- A MongoDB cluster that is publicly accessible from your client IP address. If it resides in a protected network, connect to it by using [Eventstream connector vNet injection](../../streaming-connector-private-network-support-guide.md).
- Change Data Capture (CDC) enabled for the collections you want to capture.  
- An eventstream in Fabric. If you don’t have one, [create an eventstream](../../create-manage-an-eventstream.md).  

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

:::image type="content" source="./media/mongodb-change-data-capture-connector/database-access.png" alt-text="Screenshot that shows how to edit role for MongoDB database." lightbox="./media/mongodb-change-data-capture-connector/database-access.png":::

In MongoDB Atlas on MongoDB Cloud, go to **Network Access** and add your client IP address to the IP Access List.

:::image type="content" source="./media/mongodb-change-data-capture-connector/network-configuration.png" alt-text="Screenshot that shows how to add IP list." lightbox="./media/mongodb-change-data-capture-connector/network-configuration.png":::
