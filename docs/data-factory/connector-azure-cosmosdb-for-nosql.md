---
title: Set up your Azure Cosmos DB for NoSQL connection
description: This article provides information about how to create an Azure Cosmos DB for NoSQL connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 10/30/2025
ms.custom:
- template-how-to
- connectors
- sfi-image-nochange
---

# Set up your Azure Cosmos DB for NoSQL connection

This article outlines the steps to create an Azure Cosmos DB for NoSQL connection in Microsoft Fabric pipelines.

## Supported authentication types

The Azure Cosmos DB for NoSQL connector supports the following authentication types:

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Account key| √| n/a|

## Set up your connection for Dataflow Gen2

The Azure Cosmos DB for NoSQL connector isn't currently supported in Dataflow Gen2.

## Set up your connection for a pipeline

To create a connection for a Microsoft Fabric pipeline:

1. From the page header in Microsoft Fabric, select **Settings** :::image type="icon" source="media/connector-common/settings.png"::: > **Manage connections and gateways**.

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open the manage connections and gateways menu.":::

1. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the new page." lightbox="./media/connector-common/add-new-connection.png":::

    The **New connection** pane opens on the left side of the page where you can [set up your connection](#set-up-connection).

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Set up connection

A summary of the connector properties supported in a pipeline is provided in the following table:

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select **Azure CosmosDB (Pipeline)** for your connection type.|Yes||✓|
|**Account Endpoint**|Enter your Azure Cosmos DB for NoSQL account endpoint URL.|Yes||✓|
|**Database**|Enter the Azure Cosmos DB for NoSQL database ID.|Yes||✓|
|**Authentication**|Go to [Authentication](#account-key-authentication). |Yes|Go to [Authentication](#account-key-authentication).|Go to [Authentication](#account-key-authentication).|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, and **Public**.|Yes||✓|

For specific steps to set up your connection, follow these instructions:

1. In the **New connection** pane, choose **Cloud**, and specify the following field:

   - **Connection name**: Specify a name for your connection.
   - **Connection type**: Select **Azure CosmosDB (Pipeline)** for your connection type.
   - **Account Endpoint**: Enter your account endpoint URL of your Azure Cosmos DB for NoSQL.
   - **Database**: Enter the database ID of your Azure Cosmos DB for NoSQL.

   :::image type="content" source="media/connector-cosmosdbnosql/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

1. Under **Authentication method**, select your authentication method from the drop-down list and complete the related configuration. The Azure Cosmos DB for NoSQL connector supports the following authentication types:

    - [Account key](#account-key-authentication)

    :::image type="content" source="media/connector-cosmosdbnosql/authentication-method.png" alt-text="Screenshot showing that authentication method of Azure Cosmos DB for NoSQL.":::

1. In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Allowed values are **Organizational**, **Privacy**, and **Public**. For more information, see [privacy levels in the Power Query documentation](/power-query/privacy-levels).

1. Select **Create**. Your creation is successfully tested if all the credentials are correct. If not correct, the creation fails with errors.

    :::image type="content" source="./media/connector-cosmosdbnosql/connection.png" alt-text="Screenshot showing the connection page." lightbox="./media/connector-cosmosdbnosql/connection.png":::

## Account key authentication

**Account key**: Specify the account key of your Azure Cosmos DB for NoSQL connection. Go to your Azure Cosmos DB for NoSQL account interface, browse to the **Keys** section, and get your account key.  

:::image type="content" source="media/connector-cosmosdbnosql/key-authentication.png" alt-text="Screenshot showing that key authentication method of Azure Cosmos DB for NoSQL.":::

Select **Create**. Your creation is successfully tested if all the credentials are correct. If not correct, the creation fails with errors.

:::image type="content" source="./media/connector-cosmosdbnosql/connection.png" alt-text="Screenshot showing the connection page." lightbox="./media/connector-cosmosdbnosql/connection.png":::

## Related content

- [Configure Azure Cosmos DB for NoSQL in a copy activity](connector-azure-cosmosdb-for-nosql-copy-activity.md)
