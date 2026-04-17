---
title: Activator ingestion from KQL Querysets
description: Learn how Activator ingests data from KQL Querysets, including query execution, object mapping, and time handling.
ms.topic: concept-article
ms.date: 02/27/2026
---

# Ingestion from KQL Querysets

This article explains how Activator ingests data from KQL Querysets. Understanding this is useful for understanding how rules created from KQL Querysets behave. For step-by-step instructions on creating a rule from a KQL Queryset, see [Create Activator alerts from a KQL Queryset](../activator-alert-queryset.md).

## How it works

KQL Querysets are a **query data source** for Activator. Activator runs a KQL query that you define against an Eventhouse KQL database on a schedule. Each time the query returns results, Activator ingests an event for each row in the query.

> [!NOTE]
> Activator's integration with KQL Querysets does not currently support using a timestamp column from your queries as the event timestamp. Activator uses the time at which it runs the query as the event timestamp. The implication is that you must write your queries to return the **current state** of a set of objects. For example, given a query that returns the temperature of some sensors, the query should return two columns: Sensor ID and Temperature, showing the current temperature of each sensor.

When you select **Set alert** in a KQL Queryset, a side pane opens where you configure your alert. Within this side pane, the only supported alert type is **on each event**. When you use this alert type, Activator alerts you for every row the query returns on every scheduled run. If you wish to build alerts with grouping logic, you can edit the alert within the Activator item after creating it. The following sections describe these two methods.

### Method 1: On each event (default)

With this method, you build your alert condition and time window into the KQL query itself. Activator fires an alert for every row returned on every scheduled run.

For example, consider the following query that alerts whenever a sensor reading has a temperature greater than zero:

```kql
CurrentSensorTemperatures
| where Temperature > 0
| project SensorID, Temperature
```

In this query, the `where Temperature > 0` clause defines the **alert condition**. Because Activator fires an alert for every row returned, filtering in the query ensures you only get alerted for the events you care about.

This pattern — embedding your alert logic and time windowing in the KQL query — is the simplest approach for using KQL Querysets with Activator.

> [!NOTE]
> With this method, Activator alerts you every time the query runs and returns matching rows. Using the example, if the temperature stays above zero for an extended period, you receive an alert every 5 minutes for the duration. Depending on your scenario, this might create an undesirable number of alerts.

### Method 2: Stateful alerting with object grouping

If you want to be alerted only when a condition changes state — for example, alerted once when the temperature rises above zero rather than continuously while it remains above zero — you can use stateful trigger logic by opening the Activator item directly.

To set up stateful alerting:

1. Create an alert from the KQL Queryset using **Set alert** as usual. This creates a rule in an Activator item. Your KQL query should not include the alert condition in this case, because Activator handles the condition evaluation. You still need the time window clause. For the sensor example, the query would be:

   ```kql
   CurrentSensorTemperatures
   | project SensorID, Temperature
   ```

1. Open the Activator item that contains the rule, and delete the rule. You do not need it any more.
1. [Assign the data to an object](../activator-assign-data-objects.md). Using the sensor example, create a **Sensor** object and key it by **SensorID**.
1. Create a rule on the object using a **Numeric Change** condition — for example, *Temperature increases above 0*. A **Numeric Change** condition activates only when the value transitions from not meeting the condition to meeting it. For more information, see [Detection conditions](../activator-detection-conditions.md).

With this approach, Activator tracks the state of each object instance (each sensor, in this example) and alerts you only once when the temperature first rises above zero, instead of alerting continuously while the temperature is greater than zero.

### Activator queries the Eventhouse directly

Activator makes a copy of your KQL query at the time you create your rule. It then repeatedly runs that query directly against the Eventhouse KQL database.

This means:

- Changes to the KQL Queryset after the rule is created (such as editing or saving a new version of the query) have no effect on the rule.
- You can delete the KQL Queryset entirely. The Activator rule continues to run because it queries the Eventhouse KQL database directly.

> [!NOTE]
> If you want to update the query that an Activator rule uses, you need to delete the rule and recreate it from the updated queryset.

### Query frequency

By default, Activator runs your KQL query every 5 minutes. You can change the query frequency in the data source settings, as described in [Query frequency for query data sources](../activator-query-frequency.md).


> [!TIP]
> KQL queries against Eventhouse are fast, but be mindful of query cost and cluster load when setting a high query frequency. Choose a frequency that reflects how quickly the underlying data changes and how quickly you need to detect changes.
