---
title: OneLake, the unified data lake
description: OneLake is included with every Microsoft Fabric tenant and is designed to be the single place for all your analytics data.
ms.reviewer: eloldag # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: overview
ms.date: 03/09/2026
ai-usage: ai-assisted
#customer intent: As a data analyst, I want to understand the benefits of using OneLake so that I can effectively manage and analyze all the analytics data for my organization.
---

# What is OneLake?

Microsoft OneLake is a unified data lake for your whole organization. Every Microsoft Fabric tenant automatically includes OneLake, and it's the single place for all your analytics data. It's a central repository where you can store, manage, and govern all your data for analytics and AI workloads across the organization.

OneLake is built on Azure Data Lake Storage and stores tables in Delta Parquet or Iceberg format, two open standards that any tool can read. This approach means your data isn't locked into proprietary formats.

OneLake provides:

* **Unified data storage** for the entire organization with built-in governance and security
* **One copy of data** to use with multiple analytical engines without duplication
* **Flexible connectivity** through file explorer, ADLS Gen2 APIs, and Azure service integrations
* **Data protection and monitoring** with built-in redundancy, disaster recovery, and access diagnostics

## Unified data storage

Before OneLake, organizations often created multiple lakes for different business groups, which led to extra overhead for managing multiple resources. This siloed approach made it difficult to collaborate across teams, slowed down data projects, and increased the risk of duplication.

OneLake solves these challenges by giving you a central data access point for the entire organization. Every Fabric tenant comes with a single OneLake instance. You can't delete OneLake or create multiple OneLakes, and there's no infrastructure to provision or manage. Departments, teams, and projects can store or connect to their data in this unified lake and organize it using Fabric domains, sub-domains, and workspaces - each with their own administrator. This model maintains data ownership and enables federated governance, while still allowing authorized users to discover and use data without friction.

### Centrally managed with distributed ownership

Fabric data exists in the following hierarchy for organization and governance:

* **Tenant**: Tenant-level policies automatically protect any data that lands in OneLake for security, compliance, and data management.
* **Workspace**: You can create any number of workspaces in your tenant to organize your data. Workspaces enable different parts of the organization to distribute ownership and access policies. Each workspace is part of a capacity that's tied to a specific region and billed separately.
* **Data items**: Workspaces contain data items like lakehouses, warehouses, eventhouses, and KQL databases. Each item type is purpose-built for specific workloads like Spark-based analytics, T-SQL queries, real-time streaming, and more.

:::image type="content" source="media\onelake-overview\onelake-foundation-for-fabric.png" alt-text="Diagram showing the function and structure of OneLake." lightbox="media\onelake-overview\onelake-foundation-for-fabric.png":::

For more information, see [Workspaces](../fundamentals/workspaces.md).

### Discover and govern with the OneLake catalog

The OneLake catalog is the single place for data professionals and business users to discover, manage, and govern the data they own and can access across OneLake.

Users can filter by domain, workspace, item type, endorsements, and more to locate exactly what they need, with each data item enriched by metadata such as descriptions, owners, schema, lineage, and usage metrics.

Data owners can get insights and recommended actions to improve data quality and compliance, including visibility into sensitivity label coverage, tagging, endorsements, and data location.

For more information, see [OneLake catalog](../governance/onelake-catalog-overview.md).

### Security

OneLake’s security model lets you share data broadly without exposing sensitive information. By using OneLake security roles, you can define granular permissions on data items, down to specific folders, tables, or even rows and columns. For example, you could share a sales dataset with a team but restrict access to the `Cost` column, or you could allow a partner to see only rows where `Region = "US"`. OneLake stores these roles and automatically enforces them across all analytics experiences. So, if a user has access to only part of a dataset, that rule applies whether they query via SQL, run a Spark notebook, or view a Power BI report. OneLake ensures they see only what they’re permitted to see.

This unified approach to security means users don't have to maintain separate permissions across different engines. It also means the original data owners always maintain control over who can access the data source, even if the data is passed to a lakehouse or workspace owned by someone else.

You can apply sensitivity labels to OneLake items just like you would to a document, and those labels enforce encryption or access restrictions even if the data is exported to Excel or another tool. Likewise, data loss prevention (DLP) policies can detect sensitive data uploads or downloads from OneLake and prevent or alert on potential data leaks.

For more information, see [Get started securing your data in OneLake](security/get-started-onelake-security.md).

## One copy of data

All Fabric analytics engines work with data directly in OneLake. You don't need to copy data to use it with another engine or analyze data from multiple sources.

### Shortcuts

A shortcut is a reference to data stored in other file locations. These file locations can be within the same workspace, a different workspace in OneLake, or external to OneLake. You can use shortcuts for OneLake, Azure Data Lake Storage, Azure Blob storage, Amazon S3 and S3 compatible sources, Iceberg-compatible sources, Microsoft Dataverse, on-premises sources, and more. No matter the location, shortcuts make files and folders look like you have them stored locally.

Shortcuts allow your organization to unify data across clouds and domains without copying it. Teams can work independently in separate workspaces and use shortcuts to share data with each other instead of duplicating it. For example, one team could create a shortcut to a dataset in another team’s workspace or to an external S3 bucket, and then combine that data with their own in OneLake. The shortcut points to the source, so when the source data updates, those changes are immediately visible through OneLake. This way, you can create virtual products or views that pull together data from multiple business groups to fit a specific need, without moving or duplicating the data. By using shortcut transformations, you can even apply automatic changes to the data like converting the data format or removing personally identifiable information (PII).

:::image type="content" source="media\onelake-overview\fabric-shortcuts-structure-onelake.png" alt-text="Diagram showing how shortcuts connect data across workspaces and items." lightbox="media\onelake-overview\fabric-shortcuts-structure-onelake.png":::

