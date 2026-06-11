---
title: Upgrade Azure Data Factory Mapping Data Flows Pipelines to Fabric (Preview)
description: Learn how to upgrade Azure Data Factory pipelines containing Mapping Data Flows to Microsoft Fabric, converting them to mapping data flow transforms in Dataflow Gen2.
ms.topic: how-to
ms.date: 06/04/2026
ms.reviewer: krirukm
ms.search.form: DataflowGen2
ms.custom: dataflows
ai-usage: ai-assisted
---

# Upgrade Azure Data Factory mapping data flows pipelines to Fabric (Preview)

> [!IMPORTANT]  
> The upgrade experience for Azure Data Factory Mapping Data Flows to Fabric is currently in public preview and is subject to change.

Upgrade Azure Data Factory pipelines containing Mapping Data Flows to Microsoft Fabric Data Factory by following the steps in this article. This article covers the migration path for pipelines that use Mapping Data Flows, which are converted to [mapping data flow (MDF) transforms in Dataflow Gen2](dataflow-gen2-mapping-data-flows-transforms.md). To migrate pipelines that don't contain Mapping Data Flows, see [Upgrade your Azure Data Factory pipelines to Fabric](/azure/data-factory/how-to-upgrade-your-azure-data-factory-pipelines-to-fabric-data-factory).

## Prerequisites

Before you start the upgrade, make sure you have the following:

- Access to an Azure Data Factory instance containing Mapping Data Flows.
- Access to a [Microsoft Fabric-enabled tenant](/fabric/enterprise/licenses).
- Contributor or higher permissions to the Fabric workspace.
- Existing [Fabric connections](/fabric/data-factory/connector-overview) for supported data sources and destinations.

## Supported upgrade scenarios

The upgrade tool supports the following scenarios:

- Azure Data Factory pipelines containing Mapping Data Flows.
- Azure Synapse Analytics pipelines containing Mapping Data Flows.
- Lift-and-shift migration of existing Mapping Data Flow workloads to Fabric.

## Start the migration

You can start migrating Azure Data Factory pipelines containing Mapping Data Flows from either of the following entry points.

