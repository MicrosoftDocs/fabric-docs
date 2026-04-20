---
title: Add Azure Cosmos DB CDC as source in Real-Time hub
description: This article describes how to add Azure Cosmos DB Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.custom:
  - references_regions
ms.date: 11/18/2024
---

# Add Azure Cosmos DB CDC as source in Real-Time hub

This article describes how to add **Azure Cosmos DB for NoSQL** Change Data Capture (CDC) as an event source in Fabric Real-Time hub.

[!INCLUDE [azure-cosmos-db-cdc-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/azure-cosmos-db-cdc-source-connector-prerequisites.md)]

## Get events from an Azure Cosmos DB CDC

You can get events from an Azure Cosmos DB CDC into Real-Time hub in one of the ways:

- [Using the **Add source** experience](#data-sources-page)
- [Using the **Microsoft sources** page](#microsoft-sources-page)

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Add Azure Cosmos DB CDC as a source](#add-azure-cosmos-db-cdc-as-a-source) section.

## Microsoft sources page

1. In Real-Time hub, select **Microsoft sources**.
1. In the **Source** drop-down list, select **Azure Cosmos DB (CDC)**.
1. For **Subscription**, select an **Azure subscription** that has the resource group with your Cosmos DB account.
1. For **Resource group**, select a **resource group** that has your Cosmos DB account.
1. For **Region**, select a location where your Cosmos DB is located.
1. Now, move the mouse over the name of the Cosmos DB CDC source that you want to connect to Real-Time hub in the list of databases, and select the **Connect** button, or select **... (ellipsis)**, and then select the **Connect** button.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Microsoft sources page with filters to show Cosmos DB CDC and the connect button." lightbox="./media/add-source-azure-cosmos-db-cdc/microsoft-sources-connect-button.png":::

    To configure connection information, use steps from the [Add Azure Cosmos DB CDC as a source](#add-azure-cosmos-db-cdc-as-a-source) section. Skip the first step of selecting Azure Cosmos DB CDC as a source type in the Add source wizard.

## Add Azure Cosmos DB CDC as a source

[!INCLUDE [azure-cosmos-db-cdc-source-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/azure-cosmos-db-cdc-source-connector-configuration.md)]


## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure Cosmos DB CDC as a source. To close the wizard, select **Close** or **X*** in the top-right corner of the page.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/review-create-success.png" alt-text="Screenshot that shows the Review + connect page after successful creation of the source." lightbox="./media/add-source-azure-cosmos-db-cdc/review-create-success.png":::
1. In Real-Time hub, select **All data streams**. To see the new data stream, refresh the **All data streams** page.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/verify-data-stream.png" alt-text="Screenshot that shows the Real-Time hub All data streams page with the stream you just created." lightbox="./media/add-source-azure-cosmos-db-cdc/verify-data-stream.png":::

    For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

