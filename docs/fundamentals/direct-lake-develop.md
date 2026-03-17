---
title: "Develop Direct Lake semantic models"
description: "Learn about how to develop Direct Lake semantic models."
author: JulCsc
ms.author: juliacawthra
ms.date: 04/23/2025
ms.topic: concept-article
ms.custom: fabric-cat
ai-usage: ai-assisted
---

# Develop Direct Lake semantic models

This article describes design topics relevant to developing Direct Lake semantic models.

## Create the model

You can create a Direct Lake semantic model in [Power BI Desktop](direct-lake-power-bi-desktop.md) or from many Fabric items in the browser. For example, from an open Lakehouse you can choose **New semantic model** to create a new semantic model in Direct Lake storage mode.

There are two forms of Direct Lake storage mode, summarized here. See the [Key concepts and terminology](direct-lake-overview.md#key-concepts-and-terminology) section for more information.

- Use **Direct Lake on OneLake** for compatibility with [OneLake security](../onelake/security/get-started-security.md#onelake-security-preview), more modeling features, and faster query performance.
- Use **Direct Lake on SQL** when you depend on security rules defined in the SQL analytics endpoint with [delegated identity mode](../onelake/security/sql-analytics-endpoint-onelake-security.md#access-modes-in-sql-analytics-endpoint), or you need fallback to DirectQuery.

The following table shows the most common creation methods for each type of Direct Lake semantic model.

|  | Supports Direct Lake on OneLake | Supports Direct Lake on SQL |
|---|---|---|
| Creation from the **Power BI service**. For example, select **Create** from the left navigation bar, then select **OneLake catalog**. | Yes | No |
| Creation from **Power BI Desktop**. | Yes | No |
| Creation from the **SQL analytics endpoint** page. For example, open the SQL analytics endpoint for a lakehouse, then select **New semantic model**. | Yes | Yes |

When you create a Direct Lake semantic model from the SQL analytics endpoint, you can choose between the two Direct Lake types, as shown in the following image:

:::image type="content" source="media/direct-lake-develop/creation-sql-analytics-endpoint-page.png" alt-text="Screenshot showing the Direct Lake type selection dialog when creating a semantic model from the SQL analytics endpoint page.":::

This dialog defaults to Direct Lake on OneLake if the SQL analytics endpoint is in user identity mode, or Direct Lake on SQL if the SQL analytics endpoint is in delegated mode. For more information, see [Access modes in SQL analytics endpoint](../onelake/security/sql-analytics-endpoint-onelake-security.md#access-modes-in-sql-analytics-endpoint).

Alternatively, as with any Power BI semantic model, you can continue the development of your model by using an XMLA-compliant tool, like SQL Server Management Studio (SSMS) (version 19.1 or later) or open-source, community tools. Fabric notebooks can also programmatically create and edit semantic models with semantic link and semantic link labs.

## Power Query connectors

An easy way to tell if an existing Direct Lake semantic model is on OneLake or SQL is to check the connector in [TMDL view](/power-bi/transform-model/desktop-tmdl-view). From the **Model** tab, drag the **Expressions** node to see the M expression definition.

Direct Lake on OneLake uses the [Azure Data Lake Storage](/power-query/connectors/data-lake-storage) connector.

:::image type="content" source="media/direct-lake-develop/azure-storage-connector.png" alt-text="Screenshot showing the Azure Data Lake Storage Gen2 connector in TMDL view for a Direct Lake on OneLake model.":::

Direct Lake on SQL uses the [SQL Server](/power-query/connectors/sql-server) connector, or the `OneLake.SqlAnalytics()` connector.

:::image type="content" source="media/direct-lake-develop/sql-database-connector.png" alt-text="Screenshot showing the SQL Server connector in TMDL view for a Direct Lake on SQL model.":::

## Direct Lake composite models

Direct Lake on OneLake enables creation of multi-source, composite models that combine tables in Direct Lake mode with other tables in Import/DirectQuery mode, providing valuable flexibility for dimension tables while leveraging Direct Lake for very large fact tables to avoid costly refreshes and management overhead. For more information, see the [Composite semantic models with Direct Lake and Import storage mode tables](direct-lake-web-modeling.md#composite-semantic-models-with-direct-lake-and-import-storage-mode-tables) section.

## Model tables

Model tables are normally based on the table in the source Fabric data item. Direct Lake on SQL also allows selection of a SQL view. Queries to a model table based on a SQL view [fall back to DirectQuery mode](direct-lake-how-it-works.md#directquery-fallback), which might result in slower query performance.

> [!NOTE]
> With Direct Lake on OneLake, tables based on SQL views can be added using other storage modes like Import and/or DirectQuery because Direct Lake on OneLake supports composite models.

Tables should include columns for filtering, grouping, sorting, and summarizing, in addition to columns that support model relationships.

For more information about columns to include in your semantic model tables, see [Understand Direct Lake query performance](direct-lake-understand-storage.md).

For information about enforcing data-access rules with object-level security (OLS) and row-level security (RLS), see [Integrate Direct Lake security](direct-lake-security-integration.md).

## Direct Lake model metadata

When you connect to a Direct Lake semantic model with the XMLA endpoint, the metadata looks like that of any other model. However, Direct Lake models show the following differences:

- The `compatibilityLevel` property of the database object is 1604 (or higher).
- The mode property of Direct Lake partitions is set to `directLake`.
- Direct Lake partitions use shared expressions to define data sources.
  - **Direct Lake on SQL** — The expression points to the SQL analytics endpoint of the lakehouse or warehouse. Direct Lake uses the SQL analytics endpoint to discover schema and security information, but it loads the data directly from OneLake (unless it [falls back to DirectQuery](direct-lake-how-it-works.md#directquery-fallback) mode for any reason).
  - **Direct Lake on OneLake** — The expression points directly to the OneLake storage location of the Fabric data source. Direct Lake uses the OneLake APIs for schema discovery, security checks, and data loading. Direct Lake on OneLake doesn't fall back to DirectQuery mode.

## Post-publication tasks

After you publish a Direct Lake semantic model, you should complete some setup tasks. For more information, see [Manage Direct Lake semantic models](direct-lake-manage.md#post-publication-tasks).

## Related content

- [Direct Lake overview](direct-lake-overview.md)
- [Manage Direct Lake semantic models](direct-lake-manage.md)
- [Understand Direct Lake query performance](direct-lake-understand-storage.md)
- [OneLake integration for semantic models](/power-bi/enterprise/onelake-integration-overview)
