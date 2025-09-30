---
title: How to upgrade a Power BI Datamart to a Warehouse
description: This tutorial provides a step-by-step guide to upgrade Power BI Datamart to a Warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: prlangad
ms.date: 07/16/2025
ms.topic: how-to
---
# Upgrade a Power BI Datamart to a Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This guide helps you migrate an existing Power BI datamart to Fabric Data Warehouse.

Fabric Data Warehouse is more scalable, more secure, more enterprise-ready, and provides expanded T-SQL support compared to [Power BI Datamarts](/power-bi/transform-model/datamarts/datamarts-overview), which remain a preview feature. Fabric Data Warehouse is built on next generation analytics technology and evolved from Azure Synapse Analytics and SQL Server. 

Beginning June 1, 2025, creating a new Power BI datamart will redirect to creating a new Fabric Warehouse.

> [!IMPORTANT]
> Beginning November 1, 2025, Power BI datamarts will not be supported and datamarts will be cleaned up from workspaces. To avoid losing your data and breaking reports built on top of datamarts, migrate your datamart to warehouse. To upgrade existing datamarts to Fabric Data Warehouse, follow the steps in this guide.

## Prerequisites

- You need a [P or F SKU](../enterprise/buy-subscription.md#sku-types) to create a warehouse. 
- Get a list of your datamarts: 
    - [Feature Usage and Adoption report](../admin/feature-usage-adoption.md)
    - [Purview Hub](../governance/use-microsoft-purview-hub.md)
    - [Power BI Datamarts administration](/power-bi/transform-model/datamarts/datamarts-administration)
    - [Power BI REST APIs](/rest/api/power-bi/admin)

## Migration options

You have two options for upgrading an existing datamart to a warehouse:

- Use Microsoft-published accelerator scripts for [Power BI Datamart Modernization](https://github.com/microsoft/fabric-toolbox/tree/main/accelerators/power-bi-to-fabric-data-warehouse-modernization) on GitHub. 
- Use the following manual upgrade steps.

### Manual upgrade steps

1. In your Power BI Datamart, select **Transform data** in the **Home** ribbon. Choose **Export template** to export your Power BI datamart schema and data as a template in Power Query Online.

    :::image type="content" source="media/datamart-upgrade-to-warehouse/power-query-export-template.png" alt-text="Screenshot of Power BI Desktop, showing the Home tab, and the Export template button." lightbox="media/datamart-upgrade-to-warehouse/power-query-export-template.png":::

1. In the Fabric portal, create a new blank Fabric warehouse.
1. From the **Home** tab of the warehouse, select the **Get data** drop-down, and then select **New Dataflow Gen2**.

    :::image type="content" source="media/datamart-upgrade-to-warehouse/get-data-new-dataflow-gen2.png" alt-text="Screenshot from the Fabric portal of the Get data drop-down, showing the New Dataflow Gen2 option.":::    

1. Within the new Dataflow Gen2 editor, select **Import from a Power Query template**.

    :::image type="content" source="media/datamart-upgrade-to-warehouse/import-from-a-power-query-template.png" alt-text="Screenshot from the Fabric portal of a new Dataflow Gen2, highlighting the Import from a Power Query template link.":::

1. Select **Save & run**, which will both publish your dataflow and start a refresh of your data loaded into the Fabric warehouse.
1. Connect your Power BI reports and dashboards to your Fabric Data Warehouse via the semantic model, or as a data source. 

> [!NOTE]
> [!INCLUDE [default-semantic-model-retirement](../includes/default-semantic-model-retirement.md)]

## Edit semantic models on your Fabric Data Warehouse

In Fabric Data Warehouse, the semantic model does not inherit all tables and views when created.

To learn more on how to edit data models in the Power BI service, see [Edit Data Models](/power-bi/transform-model/service-edit-data-models).

Alternatively, you can script out RLS definitions from the datamart and reapply to a new dataset programmatically. 

1. To script out the Tabular Model Scripting Language (TMSL) schema of the semantic model, you can use [SQL Server Management Studio (SSMS)](https://aka.ms/ssms). To connect, use the semantic model's connection string, which looks like `powerbi://api.powerbi.com/v1.0/myorg/myusername`. 
    - You can find the connection string for your semantic model in **Settings**, under **Server settings**. 
1. Generate an XMLA script of the semantic model via SSMS's **Script** context menu action. For more information, see [Dataset connectivity with the XMLA endpoint](/power-bi/enterprise/service-premium-connect-tools#connect-with-ssms).

## Optimize your data mart for Fabric Data Warehouse

The following are tips to optimize your upgraded datamart as a Fabric warehouse. Although optional, these topics can be helpful depending on what type of datamart features your organization is using.

### Script out and re-create row-level security (RLS) 

Row-level security (RLS) must be re-created in the warehouse, using [Role-based access control (RBAC)](../admin/roles.md) and [Row-level security in Fabric data warehousing](row-level-security.md).

Fabric warehouse supports more security and governance controls than Power BI datamarts at a granular level. 

- In datamart, the data was ingestion into tables in `dbo` schema but users were provided with corresponding views on these tables in `model` schema. Every object in datamarts is accessible via a view in the `model` schema.
- In a warehouse, to reproduce the same objects, create a new schema named `model` and create views in the `model` schema on each table. You can enforce SQL security in a view, and/or provide any custom T-SQL security as required, with more capabilities than in the datamart interface in Power BI. For more information, see [Row-level security in Fabric data warehousing](row-level-security.md).

### Incremental refresh with Dataflows Gen2

Incremental refresh is a feature that allows you to refresh only the data that has changed since the last refresh, instead of refreshing the entirety of the data. 

This can improve the performance and efficiency of your dataflows and reduce the load on your sources and destinations. For guidance on how to set up incremental refresh with Dataflow Gen2, see [Pattern to incrementally amass data with Dataflow Gen2](../data-factory/tutorial-setup-incremental-refresh-with-dataflows-gen2.md).

## Related content

- [Power BI semantic models in Microsoft Fabric](semantic-models.md)
- [Row-level security in Fabric data warehousing](row-level-security.md)
- [Datamart tenant settings](../admin/service-admin-portal-datamart.md)
