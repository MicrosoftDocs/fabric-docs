---
title: Plan your Synapse Spark migration to Fabric
description: Assess scope, choose a migration pattern, and understand feature differences before you migrate Synapse Spark workloads to Microsoft Fabric.
ms.topic: how-to
ms.date: 04/20/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Plan your Synapse Spark migration to Fabric

This article is part 1 of 6 in the Azure Synapse Spark to Microsoft Fabric migration best practices series.

Start here before you migrate any notebooks, Spark job definitions, pools, or lake metadata. This article helps you assess the scope of your Synapse Spark estate, choose a migration approach that matches your risk tolerance and delivery timeline, and understand the Fabric differences that affect planning.

By the end of this step, you should know what needs to move, which migration pattern to use, where the main compatibility risks are, and what rollback or parallel-run constraints you need to account for.

In this article, you learn how to:

- Assess your Synapse Spark footprint.
- Choose between lift-and-shift, phased modernization, and parallel run.
- Account for rollback and synchronization constraints.
- Review key feature and architecture differences between Synapse Spark and Fabric Spark.

## Assess your Synapse Spark footprint

Azure Synapse Analytics encompasses multiple workload types. This guide focuses on migrating Spark pools, notebooks, Spark job definitions, lake databases, and Hive Metastore metadata to Microsoft Fabric. For dedicated SQL pool, pipeline, Data Explorer, and security migration guidance, refer to the companion guides.

| **Synapse Workload** | **Fabric Destination** | **Migration Tool/Path** |
|----|----|----|
| **Spark Pools** | Fabric Spark (Lakehouse) | Spark Migration Assistant (preview); manual pool/env migration |
| **Notebooks** | Fabric Notebooks | Spark Migration Assistant; code refactoring for Synapse-specific APIs |
| **Spark job definitions** | Fabric Spark job definitions | Spark Migration Assistant (recommended); manual recreation if needed |
| **Lake Databases** | Fabric Lakehouse catalog | Spark Migration Assistant (Delta tables via shortcuts); HMS export/import for non-Delta |
| **Hive Metastore** | Fabric Lakehouse catalog | HMS export/import notebooks; OneLake shortcuts for data |
| **Linked Services** | Fabric Connections / Key Vault | Create Fabric Connections; migrate secrets to Key Vault; refactor notebook code |

### Run the Fabric Assessment Tool

Before planning your migration, run the Fabric Assessment Tool to generate a comprehensive report of your Synapse source workspace. The tool scans your workspace and aggregates a summary of all objects — Spark pools, notebooks, Spark job definitions, lake databases, linked services, and their configurations — giving you a clear picture of the migration scope.

