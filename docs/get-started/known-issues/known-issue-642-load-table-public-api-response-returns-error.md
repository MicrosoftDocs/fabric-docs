---
title: Known issue - Load Table public API response returns error
description: A known issue is posted where the Load Table public API response returns an error.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/01/2024
ms.custom: known-issue-642
---

# Known issue - Load Table public API response returns error

If you use the [Lakehouse Load Table public API](/rest/api/fabric/lakehouse/tables/load-table?tabs=HTTP) to retrieve the operation status URL, the response sends a '404-NotFound' error.

**Status:** Fixed: April 1, 2024

**Product Experience:** Data Engineering

## Symptoms

If you have this issue, you could see one of two symptoms:

- The response from the Load Table public API is a '404-NotFound' error.
- The Load Table API is also used when [loading the data to delta lake tables](../../data-engineering/load-to-tables.md). When you try loading a file, you see an error message with an error code "LakehouseOperationFailed." The table is created successfully though.

## Solutions and workarounds

If you receive the '404-NotFound' error, wait until the fix is released. If you receive the LakehouseOperationFailed error message, you can safely ignore the error.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
