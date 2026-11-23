---
title: Plan a Migration from Teradata to Fabric Data Warehouse
description: Learn how to assess, plan, migrate, govern, and modernize Teradata data warehouse workloads for Microsoft Fabric Data Warehouse.
ms.reviewer: prlangad, arturv
ms.date: 09/21/2026
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: concept-article
ai-usage: ai-assisted
---

# Migration planning: Teradata to Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

Moving an enterprise Teradata estate to Fabric Data Warehouse involves more than schema and data transfer. Plan for SQL and BTEQ code, loading processes, security, reporting, operations, and performance.

This article organizes the work into five stages. Use the stages as a repeatable runbook for each migration wave. For the recommended implementation, see [Migration methods for Teradata](migration-teradata-methods.md). For code remediation, see [Translate Teradata SQL for Fabric Data Warehouse](migration-teradata-sql-translation.md).

> [!IMPORTANT]
> Confirm current [Fabric Data Warehouse limitations](limitations.md) and [T-SQL surface area](tsql-surface-area.md) before each migration wave. Assign an owner and remediation plan to every blocking difference.

## Recommended approach

Use selective modernization for most workloads:

- Preserve validated business models and logic.
- Use Migration Assistant to translate and deploy supported metadata.
- Replace Teradata-specific SQL, utilities, and operations with Fabric-native patterns.
- Redesign only the workloads blocked by unsupported dependencies or existing architectural problems.

Migrate in waves by business domain, data mart, or workload cluster. Avoid a single big-bang migration.

## Assess and evaluate

Assess these workstreams together so that you don't miss any dependencies:

| Workstream | Assess |
|---|---|
| Design and performance | Data model, volume, growth, skew, table width, concurrency, runtime, and service objectives |
| ETL and loading | FastLoad, MultiLoad, Teradata Parallel Transporter, BTEQ import/export, schedules, restart behavior, and incremental loads |
| Security and operations | Users, roles, permissions, service accounts, auditing, recovery, monitoring, and support ownership |
| Visualization and reporting | Reports, semantic models, applications, exports, refresh schedules, and connection dependencies |
| SQL compatibility | Tables, views, macros, procedures, functions, data types, `QUALIFY`, volatile tables, `PERIOD`, and BTEQ control flow |
| Migration tooling | Metadata extraction, Migration Assistant readiness, data movement, source control, and deployment automation |
| Beyond migration | Cutover, rollback, optimization, training, decommissioning, and reusable practices for later waves |

Define business outcomes, scope, owners, success measures, and rollback expectations. Produce an object inventory, dependency map, workload baseline, compatibility register, and wave plan.

## Plan and design

Turn the assessment into an executable design:

1. Confirm Warehouse as the target for SQL-centric relational analytics.
1. Define development, test, and production workspaces, capacity, naming, and ownership.
1. Map Teradata objects and data types to Fabric targets. Record unsupported items and approved alternatives. Use Migration Assistant for metadata translation.
1. Design historical and incremental data movement separately.
1. Redesign access around Microsoft Entra ID, workspace roles, item permissions, and Warehouse SQL permissions.
1. Define deployment, validation, cutover, and rollback criteria.

Favor a dimensional model, batch-oriented loading, modular ELT, and governed reuse through OneLake in the target design.

## Migrate

Execute each wave in this order:

1. Provision the target workspaces, identities, connections, and deployment path.
1. Upload extracted Teradata SQL files to Migration Assistant, translate metadata, and fix objects that require attention.
1. Copy a representative data set and validate throughput, mappings, errors, and restart behavior.
1. Complete the historical load and establish incremental synchronization when required.
1. Recreate security and operational processes.
1. Validate data, SQL behavior, reports, applications, and representative performance.
1. Reroute connections and cut over after the acceptance criteria pass.

Don't use object creation success as the only completion signal. A wave is complete only when data, behavior, security, operations, and downstream consumption pass their acceptance criteria.

## Monitor and govern

Operate source and target in parallel for the period required by the workload's risk profile.

- Compare data freshness, row counts, business aggregates, and report results between environments.
- Monitor load duration, query duration, failures, retries, capacity consumption, active sessions, and user-reported issues.
- Review access assignments, privileged identities, Warehouse permissions, and security test results.
- Keep translated code, deployment assets, mapping decisions, test evidence, and exceptions in source control.
- Track migration readiness by workload and acceptance gate, not only by migrated object count.
- Record recurring translation and loading problems as reusable guidance for later waves.
- Establish escalation, recovery, rollback, and hypercare procedures before production cutover.

Governance includes lineage, ownership, classification, retention, auditing, and operational accountability. Apply these controls during migration rather than after the final cutover.

## Optimize and modernize

After you establish correctness and stability, remove temporary compatibility patterns and use Fabric-native capabilities.

- Refactor literal SQL translations into modular T-SQL.
- Simplify deeply nested views and monolithic procedural jobs.
- Standardize high-throughput ingestion on efficient, restartable file-based patterns.
- Tune by using the [Fabric Data Warehouse performance guidelines](guidelines-warehouse-performance.md) and representative concurrency tests.
- Reduce unnecessary data copies by using governed OneLake access where it fits the architecture.
- Integrate Data Factory, Power BI, notebooks, and other Fabric workloads where they reduce duplication or operational complexity.
- Review capacity, security, reliability, and cost after workload behavior stabilizes.
- Turn the completed wave into a reusable template for the next domain.

## Migration wave acceptance checklist

Before cutover, verify that:

- The object inventory and dependency map are complete for the wave.
- Blocking T-SQL limitations have approved remediations.
- Schema and code deploy repeatably in every target environment.
- Historical and incremental data paths pass scale and recovery tests.
- Data reconciliation and business validation meet the agreed thresholds.
- Security is recreated and validated with representative identities.
- Reports, semantic models, applications, and operational jobs pass testing.
- Performance and concurrency meet the workload objectives.
- Monitoring, support ownership, rollback, and hypercare plans are active.
- Business and technical owners approve cutover.

## Related content

- [Migration methods for Teradata](migration-teradata-methods.md)
- [Translate Teradata SQL for Fabric Data Warehouse](migration-teradata-sql-translation.md)
- [Migrate by uploading a file](migrate-using-upload-file.md)
- [Data warehousing in Microsoft Fabric](data-warehousing.md)
- [Ingest data into the Warehouse](ingest-data.md)
- [Secure your Fabric Data Warehouse](security.md)
- [Source control with Warehouse](source-control.md)
