---
title: Azure Cosmos DB CDC - prerequisites and connection details
description: This include file has the prerequisites for adding an Azure Cosmos DB Change Data Capture (CDC) source and information on getting connection details.
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 11/18/2024
---

## Prerequisites

- Access to a workspace with the **Fabric** capacity or **Fabric Trial** workspace type with Contributor or higher permissions.
- Access to an **Azure Cosmos DB for NoSQL** account and database.
- Your Azure Cosmos DB for NoSQL database must be publicly accessible and not be behind a firewall or secured in a virtual network.
- If you don't have an eventstream, [create an eventstream](../create-manage-an-eventstream.md). 


## Get connection details from the Azure portal

The labels for the items you need to collect from the Azure portal are shown in the following steps. You always need the endpoint URI, in a format like `https://<account>.<api>.azure.com:<port>/`, the Primary Key, and the Database name and item IDs you want to collect data for.

> [!NOTE]
> Azure Cosmos DB for NoSQL CDC is using the [**Latest Version Mode**](/azure/cosmos-db/nosql/change-feed-modes?tabs=latest-version#latest-version-change-feed-mode) of [Azure Cosmos DB Change Feed](/azure/cosmos-db/change-feed). It captures the changes to records in the latest version. Note that Deletions are't captured with this mode.  


1. On the Azure portal page for your Azure Cosmos DB account, select **Keys** under **Settings** in the left navigation.

1. On the **Keys** page, copy the **URI** and **Primary key** values to use for setting up the eventstream connection.

   :::image type="content" border="true" source="media/azure-cosmos-db-cdc-source-prerequisites-connection-details/uri.png" alt-text="A screenshot of the URI and Primary key on the Azure Cosmos DB Keys page in the Azure portal.":::

1. On the Azure portal **Overview** page for your Azure Cosmos DB account, note the **Database** and item **ID** you want to collect data for.

   :::image type="content" border="true" source="media/azure-cosmos-db-cdc-source-prerequisites-connection-details/containers.png" alt-text="A screenshot of the Containers listing for an Azure Cosmos DB NoSQL API account.":::
