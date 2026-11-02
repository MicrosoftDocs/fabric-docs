---
title: "Develop Direct Lake semantic models"
description: "Learn about how to develop Direct Lake semantic models."
author: kgremban
ms.author: kgremban
ms.reviewer: monicacl
ms.date: 09/02/2026
ms.topic: concept-article
ms.custom: fabric-cat
ai-usage: ai-assisted
---

# Develop Direct Lake semantic models

This article describes design topics relevant to developing Direct Lake semantic models.

## Choose the right storage mode

Direct Lake storage mode has two forms. Use the following guidance to choose the Direct Lake type that best fits your scenario. For more information, see [full comparison of storage modes](direct-lake-overview.md#key-concepts-and-terminology).

Use **Direct Lake on OneLake** when...

* You generally expect faster query performance.
* You use one or more Fabric items whose OneLake storage resolves to valid Delta tables, either natively or through shortcuts.
* You need composite modeling with Import or DirectQuery tables.
* You want to use [OneLake security](../onelake/security/get-started-onelake-security.md).
* You need modeling features like calculated columns or calculated tables that reference Direct Lake tables (preview).
* You want consistent Direct Lake behavior without DirectQuery fallback (`DirectLakeOnly` mode). 

Use **Direct Lake on SQL** when...

* You depend on security rules defined in the SQL analytics endpoint with [delegated identity mode](../onelake/security/sql-analytics-endpoint-onelake-security.md): RLS, CLS, OLS.
* Your model is based on SQL analytics endpoint tables or views from a single [supported Fabric data source](direct-lake-overview.md#supported-fabric-data-sources).
* You need unsupported Direct Lake scenarios to [fall back to DirectQuery](./direct-lake-how-it-works.md#directquery-fallback) if fallback is enabled (for example, queries against SQL views).

## Create the model

You can create a Direct Lake semantic model in [Power BI Desktop](direct-lake-power-bi-desktop.md) or from many Fabric items in the browser. For example, from an open Lakehouse you can choose **New semantic model** to create a new semantic model in Direct Lake storage mode.

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

## Use M parameters with deployment pipelines

For Direct Lake on OneLake, use text M parameters to change the OneLake source location between deployment pipeline stages. Data source rules don't support rebinding these connections, but parameter rules can set the parameter values for each target stage. Deploying a Direct Lake semantic model doesn't automatically bind it to a lakehouse or warehouse in the target stage.

The following Tabular Model Definition Language (TMDL) example defines text parameters for the workspace and lakehouse IDs and references them in the connection expression:

```tmdl
createOrReplace
	expression 'DirectLake - Sales' =
			let
			    Source = AzureStorage.DataLake("https://onelake.dfs.fabric.microsoft.com/" & WorkspaceId & "/" & LakehouseId, [HierarchicalNavigation = true])
			in
			    Source

	expression WorkspaceId = "<workspace-id>" meta [IsParameterQuery = true, IsParameterQueryRequired = true, Type = "Text"]

	expression LakehouseId = "<lakehouse-id>" meta [IsParameterQuery = true, IsParameterQueryRequired = true, Type = "Text"]
```

To parameterize the full URL instead, replace the two ID parameters with this expression:

```tmdl
expression OneLakeSourceUrl = "https://onelake.dfs.fabric.microsoft.com/<workspace-id>/<item-id>" meta [IsParameterQuery = true, IsParameterQueryRequired = true, Type = "Text"]
```

In the Direct Lake connection expression, use `AzureStorage.DataLake(OneLakeSourceUrl, [HierarchicalNavigation = true])`. Replace the placeholders with the workspace and lakehouse or warehouse IDs. When adding the parameter to the preceding script, indent its declaration at the same level as the connection expression. Configure one deployment parameter rule for `OneLakeSourceUrl` instead of separate rules for the IDs.

To adapt this example to your model:

1. In [web modeling](direct-lake-web-modeling.md), go to [**TMDL view**](/power-bi/transform-model/desktop-tmdl-view#script-to-tmdl) and open the shared expression that contains the `AzureStorage.DataLake` connection.

1. Add the text parameter expressions and update the connection expression as shown in the example. Keep the existing connection expression's name, annotations, and any additional connection options unchanged so that existing partitions continue to reference it. Replace `<workspace-id>` and `<lakehouse-id>` with the source workspace and lakehouse IDs, not full URLs. For a warehouse source, use a `WarehouseId` parameter containing the warehouse ID and reference it instead of `LakehouseId`. Don't use the SQL analytics endpoint ID. All `expression` declarations must be at the same indentation level.

1. Apply the script. Parameters must have type `Text` to use them for rebinding through parameter rules. Multiple connections can share a workspace parameter while using separate item ID parameters.

1. In the target pipeline stage, configure a [deployment parameter rule](../cicd/deployment-pipelines/create-rules.md#create-a-deployment-rule) for each value that changes. For example, set `WorkspaceId` to the target workspace ID and `LakehouseId` to the target lakehouse ID. If the model isn't in the target stage yet, deploy it there first so you can configure the rules.

1. Deploy the semantic model from the source stage to the target stage to apply the rules. Refresh the target model and verify that it queries the intended source.

The target source must contain the tables and columns that the model references. Changing the parameters doesn't create those tables or grant access to them. Ensure the target model's connection and permissions allow access to the target data.

For composite models, you can create the text parameters in Power Query instead of TMDL. The Direct Lake connection expression isn't available in Power Query. After creating the parameters, update that expression in **TMDL view**, as in the preceding steps.

## Post-publication tasks

After you publish a Direct Lake semantic model, you should complete some setup tasks. For more information, see [Manage Direct Lake semantic models](direct-lake-manage.md#post-publication-tasks).

## Related content

- [Direct Lake overview](direct-lake-overview.md)
- [Manage Direct Lake semantic models](direct-lake-manage.md)
- [Understand Direct Lake query performance](direct-lake-understand-storage.md)
- [OneLake integration for semantic models](/power-bi/enterprise/onelake-integration-overview)
