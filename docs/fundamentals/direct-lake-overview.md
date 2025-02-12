---
title: "Direct Lake overview"
description: "Learn about Direct Lake storage mode in Microsoft Fabric and when you should use it."
author: peter-myers
ms.author: phseamar
ms.reviewer: davidi
ms.date: 01/07/2025
ms.topic: conceptual
ms.custom: fabric-cat
---

# Direct Lake overview

Direct Lake is a storage mode option for tables in a Power BI semantic model that's stored in a Microsoft Fabric workspace. It's optimized for large volumes of data that can be quickly loaded into memory from [Delta tables](../data-engineering/lakehouse-and-delta-tables.md), which store their data in Parquet files in [OneLake](../onelake/onelake-overview.md)—the single store for all analytics data. Once loaded into memory, the semantic model enables high performance queries. Direct Lake eliminates the slow and costly need to import data into the model.

You can use Direct Lake storage mode to connect to the tables or views of a single [Fabric lakehouse](../data-engineering/lakehouse-overview.md) or [Fabric warehouse](../data-warehouse/data-warehousing.md). Both of these Fabric items and Direct Lake semantic models require a [Fabric capacity license](../enterprise/licenses.md#capacity).

:::image type="content" source="media/direct-lake-overview/direct-lake-overview.svg" alt-text="Diagram shows a Direct Lake semantic model and how it connects to Delta tables in OneLake as described in the previous paragraphs." border="false":::

In some ways, a Direct Lake semantic model is similar to an [Import semantic model](/power-bi/connect-data/service-dataset-modes-understand#import-mode). That's because model data is loaded into memory by the VertiPaq engine for fast query performance (except in the case of [DirectQuery fallback](#directquery-fallback), which is explained later in this article).

However, a Direct Lake semantic model differs from an Import semantic model in an important way. That's because a refresh operation for a Direct Lake semantic model is conceptually different to a refresh operation for an Import semantic model. For a Direct Lake semantic model, a refresh involves a [framing](#framing) operation (described later in this article), which can take a few seconds to complete. It's a low-cost operation where the semantic model analyzes the metadata of the latest version of the Delta tables and is updated to reference the latest files in OneLake. In contrast, for an Import semantic model, a refresh produces a copy of the data, which can take considerable time and consume significant data source and capacity resources (memory and CPU).

> [!NOTE]
> [Incremental refresh](/power-bi/connect-data/incremental-refresh-overview) for an Import semantic model can help to reduce refresh time and use of capacity resources.

## When should you use Direct Lake storage mode?

The primary use case for a Direct Lake storage mode is typically for IT-driven analytics projects that use lake-centric architectures. In this scenario, you have—or expect to accumulate—large volumes of data in OneLake. The fast loading of that data into memory, frequent and fast refresh operations, efficient use of capacity resources, and fast query performance are all important for this use case.

> [!NOTE]
> Import and DirectQuery semantic models are still relevant in Fabric, and they're the right choice of semantic model for some scenarios. For example, Import storage mode often works well for a self-service analyst who needs the freedom and agility to act quickly, and without dependency on IT to add new data elements.
>
> Also, [OneLake integration](/power-bi/enterprise/onelake-integration-overview) automatically writes data for tables in Import storage mode to [Delta tables](/azure/databricks/introduction/delta-comparison) in OneLake without involving any migration effort. By using this option, you can realize many of the benefits of Fabric that are made available to Import semantic model users, such as integration with lakehouses through shortcuts, SQL queries, notebooks, and more. We recommend that you consider this option as a quick way to reap the benefits of Fabric without necessarily or immediately re-designing your existing data warehouse and/or analytics system.

Direct Lake storage mode is also suitable for minimizing data latency to quickly make data available to business users. If your Delta tables are modified intermittently (and assuming you already did data preparation in the data lake), you can depend on [automatic updates](#automatic-updates) to reframe in response to those modifications. In this case, queries sent to the semantic model return the latest data. This capability works well in partnership with the [automatic page refresh](/power-bi/create-reports/desktop-automatic-page-refresh) feature of Power BI reports.

Keep in mind that Direct Lake depends on data preparation being done in the data lake. Data preparation can be done by using various tools, such as Spark jobs for Fabric lakehouses, T-SQL DML statements for Fabric warehouses, dataflows, pipelines, and others. This approach helps ensure data preparation logic is performed as low as possible in the architecture to maximize reusability. However, if the semantic model author doesn't have the ability to modify the source item, for example, if a self-service analyst doesn't have write permissions on a lakehouse that is managed by IT, then Import storage mode might be a better choice. That's because it supports data preparation by using Power Query, which is defined as part of semantic model.

Be sure to factor in your current [Fabric capacity license](../enterprise/licenses.md#capacity) and the [Fabric capacity guardrails](#fabric-capacity-guardrails-and-limitations) when you consider Direct Lake storage mode. Also, factor in the [considerations and limitations](#considerations-and-limitations), which are described later in this article.

> [!TIP]
> We recommend that you produce a [prototype](/power-bi/guidance/powerbi-implementation-planning-usage-scenario-prototyping-and-sharing)—or proof of concept (POC)—to determine whether a Direct Lake semantic model is the right solution, and to mitigate risk.

## How Direct Lake works

Typically, queries sent to a Direct Lake semantic model are handled from an in-memory cache of the columns sourced from Delta tables. The underlying storage for a Delta table is one or more Parquet files in OneLake. Parquet files organize data by columns rather than rows. Semantic models load entire columns from Delta tables into memory as they're required by queries.

A Direct Lake semantic model might also use _DirectQuery fallback_, which involves seamlessly switching to [DirectQuery mode](/power-bi/connect-data/service-dataset-modes-understand#directquery-mode). DirectQuery fallback retrieves data directly from the [SQL analytics endpoint of the lakehouse](../data-engineering/lakehouse-sql-analytics-endpoint.md) or the warehouse. For example, fallback might occur when a Delta table contains more rows of data than supported by your Fabric capacity ([described later](#fabric-capacity-guardrails-and-limitations) in this article). In this case, a DirectQuery operation sends a query to the SQL analytics endpoint. Fallback operations might result in slower query performance.

The following diagram shows how Direct Lake works by using the scenario of a user who opens a Power BI report.

:::image type="content" source="media/direct-lake-overview/direct-lake-how-works.svg" alt-text="Diagram shows how Direct Lake semantic models work. Concepts shown in the image are described in the following table." border="false":::

The diagram depicts the following user actions, processes, and features.

| Item | Description |
| --- | --- |
| :::image type="icon" source="../media/legend-number/legend-number-01-fabric.svg"::: | OneLake is a data lake that stores analytics data in Parquet format. This file format is [optimized](direct-lake-understand-storage.md#optimize) for storing data for Direct Lake semantic models. |
| :::image type="icon" source="../media/legend-number/legend-number-02-fabric.svg"::: | A Fabric lakehouse or Fabric warehouse exists in a workspace that's on Fabric capacity. The lakehouse has a SQL analytics endpoint, which provides a SQL-based experience for querying. Tables (or views) provide a means to query the Delta tables in OneLake by using Transact-SQL (T-SQL). |
| :::image type="icon" source="../media/legend-number/legend-number-03-fabric.svg"::: | A Direct Lake semantic model exists in a Fabric workspace. It connects to tables or views in either the lakehouse or warehouse. |
| :::image type="icon" source="../media/legend-number/legend-number-04-fabric.svg"::: | A user opens a Power BI report. |
| :::image type="icon" source="../media/legend-number/legend-number-05-fabric.svg"::: | The Power BI report sends Data Analysis Expressions (DAX) queries to the Direct Lake semantic model. |
| :::image type="icon" source="../media/legend-number/legend-number-06-fabric.svg"::: | When possible (and necessary), the semantic model loads columns into memory directly from the Parquet files stored in OneLake. Queries achieve in-memory performance, which is very fast. |
| :::image type="icon" source="../media/legend-number/legend-number-07-fabric.svg"::: | The semantic model returns query results. |
| :::image type="icon" source="../media/legend-number/legend-number-08-fabric.svg"::: | The Power BI report renders the visuals. |
| :::image type="icon" source="../media/legend-number/legend-number-09-fabric.svg"::: | In certain circumstances, such as when the semantic model exceeds the [guardrails](#fabric-capacity-guardrails-and-limitations) of the capacity, semantic model queries automatically fall back to DirectQuery mode. In this mode, queries are sent to the SQL analytics endpoint of the lakehouse or warehouse. |
| :::image type="icon" source="../media/legend-number/legend-number-10-fabric.svg"::: | DirectQuery queries sent to the SQL analytics endpoint in turn query the Delta tables in OneLake. For this reason, query performance might be slower than in-memory queries. |

The following sections describe Direct Lake concepts and features, including column loading, framing, automatic updates, and DirectQuery fallback.

### Column loading (transcoding)

Direct Lake semantic models only load data from OneLake as and when columns are queried for the first time. The process of loading data on-demand from OneLake is known as _transcoding_.

When the semantic model receives a DAX (or Multidimensional Expressions—MDX) query, it first determines what columns are needed to produce a query result. Any column directly used by the query is needed, and also columns required by relationships and measures. Typically, the number of columns needed to produce a query result is significantly smaller than the number of columns defined in the semantic model.

Once it understands which columns are needed, the semantic model determines which columns are already in memory. If any columns needed for the query aren't in memory, the semantic model loads all data for those columns from OneLake. Loading column data is typically a fast operation, however it can depend on factors such as the cardinality of data stored in the columns.

Columns loaded into memory are then _resident_ in memory. Future queries that involve only resident columns don't need to load any more columns into memory.

A column remains resident until there's reason for it to be removed (evicted) from memory. Reasons that columns might get removed include:

- The model or table was refreshed after a Delta table update at the source (see [Framing](#framing) in the next section).
- No query used the column for some time.
- Other memory management reasons, including memory pressure in the capacity due to other, concurrent operations.

Your choice of Fabric SKU determines the maximum available memory for each Direct Lake semantic model on the capacity. For more information about resource guardrails and maximum memory limits, see [Fabric capacity guardrails and limitations](/power-bi/enterprise/service-premium-what-is#capacities-and-skus) later in this article.

### Framing

_Framing_ provides model owners with point-in-time control over what data is loaded into the semantic model. Framing is a Direct Lake operation triggered by a refresh of a semantic model, and in most cases takes only a few seconds to complete. That's because it's a low-cost operation where the semantic model analyzes the metadata of the latest version of the Delta Lake tables and is updated to reference the latest Parquet files in OneLake.

When framing occurs, resident table column segments and dictionaries might be evicted from memory if the underlying data has changed and the point in time of the refresh becomes the new baseline for all future transcoding events. From this point, Direct Lake queries only consider data in the Delta tables as of the time of the most recent framing operation. For that reason, Direct Lake tables are queried to return data based on the state of the Delta table _at the point of the most recent framing operation_. That time isn't necessarily the latest state of the Delta tables.

Note that the semantic model analyzes the Delta log of each Delta table during framing to drop only the affected column segments and to reload newly added data during transcoding. An important optimization is that dictionaries will usually not be dropped when incremental framing takes effect, and new values are added to the existing dictionaries. This incremental framing approach helps to reduce the reload burden and benefits query performance. In the ideal case, when a Delta table received no updates, no reload is necessary for columns already resident in memory and queries show far less performance impact after framing because incremental framing essentially enables the semantic model to update substantial portions of the existing in-memory data in place.

The following diagram shows how Direct Lake framing operations work.

:::image type="content" source="media/direct-lake-overview/direct-lake-framing.svg" alt-text="Diagram shows how Direct Lake framing operations work." border="false":::

The diagram depicts the following processes and features.

| Item | Description |
| --- | --- |
| :::image type="icon" source="../media/legend-number/legend-number-01-fabric.svg"::: | A semantic model exists in a Fabric workspace. |
| :::image type="icon" source="../media/legend-number/legend-number-02-fabric.svg"::: | Framing operations take place periodically, and they set the baseline for all future [transcoding](#column-loading-transcoding) events. Framing operations can happen automatically, manually, on schedule, or programmatically. |
| :::image type="icon" source="../media/legend-number/legend-number-03-fabric.svg"::: | OneLake stores metadata and Parquet files, which are represented as Delta tables. |
| :::image type="icon" source="../media/legend-number/legend-number-04-fabric.svg"::: | The last framing operation includes Parquet files related to the Delta tables, and specifically the Parquet files that were added before the _last_ framing operation. |
| :::image type="icon" source="../media/legend-number/legend-number-05-fabric.svg"::: | A later framing operation includes Parquet files added after the _last_ framing operation. |
| :::image type="icon" source="../media/legend-number/legend-number-06-fabric.svg"::: | Resident columns in the Direct Lake semantic model might be evicted from memory, and the point in time of the refresh becomes the new baseline for all future transcoding events. |
| :::image type="icon" source="../media/legend-number/legend-number-07-fabric.svg"::: | Subsequent data modifications, represented by new Parquet files, aren't visible until the next framing operation occurs. |

It's not always desirable to have data representing the latest state of any Delta table when a transcoding operation takes place. Consider that framing can help you provide consistent query results in environments where data in Delta tables is transient. Data can be transient for several reasons, such as when long-running extract, transform, and load (ETL) processes occur.

Refresh for a Direct Lake semantic model can be done manually, automatically, or programmatically. For more information, see [Refresh Direct Lake semantic models](direct-lake-manage.md#refresh-direct-lake-semantic-models).

For more information about Delta table versioning and framing, see [Understand storage for Direct Lake semantic models](direct-lake-understand-storage.md#data-versioning).

### Automatic updates

There's a semantic model-level setting to automatically update Direct Lake tables. It's enabled by default. It ensures that data changes in OneLake are automatically reflected in the Direct Lake semantic model. You should disable automatic updates when you want to control data changes by framing, which was explained in the previous section. For more information, see [Manage Direct Lake semantic models](direct-lake-manage.md#automatic-updates).

> [!TIP]
> You can set up [automatic page refresh](/power-bi/create-reports/desktop-automatic-page-refresh) in your Power BI reports. It's a feature that automatically refreshes a specific report page providing that the report connects to a Direct Lake semantic model (or other types of semantic model).

### DirectQuery fallback

A query sent to a Direct Lake semantic model can fall back to [DirectQuery mode](/power-bi/connect-data/service-dataset-modes-understand#directquery-mode). In this case, it retrieves data directly from the SQL analytics endpoint of the lakehouse or warehouse. Such queries always return the latest data because they're not constrained to the point in time of the last framing operation.

A query _always_ falls back when the semantic model queries a view in the SQL analytics endpoint, or a table in the SQL analytics endpoint that [enforces row-level security (RLS)](direct-lake-develop.md#enforce-data-access-rules).

Also, a query might fall back when the semantic model [exceeds the guardrails of the capacity](#fabric-capacity-guardrails-and-limitations).

> [!IMPORTANT]
> If possible, you should always design your solution—or size your capacity—to avoid DirectQuery fallback. That's because it might result in slower query performance.

You can control fallback of your Direct Lake semantic models by setting its _DirectLakeBehavior_ property. For more information, see [Set the Direct Lake behavior property](direct-lake-manage.md#set-the-direct-lake-behavior-property).

## Fabric capacity guardrails and limitations

Direct Lake semantic models require a [Fabric capacity license](../enterprise/licenses.md#capacity). Also, there are capacity guardrails and limitations that apply to your Fabric capacity subscription (SKU), as presented in the following table.

> [!IMPORTANT]
> The first column in the following table also includes Power BI Premium capacity subscriptions (P SKUs). Be aware that Microsoft is consolidating purchase options and retiring the Power BI Premium per capacity SKUs. New and existing customers should consider purchasing Fabric capacity subscriptions (F SKUs) instead.
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

If exceeded, the _Max model size on disk/OneLake_ causes all queries to the semantic model to fall back to DirectQuery mode. All other guardrails presented in the table are evaluated per query. It's therefore important that you [optimize your Delta tables](direct-lake-understand-storage.md#delta-table-optimization) and [Direct Lake semantic model](direct-lake-develop.md#develop-direct-lake-semantic-models) to avoid having to unnecessarily scale up to a higher Fabric SKU (resulting in increased cost).

Additionally, _Capacity unit_ and _Max memory per query limits_ apply to Direct Lake semantic models. For more information, see [Capacities and SKUs](/power-bi/enterprise/service-premium-what-is#capacities-and-skus).

## Considerations and limitations

Direct Lake semantic models present some considerations and limitations.

> [!NOTE]
> The capabilities and features of Direct Lake semantic models are evolving. Be sure to check back periodically to review the latest list of considerations and limitations.

- When a Direct Lake semantic model table connects to a table in the SQL analytics endpoint that enforces row-level security (RLS), queries that involve that model table will always fall back to DirectQuery mode. Query performance might be slower.
- When a Direct Lake semantic model table connects to a view in the SQL analytics endpoint, queries that involve that model table will always fall back to DirectQuery mode. Query performance might be slower.
- Composite modeling isn't supported. That means Direct Lake semantic model tables can't be mixed with tables in other storage modes, such as Import, DirectQuery, or Dual (except for special cases, including [calculation groups](/power-bi/transform-model/calculation-groups), [what-if parameters](/power-bi/transform-model/desktop-what-if), and [field parameters](/power-bi/create-reports/power-bi-field-parameters)).
- Calculated columns and calculated tables that reference columns or tables in Direct Lake storage mode aren't supported. [Calculation groups](/power-bi/transform-model/calculation-groups), [what-if parameters](/power-bi/transform-model/desktop-what-if), and [field parameters](/power-bi/create-reports/power-bi-field-parameters), which implicitly create calculated tables, and calculated tables that don't reference Direct Lake columns or tables are supported. 
- Direct Lake storage mode tables don't support complex Delta table column types. Binary and GUID semantic types are also unsupported. You must convert these data types into strings or other supported data types.
- Table relationships require the data types of related columns to match.
- One-side columns of relationships must contain unique values. Queries fail if duplicate values are detected in a one-side column.
- [Auto data/time intelligence in Power BI Desktop](/power-bi/transform-model/desktop-auto-date-time) isn't supported. [Marking your own date table](/power-bi/transform-model/desktop-date-tables) as a date table is supported.
- The length of string column values is limited to 32,764 Unicode characters.
- The floating point value _NaN_ (not a number) isn't supported.
- [Publish to web from Power BI](/power-bi/collaborate-share/service-publish-to-web) using a service principal is only supported when using a [fixed identity for the Direct Lake semantic model](direct-lake-manage.md#sharable-cloud-connection).
- In the [web modeling experience](/power-bi/transform-model/service-edit-data-models), validation is limited for Direct Lake semantic models. User selections are assumed to be correct, and no queries are issued to validate cardinality or cross filter selections for relationships, or for the selected date column in a marked date table.
- In the Fabric portal, the _Direct Lake_ tab in the refresh history lists only Direct Lake-related refresh failures. Successful refresh (framing) operations aren't listed.
- Your Fabric SKU determines the maximum available memory per Direct Lake semantic model for the capacity. When the limit is exceeded, queries to the semantic model might be slower due to excessive paging in and out of the model data.
- Creating a Direct Lake semantic model in a workspace that is in a different region of the data source workspace is not supported. For example, if the Lakehouse is in West Central US, then you can only create semantic models from this Lakehouse in the same region. A workaround is to create a Lakehouse in the other region's workspace and shortcut to the tables before creating the semantic model. To find what region you are in, see [find your Fabric home region](/fabric/admin/find-fabric-home-region).
- You can create and view a custom Direct Lake semantic model using a Service Principal identity, but the default Direct Lake semantic model does not support Service Principals. Make sure service principal authentication is enabled for Fabric REST APIs in your tenant and grant the service principal Contributor or higher permissions to the workspace of your Direct Lake semantic model.
- Embedding reports requires a [V2 embed token](/power-bi/developer/embedded/generate-embed-token).
- Direct Lake does not support service principal profiles for authentication.
- Customized Direct Lake semantic models created by Service Principal and viewer with Service Principal are supported, but default Direct Lake semantic models are not supported.

## Comparison to other storage modes

The following table compares Direct Lake storage mode to Import and DirectQuery storage modes.

| Capability | Direct Lake | Import | DirectQuery |
| --- | --- | --- | --- |
| Licensing | Fabric capacity subscription (SKUs) only | Any Fabric or Power BI license (including Microsoft Fabric Free licenses) | Any Fabric or Power BI license (including Microsoft Fabric Free licenses) |
| Data source | Only lakehouse or warehouse tables (or views) | Any connector | Any connector that supports DirectQuery mode |
| Connect to SQL analytics endpoint views | Yes – but will automatically fall back to DirectQuery mode | Yes | Yes |
| Composite models | No <sup>1</sup> | Yes – can combine with DirectQuery or Dual storage mode tables | Yes – can combine with Import or Dual storage mode tables |
| Single sign-on (SSO) | Yes | Not applicable | Yes |
| Calculated tables | No – except [calculation groups](/power-bi/transform-model/calculation-groups), [what-if parameters](/power-bi/transform-model/desktop-what-if), and [field parameters](/power-bi/create-reports/power-bi-field-parameters), which implicitly create calculated tables | Yes | No – calculated tables use Import storage mode even when they refer to other tables in DirectQuery mode |
| Calculated columns | No  | Yes | Yes |
| Hybrid tables | No  | Yes | Yes |
| Model table partitions | No – however [partitioning](direct-lake-understand-storage.md#table-partitioning) can be done at the Delta table level | Yes – either automatically created by incremental refresh, or [manually created](/power-bi/connect-data/incremental-refresh-xmla#partitions) by using the XMLA endpoint | No  |
| User-defined aggregations | No  | Yes | Yes |
| SQL analytics endpoint object-level security or column-level security | Yes – but queries will fall back to DirectQuery mode and might produce errors when permission is denied | Yes – but must duplicate permissions with semantic model object-level security | Yes – but queries might produce errors when permission is denied |
| SQL analytics endpoint row-level security (RLS) | Yes – but queries will fall back to DirectQuery mode | Yes – but must duplicate permissions with semantic model RLS | Yes |
| Semantic model row-level security (RLS) | Yes – but it's strongly recommended to use a [fixed identity](direct-lake-fixed-identity.md) cloud connection | Yes | Yes |
| Semantic model object-level security (OLS) | Yes | Yes | Yes |
| Large data volumes without refresh requirement | Yes | Less suited – a larger capacity size might be required for querying and refreshing | Yes |
| Reduce data latency | Yes – when [automatic updates](#automatic-updates) is enabled, or programmatic reframing; however, [data preparation](direct-lake-understand-storage.md#delta-table-optimization) must be done upstream first | No  | Yes |
| Power BI Embedded | Yes <sup>2</sup> | Yes | Yes |

<sup>1</sup> You can't combine Direct Lake storage mode tables with DirectQuery or Dual storage mode tables _in the same semantic model_. However, you can use Power BI Desktop to create a composite model on a Direct Lake semantic model and then extend it with new tables (by using Import, DirectQuery, or Dual storage mode) or calculations. For more information, see [Build a composite model on a semantic model](/power-bi/transform-model/desktop-composite-models#building-a-composite-model-on-a-semantic-model-or-model).

<sup>2</sup> Requires a V2 embed token. If you're using a service principal, you must use a [fixed identity](direct-lake-fixed-identity.md) cloud connection.

## Related content

- [Develop Direct Lake semantic models](direct-lake-develop.md)
- [Manage Direct Lake semantic models](direct-lake-manage.md)
- [Understand storage for Direct Lake semantic models](direct-lake-understand-storage.md)
- [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md)
- [Analyze query processing for Direct Lake semantic models](direct-lake-analyze-query-processing.md)
