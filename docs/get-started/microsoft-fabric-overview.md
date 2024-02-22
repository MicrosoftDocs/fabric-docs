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
ms.search.form: product-trident
ms.date: 02/22/2024
---

# What is Microsoft Fabric?

Microsoft Fabric is an all-in-one analytics solution for enterprises that covers everything from data movement to data science, Real-Time Analytics, and business intelligence. It offers a comprehensive suite of services, including data lake storage, data engineering workflows, and data integration options.

With Fabric, you don't need to piece together different services from multiple vendors. Instead, you can enjoy a highly integrated, end-to-end, and easy-to-use platform that is designed to simplify your analytics needs.

## SaaS foundation

Microsoft Fabric is built on a foundation of Software as a Service (SaaS), and combines new and existing components from Power BI, Azure Synapse, and Azure Data Factory. These components are then presented in various customized user experiences.

:::image type="content" source="media\microsoft-fabric-overview\saas-foundation.png" alt-text="Diagram of the software as a service foundation beneath the different experiences of Fabric.":::

Fabric brings together experiences like Data Engineering, Data Factory, Data Science, Data Warehouse, Real-Time Analytics, and Power BI in a shared SaaS foundation. This integration provides the following advantages:

- Access to an extensive range of deeply integrated analytics in the industry.
- Shared experiences across experiences that are familiar and easy to learn.
- Easy access and reuse of assets.
- Unified data storage that allows you to retain the data in one location while using your preferred analytics tools.
- Centralized administration and governance across all experiences.

All of your data and services are seamlessly integrated in Fabric. IT teams can centrally configure core enterprise capabilities, and permissions are automatically applied across all the underlying services. Additionally, data sensitivity labels are inherited automatically across the items in the suite.

Fabric allows creators to concentrate on producing their best work, freeing them from the need to integrate, manage, or understand the underlying infrastructure.

## Components of Microsoft Fabric

Fabric offers a comprehensive set of analytics experiences designed to work together seamlessly. Each of these experiences is tailored to a specific persona and a specific task:

:::image type="content" source="media\microsoft-fabric-overview\workload-menu.png" alt-text="Screenshot of the Fabric menu of experiences.":::

- **Data Engineering** - The Data Engineering experience provides a Spark platform with great authoring experiences, enabling data engineers to perform large scale data transformation and democratize data through lakehouses. Microsoft Fabric Spark's integration with Data Factory enables you to schedule and orchestrate notebooks and Spark jobs. For more information, see [What is Data engineering in Microsoft Fabric?](../data-engineering/data-engineering-overview.md)

- **Data Factory** - Azure Data Factory provides a modern data integration experience to ingest, prepare and transform data from a rich set of data sources. It incorporates the simplicity of Power Query and you can use more than 200 native connectors to connect to data sources on-premises and in the cloud. For more information, see [What is Data Factory in Microsoft Fabric?](../data-factory/data-factory-overview.md)

- **Data Science** - The Data Science experience enables you to build, deploy, and operationalize machine learning models within your Fabric implementation. It integrates with Azure Machine Learning to provide built-in experiment tracking and model registry. Data scientists can enrich organizational data with predictions and business analysts can integrate those predictions into their BI reports, allowing a shift from descriptive to predictive insights. For more information, see [What is Data science in Microsoft Fabric?](../data-science/data-science-overview.md)

- **Data Warehouse** - The Data Warehouse experience provides industry leading SQL performance and scale. It separates compute from storage, enabling independent scaling of both components. Additionally, it natively stores data in the open Delta Lake format. For more information, see [What is data warehousing in Microsoft Fabric?](../data-warehouse/data-warehousing.md)

- **Real-Time Analytics** - The Real-Time Analytics experience is a managed big data analytics platform optimized for streaming and time-series data. Real-Time Analytics is the best in class engine for observational data analytics, which is currently the fastest growing data category. Observational data, which is collected from various sources, is often semi-structured in formats like JSON or Text, and comes in at high volume with shifting schemas, is hard for traditional data warehousing platforms to work with. For more information, see [What is Real-Time Analytics in Fabric?](../real-time-analytics/overview.md)

- **Power BI** - Power BI is the world's leading Business Intelligence platform. This integrated experience allows business owners to access all data in Fabric quickly and intuitively and to make better decisions with data. For more information, see [What is Power BI?](/power-bi/fundamentals/power-bi-overview)

Fabric joins these experiences into a unified platform that offers the most comprehensive big data analytics platform in the industry.

