---
title: Create Activator alerts from a Real-Time Dashboard
description: Learn how to create an Activator alert from a Real-Time Dashboard and receive real-time notifications when conditions are met.
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.reviewer: guregini
ms.custom: FY25Q1-Linter
ms.date: 10/20/2025
ms.search.form: Real-Time Dashboard
#Customer intent: As a customer, I want to learn how to create Activator alerts from a Real-Time Dashboard so that I can trigger notifications when conditions are met on daa in the dashboard.
---
# Create [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] alerts for a Real-Time Dashboard

You can create Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] alerts from many different data sources in Microsoft Fabric. This article explains how to create [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] alerts for a Real-Time Dashboard. For more information, see [What is [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]?](activator-introduction.md)

## Alert when conditions are met in a Real-Time Dashboard

Use [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to trigger notifications when conditions are met on data in a Real-Time Dashboard. For example, if you have a Real-Time Dashboard displaying availability of bicycles for hire in multiple locations, you can trigger an alert if there are too few bicycles available in any one location. Send those alert notifications either to yourself, or to others in your organization, using email or Microsoft Teams.

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)
* A [Real-Time Dashboard](../../real-time-intelligence/dashboard-real-time-create.md) with at least one tile displaying data

## Create an [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule using **Set alert**

1. Open a Real-Time Dashboard.
1. Toggle from **Viewing** to **Editing** mode in the toolbar.
1. Choose a tile on the Real-Time Dashboard for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to monitor.
1. Select **Set Alert** from the tile's toolbar or in the **More menu (...)** at the top-right of the tile. You can also use the *Set Alert* button in the Real-Time Dashboard menu bar.

:::image type="content" source="media/activator-get-data/set-alerts.png" alt-text="Screenshot showing how to add an Activator rule from a tile." lightbox="media/activator-get-data/set-alerts.png":::

## Define the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] alert conditions

### Condition

In the **Set alert** pane, define your rule conditions. Rule conditions include deciding which field to monitor and setting the threshold.

:::image type="content" source="media/activator-get-data/set-alerts-condition.png" alt-text="Screenshot of create an alert window in Activator, save condition highlighted." lightbox="media/activator-get-data/set-alerts-condition.png":::

### Action

Choose the action to take when the alert triggers. You can receive an email or a Teams message when the condition is met or automatically run a Fabric item.

:::image type="content" source="media/activator-get-data/set-alerts-action.png" alt-text="Screenshot of create an alert window in Activator, save action highlighted." lightbox="media/activator-get-data/set-alerts-action.png":::

### Save location

Set the location to save this [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule and select **Create**.

:::image type="content" source="media/activator-get-data/set-alerts-location.png" alt-text="Screenshot of create an alert window in Activator, save location highlighted." lightbox="media/activator-get-data/set-alerts-location.png":::

## Modify your rule in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

When your rule is ready, you receive a notification with a link to your rule. Select the link to edit your rule in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. Editing your rule is useful if you want to do one of the following refinements:

* Add other recipients to your alert.
* Define a more complex alert condition than is possible in the **Set alert** pane.

For information on how to edit rules in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], see [Create activators in design mode](activator-create-activators.md).

## Limitations on charts with a time axis

If you have a chart with a time axis in Power BI or in a Real-Time Dashboard, then [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] reads the measure value exactly once for each point on the time axis. If the measured value for a given time point changes after [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] reads it, then [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] ignores the changed value.

### Limitation example

The following example illustrates this limitation. In this example, a chart shows the number of bikes bikes sold. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] first reads the chart in the morning of January 3. At this time, the chart shows 10 bikes sold:

|Date        | Number of bikes sold
|------------|---------------------
|1 January   |20
|2 January   |18
|3 January   |10

Later in the day of January 3, more bikes are sold. The chart updates to reflect this change, and the number of bikes sold now reads 15:

|Date        | Number of bikes sold
|------------|---------------------
|1 January   |20
|2 January   |18
|3 January   |15 *(changed from earlier in the day)*

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] ignores the changed value, because it has already read a value of 10 earlier in the day.

### How to work around this limitation

The most common reason that a measure value can change over time is that the most recent point on the time axis is subject to change. In the example, the number of sales increases throughout the day. The number of items sold on previous days never changes, because these dates are in the past. To avoid this limitation:

1. **Exclude the current date/time from the chart**, so that this value isn't sampled while it's still subject to change.

      * Add a relative time filter to your chart to exclude the current date or time from your chart. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] sees the value only after it's final for the period of time being measured, and no longer subject to change.
      * Add a time filter where the time range ends at 'one bin before' the current time. So, the last bin sampled by [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is already "closed" and doesn't change.

        ```kusto 
        TableForReflex
        | where YourTimeColumn between (ago(5h)..bin(now(), 1h))
        | summarize count() by bin(YourTimeColumn, 1h)
        | render timechart
        ```

1. **Use a card or KPI visual to track the value for the current date** since the limitation described here only applies to charts with a time axis. For example, create a KPI visual that displays "sales so far for today." [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] reads and triggers to changes in this value throughout the day.

## Related content

* [Create [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rules in design mode](activator-create-activators.md)
* [Detection conditions in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-detection-conditions.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)
* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
