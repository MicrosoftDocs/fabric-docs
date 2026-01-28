---
title: "Migrate from Dataflow Gen1 to Dataflow Gen2: Migration scenarios"
description: "Scenario-based guidance to help you determine the right architecture to choose when migrating to Dataflow Gen2 in Microsoft Fabric."
author: itsnotaboutthecell
ms.author: alpowers
ms.reviewer: whhender, mllopis
ms.topic: concept-article
ms.date: 12/08/2024
ms.custom: fabric-cat, intro-migration, dataflows
---

# Migrate from Dataflow Gen1 to Dataflow Gen2: Migration scenarios

This article presents different migration scenarios you can consider when [migrating from Dataflow Gen1 to Dataflow Gen2](dataflow-gen2-migrate-from-dataflow-gen1.md). It also provides you with guidance and execution recommendations. These scenarios might inspire you to determine the right migration approach based on your business requirements and circumstances.

When you migrate your dataflows, it's important to think beyond simply copying existing solutions. Instead, we recommend modernizing your solutions by taking advantage of the latest innovations and capabilities of Dataflow Gen2. This approach ensures that your solutions can support the growing demands of the business.

For instance, Dataflow Gen2 has a feature named [fast copy](dataflows-gen2-fast-copy.md), which significantly reduces the time required to ingest data for certain transformations and connectors. Dataflow Gen2 also has improved [incremental refresh](dataflow-gen2-incremental-refresh.md), which optimizes data refresh processes by only updating data that's changed. These advancements not only enhance performance and efficiency but also ensure that your solutions scale.

> [!NOTE]
> The migration scenarios are representative of real customer migrations, however individual customer scenarios will of course differ.
>
> This article doesn't cover pricing information. For pricing information, see [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

> [!IMPORTANT]
> CPU consumption by Dataflow Gen1 and Dataflow Gen2 can vary for many reasons, like the use of new features in Dataflow Gen2, including [lakehouse](../data-engineering/lakehouse-overview.md) staging and [warehouse](../data-warehouse/data-warehousing.md) compute. We recommended that you perform in-depth analysis—perhaps as a proof of concept (POC)—to quantify comparative CPU consumption across Dataflow Gen1 and Dataflow Gen2 _before_ you migrate your dataflows.

## Migration scenarios

Dataflows offer a versatile platform for creating scalable ETL (Extract, Transform, and Load) and ELT (Extract, Load, and Transform) solutions, catering to a range of usage scenarios from [personal BI](/power-bi/guidance/powerbi-implementation-planning-usage-scenario-personal-bi) to [enterprise BI](/power-bi/guidance/powerbi-implementation-planning-usage-scenario-enterprise-bi).

Here are three possible migration scenarios that have inspired this article:

- **Personal or team usage**: Small teams or individuals use dataflows to automate data ingestion and preparation tasks, allowing them to focus on data analysis and insights. For instance, a team could use dataflows to extract data from various sources like Microsoft Excel or Microsoft SharePoint. Their dataflows transform source data according to their specific needs, and load it into a semantic model for reporting purposes.
- **Departmental usage**: Departments within an organization use dataflows to manage larger data sources and complex transformations. They might create composable dataflows that promote reusability and consistency across departmental reports, ensuring that all team members work on the same version of data.
- **Enterprise usage**: At an enterprise level, dataflows are instrumental in ingesting vast amounts of data across multiple departments at scale. They serve as a centralized data preparation layer that feeds into many semantic models, underpinning a broad spectrum of business intelligence and analytics applications. The entire organization benefits from reliable, up-to-date data, enabling informed decision making at all levels.

In each of these scenarios, dataflows help to create robust and scalable ETL/ELT solutions that can grow with the needs of the team, department, or organization. Well-designed dataflows ensure that data management processes remain efficient and effective.

For more information about usage scenarios, see [Microsoft Fabric implementation planning](/power-bi/guidance/powerbi-implementation-planning-usage-scenario-overview).

### Migration scenario 1

In this migration scenario, the organization uses Power BI dataflows for self-service data preparation to support personal or team usage scenarios. The dataflows are contained within a single workspace that's assigned to a Fabric capacity.

The dataflow creators want to take advantage of the advanced capabilities of Dataflow Gen2 for authoring purposes. At the same time, they plan to temporarily continue using dataflow tables as a data source during a phased migration. This approach ensures ease of use and connectivity for content creators working with existing Power BI semantic models, Excel spreadsheets, or Dataverse tables—at least until the transition to supported data destination sources is complete.

To migrate their solutions, the dataflow creators:

