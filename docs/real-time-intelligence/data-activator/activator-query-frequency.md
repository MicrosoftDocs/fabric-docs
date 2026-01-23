---
title: Setting the query frequency of Activator rules
description: Explains how to alter the frequency with which Activator monitors rules created from certain data sources.
ms.reviewer: jameshutton
ms.topic: overview
ms.custom: 
ms.search.form: product-reflex
ms.date: 7/18/2025
---

# Query frequency in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

Some Fabric Activator rules work by running regular queries on the rule's data source. This article explains how to set the query frequency, and how to determine the right query frequency for your rule.

## Data sources that have a query frequency

Activator rules created from the following data source types have a query frequency:

- Power BI reports
- KQL Querysets
- Real-Time Dashboards.
  
## Setting the query frequency

To set the query frequency for your rule:

1. Open your rule's Activator item.
2. Select your rule's data source in the Explorer pane.
3. Go to the "Manage Source" tab.
4. Set the value of "Run query every" to your desired query frequency.

:::image type="content" source="media/activator-query-frequency/activator-set-query-frequency.png" alt-text="Screenshot of the query frequency value in the data source for an Activator rule":::

## Determining the right query frequency

To determine the right query frequency for your rule, you should consider the following factors:

- **How often your data source changes**: the more often your data changes, the more often you should query it.
- **How quickly you need your rules to activate**: the more often you query your data, the sooner Activator will activate your rule after your rule's condition is met.
- **Capacity usage**: querying your data consumes Fabric Capacity. The more often you query your data, the more Fabric Capacity you'll use.
