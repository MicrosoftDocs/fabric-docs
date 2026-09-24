---
title: Microsoft OneLake patterns and foundational capabilities
description: Learn how OneLake patterns and platform capabilities work together to build a unified, governed data foundation for analytics and AI in Microsoft Fabric.
ms.reviewer: ofera
ms.topic: concept-article
ms.date: 08/23/2026
ms.custom: fabric-cat
ai-usage: ai-assisted
#customer intent: As an enterprise architect, I want to learn the OneLake patterns and the platform capabilities that support them so that I can choose and combine the patterns that fit my organization's data foundation.
---

# Microsoft OneLake patterns and foundational capabilities

This article introduces common OneLake patterns and the platform capabilities you can use to implement them. Use the information in this article to think through how you want to organize your data environment, then choose the patterns that fit your business, technical, and governance needs.

Each pattern describes how to organize data and ownership to accomplish a specific architectural goal. To implement a pattern, you combine one or more **foundational OneLake capabilities** - data virtualization, open data interoperability, centralized governance, and integrated analytics and AI. Each capability in turn relies on specific **product features** like shortcuts, mirroring, OneLake security, and Direct Lake mode. The same capability and feature often appear in more than one pattern.

>[!NOTE]
>This article is based on patterns identified in the [OneLake architectural guidance white paper](https://download.microsoft.com/download/fbd9c4fa-7434-4cd6-88c0-5dd540b0bc94/OneLake%20Architectural%20Guidance%20Whitepaper.pdf).

Consider these five patterns as building blocks for your OneLake design. Most environments combine more than one. Choose the patterns that match your goals:

- [Unified data access with minimal replication](#unified-data-access-with-minimal-replication) - Use OneLake to expose data from many source systems without copying it.
- [Medallion architecture (bronze, silver, gold)](#medallion-architecture-bronze-silver-gold) - Organize data to flow through three quality layers, from raw ingestion to certified business-ready data.
- [Domain-oriented data mesh on a shared platform](#domain-oriented-data-mesh-on-a-shared-platform) - Enable business domains to own and publish their own data products on a single governed foundation.
- [Platform consolidation for analytics and AI](#platform-consolidation-for-analytics-and-ai) - Configure analytics, data science, and AI workloads to run on one copy of data.
- [External data sharing across organizations](#external-data-sharing-across-organizations) - Give partners and customers access to OneLake data without exports or duplicate copies.

## Unified data access with minimal replication

If your data is spread across multiple clouds, on-premises systems, or external lakes, copying it all into one place might not be practical - or even possible. The *unified data access with minimal replication* pattern treats OneLake as a single logical data layer across those sources. Instead of building ingest pipelines for every source, you use shortcuts to reference data in place and mirroring when you need a synchronized, query-optimized copy.

Use this pattern when:

- Your data is spread across multiple clouds, on-premises systems, or external lakes.
- Replicating data into a central store would create excessive storage, latency, or compliance overhead.
- You need to onboard new sources quickly without authoring full extract, transform, load (ETL) pipelines.
- You want to preserve investments in existing data lakes, warehouses, and operational stores.

### Apply unified data access

To put this pattern into practice, start with two primary data access approaches that don't require you to build or operate data movement processes: *virtualization* makes source data available through OneLake without copying it, and *zero-ETL mirroring* brings a platform-managed, synchronized copy into OneLake as analytics-ready Delta tables. Only use Fabric data movement tools when these approaches don't support the source or meet your requirements. For additional guidance on choosing and combining these approaches, see [Unify data with OneLake shortcuts and mirroring](unify-data.md).

1. Inventory your data sources to determine which ones OneLake can access through virtualization or zero-ETL mirroring: cloud object storage, external catalogs, operational databases, and Dataverse. Flag any remaining sources as needing a data movement approach.

1. Choose the right data access technique for each supported source. Prefer virtualization when the source supports no-copy access. Use zero-ETL mirroring when the source requires a synchronized, query-optimized copy:

  | Source data | How to access it | Data handling |
  |---|---|---|
  | Cloud object storage (Azure Data Lake Storage Gen2, Amazon S3, Google Cloud Storage) and S3-compatible on-premises storage | [Shortcuts](onelake-shortcuts.md) | **Virtualization**: Makes source data available without copying it |
  | Data managed in an external catalog that you want to make available without copying (for example, Azure Databricks Unity Catalog) | [Metadata mirroring](../mirroring/overview.md) - syncs only catalog metadata (schemas, tables) and accesses the source data through shortcuts | **Virtualization**: Makes source data available without copying it |
  | Operational databases that need a query-optimized copy (Azure SQL Database, Azure Cosmos DB, Snowflake, PostgreSQL, SQL Server 2025, Oracle Database, Google BigQuery) | [Database mirroring](../mirroring/overview.md), or [open mirroring](../mirroring/open-mirroring.md) for supported custom and partner solutions | **Zero-ETL mirroring**: Creates a synchronized Delta copy |
  | Dataverse (Dynamics 365 and Power Platform data) | [Shortcuts](onelake-shortcuts.md) or [Link to Microsoft Fabric](/power-apps/maker/data-platform/fabric-link-to-data-platform) for zero-copy access | **Virtualization**: Makes source data available without copying it |

1. Transform source data when needed. Shortcut transformations can process supported files exposed through a shortcut, whether the files are stored externally or already in OneLake. Use [shortcut file transformations](shortcuts/transformations.md) to convert structured files into Delta tables or [shortcut AI transformations](shortcuts/transformations-ai.md) to process unstructured text. Shortcut transformations create transformed Delta output and keep it synchronized with the data referenced by the shortcut.

1. Use Fabric data movement tools when virtualization and mirroring don't support a source or when you need complex transformations, orchestration, a scheduled movement cadence, or streaming ingestion. For help choosing among pipelines, dataflows, copy jobs, and eventstreams, see [Choose a data movement strategy](../data-factory/decision-guide-data-movement.md).

  When you do choose data movement, land copied data in an open table format, such as [Delta Parquet](../fundamentals/delta-lake-overview.md) or [Iceberg](onelake-iceberg-tables.md). Mirroring and shortcut transformations already create Delta output. Using open formats keeps virtualized data, synchronized copies, and transformed Delta output readable by Fabric engines and external platforms.

1. Record the reason whenever you create a synchronized copy, transformed Delta output, or a copy through Fabric data movement tools. This record keeps the decision auditable. Create a copy only when a source needs a physical, query-optimized layout or can't meet your freshness, transformation-cost, compliance, or processing requirements virtually.

1. Apply [OneLake security](security/get-started-onelake-security.md) to the data made available through OneLake so the same policies cover virtualized data, synchronized copies, and transformed Delta output.

1. Endorse and describe the resulting data items in the [OneLake catalog](../governance/onelake-catalog-overview.md) so consumers can find and trust them.

### Unified data access capabilities

- **Data virtualization** and **zero-ETL mirroring** - Expose data that lives in other systems and clouds through no-copy references or synchronized, analytics-ready copies. Features:
  - [Shortcuts](onelake-shortcuts.md) make source data available in OneLake without copying it.
  - [Metadata mirroring](../mirroring/overview.md) synchronizes external catalog metadata and accesses source data through shortcuts.
  - [Shortcut file transformations](shortcuts/transformations.md) and [shortcut AI transformations](shortcuts/transformations-ai.md) convert source data into synchronized Delta output.
- **Centralized governance** - Apply consistent security and discovery to virtualized sources just as you would to native OneLake data. Features:
  - [OneLake security](security/get-started-onelake-security.md) and the [data access control model](security/data-access-control-model.md) apply consistent access policies to data in OneLake.
  - [OneLake catalog](../governance/onelake-catalog-overview.md) supports discovery and endorsement.
- **Open data interoperability** - Keep virtualized data and platform-managed copies readable by both Fabric engines and external platforms. Features:
  - [Iceberg tables in OneLake](onelake-iceberg-tables.md) make Iceberg data available to Fabric and external engines.
  - [Delta Parquet](../fundamentals/delta-lake-overview.md) is an open table format for storing analytics-ready data.
  - [OneLake access and APIs](onelake-access-api.md) let external applications and tools access OneLake data.

## Medallion architecture (bronze, silver, gold)

Making data available in OneLake is only the first step. Raw data from source systems usually isn't safe to use directly for analytics or AI. It often contains duplicates, errors, inconsistent formats, or sensitive fields. When multiple teams build on the same source data, they need a shared definition of what each stage of data is trusted for.

The *medallion architecture* pattern organizes data in OneLake into three quality layers: bronze for raw, immutable source data; silver for cleansed and conformed data; and gold for certified, business-ready tables and semantic models. Each layer is a defined stage that downstream consumers can depend on. Silver and gold tables are reusable across BI, analytics, and AI workloads, so teams don't rebuild the same cleansing or modeling logic in separate tools.

Use this pattern when:

- Multiple teams build on the same source data and need consistent quality.
- You need traceable lineage from raw inputs to certified outputs.
- You need a clear contract between data engineering and analytics or AI consumers.

For more information about this pattern, see [Understand medallion architecture for Fabric with OneLake](onelake-medallion-lakehouse-architecture.md). That article covers layer design, deployment models, storage formats, materialized lake views, and Delta table optimization.

### How to apply it

A working medallion hinges on one idea: each layer is a contract with downstream consumers, and data only advances to the next layer after it meets that layer's quality standards.

1. Identify your raw sources and the consumers who depend on certified data.
1. Define what belongs in each layer, and apply these definitions consistently across domains:

   | Layer | Contents | Typical consumers |
   |---|---|---|
   | Bronze | Raw, immutable data captured directly from sources with no schema enforcement | Data engineers (limited access) |
   | Silver | Cleansed, deduplicated, and conformed to shared business definitions | Data engineers and trained analysts |
   | Gold | Curated, business-ready tables and semantic models | All BI, analytics, and AI consumers |

1. Produce each layer with the right Fabric workload - typically [Data Engineering](../data-engineering/index.yml) (Spark) or [Data Factory](../data-factory/index.yml) for bronze and silver, and [Data Warehouse](../data-warehouse/index.yml) or Power BI semantic models for gold. Preserve source fidelity in bronze by using the original format, a shortcut to source data, Parquet, or Delta as appropriate. Use Delta tables for silver and gold so Fabric workloads can reliably read and write the refined data.
1. Apply layer-aware access policies. Use [OneLake security](security/get-started-onelake-security.md) for supported items and the applicable Fabric and SQL permissions for warehouses. Restrict access to bronze, make silver available to analysts, and grant access to gold based on consumer needs and least privilege standards.
1. Use curated gold outputs for downstream analytics. Build gold-layer semantic models on [Direct Lake mode](../fundamentals/direct-lake-overview.md) so Power BI can read OneLake data without creating an imported copy or requiring scheduled refreshes.
1. Confirm that every gold output has traceable lineage through silver to its bronze sources. Then, endorse gold-layer tables and semantic models as certified in the [OneLake catalog](../governance/onelake-catalog-overview.md). This validation helps consumers identify which data is ready for production use.
1. Reuse gold semantic models to jump-start [Fabric IQ ontologies](../iq/ontology/concepts-generate.md). This step gives AI agents governed business context grounded in certified data.

### Foundational capabilities

- **Integrated analytics and AI** - Bronze, silver, and gold layers feed every analytics and AI workload on OneLake without engine-specific copies. Features:
  - [Medallion lakehouse architecture in OneLake](onelake-medallion-lakehouse-architecture.md) provides design guidance for the three layers.
  - [Direct Lake mode](../fundamentals/direct-lake-overview.md) lets Power BI semantic models read gold-layer data directly from OneLake.
  - Fabric workloads such as [Data Engineering](../data-engineering/index.yml) and [Data Warehouse](../data-warehouse/index.yml) produce and refine the layers.
- **Centralized governance** - Apply different access policies and quality gates at each layer so consumers only see data appropriate to their role. Features:
  - [OneLake security](security/get-started-onelake-security.md) enforces layer-aware access policies.
  - [OneLake catalog](../governance/onelake-catalog-overview.md) supports layer-aware discovery and certification.
  - [Microsoft Purview](../governance/microsoft-purview-fabric.md) applies sensitivity labels and audit.
- **Open data interoperability** - Store the layers in open formats so external engines can read them alongside Fabric. Features:
  - [Delta Parquet](../fundamentals/delta-lake-overview.md) is an open table format for storing refined layer data.
  - [Iceberg tables in OneLake](onelake-iceberg-tables.md) make layer data available to Iceberg-compatible engines.
  - [OneLake access and APIs](onelake-access-api.md) let external applications and tools access layer data.

## Domain-oriented data mesh on a shared platform

If you have multiple business teams producing and consuming data, routing every request through a single central data team can slow delivery. Business teams often understand their own data and requirements best, but decentralizing ownership without shared governance can lead to inconsistent security, quality, and lineage.

The *domain-oriented data mesh* pattern gives each business domain ownership of its own data products while all domains follow shared standards on a OneLake foundation. Each domain publishes its own data products, and other domains access them through shortcuts and consume them with Fabric analytics and AI workloads. Centralized identity, security, and governance policies apply uniformly across all domains.

Use this pattern when:

- A single central data team becomes a bottleneck for delivery.
- Different business domains have distinct data, requirements, and release cadences.
- You need clear accountability for data quality at the domain level without giving up enterprise-wide governance.

### Apply a domain-oriented data mesh

Find the right balance between decentralization and consistency. Push ownership to the domain that knows the data best, and keep identity, security, and lineage centralized so every domain's data products meet the same standards.

1. Identify your business domains. Each domain should represent a coherent area of the business with a team that can own and operate its data products end-to-end.
1. Create a [domain](../governance/domains.md) for each business area and assign workspaces to it. Set up a separate central domain for shared infrastructure and reusable enterprise data.
1. Define data product standards that every domain must meet - for example, endorsement or certification requirements, documented schemas, ownership metadata, versioning, and service-level agreements (SLAs). These standards make each product a reusable, discoverable contract rather than just a workspace folder.
1. Use [OneLake security](security/get-started-onelake-security.md) to apply role-based data access controls at the folder, table, row, and column level so producers can publish data products without exposing everything in their workspace.
1. Apply tenant-wide governance with the [OneLake catalog](../governance/onelake-catalog-overview.md) for cross-domain discovery and lineage, and [Microsoft Purview](../governance/microsoft-purview-fabric.md) for sensitivity labels and audit. Extend the same identity and policy model to AI agents that consume domain data products, so agent access is governed like any other consumer's.
1. Have consumer domains use [shortcuts](onelake-shortcuts.md) to reference producer data products rather than copying them. Consumers can then use the referenced data products in the Fabric workload that fits their needs. For Power BI semantic models, use [Direct Lake mode](../fundamentals/direct-lake-overview.md) to read data directly from OneLake. Use [Fabric Data Agents](../data-science/concept-data-agent.md) or [Fabric IQ](../iq/index.yml) to create AI experiences grounded in governed domain data products.
1. If domains publish to catalogs outside Fabric, plan for access-control synchronization so permissions stay consistent between OneLake and the external catalog.

   > [!TIP]
   > The Microsoft open-source accelerator [Policy Weaver](https://github.com/microsoft/fabric-toolbox/tree/main/accelerators/policy-weaver) can automate this synchronization for Azure Databricks (Unity Catalog), Snowflake, and Dataverse sources. It mirrors data-access policies into OneLake security roles, complementing mirroring (which moves data but not permissions).

### Data mesh capabilities

- **Centralized governance** - Decentralize ownership to domains while keeping identity, security, and lineage centralized. Features:
  - [Domains](../governance/domains.md) group workspaces by business area.
  - [OneLake security](security/get-started-onelake-security.md) provides role-based folder, table, row, and column access controls.
  - [OneLake catalog](../governance/onelake-catalog-overview.md) enables cross-domain discovery and lineage.
  - [Microsoft Purview](../governance/microsoft-purview-fabric.md) applies sensitivity labels and audit.
- **Data virtualization** - Let consumer domains use producer-owned data products through references rather than copies. Features:
  - [Shortcuts](onelake-shortcuts.md) enable zero-copy sharing between domains.
- **Integrated analytics and AI** - Make every domain's data products consumable across Fabric workloads. Features:
  - [Direct Lake mode](../fundamentals/direct-lake-overview.md) lets Power BI semantic models read domain data products directly from OneLake.
  - Fabric workloads such as [Data Engineering](../data-engineering/index.yml), [Data Warehouse](../data-warehouse/index.yml), [Real-Time Intelligence](../real-time-intelligence/index.yml), and [Data Science](../data-science/index.yml) process and analyze domain data products.
  - [Fabric Data Agents](../data-science/concept-data-agent.md) and [Fabric IQ](../iq/index.yml) support AI experiences grounded in domain data products.

## Platform consolidation for analytics and AI

If you run several analytics platforms side by side - separate tools for data warehousing, business intelligence, data science, real-time analytics, and AI - each tool comes with its own data copies, pipelines, and governance model. That fragmentation drives up cost and makes it hard to apply consistent security or get a single answer to a business question.

The *platform consolidation* pattern brings these workloads onto Fabric, where OneLake provides a shared, governed data foundation. Fabric workloads access, transform, synchronize, or analyze data through this foundation instead of relying on separate data and governance models for each tool.

Use this pattern when:

- You're using multiple analytics platforms with overlapping capabilities.
- Engine-specific data copies and pipelines drive cost and maintenance overhead.
- You need a single governance and security model across all analytics and AI workloads.

### Apply platform consolidation

Aim for fewer platforms, not more integrations. Consolidate workloads in Fabric instead of bridging tools together, and bridge external engines only when you can't retire them yet.

1. Inventory the analytics, data warehousing, data science, business intelligence (BI), and AI tools and pipelines you use today. Note which workloads each tool serves and what data it copies.
1. Map each existing workload to the Fabric workload that can replace it:

   | Legacy workload | Fabric workload |
   | --- | --- |
   | Data orchestration and ETL | [Data Factory](../data-factory/index.yml) |
   | Spark notebooks and lakehouse processing | [Data Engineering](../data-engineering/index.yml) |
   | SQL data warehousing | [Data Warehouse](../data-warehouse/index.yml) |
   | Streaming and KQL analytics | [Real-Time Intelligence](../real-time-intelligence/index.yml) |
   | ML model training and experiment tracking | [Data Science](../data-science/index.yml) |
   | Operational databases | [Databases](../database/index.yml) (SQL database in Fabric and Cosmos DB in Fabric) |
   | BI visualization and semantic models | Power BI with [Direct Lake mode](../fundamentals/direct-lake-overview.md) |
   | Conversational AI grounded on enterprise data | [Fabric Data Agents](../data-science/concept-data-agent.md), [Copilot for Fabric](../fundamentals/copilot-fabric-overview.md), [Fabric IQ](../iq/index.yml) |

1. Establish one governance and security model across all workloads using [OneLake security](security/get-started-onelake-security.md), [Microsoft Purview](../governance/microsoft-purview-fabric.md), and the [OneLake catalog](../governance/onelake-catalog-overview.md). Configure [customer-managed keys](../security/workspace-customer-managed-keys.md) when supported Fabric items require another layer of encryption.
1. Consolidate analytical data in OneLake by using Delta or Iceberg format so workloads can share a governed data foundation. Include operational workloads by consolidating them onto [Fabric Databases](../database/index.yml), which make synchronized analytical data available in OneLake.
1. Ground AI on the consolidated data. Build [ontologies (preview)](../iq/ontology/concepts-generate.md) over your curated data layer and expose them to agents through the [Ontology MCP server](../iq/ontology/how-to-use-ontology-mcp-server.md), so Fabric Data Agents, Microsoft 365 Copilot, and external tools reason over the same governed context. You can generate ontology definitions from Power BI semantic models in Import, Direct Lake, or DirectQuery mode. Use [Direct Lake mode](../fundamentals/direct-lake-overview.md) when you need generated bindings to supported OneLake data, and review the current ontology limitations.
1. For external engines you can't retire yet, expose OneLake data to them through [Azure Databricks integration](onelake-azure-databricks.md), [Iceberg interoperability with Snowflake](onelake-iceberg-snowflake.md), or [OneLake access and APIs](onelake-access-api.md).
1. Retire the replaced tools, data copies, and pipelines after you validate the Fabric equivalent. That way the consolidation removes cost, licenses, and hand-offs rather than adding another platform to the pile.

### Platform consolidation capabilities

- **Integrated analytics and AI** - Bring analytics, data science, and AI workloads together on a shared OneLake foundation. Features:
  - Fabric workloads such as [Data Factory](../data-factory/index.yml), [Data Engineering](../data-engineering/index.yml), [Data Warehouse](../data-warehouse/index.yml), [Real-Time Intelligence](../real-time-intelligence/index.yml), [Data Science](../data-science/index.yml), [Databases](../database/index.yml), and Power BI access, transform, synchronize, or analyze data through the shared foundation.
  - [Direct Lake mode](../fundamentals/direct-lake-overview.md) lets Power BI semantic models read OneLake data directly.
  - [Fabric Data Agents](../data-science/concept-data-agent.md), [Copilot for Fabric](../fundamentals/copilot-fabric-overview.md), and [Fabric IQ](../iq/index.yml) support AI experiences grounded in OneLake data.
  - [Ontologies](../iq/ontology/concepts-generate.md) and the [Ontology MCP server](../iq/ontology/how-to-use-ontology-mcp-server.md) provide governed business context to AI agents.
  - [OneLake as a knowledge source for Microsoft Foundry](onelake-foundry-knowledge.md) lets Foundry index OneLake files for use by AI agents.
- **Open data interoperability** - Let external platforms that you don't retire keep reading the same data. Features:
  - [Iceberg tables in OneLake](onelake-iceberg-tables.md) and [Delta Parquet](../fundamentals/delta-lake-overview.md) keep data in open table formats.
  - [OneLake access and APIs](onelake-access-api.md) let external applications and tools access OneLake data.
  - [Azure Databricks integration](onelake-azure-databricks.md) and [Iceberg interoperability with Snowflake](onelake-iceberg-snowflake.md) let external analytics platforms read OneLake data.
- **Centralized governance** - Replace per-tool security models with one governance and audit model that spans every workload. Features:
  - [Fabric governance](../governance/index.yml) provides a common governance framework across Fabric workloads.
  - [OneLake security](security/get-started-onelake-security.md) applies consistent data access controls.
  - [OneLake catalog](../governance/onelake-catalog-overview.md) supports discovery and lineage across workloads.
  - [Microsoft Purview integration](../governance/microsoft-purview-fabric.md) applies sensitivity labels and audit.
  - [Customer-managed keys](../security/workspace-customer-managed-keys.md) add another layer of encryption to supported Fabric items.

## External data sharing across organizations

If you exchange data with partners, suppliers, customers, or other divisions on an ongoing basis, batch exports, file transfers, and duplicated downstream systems add latency, cost, and governance gaps. The *external data sharing* pattern gives consumers outside your organization or business division direct access to curated OneLake data without recurring exports. Consumers can access the data through Fabric cross-tenant sharing or from external analytics platforms such as Snowflake and Azure Databricks by using OneLake interoperability capabilities.

Consumers see updates as you publish them. You control access to the source data through the sharing or interoperability mechanism that supports the consumer's platform.

Use this pattern when:

- You exchange data with external organizations on an ongoing basis.
- Batch exports or file transfers add latency, complexity, or governance gaps.
- You need to track and revoke external access centrally.

### Apply external data sharing

External sharing works best when you use virtualization instead of exporting data. Match the access method to what each consumer can read, and apply the access controls supported by that sharing or interoperability mechanism.

1. Identify the data products you want to share externally and the consumers who need them (partners, suppliers, customers). Typically, you share curated tables and files that are well-defined and documented.
1. Choose the right sharing approach for each consumer:

   | Consumer type | Recommended approach |
   |---|---|
   | Fabric users in another tenant | [External data sharing](../governance/external-data-sharing-overview.md) for read-only, virtualized cross-tenant access |
   | Snowflake on Azure users | [Iceberg interoperability with Snowflake](onelake-iceberg-snowflake.md) to read Fabric tables exposed in Iceberg format |
   | Azure Databricks users | [OneLake catalog federation in Azure Databricks](/azure/databricks/query-federation/onelake) to query OneLake tables through Unity Catalog without copying data |
   | Applications or tools that support ADLS Gen2 or Blob APIs | [OneLake access and APIs](onelake-access-api.md) to access OneLake data through supported APIs |

   To bring Dataverse data into OneLake before sharing it, use the [unified data access pattern](#unified-data-access-with-minimal-replication).

1. Scope external access with the permissions supported by the selected sharing mechanism. For Fabric external data sharing, the share grants read-only access to any user in the invited user's home tenant. Provider-side security and governance policies, including OneLake security, sensitivity labels, and data loss prevention policies, aren't enforced in the consumer's tenant. The consumer must govern downstream access in their environment.
1. Agree on the terms of each sharing relationship up front - what is shared, with whom, and for how long. For Fabric external data sharing, revoke access from the **External data shares** tab on the **Manage permissions** page. For other approaches, revoke access through the selected sharing mechanism. Confirm that the consumer loses visibility.
1. Apply sensitivity labels, audit, and data loss prevention with [Microsoft Purview](../governance/microsoft-purview-fabric.md) in the provider's Fabric environment.
1. Endorse and document the source data products in the [OneLake catalog](../governance/onelake-catalog-overview.md) so providers can find and govern them before sharing. The OneLake catalog doesn't publish data products to external tenants or analytics platforms.

### External data sharing capabilities

- **Data virtualization** - Share data through no-copy references without managing export pipelines. Features:
  - [External data sharing](../governance/external-data-sharing-overview.md) provides virtualized sharing between Fabric tenants.
  - [Shortcuts](onelake-shortcuts.md) let partners consume published data without copying it.
- **Open data interoperability** - Share with consumers who don't use Fabric by publishing in open formats. Features:
  - [Iceberg tables in OneLake](onelake-iceberg-tables.md) publish shared data in an open table format.
  - [Iceberg interoperability with Snowflake](onelake-iceberg-snowflake.md) lets Snowflake consumers read shared OneLake data.
  - [OneLake catalog federation in Azure Databricks](/azure/databricks/query-federation/onelake) lets Azure Databricks consumers query OneLake tables through Unity Catalog without copying data.
  - [OneLake access and APIs](onelake-access-api.md) let compatible applications and tools access OneLake data.
- **Centralized governance** - Govern source data in Fabric and control external access through each sharing mechanism. Features:
  - [OneLake security](security/get-started-onelake-security.md) scopes access to source data in Fabric.
  - [Microsoft Purview](../governance/microsoft-purview-fabric.md) applies sensitivity labels, audit, and data loss prevention in the provider's Fabric environment.
  - [OneLake catalog](../governance/onelake-catalog-overview.md) supports provider-side discovery and endorsement before sharing.
