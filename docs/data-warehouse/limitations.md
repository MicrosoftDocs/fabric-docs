---
title: Limitations of Fabric Data Warehouse
description: Review current limitations for warehouse and SQL analytics endpoint items in Microsoft Fabric Data Warehouse.
ms.reviewer: joanpo, ajagadish, anphil, fresantos, pvenkat
ms.date: 07/02/2026
ms.topic: limits-and-quotas
ms.search.form: SQL Analytics Endpoint overview, Warehouse overview # This article's title should not change. If so, contact engineering.
ai-usage: ai-assisted
---
# Limitations of Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article lists current limitations for warehouse and SQL analytics endpoint items in [!INCLUDE [product-name](../includes/product-name.md)]. For limitations of SQL database in Fabric, see [Limitations in SQL database in Microsoft Fabric (preview)](../database/sql/limitations.md).

## Limitations

This article lists current general product limitations for data warehousing in Microsoft Fabric. Feature level limitations are called out in the corresponding feature article. For more information on the future of Microsoft Fabric, see [Fabric Roadmap](https://blog.fabric.microsoft.com/blog/announcing-the-fabric-roadmap?ft=All).

### T-SQL syntax support

Fabric Data Warehouse doesn't support every [Transact-SQL statement available in SQL Server](tsql-surface-area.md). 

### Cross-region connections aren't supported

Fabric Data Warehouse and SQL analytics endpoint connections require both the source and target items to be in the same region. Cross-region connections - including those across workspaces or capacities in different regions - aren't supported and might fail to authenticate or connect.

## Feature-specific Fabric Data Warehouse limitations

For limitations in specific features of Fabric Data Warehouse and the SQL analytics endpoint, see:

- [Clone table limitations](clone-table.md#limitations)
- [Configurable data retention limitations](data-retention.md#limitations)
- [Connectivity considerations and limitations](connectivity.md#considerations-and-limitations)
- [Data types in Microsoft Fabric](data-types.md)
- [Delta Lake logs limitations](query-delta-lake-logs.md#limitations)
- [Migration Assistant limitations](migration-assistant.md#limitations)
- [Pause and resume considerations and limitations](pause-resume.md#considerations-and-limitations)
- [Semantic models limitations](semantic-models.md#limitations)
- [Share your data and manage permissions limitations](share-warehouse-manage-permissions.md#limitations)
- [Source control limitations](source-control.md#limitations-in-source-control)
- [SQL analytics endpoint limitations](../data-engineering/lakehouse-sql-analytics-endpoint.md#limitations)
- [Statistics limitations](statistics.md#limitations)
- [Tables limitations](tables.md#limitations)
- [Transactions limitations](transactions.md#limitations)
- [Visual query editor limitations](visual-query-editor.md#limitations-with-visual-query-editor)

## Known issues

For known issues in [!INCLUDE [product-name](../includes/product-name.md)], visit [Microsoft Fabric Known Issues](https://support.fabric.microsoft.com/known-issues/).

## Related content

- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md)
- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
