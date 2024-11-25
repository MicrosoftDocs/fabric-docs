---
title: Activator limitations
description: Learn about the limitations of using Activator in your applications and dashboards. Activator provides real-time insights and analytics for your data.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter, ignite-2024
ms.search.form: product-reflex
ms.date: 11/08/2024
#customer intent: As a Fabric user I want to learn about Activator limitations.
---

# [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] limitations

Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is subject to the following general and specific limitations. Before you began your work with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], review and consider these limitations.
[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is subject to the following general and specific limitations.

## General limitations

* Creating alerts for a report using Dynamic M parameters isn't supported.
* Creating alerts from the Fabric or Power BI Capacity Metrics app isn't supported.

## Activator item migration from Preview to GA

If you created a rule while Activator was in preview, the associated activator item will be shown in a read-only mode no sooner than January 2025 and eventually deleted in March 2025. To ensure no gaps in functionality, create a new activator item and recreate your rules.

### Why This Matters

If you don't migrate your preview items to GA, you might face some issues like limited functionality. Your preview items may be shown in a read only mode, but any rules that are currently running will not be impacted and will continue to run. In order to make any edits on your rules, you’ll need to re-create your rules in a new activator item.
With the transition dates just around the corner, we encourage you to act soon. Activator will delete all items in preview March 2025. At this point, any running rules you have in a preview item will be stopped and deleted as part of the preview item deletion.

### How to Check if your Item needs to be Migrated

An easy way to check if your item needs to be migrated is if the item shows Data and Design modes tabs in the lower left corner of the item. If the Data and Design tabs are visible, you’ll need to recreate your rules in a new item to get all the newest capabilities.

## Supported Power BI visuals

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] supports the following Power BI visual types:

* Stacked column
* Clustered column
* Stacked bar
* Stacked 100% column
* Stacked 100% bar
* Clustered bar
* Ribbon chart
* Line
* Area
* Stacked area
* Line and stacked column
* Line and clustered column
* Pie
* Donut
* Gauge
* Card
* KPI

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] also supports the following map visuals. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] only supports map visuals that use the *Location* field to specify the location of objects on the map. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] doesn't support visuals that use *Latitude* and *Longitude* fields.

* Bing Map
* Filled Map
* Azure Map
* ArcGIS map

## Supported Real-Time Dashboard tiles

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] supports the following tile types in Real-Time Dashboards:

* Time chart
* Bar chart
* Column chart
* Area chart
* Line chart
* Stat
* Multi stat
* Pie Chart

Additionally, for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to support a tile:

* The data in the tile must not be static.
* The data in the tile must be based on a KQL query.
* The tile must have at most one time range.
* The tile must be filtered by a predefined time range. Using a custom time range isn't supported.
* The tile must not contain time series data (for example, data created using the *make-series* KQL operator)

For more information, see [Limitations on charts with a time axis](activator-get-data-real-time-dashboard.md#limitations-on-charts-with-a-time-axis).

## Allowed recipients of email notifications

Each recipient of an email notification must have an internal email address. The recipient must belong to the organization that owns the Fabric tenant. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] doesn't allow email notifications to be sent to either external email addresses or guest email addresses.

## Maximum data for rule processing limits

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] has a limit on the number of events that are processed in a rule based on the type of data being used in the rule. If your rule exceeds the maximum, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] stops your rule. For eventstreams, the maximum is 1,000 events per second.

## Maximum number of actions

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] imposes the following limits on the number of actions that may occur in a given time period. If an action exceeds the limit, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] may throttle or cancel the action.

|Rule action  |Scope  |Limit  |
|---------|---------|---------|
|Email     |Messages/activator item/hour         |500        |
|Email     |Messages/rule/recipient/hour   |30         |
|Teams     |Messages/activator item/hour         |500        |
|Teams     |Messages/rule/recipient/hour   |30         |
|Teams     |Messages/recipient/hour           |100        |
|Teams     |Messages/Teams tenant/second      |50         |
|custom action |Power Automate flow executions/rule/hour      |10000      |
|Fabric item |Activations/user/minute| 50   |

## Maximum number of [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] items

Your organization may have up to 250 [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] items per region. If you try to create more than this number of items, you receive an error message. To resolve the error, either:

* Use an existing [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] item instead of creating a new item, or
* Delete some of your existing [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] items.

## Related content

* [Get started with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-get-started.md)
* [Detection conditions in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-detection-conditions.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)
* [What is Microsoft Fabric?](../../get-started/microsoft-fabric-overview.md)
