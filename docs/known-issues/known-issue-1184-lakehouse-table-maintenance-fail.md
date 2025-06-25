---
title: Known issue - Lakehouse table maintenance fails for schema enabled lakehouses
description: A known issue is posted where lakehouse table maintenance fails for schema enabled lakehouses.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/25/2025
ms.custom: known-issue-1184
---

# Known issue - Lakehouse table maintenance fails for schema enabled lakehouses

You can use the table maintenance feature to manage delta tables in Fabric. If you use the table maintenance feature on a table in a schema enabled lakehouse through the user interface or public API, the maintenance action fails.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

If you run table maintenance on a schema enabled lakehouse, you encounter this issue. Nonschema lakehouses aren't affected.

## Solutions and workarounds

You can run maintenance using a notebook, by using the following code in python (replace with appropriate parameters to the `run_table_maintenance` function):

```python
import json
from delta.tables import *
from pyspark.sql import SparkSession
 
def run_table_maintenance(
    table_name: str,
    schema_name: str,
    workspaceId: str,
    lakehouseId: str,
    optimize: bool = False,
    optimize_zorder_by: list = None,
    vacuum: bool = False,
    vacuum_retention_hours: float = None
):
    spark = SparkSession.builder.getOrCreate()
    print(f'Running maintenance on table: {schema_name}.{table_name}')
 
    optimize_zorder_by = optimize_zorder_by or []
    vOrderConfName = 'spark.sql.parquet.vorder.enabled'
    deltaTable = DeltaTable.forPath(spark, f"abfss://{workspaceId}@onelake.dfs.fabric.microsoft.com/{lakehouseId}/Tables/{schema_name}/{table_name}")
 
    if optimize:
        vOrderConfVal = spark.conf.get(vOrderConfName, 'false')
        print(f'{vOrderConfName} is set to {vOrderConfVal}')
        print(f'Executing OPTIMIZE with Z-Order by columns: {", ".join(optimize_zorder_by)}')
        spark.sparkContext.setJobGroup('Optimize', f'Optimize table `{table_name}`')
        optimizeResult = deltaTable.optimize().executeZOrderBy(optimize_zorder_by)
        print(json.dumps(json.loads(optimizeResult.toJSON().collect()[0]), indent=4))
 
    if vacuum:
        print(f'Executing VACUUM with retention hours: {vacuum_retention_hours}')
        spark.sparkContext.setJobGroup('Vacuum', f'Vacuum table `{table_name}`')
        try:
            if vacuum_retention_hours is not None:
                deltaTable.vacuum(vacuum_retention_hours)
            else:
                deltaTable.vacuum()
        except Exception as ex:
            print(f'Vacuum failed: {ex}')
            raise

run_table_maintenance(
    table_name="publicholidays",
    schema_name="dbo",
    workspaceId="482c485f-61d6-4415-95ba-e60ddef8b41d",
    lakehouseId="74102686-aba1-434a-99a8-3a134f00f5f9",
    optimize=True,
    optimize_zorder_by=[],
    vacuum=False,
    vacuum_retention_hours=7
)
```

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
