---
title: Eventhouse and Real-Time Dashboard Integration with Business Events
description: This article describes how business events integrate with Eventhouse and Real-Time Dashboards for historical analysis, real-time monitoring, and operational visibility.
author: george-guirguis
ms.author: geguirgu
ms.topic: how-to
ms.date: 05/11/2026
ai-usage: ai-assisted
---

# Eventhouse and Real-Time Dashboard integration with business events

Every business event your organization publishes becomes a queryable record in Eventhouse, ready for historical analysis, real-time monitoring, and cross-event correlation. Combined with Real-Time Dashboards, you get live operational views of your business signals without building additional pipelines or configuring ingestion.

Eventhouse is enabled by default when you create a business event in Real-Time hub. Each business event maps to a dedicated KQL table in your eventhouse database, and every published event is automatically ingested and retained.

> [!IMPORTANT]
> This feature is in [preview](../../fundamentals/preview.md).

## Why use Eventhouse with business events?

Eventhouse is uniquely suited as the analytical layer for business events because it provides:

- **Automatic retention:** Every published business event is stored with no manual ingestion configuration required. The **Analyze in Eventhouse** option is enabled by default during business event creation.
- **KQL-powered analysis:** Query patterns over time, correlate events across types, aggregate by any dimension, and answer operational questions like "how often did this condition occur last month?"
- **Real-time and historical in one place:** Query the latest events alongside months of historical data in the same KQL table.
- **Foundation for AI and ML:** A persistent, structured record of business signals gives data science teams the data they need to detect anomalies, predict outcomes, and build models grounded in operational patterns.

## How Eventhouse integration works

When you create a business event in Real-Time hub, the **Analyze in Eventhouse** checkbox is enabled by default. You can choose to create a new eventhouse or select an existing one in your workspace. If you don't need analytical storage, you can uncheck the option during creation.

Once enabled:

- A dedicated KQL table is created in your eventhouse database for the business event.
- Every event published to that business event is automatically ingested into the table.
- The table retains all historical events, making them available for queries at any time.

No additional pipelines or ingestion configuration is needed. The integration is active from the moment the business event is created.

## Query your business events with KQL

Once events are flowing into your eventhouse, you can open the KQL database and start querying. Here are common query patterns:

**View recent events:**

```kusto
BusinessEventTableName
| order by ingestion_time() desc
| take 50
```

**Count events by type over time:**

```kusto
BusinessEventTableName
| summarize EventCount = count() by bin(ingestion_time(), 1h)
| order by ingestion_time() desc
```

**Correlate across event types:**

```kusto
let downtime = EventA | where Status == "offline";
let alerts = EventB | where Severity == "critical";
downtime
| join kind=inner alerts on MachineId
| project MachineId, DowntimeStart, AlertTime, Severity
```

For more information about KQL syntax, see [Kusto Query Language overview](/kusto/query).

## Visualize your business events in a Real-Time Dashboard

Once you have a query that surfaces the business event data you care about, you can pin it directly to a Real-Time Dashboard for live operational monitoring.

1. Open your eventhouse KQL database and write a query against your business event table.

1. Select **Save to dashboard** > **To a new Dashboard** to create a Real-Time Dashboard from your query, or select **To an existing Dashboard** to add it as a tile to a dashboard you already have.

1. Enter a name and workspace location for the dashboard, and select **Create**.

1. Add more tiles with additional KQL queries to visualize different aspects of your business events, for example, event counts over time, breakdowns by category, or trend lines.

1. Set the dashboard auto-refresh interval to control how frequently the visuals update with new events.

1. Share the dashboard with your team for live operational monitoring.

For detailed steps and additional creation methods (including Copilot), see [Create a Real-Time Dashboard](../../real-time-intelligence/dashboard-real-time-create.md).

## Prerequisites

Before you query business events in an eventhouse or build Real-Time Dashboards:

- A [business event](create-business-events.md) defined in Real-Time hub with Eventhouse integration enabled (this is the default).
- At least one published event so data is available to query.
- Access to the eventhouse database in your workspace. For more information, see [Eventhouse overview](../../real-time-intelligence/eventhouse.md).

## Example: Monitor equipment downtime across facilities

A manufacturing company has defined an `ExtendedDowntime` business event in Real-Time hub. Multiple facilities publish this event from different tools: Activator watching a Power BI dashboard, a notebook scanning sensor data, and an eventstream processing telemetry.

Because Eventhouse integration is enabled by default, every `ExtendedDowntime` event is automatically stored. The operations team queries downtime patterns:

```kusto
ExtendedDowntime
| summarize DowntimeCount = count(), AvgDurationMinutes = avg(Duration) by Facility, bin(ingestion_time(), 1d)
| order by DowntimeCount desc
```

They also build a Real-Time Dashboard with tiles showing:

- Active downtime events across all facilities (live feed).
- Downtime frequency by machine and facility (bar chart, refreshing every 30 seconds).
- Trend of total downtime hours per week (line chart).

Plant managers use this dashboard for daily operational reviews, while the data science team queries the same eventhouse tables to build predictive maintenance models.

## Related articles

- [Business events in Microsoft Fabric](business-events-overview.md)
- [Create and manage business events](create-business-events.md)
- [Eventhouse overview](../../real-time-intelligence/eventhouse.md)
- [Create a Real-Time Dashboard](../../real-time-intelligence/dashboard-real-time-create.md)
- [Kusto Query Language overview](/kusto/query)
- [Use Activator as a business events publisher](business-events-activator.md)
- [Publish business events from a notebook](business-events-notebook.md)
- [Publish business events from a user data function](business-events-user-data-function.md)
- [Consume business events from Activator](consume-business-events-from-activator.md)
