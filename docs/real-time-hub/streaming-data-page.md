---
title: Explore the Streaming Data Page in Real-Time Hub
description: Explore the Streaming data page in Fabric Real-Time hub to find streams and KQL tables, connect data, use samples, and manage streaming data.
#customer intent: As a Fabric user, I want to understand the Streaming data page so that I can discover and manage streaming data.
author: spelluru
ms.author: spelluru
ms.reviewer: majia
ms.topic: concept-article
ms.custom: doc-kit-assisted
ms.date: 07/20/2026
ai-usage: ai-assisted
---

# Explore the Streaming data page in Fabric Real-Time hub

The **Streaming data** page in Fabric Real-Time hub helps you discover and manage streams and Kusto Query Language (KQL) tables that you can access. The page layout changes based on whether you have streams or tables.

## Page with no streams or tables

If you don't have any streams or tables, the **Streaming data** page shows four sections.

:::image type="content" source="./media/get-started-real-time-hub/home-page-empty.png" alt-text="Screenshot of the Streaming data page showing common task cards, samples, and learning resources." lightbox="./media/get-started-real-time-hub/home-page-empty.png":::

### Common tasks

The first section provides shortcuts to common tasks:

- **Learn to monitor streaming data** - Open a walkthrough that shows you how to connect a real-time weather source to an eventstream, preview live data, and create an alert rule that sends a notification when a condition is met. For more information, see [Learn to monitor streaming data](tutorial-monitor-streaming-data.md).
- **Run operations** - Create an operations agent that monitors signals and runs workflows when specified conditions are met.
- **Act on dashboard conditions** - Create alerts on a real-time dashboard.
- **Act on Job events** - Create alerts on Fabric events. For more information, see [Set alerts for job events](set-alerts-fabric-job-events.md).
- **Subscribe to OneLake events** - Create streams based on Fabric OneLake events. For more information, see [Subscribe to OneLake events](create-streams-fabric-onelake-events.md#configure-and-create-an-eventstream).
- **Connect weather data** - Create a data stream based on real-time weather data. For more information, see [Real-Time weather source](add-source-real-time-weather.md).
- **Learn from a tutorial** - Open the [Fabric Real-Time Intelligence tutorial](/fabric/real-time-intelligence/tutorial-introduction).
- **Case study** - Read a [Real-Time Intelligence customer story](https://www.microsoft.com/customers/story/1770346240728000716-elcome-microsoft-copilot-consumer-goods-en-united-arab-emirates).

### Microsoft sources

The second section lists the types of Microsoft sources available in your Fabric tenant. Select a source type, such as **Azure Cosmos DB (CDC)**, to see the sources of that type. You can then select a source and create an eventstream for it.

### Jump-start and connect

The third section contains the **Jumpstart your experience** and **Connect data sources** subsections.

The **Jumpstart your experience** subsection has the following cards:

- **Try a sample scenario** - Explore the Bicycle rentals, Stock market, and Yellow taxi samples. Each sample creates a group of Fabric Real-Time Intelligence items that demonstrate how to stream, analyze, and visualize data. For more information, see [End-to-end Real-Time Intelligence sample](/fabric/real-time-intelligence/sample-end-to-end).
- **Free hands-on workshop** - Find hands-on workshops for Fabric Real-Time Intelligence.

The **Connect data sources** subsection has the following cards:

- **Explore Fabric events** - Open the **Fabric events** page, where you can subscribe to Fabric events and create eventstreams. For more information, see [Explore Fabric events](explore-fabric-events.md).
- **Connect data sources** - Open the **Add data** page to view supported sources and create streams.

### Learning resources

The fourth section links to these learning resources:

- [Real-Time Intelligence tutorial](/fabric/real-time-intelligence/tutorial-introduction)
- [Real-Time Intelligence documentation](/fabric/real-time-intelligence/)
- [Customer success stories](https://www.microsoft.com/customers/search?filters=product%3Aazure&q=Real-time+intelligence)
- [Microsoft Fabric partners](https://appsource.microsoft.com/marketplace/partner-dir?filter=sort%3D0%3BendorsedProduct%3DMicrosoft%2520Fabric;endorsedWorkloads=Real-Time%20Intelligence)
- [Real-Time Intelligence blog](https://blog.fabric.microsoft.com/blog/category/real-time-intelligence/)

## Page with streams or tables

When you have access to at least one eventstream or KQL table, the **Streaming data** page shows task cards and an **All data streams** section.

### Task cards

The task cards provide shortcuts to common actions.

:::image type="content" source="./media/get-started-real-time-hub/real-time-hub-task-cards.png" alt-text="Screenshot that shows task cards at the top of the Streaming data page." lightbox="./media/get-started-real-time-hub/real-time-hub-task-cards.png":::

- **Subscribe to OneLake events** - Create streams based on Fabric OneLake events. For more information, see [Subscribe to OneLake events](create-streams-fabric-onelake-events.md#configure-and-create-an-eventstream).
- **Act on Job events** - Create alerts on Fabric events. For more information, see [Set alerts for job events](set-alerts-fabric-job-events.md).
- **Visualize data** - Create a dashboard based on data in a KQL table.
- **Explore data in motion** - Preview data from a source. For more information, see [Preview data streams](preview-data-streams.md).
- **Connect weather data** - Create a data stream based on real-time weather data. For more information, see [Real-Time weather source](add-source-real-time-weather.md).
- **Learn from a tutorial** - Open the [Fabric Real-Time Intelligence tutorial](/fabric/real-time-intelligence/tutorial-introduction).
- **Case study** - Read a [Real-Time Intelligence customer story](https://www.microsoft.com/customers/story/1770346240728000716-elcome-microsoft-copilot-consumer-goods-en-united-arab-emirates).

### All data streams

The **All data streams** section lists the streams and tables that you can access. Streams are outputs from [Fabric eventstreams](../real-time-intelligence/event-streams/overview.md), and tables belong to KQL databases.

:::image type="content" source="./media/get-started-real-time-hub/all-data-streams-section.png" alt-text="Screenshot that shows the All data streams section of the Streaming data page." lightbox="./media/get-started-real-time-hub/all-data-streams-section.png":::

The table has the following columns:

| Column | Description |
| --- | --- |
| Data | Name of the stream or KQL table. |
| Source item | Name of the parent item. For a stream, the source item is the eventstream. For a KQL table, the source item is the KQL database. |
| Item owner | Owner of the parent item. |
| Workspace | Workspace that contains the parent item. |
| Endorsement | Endorsement status of the parent item. |
| Sensitivity | Sensitivity status of the parent item. |

Use the search box to find a stream by name. You can also filter the list by using the following filters:

| Filter | Description |
| --- | --- |
| Data type | Show streams or tables. |
| Item owner | Show data based on the owner of the parent eventstream or KQL database. |
| Item | Show data based on the name of the parent eventstream or KQL database. |
| Workspace | Show data from a specific workspace. |

> [!NOTE]
> To see streams and tables from only your workspace, select **My workspace** for the **Workspace** filter.

### Stream actions

To view the available actions, hover over a stream, and select **More options (...)**.

| Action | Description |
| --- | --- |
| Preview data | Preview data in the stream or derived stream. For more information, see [Preview data streams](preview-data-streams.md). |
| Open eventstream | Open the parent eventstream. You can then [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md#supported-operations) or [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md). |
| Endorse | Endorse the parent eventstream. For more information, see [Endorse data streams](endorse-data-streams.md). |

:::image type="content" source="./media/get-started-real-time-hub/real-time-stream-actions.png" alt-text="Screenshot that shows the actions available for a stream." lightbox="./media/get-started-real-time-hub/real-time-stream-actions.png":::

### KQL table actions

The following actions are available for a KQL table:

| Action | Description |
| --- | --- |
| Explore data | Explore KQL table data in a Real-Time Dashboard by using Copilot. For more information, see [Explore data and tables with Copilot](explore-data-tables-copilot.md). |
| Open KQL Database | Open the parent KQL database. |
| Endorse | Endorse the parent KQL database. For more information, see [Endorse data streams](endorse-data-streams.md). |
| Detect anomalies (preview) | Detect anomalies in data stored in the KQL table. For more information, see [Set up anomaly detection](../real-time-intelligence/anomaly-detection.md#how-to-set-up-anomaly-detection). |
| Create real-time dashboard (preview) | [Create a Real-Time Dashboard with Copilot](/fabric/fundamentals/copilot-generate-dashboard) based on data in the KQL table. |
| Add to data agent | Add the KQL table as a data source for a [data agent](../data-science/concept-data-agent.md). |

:::image type="content" source="./media/get-started-real-time-hub/kql-table-actions.png" alt-text="Screenshot that shows the actions available for a KQL table." lightbox="./media/get-started-real-time-hub/kql-table-actions.png":::

## Next step

Go to the [Add data page](add-data-page.md) to learn how to connect supported data sources to Real-Time hub.

## Related content

- [Explore the Add data page](add-data-page.md)
- [Learn to monitor streaming data](tutorial-monitor-streaming-data.md)
- [Real-Time hub overview](real-time-hub-overview.md)
