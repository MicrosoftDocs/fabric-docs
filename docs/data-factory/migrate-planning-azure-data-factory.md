---
title: Migration Planning for Azure Data Factory to Fabric Data Factory
description: Plan your ADF-to-Fabric migrations with steps to evaulate the correct tools and execute your migration.
#customer intent: As an Azure Data Factory customer I want to choose the right migration path to Fabric Data Factory, so I can quickly and easily migrate all my items.
author: kromerm
ms.author: makromer
ms.reviewer: whhender
ms.date: 09/22/2025
ms.topic: concept-article
ai-usage: ai-assisted
---

# Migration planning for Azure Data Factory to Fabric Data Factory

Microsoft Fabric unifies Microsoft’s analytics tools into a single SaaS platform, offering robust capabilities for workflow orchestration, data movement, replication, and transformation at scale. Fabric Data Factory builds on Azure Data Factory (ADF), making it an ideal choice for modernizing data integration solutions.

This guide explores migration strategies, considerations, and approaches to help you transition from Azure Data Factory to Fabric Data Factory.

## Why migrate?

Migrating from ADF and Synapse pipelines to Fabric Data Factory is more than a lift-and-shift: it’s an opportunity to simplify governance, standardize patterns, and use Fabric Data Factory's advanced features to improve your data integration strategy.

Fabric offers many new features, including:

- Integrated pipeline activities like [email](outlook-activity.md) and [Teams](teams-activity.md) for message routing.
- Built-in CI/CD ([deployment pipelines](cicd-pipelines.md)) without external Git dependencies.
- Seamless workspace integration with [OneLake](../onelake/onelake-overview.md), [Warehouse](../data-warehouse/data-warehousing.md), and [Lakehouse](../data-engineering/lakehouse-overview.md) for unified analytics.
- Streamlined [semantic data model refreshes](semantic-model-refresh-activity.md) and scales to meet both self-service and enterprise data needs.
- Built-in AI capabilities with [Copilot](copilot-fabric-data-factory.md) to assist in pipeline creation and management.

For a detailed comparison, see [the Azure Data Factory and Fabric Data Factory comparison guide](compare-fabric-data-factory-and-azure-data-factory.md).

## Considerations before migrating

Migrating from Azure Data Factory (ADF) to Fabric Data Factory involves several key considerations. Here’s what to keep in mind:

- **Complex pipelines and custom connectors**: These may require manual adjustments to work in the new environment.
- **Integration runtimes**: Legacy runtimes might need refactoring to align with Fabric’s architecture.
- **Dataflow differences**: ADF Mapping Data Flows use Spark-based transformations, while Fabric Dataflow Gen2 operates differently and may need rework.
- **Security and networking**: Review managed identity, private endpoints, and gateway configurations. Re-test these settings and update permissions as needed.
- **Testing and validation**: Ensure migrated pipelines produce accurate outputs, meet SLAs, and comply with requirements. Use robust test harnesses for objective comparisons.

To address these challenges, follow these best practices:

1. Conduct a thorough asset inventory. Identify duplicates, unused items, and dependencies.
1. Review [connector parity](connector-parity.md) to and [activity parity](activity-parity.md) to identify and map feature gaps early.
1. Use automated scripts and partner tools for bulk migration.
1. Maintain detailed documentation and rollback plans.
1. Engage stakeholders throughout the process.
1. Run incremental migrations to minimize risk.
1. Use AI-powered validation scripts to speed up issue resolution.

## Migration paths

Migration paths depend on your ADF assets and their feature parity. Options include:

