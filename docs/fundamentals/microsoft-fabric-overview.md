---
title: What is Microsoft Fabric
description: Microsoft Fabric is an all-in-one analytics solution that covers everything from data movement to data science, real-time analytics, and business intelligence.
ms.reviewer: sngun
ms.author: gesaur
author: gsaurer
ms.topic: overview
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
  - ignite-2023-fabric
  - build 2024
  - build-2024
  - ignite-2024
ms.search.form: product-trident
ms.date: 01/22/2025
---

# What is Microsoft Fabric?

[!INCLUDE [new user recruitment](../includes/fabric-new-user-research.md)]

Microsoft Fabric is an end-to-end analytics and data platform designed for enterprises that require a unified solution. It encompasses data movement, processing, ingestion, transformation, real-time event routing, and report building. It offers a comprehensive suite of services including Data Engineering, Data Factory, Data Science, Real-Time Analytics, Data Warehouse, and Databases.

With Fabric, you don't need to assemble different services from multiple vendors. Instead, it offers a seamlessly integrated, user-friendly platform that simplifies your analytics requirements. Operating on a Software as a Service (SaaS) model, Fabric brings simplicity and integration to your solutions.

Microsoft Fabric integrates separate components into a cohesive stack. Instead of relying on different databases or data warehouses, you can centralize data storage with OneLake. AI capabilities are seamlessly embedded within Fabric, eliminating the need for manual integration. With Fabric, you can easily transition your raw data into actionable insights for business users.

## Capabilities of Fabric

Microsoft Fabric offers a wide range of capabilities designed to enhance productivity, data management, and AI integration. Here are some of the key capabilities:

* **Role-specific workloads:** Customized solutions for various roles within an organization, providing each user with the necessary tools.
* **OneLake:** A unified data lake that simplifies data management and access.
* **Copilot support:** AI-driven features that assist users by providing intelligent suggestions and automating tasks.
* **Integration with Microsoft 365:** Seamless integration with Microsoft 365 tools, enhancing collaboration and productivity across the organization.
* **Azure AI Foundry:** Utilizes Azure AI Foundry for advanced AI and machine learning capabilities, enabling users to build and deploy AI models efficiently.
* **Unified data management:** Centralized data discovery that simplifies governance, sharing, and access.

## Unification with SaaS foundation

Microsoft Fabric is built on a Software as a Service (SaaS) foundation. It unifies new and existing components from Power BI, Azure Synapse Analytics, Azure Data Factory, and more into a single environment, tailored for customized user experiences.

:::image type="content" source="media\microsoft-fabric-overview\fabric-architecture.png" alt-text="Diagram of the software as a service foundation beneath the different experiences of Fabric." lightbox="media\microsoft-fabric-overview\fabric-architecture.png":::

Fabric integrates workloads like Data Engineering, Data Factory, Data Science, Data Warehouse, Real-Time Intelligence, Industry solutions, Databases, and Power BI into a shared SaaS foundation. Each of these experiences is tailored for distinct user roles like data engineers, scientists, or warehousing professionals, and they serve a specific task. The AI-integrated Fabric stack accelerates the data journey and offers the following advantages:

* Extensive integrated analytics
* Familiar and easy-to-learn shared experiences
* Easy access and reuse of all assets
* Unified data lake storage preserving data in its original location
* Centralized administration and governance

Fabric seamlessly integrates data and services, enabling unified management, governance, and discovery. It ensures security for items, data, and row-level access. You can centrally configure core enterprise capabilities. Permissions are automatically applied across all the underlying services. Additionally, data sensitivity labels inherit automatically across the items in the suite. Governance is powered by Purview, which is built into Fabric.

Fabric allows creators to concentrate on producing their best work, freeing them from the need to integrate, manage, or even understand the underlying infrastructure.

## Components of Microsoft Fabric

Fabric offers a comprehensive set of analytics experiences designed to work together seamlessly. The platform tailors each of these experiences to a specific persona and a specific task:

* **Power BI** - Power BI lets you easily connect to your data sources, visualize, and discover what's important, and share that with anyone or everyone you want. This integrated experience allows business owners to access all data in Fabric quickly and intuitively and to make better decisions with data. For more information, see [What is Power BI?](/power-bi/fundamentals/power-bi-overview)

