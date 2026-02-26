---
title: Azure Cosmos DB CDC connector for Fabric event streams
description: Include file that provides the common content for configuring an Azure Cosmos DB Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.reviewer: xujiang1
ms.topic: include
ms.date: 11/18/2024
---

1. On the **Connect** screen, under **Connection**, select **New connection** to create a cloud connection linking to your Azure Cosmos DB database.

    :::image type="content" source="media/azure-cosmos-db-cdc-source-connector/new-connection-link.png" alt-text="Screenshot that shows the Connect page with the New connection link selected." lightbox="media/azure-cosmos-db-cdc-source-connector/new-connection-link.png":::   
1. On the **Connection settings** screen, enter the following information:

   - **Cosmos DB Endpoint:** Enter the URI or Endpoint for your Cosmos DB account that you copied from the Azure portal.
   - **Connection name**: Automatically generated, or you can enter a new name for this connection.
   - **Account key:** Enter the Primary Key for your Azure Cosmos DB account that you copied from the Azure portal.

   :::image type="content" border="true" source="media/azure-cosmos-db-cdc-source-connector/connect.png" alt-text="A screenshot of the Connection settings for the Azure Cosmos DB CDC source.":::
1. Select **Connect**.

1. Provide the following information for your Azure Cosmos DB resources, and then select **Next**.

   - **Container ID:** Enter the name of the Azure Cosmos DB container or table you want to connect to.
   - **Database:** Enter the name of your Azure Cosmos DB database.
   - **Offset policy:** Select whether to start reading **Earliest** or **Latest** offsets if there's no commit.

        You can also change the **Source name** in the **Stream details** section on the right by selecting the **Pencil** button.

        :::image type="content" source="media/azure-cosmos-db-cdc-source-connector/details.png" alt-text="A screenshot of the connection details for the Azure Cosmos DB CDC source." lightbox="media/azure-cosmos-db-cdc-source-connector/details.png":::
    
1. On the **Review + connect** page, review the summary, and then select **Add**.

    :::image type="content" source="media/azure-cosmos-db-cdc-source-connector/review-connect.png" alt-text="Screenshot that shows the Review + connect page for the Azure Cosmos DB CDC source." lightbox="media/azure-cosmos-db-cdc-source-connector/review-connect.png":::

