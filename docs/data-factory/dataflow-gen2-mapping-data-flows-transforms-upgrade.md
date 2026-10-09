---
title: Upgrade Azure Data Factory pipelines with Mapping Data Flows to Fabric (Preview)
description: Learn how to upgrade Azure Data Factory pipelines containing Mapping Data Flows to Microsoft Fabric, converting them to mapping data flow transforms in Dataflow Gen2.
ms.topic: how-to
ms.date: 10/06/2026
ms.reviewer: krirukm
ms.search.form: DataflowGen2
ms.custom: dataflows
ai-usage: ai-assisted
---

# Upgrade Azure Data Factory pipelines with Mapping Data Flows to Fabric (Preview)

> [!IMPORTANT]
> Upgrading Azure Data Factory Mapping Data Flows to Fabric is currently in public preview and is subject to change.

Use the Azure Data Factory built-in upgrade experience to upgrade eligible pipelines containing Mapping Data Flows to Microsoft Fabric Data Factory. During the upgrade, supported Mapping Data Flows are converted to [mapping data flow (MDF) transforms in Dataflow Gen2](dataflow-gen2-mapping-data-flows-transforms.md), and the associated pipelines are upgraded to Fabric pipelines.

This article describes the additional validation, execution, and monitoring steps for upgraded MDF transforms. For an overview of the complete Azure Data Factory upgrade experience, see [Upgrade your Azure Data Factory pipelines to Fabric Data Factory](how-to-upgrade-your-azure-data-factory-pipelines-to-fabric-data-factory.md).

## Prerequisites

Before you start the upgrade, make sure you have the following:

- An Azure Data Factory instance with at least one pipeline that contains a Mapping Data Flow.
- Permission to access the Azure Data Factory instance and its pipelines.
- Access to a [Microsoft Fabric-enabled tenant](/fabric/enterprise/licenses).
- A Fabric license. If you don't have one, the **View in Fabric (Preview)** onboarding experience prompts you to sign up for a free license, if self-service sign-up is enabled for your tenant.
- Access to a Fabric capacity, such as a Trial capacity.
- Contributor or higher permissions to create and update items in the Fabric workspace.
- Fabric connections for source and destination data stores that aren't created automatically during the upgrade.

The upgrade experience creates supported Fabric connections automatically when their Azure Data Factory authentication configurations can be mapped safely. For other connections, select an existing Fabric connection or create one before starting the upgrade.

## Supported upgrade scenarios

The built-in upgrade experience supports eligible Azure Data Factory pipelines that contain Mapping Data Flows. During the upgrade process:

- The selected Azure Data Factory pipelines are upgraded to Fabric pipelines.
- Supported Mapping Data Flows are converted to MDF transforms in Dataflow Gen2.
- Pipelines and their referenced Mapping Data Flows are upgraded together.
- Supported linked services are mapped to new or existing Fabric connections.
- The original Azure Data Factory pipelines and Mapping Data Flows remain unchanged.

