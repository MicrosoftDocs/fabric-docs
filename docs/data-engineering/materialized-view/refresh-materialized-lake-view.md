---
title: "Refresh materialized lake views in lakehouse"
description: Learn how to refresh a materialized lake view in lakehouse in Microsoft Fabric.
author: abhishjain002 
ms.author: abhishjain 
ms.reviewer: nijelsf
ms.topic: how-to
ms.date: 06/02/2025
---

# Refresh materialized lake views in lakehouse

Once a materialized lake view is created, the service can handle its future refreshes based on the schedule provided in the generated lineage.  

The following refresh operations can occur depending on the updates to the data in the source tables.

* **Full Refresh:** A full refresh entails evaluating the complete dataset of the source tables whenever any modifications are detected in the source tables. 

* **No Refresh:** If the source tables remain unchanged, the materialized lake view refresh is skipped, which saves unnecessary processing and reduces costs.

## Refresh a materialized lake view using Spark SQL command

If it's necessary to quickly reflect changes in a materialized lake view, you can utilize the following command to refresh the materialized lake view.

```sql
    REFRESH MATERIALIZED LAKE VIEW [workspace.lakehouse.schema].MLV_Identifier [FULL]
```
Argument:

FULL: Optional. If the FULL keyword is included in the command, a full refresh is performed for the materialized lake view.

If the FULL keyword isn't included, the internal service determines, based on the data, whether a full refresh or no refresh should be executed.

> [!NOTE]
> Refreshing a materialized lake view that uses non-delta tables as its source initiate a full refresh of the materialized lake view.

## Next steps

* [Data quality in materialized lake views](./data-quality.md)
