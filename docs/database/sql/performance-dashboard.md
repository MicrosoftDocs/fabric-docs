---
title: "Performance Dashboard for SQL Database"
description: Learn about the Performance Dashboard for SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: amapatil, subasak, lancewright
ms.date: 09/02/2025
ms.topic: concept-article
ms.custom:
  - sfi-image-nochange
ms.search.form: Performance monitoring in SQL database
---
# Performance Dashboard for SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

The Performance Dashboard in Fabric SQL database displays the performance status of the database and offers varying levels of metrics visibility.

You can use the Performance Dashboard to view database performance metrics, to identify performance bottlenecks, and find solutions to performance issues.

To open the Performance Dashboard for your SQL database in Fabric:

- On the **Home** toolbar in the [Query Editor](query-editor.md) window, select **Performance summary**.

   :::image type="content" source="media/performance-dashboard/performance-summary.png" alt-text="Screenshot from the Fabric SQL Editor highlighting the Performance summary button in the Home toolbar." lightbox="media/performance-dashboard/performance-summary.png":::

- Right-click on the context button (the three dots) in the item view, then select **Open performance summary**.

## Alerts

Automatically generated alerts with preset criteria provide two kinds of notifications:

- **Ongoing Alerts**: A horizontal Alert notification bar appears when one of the parameters (CPU, Blocking Queries, or Allocated Size) is in critical state.

   :::image type="content" source="media/performance-dashboard/alert-ongoing-notification-bar.png" alt-text="Screenshot from the Fabric portal showing a performance alert." lightbox="media/performance-dashboard/alert-ongoing-notification-bar.png":::

- **Pending Alerts**: Stored in the system, this Alert provides alerts that analysis is needed for a database parameter reaching a critical state.

   :::image type="content" source="media/performance-dashboard/performance-summary-alert-icon.png" alt-text="Screenshot from the Fabric portal showing the Performance Dashboard pending alert indicator.":::

Once you select the link for an alert, the **Performance Summary** provides a summary of alerts and recent metrics of the database. From here, you can drill into the event timeline for more information.

   :::image type="content" source="media/performance-dashboard/performance-summary-alerts.png" alt-text="Screenshot from the Fabric portal showing a summary of recent alerts." lightbox="media/performance-dashboard/performance-summary-alerts.png":::

### Performance dashboard graph

When the database reaches a critical state of CPU consumption (or any other factor that raises an alert), you can see Unhealthy points marked on the **CPU consumption** tab's graph, marking points where the CPU consumption  crossed the threshold value. The time interval is configurable and defaults to 24 hours.

In the following image, the **CPU consumption** graph indicates when the database reached a critical state.

   :::image type="content" source="media/performance-dashboard/cpu-consumption-graph.png" alt-text="Screenshot from the Fabric portal performance dashboard graph showing the CPU consumption history and unhealthy points in time." lightbox="media/performance-dashboard/cpu-consumption-graph.png":::

#### Alert threshold criteria

| **Tab** | **Threshold** | **Criteria** |
|---|---|---|
| **CPU consumption** | 80% of the allotted value | If the monitor finds the CPU above the threshold for more than five minutes. The monitor checks at a frequency of one minute. |
| **Allocated Size** | 80% of the allotted size | If the monitor finds the size above the threshold for more than five minutes. The monitor checks at a frequency of one minute. |
| **Blocked Queries** | One Blocked Query | If there is at least one blocked query blocked for more than one minute. The monitor checks at a frequency of three minutes. |

## Performance dashboard tabs

The following are built-in reporting areas of the Performance Dashboard.

#### CPU consumption

The **CPU consumption** graph displays CPU usage (in vCores) along the Y-axis and time along the X-axis. When you hover over the graph, you see details such as the event duration, status, and CPU usage within that specific time frame. Time ranges on the graph can be expanded to reveal more detail.

The CPU trends shown in this dashboard represent usage by user queries only. They don't include CPU used for provisioning, system maintenance, or other background operations. The Performance Dashboard doesn't directly correlate to Fabric consumption. To track consumption, use the [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md).

#### Memory consumption

The **memory consumption** graph displays memory consumption (in megabytes) along the Y-axis and time along the X-axis. The graph displays two series: normal and memory spillover. The normal series shows the sum of memory usage from user queries that didn't spill over to `tempdb` during the time interval. If a query did spill over to `tempdb`, the amount of that spillover is shown as a second, red series on the graph. When you hover over the graph, you see details such as the time interval, memory consumption, number of executions, and memory spillover. 

