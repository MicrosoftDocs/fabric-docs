---
title: Microsoft Fabric ISV Partner integration with Fabric
description:  Fabric ISV Partner Ecosystem enables ISVs to use a streamlined solution that's easy to connect, onboard, and operate.
ms.reviewer: richin
ms.author: billmath
author: billmath
ms.topic: overview
ms.custom:
ms.search.form:
ms.date: 04/29/2025
#customer intent: As an ISV, I want to learn about the different pathways to integrate with Microsoft Fabric so that I can leverage the platform's capabilities to build and deploy my solutions.
---

# Microsoft Fabric Integration Pathways for ISVs

[Microsoft Fabric](https://www.microsoft.com/microsoft-fabric/blog/) offers three distinct pathways for Independent Software Vendors (ISVs) to seamlessly integrate with Fabric. For an ISV starting on this journey, we want to walk through various resources we have available under each of these pathways.

:::image type="content" source="media/partner-integration/paths-of-integration.png" alt-text="Figure showing different ways of integrating with Fabric.":::


## Interop with Fabric OneLake

The primary focus with Interop model is on enabling ISVs to integrate their solutions with the [OneLake Foundation](../../fundamentals/microsoft-fabric-overview.md). To Interop with Microsoft Fabric, we provide integration using a multitude of connectors in Data Factory and in Real-Time Intelligence. We also provide REST APIs for OneLake, shortcuts in OneLake, data sharing across Fabric tenants, and database mirroring.

:::image type="content" source="media/partner-integration/onelake-interop.png" alt-text="Figure showing different ways to interop with OneLake: APIs, Data Factory, Real-time intelligence, Multicloud shortcuts, data sharing, and database mirroring.":::

The following sections describe some of the ways you can get started with this model.

### OneLake APIs

- OneLake supports existing Azure Data Lake Storage (ADLS) Gen2 APIs and SDKs for direct interaction, allowing developers to read, write, and manage their data in OneLake. Learn more about [ADLS Gen2 REST APIs](/rest/api/storageservices) and [how to connect to OneLake](../../onelake/onelake-access-api.md).
- Since not all functionality in ADLS Gen2 maps directly to OneLake, OneLake also enforces a set folder structure to support Fabric workspaces and items. For a full list of different behaviors between OneLake and ADLS Gen2 when calling these APIs, see [OneLake API parity](../../onelake/onelake-api-parity.md).
- If you're using Databricks and want to connect to Microsoft Fabric, Databricks works with ADLS Gen2 APIs. [Integrate OneLake with Azure Databricks](../../onelake/onelake-azure-databricks.md).
- To take full advantage of what the Delta Lake storage format can do for you, review and understand the format, table optimization, and V-Order. [Delta Lake table optimization and V-Order](../../data-engineering/delta-optimization-and-v-order.md).
- Once the data is in OneLake, explore locally using [OneLake File Explorer](../../onelake/onelake-file-explorer.md). OneLake file explorer seamlessly integrates OneLake with Windows File Explorer. This application automatically syncs all OneLake items that you have access to in Windows File Explorer. You can also use any other tool compatible with ADLS Gen2 like [Azure Storage Explorer](https://azure.microsoft.com/products/storage/storage-explorer).

:::image type="content" source="media/partner-integration/onelake-apis.png" alt-text="Diagram showing how OneLake APIs interact with Fabric workloads." lightbox="media/partner-integration/onelake-apis.png":::

### Real-Time Intelligence APIs

**Fabric Real-Time Intelligence** is a comprehensive solution designed to support the entire lifecycle of real-time data—from ingestion and stream processing to analytics, visualization, and action. Built to handle high-throughput streaming data, it offers robust capabilities for data ingestion, transformation, querying, and storage, enabling organizations to make timely, data-driven decisions.

- **Eventstreams** enable you to bring real-time events from various sources and route them to various destinations, such as Lakehouses, KQL databases in Eventhouse, and Fabric [!INCLUDE [fabric-activator](../../real-time-intelligence/includes/fabric-activator.md)]. Learn more about [Eventstreams](../../real-time-intelligence/event-streams/overview.md) and [Eventstreams API](#develop-on-fabric).
- You can ingest streaming data in to Eventstreams via multiple protocols incl. Kafka, Event Hubs, AMQP, and a growing list of connectors listed [here.](../../real-time-intelligence/event-streams/add-manage-eventstream-sources.md)
- After processing the ingested events using either the no-code experience or using SQL operator (Preview), the result can be route to several Fabric destinations or to custom endpoints. Learn more about Eventstreams destinations [here.](../../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md)
- **Eventhouses** are designed for streaming data, compatible with Real-Time hub, and ideal for time-based events. Data is automatically indexed and partitioned based on ingestion time, giving you incredibly fast and complex analytic querying capabilities on high-granularity data that can be accessed in OneLake for use across Fabric's suite of experiences. Eventhouses support existing Eventhouse APIs and SDKs for direct interaction, allowing developers to read, write, and manage their data in Eventhouses. Learn more about [REST API](/azure/data-explorer/kusto/api/rest/index?context=/fabric/context/context-rti&pivots=fabric).
- If you're using Databricks or Jupyter Notebooks, you can utilize the Kusto Python Client Library to work with KQL databases in Fabric. Learn more about [Kusto Python SDK](/azure/data-explorer/kusto/api/python/kusto-python-client-library?context=/fabric/context/context-rti&pivots=fabric).
- You can utilize the existing [Microsoft Logic Apps](/azure/data-explorer/kusto/tools/logicapps), [Azure Data Factory](/azure/data-explorer/data-factory-integration), or [Microsoft Power Automate](/azure/data-explorer/flow) connectors to interact with your Eventhouses or KQL Databases.
- [Database shortcuts in Real-Time Intelligence](../../real-time-intelligence/database-shortcut.md) are embedded references within an eventhouse to a source database. The source database can either be a KQL Database in Real-Time Intelligence or an Azure Data Explorer database. Shortcuts can be used for in place sharing of data within the same tenant or across tenants. Learn more about managing [database shortcuts using the API](#develop-on-fabric).

:::image type="content" source="media/partner-integration/real-time-intelligence-apis.png" alt-text="Diagram showing how Real-Time Intelligence APIs interact with Fabric workloads." lightbox="media/partner-integration/real-time-intelligence-apis.png":::

### Data Factory in Fabric

- Pipelines boast an [extensive set of connectors](../../data-factory/pipeline-support.md), enabling ISVs to effortlessly connect to a myriad of data stores. Whether you're interfacing traditional databases or modern cloud-based solutions, our connectors ensure a smooth integration process. [Connector overview](../../data-factory/connector-overview.md).
- With our supported Dataflow Gen2 connectors, ISVs can harness the power of Fabric Data Factory to manage complex data workflows. This feature is especially beneficial for ISVs looking to streamline data processing and transformation tasks. [Dataflow Gen2 connectors in Microsoft Fabric](../../data-factory/dataflow-support.md).
- For a full list of capabilities supported by Data Factory in Fabric, check out this [Data Factory in Fabric Blog](https://blog.fabric.microsoft.com/blog/introducing-data-factory-in-microsoft-fabric?ft=All).

:::image type="content" source="media/partner-integration/fabric-data-factory.png" alt-text="Screenshot of the Fabric Data Factory interface." lightbox="media/partner-integration/fabric-data-factory.png":::

### Multicloud shortcuts

Shortcuts in Microsoft OneLake allow you to unify your data across domains, clouds, and accounts by creating a single virtual data lake for your entire enterprise. All Fabric experiences and analytical engines can directly point to your existing data sources such as OneLake in different tenant, [Azure Data Lake Storage (ADLS) Gen2](../../onelake/create-adls-shortcut.md), [Amazon S3 storage accounts](../../onelake/create-s3-shortcut.md), [Google Cloud Storage(GCS)](../../onelake/create-gcs-shortcut.md), [S3 Compatible data sources](../../onelake/create-s3-compatible-shortcut.md), and [Dataverse](/power-apps/maker/data-platform/azure-synapse-link-view-in-fabric) through a unified namespace. OneLake presents ISVs with a transformative data access solution, seamlessly bridging integration across diverse domains and cloud platforms.

- [Learn more about OneLake shortcuts](../../onelake/onelake-shortcuts.md)
- [Learn more about OneLake one logical copy](../../real-time-intelligence/one-logical-copy.md)
- [Learn more about KQL database shortcuts](../../real-time-intelligence/database-shortcut.md)

:::image type="content" source="media/partner-integration/multicloud-shortcuts.png" alt-text="Diagram showing multicloud shortcuts in OneLake." lightbox="media/partner-integration/multicloud-shortcuts.png":::

### Data sharing

Data Sharing allows Fabric users to share data across different Fabric tenants without duplicating it. This feature enhances collaboration by enabling data to be shared "in-place" from OneLake storage locations. The data is shared as read-only, accessible through various Fabric computation engines, including SQL, Spark, KQL, and semantic models. To use this feature, Fabric admins must enable it in both the sharing and receiving tenants. The process includes selecting data within the OneLake data hub or workspace, configuring sharing settings, and sending an invitation to the intended recipient.

- [Learn more about Data Sharing](../../governance/external-data-sharing-overview.md)

:::image type="content" source="media/partner-integration/data-sharing.png" alt-text="Diagram showing how the data sharing process works in Fabric." lightbox="media/partner-integration/data-sharing.png":::

### Database mirroring

Mirroring in Fabric provides an easy experience to avoid complex ETL (Extract Transform Load) and integrate your existing data into OneLake with the rest of your data in Microsoft Fabric. You can continuously replicate your existing data directly into Fabric's OneLake. In Fabric, you can unlock powerful Business Intelligence, Artificial Intelligence, Data Engineering, Data Science, and data sharing scenarios. 
- Learn more about [mirroring and the supported databases](../../mirroring/overview.md).

:::image type="content" source="media/partner-integration/database-mirroring.png" alt-text="Diagram showing database mirroring in Fabric." lightbox="media/partner-integration/database-mirroring.png":::

Open mirroring enables **any application** to write change data directly into a mirrored database in Fabric. Open mirroring is designed to be extensible, customizable, and open. It's a powerful feature that extends mirroring in Fabric based on open Delta Lake table format. Once the data lands in OneLake in Fabric, open mirroring simplifies the handling of complex data changes, ensuring that all mirrored data is continuously up-to-date and ready for analysis. 
- Learn more about [open mirroring and when to use it.](../../mirroring/open-mirroring.md)

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

The [**Microsoft Fabric Workload Development Kit**](../../workload-development-kit/development-kit-overview.md) offers a comprehensive toolkit for developers to integrate applications into the Microsoft Fabric hub. This integration allows for the addition of new capabilities directly within the Fabric workspace, enhancing the analytics journey for users. It provides developers and ISVs with a new avenue to reach customers, delivering both familiar and new experiences, and leveraging existing data applications. Fabric admins have the ability to manage who can add workloads in an organization.

### Workload Hub

The [Workload Hub](https://app.fabric.microsoft.com/workloadhub) in Microsoft Fabric serves as a centralized interface where users can explore, manage, and access all available workloads. Each workload in Fabric is associated with a specific item type that can be created within Fabric workspaces. By navigating through the Workload Hub, users can easily discover and interact with various workloads, enhancing their analytical and operational capabilities.

  :::image type="content" source="media/partner-integration/workload-hub.png" alt-text="Screenshot showing Workload Hub." lightbox="media/partner-integration/workload-hub.png":::


Fabric administrators have the rights to [manage workload](../../workload-development-kit/more-workloads-add.md) availability, making them accessible across the entire tenant or within specific capacities. This extensibility ensures that Fabric remains a flexible and scalable platform, allowing organizations to tailor their workload environment to meet evolving data and business requirements. By integrating seamlessly with Fabric’s security and governance framework, the Workload Hub simplifies workload deployment and management. Every workload comes with a trial experience for users to quickly get started. Following are the available workloads:

- **[2TEST](https://app.fabric.microsoft.com/workloadhub/detail/2bit.2TEST.Product?experience=fabric-developer)**: A comprehensive quality assurance workload that automates testing and data quality checks.

  :::image type="content" source="media/partner-integration/2test-workload.png" alt-text="Screenshot showing 2test's workload." lightbox="media/partner-integration/2test-workload.png":::
  
- **[Informatica Cloud Data Quality](https://app.fabric.microsoft.com/workloadhub/detail/Informatica.DataQuality.dataQuality?experience=fabric-developer)**: Let's you profile, detect, and fix data issues—such as duplicates, missing values, and inconsistencies—directly within your Fabric environment.

   :::image type="content" source="media/partner-integration/informatica-workload-tile.png" alt-text="Screenshot showing Informatica's workload." lightbox="media/partner-integration/informatica-workload-tile.png":::

- **[Lumel EPM](https://app.fabric.microsoft.com/workloadhub/detail/Lumel.powertables.app?experience=fabric-developer)**: Empowers business users build no-code Enterprise Performance Management (EPM) apps on top of the semantic models.

    :::image type="content" source="media/partner-integration/lumel-workload-tile.png" alt-text="Screenshot showing Lumel's workload." lightbox="media/partner-integration/lumel-workload-tile.png":::
  
- **[Neo4j AuraDB with Graph Analytics](https://app.fabric.microsoft.com/workloadhub/detail/Neo4j.GraphAnalytics.Neo4j%20Graph%20Analytics?experience=fabric-developer)**: Create graph models from OneLake data, visually analyze and explore data connections, query your data, and run any of the 65+ built-in algorithms with a seamless experience in the Fabric Console.
  
    :::image type="content" source="media/partner-integration/neo4j-workload-tile.png" alt-text="Screenshot showing Neo4j's workload." lightbox="media/partner-integration/neo4j-workload-tile.png":::
  
- **[Osmos AI Data Wrangler](https://app.fabric.microsoft.com/workloadhub/detail/Osmos.Osmos.Product?experience=fabric-developer)**: Automates data preparation with AI-powered data wranglers, making data transformation effortless.

  :::image type="content" source="media/partner-integration/osmos-workload-tile.png" alt-text="Screenshot showing Osmos's workload." lightbox="media/partner-integration/osmos-workload-tile.png":::

- **[Power Designer](https://app.fabric.microsoft.com/workloadhub/detail/tips.tools.Product?experience=fabric-developer)**: A tool for company-wide styling and report template creation, improving Power BI report designs.

  :::image type="content" source="media/partner-integration/power-bi-tips-workload-tile.png" alt-text="Screenshot showing PBI Tips's workload." lightbox="media/partner-integration/power-bi-tips-workload-tile.png":::
  
  
- **[Celonis Process Intelligence](https://app.fabric.microsoft.com/workloadhub/detail/celonis.fabric-integration.Product?experience=fabric-developer)**: Allows organizations to expose Celonis’ unique class of data and context in Microsoft Fabric.

  :::image type="content" source="media/partner-integration/celonis-workload-tile.png" alt-text="Screenshot showing Celonis's workload." lightbox="media/partner-integration/celonis-workload-tile.png":::
  
- **[Profisee Master Data Management:](https://app.fabric.microsoft.com/workloadhub/detail/Profisee.MDM.Product?experience=fabric-developer)** empowers users to efficiently match, merge, standardize, remediate and validate data, transforming it into trusted, consumption-ready data products for analytics and AI.​

  :::image type="content" source="media/partner-integration/profisee-workload-tile.png" alt-text="Screenshot showing Profisee's workload." lightbox="media/partner-integration/profisee-workload-tile.png":::
  
- **[Quantexa Unify](https://app.fabric.microsoft.com/workloadhub/detail/Quantexa.Unify.Product?experience=fabric-developer)**: Enhances Microsoft OneLake data sources by providing a 360-degree view with advanced data resolution capabilities.

  :::image type="content" source="media/partner-integration/quantexa-workload-tile.png" alt-text="Screenshot showing Quantexa's workload." lightbox="media/partner-integration/quantexa-workload-tile.png":::
  
- **[SAS Decision Builder](https://app.fabric.microsoft.com/workloadhub/detail/SAS.DecisionBuilder.SASDecisionBuilder?experience=fabric-developer)**: Helps organizations automate, optimize, and scale their decision-making processes.

  :::image type="content" source="media/partner-integration/sas-workload-tile.png" alt-text="Screenshot showing SAS's workload." lightbox="media/partner-integration/sas-workload-tile.png":::
  
- **[Statsig:](https://app.fabric.microsoft.com/workloadhub/detail/Statsig.Statsig.Statsig?experience=fabric-developer)** Brings data visualization and analysis directly to your warehouse.

  :::image type="content" source="media/partner-integration/statsig-workload-tile.png" alt-text="Screenshot showing Statsig's workload." lightbox="media/partner-integration/statsig-workload-tile.png":::


- **[Teradata AI Unlimited](https://app.fabric.microsoft.com/workloadhub/detail/Teradata.AIUnlimited.AIUnlimited?experience=fabric-developer)**: Combines Teradata's analytic engine with Microsoft Fabric's data management capabilities through Teradata's in-database functions.

  :::image type="content" source="media/partner-integration/teradata-workload-tile.png" alt-text="Screenshot showing Teradata's workload." lightbox="media/partner-integration/teradata-workload-tile.png":::
  
- **[SQL2Fabric-Mirroring by Striim](https://app.fabric.microsoft.com/workloadhub/detail/striim.SQL2Fabric-Mirroring.Product?experience=fabric-developer)**: Fully managed, zero-code replication solution that seamlessly mirrors on-premises SQL Server data to Microsoft Fabric OneLake

  :::image type="content" source="media/partner-integration/striim-workload-tile.png" alt-text="Screenshot showing Striim's workload." lightbox="media/partner-integration/striim-workload-tile.png":::

As more workloads become available, the Workload Hub will continue to serve as a dynamic space for discovering new capabilities, ensuring that users have the tools they need to scale and optimize their data-driven solutions.