Before upgrading, review the [MDF transform limitations](dataflow-gen2-mapping-data-flows-transforms.md#limitations), supported connectors, transformations, authentication methods, and networking requirements.

## Upgrade pipelines that contain Mapping Data Flows

Start the upgrade in Azure Data Factory through **View in Fabric (Preview)**. Viewing your factory in Fabric doesn't upgrade or change your pipelines. The upgrade starts only after you review readiness, select pipelines, and explicitly select **Start upgrade (Preview)**.

### Step 1: View your Azure Data Factory in Fabric

1. Open your Azure Data Factory portal.
1. Select **View in Fabric (Preview)**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/view-in-fabric.png" alt-text="Screenshot showing the View in Fabric Preview entry point in Azure Data Factory." lightbox="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/view-in-fabric.png":::

1. If this is your first time using the experience, review and accept the terms and conditions, and then select **Try Fabric Data Factory**.

      :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/try-fabric-data-factory.png" alt-text="Screenshot showing the terms and conditions to try Fabric Data Factory." lightbox="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/try-fabric-data-factory.png":::
   
1. Follow the onboarding steps to:
   - Verify or obtain a Fabric license.
   - Select a Fabric capacity.
   - Create or reuse the Fabric workspace associated with your Azure Data Factory.
   - Surface the Azure Data Factory as an item in the workspace.
   - Optionally share workspace access with existing Azure Data Factory users and groups.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/set-up-factory-panel.png" alt-text="Screenshot showing the steps for setting up an Azure Data Factory in Fabric." lightbox="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/set-up-factory-panel.png":::

After setup, your Azure Data Factory is visible in Fabric. Nothing is upgraded, and pipeline execution and billing remain in Azure Data Factory.

For complete onboarding details, see [Upgrade your Azure Data Factory pipelines to Fabric Data Factory](how-to-upgrade-your-azure-data-factory-pipelines-to-fabric-data-factory.md#get-started).

### Step 2: Review readiness

1. In the Azure Data Factory item in Fabric, select **Assess and upgrade**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/assess-and-upgrade.png" alt-text="Screenshot showing the Assess and Upgrade button for an Azure Data Factory item in Fabric." lightbox="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/assess-and-upgrade.png":::

1. Review the readiness assessment.
1. Identify the pipelines containing Mapping Data Flows that you want to upgrade.
1. Review any pipelines categorized as **Review** and address unsupported or partially supported capabilities before upgrading.
1. Select the eligible pipelines that you want to upgrade.

The assessment is read-only and doesn't modify or upgrade the selected pipelines.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/readiness-assessment.png" alt-text="Screenshot showing Azure Data Factory pipeline readiness assessment results in Fabric." lightbox="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/readiness-assessment.png":::

### Step 3: Review connections

1. Select **Review connections**.
1. Review the Azure Data Factory linked services used by the selected pipelines and Mapping Data Flows.
1. Verify connections that were created automatically.
1. For connections that weren't created automatically, select an existing Fabric connection or create a new connection.
1. Confirm that each required source and destination is mapped to a valid Fabric connection.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/map-connections.png" alt-text="Screenshot showing the mapping of Azure Data Factory linked services to Fabric connections." lightbox="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/map-connections.png":::

> [!NOTE]
> Pipelines can still be upgraded if some connections aren't mapped. Activities that depend on unmapped connections are deactivated. Configure the required Fabric connections and re-enable those activities before running the upgraded pipelines.

### Step 4: Start the upgrade

1. Review the selected pipelines and connection mappings.
1. Select **Start upgrade (Preview)**.
1. Wait for the upgrade to complete.
1. Review the status of each upgraded item.

During the upgrade:

- Selected Azure Data Factory pipelines are upgraded to Fabric pipelines.
- Supported Mapping Data Flows referenced by the selected pipelines are converted to MDF transforms in Dataflow Gen2.
- Pipelines and their Mapping Data Flows are upgraded together.
- Upgraded items are placed in a folder prefixed with the source Azure Data Factory name.
- The source Azure Data Factory pipelines and Mapping Data Flows remain unchanged.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/upgrade-results.png" alt-text="Screenshot showing the results after upgrading Azure Data Factory pipelines to Fabric." lightbox="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/upgrade-results.png":::

## Validate upgraded mapping data flow transforms

After the upgrade finishes, open the upgrade results or the folder containing the upgraded items, and validate the MDF transforms before running the pipelines.

### Open the upgraded Dataflow Gen2 item

1. Open the upgraded Dataflow Gen2 item.
1. Review the upgraded MDF transform logic.
1. Validate the transformation graph.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transform-canvas-dataflow-gen2.png" alt-text="Screenshot of the mapping data flow transform authoring experience showing the migrated transformation graph." lightbox="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transform-canvas-dataflow-gen2.png":::

### Save the upgraded mapping data flow transform

1. Open the **Save & run** menu.
1. Select **Save**.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transform-save-menu.png" alt-text="Screenshot of the Save and run menu in the mapping data flow transform authoring experience.":::

> [!NOTE]  
> Only the **Save** action is currently supported for MDF transforms during public preview.

## Run upgraded pipelines

After validation, run the upgraded Fabric pipeline.

### Configure the pipeline run

1. Open the upgraded Fabric pipeline.
1. Select the **Dataflow activity**.
1. Review the selected MDF transform query.
1. Configure Spark runtime settings if needed.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/fabric-pipeline-dataflow-activity.png" alt-text="Screenshot of the pipeline editor showing the Dataflow activity configuration for a mapping data flow transform.":::

### Run the upgraded pipeline

1. Validate the pipeline.
1. Verify that all required connections are mapped and authenticated.
1. Re-enable any activities that you deactivated because of unmapped connections.
1. Run the pipeline manually.
1. Compare its results with the original Azure Data Factory pipeline.
1. After validation, run or configure, and re-enable schedules and triggers as needed.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/fabric-pipeline-dataflow-activity-run.png" alt-text="Screenshot of the pipeline run and scheduling options for the migrated pipeline.":::

## Validate upgrade results

Before production cutover, validate the upgraded workload in a nonproduction environment:

- Confirm that you mapped and authenticated all required Fabric connections.
- Compare source and sink row counts with the original Azure Data Factory run.
- Validate schema, data types, null handling, and schema-drift behavior.
- Validate Mapping Data Flow expressions and transformation results.
- Verify insert, update, upsert, and delete behavior.
- Validate parameters and dynamic content.
- Confirm idempotent behavior when pipelines are rerun.
- Review error handling and monitoring.
- Compare runtime behavior and performance without assuming identical execution duration.
- Re-enable and configure triggers only after completing end-to-end validation.

The original Azure Data Factory pipelines and Mapping Data Flows remain available for side-by-side validation.

## Monitor upgraded mapping data flow transform executions

You can monitor upgraded pipeline and MDF transform executions through:

- Pipeline output pane
- Monitoring Hub
- Activity Runs
- Dataflow activity execution details

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transform-pipeline-monitoring-from-output.png" alt-text="Screenshot of the pipeline output pane showing the Dataflow activity run status." lightbox="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transform-pipeline-monitoring-from-output.png":::

To review execution details:

1. Open the pipeline run details.
1. Select the Dataflow activity from **Activity Runs**.
1. Review execution status and runtime details.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transforms-monitoring-hub.png" alt-text="Screenshot of the Monitoring Hub showing pipeline activity runs and their statuses." lightbox="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transforms-monitoring-hub.png":::

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms-upgrade/mapping-data-flow-transforms-detailed-diagnostics.png" alt-text="Screenshot of the Dataflow activity execution details showing processing metrics.":::

## Limitations

The general Azure Data Factory upgrade limitations also apply to pipelines containing Mapping Data Flows. Review [Known limitations](how-to-upgrade-your-azure-data-factory-pipelines-to-fabric-data-factory.md#known-limitations) before selecting pipelines to upgrade.

The following limitations currently apply to MDF transforms during public preview:

| Area | Limitation |
| --- | --- |
| Flowlets | Not supported. |
| Data Flow Library | Not supported. |
| User-defined functions (UDFs) | Not supported. |
| Dataflow execution | MDF transforms can only be executed through the pipeline Dataflow activity. Direct Dataflow Gen2 refresh isn't supported. |
| Managed Virtual Network | Managed Virtual Network support isn't available. |
| Spark runtime execution | MDF transforms currently use Spark runtime infrastructure similar to Azure Data Factory and Azure Synapse Analytics Mapping Data Flows. |
| Feature parity | Not all Azure Data Factory Mapping Data Flow capabilities are available in the current preview. |

## Related content

- [Upgrade your Azure Data Factory pipelines to Fabric Data Factory](how-to-upgrade-your-azure-data-factory-pipelines-to-fabric-data-factory.md)
- [Mapping data flow transforms in Dataflow Gen2 (Preview)](dataflow-gen2-mapping-data-flows-transforms.md)
- [Upgrade planning for Azure Data Factory to Fabric Data Factory](upgrade-planning-azure-data-factory.md)
- [Upgrade best practices for Azure Data Factory to Fabric Data Factory](upgrade-best-practices.md)
- [Pricing for Dataflow Gen2](pricing-dataflows-gen2.md)
