---
title: Limitations of Fabric Data Warehouse
description: This article contains a list of current limitations in Microsoft Fabric Data Warehouse.
ms.reviewer: joanpo, ajagadish, anphil, fresantos, pvenkat
ms.date: 04/24/2026
ms.topic: limits-and-quotas
ms.search.form: SQL Analytics Endpoint overview, Warehouse overview # This article's title should not change. If so, contact engineering.
---
# Limitations of Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article details the current limitations in [!INCLUDE [product-name](../includes/product-name.md)].

These limitations apply only to Warehouse and SQL analytics endpoint items in Fabric Synapse Data Warehouse. For limitations of SQL database in Fabric, see [Limitations in SQL database in Microsoft Fabric (preview)](../database/sql/limitations.md).

## Limitations

Current general product limitations for Data Warehousing in Microsoft Fabric are listed in this article, with feature level limitations called out in the corresponding feature article. More functionality will build upon the world class, industry-leading performance and concurrency story, and will land incrementally. For more information on the future of Microsoft Fabric, see [Fabric Roadmap](https://blog.fabric.microsoft.com/blog/announcing-the-fabric-roadmap?ft=All).

> [!IMPORTANT]
> Fabric Data Warehouse and SQL analytics endpoint connections require both the source and target items to be in the same region. Cross-region connections—including those across workspaces or capacities in different regions—are not supported and might fail to authenticate or connect.

For more limitations in specific areas, see:

- [Clone table](clone-table.md#limitations)
- [Configurable data retention](data-retention.md#limitations)
- [Connectivity](connectivity.md#considerations-and-limitations)
- [Data types in Microsoft Fabric](data-types.md)
- [Delta lake logs](query-delta-lake-logs.md#limitations)
- [Migration Assistant](migration-assistant.md#limitations)
- [Pause and resume in Fabric data warehousing](pause-resume.md#considerations-and-limitations)
- [Semantic models](semantic-models.md#limitations)
- [Share your data and manage permissions](share-warehouse-manage-permissions.md#limitations)
- [Source control](source-control.md#limitations-in-source-control)
- [SQL analytics endpoint limitations](../data-engineering/lakehouse-sql-analytics-endpoint.md#limitations)
- [Statistics](statistics.md#limitations)
- [Tables](tables.md#limitations)
- [Transactions](transactions.md#limitations)
- [Visual Query editor](visual-query-editor.md#limitations-with-visual-query-editor)

## Known issues

For known issues in [!INCLUDE [product-name](../includes/product-name.md)], visit [Microsoft Fabric Known Issues](https://support.fabric.microsoft.com/known-issues/).

## Related content

- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md)
- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
