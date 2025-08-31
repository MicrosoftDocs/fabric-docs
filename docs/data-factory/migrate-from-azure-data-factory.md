---
title: Migrate from Azure Data Factory to Fabric Data Factory
description: Learn how to migrate your Azure Data Factory solutions to Data Factory in Microsoft Fabric.
author: itsnotaboutthecell
ms.author: alpowers
ms.reviewer: makromer, whhender
ms.topic: conceptual
ms.date: 08/25/2025
ms.custom: fabric-cat, intro-migration
ai-usage: ai-assisted
---

# Migrate from Azure Data Factory to Data Factory in Microsoft Fabric

This guide is for Azure Data Factory and Synapse Gen2 pipeline creators. It explains how to modernize and migrate your pipelines to Data Factory in Microsoft Fabric.

## Overview

Microsoft Fabric is a unified platform for self-service and IT-managed enterprise data. It supports scalable, secure, and accessible solutions for organizations of all sizes.

Data Factory in Fabric offers advanced features and capabilities, enabling data integration developers to consolidate their solutions within Fabric. This guide answers common questions about migrating to Fabric pipelines, including:

- What features are available in Fabric pipelines?
- How do Fabric pipelines differ from Azure Data Factory?
- How do you migrate existing pipelines?

> [!NOTE]
> The decision to migrate depends on your specific requirements. Evaluate the benefits carefully to make an informed choice. Currently, there are no plans to deprecate Azure Data Factory or Synapse Gen2 for data ingestion. However, Fabric pipelines are the focus for enterprise data ingestion.

## Enterprise and self-service data integration

Fabric simplifies discovery, collaboration, and management by bringing resources together. Central IT teams can operationalize data movement and transformation services while integrating self-service tools. Key features include:

- Office 365 and Teams activities for communication.
- Seamless Power BI model refreshes.
- Governance tools for data lineage and monitoring.
- Generative AI with Copilot for intelligent pipeline creation and error resolution.

This shared platform streamlines workflows, helping organizations scale their data solutions efficiently.

## Fabric capacities

Fabric's distributed architecture handles high loads, spikes, and concurrency effectively. Larger Fabric capacity SKUs offer better performance and throughput.

## Feature comparison

Here’s a comparison of features in Azure Data Factory and Fabric Data Factory:

| Feature | Azure Data Factory | Fabric Data Factory |
|:---|:---|:---|
| **Pipeline activities** |||
| [Office 365](outlook-activity.md) and [Teams](teams-activity.md) activities to send messages and support collaboration | No | Yes |
| Connections to [Power BI semantic models](semantic-model-refresh-activity.md) and [Dataflow Gen2](dataflow-activity.md) for consistent data refreshes | No | Yes |
| [Validation](/azure/data-factory/control-flow-validation-activity) to ensure pipelines only run after meeting criteria or timing out | Yes | Yes<sup>1</sup> |
| Execute [SQL Server Integration Services (SSIS)](/azure/data-factory/how-to-invoke-ssis-package-ssis-activity) packages for data integration | Yes | Planned |
| **Data transformation** |||
| Visual data transformations with Apache Spark clusters using [Mapping Dataflows](/azure/data-factory/concepts-data-flow-overview) | Yes | No<sup>2</sup> |
| Visual data transformations with the Fabric compute engine using Power Query in [Dataflow Gen2](data-factory-overview.md#dataflows) | No | Yes |
| **Connectivity** |||
| Support for all [Data Factory data sources](/power-query/connectors) | Yes | In progress<sup>3</sup> |
| **Scalability** |||
| [Scheduled runs](pipeline-runs.md) for seamless pipeline execution | Yes | Yes |
| Multiple runs for a single pipeline | Yes | [Planned](https://aka.ms/fabricrm) |
| Tumbling window triggers for nonoverlapping time windows | Yes | [Planned](https://aka.ms/fabricrm) |
| Event triggers to automate pipeline runs based on events | Yes | Yes<sup>4</sup> |
| **Artificial intelligence** |||
| [Copilot for Data Factory](../get-started/copilot-fabric-data-factory.md) for intelligent pipeline generation and error suggestions | No | Yes |
| **Content management** |||
| [Data lineage view](../governance/lineage.md) to understand pipeline dependencies | No | Yes |
| [Deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md) to manage content lifecycles | No | Yes |
| **Platform scalability and resiliency** |||
| [Premium capacity](../enterprise/licenses.md) for increased scale and performance | No | Yes |
| [Multi-Geo](../admin/service-admin-premium-multi-geo.md) support for regional and organizational data residency needs | Yes | Yes |
| **Security** |||
| [Virtual network (VNet)](/data-integration/vnet/overview) connectivity for seamless integration | No | Yes |
| [On-premises data gateway](/data-integration/gateway/service-gateway-onprem) for secure access to on-premises data | No | Yes |
| Azure [service tags](../security/security-service-tags.md) for simplified network security rule updates | Yes | Yes |
| **Governance** |||
| [Content endorsement](../governance/endorsement-overview.md) to promote high-quality items | No | Yes |
| [Microsoft Purview integration](../governance/microsoft-purview-fabric.md) for managing and governing items | Yes | Yes |
| Microsoft Purview Information Protection [sensitivity labels](../get-started/apply-sensitivity-labels.md) and [Microsoft Defender for Cloud Apps](../governance/service-security-using-defender-for-cloud-apps-controls.md) integration for data loss prevention | No | Yes |
| **Monitoring and diagnostic logging** |||
| Log pipeline execution events for monitoring and troubleshooting | Yes | Planned |
| [Monitoring hub](../admin/monitoring-hub.md) for tracking Fabric items | No | Yes |
| [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) for monitoring capacities | No | Yes |
| [Audit log](../admin/track-user-activities.md) to track user activities across Fabric and Microsoft 365 | No | Yes |

<sup>1</sup> Use the [Get metadata](get-metadata-activity.md), [Until](until-activity.md), and [If condition](if-condition-activity.md) activities for equivalent metadata retrieval of the Validation activity.

<sup>2</sup> Use the Invoke remote pipeline function to execute mapping data flow activities. See the [Invoke Pipeline activity](invoke-pipeline-activity.md).

<sup>3</sup> For supported connectors, see [Pipeline support](pipeline-support.md).

<sup>4</sup> Use Fabric eventstreams and Reflex to trigger execution run events. See [Pipeline event triggers](pipeline-storage-event-triggers.md).

## Considerations

There are some other considerations to factor into your planning before migrating to Fabric pipelines.

### Licensing

Fabric pipelines require at least a Microsoft Fabric (Free) license to author in a premium capacity workspace. Learn more in [Fabric licenses](../enterprise/licenses.md).

### Roadmap

For updates and planned features, see the [Microsoft Fabric release plan documentation](/fabric/release-plan).

## Related Content

[Plan your ADF to Fabric Data Factory migration](migrate-planning-azure-data-factory.md).
