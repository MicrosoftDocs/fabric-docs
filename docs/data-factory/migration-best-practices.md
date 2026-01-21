---
title: Migration Best Practices for Azure Data Factory to Fabric Data Factory
description: Discover best practices for ADF-to-Fabric migrations, including inventorying assets, assessing feature parity, and choosing the right migration path.
#customer intent: As an Azure Data Factory customer I want to explore best practices for migrating to Fabric Data Factory, so I can improve my data integration strategy and ensure a smooth and efficient transition.
author: kromerm
ms.author: makromer
ms.reviewer: whhender
ms.date: 09/22/2025
ms.topic: concept-article
ai-usage: ai-assisted
---

# Migration best practices for Azure Data Factory to Fabric Data Factory

Microsoft Fabric unifies Microsoft’s analytics tools into a single SaaS platform, offering robust capabilities for workflow orchestration, data movement, replication, and transformation at scale. Fabric Data Factory builds on Azure Data Factory (ADF), making it an ideal choice for modernizing data integration solutions.

This guide explores migration strategies, considerations, and approaches to help you upgrade from Azure Data Factory to Fabric Data Factory.

## Considerations before migrating

Before migrating, evaluate what to reuse, translate, or redesign. Follow these steps to ensure a smooth transition:

1. Identify authentication patterns, such as managed identity or key-based authentication.
1. Review network requirements, including private endpoints and gateways.
1. Map scheduling and trigger semantics, and align monitoring and alerting setups.
1. Compare ADF features with their Fabric counterparts, noting any gaps like SSIS or data flows.
1. Define nonfunctional targets, such as SLAs, throughput, cost limits, and observability.
1. Build a test scenario with sample datasets and expected outputs to objectively compare ADF and Fabric runs.
1. Plan for secrets rotation, naming conventions, and workspace taxonomy so your migration improves—not just reproduces—your current data integration strategy.

A phased approach with side-by-side validation and rollback plans minimizes risk while enabling faster execution, centralized monitoring, and deeper integration with Microsoft Fabric.

For large migrations, consider working with certified Microsoft partners or your Microsoft account team for guidance.

## Connections, linked services, and datasets

In Azure Data Factory (ADF), linked services and datasets define connections and data structures. In Fabric, these map to **connections** and **activity settings**, with a stronger focus on workspace-level reuse and managed identity. Here’s how to adapt your ADF assets:

1. Review [Connector continuity between Azure Data Factory and Fabric](connector-parity.md) to confirm support for your data sources and sinks.
1. Consolidate redundant connections to streamline management.
1. Adopt managed identity for secure and consistent authentication.
1. Standardize folder and table parameterization using clear naming conventions, for example: `conn-sql-warehouse-sales` or `ds-lh-raw-orders`.

To ensure consistency and scalability, fully document each source and destination with:

- Owners
- Sensitivity levels
- Retry settings

This documentation helps templatize operations across pipelines and improves governance.

## Integration runtimes and OPDG, virtual network gateway

Azure Data Factory (ADF) uses **Integration Runtimes (IRs)** to define compute resources for data processing. These include:

- **Cloud IRs** for Azure-hosted compute.
- **Self-hosted IRs (SHIRs)** for on-premises or privately networked sources.
- **SSIS IRs** for SQL Server Integration Services.
- **VNet-enabled IRs** for secure network connectivity.

In Fabric, these map to **cloud execution**, **On-premises Data Gateway (OPDG)**, and **Virtual Network Data Gateway** options. Here’s how to plan your migration:

1. Identify pipelines that rely on SHIRs and plan their gateway mapping and throughput sizing.
1. Validate DNS, egress, firewall rules, and authentication for each connector.
1. Rehearse failover scenarios to ensure reliability.
1. When possible, migrate to private endpoints or virtual network data gateways to simplify security reviews and reduce operational overhead.

Fabric simplifies compute management by using cloud-based resources within your Fabric capacities. SSIS IRs aren’t available in Fabric. For on-premises connectivity, use the [On-premises Data Gateway](how-to-access-on-premises-data.md) (OPDG). For secure network connectivity, use the [Virtual Network Data Gateway](/data-integration/vnet/overview).

When migrating:

- Public network Azure IRs don’t need to be moved.
- Recreate SHIRs as OPDGs.
- Replace VNet-enabled Azure IRs with Virtual Network Data Gateways.

