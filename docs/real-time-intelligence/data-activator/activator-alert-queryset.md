---
title: Create Activator Alerts from KQL Query Results
description: Learn how to create a Fabric Activator alert from the results of a Kusto Query Language (KQL) query in a KQL Queryset in Real-Time Intelligence.
#customer intent: As a data analyst, I want to create Activator alerts from a KQL Queryset so that I can receive notifications when specific conditions are met in query results.
ms.reviewer: guregini
ms.topic: how-to
ms.date: 12/07/2025
ms.search.form: Activator KQL Queryset Onramp
# CustomerIntent: As a customer, I want to learn how to create Activator alerts from a KQL Queryset so that I can trigger notifications when conditions are met on data in the query result.
---

# Create Activator alerts from a KQL Queryset 

This article explains how to create Fabric Activator alerts from a KQL queryset. Fabric Activator in Microsoft Fabric allows you to take actions when patterns or conditions are detected in data streams. For more information, see [What is Activator](activator-introduction.md).

You can configure Activator to trigger notifications based on KQL Queryset results in two scenarios:

- When scheduled KQL queries return results.
- When scheduled KQL queries return results with visualizations that meet specific conditions.

Send alert notifications either to yourself, or to others in your organization. You can configure notifications to be sent via email or Microsoft Teams message.

## Sample scenarios

Here are some examples of how you can use Activator alerts with KQL queries:

- **Monitor application logs for errors**: Suppose you have a KQL database storing application logs. You can configure an alert to notify you if any records from the last five minutes contain the string `authorization error` in the *message* column.

- **Track available bicycles in neighborhoods**: Imagine you have streaming data for available bicycles in different neighborhoods. You create a KQL query to render a pie chart showing the number of available bicycles per neighborhood. You can set up an alert to notify you when the number of available bicycles in any neighborhood falls below a specified threshold.


## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* A [KQL database](../../real-time-intelligence/create-database.md) with data.
* A [KQL Queryset](../../real-time-intelligence/create-query-set.md) connected to the KQL database. For more information, see [Query data in a KQL queryset](../../real-time-intelligence/kusto-query-set.md).

