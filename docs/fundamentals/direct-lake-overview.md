---
title: "Direct Lake overview"
description: "Learn about Direct Lake storage mode in Microsoft Fabric and when you should use it."
author: JulCsc
ms.author: juliacawthra
ms.date: 09/22/2025
ms.topic: concept-article
ms.custom: fabric-cat
ai-usage: ai-assisted
---

# Direct Lake overview

Direct Lake is a Power BI semantic model table storage mode option available in Microsoft Fabric. It's optimized for large volumes of data to be quickly loaded into memory from [delta tables](../data-engineering/lakehouse-and-delta-tables.md) available in the [OneLake](../onelake/onelake-overview.md)—the single store for all analytics data. Once loaded into memory, the semantic model enables high performance interactive analysis.

:::image type="content" source="media/direct-lake-overview/direct-lake-overview.svg" alt-text="Diagram shows a Direct Lake semantic model and how it connects to Delta tables in OneLake as described in the previous paragraphs." border="false":::

Direct Lake is ideal for semantic models connecting to large Fabric lakehouses, warehouses, and other Fabric data sources with delta tables. Direct Lake is especially useful when replicating the entire data volume into an import table is challenging or impossible. Direct Lake and import queries are processed by the VertiPaq query engine, whereas DirectQuery federates queries to the underlying data source. Direct Lake and import queries normally outperform DirectQuery queries when loading and interacting with visuals in reports.

