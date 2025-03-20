---
title: "Refresh a Fabric materialized view"
description: Learn How to refresh a Fabric Materialized view.
author: abhishjain002 
ms.author: abhishjain 
ms.reviwer: nijelsf
ms.topic: how-to
ms.date: 03/06/2025
---

# Refresh a Fabric materialized view

After a materialized view is created, its subsequent refreshes managed by the service according to the schedule set in the Directed Acyclic Graph (DAG).  

The following refresh operations can occur depending on the updates to the data in the source tables.

* **Full Refresh:** A full refresh entails evaluating the complete dataset of the source tables whenever any modifications are detected in the source tables. 

* **No Refresh:** If the source tables remain unchanged, the materialized view refresh is skipped, which saves unnecessary processing and reduces costs.

## Refreshing Materialized View using command

If it's necessary to quickly reflect changes in the materialized view, you can utilize the following command to refresh the materialized view.

`REFRESH Materialized View MV_Identifier  [FULL] `
 
Argument:

FULL: Optional. If the FULL keyword is included in the command, a full refresh is performed for the Materialized View (MV).

If the FULL keyword isn't included, the internal service determines, based on the data, whether a full refresh or no refresh should be executed.

## Next steps
