---
title: Fabric overview
description: 
ms.reviewer: sngun
ms.author: gesaur
author: gsaurer
ms.topic: overview
ms.date: 04/15/2023
---

# Microsoft Fabric overview

Microsoft Fabric provides a one-stop shop for all the analytical needs for every enterprise. It covers the complete spectrum of services including data movement, data lake, data engineering, data integration and data science, real time analytics, and business intelligence. With Microsoft Fabric, there's no need to stitch together different services from multiple vendors. Instead, the customer enjoys an end-to-end, highly integrated, single comprehensive product that is easy to understand, onboard, create and operate. There's no other product on the market that offers the breadth, depth, and level of integration that Microsoft Fabric offers. Microsoft Fabric architecture is based on Software as a Service (SaaS) foundation instead of traditional Platform as a Service (PaaS) to take simplicity and integration to the next level.

## SaaS Foundation

Microsoft Fabric brings together new and existing components from Power BI, Synapse, and ADX in a single integrated environment and exposes them in different experiences that are tailor made for users.  

:::image type="content" source="media\microsoft-fabric-overview\saas-foundation.png" alt-text="Visual representation of the software as a service foundation beneath the different workloads of Microsoft Fabric." lightbox="media\microsoft-fabric-overview\saas-foundation.png":::

By bringing together these workloads (Data Engineering, Data Factory, Data Science, Data Warehousing, Kusto, and Power BI) on the common SaaS foundation, Microsoft Fabric provides the following benefits to customers:

- The broadest set of deeply integrated analytics in the industry
- Shared experiences that are familiar and easy to learn across all the products
- All developers can easily discover and reuse all assets
- A unified data lake, allowing customers to keep the data where it is while using the analytics tools of choice
- Centralized administration and governance across all workloads

The Microsoft Fabric SaaS experience ensures that all the data and all the services are prewired together. IT teams are able to configure core enterprise capabilities centrally and permissions are applied automatically across all the underlying services. Data sensitivity labels are inherited automatically across the items in the suite.

Microsoft Fabric enables creators to focus on doing their best work without needing to integrate, manage, or even understand the underlying infrastructure powering the experience.

## The parts of Microsoft Fabric

Microsoft Fabric provides the most comprehensive set of analytics workloads designed from the ground up to work together seamlessly. Each workload needs to target a specific persona and a specific task. Microsoft Fabric includes industry-leading workloads in the following categories for an end-to-end analytical need.  

:::image type="content" source="media\microsoft-fabric-overview\workload-menu.png" alt-text="Screenshot of the Microsoft Fabric menu of workloads." lightbox="media\microsoft-fabric-overview\workload-menu.png":::

- **Data Engineering** - Data Engineering workload provides a world class Spark platform with great authoring experiences that empower data engineers to transform data at scale and democratize data through the lakehouse. Microsoft Fabric Spark’s integration with Data Factory enables notebooks and spark jobs to be scheduled and orchestrated.

- **Data Factory** - Data Factory combines the ease of use of Power Query with the scale and power of Azure Data Factory. Customers can use 200+ native connectors to connect to data sources on premises and in the cloud.  

- **Data Science** - Data Science workload enables customers to build, deploy, and operationalize machine learning models directly within their Microsoft Fabric experience. It integrates with Azure Machine Learning to provide users with built-in experiment tracking and model registry. Data scientists are empowered to enrich organizational data with predictions and allow business analysts to incorporate those predictions into BI reports, shifting insights from descriptive to predictive.

- **Data Warehousing** - Data Warehousing workload provides industry leading SQL performance and scale. It fully separates compute from storage, both of which can be independently scaled. It natively stores data in the open Delta Lake format.

- **Kusto (Observational Real Time Analytics)** - Observational data from the world around us is the fastest growing category. It comes from apps, IoT devices, human interactions, and so much more. This data is often semi-structured (for example, JSON or Text), comes in at high volume, with shifting schemas - characteristics that make it hard for traditional Data Warehousing platforms to work with. Kusto is best in class engine for observational data analytics.

