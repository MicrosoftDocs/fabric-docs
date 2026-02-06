---
title: Activator limitations
description: Learn about the limitations of using Activator in your applications and dashboards. Activator provides real-time insights and analytics for your data.
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.search.form: product-reflex
ms.date: 12/02/2024
#customer intent: As a Fabric user I want to learn about Activator limitations so that I can know when I can use it appropriately.
---

# [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] limitations

Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is subject to the following general and specific limitations. Before you began your work with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], review and consider these limitations.
[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is subject to the following general and specific limitations.

## General limitations

* Creating alerts for a report using Dynamic M parameters isn't supported.
* Creating alerts from the Fabric or Power BI Capacity Metrics app isn't supported.

## Activator item migration from Preview to GA

Activator became Generally Available (GA) in November 2024. The move to GA impacts the functionality of your Activator items and rules. 

> [!IMPORTANT]
> You need to take action or your Activator items created during the preview will be deleted in March 2025.

If you created a rule or activator while Activator was in preview, those rules and activators will eventually be deleted. The rules and activators created during preview are being phased out according to the following schedule.

- January 2025, the items convert to read-only mode. Rules currently running continue to run but can't be edited. Recreate these rules in a new Activator item to keep them running and editable.
- March 2025, all Activator items are deleted. Even running rules are deleted.

To ensure no gaps in functionality, create new activator items and recreate your rules.

### How to check if your item needs to be migrated

If the item shows Data and Design mode tabs in the lower left corner of the item, it needs to be migrated. If the Data and Design tabs are visible, [recreate your rules in a new item](activator-create-activators.md) to get all the newest capabilities.

:::image type="content" source="media/activator-limitations/activator-migration.png" alt-text="Screenshot showing the screen with Data and Design. ":::

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

Each recipient of an email notification must have an internal email address. The recipient must belong to the same domain as the creator or other verified domains on creator's Microsoft Entra tenant. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] doesn't allow email notifications to be sent to either external email addresses or guest email addresses.

To check if the recipient's domain is one of the verified domains, visit [Azure portal](https://portal.azure.com) and search for **Microsoft Entra ID**. Once landed in Microsoft Entra ID, select **Custom domain names** in the left panel and check if recipient's domain is listed there.

## Allowed chats and channel for Teams notifications

For Teams group chats, only recently active chats are enabled for selection. If the chat you are looking for isn't displayed in Activator, send a message to the chat to ensure it's recently active. Additionally, for Teams channels, only shared channels are displayed and available. Sending messages to [private channels](https://aka.ms/TeamsPrivateChannel) isn't enabled.

## Maximum number of events per second

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can process up to 10,000 incoming events per second per rule. If the number of input events to your rule exceeds this limit, then Activator stops your rule.

## Maximum number of actions

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] imposes the following limits on the number of actions that might occur in a given time period. If an action exceeds the limit, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] might throttle or cancel the action.

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


## Lifecycle management limitations

Activator items do not currently work with Microsoft Fabric’s lifecycle management tools if they use either of these scenarios:

* Azure Blob Storage Events as data source

* Power BI as data source

* Fabric User Data Functions as action (coming soon in December 2025)

If you include an Activator item with one of these sources or actions in a deployment pipeline or a Git-integrated workspace, you will see an error when you try to deploy or commit the Activator item.

Support for these data sources and actions is planned for a future release.

## Related content

* [Detection conditions in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-detection-conditions.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)
* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
