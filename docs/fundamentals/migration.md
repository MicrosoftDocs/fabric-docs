---
title: Microsoft Fabric Migration Overview
description: Overview of migration options for moving data and workloads to Fabric from various sources.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sngun
ms.date: 08/06/2025
ms.topic: overview
ms.custom:
- migration
ai-usage: ai-assisted
---
# Microsoft Fabric Migration Overview

Microsoft Fabric provides a unified analytics platform, and migrating your data and workloads to Fabric can help you take advantage of its integrated capabilities. This page summarizes all migration-related articles in the documentation, grouped by migration source.

## Migrate from legacy, on premises, or PaaS platforms

| Article | Description |
|:--|:--|
| **[Microsoft Fabric adoption roadmap](/power-bi/guidance/fabric-adoption-roadmap)** | Learn the strategic and tactical considerations and action items that lead to the successful adoption of Microsoft Fabric, and help build a data culture in your organization.|
| **[Migrate to Power BI](/power-bi/guidance/powerbi-migration-overview)** | Learn how to plan and conduct a migration from a third-party BI tool to Power BI.|

## Migrate from Azure Analysis Services

| Article | Description |
|:--|:--|
| **[Migrate Azure Analysis Services to Power BI](../enterprise/powerbi/aas-pbi-migration-overview.md)** | Migrate Microsoft Azure Analysis Services to Power BI using the Microsoft Power BI Premium migration feature in Power BI.|

## Migrate from Azure Data Factory (ADF)

| Article | Description |
|:--|:--|
| **[Planning your migration from Azure Data Factory to Data Factory in Fabric](../data-factory/migrate-planning-azure-data-factory.md)**|Plan your migration from Azure Data Factory to Fabric Data Factory.|
| **[Migrate from Azure Data Factory to Data Factory in Fabric](../data-factory/migrate-from-azure-data-factory.md)**| Learn how to migrate Azure Data Factory (ADF) to Data Factory in Microsoft Fabric. |
| **[How to Use Azure Data Factory item (Mount) in Fabric](../data-factory/migrate-pipelines-azure-data-factory-item.md)**|The Azure Data Factory item in Microsoft Fabric allows you to bring in your Azure Data Factory artifacts to Fabric instantly.|
| **[Migrate from Azure Workflow Orchestration Manager to Microsoft Fabric Apache Airflow job](../data-factory/apache-airflow-jobs-migrate-azure-workflow-orchestration-manager.md)**| Learn to migrate from Azure workflow orchestration manager to [Apache Airflow Job in Microsoft Fabric](../data-factory/create-apache-airflow-jobs.md). |

## Migrate from Azure SQL Database

