---
title: Migration critical differences
description: Differences to consider before migrating from Azure Data Factory to Fabric Data Factory that customers commonly encounter.
ms.reviewer: seanmirabile
ms.author: whhender
author: whhender
ms.topic: include
ms.date: 12/19/2025
---

Before you migrate from Azure Data Factory to Fabric Data Factory, consider these critical architectural differences that tend to have the biggest impact on migration planning:

**Connection and authentication changes:**

- **Dynamic properties limitation**: Azure Data Factory lets you make all properties of a Linked Service dynamic using parameters, which is essential for Metadata Driven Architecture (MDD) patterns. Fabric Connections don't currently support dynamic properties, which can block MDD-based solutions that rely on parameterized connections.
- **Key Vault integration**: Only some Fabric Connections support Azure Key Vault integration through [Fabric Key Vault Reference](azure-key-vault-reference-overview.md), and this feature currently only allows User Authentication (not Service Principal or Managed Identity).
- **Identity changes**: Azure Data Factory Managed Identity becomes [Fabric Workspace Identity](../security/workspace-identity.md) in Fabric.

**Architecture and design pattern changes:**

- **No datasets**: Datasets don't exist in Fabric. You define data source properties inline within individual activities instead of as separate, reusable objects.
- **Global Parameters to Variable Library**: Azure Data Factory Global Parameters become the [Fabric Variable Library](variable-library.md), which provides similar functionality but with different implementation patterns.

**Activity and orchestration changes:**

- **Execute Pipeline becomes Invoke Pipeline**: The Execute Pipeline activity becomes the [Invoke Pipeline activity](invoke-pipeline-activity.md), which needs a Fabric Connection Type of FabricDataPipeline for cross-pipeline orchestration.
- **HDInsight consolidation**: Five separate HDInsight activities (Hive, Pig, MapReduce, Spark, Streaming) in ADF become a single [HDInsight activity](azure-hdinsight-activity.md) in Fabric.
- **Custom Activity becomes Azure Batch**: The Custom Activity in ADF becomes the [Azure Batch activity](azure-batch-activity.md) in Fabric for custom code execution.

**Scheduling and triggering differences:**

- **Scheduling model changes**: In Azure Data Factory, you can have one trigger for many pipelines, and one pipeline can have many triggers, which allows centralized trigger management. In Fabric, the model is different: one schedule applies to one pipeline, and while one pipeline can have many schedules, you can't reuse the same schedule across pipelines. Fabric doesn't have a centralized scheduling hub, so you manage schedules at the individual pipeline level.

**Data transformation approach:**

- **Mapping Data Flows to Dataflow Gen2**: ADF Mapping Data Flows use Spark-based transformations, while [Dataflow Gen2](dataflows-gen2-overview.md) uses Power Query as its transformation engine, offering [fast copy](dataflows-gen2-fast-copy.md), [multiple data destinations](dataflow-gen2-data-destinations-and-managed-settings.md), and native Fabric integration.

**Integration and compute:**

- **Self-hosted Integration Runtime to On-premises Data Gateway**: You replace SHIR with [OPDG](how-to-access-on-premises-data.md), which supports Fabric services but has different capabilities, including node limits (10 vs. 8), credential storage (centralized vs. local), and load balancing approaches (query-level vs. task-level).

These differences mean that while about 90% of activities are available in Fabric, your migration might need rearchitecting for certain patterns, especially those that rely on dynamic connections, centralized scheduling, or reusable datasets. On the other hand, Fabric offers enhanced native integration, easier CI/CD through [deployment pipelines](cicd-pipelines.md), built-in [Copilot](copilot-fabric-data-factory.md) assistance, and seamless workspace integration with OneLake, Lakehouse, and Warehouse.