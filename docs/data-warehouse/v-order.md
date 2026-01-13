---
title: Understand V-Order
description: Learn how to manage the V-Order state of warehouses in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: procha
ms.date: 08/02/2024
ms.topic: concept-article
ms.search.form: Optimization # This article's title should not change. If so, contact engineering.
---
# Understand V-Order for Microsoft Fabric Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] storage uses the Delta Lake table format for all user data. In addition to optimizations provided by the Delta format, a warehouse applies optimizations to storage to provide faster query performance on analytics scenarios while maintaining adherence to the Parquet format. This article covers V-Order write optimization, its benefits, and how to control it.

## What is V-Order?

V-Order is a write time optimization to the parquet file format that enables lightning-fast reads under the Microsoft Fabric compute engines, such as Power BI, SQL, Spark, and others.

Power BI and SQL engines make use of Microsoft Verti-Scan technology and V-Ordered parquet files to achieve in-memory-like data access times. Spark and other non-Verti-Scan compute engines also benefit from the V-Ordered files with an average of 10% faster read times, with some scenarios up to 50%.

V-Order works by applying special sorting, row group distribution, dictionary encoding, and compression on Parquet files. As a result, compute engines require less network, disk, and CPU resources to read data from storage, providing cost efficiency and performance. It's 100% compliant to the open-source parquet format; all parquet engines can read it as regular parquet files.

## Performance considerations

Consider the following before deciding to disable V-Order:

- [Microsoft Fabric Direct Lake mode](../fundamentals/direct-lake-overview.md) depends on V-Order.
- In warehouse, the effect of V-Order on performance can vary depending on your table schemas, data volumes, query, and ingestion patterns.
- Make sure you test how V-Order affects the performance of data ingestion and of your queries before deciding to disable it. Consider creating a [copy of your test warehouse using source control](source-control.md), disabling V-Order on the copy, and executing data ingestion and querying tasks to test the performance implications.

### Scenarios where V-Order might not be beneficial

Consider the effect of V-Order on performance before deciding if disabling V-Order is right for you.

> [!CAUTION]
> Currently, disabling V-Order can only be done at the warehouse level, and it is irreversible: once disabled, it cannot be enabled again. Users must consider the performance if they choose to [Disable V-Order in Fabric Warehouse](disable-v-order.md).

Disabling V-Order can be useful for write-intensive warehouses, such as for warehouses that are dedicated to staging data as part of a data ingestion process. Staging tables are often dropped and recreated (or truncated) to process new data. These staging tables might then be read only once or twice, which might not justify the ingestion time added by applying V-Order. By disabling V-Order and reducing the time to ingest data, your overall time to process data during ingestion jobs might be reduced. In this case, you should segment the staging warehouse from your main user-facing warehouse, so that the analytics queries and Power BI can benefit from V-Order.

## Related content

- [Disable V-Order on Warehouse in Microsoft Fabric](disable-v-order.md)
- [Delta Lake table optimization and V-Order](../data-engineering/delta-optimization-and-v-order.md)
