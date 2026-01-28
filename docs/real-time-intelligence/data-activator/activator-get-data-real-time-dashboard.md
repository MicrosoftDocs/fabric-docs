---
title: Create Activator alerts from a Real-Time Dashboard
description: Learn how to create an Activator alert from a Real-Time Dashboard and receive real-time notifications when conditions are met.
ms.topic: how-to
ms.reviewer: guregini
ms.custom: FY25Q1-Linter
ms.date: 12/03/2025
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

Open a Real-Time Dashboard and then do either of the following:

1. From the ribbon menu bar:
    1. Set alerts by selecting the *Set alert* button.
        :::image type="content" source="media/activator-get-data/ribbon-button.png" alt-text="Screenshot showing how to add an Activator rule from the ribbon menu bar." lightbox="media/activator-get-data/ribbon-button.png":::

    1. In the popup window, choose the tile you want to monitor and then select **Select** to open the side pane.
        :::image type="content" source="media/activator-get-data/ribbon-popup.png" alt-text="Screenshot of the popup window with the list of tiles to create an Activator rule." lightbox="media/activator-get-data/ribbon-popup.png":::

1. From the tile:
    1. Choose a tile on the Real-Time Dashboard for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to monitor.
    1. Select **Set Alert** from the tile's toolbar or in the **More menu (...)** at the top-right of the tile.

        :::image type="content" source="media/activator-get-data/set-alerts.png" alt-text="Screenshot showing how to add an Activator rule from a tile." lightbox="media/activator-get-data/set-alerts.png":::

## Define the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] alert conditions

### Details section

In the **Set alert** pane, provide a name for your rule.
:::image type="content" source="media/activator-get-data/details.png" alt-text="Screenshot of details section in the create an alert pane." lightbox="media/activator-get-data/details.png":::

### Monitor section

Select how often you want [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to run the query. The default is every 5 minutes.

:::image type="content" source="media/activator-get-data/monitor.png" alt-text="Screenshot of create an alert window in Activator, monitor highlighted." lightbox="media/activator-get-data/monitor.png":::

### Condition section

Define your rule conditions as follows:

* If your visualization has no dimensions, you can select the **On each event when** condition to monitor changes in the data stream by choosing a specific field to monitor.
* If your visualization includes dimensions, you can select the **On each event grouped by** condition to monitor changes in the data stream by selecting a field for grouping, which divides the data into distinct groups

1. In the **When** dropdown, select the value to be evaluated.
1. In the **Condition** dropdown, select the condition to be met. For more information, see [Conditions](activator-detection-conditions.md#conditions).
1. In the **Occurence** dropdown, set the number of times the condition must be met to trigger the alert.

:::image type="content" source="media/activator-get-data/condition.png" alt-text="Screenshot of create an alert window in Activator, save condition highlighted." lightbox="media/activator-get-data/condition.png":::

### Action section

In the **Action** section, select one of the following actions to take when the alert is triggered:

* **Send email**:
    1. For **Select action**, choose **Send email**.
    1. For **To**, enter the email address of the recipient or use the dropdown to select from a list of users in your organization. By default, your email address is populated there.
    1. For **Subject**, enter the subject of the email notification.
    1. For **Headline**, enter the headline of the email notification.
    1. For **Notes**, enter any additional information you want to include in the email notification.
        >[!NOTE]
        > When entering the subject, headline, or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@BikepointID`.
    1. For **Context**, select the values from the dropdown list you want to include in the email notification.

    :::image type="content" source="media/activator-get-data/action-email.png" alt-text="Screenshot of the Send email notification section in the Add Rule side pane.":::

* **Send Microsoft Teams notification**:
    1. For **Select action**, select **Teams** --> **Message to indviduals** or **Group chat message**, or **Channel post**.
    1. Follow one of these steps depending on your selection:
        * If you selected the **Message to individuals** option, enter **email addresses** of receivers or use the drop-down list to select a property whose value is an email address. When the condition is met, an email is sent to specified individuals.
        * If you selected the **Group chat message** option, select a **group chat** from the drop-down list. When the condition is met, a message is posted to the group chat.
        * If you selected the **Channel post** option, select a **team** and **channel** from the drop-down lists. When the condition is met, a message is posted to the selected channel.
    1. For **Headline**, enter the headline of the Teams notification.
    1. For **Notes**, enter notes for the Teams notification.
        >[!NOTE]
        > When entering subject, headline, or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@BikepointID`.
    1. For **Context**, select the values from the drop-down list you want to include in the Teams notification.

    :::image type="content" source="media/activator-get-data/action-teams.png" alt-text="Screenshot of the Send Microsoft Teams notification section in the Add Rule side pane.":::

* **Run Fabric activities**:
    To configure the alert to launch a Fabric pipeline, Spark job, or notebook when the condition is met, follow these steps:
    1. For **Select action**, select **Run Pipeline**,  **Run Spark job**, **Run Notebook**, or **Run Function (preview)**.
    1. On Select Fabric item to run, select the Fabric item (pipeline, notebook, Spark job, or function) from the list.
    1. Select Add parameter and specify the name of the parameter for the Fabric item and a value for it. You can add more than one parameter.
    You can pass parameters from the alert data by typing `@` or by selecting the button next to the text box. For example, `@BikepointID`.
        :::image type="content" source="media/activator-get-data/fabric-activities.png" alt-text="Screenshot of the Run Fabric activities section in the Add Rule side pane.":::
  * **Custom actions**:
      To configure the alert to call a custom action when the condition is met, follow these steps:
      1. For **Select action**, select **Create custom action**.

          :::image type="content" source="media/activator-get-data/custom-action.png" alt-text="Screenshot of the Create custom action section in the Add Rule side pane.":::

      1. As mentioned in the Action section, create the rule first, and then complete the custom action setup by following steps from [Trigger custom actions (Power Automate flows)](activator-trigger-power-automate-flows.md).
      1. After you create the custom action, in the **Definition** pane of the rule, select the custom action you created from the **Action** drop-down list.

### Save location section

Set the location to save this [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule and select **Create**.

:::image type="content" source="media/activator-get-data/save.png" alt-text="Screenshot of create an alert window in Activator, save location highlighted.":::

## Modify your rule in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

When your rule is ready, you receive a notification with a link to your rule. Select the link to edit your rule in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. Editing your rule is useful if you want to do one of the following refinements:

* Add other recipients to your alert.
* Define a more complex alert condition than is possible in the **Set alert** pane.

For information on how to edit rules in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], see [Create activators in design mode](activator-create-activators.md).

## Limitations for setting alerts

When creating alerts, keep in mind that alerts can only be created on specific types of visuals.
The following visuals aren't supported for alert creation:

* Tables
* Maps
* Funnel charts
* Anomalies
* Scatter charts
* Markdowns
* Heatmaps
* Time charts (as described in the next section)

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
