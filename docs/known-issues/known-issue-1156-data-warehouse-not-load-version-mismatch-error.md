---
title: Known issue - Data warehouse doesn't load with version mismatch error
description: A known issue is posted where a data warehouse doesn't load with a version mismatch error.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/02/2025
ms.custom: known-issue-1156
---

# Known issue - Data warehouse doesn't load with version mismatch error

Your data warehouse doesn't load in the Fabric service if the schema is large. You receive a version mismatch error.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

When you try to open a data warehouse, the data warehouse doesn't load the data. You receive an error with an error code similar to `DatamartVersionMismatch`.

## Solutions and workarounds

As a workaround, add the following parameter to the browser URL `&dwUseMWCBatchApi=1`, and reload the page.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
