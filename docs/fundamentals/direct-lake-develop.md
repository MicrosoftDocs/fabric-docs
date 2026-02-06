---
title: "Develop Direct Lake semantic models"
description: "Learn about how to develop Direct Lake semantic models."
author: JulCsc
ms.author: juliacawthra
ms.date: 04/23/2025
ms.topic: concept-article
ms.custom: fabric-cat
---

# Develop Direct Lake semantic models

This article describes design topics relevant to developing Direct Lake semantic models.

## Create the model

You can create a Direct Lake semantic model in [Power BI Desktop](direct-lake-power-bi-desktop.md) or from many Fabric items in the browser. For example, from an open Lakehouse you can choose **New semantic model** to create a new semantic model in Direct Lake storage mode.

You can use either [Power BI Desktop](direct-lake-power-bi-desktop.md) or [web modeling](direct-lake-web-modeling.md) in the browser to edit the semantic model to add relationships, rename fields, add measures, and other semantic modeling tasks.

Alternatively, as with any Power BI semantic model, you can continue the development of your model by using an XMLA-compliant tool, like SQL Server Management Studio (SSMS) (version 19.1 or later) or open-source, community tools. For more information, see [Model write support with the XMLA endpoint](#model-write-support-with-the-xmla-endpoint) later in this article. Fabric notebooks can also programatically create and edit semantic models with semantic link and semantic link labs.

> [!TIP]
> You can learn how to create a lakehouse, a Delta table, and a basic Direct Lake semantic model by completing [this tutorial](direct-lake-create-lakehouse.md).

### Model tables

Model tables are based on either a table or a view of the SQL analytics endpoint. However, avoid using views whenever possible. Queries to a model table based on a view [fall back to DirectQuery mode](../fundamentals/direct-lake-overview.md#directquery-fallback), which may result in slower query performance. 

> [!WARNING]
> Views can only be used in Direct Lake on SQL, and not available to be used in Direct Lake on OneLake.

Tables should include columns for filtering, grouping, sorting, and summarizing, in addition to columns that support model relationships. Unnecessary columns don't affect semantic model query performance because they don't load into memory, but they result in a larger storage size in OneLake and neeed more compute resources to load and maintain.

> [!WARNING]
> Using columns that apply [dynamic data masking (DDM)](../data-warehouse/dynamic-data-masking.md) in Direct Lake semantic models is not supported.

Import tables can be added to semantic models with Direct Lake on OneLake tables. Calculated tables can be added as long as they do not not reference a Direct Lake table. Calculation groups can be added.

To learn how to select which tables to include in your Direct Lake semantic model, see [Edit tables for Direct Lake semantic models](direct-lake-edit-tables.md).

For more information about columns to include in your semantic model tables, see [Understand Direct Lake query performance](../fundamentals/direct-lake-understand-storage.md).

## Enforce data-access rules

When you have requirements to deliver subsets of model data to different users, you can enforce data-access rules. You enforce rules by setting up object-level security (OLS) and/or row-level security (RLS) in the [SQL analytics endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md) or in the semantic model.

> [!NOTE]
> The topic of _enforcing data-access rules_ is different, yet related, to _setting permissions_ for content consumers, creators, and users who manage the semantic model (and related Fabric items). For more information about setting permissions, see [Manage Direct Lake semantic models](../fundamentals/direct-lake-manage.md#set-fabric-item-permissions).

### Object-level security (OLS)

OLS involves restricting access to discover and query objects or columns. For example, you might use OLS to limit the users who can access the `Salary` column from the `Employee` table.

For a SQL analytics endpoint, you can set up OLS to [control access to the endpoint objects](../data-warehouse/sql-granular-permissions.md), such as tables or views, and column-level security (CLS) to [control access to endpoint table columns](../data-warehouse/column-level-security.md).

For a semantic model, you can set up OLS to [control access to model tables or columns](../security/service-admin-object-level-security.md?tabs=table&preserve-view=true). You need to use open-source, community tools like Tabular Editor to set up OLS.

### Row-level security (RLS)

RLS involves restricting access to subsets of data in tables. For example, you might use RLS to ensure that salespeople can only access sales data for customers in their sales region.

For a SQL analytics endpoint, you can set up RLS to [control access to rows in an endpoint table](../data-warehouse/row-level-security.md).

> [!IMPORTANT]
> When a query uses any table that has RLS in the SQL analytics endpoint, it falls back to DirectQuery mode. Query performance might be slower.

For a semantic model, you can set up RLS to [control access to rows in model tables](../security/service-admin-row-level-security.md). RLS can be set up in the [web modeling experience](/power-bi/transform-model/service-edit-data-models) or by using a third-party tool.

### How queries are evaluated

The [reason to develop Direct Lake semantic models](../fundamentals/direct-lake-overview.md#when-should-you-use-direct-lake-storage-mode) is to achieve high performance queries over large volumes of data in OneLake. Therefore, you should strive to design a solution that maximizes the chances of in-memory querying.

The following steps approximate how queries are evaluated (and whether they fail). The benefits of Direct Lake storage mode are only possible when the fifth step is achieved.

1. If the query contains any table or column that's restricted by semantic model OLS, an error result is returned (report visuals fail to render).
1. If the query contains any column that's restricted by SQL analytics endpoint CLS (or the table is denied), an error result is returned (report visuals fail to render).
    1. If the cloud connection uses SSO (default), CLS is determined by the access level of the report consumer.
    1. If the cloud connection uses a fixed identity, CLS is determined by the access level of the fixed identity.
1. If the query contains any table in the SQL analytics endpoint that enforces RLS or a view is used, the query falls back to DirectQuery mode.
    1. If the cloud connection uses SSO (default), RLS is determined by the access level of the report consumer.
    1. If the cloud connection uses a fixed identity, RLS is determined by the access level of the fixed identity.
1. If the query [exceeds the guardrails of the capacity](../fundamentals/direct-lake-overview.md#fabric-capacity-requirements), it falls back to DirectQuery mode.
1. Otherwise, the query is satisfied from the in-memory cache. Column data is [loaded into memory](../fundamentals/direct-lake-overview.md#column-loading-transcoding) as and when it's required.

### Source item permissions

The account used to access data is one of the following.

- If the cloud connection uses SSO (default), it is the report consumer.
- If the cloud connection uses a fixed identity, it is the fixed identity.

The account must at least have _Read_ and _ReadData_ permissions on the source item (lakehouse or warehouse). Item permissions can be inherited from workspace roles or assigned explicitly for the item as described in [this article](../data-engineering/lakehouse-sharing.md).

Assuming this requirement is met, Fabric grants the necessary access to the semantic model to read the Delta tables and associated Parquet files (to load column data into memory) and data-access rules can be applied.

### Data-access rule options

You can set up data-access rules in:

- The semantic model only.
- The SQL analytics endpoint only.
- In both the semantic model and the SQL analytics endpoint.

#### Rules in the semantic model

If you must enforce data-access rules, you should do so in the semantic model whenever viable. That's because RLS enforced by the semantic model is achieved by filtering the in-memory cache of data to achieve high performance queries.

It's also a suitable approach when report consumers aren't granted permission to query the lakehouse or warehouse.

In either case, it's strongly recommended that the cloud connection uses a fixed identity instead of SSO. SSO would imply that end users can access the SQL analytics endpoint directly and might therefore bypass security rules in the semantic model.

> [!IMPORTANT]
> Semantic model item permissions can be [set explicitly](/power-bi/connect-data/service-datasets-manage-access-permissions) via [Power BI apps](/power-bi/consumer/end-user-apps), or [acquired implicitly](/power-bi/connect-data/service-datasets-permissions#permissions-acquired-implicitly-via-workspace-role) via workspace roles.
>
> Notably, semantic model data-access rules are not enforced for users who have _Write_ permission on the semantic model. Conversely, data-access rules do apply to users who are assigned to the _Viewer_ workspace role. However, users assigned to the _Admin_, _Member_, or _Contributor_ workspace role implicitly have _Write_ permission on the semantic model and so data-access rules are not enforced. For more information, see [Roles in workspaces](/power-bi/collaborate-share/service-roles-new-workspaces).

#### Rules in the SQL analytics endpoint

It's appropriate to enforce data-access rules in the SQL analytics endpoint when the semantic model [cloud connection](../fundamentals/direct-lake-manage.md#set-up-the-cloud-connection) uses [single sign-on (SSO)](../fundamentals/direct-lake-manage.md#single-sign-on). That's because the identity of the user is delegated to query the SQL analytics endpoint, ensuring that queries return only the data the user is allowed to access. It's also appropriate to enforce data-access rules at this level when users query the SQL analytics endpoint directly for other workloads (for example, to create a Power BI paginated report, or export data).

Notably, however, a semantic model query falls back to DirectQuery mode when it includes any table that enforces RLS in the SQL analytics endpoint. So, the semantic model might never cache data into memory to achieve high performance queries.

#### Rules at both layers

Data-access rules can be enforced at both layers. However, this approach involves extra complexity and management overhead. In this case, it's recommended that the cloud connection uses a fixed identity instead of SSO.

### Comparison of data-access rule options

The following table compares data data-access setup options.

| Apply data-access rules to | Comment |
| --- | --- |
| Semantic model only | Use this option when users aren't granted item permissions to query the lakehouse or warehouse. Set up the cloud connection to use a fixed identity. High query performance can be achieved from the in-memory cache. |
| SQL analytics endpoint only | Use this option when users need to access data from either the warehouse or the semantic model, and with consistent data-access rules. Ensure SSO is enabled for the cloud connection. Query performance might be slow. |
| Lakehouse or warehouse _and_ semantic model | This option involves extra management overhead. Set up the cloud connection to use a fixed identity. |

### Recommended practices for enforcing data-access rules

Here are recommended practices related to enforcing data-access rules:

- If different users must be restricted to subsets of data, whenever viable, enforce RLS only at the semantic model layer. That way, users benefit from high performance in-memory queries. In this case, it's strongly recommended that the cloud connection uses a fixed identity instead of SSO.
- If possible, avoid enforcing OLS and CLS at either layer because it results in errors in report visuals. Errors can lead to confusion or concern for users. For summarizable columns, consider creating measures that return BLANK in certain conditions instead of CLS (if possible).

## Model write support with the XMLA endpoint

Direct Lake semantic models support write operations with the XMLA endpoint by using tools such as SSMS (19.1 or later), and open-source, community tools.

> [!TIP]
> For more information about using third-party tools to develop, manage, or optimize semantic models, see the [advanced data model management](/power-bi/guidance/powerbi-implementation-planning-usage-scenario-advanced-data-model-management#tabular-editor) usage scenario.

Before you can perform write operations, the XMLA read-write option must be enabled for the capacity. For more information, see [Enable XMLA read-write](/power-bi/enterprise/service-premium-connect-tools#enable-xmla-read-write).

Model write operations with the XMLA endpoint support:

- Customizing, merging, scripting, debugging, and testing Direct Lake model metadata.
- Source and version control, continuous integration and continuous deployment (CI/CD) with Azure DevOps and GitHub. For more information, see [Content lifecycle management](/power-bi/guidance/powerbi-implementation-planning-content-lifecycle-management-overview).
- Automation tasks like semantic model refresh, and applying changes to Direct Lake semantic models by using PowerShell and the REST APIs.

When changing a semantic model using XMLA, you must update the *ChangedProperties* and *PBI_RemovedChildren* collection for the changed object to include any modified or removed properties. If you don't perform that update, Power BI modeling tools might overwrite any changes the next time the schema is synchronized with the Lakehouse.

Learn more about semantic model object lineage tags in the [lineage tags for Power BI semantic models](/analysis-services/tom/lineage-tags-for-power-bi-semantic-models) article.


> [!IMPORTANT]
> Direct Lake tables created by using XMLA applications will initially be in an unprocessed state until the application sends a refresh command. Queries that involve unprocessed tables will always fall back to DirectQuery mode. So, when you create a new semantic model, be sure to refresh the model to process its tables.

For more information, see [Semantic model connectivity with the XMLA endpoint](/power-bi/enterprise/service-premium-connect-tools).

## Direct Lake model metadata

When you connect to a Direct Lake semantic model with the XMLA endpoint, the metadata looks like that of any other model. However, Direct Lake models show the following differences:

- The `compatibilityLevel` property of the database object is 1604 (or higher).
- The mode property of Direct Lake partitions is set to `directLake`.
- Direct Lake partitions use shared expressions to define data sources. The expression points to the SQL analytics endpoint of the lakehouse or warehouse. Direct Lake uses the SQL analytics endpoint to discover schema and security information, but it loads the data directly from OneLake (unless it [falls back to DirectQuery](../fundamentals/direct-lake-overview.md#directquery-fallback) mode for any reason).


## Post-publication tasks

After you publish a Direct Lake semantic model, you should complete some setup tasks. For more information, see [Manage Direct Lake semantic models](../fundamentals/direct-lake-manage.md#post-publication-tasks).

## Related content

- [Direct Lake overview](../fundamentals/direct-lake-overview.md)
- [Manage Direct Lake semantic models](../fundamentals/direct-lake-manage.md)
- [Understand Direct Lake query performance](../fundamentals/direct-lake-understand-storage.md)
- [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md)
- [Edit tables for Direct Lake semantic models](direct-lake-edit-tables.md)
- [OneLake integration for semantic models](/power-bi/enterprise/onelake-integration-overview)
