---
title: Refresh Materialized Lake Views in a Lakehouse
description: Learn how to refresh a materialized lake view in a lakehouse in Microsoft Fabric.
author: eric-urban
ms.author: eur
ms.reviewer: abhishjain
ms.topic: how-to
ms.date: 06/19/2025
# customer intent: As a data engineer, I want to refresh materialized lake views in a lakehouse so that I can ensure that the data is up to date and optimize query performance.
---

# Refresh materialized lake views in a lakehouse

After you create a materialized lake view, the Microsoft Fabric service can handle its future refreshes based on the schedule that you provide in the generated lineage.  

The following refresh operations can occur, depending on the updates to the data in the source tables:

* **Full refresh:** A full refresh entails evaluating the complete dataset of the source tables whenever the service detects any modifications in the source tables.

* **No refresh:** If the source tables remain unchanged, the service skips the refresh. This behavior saves unnecessary processing and reduces costs.

## Refresh a materialized lake view by using a Spark SQL command

If it's necessary to quickly reflect changes in a materialized lake view, you can use the following command to perform a refresh:

```sql
REFRESH MATERIALIZED LAKE VIEW [workspace.lakehouse.schema].MLV_Identifier [FULL]
```

`FULL` is an optional argument. If you use the `FULL` keyword, the service performs a full refresh of the materialized lake view. If you omit this keyword, the service decides whether to run a full refresh or skip it based on the source data.

> [!NOTE]
> Refreshing a materialized lake view that uses non-delta tables as its source initiates a full refresh.

## Known issues

* Currently, all refresh operations default to a full refresh.

## Related articles

* [Implement a medallion architecture with materialized lake views](./tutorial.md)
* [Data quality in materialized lake views](./data-quality.md)
