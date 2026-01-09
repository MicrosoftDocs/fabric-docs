---
title: Migration critical differences
description: Differences to consider before migrating from Azure Data Factory to Fabric Data Factory that customers commonly encounter.
ms.reviewer: seanmirabile
ms.author: whhender
author: whhender
ms.topic: include
ms.date: 01/09/2026
---

Before you migrate from Azure Data Factory to Fabric Data Factory, consider these critical architectural differences that tend to have the biggest effect on migration planning:

| **Category** | **Azure Data Factory** | **Fabric Data Factory** | **Migration Impact** |
|--------------|------------------------|-------------------------|----------------------|
| **Dynamic connections** | Linked service properties can be dynamic using parameters | Connections don't support dynamic properties | Blocks Metadata Driven Architecture-based solutions that rely on parameterized connections |
| **Key Vault** | Mature integration with all auth types | Limited integration via [Fabric Key Vault Reference](../azure-key-vault-reference-overview.md).| Compare [currently supported Key Vault sources and authentication](../azure-key-vault-reference-configure.md#supported-connectors-and-authentication-types) with your existing configurations.|
| **Identity** | Managed Identity | [Fabric Workspace Identity](../../security/workspace-identity.md) | Different identity models, with some planning required to shift. |
| **Datasets** | Separate, reusable dataset objects | Properties are defined inline within activities | When you convert from ADF to Fabric, 'dataset' information is within each activity. |
| **Global Parameters** | Global Parameters | [Fabric Variable Library](/fabric/cicd/variable-library/get-started-variable-libraries) | Different implementation patterns and data types, though we have [a migration guide](../convert-global-parameters-to-variable-libraries.md) |
| **Pipeline execution** | Execute pipeline activity | [Invoke Pipeline activity](../invoke-pipeline-activity.md) with FabricDataPipeline connection type | Activity name and connection requirements change when converting.|
| **HDInsight activities** | Five separate activities (Hive, Pig, MapReduce, Spark, Streaming) | Single [HDInsight activity](../azure-hdinsight-activity.md) | You only need one activity type when converting, but all functionality is supported. |
| **Custom code** | Custom Activity | [Azure Batch activity](../azure-batch-activity.md) | The activity name is different, but supports the same functionality. |
| **Scheduling** | One trigger for many pipelines or many triggers per pipeline with centralized management | One schedule per pipeline or many schedules per pipeline with no schedule reuse or central hub | Fabric currently requires per-pipeline schedule management. |
| **Dataflows** | Mapping Data Flows (Spark-based) | [Dataflow Gen2](../dataflows-gen2-overview.md) (Power Query engine) with [fast copy](../dataflows-gen2-fast-copy.md) and [multiple destinations](../dataflow-gen2-data-destinations-and-managed-settings.md) | Different transformation engines and capabilities. Check our [guide to dataflows for Mapping Data Flow users](../guide-to-dataflows-for-mapping-data-flow-users.md) for more information. |

These differences mean that while most functionality is available in Fabric, your migration might need rearchitecting for certain patterns, especially those that rely on dynamic connections, centralized scheduling, or reusable datasets. On the other hand, Fabric offers enhanced native integration, easier CI/CD through [deployment pipelines](../cicd-pipelines.md), built-in [Copilot](../copilot-fabric-data-factory.md) assistance, and seamless workspace integration with OneLake, Lakehouse, and Warehouse.