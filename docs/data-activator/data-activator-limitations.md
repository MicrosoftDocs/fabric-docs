---
title: Data Activator limitations
description: Learn about the limitations of using Data Activator in your applications and dashboards. Data Activator provides real-time insights and analytics for your data.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.search.form: product-reflex
ms.date: 09/09/2024
#customer intent: As a Fabric user I want to learn about Data Activator limitations.
---

# Data Activator limitations

Data Activator is subject to the following general and specific limitations. Before you began your work with Data Activator, review and consider these limitations.

> [!IMPORTANT]
> Data Activator is currently in preview.

## General limitations

* Creating alerts for a report using Dynamic M parameters isn't supported.
* Creating alerts from the Fabric or Power BI Capacity Metrics app isn't supported.

## Supported Power BI visuals

Data activator supports the following Power BI visual types:

* Stacked column
* Clustered column
* Stacked bar
* 100% stacked column
* 100% stacked bar
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
* Key performance indicator (KPI)

Data Activator also supports the following map visuals. Data Activator only supports map visuals that use the *Location* field to specify the location of objects on the map. Data Activator doesn't support visuals that use *Latitude* and *Longitude* fields.

* Bing Map
* Filled Map
* Azure Map
* ArcGIS map

## Supported Real-Time Dashboard tiles

Data Activator supports the following tile types in Real-Time Dashboards:

* Time chart
* Bar chart
* Column chart
* Area chart
* Line chart
* Stat
* Multi stat
* Pie Chart

Additionally, for Data Activator to support a tile:

* The data in the tile must not be static.
* The data in the tile must be based on a Kusto Query Language (KQL) query.
* The tile must have at most one time range.
* The tile must be filtered by a predefined time range. Using a custom time range isn't supported.
* The tile must not contain time series data (for example, data created using the *make-series* KQL operator)

For more information, see [Limitations on charts with a time axis](data-activator-get-data-real-time-dashboard.md#limitations-on-charts-with-a-time-axis).

## Allowed recipients of email notifications

Each recipient of an email notification must have an internal email address. The recipient must belong to the organization that owns the Fabric tenant. Data Activator doesn't allow email notifications to be sent to either external email addresses or guest email addresses. In addition, the email domain of any email notification recipient must match the email domain of the notification owner. 

## System limits on processing rules

Data Activator allows you to alert others in your organization or kick off workflows when specific conditions defined on time series data are met. Based on the defined rule condition, the system might need to evaluate the rule over an amount of stored data to run your rule. For the system to continue to function well for all users, there is a limit to the total amount of data that can be processed. System limits help Data Activator retain the resources it needs to process data and rules successfully.

### Limits on Power BI rules built on timestamped data

When creating a rule on a Power BI visual, Activator looks at the underlying data in Power BI’s semantic model. The following limits are on rules built on visuals where the underlying data includes timestamps.

#### Data volume

Volume-based limits differ based on a few different factors. One factor is whether the rule is built on an event or attribute and conditions are defined on the current received event (stateless). Another is whether the rule requires historical data as well (stateful). Data Activator may stop rules that exceed the following limits.

|Rule that:  |Maximum number of rows added per hour  | 
|---------|---------|
|Does not preserve the state of an object ID (rules built on events)     |6,000         |
|Preserves the state of an object ID                                     |3,000   |

#### Impact on rule

If a rule reaches the maximum number of rows added per hour, you may not be able to edit the definition of the rule. The limits are based on the data volume in the Power BI report and how the rule is defined. In particular, both the lookback period and number of distinct, active object instances contribute to the impact on a rule.

### Limits on Power BI rules without timestamps and KQL query rules

When creating a rule on a Power BI visual without timestamps and KQL queries, the following limits apply.

#### Data volume

Volume-based limits differ based on a few different factors. One factor is whether the rule is built on an event or attribute and conditions are defined on the current received event (stateless). Another is whether the rule requires historical data as well (stateful). Data Activator may stop rules that exceed the following limits.

|Rule that:  |Maximum number of rows  | 
|---------|---------|
|Does not preserve the state of an object ID (rules built on events)     |6,000         |
|Preserves the state of an object ID                                     |3,000   |

#### Impact on rule

If a rule reaches the maximum number of rows added per hour, you may not be able to edit the definition of the rule. This limits are based on the data volume in the Power BI report and how the rule is defined. In particular, both the lookback period and number of distinct, active object instances contribute to the impact on a rule.

### Limits on other data sources (Eventstreams, Azure Storage Events etc.)

When creating a rule on other data sources, the following limits apply.

#### Data volume

Volume-based limits differ based on whether the rule behavior is defined on the current received event (stateless) or whether it requires historical data as well (stateful).

#### Rules that do not preserve state

Rules built on Eventstreams that do not preserve state are limited to 1,000 events per second.

#### Rules that preserve state

|Number of distinct, active object IDs  |Data volume per object ID (events per second per object ID)  | Total data volume (number of events per second) |
|---------|---------|---------|
|1          |≤300      |300      |
|<10        |≤30       |300      |
|<20        |≤15       |300      |
|<50        |≤20       |1,000    |
|≤100       |≤10       |1,000    |
|>100       |≤1        |1,000    |

Data Activator may stop rules that exceed these limits.

#### Impact on rule

Data Activator may prevent rules from being updated in the definition pane if the rule impact becomes too high, based on the data volume being processed by the rule. In particular, the lookback period and number of distinct, active object instances both contribute to the impact on the rule.

#### Number of distinct, active object IDs

Attribute rules defined on an object have limits imposed on the number of distinct instances of the object that are actively tracked by Data Activator. This limit is 100,000 distinct, active object IDs.

## Maximum number of rule actions

Data Activator imposes the following limits on the number of actions that may occur in a given time period. If an action exceeds the limit, Data Activator may throttle or cancel the action. In addition to the following limits, if a rule requests actions that exceed a limit of 1,000 per second, Data Activator may stop the rule.

|Rule action  |Scope  |Limit  |
|---------|---------|---------|
|Email     |Messages/reflex item/hour         |500        |
|Email     |Messages/trigger/recipient/hour   |30         |
|Teams     |Messages/reflex item/hour         |500        |
|Teams     |Messages/trigger/recipient/hour   |30         |
|Teams     |Messages/recipient/hour           |100        |
|Teams     |Messages/Teams tenant/second      |50         |
|PA        |Flow executions/trigger/hour      |10000      |

## Maximum number of Data Activator items

Your organization may have up to 250 Data Activator items per region. You will get an error message if you try to create more than this number of items. To resolve the error, either:

* Use an existing Data Activator item instead of creating a new item, or
* Delete some of your existing Data Activator items.

## Related content

* [Get started with Data Activator](data-activator-get-started.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)
* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
