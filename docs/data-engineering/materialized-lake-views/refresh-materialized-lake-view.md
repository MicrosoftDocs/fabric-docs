---
title: "Refresh materialized lake views in lakehouse"
description: Learn how to refresh a materialized lake view in lakehouse in Microsoft Fabric.
author: abhishjain002 
ms.author: abhishjain 
ms.reviewer: nijelsf
ms.topic: how-to
ms.date: 06/06/2025
# customer intent: As a data engineer, I want to refresh materialized lake views in lakehouse so that I can ensure the data is up-to-date and optimize query performance.
---

# Refresh materialized lake views in lakehouse

Once a materialized lake view is created, the service can handle its future refreshes based on the schedule provided in the generated lineage.  

> [!NOTE]
> This feature is currently available in the UK South region and will be rolled out to other regions in the coming weeks.

The following refresh operations can occur depending on the updates to the data in the source tables.

* **Full Refresh:** A full refresh entails evaluating the complete dataset of the source tables whenever any modifications are detected in the source tables.

* **No Refresh:** If the source tables remain unchanged, the materialized lake view refresh is skipped, which saves unnecessary processing and reduces costs.

## Refresh a materialized lake view using Spark SQL command

If it's necessary to quickly reflect changes in a materialized lake view, you can utilize the following command to refresh the materialized lake view.

```sql
REFRESH MATERIALIZED LAKE VIEW [workspace.lakehouse.schema].MLV_Identifier [FULL]
```

**Argument:**

FULL: It's an optional argument. If the FULL keyword is used, a full refresh of the materialized lake view is performed. If omitted, the system decides whether to run a full refresh or skip it based on the source data.

> [!NOTE]
> Refreshing a materialized lake view that uses non-delta tables as its source initiate a full refresh of the materialized lake view.

## Related articles

* [Microsoft Fabric materialized lake views tutorial](./tutorial.md)
* [Data quality in materialized lake views](./data-quality.md)
