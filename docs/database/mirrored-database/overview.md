---
title: "Mirroring"
description: Learn about mirrored databases in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, chweb, maprycem, cynotebo
ms.service: fabric
ms.date: 04/01/2024
ms.topic: overview
ms.custom:
ms.search.form: Fabric Mirroring
---

# What is Mirroring in Fabric?

As a data replication experience, Mirroring in Fabric is a low-cost and low-latency solution to bring data from various systems together into a single analytics platform. You can continuously replicate your existing data estate directly into Fabric's OneLake, including data from Azure SQL Database, Azure Cosmos DB, and Snowflake.

With the most up-to-date data in a queryable format in OneLake, you can now use all the different services in Fabric, such as running analytics with Spark, executing notebooks, data engineering, visualizing through Power BI Reports, and more.

Mirroring in Fabric allows users to enjoy a highly integrated, end-to-end, and easy-to-use product that is designed to simplify your analytics needs. Built for openness and collaboration between Microsoft, and technology solutions that can read the open-source Delta Lake table format, Mirroring is a low-cost and low-latency turnkey solution that allows you to create a replica of your data in OneLake which can be used for all your analytical needs.

The Delta tables can then be used in every Fabric experience, allow users to accelerate their journey into Fabric.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

## Why use Mirroring in Fabric?

Today many organizations have mission critical operational or analytical data sitting in silos.

Accessing and working with this data today requires complex ETL (Extract Transform Load) pipelines, business processes, and decision silos, creating:

- Restricted and limited access to important, ever changing, data
- Friction between people, process, and technology
- Long wait times to create data pipelines and processes to critically important data
- No freedom to use the tools you need to analyze and share insights comfortably
- Lack of a proper foundation for folks to share and collaborate on data
- No common, open data formats for all analytical scenarios - BI, AI, Integration, Engineering, and even Apps

Mirroring in Fabric provides an easy experience to speed the time-to-value for insights and decisions, and to break down data silos between technology solutions:

- Near real time replication of data into a SaaS data-lake, with built-in analytics experiences built-in for BI and AI
   <!-- - **[Coming Soon]** The ability to edit and work with the data sources you love without leaving Fabric, enabling additional productivity for no code and pro code developers.-->

   <!-- ![Mirroring Fabric - Diagram](media/mirroring-fabric-diagram.png)-->

The Microsoft Fabric platform is built on a foundation of Software as a Service (SaaS), which takes simplicity and integration to a whole new level. To learn more about Microsoft Fabric, see [What is Microsoft Fabric?](../../get-started/microsoft-fabric-overview.md)

Mirroring creates three items in your Fabric workspace:

- Mirroring manages the replication of data into [OneLake](../../onelake/onelake-overview.md) and conversion to Parquet, in an analytics-ready format. This enables downstream scenarios like data engineering, data science, and more.
- A [SQL analytics endpoint](../../data-warehouse/get-started-lakehouse-sql-analytics-endpoint.md)
- A [Default semantic model](../../data-warehouse/semantic-models.md)

In addition to the [Microsoft Fabric SQL Query Editor](/fabric/data-warehouse/sql-query-editor), there's a broad ecosystem of tooling including [SQL Server Management Studio](/sql/ssms/download-sql-server-management-studio-ssms), [Azure Data Studio](/sql/azure-data-studio/what-is-azure-data-studio), and even GitHub Copilot.

