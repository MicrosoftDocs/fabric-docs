---
title: Known issue - Failure occurs when accessing a renamed Lakehouse or Warehouse
description: A known issue is posted where a failure occurs when accessing a renamed Lakehouse or Warehouse
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting
ms.date: 10/13/2023
ms.custom:
  - known-issue-463
  - ignite-2023
---

# Known issue - Failure occurs when accessing a renamed Lakehouse or Warehouse

After renaming your Lakehouse or Warehouse items in Microsoft Fabric, you may experience a failure when trying to access the SQL analytics endpoint or Warehouse item using client tools or the Web user experience. The failure happens when the underlying SQL file system isn't properly updated after the rename operation resulting in different names in the portal and SQL file system.

**Status:** Fixed: October 13, 2023

**Product Experience:** Data Warehouse

## Symptoms

You'll see an HTTP status code 500 failure after renaming your Lakehouse or Warehouse when trying to access the renamed items.

## Solutions and workarounds

There's no workaround at this time. We are aware of the issue and are working on a fix. We apologize for the inconvenience caused and encourage you not to rename the Lakehouse or Warehouse items.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
