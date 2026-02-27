---
title: Activator ingestion from KQL Querysets
description: Learn how Activator ingests data from KQL Querysets, including query execution, object mapping, and time handling.
ms.topic: concept-article
ms.date: 02/27/2026
---

# Ingestion from KQL Querysets

This article explains how Activator ingests data from KQL Querysets. Understanding this is useful for understanding how rules created from KQL Querysets behave. For step-by-step instructions on creating a rule from a KQL Queryset, see [Create a rule from a KQL Queryset](../activator-alert-queryset.md).

## How it works

KQL Querysets are a **query data source** for Activator. Activator runs a KQL query that you define against an Eventhouse KQL database, and evaluates your rules against the results.

Unlike Power BI or Real-Time Dashboard data sources, where Activator derives its query from an existing visual or dashboard tile, with a KQL Queryset you write the query yourself. Activator runs that KQL query against your Eventhouse KQL database on a schedule and evaluates your rules against the results.

Activator converts the columns returned by your KQL query into objects and properties. For example, consider the following query:

```kql
SensorReadings
| summarize Temperature = max(Temperature), Timestamp = max(Timestamp) by DeviceId
```

- The **grouping column** (DeviceId) becomes an **object** in Activator: one object is created for each device.
- The **value column** (Temperature) becomes a **property** on that object: Activator tracks the value of Temperature for each device over time.
- The **timestamp column** (Timestamp) becomes the **event time**: Activator uses it as the timestamp for each recorded value of the Temperature property.

If your query does not include a timestamp column, Activator uses the time at which it ran the query as the event time.

### Activator queries the Eventhouse directly

Activator makes a copy of your KQL query at the time you create your rule. It then repeatedly runs that query directly against the Eventhouse KQL database.

This means:

- Changes to the KQL Queryset after the rule is created (such as editing or saving a new version of the query) have no effect on the rule.
- You can delete the KQL Queryset entirely. The Activator rule continues to run because it queries the Eventhouse KQL database directly.

> [!NOTE]
> If you want to update the query that an Activator rule uses, you need to delete the rule and recreate it from the updated queryset.

### Query frequency

By default, Activator runs your KQL query every 5 minutes. You can change the query frequency in the data source settings for the rule.

> [!TIP]
> KQL queries against Eventhouse are fast, but be mindful of query cost and cluster load when setting a high query frequency. Choose a frequency that reflects how quickly the underlying data changes and how quickly you need to detect changes.
