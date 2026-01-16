---
title: Power BI Semantic Models
description: Learn more about Power BI semantic models in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: chweb, salilkanade, pvenkat
ms.date: 12/05/2025
ms.topic: concept-article
ms.search.form: Default semantic model overview # This article's title should not change. If so, contact engineering.
ai-usage: ai-assisted
---

# Power BI semantic models in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-dw-mirroreddb](includes/applies-to-version/fabric-se-dw-mirroreddb.md)]

In [!INCLUDE [product-name](../includes/product-name.md)], Power BI semantic models are a logical description of an analytical domain, with metrics, business friendly terminology, and representation, to enable deeper analysis. This semantic model is typically a [star schema](dimensional-modeling-overview.md#star-schema-design) with facts that represent a domain, and dimensions that allow you to analyze, or slice and dice the domain to drill down, filter, and calculate different analyses.

> [!NOTE]
> [!INCLUDE [default-semantic-model-retirement](../includes/default-semantic-model-retirement.md)]

Microsoft renamed the Power BI *dataset* content type to *Power BI semantic model* or just *semantic model*. This applies to Microsoft Fabric as well. For more information, see [New name for Power BI datasets](/power-bi/connect-data/service-datasets-rename). To learn more about Power BI semantic models, see [Semantic models in the Power BI service](/power-bi/connect-data/service-datasets-understand).

## Direct Lake mode

[Direct Lake](../fundamentals/direct-lake-overview.md) mode is a groundbreaking new engine capability to analyze very large datasets in Power BI. The technology is based on the idea of consuming parquet-formatted files directly from a data lake, without having to query a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)], and without having to import or duplicate data into a Power BI semantic model. This native integration brings a unique mode of accessing the data from the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)], called Direct Lake. [Direct Lake overview](../fundamentals/direct-lake-overview.md) has further information about this storage mode for Power BI semantic models.

Direct Lake provides the most performant query and reporting experience. Direct Lake is a fast path to consume the data from the data lake straight into the Power BI engine, ready for analysis.

- In traditional DirectQuery mode, the Power BI engine directly queries the data from the source for each query execution, and the query performance depends on the data retrieval speed. DirectQuery eliminates the need to copy data, ensuring that any changes in the source are immediately reflected in query results. 

- In Import mode, the performance is better because the data is readily available in memory, without having to query the data from the source for each query execution. However, the Power BI engine must first copy the data into the memory, at data refresh time. Any changes to the underlying data source are picked up during the next data refresh.

- Direct Lake mode eliminates the Import requirement to copy the data by consuming the data files directly into memory. Because there's no explicit import process, it's possible to pick up any changes at the source as they occur. Direct Lake combines the advantages of DirectQuery and Import mode while avoiding their disadvantages. Direct Lake mode is the ideal choice for analyzing very large datasets and datasets with frequent updates at the source. Direct Lake will [automatically fallback to DirectQuery](../fundamentals/direct-lake-overview.md) using the SQL analytics endpoint of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] when Direct Lake exceeds limits for the SKU, or uses features not supported, allowing report users to continue uninterrupted. 

- Direct Lake mode is the storage mode for new Power BI semantic models created on a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)].
- Using Power BI Desktop, you can also create Power BI semantic models using the SQL analytics endpoint of [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] as a data source for semantic models in import or DirectQuery storage mode.

<a id="sync-the-default-power-bi-semantic-model"></a>
<a id="manually-update-the-default-power-bi-semantic-model"></a>
<a id="access-the-default-power-bi-semantic-model"></a>

## Create and manage Power BI semantic models

When you create a semantic model on a lakehouse or warehouse, you choose which tables to add. From there, you can manually update a Power BI semantic model.

To get started, see:

 - [Create a semantic model](create-semantic-model.md)
 - [Manage a semantic model](manage-semantic-model.md)

## Limitations

- Semantic models in Fabric follow the current limitations for semantic models in Power BI. Learn more:
   - [Azure Analysis Services resource and object limits](/azure/analysis-services/analysis-services-capacity-limits)
   - [Data types in Power BI Desktop - Power BI](/power-bi/connect-data/desktop-data-types)
- Semantic models are independent items in Fabric and can be managed via REST APIs to enumerate semantic models in a workspace, check for dependencies (reports/dashboards) and model content, and delete unused ones. This includes decoupled semantic models that were created by default in the past, which are no longer created automatically.
- If the parquet, Apache Spark, or SQL data types can't be mapped to one of the Power BI desktop data types, they're dropped as part of the sync process. This is in line with current Power BI behavior. For these columns, we recommend that you add explicit type conversions in their ETL processes to convert it to a type that is supported. If there are data types that are needed upstream, users can optionally specify a view in SQL with the explicit type conversion desired. This will be picked up by the sync or can be added manually as previously indicated.
- Semantic models can only be edited in the SQL analytics endpoint or warehouse.

## Next step

> [!div class="nextstepaction"]
> [Create a Power BI semantic model](create-semantic-model.md)

## Related content

- [Semantic models in the Power BI service](/power-bi/connect-data/service-datasets-understand)
