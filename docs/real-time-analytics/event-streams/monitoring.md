---
title: Monitoring status and performance of an Eventstream item
description: This article describes how to monitor the status and performance of an Eventstream item with Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 04/23/2023
ms.search.form: product-kusto
---

# Monitoring status and performance of an Eventstream item

Within Microsoft Fabric event streams, it's easy to monitor the event data streaming and ingestion status and its performance without navigating to other pages. This article explains how to monitor the eventstream status, allowing you to check logs, errors, and data insights with metrics. 

In an Eventstream item, there are two types of monitoring experience: **Data insights** and **Runtime logs**. Different sources and destinations have one or two types of them.

## Prerequisites 

- An eventstream is available with event data inside. 
- An Azure event hub source and lakehouse destination are added. 

## Data insights 

**Data insights** is located in the bottom pane of the main editor (canvas). It provides metrics that you can use to monitor the status and performance of the eventstream, sources and destinations. Different sources, destination has different metrics. When you select a node in the main editor canvas, the corresponding metrics for this specific node are shown in **Data insights** tab.

### Data insights in eventstream node

The available metrics in eventstream node’s Data insights are the following four types:

| Metric                 | Unit                               | Description                     |
| ---------------------- | ---------------------------------------- | --------------------------|
| **Incoming Messages** | Count | The number of events or messages sent to an eventstream over a specified period. |
| **Outgoing  Messages** | Count | The number of events or messages received from an eventstream over a specified period. |
| **Incoming Bytes** | Bytes | Incoming bytes for an eventstream over a specified period. |
| **Outgoing Bytes** | Bytes | Outgoing bytes for an eventstream over a specified period. |

:::image type="content" source="./media/monitoring/eventstream-metrics.png" alt-text="Screenshot showing the eventstream metrics." lightbox="./media/monitoring/eventstream-metrics.png" :::

Following the steps to view the data insights for eventstream: 

1. Select the eventstream node in the main editor canvas. 
2. In the bottom pane, select **Data insights**. 
3. Once the data insights tab is open, you see the metrics chart if there's data inside the eventstream. You can also select which metric to show on the left side


### Data insights in Azure Event Hubs source and Lakehouse destination node 

The following metrics are available in the Data insights of an Azure event hub source node and lakehouse destination node: 

| Metric                 | Unit                               | Description                     |
| ---------------------- | ---------------------------------------- | --------------------------|
| **Input Events**  | Count | Number of event data that event streams engine pull from an eventstream (in a lakehouse destination node) or from an Azure event hub source (in an Azure event hub source node). |
| **Output Events** | Count | Number of event data that the event streams engine sends to a lakehouse (in a lakehouse destination node) or an eventstream (in an Azure event hub source node). |
| **Input Event Bytes** | Bytes | Amount of event data that event streams engine pulls from an eventstream (in a lakehouse destination node) or from an Azure event hub source (in an Azure event hub source node). |
| **Backlogged Input Events** | Count | Number of input events that are backlogged in event streams engine. |
| **Runtime Errors** | Count | Total number of errors related to event processing. |
| **Data Conversion Errors** | Count | Number of output events that couldn't be converted to the expected output schema. |
| **Deserialization Errors** | Count | Number of output events that couldn't be converted to the expected output schema. |

:::image type="content" source="./media/monitoring/source-destination-metrics.png" alt-text="Screenshot showing the source and destination metrics." lightbox="./media/monitoring/source-destination-metrics.png" :::

Following the steps to view the data insights for Azure Event Hubs source or Lakehouse destination: 

1. Select the Azure event hub source node or lakehouse destination node in the main editor canvas 
2. In the bottom pane, select **Data insights**. 
3. Once the data insights tab is open, you see the metrics chart if there's data inside the Azure event hub source or lakehouse destination. You can also select which metric to show on the left side.


## Runtime logs 

**Runtime logs** enables you to check the detailed errors happening in the event streams engine. Runtime logs appear at the warning, error, or information level. It's available in the bottom pane when you select the Azure Event Hubs source node or Lakehouse destination node. 

Inside the runtime log tab, you can search the keyword through the logs. You can also filter the logs according to the severity and type. If you want to get the latest logs, you can also use refresh button to get it. 

:::image type="content" source="./media/monitoring/source-destination-runtime-logs.png" alt-text="Screenshot showing the source and destination runtime logs." lightbox="./media/monitoring/source-destination-runtime-logs.png" :::

Following the steps to view the runtime logs for Azure Event Hubs source or Lakehouse destination: 

1. Select the Azure event hub source node or lakehouse destination node in the main editor canvas. 
2. In the bottom pane, select **Runtime logs**. 
3. Once the data insights tab is open, you see the metrics chart if there's data inside the Azure event hub source or lakehouse destination. You can also select which metric to show on the left side. 


## Next steps

- [Main editor for Microsoft Fabric event streams](./main-editor.md)
- [Preview data in an Eventstream item](./preview-data.md)