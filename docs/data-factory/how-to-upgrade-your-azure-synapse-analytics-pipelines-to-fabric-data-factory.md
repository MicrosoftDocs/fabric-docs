---
title: Upgrade your Azure Synapse Analytics pipelines to Fabric Data Factory
description: Learn how to assess and upgrade your Azure Synapse Analytics pipelines to Fabric Data Factory.
author: ssindhub
ms.author: ssrinivasara
ms.topic: how-to
ms.date: 08/21/2026
ms.custom: pipelines
ai-usage: ai-assisted
---

# Upgrade your Azure Synapse Analytics pipelines to Fabric Data Factory (preview)

Modernize your workflows in Microsoft Fabric by bringing your existing Azure Synapse Analytics pipelines forward. The upgrade experience helps you assess pipeline readiness, understand compatibility gaps, and upgrade supported pipelines into a Microsoft Fabric workspace. You can move in a controlled, low-risk way.

## What you can do with the upgrade experience

With the Synapse pipelines upgrade experience, you can:

- Assess pipeline readiness directly in your Synapse workspace.
- See compatibility gaps at the pipeline and activity level.
- Upgrade supported pipelines to a Fabric workspace.
- Export assessment and upgrade results to CSV to plan the upgrade, remediation, and phased validation.

## Prerequisites

Before you start:

- You have an **Azure Synapse Analytics workspace** that contains pipelines.
- You have access to a **Microsoft Fabric tenant** and a **Fabric workspace**.

## Upgrade Spark items to Fabric first

If your Synapse pipelines include Notebook and/or Spark job definition (SJD) activities, upgrade those Spark artifacts to Fabric first. This separation ensures the pipeline upgrade experience can map those activities to the correct Fabric items instead of leaving them unmapped.

Use the  [Synapse-to-Fabric Spark Migration Assistant](/fabric/data-engineering/synapse-to-fabric-spark-migration-assistant) to upgrade Spark-related items from your Synapse workspace into a Fabric workspace.

## Upgrade Synapse pipelines

After creating your Spark artifacts in Fabric, upgrade pipelines using the Synapse pipelines upgrade experience.

When the pipelines upgrade runs:

- If matching Fabric notebooks or SJDs already exist, the upgrade can map the corresponding activities to those Fabric items.
- If the target Fabric notebooks or SJDs don't exist yet, the upgrade might leave those activities unmapped or deactivated until you create the required Fabric items and update the reference.

To upgrade your Synapse pipelines to Fabric:

1. [Run an assessment in Azure Synapse Analytics](#run-an-assessment-in-azure-synapse-analytics)
1. [Select pipelines to upgrade](#select-pipelines-to-upgrade)
1. [Map linked services to Fabric connections](#map-linked-services-to-fabric-connections)
1. [Complete the upgrade](#complete-the-upgrade)

### Run an assessment in Azure Synapse Analytics

1. In **Azure Synapse Analytics**, open the workspace you want to assess.
1. In the **Integrate** hub, select **Migrate to Fabric (Preview)**, and then select **Get started**.
1. Review the [assessment](#understand-assessment-statuses) pane. Expand pipelines to see activity-level details.
1. (Optional) Export assessment results as a **.csv** file to support offline planning and remediation.

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-synapse-analytics-pipelines-to-fabric/start-synapse-pipelines-migration-assessment.png" alt-text="Screenshot showing how to run the Azure Synapse Analytics upgrade assessment." lightbox="media/how-to-assess-and-upgrade-your-azure-synapse-analytics-pipelines-to-fabric/start-synapse-pipelines-migration-assessment.png":::

#### Understand assessment statuses

Each pipeline is categorized with a readiness status:

[!INCLUDE [upgrade-assessment-statuses](includes/upgrade-assessment-statuses.md)]

For details on how to drill into activity-level details, see [What the assessment statuses mean](how-to-upgrade-your-azure-data-factory-pipelines-to-fabric-data-factory.md#what-the-assessment-statuses-mean).

### Select pipelines to upgrade

After reviewing results, select the Synapse pipelines you want to upgrade to your Fabric workspace.

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-synapse-analytics-pipelines-to-fabric/view-synapse-pipelines-assessment-results.png" alt-text="Screenshot showing Synapse Analytics upgrade assessment results with option to select pipelines for upgrade." lightbox="media/how-to-assess-and-upgrade-your-azure-synapse-analytics-pipelines-to-fabric/view-synapse-pipelines-assessment-results.png":::

A phased approach works well:

- Start with **Ready** pipelines to validate end-to-end behavior.
- Then address **Needs review** items and rerun assessment to confirm progress.

### Map linked services to Fabric connections

In the upgrade flow, select a destination **Fabric workspace**, and then map **Synapse linked services** to **Fabric connections**.

- If you already created the required Fabric connections, select them from the dropdown.
- Otherwise, create new Fabric connections from workspace settings.

For guidance on creating and managing connections in Fabric, see [Data source management in Fabric](data-source-management.md).

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-synapse-analytics-pipelines-to-fabric/synapse-linked-service-to-connection-mapping.png" alt-text="Screenshot showing Fabric upgrade workspace selection followed by Synapse linked services to Fabric connection mapping." lightbox="media/how-to-assess-and-upgrade-your-azure-synapse-analytics-pipelines-to-fabric/synapse-linked-service-to-connection-mapping.png":::

> [!IMPORTANT]
> Pipelines can upgrade even if you don't map connections, but **activities that use those connections remain deactivated** until you configure them in Fabric and reactivate them.

### Complete the upgrade

After you map linked services to Fabric connections, select **Confirm** to complete the upgrade.

:::image type="content" source="media/how-to-assess-and-upgrade-your-azure-synapse-analytics-pipelines-to-fabric/successful-migration-completion.png" alt-text="Screenshot showing successful upgrade completion." lightbox="media/how-to-assess-and-upgrade-your-azure-synapse-analytics-pipelines-to-fabric/successful-migration-completion.png":::

After the upgrade completes, go to your Fabric workspace to review the upgraded pipelines. Each pipeline is created under the workspace and prefixed with its source Synapse workspace name.

> [!NOTE]
> Pipelines upgrade safely with **triggers disabled by default**, so you stay in control of execution.

## Post-upgrade validation

After the upgrade:

1. Validate connections and credentials.
2. Re-enable and configure triggers as needed (triggers are disabled by default).
3. Run end-to-end tests to confirm behavior.
4. Validate in a nonproduction environment before switching production workloads.

## Related upgrade resources

Use these resources to round out your end-to-end Synapse-to-Fabric upgrade plan:

- [Upgrade your Azure Data Factory pipelines to Fabric](how-to-upgrade-your-azure-data-factory-pipelines-to-fabric-data-factory.md)
- [Upgrade Azure Data Factory Mapping Data Flows pipelines to Fabric (preview)](dataflow-gen2-mapping-data-flows-transforms-upgrade.md)
- [Migration Assistant for Fabric Data Warehouse - Microsoft Fabric | Microsoft Learn](/fabric/data-warehouse/migration-assistant)
- [Synapse-to-Fabric Spark Migration Assistant](/fabric/data-engineering/synapse-to-fabric-spark-migration-assistant)