| Entry point | Best for | Starting step |
| --- | --- | --- |
| From Azure Data Factory | Running an assessment of pipeline readiness before migration | [Option A: Start from Azure Data Factory](#option-a-start-from-azure-data-factory) |
| From a Fabric workspace | Directly mounting and migrating an Azure Data Factory instance from Fabric | [Option B: Start from Fabric](#option-b-start-from-fabric) |

Both options continue at [Migrate pipelines](#migrate-pipelines).

### Option A: Start from Azure Data Factory

Use this option when you want to:

- Review migration readiness
- Run migration assessment
- Evaluate supported pipelines before migration

#### Start migration from Azure Data Factory

1. Open the Azure Data Factory portal.
1. Select **Migrate to Fabric (Preview)**.
1. Select **Get started**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/adf-migrate-to-fabric-entry-get-started.png" alt-text="Screenshot of the Azure Data Factory portal showing the Migrate to Fabric (Preview) option and Get started button.":::

#### Review migration assessment

1. On the **Fabric Migration Assessment (Preview)** page, review the list of supported pipelines available for migration.
1. Select **Next**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/fabric-migration-assessment-page.png" alt-text="Screenshot of the Fabric Migration Assessment page listing pipelines ready for migration.":::

#### Mount Azure Data Factory to Fabric

1. Select the Fabric workspace where you want to mount the Azure Data Factory instance.
1. Select **Mount**.
1. After the mount operation completes, select **Continue in Fabric**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mount-adf-to-fabric-workspace.png" alt-text="Screenshot of the Fabric workspace selection screen used to mount an Azure Data Factory instance.":::

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mount-adf-to-fabric-workspace-continue-in-fabric.png" alt-text="Screenshot of the Continue in Fabric screen for opening the mounted Azure Data Factory instance in Microsoft Fabric.":::

### Option B: Start from Fabric

Use this option when you already know which Azure Data Factory instance you want to migrate and want to start directly from Fabric.

#### Mount Azure Data Factory from Fabric

1. Open your Fabric workspace.
1. Select **New item**.
1. Select **Azure Data Factory**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/fabric-new-item-adf-selection.png" alt-text="Screenshot of the Microsoft Fabric workspace New item experience showing Azure Data Factory selection.":::

1. Select the Azure Data Factory instance to mount.
1. Select **OK**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/data-factory-selection-in-mount.png" alt-text="Screenshot of the Azure Data Factory instance selection dialog.":::

## Migrate pipelines

After you mount Azure Data Factory in Fabric, continue with the migration workflow.

### Select pipelines to migrate

1. Open the mounted Azure Data Factory item in Fabric.
1. Select **Migrate to Fabric (Preview)**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mounted-adf-migrate-pipelines.png" alt-text="Screenshot of the mounted Azure Data Factory item in Fabric showing the Migrate to Fabric (Preview) option.":::

1. Select the pipeline containing the Mapping Data Flow.
1. Select **Review connections**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/migrate-to-fabric-review-connections.png" alt-text="Screenshot of the pipeline selection screen showing pipelines ready for migration.":::

### Map linked services to Fabric connections

1. On the **Map connections** page:

   - Review Azure Data Factory linked services.
   - Map them to Fabric connections.

1. Select **Confirm**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/map-adf-linked-services-to-fabric-connections.png" alt-text="Screenshot of the Map connections page for mapping Azure Data Factory linked services to Fabric connections.":::

### Review migration results

After migration completes, the tool:

- Migrates pipelines and Mapping Data Flows together.
- Converts Mapping Data Flows to MDF transforms in Dataflow Gen2.
- Places migrated artifacts in a new folder in the Fabric workspace.

Select **View in workspace**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/migration-results-view-in-workspace.png" alt-text="Screenshot of the migration results page showing migrated resources and their statuses.":::

## Validate migrated mapping data flow transforms

After migration, open the migration folder and validate the upgraded MDF transforms before you run them.

### Open the migrated Dataflow Gen2 item

1. Open the migrated Dataflow Gen2 item.
1. Review the migrated MDF transform logic.
1. Validate the transformation graph using the MDF transform toolbar.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transform-canvas-dataflow-gen2.png" alt-text="Screenshot of the mapping data flow transform authoring experience showing the migrated transformation graph.":::

### Save the migrated mapping data flow transform

1. Open the **Save & run** menu.
1. Select **Save**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transform-save-menu-preview.png" alt-text="Screenshot of the Save and run menu in the mapping data flow transform authoring experience.":::

> [!NOTE]  
> Only the **Save** action is currently supported for MDF transforms during public preview.

## Run migrated pipelines

After validation, run the migrated Fabric pipeline.

### Configure the pipeline run

1. Open the migrated Fabric pipeline.
1. Select the **Dataflow activity**.
1. Review the selected MDF transform query.
1. Configure Spark runtime settings if needed.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/fabric-pipeline-dataflow-activity.png" alt-text="Screenshot of the pipeline editor showing the Dataflow activity configuration for a mapping data flow transform.":::

### Run the migrated pipeline

1. Validate the pipeline.
1. Run the pipeline manually or configure schedules and triggers.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/fabric-pipeline-dataflow-activity-run.png" alt-text="Screenshot of the pipeline run and scheduling options for the migrated pipeline.":::

## Monitor migrated mapping data flow transform executions

You can monitor migrated pipeline and MDF transform executions through:

- Pipeline output pane
- Monitoring Hub
- Activity Runs
- Dataflow activity execution details

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transform-pipeline-monitoring-from-output.png" alt-text="Screenshot of the pipeline output pane showing the Dataflow activity run status.":::

To review execution details:

1. Open the pipeline run details.
1. Select the Dataflow activity from **Activity Runs**.
1. Review execution status and runtime details.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transforms-monitoring-hub.png" alt-text="Screenshot of the Monitoring Hub showing pipeline activity runs and their statuses.":::

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transforms-detailed-diagnostics.png" alt-text="Screenshot of the Dataflow activity execution details showing processing metrics.":::

## Limitations

The following limitations currently apply during public preview:

| Area | Limitation |
| --- | --- |
| Flowlets | Not supported. |
| Data Flow Library | Not supported. |
| User-defined functions (UDFs) | Not supported. |
| Dataflow execution | MDF transforms can only be executed through the Pipeline Dataflow activity. Refresh dataflow isn't supported. |
| Managed Virtual Network | Managed Virtual Network support isn't available. |
| Spark runtime execution | MDF transforms currently use Spark runtime infrastructure similar to Azure Data Factory and Azure Synapse Analytics Mapping Data Flows. |

## Related content

- [Mapping data flow transforms in Dataflow Gen2 (Preview)](dataflow-gen2-mapping-data-flows-transforms.md)
- [Upgrade your Azure Data Factory pipelines to Fabric](/azure/data-factory/how-to-upgrade-your-azure-data-factory-pipelines-to-fabric-data-factory)
- [Assess your pipelines for migration to Fabric](/azure/data-factory/how-to-assess-your-azure-data-factory-to-fabric-data-factory-migration)
- [A guide to Fabric dataflows for Mapping Data Flow users](guide-to-dataflows-for-mapping-data-flow-users.md)
- [Pricing for Dataflow Gen2](pricing-dataflows-gen2.md)
