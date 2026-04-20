---
title: Spark Synapse to Fabric Spark Migration Best Practices
description: This document describes the Spark Synapse to Fabric Migration Best Practices, a Microsoft Fabric-owned experience that helps customers migrate Spark workloads from Azure Synapse Analytics to Microsoft Fabric.
ms.reviewer: jejiang
ms.topic: tutorial
ms.date: 04/21/2026
ai-usage: ai-assisted
---

# Azure Synapse Analytics to Microsoft Fabric Migration Best Practices

Spark & Lake Database Migration Guide

March 2026

**Table of Contents**

**1. Migration Strategy & Planning**

> [1.1 Assess Your Synapse Spark Footprint](#assess-your-synapse-spark-footprint)
>
> Run the Fabric Assessment Tool
>
> [1.2 Migration Patterns](#migration-patterns)
>
> Rollback Considerations
>
> [1.3 Feature Parity & Key Differences](#feature-parity-key-differences)

**2. Spark Workload Migration**

> [2.1 Spark Migration Assistant (Preview)](#spark-migration-assistant-preview)
>
> Standard (Non-Git) Synapse Workspace
>
> Git-Enabled Synapse Workspace
>
> [2.2 Notebook Code Refactoring](#notebook-code-refactoring)
>
> Pre-Refactoring Audit Checklist
>
> 2.2.1 File Path Usage
>
> 2.2.2 Spark Catalog API
>
> 2.2.3 MsSparkUtils / NotebookUtils
>
> 2.2.4 Azure Data Explorer (Kusto) Connector
>
> 2.2.5 Cosmos DB Connector
>
> 2.2.6 Linked Service References
>
> 2.2.7 Token Library
>
> [2.3 Spark Job Definition Migration](#spark-job-definition-migration)
>
> [2.4 Spark Pool Migration](#spark-pool-migration)
>
> [2.5 Configuration & Library Migration](#configuration-library-migration)
>
> [2.6 Library Compatibility: Synapse vs. Fabric](#library-compatibility-synapse-vs.-fabric)

**3. Hive Metastore & Lake Database Migration**

> [3.1 Assess Managed vs. External Tables](#assess-managed-vs.-external-tables)
>
> [3.2 Migration Workflow](#migration-workflow)
>
> Phase 1: Export Metadata from Synapse
>
> Phase 2: Import Metadata into Fabric Lakehouse
>
> [3.3 Limitations and Considerations](#limitations-and-considerations)

**4. Data Migration**

> [4.1 Data Migration Options](#data-migration-options)

**5. Security & Governance Migration**

> [5.1 Access Control](#access-control)
>
> [5.2 Network Security](#network-security)
>
> [5.3 Governance](#governance)

**6. Migration Checklist**

> [Phase 1: Assess & Plan](#phase-1-assess-plan)
>
> [Phase 2: Set Up Connections & Credentials](#phase-2-set-up-connections-credentials)
>
> [Phase 3: Migrate Data & Hive Metastore](#phase-3-migrate-data-hive-metastore)
>
> [Phase 4: Migrate Spark Workloads](#phase-4-migrate-spark-workloads)
>
> [Phase 5: Security, Governance & Network](#phase-5-security-governance-network)
>
> [Phase 6: Optimize & Validate](#phase-6-optimize-validate)
>
> [Phase 7: Cutover](#phase-7-cutover)

**References**

**Appendix: Manual Migration Resources**

########## 1. Migration Strategy & Planning

Azure Synapse Analytics encompasses multiple workload types. This guide focuses on migrating Spark pools, notebooks, Spark Job Definitions, lake databases, and Hive Metastore metadata to Microsoft Fabric. For dedicated SQL pool, pipeline, Data Explorer, and security migration guidance, refer to the companion guides.

#################### 1.1 Assess Your Synapse Spark Footprint

> **Scenario:** *You have an established Synapse Analytics workspace with Spark pools, notebooks, Spark Job Definitions, lake databases, and linked services. Where do you start?*

| **Synapse Workload** | **Fabric Destination** | **Migration Tool/Path** |
|----|----|----|
| **Spark Pools** | Fabric Spark (Lakehouse) | Spark Migration Assistant (preview); manual pool/env migration |
| **Notebooks** | Fabric Notebooks | Spark Migration Assistant; code refactoring for Synapse-specific APIs |
| **Spark Job Definitions** | Fabric Spark Job Definitions | Spark Migration Assistant (recommended); manual recreation if needed |
| **Lake Databases** | Fabric Lakehouse catalog | Spark Migration Assistant (Delta tables via shortcuts); HMS export/import for non-Delta |
| **Hive Metastore** | Fabric Lakehouse catalog | HMS export/import notebooks; OneLake shortcuts for data |
| **Linked Services** | Fabric Connections / Key Vault | Create Fabric Connections; migrate secrets to Key Vault; refactor notebook code |

############################## Run the Fabric Assessment Tool

Before planning your migration, run the Fabric Assessment Tool to generate a comprehensive report of your Synapse source workspace. The tool scans your workspace and aggregates a summary of all objects — Spark pools, notebooks, Spark Job Definitions, lake databases, linked services, and their configurations — giving you a clear picture of the migration scope.

1.  **Download the tool.** The Fabric Assessment Tool is available in the Microsoft fabric-toolbox GitHub repository.

> Download from: [<u>microsoft/fabric-toolbox → tools/fabric-assessment-tool</u>](https://github.com/microsoft/fabric-toolbox/tree/main/tools/fabric-assessment-tool)

2.  **Run the assessment.** Point the tool at your Azure Synapse workspace. It will scan all Spark-related items and produce a report with object counts, configurations, dependencies, and potential compatibility issues.

3.  **Review the report.** Use the assessment output to understand the scope of your migration: how many notebooks, pools, SJDs, and databases need to be migrated, which linked services are in use, and what potential blockers exist (GPU pools, unsupported features, etc.).

> **Best Practice:** *Run the assessment tool early in your planning process. The report helps you estimate effort, identify blockers, and prioritize which workloads to migrate first. It also serves as the baseline inventory for Phase 1 of the migration checklist.*

#################### 1.2 Migration Patterns

Choose your migration pattern based on your organizational constraints, risk tolerance, and timeline. The following table maps common customer scenarios to the recommended approach:

############################## Pattern 1: Lift and Shift

Migrate all Spark workloads at once using the Migration Assistant with minimal changes. Focus on getting notebooks and jobs running in Fabric as quickly as possible — refactor only what breaks (linked services, file paths, unsupported APIs). Accept the current architecture as-is.

############################## When to use Lift and Shift:

- Your Synapse workspace is being decommissioned on a fixed deadline and you need to move fast.

- Your Spark workloads are already well-architected (Delta-first, clean code, few linked service dependencies).

- Your workspace footprint is manageable for a one-shot migration and your team can handle the refactoring effort in a single sprint.

- Downstream consumers (Power BI, APIs) can tolerate a brief switchover window.

############################## Pattern 2: Phased Modernization

Migrate workloads incrementally by priority, re-architecting as you go. Start with the highest-value or lowest-risk workloads first. As you migrate each batch, consolidate Spark pools into fewer Environments, adopt Lakehouse best practices (Delta-first, V-Order for BI consumers), enable NEE, and redesign for Direct Lake.

############################## When to use Phased Modernization:

- You have a large or complex Synapse environment with multiple teams and diverse workloads that cannot be migrated in one shot.

- Your current architecture has technical debt you want to address (non-Delta formats, mount-point dependencies, sprawling Spark pools).

- You have flexibility on timeline and want to improve performance and cost efficiency during migration.

- Different workloads have different owners and need independent migration schedules.

############################## Pattern 3: Parallel Run

Run both environments simultaneously during transition. Route new Spark workloads to Fabric while legacy workloads continue on Synapse. Validate migrated workloads by comparing results side-by-side before cutting over. Gradually decommission Synapse as confidence builds.

############################## When to use Parallel Run:

- Your workloads have strict SLAs or regulatory requirements that demand extended validation before cutover.

- You need to prove Fabric performance meets or exceeds Synapse before stakeholders approve decommission.

- Your downstream consumers (dashboards, APIs, ML models) cannot tolerate any discrepancy during transition.

- You are migrating production pipelines where incorrect results have high business impact (financial reporting, compliance).

> **Important:** *Parallel Run introduces a data synchronization challenge. When both Synapse and Fabric process the same data, you must ensure consistency:*

- **Shared storage layer (recommended):** Have both Synapse and Fabric read/write to the same ADLS Gen2 storage via OneLake shortcuts. Data is always in sync because both platforms access the same Delta files. This is the simplest approach but requires careful coordination to avoid write conflicts — ensure only one platform writes to a given table at a time.

- **Write-once, read-both:** Let Synapse continue as the primary writer during transition. Fabric reads the same data via shortcuts (read-only). Once migrated notebooks are validated, switch the write path to Fabric and make Synapse the read-only consumer until decommission.

- **Dual-write (not recommended):** Running the same ETL in both environments simultaneously leads to divergence, duplication, and reconciliation headaches. Avoid unless you have automated comparison tooling in place.

> **Best Practice:** *For parallel runs, the safest pattern is “write-once, read-both”: keep Synapse as the single writer, use OneLake shortcuts so Fabric reads the same data, validate notebook outputs in Fabric, then flip the write path once validated. This avoids data sync issues entirely.*
>
> **Important:** *During a parallel run, your Synapse environment remains the active development environment. If any changes are made to notebooks, Spark Job Definitions, Spark pool configurations, or lake database schemas on the Synapse side during this period, those changes are NOT automatically reflected in Fabric. You must re-migrate the affected items to Fabric to keep both environments in sync:*

- Notebook code changes: Re-run the Spark Migration Assistant or manually re-export and re-import the updated notebooks. Re-apply any Fabric-specific code refactoring (notebookutils, file paths, Key Vault secrets).

- Spark Job Definition changes: Re-migrate via the Migration Assistant or manually recreate the updated SJDs in Fabric.

- Spark pool configuration changes: Update the corresponding Fabric Environment artifact to match the new pool settings (node size, autoscale, libraries).

- Lake database schema changes (new tables, columns, dropped objects): Re-run the HMS export/import notebooks, or manually create/alter the affected tables in the Fabric Lakehouse.

> **Best Practice:** *To minimize re-migration overhead during parallel runs, establish a change freeze on the Synapse side once migration begins. If changes are unavoidable, maintain a change log of all Synapse-side modifications so they can be systematically replayed in Fabric before cutover.*

############################## Rollback Considerations

Synapse-to-Fabric migration is a copy operation — it does not modify or delete your source Synapse workspace. Your original Spark pools, notebooks, and data remain intact throughout the process. This makes rollback straightforward:

- If migration results are unsatisfactory, simply continue using your existing Synapse workspace. No changes need to be reverted.

- Delete the migrated Fabric artifacts (notebooks, environments, Spark Job Definitions) and retry after addressing issues.

- OneLake shortcuts point to your existing ADLS Gen2 storage — removing shortcuts does not affect the underlying data.

- Do not decommission your Synapse workspace until all migrated workloads have been validated in Fabric and downstream consumers have been rerouted.

> **Best Practice:** *Start small and prove viability quickly. Pick a representative Spark workload and migrate it end-to-end — from pool setup through notebook refactoring to validation. Choose something that exercises your most common patterns (data access, linked services, catalog operations) but is low-risk enough to iterate on. Document the steps, issues encountered, and resolutions to build a repeatable process for subsequent migrations.*

#################### 1.3 Feature Parity & Key Differences

Understanding the architectural differences between Synapse and Fabric is critical for planning. The following tables highlight key differences in compute architecture and Spark capabilities.

For the full comparison, see: [<u>Compare Fabric and Azure Synapse Spark: Key Differences</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/comparison-between-fabric-and-azure-synapse-spark)

############################## Compute & Architecture

| **Capability** | **Azure Synapse** | **Microsoft Fabric** |
|----|----|----|
| **Deployment model** | PaaS (provision and manage resources) | SaaS (capacity-based, no infrastructure management) |
| **Compute model** | Spark pools (node-based); requires minimum 3 nodes | Capacity Units (CU) shared across all workloads; Spark pools as config templates; single-node execution supported; Autoscale Billing for Spark (pay-per-use, similar to Synapse model) |
| **Spark engine** | Synapse Spark pools (Spark 3.4, 3.5); GPU pools supported | Fabric Spark (Runtime 1.2/1.3/2.0: Spark 3.4–4.0); no GPU support; runs on latest-generation hardware for improved performance |
| **Scaling** | Node autoscale for Spark (min 3 nodes) | Node autoscale for Spark (single-node minimum); capacity-based scaling |
| **Session startup** | Pool-based; cold start for new clusters | Starter Pools (seconds-level startup); Custom Live Pools; High Concurrency mode |
| **Cost model** | Per-node-hour (Spark); pause/resume | Two options: (1) Capacity Model — per-CU with RI discounts (~40%), or (2) Autoscale Billing for Spark — pay-per-use model similar to Synapse |

############################## Spark: Synapse Spark vs. Fabric Spark

| **Capability** | **Synapse Spark** | **Fabric Spark** |
|----|----|----|
| **Spark versions** | Spark 3.4 (EOL), 3.5 (Preview). Note: Spark 3.3 has been removed. | Spark 3.4 (RT 1.2 EOL), 3.5 (RT 1.3 GA), 4.0 (RT 2.0 Preview) |
| **Query acceleration** | No native acceleration engine | Native Execution Engine (Velox/Gluten, up to 4x on TPC-DS) |
| **Pool model** | Fixed pools with max node count per pool; minimum 3 nodes | Starter Pools (seconds-level startup, no configuration needed); Custom Pools for specific node sizes and custom libraries; single-node execution supported |
| **Security (network)** | Managed VNet; Private Endpoints | Managed Private Endpoints (MPE); Outbound Access Policies (OAP); Customer-Managed Keys (CMK) |
| **GPU support** | GPU-accelerated pools available | Not supported |
| **High concurrency** | Not supported | Supported: multiple notebooks share one Spark session |
| **Library management** | Pool-level and workspace-level libraries; manual upload of wheels, JARs, tar.gz | Environment-based library management: public feeds (PyPI/Conda) + custom uploads (wheels, JARs). To replicate Synapse workspace-level libraries, create an Environment with the required libraries and set it as the workspace default. All notebooks and SJDs in the workspace inherit it automatically. |
| **V-Order** | Not available | Write-time Parquet optimization; 40–60% improvement for Power BI Direct Lake and ~10% for SQL endpoint; no Spark read benefit; 15–33% write overhead |
| **Optimize Write** | Disabled by default | Enabled by default |
| **Default table format** | Parquet (Delta optional) | Delta Lake (default and required for Lakehouse tables) |
| **Hive Metastore** | Built-in HMS; external HMS via Azure SQL DB or MySQL (deprecated after Spark 3.4) | Fabric Lakehouse catalog; HMS migration via export/import scripts |
| **DMTS in notebooks** | Supported | Supported in notebooks; not yet supported in Spark Job Definitions |
| **Managed identity for KV** | Supported | Supported in notebooks and Spark Job Definitions |
| **mssparkutils** | Full library (fs, credentials, notebook, env, lakehouse) | notebookutils (similar API; some differences in method names) |

########## 2. Spark Workload Migration

> **Scenario:** *You have Synapse Spark pools with custom configurations, libraries, and dozens of notebooks running ETL and data science workloads.*

#################### 2.1 Spark Migration Assistant (Preview)

The Spark Synapse to Fabric Migration Assistant provides a guided workflow to migrate Spark pools, notebooks, Spark Job Definitions, and lake databases. It copies and transforms items for Fabric and generates a migration report.

For the step-by-step user guide, see: [<u>Spark Synapse to Fabric Spark Migration Assistant</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/synapse-to-fabric-spark-migration-assistant)

- Spark pools are migrated to Fabric Pools and corresponding Environment artifacts.

- Notebooks and their associated environments are migrated.

- Spark Job Definitions are migrated with associated environments.

- Lake databases are mapped to Fabric schemas; managed Delta tables are migrated via OneLake catalog shortcuts.

> **Important:** *Spark configurations, custom libraries, and custom executor settings are not migrated by the assistant. You must configure these manually in Fabric Environments. Synapse workspaces under a VNet cannot be migrated with the assistant.*

############################## Standard (Non-Git) Synapse Workspace

For workspaces where notebooks and SJDs are stored directly in Synapse (not in a Git repository):

- Run the Spark Migration Assistant from your Fabric workspace (Migrate → Data engineering items). Select the source Synapse workspace and migrate all Spark items.

- Validate dependencies: ensure the same Spark version is used. If notebooks reference other notebooks via mssparkutils.notebook.run(), verify those were also migrated. The Migration Assistant preserves folder structure (Fabric supports up to 10 levels of nesting).

- Refactor code: replace mssparkutils with notebookutils, replace linked service references with Fabric Connections, and update file paths. See [<u>Section 2.2 Notebook Code Refactoring</u>](#notebook-code-refactoring) for details.

############################## Git-Enabled Synapse Workspace

For workspaces where notebooks and SJDs are stored in an Azure DevOps or GitHub repository, note that Synapse and Fabric use different Git serialization formats (Synapse stores notebooks as JSON; Fabric uses source format .py/.scala or .ipynb). You cannot point a Fabric workspace at the same Synapse Git branch directly.

- **Step 1: Migrate items.** Use the Spark Migration Assistant to migrate notebooks and SJDs from the Synapse workspace to a Fabric workspace. This converts items to Fabric-compatible format.

- Step 2: Refactor code. Apply the same code refactoring as the standard scenario — replace mssparkutils, update file paths, replace linked services. See [<u>Section 2.2 Notebook Code Refactoring</u>](#notebook-code-refactoring) for details.

- **Step 3: Connect Fabric workspace to Git.** Connect your Fabric workspace to a new branch or folder in your repository (Workspace Settings → Source Control → Git Integration). Use a separate branch or folder from your Synapse content to avoid conflicts. Commit the Fabric workspace content to populate the new branch.

- Step 4: Set up deployment pipelines (optional). Configure Fabric deployment pipelines (Dev → Test → Prod) for ongoing CI/CD. Fabric supports auto-binding for default lakehouses and attached environments when deploying across stages.

> Best Practice: Keep your Synapse Git branch intact as a historical reference. Create a new branch or folder for Fabric content. Fabric stores notebooks as source files (.py for PySpark) rather than JSON, which provides cleaner Git diffs for code review.

#################### 2.2 Notebook Code Refactoring

After migrating notebooks (via the Migration Assistant or manually), you must refactor code that uses Synapse-specific APIs, linked services, or file paths. The following subsections cover the most common refactoring patterns.

For the full NotebookUtils API reference, see: [<u>NotebookUtils (former MSSparkUtils) for Fabric</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/notebook-utilities)

############################## Pre-Refactoring Audit Checklist

Before diving into individual refactoring patterns, run a codebase-wide search across all notebooks to identify Synapse-specific code that will need changes. Use the patterns below to audit your notebooks:

| **Search Pattern** | **Category** | **Action Required** |
|----|----|----|
| **spark.synapse.linkedService** | Linked Services | Remove; replace with direct endpoint auth or Key Vault secrets (Sec 2.2.6) |
| **getSecretWithLS** | Credentials | Replace with getSecret(vaultUrl, secretName) (Sec 2.2.3) |
| **TokenLibrary** | Token/Auth | Remove; use direct OAuth config or notebookutils (Sec 2.2.7) |
| **synapsesql** | SQL Connector | Replace spark.read.synapsesql() with Delta format reads (Sec 2.2.1) |
| **mssparkutils** | Spark Utils | Replace with notebookutils (most APIs identical) (Sec 2.2.3) |
| **spark.catalog.listDatabases** | Catalog API | Replace with spark.sql("SHOW DATABASES") (Sec 2.2.2) |
| **spark.catalog.currentDatabase** | Catalog API | Replace with spark.sql("SELECT CURRENT_DATABASE()") (Sec 2.2.2) |
| **spark.catalog.getDatabase** | Catalog API | Replace with spark.sql("DESCRIBE DATABASE ...") (Sec 2.2.2) |
| **spark.catalog.listFunctions** | Catalog API | Not supported in Fabric — remove (Sec 2.2.2) |
| **spark.catalog.registerFunction** | Catalog API | Not supported — use spark.udf.register() instead (Sec 2.2.2) |
| **spark.catalog.functionExists** | Catalog API | Not supported in Fabric — remove (Sec 2.2.2) |
| **LinkedServiceBasedTokenProvider** | Auth Provider | Replace with ClientCredsTokenProvider (Sec 2.2.6) |
| **getPropertiesAsMap** | Linked Services | Remove; configure storage account directly (Sec 2.2.7) |
| **spark.storage.synapse** | Linked Services | Remove — not supported in Fabric (Sec 2.2.6) |
| **/user/trusted-service-user/** | File Paths | Replace with OneLake path or shortcut path (Sec 2.2.1) |
| **cosmos.oltp** | Cosmos DB | Update to use Key Vault for secrets instead of linked service (Sec 2.2.5) |
| **kusto.spark.synapse** | Kusto/ADX | Replace linked service auth with accessToken via getToken() (Sec 2.2.4) |

> **Best Practice:** *Run these searches across your entire notebook repository before migration. Notebooks with zero matches are safe to migrate as-is. Notebooks with matches should be prioritized for code refactoring using the detailed guidance in sections 2.2.1–2.2.7 below.*

############################## 2.2.1 File Path Usage

Synapse notebooks that use relative paths or Synapse-managed storage paths must be updated to use direct abfss:// paths or OneLake paths in Fabric.

| **❌ Synapse (Before)** | **✅ Fabric (After)** |
|----|----|
| rel_path = "abfss://...@\<synapse_storage\>.dfs.core.windows.net/user/trusted-service-user/deltalake" | rel_path = "abfss://\<workspace_id\>@onelake.dfs.fabric.microsoft.com/\<lakehouse_id\>/Tables/deltalake" |
| spark.read.synapsesql("\<synapse_sql_pool\>.\<schema\>.\<table\>") | spark.read.format("delta").load("abfss://.../\<lakehouse\>/Tables/\<table\>") |
| covid_df.write.mode("overwrite").format("delta").save(rel_path) | covid_df.write.mode("overwrite").format("delta").save(rel_path) \# Same API, just update the path variable |

> **Best Practice:** *Replace all Synapse-managed storage paths with OneLake paths (abfss://\<workspace_id\>@onelake.dfs.fabric.microsoft.com/\<item_id\>/...). For ADLS Gen2 data, create OneLake shortcuts and reference the shortcut paths instead.*

############################## 2.2.2 Spark Catalog API

Several spark.catalog methods are not supported in Fabric. Replace them with Spark SQL equivalents:

| **❌ Synapse (Before)** | **✅ Fabric (After)** |
|----|----|
| spark.catalog.listDatabases() | spark.sql("SHOW DATABASES").show() |
| spark.catalog.currentDatabase() | spark.sql("SELECT CURRENT_DATABASE()").first()\["current_database()"\] |
| spark.catalog.getDatabase(db_name) | spark.sql(f"DESCRIBE DATABASE {db_name}").show() |
| spark.catalog.listFunctions() | Not supported **in** Fabric — remove **or** skip |
| spark.catalog.registerFunction(name, fn) | Not supported **in** Fabric — use UDFs via spark.udf.register() instead |
| spark.catalog.functionExists(name) | Not supported **in** Fabric — remove **or** skip |

> **Note:** *spark.catalog table methods such as createTable(), tableExists(), and listTables() work normally in Fabric. Only database-level and function-level catalog methods require refactoring.*

############################## 2.2.3 MsSparkUtils / NotebookUtils

Replace mssparkutils calls with the Fabric notebookutils equivalents. The most common credential-related changes:

| **❌ Synapse (Before)** | **✅ Fabric (After)** |
|----|----|
| mssparkutils.credentials.getSecretWithLS("sampleLS", secretKey) | notebookutils.credentials.getSecret("https://\<vault\>.vault.azure.net/", secretKey) |
| TokenLibrary.getSecret("foo", "bar") | notebookutils.credentials.getSecret("https://foo.vault.azure.net/", "bar") |

In Fabric, linked service-based secret retrieval (getSecretWithLS) is not supported. Instead, reference the Key Vault URL directly using notebookutils.credentials.getSecret(vaultUrl, secretName). The same pattern applies to TokenLibrary.getSecret() calls.

> **Note:** *Most mssparkutils.fs methods (e.g., ls, cp, mv, rm, mkdirs, head) work identically as notebookutils.fs in Fabric. The primary changes are credential/secret methods and notebook.run() path references.*

############################## 2.2.4 Azure Data Explorer (Kusto) Connector

Synapse notebooks that connect to Azure Data Explorer (Kusto) via linked services must be refactored to use direct endpoint authentication:

| **❌ Synapse (Before)** | **✅ Fabric (After)** |
|----|----|
| .option("spark.synapse.linkedService", "AzureDataExplorer1") | \# Remove linked service reference |
| kustoDF = spark.read.format("com.microsoft.kusto.spark.synapse.datasource").option("spark.synapse.linkedService", "AzureDataExplorer1")...load() | kustoDF = spark.read.format("com.microsoft.kusto.spark.synapse.datasource").option("accessToken", notebookutils.credentials.getToken("https://\<cluster\>.kusto.windows.net"))...load() |

Replace the linked service option with an accessToken option. Use notebookutils.credentials.getToken() to obtain a token for your Kusto cluster endpoint. The rest of the query options (kustoDatabase, kustoQuery) remain unchanged.

############################## 2.2.5 Cosmos DB Connector

Cosmos DB connections in Synapse that use linked services or getSecretWithLS must be updated:

| **❌ Synapse (Before)** | **✅ Fabric (After)** |
|----|----|
| .option("spark.synapse.linkedService", "CosmosDbLS") | \# Remove linked service reference |
| mssparkutils.credentials.getSecretWithLS("cosmosKeyLS", "cosmosKey") | notebookutils.credentials.getSecret("https://\<vault\>.vault.azure.net/", "cosmosKey") |

Replace the linked service reference with direct Cosmos DB endpoint configuration. Store the Cosmos DB account key in Azure Key Vault and retrieve it using notebookutils.credentials.getSecret(vaultUrl, secretName) instead of getSecretWithLS().

############################## 2.2.6 Linked Service References

All Synapse linked service references must be replaced in Fabric. The most common patterns:

| **❌ Synapse (Before)** | **✅ Fabric (After)** |
|----|----|
| spark.conf.set("spark.storage.synapse.linkedServiceName", ls_name) | \# Remove — not supported in Fabric |
| spark.conf.set("fs.azure.account.oauth.provider.type", "com.microsoft.azure.synapse.tokenlibrary.LinkedServiceBasedTokenProvider") | spark.conf.set("fs.azure.account.oauth.provider.type", "org.apache.hadoop.fs.azurebfs.oauth2.ClientCredsTokenProvider") |
| TokenLibrary.getPropertiesAsMap(linked_service_cfg) | \# Remove — use direct connection string or service principal config |
| conexion("Endpoint").toString.substring(8) | \# Replace with direct storage account name |

In Fabric, there are no linked services. Replace the Synapse token provider with standard OAuth client credentials (service principal). Configure fs.azure.account.auth.type, oauth.provider.type, client.id, client.secret, and client.endpoint directly using spark.conf.set().

############################## 2.2.7 Token Library

Synapse’s TokenLibrary for obtaining tokens and reading linked service properties is not available in Fabric. Replace with equivalent patterns:

| **❌ Synapse (Before)** | **✅ Fabric (After)** |
|----|----|
| TokenLibrary.getPropertiesAsMap(serviceConnection) | \# Remove — configure storage account directly |
| **val** my_account = conexion("Endpoint").toString.substring(8) | **val** my_account = "\<storage_account_name\>" // Hardcode **or** use notebookutils |
| mssparkutils.fs.head(internalPath, Int.MaxValue) | notebookutils.fs.head(internalPath, Int.MaxValue) |

For OAuth-based ADLS Gen2 access, configure the service principal credentials directly via spark.conf.set() using the storage account-specific keys (fs.azure.account.auth.type.\<account\>.dfs.core.windows.net, etc.) instead of relying on linked service token providers.

> **Important:** *Review all notebooks for linked service references before cutover. Any remaining spark.synapse.linkedService, TokenLibrary, or getSecretWithLS calls will fail at runtime in Fabric.*

#################### 2.3 Spark Job Definition Migration

Spark Job Definitions (SJDs) are batch job configurations that reference a main executable file (.py, .jar, or .R), optional reference libraries, command-line arguments, and a lakehouse context. While the Spark Migration Assistant handles SJD migration automatically, there are important differences between Synapse and Fabric SJDs that require attention.

############################## Key Differences: Synapse vs. Fabric SJDs

- Lakehouse context required. In Fabric, every SJD must have at least one lakehouse associated with it. This lakehouse serves as the default file system for Spark runtime. Any code using relative paths reads/writes from the default lakehouse. In Synapse, SJDs use the workspace default storage (ADLS Gen2) as the default file system.

- Supported languages. Fabric supports PySpark (Python), Spark (Scala/Java), and SparkR. .NET for Spark (C#/F#) is not supported in Fabric — these workloads must be rewritten in Python or Scala before migration.

- Retry policies. Fabric SJDs support built-in retry policies (max retries, retry interval), which is useful for Spark Structured Streaming jobs that need to run indefinitely. This is a Fabric advantage over Synapse SJDs.

- Environment binding. In Synapse, SJDs are bound to a Spark pool. In Fabric, SJDs are bound to an Environment (which contains pool config, libraries, and Spark properties). The Migration Assistant maps Synapse pool references to Fabric Environments automatically.

- **Scheduling.** Fabric SJDs have built-in scheduling (Settings \> Schedule) without requiring a separate pipeline. In Synapse, SJD scheduling requires a pipeline with a Spark Job activity. If you have Synapse pipelines that only trigger SJDs, consider using Fabric’s built-in SJD scheduling instead of migrating the pipeline.

- **Import/export.** Synapse supports UI-based JSON import/export for SJDs. Fabric does not support UI import/export — use the Spark Migration Assistant or the Fabric REST API to create/update SJDs programmatically.

############################## SJD Code Refactoring

The same code refactoring patterns from Section 2.2 apply to SJD main files. Changes fall into two categories:

Source code changes (inside the .py / .jar / .R main file):

- Replace mssparkutils with notebookutils for credential and file system operations.

- Update hardcoded file paths in code to OneLake abfss:// paths or shortcut paths, when needed. SJDs that use only relative paths against the default lakehouse may not require changes.

- Replace linked service references in code with Key Vault secrets or Fabric Connections.

- Note: DMTS Connections are not yet supported in Fabric Spark Job Definitions (supported in notebooks only). If your SJD code uses DMTS, refactor to use direct endpoint authentication.

**SJD configuration changes (in the Fabric SJD item settings):**

- Verify that ADLS Gen2 paths referenced by main definition files are still accessible from the Fabric workspace. If files were stored in Synapse workspace-internal storage, re-upload them to the Fabric SJD or move them to an accessible ADLS Gen2 location.

- Verify all reference files (.py, .R, .jar) are accessible after migration. Re-upload any files that were stored in Synapse workspace-internal storage.

- If command-line arguments contain Synapse-specific paths or connection strings, update them to Fabric equivalents.

#################### 2.4 Spark Pool Migration

############################## Fabric Starter Pools: A Key Advantage

Fabric Starter Pools provide seconds-level Spark session startup — a significant improvement over Synapse Spark pools, which require minutes-long cold starts to provision clusters. Starter Pools are pre-provisioned by the platform and require no configuration.

> **Best Practice:** *If your Synapse Spark pool has no custom configurations, no custom libraries, and no specific node size requirements beyond Medium — do not migrate the pool. Instead, let your notebooks and Spark Job Definitions use the Fabric workspace default Starter Pool settings. This gives you the fastest startup times and zero pool management overhead. Only create a Custom Pool or Environment when you have a specific need.*

############################## When to Create a Custom Pool or Environment

Create a Fabric Custom Pool and/or Environment only when your workload requires:

- A specific node size (Small, Large, XLarge, XXLarge) different from the default Medium.

- Custom libraries (pip packages, conda packages, JARs, wheels) that are not in the Fabric built-in runtime.

- Custom Spark properties (e.g., spark.sql.shuffle.partitions, spark.executor.memory) beyond the defaults.

- Managed Private Endpoints for accessing private data sources (requires Custom Pools).

- A specific Spark runtime version different from the workspace default.

#################### 2.5 Configuration & Library Migration

Migrate Spark configurations and libraries to Fabric Environments:

For detailed steps on migrating libraries to Fabric Environments, see: [<u>Migrate Spark Libraries from Azure Synapse to Fabric</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/migrate-synapse-spark-libraries)

- **Export Spark configs.** In Synapse Studio, go to Manage \> Spark Pools \> select pool \> Configurations + Libraries \> download as .yml/.conf/.json.

- **Import to Environment.** In Fabric, create an Environment artifact. Go to Spark Compute \> Spark Properties \> Upload the exported Sparkproperties.yml file.

- **Migrate libraries.** For pool-level libraries, upload packages (wheels, JARs, tars) to the Environment’s library section. For PyPI/Conda packages, add them to the Environment’s public library configuration.

> **Important:** *Workspace-level library settings in Fabric are deprecated. Migrate all libraries to Environment artifacts. The migration permanently removes existing workspace-level configurations — download all settings before enabling Environments.*

#################### 2.6 Library Compatibility: Synapse vs. Fabric

Fabric Runtime 1.3 (Spark 3.5) ships with 223 Python, 183 Java/Scala, and 135 R libraries built-in. Most Synapse libraries are available in Fabric, but there are gaps that can cause runtime failures if not addressed before migration. The following tables summarize the key differences.

The following libraries are available in Synapse Spark 3.5 but not pre-installed in Fabric Runtime 1.3. If your notebooks import them, they will fail with ImportError or ClassNotFoundException. To identify which are actually used in your code, run these checks before reviewing the gap tables:

- Python notebooks: Search for import and from ... import statements across all .py / .ipynb files.

- Java/Scala notebooks and SJDs: Search for import statements and Maven coordinates; look for packages like com.azure.cosmos.spark or com.microsoft.kusto.spark.

- Export full dependency list: Run pip freeze in a Synapse notebook, compare against Fabric Runtime 1.3 manifest. Only libraries that appear in both your pip freeze output and the gap tables below need action.

- **Pool-level and workspace-level custom libraries:** In Synapse Studio, go to Manage → Apache Spark Pools → select pool → Packages to see custom libraries that need to be re-uploaded to a Fabric Environment.

The following tables list the specific library gaps between Synapse Spark 3.5 and Fabric Runtime 1.3, organized by language and category, with recommended actions for each.

############################## Python Libraries Missing from Fabric (40 libraries)

| **Category** | **Libraries** | **Action** |
|----|----|----|
| **CUDA / GPU (9 libs)** | libcublas, libcufft, libcufile, libcurand, libcusolver, libcusparse, libnpp, libnvfatbin, libnvjitlink, libnvjpeg | Not available — Fabric does not support GPU pools. Refactor GPU workloads to use CPU-based alternatives or keep on Synapse. |
| **HTTP / API clients** | httpx, httpcore, h11, google-auth, jmespath | Install via Environment: pip install httpx google-auth jmespath |
| **ML / Interpretability** | interpret, interpret-core | Install via Environment: pip install interpret |
| **Data serialization** | marshmallow, jsonpickle, frozendict, fixedint | Install via Environment if needed: pip install marshmallow jsonpickle |
| **Logging / Telemetry** | fluent-logger, humanfriendly, library-metadata-cooker, impulse-python-handler | fluent-logger: install if used. Others are Synapse-internal — likely not needed. |
| **Jupyter internals** | jupyter-client, jupyter-core, jupyter-ui-poll, jupyterlab-widgets, ipython-pygments-lexers | Fabric manages Jupyter infrastructure internally. These are generally not needed in user code. |
| **System / C libraries** | libgcc, libstdcxx, libgrpc, libabseil, libexpat, libnsl, libzlib | Low-level system libs. Usually not imported directly. Only install if you have C extensions that depend on them. |
| **File / concurrency** | filelock, fsspec, knack | Install via Environment if used: pip install filelock fsspec |

############################## Java/Scala Libraries Missing from Fabric (3 libraries)

| **Library** | **Synapse Version** | **Action** |
|----|----|----|
| **azure-cosmos-analytics-spark** | 2.2.5 | Install as a custom JAR in the Fabric Environment if your Spark jobs use the Cosmos DB analytics connector. |
| **junit-jupiter-params** | 5.5.2 | Test-only library. Not needed in production notebooks. |
| **junit-platform-commons** | 1.5.2 | Test-only library. Not needed in production notebooks. |

############################## R Libraries: Near-Identical

Only 1 difference: Synapse includes the lightgbm R package (v4.6.0) which is not in Fabric. Install via Environment if needed. Fabric adds FabricTelemetry (v1.0.2) which is Fabric-internal.

############################## Notable Version Differences (Python)

68 Python libraries exist on both platforms but with different versions. Most are minor version differences, but 17 have major version jumps that could affect behavior:

| **Library** | **Fabric Version** | **Synapse Version** | **Impact** |
|----|----|----|----|
| **libxgboost** | 2.0.3 | 3.0.1 | XGBoost API changes between v2 and v3. Test model training/prediction code. |
| **flask** | 2.2.5 | 3.0.3 | Flask 3.x has breaking changes. If serving Flask APIs from notebooks, test thoroughly. |
| **lxml** | 4.9.3 | 5.3.0 | Minor API changes. Test XML parsing workflows. |
| **libprotobuf** | 3.20.3 | 4.25.3 | Protobuf 4.x has breaking changes for custom proto definitions. |
| **markupsafe** | 2.1.3 | 3.0.2 | MarkupSafe 3.x drops Python 3.7 support but API is compatible. |
| **libpq** | 12.17 | 17.4 | PostgreSQL client library. Major version jump — test DB connections. |
| **libgcc-ng / libstdcxx-ng** | 11.2.0 | 15.2.0 | GCC runtime. May affect C extension compatibility. |

> **Note:** *Synapse generally ships newer versions of system-level libraries (GCC, protobuf, libpq) while Fabric ships newer versions of data/ML libraries (more Python packages overall). If you need a specific version, pin it in your Fabric Environment configuration.*
>
> **Best Practice:** *Run a quick compatibility check: export your Synapse pool’s library list (pip freeze), compare against the Fabric Runtime 1.3 manifest, and pre-install any missing libraries in your Fabric Environment before running migrated notebooks.*
>
> **Manual library review:** For a line-by-line comparison of every built-in library and version between Fabric and Synapse Spark runtimes, see the [<u>microsoft/synapse-spark-runtime GitHub repository</u>](https://github.com/microsoft/synapse-spark-runtime). The repo contains versioned release notes (Official-Spark\*.md files) under both the Fabric/ and Synapse/ directories, with full Java/Scala, Python, and R library tables for each runtime version. Compare the matching Spark version files (e.g., Fabric/Runtime 1.3 vs. Synapse/spark3.5) to identify missing libraries and version differences specific to your target runtime.

############################## Manual Migration Resources (Without Migration Assistant)

########## 3. Hive Metastore & Lake Database Migration

> **Scenario:** *Your Synapse Spark workloads use the built-in Hive Metastore with databases, tables, and partitions. You need to migrate this metadata to Fabric Lakehouse.*
>
> Best Practice: Create your target Lakehouse with schemas enabled. Lakehouse schemas (now GA) allow you to organize tables into named collections (e.g., sales, marketing, hr). The Spark Migration Assistant maps the default Synapse database to the dbo schema and additional databases to additional schemas in the same Lakehouse. Schemas are enabled by default when creating a new Lakehouse in the Fabric portal.

#################### 3.1 Assess Managed vs. External Tables

The critical first step is distinguishing managed from external tables in your Synapse Hive Metastore:

- **External tables:** If data is in ADLS Gen2 in Delta format, create OneLake shortcuts directly to the ADLS Gen2 paths. No data movement needed.

- **Managed tables:** Data is stored in Synapse’s internal warehouse directory. You must create OneLake shortcuts to this path or copy data to an accessible ADLS Gen2 location.

Synapse managed table warehouse directory path:

> abfss://\<container\>@\<storage\>.dfs.core.windows.net/synapse/workspaces/\<workspace\>/warehouse

#################### 3.2 Migration Workflow

Microsoft provides export/import notebooks for Hive Metastore migration. The process has two phases:

For the full HMS migration guide, see: [<u>Migrate Hive Metastore Metadata</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/migrate-synapse-hms-metadata)

############################## Phase 1: Export Metadata from Synapse

4.  **Import the HMS export notebook** into your Azure Synapse workspace. This notebook queries and exports HMS metadata of databases, tables, and partitions to an intermediate directory in OneLake.

5.  **Configure parameters:** Set your Synapse workspace name, database names to export, and the target OneLake lakehouse for staging. The Spark internal catalog API is used to read catalog objects.

6.  **Run the export.** Execute all notebook cells. Metadata is written to the Files section of your Fabric Lakehouse in a structured folder hierarchy.

############################## Phase 2: Import Metadata into Fabric Lakehouse

7.  **Create shortcuts for data access.** Create a shortcut within the Files section of the Lakehouse pointing to the Synapse Spark warehouse directory. This makes managed table data accessible to Fabric.

8.  **Configure warehouse mappings.** For managed tables, provide WarehouseMappings to replace old Synapse warehouse directory paths with the shortcut paths in Fabric. All managed tables are converted to external tables during import.

9.  **Run the import notebook** in Fabric to create catalog objects (databases, tables, partitions) in the Lakehouse using Spark’s internal catalog API.

10. **Verify.** Check that all imported tables are visible in the Lakehouse Explorer UI’s Tables section.

#################### 3.3 Limitations and Considerations

- The migration scripts use Spark’s internal catalog API, not direct HMS database connections. This may not scale well for very large catalogs — for large environments, consider modifying the export logic to query the HMS database directly.

- There is no isolation guarantee during export. If Synapse Spark compute modifies the metastore concurrently, inconsistent data may be introduced. Schedule migration during a maintenance window.

- Functions are not included in the current migration scripts.

- After migration, OneLake shortcuts provide ongoing data access. If Synapse continues writing to the same ADLS Gen2 paths, Fabric will see the updated data through shortcuts automatically (data-level sync). However, new tables or schema changes in the Synapse HMS will not propagate automatically — you must re-run the migration scripts or manually create new tables in the Fabric Lakehouse.

- **External Hive Metastore (Azure SQL DB / MySQL):** Some Synapse workspaces use an external HMS backed by Azure SQL Database or Azure Database for MySQL to persist catalog metadata outside the workspace and share it with HDInsight or Databricks. Fabric does not support connecting to an external Hive Metastore — it uses the Lakehouse catalog exclusively. If you use an external HMS, you must migrate the metadata into the Fabric Lakehouse catalog. You can do this by querying the external HMS database directly (via JDBC) to export table definitions and then recreating them in Fabric using Spark SQL or the HMS import notebooks. Note that external HMS support in Synapse is deprecated after Spark 3.4.

> **Best Practice:** *For ongoing synchronization when both Synapse and Fabric are active: use OneLake shortcuts for data-level sync (automatic), and schedule periodic re-runs of the HMS export/import notebooks or build a reconciliation notebook to detect and sync new tables.*

########## 4. Data Migration

> **Scenario:** *You have data in ADLS Gen2 linked to your Synapse workspace. You need to make this data accessible in Fabric Lakehouse without unnecessary data duplication.*

#################### 4.1 Data Migration Options

- **OneLake Shortcuts (recommended, zero-copy):** Create shortcuts in Fabric Lakehouse pointing to your existing ADLS Gen2 paths. Delta format data in the Tables section auto-registers in the Lakehouse catalog. CSV/JSON/Parquet data goes in the Files section. No data movement required.

- **mssparkutils fastcp:** For copying data from ADLS Gen2 to OneLake within notebooks.

- **AzCopy:** Command-line utility for bulk data copy from ADLS Gen2 to OneLake.

- **Data Factory Copy Activity:** Use Fabric Data Factory (or existing ADF/Synapse pipelines) to copy data to the Lakehouse.

- **Azure Storage Explorer:** Visual tool for moving files from ADLS Gen2 to OneLake.

> **Best Practice:** *Prefer shortcuts over data movement whenever possible. Shortcuts avoid data duplication and storage costs, and Delta tables in the Tables section are automatically discoverable in the SQL analytics endpoint and Power BI.*

########## 5. Security & Governance Migration

> **Scenario:** *Your Synapse environment uses Managed VNet, Private Endpoints, Synapse RBAC, and Azure Purview integration. You need to map these to Fabric equivalents.*

#################### 5.1 Access Control

- Synapse RBAC roles (Synapse Administrator, Synapse SQL Administrator, Synapse Spark Administrator, etc.) map to Fabric workspace roles (Admin, Member, Contributor, Viewer). Fabric’s model is simpler with four roles.

- Synapse linked services are replaced by Fabric Connections. Create Connections via Workspace Settings \> Manage connections and gateways. For notebook code, replace linked service references with Key Vault-based authentication or direct endpoint configuration.

- OneLake RBAC provides fine-grained data access control at the folder and table level within the Lakehouse.

#################### 5.2 Network Security

- Synapse Managed VNet and Private Endpoints map to Fabric Managed VNet + Managed Private Endpoints. Note that Fabric Spark requires Custom Pools (not Starter Pools) for Managed Private Endpoint support.

- Self-hosted Integration Runtimes (SHIR) in Synapse are replaced by On-premises Data Gateways (OPDG) in Fabric. VNet IRs are replaced by VNet Data Gateways.

#################### 5.3 Governance

If you use Azure Purview with Synapse, Fabric provides native Microsoft Purview integration for data catalog, lineage, sensitivity labels, and access policies. Reconnect your Purview account to scan Fabric workspaces.

########## 6. Migration Checklist

Use this checklist to track progress through your Spark migration. Each phase builds on the previous one. Complete all items in a phase before moving to the next.

#################### Phase 1: Assess & Plan

| **\#** | **Task** | **Status** |
|----|----|----|
| **1.1** | Complete Spark asset inventory: Spark pools, notebooks, Spark Job Definitions, lake databases, HMS databases, and linked services used in notebooks. |  |
| **1.2** | Review Synapse vs. Fabric feature differences (Sec 1.3). Flag blockers: GPU workloads, unsupported catalog APIs, linked service dependencies. |  |
| **1.3** | Run the pre-refactoring audit (Sec 2.2): search all notebooks for Synapse-specific patterns (spark.synapse.linkedService, getSecretWithLS, TokenLibrary, synapsesql). Count affected notebooks. |  |
| **1.4** | Check library compatibility (Sec 2.6): run pip freeze on Synapse pools, compare against Fabric Runtime 1.3 built-in libraries. List libraries that need to be pre-installed. |  |
| **1.5** | Create Fabric workspace(s), provision capacity, and create target Lakehouse items. |  |
| **1.6** | Export Spark pool configurations, custom libraries, and Spark properties from Synapse Studio. |  |

#################### Phase 2: Set Up Connections & Credentials

Fabric uses Connections (not linked services) for external data source access. Set up connections and credentials first — both data migration (OneLake shortcuts, DMTS) and notebook refactoring depend on them.

| **\#** | **Task** | **Status** |
|----|----|----|
| **2.1** | Inventory all Synapse linked services used by notebooks, Spark Job Definitions, and Lakehouse data access. |  |
| **2.2** | Create Fabric Connections for external data sources (ADLS Gen2, Cosmos DB, Azure SQL, etc.) via Workspace Settings \> Manage connections and gateways. |  |
| **2.3** | Set up Azure Key Vault with secrets for data sources that require key-based auth (Cosmos DB keys, storage account keys, Kusto tokens). Configure access policies for your Fabric workspace identity. |  |
| **2.4** | Configure service principal credentials for ADLS Gen2 OAuth access: register app in Entra ID, grant Storage Blob Data Contributor role, note client ID/secret/tenant. |  |
| **2.5** | Verify connectivity: test Key Vault secret retrieval and storage account access from a Fabric notebook before proceeding. |  |

#################### Phase 3: Migrate Data & Hive Metastore

| **\#** | **Task** | **Status** |
|----|----|----|
| **3.1** | Create OneLake shortcuts to existing ADLS Gen2 paths (zero-copy, preferred approach). Use the Fabric Connections set up in Phase 2 for data gateway-based access. |  |
| **3.2** | For non-Delta files (CSV, JSON, Parquet), create shortcuts in the Files section. If data copy is required, use AzCopy or Data Factory Copy Activity. |  |
| **3.3** | Migrate Hive Metastore objects — choose one approach: • Option A: Run HMS export/import notebooks for all metadata • Option B: Use Migration Assistant for Delta lake DB tables + HMS export/import for non-Delta only |  |
| **3.4** | Validate Delta table auto-registration in Lakehouse Explorer. |  |
| **3.5** | Migrate Hive Metastore objects using HMS export/import notebooks or Migration Assistant (Sec 3.2). Verify all imported tables and shortcuts are visible in Lakehouse Explorer and accessible from notebooks. |  |

#################### Phase 4: Migrate Spark Workloads

| **\#** | **Task** | **Status** |
|----|----|----|
| **4.1** | Run Spark Migration Assistant for notebooks, Spark Job Definitions, Spark pools, and lake databases. Review the migration report for errors/warnings. |  |
| **4.2** | Create Fabric Environments with target Spark runtime, pool configuration, and custom libraries (Sec 2.5). Pre-install missing libraries identified in Phase 1. |  |
| **4.3** | Refactor notebook and SJD code (Sec 2.2, 2.3): • Replace mssparkutils → notebookutils • Update file paths to OneLake abfss:// paths • Replace linked service references with Key Vault / Fabric Connections (set up in Phase 2) • Replace unsupported spark.catalog methods with Spark SQL equivalents |  |
| **4.4** | Refactor connectors (Sec 2.2.4–2.2.5): • Kusto/ADX: replace linked service with accessToken via getToken() • Cosmos DB: replace getSecretWithLS with getSecret(akvName, secret) |  |
| **4.5** | Replace Synapse token providers (LinkedServiceBasedTokenProvider, TokenLibrary) with standard OAuth ClientCredsTokenProvider via spark.conf.set(). |  |
| **4.6** | Test refactored notebooks and SJDs end-to-end against the data (Phase 3) and connections (Phase 2). |  |

#################### Phase 5: Security, Governance & Network

| **\#** | **Task** | **Status** |
|----|----|----|
| **5.1** | Map Synapse RBAC roles to Fabric workspace roles (Admin, Member, Contributor, Viewer). |  |
| **5.2** | Configure OneLake RBAC for fine-grained data access control at the folder and table level. |  |
| **5.3** | Configure Managed VNet + Managed Private Endpoints for Spark workloads that access private data sources (requires Custom Pools). |  |
| **5.4** | Replace SHIR with On-premises Data Gateway (OPDG); VNet IR with VNet Data Gateway. |  |
| **5.5** | Reconnect Microsoft Purview for governance, lineage, and sensitivity labels. |  |
| **5.6** | Review and apply sensitivity labels to migrated Lakehouse items as needed. |  |

#################### Phase 6: Optimize & Validate

| **\#** | **Task** | **Status** |
|----|----|----|
| **6.1** | Enable Native Execution Engine (NEE) for Spark performance improvement on Parquet/Delta workloads. |  |
| **6.2** | Run OPTIMIZE VORDER on tables consumed by Power BI Direct Lake or SQL analytics endpoint. |  |
| **6.3** | Run parallel workloads: compare Spark job results and performance between Synapse and Fabric. |  |
| **6.4** | Reroute downstream consumers (Power BI reports, APIs, applications) to Fabric endpoints. |  |
| **6.5** | Monitor Fabric workloads using Monitoring Hub and Diagnostic Emitter for at least 1–2 weeks. |  |

#################### Phase 7: Cutover

| **\#** | **Task** | **Status** |
|----|----|----|
| **7.1** | Confirm all migrated notebooks, SJDs, and Spark jobs run successfully in Fabric. |  |
| **7.2** | Verify data integrity: row counts, schema validation, and query result comparison. |  |
| **7.3** | Communicate cutover to stakeholders and update documentation. |  |
| **7.4** | Decommission Synapse Spark pools, notebooks, and related resources. |  |

> Note: CI/CD and Git Integration. After migration, consider setting up Fabric Git integration for your migrated notebooks and Spark Job Definitions. Fabric supports Azure DevOps Git integration for source control, branching, and deployment pipelines. Unlike Synapse (which uses ARM templates for CI/CD), Fabric uses a workspace-based model where you connect a workspace to a Git branch and sync items directly. Notebooks, Environments, and SJDs all support Git integration. Set up deployment pipelines (Dev → Test → Prod) to manage promotion across environments. This is not required for migration but is strongly recommended for production workloads.

########## References

This guide synthesizes best practices from the following Microsoft Learn documentation and GitHub resources:

**Microsoft Learn Documentation**

- [<u>Migrating from Azure Synapse Spark to Fabric (Overview)</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/migrate-synapse-overview)

- [<u>Spark Synapse to Fabric Spark Migration Assistant</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/synapse-to-fabric-spark-migration-assistant)

- [<u>Compare Fabric and Azure Synapse Spark: Key Differences</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/comparison-between-fabric-and-azure-synapse-spark)

- [<u>Migrate Spark Pools from Azure Synapse to Fabric</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/migrate-synapse-spark-pools)

- [<u>Migrate Spark Libraries from Azure Synapse to Fabric</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/migrate-synapse-spark-libraries)

- [<u>Migrate Hive Metastore Metadata</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/migrate-synapse-hms-metadata)

- [<u>Apache Spark Runtime in Fabric</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/runtime)

- [<u>Lakehouse and Delta Lake Tables</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-and-delta-tables)

- [<u>Cross-Workload Table Maintenance and Optimization (V-Order, NEE)</u>](https://learn.microsoft.com/en-us/fabric/fundamentals/table-maintenance-optimization)

**GitHub Resources**

- [<u>Synapse Spark Runtime — Library Manifests (Fabric & Synapse)</u>](https://github.com/microsoft/synapse-spark-runtime)

- [<u>Fabric Assessment Tool (fabric-toolbox)</u>](https://github.com/microsoft/fabric-toolbox/tree/main/tools/fabric-assessment-tool)

########## Appendix: Manual Migration Resources

The Spark Migration Assistant is the recommended approach for migrating notebooks, Spark Job Definitions, and Spark pools. If you need to perform manual migration without the assistant, refer to the following Microsoft Learn guides:

- [<u>Migrate Azure Synapse Notebooks to Fabric</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/migrate-synapse-notebooks)

- [<u>Migrate Spark Job Definitions from Azure Synapse to Fabric</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/migrate-synapse-spark-job-definition)

- [<u>Migrate Spark Pools from Azure Synapse to Fabric</u>](https://learn.microsoft.com/en-us/fabric/data-engineering/migrate-synapse-spark-pools)
