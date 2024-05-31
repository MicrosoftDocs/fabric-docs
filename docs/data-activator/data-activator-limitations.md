---
title: Data Activator limitations
description: Learn about Data Activator limitations.
author: davidiseminger
ms.author: davidi
ms.topic: concept
ms.custom:
  - build-2024
ms.search.form: product-reflex
ms.date: 01/04/2024
---

# Data Activator limitations

> [!IMPORTANT]
> Data Activator is currently in preview.

Data Activator is subject to the following limitations and considerations.

## General limitations

Data activator has the following general limitations:

* Creation of an alert for a report using Dynamic M parameter isn't currently supported
* Creating alerts from the Fabric or Power BI Capacity Metrics app isn't currently supported

## Supported Power BI visuals

Data activator only supports the following Power BI visual types:

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
* KPIs

Data activator also supports the following map visuals. Data activator only supports map visuals that use the *Location* field to specify the location of objects on the map. Data Activator doesn't support visuals that use *Latitude* and *Longitude* fields.

* Bing Map
* Filled Map
* Azure Map
* Arc GIS map

## Supported Real-Time Dashboard tiles

Data Activator supports only the following tile types in Real-Time Dashboards:

* Time chart
* Bar chart
* Column chart
* Area chart
* Line chart
* Stat
* Multi stat
* Pie Chart

Additionally, for a tile to be supported by Data Activator:

* The data in the tile must not be static
* The data in the tile must be based on a KQL query
* The tile must have at most one time range
* The tile must be filtered by one of the pre-defined time ranges; custom time ranges are not supported
* The tile must not contain time series data (for example, data created using the *make-series* KQL operator)

 For more information, see [Limitations on charts with a time axis](data-activator-get-data-real-time-dashboard.md#limitations-on-charts-with-a-time-axis).

## Allowed recipients of email alerts

Each recipient of email alerts must be an internal email address, which means the recipient must belong to the organization that owns the Fabric tenant. Data Activator doesn't allow email alerts to be sent to either external email addresses nor guest email addresses. In addition, the email domain of any email alert recipients must match the email domain of the alert owner.

## Maximum data throughput for Eventstreams data

For Eventstreams data sources, Data Activator supports throughput up to two events per second. If you send Eventstreams data to Data Activator at a more frequent rate, Data Activator may throttle the input, which means that Data Activator wouldn't process all events in the stream.

## Maximum number of trigger actions

Data Activator imposes the following limits on the number of trigger actions that may occur in a given time period. If a trigger action occurs that exceeds the limit, Data Activator may throttle the action, which means that Data Activator wouldn't execute the specified action.


|Trigger action  |Scope  |Limit  |
|---------|---------|---------|
|Email     |Messages/reflex item/hour         |500        |
|Email     |Messages/trigger/recipient/hour   |30         |
|Teams     |Messages/reflex item/hour         |500        |
|Teams     |Messages/trigger/recipient/hour   |30         |
|Teams     |Messages/recipient/hour           |100        |
|Teams     |Messages/Teams tenant/second      |50         |
|PA        |Flow executions/trigger/hour      |10000      |


## Related content

* [Get started with Data Activator](data-activator-get-started.md)
* [Get data for Data Activator from Power BI](data-activator-get-data-power-bi.md)
* [Get data for Data Activator from Eventstreams](data-activator-get-data-eventstreams.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