However, a Direct Lake differs from an Import mode in an important way: a refresh operation for a Direct Lake semantic model is conceptually different to a refresh operation for an Import semantic model. Import mode replicates the data and creates an entire cached copy of the data for the semantic model, whereas a Direct Lake refresh copies only metadata (known as [framing](direct-lake-how-it-works.md#framing), described later in this article), which can take a few seconds to complete. The Direct Lake refresh is a low-cost operation that analyzes the metadata of the latest version of the Delta tables and is updated to reference the latest files in OneLake. In contrast, for an Import refresh produces a copy of the data, which can take considerable time and consume significant data source and capacity resources (memory and CPU). Direct Lake moves data preparation to OneLake and in doing so uses the full breadth of Fabric technologies for data prep, including Spark jobs, T-SQL DML statements, dataflows, pipelines, and more.

Direct Lake storage mode offers the following key benefits:

* Similar to Import mode, Direct Lake queries are processed by the VertiPaq engine, and thus delivers query performance comparable to Import mode without the management overhead of data refresh cycles to load the entire data volume. 
* Uses existing Fabric investments by seamlessly integrating with large lakehouses, warehouses, and other Fabric sources with Delta tables. For example, Direct Lake is an ideal choice for the *gold* analytics layer in the medallion lakehouse architecture.
* Maximizes Return on Investment (ROI) because analyzed data volumes can exceed the capacity's max memory limits, since only the data that's needed to answer a query is loaded into memory.
* Minimizes data latencies by quickly and automatically synchronizing a semantic model with its sources, making new data available to business users without refresh schedules.

> [!TIP]
> Direct Lake performance depends on well-tuned Delta tables. For comprehensive guidance on optimizing tables for Direct Lake consumption, including V-Order and row group recommendations, see [Cross-workload table maintenance and optimization](table-maintenance-optimization.md).

## When should you use Direct Lake storage mode?

The primary use case for Direct Lake storage mode is typically for IT-driven analytics projects that use lake-centric architectures. In such scenarios, you have, or expect to accumulate, large volumes of data in OneLake. The fast loading of that data into memory, frequent and fast refresh operations, efficient use of capacity resources, and fast query performance are all important for this use case.

> [!NOTE]
> Import and DirectQuery tables in semantic models are still relevant in Fabric, and they're the right choice of semantic model for some scenarios. For example, Import storage mode often works well for a self-service analyst who needs the freedom and agility to act quickly, and without dependency on IT to add new data elements.
>
> A semantic model with import tables and Direct Lake tables offers flexibility with scale needed for many BI scenarios too.
> 
> Also, [OneLake integration](/power-bi/enterprise/onelake-integration-overview) automatically writes data for tables in Import storage mode to [Delta tables](../data-engineering/lakehouse-and-delta-tables.md) in OneLake without involving any migration effort, which lets you realize many of the benefits of Fabric that are made available to Import semantic model users, such as integration with lakehouses through shortcuts, SQL queries, notebooks, and more. We recommend this option as a quick way to reap the benefits of Fabric without necessarily or immediately redesigning your existing data warehouse and/or analytics system.

Direct Lake depends on data preparation being done in the data lake. Data preparation can be done by using various tools, such as Spark jobs for Fabric lakehouses, T-SQL DML statements for Fabric warehouses, dataflows, pipelines, and others, which helps ensure data preparation logic is performed upstream in the architecture to maximize reusability. However, if the semantic model author doesn't have the ability to modify the source item, for example if a self-service analyst doesn't have write permissions on a lakehouse that is managed by IT, then augmenting the model with Import storage mode tables might be a good choice, since Import mode supports data preparation by using Power Query, which is defined as part of semantic model.

Be sure to consider your current [Fabric capacity license](../enterprise/licenses.md#capacity) and the [Fabric capacity guardrails](#fabric-capacity-requirements) when you consider Direct Lake storage mode. Also, factor in the [considerations and limitations](#considerations-and-limitations), which are described later in this article.


> [!TIP]
> We recommend that you produce a [prototype](/power-bi/guidance/powerbi-implementation-planning-usage-scenario-prototyping-and-sharing)—or proof of concept (POC)—to determine whether a Direct Lake semantic model is the right solution, and to mitigate risk.

## Key concepts and terminology

This article assumes familiarity with the following concepts:

* Users load and interact with visuals in Power BI reports generating DAX queries to the semantic model.
* **Storage mode**: The semantic model processes the DAX queries differently depending on the table storage mode used. For example:
    * Import and Direct Lake storage modes use the VertiPaq engine to process DAX queries and return results to the Power BI report and user.
    * DirectQuery translates DAX queries to the query syntax of the data source, such as a SQL query, and runs them on the underlying source database. These source databases aren't typically optimized for heavy query load coming from reports and aggregated queries needed by the visuals, and may result in slower performance when compared to Import and Direct Lake modes. 

Storage mode is a property of a table in the semantic model. When a semantic model includes tables with different storage modes, it's referred to as a composite model. For more information about storage modes, see [Semantic model modes in the Power BI service](/power-bi/connect-data/service-dataset-modes-understand).

**Direct Lake table storage mode** have two options:

* **Direct Lake on OneLake** can use data from one or more Fabric data source with delta tables. Direct Lake on OneLake doesn't fall back to DirectQuery mode via the SQL analytics endpoint of the data source. Semantic models with Direct Lake on OneLake tables can also have import tables added from other data sources.

* **Direct Lake on SQL** can use the data from a single Fabric data source with delta tables. The SQL analytics endpoint is used for delta table and SQL view discovery and permission checks. Direct Lake on SQL endpoints fall back to DirectQuery table storage mode when it can't load the data directly from a delta table, such as when the data source is a SQL view or when the Warehouse uses SQL-based granular access control. The semantic model property, **Direct Lake behavior**, controls the fall back behavior.


## Comparison of storage modes

The following table compares Direct Lake storage mode to Import and DirectQuery storage modes.

| Capability | Direct Lake on OneLake | Direct Lake on SQL endpoints | Import | DirectQuery |
| --- | --- | --- | --- | --- |
| Tenant setting | Enable the tenant setting **User can create Direct Lake on OneLake semantic models (preview)** in the admin portal.  | Enabled for all tenants. | Enabled for all tenants. | Enabled for all tenants. |
| Licensing | Fabric capacity subscription (SKUs) only |Fabric capacity subscription (SKUs) only |  Any Fabric or Power BI license (including Microsoft Fabric Free licenses) | Any Fabric or Power BI license (including Microsoft Fabric Free licenses) |
| Data source | Tables of any Fabric data source backed by Delta tables | Only lakehouse or warehouse tables (or views) | Any connector | Any connector that supports DirectQuery mode |
| Connect to SQL analytics endpoint views |No | Yes – but will automatically fall back to DirectQuery mode | Yes | Yes |
| Composite models | Yes - can combine with import storage mode tables in Power BI web modeling and DirectQuery tables with XMLA tools. |No <sup>1</sup> | Yes – can combine with DirectQuery, Dual, and Direct Lake storage mode tables | Yes – can combine with Import, Dual, and Direct Lake storage mode tables |
| Single sign-on (SSO) | Yes |Yes | Not applicable | Yes |
| Calculated tables |Yes – but calculations can't refer to columns of tables in Direct Lake mode. |No – except [calculation groups](/power-bi/transform-model/calculation-groups), [what-if parameters](/power-bi/transform-model/desktop-what-if), and [field parameters](/power-bi/create-reports/power-bi-field-parameters), which implicitly create calculated tables | Yes | No – calculated tables use Import storage mode even when they refer to other tables in DirectQuery mode |
| Calculated columns |No | No  | Yes | Yes |
| Hybrid tables | No |No | Yes | Yes |
| Model table partitions | No – however partitioning can be done at the Delta table level | No – however partitioning can be done at the Delta table level | Yes – either automatically created by incremental refresh, or [manually created](/power-bi/connect-data/incremental-refresh-xmla#partitions) by using the XMLA endpoint | No  |
| User-defined aggregations | No |No  | Yes – Import aggregation tables on DirectQuery tables are supported | Yes |
| SQL analytics endpoint object-level security or column-level security | No |Yes – but might produce errors when permission is denied | Yes – but must duplicate permissions with semantic model object-level security | Yes – but queries might produce errors when permission is denied |
| SQL analytics endpoint row-level security (RLS) |No | Yes – but queries will fall back to DirectQuery mode | Yes – but must duplicate permissions with semantic model RLS | Yes |
| Semantic model row-level security (RLS) |Yes – but it's strongly recommended to use a [fixed identity](direct-lake-fixed-identity.md) cloud connection | Yes – but it's strongly recommended to use a [fixed identity](direct-lake-fixed-identity.md) cloud connection | Yes | Yes |
| Semantic model object-level security (OLS) | Yes | Yes | Yes | Yes |
| Large data volumes without refresh requirement | Yes | Yes |No | Yes |
| Reduce data latency | Yes – when [automatic updates](direct-lake-how-it-works.md#automatic-updates) is enabled, or programmatic reframing | Yes – when [automatic updates](direct-lake-how-it-works.md#automatic-updates) is enabled, or programmatic reframing | No  | Yes |
| Power BI Embedded | Yes <sup>2</sup> | Yes <sup>2</sup> | Yes | Yes |

<sup>1</sup> When using Direct Lake on SQL endpoints, you can't combine Direct Lake storage mode tables with DirectQuery or Dual storage mode tables *in the same semantic model*. However, you can use Power BI Desktop to create a composite model on a Direct Lake semantic model and then extend it with new tables (by using Import, DirectQuery, or Dual storage mode) or calculations. For more information, see [Build a composite model on a semantic model](/power-bi/transform-model/desktop-composite-models#building-a-composite-model-on-a-semantic-model-or-model).

<sup>2</sup> Requires a V2 embed token. If you're using a service principal, you must use a [fixed identity](direct-lake-fixed-identity.md) cloud connection.

For details on how Direct Lake works, including column loading (transcoding), framing, automatic updates, and DirectQuery fallback, see [How Direct Lake works](direct-lake-how-it-works.md).

For details on permissions, authentication, OLS/RLS, and data-access rule options, see [Integrate Direct Lake security](direct-lake-security-integration.md).

## Fabric capacity requirements

Direct Lake semantic models require a [Fabric capacity license](../enterprise/licenses.md#capacity). Also, there are capacity guardrails and limitations that apply to your Fabric capacity subscription (SKU), as presented in the following table.

> [!IMPORTANT]
> The first column in the following table also includes Power BI Premium capacity subscriptions (P SKUs). Microsoft is consolidating purchase options and retiring the Power BI Premium per capacity SKUs. New and existing customers should consider purchasing Fabric capacity subscriptions (F SKUs) instead.
>
> For more information, see [Important update coming to Power BI Premium licensing](https://powerbi.microsoft.com/blog/important-update-coming-to-power-bi-premium-licensing/) and [Power BI Premium](/power-bi/enterprise/service-premium-faq).

| Fabric SKU | Parquet files per table | Row groups per table | Rows per table (millions) | Max model size on disk/OneLake (GB) | Max memory (GB) <sup>1</sup> |
| --- | --: | --: | --: | --: | --: |
| F2  | 1,000 | 1,000 | 300 | 10  | 3   |
| F4  | 1,000 | 1,000 | 300 | 10  | 3   |
| F8  | 1,000 | 1,000 | 300 | 10  | 3   |
| F16 | 1,000 | 1,000 | 300 | 20  | 5   |
| F32 | 1,000 | 1,000 | 300 | 40  | 10  |
| F64/FT1/P1 | 5,000 | 5,000 | 1,500 | Unlimited | 25  |
| F128/P2 | 5,000 | 5,000 | 3,000 | Unlimited | 50  |
| F256/P3 | 5,000 | 5,000 | 6,000 | Unlimited | 100 |
| F512/P4 | 10,000 | 10,000 | 12,000 | Unlimited | 200 |
| F1024/P5 | 10,000 | 10,000 | 24,000 | Unlimited | 400 |
| F2048 | 10,000 | 10,000 | 24,000 | Unlimited | 400 |

<sup>1</sup> For Direct Lake semantic models, _Max Memory_ represents the upper memory resource limit for how much data can be paged in. For this reason, it's not a guardrail because exceeding it doesn't result in a fallback to DirectQuery mode; however, it can have a performance impact if the amount of data is large enough to cause excessive paging in and out of the model data from the OneLake data.

If exceeded, the _Max model size on disk/OneLake_ causes all queries to the semantic model to fall back to DirectQuery mode. All other guardrails presented in the table are evaluated per query. It's therefore important that you [optimize your Delta tables](direct-lake-understand-storage.md) and [Direct Lake semantic model](direct-lake-develop.md#develop-direct-lake-semantic-models) to avoid having to unnecessarily scale up to a higher Fabric SKU.

Additionally, _Capacity unit_ and _Max memory per query limits_ apply to Direct Lake semantic models. For more information, see [Capacities and SKUs](/power-bi/enterprise/service-premium-what-is#capacities-and-skus).

## Considerations and limitations

Direct Lake semantic models present some considerations and limitations.

> [!NOTE]
> The capabilities and features of Direct Lake semantic models are evolving rapidly. Be sure to check back periodically to review the latest list of considerations and limitations.

Direct Lake on OneLake table storage mode is in public preview. Enable the tenant setting **User can create Direct Lake on OneLake semantic models (preview)** in the admin portal to create semantic models with Direct Lake on OneLake tables.

|Consideration / limitation  |Direct Lake on OneLake  |Direct Lake on SQL (analytics endpoint)  |
|---------|---------|---------|
|When the SQL analytics endpoint enforces row-level security, DAX queries are processed differently depending on the type of Direct Lake mode employed. <br><br>When Direct Lake on OneLake is employed, queries will succeed, and SQL based RLS is not applied. Direct Lake on OneLake requires the user has access to the files in OneLake, which doesn't observe SQL based RLS. |Queries will succeed.         |Yes, unless fallback is disabled in which case queries will fail.         |
|If a table in the semantic model is based on a (non-materialized) SQL view, DAX queries are processed differently depending on the type of Direct Lake mode employed.<br><br>Direct Lake on SQL endpoints will fall back to DirectQuery in this case.<br><br>It isn't supported to create a Direct Lake on OneLake table based on a non-materialized SQL view. You can instead use a lakehouse materialized view because Delta tables are created. Alternatively, use a different storage mode such as Import or DirectLake for tables based on non-materialized SQL views. |Not applicable         |Yes, unless fallback is disabled in which case queries will fail.         |
|Composite modeling, which means Direct Lake semantic model tables can be mixed with tables in other storage modes, such as Import, DirectQuery, or Dual (except for special cases, including [calculation groups](/power-bi/transform-model/calculation-groups), [what-if parameters](/power-bi/transform-model/desktop-what-if), and [field parameters](/power-bi/create-reports/power-bi-field-parameters)).     |Supported        |Not supported         |
|Calculated columns and calculated tables that reference columns or tables in Direct Lake storage mode. [Calculation groups](/power-bi/transform-model/calculation-groups), [what-if parameters](/power-bi/transform-model/desktop-what-if), and [field parameters](/power-bi/create-reports/power-bi-field-parameters), which implicitly create calculated tables, and calculated tables that don't reference Direct Lake columns or tables are supported in all scenarios.     |Not supported         |Not supported         |
|Direct Lake storage mode tables don't support complex Delta table column types. Binary and GUID semantic types are also unsupported. You must convert these data types into strings or other supported data types.     |Not supported         |Not supported         |
|Table relationships require the data types of related columns to match.     |Yes |Yes|
|One-side columns of relationships must contain unique values. Queries fail if duplicate values are detected in a one-side column.     |Yes |Yes|
|[Auto date/time intelligence in Power BI Desktop](/power-bi/transform-model/desktop-auto-date-time) to create relationships using only the date part of a datetime column. Note: [Marking your own date table as a date table](/power-bi/transform-model/desktop-date-tables) and creating relationships using date columns is supported.      |Supported |Not supported|
|The length of string column values is limited to 32,764 Unicode characters.     |Yes |Yes|
|Non-numeric floating point values, such as *NaN* (not a number), aren't supported.     |Yes |Yes|
|[Publish to web from Power BI](/power-bi/collaborate-share/service-publish-to-web) using a service principal is only supported when using a [fixed identity for the Direct Lake semantic model](/fabric/fundamentals/direct-lake-manage).     |Yes |Yes|
|In the [web modeling experience](/power-bi/transform-model/service-edit-data-models), validation is limited for Direct Lake semantic models. User selections are assumed to be correct, and no queries are issued to validate cardinality or cross filter selections for relationships, or for the selected date column in a marked date table.     |Yes |Yes|
|In the Fabric portal, the *Direct Lake* tab in the refresh history lists Direct Lake-related refresh failures. Successful refresh (framing) operations aren't typically listed unless the refresh status changes, such as from no previous run or refresh failure to refresh success or refresh success with warning.     |Yes |Yes|
|Your Fabric SKU determines the maximum available memory per Direct Lake semantic model for the capacity. When the limit is exceeded, queries to the semantic model might be slower due to excessive paging in and out of the model data.     |Yes |Yes|
|Creating a Direct Lake semantic model in a workspace that is in a different region of the data source workspace isn't supported. For example, if the Lakehouse is in West Central US, then you can only create semantic models from this Lakehouse in the same region. To find what region you are in, see [find your Fabric home region](/fabric/admin/find-fabric-home-region).     |Yes |Yes<br><br>A workaround is to create a lakehouse in the other region's workspace and shortcut to the tables before creating the semantic model. |
|Embedding reports requires a [V2 embed token](/power-bi/developer/embedded/generate-embed-token).     |Yes |Yes|
|Service principal profiles for authentication.     |Not supported |Not supported|
|Power BI Direct Lake semantic models can be created and queried by Service Principals and Viewer role membership with Service Principals is supported, but the default Direct Lake semantic models on lakehouse/warehouse don't support this scenario.     |Yes         |Yes         |
|Shortcuts in a lakehouse can be used as data sources for semantic model tables.     |Not supported during public preview         |Supported         |
|Create Direct Lake models in personal workspaces (My Workspace).     |Not supported         |Not supported         |
|Deployment pipeline rules to rebind data source.   |Not supported directly - can create a parameter expression to use in the connection string.   |Supported   |
|Adding multiple tables from the same data source table.   |Not supported in Power BI Desktop or web modeling. It is possible to add multiple tables from the same data source table using XMLA-based external tools. Using **Edit tables** in Power BI tooling and **refresh** result in an error with multiple tables from the same data source table in the semantic model.  |Not supported in Power BI Desktop or web modeling. It is possible to add multiple tables from the same data source table using XMLA-based external tools. Using **Edit tables** in Power BI tooling and **refresh** result in an error with multiple tables from the same data source table in the semantic model. |
|Direct Lake tables created by using XMLA applications are initially in an unprocessed state until the application sends a refresh command. Be sure to refresh the model to process its tables when you create a new semantic model.     |Queries involving unprocessed tables return an error.         |Queries involving unprocessed tables fall back to DirectQuery mode, unless fallback is disabled in which case queries fail.         |
|XMLA-compliant tools must support `compatibilityLevel` 1604 or higher to work with Direct Lake semantic models and expose Direct Lake-specific  metadata.     |Yes         |Yes         |

- Analyze in Excel pivot tables (and other MDX clients) have the same limitations as DirectQuery with Direct Lake tables in the semantic model. Session-scoped MDX statements, such as named sets, calculated members, default members, etc. are not supported. Query-scoped MDX statements, such as the 'WITH' clause, are supported. Direct Lake table user-defined hierarchies are not supported. Import table user-defined hierarchies are supported even with Direct Lake tables in the semantic model.

- Power BI Desktop can live edit a semantic model with Direct Lake tables and import tables. [Calculation groups](/power-bi/transform-model/calculation-groups), [what-if parameters](/power-bi/transform-model/desktop-what-if), and [field parameters](/power-bi/create-reports/power-bi-field-parameters), which implicitly create calculated tables, and calculated tables that don't reference Direct Lake columns or tables can also be included.
  
- Power BI web modeling can open any semantic model, including Direct Lake tables with other storage mode tables.

- DAX query view when live editing or live connected, and writing DAX queries in the web, are supported for Direct Lake on SQL, Direct Lake on OneLake, and true composite (Direct Lake on OneLake + import from any data source) semantic models.

- TMDL view is supported when live editing in Power BI Desktop.

- Creating reports with a live connection is supported for all semantic models, when the report author has at least build access.

- Direct Lake on SQL connection expression in the semantic model must refer to the SQL analytics endpoint by GUID, not by friendly name, to use **Edit tables** and **refresh** operations in Power BI Desktop and Power BI web modeling. The connection expression can be updated in TMDL view or XMLA based external tools. The GUID is available in the URL when viewing the SQL analytics endpoint in the browser.
  
## Related content

- [Cross-workload table maintenance and optimization](table-maintenance-optimization.md)
- [Develop Direct Lake semantic models](direct-lake-develop.md)
- [Manage Direct Lake semantic models](direct-lake-manage.md)
- [Understand Direct Lake query performance](direct-lake-understand-storage.md)
- [Analyze query processing for Direct Lake semantic models](direct-lake-analyze-query-processing.md)

