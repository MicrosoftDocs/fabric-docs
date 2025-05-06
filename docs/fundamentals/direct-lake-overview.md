---
title: "Direct Lake overview"
description: "Learn about Direct Lake storage mode in Microsoft Fabric and when you should use it."
author: peter-myers
ms.author: phseamar
ms.reviewer: davidi
ms.date: 04/25/2025
ms.topic: conceptual
ms.custom: fabric-cat
---

# Direct Lake overview

Direct Lake is a storage mode option for tables in a Power BI semantic model that's stored in a Microsoft Fabric workspace. It's optimized for large volumes of data that can be quickly loaded into memory from [Delta tables](../data-engineering/lakehouse-and-delta-tables.md) stored in [OneLake](../onelake/onelake-overview.md)—the single store for all analytics data. Once loaded into memory, the semantic model enables high performance interactive analysis.

:::image type="content" source="media/direct-lake-overview/direct-lake-overview.svg" alt-text="Diagram shows a Direct Lake semantic model and how it connects to Delta tables in OneLake as described in the previous paragraphs." border="false":::

Direct Lake is ideal for semantic models connecting to large Fabric lakehouses, warehouses, and other sources with Delta tables, especially when replicating the entire data volume into an Import model is challenging or impossible. Direct Lake queries are, like Import mode, processed by the VertiPaq query engine, whereas DirectQuery federates queries to the underlying data source. This means Direct Lake queries, like Import mode, normally outperform DirectQuery.

