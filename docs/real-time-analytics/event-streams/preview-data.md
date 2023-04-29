---
title: Preview data in an Eventstream item
description: This article describes how to preview the data in an Eventstream item with Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Preview data in an Eventstream item

Data preview provide you with a snapshot of your event data in your source or destination or the eventstream itself. Once you have added sources and destinations to your eventstream, you can preview the data in each node and visualize how your data flows through the eventstream.

## Prerequisites

To get started, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Viewer** or above permissions where your Eventstream item is located in.
- For KQL database or Lakehouse destination, get access to a **premium workspace** with **Viewer** or above permissions where your KQL Database or Lakehouse item is located in.

## Preview source 

To preview the source data of an event hub or sample data in the eventstream, you can follow these steps: 

1. Choose one of the source nodes in your eventstream.
2. Select the **Data preview** tab and preview the source data.
3. The screenshot displays the preview of sample Yellow Taxi data.

   :::image type="content" source="./media/preview-data/preview-data-source.png" alt-text="Screenshot showing data preview in source." lightbox="./media/preview-data/preview-data-source.png" :::

## Preview destination 

To preview the destination data of a KQL database or lakehouse in the eventstream, you can follow these steps:

1. Choose one of the destination nodes in your eventstream.
2. Select the **Data preview** tab and preview the destination data.
3. The screenshot displays the preview of KQL database.

   :::image type="content" source="./media/preview-data/preview-data-destination.png" alt-text="Screenshot showing data preview in destination." lightbox="./media/preview-data/preview-data-destination.png" :::

## Preview eventstream 

You can preview the data in your eventstream and get an idea of how different data sources are routed within your eventstream. If you want to preview your data that has different data format, select the eventstream node and choose the corresponding **Data format**.

:::image type="content" source="./media/preview-data/preview-data-eventstream.png" alt-text="Screenshot showing data preview in eventstream." lightbox="./media/preview-data/preview-data-eventstream.png" :::

To get the previewed event data updated, select the **Refresh** button in the top right corner of  **Data preview** tab. 

:::image type="content" source="./media/preview-data/preview-data-refresh.png" alt-text="Screenshot showing data preview refresh." lightbox="./media/preview-data/preview-data-refresh.png" :::


## Next steps

- [Main editor for Microsoft Fabric event streams](main-editor.md)
- [Monitoring status and performance of an Eventstream item](monitor.md)