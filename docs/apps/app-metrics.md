---
title: Monitor your Fabric app with App Metrics (preview)
description: Use App Metrics to monitor sign-ins, app loads, query volume, errors, and query duration for a Fabric app.
ms.reviewer: bezulau
ms.topic: how-to
ms.date: 09/22/2026
ai-usage: ai-assisted
ms.search.form: Fabric App Metrics
---

# Monitor your Fabric app with App Metrics (preview)

App Metrics helps you answer questions about your Fabric app: Is it being used? Are queries failing? How long do queries take?

Open **Metrics** in your app's management view to see built-in, server-side metrics for sign-ins, app loads, and data queries. You don't need to add instrumentation to your application code to use these metrics.

[!INCLUDE [Fabric feature-preview-note](../includes/feature-preview-note.md)]

## Prerequisites

- A deployed Fabric app.
- **Write** permission on the app to open its management view.

For information about setting up Fabric Apps, see [What is Fabric Apps?](overview.md)

## Open App Metrics

1. In the Fabric portal, open the workspace that contains your app.
1. Open the Fabric app item.
1. If you're viewing the running app, select **Manage app**.
1. In the left navigation, select **Metrics**.
1. Select **Last 30 days**, **Last 7 days**, or **Last 24 hours** from the time range list. The default is **Last 30 days**.

Each card shows a summary for the selected time range and a chart of activity over that range.

:::image type="complex" source="media/app-metrics/app-metrics-overview.png" alt-text="Screenshot of the Fabric app Metrics page with a time range selector and six metric cards." lightbox="media/app-metrics/app-metrics-overview.png":::
The Metrics navigation item is selected, and the time range is Last 30 days. Six cards appear in two rows: Sign ins count, App loads, Query count, Query error count, Query error rate, and Duration - average. In this example, the cards show 636 sign-ins, 1,513 app loads, 398 queries, a query error count of 0, a query error rate of 0 percent, and an average duration of 1.58 seconds. The query error count card also displays "No metric data is available for this time range." The other cards show time-series charts.
:::image-end:::

## Understand the metrics

| Metric | What it shows |
| --- | --- |
| **Sign-ins count** | Sign-in activity, including silent sign-ins. This metric doesn't count unique users. |
| **App loads** | App-load activity for your hosted app's `index.html` document. This metric doesn't count unique visitors or every static file downloaded by the browser. |
| **Query count** | The number of GraphQL data requests processed by your app, including requests that fail. |
| **Query error count** | The number of GraphQL data requests that fail, including requests whose response JSON contains errors. A request that returns multiple errors counts once. |
| **Query error rate** | The percentage of data requests that fail: `(Query error count / Query count) * 100`. |
| **Duration - average** | The average server-side duration of data requests, including failed requests. Values are displayed in milliseconds or seconds. This metric isn't the time it takes a browser to load or render your app. |

A GraphQL response can contain errors even when its HTTP status is `200 OK`. Use **Query error count** and **Query error rate** to understand these failures rather than relying on HTTP status alone.

The count cards summarize activity over the selected range. The error-rate and duration cards show values calculated for the whole range, not a simple average of the points displayed in their charts.

## Understand the time range

Charts use Coordinated Universal Time (UTC) timestamps and completed time intervals:

| Selected range | Chart interval | End of the reporting window |
| --- | --- | --- |
| **Last 24 hours** | One hour | The start of the current UTC hour. The current, incomplete hour isn't included. |
| **Last 7 days** | One day | The start of the current UTC day. The current, incomplete day isn't included. |
| **Last 30 days** | One day | The start of the current UTC day. The current, incomplete day isn't included. |

For example, activity from earlier today might appear in **Last 24 hours** but not yet in **Last 7 days** or **Last 30 days**. Changing the time range reloads all six metrics.

## Use metrics to investigate your app

Start with the question you want to answer:

| Question | What to check |
| --- | --- |
| Is my app being used? | Compare **App loads**, **Sign ins count**, and **Query count**. These metrics measure different activities, so their totals don't need to match. |
| Are data requests failing? | Review **Query error count** alongside **Query error rate** and **Query count**. A small number of failures can produce a high rate when request volume is low. |
| Have data requests become slower? | Look for increases in **Duration - average** and compare them with query volume over the same interval. An average doesn't show the slowest individual request. |

The charts help you identify an affected time period. They don't provide individual error samples or request traces to diagnose a specific failure.

## Missing data and loading errors

If a card displays **No metric data is available for this time range**, no data was returned for that metric in the selected range. A summary value of `0` alongside this message isn't confirmation that zero events occurred.

Check that your app had activity during the selected reporting window. For recent activity, try **Last 24 hours** and account for the incomplete hour that's excluded.

If a card displays **This metric couldn't be loaded**, its data couldn't be retrieved. Other cards can still show results. Return to **Metrics** or change the time range to retry. A loading error isn't a measurement of your app's health.

If **Manage app** is disabled, ask an app owner or administrator to check your Write permission.

## Scope and limitations

App Metrics covers the built-in server-side metrics listed in this article. It doesn't provide browser performance measurements, custom application logs, individual error drill-down, or an advanced-monitoring setup experience.

App Metrics isn't a capacity consumption report. For capacity units and billing information, see [Pricing and capacity usage for Fabric Apps](pricing.md).

## Related content

- [What is Fabric Apps?](overview.md)
- [Pricing and capacity usage for Fabric Apps](pricing.md)