- **Power BI** - Power BI is the world’s leading Business Intelligence platform. It ensures that business owners can access all data in Microsoft Fabric quickly and intuitively to make better decisions with data.

By bringing together all these workloads into a unified platform, Microsoft Fabric offers the most comprehensive big data analytics platform in the industry.

## OneLake and Lakehouse - unification of lakehouses across enterprise

### OneLake

The data lake is the foundation on which all the Microsoft Fabric services are built. Microsoft Fabric Lake, also known as OneLake, is built into the Microsoft Fabric service and provides a single place to store all organizational data and on which all of Microsoft Fabric’s workloads operate.  

Built on top of ADLS (Azure Data Lake Storage) Gen2, OneLake provides a single, SaaS-ified, tenant-wide store for data that serves both professional and citizen developers. Like with the rest of Microsoft Fabric, the SaaS-ification of the lake simplifies the experiences without the user ever needing to understand any infrastructure concepts such as resource groups, RBAC (Role-Based Access Control), Azure Resource Manager, redundancy, or regions, and doesn't require the user to even have an Azure account.  

OneLake eliminates today’s pervasive and chaotic data silos, created by different developers who provision and configure their own isolated storage accounts. Instead, OneLake provides a single, unified storage system for all developers, where discovery and sharing of data is trivial and compliance with policy and security settings are enforced centrally and uniformly.  

:::image type="content" source="media\microsoft-fabric-overview\onelake-in-microsoft-fabric.png" alt-text="Visual representation of the structure of Fabric, showing OneLake as the single data store on which all the workloads operate." lightbox="media\microsoft-fabric-overview\onelake-in-microsoft-fabric.png":::

### Organizational structure of OneLake and Lakehouse

OneLake is hierarchical in nature to ensure ease of management across your organization. It's built into Microsoft Fabric and doesn't require any up-front provisioning. There's only one OneLake per tenant and it provides a single-pane-of-glass file-system namespace that spans users, regions and even clouds while dividing up the data into manageable containers.  

The tenant maps to the root of OneLake and is the top level of the hierarchy. Within a tenant, you can create any number of workspaces, which can be thought of as folders. The following diagram shows the various Microsoft Fabric items where data is stored. It's an example of how the various items within Project Microsoft Fabric would store data inside of OneLake. As displayed, a tenant allows creating multiple workspaces, each workspace allows creating multiple lakehouses, where a lakehouse is a collection of files/folders/tables that represents a database over a data lake used by the Spark engine and SQL engine for big data processing and that includes enhanced capabilities for ACID transactions when using the open-source Delta Lake format tables.  

:::image type="content" source="media\microsoft-fabric-overview\hierarchy-within-tenant.png" alt-text="Visual representation of the hierarchy of items like lakehouses and datasets within a workspace within a tenant." lightbox="media\microsoft-fabric-overview\hierarchy-within-tenant.png":::

Every developer and business unit in the tenant can instantly create their own workspaces in OneLake, ingest their own data into their own lakehouses, and start processing, analyzing, and collaborating on the data, just like OneDrive in Office.  

All the compute workloads of Microsoft Fabric are prewired to OneLake, like the way Office applications are prewired to use the organizational OneDrive. Microsoft Fabric’s Data Engineering (lakehouses and notebooks), Data Warehousing, Data Factory (pipelines and dataflows), Power BI, and Kusto are all using OneLake as their native store without needing any extra configuration.  

:::image type="content" source="media\microsoft-fabric-overview\workloads-access-data.png" alt-text="Visual representation of different workloads all accessing the same OneLake data storage." lightbox="media\microsoft-fabric-overview\workloads-access-data.png":::

As massive amounts of data are already stored in ADLS, OneLake is designed to allow instant mounting of existing PaaS storage accounts into OneLake without needing to migrate or move any of the data with a feature call Shortcut. Further, with support for shortcuts (also known as symbolic links), OneLake allows easy sharing of data between users and applications without having to move and duplicate information unnecessarily. The shortcut capability of OneLake extends to other storage system, enabling users to compose and analyze data across clouds with transparent, smart caching that reduces egress costs and brings data closer to compute.  

## Next steps

- Microsoft Fabric terminology
