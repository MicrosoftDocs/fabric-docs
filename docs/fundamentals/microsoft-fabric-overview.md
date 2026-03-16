---
title: What is Microsoft Fabric
description: Microsoft Fabric is an all-in-one analytics solution that covers everything from data movement to data science, real-time analytics, and business intelligence.
author: SnehaGunda
ms.author: sngun
ms.reviewer: gsaurer
ms.topic: overview
ms.custom:
- build 2024
ms.search.form: product-trident
ms.date: 12/19/2025
ai-usage: ai-assisted
---

# What is Microsoft Fabric?

Microsoft Fabric is an analytics platform that supports end‑to‑end data workflows, including data ingestion, transformation, real‑time stream processing, analytics, and reporting. It provides integrated experiences such as Data Engineering, Data Factory, Data Science, Real‑Time Intelligence, Data Warehouse, and Databases, which operate over a shared compute and storage model.

Fabric is delivered as a software‑as‑a‑service (SaaS) platform and uses OneLake as a centralized, logical data lake for storing and accessing data across all workloads. In tandem with OneLake, the OneLake Catalog provides a centralized experience for discovering, exploring, and governing data and analytics artifacts across the tenant. AI capabilities are built into the platform to assist with data preparation, analysis, and development tasks, reducing the need for manual service integration and enabling efficient analysis of large‑scale data.

