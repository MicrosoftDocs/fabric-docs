---
title: Power BI Semantic Models
description: Learn more about Power BI semantic models in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: chweb, salilkanade, pvenkat
ms.date: 07/16/2025
ms.topic: conceptual
ms.search.form: Default semantic model overview # This article's title should not change. If so, contact engineering.
---

# Power BI semantic models in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-dw-mirroreddb](includes/applies-to-version/fabric-se-dw-mirroreddb.md)]

In [!INCLUDE [product-name](../includes/product-name.md)], Power BI semantic models are a logical description of an analytical domain, with metrics, business friendly terminology, and representation, to enable deeper analysis. This semantic model is typically a [star schema](dimensional-modeling-overview.md#star-schema-design) with facts that represent a domain, and dimensions that allow you to analyze, or slice and dice the domain to drill down, filter, and calculate different analyses.

When you create a semantic model on a lakehouse or warehouse, you choose which tables to add. From there, you can [manually update a Power BI semantic model](#manually-update-a-power-bi-semantic-model).

> [!NOTE]
> [!INCLUDE [default-semantic-model-retirement](../includes/default-semantic-model-retirement.md)]

Microsoft has renamed the Power BI *dataset* content type to *Power BI semantic model* or just *semantic model*. This applies to Microsoft Fabric as well. For more information, see [New name for Power BI datasets](/power-bi/connect-data/service-datasets-rename). To learn more about Power BI semantic models, see [Semantic models in the Power BI service](/power-bi/connect-data/service-datasets-understand). 

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

### Manually update a Power BI semantic model

By default, Fabric does not automatically add tables and views to a Power BI semantic model when created, and there is no automatic sync for semantic models from their warehouse or SQL analytics endpoint source.

Once there are objects in a Power BI semantic model, you can validate or visually inspect the tables included:

1. Open your **Semantic model** item in your Fabric workspace.
1. Switch the mode from **Viewing** to **Editing**.
1. Review the default layout for the semantic model. Make changes as needed. For more information, see [Edit data models in the Power BI service](/power-bi/transform-model/service-edit-data-models#autosave).

<a id="monitor-the-default-power-bi-semantic-model"></a>

### Monitor a Power BI semantic model

You can monitor and analyze activity on a semantic model with [SQL Server Profiler](/sql/tools/sql-server-profiler/sql-server-profiler) by connecting to the XMLA endpoint.

SQL Server Profiler installs with [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), and allows tracing and debugging of semantic model events. Although officially deprecated for SQL Server, Profiler is still included in SSMS and remains supported for Analysis Services and Power BI. Use with a Fabric semantic model requires SQL Server Profiler version 18.9 or higher. Users must specify the semantic model as the **initial catalog** when connecting with the XMLA endpoint. To learn more, see [SQL Server Profiler for Analysis Services](/analysis-services/instances/use-sql-server-profiler-to-monitor-analysis-services?view=power-bi-premium-current&preserve-view=true).

<a id="scripting-the-default-power-bi-semantic-model"></a>
<a id="script-the-default-power-bi-semantic-model"></a>

### Script a Power BI semantic model

You can script out a Power BI semantic model from the XMLA endpoint with [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms). 

View the Tabular Model Scripting Language (TMSL) schema of the semantic model by scripting it out via the Object Explorer in SSMS. To connect, use the semantic model's connection string, which looks like `powerbi://api.powerbi.com/v1.0/myorg/username`. You can find the connection string for your semantic model in the **Settings**, under **Server settings**. From there, you can generate an XMLA script of the semantic model via SSMS's **Script** context menu action. For more information, see [Dataset connectivity with the XMLA endpoint](/power-bi/enterprise/service-premium-connect-tools#connect-with-ssms).

Scripting requires Power BI write permissions on the Power BI semantic model. With read permissions, you can see the data but not the schema of the semantic model.

## Create a new Power BI semantic model

You can create Power BI semantic models based on lakehouse, [!INCLUDE [fabric-se](includes/fabric-se.md)], or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] items in Microsoft Fabric.

### Create a new Power BI semantic model in Direct Lake mode

These **new Power BI semantic models** can be edited in the workspace using [Open data model](/power-bi/transform-model/service-edit-data-models) and can be used with other features such as write DAX queries and semantic model row-level security. 

To create a Power BI semantic model using Direct Lake mode, follow these steps:

1. In the **Fabric portal**, create a new semantic model based on the desired item:
   - Open the lakehouse and select **New Power BI semantic model** from the ribbon.
   - Alternatively, open a Warehouse or Lakehouse's SQL analytics endpoint, select **New semantic model**. 
1. Enter a name for the new semantic model, select a workspace to save it in, and pick the tables to include. Then select **Confirm**.
1. The new Power BI semantic model can be [edited in the workspace](/power-bi/transform-model/service-edit-data-models), where you can add relationships, measures, rename tables and columns, choose how values are displayed in report visuals, and much more. If the model view does not show after creation, check the pop-up blocker of your browser.
1. To edit the Power BI semantic model later, select **Open data model** from the semantic model context menu or item details page to edit the semantic model further.

Power BI reports can be created in the workspace by selecting **New report** from web modeling, or in Power BI Desktop by live connecting to this new semantic model. To learn more on how to [connect to semantic models in the Power BI service from Power BI Desktop](/power-bi/connect-data/desktop-report-lifecycle-datasets)

### Create a new Power BI semantic model in import or DirectQuery storage mode

Having your data in Microsoft Fabric means you can create Power BI semantic models in any storage mode -- Direct Lake, import, or DirectQuery. You can create additional Power BI semantic models in import or DirectQuery mode using [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] data.

To create a Power BI semantic model in import or DirectQuery mode, follow these steps:

1. Open [Power BI Desktop](/power-bi/fundamentals/desktop-getting-started), sign in, and select **OneLake**. 
1. Choose the SQL analytics endpoint of the lakehouse or warehouse.
1. Select the **Connect** button dropdown list and choose **Connect to SQL endpoint**.
1. Select import or DirectQuery storage mode and the tables to add to the semantic model.

From there you can create the Power BI semantic model and report to publish to the workspace when ready. 

### Create a new, blank Power BI semantic model

The **New Power BI semantic model** button creates a new blank semantic model.

## Limitations

- Semantic models in Fabric follow the current limitations for semantic models in Power BI. Learn more:
   - [Azure Analysis Services resource and object limits](/azure/analysis-services/analysis-services-capacity-limits)
   - [Data types in Power BI Desktop - Power BI](/power-bi/connect-data/desktop-data-types)
- If the parquet, Apache Spark, or SQL data types can't be mapped to one of the Power BI desktop data types, they are dropped as part of the sync process. This is in line with current Power BI behavior. For these columns, we recommend that you add explicit type conversions in their ETL processes to convert it to a type that is supported. If there are data types that are needed upstream, users can optionally specify a view in SQL with the explicit type conversion desired. This will be picked up by the sync or can be added manually as previously indicated.
- Semantic models can only be edited in the SQL analytics endpoint or warehouse.
- [!INCLUDE [default-semantic-model-retirement](../includes/default-semantic-model-retirement.md)]

## Related content

- [Semantic models in the Power BI service](/power-bi/connect-data/service-datasets-understand)