In addition to a graph of recent memory consumption history, a table shows the top memory consuming queries for the time interval. As with other interactive parts of the dashboard, select a query to see more details about that query.

#### User connections

The **User connections** graph tracks user current connections to the database, with information about each connection. The **User connections (current)** table lists the current user connections in the table.

   :::image type="content" source="media/performance-dashboard/user-connections.png" alt-text="Screenshot from the Fabric portal showing the User connections graph and User connections (current) table." lightbox="media/performance-dashboard/user-connections.png":::

#### Requests per second

The **Requests per second** graph tracks the cumulative number of times a query executed over a period. The **Requests per second** table contains the most frequently executed queries.

#### Blocked queries per second

The **Blocked queries per second** graph tracks queries experience blocks due to locking. The **Blocked queries (current)** table shows the set of blocked queries at any given point in time.

   :::image type="content" source="media/performance-dashboard/blocked-queries-per-second.png" alt-text="Screenshot from the Fabric portal of the Blocked Queries per second page." lightbox="media/performance-dashboard/blocked-queries-per-second.png":::

In the SQL Database Engine, blocking occurs when one session holds a lock on a specific resource and a second SPID attempts to acquire a conflicting lock type on the same resource. Typically, the time frame for which the first SPID locks the resource is small. When the owning session releases the lock, the second connection is then free to acquire its own lock on the resource and continue processing. Blocking is normal behavior and might happen many times throughout the course of a day with no noticeable effect on system performance.

For a detailed look at blocking, see [Understand and resolve blocking problems](/azure/azure-sql/database/understand-resolve-blocking?view=fabricsql&preserve-view=true).

Blocked queries due to locking is distinct from [deadlocks](/azure/azure-sql/database/analyze-prevent-deadlocks?view=fabricsql&preserve-view=true). While [troubleshooting blocking situations](/troubleshoot/sql/database-engine/performance/understand-resolve-blocking), it's important for users to have an idea of the queries that are blocking and how long are they blocking.

#### Allocated size

The **Allocated size** tab provides a history of the size of the database. The **Largest Database tables (current)** table identifies of the tables that have the greatest number of records and consume the most space.

#### Automatic index

[Automatic indexing](/sql/relational-databases/automatic-tuning/automatic-tuning) in databases automates index management, enhancing query performance and data retrieval speed. It adapts by identifying and testing potential indexes based on column usage. The feature improves overall database performance and optimizes resources by removing unused indexes.

The Automatic index tab report shows a history and status of automatically created indexes.

   :::image type="content" source="media/performance-dashboard/automatic-index.png" alt-text="Screenshot of from the Fabric portal showing an Automatic Index was created, its name and status." lightbox="media/performance-dashboard/automatic-index.png":::

## Queries

In the **Queries** tab, queries can be opened to troubleshoot the query details. Each query includes details including an execution history and query preview.

To troubleshoot a T-SQL query, open the T-SQL code in the query editor, [SQL Server Management Studio](https://aka.ms/ssms), [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric-sqldb&preserve-view=true). You might also consider the [Copilot Explain and Fix quick action features for SQL database in Fabric](copilot-quick-actions.md).

:::image type="content" source="media/performance-dashboard/query-details.png" alt-text="Screenshot from the Fabric portal of the query details screen in the Performance dashboard." lightbox="media/performance-dashboard/query-details.png":::

Along with the Query ID and the Query text, metric, and execution count, tabs in the **Queries** section also provide detailed reports on individual queries by the following metrics:

- **High CPU usage queries**

  - A sortable list of queries with the highest CPU consumption, initially sorted by Total CPU (ms) descending.

- **High memory usage queries**

  - A sortable list of queries with the highest memory consumption, initially sorted by Total Memory (MB) descending.

- **Longest running queries**
    - Initially sorted by Total duration (ms) descending.

- **Most frequent queries**
    - Initially sorted by Execution count descending.

- **High read queries**
    - Initially sorted by Total logical reads descending.

## Related content

- [Query with the SQL query editor](query-editor.md)
- [Frequently asked questions for SQL database in Microsoft Fabric](faq.yml)
- [Billing and utilization reporting for SQL database in Microsoft Fabric](usage-reporting.md)