> [!NOTE]
> * The [Fabric Analyst in a Day (FAIAD)](https://aka.ms/LearnFAIAD) workshop is free, hands-on training for analysts working with Power BI and Fabric. Get hands-on experience analyzing data and building reports using Fabric. The workshop covers key concepts like working with lakehouses, creating reports, and analyzing data in the Fabric environment.
> * Join the new Fabric user panel to share feedback and help shape Fabric and Power BI. Participate in surveys and 1:1 sessions with the product team. Learn more and sign up at [Fabric user panel](feedback.md#fabric-user-panel).

## Capabilities of Fabric

Microsoft Fabric provides several integrated capabilities:

* **Role-specific workloads:** Fabric offers distinct workloads for data engineers, data scientists, business analysts, and database administrators. Each workload provides tools, APIs, and user experiences optimized for common tasks such as data ingestion, transformation, modeling, querying, and reporting. they can also be combined within a single solution to support end-to-end scenarios.

* **OneLake (storage):** All Fabric workloads operate over OneLake, a unified logical data lake built on Azure Data Lake Storage. OneLake enables shared access to data across workloads without requiring data movement or duplication.

* **Copilot support:** Fabric includes Copilot features that assist with tasks such as authoring queries, pipelines and code, generating summaries and insights, and accelerating common development and analysis workflows.

* **Microsoft 365 integration:** Fabric integrates with Microsoft 365 applications, enabling data to be analyzed and consumed in tools such as Excel and shared through collaboration surfaces like Microsoft Teams.

* **Microsoft Foundry integration:** Fabric integrates with Microsoft Foundry to enable the use of prebuilt models and tooling for machine learning and AI scenarios, including model development, deployment, and inference.

* **Unified data management and governance:** Fabric provides centralized data discovery, access control, and governance capabilities, helping organizations manage data access, sharing, and compliance consistently across workloads.

## Microsoft Fabric architecture

The following diagram illustrates how Microsoft Fabric is built on a software‑as‑a‑service (SaaS) platform that unifies multiple analytics experiences within a single environment.

:::image type="content" source="media\microsoft-fabric-overview\fabric-architecture.png" alt-text="Diagram of the software as a service foundation beneath the different experiences of Fabric." lightbox="media\microsoft-fabric-overview\fabric-architecture.png":::

At the top of the diagram are the core Fabric workloads, such as Data Factory, Analytics, Databases, Real‑Time Intelligence, IQ, and Power BI. Each workload provides specialized capabilities tailored to different analytics tasks, but all workloads operate within the same Fabric environment and can share data and artifacts without duplication.

Beneath these workloads is the Fabric platform layer, which provides shared services used consistently across the experiences:

* **OneLake** is the centralized, logical data lake for Fabric. All workloads store and access data through OneLake, enabling zero‑copy access patterns and allowing data to remain in its original location while being reused across experiences.

* **Copilot** provides AI assistance embedded directly within Fabric workloads to help with authoring, exploration, and routine development tasks, while respecting tenant, data, and permission boundaries.

* **Governance** represents centralized administration and data governance, including permissions, sensitivity labels, and auditing. These controls are applied automatically and inherited across Fabric items. Governance is powered by Purview, which is built into Fabric. Microsoft Fabric centralizes governance and discovery capabilities within the OneLake Catalog, which serves as a unified hub to find, explore, secure and use the Fabric items you need, and govern the data you own. You can assess governance state, receive recommended actions, and improve data trust and compliance across workspaces and domains. To learn more, see [What is the OneLake Catalog?](../governance/onelake-catalog-overview.md).

This SaaS foundation enables end‑to‑end analytics scenarios such as ingesting data with Data Factory, processing it with engineering or real‑time workloads, and visualizing it in Power BI without manually integrating separate services or managing underlying infrastructure. Fabric centralizes data discovery, administration, and governance, with Microsoft Purview built in to enforce consistent security and compliance across the platform.

## Components of Microsoft Fabric

Microsoft Fabric offers the following workloads, each customized for a specific role and task:

* **Power BI** - Power BI lets you connect to data sources, create interactive charts and dashboards, and share insights across your organization. This allows business owners access to all data in Fabric quickly and effectively, enabling better data-focused decisions. For more information, see [What is Power BI?](/power-bi/fundamentals/power-bi-overview)

* **Databases** - Databases in Fabric are a developer-friendly transactional database such as Azure SQL Database, which allows you to easily create your operational database in Fabric. Using the mirroring capability, you can bring data from various systems together into OneLake. You can continuously replicate your existing data estate directly into Fabric's OneLake, including data from Azure SQL Database, Azure Cosmos DB, Azure Databricks, Snowflake, and Fabric SQL database. For more information, see [SQL database in Microsoft Fabric](../database/sql/overview.md) and [What is Mirroring in Fabric?](../mirroring/overview.md)

* **Data Factory** - Data Factory provides a modern data integration experience to ingest, prepare, and transform data from a rich set of data sources. It incorporates the simplicity of Power Query, and you can use more than 200 native connectors to connect to data sources on-premises and in the cloud. For more information, see [What is Data Factory in Microsoft Fabric?](../data-factory/data-factory-overview.md)

* **Industry Solutions** - Fabric provides industry-specific data solutions that address unique industry needs and challenges, and include data management, analytics, and decision-making. For more information, see [Industry Solutions in Microsoft Fabric](/industry/industry-data-solutions-fabric).

* **Real-Time Intelligence** -  Real-Time Intelligence analyzes data as it arrives, such as IoT sensor readings, application logs, or website clickstreams. It enables the extraction of insights, visualization, and action on data in motion by handling data ingestion, transformation, storage, modeling, analytics, visualization, tracking, AI, and real-time actions. The [Real-Time hub](#real-time-hub-the-unification-of-data-streams) in Real-Time Intelligence provides a wide variety of no-code connectors, converging into a catalog of organizational data that is protected, governed, and integrated across Fabric. For more information, see [What is Real-Time Intelligence in Fabric?](../real-time-intelligence/overview.md).

* **Data Engineering** - Fabric Data Engineering provides Apache Spark for processing large datasets, with notebooks and tools for writing and scheduling data transformation jobs. It enables you to create, manage, and optimize infrastructures for collecting, storing, processing, and analyzing vast data volumes.  Fabric Spark's integration with Data Factory allows you to schedule and orchestrate notebooks and Spark jobs. For more information, see [What is Data engineering in Microsoft Fabric?](../data-engineering/data-engineering-overview.md)

* **Fabric Data Science** - Fabric Data Science enables you to build, deploy, and operationalize machine learning models from Fabric. It integrates with Azure Machine Learning to provide built-in experiment tracking and model registry. Data scientists can enrich organizational data with predictions and business analysts can integrate those predictions into their BI reports, allowing a shift from descriptive to predictive insights. For more information, see [What is Data science in Microsoft Fabric?](../data-science/data-science-overview.md)

* **Fabric Data Warehouse** - Fabric Data Warehouse provides industry leading SQL performance and scale. It separates compute from storage, enabling independent scaling of both components. Additionally, it natively stores data in the open Delta Lake format. For more information, see [What is data warehousing in Microsoft Fabric?](../data-warehouse/data-warehousing.md)

* **IQ (preview)** - IQ (preview) is a new workload for unifying business semantics across data, models, and systems. It introduces a new ontology item for organizing your core business concepts and rules into a unified semantic layer. That ontology connects to OneLake data and existing semantic models to create a live, structured, connected model of how your business operates, and offers a managed labeled property graph that is AI ready. IQ powers consistent decisions, reusable metrics, and context-aware automation across the Fabric platform. For more information, see [What is IQ (preview)?](../iq/overview.md)

Fabric helps organizations and individuals analyze their data and create reports, dashboards, and machine learning models. It implements a data mesh architecture. For more information, see [What is a data mesh?](/azure/cloud-adoption-framework/scenarios/cloud-scale-analytics/architectures/what-is-data-mesh)

## OneLake: The unification of lakehouses

The Microsoft Fabric platform unifies the OneLake and lakehouse architecture across an enterprise.

### OneLake

A data lake is the foundation for all Fabric workloads. In Fabric, this lake is called [OneLake](../onelake/onelake-overview.md). OneLake is built into the platform and serves as a single store for all organizational data.

OneLake is built on ADLS (Azure Data Lake Storage) Gen2. It provides a single SaaS experience and a tenant-wide store for data that serves both professional and citizen developers. It simplifies the user experience by removing the need to understand complex infrastructure details like resource groups, RBAC, Azure Resource Manager, redundancy, or regions. You don't need an Azure account to use Fabric.

OneLake prevents data silos by offering a unified storage system that makes data discovery, sharing, and consistent policy enforcement easy. For more information, see [What is OneLake?](../onelake/onelake-overview.md)

### OneLake and lakehouse data hierarchy

OneLake’s hierarchical design simplifies organization-wide management. Fabric includes OneLake by default, so no upfront provisioning is needed. Each tenant gets one unified OneLake with single file-system namespace that spans users, regions, and clouds. OneLake organizes data into containers for easy handling. The tenant maps to the root of OneLake and is at the top level of the hierarchy. You can create multiple workspaces (which are like folders) within a tenant.

The following image shows how Fabric stores data in OneLake. You can have several workspaces per tenant and multiple lakehouses within each workspace. A lakehouse is a collection of files, folders, and tables that acts as a database over a data lake. To learn more, see [What is a lakehouse?](../data-engineering/lakehouse-overview.md).

:::image type="content" source="media\microsoft-fabric-overview\hierarchy-within-tenant.png" alt-text="Diagram of the hierarchy of items like lakehouses and semantic models within a workspace within a tenant.":::

Every developer and business unit in the tenant creates their own workspaces in OneLake. They ingest data into lakehouses and start processing, analyzing, and collaborating on that data—like using OneDrive in Microsoft Office.

## Real-Time hub: the unification of data streams

The Real-Time hub is a foundational location for data in motion. It provides a unified SaaS experience and tenant-wide logical place for streaming data. It lists data from every source, allowing users to discover, ingest, manage, and react to it. It contains both [streams](../real-time-intelligence/event-streams/overview.md) and [KQL Database](../real-time-intelligence/create-database.md) tables. Streams include [**Data streams**](../real-time-intelligence/event-streams/create-manage-an-eventstream.md), **Microsoft sources** (such as [Azure Event Hubs](../real-time-hub/add-source-azure-event-hubs.md), [Azure IoT Hub](../real-time-hub/add-source-azure-iot-hub.md), [Azure SQL Database (DB) Change Data Capture (CDC)](../real-time-hub/add-source-azure-sql-database-cdc.md), [Azure Cosmos DB CDC](../real-time-hub/add-source-azure-cosmos-db-cdc.md), [Azure Data Explorer](../real-time-hub/add-source-azure-data-explorer.md), and [PostgreSQL DB CDC](../real-time-hub/add-source-postgresql-database-cdc.md)), **Fabric events** ([workspace item events](../real-time-hub/create-streams-fabric-workspace-item-events.md), [OneLake events](../real-time-hub/create-streams-fabric-onelake-events.md), and [Job events](../real-time-hub/create-streams-fabric-job-events.md)), and **Azure events**, including [Azure Blob Storage events](../real-time-hub/get-azure-blob-storage-events.md) and external events from Microsoft 365 or other clouds services.

The Real-Time hub makes it easy to discover, ingest, manage, and consume data-in-motion from a wide variety of sources to collaborate and develop streaming applications in one place. For more information, see [What is the Real-Time hub?](../real-time-hub/real-time-hub-overview.md)

## Fabric compute engines

All Microsoft Fabric compute experiences come preconfigured with OneLake, like Office apps automatically use organizational OneDrive. Experiences like Data Engineering, Data Warehouse, Data Factory, Power BI, and Real-Time Intelligence use OneLake as their native store without extra setup.

:::image type="content" source="media\microsoft-fabric-overview\onelake-architecture.png" alt-text="Diagram of different Fabric experiences all accessing the same OneLake data storage." lightbox="media\microsoft-fabric-overview\onelake-architecture.png":::

OneLake lets you instantly mount your existing PaaS storage accounts using the [Shortcut](../onelake/onelake-shortcuts.md) feature. You don't have to migrate your existing data. Shortcuts provide direct access to data in Azure Data Lake Storage. They also enable easy data sharing between users and applications without duplicating files. Additionally, you can create shortcuts to other storage systems, allowing you to analyze cross-cloud data with intelligent caching that reduces egress costs and brings data closer to compute.

## Fabric solutions for ISVs

If you're an Independent Software Vendors (ISVs) looking to integrate your solutions with Microsoft Fabric, you can use one of the following paths based on your desired level of integration:

* **Interop** - Integrate your solution with the OneLake Foundation and establish basic connections and interoperability with Fabric.
* **Develop on Fabric** - Build your solution on top of the Fabric platform or seamlessly embed Fabric's functionalities into your existing applications. You can easily use Fabric capabilities with this option.
* **Build a Fabric workload** - Create customized workloads and experiences in Fabric, tailoring your offerings to maximize their effect within the Fabric ecosystem.

For more information, see the [Fabric ISV partner ecosystem](../cicd/partners/partner-integration.md).

## Related content

* [Microsoft Fabric terminology](fabric-terminology.md)
* [Create a workspace](create-workspaces.md)
* [Navigate to your items from Microsoft Fabric Home page](fabric-home.md)
* [End-to-end tutorials in Microsoft Fabric](end-to-end-tutorials.md)
