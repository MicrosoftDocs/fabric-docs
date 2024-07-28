---
title: Intelligent cache in Microsoft Fabric
description: Learn about the intelligent cache feature in Fabric, including when to use it and how to enable and disable it in a session.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Intelligent cache in Microsoft Fabric

The intelligent cache feature works seamlessly behind the scenes and caches data to help speed up the execution of Apache Spark jobs in Microsoft Fabric as it reads from your OneLake or Azure Data Lake Storage (ADLS) Gen2 storage via shortcuts. It also automatically detects changes to the underlying files and automatically refreshes the files in the cache, providing you with the most recent data. When the cache size reaches its limit, the cache automatically releases the least read data to make space for more recent data. This feature lowers the total cost of ownership by improving performance up to 60% on subsequent reads of the files that are stored in the available cache.

When the Apache Spark engine in Microsoft Fabric queries a file or table from your lakehouse, it makes a call to the remote storage to read the underlying files. With every query request to read the same data, the Spark engine must make a call to remote storage each time. This redundant process adds latency to your total processing time. Spark has a caching requirement that you must manually set and release the cache to minimize the latency and improve overall performance. However, this requirement can result in stale data if the underlying data changes.

Intelligent cache simplifies the process by automatically caching each read within the allocated cache storage space on each Spark node where data files are cached in SSD. Each request for a file checks to see if the file exists in the local node cache and compare the tag from the remote storage to determine if the file is stale. If the file doesn't exist or if the file is stale, Spark reads the file and store it in the cache. When the cache becomes full, the file with the oldest last access time is evicted from the cache to allow for more recent files.

Intelligent cache is a single cache per node. If you're using a medium-sized node and run with two small executors on that single node, the two executors share the same cache. Also, this data file level caching makes it possible for multiple queries to use the same cache if they're accessing the same data or data files.

## How it works

In Microsoft Fabric (Runtime 1.1 and 1.2), intelligent caching is enabled by default for all the Spark pools for all workspaces with cache size with 50%. The actual size of the available storage and the cache size on each node depends on the node family and node size.

## When to use intelligent cache

This feature benefits you if:

- Your workload requires reading the same file multiple times and the file size fits in the cache.

- Your workload uses Delta Lake tables, Parquet, or CSV file formats.

You don't see the benefit of intelligent cache if:

- You're reading a file that exceeds the cache size. If so, the beginning of the files could be evicted, and subsequent queries have to refetch the data from the remote storage. In this case, you don't see any benefits from the intelligent cache, and you might want to increase your cache size and/or node size.

- Your workload requires large amounts of shuffle. Disabling the intelligent cache frees up available space to prevent your job from failing due to insufficient storage space.

## Enable and disable the intelligent cache 

You can disable or enable the intelligent cache within a session by running the following code in your notebook or setting this configuration at the workspace or _Environment_ item level.

```scala
spark.conf.set("spark.synapse.vegas.useCache", "false/true") 
```

## Related content

- [What is Spark compute in Microsoft Fabric?](spark-compute.md)
