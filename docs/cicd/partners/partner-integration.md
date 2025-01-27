---
title: Microsoft Fabric ISV Partner integration with Fabric
description:  Fabric ISV Partner Ecosystem enables ISVs to use a streamlined solution that's easy to connect, onboard, and operate.
ms.reviewer: richin
ms.author: monaberdugo
author: mberdugo
ms.topic: overview
ms.custom:
  - build-2024
  - ignite-2024
ms.search.form:
ms.date: 07/29/2024
#customer intent: As an ISV, I want to learn about the different pathways to integrate with Microsoft Fabric so that I can leverage the platform's capabilities to build and deploy my solutions.
---

# Microsoft Fabric Integration Pathways for ISVs

[Microsoft Fabric](https://www.microsoft.com/microsoft-fabric/blog/) offers three distinct pathways for Independent Software Vendors (ISVs) to seamlessly integrate with Fabric. For an ISV starting on this journey, we want to walk through various resources we have available under each of these pathways.

:::image type="content" source="media/partner-integration/integrate-fabric.png" alt-text="Figure showing the three pathways to integrate with Fabric: Interop, Develop Apps, and Build a Fabric workload.":::

## Interop with Fabric OneLake

The primary focus with Interop model is on enabling ISVs to integrate their solutions with the [OneLake Foundation](../../fundamentals/microsoft-fabric-overview.md). To Interop with Microsoft Fabric, we provide integration using a multitude of connectors in Data Factory and in Real-Time Intelligence, REST APIs for OneLake, shortcuts in OneLake, data sharing across Fabric tenants, and database mirroring.

:::image type="content" source="media/partner-integration/onelake-interop.png" alt-text="Figure showing different ways to interop with OneLake: APIs, Data Factory, RTI, Multicloud shortcuts, data sharing, and database mirroring.":::

The following sections describe some of the ways you can get started with this model.

### OneLake APIs

- OneLake supports existing Azure Data Lake Storage (ADLS) Gen2 APIs and SDKs for direct interaction, allowing developers to read, write, and manage their data in OneLake. Learn more about [ADLS Gen2 REST APIs](/rest/api/storageservices) and [how to connect to OneLake](../../onelake/onelake-access-api.md).
- Since not all functionality in ADLS Gen2 maps directly to OneLake, OneLake also enforces a set folder structure to support Fabric workspaces and items. For a full list of different behaviors between OneLake and ADLS Gen2 when calling these APIs, see [OneLake API parity](../../onelake/onelake-api-parity.md).
- If you're using Databricks and want to connect to Microsoft Fabric, Databricks works with ADLS Gen2 APIs. [Integrate OneLake with Azure Databricks](../../onelake/onelake-azure-databricks.md).
- To take full advantage of what the Delta Lake storage format can do for you, review and understand the format, table optimization, and V-Order. [Delta Lake table optimization and V-Order](../../data-engineering/delta-optimization-and-v-order.md).
- Once the data is in OneLake, explore locally using [OneLake File Explorer](../../onelake/onelake-file-explorer.md). OneLake file explorer seamlessly integrates OneLake with Windows File Explorer. This application automatically syncs all OneLake items that you have access to in Windows File Explorer. You can also use any other tool compatible with ADLS Gen2 like [Azure Storage Explorer](https://azure.microsoft.com/products/storage/storage-explorer).

:::image type="content" source="media/partner-integration/onelake-apis.png" alt-text="Diagram showing how OneLake APIs interact with Fabric workloads." lightbox="media/partner-integration/onelake-apis.png":::

### Real-Time Intelligence APIs

Real-Time Intelligence streamlines data analysis and visualization, offering a centralized solution for immediate insights and actions on data in motion within an organization. It efficiently manages large volumes of data through robust querying, transformation, and storage capabilities.

- Eventhouses are specifically designed for streaming data, compatible with Real-Time hub, and ideal for time-based events. Data is automatically indexed and partitioned based on ingestion time, giving you incredibly fast and complex analytic querying capabilities on high-granularity data that can be accessed in OneLake for use across Fabric's suite of experiences. Eventhouses support existing Eventhouse APIs and SDKs for direct interaction, allowing developers to read, write, and manage their data in Eventhouses. Learn more about [REST API](/azure/data-explorer/kusto/api/rest/index?context=/fabric/context/context-rti&pivots=fabric).
- Eventstreams enable you to bring real-time events from various sources and route them to various destinations, such as OneLake, KQL databases in eventhouses, and Fabric [!INCLUDE [fabric-activator](../../real-time-intelligence/includes/fabric-activator.md)]. Learn more about [eventstreams](../../real-time-intelligence/event-streams/overview.md) and [eventstreams API](#develop-on-fabric).
- If you're using Databricks or Jupyter Notebooks, you can utilize the Kusto Python Client Library to work with KQL databases in Fabric. Learn more about [Kusto Python SDK](/azure/data-explorer/kusto/api/python/kusto-python-client-library?context=/fabric/context/context-rti&pivots=fabric).
- You can utilize the existing [Microsoft Logic Apps](/azure/data-explorer/kusto/tools/logicapps), [Azure Data Factory](/azure/data-explorer/data-factory-integration), or [Microsoft Power Automate](/azure/data-explorer/flow) connectors to interact with your Eventhouses or KQL Databases.
- [Database shortcuts in Real-Time Intelligence](../../real-time-intelligence/database-shortcut.md) are embedded references within an eventhouse to a source database. The source database can either be a KQL Database in Real-Time Intelligence or an Azure Data Explorer database. Shortcuts can be used for in place sharing of data within the same tenant or across tenants. Learn more about managing [database shortcuts using the API](#develop-on-fabric).

:::image type="content" source="media/partner-integration/real-time-intelligence-apis.png" alt-text="Diagram showing how Real-Time Intelligence APIs interact with Fabric workloads." lightbox="media/partner-integration/real-time-intelligence-apis.png":::

### Data Factory in Fabric

- Data Pipelines boast an [extensive set of connectors](../../data-factory/pipeline-support.md), enabling ISVs to effortlessly connect to a myriad of data stores. Whether you're interfacing traditional databases or modern cloud-based solutions, our connectors ensure a smooth integration process. [Connector overview](../../data-factory/connector-overview.md).
- With our supported Dataflow Gen2 connectors, ISVs can harness the power of Fabric Data Factory to manage complex data workflows. This feature is especially beneficial for ISVs looking to streamline data processing and transformation tasks. [Dataflow Gen2 connectors in Microsoft Fabric](../../data-factory/dataflow-support.md).
- For a full list of capabilities supported by Data Factory in Fabric checkout this [Data Factory in Fabric Blog](https://blog.fabric.microsoft.com/blog/introducing-data-factory-in-microsoft-fabric?ft=All).

:::image type="content" source="media/partner-integration/fabric-data-factory.png" alt-text="Screenshot of the Fabric Data Factory interface." lightbox="media/partner-integration/fabric-data-factory.png":::

### Multicloud shortcuts

Shortcuts in Microsoft OneLake allow you to unify your data across domains, clouds, and accounts by creating a single virtual data lake for your entire enterprise. All Fabric experiences and analytical engines can directly point to your existing data sources such as OneLake in different tenant, [Azure Data Lake Storage (ADLS) Gen2](../../onelake/create-adls-shortcut.md), [Amazon S3 storage accounts](../../onelake/create-s3-shortcut.md), [Google Cloud Storage(GCS)](../../onelake/create-gcs-shortcut.md), [S3 Compatible data sources](../../onelake/create-s3-compatible-shortcut.md) and [Dataverse](/power-apps/maker/data-platform/azure-synapse-link-view-in-fabric) through a unified namespace. OneLake presents ISVs with a transformative data access solution, seamlessly bridging integration across diverse domains and cloud platforms.

- [Learn more about OneLake shortcuts](../../onelake/onelake-shortcuts.md)
- [Learn more about OneLake one logical copy](../../real-time-intelligence/one-logical-copy.md)
- [Learn more about KQL database shortcuts](../../real-time-intelligence/database-shortcut.md)

:::image type="content" source="media/partner-integration/multicloud-shortcuts.png" alt-text="Diagram showing multicloud shortcuts in OneLake." lightbox="media/partner-integration/multicloud-shortcuts.png":::

### Data sharing

Data Sharing allows Fabric users to share data across different Fabric tenants without duplicating it. This feature enhances collaboration by enabling data to be shared "in-place" from OneLake storage locations. The data is shared as read-only, accessible through various Fabric computation engines, including SQL, Spark, KQL, and semantic models. To use this feature, Fabric admins must enable it in both the sharing and receiving tenants. The process includes selecting data within the OneLake data hub or workspace, configuring sharing settings, and sending an invitation to the intended recipient.

- [Learn more about Data Sharing](../../governance/external-data-sharing-overview.md)

:::image type="content" source="media/partner-integration/data-sharing.png" alt-text="Diagram showing how the data sharing process works in Fabric." lightbox="media/partner-integration/data-sharing.png":::

### Database mirroring

Mirroring provides a modern way of accessing and ingesting data continuously and seamlessly from external databases or data warehouse into the data warehousing experience in Microsoft Fabric. Mirroring is all in near real-time giving users immediate access to changes in the source. Learn more about [mirroring and the supported databases](../../database/mirrored-database/overview.md).

:::image type="content" source="media/partner-integration/database-mirroring.png" alt-text="Diagram showing database mirroring in Fabric." lightbox="media/partner-integration/database-mirroring.png":::

## Develop on Fabric

:::image type="content" source="media/partner-integration/develop-on-fabric.png" alt-text="Diagram showing how to build apps on Fabric." lightbox="media/partner-integration/develop-on-fabric.png":::

With the **Develop on Fabric model** ISVs can build their products and services on top of Fabric or seamlessly embed Fabric's functionalities within their existing applications. It's a transition from basic integration to actively applying the capabilities Fabric offers. The main integration surface area is via REST APIs for various Fabric experiences. The following table shows a subset of REST APIs grouped by the Fabric experience. For a complete list, see the [Fabric REST API documentation](/rest/api/fabric/articles/).

| Fabric Experience | API |
|-------------------|-----|
| Data Warehouse    | - [Warehouse](/rest/api/fabric/warehouse/items)<br> - [Mirrored Warehouse](/rest/api/fabric/mirroredwarehouse/items)|
| Data Engineering    | - [Lakehouse](/rest/api/fabric/lakehouse/items)<br> - [Spark](/rest/api/fabric/spark/custom-pools)<br> - [Spark Job Definition](/rest/api/fabric/sparkjobdefinition/items)<br> - [Tables](/rest/api/fabric/lakehouse/tables)<br> - [Jobs](/rest/api/fabric/lakehouse/background-jobs)|
| Data Factory    | - [DataPipeline](/rest/api/fabric/datapipeline/items)<br> |
| Real-Time Intelligence    | - [Eventhouse](/rest/api/fabric/eventhouse/items)<br> - [KQL Database](/rest/api/fabric/kqldatabase/items)<br> - [KQL Queryset](/rest/api/fabric/kqlqueryset/items)<br> - [Eventstream](/rest/api/fabric/eventstream/items)|
| Data Science    | - [Notebook](/rest/api/fabric/notebook/items)<br> - [ML Experiment](/rest/api/fabric/mlexperiment/items)<br> - [ML Model](/rest/api/fabric/mlmodel/items)<br> |
| OneLake    | - [Shortcut](/rest/api/fabric/core/onelake-shortcuts)<br> - [ADLS Gen2 APIs](/rest/api/storageservices/data-lake-storage-gen2)<br> |
| Power BI    | - [Report](/rest/api/fabric/report/items)<br> - [Dashboard](/rest/api/fabric/dashboard/items)<br> - [Semantic Model](/rest/api/fabric/semanticmodel/items)<br>|

## Build a Fabric workload

:::image type="content" source="media/partner-integration/fabric-workload.png" alt-text="Diagram showing how to create your own fabric workload." lightbox="media/partner-integration/fabric-workload.png":::

**Build a Fabric workload** model is designed to empower ISVs to create custom experiences on the Fabric platform. It provides ISVs with the necessary tools and capabilities to align their offerings with the Fabric ecosystem, optimizing the combination of their unique value propositions with Fabric's extensive capabilities.

The **Microsoft Fabric Workload Development Kit** offers a comprehensive toolkit for developers to integrate applications into the Microsoft Fabric hub. This integration allows for the addition of new capabilities directly within the Fabric workspace, enhancing the analytics journey for users. It provides developers and ISVs with a new avenue to reach customers, delivering both familiar and new experiences, and leveraging existing data applications. Fabric admins gain the ability to manage access to the workload hub, enabling it for the entire tenant or assigning it with specific scope to control access within the organization.

## Related content

- [Learn more about Microsoft Fabric Workload Development Kit](https://aka.ms/FabricWorkloaddevelopmentkitblog)
- [Get started with building your first workload](../../workload-development-kit/development-kit-overview.md)
