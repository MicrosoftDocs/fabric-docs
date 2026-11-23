---
title: Monitor usage and troubleshoot your Fabric app
description: Monitor built-in app metrics, collect application events and logs, and investigate issues in your Fabric app with a coding agent or the Rayfin CLI.
ms.reviewer: bezulau
ms.topic: how-to
ms.date: 11/10/2026
ai-usage: ai-assisted
ms.search.form: Fabric App Metrics
---

# Monitor usage and troubleshoot your Fabric app

Monitor your Fabric app to understand how people use it and investigate unexpected behavior. Start with built-in metrics for an overview of app activity, then collect application events and logs to answer questions about specific features or operations.

## Choose what to monitor

Use the monitoring option that matches your question.

| What you want to understand | Where to start | Setup |
| --- | --- | --- |
| Sign-ins, app loads, data-query volume, errors, average query duration, and metrics for data connectors, storage, and functions. | [Built-in App Metrics](#monitor-built-in-app-metrics) in the Fabric portal. | No application instrumentation required. |
| Page visits, use of a particular feature, or what happened during an operation. | [Application telemetry](#collect-application-telemetry), queried with a coding agent or the Rayfin CLI. | Enable telemetry, deploy, and instrument the application signals you need. |

## Prerequisites

- A deployed Fabric app.
- **Write** permission on the app to open its management view and query application telemetry.

For information about setting up Fabric Apps, see [What is Fabric Apps?](overview.md).

To configure application telemetry, you also need the app's project files, a Rayfin CLI version that supports `telemetry`, and permission to deploy the app. Application telemetry must be available in the target workspace.

## Monitor built-in App Metrics

Open **Metrics** in your app's management view to see built-in, server-side metrics for sign-ins, app loads, data queries, data connectors, storage, and functions. You don't need to add instrumentation to your application code to use these metrics.

### Open app metrics

1. In the Fabric portal, open the workspace that contains your app.
1. Open the Fabric app item.
1. If you're viewing the running app, select **Manage app**.
1. In the left navigation, select **Metrics**.
1. Select **App**, **Database**, **Storage**, **Functions**, or **Connectors** to view metrics for that category. The **App** tab opens by default.
1. Select **Last 30 days**, **Last 7 days**, or **Last 24 hours** from the time range list. The default is **Last 30 days**.

Storage metrics appear where storage monitoring is enabled.

Each card shows a summary for the selected time range and a chart of activity over that range.

:::image type="complex" source="media/app-metrics/app-metrics-overview.png" alt-text="Screenshot of the Fabric app Metrics page with the App tab selected and sign-in and app-load charts." lightbox="media/app-metrics/app-metrics-overview.png":::
The Metrics navigation item is selected, and the time range is Last 30 days. Tabs are available for App, Database, Storage, Functions, and Connectors, with App selected. Two cards show time-series charts: Sign ins count displays 33 and includes silent sign-ins, and App loads displays 149 and counts the times index.html is served.
:::image-end:::

### Understand the metrics

Metrics are grouped by category. Function, connector, and storage metrics summarize activity across the app, rather than providing a breakdown for each individual resource.

| Tab | Metric | What it shows |
| --- | --- | --- |
| **App** | **Sign ins count** | Sign-in activity, including silent sign-ins. This metric isn't a count of unique users. |
| **App** | **App loads** | The number of times the app's `index.html` document is served. This metric isn't a count of unique visitors or all static-file downloads. |
| **Database** | **Query count** | GraphQL data requests processed by the app, including failed requests. |
| **Database** | **Query error count** | Failed data requests, including requests whose response JSON contains errors. A request with multiple errors counts once. |
| **Database** | **Query error rate** | The percentage of data requests that fail: `(Query error count / Query count) * 100`. |
| **Database** | **Duration - average** | Average server-side data-query duration, including failed requests. This metric isn't browser load or rendering time. |
| **Storage** | **Request count** | The number of storage requests. |
| **Storage** | **Request error rate** | The percentage of storage requests that fail. |
| **Functions** | **Invocations** | The number of function invocations. |
| **Functions** | **Failed invocations** | The number of function invocations that fail. |
| **Functions** | **Error rate** | The percentage of function invocations that fail. |
| **Functions** | **Average duration** | Average function invocation duration. |
| **Connectors** | **Request count** | The number of connector requests, excluding semantic model connectors. |
| **Connectors** | **Failed requests** | The number of connector requests that fail, excluding semantic model connectors. |
| **Connectors** | **Error rate** | The percentage of connector requests that fail, excluding semantic model connectors. |
| **Connectors** | **Average duration** | Average connector request duration, excluding semantic model connectors. |

Semantic model connectors aren't included in connector metrics.

Count cards summarize activity over the selected reporting window. Error rates and average durations are calculated for the whole window, not by averaging the plotted chart values. Durations appear in milliseconds or seconds.

A GraphQL response can contain errors even when its HTTP status is `200 OK`. Use **Query error count** and **Query error rate** to identify these failures.

### Understand the time range

Charts use Coordinated Universal Time (UTC) timestamps and completed time intervals:

| Selected range | Chart interval | End of the reporting window |
| --- | --- | --- |
| **Last 24 hours** | One hour | The start of the current UTC hour. The current, incomplete hour isn't included. |
| **Last 7 days** | One day | The start of the current UTC day. The current, incomplete day isn't included. |
| **Last 30 days** | One day | The start of the current UTC day. The current, incomplete day isn't included. |

For example, activity from earlier today might appear in **Last 24 hours** but not yet in **Last 7 days** or **Last 30 days**.

The time range applies to every tab. Switching tabs keeps the selected time range and displays the data already loaded. Changing the time range reloads the metrics across all tabs.

### Scope and limitations

App Metrics covers the built-in server-side metrics listed in this section. The charts don't provide browser performance measurements, custom application logs, or individual error drill-down. To collect app-specific events and logs, use [application telemetry](#collect-application-telemetry).

App Metrics isn't a capacity consumption report. For capacity units and billing information, see [Pricing and capacity usage for Fabric Apps](pricing.md).

## Collect application telemetry

Use application telemetry to understand page visits, track important actions, and investigate specific issues. Fabric Apps uses Application Insights to store this telemetry in a resource associated with your app.

Start with the questions you want to answer, then choose which signals to collect.

| Question | What to collect |
| --- | --- |
| Which pages are people visiting? | Page views from your app's browser telemetry. |
| Are people using a particular feature? | A custom event when someone performs that action, such as submitting a form or generating a report. |
| Where does a workflow stop? | Events at meaningful steps, such as starting and completing an operation. |
| What happened when someone reported a problem? | Diagnostic logs with context to identify the affected operation and time. |

### Enable application telemetry

Ask your coding agent to configure collection for your app. Adapt the event in this example to an action your app supports:

```text
Enable application telemetry for this Fabric app. Add browser page-view
collection and a custom event when a report is generated successfully.
Use compatible telemetry packages and the app's existing Rayfin client.
Show me the changes before deploying.
```

Or, from your app project directory, enable telemetry with the CLI:

```bash
npx rayfin telemetry enable
```

The command updates your project's `rayfin.yml`. You can also edit the setting directly, preserving your other service settings:

```yaml
services:
  telemetry:
    enabled: true
```

Deploy to apply the configuration:

```bash
npx rayfin up
```

Enabling telemetry changes local configuration only. Deployment sets up the app's telemetry destination and query support. For apps with deployed functions, Fabric also configures their telemetry destination. Browser collection requires initialization in your application code.

### Collect page views and application events

Your coding agent can add instrumentation as part of the preceding setup. If you add it yourself, install a version of `@microsoft/rayfin-telemetry` compatible with your app's `@microsoft/rayfin-client` and its required peer dependencies in the frontend package.

Initialize browser telemetry once during application startup, after your existing Rayfin client is ready. In this example, `client` is your app's initialized Rayfin client:

```typescript
import { initTelemetry } from '@microsoft/rayfin-telemetry/browser';

const telemetry = await initTelemetry({
  runtimeConfig: client.runtimeConfig,
  serviceName: 'my-fabric-app',
});
```

The initializer uses the connection string supplied in the deployed app's runtime configuration. You don't need to hardcode a connection string into your application.

The default browser setup collects page views. It doesn't automatically capture console output, browser exceptions, or Fetch/XHR requests. Add instrumentation for the signals your application needs.

For example, after a report is generated successfully, emit a custom event:

```typescript
import { logs } from '@opentelemetry/api-logs';

if (telemetry) {
  logs.getLogger('my-fabric-app').emit({
    eventName: 'report.generated',
    attributes: {
      'report.format': 'pdf',
    },
  });
}
```

Build and redeploy your updated app, then open it and perform the action you instrumented. Allow time for ingestion before querying the event.

### Explore app usage

Ask your coding agent to query the data you collected:

```text
Show me which pages people visited and how many report.generated events
were recorded in this app during the last day. Use the app's telemetry,
and distinguish recorded events from unique users.
```

To query directly, pass a Kusto Query Language (KQL) query to the CLI. For recent page visits, run:

```bash
npx rayfin telemetry query "pageViews | project timestamp, name, duration | order by timestamp desc | take 20" --timespan PT1H --max-rows 20 --json
```

To count recorded report-generation events by hour over the last day, run:

```bash
npx rayfin telemetry query "customEvents | where name == 'report.generated' | summarize RecordedEvents=count() by bin(timestamp, 1h) | order by timestamp asc" --timespan P1D --json
```

The command queries telemetry for the app's active deployment. `PT1H` selects the last hour, and `P1D` selects the last day. JSON output contains `status`, `count`, and `rows`.

These queries use Application Insights table names such as `pageViews`, `customEvents`, and `traces`, not Log Analytics table names such as `AppPageViews`, `AppEvents`, and `AppTraces`. For fields and table names, see the [Application Insights telemetry data model](/azure/azure-monitor/app/data-model-complete).

Counts represent collected events, not guaranteed totals of every user action. Collection settings, sampling, and delivery can affect the results.

<a id="use-metrics-to-investigate-your-app"></a>

### Investigate a reported problem

Identify when the problem occurred and which action the user was performing. Ask your coding agent to investigate that symptom and time window:

```text
Investigate why report generation failed in this app during the last hour.
Query the available application events and diagnostic logs. Summarize
what the evidence shows and identify any gaps in collection.
```

To retrieve recent diagnostic logs directly, run:

```bash
npx rayfin telemetry query "traces | project timestamp, severityLevel, message | order by timestamp desc | take 50" --timespan PT1H --max-rows 50 --json
```

Only records emitted to the app's telemetry destination appear in these results. Enabling application telemetry doesn't expose all internal Fabric platform logs or automatically instrument every operation.

If the information you need wasn't collected, add instrumentation for future occurrences. Enabling collection doesn't recover past activity. An empty query result doesn't prove that no failures occurred.

### Turn off application telemetry

Disabling telemetry is a deployment change, not a way to pause collection while retaining the same resource.

> [!WARNING]
> Disabling telemetry and deploying deletes the app's allocated observability resource. Previously collected telemetry is no longer available through that resource. Re-enabling telemetry creates a new resource and doesn't restore that history.

Run:

```bash
npx rayfin telemetry disable
npx rayfin up
```

The disable command updates local configuration. The deletion occurs during deployment. Remove or stop browser instrumentation as appropriate; an already-open page can retain its initialized telemetry configuration until it reloads.

## Troubleshooting

Use the following checks when metrics don't load or application telemetry doesn't return the expected results.

### Missing data and loading errors

If a card displays **No metric data is available for this time range**, no data was returned for that metric in the selected range. A summary value of `0` alongside this message isn't confirmation that zero events occurred.

Check that your app had activity during the selected reporting window. For recent activity, try **Last 24 hours** and account for the incomplete hour that's excluded.

The message **We couldn't load this metric. Refresh the page. If the problem continues, contact the app owner.** means the card's data couldn't be retrieved. Other cards can still show results. A loading error isn't a measurement of your app's health.

If **Manage app** is disabled, ask an app owner or administrator to check your Write permission.

### Troubleshoot collection and queries

Use these checks when setup or queries don't return the expected results.

| Symptom | Action |
| --- | --- |
| The CLI doesn't recognize `telemetry`. | Use a CLI version that supports application telemetry. |
| A query reports `TELEMETRY_NOT_ENABLED`. | Enable telemetry and deploy the configuration change with `npx rayfin up`. |
| The service reports `FEATURE_NOT_ENABLED`. | Confirm that application telemetry is available in the target workspace. Local configuration doesn't enable the service for that workspace. |
| Browser initialization has no connection string. | Check that the deployed `rayfin.config.json` contains `applicationInsightsConnectionString`, and that your client reads the deployed runtime configuration. |
| A query is denied. | Confirm that your signed-in account has Write permission on the app. |
| A query succeeds but returns no rows. | Check the active deployment, time window, instrumentation, browser export, and ingestion delay. Perform an instrumented action and query for it again. |

## Related content

- [What is Fabric Apps?](overview.md)
- [Develop Fabric apps with AI agents](ai-agent-development-for-apps.md)
- [Deploy a Fabric Apps project to Fabric](deploy-app.md)
- [Pricing and capacity usage for Fabric Apps](pricing.md)
- [Application Insights telemetry data model](/azure/azure-monitor/app/data-model-complete)
