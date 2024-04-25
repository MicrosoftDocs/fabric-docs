---
title: Default Power BI semantic models
description: Learn more about default Power BI semantic models in Microsoft Fabric.
author: chuckles22
ms.author: chweb
ms.reviewer: wiassaf, salilkanade
ms.date: 01/25/2024
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.search.form: Default semantic model overview # This article's title should not change. If so, contact engineering.
---

# Default Power BI semantic models in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-and-dw-and-mirrored-db](includes/applies-to-version/fabric-se-and-dw-and-mirrored-db.md)]

In [!INCLUDE [product-name](../includes/product-name.md)], Power BI semantic models are a logical description of an analytical domain, with metrics, business friendly terminology, and representation, to enable deeper analysis. This semantic model is typically a star schema with facts that represent a domain, and dimensions that allow you to analyze, or slice and dice the domain to drill down, filter, and calculate different analyses. With the semantic model, the semantic model is created automatically for you, and the aforementioned business logic gets inherited from the parent lakehouse or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] respectively, jump-starting the downstream analytics experience for business intelligence and analysis with an item in [!INCLUDE [product-name](../includes/product-name.md)] that is managed, optimized, and kept in sync with no user intervention. 

Visualizations and analyses in **Power BI reports** can now be built completely in the web - or in just a few steps in Power BI desktop - saving users time, resources, and by default, providing a seamless consumption experience for end-users. The default Power BI semantic model follows the naming convention of the Lakehouse.

**Power BI semantic models** represent a source of data ready for reporting, visualization, discovery, and consumption. Power BI semantic models provide:

- The ability to expand warehousing constructs to include hierarchies, descriptions, relationships. This allows deeper semantic understanding of a domain.
- The ability to catalog, search, and find Power BI semantic model information in the Data Hub.
- The ability to set bespoke permissions for workload isolation and security.
- The ability to create measures, standardized metrics for repeatable analysis.
- The ability to create Power BI reports for visual analysis.
- The ability discover and consume data in Excel.
- The ability for third party tools like Tableau to connect and analyze data.

For more on Power BI, see [Power BI guidance](/power-bi/guidance/).

> [!NOTE]
> Microsoft has renamed the Power BI *dataset* content type to *semantic model*. This applies to Microsoft Fabric as well. For more information, see [New name for Power BI datasets](/power-bi/connect-data/service-datasets-rename).

## Direct Lake mode

[Direct Lake](/power-bi/enterprise/directlake-overview) mode is a groundbreaking new engine capability to analyze very large datasets in Power BI. The technology is based on the idea of loading parquet-formatted files directly from a data lake, without having to query a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)], and without having to import or duplicate data into a Power BI semantic model. This native integration brings a unique mode of accessing the data from the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)], called Direct Lake.  

Direct Lake provides the most performant query and reporting experience. Direct Lake is a fast path to load the data from the data lake straight into the Power BI engine, ready for analysis.

- In traditional DirectQuery mode, the Power BI engine directly queries the data from the source for each query execution, and the query performance depends on the data retrieval speed. DirectQuery eliminates the need to copy data, ensuring that any changes in the source are immediately reflected in query results. 

- In Import mode, the performance is better because the data is readily available in memory, without having to query the data from the source for each query execution. However, the Power BI engine must first copy the data into the memory, at data refresh time. Any changes to the underlying data source are picked up during the next data refresh.

- Direct Lake mode eliminates the Import requirement by loading the data files directly into memory. Because there's no explicit import process, it's possible to pick up any changes at the source as they occur. Direct Lake combines the advantages of DirectQuery and Import mode while avoiding their disadvantages. Direct Lake mode is the ideal choice for analyzing very large datasets and datasets with frequent updates at the source.

Direct Lake mode is the default connection type for semantic models that use a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] as a data source.

## Understand what's in the default Power BI semantic model

When you create a [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](create-warehouse.md) or [[!INCLUDE [fabric-se](includes/fabric-se.md)]](../data-engineering/lakehouse-overview.md), a default Power BI semantic model is created. The default semantic model is represented with the *(default)* suffix.

The default semantic model is queried via the [!INCLUDE [fabric-se](includes/fabric-se.md)] and updated via changes to the Lakehouse or Warehouse. You can also query the default semantic model via [cross-database queries](query-warehouse.md#write-a-cross-database-query) from a [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#synapse-data-warehouse).

### Sync the default Power BI semantic model

Previously we auto added all tables and views in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] to the default Power BI semantic model. Based on feedback, we have modified the default behavior to not automatically add tables and views to the default Power BI semantic model. This change will ensure the background sync will not get triggered. This will also disable some actions like "New Measure", "Create Report", "Analyze in Excel".

If you want to change this default behavior, you can:

1. Manually enable the **Sync the default Power BI semantic model** setting for each [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] in the workspace. This will restart the background sync that will incur some [consumption costs](../onelake/onelake-consumption.md).

    :::image type="content" source="media/semantic-models/default-on.png" alt-text="Screenshot from the Fabric portal showing the setting Sync the default Power BI semantic model is enabled.":::

