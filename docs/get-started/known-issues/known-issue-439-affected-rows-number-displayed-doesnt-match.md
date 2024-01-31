---
title: Known issue - 'Affected rows' number displayed doesn't match the real row number
description: A known issue is posted where 'Affected rows' number displayed doesn't match the real row number
author: mihart
ms.author: anirmale
ms.topic: troubleshooting 
ms.date: 07/19/2023
ms.custom: known-issue-439
---

# Known issue - 'Affected rows' number displayed doesn't match the real row number

In SQL Server Management Studio (SSMS) with the COPY statement, you may see an incorrect row count reported in the Messages tab.

**Status:** Fixed: July 19, 2023

**Product Experience:** Data Warehouse

## Symptoms

Incorrect row count is reported when using the COPY command to ingest data from SSMS.

## Solutions and workarounds

To get an accurate number of rows ingested using the COPY statement, use the query editor in Microsoft Fabric.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues) 
