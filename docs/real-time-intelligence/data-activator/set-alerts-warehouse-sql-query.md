---
title: Create Alert on Fabric Warehouse SQL Query
description: Learn how to create an alert on a Fabric Warehouse SQL query. Follow step-by-step instructions to monitor query results and trigger automated actions.
#customer intent: As a data engineer, I want to create an alert on a Fabric Warehouse SQL query so that I can monitor query results and trigger actions automatically.
ms.reviewer: ajetasi
ms.topic: how-to
ms.date: 03/12/2026
ms.search.form: Source and Destination
---

# Create an alert rule on a Fabric Warehouse SQL query

This article shows you how to create an alert on a Warehouse SQL query. When you create an alert on a SQL query, an alert is raised when the query returns results. If the query doesn't return any value, no alert is raised. 

## Create an alert rule

In the SQL query editor of a Warehouse SQL query, enter and run a SQL query, and then select **Create rule** on the ribbon.

:::image type="content" source="./media/set-alerts-warehouse-sql-query/create-rule-ribbon.png" alt-text="Screenshot of the Set alert button on the ribbon." lightbox="./media/set-alerts-warehouse-sql-query/create-rule-ribbon.png" border="true":::

> [!NOTE]
> The SQL query must be a SELECT query.

Continue to the next section to start creating a rule. 

[!INCLUDE [rule-details](../../real-time-intelligence/data-activator/includes/rule-details.md)]

## Monitor section

1. In the **Monitor** section, for **Source**, confirm that the source is set to the table on which you ran the query. 
1. For **Query**, confirm that you see the query you ran in the SQL query editor. To see the full query, select **Show more**. 
1. For the **Run query every** field, select the frequency at which the query should run to check the condition. 

:::image type="content" source="./media/set-alerts-warehouse-sql-query/alert-name-monitor-condition.png" alt-text="Screenshot of the Add rule window with the Details, Monitor, and Condition sections." lightbox="./media/set-alerts-warehouse-sql-query/alert-name-monitor-condition.png" border="true":::

## Condition section

For the **Check** field, confirm that **On each event** is selected. This setting means that the alert is evaluated every time the query runs.

[!INCLUDE [rule-action](../../real-time-intelligence/data-activator/includes/rule-action.md)]

[!INCLUDE [rule-save-location](../../real-time-intelligence/data-activator/includes/rule-save-location.md)]

## Create the rule

1. On the **Add rule** page, select **Create** to create the rule. After the rule creation is successful, it runs based on the frequency you set in the **Run query every** field. If the query returns results, the rule triggers the actions you set. 
1. You see the rule in the **Rules** pane. You can select the rule to view its details, edit it, or delete it or open it in Activator. 

### Rules pane

In the **Rules** pane, you can perform the following tasks:

- Use the toggle button to start or stop the rule. When the rule is stopped, it doesn't run, and no alerts are sent. Once you see a couple of sample alerts, stop the rule to avoid sending too many alerts. You can start the rule again when you want to receive alerts.
- Use the **Edit** button to edit the rule without leaving the SQL query editor page. You can edit the rule's details, conditions, actions, and save location.
- Use the **Delete** button to delete the rule. 
- Select **View in Activator** to open the rule in Activator. You can view the rule's details, edit it, or delete it in Activator. When you view in Activator, you can also see the rule's history, including when it was triggered and the alerts that were sent. 

    In the Activator page, select the **event name**, and select **Manage source** to view the SQL query that triggered the alert. If you select the query link, you navigate back to the SQL query editor page.

    :::image type="content" source="./media/set-alerts-warehouse-sql-query/warehouse-link.png" alt-text="Screenshot of the Sample warehouse event page with a link to the sample warehouse." lightbox="./media/set-alerts-warehouse-sql-query/warehouse-link.png" border="true":::

## Sample alert

Here's a sample alert Teams message that you receive when the alert is triggered:

:::image type="content" source="./media/set-alerts-warehouse-sql-query/sample-alert.png" alt-text="Screenshot of the samples Teams alert message." lightbox="./media/set-alerts-warehouse-sql-query/sample-alert.png" border="true":::

## Related content
- [Create an alert on a KQL queryset](activator-alert-queryset.md)
- [Set alerts on eventstreams in Real-Time hub](../../real-time-hub/set-alerts-data-streams.md)
- [Set alerts on workspace item events](../../real-time-hub/set-alerts-fabric-workspace-item-events.md)