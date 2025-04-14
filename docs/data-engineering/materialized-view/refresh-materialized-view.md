---
title: "Refresh a materialized view in lakehouse in Microsoft Fabric"
description: Learn how to refresh a materialized view in lakehouse in Microsoft Fabric.
author: abhishjain002 
ms.author: abhishjain 
ms.reviwer: nijelsf
ms.topic: how-to
ms.date: 04/14/2025
---

# Refresh a materialized view in lakehouse in Microsoft Fabric

After a materialized view is created, its subsequent refreshes are managed by the service according to the schedule set in the Directed Acyclic Graph (DAG).  

The following refresh operations can occur depending on the updates to the data in the source tables.

* **Full Refresh:** A full refresh entails evaluating the complete dataset of the source tables whenever any modifications are detected in the source tables. 

* **No Refresh:** If the source tables remain unchanged, the materialized view refresh is skipped, which saves unnecessary processing and reduces costs.

## Refresh a materialized view using Spark SQL command

If it's necessary to quickly reflect changes in a materialized view, you can utilize the following command to refresh the materialized view.

```sql
    REFRESH Materialized View MV_Identifier [FULL]
```
Argument:

FULL: Optional. If the FULL keyword is included in the command, a full refresh is performed for the materialized view.

If the FULL keyword isn't included, the internal service determines, based on the data, whether a full refresh or no refresh should be executed.

> [!NOTE]
> Refreshing a materialized view that uses non-delta tables as its source will initiate a full refresh of the materialized view.

## Next steps

* [Data quality in materialized view](./data-quality.md)
