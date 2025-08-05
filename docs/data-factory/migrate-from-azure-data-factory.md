---
title: Migrate from Azure Data Factory to Fabric Data Factory
description: This article provides details on how customers of Azure Data Factory (ADF) can migrate their existing solutions to Data Factory in Microsoft Fabric.
author: itsnotaboutthecell
ms.author: alpowers
ms.reviewer: makromer, jonburchel
ms.topic: conceptual
ms.date: 01/30/2025
ms.custom: fabric-cat, intro-migration
---

# Migrate from Azure Data Factory to Data Factory in Microsoft Fabric

This article targets Azure Data Factory and Synapse Gen2 pipeline creators. It provides you with guidance and rationale to help modernize and migrate your pipelines to Data Factory for Microsoft Fabric.

## Background

Microsoft Fabric is an integrated platform for both self-service and IT-managed enterprise data. With exponential growth in data volumes and complexity, Fabric customers demand enterprise solutions that scale, are secure, easy to manage, and accessible to all users across the largest of organizations.

In recent years, Microsoft invested significant work to deliver scalable cloud capabilities to customers. To that end, Data Factory in Fabric empowers a large ecosystem of data integration developers and data integration solutions built up over decades to use the full set of features, and capabilities that go far beyond comparable functionality available in previous generations.

Naturally, customers are asking whether there's an opportunity to consolidate by hosting their data integration solutions within Fabric. They often ask questions like:

- Does all the functionality we depend on work in Fabric pipelines?
- What capabilities are available only in Fabric pipelines?
- How do we migrate existing pipelines to Fabric pipelines?
- What's Microsoft's roadmap for enterprise data ingestion?

Answers to many of these questions are described in this article.

> [!NOTE]
> The decision to migrate to Fabric capacities depends on the requirements of each customer. Customers should carefully evaluate other benefits in order to make an informed decision. We expect to see organic migration to Fabric pipelines over time, and our intention is that it happens on terms that each customer is comfortable with.
> 
> To be clear, currently there aren't any plans to deprecate Azure Data Factory or Synapse Gen2 for data ingestion. There's a priority to focus investment on Fabric pipelines for enterprise data ingestion, and so the extra value provided by Fabric capacities will increase over time. Customers who choose Fabric capacities can expect to benefit from alignment with the Microsoft Fabric product roadmap.

### Convergence of enterprise and self-service data integration

The consolidation of items in Fabric simplifies discovery, collaboration, and management by colocating resources. This allows central IT teams to operationalize mission-critical data movement and transformation services aligned with corporate standards, including data lineage and monitoring, while more easily integrating popular self-service items.

To support the collaborative and scalable needs of organizations, Fabric pipelines introduce Office 365 and Teams activities for sending messages, seamless refreshes of Power BI semantic models, and robust governance features, helping organizations manage data lineage and pipeline monitoring. The integration of generative AI via Copilot further enhances the pipeline experience by offering intelligent pipeline generation and error resolution explanations, simplifying the creation and management of complex solutions.

By utilizing a common platform, the workflow is streamlined, enhancing solution development between business and IT. This empowers organizations to scale their data solutions to enterprise levels, ensuring high performance, flexibility, and efficiency in managing vast amounts of data.

### Fabric capacities

Due to its distributed architecture, Fabric capacities are less sensitive to overall load, temporal spikes, and high concurrency. By consolidating capacities to larger Fabric capacity SKUs, customers can achieve increased performance and throughput.

### Feature comparison

The following table lists features supported in Azure Data Factory and Fabric Data Factory.

