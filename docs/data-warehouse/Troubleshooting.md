---
title: Troubleshooting
description: Troubleshoot common issues in using Synapse Data Warehouse in Microsoft Fabric.
author: xiaoyuMSFT
ms.author: XiaoyuL
ms.reviewer: wiassaf
ms.date: 04/22/2023
ms.topic: conceptual
ms.search.form: Troubleshoot
---

# Troubleshooting

Applies to: [!INCLUDEfabric-se-and-dw]

[!INCLUDE preview-note]

This article provides guidance in troubleshooting common issues in [!INCLUDEfabric-dw] in [!INCLUDE product-name]. 

## Transient connection errors
A transient error, also known as a transient fault, has an underlying cause that soon resolves itself.  If a connection to [!INCLUDEfabric-dw] used to work fine but starts to fail without changes in user permission, firewall policy, and network configuration, try these steps before contacting support:
1. Check the status of [!INCLUDEfabric-dw] and ensure it's not paused.
2. Don't immediately retry the failed command. Instead, wait for 5 to 10 minutes, establish a new connection, then retry the command.  Occasionally Azure system quickly shifts hardware resources to better load-balance various workloads.  Most of these reconfiguration events finish in less than 60 seconds. During this reconfiguration time span, you might have issues with connecting to your databases. Connection could also fail when the service is being automatically restarted to resolve certain issues.  
3. Connect using a different application and/or from another machine.

## Query failure due to TEMPDB space issue
TEMPDB is a system database used by the engine for various temporary storage needs during query execution. It can't be accessed or configured by users. Queries could fail due to TEMPDB running out of space. Take these steps to reduce TEMPDB space usage:

1. Follow [Statistics](statistics.md) to verify proper column statistics have been created on all tables. 
2. Ensure all table statistics are updated after large DML transactions.
3. Queries with complex JOINs, GROUP BY, and ORDER BY and expect to return large result set use more TEMPDB space in execution. Try to run these queries separately when the warehouse isn't busy.  
4. Update queries to reduce the number of GROUP BY and ORDER BY columns if possible.
5. Pause and resume the service to flush TEMPDB data.


## Query performance seems to degrade over time
Many factors can affect a query's performance, such as changes in table size, data skew, workload concurrency, available resources, network, etc.  Just because a query runs slower doesn't necessarily mean there's a query performance problem.  Take following steps to investigate the target query:

1. Identify the differences in performance-impacting factors among good and bad performance runs. 
2. Follow [Statistics](statistics.md) to verify proper column statistics have been created on all tables. 
3. Ensure all table statistics are updated after large DML transactions.
4. Check for data skew in base tables.
5. Pause and resume the service. Then, rerun the query when there's no other active queries running.  You can [monitor the warehouse workload using DMV](monitor-using-dmv.md). 

## Query fails after running for a long time.  No data is returned to the client.
A SELECT statement could have completed successfully in the backend and fails when trying to return the query result set to the client.  Try following steps to isolate the problem:

1. Use different client tools to rerun the same query.  
- SQL Query tool in [!INCLUDEfabric-dw]  
- Azure Data Studio
- SQLCMD Utility (For MFA authentication, use parameter -G -U.)  

2. If step 1 fails, run a CTAS command with the failed SELECT statement to send the SELECT query result to another table in the same warehouse.  Using CTAS avoids query result set being sent back to the client machine.  If the CTAS command finishes successfully and the target table is populated, then the original query failure is likely caused by the warehouse front end or client issues.

## What to collect before contacting Microsoft support
1. The workspace ID of [!INCLUDEfabric-dw]  
2. Statement ID and Distributed request ID.  They're returned as messages after a query completes or fails.
3. Exact error message
4. Time when the query completes or fails.

## Contact us for help

