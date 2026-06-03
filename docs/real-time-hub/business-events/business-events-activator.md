---
title: Use Activator as a Business Events Publisher
description: This article describes how to use Activator to publish business events in Fabric Real-Time hub from Power BI reports, Real-Time Dashboards, KQL queries, and Warehouse SQL queries.
author: george-guirguis
ms.author: geguirgu
ms.topic: how-to
ms.date: 05/11/2026
ai-usage: ai-assisted
---

# Use Activator as a business events publisher

Activator provides a no-code way to publish business events in Microsoft Fabric. When Activator detects that a condition is met in your data, it can emit a structured business event into Real-Time hub, making that signal discoverable, routable, and consumable by your entire organization.

By acting as a publisher, Activator turns insights from **Power BI reports**, **Real-Time Dashboards**, **KQL queries**, and **Fabric Warehouse SQL queries** into governed business signals that downstream systems can subscribe to and act on in real time.

> [!IMPORTANT]
> This feature is in [preview](../../fundamentals/preview.md).

## Why use Activator to publish business events?

Activator is uniquely suited for publishing business events because it works directly with the Power BI reports, dashboards, and queries where business users already monitor their data. You don't need to write code or build custom pipelines. Instead, you define conditions on your existing reports, dashboards, or queries, and Activator publishes a business event whenever that condition is met.

This approach is ideal when:

- You want to turn KPI thresholds from a Power BI report into organization-wide signals.
- You need to share alerts across teams without duplicating rules.
- You want a persistent, queryable record of every time a condition occurred.
- You need to provide real-time context to downstream analytics, AI/ML models, or automation workflows.
- Multiple teams need to respond to the same signal independently.

## Common scenarios

Any data source that Activator monitors can become a source of business events. Here are a few examples:

| Scenario | Description |
|----------|-------------|
| Power BI report | Publish events when metrics in a Power BI visual meet a condition. |
| Real-Time Dashboard | Publish events based on conditions detected in streaming or near real-time data. |
| KQL query | Publish events when a KQL query result meets a defined threshold or pattern. |
| Fabric Warehouse SQL query | Publish events based on conditions in your warehouse data. |

## How it works

The entry point varies slightly depending on your data source:

- **Power BI report:** Create an alert on a visual, then select **Open in Activator** to access advanced rule configuration where you can set the action to publish a business event. For detailed steps, see [Create an alert in Power BI report](../../real-time-intelligence/data-activator/activator-get-data-power-bi.md).
- **Real-Time Dashboard:** Select **Set alert** on a tile to open the Activator rule pane directly. For detailed steps, see [Create Activator alerts for a Real-Time Dashboard](../../real-time-intelligence/data-activator/activator-get-data-real-time-dashboard.md).
- **KQL query:** Select **Set alert** from a KQL Queryset to open the Activator rule pane. For detailed steps, see [Create Activator alerts from a KQL Queryset](../../real-time-intelligence/data-activator/activator-alert-queryset.md).
- **Fabric Warehouse SQL query:** Select **Create rule** to open the Activator rule pane. For detailed steps, see [Create an alert rule on a Fabric Warehouse SQL query](../../real-time-intelligence/data-activator/set-alerts-warehouse-sql-query.md).

Once you're in the Activator rule configuration, the remaining steps are the same for all sources:

1. **Define your condition:** Configure the monitoring condition that determines when the event should fire, for example, when a value exceeds a threshold or a status changes.

1. **Select the publish action:** In the **Action** section, select **Publish a business event** as the action type.

1. **Choose your business event:** Select the business event you want to publish. The business event must already be defined in Real-Time hub. For more information about creating business events, see [Create and manage business events](create-business-events.md).

1. **Map your parameters:** Map each field in your event schema to either a dynamic value from the monitored data or a static value you define.

1. **Save and activate:** Save the rule. Activator publishes a business event every time the condition is met.

## Prerequisites

Before you publish business events from Activator, make sure the following items are in place:

- A [business event](create-business-events.md) defined in Real-Time hub with the fields that match your use case.
- A data source supported by Activator, such as a Power BI report, Real-Time Dashboard, KQL query, or Fabric Warehouse SQL query.
- Publish permission on the business event. For more information, see [Manage data access for business events](manage-business-events-data-access.md).

## Example: Publish events from a Power BI report

Consider a scenario where a retail company monitors daily sales performance in a Power BI report. The operations team wants to notify downstream systems whenever a store's sales drop below a target threshold.

1. Open the Power BI report and select the visual that shows sales by store.

1. Select **Set alert** to create an alert on the visual.

1. Select **Open in Activator** to open the rule in the Activator editor, where you can access advanced rule configuration.

1. Configure the condition: **Sales amount** is less than **10,000**.

1. In the **Action** section, select **Publish a business event**.

1. Select the `SalesTargetMissed` business event.

1. Map the parameters:
   - `storeId` → Store ID (dynamic, from the visual)
   - `salesAmount` → Sales Amount (dynamic, from the visual)
   - `targetAmount` → 10000 (static value)
   - `region` → Region (dynamic, from the visual)

1. Save the rule.

Every time Activator detects that a store's sales fall below the target, it publishes a `SalesTargetMissed` business event. That event is automatically stored in an eventhouse, visible in Real-Time hub, and available for any consumer to subscribe to, whether it's another Activator rule that sends a Teams notification, a notebook that runs predictive analysis, or a dataflow that updates a reporting table.

## Related articles

- [Business events in Microsoft Fabric](business-events-overview.md)
- [Create and manage business events](create-business-events.md)
- [Consume business events from Activator](consume-business-events-from-activator.md)
- [Set alerts on business events](set-alerts-business-events.md)
- [Manage data access for business events](manage-business-events-data-access.md)
- [Eventhouse and Real-Time Dashboard integration](business-events-eventhouse.md)