1. Manually pick tables and views to be added to semantic model through **Manage default Power BI semantic model** in the ribbon or info bar.

    :::image type="content" source="media/semantic-models/default-manage.png" alt-text="Screenshot from the Fabric portal showing the default Manage the semantic model page, and the ability to manually pick more tables.":::

> [!NOTE]
> In case you are not using the default Power BI semantic model for reporting purposes, manually disable the **Sync the default Power BI semantic model** setting to avoid adding objects automatically. The setting update will ensure that background sync will not get triggered and save on [Onelake consumption costs](../onelake/onelake-consumption.md).

### Manually update the default Power BI semantic model

Once there are objects in the default Power BI semantic model, there are two ways to validate or visually inspect the tables:

1. Select the **Manually update** semantic model button in the ribbon.

1. Review the default layout for the default semantic model objects.

The default layout for BI-enabled tables persists in the user session and is generated whenever a user navigates to the model view. Look for the **Default semantic model objects** tab.

## Access the default Power BI semantic model

To access default Power BI semantic models, go to your workspace, and find the semantic model that matches the name of the desired Lakehouse. The default Power BI semantic model follows the naming convention of the Lakehouse.

   :::image type="content" source="media\semantic-models\find-semantic-models.png" alt-text="Screenshot showing where to find a semantic model." lightbox="media\semantic-models\find-semantic-models.png":::

To load the semantic model, select the name of the semantic model.

### Monitor the default Power BI semantic model

You can monitor and analyze activity on the semantic model with [SQL Server Profiler](/sql/tools/sql-server-profiler/sql-server-profiler) by connecting to the XMLA endpoint. 

SQL Server Profiler installs with [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), and allows tracing and debugging of semantic model events. Although officially deprecated for SQL Server, Profiler is still included in SSMS and remains supported for Analysis Services and Power BI. Use with the Fabric default Power BI semantic model requires SQL Server Profiler version 18.9 or higher. Users must specify the semantic model as the **initial catalog** when connecting with the XMLA endpoint. To learn more, see [SQL Server Profiler for Analysis Services](/analysis-services/instances/use-sql-server-profiler-to-monitor-analysis-services?view=power-bi-premium-current&preserve-view=true).

### <a id="scripting-the-default-power-bi-semantic-model"></a> Script the default Power BI semantic model

You can script out the default Power BI semantic model from the XMLA endpoint with [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms). 

View the Tabular Model Scripting Language (TMSL) schema of the semantic model by scripting it out via the Object Explorer in SSMS. To connect, use the semantic model's connection string, which looks like `powerbi://api.powerbi.com/v1.0/myorg/username`. You can find the connection string for your semantic model in the **Settings**, under **Server settings**. From there, you can generate an XMLA script of the semantic model via SSMS's **Script** context menu action. For more information, see [Dataset connectivity with the XMLA endpoint](/power-bi/enterprise/service-premium-connect-tools#connect-with-ssms).

Scripting requires Power BI write permissions on the Power BI semantic model. With read permissions, you can see the data but not the schema of the Power BI semantic model.

## Create a new Power BI semantic model

There are some situations where your organization might need to create additional Power BI semantic models based off [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] data.

The **New Power BI semantic model** button inherits the default semantic model's configuration and allows for further customization. The default semantic model acts as a starter template, helping to ensure a single version of the truth. For example, if you use the default semantic model and define new relationships, and then use the **New Power BI semantic model** button, the new semantic model will inherit those relationships if the tables selected include those new relationships.

To create a Power BI semantic model from a [!INCLUDE [fabric-dw](includes/fabric-dw.md)], follow these steps:

1. Go to **Data Warehouse** in the Fabric portal.

1. Open the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. Switch to the **Reporting** ribbon.

1. In the **Reporting** ribbon, select **New semantic model**, and then in the **New semantic model** dialog, select tables to be included, and then select **Confirm**.

1. Power BI automatically saves the semantic model in the workspace based on the name of your [!INCLUDE [fabric-dw](includes/fabric-dw.md)], and then opens the semantic model in Power BI.

1. Select **Open data model** to open the Power BI Web modeling experience where you can add table relationships and DAX measures.

To learn more on how to edit data models in the Power BI service, see [Edit Data Models](/power-bi/transform-model/service-edit-data-models).

## Limitations

Default Power BI semantic models follow the current limitations for semantic models in Power BI. Learn more:

- [Azure Analysis Services resource and object limits](/azure/analysis-services/analysis-services-capacity-limits)
- [Data types in Power BI Desktop - Power BI](/power-bi/connect-data/desktop-data-types)

If the parquet, Apache Spark, or SQL data types can't be mapped to one of the Power BI desktop data types, they are dropped as part of the sync process. This is in line with current Power BI behavior. For these columns, we recommend that you add explicit type conversions in their ETL processes to convert it to a type that is supported. If there are data types that are needed upstream, users can optionally specify a view in SQL with the explicit type conversion desired. This will be picked up by the sync or can be added manually as previously indicated.

## Related content

- [Define relationships in data models for data warehousing in Microsoft Fabric](data-modeling-defining-relationships.md)
- [Model data in the default Power BI semantic model in Microsoft Fabric](default-power-bi-semantic-model.md)
