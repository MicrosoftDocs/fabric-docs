---
title: Limitations of Fabric Data Warehouse
description: This article contains a list of current limitations in Microsoft Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: joanpo
ms.date: 09/26/2024
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2024
ms.search.form: SQL Analytics Endpoint overview, Warehouse overview # This article's title should not change. If so, contact engineering.
---
# Limitations of Microsoft Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article details the current limitations in [!INCLUDE [product-name](../includes/product-name.md)].

These limitations apply only to Warehouse and SQL analytics endpoint items in Fabric Synapse Data Warehouse. For limitations of SQL Database in Fabric, see [Limitations in SQL Database in Microsoft Fabric (Preview)](../database/sql/limitations.md).

## Limitations

Current general product limitations for Data Warehousing in Microsoft Fabric are listed in this article, with feature level limitations called out in the corresponding feature article. More functionality will build upon the world class, industry-leading performance and concurrency story, and will land incrementally. For more information on the future of Microsoft Fabric, see [Fabric Roadmap](https://blog.fabric.microsoft.com/blog/announcing-the-fabric-roadmap?ft=All).

- Data warehousing is not supported for *multiple* geographies at this time.
- Currently, parquet files that are no longer needed are not removed from storage by garbage collection.

For more limitations in specific areas, see:

- [Clone table](clone-table.md#limitations)
- [Connectivity](connectivity.md#considerations-and-limitations)
- [Data types in Microsoft Fabric](data-types.md)
- [Semantic models](semantic-models.md#limitations)
- [Delta lake logs](query-delta-lake-logs.md#limitations)
- [Pause and resume in Fabric data warehousing](pause-resume.md#considerations-and-limitations)
- [Share your data and manage permissions](share-warehouse-manage-permissions.md#limitations)
- [Limitations in source control](source-control.md#limitations-in-source-control)
- [Statistics](statistics.md#limitations)
- [Tables](tables.md#limitations)
- [Transactions](transactions.md#limitations)
- [Visual Query editor](visual-query-editor.md#limitations-with-visual-query-editor)

## Limitations of the SQL analytics endpoint

The following limitations apply to [!INCLUDE [fabric-se](includes/fabric-se.md)] automatic schema generation and metadata discovery.

- Data should be in Delta Parquet format to be autodiscovered in the [!INCLUDE [fabricse](includes/fabric-se.md)]. [Delta Lake is an open-source storage framework](https://delta.io/) that enables building Lakehouse architecture.

- Tables with renamed columns aren't supported in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

- [Delta column mapping](https://docs.delta.io/latest/delta-column-mapping.html) by name is supported, but Delta column mapping by ID is not supported. For more information, see [Delta Lake features and Fabric experiences](../fundamentals/delta-lake-interoperability.md#delta-lake-features-and-fabric-experiences).
    - [Delta column mapping in the SQL analytics endpoint](https://blog.fabric.microsoft.com/blog/fabric-september-2024-monthly-update?ft=All#post-14247-_Toc177485830) is currently in preview.

- Delta tables created outside of the `/tables` folder aren't available in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

   If you don't see a Lakehouse table in the warehouse, check the location of the table. Only the tables that are referencing data in the `/tables` folder are available in the warehouse. The tables that reference data in the `/files` folder in the lake aren't exposed in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. As a workaround, move your data to the `/tables` folder.

- Some columns that exist in the Spark Delta tables might not be available in the tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. Refer to the [Data types](data-types.md) for a full list of supported data types. 

- If you add a foreign key constraint between tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)], you won't be able to make any further schema changes (for example, adding the new columns). If you don't see the Delta Lake columns with the types that should be supported in [!INCLUDE [fabric-se](includes/fabric-se.md)], check if there is a foreign key constraint that might prevent updates on the table. 

- For information and recommendations on performance of the [!INCLUDE [fabric-se](includes/fabric-se.md)], see [SQL analytics endpoint performance considerations](sql-analytics-endpoint-performance.md).

## Known issues

For known issues in [!INCLUDE [product-name](../includes/product-name.md)], visit [Microsoft Fabric Known Issues](https://support.fabric.microsoft.com/known-issues/).

## Related content

- [T-SQL surface area](tsql-surface-area.md)
- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
