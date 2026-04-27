---
title: Complete Synapse to Fabric migration with security, validation, and cutover
description: Map security and governance controls, validate migrated workloads, and execute cutover from Synapse Spark to Fabric Spark.
ms.topic: how-to
ms.date: 04/28/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Phase 4: Security and governance migration

This article is Phase 4 of 4 in the Azure Synapse Spark to Microsoft Fabric migration best practices series.

Use this article in the final stage of your migration to validate workloads, align security and governance controls, and plan your production cutover. This article provides guidance on security mapping and a checklist-driven approach to validation, optimization, and cutover readiness.

In this article, you learn how to:

- Map Synapse RBAC and network patterns to Fabric workspace, OneLake, and managed network controls.
- Reconnect governance workflows, including Microsoft Purview integration and labeling.
- Use the phase-by-phase migration checklist to validate, optimize, and execute cutover.
- Plan decommissioning of legacy Synapse Spark resources after successful cutover.

## Access control

- Synapse RBAC roles (Synapse Administrator, Synapse SQL Administrator, Synapse Spark Administrator, and others) map to Fabric workspace roles (Admin, Member, Contributor, Viewer). Fabric's model is simpler with four roles.

- Synapse linked services are replaced by Fabric Connections. Create Connections via **Workspace Settings** > **Manage connections and gateways**. For notebook code, replace linked service references with Key Vault-based authentication or direct endpoint configuration.

- OneLake RBAC provides fine-grained data access control at the folder and table level within the Lakehouse.

## Network security

- Synapse Managed VNet and Private Endpoints map to Fabric Managed VNet + Managed Private Endpoints. Note that Fabric Spark requires Custom Pools (not Starter Pools) for Managed Private Endpoint support.

- Self-hosted Integration Runtimes (SHIR) in Synapse are replaced by On-premises Data Gateways (OPDG) in Fabric. VNet IRs are replaced by VNet Data Gateways.

## Governance

If you use Azure Purview with Synapse, Fabric provides native Microsoft Purview integration for data catalog, lineage, sensitivity labels, and access policies. Reconnect your Purview account to scan Fabric workspaces.

## Migration checklist

Use this checklist to track progress through your Spark migration. Each phase builds on the previous one. Complete all items in a phase before moving to the next.

### Phase 1: Assess and plan

For planning guidance, migration patterns, and feature comparison, see [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md).

- **1.1** Complete Spark asset inventory: Spark pools, notebooks, Spark job definitions, lake databases, Hive Metastore (HMS) databases, and linked services used in notebooks.
- **1.2** Review Synapse vs. Fabric feature differences. Flag blockers: GPU workloads, unsupported catalog APIs, linked service dependencies.
- **1.3** Run the pre-refactoring audit: search all notebooks for Synapse-specific patterns (`spark.synapse.linkedService`, `getSecretWithLS`, `TokenLibrary`, `synapsesql`). Count affected notebooks.
- **1.4** Check library compatibility: run `pip freeze` on Synapse pools, compare against Fabric Runtime 1.3 built-in libraries. List libraries that need to be pre-installed.
- **1.5** Create Fabric workspace(s), provision capacity, and create target Lakehouse items.
- **1.6** Export Spark pool configurations, custom libraries, and Spark properties from Synapse Studio.

### Phase 2: Set up connections and credentials

For linked service replacement and authentication guidance, see [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md) and [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md).

- **2.1** Inventory all Synapse linked services used by notebooks, Spark job definitions, and Lakehouse data access.
- **2.2** Create Fabric Connections for external data sources (ADLS Gen2, Cosmos DB, Azure SQL, and others) via **Workspace Settings** > **Manage connections and gateways**.
- **2.3** Set up Azure Key Vault with secrets for data sources that require key-based auth (Cosmos DB keys, storage account keys, Kusto tokens). Configure access policies for your Fabric workspace identity.
- **2.4** Configure service principal credentials for ADLS Gen2 OAuth access: register app in Entra ID, grant Storage Blob Data Contributor role, note client ID/secret/tenant.
- **2.5** Verify connectivity: test Key Vault secret retrieval and storage account access from a Fabric notebook before proceeding.

### Phase 3: Migrate data and Hive Metastore

For lake metadata and data-access migration guidance, see [Step 5: Migrate Hive Metastore metadata and data paths to Fabric](synapse-migration-hms-data.md) and [Migrate data and pipelines](migrate-synapse-data-pipelines.md).

- **3.1** Create OneLake shortcuts to existing ADLS Gen2 paths (zero-copy, preferred approach). Use the Fabric Connections set up in Phase 2 for data gateway-based access.
- **3.2** For non-Delta files (CSV, JSON, Parquet), create shortcuts in the Files section. If data copy is required, use AzCopy or Data Factory Copy Activity.
- **3.3** Migrate Hive Metastore objects. Choose one approach: Option A: Run HMS export/import notebooks for all metadata. Option B: Use Migration Assistant for Delta lake DB tables + HMS export/import for non-Delta only.
- **3.4** Validate Delta table auto-registration in Lakehouse Explorer.
- **3.5** Verify all imported tables and shortcuts are visible in Lakehouse Explorer and accessible from notebooks.

