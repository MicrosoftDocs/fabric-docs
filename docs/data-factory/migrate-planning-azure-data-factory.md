---
title: Migration Planning for Azure Data Factory to Fabric Data Factory
description: Plan your ADF-to-Fabric migrations with steps to evaluate the correct tools and execute your migration.
#customer intent: As an Azure Data Factory customer I want to choose the right migration path to Fabric Data Factory, so I can quickly and easily migrate all my items.
ms.reviewer: makromer
ms.date: 10/06/2025
ms.topic: concept-article
ai-usage: ai-assisted
---

# Migration planning for Azure Data Factory to Fabric Data Factory

Microsoft Fabric brings together Microsoft's analytics tools into a single SaaS platform. It offers strong capabilities for workflow orchestration, data movement, replication, and transformation at scale. Fabric Data Factory provides a SaaS environment that builds on Azure Data Factory (ADF) PaaS through ease-of-use improvements and extra functionality, making Fabric Data Factory the perfect modernization of your existing data integration solutions.

This guide shows you migration strategies, considerations, and approaches to help you move from Azure Data Factory to Fabric Data Factory.

## Why migrate?

Migrating from ADF and Synapse pipelines to Fabric Data Factory is more than a lift-and-shift: it’s an opportunity to simplify governance, standardize patterns, and use Fabric Data Factory's advanced features to improve your data integration strategy.

Fabric offers many new features, including:

- Integrated pipeline activities like [email](outlook-activity.md) and [Teams](teams-activity.md) for message routing
- Built-in CI/CD ([deployment pipelines](cicd-pipelines.md)) without external Git dependencies
- Seamless workspace integration with [OneLake](../onelake/onelake-overview.md), [Warehouse](../data-warehouse/data-warehousing.md), and [Lakehouse](../data-engineering/lakehouse-overview.md) for unified analytics
- Streamlined [semantic data model refreshes](semantic-model-refresh-activity.md) that scale to meet both self-service and enterprise data needs
- Built-in AI capabilities with [Copilot](copilot-fabric-data-factory.md) to help you create and manage pipelines

For a detailed comparison, see [the Azure Data Factory and Fabric Data Factory comparison guide](compare-fabric-data-factory-and-azure-data-factory.md).

## Critical architectural differences

[!INCLUDE [migration-critical-differences](includes/migration-critical-differences.md)]

## Migration paths

Migration paths depend on your ADF assets and their feature parity. Options include:

