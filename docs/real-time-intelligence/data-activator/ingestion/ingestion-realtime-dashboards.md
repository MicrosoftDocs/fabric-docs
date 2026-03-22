---
title: Activator ingestion from Real-Time Dashboards
description: Learn how Activator ingests data from Real-Time Dashboard tiles, including query execution, object mapping, and time handling.
ms.topic: concept-article
ms.date: 02/27/2026
---

# Ingestion from Real-Time Dashboards

This article explains how Activator ingests data from Real-Time Dashboards. Understanding this is useful for understanding how rules created from Real-Time Dashboard tiles behave. For step-by-step instructions on creating a rule from a dashboard tile, see [Create Activator alerts for a Real-Time Dashboard](../activator-get-data-real-time-dashboard.md).

## How it works

Real-Time Dashboards are a **query data source** for Activator. Activator creates rules by connecting to the Eventhouse KQL database that backs a dashboard tile, periodically running the tile's KQL query, and evaluating your rules against the results.

A Real-Time Dashboard is made up of tiles, and each tile is backed by a KQL query against an Eventhouse KQL database. When you create an Activator rule from a dashboard tile, Activator uses that tile's underlying KQL query to pull data for rule evaluation.

Activator converts the columns returned by the tile's KQL query into objects and properties. For example, a tile that shows request latency by service per minute runs a query that returns a service name, a latency value, and a timestamp:

- The **grouping column** (service name) becomes an **object** in Activator: one object is created for each service.
- The **value column** (request latency) becomes a **property** on that object: Activator tracks the value of request latency for each service over time.
- The **timestamp column** (minute) becomes the **event time**: Activator uses it as the timestamp for each recorded value of the request latency property.

If the tile's query does not include a timestamp column, Activator uses the time at which it ran the query as the event time.

### Time range requirement

To create an alert from a dashboard tile, the tile's KQL query must use the dashboard's predefined `_startTime` and `_endTime` time range parameters. For example:

```kql
test
| extend Timestamp = ingestion_time()
| where Timestamp between (_startTime .. _endTime)
| summarize count() by bin(Timestamp, 5m)
```

The `_startTime` and `_endTime` parameters are standard Real-Time Dashboard parameters that reflect the time range selected on the dashboard. Your tile's query must filter data using these parameters in a `where` clause.

If the tile's query uses a custom time range instead of `_startTime` and `_endTime`, the **Set alert** option is disabled and you see the following error:

*"Alerts can only be set for tiles using one of the predefined time ranges. Remove the custom time range and try again."*

### Activator queries the Eventhouse directly

Activator makes a copy of the tile's KQL query at the time you create your rule. It then repeatedly runs that query directly against the Eventhouse KQL database, not against the dashboard itself.

This has two important implications:

- Changes to the Real-Time Dashboard after the rule is created (such as editing the tile's query, changing parameters, or redesigning the dashboard) have no effect on the rule.
- You can delete the Real-Time Dashboard entirely. The Activator rule continues to run because it queries the Eventhouse KQL database directly.

> [!NOTE]
> If you want to update the query that an Activator rule uses, you need to delete the rule and recreate it from the updated dashboard tile.

### Query frequency

By default, Activator runs the tile's KQL query every 5 minutes. You can change the query frequency in the data source settings, as described in [Query frequency for query data sources](../activator-query-frequency.md).

> [!TIP]
> Real-Time Dashboards are often used to visualize rapidly changing operational data. If your dashboard is configured to auto-refresh frequently, consider aligning the Activator query frequency to the same interval so that your rules reflect the same view of the data that the dashboard shows.