### Phase 4: Migrate Spark workloads

For item migration, code refactoring, and environment setup guidance, see [Step 2: Migrate Synapse Spark workloads with Migration Assistant](synapse-migration-spark-assistant.md), [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md), and [Step 4: Migrate Spark pools, environments, and libraries from Synapse to Fabric](synapse-migration-pools-environments-libraries.md).

- **4.1** Run Spark Migration Assistant for notebooks, Spark job definitions, Spark pools, and lake databases. Review the migration report for errors and warnings.
- **4.2** Create Fabric Environments with target Spark runtime, pool configuration, and custom libraries. Pre-install missing libraries identified in Phase 1.
- **4.3** Refactor notebook and SJD code: replace `mssparkutils` with `notebookutils`, update file paths to OneLake `abfss://` paths, replace linked service references with Key Vault or Fabric Connections, and replace unsupported `spark.catalog` methods with Spark SQL equivalents.
- **4.4** Refactor connectors: Kusto/ADX — replace linked service with `accessToken` via `getToken()`. Cosmos DB — replace `getSecretWithLS` with `getSecret(akvName, secret)`.
- **4.5** Replace Synapse token providers (`LinkedServiceBasedTokenProvider`, `TokenLibrary`) with standard OAuth `ClientCredsTokenProvider` via `spark.conf.set()`.
- **4.6** Test refactored notebooks and SJDs end to end against the data (Phase 3) and connections (Phase 2).

### Phase 5: Security, governance, and network

For security, governance, and network mapping guidance, see [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md).

- **5.1** Map Synapse RBAC roles to Fabric workspace roles (Admin, Member, Contributor, Viewer).
- **5.2** Configure OneLake RBAC for fine-grained data access control at the folder and table level.
- **5.3** Configure Managed VNet and Managed Private Endpoints for Spark workloads that access private data sources (requires Custom Pools).
- **5.4** Replace SHIR with On-premises Data Gateway (OPDG), and replace VNet IR with VNet Data Gateway.
- **5.5** Reconnect Microsoft Purview for governance, lineage, and sensitivity labels.
- **5.6** Review and apply sensitivity labels to migrated Lakehouse items as needed.

### Phase 6: Optimize and validate

For post-migration validation and production-readiness guidance, see [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md).

- **6.1** Enable Native Execution Engine (NEE) for Spark performance improvement on Parquet and Delta workloads.
- **6.2** Run `OPTIMIZE VORDER` on tables consumed by Power BI Direct Lake or the SQL analytics endpoint.
- **6.3** Run parallel workloads and compare Spark job results and performance between Synapse and Fabric.
- **6.4** Reroute downstream consumers, including Power BI reports, APIs, and applications, to Fabric endpoints.
- **6.5** Monitor Fabric workloads using Monitoring Hub and Diagnostic Emitter for at least one to two weeks.

### Phase 7: Cutover

For final validation, downstream rerouting, and cutover guidance, see [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md).

- **7.1** Confirm all migrated notebooks, SJDs, and Spark jobs run successfully in Fabric.
- **7.2** Verify data integrity through row counts, schema validation, and query result comparison.
- **7.3** Communicate cutover to stakeholders and update documentation.
- **7.4** Decommission Synapse Spark pools, notebooks, and related resources.

> [!NOTE]
> After migration, consider setting up Fabric Git integration for your migrated notebooks and Spark job definitions. Fabric supports Azure DevOps Git integration for source control, branching, and deployment pipelines. Unlike Synapse (which uses ARM templates for CI/CD), Fabric uses a workspace-based model where you connect a workspace to a Git branch and sync items directly. Notebooks, Environments, and SJDs all support Git integration. Set up deployment pipelines (Dev → Test → Prod) to manage promotion across environments.

## Related content

- [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md)
- [Steps 2-4: Migrate Synapse Spark workloads to Fabric](synapse-migration-spark-workloads.md)
- [Step 5: Migrate Hive Metastore metadata and data paths to Fabric](synapse-migration-hms-data.md)
- [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md)
- [Migrate from Azure Synapse Spark to Fabric (overview)](migrate-synapse-overview.md)
- [Spark Synapse to Fabric Spark Migration Assistant](synapse-to-fabric-spark-migration-assistant.md)
- [Compare Fabric and Azure Synapse Spark: Key Differences](comparison-between-fabric-and-azure-synapse-spark.md)
- [Migrate Spark Pools from Azure Synapse to Fabric](migrate-synapse-spark-pools.md)
- [Migrate Spark Libraries from Azure Synapse to Fabric](migrate-synapse-spark-libraries.md)
- [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md)
- [Synapse Spark Runtime — library manifests](https://github.com/microsoft/synapse-spark-runtime)
- [Fabric Assessment Tool](https://github.com/microsoft/fabric-toolbox/tree/main/tools/fabric-assessment-tool)