- [Azure Data Factory items in Fabric for continuity.](#azure-data-factory-items-in-your-fabric-workspace) - A live view of your existing Azure Data Factory instance within Fabric, enabling gradual migration and testing. This is also a good first step before using conversion tools or replatforming.
- [Use the PowerShell conversion tool to migrate pipelines with high parity.](#use-the-powershell-upgrade-tool) - Automate the migration of pipelines, activities, and parameters at scale. Ideal for standard patterns like Copy, Lookup, and Stored Procedure.
- [Manual migration for complex environments](#manual-migration) - Rebuild pipelines in Fabric to leverage new features and optimize performance. This is necessary for pipelines with low parity or custom logic, but it’s also an opportunity to modernize your architecture.

## Azure Data Factory items in your Fabric workspace

**Adding an existing ADF to your Fabric workspace** give you immediate visibility and governance while you migrate incrementally. It’s ideal for discovery, ownership assignment, and side-by-side testing because teams can see pipelines, organize them under Fabric workspaces, and plan cutovers per domain. Use Azure Data Factory items to catalog what exists, prioritize the highest-value/lowest-risk pipelines first, and establish conventions (naming, folders, connection reuse) that your conversion scripts and partner tools can follow consistently.

Mounting in Fabric is achieved via the Azure Data Factory item type: [Bring your Azure Data Factory to Fabric](/fabric/data-factory/migrate-pipelines-azure-data-factory-item).

## Use the PowerShell upgrade tool

Microsoft offers an ADF-to-Fabric migration utility in the Azure PowerShell module. When you use the module, you can translate a large subset of ADF JSON (pipelines, activities, parameters) into Fabric-native definitions, giving you a fast starting point. Expect strong coverage for **Copy/Lookup/Stored Procedure** patterns and control flow, with manual follow-up for edge cases (custom connectors, complex expressions, certain data flow constructs). Treat the script output as a **scaffold**: run it in batches, enforce code-style/lint checks, then attach connections and fix any property mismatches. Build this into a repeatable CI run so you can iterate as you learn, instead of hand-editing every pipeline.

For a full guide, see [PowerShell migration](migrate-pipelines-powershell-upgrade-module-for-azure-data-factory-to-fabric.md).
For a detailed tutorial with examples, see [the PowerShell migration tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

## Manual migration

Manual migration is necessary for complex pipelines with low parity, but it's also a chance to modernize your architecture and adopt Fabric’s integrated features. This path requires more upfront planning and development but can yield long-term benefits in maintainability, performance, and cost.

To migrate effectively, follow these steps:

1. **Assess and inventory**: Catalog all ADF assets, including pipelines, datasets, linked services, and integration runtimes. Identify dependencies and usage patterns.
1. **Identify duplicates and unused items**: Clean up unused or redundant items in ADF to streamline the migration and your data integration environment.
1. **Identify gaps**: Use the [migration assessment tool](/azure/data-factory/how-to-assess-your-azure-data-factory-to-fabric-data-factory-migration) and review [connector parity](connector-parity.md) and [activity parity](activity-parity.md) to identify gaps between your ADF pipelines and Fabric pipelines, and plan for alternatives.
1. **Review new features**: Use our [data movement decision guide](decision-guide-data-movement.md) and [data integration decision guide](decision-guide-data-integration.md) to decide which Fabric tools will work best for your needs.
1. **Plan**: Review the [migration best practices](migration-best-practices.md) for considerations for each of your items, and guidelines for making the most of Fabric's improved capabilities.
1. **If you use global parameters in ADF, plan to migrate them to Fabric variable libraries.** See [Convert ADF Global Parameters to Fabric Variable Libraries](convert-global-parameters-to-variable-libraries.md) for detailed steps.
1. **ADF transition**: Consider [adding an Azure Data Factory item in Microsoft Fabric](#azure-data-factory-items-in-your-fabric-workspace) as a first step in migration, allowing for gradual transition in a single platform.
1. **Prioritize**: Rank your pipelines based on business impact, complexity, and ease of migration.
1. **Automate where you can**: For all low-complexity pipelines, consider using the [PowerShell upgrade tool](#use-the-powershell-upgrade-tool) to automate some migration.
1. **Consider tooling**: Use these tools to make recreation easier:
   - Use [Fabric templates](templates.md) as a starting place for pipelines with common data integration scenarios.
   - Use [parameterization](parameters.md) to create reusable pipelines
   - Use [Copilot in Fabric Data Factory](copilot-fabric-data-factory.md) to help with pipeline creation
   - Use [deployment pipelines](cicd-pipelines.md) for CI/CD and version control
1. **Manual migration**: For scenarios not supported by other migration methods, rebuild them in Fabric:
    1. **Recreate connections**: Set up [Connections](connector-overview.md) in Fabric to replace Linked Services in ADF
    1. **Recreate activities**: Set up your [activities](activity-overview.md) in your pipelines, replacing [unsupported activities](activity-parity.md) with Fabric alternatives or using the Invoke pipeline activity
    1. **Schedule and set triggers**: [Rebuild schedules and event triggers in Fabric](pipeline-runs.md) to match your ADF schedules
1. **Test thoroughly**: Validate migrated pipelines against expected outputs, performance benchmarks, and compliance requirements.

## Sample migration scenarios

Moving from ADF to Fabric can involve different strategies depending on your use case. This section outlines common migration paths and considerations to help you plan effectively.

- [Scenario 1: ADF pipelines and data flows](#scenario-1-adf-pipelines-and-data-flows)
- [Scenario 2: ADF with CDC, SSIS, and Airflow](#scenario-2-adf-with-cdc-ssis-and-airflow)
- [Scenario 3: PowerShell migration](#scenario-3-powershell-migration)
- [Scenario 4: ADF items in a Fabric workspace](#scenario-4-adf-items-in-a-fabric-workspace)

### Scenario 1: ADF pipelines and data flows

Modernize your ETL environment by moving pipelines and data flows to Fabric. Plan for these elements:

- Recreate Linked Services as Connections
- Recreate global parameters as variable libraries
- Define dataset properties inline in pipeline activities
- Replace SHIRs (self-hosted integration runtimes) with OPDGs (on-premises data gateways) and VNet IRs with Virtual Network Data Gateways
- Rebuild unsupported ADF activities using Fabric alternatives or the Invoke pipeline activity. Unsupported activities include:
  - Data Lake Analytics (U-SQL), a deprecated Azure service
  - Validation activity, which can be rebuilt using Get Metadata, pipeline loops, and If activities
  - Power Query, which is fully integrated into Fabric as dataflows where M code can be reused
  - Notebook, Jar, and Python activities can be replaced with the Databricks activity in Fabric
  - Hive, Pig, MapReduce, Spark, and Streaming activities can be replaced with the HDInsight activity in Fabric

As an example, here's ADF dataset configuration page, with its file path and compression settings:

:::image type="content" source="media/migrate-planning-azure-data-factory/azure-data-factory-dataset-configuration.png" alt-text="Screenshot of the ADF dataset configuration page.":::

And here's a Copy activity for Data Factory in Fabric, where compression and file path are inline in the activity:

:::image type="content" source="media/migrate-planning-azure-data-factory/fabric-data-compression-configuration.png" alt-text="Screenshot of the Fabric Copy activity compression configuration.":::

### Scenario 2: ADF with CDC, SSIS, and Airflow

Recreate CDC as [Copy job](create-copy-job.md) items. For Airflow, copy your DAGs into [Fabric’s Apache Airflow offering](cicd-apache-airflow-jobs.md). Execute SSIS packages using ADF pipelines and call them from Fabric.

### Scenario 3: PowerShell migration

Use the **Microsoft.FabricPipelineUpgrade** PowerShell module to migrate your Azure Data Factory pipelines to Fabric. This approach works well for automating the migration of pipelines, activities, and parameters at scale. The PowerShell module translates a large subset of ADF JSON into Fabric-native definitions, providing a fast starting point for migration.

For detailed guidance, see the [PowerShell migration tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

### Scenario 4: ADF items in a Fabric workspace

You can add an entire ADF factory in a Fabric workspace as a native item. This lets you manage ADF factories alongside Fabric artifacts within the same interface. The ADF UI remains fully accessible, allowing you to monitor, manage, and edit your ADF factory items directly from the Fabric workspace. However, execution of pipelines, activities, and integration runtimes still occurs within your Azure resources.

This feature is useful for organizations transitioning to Fabric, as it provides a unified view of both ADF and Fabric resources, simplifying management and planning for migration.

For more information, see [Bring your Azure Data Factory into Fabric](migrate-pipelines-azure-data-factory-item.md).

## Related content

- [Migration best practices](migration-best-practices.md)
- [Connector comparison between ADF and Fabric Data Factory](connector-parity.md)