[Sharing](#sharing) enables ease of access control and management, to make sure you can control access to sensitive information. Sharing also enables secure and democratized decision-making across your organization.

### How do I enable Mirroring in my tenant?

Power BI administrators can enable or disable Mirroring for the entire organization or for specific security groups, using the setting found in the Power BI admin portal. The Mirroring items then appear in the **Create** options. For more information, see [Enable Mirroring in your Microsoft Fabric tenant](enable-mirroring.md).

Currently, the following external databases are available in preview.

| Platform | Near real-time replication | End-to-end tutorial |
|:--|:--|:--|
| [Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db.md) | Yes | [Tutorial: Azure Cosmos DB](azure-cosmos-db-tutorial.md) |
| [Microsoft Fabric mirrored databases from Azure SQL Database](azure-sql-database.md) | Yes | [Tutorial: Azure SQL Database](azure-sql-database-tutorial.md) |
| [Microsoft Fabric mirrored databases from Snowflake](snowflake.md) | Yes |[Tutorial: Snowflake](snowflake-tutorial.md) |

## How does the near real time replication of Mirroring work?

Mirroring is enabled by creating a secure connection to your operational data source. You choose whether to replicate an entire database or individual tables and Mirroring will automatically keep your data in sync. Once set up, data will continuously replicate into the OneLake for analytics consumption.

The following are core tenets of Mirroring:

- Enabling Mirroring in Fabric is simple and intuitive, without having the need to create any more complex ETL pipelines, allocate other compute resources, and manage data movement.

- Mirroring in Fabric is a fully managed service, so you don't have to worry about hosting, maintaining, or managing replication of the mirrored connection.

## Sharing

Sharing enables ease of access control and management, while security controls like Row-level security (RLS) and Object level security (OLS), and more make sure you can control access to sensitive information. Sharing also enables secure and democratized decision-making across your organization.

By sharing, users grant other users or a group of users access to a mirrored database without giving access to the workspace and the rest of its items. When someone shares a mirrored database, they also grant access to the SQL analytics endpoint and associated default semantic model.

Access the Sharing dialog with the **Share** button next to the mirrored database name in the **Workspace** view. Shared mirrored databases can be found through **Data Hub** or the **Shared with Me** section in Microsoft Fabric.

For more information, see [Share your warehouse and manage permissions](../../data-warehouse/share-warehouse-manage-permissions.md).

## Cross-database queries

With the data from your mirrored database stored in the OneLake, you can write cross-database queries, joining data from mirrored databases, warehouses, and the SQL analytics endpoints of Lakehouses in a single T-SQL query. For more information, see [Write a cross-database query](../../data-warehouse/query-warehouse.md#write-a-cross-database-query).

For example, you can reference the table from mirrored databases and warehouses using three-part naming. In the following example, use the three-part name to refer to `ContosoSalesTable` in the warehouse `ContosoWarehouse`. From other databases or warehouses, the first part of the standard SQL three-part naming convention is the name of the mirrored database.

```sql
SELECT * 
FROM ContosoWarehouse.dbo.ContosoSalesTable AS Contoso
INNER JOIN Affiliation
ON Affiliation.AffiliationId = Contoso.RecordTypeID;
```

## Data Engineering with your mirrored database data

Microsoft Fabric provides various data engineering capabilities to ensure that your data is easily accessible, well-organized, and high-quality. From the [Fabric Data Engineering](../../data-engineering/data-engineering-overview.md) experience, you can:

- Create and manage your data as Spark using a lakehouse
- Design pipelines to copy data into your lakehouse
- Use Spark job definitions to submit batch/streaming job to Spark cluster
- Use notebooks to write code for data ingestion, preparation, and transformation

## Data Science with your mirrored database data

Microsoft Fabric offers Data Science experiences to empower users to complete end-to-end data science workflows for the purpose of data enrichment and business insights. You can complete a wide range of activities across the entire data science process, all the way from data exploration, preparation and cleansing to experimentation, modeling, model scoring and serving of predictive insights to BI reports.

Microsoft Fabric users can access the [Data Science experience](../../data-science/data-science-overview.md). From there, they can discover and access various relevant resources. For example, they can create machine learning Experiments, Models and Notebooks. They can also import existing Notebooks on the Data Science Home page.

## Related content

- [What is Microsoft Fabric?](../../get-started/microsoft-fabric-overview.md)
- [Model data in the default Power BI semantic model in Microsoft Fabric](../../data-warehouse/model-default-power-bi-dataset.md)
- [What is the SQL analytics endpoint for a Lakehouse?](../../data-engineering/lakehouse-sql-analytics-endpoint.md)
- [Direct Lake](/power-bi/enterprise/directlake-overview)
