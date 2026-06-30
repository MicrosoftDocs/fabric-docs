---
title: Mapping Data Flow Transforms in Dataflow Gen2 (Preview)
description: Learn about mapping data flow transforms in Dataflow Gen2, which enable you to author, execute, and monitor Spark-based data transformations in Data Factory in Microsoft Fabric.
ms.topic: concept-article
ms.date: 06/30/2026
ms.reviewer: krirukm
ms.search.form: DataflowGen2
ms.custom: dataflows
ai-usage: ai-assisted
---

# Mapping data flow transforms in dataflow gen2 (Preview)

> [!IMPORTANT]  
> Mapping data flow transforms in dataflow gen2 are currently in public preview and are subject to change.

Mapping data flow (MDF) transforms in dataflow gen2 enable you to author, execute, and monitor Spark-based data transformations directly within Data Factory in Microsoft Fabric.

MDF transforms bring the capabilities of Azure Data Factory and Azure Synapse Analytics Mapping Data Flows into Microsoft Fabric through a familiar low-code visual authoring experience integrated with dataflow gen2.

With MDF transforms, you can:

- Migrate existing Azure Data Factory and Azure Synapse Analytics Mapping Data Flows pipelines into Fabric.
- Create new Spark-based transformations directly in Fabric.
- Execute MDF transformations using Fabric data pipelines.
- Monitor transformation execution using integrated monitoring experiences.
- Continue using familiar Mapping Data Flow transformation patterns inside Fabric.

## What are mapping data flow transforms?

MDF transforms extend dataflow gen2 with Spark-powered transformation capabilities for large-scale data preparation and transformation workloads.

MDF transforms provide:

- A low-code visual authoring experience
- Spark-based execution
- Integrated orchestration through Fabric pipelines
- Monitoring and execution insights directly in Fabric

Use MDF transforms to:

- Migrate existing Azure Data Factory or Azure Synapse Analytics Mapping Data Flows pipelines to Fabric.
- Build new Spark-based transformation pipelines natively in Fabric.

MDF transforms integrate fully with dataflow gen2 and provide a familiar authoring experience similar to Azure Data Factory and Azure Synapse Analytics Mapping Data Flows.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/mapping-data-flow-transform-authoring-experience.png" alt-text="Screenshot of the mapping data flow transform authoring experience embedded inside a dataflow gen2 canvas in Microsoft Fabric." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/mapping-data-flow-transform-authoring-experience.png":::

## Supported scenarios

MDF transforms currently support the following scenarios.

### Migrate existing Mapping Data Flows

You can migrate existing Azure Data Factory and Azure Synapse Analytics Mapping Data Flows into Fabric using the Azure Data Factory/Synapse Analytics built-in migration experience.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/adf-migration-experience.png" alt-text="Screenshot of the Azure Data Factory migration experience for upgrading Mapping Data Flows pipelines to Fabric." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/adf-migration-experience.png":::

During migration:

1. Mapping Data Flows are converted into MDF transforms in dataflow gen2.
1. Pipelines and transformation logic are migrated together.
1. MDF transforms open inside the embedded transformation canvas in dataflow gen2.
1. Existing transformation logic can continue to be authored, validated, executed, and monitored in Fabric.

### Create new mapping data flow transforms in Fabric

You can also create new MDF transforms directly in dataflow gen2. This experience enables you to:

- Build Spark-based transformations using a visual interface.
- Use familiar Mapping Data Flow transformation capabilities.
- Execute transformations using Fabric data pipelines.
- Monitor execution through integrated monitoring experiences.

## Prerequisites

Before you use MDF transforms in dataflow gen2, ensure the following prerequisites are met:

- A [Fabric capacity](/fabric/enterprise/licenses).
- Contributor or higher permissions to the Fabric workspace.
- Existing Fabric connections for supported data sources.
- (Optional) An existing Azure Data Factory or Azure Synapse Analytics workspace, if you're using migration scenarios.

## Limitations

The following capabilities aren't currently supported in public preview:

| Area | Limitation |
| --- | --- |
| Flowlets | Not supported. |
| Data Flow Library | Not supported. |
| User-defined functions (UDFs) | Not supported. |
| Dataflow execution | MDF transforms can only be executed through the pipeline Dataflow activity. Direct execution from dataflow gen2 isn't currently supported. Only the **Save** action is available from the **Save & run** menu. |
| Managed Virtual Network | Managed Virtual Network (Managed VNet) support isn't available in this preview. |
| Runtime execution | MDF transform execution currently uses the underlying Synapse Spark runtime, similar to Azure Data Factory and Azure Synapse Analytics Mapping Data Flows. |
| Feature parity | Not all Mapping Data Flow capabilities are available in this preview. |

## Supported connectors

MDF transforms support most commonly used source and sink connectors available in Azure Data Factory and Azure Synapse Analytics Mapping Data Flows.

The following connectors are currently supported:

