---
title: Monitor Activator with Workspace Monitoring
description: Learn how to query and analyze Activator rule failure notifications by using workspace monitoring in Microsoft Fabric.
ms.topic: tutorial
ms.date: 09/23/2026
ai-usage: ai-assisted
---

# Monitor Activator with workspace monitoring

Activator workspace monitoring provides visibility into failures from your Activator rules. It stores failure notifications in the monitoring Eventhouse so you can query and analyze them by using Kusto Query Language (KQL).

> [!NOTE]
> Activator workspace monitoring records failure notifications, not metrics or successful evaluations. If no failures occur during the selected time range, the `ActivatorRuleNotifications` table has no rows.

## Review logged data

The `ActivatorRuleNotifications` table contains Activator rule failure notifications. Each row identifies the affected rule and the error code reported by Activator.

The table includes:

- The Activator item and workspace associated with the failure.
- The affected rule identifier.
- The Activator error code.
- The time the failure notification was recorded.

Use Activator notification logs to:

- Identify rules that report failures.
- Group notifications by error code to find common failure types.
- Find rules that report the same failure repeatedly.
- Track the most recent notification for an affected rule.

### Activator error codes

`NotificationId` contains the Activator error code. For descriptions and remediation guidance, see [Troubleshoot Activator errors](activator-troubleshooting.md).

## ActivatorRuleNotifications schema

The following table describes the columns stored in the `ActivatorRuleNotifications` table.

| Column name | Column type | Description |
|---|---|---|
| `Timestamp` | `datetime` | The timestamp in Coordinated Universal Time (UTC) when the failure notification was generated. |
| `OperationName` | `string` | Not populated. The operation associated with the notification. |
| `ItemId` | `string` | The unique identifier of the Activator item. |
| `ItemKind` | `string` | The type of Fabric item. |
| `ItemName` | `string` | Not populated. The name of the Activator item. |
| `WorkspaceId` | `string` | The unique identifier of the workspace that contains the item. |
| `WorkspaceName` | `string` | Not populated. The name of the workspace that contains the item. |
| `CapacityId` | `string` | The unique identifier of the Fabric capacity that hosts the item. |
| `CapacityName` | `string` | Not populated. The name of the Fabric capacity that hosts the item. |
| `CorrelationId` | `string` | An identifier used to correlate related records, when available. |
| `OperationId` | `string` | The unique identifier of the logged operation. |
| `Identity` | `dynamic` | Not populated. The identity associated with the operation, when available. |
| `CustomerTenantId` | `string` | The unique identifier of the customer tenant. |
| `DurationMs` | `long` | The duration associated with the operation in milliseconds, when available. |
| `Status` | `string` | Not populated. The status associated with the notification, when available. |
| `Level` | `string` | The severity level of the notification, when available. |
| `Region` | `string` | Not populated. The Fabric region associated with the notification, when available. |
| `WorkspaceMonitoringTableName` | `string` | The name of the workspace monitoring table. The value is `ActivatorRuleNotifications`. |
| `RuleId` | `string` | The unique identifier of the affected Activator rule. |
| `NotificationId` | `string` | The Activator error code for the failure. |

## Query logs

To analyze Activator failure notifications:

1. Go to the monitoring Eventhouse.
1. Run KQL queries against `ActivatorRuleNotifications` to analyze recent failures, error-code trends, and repeatedly affected rules.

### Find an Activator rule GUID

To find the globally unique identifier (GUID) for an Activator rule:

1. Open the Activator item in Fabric.
1. Select the rule that you want to investigate.
1. In the browser URL, copy the GUID immediately after `/models/`.

For example, if the URL contains `/models/07d89516-5f87-41e0-bf0c-9d41ea66c8ee`, the rule ID is `07d89516-5f87-41e0-bf0c-9d41ea66c8ee`.

> [!IMPORTANT]
> Select the rule before you copy the ID. The value after `/models/` represents the currently selected element. If you don't select the rule first, the value might be an object, attribute, or source ID.

### View recent failures

The following query returns failure notifications from the last 24 hours:

```kusto
ActivatorRuleNotifications
| where Timestamp >= ago(24h)
| project Timestamp, RuleId, NotificationId, WorkspaceId, CapacityId
| order by Timestamp desc
```

### Summarize failures by error code

Use the following query to identify the most frequent error codes and the number of affected rules:

```kusto
ActivatorRuleNotifications
| where Timestamp >= ago(7d)
| summarize FailureCount = count(), AffectedRules = dcount(RuleId), LastSeen = max(Timestamp) by NotificationId
| order by FailureCount desc
```

### Find repeatedly affected rules

Use the following query to find rules that were repeatedly affected in the last 24 hours:

```kusto
ActivatorRuleNotifications
| where Timestamp >= ago(24h)
| summarize FailureCount = count(), ErrorCodes = make_set(NotificationId, 20), LastSeen = max(Timestamp) by RuleId, ItemId
| order by FailureCount desc
```

### Investigate one rule

Replace `<rule-guid>` with a `RuleId` value from the table:

```kusto
let ruleId = "<rule-guid>";
ActivatorRuleNotifications
| where Timestamp >= ago(7d) and RuleId == ruleId
| project Timestamp, ItemName, NotificationId, WorkspaceId, CapacityId
| order by Timestamp desc
```

## Create an alert for Activator failures

Use a KQL queryset to detect new Activator failure notifications. The following query returns records ingested during the last 10 minutes:

```kusto
let lookback = 10m;
ActivatorRuleNotifications
| where ingestion_time() >= ago(lookback)
| project Timestamp, RuleId, NotificationId, WorkspaceId
```

Create an alert when the query returns one or more rows. Include `RuleId`, `NotificationId`, and `Timestamp` in the action so responders can identify the affected rule and error code.

## Best practices

Follow these best practices when you work with Activator notification logs:

- Use [Troubleshoot Activator errors](activator-troubleshooting.md) as the source of truth for error-code meanings and remediation guidance.
- For scheduled alerts, use a lookback window that's at least as long as the query schedule. Otherwise, you might miss data.

## Known limitations

Consider the following limitations when you use Activator workspace monitoring:

- The table contains failure notifications only. It doesn't contain metrics, successful evaluations, or a complete rule-execution history.
- An empty result means that no failure notifications were recorded during the selected time range.
- Workspace monitoring data is retained for 30 days.
- A workspace can use workspace monitoring or Log Analytics, but not both at the same time.
- The monitoring Eventhouse database is read-only.

## Related content

For more information about Activator and workspace monitoring, see:

- [Activator documentation](activator-introduction.md)
- [Troubleshoot Activator errors](activator-troubleshooting.md)
- [Create alerts from a KQL queryset](activator-alert-queryset.md)
- [Workspace monitoring overview](../../fundamentals/workspace-monitoring-overview.md)
- [Enable workspace monitoring](../../fundamentals/enable-workspace-monitoring.md)