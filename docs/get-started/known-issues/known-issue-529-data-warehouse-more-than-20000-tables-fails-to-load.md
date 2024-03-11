---
title: Known issue - Data warehouse with more than 20,000 tables fails to load
description: A known issue is posted where a data warehouse with more than 20,000 tables fails to load
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting
ms.date: 10/23/2023
ms.custom:
  - known-issue-529
  - ignite-2023
---

# Known issue - Data warehouse with more than 20,000 tables fails to load

A data warehouse or SQL analytics endpoint that has more than 20,000 tables fails to load in the portal.  If connecting through any other client tools, you can load the tables. The issue is only observed while accessing the data warehouse through the portal.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

Your data warehouse or SQL analytics endpoint fails to load in the portal with the error message "Batch was canceled," but the same connection strings are reachable using other client tools.

## Solutions and workarounds

If you're impacted, use a client tool such as SQL Server Management Studio or Azure Data studio to query the data warehouse.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
