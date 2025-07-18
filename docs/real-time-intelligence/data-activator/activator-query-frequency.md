---
title: Setting the query frequency of Activator rules
description: Explains how to alter the frequency with which Activator monitors rules created from certain data sources.
author: 
ms.author: jamesdhutton
ms.topic: overview
ms.custom: 
ms.search.form: product-reflex
ms.date: 7/18/2025
---

# Setting the Query Frequency in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rules

## Query frequency in Fabric Activator

Some Fabric Activator rules work by running regular queries on the rule's data source. You can set how often Activator runs these queries. This article explains how to set the query frequency, and how to determine the right query frequency for your data source.

## Data sources that have a query frequency

Activator rules created from the the following data source types have a query frequency:

- Power BI reports
- KQL Querysets
- Real-Time Dashboards.
  
## Setting the query frequency

To set the query frequency for your rule:

1. Open your rule's Activator item.
2. Select your rule's data source in the Explorer pane.
3. Go to the "Manage Source" tab.
4. Set the value of "Run query every" to your desired query frequency.

:::image type="content" source="media/activator-query-freqency/activator-set-query-frequency.png" alt-text="Screenshot of the query frequency value in the data source for an Activator rule":::

## Determining the right query frequency

To determine the right query frequency for your rule's data source, you should consider the following factors:

- **How often your data source changes**: the more often your data changes, the more often you will want to query it.
- **How quickly you need your rules to activate**: the more often you query your data, the sooner Activator will activate your rule after your rule's condition is met.
- **Capacity usage**: querying your data consumes Fabric Capacity, so the more often you query your data, the more Fabric Capacity you will use.