1. **Download the tool.** The Fabric Assessment Tool is available in the Microsoft fabric-toolbox GitHub repository at [microsoft/fabric-toolbox](https://github.com/microsoft/fabric-toolbox/tree/main/tools/fabric-assessment-tool).

1. **Run the assessment.** Point the tool at your Azure Synapse workspace. It scans all Spark-related items and produces a report with object counts, configurations, dependencies, and potential compatibility issues.

1. **Review the report.** Use the assessment output to understand the scope of your migration: how many notebooks, pools, SJDs, and databases need to be migrated, which linked services are in use, and what potential blockers exist (GPU pools, unsupported features, and others).

> [!TIP]
> Run the assessment tool early in your planning process. The report helps you estimate effort, identify blockers, and prioritize which workloads to migrate first. It also serves as the baseline inventory for Phase 1 of the migration checklist.

## Migration patterns

Choose your migration pattern based on your organizational constraints, risk tolerance, and timeline.

### Lift-and-shift pattern

Migrate all Spark workloads at once using the Migration Assistant with minimal changes. Focus on getting notebooks and jobs running in Fabric as quickly as possible — refactor only what breaks (linked services, file paths, unsupported APIs). Accept the current architecture as-is.

Use lift-and-shift when:

- Your Synapse workspace is being decommissioned on a fixed deadline and you need to move fast.
- Your Spark workloads are already well-architected (Delta-first, clean code, few linked service dependencies).
- Your workspace footprint is manageable for a one-shot migration and your team can handle the refactoring effort in a single sprint.
- Downstream consumers (Power BI, APIs) can tolerate a brief switchover window.

### Phased modernization

Migrate workloads incrementally by priority, re-architecting as you go. Start with the highest-value or lowest-risk workloads first. As you migrate each batch, consolidate Spark pools into fewer Environments, adopt Lakehouse best practices (Delta-first, V-Order for BI consumers), enable NEE, and redesign for Direct Lake.

Use phased modernization when:

- You have a large or complex Synapse environment with multiple teams and diverse workloads that can't be migrated in one shot.
- Your current architecture has technical debt you want to address (non-Delta formats, mount-point dependencies, sprawling Spark pools).
- You have flexibility on timeline and want to improve performance and cost efficiency during migration.
- Different workloads have different owners and need independent migration schedules.

### Parallel run pattern

Run both environments simultaneously during transition. Route new Spark workloads to Fabric while legacy workloads continue on Synapse. Validate migrated workloads by comparing results side-by-side before cutting over. Gradually decommission Synapse as confidence builds.

Use a parallel run when:

- Your workloads have strict SLAs or regulatory requirements that demand extended validation before cutover.
- You need to prove Fabric performance meets or exceeds Synapse before stakeholders approve decommission.
- Your downstream consumers (dashboards, APIs, ML models) can't tolerate any discrepancy during transition.
- You're migrating production pipelines where incorrect results have high business effect (financial reporting, compliance).

Parallel run introduces a data synchronization problem that you must design for up front. Choose one of these patterns:

- **Shared storage layer:** Have both Synapse and Fabric read and write to the same ADLS Gen2 storage through OneLake shortcuts. This keeps both platforms on the same Delta files, but you must prevent write conflicts by ensuring only one platform writes to a given table at a time.
- **Write-once, read-both:** Keep Synapse as the primary writer during transition and let Fabric read the same data through shortcuts. After you validate the migrated notebooks in Fabric, switch the write-to path to Fabric and make Synapse the read-only consumer until decommission. This is the safest option for most migrations.
- **Dual-write:** Avoid running the same ETL in both environments at the same time unless you already have automated comparison and reconciliation tooling. Dual-write tends to create divergence, duplication, and operational overhead.

Parallel run also affects change management. While Synapse remains the active development environment, any notebook, Spark job definition, Spark pool configuration, or lake database schema changes made in Synapse aren't reflected automatically in Fabric. You must re-migrate the affected assets to keep both environments aligned.

- **Notebook code changes:** Re-run the Spark Migration Assistant or manually re-export and re-import the updated notebooks. Reapply any Fabric-specific code refactoring, including `notebookutils`, file path updates, and Key Vault secrets.
- **Spark job definition changes:** Re-migrate through the Migration Assistant or manually recreate the updated SJDs in Fabric.
- **Spark pool configuration changes:** Update the corresponding Fabric Environment to match the revised node size, autoscale settings, and libraries.
- **Lake database schema changes:** Re-run the HMS export/import notebooks, or manually create or alter the affected tables in the Fabric lakehouse.

To reduce re-migration overhead, establish a change freeze on the Synapse side once migration begins. If changes are unavoidable, keep a change log so you can replay them in Fabric before cutover.

### Rollback considerations

Synapse-to-Fabric migration is a copy operation — it doesn't modify or delete your source Synapse workspace. Your original Spark pools, notebooks, and data remain intact throughout the process. This makes rollback straightforward:

- If migration results are unsatisfactory, continue using your existing Synapse workspace. No changes need to be reverted.
- Delete the migrated Fabric artifacts (notebooks, environments, Spark job definitions) and retry after addressing issues.
- OneLake shortcuts point to your existing ADLS Gen2 storage — removing shortcuts doesn't affect the underlying data.
- Don't decommission your Synapse workspace until all migrated workloads are validated in Fabric and downstream consumers are rerouted.

> [!TIP]
> Start small and prove viability quickly. Pick a representative Spark workload and migrate it end-to-end — from pool setup through notebook refactoring to validation. Choose something that exercises your most common patterns (data access, linked services, catalog operations) but is low-risk enough to iterate on. Document the steps, issues encountered, and resolutions to build a repeatable process for subsequent migrations.

## Feature parity and key differences

Understanding the architectural differences between Synapse and Fabric is critical for planning. The following tables highlight key differences in compute architecture and Spark capabilities.

For the full comparison, see [Compare Fabric and Azure Synapse Spark: Key Differences](comparison-between-fabric-and-azure-synapse-spark.md).

### Compute and architecture

| **Capability** | **Azure Synapse** | **Microsoft Fabric** |
|----|----|----|
| **Deployment model** | PaaS (configure and manage resources) | SaaS (capacity-based, no infrastructure management) |
| **Compute model** | Spark pools (node-based); requires minimum 3 nodes | Capacity Units (CU) shared across all workloads; Spark pools as config templates; single-node execution supported; Autoscale Billing for Spark (pay-per-use, similar to Synapse model) |
| **Spark engine** | Synapse Spark pools (Spark 3.4, 3.5); GPU pools supported | Fabric Spark (Runtime 1.2/1.3/2.0: Spark 3.4–4.0); no GPU support; runs on latest-generation hardware for improved performance |
| **Scaling** | Node autoscale for Spark (min 3 nodes) | Node autoscale for Spark (single-node minimum); capacity-based scaling |
| **Session startup** | Pool-based; cold start for new clusters | Starter Pools (seconds-level startup); Custom Live Pools; High Concurrency mode |
| **Cost model** | Per-node-hour (Spark); pause/resume | Two options: (1) Capacity Model — per-CU with RI discounts (~40%), or (2) Autoscale Billing for Spark — pay-per-use model similar to Synapse |

### Spark: Synapse Spark vs. Fabric Spark

| **Capability** | **Synapse Spark** | **Fabric Spark** |
|----|----|----|
| **Spark versions** | Spark 3.4 (EOL), 3.5 (Preview). | Spark 3.4 (RT 1.2 EOL), 3.5 (RT 1.3 GA), 4.0 (RT 2.0 Preview) |
| **Query acceleration** | No native acceleration engine | Native Execution Engine (Velox/Gluten, up to 4x on TPC-DS) |
| **Pool model** | Fixed pools with max node count per pool; minimum 3 nodes | Starter Pools (seconds-level startup, no configuration needed); Custom Pools for specific node sizes and custom libraries; single-node execution supported |
| **Security (network)** | Managed virtual network; Private Endpoints | Managed Private Endpoints (MPE); Outbound Access Policies (OAP); Customer-Managed Keys (CMK) |
| **GPU support** | GPU-accelerated pools available | Not supported |
| **High concurrency** | Not supported | Supported: multiple notebooks share one Spark session |
| **Library management** | Pool-level and workspace-level libraries; manual upload of wheels, JARs, tar.gz | Environment-based library management: public feeds (PyPI/Conda) + custom uploads (wheels, JARs). To replicate Synapse workspace-level libraries, create an Environment with the required libraries and set it as the workspace default. All notebooks and SJDs in the workspace inherit it automatically. |
| **V-Order** | Not available | Write-time Parquet optimization; 40–60% improvement for Power BI Direct Lake and ~10% for SQL analytics endpoint; no Spark read benefit; 15–33% write overhead |
| **Optimize Write** | Disabled by default | Enabled by default |
| **Default table format** | Parquet (Delta optional) | Delta Lake (default and required for Lakehouse tables) |
| **Hive Metastore** | Built-in HMS; external HMS via Azure SQL DB or MySQL (deprecated after Spark 3.4) | Fabric Lakehouse catalog; HMS migration via export/import scripts |
| **DMTS in notebooks** | Supported | Supported in notebooks; not yet supported in Spark job definitions |
| **Managed identity for KV** | Supported | Supported in notebooks and Spark job definitions |
| **mssparkutils** | Full library (fs, credentials, notebook, env, lakehouse) | notebookutils (similar API; some differences in method names) |

## Related content

- [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md)
- [Step 2: Migrate Synapse Spark workloads with Migration Assistant](synapse-migration-spark-assistant.md)
- [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md)
- [Step 4: Migrate Spark pools, environments, and libraries from Synapse to Fabric](synapse-migration-pools-environments-libraries.md)
- [Step 5: Migrate Hive Metastore metadata and data paths to Fabric](synapse-migration-hms-data.md)
- [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md)
