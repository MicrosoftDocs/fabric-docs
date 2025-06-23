---
title: "Refresh Materialized Lake Views in a Lakehouse"
description: Learn how to refresh a materialized lake view in a lakehouse in Microsoft Fabric.
author: abhishjain002 
ms.author: abhishjain 
ms.reviewer: nijelsf
ms.topic: how-to
ms.date: 06/19/2025
# customer intent: As a data engineer, I want to refresh materialized lake views in lakehouse so that I can ensure the data is up-to-date and optimize query performance.
---

# Refresh materialized lake views in a lakehouse

Once a materialized lake view (MLV) is created, the service can handle its future refreshes based on the schedule provided in the generated lineage.  

The following refresh operations can occur depending on the updates to the data in the source tables.

* **Full Refresh:** A full refresh entails evaluating the complete dataset of the source tables whenever any modifications are detected in the source tables.

* **No Refresh:** If the source tables remain unchanged, the MLV refresh is skipped, which saves unnecessary processing and reduces costs.

## Refresh a materialized lake view using Spark SQL command

If it's necessary to quickly reflect changes in an MLV, you can utilize the following command to refresh the MLV.

```sql
REFRESH MATERIALIZED LAKE VIEW [workspace.lakehouse.schema].MLV_Identifier [FULL]
```

**Argument:**

FULL: It's an optional argument. If the FULL keyword is used, a full refresh of the MLV is performed. If omitted, the system decides whether to run a full refresh or skip it based on the source data.

> [!NOTE]
> Refreshing an MLV that uses non-delta tables as its source initiate a full refresh of the MLV.

## Known issues

* At present, all refresh operations default to a full refresh.

## Related articles

* [Microsoft Fabric materialized lake views tutorial](./tutorial.md)
* [Data quality in materialized lake views](./data-quality.md)
