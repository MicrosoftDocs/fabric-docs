---
title: Limitations
description: This article contains a list of current limitations in Microsoft Fabric.
author: joannapea
ms.author: joanpo
ms.reviewer: wiassaf
ms.date: 11/15/2023
ms.topic: conceptual
ms.custom:
  - build-2023
  - references_regions
  - ignite-2023
ms.search.form: SQL Analytics Endpoint overview, Warehouse overview # This article's title should not change. If so, contact engineering.
---
# Limitations in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article details the current limitations in [!INCLUDE [product-name](../includes/product-name.md)].

## Limitations

Current general product limitations for Data Warehousing in Microsoft Fabric are listed in this article, with feature level limitations called out in the corresponding feature article. Additional functionality will build upon the world class, industry-leading performance and concurrency story, and will land incrementally. For more information on the future of Microsoft Fabric, see [Fabric Roadmap](https://blog.fabric.microsoft.com/en-us/blog/announcing-the-fabric-roadmap?ft=All).

- At this time, there's limited T-SQL functionality, and certain T-SQL commands can cause warehouse corruption. See [T-SQL surface area](tsql-surface-area.md) for a list of T-SQL command limitations.
- Data warehousing is not supported for *multiple* geographies at this time.

For more limitations in specific areas, see:

- [Clone table](clone-table.md#limitations)
- [Connectivity](connectivity.md#considerations-and-limitations)
- [Data types in Microsoft Fabric](data-types.md)
- [Semantic models](semantic-models.md#limitations)
- [Delta lake logs](query-delta-lake-logs.md#limitations)
- [Pause and resume in Fabric data warehousing](pause-resume.md#considerations-and-limitations)
- [Share your Warehouse](share-warehouse-manage-permissions.md#limitations)
- [Statistics](statistics.md#limitations)
- [Tables](tables.md#limitations)
- [Transactions](transactions.md#limitations)
- [Visual Query editor](visual-query-editor.md#limitations-with-visual-query-editor)

## Regional availability

The following Azure regions are currently not supported for [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)]:
   - West India
   - UAE Central
   - Poland
   - Israel
   - Italy

## Limitations of the SQL analytics endpoint

The following limitations apply to [!INCLUDE [fabric-se](includes/fabric-se.md)] automatic schema generation and metadata discovery.

- Data should be in Delta Parquet format to be auto-discovered in the [!INCLUDE [fabricse](includes/fabric-se.md)]. [Delta Lake is an open-source storage framework](https://delta.io/) that enables building Lakehouse architecture.

- Tables with renamed columns aren't supported in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. 

- Delta tables created outside of the `/tables` folder aren't available in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

   If you don't see a Lakehouse table in the warehouse, check the location of the table. Only the tables that are referencing data in the `/tables` folder are available in the warehouse. The tables that reference data in the `/files` folder in the lake aren't exposed in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. As a workaround, move your data to the `/tables` folder.

- Some columns that exist in the Spark Delta tables might not be available in the tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. Refer to the [Data types](data-types.md) for a full list of supported data types. 

- If you add a foreign key constraint between tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)], you won't be able to make any further schema changes (for example, adding the new columns). If you don't see the Delta Lake columns with the types that should be supported in [!INCLUDE [fabric-se](includes/fabric-se.md)], check if there is a foreign key constraint that might prevent updates on the table. 

## Known issues

For known issues in [!INCLUDE [product-name](../includes/product-name.md)], visit [Microsoft Fabric Known Issues](https://support.fabric.microsoft.com/known-issues/).

## Related content

- [Get Started with Warehouse](create-warehouse.md)