- [Mounting ADF items in Fabric for continuity.](#mounting-an-azure-data-factory-item-in-your-fabric-workspace) - A live view of your existing Azure Data Factory instance within Fabric, enabling gradual migration and testing. This is also a good first step before using conversion tools or replatforming.
- [Use the powershell conversion tool to migrate pipelines with high parity.](#use-powershell-upgrade-tool) - Automate the migration of pipelines, activities, and parameters at scale. Ideal for standard patterns like Copy, Lookup, and Stored Procedure.
- Re-platforming to adopt native Fabric patterns.

## Mounting an Azure Data Factory item in your Fabric workspace

**Mounting** lets you bring an existing ADF into your Fabric workspace for immediate visibility and governance while you migrate incrementally. It’s ideal for discovery, ownership assignment, and side-by-side testing because teams can see pipelines, organize them under Fabric workspaces, and plan cutovers per domain. Use mounting to catalog what exists, prioritize the highest-value/lowest-risk pipelines first, and establish conventions (naming, folders, connection reuse) that your conversion scripts and partner tools can follow consistently.

Mounting in Fabric is achieved via the Azure Data Factory item type: [Bring your Azure Data Factory to Fabric](/fabric/data-factory/migrate-pipelines-azure-data-factory-item).

## Use the PowerShell upgrade tool

Microsoft offers an ADF-to-Fabric migration utility in the Azure PowerShell module. By using the module, you can translate a large subset of ADF JSON (pipelines, activities, parameters) into Fabric-native definitions, giving you a fast starting point. Expect strong coverage for **Copy/Lookup/Stored Procedure** patterns and control flow, with manual follow-up for edge cases (custom connectors, complex expressions, certain data flow constructs). Treat the script output as a **scaffold**: run it in batches, enforce code-style/lint checks, then attach connections and fix any property mismatches. Bake this into a repeatable CI run so you can iterate as you learn, instead of hand-editing every pipeline.

For full guide, see [PowerShell migration](migrate-pipelines-powershell-upgrade-module-for-azure-data-factory-to-fabric.md).
For a detailed tutorial with examples, see [the PowerShell migration tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

## Replatform to Fabric-native patterns

Recreate all your pipelines, dataflows, and datasets by hand.

## Sample migration scenarios

Migrating from ADF to Fabric can involve different strategies depending on your use case. This section outlines common migration paths and considerations to help you plan effectively.

- [Scenario 1: ADF pipelines and data flows](#scenario-1-adf-pipelines-and-data-flows)
- [Scenario 2: ADF with CDC, SSIS, and Airflow](#scenario-2-adf-with-cdc-ssis-and-airflow)
- [Scenario 3: PowerShell Migration](#scenario-3-powershell-migration)
- [Scenario 4: Mount ADF instances in a Fabric workspace](#scenario-4-mount-adf-instances-in-a-fabric-workspace)

### Scenario 1: ADF pipelines and data flows

Modernize your ETL environment by migrating pipelines and data flows to Fabric. Plan for these elements:

- Recreate Linked Services as Connections.
- Define dataset properties inline in pipeline activities.
- Replace SHIRs (self-hosted integration runtimes) with OPDGs (on-premises data gateways) and VNet IRs with Virtual Network Data Gateways.
- Rebuild unsupported ADF activities using Fabric alternatives or the Invoke pipeline activity. Unsupported activities include:
  - Data Lake Analytics (U-SQL), a deprecated Azure service.
  - Validation activity, which can be rebuilt using Get Metadata, pipeline loops, and If activities.
  - Power Query, which is fully integrated into Fabric as dataflows where M code can be reused.
  - Notebook, Jar, and Python activities can be replaced with the Databricks activity in Fabric.
  - Hive, Pig, MapReduce, Spark, and Streaming activities can be replaced with the HDInsight activity in Fabric.

As an example, here's ADF dataset configuration page, with its file path and compression settings:

:::image type="content" source="media/migrate-planning-azure-data-factory/azure-data-factory-dataset-configuration.png" alt-text="Screenshot of the ADF dataset configuration page.":::

And here's a Copy activity for Data Factory in Fabric, where compression and file path are inline in the activity:

:::image type="content" source="media/migrate-planning-azure-data-factory/fabric-data-compression-configuration.png" alt-text="Screenshot of the Fabric Copy activity compression configuration.":::

### Scenario 2: ADF with CDC, SSIS, and Airflow

Recreate CDC as [Copy job](create-copy-job.md) items. For Airflow, copy your DAGs into [Fabric’s Apache Airflow offering](cicd-apache-airflow-jobs.md). Execute SSIS packages using ADF pipelines and call them from Fabric.

### Scenario 3: PowerShell Migration

Use the **Microsoft.FabricPipelineUpgrade** PowerShell module to migrate your Azure Data Factory pipelines to Fabric. This approach is ideal for automating the migration of pipelines, activities, and parameters at scale. The PowerShell module translates a large subset of ADF JSON into Fabric-native definitions, providing a fast starting point for migration.

For detailed guidance, see the [PowerShell migration tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

#### Scenario 4: Mount ADF instances in a Fabric workspace

You can mount an entire ADF factory in a Fabric workspace as a native item. This lets you manage ADF factories alongside Fabric artifacts within the same interface. The ADF UI remains fully accessible, allowing you to monitor, manage, and edit your ADF factory items directly from the Fabric workspace. However, execution of pipelines, activities, and integration runtimes still occurs within your Azure resources.

This feature is particularly useful for organizations transitioning to Fabric, as it provides a unified view of both ADF and Fabric resources, simplifying management and planning for migration.

For more information, see [Bring your Azure Data Factory into Fabric](migrate-pipelines-azure-data-factory-item.md).

## Related content

- [Migration best practices](migration-best-practices.md)
- [Connector comparison between ADF and Fabric Data Factory](connector-parity.md)
