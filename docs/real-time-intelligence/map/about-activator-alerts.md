---
title: Activator alerts in Fabric Maps
description: Learn about Activator alerts in Fabric Maps.
ms.reviewer: smunk, deniseatmicrosoft
author: deniseatmicrosoft
ms.author: limingchen
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 10/12/2026
ms.search.form: Activator alerts in Fabric Maps
---

# Activator alerts in Fabric Maps

Fabric Maps integrates with [Fabric Activator](../data-activator/activator-introduction.md) so that you can monitor operational data associated with a map and take action when the data meets conditions that you define. Instead of watching a map continuously, you can create an Activator rule that sends a notification or starts an automated process.

You can create alerts for map layers that use data from a KQL database in an eventhouse. For example, an operations team can receive a notification when a vehicle reports a critical engine temperature.

In Fabric Maps, **alert** refers to the map experience and commands, such as **Manage alerts (Preview)** and **Add alert**. The alert is stored and managed in Fabric Activator as a **rule**.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## How Activator alerts work with Fabric Maps

An alert starts with data used by a supported map layer. When you create the alert, you choose data from the layer, define a condition, and configure an action. The rule is saved in an Activator item.

The alert follows this flow:

1. Activator evaluates the selected eventhouse data.
1. The rule determines whether the data meets the condition that you defined.
1. When the condition is met, Activator runs the configured action.

Activator evaluates data, not the visual appearance of features on the map. A marker's color or size, the layer's drawing order, and the feature's location on the screen aren't values that Activator evaluates. To monitor a value used to style a feature, select the underlying field or property that provides that value.

## Rule settings

The **Add rule** pane organizes rule settings into five sections:

| Section | Purpose |
| --- | --- |
| **Details** | Identifies the rule by name. |
| **Monitor** | Shows the eventhouse source and generated KQL query, and controls how often Activator runs the query. |
| **Condition** | Defines which events Activator evaluates, how events are grouped, the condition to detect, and how often or how long the condition must be true. |
| **Action** | Defines the notification, Fabric activity, or custom action that runs when the condition is met. |
| **Save location** | Selects the workspace and Activator item in which the rule is stored. |

