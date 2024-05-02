---
title: Azure Cosmos DB CDC connector for Fabric event streams
description: This include file has the common content for configuring an Azure Cosmos DB Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 04/29/2024
---

1. On the **Select a data source** screen, select **Azure Cosmos DB (CDC)**.

   ![A screenshot of selecting Azure Cosmos DB (CDC).](media/azure-cosmos-db-cdc-source-connector/select-cosmos.png)

1. On the **Connect** screen, under **Connection**, select **New connection** to create a cloud connection linking to your Azure Cosmos DB database.

1. On the **Connection settings** screen, enter the following information:

   - **Cosmos DB Endpoint:** Enter the URI or Endpoint for your Cosmos DB account that you copied from the Azure portal.
   - **Connection name**: Automatically generated, or you can enter a new name for this connection.
   - **Account key:** Enter the Primary Key for your Azure Cosmos DB account that you copied from the Azure portal.

   ![A screenshot of the Connection settings for the Azure Cosmos DB CDC source.](media/azure-cosmos-db-cdc-source-connector/connect.png)

1. Select **Connect**.

1. Provide the following information for your Azure Cosmos DB resources:

   - **Container ID:** Enter the name of the Azure Cosmos DB container or table you want to connect to.
   - **Database:** Enter the name of your Azure Cosmos DB database.
   - **Offset policy:** Select whether to start reading **Earliest** or **Latest** offsets if there's no commit.

   ![A screenshot of the connection details for the Azure Cosmos DB CDC source.](media/azure-cosmos-db-cdc-source-connector/details.png)

1. Select **Next**.

1. Review the summary, and then select **Add**.
