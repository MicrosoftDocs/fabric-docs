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

[!INCLUDE [rule-details](../../real-time-hub/includes/rule-details.md)]

## Monitor section

1. In the **Monitor** section, for **Source**, confirm that the source is set to the table on which you ran the query. 
1. For **Query**, confirm that you see the query you ran in the SQL query editor. To see the full query, select **Show more**. 
1. For the **Run query every** field, select the frequency at which the query should run to check the condition. 

:::image type="content" source="./media/set-alerts-warehouse-sql-query/alert-name-monitor-condition.png" alt-text="Screenshot of the Add rule window with the Details, Monitor, and Condition sections." lightbox="./media/set-alerts-warehouse-sql-query/alert-name-monitor-condition.png" border="true":::

## Condition section

For the **Check** field, confirm that **On each event** is selected. This setting means that the alert is evaluated every time the query runs.

[!INCLUDE [rule-action](../../real-time-hub/includes/rule-action.md)]

[!INCLUDE [rule-save-location](../../real-time-hub/includes/rule-save-location.md)]

## Create the rule

On the **Add rule** page, select **Create** to create the rule. After the rule creation is successful, it runs based on the frequency you set in the **Run query every** field. If the query returns results, the rule triggers the actions you set.


[!INCLUDE [rules-pane](../../real-time-hub/includes/rules-pane.md)]

## Related content
- [Create an alert on a KQL queryset](activator-alert-queryset.md)
- [Set alerts on eventstreams in Real-Time hub](../../real-time-hub/set-alerts-data-streams.md)
- [Set alerts on workspace item events](../../real-time-hub/set-alerts-fabric-workspace-item-events.md)