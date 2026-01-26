---
title: "Monitor SQL database performance and utilization trends"
description: Learn what tools to use to analyze database performance, utilization, trends, and history.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: amar.patil # Microsoft alias
ms.date: 01/22/2025
ms.topic: concept-article
ms.search.form: Performance monitoring in SQL database
---
# Monitor SQL database in Microsoft Fabric

This article includes tools and methods to monitor your SQL database in Microsoft Fabric. Fabric provides a set of tools to help you:

- View database performance metrics, to identify performance bottlenecks, and find solutions to performance issues.
- Gain insights into your Fabric capacity, to determine when it's time to scale up or down.

## Microsoft Fabric Capacity Metrics app

The [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md) provides visibility into capacity usage of each database allowing you to see the compute charges for all user-generated and system-generated T-SQL statements within a database. 

For more information on monitoring capacity usage, see [Billing and utilization reporting for SQL database in Microsoft Fabric](usage-reporting.md).

> [!TIP]
> In this blog post, learn how [the capacity metrics app can be used for monitoring usage and consumption of SQL databases in Fabric](https://blog.fabric.microsoft.com/blog/efficiently-monitor-sql-database-usage-and-consumption-in-microsoft-fabric-using-capacity-metrics-app?ft=All).

## Performance Dashboard

Users are provided a one-stop view of the performance status of the database. The Performance Dashboard and offers varying levels of metrics visibility and time ranges, including query-level analysis and identification. For more information, see [Performance Dashboard for SQL database in Microsoft Fabric](performance-dashboard.md).

## Query DMVs with T-SQL

You can also [use the SQL query editor](query-editor.md), [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric-sqldb&preserve-view=true), [SQL Server Management Studio](/sql/ssms/download-sql-server-management-studio-ssms), or other tools to query the same internal dynamic management views (DMVs) as used by Azure SQL Database. For T-SQL query examples and applicable DMVs, see:

- [Monitor performance using dynamic management views](/azure/azure-sql/database/monitoring-with-dmvs?view=fabricsql&preserve-view=true)
- [Troubleshoot memory issues](/azure/azure-sql/database/troubleshoot-memory-errors-issues?view=fabricsql&preserve-view=true)
- [Understand and resolve blocking problems](/azure/azure-sql/database/understand-resolve-blocking?view=fabricsql&preserve-view=true)
- [Analyze and prevent deadlocks](/azure/azure-sql/database/analyze-prevent-deadlocks?view=fabricsql&preserve-view=true)


### Related content

- [Billing and utilization reporting for SQL database in Microsoft Fabric](usage-reporting.md)
