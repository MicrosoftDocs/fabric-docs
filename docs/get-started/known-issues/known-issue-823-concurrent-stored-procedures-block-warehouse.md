---
title: Known issue - Concurrent stored procedures block each other in data warehouse
description: A known issue is posted where concurrent stored procedures block each other in data warehouse.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/28/2025
ms.custom: known-issue-823
---

# Known issue - Concurrent stored procedures block each other in data warehouse

You can execute the same stored procedure in parallel in a data warehouse. When the stored procedure is run concurrently, it causes blocking because each stored procedure takes an exclusive lock during plan generation.

**Status:** Fixed: January 28, 2025

**Product Experience:** Data Warehouse

## Symptoms

You might experience slowness when the same procedure is executed in parallel as opposed to by itself.

## Solutions and workarounds

To relieve the slowdown, you can execute the stored procedures serially. Alternatively, you can let the procedures block each other and execute your new query once the block is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
