---
title: Reduce Activator Rule Costs With Eventstream Filters
description: Reduce costs of Activator rules by filtering event volume in Eventstream before ingestion. Learn how to optimize data processing and save resources.
#customer intent: As a data analyst, I want to reduce the cost of processing high-volume event streams so that I can optimize resource usage in Activator.
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-activator
ms.date: 01/15/2025
---

# Reduce cost of Activator rules by applying filters

This article shows you how to reduce the cost of Activator rules on streaming data by filtering the volume of data ingested into Activator from Eventstream. By applying filters upstream, you can significantly decrease Fabric capacity unit consumption while still receiving the alerts you need.

In this example, you track the stock price of a company you're investing in. The goal is to receive automatic alerts when the stock price crosses above a threshold so you can take action, such as selling stock.

## Prerequisites

- A [Fabric workspace](../../get-started/create-workspaces.md) with an active capacity or trial capacity
- Familiarity with [Eventstream](../event-streams/overview.md) and [Activator](activator-introduction.md)

## Set up Eventstream with sample data

[!INCLUDE [Create eventstream with sample stock market data](includes/create-event-stream-sample-stock-market-data.md)]

## Reduce event volume with filters

To create a rule that alerts you when the `NSFT` stock price goes above 430, you only need events for that specific stock symbol. By applying a filter in Eventstream, you ensure that only `NSFT` events are ingested into Activator, reducing costs significantly.

1. Go to Eventstream edit mode and add a **Filter** transformation.

   :::image type="content" source="media/reduce-cost-rules-apply-filters/insert-transformation.png" alt-text="Screenshot of Eventstream edit mode showing StockMarket to Activator flow with the option to insert a filter transformation highlighted." lightbox="media/reduce-cost-rules-apply-filters/insert-transformation.png":::

   :::image type="content" source="media/reduce-cost-rules-apply-filters/select-filter-transformation.png" alt-text="Screenshot showing the Filter transformation being added to the Eventstream." lightbox="media/reduce-cost-rules-apply-filters/select-filter-transformation.png":::

1. Configure the filter to allow only `NSFT` events to pass through, then select **Save**.

   :::image type="content" source="media/reduce-cost-rules-apply-filters/edit-filter-transformation.png" alt-text="Screenshot showing the Edit button on the Filter transformation." lightbox="media/reduce-cost-rules-apply-filters/edit-filter-transformation.png":::

1. Publish the updated Eventstream.

   :::image type="content" source="media/reduce-cost-rules-apply-filters/publish-button.png" alt-text="Screenshot showing the Publish button for the updated Eventstream." lightbox="media/reduce-cost-rules-apply-filters/publish-button.png":::

1. Go to the Activator item connected to the Eventstream. The event volume decreased from 2,000 events per minute to 667 events per minute, since only events from one out of three companies are now ingested into Activator.

   :::image type="content" source="media/reduce-cost-rules-apply-filters/activator-event-volume-chart.png" alt-text="Screenshot of Activator analysis tab showing a chart of event volume decrease over time with event details tooltip visible." lightbox="media/reduce-cost-rules-apply-filters/activator-event-volume-chart.png":::

## Create an Activator rule

With the filtered data flowing into Activator, you can now create a rule to monitor the stock price and alert you when it exceeds your threshold.

1. Go to the Activator item connected to the Eventstream and select **New object**.

   :::image type="content" source="media/reduce-cost-rules-apply-filters/activator-new-object-button.png" alt-text="Screenshot of Activator showing the StockMarket-stream selected and the New object button highlighted in the Events section." lightbox="media/reduce-cost-rules-apply-filters/activator-new-object-button.png":::

1. In the **New object** pane, choose **symbol** as the unique identifier and select **bidPrice** in the list of columns to include as properties of the object. Select **Create**.

   :::image type="content" source="media/reduce-cost-rules-apply-filters/new-object-symbol-bid-price.png" alt-text="Screenshot showing the New object configuration with symbol as identifier and bidPrice selected." lightbox="media/reduce-cost-rules-apply-filters/new-object-symbol-bid-price.png":::

1. Select the **bidPrice** property and select **New rule**.

   :::image type="content" source="media/reduce-cost-rules-apply-filters/bid-price-new-rule-panel.png" alt-text="Screenshot showing the bidPrice property selected with the New rule option." lightbox="media/reduce-cost-rules-apply-filters/bid-price-new-rule-panel.png":::

1. Configure your alerting condition, then select **Save and start**.

   :::image type="content" source="media/reduce-cost-rules-apply-filters/alert-rule-configuration.png" alt-text="Screenshot showing the rule configuration with alerting conditions and Save and start button." lightbox="media/reduce-cost-rules-apply-filters/alert-rule-configuration.png":::

## Related content

- [What is Activator?](activator-introduction.md)
- [Get data for Activator from Eventstream](activator-get-data-eventstreams.md)
- [Create Activator rules](activator-create-activators.md)