---
title: Reduce Activator Rule Costs on Streaming Data with Summarizations
description: Learn how to reduce the cost of Activator rules on streaming data by applying summarization techniques to minimize data ingestion from Eventstream.
#customer intent: As a data engineer, I want to learn how to reduce the cost of Activator rules on streaming data so that I can optimize resource usage and save on expenses.
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-activator
ms.date: 01/16/2026
---

# Reduce cost of Activator rules on streaming data by applying summarizations

This article shows you how to reduce the cost of Activator rules on streaming data by reducing the volume of data ingested into Activator from Eventstream. By applying summarization techniques, you can lower Fabric capacity unit consumption while still maintaining effective alerting capabilities.

## Prerequisites

- A [Fabric workspace](../../get-started/create-workspaces.md) with a Fabric capacity
- Familiarity with [Eventstream](../../real-time-intelligence/event-streams/overview.md) and [Activator](./activator-introduction.md)

## Scenario overview

In this example, you track the stock price of several companies. The goal is to receive automatic alerts when the stock price of any company increases by more than 2%, enabling you to take action such as selling or buying stock.

Stock market data is a high-volume eventstream sending around 2,000 events every minute. Since you're charged for ingestion into Activator, reducing eventstream volume helps your Activator rules consume fewer Fabric capacity units. When you don't need to react to each individual event, you can lower costs by applying summarization within an eventstream.

## Set up an eventstream with sample data

[!INCLUDE [Create eventstream with sample stock market data](includes/create-event-stream-sample-stock-market-data.md)]

## Reduce event volume with summarization

Instead of processing each individual event, you can reduce the data volume by applying one-minute summarizations. This approach emits one event per company every minute, containing the maximum stock price recorded during that interval.

To implement this summarization, use a **Group by** transformation node in an eventstream. For more information about window types, see [Windowing - Stream Analytics Query](/stream-analytics-query/windowing-azure-stream-analytics).

1. Go to edit mode and add a **Group by** node between the eventstream source and Activator destination nodes.

   :::image type="content" source="media/reduce-cost-rules/add-group-by-node.png" alt-text="Screenshot of Eventstream workflow showing StockMarket source, StockMarket stream, and Activator nodes with the Group by insert node option highlighted." lightbox="media/reduce-cost-rules/add-group-by-node.png":::

   :::image type="content" source="media/reduce-cost-rules/group-by-transformation-node.png" alt-text="Screenshot of Eventstream editor with Group by option selected in the transformation menu between source and destination nodes." lightbox="media/reduce-cost-rules/group-by-transformation-node.png":::

1. Select the edit icon and choose **Maximum** as the aggregation operation with the **bidPrice** field. Select **Add**.

   :::image type="content" source="media/reduce-cost-rules/aggregation-maximum-bid-price-field.png" alt-text="Screenshot of Group by configuration panel with Maximum selected for bidPrice and Add button highlighted." lightbox="media/reduce-cost-rules/aggregation-maximum-bid-price-field.png":::

1. Specify the **symbol** field in **Group aggregation by** and choose **60 seconds** as the time window. Select **Save**, then **Publish**.

   :::image type="content" source="media/reduce-cost-rules/group-by-tumbling-window.png" alt-text="Screenshot of Group by settings with symbol field selected, 60 second tumbling window, and Save button highlighted." lightbox="media/reduce-cost-rules/group-by-tumbling-window.png":::

1. Go to the Activator item connected to the eventstream. The events volume decreased from 2,000 events per minute to three events per minute (one per company).

   :::image type="content" source="media/reduce-cost-rules/stock-market-stream-events.png" alt-text="Screenshot of Activator analytics panel with event volume graph, showing sharp decrease to three events per minute." lightbox="media/reduce-cost-rules/stock-market-stream-events.png":::

## Create an Activator rule

Now that you reduced the data volume, create a rule to alert you when stock prices change significantly.

1. Go to the Activator item connected to the eventstream and select **New object**.

   :::image type="content" source="media/reduce-cost-rules/new-object-button-activator.png" alt-text="Screenshot of Activator Events page with StockMarket-stream selected and the New object button highlighted." lightbox="media/reduce-cost-rules/new-object-button-activator.png":::

1. In the **New object** pane, choose **symbol** as the unique identifier and select **MAX_bidPrice** in the list of columns to include as properties of the object. Select **Create**.

   :::image type="content" source="media/reduce-cost-rules/build-object-configuration-pane.png" alt-text="Screenshot showing the New object configuration with symbol as identifier and MAX_bidPrice selected." lightbox="media/reduce-cost-rules/build-object-configuration-pane.png":::

   You can see that only one event is emitted for every company.

   :::image type="content" source="media/reduce-cost-rules/max-bid-price-live-feed-view.png" alt-text="Screenshot of MAX_bidPrice property view showing live feed chart, company symbols, and event details table." lightbox="media/reduce-cost-rules/max-bid-price-live-feed-view.png":::

1. Select the **MAX_bidPrice** property and select **New rule**.

   :::image type="content" source="media/reduce-cost-rules/max-bid-price-new-rule-panel.png" alt-text="Screenshot showing the MAX_bidPrice property selected with New rule option." lightbox="media/reduce-cost-rules/max-bid-price-new-rule-panel.png":::

1. Choose your alerting condition, then select **Save and start**.

   :::image type="content" source="media/reduce-cost-rules/alert-condition-settings.png" alt-text="Screenshot showing the rule configuration with alerting condition settings." lightbox="media/reduce-cost-rules/alert-condition-settings.png":::

## Related content

- [What is Activator?](./activator-introduction.md)
- [Activator tutorial using sample data](./activator-tutorial.md)