1. Update the workspace ID, if a new workspace is created to store the new dataflow.
1. Update existing solutions from the original (Gen1) dataflow ID to the new (Gen2) dataflow ID.

Here's an example query that's been updated to retrieve data for a date dimension table.

```powerquery-m
let
    Source = PowerPlatform.Dataflows(null),
    Workspaces = Source{[Id="Workspaces"]}[Data],
    Workspace = Workspaces{[workspaceId="<enter new workspace ID>"]}[Data],
    DataflowId = Workspace{[dataflowId="<enter new dataflow ID"]}[Data],
    DimDateTable = DataflowId{[entity="DimDate", version=""]}[Data]
in
    DimDateTable
```

> [!TIP]
> If you parameterize the `workspaceId` and `dataflowId` values in the semantic models, you can use the [Datasets - Update Parameter in Group](/rest/api/power-bi/datasets/update-parameters-in-group) REST API operation to programmatically update the mashup parameter details.

> [!IMPORTANT]
> While it's possible to _get data_ by using the dataflow connector, this approach isn't recommended when using Dataflow Gen2. Instead, we recommend that you use the data destination functionality to output all created tables from Dataflow Gen2 to Fabric items or other destinations, whenever possible. That's because the dataflow connector uses an underlying system implementation storage layer (called _DataflowsStagingLakehouse_), and it could change when new functionality or features are added.

### Migration scenario 2

In this migration scenario, the organization uses Power BI dataflows for self-service data preparation to support departmental usage scenarios with composable dataflows and linked tables across multiple workspaces.

The dataflow creators want to take advantage of the advanced capabilities of Dataflow Gen2 for authoring, while also efficiently sharing and outputting the dataflow tables to a Fabric lakehouse. This method takes advantage of [OneLake shortcuts](../onelake/onelake-shortcuts.md). OneLake shortcuts simplify solution management by reducing the process latency traditionally associated with linked tables across workspaces and by eliminating redundant data copies.

To migrate their solutions, the dataflow creators:

1. Replace linked tables with OneLake shortcuts, which provide downstream consumers with direct access to the data.
1. Update existing solutions and transition queries by replacing the `PowerPlatform.Dataflows` or `PowerBI.Dataflows` functions with the `Lakehouse.Contents` data access function in Fabric.

Here's an example PowerQuery query that's been updated to retrieve data from the customer dimension table.

```powerquery-m
let
  Source = Lakehouse.Contents([]),
  WorkspaceId = Source{[workspaceId="<0000aaaa-11bb-cccc-dd22-eeeeee333333>"]}[Data],
  LakehouseId = WorkspaceId{[lakehouseId="1111bbbb-22cc-dddd-ee33-ffffff444444"]}[Data],
  DimCustomerTable = LakehouseId{[Id="DimCustomer", ItemKind="Table"]}[Data]
in
  DimCustomerTable
```

> [!NOTE]
> You can programmatically edit query expressions in a Power BI semantic model published to Fabric by using the [XMLA endpoint](/power-bi/enterprise/service-premium-connect-tools), and by updating a table's partitioned M expression.
>
> However, be aware that once you modify the semantic model by using the XMLA endpoint, you won't ever be able to download it from the Power BI service.

### Migration scenario 3

In this migration scenario, the organization uses Power BI dataflows for self-service data preparation to support departmental usage scenarios with composable dataflows across multiple workspaces.

The dataflow creators want to take advantage of the advanced capabilities of Dataflow Gen2 for authoring, while also outputting and sharing dataflow tables from a Fabric warehouse that has granular user permissions. This approach provides flexibility, and data access can be implemented with [row-level security (RLS)](../data-warehouse/row-level-security.md), [column-level security (CLS)](../data-warehouse/column-level-security.md), and [dynamic data masking (DDM)](../data-warehouse/dynamic-data-masking.md).

To migrate their solutions, the dataflow creators:

1. Grant data access through the SQL compute engine's [granular permissions](../data-warehouse/sql-granular-permissions.md), which provide more selective access to certain users by restricting access to specific tables and schemas, as well as implementing RLS and CLS.
1. Update existing solutions and transition queries by replacing the `PowerPlatform.Dataflows` or `PowerBI.Dataflows` function with the `Fabric.Warehouse` data access function in Fabric.

Here's an example PowerQuery query that's been updated to retrieve data from the customer dimension table.

```powerquery-m
let
  Source = Fabric.Warehouse([]),
  WorkspaceId = Source{[workspaceId="0000aaaa-11bb-cccc-dd22-eeeeee333333"]}[Data],
  WarehouseId = WorkspaceId{[warehouseId="1111bbbb-22cc-dddd-ee33-ffffff444444"]}[Data],
  DimCustomerTable = WarehouseId{[Schema="dbo", Item="DimCustomer"]}[Data]
in
  DimCustomerTable
```