| Category | Data store | MDF transforms in dataflow gen2 (source/sink) | Supported Authentication Types |
| --- | --- | --- | --- |
| **Azure** | Azure Blob Storage | ✓/✓ | Basic, Managed Identity / Workspace Identity, Service Principal |
| | Azure Cosmos DB for NoSQL | ✓/✓ | Basic |
| | Azure Data Explorer | ✓/✓ | Managed Identity / Workspace Identity |
| | Azure Data Lake Storage Gen1 | ✓/✓ | Basic, Managed Identity / Workspace Identity, Service Principal |
| | Azure Data Lake Storage Gen2 | ✓/✓ | Basic, Managed Identity / Workspace Identity, Service Principal |
| | Azure Database for MySQL | ✓/✓ | Basic |
| | Azure Database for PostgreSQL | ✓/✓ | Basic |
| | Azure Databricks Delta Lake | ✓/✓ Use [delta format](/azure/data-factory/format-delta) | Basic |
| | Azure SQL Database | ✓/✓ | Basic, Managed Identity / Workspace Identity, Service Principal |
| | Azure SQL Managed Instance | ✓/✓ | Basic, Managed Identity / Workspace Identity, Service Principal |
| | Azure Synapse Analytics | ✓/✓ | Basic |
| **Database** | Snowflake | ✓/✓ | Basic |
| **File** | Amazon S3 | ✓/✓ | Basic |
| | SFTP | ✓/✓ | Basic |
| | Generic REST | ✓/✓ | Basic, Service Principal |

During authoring:

- Existing Fabric connections can be reused.
- New connections can be created directly from the authoring experience using the **Get Data** experience.
- Source and sink configuration follows familiar Mapping Data Flow patterns.

## Supported transformations

MDF transforms provide a familiar low-code visual transformation experience for building scalable Spark-based data transformation pipelines in Fabric.

The following transformations are currently supported:

| Name | Category | Description |
| --- | --- | --- |
| Aggregate | Schema modifier | Define aggregations such as SUM, MIN, MAX, and COUNT grouped by existing or computed columns. |
| Alter row | Row modifier | Set insert, delete, update, and upsert policies on rows. |
| Assert | Row modifier | Define assert rules for rows in the data stream. |
| Cast | Schema modifier | Change column data types with type checking. |
| Conditional split | Multiple inputs/outputs | Route rows to different streams based on matching conditions. |
| Derived column | Schema modifier | Generate new columns or modify existing fields using expressions. |
| External call | Schema modifier | Call external endpoints inline for each row. |
| Exists | Multiple inputs/outputs | Check whether data exists in another source or stream. |
| Filter | Row modifier | Filter rows based on conditions. |
| Flatten | Formatters | Flatten hierarchical structures such as JSON arrays into rows. |
| Join | Multiple inputs/outputs | Combine data from two sources or streams. |
| Lookup | Multiple inputs/outputs | Reference data from another source or stream. |
| New branch | Multiple inputs/outputs | Apply multiple transformation paths on the same stream. |
| Parse | Formatters | Parse JSON, delimited text, or XML formatted strings. |
| Pivot | Schema modifier | Transform distinct row values into columns. |
| Rank | Schema modifier | Generate ordered rankings based on sort conditions. |
| Select | Schema modifier | Rename, reorder, or remove columns. |
| Sink | - | Define the destination for transformed data. |
| Sort | Row modifier | Sort rows in the current data stream. |
| Source | - | Define the source for the data flow. |
| Stringify | Formatters | Convert complex types into string values. |
| Surrogate key | Schema modifier | Generate incrementing surrogate key values. |
| Union | Multiple inputs/outputs | Combine multiple data streams vertically. |
| Unpivot | Schema modifier | Transform columns into row values. |
| Window | Schema modifier | Define window-based aggregations over data streams. |

## Create a mapping data flow transform in dataflow gen2

To create a new MDF transform in Fabric:

1. Open your Fabric workspace.
1. Select **New item**.
1. Select **Dataflow Gen2**.
1. Provide a name for the dataflow gen2 item and select **Create**.
1. In the dataflow gen2 canvas, use one of the following options:
   - Select **Run Mapping data flow transforms** from the **New** action grouping in the dataflow gen2 home ribbon.
   - Select the **Run Mapping data flow transforms (ADF Mapping Data Flows)** tile from the canvas.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/select-run-mapping-data-flow-transforms.png" alt-text="Screenshot showing option to create a mapping data flow transform from the dataflow gen2 ribbon in Microsoft Fabric." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/select-run-mapping-data-flow-transforms.png":::

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/select-again-run-mapping-data-flow-transforms.png" alt-text="Screenshot showing option to create a mapping data flow transform from the dataflow gen2 canvas tile in Microsoft Fabric." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/select-again-run-mapping-data-flow-transforms.png":::

A new MDF transform action appears on the dataflow gen2 canvas and opens the embedded MDF transform authoring experience.

> [!TIP]  
> The MDF transform authoring experience uses a familiar visual interface similar to Azure Data Factory and Azure Synapse Analytics Mapping Data Flows.

## Author mapping data flow transforms

After you create an MDF transform, you can begin authoring transformation logic.

### Enable debug mode