> [!IMPORTANT]
> - Only queries against KQL databases within an Eventhouse are supported. If your KQL queryset is connected to an [external Azure Data Explorer cluster](../kusto-query-set.md#select-a-data-source), creating an alert isn't supported. 
> - The impact of an alert rule on Eventhouse depends on the query’s complexity. Simple queries and aggregations are lightweight, while joins, transformations, and sorts are more resource-intensive. If a query runs every 1 or 5 minutes, it effectively keeps Eventhouse in an **always-on** state. Without queries or ingestion for more than 5 minutes, Eventhouse can go idle, which reduces costs. For more information, see [Eventhouse Uptime](../real-time-intelligence-consumption.md#eventhouse-uptime).

The following steps show you how to create an alert on a query that creates a visualization, or on a query that doesn't create a visualization.

Choose the tab that corresponds to your desired workflow.

## [With visualization](#tab/visualization)

## Set alert on a KQL Queryset

> [!IMPORTANT]
> [Timechart](/kusto/query/visualization-timechart?view=microsoft-fabric&preserve-view=true) visualizations aren't supported in this scenario. They're supported in [Create Activator alerts from a Real-Time Dashboard](activator-get-data-real-time-dashboard.md).

1. Open the workspace that contains your KQL Queryset.
1. Browse to your KQL Queryset and select it to open.
1. Run a query that returns a visualization.
1. Once the query returns results, select **Set Alert** on the top ribbon.

    :::image type="content" source="media/activator-alert-queryset/set-alert-button.png" alt-text="Screenshot of the Set Alert button in the top ribbon." lightbox="media/activator-alert-queryset/set-alert-button.png":::

## Define alert conditions

In the **Add Rule** side pane that appears, follow these steps to define your alert conditions:

1. In the **Details** section, provide a name for your Activator alert rule.

    :::image type="content" source="media/activator-alert-queryset/details.png" alt-text="Screenshot of the Details section in the Add Rule side pane.":::

1. In the **Monitor** section, set a time frequency for how often the query is run. The default is 5 minutes.

    :::image type="content" source="media/activator-alert-queryset/monitor.png" alt-text="Screenshot of the Monitor section in the Add Rule side pane.":::

1. In **Condition** section, specify your alert conditions as follows:

    :::image type="content" source="media/activator-alert-queryset/condition.png" alt-text="Screenshot of the Condition section in the Add Rule side pane.":::

    * If your visualization has no dimensions, you can select the **On each event when** condition to monitor changes in the data stream by choosing a specific field to monitor.
    * In the **When** dropdown, set the value to be evaluated.
    * In the **Condition** dropdown, set the condition to be evaluated. For more information, see [Conditions](activator-detection-conditions.md#conditions).
    * In the **Occurrence** field, set the number of times the condition must be met before an alert is triggered.
1. In **Action** section, select one of the following actions:
    * **Send email notification**:
        1. For **Select action**, select **Send email**.
        1. For **To**, enter the email address of the receiver or use the drop-down list to select a property whose value is an email address. By default, your email address is populated here.
        1. For **Subject**, enter the subject of the email notification.
        1. For **Headline**, enter the headline of the email notification.
        1. For **Notes**, enter notes for the email notification.
            >[!NOTE]
            > When entering subject, headline, or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@BikepointID`.
        1. For **Context**, select the values from the drop-down list you want to include in the email notification.

        :::image type="content" source="media/activator-alert-queryset/action-email.png" alt-text="Screenshot of the Send email notification section in the Add Rule side pane.":::

    * **Send Microsoft Teams notification**: Sends a Microsoft Teams message to yourself. You can customize the title and message content.
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

        :::image type="content" source="media/activator-alert-queryset/action-teams.png" alt-text="Screenshot of the Send Microsoft Teams notification section in the Add Rule side pane.":::

    * **Run Fabric activities**:
        To configure the alert to launch a Fabric pipeline, Spark job, or notebook when the condition is met, follow these steps:
        1. For **Select action**, select **Run Pipeline**,  **Run Spark job**, **Run Notebook**, or **Run Function (preview)**.
        1. On Select Fabric item to run, select the Fabric item (pipeline, notebook, Spark job, or function) from the list.
        1. Select Add parameter and specify the name of the parameter for the Fabric item and a value for it. You can add more than one parameter.
        You can pass parameters from the alert data by typing `@` or by selecting the button next to the text box. For example, `@BikepointID`.
            :::image type="content" source="media/activator-alert-queryset/fabric-activities.png" alt-text="Screenshot of the Run Fabric activities section in the Add Rule side pane.":::
    * **Custom actions**:
        To configure the alert to call a custom action when the condition is met, follow these steps:
        1. For **Select action**, select **Create custom action**.

            :::image type="content" source="media/activator-alert-queryset/custom-action.png" alt-text="Screenshot of the Create custom action section in the Add Rule side pane.":::

        1. As mentioned in the Action section, create the rule first, and then complete the custom action setup by following steps from [Trigger custom actions (Power Automate flows)](activator-trigger-power-automate-flows.md).
        1. After you create the custom action, in the **Definition** pane of the rule, select the custom action you created from the **Action** drop-down list.

1. In **Save location**, specify where to save your Activator alert. Choose an existing workspace, and save either in an existing activator or a new one.

    :::image type="content" source="media/activator-alert-queryset/save-location.png" alt-text="Screenshot of the Save location section in the Add Rule side pane.":::

1. Select **Create** to create your Activator rule.

## [Without visualization](#tab/no-visualization)

## Set alert on a KQL Queryset

1. Open the workspace that contains your KQL Queryset.
1. Browse to your KQL Queryset and select it to open.
1. Run a query. Activator checks the results of this query according to the time frequency set in a later step, and sends an alert for each record returned in the result set. For example, if a scheduled query returns five records, Activator sends five alerts.
1. Once the query completes running, select **Set Alert** on the top ribbon.

### Example 1 - Single result when count is greater than threshold

For example, the following query returns an alert if there are more than *threshold* records in the table from the last 5 minutes. The last two lines of the query are key, in which the count of records matching the filters is created, and a result is returned only if the count is greater than the threshold.

```kusto
SampleTable 
| where ingestion_time() > ago (5min)
// Add any other optional filters
| count 
| where Count > threshold
```

### Example 2 - Create a single result with an array of several values

In the following example, the query returns an alert if the number of bicycles in any neighborhood is above the given threshold. In order to get a single alert for all neighborhoods for which the number is above the threshold, the query is built to return a single record (meaning, a single alert), which is done using the [make_list() operator](/kusto/query/make-list-aggregation-function?view=microsoft-fabric&preserve-view=true). To edit the alert to contain the list of the neighborhoods that reached the threshold, see [Optional: Edit your rule in Activator](#optional-edit-your-rule-in-activator).

```kusto
TableForReflex
| where ingestion_time() > ago (5min)
| summarize NeighborhoodCount = count() by Neighbourhood
| where NeighborhoodCount > threshold
| summarize NeighbourhoodList = make_list(Neighbourhood)
```

## Define alert conditions

In the **Add Rule** side pane that appears, follow these steps to define your alert conditions:

1. In the **Details** section, provide a name for your Activator alert rule.

    :::image type="content" source="media/activator-alert-queryset/details.png" alt-text="Screenshot of the Details section in the Add Rule side pane.":::

1. In the **Monitor** section, set a time frequency for how often the query is run. The default is 5 minutes.

    :::image type="content" source="media/activator-alert-queryset/monitor.png" alt-text="Screenshot of the Monitor section in the Add Rule side pane.":::

1. In **Condition** section, specify your alert conditions as follows:

    :::image type="content" source="media/activator-alert-queryset/condition.png" alt-text="Screenshot of the Condition section in the Add Rule side pane.":::

    * If your visualization has no dimensions, you can select the **On each event when** condition to monitor changes in the data stream by choosing a specific field to monitor.
    * In the **When** dropdown, set the value to be evaluated.
    * In the **Condition** dropdown, set the condition to be evaluated. For more information, see [Conditions](activator-detection-conditions.md#conditions).
    * In the **Occurrence** field, set the number of times the condition must be met before an alert is triggered.
1. In **Action** section, select one of the following actions:
    * **Send email notification**:
        1. For **Select action**, select **Send email**.
        1. For **To**, enter the email address of the receiver or use the drop-down list to select a property whose value is an email address. By default, your email address is populated here.
        1. For **Subject**, enter the subject of the email notification.
        1. For **Headline**, enter the headline of the email notification.
        1. For **Notes**, enter notes for the email notification.
            >[!NOTE]
            > When entering subject, headline, or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@BikepointID`.
        1. For **Context**, select the values from the drop-down list you want to include in the email notification.

        :::image type="content" source="media/activator-alert-queryset/action-email.png" alt-text="Screenshot of the Send email notification section in the Add Rule side pane.":::

    * **Send Microsoft Teams notification**: Sends a Microsoft Teams message to yourself. You can customize the title and message content.
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

        :::image type="content" source="media/activator-alert-queryset/action-teams.png" alt-text="Screenshot of the Send Microsoft Teams notification section in the Add Rule side pane.":::

    * **Run Fabric activities**:
        To configure the alert to launch a Fabric pipeline, Spark job, or notebook when the condition is met, follow these steps:
        1. For **Select action**, select **Run Pipeline**,  **Run Spark job**, **Run Notebook**, or **Run Function (preview)**.
        1. On Select Fabric item to run, select the Fabric item (pipeline, notebook, Spark job, or function) from the list.
        1. Select Add parameter and specify the name of the parameter for the Fabric item and a value for it. You can add more than one parameter.
        You can pass parameters from the alert data by typing `@` or by selecting the button next to the text box. For example, `@BikepointID`.
            :::image type="content" source="media/activator-alert-queryset/fabric-activities.png" alt-text="Screenshot of the Run Fabric activities section in the Add Rule side pane.":::
    * **Custom actions**:
        To configure the alert to call a custom action when the condition is met, follow these steps:
        1. For **Select action**, select **Create custom action**.

            :::image type="content" source="media/activator-alert-queryset/custom-action.png" alt-text="Screenshot of the Create custom action section in the Add Rule side pane.":::

        1. As mentioned in the Action section, create the rule first, and then complete the custom action setup by following steps from [Trigger custom actions (Power Automate flows)](activator-trigger-power-automate-flows.md).
        1. After you create the custom action, in the **Definition** pane of the rule, select the custom action you created from the **Action** drop-down list.

1. In **Save location**, specify where to save your Activator alert. Choose an existing workspace, and save either in an existing activator or a new one.

:::image type="content" source="media/activator-alert-queryset/save-location.png" alt-text="Screenshot of the Save location section in the Add Rule side pane.":::

1. Select **Create** to create your Activator rule.

---

## Optional: Edit your rule in Activator

When your activator is saved, the side pane displays a link to your item. Select the link to further edit in Activator. This step can be useful if you want to do one of the following actions:

* Add other recipients to your alert.
* Change the content of the alert to reflect the specific data that triggered the alert.
* Define a more complex alert condition than is possible in the Set alert pane.

For information on how to edit rules in Activator, see [Create Activator rules](activator-create-activators.md).

In the activator itself, you can also view the history of the query results and the history of the rule activations. For more information, see [Create Activator rules](activator-create-activators.md).

<!-- ## Limitations on query result set that returns a time chart with a time axis

If you have a result set with a chart that has a time axis, Activator reads the measure value exactly once for each point on the time axis. For more information, see [Limitations on charts with a time axis](data-activator-get-data-real-time-dashboard.md#limitations-on-charts-with-a-time-axis).

To work around this limitation, you can add a line to the query so that the end time of the time filter ends at 'one bin before,' and the last bin does not change. 

```kusto
TableForReflex
| extend ingestionTime = ingestion_time()
| where ingestionTime between (startTime..bin(endTime, 10min))
| summarize count = count() by  bin(ingestionTime, 10min)
```
-->

## Related content

* [Query data in a KQL queryset](../../real-time-intelligence/kusto-query-set.md)
* [KQL quick reference guide](/kusto/query/kql-quick-reference)
* [Tutorial: Create and Activate a Fabric Activator Rule](activator-tutorial.md)
