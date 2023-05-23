---
title: Monitoring status and performance of an Eventstream item
description: This article describes how to monitor the status and performance of an Eventstream item with Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom: build-2023, build-2023-dataai, build-2023-fabric
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Monitoring status and performance of an eventstream

Microsoft Fabric event streams allow you to easily monitor streaming event data, ingestion status, and its performance. This article explains how to monitor the eventstream status, check logs, errors, and data insights with metrics. 

In an eventstream, there are two types of monitoring experiences: **Data insights** and **Runtime logs**. You see one of them or both views depending on the source or destination. 

[!INCLUDE [preview-note](../../includes/preview-note.md)]

## Prerequisites

To get started, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Viewer** or above permissions where your Eventstream item is located in.
- An Azure event hub source or lakehouse destination is added in your eventstream.

## Data insights 

**Data insights** is located in the bottom pane of the main editor. It provides metrics that you can use to monitor the status and performance of the eventstream, sources and destinations. Different sources and destinations have different metrics. When you select a node in the main editor canvas, the corresponding metrics for this specific node are shown in **Data insights** tab.

### Data insights in eventstream node

Here are the metrics you see for an eventstream node in the **Data insights** pane. 

| Metric                 | Unit                               | Description                     |
| ---------------------- | ---------------------------------------- | --------------------------|
| **Incoming Messages** | Count | The number of events or messages sent to an eventstream over a specified period. |
| **Outgoing  Messages** | Count | The number of events or messages outflow from an eventstream over a specified period. |
| **Incoming Bytes** | Bytes | Incoming bytes for an eventstream over a specified period. |
| **Outgoing Bytes** | Bytes | Outgoing bytes for an eventstream over a specified period. |

:::image type="content" source="./media/monitor/eventstream-metrics.png" alt-text="Screenshot showing the eventstream metrics." lightbox="./media/monitor/eventstream-metrics.png" :::

Follow these steps to view data insights for an eventstream: 

1. Select the eventstream node in the main editor canvas. 
2. In the bottom pane, switch to the **Data insights** tab. 
3. Once the data insights tab is open, you see the metrics chart if there's data inside the eventstream. You can also select which metric to show on the left side


### Data insights in Azure Event Hubs source and Lakehouse destination nodes 

The following metrics are available on the **Data insights** tab for Azure event hub source and lakehouse destination nodes: 

| Metric                 | Unit                               | Description                     |
| ---------------------- | ---------------------------------------- | --------------------------|
| **Input Events**  | Count | Number of event data that event streams engine pulls from an eventstream (in a lakehouse destination) or from an Azure event hub source (in an Azure event hub source). |
| **Input Event Bytes** | Bytes | Amount of event data that event streams engine pulls from an eventstream (in a lakehouse destination) or from an Azure event hub source (in an Azure event hub source). |
| **Output Events** | Count | Number of event data that the event streams engine sends to a lakehouse (in a lakehouse destination) or an eventstream (in an Azure event hub source). |
| **Backlogged Input Events** | Count | Number of input events that are backlogged in event streams engine. |
| **Runtime Errors** | Count | Total number of errors related to event processing. |
| **Data Conversion Errors** | Count | Number of output events that couldn't be converted to the expected output schema. |
| **Deserialization Errors** | Count | Number of input events that couldn't be deserialized inside the event streams engine. |

:::image type="content" source="./media/monitor/source-destination-metrics.png" alt-text="Screenshot showing the source and destination metrics." lightbox="./media/monitor/source-destination-metrics.png" :::

Follow these steps to view the data insights for Azure Event Hubs source or Lakehouse destination: 

1. Select the Azure event hub source node or lakehouse destination node in the main editor canvas 
2. In the bottom pane, select **Data insights**. 
3. Once the data insights tab is open, you see the metrics chart if there's data inside the Azure event hub source or lakehouse destination. You can also select which metric to show on the left side.


## Runtime logs 

**Runtime logs** enables you to check the detailed errors happening in the event streams engine. Runtime logs appear at the warning, error, or information level. It's available in the bottom pane when you select the Azure Event Hubs source node or Lakehouse destination node. 

In the runtime log tab, you can search the keyword through the logs. You can also filter the logs according to the severity and type. If you want to get the latest logs, you can also use refresh button to get it. 

:::image type="content" source="./media/monitor/source-destination-runtime-logs.png" alt-text="Screenshot showing the source and destination runtime logs." lightbox="./media/monitor/source-destination-runtime-logs.png" :::

Follow these steps to view the runtime logs for Azure Event Hubs source or Lakehouse destination: 

1. Select the Azure event hub source node or lakehouse destination node in the main editor canvas. 
2. In the bottom pane, switch to the **Runtime logs** tab. 
3. Once the data insights tab is open, you see the metrics chart if there's data inside the Azure event hub source or lakehouse destination. You can also select which metric to show on the left side. 


## Next steps

- [Preview data in an eventstream](./preview-data.md)