However, a Direct Lake differs from an Import mode in an important way: a refresh operation for a Direct Lake semantic model is conceptually different to a refresh operation for an Import semantic model. Import mode replicates the data and creates an entire cached copy of the data for the semantic model, whereas a Direct Lake refresh copies only metadata (known as [framing](#framing), described later in this article), which can take a few seconds to complete. The Direct Lake refresh is a low-cost operation that analyzes the metadata of the latest version of the Delta tables and is updated to reference the latest files in OneLake. In contrast, for an Import refresh produces a copy of the data, which can take considerable time and consume significant data source and capacity resources (memory and CPU). Direct Lake moves data preparation to OneLake and in doing so uses the full breadth of Fabric technologies for data prep, including Spark jobs, T-SQL DML statements, dataflows, pipelines, and more.

Direct Lake storage mode offers the following key benefits:

* Similar to Import mode, Direct Lake queries are processed by the VertiPaq engine, and thus delivers query performance comparable to Import mode without the management overhead of data refresh cycles to load the entire data volume. 
* Uses existing Fabric investments by seamlessly integrating with large lakehouses, warehouses, and other Fabric sources with Delta tables. For example, Direct Lake is an ideal choice for the *gold* analytics layer in the medallion lakehouse architecture.
* Maximizes Return on Investment (ROI) because analyzed data volumes can exceed the capacity’s max memory limits, since only the data that’s needed to answer a query is loaded into memory.
* Minimizes data latencies by quickly and automatically synchronizing a semantic model with its sources, making new data available to business users without refresh schedules.

## When should you use Direct Lake storage mode?

The primary use case for Direct Lake storage mode is typically for IT-driven analytics projects that use lake-centric architectures. In such scenarios, you have, or expect to accumulate, large volumes of data in OneLake. The fast loading of that data into memory, frequent and fast refresh operations, efficient use of capacity resources, and fast query performance are all important for this use case.

> [!NOTE]
> Import and DirectQuery semantic models are still relevant in Fabric, and they're the right choice of semantic model for some scenarios. For example, Import storage mode often works well for a self-service analyst who needs the freedom and agility to act quickly, and without dependency on IT to add new data elements.
>
> Also, [OneLake integration](/power-bi/enterprise/onelake-integration-overview) automatically writes data for tables in Import storage mode to [Delta tables](/azure/databricks/introduction/delta-comparison) in OneLake without involving any migration effort, which lets you realize many of the benefits of Fabric that are made available to Import semantic model users, such as integration with lakehouses through shortcuts, SQL queries, notebooks, and more. We recommend this option as a quick way to reap the benefits of Fabric without necessarily or immediately redesigning your existing data warehouse and/or analytics system.

Direct Lake depends on data preparation being done in the data lake. Data preparation can be done by using various tools, such as Spark jobs for Fabric lakehouses, T-SQL DML statements for Fabric warehouses, dataflows, pipelines, and others, which helps ensure data preparation logic is performed upstream in the architecture to maximize reusability. However, if the semantic model author doesn't have the ability to modify the source item, for example if a self-service analyst doesn't have write permissions on a lakehouse that is managed by IT, then augmenting the model with Import storage mode tables might be a good choice, since Import mode supports data preparation by using Power Query, which is defined as part of semantic model.

Be sure to consider your current [Fabric capacity license](../enterprise/licenses.md#capacity) and the [Fabric capacity guardrails](#fabric-capacity-requirements) when you consider Direct Lake storage mode. Also, factor in the [considerations and limitations](#considerations-and-limitations), which are described later in this article.


> [!TIP]
> We recommend that you produce a [prototype](/power-bi/guidance/powerbi-implementation-planning-usage-scenario-prototyping-and-sharing)—or proof of concept (POC)—to determine whether a Direct Lake semantic model is the right solution, and to mitigate risk.

## Key concepts and terminology

This article assumes familiarity with the following concepts:

* Users interact with visuals in Power BI reports, which generate DAX queries to the semantic model.
* **Storage mode**: The semantic model processes the DAX queries differently depending on the storage mode employed. For example:
    * Import and Direct Lake storage modes use the VertiPaq engine to process DAX queries and return results to the Power BI report and user.
    * DirectQuery, on the other hand, translates DAX queries to the query syntax of the data source (typically a form of SQL) and federates them to the underlying database. Source database query processors are often not geared to BI-style, aggregated queries and therefore result in slower performance and reduced user interactivity when compared to Import and Direct Lake modes.

Storage mode is a property of a table in the semantic model. When a semantic model includes tables with different storage modes, it's referred to as a composite model. For more information about storage modes, see [Semantic model modes in the Power BI service](/power-bi/connect-data/service-dataset-modes-understand).

* **Direct Lake mode** can use two different access methods:
    * **Direct Lake on OneLake** doesn't depend on SQL endpoints and can use data from any Fabric data source with Delta tables. Direct Lake on OneLake doesn't fall back to DirectQuery mode.

    > [!NOTE]
    > Direct Lake on OneLake is currently in public preview.
    
    * **Direct Lake on SQL endpoints** uses the SQL endpoint of a Fabric lakehouse or warehouse for Delta table discovery and permission checks. Direct Lake on SQL endpoints can fall back to DirectQuery mode when it can’t load the data directly from a Delta table, such as when the data source is a SQL view or when the Warehouse uses SQL-based Row-level Security (RLS). Direct Lake on SQL endpoints is generally available and fully supported in production.


## Comparison of storage modes

The following table compares Direct Lake storage mode to Import and DirectQuery storage modes.

| Capability | Direct Lake on OneLake | Direct Lake on SQL endpoints | Import | DirectQuery |
| --- | --- | --- | --- | --- |
| Licensing | Fabric capacity subscription (SKUs) only |Fabric capacity subscription (SKUs) only |  Any Fabric or Power BI license (including Microsoft Fabric Free licenses) | Any Fabric or Power BI license (including Microsoft Fabric Free licenses) |
| Data source | Tables of any Fabric data source backed by Delta tables | Only lakehouse or warehouse tables (or views) | Any connector | Any connector that supports DirectQuery mode |
| Connect to SQL analytics endpoint views |No | Yes – but will automatically fall back to DirectQuery mode | Yes | Yes |
| Composite models | No <sup>1</sup> |No <sup>1</sup> | Yes – can combine with DirectQuery or Dual storage mode tables | Yes – can combine with Import or Dual storage mode tables |
| Single sign-on (SSO) | Yes |Yes | Not applicable | Yes |
| Calculated tables |Yes – but calculations can't refer to columns of tables in Direct Lake mode. |No – except [calculation groups](/power-bi/transform-model/calculation-groups), [what-if parameters](/power-bi/transform-model/desktop-what-if), and [field parameters](/power-bi/create-reports/power-bi-field-parameters), which implicitly create calculated tables | Yes | No – calculated tables use Import storage mode even when they refer to other tables in DirectQuery mode |
| Calculated columns |Yes – but calculations can't refer to columns of tables in Direct Lake mode.| No  | Yes | Yes |
| Hybrid tables | No |No | Yes | Yes |
| Model table partitions | No – however [partitioning](direct-lake-understand-storage.md#table-partitioning) can be done at the Delta table level | No – however [partitioning](direct-lake-understand-storage.md#table-partitioning) can be done at the Delta table level | Yes – either automatically created by incremental refresh, or [manually created](/power-bi/connect-data/incremental-refresh-xmla#partitions) by using the XMLA endpoint | No  |
| User-defined aggregations | No |No  | Yes – Import aggregation tables on DirectQuery tables are supported | Yes |
| SQL analytics endpoint object-level security or column-level security | No |Yes – but might produce errors when permission is denied | Yes – but must duplicate permissions with semantic model object-level security | Yes – but queries might produce errors when permission is denied |
| SQL analytics endpoint row-level security (RLS) |No | Yes – but queries will fall back to DirectQuery mode | Yes – but must duplicate permissions with semantic model RLS | Yes |
| Semantic model row-level security (RLS) |Yes – but it's strongly recommended to use a [fixed identity](direct-lake-fixed-identity.md) cloud connection | Yes – but it's strongly recommended to use a [fixed identity](direct-lake-fixed-identity.md) cloud connection | Yes | Yes |
| Semantic model object-level security (OLS) | Yes | Yes | Yes | Yes |
| Large data volumes without refresh requirement | Yes | Yes |No | Yes |
| Reduce data latency | Yes – when [automatic updates](#automatic-updates) is enabled, or programmatic reframing | Yes – when [automatic updates](#automatic-updates) is enabled, or programmatic reframing | No  | Yes |
| Power BI Embedded | Yes <sup>2</sup> | Yes <sup>2</sup> | Yes | Yes |

<sup>1</sup> When using Direct Lake on SQL endpoints, you can't combine Direct Lake storage mode tables with DirectQuery or Dual storage mode tables *in the same semantic model*. However, you can use Power BI Desktop to create a composite model on a Direct Lake semantic model and then extend it with new tables (by using Import, DirectQuery, or Dual storage mode) or calculations. For more information, see [Build a composite model on a semantic model](/power-bi/transform-model/desktop-composite-models#building-a-composite-model-on-a-semantic-model-or-model).

<sup>2</sup> Requires a V2 embed token. If you're using a service principal, you must use a [fixed identity](direct-lake-fixed-identity.md) cloud connection.



## How Direct Lake works

Typically, queries sent to a Direct Lake semantic model are handled from an in-memory cache of the columns sourced from Delta tables. The underlying storage for a Delta table is one or more Parquet files in OneLake. Parquet files organize data by columns rather than rows. Semantic models load entire columns from Delta tables into memory as they're required by queries.

Direct Lake on OneLake isn't coupled with the SQL endpoint, offering tighter integration with OneLake features such as OneLake security and more efficient DAX query plans because, for example, checking for SQL based security isn't required. DirectQuery fallback isn't supported by Direct Lake on OneLake.

With Direct Lake on SQL endpoints, a DAX query might use *DirectQuery fallback*, which involves seamlessly switching to [DirectQuery mode](/power-bi/connect-data/service-dataset-modes-understand). DirectQuery fallback retrieves data directly from the [SQL analytics endpoint of the lakehouse](../data-engineering/lakehouse-sql-analytics-endpoint.md) or the warehouse. For example, fallback occurs when SQL based security is detected in the SQL endpoint. In this case, a DirectQuery operation sends a query to the SQL analytics endpoint. Fallback operations might result in slower query performance.

The following sections describe Direct Lake concepts and features, including column loading, framing, automatic updates, and DirectQuery fallback.

### Column loading (transcoding)

Direct Lake semantic models only load data from OneLake as and when columns are queried for the first time. The process of loading data on-demand from OneLake is known as *transcoding*.

When the semantic model receives a DAX (or Multidimensional Expressions—MDX) query, it first determines what columns are needed to produce a query result. Any column directly used by the query is needed, and also columns required by relationships and measures. Typically, the number of columns needed to produce a query result is significantly smaller than the number of columns defined in the semantic model.

Once it understands which columns are needed, the semantic model determines which columns are already in memory. If any columns needed for the query aren't in memory, the semantic model loads all data for those columns from OneLake. Loading column data is typically a fast operation, however it can depend on factors such as the cardinality of data stored in the columns.

Columns loaded into memory are then _resident_ in memory. Future queries that involve only resident columns don't need to load any more columns into memory.

A column remains resident until there's reason for it to be removed (evicted) from memory. Reasons that columns might get removed include:

- The model or table was refreshed after a Delta table update at the source (see [Framing](#framing) in the next section).
- No query used the column for some time.
- Other memory management reasons, including memory pressure in the capacity due to other, concurrent operations.

Your choice of Fabric SKU determines the maximum available memory for each Direct Lake semantic model on the capacity. For more information about resource guardrails and maximum memory limits, see [Fabric capacity guardrails and limitations](/power-bi/enterprise/service-premium-what-is#capacities-and-skus) later in this article.

### Framing

*Framing* provides model owners with point-in-time control over what data is loaded into the semantic model. Framing is a Direct Lake operation triggered by a refresh of a semantic model, and in most cases takes only a few seconds to complete. That's because it's a low-cost operation where the semantic model analyzes the metadata of the latest version of the Delta Lake tables and is updated to reference the latest Parquet files in OneLake.

When framing occurs, resident table column segments and dictionaries might be evicted from memory if the underlying data has changed and the point in time of the refresh becomes the new baseline for all future transcoding events. From this point, Direct Lake queries only consider data in the Delta tables as of the time of the most recent framing operation. For that reason, Direct Lake tables are queried to return data based on the state of the Delta table _at the point of the most recent framing operation_. That time isn't necessarily the latest state of the Delta tables.

The semantic model analyzes the Delta log of each Delta table during framing to drop only the affected column segments and to reload newly added data during transcoding. An important optimization is that dictionaries will usually not be dropped when incremental framing takes effect, and new values are added to the existing dictionaries. This incremental framing approach helps to reduce the reload burden and benefits query performance. In the ideal case, when a Delta table received no updates, no reload is necessary for columns already resident in memory and queries show far less performance impact after framing because incremental framing essentially enables the semantic model to update substantial portions of the existing in-memory data in place.

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


### Automatic updates

There's a semantic model-level setting to automatically update Direct Lake tables. It's enabled by default. It ensures that data changes in OneLake are automatically reflected in the Direct Lake semantic model. You should disable automatic updates when you want to control data changes by framing, which was explained in the previous section. For more information, see [Manage Direct Lake semantic models](direct-lake-manage.md#automatic-updates).

> [!TIP]
> You can set up [automatic page refresh](/power-bi/create-reports/desktop-automatic-page-refresh) in your Power BI reports. It's a feature that automatically refreshes a specific report page providing that the report connects to a Direct Lake semantic model (or other types of semantic model).

### DirectQuery fallback

When using Direct Lake on SQL endpoints, a query sent to a Direct Lake semantic model can fall back to [DirectQuery mode](/power-bi/connect-data/service-dataset-modes-understand) in which case the table no longer operates in Direct Lake mode. It retrieves data directly from the SQL analytics endpoint of the lakehouse or warehouse. Such queries always return the latest data because they're not constrained to the point in time of the last framing operation.

When DirectQuery fallback occurs, a query no longer uses Direct Lake mode. A query *can't* leverage Direct Lake mode when the semantic model queries a view in the SQL analytics endpoint, or a table in the SQL analytics endpoint that [enforces row-level security (RLS)](/fabric/fundamentals/direct-lake-develop). Also, a query *can't* leverage Direct Lake mode when a Delta table [exceeds the guardrails of the capacity](/fabric/fundamentals/direct-lake-overview).


> [!IMPORTANT]
> If possible, you should always design your solution—or size your capacity—to avoid DirectQuery fallback. That's because it might result in slower query performance.

You can control fallback of your Direct Lake semantic models by setting its _DirectLakeBehavior_ property. This setting only applies to Direct Lake on SQL endpoints. Direct Lake on OneLake doesn't support DirectQuery fallback. For more information, see [Set the Direct Lake behavior property](direct-lake-manage.md#set-the-direct-lake-behavior-property).


## Data security and access permissions

By default, Direct Lake uses single sign-on (SSO), which means that the identity that queries the semantic model (often a report user) must be authorized to access the data. Alternatively, you can bind a Direct Lake model to a sharable cloud connection (SCC) to provide a fixed identity and disable SSO. In this case, only the fixed identity requires read access to the data in the source.

### Fabric item permissions

Direct Lake semantic models adhere to a layered security model. They perform permission checks to determine whether the identity attempting to access the data has the necessary data access permissions in the source data item and the semantic model. Permissions can be assigned directly or acquired implicitly using [workspace roles in Microsoft Fabric](/fabric/fundamentals/roles-workspaces).

It's important to know that Direct Lake on OneLake and Direct Lake on SQL endpoints perform permission checks differently.

* Direct Lake on OneLake requires *Read* and *ReadAll* permissions on the lakehouse/warehouse to access Delta tables.
* Direct Lake on SQL endpoints requires *Read* and *ReadData* permissions on the lakehouse/warehouse to access data from the SQL analytics endpoint.

> [!NOTE]
> Direct Lake on OneLake requires that users have permission to read Delta tables in OneLake and not necessarily the SQL endpoint. This enforces a centralized security design in which OneLake is the single source of access control. 
> 
> Direct Lake on SQL endpoints, on the other hand, requires that users have read access to the SQL endpoint and not necessarily to Delta tables in OneLake. That's because Fabric grants the necessary permissions to the semantic model to read the Delta tables and associated Parquet files (to [load column data](#column-loading-transcoding) into memory). The semantic model also has the necessary permissions to periodically read the SQL analytics endpoint to perform permission checks to determine what data the querying user (or fixed identity) can access.

### Semantic model permissions

In addition to Fabric item permissions, you must also grant permissions to users so that they can use or manage the Direct Lake semantic model. In short, report consumers need *Read* permission, and report creators need additional *Build* permission. Semantic model permissions can be [assigned directly](/power-bi/connect-data/service-datasets-permissions) or [acquired implicitly using workspace roles](/power-bi/connect-data/service-datasets-permissions). To manage the semantic model settings (for refresh and other configurations), you must be the [semantic model owner](/power-bi/guidance/powerbi-implementation-planning-security-content-creator-planning).

### Permission requirements

Consider the following scenarios and permission requirements.


|Scenario  |Required permissions  |Comments  |
|---------|---------|---------|
|Users can view reports     |Grant *Read* permission for the reports and *Read* permission for the semantic model.<br><br>If the semantic model uses Direct Lake on SQL endpoints and the [cloud connection](/fabric/fundamentals/direct-lake-manage) uses SSO, grant at least *Read* and *ReadData* permissions for the lakehouse or warehouse.<br><br>If the semantic model uses Direct Lake on OneLake and the cloud connection uses SSO, grant at least *Read* and *ReadAll* permission for the Delta tables in OneLake.        |Reports don't need to belong to the same workspace as the semantic model. For more information, see [Strategy for read-only consumers](/power-bi/guidance/powerbi-implementation-planning-security-report-consumer-planning).         |
|Users can create reports     |Grant *Build* permission for the semantic model.<br><br>If the semantic model uses Direct Lake on SQL endpoints and the cloud connection uses SSO, grant at least *Read* and *ReadData* permissions for the lakehouse or warehouse.<br><br>If the semantic model uses Direct Lake on OneLake and the cloud connection uses SSO, grant at least *Read* and *ReadAll* permission for the Delta tables in OneLake.     |For more information, see [Strategy for content creators](/power-bi/guidance/powerbi-implementation-planning-security-content-creator-planning).         |
|Users can view reports but are denied querying the lakehouse, SQL analytics endpoint, or Delta tables in OneLake     |Grant *Read* permission for the reports and *Read* permission for the semantic model.<br><br>Don't grant users any permission for the lakehouse, warehouse, or Delta tables.        |Only suitable when the Direct Lake model uses a fixed identity through a cloud connection with SSO disabled.         |
|Manage the semantic model, including refresh settings     |Requires semantic model ownership.         |For more information, see [Semantic model ownership](/power-bi/guidance/powerbi-implementation-planning-security-content-creator-planning).        |


> [!IMPORTANT]
> You should always thoroughly test permissions before releasing your semantic model and reports into production.

For more information, see [Semantic model permissions](/power-bi/connect-data/service-datasets-permissions).

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

If exceeded, the _Max model size on disk/OneLake_ causes all queries to the semantic model to fall back to DirectQuery mode. All other guardrails presented in the table are evaluated per query. It's therefore important that you [optimize your Delta tables](direct-lake-understand-storage.md#delta-table-optimization) and [Direct Lake semantic model](direct-lake-develop.md#develop-direct-lake-semantic-models) to avoid having to unnecessarily scale up to a higher Fabric SKU.

Additionally, _Capacity unit_ and _Max memory per query limits_ apply to Direct Lake semantic models. For more information, see [Capacities and SKUs](/power-bi/enterprise/service-premium-what-is#capacities-and-skus).

## Considerations and limitations

Direct Lake semantic models present some considerations and limitations.

> [!NOTE]
> The capabilities and features of Direct Lake semantic models are evolving rapidly. Be sure to check back periodically to review the latest list of considerations and limitations.


|Consideration / limitation  |Direct Lake on OneLake  |Direct Lake on SQL endpoints  |
|---------|---------|---------|
|When the SQL analytics endpoint enforces row-level security, DAX queries are processed differently depending on the type of Direct Lake mode employed. <br><br>When Direct Lake on OneLake is employed, queries will succeed, and SQL based RLS is not applied. Direct Lake on OneLake requires the user has access to the files in OneLake, which doesn’t observe SQL based RLS. |Queries will succeed.         |Yes, unless fallback is disabled in which case queries will fail.         |
|If a table in the semantic model is based on a (non-materialized) SQL view, DAX queries are processed differently depending on the type of Direct Lake mode employed.<br><br>Direct Lake on SQL endpoints will fallback to DirectQuery in this case.<br><br>It isn't supported to create a Direct Lake on OneLake table based on a non-materialized SQL view. You can instead use a lakehouse materialized view because Delta tables are created. Alternatively, use a different storage mode such as Import or DirectLake for tables based on non-materialized SQL views. |Not applicable         |Yes, unless fallback is disabled in which case queries will fail.         |
|Composite modeling isn't supported at this time, which means Direct Lake semantic model tables can't be mixed with tables in other storage modes, such as Import, DirectQuery, or Dual (except for special cases, including [calculation groups](/power-bi/transform-model/calculation-groups), [what-if parameters](/power-bi/transform-model/desktop-what-if), and [field parameters](/power-bi/create-reports/power-bi-field-parameters)).     |Not supported         |Not supported         |
|Calculated columns and calculated tables that reference columns or tables in Direct Lake storage mode aren't supported. [Calculation groups](/power-bi/transform-model/calculation-groups), [what-if parameters](/power-bi/transform-model/desktop-what-if), and [field parameters](/power-bi/create-reports/power-bi-field-parameters), which implicitly create calculated tables, and calculated tables that don't reference Direct Lake columns or tables are supported.     |Not supported         |Not supported         |
|Direct Lake storage mode tables don't support complex Delta table column types. Binary and GUID semantic types are also unsupported. You must convert these data types into strings or other supported data types.     |Not supported         |Not supported         |
|Table relationships require the data types of related columns to match.     |Yes |Yes|
|One-side columns of relationships must contain unique values. Queries fail if duplicate values are detected in a one-side column.     |Yes |Yes|
|[Auto data/time intelligence in Power BI Desktop](/power-bi/transform-model/desktop-auto-date-time) isn't supported. [Marking your own date table as a date table](/power-bi/transform-model/desktop-date-tables) is supported.     |Yes |Yes|
|The length of string column values is limited to 32,764 Unicode characters.     |Yes |Yes|
|Non-numeric floating point values, such as *NaN* (not a number), aren't supported.     |Yes |Yes|
|[Publish to web from Power BI](/power-bi/collaborate-share/service-publish-to-web) using a service principal is only supported when using a [fixed identity for the Direct Lake semantic model](/fabric/fundamentals/direct-lake-manage).     |Yes |Yes|
|In the [web modeling experience](/power-bi/transform-model/service-edit-data-models), validation is limited for Direct Lake semantic models. User selections are assumed to be correct, and no queries are issued to validate cardinality or cross filter selections for relationships, or for the selected date column in a marked date table.     |Yes |Yes|
|In the Fabric portal, the *Direct Lake* tab in the refresh history lists Direct Lake-related refresh failures. Successful refresh (framing) operations aren't typically listed unless the refresh status changes, such as from no previous run or refresh failure to refresh success or refresh success with warning.     |Yes |Yes|
|Your Fabric SKU determines the maximum available memory per Direct Lake semantic model for the capacity. When the limit is exceeded, queries to the semantic model might be slower due to excessive paging in and out of the model data.     |Yes |Yes|
|Creating a Direct Lake semantic model in a workspace that is in a different region of the data source workspace isn't supported. For example, if the Lakehouse is in West Central US, then you can only create semantic models from this Lakehouse in the same region. A workaround is to create a Lakehouse in the other region's workspace and shortcut to the tables before creating the semantic model. To find what region you are in, see [find your Fabric home region](/fabric/admin/find-fabric-home-region).     |Yes |Yes|
|Embedding reports requires a [V2 embed token](/power-bi/developer/embedded/generate-embed-token).     |Yes |Not supported|
|Direct Lake doesn't support service principal profiles for authentication.     |Not supported |Yes|
|Power BI Direct Lake semantic models can be created and queried by Service Principals and Viewer role membership with Service Principals is supported, but the default Direct Lake semantic models on lakehouse/warehouse don't support this scenario.     |Yes         |         |
|Shortcuts in a lakehouse can be used as data sources for semantic model tables.     |Not supported during public preview         |Yes         |


## Related content

- [Develop Direct Lake semantic models](direct-lake-develop.md)
- [Manage Direct Lake semantic models](direct-lake-manage.md)
- [Understand storage for Direct Lake semantic models](direct-lake-understand-storage.md)
- [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md)
- [Analyze query processing for Direct Lake semantic models](direct-lake-analyze-query-processing.md)

