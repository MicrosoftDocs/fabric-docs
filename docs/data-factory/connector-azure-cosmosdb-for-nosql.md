---
title: Set up your Azure Cosmos DB for NoSQL connection
description: This article provides information about how to create an Azure Cosmos DB for NoSQL connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Azure Cosmos DB for NoSQL connection

This article outlines the steps to create an Azure Cosmos DB for NoSQL connection.

## Supported authentication types

The Azure Cosmos DB for NoSQL connector supports the following authentication types for copy and Dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Account key| √| n/a|

## Set up your connection in Dataflow Gen2

The Azure Cosmos DB for NoSQL connector isn't currently supported in Dataflow Gen2.

## Set up your connection in a data pipeline

To create a connection in a data pipeline:

1. From the page header in the [!INCLUDE [product-name](../includes/product-name.md)] service, select **Settings** ![Settings gear icon](media/connector-common/settings.png) > **Manage connections and gateways**.

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the new page." lightbox="./media/connector-common/add-new-connection.png":::

    The **New connection** pane opens on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Setup connection

### Step 1: Specify the new connection name, type, account endpoint and database

   :::image type="content" source="media/connector-cosmosdbnosql/connection-details.png" alt-text="Screenshot showing how to set new connection":::

In the **New connection** pane, choose **Cloud**, and specify the following field:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select **Azure CosmosDB (Data pipeline)** for your connection type.
- **Account Endpoint**: Enter your account endpoint URL of your Azure Cosmos DB for NoSQL.
- **Database**: Enter the database ID of your Azure Cosmos DB for NoSQL.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication method from the drop-down list and complete the related configuration. The Azure Cosmos DB for NoSQL connector supports the following authentication types:

- [Key](#key-authentication)

:::image type="content" source="media/connector-cosmosdbnosql/authentication-method.png" alt-text="Screenshot showing that authentication method of Azure Cosmos DB for NoSQL.":::

#### Key authentication

**Account key**: Specify the account key of your Azure Cosmos DB for NoSQL connection. Go to your Azure Cosmos DB for NoSQL account interface, browse to the **Keys** section, and get your account key.  

:::image type="content" source="media/connector-cosmosdbnosql/key-authentication.png" alt-text="Screenshot showing that key authentication method of Azure Cosmos DB for NoSQL.":::

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, see privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation will be successfully tested and saved if all the credentials are correct. If not correct, the creation will fail with errors.

:::image type="content" source="./media/connector-cosmosdbnosql/connection.png" alt-text="Screenshot showing the connection page." lightbox="./media/connector-cosmosdbnosql/connection.png":::

## Table summary

The connector properties in the following table are supported in pipeline copy:

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select **Azure CosmosDB (Data pipeline)** for your connection type.|Yes||✓|
|**Account Endpoint**|Enter your Azure Cosmos DB for NoSQL account endpoint URL.|Yes||✓|
|**Database**|Enter the Azure Cosmos DB for NoSQL database ID.|Yes||✓|
|**Authentication**|Go to [Authentication](#authentication). |Yes|Go to [Authentication](#authentication).|Go to [Authentication](#authentication).|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, and **Public**.|Yes||✓|

### Authentication

The properties in the following table are the supported authentication types.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Key**||||✓|
|- Account key|The  Azure Cosmos DB for NoSQL account key.|Yes |||

## Related content

- [Configure Azure Cosmos DB for NoSQL in a copy activity](connector-azure-cosmosdb-for-nosql-copy-activity.md)
