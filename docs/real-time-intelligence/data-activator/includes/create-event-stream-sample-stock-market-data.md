---
title: Create Eventstream With Sample Stock Market Data
description: Learn how to create an eventstream with real-time stock market data. This include is used by files in the data-activator root folder.
ms.date: 01/16/2026
ms.topic: include
ms.service: fabric
ms.subservice: rti-activator
---

First, create an eventstream with sample stock market data that simulates real-time data from three different companies. Each event contains the following fields:

- **symbol** – a company code
- **bidPrice** – current stock price of the company

1. Create a new eventstream and select **Use sample data** on the welcome screen.

   :::image type="content" source="media/reduce-cost-rules/use-sample-data-option.png" alt-text="Screenshot of Eventstream welcome screen with Connect data sources, Use sample data, and Use custom endpoint options." lightbox="media/reduce-cost-rules/use-sample-data-option.png":::

1. Select **Stock market (high data rate)** and select **Add**.

   :::image type="content" source="media/reduce-cost-rules/sample-data-stock-market-selection.png" alt-text="Screenshot of sample data source creation with StockMarket selected and Stock Market (high data-rate) option highlighted." lightbox="media/reduce-cost-rules/sample-data-stock-market-selection.png":::

1. Add an Activator destination to the eventstream, then select **Publish**.

   :::image type="content" source="media/reduce-cost-rules/activator-destination-added.png" alt-text="Screenshot of Eventstream editor with StockMarket source, Activator destination selected, and data preview panel visible." lightbox="media/reduce-cost-rules/activator-destination-added.png":::

1. Open the Activator item. After a few minutes, you see events ingested into Activator at a rate of 2,000 events per minute.

   :::image type="content" source="media/reduce-cost-rules/activator-data-ingestion-rate.png" alt-text="Screenshot of StockMarket-stream analytics tab showing a chart with 2000 events per minute and event details popup." lightbox="media/reduce-cost-rules/activator-data-ingestion-rate.png":::