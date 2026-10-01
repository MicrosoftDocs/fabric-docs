---
title: Upgrade critical differences
description: Differences to consider before upgrading from Azure Data Factory to Fabric Data Factory that customers commonly encounter.
ms.reviewer: seanmirabile
ms.topic: include
ms.date: 10/01/2026
---

Before you upgrade from Azure Data Factory to Fabric Data Factory, consider these critical architectural differences that tend to have the biggest effect on upgrade planning:

| **Category** | **Azure Data Factory** | **Fabric Data Factory** | **Upgrade Impact** |
|--------------|------------------------|-------------------------|----------------------|
| **Custom code** | Custom Activity | [Azure Batch activity](../azure-batch-activity.md) | The activity name is different, but supports the same functionality. |
| **Dataflows** | Mapping Data Flows with Spark-based execution | Dataflow Gen2 supports [Mapping Data Flow (MDF) transforms](/fabric/data-factory/dataflow-gen2-mapping-data-flows-transforms) with Spark-based execution. MDF transforms are currently in preview. | Eligible Azure Data Factory and Azure Synapse Analytics Mapping Data Flows can be migrated to MDF transforms in Dataflow Gen2 by using the [built-in migration experience](/fabric/data-factory/dataflow-gen2-mapping-data-flows-transforms-upgrade). Review the supported connectors, transformations, authentication methods, and preview limitations before migration. For unsupported scenarios, redesign the transformation by using Power Query in Dataflow Gen2, Fabric Warehouse SQL, notebooks, or another Fabric capability. |
| **Datasets** | Separate, reusable dataset objects | Properties are defined inline within activities | When you convert from ADF to Fabric, 'dataset' information is within each activity. |
| **Dynamic connections** | Linked service properties can be dynamic using parameters | Connection properties don't support dynamic properties but pipeline activities can use dynamic content for connection objects | For Metadata Driven Architecture-based solutions that rely on parameterized connections, parameterize the connection object in Fabric. |
| **Global Parameters** | Global Parameters | [Fabric Variable Library](/fabric/cicd/variable-library/get-started-variable-libraries) | Different implementation patterns and data types, though we have [an upgrade guide](../convert-global-parameters-to-variable-libraries.md). |
| **HDInsight activities** | Five separate activities (Hive, Pig, MapReduce, Spark, Streaming) | Single [HDInsight activity](../azure-hdinsight-activity.md) | You only need one activity type when converting, but all functionality is supported. |
| **Identity** | Managed Identity | [Fabric Workspace Identity](../../security/workspace-identity.md) | Different identity models, with some planning required to shift. |
| **Key Vault** | Mature integration with all auth types | Limited integration via [Fabric Key Vault Reference](../azure-key-vault-reference-configure.md)| Compare [currently supported Key Vault sources and authentication](../azure-key-vault-reference-configure.md#supported-connectors-and-authentication-types) with your existing configurations.|
| **Pipeline execution** | Execute pipeline activity | [Invoke Pipeline activity](../invoke-pipeline-activity.md) with FabricDataPipeline connection type | Activity name and connection requirements change when converting.|
| **Scheduling** | One trigger for many pipelines or many triggers per pipeline with centralized management | One schedule per pipeline or many schedules per pipeline with no schedule reuse or central hub | Fabric currently requires per-pipeline schedule management. |
