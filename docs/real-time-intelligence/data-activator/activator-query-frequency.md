---
title: Query frequency for query data sources
description: Learn how to set the frequency at which Activator queries your query data sources and how to choose the right frequency.
ms.reviewer: jameshutton
ms.topic: concept-article
ms.search.form: product-reflex
ms.date: 02/27/2026
---

# Query frequency for query data sources

Activator [query data sources](ingestion/ingestion-overview.md) work by running regular queries against the underlying data store. This article explains how to set the query frequency for a query data source, and how to choose the right frequency for your rule.

The following query data sources have a configurable query frequency:

- [Power BI](ingestion/ingestion-powerbi.md)
- [KQL Querysets](ingestion/ingestion-kql-querysets.md)
- [Real-Time Dashboards](ingestion/ingestion-realtime-dashboards.md)

## Set the query frequency

To set the query frequency for a query data source:

1. Open your rule's Activator item.
1. Select the query data source in the Explorer pane.
1. Go to the **Manage Source** tab.
1. Set the value of **Run query every** to your desired query frequency.

:::image type="content" source="media/activator-query-frequency/activator-set-query-frequency.png" alt-text="Screenshot of the query frequency value in the data source for an Activator rule.":::

## Determine the right query frequency

To determine the right query frequency for your query data source, consider the following factors:

- **How often your data source changes**: the more often your data changes, the more often you should query it.
- **How quickly you need your rules to activate**: the more often you query your data, the sooner Activator activates your rule after the rule's condition is met.
- **Capacity usage**: querying your data consumes Fabric capacity. The more often you query your data, the more capacity you use.
