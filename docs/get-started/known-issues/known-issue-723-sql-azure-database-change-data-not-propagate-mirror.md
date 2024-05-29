---
title: Known issue - Azure SQL Database change data doesn't propagate to mirror
description: A known issue is posted where Azure SQL Database change data doesn't propagate to mirror.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/24/2024
ms.custom: known-issue-723
---

# Known issue - Azure SQL Database change data doesn't propagate to mirror

If you set up Fabric mirrored databases from Azure SQL Database, you might see that some of the change data might not propagate to the mirror. The issue occurs when the SQL database mirror is actively replicating source operational data and the service level objective (SLO) is changed. Specifically, if you change the SLO by either:

- Azure SQL database SLO is upgraded in the following sequence: Update SLO to Standard/Business Critical/General Purpose and then upgrade to Hyperscale
- Azure SQL database SLO is reverse migrated from Hyperscale to Standard/General Purpose/Business Critical SLO

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

Change data from Azure SQL Database isn't propagated to the Fabric mirrored database. If you [query the logs](/fabric/database/mirrored-database/azure-sql-database-troubleshoot), you see errors similar to `dwError 32 SQLError`.

## Solutions and workarounds

You can try to restart the data propagation by starting and stopping the mirror. If restarting doesn't fix the issue, contact Microsoft support.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