| Feature | Azure Data Factory | Fabric Data Factory |
|:---|:---|:---|
| **Pipeline activities** |||
| [Office 365](outlook-activity.md) and [Teams](teams-activity.md) activities enable you to seamlessly send messages, facilitating efficient communication and collaboration across your organization | No | Yes |
| Create connections to your [Power BI semantic model](semantic-model-refresh-activity.md) and [Dataflow Gen2](dataflow-activity.md) to ensure your data is consistently refreshed and up-to-date | No | Yes |
| [Validation](/azure/data-factory/control-flow-validation-activity) in a pipeline to ensure the pipeline only continues execution once it validates the attached dataset reference exists, that it meets the specified criteria, or times out | Yes | Yes<sup>1</sup> |
| Execute a [SQL Server Integration Services (SSIS)](/azure/data-factory/how-to-invoke-ssis-package-ssis-activity) package to perform data integration and transformation operations | Yes | Planned |
| **Data transformation** |||
| Visually designed data transformations using Apache Spark clusters with [Mapping Dataflows](/azure/data-factory/concepts-data-flow-overview) to create and manage data transformation processes through a graphical interface | Yes | No<sup>2</sup> |
| Visually designed data transformations using the Fabric compute engine with the intuitive graphical interface of Power Query in [Dataflow Gen2](dataflows-gen2-overview.md) | No | Yes |
| **Connectivity** |||
| Support for all [Data Factory data sources](/power-query/connectors) | Yes | In progress<sup>3</sup> |
| **Scalability** |||
| Ensure seamless execution of activities in a pipeline with [scheduled runs](pipeline-runs.md) | Yes | Yes |
| Schedule multiple runs for a single pipeline for flexible and efficient pipeline management | Yes | [Planned](https://aka.ms/fabricrm) |
| Utilize tumbling window triggers to schedule pipeline runs within distinct, nonoverlapping time windows | Yes | [Planned](https://aka.ms/fabricrm) |
| Event triggers to automate the execution of pipeline runs in response to specific or relevant event occurrences | Yes | Yes<sup>4</sup> |
| **Artificial intelligence** |||
| [Copilot for Data Factory](../get-started/copilot-fabric-data-factory.md), which provides intelligent pipeline generation to ingest data with ease and explanations to help better understand complex pipelines or to provide suggestions for error messages | No | Yes |
| **Content management** |||
| [Data lineage view](../governance/lineage.md), which help users understand and assess pipeline dependencies | No | Yes |
| [Deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md), which manage the lifecycle of content | No | Yes |
| **Platform scalability and resiliency** |||
| [Premium capacity](../enterprise/licenses.md) architecture, which supports increased scale and performance | No | Yes |
| [Multi-Geo](../admin/service-admin-premium-multi-geo.md) support, which helps multinational customers address regional, industry-specific, or organizational data residency requirements | Yes | Yes |
| **Security** |||
| [Virtual network (virtual network) data gateway](/data-integration/vnet/overview) connectivity, which allows Fabric to work seamlessly in an organization's virtual network | No | Yes |
| [On-premises data gateway](/data-integration/gateway/service-gateway-onprem) connectivity, which allows for secure access of data between an organization's on-premises data sources and Fabric items | No | Yes |
| Azure [service tags](../security/security-service-tags.md) support, which is a defined group of IP addresses that is automatically managed to minimize the complexity of updates or changes to network security rules | Yes | Yes |
| **Governance** |||
| Content [endorsement](../governance/endorsement-overview.md), to promote or certify valuable, high-quality Fabric items | No | Yes |
| [Microsoft Purview integration](../governance/microsoft-purview-fabric.md), which helps customers manage and govern Fabric items | Yes | Yes |
| Microsoft Information Protection (MIP) [sensitivity labels](../get-started/apply-sensitivity-labels.md) and integration with [Microsoft Defender for Cloud Apps](../governance/service-security-using-defender-for-cloud-apps-controls.md) for data loss prevention | No | Yes |
| **Monitoring and diagnostic logging** |||
| Logging pipeline execution events into an event store to monitor, analyze, and troubleshoot pipeline performance | Yes | Planned |
| [Monitoring hub](../admin/monitoring-hub.md), which provides monitoring capabilities for Fabric items | No | Yes |
| [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md), which provides monitoring capabilities for Fabric capacities | No | Yes |
| [Audit log](../admin/track-user-activities.md), which tracks user activities across Fabric and Microsoft 365 | No | Yes |

<sup>1</sup> Use the [Get metadata](get-metadata-activity.md), [Until](until-activity.md) and [If condition](if-condition-activity.md) activities for equivalent metadata retrieval of the Validation activity.

<sup>2</sup> Use the Invoke remote pipeline function to execute the mapping data flow activities, refer to the [Invoke Pipeline activity](invoke-pipeline-activity.md).

<sup>3</sup> To view the connectors that are currently supported for data pipelines, refer to [Pipeline support](pipeline-support.md).

<sup>4</sup> Use Fabric eventstreams and Reflex to trigger execution run events, refer to [Pipeline event triggers](pipeline-storage-event-triggers.md).

## Considerations

There are some other considerations to factor into your planning before migrating to Fabric pipelines.

### Licensing

Fabric pipelines require at minimum a Microsoft Fabric (Free) license to author in a premium capacity workspace, to learn more refer to [Fabric licenses](../enterprise/licenses.md).

### Roadmap

The Microsoft Fabric release plan documentation announces the latest updates and timelines to customers as features are prepared for future releases, including what's new and planned for Data Factory in Microsoft Fabric.

For more information, see [Microsoft Fabric release plan documentation](/fabric/release-plan).

## Related content

[Learn how to plan for your ADF to Fabric Data Factory migration](migrate-planning-azure-data-factory.md).
