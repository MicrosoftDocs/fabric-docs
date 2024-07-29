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

The SQL analytics endpoint [!INCLUDE [fabric-se](includes/fabric-se.md)] enables you to query data in the Lakehouse using T-SQL language and TDS protocol. Every Lakehouse has one SQL analytics endpoint. SQL analytics endpoint is automatically created by the platform when you provision a [Lakehouse](../data-engineering/lakehouse-overview.md) or enable [Mirroring](../database/mirrored-database/overview.md) in Fabric.

A background sync process is responsible for scanning lakehouse for changes, and keeping SQL analytics endpoint up-to-date for all the changes committed to lakehouses in a workspace. The sync process is transparently managed by Microsoft Fabric platform, but users can manual initate the sync by clicking on 'refresh' within the SQL anaytics endpoint.  When a change is detected in a lakehouse, the process updates metadata and the SQL analytics endpoint reflects the changes committed to lakehouse tables. Under normal operating conditions, the lag between a lakehouse and SQL analytics endpoint should ideally be under a minute.

This document highlights considerations which may affect elapsed time (or the time lag) between a change being committed to a lakehouse and the changes getting reflected in its associated SQL analytics endpoint.

## Considerations

- In the current release of Microsoft Fabric, there's one instance of metadata discovery service (MDS) per workspace. MDS is responsible for tracking changes for all lakehouses in a single workspace. You can scale metadata discovery process by provisioning separate Fabric workspaces for each lakehouse. The quickest way to do this is to create a new workspace and a lakehouse. You can then shortcut data to this new lakehouse. If you are observing increased latency between lakehouses and SQL analytics endpoint tables, it could be due to large number of lakehouses in one workspace. In such a scenario, consider migrating each lakehouse to a separate workspace as this would allow MDS to scale.

- Choice of partition for delta tables in a lakehouse also impacts sync time between that lakehouse and its associated SQL analytics endpoint. Too many partitions containing small sized parquet files would result in longer sync times between lakehouse(s) and their associated SQL analytics endpoint(s) in a workspace. We recommend following best practices for [delta tables maintenance](../data-engineering/lakehouse-table-maintenance.md) and [optimization](../data-engineering/delta-optimization-and-v-order.md).

- Parquet files are immutable by design. When there's an update or delete operation, Delta tables add new parquet file(s) with the changeset, and this increases the number of files over period of time depending on frequency of updates and deletes. If there's no maintenance scheduled, eventually, this pattern creates a read overhead. To address this, we recommend scheduling [lakehouse table maintenance operations](../data-engineering/lakehouse-table-maintenance.md#execute-ad-hoc-table-maintenance-on-a-delta-table-using-lakehouse)

- We have observed that a large volume of small-sized parquet files increases the time it takes to sync changes between a lakehouse and its associated SQL analytics endpoint. You may end up with large number of parquet files in a delta table for one or more reasons:
  - If you have an over-partitioned column in a delta table i.e. a column with high cardinality, then you'd observe that you have large volume of small-sized partitions which could be sometimes in order of KBs or MBs. Large number of small partitions negatively impacts performance of metadata discovery service to scan for changes and this would manifest as SQL analytics endpoint taking a long time (ranging from minutes to hours) to sync to lakehouse. We recommend that you choose a partition column which does not have a high cardinality, and results in individual partition size of at least 1 GB.
  - You may also end up with large number of small files where there's a skew in data i.e. some partitions may have more data compared to other partitions which are significantly smaller (in order of KBs or few MBs). To address this, we recommend looking at partitioning strategy of the tables which are taking long time to sync.
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

- Currently, SQL Analytics Endpoint does not support [lakehouse schemas](../data-engineering/lakehouse-schemas.md). This is a known limitation and we are working on resolving this issue.

- In some scenarios, you may observe that changes committed to a lakehouse are not visible in its associated SQL analytics endpoint. For example - you may have created a new table in lakehouse and it doesn't show up in SQL analytics endpoint or you may have committed a large number of rows to a table in a lakehouse but this data is not visible in SQL analytics endpoint. We recommend initiating an on-demand metadata sync trigged from the SQL query editor Refresh ribbon option. This option enables you to perform an on-demand metadata sync rather than waiting on the background metadata sync to finish. This will force a metadata refresh.
  
  :::image type="content" source="media/sql-aep-performance/sqlaep-ondemand-refresh.png" alt-text="Image displaying on-demand refresh button in SQL analytics endpoint experience.":::
  
- The behaviour of cold cache and statistics covered under [warehouse performance guidelines](guidelines-warehouse-performance.md) also applies to SQL analytics endpoint

## Related content

- [SQL analytics endpoint](get-started-lakehouse-sql-analytics-endpoint.md)