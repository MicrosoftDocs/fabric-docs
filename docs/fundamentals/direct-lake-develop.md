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

Alternatively, as with any Power BI semantic model, you can continue the development of your model by using an XMLA-compliant tool, like SQL Server Management Studio (SSMS) (version 19.1 or later) or open-source, community tools. Fabric notebooks can also programmatically create and edit semantic models with semantic link and semantic link labs.

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

For information about enforcing data-access rules with object-level security (OLS) and row-level security (RLS), see [Integrate Direct Lake security](direct-lake-security-integration.md).

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
- [Edit tables for Direct Lake semantic models](direct-lake-edit-tables.md)
- [OneLake integration for semantic models](/power-bi/enterprise/onelake-integration-overview)