## Migration guidance

We recommend that you compile an inventory of your dataflows and dependent items. We also recommend that you consider using Power Query templates.

### Inventory

To help you plan your migration, your first step is to take inventory of your dataflows and all downstream solutions that depend on them. Identifying dependent items can help avoid downtime and disruption.

- **Dataflows as a source in Power BI**
  - Use the [Dataflows - Get Upstream Dataflows In Group](/rest/api/power-bi/dataflows/get-upstream-dataflows-in-group) REST API operation to identify the lineage and dependencies between a dataflow that uses linked tables. Notably, linked tables can have a depth of up to 32 references.
    - Alternatively, you can use the [Semantic Link Labs](https://github.com/microsoft/semantic-link-labs) `list_upstream_dataflows` function to simplify the process of recursively calling the `Get Upstream Dataflows In Group` REST API operation. The function iterates over all linked dataflows until it encounters a record with an empty value, indicating the end of the chain.
  - Use the [Admin - Datasets GetDatasetToDataflowsLinksInGroupAsAdmin](/rest/api/power-bi/admin/datasets-get-dataset-to-dataflows-links-in-group-as-admin) REST API operation to compile an inventory of Power BI semantic models that use dataflows within a workspace that will require updates.
  - Use the [Microsoft Fabric scanner APIs](../governance/metadata-scanning-overview.md) to retrieve the mashup query expressions from semantic models in the tenant. You can then search the expressions for any dataflow IDs to understand the complete lineage across the tenant.
- **Dataflows as a source in Power Apps**
  - Access mashup query expressions from the [Dataflow table](/power-apps/developer/data-platform/reference/entities/msdyn_dataflow) within the App Solution [Power Platform Dataflows](https://appsource.microsoft.com/product/dynamics-365/mscrm.cb8898e7-c43c-4a73-adec-cb9eea4a68ca). You can then search the expressions for any dataflow IDs to understand the complete lineage across applications within the tenant. To learn how to install and manage apps within Dynamics 365 that run on Microsoft Dataverse, see [Manage Power Apps](/power-platform/admin/manage-apps).
- **Dataflows as a source in Excel**
  - While Excel workbooks don't have a REST API to track lineage and dependencies, you can use Visual Basic for Applications (VBA) and the [WorkbookConnection object](/office/vba/api/excel.workbookconnection) to determine whether the connection string contains the text `Provider=Microsoft.Mashup.OleDb.1`, which indicates a Power Query connection. Additionally, you can use the [WorkbookQuery.Formula](/office/vba/api/excel.workbookquery.formula) property to extract Power Query formulas.
  - After tracking the lineage of your dataflows, we recommend that you update existing dataflow connections in Excel for Fabric items as follows:
    - To access the SQL analytics endpoint of a Fabric lakehouse, warehouse, or SQL database, use the [SQL Server connector](../data-factory/connector-sql-server-database-overview.md), which uses the `Sql.Database` data access function.
    - To access Fabric lakehouse file content, use the [Azure Data Lake Gen2 Storage connector](../data-factory/connector-azure-data-lake-storage-gen2-overview.md), which uses the `AzureStorage.DataLake` data access function.
    - To access a Fabric eventhouse database, use the [Azure Data Explorer connector](../data-factory/connector-azure-data-explorer-overview.md), which uses the `AzureDataExplorer.Contents` data access function.

### Power Query templates

[Power Query templates](/power-query/power-query-template) simplify the process of transferring a project between different Power Query integrations. They help streamline what could otherwise be a complex and time-consuming task. Templates encapsulate the entire Power Query project, including scripts and metadata, into a single, portable file.

Power Query templates have been designed to be compatible with various integrations, such as Power BI dataflows (Gen1) and Fabric dataflows (Gen2), ensuring a smooth transition between these services.

## Related content

For more information about this article, check out the following resources:

- [Migrate from Dataflow Gen1 to Dataflow Gen2](dataflow-gen2-migrate-from-dataflow-gen1.md)
- [Fabric pricing](https://powerbi.microsoft.com/pricing/)
- Questions? [Try asking the Fabric community](https://community.fabric.microsoft.com/)
- Suggestions? [Contribute ideas to improve Fabric](https://ideas.fabric.microsoft.com)

Fabric partners are available to help your organization succeed with the migration process. To engage a Fabric partner, visit the [Fabric partner portal](https://www.microsoft.com/microsoft-fabric/partners).