## Pipeline activity differences

All core activities in Azure Data Factory (ADF), such as Copy, Lookup, Stored Procedure/SQL Script, Web, and Control flow, have direct equivalents in Fabric. However, there are some differences in properties, expression syntax, and limits. When migrating, review the following:

- Retry policies and timeouts.
- Pagination settings for REST sources.
- Binary versus tabular copy configurations.
- Foreach and filter patterns.
- System variables used in dynamic content.

Fabric often provides more native options for certain tasks. For example, use SQL Script in a Warehouse instead of a generic Stored Procedure call for better lineage and monitoring. To streamline migration, centralize common expressions like paths, dates, and tenant-specific URIs into pipeline parameters. This reduces drift and speeds up testing.

For more information, see [Activity continuity between Azure Data Factory and Fabric](compare-fabric-data-factory-and-azure-data-factory.md#activity-comparison).

## Dataflow differences

Azure Data Factory (ADF) **Mapping Data Flows** don’t directly map to Fabric. Instead, you’ll typically rework them using one of the following options:

- **Dataflow Gen2** for rowset transformations and governed, low-code transformations.
- **Fabric Warehouse SQL** for set-based ELT tasks, like MERGE or ELT operations close to the data.
- **Spark notebooks** for advanced transformations, complex logic, or large-scale processing.

When migrating, validate the following:

- Data types and null handling.
- Surrogate keys and slowly changing dimensions.
- Idempotent ELT patterns, such as staging and MERGE, to ensure predictable reruns.

For migration scenarios, see [Migrate from Dataflow Gen1 to Dataflow Gen2](dataflow-gen2-migrate-from-dataflow-gen1-scenarios.md).

## Global parameters in Azure Data Factory

Fabric uses workspace-level **Variable Libraries** to define constants Fabric items. When migrating to Microsoft Fabric Data Factory, these you’ll need to convert your Azure Data Factory global parameters to variable libraries.

For full conversion guidance, see [Convert ADF Global Parameters to Fabric Variable Libraries](convert-global-parameters-to-variable-libraries.md).

## Azure Marketplace partner offerings

Trusted migration partners, like **Bitwise Global**, provide tools to help with your migration. These tools can:

- Scan your Azure Data Factory (ADF) environment.
- Generate target Fabric artifacts.
- Perform impact analysis and lineage tracking.
- Create automated test plans.

These solutions are especially helpful if you have:

- Hundreds of pipelines.
- Diverse connectors.
- Strict downtime requirements.

Partner tools standardize mapping rules, generate conversion reports, and run parallel validation tests. This allows you to compare row counts, checksums, and performance between your old and new environments. Even if you don’t use a partner for the entire migration, their discovery and assessment modules can help you start your internal planning and reduce uncertainties.

## Use AI tools

Large language models (LLMs) like Microsoft Copilot, ChatGPT, and Claude can speed up migration tasks. These tools are useful for:

- Refactoring expressions.
- Converting Azure Data Factory (ADF) JSON to Fabric syntax.
- Writing MERGE statements.
- Generating connection templates.
- Drafting validation scripts.

You can also use them to create documentation, such as runbooks, data dictionaries, and migration checklists, ensuring engineers and operators stay aligned. However, keep these tools **in the loop, not in charge**:

- Avoid pasting sensitive information into AI tools.
- Validate all items in a development environment.
- Use automated tests like row counts, schema comparisons, and business-rule checks—to catch subtle issues, such as type mismatches or locale-specific date parsing.

For more information, see [Use Copilot in Data Factory](copilot-fabric-data-factory.md) and [AI in Microsoft Fabric](../fundamentals/copilot-fabric-overview.md).

## Migration paths

Migration paths depend on your ADF assets and their feature parity. Options include:

- [Mounting ADF items in Fabric for continuity.](migrate-pipelines-azure-data-factory-item.md)
- [Using the PowerShell conversion tool for pipelines with high parity.](migrate-pipelines-powershell-upgrade-module-for-azure-data-factory-to-fabric.md)
- Replatforming to adopt native Fabric patterns.

## Related content

[Compare Azure Data Factory to Data Factory in Fabric](compare-fabric-data-factory-and-azure-data-factory.md)