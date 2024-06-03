---
title: Microsoft Fabric Workload Development Kit overview (preview)
description: Learn about building a Fabric workload. 
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: conceptual
ms.custom:
ms.date: 05/21/2024
---
test
# Microsoft Fabric Workload Development Kit (preview)

The Microsoft Fabric Workload Development Kit is a robust set of tools designed to enhance the existing Fabric experience by integrating custom capabilities into Fabric. Using the development kit you can integrate your applications into the Microsoft Fabric framework. The development kit is useful for enterprise-level applications that require comprehensive analytics solutions.

## What are Workloads?

In [Microsoft Fabric](../get-started/microsoft-fabric-overview.md), workloads signify different components that are integrated into the Fabric framework. Workloads enhance the usability of your service within the familiar Fabric workspace, eliminating the need to leave the Fabric environment for different services. [Data Factory](../data-factory/data-factory-overview.md), [Data Warehouse](../data-warehouse/data-warehousing.md), [Power BI](/power-bi/enterprise/service-premium-what-is) and, [Data Activator](../data-activator/data-activator-introduction.md) are some of the Fabric workloads. 

With the Workload Development Kit, you can create your own workload for your applications. Workloads increase user engagement and improve your application’s discoverability in the Fabric store, supporting compelling business models. The Microsoft Fabric Workloads Development Kit provides the necessary tools and interfaces to effectively manage the workloads you created.

### What workloads offer to Microsoft partners?

As a Microsoft partner, applying the power of workloads within the Microsoft Fabric ecosystem can significantly enhance your application's usability and discoverability. Workloads are components of your application integrated within the Fabric framework, providing a seamless user experience without leaving the Fabric environment.

The Microsoft Fabric Workloads SDK offers tools and interfaces to manage these workloads effectively, streamlining your analytics processes. This integration not only simplifies the development process but also enhances the analytics capabilities of your enterprise.

Moreover, the [monetization](monetization.md) aspect of workloads opens up new avenues for revenue generation. By understanding and utilizing the Universal Compute Capacity, Microsoft Entra ID authentication process, and the Workload Development Kit Framework, you can maximize the financial potential of your workloads.

In essence, workloads offer Microsoft Partners a comprehensive solution for application integration, analytics, and monetization within the Microsoft Fabric ecosystem.

### Workload examples

In this section, you can find a few examples of use cases to help you understand the potential applications of Fabric workloads. These examples are just a few of the many unique use cases that can be tailored to meet the specific needs of your organization. The versatility of workloads allows for a wide range of possibilities, enabling you to create solutions that are perfectly suited to your operational requirements. We encourage you to explore and experiment with different configurations to discover the full potential of what workloads can do for your organization.

* **Data Job** - Data jobs are one of the most common scenarios. They involve extracting data from [OneLake](../onelake/onelake-overview.md), performing data operations, and then writing the results back to OneLake. These jobs can be integrated with Fabric’s data scheduling capabilities and executed as background tasks. An example of this type of workload is a data pipelines notebook.

* **Data store** - Workloads that manage and store data. They can provide APIs to query and write data, serving as a robust and flexible data management solution. Examples for this kind of workload include Microsoft Fabric [lakehouse](../data-engineering/lakehouse-overview.md) and [Cosmos DB](/azure/cosmos-db/introduction).

* **Data visualization** - Data visualization applications that are entirely based on existing Fabric data items. They allow the creation of dynamic and interactive visual representations of your data. [Power BI reports](/power-bi/consumer/end-user-reports) and [dashboards](/power-bi/create-reports/service-dashboards) serve as excellent examples of this type of workload.

## Authentication

Fabric workloads integrate with Microsoft [Entra ID](/entra/fundamentals/whatis) for [authentication](authentication-concept.md) and authorization. All interactions between workloads and other Fabric or Azure components require proper authentication support for incoming and outgoing requests, ensuring correct generation and validation of tokens.

## Fabric Permission Model

When developing workloads, you'll use the Fabric [permission model](../security/permission-model.md) to manage user permissions. The permission model represents user permissions for workspaces and specific items.

## Trademarks

The Microsoft Fabric Workload Development Kit might contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).

Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

## Related content

* [Fabric Workload Development Kit front end](extensibility-front-end.md)
* [Fabric Workload Development Kit back end](extensibility-back-end.md)