| Article | Description |
|:--|:--|
| **[SqlPackage and Copy job](../database/sql/sqlpackage.md#import-a-database-with-sqlpackage)** | You can migrate from Azure SQL Database or on-premises SQL Server to SQL database in Fabric with minimal downtime using a `.bacpac` file and SqlPackage, then a [Copy job](../data-factory/what-is-copy-job.md). |



## Migrate from Azure Synapse Analytics Data Explorer

| Article | Description |
|:--|:--|
| **[Migrate from Azure Synapse Data Explorer to Fabric Eventhouse (preview)](../real-time-intelligence/migrate-synapse-data-explorer.md)** | Step-by-step guidance for migrating your Azure Synapse Data Explorer (Kusto) databases to Fabric Eventhouse.|

## Migrate from Azure Synapse Analytics dedicated SQL pools

| Article | Description |
|:--|:--|
| **[Migration Assistant for Fabric Data Warehouse (preview)](../data-warehouse/migration-assistant.md)** | Learn how to use the Migration Assistant to move data and objects from Azure Synapse Analytics SQL Data Warehouse to Fabric Data Warehouse, including supported scenarios and limitations. |
| **[Migration​ methods: ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](../data-warehouse/migration-synapse-dedicated-sql-pool-methods.md)**|Learn the methods of migration of data warehousing in Azure Synapse dedicated SQL pools to Fabric.|
| **[Migration​ planning: ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](../data-warehouse/migration-synapse-dedicated-sql-pool-warehouse.md)**|Plan for migration of data warehousing in Azure Synapse dedicated SQL pools to Fabric.|

## Migrate from Azure Synapse Analytics Spark

| Article | Description |
|:--|:--|
| **[Migrating from Azure Synapse Spark to Fabric](../data-engineering/migrate-synapse-overview.md)**| Learn about migrating from Azure Synapse Spark to Fabric, including key considerations and different migration scenarios. |
| **[Migrate data and pipelines from Azure Synapse Analytics to Fabric](../data-engineering/migrate-synapse-data-pipelines.md)** | Learn about your different options for migrating data and pipelines from Azure Synapse Analytics to Fabric. |
| **[Migrate Hive Metastore metadata from Azure Synapse Analytics to Fabric](../data-engineering/migrate-synapse-hms-metadata.md)**| Learn about your different options for migrating Hive Metastore metadata from Azure Synapse Spark to Fabric. |
| **[Migrate notebooks from Azure Synapse Analytics to Fabric](../data-engineering/migrate-synapse-notebooks.md)** | Learn about your different options for migrating your Azure Synapse Spark notebooks to Fabric. |
| **[Migrate Spark configurations from Azure Synapse Analytics to Fabric](../data-engineering/migrate-synapse-spark-configurations.md)**| Learn about migrating Spark configurations from Azure Synapse Spark to Fabric, including prerequisites and migration options. |
| **[Migrate Spark job definition from Azure Synapse to Fabric](../data-engineering/migrate-synapse-spark-job-definition.md)**| Learn about migrating Spark job definitions from Azure Synapse Spark to Fabric, including migration prerequisites and options. |
| **[Migrate Spark libraries from Azure Synapse to Fabric](../data-engineering/migrate-synapse-spark-libraries.md)**| Learn about migrating Spark libraries from Azure Synapse Spark to Fabric, including migration prerequisites and options. |
| **[Migrate Spark pools from Azure Synapse Analytics to Fabric](../data-engineering/migrate-synapse-spark-pools.md)**| Learn about migrating Apache Spark pools from Azure Synapse Spark to Fabric, including migration prerequisites and options. |

## Migrate from Power BI dataflows (Gen1)

| Article | Description |
|:--|:--|
| **[Migrate from Dataflow Gen1 to Dataflow Gen2](../data-factory/dataflow-gen2-migrate-from-dataflow-gen1.md)**|Learn how to migrate from Power BI dataflows, now known as *Dataflow Gen1*, to Dataflow Gen2 in [Data Factory](../data-factory/data-factory-overview.md) for Microsoft Fabric. |

## Migrate from Power BI datamarts

| Article | Description |
|:--|:--|
| **[Upgrade a Power BI Datamart to a Warehouse](../data-warehouse/datamart-upgrade-to-warehouse.md)** | Migrate an existing Power BI datamart to Fabric Data Warehouse. Power BI datamarts have been replaced by Fabric Data Warehouse.|

## Migrate from Spark

| Article | Description |
|:--|:--|
| **[Migrate existing workspace libraries and Spark properties to a Microsoft Fabric environment](../data-engineering/environment-workspace-migration.md)** | Learn how to migrate your existing workspace libraries and Apache Spark properties to a default [Fabric environment](../data-engineering/create-and-use-environment.md).|

## Migrate from SQL Server instances

| Article | Description |
|:--|:--|
| **[SqlPackage and Copy job](../database/sql/sqlpackage.md#import-a-database-with-sqlpackage)** | You can migrate from Azure SQL Database or on-premises SQL Server to SQL database in Fabric with minimal downtime using a `.bacpac` file and SqlPackage, then a [Copy job](../data-factory/what-is-copy-job.md). |

## Related content

- [What's new in Microsoft Fabric?](whats-new.md)
- [Migrating from Power BI capacity to Microsoft Fabric capacity](https://aka.ms/P-SKU-Blog)