For more information on how to use shortcuts, see [OneLake shortcuts](onelake-shortcuts.md).

### Mirroring

Mirroring in Fabric is a low-cost, low-latency solution that continuously replicates data from various systems into OneLake. You can securely connect to an external data source and automatically mirror (copy) selected databases or tables into OneLake’s open format, keeping them in sync in near real-time. The mirrored data is stored as Delta Parquet in OneLake, so it’s immediately ready for analysis by any Fabric engine.

Mirroring supports sources like Azure SQL Database, Azure Cosmos DB, Azure Database for PostgreSQL, Azure Databricks (Unity Catalog), Snowflake, and more. Changes in the source are continuously propagated, so your OneLake copy stays up-to-date without manual ETL jobs. You can run analytics, AI, or Power BI reports on fresh data without directly querying the production source.

For more information, see [What is mirroring in Fabric?](../mirroring/overview.md)

### Collaborate in multiple analytical engines

The Fabric analytical engines (T-SQL, Apache Spark, Analysis Services, and others) all store data in OneLake in the open Delta Parquet format. This standardization allows you to use the same data across multiple engines. You don't need to copy data just to use it with another engine or feel stuck with using a particular engine because that's where your data is.

For example, a team of SQL engineers builds a fully transactional data warehouse. They use the T-SQL engine to create tables, transform data, and load the data to tables. If a data scientist wants to make use of this data, they can attach a Spark notebook to OneLake and read those tables directly. Because OneLake stores the tables in Delta format, Spark can load them without any special connectors or data exports. Both the SQL queries and the Spark jobs operate on the one copy of the data in OneLake.

Additionally, business users can build Power BI reports on top of OneLake by using the Direct Lake mode in the Analysis Services engine. Direct Lake mode is a data access mode that loads and refreshes large volumes of data quickly without making a copy. For more information, see [Direct Lake overview](/power-bi/enterprise/directlake-overview).

:::image type="content" source="media\onelake-overview\use-same-copy-of-data.png" alt-text="Example diagram showing loading data using Spark, querying using T-SQL, and viewing the data in a Power BI report." lightbox="media\onelake-overview\use-same-copy-of-data.png":::

### Open table format interoperability

OneLake supports both Delta Lake and Apache Iceberg table formats through **metadata virtualization**. This feature automatically generates virtual metadata so that Iceberg tables can be read as Delta Lake tables across Fabric workloads, and Delta Lake tables can be read by external Iceberg readers. You can write Iceberg tables directly to OneLake or create shortcuts to Iceberg tables stored externally, and OneLake makes them available to all Fabric engines without manual conversion. Similarly, any Delta Lake table in OneLake can be accessed by Iceberg-compatible services like Snowflake.

For more information, see [Use Iceberg tables with OneLake](onelake-iceberg-tables.md).

## Connect to OneLake

You can access OneLake data from the Fabric portal, Windows, existing Azure tools, or any application that supports ADLS Gen2 APIs.

### OneLake file explorer for Windows

You can explore OneLake data from Windows by using the OneLake file explorer for Windows. You can navigate all your workspaces and data items, easily uploading, downloading, or modifying files just like you do in Office. The OneLake file explorer simplifies working with data lakes, so even nontechnical business users can use them.

For more information, see [OneLake file explorer](onelake-file-explorer.md).

### ADLS Gen2 APIs and SDKs

OneLake supports Azure Data Lake Storage (ADLS) Gen2 APIs and SDKs, so you can use existing ADLS Gen2 applications. Every workspace appears as a container, and data items appear as folders within those containers. For more information, see [OneLake access and APIs](onelake-access-api.md).

:::image type="content" source="media\onelake-overview\access-onelake-data-other-tools.png" alt-text="Diagram showing how you can access OneLake data with APIs and SDKs." lightbox="media\onelake-overview\access-onelake-data-other-tools.png":::

Because OneLake is compatible with ADLS Gen2 applications, you can connect to OneLake from Azure services. For example:

* [Azure Synapse Analytics](onelake-azure-synapse-analytics.md)
* [Azure Storage Explorer](onelake-azure-storage-explorer.md)
* [Azure Databricks](onelake-azure-databricks.md)
* [Microsoft Foundry](onelake-foundry-knowledge.md)

## Data protection and monitoring

OneLake includes built-in capabilities to keep your data safe and give you visibility into how it's being used.

### Disaster recovery and data protection

OneLake automatically protects your data with built-in redundancy. In regions that support availability zones, OneLake uses zone-redundant storage (ZRS) to replicate data across multiple datacenters. In other regions, it uses locally redundant storage (LRS). For additional protection against region-wide outages, you can enable business continuity and disaster recovery (BCDR) on a capacity to geo-replicate your data to a paired Azure region. OneLake also supports soft delete, which retains deleted files for seven days so you can recover from accidental deletions.

For more information, see [Disaster recovery and data protection for OneLake](onelake-disaster-recovery.md).

### Diagnostics

OneLake diagnostics provides visibility into how data is accessed and used across your Fabric environment. When you enable diagnostics at the workspace level, it streams data access events as logs into a lakehouse. You can track who accessed what data, when, and how. This logging covers user actions in the Fabric UI, programmatic access via APIs and analytics engines, and cross-workspace access through shortcuts.

For more information, see [OneLake diagnostics](onelake-diagnostics-overview.md).

## Related content

* [Get started with OneLake data](quickstart-get-data.md)
* [OneLake file explorer for Windows](onelake-file-explorer.md)
* [OneLake shortcuts](onelake-shortcuts.md)
* [OneLake access and APIs](onelake-access-api.md)