Microsoft Fabric enables organizations and individuals to turn large and complex data repositories into actionable workloads and analytics, and is an implementation of data mesh architecture. For more information, see [What is a data mesh?](/azure/cloud-adoption-framework/scenarios/cloud-scale-analytics/architectures/what-is-data-mesh)

## OneLake and the unification of lakehouses

The Microsoft Fabric platform unifies the OneLake and Lakehouse architecture across an enterprise.

### OneLake

A data lake is the foundation on which all the Fabric services are built. Microsoft Fabric Lake is also known as [OneLake](../onelake/onelake-overview.md). OneLake is built into the Fabric service and provides a unified location to store all organizational data where the experiences operate.

OneLake is built on ADLS (Azure Data Lake Storage) Gen2. It provides a single SaaS experience and a tenant-wide store for data that serves both professional and citizen developers. OneLake simplifies Fabric experiences, eliminating the need for users to understand any infrastructure concepts such as resource groups, RBAC (Role-Based Access Control), Azure Resource Manager, redundancy, or regions. Users don't even need an Azure account.

OneLake eliminates problematic data silos, which individual developers often create when they provision and configure their own isolated storage accounts. Instead, OneLake provides a single, unified storage system for all developers. Discovery and data sharing is streamlined, and compliance with policy and security settings is centrally and uniformly enforced. For more information, see [What is OneLake?](../onelake/onelake-overview.md)

### Organizational structure of OneLake and lakehouses

OneLake is hierarchical in nature to simplify management across your organization. It's built into Microsoft Fabric and there's no requirement for any up-front provisioning. There's only one OneLake per tenant and it provides a single-pane-of-glass file-system namespace that spans across users, regions, and clouds. The data in OneLake is divided into manageable containers for easy handling.

The tenant maps to the root of OneLake and is at the top level of the hierarchy. You can create any number of workspaces, which you can think of as folders, within a tenant.

The following image shows the various Fabric items where data is stored. It's an example of how various items within Fabric can store data inside OneLake. As displayed, you can create multiple workspaces within a tenant, and create multiple lakehouses within each workspace. A lakehouse is a collection of files, folders, and tables that represents a database over a data lake. To learn more, see [What is a lakehouse?](../data-engineering/lakehouse-overview.md).

:::image type="content" source="media\microsoft-fabric-overview\hierarchy-within-tenant.png" alt-text="Diagram of the hierarchy of items like lakehouses and semantic models within a workspace within a tenant.":::

Every developer and business unit in the tenant can easily create their own workspaces in OneLake. They can ingest data into their own lakehouses, then start processing, analyzing, and collaborating on the data, just like OneDrive in Microsoft Office.

All the Fabric compute experiences are automatically connected to OneLake, just like Office applications are connected to an organizational OneDrive. Fabric experiences, including Data Engineering, Data Warehouse, Data Factory, Power BI, and Real-Time Analytics, all use OneLake as their native store. They don't need any extra configuration.

:::image type="content" source="media\microsoft-fabric-overview\workloads-access-data.png" alt-text="Diagram of different Fabric experiences all accessing the same OneLake data storage.":::

OneLake is designed to allow instant mounting of your existing Platform as a Servic (PaaS) storage accounts into OneLake with the [Shortcut](../onelake/onelake-shortcuts.md) feature. You don't need to migrate or move any of your existing data. Using shortcuts, you can access the data stored in your Azure Data Lake Storage.

Shortcuts also allow you to easily share data between users and applications without moving or duplicating information. You can create shortcuts to other storage systems, allowing you to compose and analyze data across clouds with transparent, intelligent caching that reduces egress costs and brings data closer to compute.

## Fabric solutions for ISVs

If you're an ISV interested in integrating your solutions with Microsoft Fabric, you can use one of the following paths depending on the level of integration you want to achieve:

- **Interop** - Integrate your solution with the OneLake Foundation and establish basic connections and interoperability with Fabric.
- **Develop on Fabric** - Build your solution on top of the Fabric platform or seamlessly embed Fabric's functionalities within your existing applications. This path allows you to actively leverage Fabric capabilities.
- **Build a Fabric workload** - Create customized workloads and experiences in Fabric. Tailor your offerings to deliver their value while leveraging the Fabric ecosystem.

For more information, see the [Fabric ISV partner ecosystem](../cicd/partners/partner-integration.md).

## Related content

- [Microsoft Fabric terminology](fabric-terminology.md)
- [Create a workspace](create-workspaces.md)
- [Navigate to your items from Microsoft Fabric Home page](fabric-home.md)
- [End-to-end tutorials in Microsoft Fabric](end-to-end-tutorials.md)