For interactive authoring and data preview:

1. Turn on the **Data flow debug** toggle from the floating toolbar.
1. Wait for the debug session to initialize.
1. After it's enabled, you can preview source and transformation data during authoring.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/select-data-flow-debug.png" alt-text="Screenshot of the mapping data flow transform canvas with Data flow debug mode enabled." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/select-data-flow-debug.png":::

> [!NOTE]  
> Debug sessions might take several minutes to initialize depending on Spark runtime availability.

### Add a source

To configure a source:

1. Select **Add source**.
1. Select the connection type.
1. Select an existing Fabric connection or create new connections directly through the **Get Data** experience if needed.
1. Browse and select the source file, table, or dataset.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/source-configuration-settings.png" alt-text="Screenshot of the source configuration settings in the mapping data flow transform authoring experience." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/source-configuration-settings.png":::

After you configure the source connection and dataset, use the **Data preview** tab to validate and preview the source data during interactive authoring.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/data-preview-source.png" alt-text="Screenshot of the Data preview tab showing source data in the mapping data flow transform authoring experience." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/data-preview-source.png":::

### Add transformations

To add transformations:

1. Select the **+** icon next to a source or transformation.
1. Select the transformation type.
1. Configure transformation settings.

You can continue building transformation logic using the visual transformation canvas.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/transformation-graph.png" alt-text="Screenshot of the visual transformation graph in the mapping data flow transform authoring experience." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/transformation-graph.png":::

### Configure a sink

After transformation logic is complete:

1. Add a sink transformation.
1. Configure the destination connection.
1. Configure write settings.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/add-sink-transformation.png" alt-text="Screenshot of the sink transformation configuration in the mapping data flow transform authoring experience." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/add-sink-transformation.png":::

### Validate and save

Before execution:

1. Select **Validate** from the MDF transform toolbar.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/validate-toolbar.png" alt-text="Screenshot of the Validate button in the mapping data flow transform toolbar." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/validate-toolbar.png":::

1. Resolve validation issues if any are reported.
1. Select **Save** from the **Save & run** menu.

   :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/save-mapping-data-flow-transform.png" alt-text="Screenshot of the Save option in the Save and run menu for a mapping data flow transform." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/save-mapping-data-flow-transform.png":::

> [!NOTE]  
> Only the **Save** action is currently supported for dataflow gen2 with MDF transforms in public preview.

## Execute mapping data flow transforms using Fabric pipelines

You execute MDF transforms through Fabric data pipelines using a Dataflow activity.

To execute an MDF transform:

1. Create a new Fabric pipeline.
1. Add a **Dataflow** activity to the pipeline.
1. In the activity **Settings**, select the dataflow gen2 item containing the MDF transform.
1. Select the MDF transform query to execute.
1. Configure Spark runtime settings as needed.
1. Validate and publish the pipeline.
1. Run the pipeline manually or configure a schedule or triggers.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/pipeline-dataflow-activity.png" alt-text="Screenshot of a Fabric pipeline with a Dataflow activity configured for mapping data flow transform execution." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/pipeline-dataflow-activity.png":::

### Configure Spark runtime settings

MDF transforms execute using managed Spark runtime integrated with Data Factory in Microsoft Fabric. You can configure Spark runtime settings during pipeline execution, including:

- Compute sizing
- Sink properties

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/spark-runtime-configuration.png" alt-text="Screenshot of the Spark runtime configuration settings for a Dataflow activity in a Fabric pipeline." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/spark-runtime-configuration.png":::

## Monitor mapping data flow transform executions

You can monitor MDF transform execution through:

- The pipeline output pane

  :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/pipeline-output-monitoring.png" alt-text="Screenshot of the pipeline output pane showing mapping data flow transform execution results." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/pipeline-output-monitoring.png":::

- The Monitoring Hub

  :::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/monitoring-hub-activity-runs.png" alt-text="Screenshot of the Monitoring Hub showing activity runs for a mapping data flow transform execution." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/monitoring-hub-activity-runs.png":::

To view monitoring details:

1. Open the pipeline run details.
1. Select the Dataflow activity from **Activity Runs**.
1. Review execution status and runtime details.

:::image type="content" source="media/dataflow-gen2-mapping-data-flows-transforms/mapping-data-flow-transform-monitoring-page.png" alt-text="Screenshot of the mapping data flow transform monitoring page showing execution status and runtime details." lightbox="media/dataflow-gen2-mapping-data-flows-transforms/mapping-data-flow-transform-monitoring-page.png":::

## Related content

- [What is dataflow gen2?](dataflows-gen2-overview.md)
- [Upgrade Azure Data Factory mapping data flows pipelines to Fabric](dataflow-gen2-mapping-data-flows-transforms-upgrade.md)
- [A guide to Fabric dataflows for Azure Data Factory Mapping Data Flow users](guide-to-dataflows-for-mapping-data-flow-users.md)
- [Use a dataflow in a pipeline](tutorial-dataflows-gen2-pipeline-activity.md)
- [Monitor your dataflows](dataflows-gen2-monitor.md)