* **Databases** - Databases in Microsoft Fabric are a developer-friendly transactional database such as Azure SQL Database, which allows you to easily create your operational database in Fabric. Using the mirroring capability, you can bring data from various systems together into OneLake. You can continuously replicate your existing data estate directly into Fabric's OneLake, including data from Azure SQL Database, Azure Cosmos DB, Azure Databricks, Snowflake, and Fabric SQL database. For more information, see [SQL database in Microsoft Fabric](../database/sql/overview.md) and [What is Mirroring in Fabric?](../index.yml)

* **Data Factory** - Data Factory provides a modern data integration experience to ingest, prepare, and transform data from a rich set of data sources. It incorporates the simplicity of Power Query, and you can use more than 200 native connectors to connect to data sources on-premises and in the cloud. For more information, see [What is Data Factory in Microsoft Fabric?](../data-factory/data-factory-overview.md)

* **Industry Solutions** - Fabric provides industry-specific data solutions that address unique industry needs and challenges, and include data management, analytics, and decision-making. For more information, see [Industry Solutions in Microsoft Fabric](/industry/industry-data-solutions-fabric).

* **Real-Time Intelligence** -  Real-time Intelligence is an end-to-end solution for event-driven scenarios, streaming data, and data logs. It enables the extraction of insights, visualization, and action on data in motion by handling data ingestion, transformation, storage, analytics, visualization, tracking, AI, and real-time actions. The [Real-Time hub](#real-time-hub-the-unification-of-data-streams) in Real-Time Intelligence provides a wide variety of no-code connectors, converging into a catalog of organizational data that is protected, governed, and integrated across Fabric. For more information, see [What is Real-Time Intelligence in Fabric?](../real-time-intelligence/overview.md).

* **Data Engineering** - Fabric Data Engineering provides a Spark platform with great authoring experiences.  It enables you to create, manage, and optimize infrastructures for collecting, storing, processing, and analyzing vast data volumes.  Fabric Spark's integration with Data Factory allows you to schedule and orchestrate notebooks and Spark jobs. For more information, see [What is Data engineering in Microsoft Fabric?](../data-engineering/data-engineering-overview.md)

* **Fabric Data Science** - Fabric Data Science enables you to build, deploy, and operationalize machine learning models from Fabric. It integrates with Azure Machine Learning to provide built-in experiment tracking and model registry. Data scientists can enrich organizational data with predictions and business analysts can integrate those predictions into their BI reports, allowing a shift from descriptive to predictive insights. For more information, see [What is Data science in Microsoft Fabric?](../data-science/data-science-overview.md)

* **Fabric Data Warehouse** - Fabric Data Warehouse provides industry leading SQL performance and scale. It separates compute from storage, enabling independent scaling of both components. Additionally, it natively stores data in the open Delta Lake format. For more information, see [What is data warehousing in Microsoft Fabric?](../data-warehouse/data-warehousing.md)

Microsoft Fabric enables organizations and individuals to turn large and complex data repositories into actionable workloads and analytics, and is an implementation of data mesh architecture. For more information, see [What is a data mesh?](/azure/cloud-adoption-framework/scenarios/cloud-scale-analytics/architectures/what-is-data-mesh)

## OneLake: The unification of lakehouses

The Microsoft Fabric platform unifies the OneLake and lakehouse architecture across an enterprise.

### OneLake

A data lake is the foundation on which all the Fabric workloads are built. Microsoft Fabric Lake is also known as [OneLake](../onelake/onelake-overview.md). OneLake is built into the Fabric platform and provides a unified location to store all organizational data where the workloads operate.

OneLake is built on ADLS (Azure Data Lake Storage) Gen2. It provides a single SaaS experience and a tenant-wide store for data that serves both professional and citizen developers. OneLake simplifies Fabric experiences by eliminating the need for you to understand infrastructure concepts such as resource groups, RBAC (Role-Based Access Control), Azure Resource Manager, redundancy, or regions. You don't need an Azure account to use Fabric.

OneLake eliminates data silos, which individual developers often create when they provision and configure their own isolated storage accounts. Instead, OneLake provides a single, unified storage system for all developers. It ensures easy data discovery, sharing, and uniform enforcement of policy and security settings. For more information, see [What is OneLake?](../onelake/onelake-overview.md)

### OneLake and lakehouse data hierarchy

OneLake is hierarchical in nature to simplify management across your organization. Microsoft Fabric includes OneLake and there's no requirement for any up-front provisioning. There's only one OneLake per tenant and it provides a single-pane-of-glass file-system namespace that spans across users, regions, and clouds. OneLake organizes data into manageable containers for easy handling. The tenant maps to the root of OneLake and is at the top level of the hierarchy. You can create any number of workspaces, which you can think of as folders, within a tenant.

The following image shows how Fabric stores data in various items within OneLake. As shown, you can create multiple workspaces within a tenant, and create multiple lakehouses within each workspace. A lakehouse is a collection of files, folders, and tables that represents a database over a data lake. To learn more, see [What is a lakehouse?](../data-engineering/lakehouse-overview.md).

:::image type="content" source="media\microsoft-fabric-overview\hierarchy-within-tenant.png" alt-text="Diagram of the hierarchy of items like lakehouses and semantic models within a workspace within a tenant.":::

Every developer and business unit in the tenant can easily create their own workspaces in OneLake. They can ingest data into their own lakehouses, then start processing, analyzing, and collaborating on the data, just like OneDrive in Microsoft Office.

## Fabric compute engines

All the Microsoft Fabric compute experiences are prewired to OneLake, just like the Office applications are prewired to use the organizational OneDrive. The experiences such as Data Engineering, Data Warehouse, Data Factory, Power BI, and Real-Time Intelligence use OneLake as their native store. They don't need any extra configuration.

:::image type="content" source="media\microsoft-fabric-overview\onelake-architecture.png" alt-text="Diagram of different Fabric experiences all accessing the same OneLake data storage." lightbox="media\microsoft-fabric-overview\onelake-architecture.png":::

OneLake allows instant mounting of your existing Platform as a Service (PaaS) storage accounts into OneLake with the [Shortcut](../onelake/onelake-shortcuts.md) feature. You don't need to migrate or move any of your existing data. Using shortcuts, you can access the data stored in your Azure Data Lake Storage.

Shortcuts also allow you to easily share data between users and applications without moving or duplicating information. You can create shortcuts to other storage systems, allowing you to compose and analyze data across clouds with transparent, intelligent caching that reduces egress costs and brings data closer to compute.

## Real-Time hub: the unification of data streams

The Real-Time hub is a foundational location for data in motion.

The Real-Time hub provides a unified SaaS experience and tenant-wide logical place for all data-in-motion. The Real-Time hub lists all data in motion from all sources that customers can discover, ingest, manage, and consume and react upon, and contains both [streams](../real-time-intelligence/event-streams/overview.md) and [KQL database](../real-time-intelligence/create-database.md) tables. Streams include [**Data streams**](../real-time-intelligence/event-streams/create-manage-an-eventstream.md), **Microsoft sources** (for example, [Azure Event Hubs](../real-time-hub/add-source-azure-event-hubs.md), [Azure IoT Hub](../real-time-hub/add-source-azure-iot-hub.md), [Azure SQL DB Change Data Capture (CDC)](../real-time-hub/add-source-azure-sql-database-cdc.md), [Azure Cosmos DB CDC](../real-time-hub/add-source-azure-cosmos-db-cdc.md), and [PostgreSQL DB CDC](../real-time-hub/add-source-postgresql-database-cdc.md)), and [**Fabric events**](../real-time-intelligence/event-streams/add-source-fabric-workspace.md) (Fabric system events and external system events brought in from Azure, Microsoft 365, or other clouds).

The Real-Time hub enables users to easily discover, ingest, manage, and consume data-in-motion from a wide variety of source so that they can collaborate and develop streaming applications within one place. For more information, see [What is the Real-Time hub?](../real-time-hub/real-time-hub-overview.md)

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
