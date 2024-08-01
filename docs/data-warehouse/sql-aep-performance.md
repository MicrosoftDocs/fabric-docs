---
title: SQL analytics endpoint performance considerations
description: Performance considerations for SQL Analytics endpoint.
author: amasingh
ms.author: amasingh
ms.reviewer: maprycem
ms.date: 07/08/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Optimization # This article's title should not change. If so, contact engineering.
---
# SQL Analytics Endpoint performance considerations

**Applies to:** [!INCLUDE [fabric-se](includes/applies-to-version/fabric-se.md)]

The [!INCLUDE [fabric-se](includes/fabric-se.md)] enables you to query data in the Lakehouse using T-SQL language and TDS protocol. Every Lakehouse has one SQL analytics endpoint. The number of SQL analytics endpoints in a workspace matches the number of [lakehouses](../data-engineering/lakehouse-overview.md) and [mirrored databases](../database/mirrored-database/overview.md) provisioned in that one workspace.

A background process is responsible for scanning lakehouse for changes, and keeping SQL analytics endpoint up-to-date for all the changes committed to lakehouses in a workspace. The sync process is transparently managed by Microsoft Fabric platform. When a change is detected in a lakehouse, a background process updates metadata and the SQL analytics endpoint reflects the changes committed to lakehouse tables. Under normal operating conditions, the lag between a lakehouse and SQL analytics endpoint should ideally be under a minute.

## Considerations

- There's one instance of metadata discovery service (MDS) provisioned for each Fabric workspace. MDS is responsible for tracking changes committed to lakehouses. If you are observing increased latency for changes to sync between lakehouses and SQL analytics endpoint, it could be due to large number of lakehouses in one workspace. In such a scenario, consider migrating each lakehouse to a separate workspace as this allows MDS to scale.
- Choice of partition for a delta table in a lakehouse also affects the time it takes to sync changes to SQL analytics endpoint. If the cardinality of a column is high, then do not use that column for partitioning as it would result in a large number of partitions and it would negatively impact performance of MDS to scan for changes. Besides number of partitions, size of each partition also affects performance. If the partition contains large number of small files then it will negatively impact performance. Our recommendation is to use a column which would result in a partition of at least (or close to) 1GB or above. We recommend following best practices for [delta tables maintenance](../data-engineering/lakehouse-table-maintenance.md); [optimization](../data-engineering/delta-optimization-and-v-order.md).
- Parquet files are immutable by design. When there's an update or a delete operation, a Delta table will add new parquet file(s) with the changeset, and this increases the number of files over period of time depending on frequency of updates and deletes. If there's no maintenance scheduled, eventually, this pattern creates a read overhead and this impacts time it takes to sync changes to SQL analytics endpoint. To address this, we recommend scheduling [lakehouse table maintenance operations](../data-engineering/lakehouse-table-maintenance.md#execute-ad-hoc-table-maintenance-on-a-delta-table-using-lakehouse)
- We have observed that a large volume of small-sized parquet files increases the time it takes to sync changes between a lakehouse and its associated SQL analytics endpoint. You may end up with large number of parquet files in a delta table for one or more reasons:
  - If you have an over-partitioned column in a delta table i.e. a column with high cardinality, then you'd observe that you have large volume of small-sized partitions which could be sometimes in order of KBs or MBs. Large number of small partitions negatively impacts performance of metadata discovery service to scan for changes and this would manifest as SQL analytics endpoint taking a long time (ranging from minutes to hours) to sync to lakehouse. We recommend that you choose a partition column which does not have a high cardinality, and results in individual partition size of at least 1 GB.
  - Batch and streaming data ingestion rates may also result in small files depending on frequency and size of changes being written to a lakehouse. For example, there might be small volume of changes coming through to the lakehouse and this would result in small parquet files. To address this, we recommend implementing [lakehouse table maintenance](../data-engineering/lakehouse-table-maintenance.md).
  
  You can use the following notebook to print a report detailing size and details of partitions underpinning a delta table.

  ```{python}
  # Purpose: Print out details of partitions, files per partitions, and size per partition in GB.
  
  from notebookutils import mssparkutils
  
  # Define ABFSS path for your delta table. You can get ABFSS path of a delta table by simply right-clicking on table name and selecting COPY PATH from the list of options.
  
  delta_table_path = "abfss://<workspace id>@<onelake>.dfs.fabric.microsoft.com/<lakehouse id>/Tables/<tablename>"
  
  # List all partitions for given delta table

  partitions = mssparkutils.fs.ls(delta_table_path)
  
  # Initialize a dictionary to store partition details

  partition_details = {}
  
  # Iterate through each partition

  for partition in partitions:
    if partition.isDir:
        partition_name = partition.name
        partition_path = partition.path
        files = mssparkutils.fs.ls(partition_path)
        
        # Calculate the total size of the partition

        total_size = sum(file.size for file in files if not file.isDir)
        
        # Convert size to GB

        total_size_gb = total_size / (1024 ** 3)
        
        # Count the number of files

        file_count = sum(1 for file in files if not file.isDir)
        
        # Write partition details

        partition_details[partition_name] = {
            "size_gb": total_size_gb,
            "file_count": file_count
        }
        
  # Print the partition details
  for partition_name, details in partition_details.items():
    print(f"Partition: {partition_name}, Size: {details['size_gb']:.2f} GB, Number of files: {details['file_count']}")

  ```

- SQL Analytics Endpoint does not support [lakehouse schemas](../data-engineering/lakehouse-schemas.md). This is a known limitation and we are working on resolving this issue.

- In some scenarios, you may observe that changes committed to a lakehouse are not visible in its associated SQL analytics endpoint. For example, you may have created a new table in lakehouse and it's not listed in SQL analytics endpoint or you may have committed a large number of rows to a table in a lakehouse but this data is not visible in SQL analytics endpoint. We recommend initiating an on-demand metadata sync trigged from the SQL query editor Refresh ribbon option. This option enables you to perform an on-demand metadata sync rather than waiting on the background metadata sync to finish. This will force a metadata refresh.
  
  :::image type="content" source="media/sql-aep-performance/sqlaep-ondemand-refresh.png" alt-text="Image displaying on-demand refresh button in SQL analytics endpoint experience.":::

## Related content

- [SQL analytics endpoint](get-started-lakehouse-sql-analytics-endpoint.md)
- [Warehouse performance guidelines](guidelines-warehouse-performance.md)
