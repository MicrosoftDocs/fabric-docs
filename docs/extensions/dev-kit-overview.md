---
title: Microsoft Fabric Workload Development Kit overview
description: Learn about building a Fabric workload. 
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: conceptual
ms.custom:
ms.date: 12/27/2023
---

# Microsoft Fabric Workload Development Kit

This guide covers everything you need to know to create your own custom Fabric workload for your organization.

## Trademarks

This project might contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

## Introduction to Workload Development Kit

The Microsoft Fabric Workload Development Kit is a powerful tool designed to facilitate the integration of your applications within the Microsoft Fabric framework. This development kit is particularly useful for enterprise-level applications that require comprehensive analytics solutions.

## What are Workloads?

In Microsoft Fabric, workloads are the components of your application that are integrated within the Fabric framework. These workloads enhance the usability of your service within the familiar Fabric workspace, eliminating the need to leave the Fabric environment for different services.

Workloads increase user engagement and improve your application’s discoverability in the Fabric store, supporting compelling business models. The Fabric workspace includes various components, known as Fabric items, which handle the storage, analysis, and presentation of your data.

The Microsoft Fabric Workloads development kit provides the necessary tools and interfaces to effectively manage these workloads. It allows developers to streamline their analytics processes, with all services accessible from a single source of truth. This not only simplifies the development process but also enhances the analytics capabilities of any enterprise.

For more information about the Microsoft Fabric ecosystem, please refer to the official [Microsoft Fabric documentation](https://learn.microsoft.com/en-us/fabric/).


## What Workloads Offer to Microsoft Partners

As a Microsoft Partner, leveraging the power of workloads within the Microsoft Fabric ecosystem can significantly enhance your application's usability and discoverability. Workloads are components of your application integrated within the Fabric framework, providing a seamless user experience without leaving the Fabric environment.

The Microsoft Fabric Workloads SDK offers tools and interfaces to manage these workloads effectively, streamlining your analytics processes. This integration not only simplifies the development process but also enhances the analytics capabilities of your enterprise.

Moreover, the monetization aspect of workloads opens up new avenues for revenue generation. By understanding and utilizing the Universal Compute Capacity, Microsoft Entra ID authentication process, and the Workload Extensibility Framework, you can maximize the financial potential of your workloads.

In essence, workloads offer Microsoft Partners a comprehensive solution for application integration, analytics, and monetization within the Microsoft Fabric ecosystem.

For more information please view the [monetization.md][Microsoft Fabric workload partner benefits]

### Workload Development kit
This is a robust mechanism designed to enhance the existing Fabric experience by integrating custom capabilities. The entire Fabric platform has been engineered with interoperability in mind, seamlessly incorporating workload capabilities. For instance, the item editor facilitates the creation of a native, consistent user experience by embedding the customer's workload within the context of a Fabric workspace item.

### Universal Compute Capacity
Fabric comes equipped with a diverse array of compute engines, enabling customers to purchase and utilize Fabric services. To access premium features as well as any Fabric workloads, universal capacity must be allocated to a Fabric workspace (refer to [How to purchase Power BI Premium - Power BI | Microsoft Learn](https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-premium-purchase)).

### Authentication
Fabric workloads integrate with Microsoft [Entra Id](https://learn.microsoft.com/en-us/entra/fundamentals/whatis) for authentication and authorization. All interactions between workloads and other Fabric or Azure components necessitate proper authentication support for incoming and outgoing requests, ensuring correct generation and validation of tokens.
For more information please view the [authentication-overview.md][Workload authentication]

### Fabric Permission Model
This represents user permissions pertaining to the workspace and specific items. It is utilized to inherit user permissions and applied as part of provisioning resources (see [Roles in workspaces in Power BI - Power BI | Microsoft Learn](https://learn.microsoft.com/power-bi/collaborate-share/service-roles-new-workspaces)).

### Monitoring Hub & Scheduler
The monitoring hub provides a comprehensive view of all background jobs to Fabric users, enhancing transparency and control.

### Workloads Use Cases Examples

In this section, we provide a few examples of use cases to help you understand their potential applications. However, it’s important to note that these examples are just a few of the many unique use cases that can be tailored to meet the specific needs of your organization. The versatility of workloads allows for a wide range of possibilities, enabling you to create solutions that are perfectly suited to your operational requirements. We encourage you to explore and experiment with different configurations to discover the full potential of what workloads can do for your organization.

#### Data Job

Data jobs are one of the most common scenarios. They involve extracting data from OneLake, performing various data operations, and then writing the results back to OneLake. These jobs can be integrated with Fabric’s data scheduling capabilities and executed as background tasks. An example of this would be Data Pipelines Notebooks.

#### Data Store

These are workloads that manage and store data. They can provide APIs to query and write data, serving as a robust and flexible data management solution. Examples include Microsoft Fabric Lakehouse and Cosmos DB.

#### Visual

These are data visualization applications that are entirely based on existing Fabric data items. They allow for the creation of dynamic and interactive visual representations of your data. Power BI reports or dashboards serve as excellent examples of this type of workload.


## Considerations and Limitations

See [Release Notes](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/ReleaseNotes.md)

## Related content

* [Fabric extensibility frontend](extensibility-frontend.md)
* [Fabric extensibility backend](extensibility-backend.md)
