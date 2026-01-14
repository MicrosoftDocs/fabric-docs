---
title: Microsoft Fabric Workload Development Kit overview
description: Learn about building a Fabric workload.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.custom:
ms.date: 05/21/2024
---

# Microsoft Fabric Workload Development Kit

The Microsoft Fabric Workload Development Kit is a robust set of tools designed to enhance the existing Fabric experience by integrating custom capabilities into Fabric. Using the development kit you can integrate your applications into the Microsoft Fabric framework. The development kit is useful for enterprise-level applications that require comprehensive analytics solutions.

>[!NOTE]
> The Extensibility Toolkit is the modern evolution of the Workload Development Kit, designed to make extending Microsoft Fabric with custom functionality easier and faster than ever. It offers a streamlined development environment allowing developers to focus on innovation rather than infrastructure. This evolution reflects Microsoft’s commitment to empowering developers with intuitive, scalable, and intelligent tools that accelerate productivity and unlock new possibilities within Fabric. For more information, see the [Extensibility Toolkit](../extensibility-toolkit/extensibility-toolkit-overview.md)

## What are Workloads?

In [Microsoft Fabric](../fundamentals/microsoft-fabric-overview.md), workloads signify different components that are integrated into the Fabric framework. Workloads enhance the usability of your service within the familiar Fabric workspace, eliminating the need to leave the Fabric environment for different services. [Data Factory](../data-factory/data-factory-overview.md), [Data Warehouse](../data-warehouse/data-warehousing.md), [Power BI](/power-bi/enterprise/service-premium-what-is) and [Fabric [!INCLUDE [fabric-activator](../real-time-intelligence//includes/fabric-activator.md)]](../real-time-intelligence/data-activator/activator-introduction.md) are some of the Fabric workloads.

With the Workload Development Kit, you can create your own workload for your data applications. Publishing a Fabric Workload to the Fabric Workload Hub increases discoverability and user engagement, supporting compelling business models. The Microsoft Fabric Workloads Development Kit provides the necessary tools and interfaces to embed your data application in Microsoft Fabric.

### What do workloads offer to Microsoft partners?

As a Microsoft partner, applying the power of workloads within the Microsoft Fabric ecosystem can significantly enhance your application's usability and discoverability. Workloads are components of your application integrated within the Fabric framework, providing a seamless user experience without leaving the Fabric environment.

The Microsoft Fabric Workloads Development Kit offers tools and interfaces to manage these workloads effectively, streamlining your analytics processes. This integration not only simplifies the development process but also enhances the analytics capabilities of your enterprise.

Moreover, the [monetization](monetization.md) aspect of workloads opens up new avenues for revenue generation. By understanding and utilizing the Universal Compute Capacity, Microsoft Entra ID authentication process, and the Workload Development Kit Framework, you can maximize the financial potential of your workloads.

In essence, workloads offer Microsoft Partners a comprehensive solution for application integration, analytics, and monetization within the Microsoft Fabric ecosystem.

### Workload examples

In this section, you can find a few examples of use cases to help you understand the potential applications of Fabric workloads. These examples are just a few of the many unique use cases that can be tailored to meet the specific needs of your organization. The versatility of workloads allows for a wide range of possibilities, enabling you to create solutions that are perfectly suited to your operational requirements. We encourage you to explore and experiment with different configurations to discover the full potential of what workloads can do for your organization.

* **Data Job** - Data jobs are one of the most common scenarios. They involve extracting data from [OneLake](../onelake/onelake-overview.md), performing data operations, and then writing the results back to OneLake. These jobs can be integrated with Fabric’s data scheduling capabilities and executed as background tasks. An example of this type of workload is a pipelines notebook.

* **Data store** - Workloads that manage and store data. They can provide APIs to query and write data, serving as a robust and flexible data management solution. Examples for this kind of workload include Microsoft Fabric [Lakehouse](../data-engineering/lakehouse-overview.md) and [Cosmos DB](/azure/cosmos-db/introduction).

* **Data visualization** - Data visualization applications that are entirely based on existing Fabric data items. They allow the creation of dynamic and interactive visual representations of your data. [Power BI reports](/power-bi/consumer/end-user-reports) and [dashboards](/power-bi/create-reports/service-dashboards) serve as excellent examples of this type of workload.

## Publish to the Workload Hub
After developing your Fabric Workload according to the [certification requirement](publish-workload-requirements.md), publish it to the [Workload Hub](./more-workloads-add.md) which will allow every Fabric user a chance to easily start a trial experience and then buy your workload. An in-depth description of how to publish the workload can be found [here](./publish-workload-flow.md).

## Key Considerations for Developing a Fabric Workload
There are several important concepts to understand before beginning development of a Fabric workload:
- Native Fabric Experience: Review the [Fabric UX system](https://aka.ms/fabricux) to learn the basics design concepts, all published workloads must comply to these design principles.
- Integrate with the Fabric workspace: Your existing data application is required to function in a [Fabric workspace](../fundamentals/workspaces.md), where users create **instances** of your data application and collaborate with other Fabric users.
- Integrate with Fabric as a multitenant application: Your workload is embedded in Fabric but we don't host your code. Fabric exposes APIs to allow the workload to get access to user data, user context and environment information to allow you to map between the customer's environment and your cloud deployment. It's the responsibility of the Workload to comply and attest to industry standards such as GDPR, ISO, SOC 2 etc.

## Trademarks

The Microsoft Fabric Workload Development Kit might contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).

Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

## Related content

* [Publish a Fabric workload to Workload Hub](publish-workload-flow.md)
* [Monetize your workload](monetization.md)
* [Quick start: Run a workload sample](quickstart-sample.md)
