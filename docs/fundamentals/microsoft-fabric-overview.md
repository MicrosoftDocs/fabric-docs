---
title: What is Microsoft Fabric
description: Microsoft Fabric is an all-in-one analytics solution that covers everything from data movement to data science, real-time analytics, and business intelligence.
ms.reviewer: sngun
ms.author: gesaur
author: gsaurer
ms.topic: overview
ms.custom:
- build 2024
ms.search.form: product-trident
ms.date: 05/06/2025
---

# What is Microsoft Fabric?

Microsoft Fabric is an enterprise-ready, end-to-end analytics platform. It unifies data movement, data processing, ingestion, transformation, real-time event routing, and report building. It supports these capabilities with integrated services like Data Engineering, Data Factory, Data Science, Real-Time Intelligence, Data Warehouse, and Databases.

Fabric provides a seamless, user-friendly SaaS experience. It integrates separate components into a cohesive stack. It centralizes data storage with OneLake and embeds AI capabilities, eliminating the need for manual integration. With Fabric, you can efficiently transform raw data into actionable insights.

> [!NOTE]
> * The [Fabric Analyst in a Day (FAIAD)](https://aka.ms/LearnFAIAD) workshop is a free, hands-on training designed for analysts working with Power BI and Microsoft Fabric. You can get hands-on experience on how to analyze data, build reports, using Fabric. It covers key concepts like working with lakehouses, creating reports, and analyzing data in the Fabric environment.
> * Join our new Microsoft Fabric user panel to share your feedback and help shape Fabric and Power BI. Participate in surveys and 1:1 sessions with the product team. Learn more and sign up [Fabric user panel](feedback.md#fabric-user-panel).

## Capabilities of Fabric

Microsoft Fabric enhances productivity, data management, and AI integration. Here are some of its key capabilities:

* **Role-specific workloads:** Customized solutions for various roles within an organization, providing each user with the necessary tools.
* **OneLake:** A unified data lake that simplifies data management and access.
* **Copilot support:** AI-driven features that assist users by providing intelligent suggestions and automating tasks.
* **Integration with Microsoft 365:** Seamless integration with Microsoft 365 tools, enhancing collaboration and productivity across the organization.
* **Azure AI Foundry:** Utilizes Azure AI Foundry for advanced AI and machine learning capabilities, enabling users to build and deploy AI models efficiently.
* **Unified data management:** Centralized data discovery that simplifies governance, sharing, and access.

## Unification with SaaS foundation

Microsoft Fabric is built on a Software as a Service (SaaS) platform. It unifies new and existing components from Power BI, Azure Synapse Analytics, Azure Data Factory, and more into a single environment.

:::image type="content" source="media\microsoft-fabric-overview\fabric-architecture.png" alt-text="Diagram of the software as a service foundation beneath the different experiences of Fabric." lightbox="media\microsoft-fabric-overview\fabric-architecture.png":::

Fabric integrates workloads like Data Engineering, Data Factory, Data Science, Data Warehouse, Real-Time Intelligence, Industry solutions, Databases, and Power BI into a SaaS platform. Each of these workloads is tailored for distinct user roles like data engineers, scientists, or warehousing professionals, and they serve a specific task. Advantages of Fabric include:

* End to end integrated analytics
* Consistent, user-friendly experiences
* Easy access and reuse of all assets
* Unified data lake storage preserving data in its original location
* AI-enhanced stack to accelerate the data journey
* Centralized administration and governance

Fabric centralizes data discovery, administration, and governance by automatically applying permissions and inheriting data sensitivity labels across all the items in the suite. Governance is powered by Purview, which is built into Fabric. This seamless integration lets creators focus on producing their best work without managing the underlying infrastructure.

## Components of Microsoft Fabric

Fabric offers the following workloads, each customized for a specific role and task:

* **Power BI** - Power BI lets you easily connect to your data sources, visualize, and discover what's important, and share that with anyone or everyone you want. This integrated experience allows business owners to access all data in Fabric quickly and intuitively and to make better decisions with data. For more information, see [What is Power BI?](/power-bi/fundamentals/power-bi-overview)

* **Databases** - Databases in Microsoft Fabric are a developer-friendly transactional database such as Azure SQL Database, which allows you to easily create your operational database in Fabric. Using the mirroring capability, you can bring data from various systems together into OneLake. You can continuously replicate your existing data estate directly into Fabric's OneLake, including data from Azure SQL Database, Azure Cosmos DB, Azure Databricks, Snowflake, and Fabric SQL database. For more information, see [SQL database in Microsoft Fabric](../database/sql/overview.md) and [What is Mirroring in Fabric?](../database/mirrored-database/overview.md)

* **Data Factory** - Data Factory provides a modern data integration experience to ingest, prepare, and transform data from a rich set of data sources. It incorporates the simplicity of Power Query, and you can use more than 200 native connectors to connect to data sources on-premises and in the cloud. For more information, see [What is Data Factory in Microsoft Fabric?](../data-factory/data-factory-overview.md)

* **Industry Solutions** - Fabric provides industry-specific data solutions that address unique industry needs and challenges, and include data management, analytics, and decision-making. For more information, see [Industry Solutions in Microsoft Fabric](/industry/industry-data-solutions-fabric).

* **Real-Time Intelligence** -  Real-time Intelligence is an end-to-end solution for event-driven scenarios, streaming data, and data logs. It enables the extraction of insights, visualization, and action on data in motion by handling data ingestion, transformation, storage, modeling, analytics, visualization, tracking, AI, and real-time actions. The [Real-Time hub](#real-time-hub-the-unification-of-data-streams) in Real-Time Intelligence provides a wide variety of no-code connectors, converging into a catalog of organizational data that is protected, governed, and integrated across Fabric. For more information, see [What is Real-Time Intelligence in Fabric?](../real-time-intelligence/overview.md).

* **Data Engineering** - Fabric Data Engineering provides a Spark platform with great authoring experiences.  It enables you to create, manage, and optimize infrastructures for collecting, storing, processing, and analyzing vast data volumes.  Fabric Spark's integration with Data Factory allows you to schedule and orchestrate notebooks and Spark jobs. For more information, see [What is Data engineering in Microsoft Fabric?](../data-engineering/data-engineering-overview.md)

* **Fabric Data Science** - Fabric Data Science enables you to build, deploy, and operationalize machine learning models from Fabric. It integrates with Azure Machine Learning to provide built-in experiment tracking and model registry. Data scientists can enrich organizational data with predictions and business analysts can integrate those predictions into their BI reports, allowing a shift from descriptive to predictive insights. For more information, see [What is Data science in Microsoft Fabric?](../data-science/data-science-overview.md)

* **Fabric Data Warehouse** - Fabric Data Warehouse provides industry leading SQL performance and scale. It separates compute from storage, enabling independent scaling of both components. Additionally, it natively stores data in the open Delta Lake format. For more information, see [What is data warehousing in Microsoft Fabric?](../data-warehouse/data-warehousing.md)

Microsoft Fabric enables organizations and individuals to turn large and complex data repositories into actionable workloads and analytics, and is an implementation of data mesh architecture. For more information, see [What is a data mesh?](/azure/cloud-adoption-framework/scenarios/cloud-scale-analytics/architectures/what-is-data-mesh)

## OneLake: The unification of lakehouses

The Microsoft Fabric platform unifies the OneLake and lakehouse architecture across an enterprise.

### OneLake

A data lake is the foundation for all Fabric workloads. In Microsoft Fabric, this lake is called[OneLake](../onelake/onelake-overview.md). It's built into the platform and serves as a single store for all organizational data.

OneLake is built on ADLS (Azure Data Lake Storage) Gen2. It provides a single SaaS experience and a tenant-wide store for data that serves both professional and citizen developers. It simplifies the user experience by removing the need to understand complex infrastructure details like resource groups, RBAC, Azure Resource Manager, redundancy, or regions. You don't need an Azure account to use Fabric.

OneLake prevents data silos by offering one unified storage system that makes data discovery, sharing, and consistent policy enforcement easy. For more information, see [What is OneLake?](../onelake/onelake-overview.md)

### OneLake and lakehouse data hierarchy

OneLake’s hierarchical design simplifies organization-wide management. Fabric includes OneLake by default, so no upfront provisioning is needed. Each tenant gets one unified OneLake with single file-system namespace that spans users, regions, and clouds. OneLake organizes data into containers for easy handling. The tenant maps to the root of OneLake and is at the top level of the hierarchy. You can create multiple workspaces (which are like folders) within a tenant.

The following image shows how Fabric stores data in OneLake. You can have several workspaces per tenant and multiple lakehouses within each workspace. A lakehouse is a collection of files, folders, and tables that acts as a database over a data lake. To learn more, see [What is a lakehouse?](../data-engineering/lakehouse-overview.md).

:::image type="content" source="media\microsoft-fabric-overview\hierarchy-within-tenant.png" alt-text="Diagram of the hierarchy of items like lakehouses and semantic models within a workspace within a tenant.":::

Every developer and business unit in the tenant can create their own workspaces in OneLake. They can ingest data into lakehouses and start processing, analyzing, and collaborating on that data—similar to using OneDrive in Microsoft Office.

## Fabric compute engines

All Microsoft Fabric compute experiences come preconfigured with OneLake, much like Office apps automatically use organizational OneDrive. The experiences such as Data Engineering, Data Warehouse, Data Factory, Power BI, and Real-Time Intelligence etc. use OneLake as their native store without extra setup.

:::image type="content" source="media\microsoft-fabric-overview\onelake-architecture.png" alt-text="Diagram of different Fabric experiences all accessing the same OneLake data storage." lightbox="media\microsoft-fabric-overview\onelake-architecture.png":::

OneLake lets you instantly mount your existing PaaS storage accounts using the [Shortcut](../onelake/onelake-shortcuts.md) feature. You don't have to migrate your existing data. Shortcuts provide direct access to data in Azure Data Lake Storage. They also enable easy data sharing between users and applications without duplicating files. Additionally, you can create shortcuts to other storage systems, allowing you to analyze cross-cloud data with intelligent caching that reduces egress costs and brings data closer to compute.

## Real-Time hub: the unification of data streams

The Real-Time hub is a foundational location for data in motion. It provides a unified SaaS experience and tenant-wide logical place for streaming data. It lists data from every source, allowing users to discover, ingest, manage, and react to it. It contains both [streams](../real-time-intelligence/event-streams/overview.md) and [KQL database](../real-time-intelligence/create-database.md) tables. Streams include [**Data streams**](../real-time-intelligence/event-streams/create-manage-an-eventstream.md), **Microsoft sources** (such as [Azure Event Hubs](../real-time-hub/add-source-azure-event-hubs.md), [Azure IoT Hub](../real-time-hub/add-source-azure-iot-hub.md), [Azure SQL DB Change Data Capture (CDC)](../real-time-hub/add-source-azure-sql-database-cdc.md), [Azure Cosmos DB CDC](../real-time-hub/add-source-azure-cosmos-db-cdc.md), [Azure Data Explorer](../real-time-hub/add-source-azure-data-explorer.md), and [PostgreSQL DB CDC](../real-time-hub/add-source-postgresql-database-cdc.md)), **Fabric events** ([workspace item events](../real-time-hub/create-streams-fabric-workspace-item-events.md), [OneLake events](../real-time-hub/create-streams-fabric-onelake-events.md), and [Job events](../real-time-hub/create-streams-fabric-job-events.md)), and **Azure events**, including [Azure Blob Storage events](../real-time-hub/get-azure-blob-storage-events.md) and external events from Microsoft 365 or other clouds services.


The Real-Time hub makes it easy discover, ingest, manage, and consume data-in-motion from a wide variety of sources to collaborate and develop streaming applications in one place. For more information, see [What is the Real-Time hub?](../real-time-hub/real-time-hub-overview.md)

## Fabric solutions for ISVs

If you're an Independent Software Vendors (ISVs) looking to integrate your solutions with Microsoft Fabric, you can use one of the following paths based on your desired level of integration:

* **Interop** - Integrate your solution with the OneLake Foundation and establish basic connections and interoperability with Fabric.
* **Develop on Fabric** - Build your solution on top of the Fabric platform or seamlessly embed Fabric's functionalities into your existing applications. You can easily use Fabric capabilities with this option.
* **Build a Fabric workload** - Create customized workloads and experiences in Fabric tailoring your offerings to maximize their impact within the Fabric ecosystem.

For more information, see the [Fabric ISV partner ecosystem](../cicd/partners/partner-integration.md).

## Related content

* [Microsoft Fabric terminology](fabric-terminology.md)
* [Create a workspace](create-workspaces.md)
* [Navigate to your items from Microsoft Fabric Home page](fabric-home.md)
* [End-to-end tutorials in Microsoft Fabric](end-to-end-tutorials.md)
