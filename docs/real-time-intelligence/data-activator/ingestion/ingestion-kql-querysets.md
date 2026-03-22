---
title: Activator ingestion from KQL Querysets
description: Learn how Activator ingests data from KQL Querysets, including query execution, object mapping, and time handling.
ms.topic: concept-article
ms.date: 02/27/2026
---

# Ingestion from KQL Querysets

This article explains how Activator ingests data from KQL Querysets. Understanding this is useful for understanding how rules created from KQL Querysets behave. For step-by-step instructions on creating a rule from a KQL Queryset, see [Create Activator alerts from a KQL Queryset](../activator-alert-queryset.md).

## How it works

KQL Querysets are a **query data source** for Activator. Activator runs a KQL query that you define against an Eventhouse KQL database on a schedule. Each time the query returns results, Activator fires an alert for every row returned. This is known as the **on each event** alert type, and it's the only alert type supported for the KQL Queryset integration.

Unlike Power BI or Real-Time Dashboard data sources, where Activator derives its query from an existing visual or dashboard tile, with a KQL Queryset you write the query yourself. Because Activator doesn't support setting conditions or grouping on the query results, you should build your alert logic directly into the KQL query.

For example, consider the following query that alerts whenever a sensor reading has a temperature greater than zero:

```kql
SensorReadings
| where Temperature > 0
| where Timestamp > ago(5m)
```

In this query:

- The `where Temperature > 0` clause defines the **alert condition**. Because Activator fires an alert for every row returned, filtering in the query ensures you only get alerted for the events you care about.
- The `where Timestamp > ago(5m)` clause limits results to the **last 5 minutes**. Because Activator runs the query on a schedule (every 5 minutes by default), this time window prevents duplicate alerts for events that were already processed in a previous run.

This pattern — embedding your alert logic and time windowing in the KQL query — is the recommended approach for using KQL Querysets with Activator.

### Activator queries the Eventhouse directly

Activator makes a copy of your KQL query at the time you create your rule. It then repeatedly runs that query directly against the Eventhouse KQL database.

This means:

- Changes to the KQL Queryset after the rule is created (such as editing or saving a new version of the query) have no effect on the rule.
- You can delete the KQL Queryset entirely. The Activator rule continues to run because it queries the Eventhouse KQL database directly.

> [!NOTE]
> If you want to update the query that an Activator rule uses, you need to delete the rule and recreate it from the updated queryset.

### Query frequency

By default, Activator runs your KQL query every 5 minutes. You can change the query frequency in the data source settings, as described in [Query frequency for query data sources](../activator-query-frequency.md).

> [!IMPORTANT]
> If you change the query frequency, update the time window in your KQL query to match. For example, if you set the query frequency to 10 minutes, change `ago(5m)` to `ago(10m)` in your query. The time window should always match the query frequency to avoid missed events or duplicate alerts.

> [!TIP]
> KQL queries against Eventhouse are fast, but be mindful of query cost and cluster load when setting a high query frequency. Choose a frequency that reflects how quickly the underlying data changes and how quickly you need to detect changes.