For step-by-step instructions, see [Configure the alert rule](create-activator-alerts.md#configure-the-alert-rule).

## Common monitoring scenarios

Use Activator alerts with Fabric Maps to detect conditions that require attention without continuously monitoring the map.

### Monitor fleet health

Monitor telemetry from a Kusto-backed vehicle layer. For example, create a rule that alerts a fleet operator when a vehicle's engine temperature exceeds a defined threshold.

### Monitor service coverage

Use the output of a KQL table, function, or materialized view to monitor operational totals by service region. For example, alert an operations team when the number of available assets in a region falls below its service target.

### Monitor operational incidents

Monitor eventhouse query output that contains incidents grouped by area or severity. For example, alert a response team when the number of active incidents exceeds an acceptable limit.

## Supported data and monitoring

Fabric Maps supports creating Activator alerts from KQL database data in an eventhouse. Other map data sources and layer types don't support creating Activator alerts.

For an eventhouse layer, you can monitor fields returned by the KQL table, function, or materialized view used by the layer. These values can include calculations or summaries produced by KQL, such as an incident count by region. Fabric Maps and Activator monitor the returned values; they don't perform the spatial aggregation.

When you create a rule, you specify the value to monitor, the condition to detect, and the action to take. Depending on the selected data, you can also group events by an identifier so that Activator evaluates each asset, vehicle, region, or other logical object independently. For more information about rules and object-level evaluation, see [Overview of Activator rules](../data-activator/activator-rules-overview.md).

<!-- OPEN ISSUE A02: Confirm the supported Eventhouse result-column data types, whether all calculated and summarized columns are available, and the behavior when no grouping field is selected. -->

## What Activator evaluates

An Activator rule continues to monitor its configured data independently of how a viewer interacts with the map. Panning, zooming, changing layer visibility, and changing layer styling don't change the rule condition.

The selected eventhouse layer determines the values available when you configure the rule. Design the KQL output so that it exposes the values and identifiers required by the monitoring scenario. For guidance about balancing detection latency and capacity usage for a query data source, see [Query frequency for query data sources](../data-activator/activator-query-frequency.md).

<!-- OPEN ISSUE A04: Confirm whether map data filters are carried into the Activator rule, whether the rule evaluates all source results or only the layer result set, and whether selecting a feature can scope a rule. -->

## Actions

Fabric Maps uses the Activator action model available across Fabric. Depending on the action and its configuration, a rule can:

- Send an email
- Send a Microsoft Teams message
- Run a Fabric item, such as a pipeline, notebook, Spark job definition, dataflow, or User Data Function
- Start a custom Power Automate action

Email and Teams notifications can include a headline, message text, activation time, object identifier, and selected context properties from the monitored data. Notifications also include a link to open and manage the rule in Activator.

For the complete list of actions, requirements, and configuration options, see [Configure actions for Activator rules](../data-activator/rule-actions.md).

## Permissions and ownership

To create an Activator alert from a map, you need access to the map and read access to the eventhouse that supplies the layer data. You also need permission to create the Activator item or save the rule to an existing Activator item, along with any permissions required by the configured action.

Sharing a map doesn't grant access to its data sources or Activator items. For more information about map access, see [Permissions in Fabric Maps](about-map-permissions.md).

During preview, only the map author can edit an Activator rule created from the map. Other users who can view or edit the map can't edit the rule.

<!-- OPEN ISSUE A06: Specify the exact workspace roles and item permissions required to create a map-created rule. Confirm whether nonauthors can view, start, stop, delete, or view the rule's history. Also confirm what happens to rule execution and ownership if the map author loses access or leaves the organization. -->

## Manage Activator rules

Rules created from a map are stored in an Activator item. Open the rule in Activator to review its definition and **History** tab, start or stop monitoring, change its condition or action, or delete it. A stopped rule doesn't evaluate incoming data or run actions.

For step-by-step instructions, see [Manage a rule in Activator](create-activator-alerts.md#manage-a-rule-in-activator). For general rule management guidance, see [Create a rule in Fabric Activator](../data-activator/activator-create-activators.md).

## Considerations and limitations

- Only eventhouse map layers support creating Activator alerts.
- The **Manage alerts (Preview)** command is available only when the map is open in edit mode.
- For eventhouse layers that use a KQL database table, Activator evaluates only the last 100 ingested rows. To monitor more detailed or complex data, use a KQL function or materialized view to return aggregated or filtered results. For more information, see [Kusto integration limitations](about-kusto-integration.md#limitations).
- Activator evaluates the rule against new data after the rule starts. It doesn't activate retroactively for data that was ingested before the rule started.
- Deleting a rule can take up to five minutes to stop back-end processing. The rule might continue to monitor data and run actions during that interval. For more information, see [Start and stop your rule](../data-activator/activator-create-activators.md#start-and-stop-your-rule).
- Activator doesn't support creating rules from map tiles in a Real-Time Dashboard. This limitation doesn't apply to Fabric map items, which support creating rules from eventhouse-backed map layers.

General Activator limits, action throttling, and capacity consumption also apply. For more information, see [Activator limitations](../data-activator/activator-limitations.md) and [Understand Activator capacity consumption, usage reporting, and billing](../data-activator/activator-capacity-usage.md).

<!-- OPEN ISSUE A07: Confirm remaining Maps-specific limits, including evaluation frequency, source refresh interaction, delayed or unavailable data behavior, other query/result-size limits, and the maximum number of rules per map or layer. -->

## Related content

- [What is Fabric Activator?](../data-activator/activator-introduction.md)
- [Overview of Activator rules](../data-activator/activator-rules-overview.md)
- [Query frequency for query data sources](../data-activator/activator-query-frequency.md)
- [Activator limitations](../data-activator/activator-limitations.md)
- [Kusto integration in Fabric Maps](about-kusto-integration.md)
- [Permissions in Fabric Maps](about-map-permissions.md)

### Next steps

> [!div class="nextstepaction"]
> [Create Activator alerts from a Fabric map](create-activator-alerts.md)
