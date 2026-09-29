---
title: Upgrade Your Azure Data Factory Pipelines to Fabric Data Factory
description: Learn how to assess and upgrade your Azure Data Factory pipelines to Fabric Data Factory.
author: ssindhub
ms.author: ssrinivasara
ms.topic: how-to
ms.custom: pipelines
ms.date: 08/21/2026
ai-usage: ai-assisted
---

# Upgrade your Azure Data Factory pipelines to Fabric Data Factory

Your Azure Data Factory pipelines already power critical workflows. This article walks you through upgrading Azure Data Factory (ADF) pipelines to Fabric Data Factory using the built-in upgrade experience. You can start from either Azure Data Factory or a Fabric workspace.

The upgrade experience helps you:

- Assess pipeline readiness directly in Azure Data Factory.
- Understand compatibility gaps at the pipeline and activity level.
- Upgrade supported pipelines to a Fabric workspace.
- Plan next steps for items that need updates or that are coming soon.

This assessment-first approach lets you upgrade pipelines at your own pace and validate results before switching production workloads.

## How to start the upgrade

You can start upgrading your Azure Data Factory pipelines from either of two entry points:

| Entry point | Best for | Starting step |
|---|---|---|
| **From Azure Data Factory** | Running a full assessment of pipeline readiness before upgrading | [Option A: Start from Azure Data Factory](#option-a-start-from-azure-data-factory) |
| **From a Fabric workspace** | Directly mounting and upgrading when you already know which factory to bring over | [Option B: Start from Fabric](#option-b-start-from-fabric) |

Both paths converge at [Step 4: Upgrade pipelines](#step-4-upgrade-pipelines).

## Prerequisites

Before you start, ensure you have:

- An existing Azure Data Factory instance with pipelines.
- Access to a Microsoft Fabric tenant.
- A Fabric workspace in the same Microsoft Entra ID tenant as the Azure Data Factory instance.
- **If starting from Fabric**: A Fabric workspace where you have at least Contributor permissions.

## Option A: Start from Azure Data Factory

### Step 1: Assess your pipelines for upgrade

To run the upgrade assessment, in your [Azure Data Factory](https://adf.azure.com) authoring canvas, select **Migrate to Fabric (Preview)** > **Get started (preview)** to evaluate pipelines and activities for upgrade readiness.

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/migrate-to-fabric-get-started.png" alt-text="Screenshot showing how to run the Azure Data Factory upgrade assessment." lightbox="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/migrate-to-fabric-get-started.png":::

### Step 2: Review and understand assessment results

Both the factory and individual pipelines are categorized with a readiness status:

[!INCLUDE [upgrade-assessment-statuses](includes/upgrade-assessment-statuses.md)]

For details on how to drill into activity-level details, see [What the assessment statuses mean](#what-the-assessment-statuses-mean).

You can also export your assessment results to a CSV file to support offline review and remediation planning.

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/assessment-results.png" alt-text="Screenshot showing the Azure Data Factory upgrade assessment results." lightbox="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/assessment-results.png":::

### Step 3: Select a Fabric workspace and mount your Azure Data Factory

After you review the assessment, select **Next** to mount your Azure Data Factory to a Fabric workspace and continue the upgrade flow in Fabric. Mounting lets you reference your Azure Data Factory (ADF) instance inside a Fabric workspace without upgrading, copying, or altering the Azure Data Factory environment.

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/mount-azure-data-factory-to-fabric.png" alt-text="Screenshot showing Fabric workspace selection for mounting Azure Data Factory to Fabric." lightbox="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/mount-azure-data-factory-to-fabric.png":::

After mounting completes, select **Continue in Fabric** to proceed with upgrade steps.

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/successfully-mounted-factory.png" alt-text="Screenshot showing the Continue in Fabric option after successful mounting." lightbox="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/successfully-mounted-factory.png":::

Continue to [Step 4: Upgrade pipelines](#step-4-upgrade-pipelines).

## Option B: Start from Fabric

1. Open your Fabric workspace.
1. In the workspace toolbar, select **Migrate**.
1. In the **Migrate to Fabric** panel, under **Migrate to notebooks, Spark pools, and more**, select **Data Factory**.

   :::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/migrate-from-fabric-workspace.png" alt-text="Screenshot showing the Migrate to Fabric panel in a Fabric workspace with the Data Factory option highlighted.":::

1. Select the Azure Data Factory instance you want to mount to this workspace.

   :::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/mount-from-fabric-migrate-end-point.png" alt-text="Screenshot showing the mounting experience from Migrate endpoint in Fabric.":::

1. After mounting completes, continue with [Step 4: Upgrade pipelines](#step-4-upgrade-pipelines).

> [!NOTE]
> Starting from Fabric skips the in-ADF assessment (Steps 1-2). To review pipeline readiness before upgrading, start from [Step 1: Assess your pipelines for upgrade](#step-1-assess-your-pipelines-for-upgrade) in Azure Data Factory instead.


### Step 4: Upgrade pipelines

1. Continue the upgrade from the Fabric experience by selecting **Migrate to Fabric (Preview)**.

   :::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/migrate-to-fabric-post-mount.png" alt-text="Screenshot showing the Migrate to Fabric option in Fabric." lightbox="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/migrate-to-fabric-post-mount.png":::

1. Select the pipelines you want to upgrade.

   :::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/pick-pipelines-for-migration.png" alt-text="Screenshot showing the option to select pipelines for upgrade." lightbox="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/pick-pipelines-for-migration.png":::

### Step 5: Map linked services to Fabric connections and complete the upgrade

Select **Review connections** to map Azure Data Factory linked services to Fabric connections, and then select **Confirm**.

The upgrade experience tries to automatically create connections for authentication methods that it can safely and reliably map from Azure Data Factory to Fabric’s managed identity and security model without requiring customer-managed infrastructure or network configuration.

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/linked-services-to-connection-mapping.png" alt-text="Screenshot showing the mapping of linked services to Fabric connections." lightbox="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/linked-services-to-connection-mapping.png":::

### Connections automatically created during the upgrade (supported only)

| Connector | Azure Data Factory authentication | Fabric authentication |
|------------------------|----------------------------------|----------------------|
| Azure Blob Storage | Account key; Shared access signature (SAS); Service principal; System-assigned managed identity | Account key; Shared access signature (SAS); Service principal; Workspace identity (system-assigned managed identity) |
| Azure Data Lake Storage Gen2 | Account key; Shared access signature (SAS); Service principal; System-assigned managed identity | Account key; Shared access signature (SAS); Service principal; Workspace identity (system-assigned managed identity) |
| SQL Server | Basic authentication (SQL authentication); Service principal; System-assigned managed identity | Basic authentication; Service principal; Workspace identity (system-assigned managed identity) |
| Azure SQL Database | Basic authentication (SQL authentication); Service principal; System-assigned managed identity | Basic authentication; Service principal; Workspace identity (system-assigned managed identity) |
| Azure Data Explorer (Kusto) | Service principal; System-assigned managed identity | Service principal; Workspace identity (system-assigned managed identity) |
| Azure Cosmos DB for NoSQL | Account key | Account key |
| Azure Cosmos DB for MongoDB | Basic authentication | Basic authentication |
| Azure SQL Managed Instance | Account key; Service principal | Basic authentication; Service principal |
| Azure Database for PostgreSQL | Basic authentication | Basic authentication |
| Azure Database for MySQL | Basic authentication | Basic authentication |
| MySQL | Basic authentication | Basic authentication |
| PostgreSQL | Basic authentication | Basic authentication |

For other connections, either select an existing Fabric connection or create new connections by using the modern Get Data experience or from workspace settings. Then select **Confirm**.

Selected pipelines upgrade into a folder prefixed with the source factory name_Migration for easy identification and to avoid name collisions. A confirmation message appears when the upgrade completes successfully.

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/migration-successfully-completed.png" alt-text="Screenshot showing successful completion of the upgrade from Azure Data Factory to Fabric." lightbox="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/migration-successfully-completed.png":::

After the upgrade completes, go to your Fabric workspace to review the upgraded pipelines. Each pipeline is created under the workspace and prefixed with its source factory name. You can open each pipeline to review and validate it before you continue with further configuration or testing.

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/validate-migration.png" alt-text="Screenshot showing the upgrade folder with the upgraded pipelines for validation." lightbox="media/how-to-assess-and-upgrade-your-azure-data-factory-pipelines-to-fabric/validate-migration.png":::

> [!NOTE]
> If you don't map any connections during this step, pipelines still upgrade. Activities within those pipelines are deactivated, and you can configure them later in Fabric.

After the upgrade completes, validate the pipelines in the Fabric Data Factory experience.

> [!VIDEO  https://learn-video.azurefd.net/vod/player?id=4704fb66-2ce2-44a6-a024-4a00c0963b42]

## Upgrade behavior

- Pipelines upgrade into a Fabric Data Factory workspace.
- Pipeline names must be unique within a workspace.
- If a pipeline with the same name already exists, the upgrade tool skips that pipeline.
- To ensure uniqueness, upgraded pipelines use the following naming format: `<Source factory or workspace name>_<Pipeline name>`.
- The upgrade flow includes a mounting step that you use to view your existing factory structure in Fabric before upgrading.

## Post-upgrade validation

After the upgrade, complete the following tasks:

1. Validate all connections and credentials.
1. Recreate global parameters as variable libraries.
1. Re-enable and configure triggers (disabled by default).
1. Run end-to-end tests to confirm pipeline behavior.
1. Validate upgrades in a nonproduction environment before you upgrade production workloads.

## What's out of scope

The following items aren't supported in the UX-based upgrade experience today. Pipelines that use these features require redesign or alternate upgrade approaches.

| Category | Out-of-scope item | Details |
|--------|------------------|---------|
| **Integration runtimes** | Self-hosted integration runtime (SHIR) | You can't upgrade self-hosted integration runtimes. Replace them with the Fabric on-premises data gateway (OPDG). |
| | Managed virtual network integration runtime (Managed virtual network IR) / Virtual network-injected integration runtime (VNet - Virtual network) | Fabric doesn't support upgrading managed virtual network integration runtimes. The Fabric virtual network gateway uses a different model and requires reconfiguration. |
| | SQL Server Integration Services integration runtime (SSIS IR) | Infrastructure upgrades, including SQL Server Integration Services integration runtimes, aren't supported. |
| **Workload types** | Azure Data Factory change data capture (CDC) | Change data capture workloads are out of scope and don't upgrade. |
| | Apache Airflow assets | You can't upgrade directed acyclic graph (DAG)-based orchestration from Apache Airflow to Fabric. |
| | Unified Structured Query Language (U-SQL) / Azure Data Lake Analytics | Deprecated services and not supported in Fabric. |
| | Cross-cloud or Azure Machine Learning refresh workloads | Workspace identity support is in progress. These workloads don't upgrade. |
| **Connectors** | Long-tail connectors (for example, SAP ERP Central Component (ECC), SAP Business Warehouse (BW), Multidimensional Expressions (MDX), SAP Core Data Services (CDS)) | Fabric has no equivalent connectors. Redesign is required. |
| | Marketing and finance software-as-a-service connectors (HubSpot, Google Ads, QuickBooks, Shopify, Xero) | Not supported today. |
| **Triggers and orchestration** | Custom event triggers | You can't upgrade custom event triggers. |
| | Storage event triggers | Support is coming soon. |
| | Tumbling window triggers | Known as Interval-based scheduling in Fabric. Watermark and backfill workloads must be redesigned. |
| | Chaining or dependency triggers | Chaining and dependency trigger semantics aren't supported yet. |
| **Security and authentication** | Advanced configurations (customer-managed keys (CMK), dual tokens, federated identity credential (FIC) flows) | Unsupported workspace identity or service principal authentication models don't upgrade. |
| | Certificate-based authentication (Web activity) | Unsupported and requires redesign. |
| | User-assigned managed identity (UAMI) support | Use workspace identity (WI) as a workaround. |
| **Parameterization and metadata** | Global parameters | Support is coming soon. Recreate by using Fabric variable libraries. |
| | Dynamic linked services (parameterized connections) | Not supported. Each permutation must be a separate connection and can't upgrade. |
| | Metadata-driven pipelines | Highly dynamic linked service or dataset-driven patterns can't upgrade. |
| **Activities and compute** | Azure Synapse Spark job definition (SJD) or notebook | Partially supported. Requires redesign into Fabric notebooks or Spark jobs. |
| | Mapping data flows (MDF) | Supported (preview). Mapping data flows are converted to MDF transforms in Dataflow Gen2. See [Upgrade Azure Data Factory Mapping Data Flows pipelines to Fabric](dataflow-gen2-mapping-data-flows-transforms-upgrade.md). |
| | Web, webhook, or HTTP activities with custom authentication or headers | Complex authentication scenarios must be rebuilt manually. |
| | Notebook pool environment settings | Not supported. Upgrade is blocked. |
| | Batch or custom activity workspace identity support | Missing workspace identity support blocks the upgrade for these activities. |
| | Copy activity upsert into Lakehouse tables | Not supported. Requires copy to staging and a notebook MERGE operation. |

## What the assessment statuses mean

You see one of the four results for each pipeline (and summarized at the factory level):

[!INCLUDE [upgrade-assessment-statuses](includes/upgrade-assessment-statuses.md)]

### View activity-level compatibility for each pipeline

In the assessment side pane, expand each pipeline to see:

- Activity-level status (which activities block the upgrade).
- A summary of Ready/Needs review/Not compatible counts across pipelines.

:::image type="content" source="media/how-to-assess-your-azure-data-factory-to-fabric-data-factory-migration/detailed-assessment-drilldown.png" alt-text="Screenshot showing a drill-down of the assessment details." lightbox="media/how-to-assess-your-azure-data-factory-to-fabric-data-factory-migration/detailed-assessment-drilldown.png":::

Use this list to build your to-do plan (what to fix, what to defer, and what to replace).

### Start the upgrade after assessment

When your assessment shows acceptable readiness:

1. Select **Next** to begin the upgrade flow.
1. Refer to planning guides for best practices.

## FAQ

**Does the assessment change my factory?**

No. The assessment is read-only. It scans your factory configuration and surfaces findings in the side pane without modifying pipelines, activities, or settings. You can safely run it to understand the upgrade impact before taking any action.

**Why do I see Coming soon?**

It means the product team is actively adding support for those items. If they're critical to your pipeline, plan to upgrade later when support is added, redesign the affected steps, or as an alternative use the [PowerShell upgrade tool](upgrade-pipelines-powershell-module-for-azure-data-factory-to-fabric.md) for scripted upgrade scenarios.

> [!NOTE]
> Mapping data flows (MDF) upgrades are now supported in preview. Mapping data flows are converted to MDF transforms in Dataflow Gen2 during the upgrade. For details, see [Upgrade Azure Data Factory Mapping Data Flows pipelines to Fabric](dataflow-gen2-mapping-data-flows-transforms-upgrade.md).

**Can I rerun the assessment or upgrade after making changes?**

Yes. You can rerun the assessment at any time during validation. If you rerun the upgrade for the same pipelines, you must first delete the previously upgraded pipelines in Fabric, because pipeline names must be unique within a workspace.

**Does mounting Azure Data Factory upgrade my pipelines?**

No. Mounting is just a snapshot of your existing Azure Data Factory in a Fabric workspace. No pipelines are upgraded until you explicitly start the upgrade by selecting the **Migrate to Fabric (Preview)** button from your mounted data factory in Fabric.

**Will triggers upgrade automatically?**

Schedule triggers are upgraded automatically but disabled after the upgrade by design. You must manually re-enable them in Fabric. All other triggers must be manually reconfigured and re-enabled after you validate the upgraded pipelines.

**Do unsupported items block the entire upgrade?**

No. Unsupported activities affect only the pipelines that contain them. Other supported pipelines can upgrade independently. The assessment clearly identifies which pipelines require redesign.

**What if only one activity is Not compatible?**

You can still upgrade the pipeline after you refactor or replace that activity. The assessment helps you identify exactly where to focus.

**Can I upgrade without mapping connections?**

Yes. Pipelines still upgrade, but activities that depend on unmapped connections are deactivated. You must configure the required Fabric connections and re-enable those activities before running the pipelines.

**Can I validate upgrades before moving production workloads?**

Yes. Microsoft recommends validating upgrades in a nonproduction environment, confirming connections, triggers, and end-to-end execution before upgrading production pipelines.

**Why certain system variables behave differently in Fabric compared to Azure Data Factory?**

These differences are expected as the platforms evolve independently. You can typically address them with a small adjustment during the upgrade. For example, `pipeline().TriggerName` is available in Azure Data Factory but isn't currently supported in Fabric Data Factory. If your pipeline logic depends on the trigger name, use supported trigger event metadata or pass the trigger name explicitly as a pipeline parameter instead.

## Related content

- [Compare Azure Data Factory and Fabric Data Factory](compare-fabric-data-factory-and-azure-data-factory.md)
- [Upgrade planning for Azure Data Factory to Fabric Data Factory](upgrade-planning-azure-data-factory.md)
- [Upgrade Azure Data Factory Mapping Data Flows pipelines to Fabric (preview)](dataflow-gen2-mapping-data-flows-transforms-upgrade.md)
- [Upgrade your Azure Synapse Analytics pipelines to Fabric (preview)](how-to-upgrade-your-azure-synapse-analytics-pipelines-to-fabric-data-factory.md)
- [Upgrade best practices](upgrade-best-practices.md)
- [Connector parity](connector-parity.md)
- [Convert global parameters to variable libraries](convert-global-parameters-to-variable-libraries.md)
