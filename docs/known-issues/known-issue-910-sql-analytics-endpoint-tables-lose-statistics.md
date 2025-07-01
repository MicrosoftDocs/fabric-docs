---
title: Known issue - SQL analytics endpoint tables lose statistics
description: A known issue is posted where SQL analytics endpoint tables lose statistics.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 10/31/2024
ms.custom: known-issue-910
---

# Known issue - SQL analytics endpoint tables lose statistics

After you successfully sync your tables in your SQL analytics endpoint, the statistics get dropped.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

Statistics created on the SQL analytics endpoint tables aren't available after a successful sync between the lakehouse and the SQL analytics endpoint.

## Solutions and workarounds

The behavior is currently expected for the tables after a schema change. You need to recreate the statistics or allow the auto statistics to run when necessary.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
