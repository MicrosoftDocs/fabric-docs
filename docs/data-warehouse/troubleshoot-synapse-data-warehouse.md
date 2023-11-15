---
title: Troubleshoot the Warehouse
description: Troubleshoot common issues in using Warehouse in Microsoft Fabric.
author: xiaoyuMSFT
ms.author: XiaoyuL
ms.reviewer: wiassaf
ms.date: 11/15/2023
ms.topic: conceptual
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.search.form: Monitoring # This article's title should not change. If so, contact engineering.
---
# Troubleshoot the Warehouse

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article provides guidance in troubleshooting common issues in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]. 

## Transient connection errors

A transient error, also known as a transient fault, has an underlying cause that soon resolves itself.  If a connection to [!INCLUDE [fabric-dw](includes/fabric-dw.md)] used to work fine but starts to fail without changes in user permission, firewall policy, and network configuration, try these steps before contacting support:

1. Check the status of [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and ensure it's not [paused](pause-resume.md).
1. Don't immediately retry the failed command. Instead, wait for 5 to 10 minutes, establish a new connection, then retry the command.  Occasionally Azure system quickly shifts hardware resources to better load-balance various workloads.  Most of these reconfiguration events finish in less than 60 seconds. During this reconfiguration time span, you might have issues with connecting to your databases. Connection could also fail when the service is being automatically restarted to resolve certain issues.  
1. Connect using a different application and/or from another machine.

## Query failure due to tempdb space issue

The `tempdb` is a system database used by the engine for various temporary storage needs during query execution. It can't be accessed or configured by users. Queries could fail due to `tempdb` running out of space. Take these steps to reduce `tempdb` space usage:

1. Refer to the article about [statistics](statistics.md) to verify proper column statistics have been created on all tables. 
1. Ensure all table statistics are updated after large DML transactions.
1. Queries with complex JOINs, GROUP BY, and ORDER BY and expect to return large result set use more `tempdb` space in execution.  Update queries to reduce the number of GROUP BY and ORDER BY columns if possible.
1. Rerun the query when there's no other active queries running to avoid resource constraint during query execution. 

## Query performance seems to degrade over time

Many factors can affect a query's performance, such as changes in table size, data skew, workload concurrency, available resources, network, etc.  Just because a query runs slower doesn't necessarily mean there's a query performance problem.  Take following steps to investigate the target query:

1. Identify the differences in all performance-affecting factors among good and bad performance runs. 
1. Refer to the article about [statistics](statistics.md) to verify proper column statistics have been created on all tables. 
1. Ensure all table statistics are updated after large DML transactions.
1. Check for data skew in base tables.
1. Pause and resume the service. Then, rerun the query when there's no other active queries running.  You can [monitor the warehouse workload using DMV](monitor-using-dmv.md).  

## Query fails after running for a long time. No data is returned to the client.

A SELECT statement could have completed successfully in the backend and fails when trying to return the query result set to the client.  Try following steps to isolate the problem:

1. Use different client tools to rerun the same query.  
    - [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms)
    - [Azure Data Studio](https://aka.ms/azuredatastudio)
    - The [SQL query editor](sql-query-editor.md) in the [!INCLUDE [product-name](../includes/product-name.md)] portal
    - The [Visual Query editor](visual-query-editor.md) in the [!INCLUDE [product-name](../includes/product-name.md)] portal
    - SQLCMD utility (for authentication via Microsoft Entra ID (formerly Azure Active Directory) Universal with MFA, use parameters `-G -U`)  
1. If step 1 fails, run a CTAS command with the failed SELECT statement to send the SELECT query result to another table in the same warehouse.  Using CTAS avoids query result set being sent back to the client machine.  If the CTAS command finishes successfully and the target table is populated, then the original query failure is likely caused by the warehouse front end or client issues.

## What to collect before contacting Microsoft support

- Provide the workspace ID of [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
- Provide the Statement ID and Distributed request ID. They're returned as messages after a query completes or fails.
- Provide the text of the exact error message.
- Provide the time when the query completes or fails.

## Related content

- [Query insights in Fabric data warehousing](query-insights.md)
- [Monitoring connections, sessions, and requests using DMVs](monitor-using-dmv.md)
- [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
- [Limitations in Microsoft Fabric](limitations.md)
